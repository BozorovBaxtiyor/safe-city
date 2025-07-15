import { Injectable } from "@nestjs/common";
import { Knex } from "knex";
import { InjectKnex } from "nestjs-knex";
import { CreateDeviceModelDto } from "../dto/create_device_model";
import { UpdateDeviceModelDto } from "../dto/update_device_model";

@Injectable()
export class DeviceModelRepository {
    constructor(@InjectKnex() private readonly knex: Knex) {}

    async create(deviceModel: CreateDeviceModelDto, userId): Promise<number> {
        const [result] = await this.knex('device_models')
            .insert({ ...deviceModel, created_by: userId })
            .returning('id');
        return result.id;
    }

    async getAll(page: number, limit: number): Promise<{ data: any[]; total: number }> {
        const offset = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.knex('device_models')
                .join('users', 'device_models.created_by', 'users.id')
                .select('device_models.*', 'users.fullname as created_by')
                .limit(limit)
                .offset(offset),
            this.knex('device_models').count('* as count'),
        ]);
        return { data, total: Number(total[0].count) };
    }

    async getById(id: number): Promise<any | null> {
        const deviceModel = await this.knex('device_models')
            .where({'device_models.id': id})
            .join('users', 'device_models.created_by', 'users.id')
            .select('device_models.*', 'users.fullname as created_by')
            .first();
        return deviceModel || null;
    }

    async getAllByDeviceType(deviceTypeId: number): Promise<any[]> {
        return this.knex('device_models')
            .where({ device_type_id: deviceTypeId })
            .join('users', 'device_models.created_by', 'users.id')
            .select('device_models.*', 'users.fullname as created_by');
    }

    async update(id: number, dto: UpdateDeviceModelDto): Promise<void> {
        await this.knex('device_models').where({ id }).update(dto);
    }

    async delete(id: number): Promise<void> {
        await this.knex('device_models').where({ id }).del();
    }
}