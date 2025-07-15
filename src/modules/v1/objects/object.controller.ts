import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/common/decorators/role.decorator';
import { UserRole } from 'src/common/enums/roles.enum';
import { JwtHttpAuthGuard } from 'src/common/guards/auth/http-auth.guard';
import { HttpRoleGuard } from 'src/common/guards/roles/roles.guard';
import {
    ApiBadRequestResponse,
    ApiForbiddenResponse,
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
    ApiUnauthorizedResponse,
} from 'src/common/swagger/common-swagger';
import { ICustomRequest, IObject } from 'src/common/types/types';
import { CreateObjectDto } from './dto/create_object';
import { GetObjectsQueryDto } from './dto/get_objects';
import { UpdateObjectDto } from './dto/update_object';
import { ObjectService } from './object.service';

@Controller('objects')
@UseGuards(JwtHttpAuthGuard, HttpRoleGuard)
@Role(UserRole.ADMIN, UserRole.SUPERADMIN)
@ApiBearerAuth()
@ApiTags('Objects')
@ApiNotFoundResponse('Object not found')
@ApiBadRequestResponse('Bad Request')
@ApiInternalServerErrorResponse('Internal Server Error')
@ApiUnauthorizedResponse()
@ApiForbiddenResponse()
export class ObjectController {
    constructor(private readonly objectService: ObjectService) {}

    @Post('create')
    async createObject(@Body() dto: CreateObjectDto, @Req() req: ICustomRequest): Promise<{ message: string; id: number }> {
        return this.objectService.createObject(dto, req.user.id);
    }

    @Get('list')
    async getObjects(
        @Query() query: GetObjectsQueryDto,
    ): Promise<{ message: string; data: IObject[]; total: number; CurrentPage: number }> {
        return this.objectService.getObjects(query);
    }

    @Get('by-id/:id')
    async getObjectById(@Param('id') id: number): Promise<{ message: string; data: IObject }> {
        return this.objectService.getObjectById(id);
    }

    @Put('update/:id')
    async updateObject(@Param('id') id: number, @Body() dto: UpdateObjectDto, @Req() req: ICustomRequest): Promise<{ message: string }> {
        await this.objectService.updateObject(id, dto, req.user.id);
        return { message: 'Object updated successfully' };
    }

    @Delete('delete/:id')
    async deleteObject(@Param('id') id: number): Promise<{ message: string }> {
        await this.objectService.deleteObject(id);
        return { message: 'Object deleted successfully' };
    }
}