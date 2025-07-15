import { Body, Controller, Delete, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
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
import { ICustomRequest, IDeviceType } from 'src/common/types/types';
import { CreateDeviceTypeDto } from '../dto/create_device_type';
import { DeviceTypeService } from '../services/device_type.service';

@Controller('device-type')
@UseGuards(JwtHttpAuthGuard, HttpRoleGuard)
@Role(UserRole.ADMIN, UserRole.SUPERADMIN)
@ApiTags('Device Type')
@ApiBearerAuth()
@ApiInternalServerErrorResponse('Internal Server Error')
@ApiUnauthorizedResponse()
@ApiForbiddenResponse()
@ApiBadRequestResponse('Bad Request')
@ApiNotFoundResponse('Not Found')
export class DeviceTypeController {
    constructor(private readonly deviceTypeService: DeviceTypeService) {}

    @Post('create')
    async createDeviceType(@Body() dto: CreateDeviceTypeDto, @Req() req: ICustomRequest): Promise<{ message: string; id: number }> {
        return this.deviceTypeService.createDeviceType(dto, req.user.id);
    }

    @Get('list')
    @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number for pagination', example: 1 })
    @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items per page', example: 10 })
    async getDeviceTypes(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ): Promise<{ message: string; data: IDeviceType[]; total: number; CurrentPage: number }> {
        return this.deviceTypeService.getDeviceTypes(page, limit);
    }

    @Delete('delete/:id')
    @ApiParam({ name: 'id', type: Number, description: 'ID of the device type to delete', example: 1 })
    async deleteDeviceType(@Param('id') id: number): Promise<{ message: string }> {
        await this.deviceTypeService.deleteById(id)
        return { message: 'Device type deleted successfully' };
    }
}
