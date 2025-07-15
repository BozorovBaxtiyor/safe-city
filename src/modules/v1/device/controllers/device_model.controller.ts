import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
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
import { ICustomRequest, IDeviceModel } from 'src/common/types/types';
import { CreateDeviceModelDto } from '../dto/create_device_model';
import { DeviceModelService } from '../services/device_model.service';
import { UpdateDeviceModelDto } from '../dto/update_device_model';

@Controller('device-models')
@UseGuards(JwtHttpAuthGuard, HttpRoleGuard)
@Role(UserRole.ADMIN, UserRole.SUPERADMIN)
@ApiBearerAuth()
@ApiTags('Device Models')
@ApiNotFoundResponse('Device model not found')
@ApiBadRequestResponse('Bad Request')
@ApiInternalServerErrorResponse('Internal Server Error')
@ApiUnauthorizedResponse()
@ApiForbiddenResponse()
export class DeviceModelController {
    constructor(private readonly deviceModelService: DeviceModelService) {}

    @Post('create')
    async createDeviceModel(@Body() dto: CreateDeviceModelDto, @Req() req: ICustomRequest): Promise<{ message: string; id: number }> {
        return this.deviceModelService.create(dto, req.user.id);
    }

    @Get('list')
    @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number for pagination', example: 1 })
    @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page', example: 10 })
    async getDeviceModels(
        @Query('page') page: number,
        @Query('limit') limit: number,
    ): Promise<{ message: string; data: IDeviceModel[]; total: number; CurrentPage: number }> {
        return this.deviceModelService.getDeviceModels(page, limit);
    }

    @Get('by-id/:id')
    @ApiParam({ name: 'id', type: Number, description: 'ID of the device model to retrieve', example: 1 })
    async getDeviceModelById(@Param('id') id: number): Promise<{ message: string; data: IDeviceModel }> {
        return this.deviceModelService.getById(id);
    }

    @Get('by-device-type/:deviceTypeId')
    @ApiParam({ name: 'deviceTypeId', type: Number, description: 'ID of the device type to filter models', example: 1 })
    async getDeviceModelsByDeviceType(@Param('deviceTypeId') deviceTypeId: number): Promise<{ message: string; data: IDeviceModel[] }> {
        return this.deviceModelService.getDeviceModelsByDeviceType(deviceTypeId);
    }

    @Put('update/:id')
    @ApiParam({ name: 'id', type: Number, description: 'ID of the device model to update', example: 1 })
    async updateDeviceModel(@Param('id') id: number, @Body() dto: UpdateDeviceModelDto): Promise<{ message: string; }> { 
        await this.deviceModelService.update(id, dto);
        return { message: 'Device model updated successfully' };
    }

    @Delete('delete/:id')
    @ApiParam({ name: 'id', type: Number, description: 'ID of the device model to delete', example: 1 })
    async deleteDeviceModel(@Param('id') id: number): Promise<{ message: string }> {
        await this.deviceModelService.deleteById(id);
        return { message: 'Device model deleted successfully' };
    }

}
