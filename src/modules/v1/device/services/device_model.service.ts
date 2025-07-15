import { Injectable, NotFoundException } from '@nestjs/common';
import { IDeviceModel } from 'src/common/types/types';
import { CreateDeviceModelDto } from '../dto/create_device_model';
import { UpdateDeviceModelDto } from '../dto/update_device_model';
import { DeviceModelRepository } from '../repository/device_model.repository';
import { DeviceTypeRepository } from '../repository/device_type.repository';

@Injectable()
export class DeviceModelService {
    constructor(
        private readonly deviceModelRepository: DeviceModelRepository,
        private readonly deviceTypeRepository: DeviceTypeRepository,
    ) {}

    async create(data: CreateDeviceModelDto, userId: number): Promise<{ message: string; id: number }> {
        const validDeviceType = await this.deviceTypeRepository.getById(data.device_type_id);
        if (!validDeviceType) {
            throw new NotFoundException(`Device type with ID ${data.device_type_id} not found`);
        }
        const id = await this.deviceModelRepository.create(data, userId);
        return { message: 'Device model created successfully', id };
    }

    async getDeviceModels(
        page: number,
        limit: number,
    ): Promise<{ message: string; data: IDeviceModel[]; total: number; CurrentPage: number }> {
        const result = await this.deviceModelRepository.getAll(page, limit);
        return {
            message: 'Device models retrieved successfully',
            data: result.data,
            total: result.total,
            CurrentPage: page,
        };
    }

    async getById(id: number): Promise<{ message: string; data: IDeviceModel }> {
        const deviceModel = await this.deviceModelRepository.getById(id);
        if (!deviceModel) {
            throw new NotFoundException(`Device model with ID ${id} not found`);
        }
        return { message: 'Device model retrieved successfully', data: deviceModel };
    }

    async getDeviceModelsByDeviceType(deviceTypeId: number): Promise<{ data: IDeviceModel[]; message: string }> {
        const deviceModels = await this.deviceModelRepository.getAllByDeviceType(deviceTypeId);
        if (!deviceModels || deviceModels.length === 0) {
            throw new NotFoundException(`No device models found for device type ID ${deviceTypeId}`);
        }
        return { data: deviceModels, message: 'Device models retrieved successfully' };
    }

    async update(id: number, dto: UpdateDeviceModelDto): Promise<void> {
        const deviceModel = await this.deviceModelRepository.getById(id);
        if (!deviceModel) {
            throw new NotFoundException(`Device model with ID ${id} not found`);
        }

        if( dto.device_type_id) {
            const validDeviceType = await this.deviceTypeRepository.getById(dto.device_type_id);
            if (!validDeviceType) {
                throw new NotFoundException(`Device type with ID ${dto.device_type_id} not found`);
            }
        }
        await this.deviceModelRepository.update(id, dto);
    }

    async deleteById(id: number): Promise<{ message: string }> {
        const deviceModel = await this.deviceModelRepository.getById(id);
        if (!deviceModel) {
            throw new NotFoundException(`Device model with ID ${id} not found`);
        }
        await this.deviceModelRepository.delete(id);
        return { message: 'Device model deleted successfully' };
    }
}
