import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectKnex } from 'nestjs-knex';
import { CreateDeviceTypeDto } from '../dto/create_device_type';
import { IDeviceType } from 'src/common/types/types';

@Injectable()
export class DeviceTypeRepository {
    constructor(@InjectKnex() private readonly knex: Knex) {}

    async create(dto: CreateDeviceTypeDto, userId: number): Promise<number> {
        const [result] = await this.knex('device_types')
            .insert({ ...dto, created_by: userId })
            .returning('id');
        return result.id;
    }

    async getAll( page: number, limit: number): Promise<{ data: IDeviceType[]; total: number }> {
        const offset = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.knex('device_types')
                .join('users', 'device_types.created_by', 'users.id')
                .select('device_types.*' , 'users.fullname as created_by')
                .limit(limit)
                .offset(offset),
            this.knex('device_types').count('* as count')
        ]);
        return { data, total: Number(total[0].count) };
    }

    async getById(id: number): Promise<IDeviceType | null> {
        const deviceType = await this.knex('device_types').where({ id }).first();
        return deviceType || null;
    }

    async delete(id: number): Promise<void> {
        await this.knex('device_types').where({ id }).del();
    }
}
