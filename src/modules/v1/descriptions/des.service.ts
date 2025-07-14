import { Injectable, NotFoundException } from '@nestjs/common';
import { IDescription, IDescriptonType } from 'src/common/types/types';
import { DescriptionsRepository } from './des.reposityory';
import { CreateDesTypeDto } from './dto/create_des_type.dto';
import { CreateDescriptionDto } from './dto/create_description.dto';
import { UpdateDescriptionDto } from './dto/update_description.dto';

@Injectable()
export class DescriptionsService {
    constructor(private readonly descriptionsRepository: DescriptionsRepository) {}

    // Add methods to interact with the DescriptionsRepository
    async createDescriptionType(dto: CreateDesTypeDto, userId: number): Promise<{ message: string; id: number }> {
        const id = await this.descriptionsRepository.createDescriptionType(dto, userId);
        return { message: 'Description type created successfully', id };
    }

    async getDesTypes(
        page: number,
        limit: number,
    ): Promise<{ message: string; data: IDescriptonType[]; total: number; currentPage: number }> {
        const { data, total } = await this.descriptionsRepository.getDesTypes(page, limit);
        return {
            message: 'Description types retrieved successfully',
            data,
            total,
            currentPage: page,
        };
    }

    async getDesTypeById(id: number): Promise<{ message: string; data: IDescriptonType }> {
        const description = await this.descriptionsRepository.getDesById(id);
        if (!description) {
            throw new Error('Description not found');
        }
        return { message: 'Description retrieved successfully', data: description };
    }

    async updateDesType(id: number, dto: CreateDesTypeDto): Promise<void> {
        const description = await this.descriptionsRepository.getDesById(id);
        if (!description) {
            throw new Error('Description not found');
        }
        await this.descriptionsRepository.updateDes(id, dto);
    }

    async deleteDesType(id: number): Promise<void> {
        const description = await this.descriptionsRepository.getDesById(id);
        if (!description) {
            throw new Error('Description not found');
        }
        await this.descriptionsRepository.deleteDes(id);
    }

    async createDescription(dto: CreateDescriptionDto, userId: number): Promise<{ message: string; id: number }> {
        const desType = await this.descriptionsRepository.getDesById(dto.des_id);
        if (!desType) {
            throw new NotFoundException('Description type not found');
        }
        const id = await this.descriptionsRepository.createDescription(dto, userId);
        return { message: 'Description created successfully', id };
    }

    async getDescriptions(
        page: number = 1,
        limit: number = 10,
    ): Promise<{ message: string; data: IDescription[]; total: number; currentPage: number }> {
        const { data, total } = await this.descriptionsRepository.getDescriptions(page, limit);
        return {
            message: 'Descriptions retrieved successfully',
            data,
            total,
            currentPage: page,
        };
    }

    async getDescriptionById(id: number): Promise<{ message: string; data: IDescription }> {
        const description = await this.descriptionsRepository.getDescriptionById(id);
        if (!description) {
            throw new NotFoundException('Description not found');
        }
        return { message: 'Description retrieved successfully', data: description };
    }

    async getDescriptionByDesTypeId(id: number): Promise<{ message: string; data: IDescription[] }> {
        const result = await this.descriptionsRepository.getDescriptionsByDesTypeId(id);
        if (!result.data.length) {
            throw new NotFoundException('No descriptions found for this type');
        }
        return { message: 'Descriptions retrieved successfully', data: result.data };
    }

    async updateDescription(id: number, dto: UpdateDescriptionDto): Promise<void> {
        const description = await this.descriptionsRepository.getDescriptionById(id);
        if (!description) {
            throw new NotFoundException('Description not found');
        }
        if (dto.des_id) {
            const desType = await this.descriptionsRepository.getDesById(dto.des_id);
            if (!desType) {
                throw new NotFoundException('Description type not found');
            }
        }

        await this.descriptionsRepository.updateDescription(id, dto);
    }

    async deleteDescription(id: number): Promise<void> {
        const description = await this.descriptionsRepository.getDescriptionById(id);
        if (!description) {
            throw new NotFoundException('Description not found');
        }
        await this.descriptionsRepository.deleteDescription(id);
    }
}
