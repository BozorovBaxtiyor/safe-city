import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectKnex } from 'nestjs-knex';
import { IObject } from 'src/common/types/types';
import { CreateObjectDto } from './dto/create_object';
import { GetObjectsQueryDto } from './dto/get_objects';
import { UpdateObjectDto } from './dto/update_object';

@Injectable()
export class ObjectRepository {
    constructor(@InjectKnex() private readonly knex: Knex) {}

    async create(dto: CreateObjectDto, userId: number): Promise<number> {
        const [result] = await this.knex('objects')
            .insert({ ...dto, created_by: userId, updated_by: userId })
            .returning('id');
        return result.id;
    }

    async getAll(query: GetObjectsQueryDto): Promise<{ data: IObject[]; total: number }> {
        const page = query.page || 1;
        const limit = query.limit || 10;
        const offset = (page - 1) * limit;

        const baseQuery = this.knex('objects')
            .leftJoin('users as created_user', 'objects.created_by', 'created_user.id')
            .leftJoin('users as updated_user', 'objects.updated_by', 'updated_user.id')
            .leftJoin('regions', 'objects.region_id', 'regions.id')
            .leftJoin('districts', 'objects.district_id', 'districts.id')
            .leftJoin('projects', 'objects.project_id', 'projects.id')
            .leftJoin('orders', 'objects.order_id', 'orders.id')
            .leftJoin('descriptions', 'objects.des_id', 'descriptions.id')
            .leftJoin('descriptions_types', 'objects.des_type_id', 'descriptions_types.id')
            .modify(queryBuilder => {
                if (query.region_id) {
                    queryBuilder.where('objects.region_id', query.region_id);
                }
                if (query.project_id) {
                    queryBuilder.where('objects.project_id', query.project_id);
                }
                if (query.district_id) {
                    queryBuilder.where('objects.district_id', query.district_id);
                }
                if (query.order_id) {
                    queryBuilder.where('objects.order_id', query.order_id);
                }
                if (query.des_type_id) {
                    queryBuilder.where('objects.des_type_id', query.des_type_id);
                }
                if (query.des_id) {
                    queryBuilder.where('objects.des_id', query.des_id);
                }
            })
            .select(
                'objects.id',
                'objects.name',
                'objects.address',
                'created_user.fullname as created_by',
                'updated_user.fullname as updated_by',
                'regions.name as region_name',
                'districts.name as district_name',
                'projects.name as project_name',
                'orders.order_number as order_name',
                'descriptions_types.name as description_type_name',
                'objects.latitude',
                'objects.longitude',
                'objects.ip_subnet',
                'objects.connection_type',
                'objects.speed',
        );
        
        const totalQuery = this.knex('objects')
            .count('* as count')
            .modify(queryBuilder => {
                if (query.region_id) {
                    queryBuilder.where('objects.region_id', query.region_id);
                }
                if (query.project_id) {
                    queryBuilder.where('objects.project_id', query.project_id);
                }
                if (query.district_id) {
                    queryBuilder.where('objects.district_id', query.district_id);
                }
                if (query.order_id) {
                    queryBuilder.where('objects.order_id', query.order_id);
                }
                if (query.des_type_id) {
                    queryBuilder.where('objects.des_type_id', query.des_type_id);
                }
                if (query.des_id) {
                    queryBuilder.where('objects.des_id', query.des_id);
                }
            });

        // const totalQuery = this.knex('objects').count('* as count');

        const [data, total] = await Promise.all([baseQuery.orderBy('objects.id' , 'desc').limit(limit).offset(offset), totalQuery]);

        return { data, total: Number(total[0].count) };
    }

    async getById(id: number): Promise<IObject | null> {
        const object = await this.knex('objects')
            .where({ 'objects.id': id })
            .leftJoin('users', 'objects.created_by', 'users.id')
            .leftJoin('users as updated_by', 'objects.updated_by', 'updated_by.id')
            .leftJoin('regions', 'objects.region_id', 'regions.id')
            .leftJoin('districts', 'objects.district_id', 'districts.id')
            .leftJoin('projects', 'objects.project_id', 'projects.id')
            .leftJoin('orders', 'objects.order_id', 'orders.id')
            .leftJoin('descriptions', 'objects.des_id', 'descriptions.id')
            .leftJoin('descriptions_types', 'objects.des_type_id', 'descriptions_types.id')
            .select(
                'objects.*',
                'users.fullname as created_by',
                'updated_by.fullname as updated_by',
                'regions.name as region_name',
                'districts.name as district_name',
                'projects.name as project_name',
                'orders.order_number as order_name',
                'descriptions_types.name as description_type_name',
                'descriptions.name as description_name',
            )
            .first();
        return object || null;
    }

    async update(id: number, dto: UpdateObjectDto, userId: number): Promise<void> {
        await this.knex('objects')
            .where({ id })
            .update({
                ...dto,
                updated_by: userId,
                updated_at: new Date(),
            });
    }

    async delete(id: number): Promise<void> {
        await this.knex('objects').where({ id }).del();
    }
}
