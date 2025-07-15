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
import { ICustomRequest, IDevice } from 'src/common/types/types';
import { CreateDeviceDto } from '../dto/create_device';
import { DeviceService } from '../services/device.service';
import { UpdateDeviceDto } from '../dto/update_device';

@Controller('device')
@ApiTags('Device')
@ApiBearerAuth()
@UseGuards(JwtHttpAuthGuard, HttpRoleGuard)
@ApiNotFoundResponse('Device not found')
@ApiUnauthorizedResponse()
@ApiBadRequestResponse('Bad request')
@ApiForbiddenResponse()
@ApiInternalServerErrorResponse('Internal server error')
@Role(UserRole.ADMIN, UserRole.SUPERADMIN)
export class DeviceController {
    constructor(private readonly deviceService: DeviceService) {}

    @Post('create')
    async createDevice(@Body() dto: CreateDeviceDto, @Req() req: ICustomRequest): Promise<{ message: string; id: number }> {
        return this.deviceService.createDevice(dto, req.user.id);
    }

    @Get('list')
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
        description: 'Number of items per page',
        example: 10,
    })
    async getAllDevices(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ): Promise<{ message: string; data: IDevice[]; total: number }> {
        return this.deviceService.getAllDevices(page, limit);
    }

    @Get('get-by-id/:id')
    @ApiParam({
        name: 'id',
        required: true,
        type: Number,
        description: 'ID of the device to retrieve',
        example: 1,
    })
    async getDeviceById(@Param('id') id: number): Promise<{ message: string; data: IDevice }> {
        return this.deviceService.getDeviceById(id);
    }  
    
    @Put('update/:id')
    @ApiParam({
        name: 'id',
        required: true,
        type: Number,
        description: 'ID of the device to update',
        example: 1,
    })
    async updateDevice(@Param('id') id: number, @Body() dto: UpdateDeviceDto): Promise<{ message: string }>{
        await this.deviceService.updateDevice(id, dto);
        return { message: 'Device updated successfully' };
    }

    @Delete('delete/:id')
    @ApiParam({
        name: 'id',
        required: true,
        type: Number,
        description: 'ID of the device to delete',  
        example: 1,
    })
    async deleteDevice(@Param('id') id: number): Promise<{ message: string }>{
        await this.deviceService.deleteDevice(id);
        return { message: 'Device deleted successfully' };
    }
}
