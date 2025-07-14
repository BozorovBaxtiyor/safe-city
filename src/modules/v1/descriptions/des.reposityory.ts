import { Injectable } from "@nestjs/common";
import { Knex } from "knex";
import { InjectKnex } from "nestjs-knex";
import { IDescription, IDescriptonType } from "src/common/types/types";
import { CreateDesTypeDto } from "./dto/create_des_type.dto";
import { CreateDescriptionDto } from "./dto/create_description.dto";
import { UpdateDescriptionDto } from "./dto/update_description.dto";

@Injectable()
export class DescriptionsRepository {
    constructor(@InjectKnex() private readonly knex: Knex) {}

    async createDescriptionType(dto: CreateDesTypeDto, userId: number): Promise<number> {
        const [data] = await this.knex('descriptions_types')
            .insert({ ...dto, created_by: userId })
            .returning('id');
        return data.id;
    }

    async getDesTypes(page: number, limit: number): Promise<{ data: IDescriptonType[]; total: number }> {
        const offset = (page - 1) * limit;
        const [total] = await this.knex('descriptions_types').count('* as count');
        const descriptions = await this.knex<IDescriptonType>('descriptions_types')
            .join('users', 'descriptions_types.created_by', 'users.id')
            .select('descriptions_types.*', 'users.fullname as created_by')
            .limit(limit)
            .offset(offset);
        return { data: descriptions, total: Number(total.count) };
    }

    async getDesById(id: number): Promise<IDescriptonType | null> {
        const description = await this.knex<IDescriptonType>('descriptions_types').where({ id }).first();
        return description || null;
    }

    async updateDes(id: number, dto: CreateDesTypeDto): Promise<void> {
        await this.knex<IDescriptonType>('descriptions_types').where({ id }).update(dto);
    }

    async deleteDes(id: number): Promise<void> {
        await this.knex<IDescriptonType>('descriptions_types').where({ id }).del();
    }

    async createDescription(dto: CreateDescriptionDto, userId: number): Promise<number> {
        const [data] = await this.knex('descriptions')
            .insert({ ...dto, created_by: userId })
            .returning('id');
        return data.id;
    }

    async getDescriptions(page: number, limit: number): Promise<{ data: IDescription[]; total: number }> {
        const offset = (page - 1) * limit;
        const [total] = await this.knex('descriptions').count('* as count');
        const descriptions = await this.knex<IDescription>('descriptions')
            .join('users', 'descriptions.created_by', 'users.id')
            .select('descriptions.*', 'users.fullname as created_by')
            .limit(limit)
            .offset(offset);
        return { data: descriptions, total: Number(total.count) };
    }

    async getDescriptionById(id: number): Promise<IDescription | null> {
        const description = await this.knex<IDescription>('descriptions').where({ id }).first();
        return description || null;
    }

    async getDescriptionsByDesTypeId(desTypeId: number): Promise<{ data: IDescription[] }> {
        const descriptions = await this.knex<IDescription>('descriptions').where({ des_id: desTypeId });
        return { data: descriptions };
    }

    async updateDescription(id: number, dto: UpdateDescriptionDto): Promise<void> {
        await this.knex<IDescription>('descriptions').where({ id }).update(dto);
    }

    async deleteDescription(id: number): Promise<void> {
        await this.knex<IDescription>('descriptions').where({ id }).del();
    }   
}