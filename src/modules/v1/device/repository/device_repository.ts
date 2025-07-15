import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectKnex } from 'nestjs-knex';
import { IDevice } from 'src/common/types/types';
import { CreateDeviceDto } from '../dto/create_device';

@Injectable()
export class DeviceRepository {
    constructor(@InjectKnex() private readonly knex: Knex) {}

    async createDevice(dto: CreateDeviceDto, userId: number): Promise<number> {
        const [result] = await this.knex('devices')
            .insert({
                obeject_id: dto.object_id,
                device_model_id: dto.device_model_id,
                device_type_id: dto.device_type_id,
                created_by: userId,
                serial_number: dto.serial_number,
                ip_address: dto.ip_address,
                mac_address: dto.mac_address,
                status: dto.status || 'active',
                extra_info: dto.extra_info || null,
            })
            .returning('id');

        return result.id;
    }

    async getAll(page: number, limit: number): Promise<{ data: IDevice[]; total: number }> {
        const offset = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.knex('devices')
                .join('device_models', 'devices.device_model_id', 'device_models.id')
                .join('device_types', 'devices.device_type_id', 'device_types.id')
                .join('users', 'devices.created_by', 'users.id')
                .select(
                    'devices.id',
                    'devices.serial_number',
                    'devices.ip_address',
                    'devices.mac_address',
                    'devices.status',
                    'device_models.name as device_model_name',
                    'device_types.name as device_type_name',
                    'users.fullname as created_by',
                    'devices.created_at',
                    'devices.updated_at',
                    'devices.extra_info'
                )
                .limit(limit)
                .offset(offset),
            this.knex('devices').count('* as count'),
        ]);
        return { data, total: Number(total[0].count) };
    }

    async getById(id: number): Promise<IDevice | null> {
        const device = await this.knex('devices')
            .join('device_models', 'devices.device_model_id', 'device_models.id')
            .join('device_types', 'devices.device_type_id', 'device_types.id')
            .join('users', 'devices.created_by', 'users.id')
            .select(
                'devices.id',
                'devices.serial_number',
                'devices.ip_address',
                'devices.mac_address',
                'devices.status',
                'device_models.name as device_model_name',
                'device_types.name as device_type_name',
                'users.fullname as created_by',
                'devices.created_at',
                'devices.updated_at',
                'devices.extra_info'
            )
            .where({ 'devices.id': id })
            .first();

        return device || null;
    }

    async update(id: number, data: Partial<IDevice>): Promise<void> {
        await this.knex('devices').where({ id }).update({
            ...data,
            updated_at: new Date(),
        });
    }

    async delete(id: number): Promise<void> {
        await this.knex('devices').where({ id }).del();
    }
}
