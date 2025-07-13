import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/common/decorators/role.decorator';
import { UserRole } from 'src/common/enums/roles.enum';
import { JwtHttpAuthGuard } from 'src/common/guards/auth/http-auth.guard';
import { HttpRoleGuard } from 'src/common/guards/roles/roles.guard';
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiForbiddenResponse,
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiUnauthorizedResponse,
} from 'src/common/swagger/common-swagger';
import { ICustomRequest, IOrder, IProject } from 'src/common/types/types';
import { CreateOrderDto } from './dto/create_order.dto';
import { CreateProjectDto } from './dto/create_project.dto';
import { CreateOrderEntity } from './entity/create_order.entity';
import { CreateProjectEntity } from './entity/create_project.entity';
import { ProjectService } from './project.service';
import { UpdateOrderDto } from './dto/update_order.dto';

@Controller('projects')
@UseGuards(JwtHttpAuthGuard, HttpRoleGuard)
@Role(UserRole.ADMIN, UserRole.SUPERADMIN)
@ApiBearerAuth()
@ApiNotFoundResponse('Project not found')
@ApiUnauthorizedResponse()
@ApiForbiddenResponse()
@ApiInternalServerErrorResponse('Internal server error')
@ApiBadRequestResponse('Bad request')
@ApiTags('Projects and Orders')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) {}

    @Post('create-project')
    @ApiCreatedResponse('Project created successfully', CreateProjectEntity)
    async createProject(@Body() createProjectDto: CreateProjectDto, @Req() req: ICustomRequest): Promise<Partial<IProject>> {
        return this.projectService.createProject(createProjectDto, req.user.id);
    }

    @Get('get-projects')
    @ApiQuery({
        name: 'page',
        required: false,
        type: Number,
        description: 'Page number for pagination',
        example: 1,
    })
    @ApiQuery({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Number of projects per page',
        example: 10,
    })
    async getProjects(
        @Query('page') page?: number,
        @Query('limit') limit?: number,
    ): Promise<{ data: Partial<IProject>[]; total: number; currentPage: number }> {
        return this.projectService.getProjects(page, limit);
    }

    @Get('get-project-by-id/:id')
    @ApiOkResponse('Project retrieved successfully', CreateProjectEntity)
    @ApiParam({ name: 'id', description: 'Project ID', type: Number })
    async getProjectById(@Param('id') id: number): Promise<Partial<IProject>> {
        return this.projectService.getProjectById(id);
    }

    @Put('update-project/:id')
    @ApiOkResponse('Project updated successfully')
    @ApiParam({ name: 'id', description: 'Project ID', type: Number })
    async updateProject(@Param('id') id: number, @Body() dto: CreateProjectDto): Promise<{ message: string }> {
        return this.projectService.updateProject(id, dto);
    }

    @Delete('delete-project/:id')
    @ApiOkResponse('Project deleted successfully')
    @ApiParam({ name: 'id', description: 'Project ID', type: Number })
    async deleteProject(@Param('id') id: number): Promise<{ message: string }> {
        return this.projectService.deleteProject(id);
    }

    @Post('create-order')
    @ApiCreatedResponse('Order created successfully', CreateOrderEntity)
    async createOrder(
        @Body() createOrderDto: CreateOrderDto,
        @Req() req: ICustomRequest,
    ): Promise<Partial<IProject> & { message: string }> {
        const orderId = await this.projectService.createOrder(createOrderDto, req.user.id);
        return {
            id: orderId,
            message: 'Order created successfully',
        };
    }

    @Get('get-orders-by-project/:projectId')
    @ApiOkResponse('Orders retrieved successfully')
    @ApiParam({ name: 'projectId', description: 'Project ID', type: Number })
    async getOrdersByProject(@Param('projectId') projectId: number): Promise<{ data: Partial<IOrder>[]; message: string }> {
        const orders = await this.projectService.getOrdersByProject(projectId);
        return {
            data: orders,
            message: 'Orders retrieved successfully',
        };
    }

    @Get('orders-all')
    @ApiQuery({
        name: 'page',
        required: false,
        type: Number,
        description: 'Page number for pagination',
        example: 1,
    })
    @ApiQuery({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Number of orders per page',
        example: 10,
    })
    @ApiOkResponse('Orders retrieved successfully')
    async getAllOrders(
        @Query('page') page?: number,
        @Query('limit') limit?: number,
    ): Promise<{ data: Partial<IOrder>[]; total: number; currentPage: number }> {
        return this.projectService.getAllOrders(page, limit);
    }

    @Get('get-order-by-id/:id')
    @ApiOkResponse('Order retrieved successfully')
    @ApiParam({ name: 'id', description: 'Order ID', type: Number })
    async getOrderById(@Param('id') id: number): Promise<Partial<IOrder> & { message: string }> {
        const order = await this.projectService.getOderById(id);
        return {
            ...order,
            message: 'Order retrieved successfully',
        };
    }

    @Put('update-order/:id')
    @ApiOkResponse('Order updated successfully')
    @ApiParam({ name: 'id', description: 'Order ID', type: Number })
    async updateOrder(@Param('id') id: number, @Body() dto: UpdateOrderDto): Promise<{ message: string }> {
        return this.projectService.updateOrder(id, dto);
    }

    @Delete('delete-order/:id')
    @ApiOkResponse('Order deleted successfully')
    @ApiParam({ name: 'id', description: 'Order ID', type: Number })
    async deleteOrder(@Param('id') id: number): Promise<{ message: string }>{
        return this.projectService.deleteOrder(id)
    }
}
