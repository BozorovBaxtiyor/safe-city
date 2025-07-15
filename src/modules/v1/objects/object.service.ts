import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { IObject } from 'src/common/types/types';
import { AreaRepository } from '../area/area.repository';
import { DescriptionsRepository } from '../descriptions/des.reposityory';
import { ProjectRepository } from '../projects/project.repository';
import { CreateObjectDto } from './dto/create_object';
import { GetObjectsQueryDto } from './dto/get_objects';
import { UpdateObjectDto } from './dto/update_object';
import { ObjectRepository } from './object.repository';

@Injectable()
export class ObjectService {
    constructor(
        private readonly objectRepository: ObjectRepository,
        private readonly descriptionRepo: DescriptionsRepository,
        private readonly areaRepository: AreaRepository,
        private readonly projectRepository: ProjectRepository, // Assuming you have a ProjectRepository
    ) {}

    async createObject(dto: CreateObjectDto, userId: number): Promise<{ message: string; id: number }> {
        const [validRegion, validDistrict, validProject, validOrder, validDesType, validDescription] = await Promise.all([
            this.areaRepository.getRegionById(dto.region_id),
            this.areaRepository.getDistrictById(dto.district_id),
            this.projectRepository.getProjectById(dto.project_id),
            this.projectRepository.getOrderById(dto.order_id),
            this.descriptionRepo.getDesById(dto.des_type_id),
            this.descriptionRepo.getDescriptionById(dto.des_id),
        ]);

        // Tekshiruvlar

        if (!validRegion) {
            throw new NotFoundException(`Region with ID ${dto.region_id} not found`);
        }

        if (!validDistrict) {
            throw new NotFoundException(`District with ID ${dto.district_id} not found`);
        }

        if (validDistrict.region_id !== validRegion.id) {
            throw new BadRequestException(`District with ID ${dto.district_id} does not belong to Region with ID ${dto.region_id}`);
        }

        if (!validProject) {
            throw new NotFoundException(`Project with ID ${dto.project_id} not found`);
        }

        if (!validOrder) {
            throw new NotFoundException(`Order with ID ${dto.order_id} not found`);
        }

        if (validOrder.project_id !== validProject.id) {
            throw new BadRequestException(`Order with ID ${dto.order_id} does not belong to Project with ID ${dto.project_id}`);
        }

        if (!validDesType) {
            throw new NotFoundException(`Description type with ID ${dto.des_type_id} not found`);
        }

        if (!validDescription) {
            throw new NotFoundException(`Description with ID ${dto.des_id} not found`);
        }

        if (validDesType.id !== validDescription.des_id) {
            throw new BadRequestException(`Description with ID ${dto.des_id} does not match Description type with ID ${dto.des_type_id}`);
        }

        const newObjectId = await this.objectRepository.create(dto, userId);

        return { message: 'Object created successfully', id: newObjectId };
    }

    async getObjects(query: GetObjectsQueryDto): Promise<{ message: string; data: IObject[]; total: number; CurrentPage: number }> {
        const result = await this.objectRepository.getAll(query);
        return {
            message: 'Objects retrieved successfully',
            data: result.data,
            total: result.total,
            CurrentPage: query.page || 1,
        };
    }

    async getObjectById(id: number): Promise<{ message: string; data: IObject }> {
        const object = await this.objectRepository.getById(id);
        if (!object) {
            throw new NotFoundException(`Object with ID ${id} not found`);
        }
        return { message: 'Object retrieved successfully', data: object };
    }

    async updateObject(id: number, dto: UpdateObjectDto, userId: number): Promise<void> {
        const object = await this.objectRepository.getById(id);
        if (!object) {
            throw new NotFoundException(`Object with ID ${id} not found`);
        }

        await Promise.all([
            this.validateRegionAndDistrict(dto.region_id, dto.district_id, object.region_id),
            this.validateProjectAndOrder(dto.project_id, dto.order_id, object.project_id),
            this.validateDescription(dto.des_type_id, dto.des_id, object.des_type_id),
        ]);

        await this.objectRepository.update(id, dto, userId);
    }

    async deleteObject(id: number): Promise<{ message: string }> {
        const object = await this.objectRepository.getById(id);
        if (!object) {
            throw new NotFoundException(`Object with ID ${id} not found`);
        }

        await this.objectRepository.delete(id);
        return { message: 'Object deleted successfully' };
    }

    private async validateRegionAndDistrict(
        regionId: number | undefined,
        districtId: number | undefined,
        existingRegionId?: number,
    ): Promise<void> {
        let region: any;
        let district: any;

        if (regionId && districtId) {
            [region, district] = await Promise.all([
                this.areaRepository.getRegionById(regionId),
                this.areaRepository.getDistrictById(districtId),
            ]);
        } else if (regionId) {
            region = await this.areaRepository.getRegionById(regionId);
        } else if (districtId) {
            district = await this.areaRepository.getDistrictById(districtId);
        }

        if (regionId && !region) {
            throw new NotFoundException(`Region with ID ${regionId} not found`);
        }
        if (districtId && !district) {
            throw new NotFoundException(`District with ID ${districtId} not found`);
        }

        if (districtId) {
            const compareRegionId = regionId || existingRegionId;
            if (district.region_id !== compareRegionId) {
                throw new BadRequestException(`District with ID ${districtId} does not belong to Region with ID ${compareRegionId}`);
            }
        }
    }

    private async validateProjectAndOrder(
        projectId: number | undefined,
        orderId: number | undefined,
        existingProjectId?: number,
    ): Promise<void> {
        let project: any;
        let order: any;

        if (projectId && orderId) {
            [project, order] = await Promise.all([
                this.projectRepository.getProjectById(projectId),
                this.projectRepository.getOrderById(orderId),
            ]);
        } else if (projectId) {
            project = await this.projectRepository.getProjectById(projectId);
        } else if (orderId) {
            order = await this.projectRepository.getOrderById(orderId);
        }

        if (projectId && !project) {
            throw new NotFoundException(`Project with ID ${projectId} not found`);
        }
        if (orderId && !order) {
            throw new NotFoundException(`Order with ID ${orderId} not found`);
        }

        if (orderId) {
            const compareProjectId = projectId || existingProjectId;
            if (order.project_id !== compareProjectId) {
                throw new BadRequestException(`Order with ID ${orderId} does not belong to Project with ID ${compareProjectId}`);
            }
        }
    }

    private async validateDescription(desTypeId: number | undefined, desId: number | undefined, existingDesTypeId?: number): Promise<void> {
        let desType: any;
        let description: any;

        if (desTypeId && desId) {
            [desType, description] = await Promise.all([
                this.descriptionRepo.getDesById(desTypeId),
                this.descriptionRepo.getDescriptionById(desId),
            ]);
        } else if (desTypeId) {
            desType = await this.descriptionRepo.getDesById(desTypeId);
        } else if (desId) {
            description = await this.descriptionRepo.getDescriptionById(desId);
        }

        if (desTypeId && !desType) {
            throw new NotFoundException(`Description type with ID ${desTypeId} not found`);
        }
        if (desId && !description) {
            throw new NotFoundException(`Description with ID ${desId} not found`);
        }

        if (desId) {
            const compareDesTypeId = desTypeId || existingDesTypeId;
            if (description.des_id !== compareDesTypeId) {
                throw new BadRequestException(`Description with ID ${desId} does not match Description type with ID ${compareDesTypeId}`);
            }
        }
    }
}
