import { Injectable, NotFoundException } from '@nestjs/common';
import { DeviceTypeRepository } from '../repository/device_type.repository';
import { CreateDeviceTypeDto } from '../dto/create_device_type';
import { IDeviceType } from 'src/common/types/types';

@Injectable()
export class DeviceTypeService {
    constructor(private readonly deviceTypeRepository: DeviceTypeRepository) { }
    
    async createDeviceType(dto: CreateDeviceTypeDto , userId: number): Promise<{ message: string, id: number }> {
        const id = await this.deviceTypeRepository.create(dto , userId);
        return { message: 'Device type created successfully', id };
    }

    async getDeviceTypes(page: number, limit: number): Promise<{ message: string; data: IDeviceType[]; total: number; CurrentPage: number }> {
        const result = await this.deviceTypeRepository.getAll( page, limit);
        return {
            message: 'Device types retrieved successfully',
            data: result.data,
            total: result.total,
            CurrentPage: page
        };
    }

    async deleteById(id: number): Promise<void> {
        const deviceType = await this.deviceTypeRepository.getById(id);
        if (!deviceType) {
            throw new NotFoundException(`Device type with ID ${id} not found`);
        }
        await this.deviceTypeRepository.delete(id);
    }
}
