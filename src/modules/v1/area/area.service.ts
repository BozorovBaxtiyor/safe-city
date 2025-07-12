import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IDistrict, IRegion } from 'src/common/types/types';
import { AreaRepository } from './area.repository';
import { CreateDistrictDto } from './dto/create-district.dto';
import { CreateRegionDto } from './dto/create-region.dto';

@Injectable()
export class AreaService {
    constructor(private readonly areaRepository: AreaRepository) {}

    // Region services
    async createRegion(createRegionDto: CreateRegionDto): Promise<IRegion> {
        try {
            return await this.areaRepository.createRegion(createRegionDto);
        } catch (error) {
            if (error.code === '23505') {
                // Unique violation
                throw new HttpException(
                    'Region with this name already exists',
                    HttpStatus.CONFLICT,
                );
            }
            throw new HttpException('Failed to create region', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getAllRegions(): Promise<{regions:IRegion[]}> {
        try {
            const regions = await this.areaRepository.getAllRegions();
            return { regions };
        } catch (error) {
            throw new HttpException('Failed to fetch regions', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getRegionById(id: number): Promise<IRegion> {
        const region = await this.areaRepository.getRegionById(id);
        if (!region) {
            throw new HttpException('Region not found', HttpStatus.NOT_FOUND);
        }
        return region;
    }

    async updateRegion(id: number, updateData: Partial<IRegion>): Promise<IRegion> {
        try {
            const region = await this.areaRepository.updateRegion(id, updateData);
            if (!region) {
                throw new HttpException('Region not found', HttpStatus.NOT_FOUND);
            }
            return region;
        } catch (error) {
            if (error.code === '23505') {
                throw new HttpException(
                    'Region with this name already exists',
                    HttpStatus.CONFLICT,
                );
            }
            throw error;
        }
    }

    async deleteRegion(id: number): Promise<{ message: string }> {
        const region = await this.areaRepository.getRegionById(id);
        if (!region) {
            throw new HttpException('Region not found', HttpStatus.NOT_FOUND);
        }
        await this.areaRepository.deleteRegion(id);
        return { message: 'Region deleted successfully' };
    }

    // District services
    async createDistrict(createDistrictDto: CreateDistrictDto): Promise<IDistrict> {
        try {
            // Check if region exists
            const region = await this.areaRepository.getRegionById(
                Number(createDistrictDto.region_id),
            );
            if (!region) {
                throw new HttpException('Region not found', HttpStatus.NOT_FOUND);
            }
            return await this.areaRepository.createDistrict(createDistrictDto);
        } catch (error) {
            if (error.code === '23505') {
                throw new HttpException(
                    'District with this name already exists',
                    HttpStatus.CONFLICT,
                );
            }
            throw error;
        }
    }

    async getAllDistricts(regionId: number): Promise<{data: IDistrict[]}> {
        try {
            const districts = await this.areaRepository.getAllDistricts(regionId);
            return {data: districts};
        } catch (error) {
            throw new HttpException('Failed to fetch districts', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getDistrictById(id: number): Promise<IDistrict> {
        const district = await this.areaRepository.getDistrictById(id);
        if (!district) {
            throw new HttpException('District not found', HttpStatus.NOT_FOUND);
        }
        return district;
    }

    async getDistrictsByRegionId(regionId: string): Promise<IDistrict[]> {
        const region = await this.areaRepository.getRegionById(Number(regionId));
        if (!region) {
            throw new HttpException('Region not found', HttpStatus.NOT_FOUND);
        }
        return await this.areaRepository.getDistrictsByRegionId(regionId);
    }

    async updateDistrict(id: number, updateData: Partial<IDistrict>): Promise<IDistrict> {
        try {
            if (updateData.region_id) {
                const region = await this.areaRepository.getRegionById(
                    Number(updateData.region_id),
                );
                if (!region) {
                    throw new HttpException('Region not found', HttpStatus.NOT_FOUND);
                }
            }

            const district = await this.areaRepository.updateDistrict(id, updateData);
            if (!district) {
                throw new HttpException('District not found', HttpStatus.NOT_FOUND);
            }
            return district;
        } catch (error) {
            if (error.code === '23505') {
                throw new HttpException(
                    'District with this name already exists',
                    HttpStatus.CONFLICT,
                );
            }
            throw error;
        }
    }

    async deleteDistrict(id: number): Promise<{ message: string }> {
        const district = await this.areaRepository.getDistrictById(id);
        if (!district) {
            throw new HttpException('District not found', HttpStatus.NOT_FOUND);
        }
        await this.areaRepository.deleteDistrict(id);
        return { message: 'District deleted successfully' };
    }
}
