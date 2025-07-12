import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectKnex } from 'nestjs-knex';
import { IDistrict, IRegion } from 'src/common/types/types';
import { CreateDistrictDto } from './dto/create-district.dto';
import { CreateRegionDto } from './dto/create-region.dto';

@Injectable()
export class AreaRepository {
    constructor(@InjectKnex() private readonly knex: Knex) {}

    // Region operations
    async createRegion(createRegionDto: CreateRegionDto): Promise<IRegion> {
        const [region] = await this.knex<IRegion>('regions').insert(createRegionDto).returning('*');
        return region;
    }

    async getAllRegions(): Promise<IRegion[]> {
        return this.knex<IRegion>('regions').select('*');
    }

    async getRegionById(id: number): Promise<IRegion> {
        const region = await this.knex<IRegion>('regions').where('id', id).first();
        if (!region) {
            throw new Error(`Region with id ${id} not found`);
        }
        return region;
    }

    async updateRegion(id: number, updateData: Partial<IRegion>): Promise<IRegion> {
        const [updated] = await this.knex<IRegion>('regions')
            .where('id', id)
            .update({
                ...updateData,
                updated_at: new Date(),
            })
            .returning('*');
        return updated;
    }

    async deleteRegion(id: number): Promise<void> {
        await this.knex<IRegion>('regions').where('id', id).del();
    }

    // District operations
    async createDistrict(createDistrictDto: CreateDistrictDto): Promise<IDistrict> {
        const [district] = await this.knex<IDistrict>('districts')
            .insert({
                ...createDistrictDto,
                region_id: createDistrictDto.region_id.toString(),
            })
            .returning('*');
        return district;
    }

    async getAllDistricts(regionId: number): Promise<IDistrict[]> {
        return this.knex<IDistrict>('districts').where('region_id', regionId).select('*').orderBy('name');
    }

    async getDistrictsByRegionId(regionId: string): Promise<IDistrict[]> {
        return this.knex<IDistrict>('districts').where('region_id', regionId).orderBy('name');
    }

    async getDistrictById(id: number): Promise<IDistrict> {
        const district = await this.knex<IDistrict>('districts').where('id', id).first();
        if (!district) {
            throw new Error(`District with id ${id} not found`);
        }
        return district;
    }

    async updateDistrict(id: number, updateData: Partial<IDistrict>): Promise<IDistrict> {
        const [updated] = await this.knex<IDistrict>('districts')
            .where('id', id)
            .update({
                ...updateData,
                updated_at: new Date(),
            })
            .returning('*');
        return updated;
    }

    async deleteDistrict(id: number): Promise<void> {
        await this.knex<IDistrict>('districts').where('id', id).del();
    }
}
