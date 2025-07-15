import { Injectable, NotFoundException } from '@nestjs/common';
import { IDevice } from 'src/common/types/types';
import { ObjectRepository } from '../../objects/object.repository';
import { CreateDeviceDto } from '../dto/create_device';
import { UpdateDeviceDto } from '../dto/update_device';
import { DeviceModelRepository } from '../repository/device_model.repository';
import { DeviceRepository } from '../repository/device_repository';
import { DeviceTypeRepository } from '../repository/device_type.repository';

@Injectable()
export class DeviceService {
    constructor(
        private readonly deviceRepository: DeviceRepository,
        private readonly deviceTypeRepository: DeviceTypeRepository,
        private readonly deviceModelRepository: DeviceModelRepository,
        private readonly objectRepository: ObjectRepository,
    ) {}

    async createDevice(dto: CreateDeviceDto, userId: number): Promise<{ message: string; id: number }> {
        const validDeviceType = await this.deviceTypeRepository.getById(dto.device_type_id);
        if (!validDeviceType) {
            throw new NotFoundException('Device type not found');
        }

        const validDeviceModel = await this.deviceModelRepository.getById(dto.device_model_id);
        if (!validDeviceModel) {
            throw new NotFoundException('Device model not found');
        }

        if( validDeviceModel.device_type_id !== dto.device_type_id) {
            throw new NotFoundException('Device model does not match the device type');
        }

        const validObject = await this.objectRepository.getById(dto.object_id);
        if (!validObject) {
            throw new NotFoundException('Object not found');
        }

        const deviceId = await this.deviceRepository.createDevice(dto, userId);

        return {
            message: 'Device created successfully',
            id: deviceId,
        };
    }

    async getAllDevices(page: number, limit: number): Promise<{ message: string; data: IDevice[]; total: number }> {
        const result = await this.deviceRepository.getAll(page, limit);

        return {
            message: 'Devices retrieved successfully',
            data: result.data,
            total: result.total,
        };
    }

    async getDeviceById(id: number): Promise<{ message: string; data: IDevice }> {
        const device = await this.deviceRepository.getById(id);
        if (!device) {
            throw new NotFoundException('Device not found');
        }
        return {
            message: 'Device retrieved successfully',
            data: device,
        };
    }

    async updateDevice(id: number, dto: UpdateDeviceDto): Promise<void> {
        const device = await this.deviceRepository.getById(id);
        if (!device) {
            throw new NotFoundException('Device not found');
        }

        // Update only the fields that are provided in the DTO
        const updatedData: Partial<UpdateDeviceDto> = {};
        if (dto.obeject_id !== undefined) {
            const validObject = await this.objectRepository.getById(dto.obeject_id);
            if (!validObject) {
                throw new NotFoundException('Object not found');
            }
            updatedData.obeject_id = dto.obeject_id;
        }
        if (dto.device_model_id !== undefined) {
            const validDeviceModel = await this.deviceModelRepository.getById(dto.device_model_id);
            if (!validDeviceModel) {
                throw new NotFoundException('Device model not found');
            }
            updatedData.device_model_id = dto.device_model_id;
        }
        if (dto.device_type_id !== undefined) {
            const validDeviceType = await this.deviceTypeRepository.getById(dto.device_type_id);
            if (!validDeviceType) {
                throw new NotFoundException('Device type not found');
            }
            updatedData.device_type_id = dto.device_type_id;
        }
        if (dto.serial_number !== undefined) updatedData.serial_number = dto.serial_number;
        if (dto.ip_address !== undefined) updatedData.ip_address = dto.ip_address;
        if (dto.mac_address !== undefined) updatedData.mac_address = dto.mac_address;
        if (dto.status !== undefined) updatedData.status = dto.status;
        if (dto.extra_info !== undefined) updatedData.extra_info = dto.extra_info;

        await this.deviceRepository.update(id, updatedData);
    }

    async deleteDevice(id: number): Promise<void> {
        const device = await this.deviceRepository.getById(id);
        if (!device) {
            throw new NotFoundException('Device not found');
        }
        await this.deviceRepository.delete(id);
    }
}
