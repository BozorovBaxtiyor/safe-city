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
import { ICustomRequest, IDescription, IDescriptonType } from 'src/common/types/types';
import { DescriptionsService } from './des.service';
import { CreateDesTypeDto } from './dto/create_des_type.dto';
import { CreateDescriptionDto } from './dto/create_description.dto';
import { UpdateDescriptionDto } from './dto/update_description.dto';

@Controller('descriptions')
@UseGuards(JwtHttpAuthGuard, HttpRoleGuard)
@Role(UserRole.ADMIN, UserRole.SUPERADMIN)
@ApiBearerAuth()
@ApiTags('Descriptions')
@ApiNotFoundResponse('Description not found')
@ApiInternalServerErrorResponse('Internal server error')
@ApiBadRequestResponse('Bad request')
@ApiForbiddenResponse()
@ApiUnauthorizedResponse()
export class DescriptionsController {
    constructor(private readonly descriptionsService: DescriptionsService) {}

    @Post('create-description-type')
    @ApiCreatedResponse('Description type created successfully')
    async createDescriptionType(@Body() dto: CreateDesTypeDto, @Req() req: ICustomRequest): Promise<{ message: string; id: number }> {
        return this.descriptionsService.createDescriptionType(dto, req.user.id);
    }

    @Get('get-des-types')
    @ApiOkResponse('Description types retrieved successfully')
    @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number for pagination', example: 1 })
    @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of description types per page', example: 10 })
    async getDesTypes(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ): Promise<{ message: string; data: IDescriptonType[]; total: number; currentPage: number }> {
        return this.descriptionsService.getDesTypes(page, limit);
    }

    @Get('get-des-by-id/:id')
    @ApiOkResponse('Description retrieved successfully')
    @ApiNotFoundResponse('Description not found')
    @ApiParam({ name: 'id', type: Number, description: 'ID of the description type' })
    async getDesTypenById(@Param('id') id: number): Promise<{ message: string; data: IDescriptonType }> {
        return this.descriptionsService.getDesTypeById(id);
    }

    @Put('update-des/:id')
    @ApiParam({ name: 'id', type: Number, description: 'ID of the description type' })
    @ApiOkResponse('Description updated successfully')
    @ApiNotFoundResponse('Description not found')
    async updateDescription(@Param('id') id: number, @Body() dto: CreateDesTypeDto): Promise<{ message: string }> {
        await this.descriptionsService.updateDesType(id, dto);
        return { message: 'Description updated successfully' };
    }

    @Delete('delete-des/:id')
    @ApiParam({ name: 'id', type: Number, description: 'ID of the description type' })
    @ApiOkResponse('Description deleted successfully')
    @ApiNotFoundResponse('Description not found')
    async deleteDescriptionType(@Param('id') id: number): Promise<{ message: string }> {
        await this.descriptionsService.deleteDesType(id);
        return { message: 'Description deleted successfully' };
    }

    @Post('create-description')
    @ApiCreatedResponse('Description created successfully')
    async createDescription(@Body() dto: CreateDescriptionDto, @Req() req: ICustomRequest): Promise<{ message: string; id: number }> {
        return this.descriptionsService.createDescription(dto, req.user.id);
    }

    @Get('get-descriptions')
    @ApiOkResponse('Descriptions retrieved successfully')
    @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number for pagination', example: 1 })
    @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of descriptions per page', example: 10 })
    async getDescriptions(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ): Promise<{ message: string; data: IDescription[]; total: number; currentPage: number }> {
        return this.descriptionsService.getDescriptions(page, limit);
    }

    @Get('get-description-by-id/:id')
    @ApiOkResponse('Description retrieved successfully')
    @ApiNotFoundResponse('Description not found')
    @ApiParam({ name: 'id', type: Number, description: 'ID of the description' })
    async getDescriptionById(@Param('id') id: number): Promise<{ message: string; data: IDescription }> {
        return this.descriptionsService.getDescriptionById(id);
    }

    @Get('get-description-by-des-type-id/:id')
    @ApiOkResponse('Description retrieved successfully')
    @ApiNotFoundResponse('Description not found')
    @ApiParam({ name: 'id', type: Number, description: 'ID of the description type' })
    async getDescriptionByDesTypeId(@Param('id') id: number): Promise<{ message: string; data: IDescription }> {
        return this.descriptionsService.getDescriptionById(id);
    }

    @Put('update-description/:id')
    @ApiParam({ name: 'id', type: Number, description: 'ID of the description' })
    @ApiOkResponse('Description updated successfully')
    @ApiNotFoundResponse('Description not found')
    async updateDescriptionById(@Param('id') id: number, @Body() dto: UpdateDescriptionDto): Promise<{ message: string }> {
        await this.descriptionsService.updateDescription(id, dto);
        return { message: 'Description updated successfully' };
    }

    @Delete('delete-description/:id')
    @ApiParam({ name: 'id', type: Number, description: 'ID of the description' })
    @ApiOkResponse('Description deleted successfully')
    @ApiNotFoundResponse('Description not found')
    async deleteDescription(@Param('id') id: number): Promise<{ message: string }> {
        await this.descriptionsService.deleteDescription(id);
        return { message: 'Description deleted successfully' };
    }
}
