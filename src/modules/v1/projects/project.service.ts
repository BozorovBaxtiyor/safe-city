import { Injectable, NotFoundException } from '@nestjs/common';
import { IOrder, IProject } from 'src/common/types/types';
import { CreateOrderDto } from './dto/create_order.dto';
import { CreateProjectDto } from './dto/create_project.dto';
import { UpdateOrderDto } from './dto/update_order.dto';
import { ProjectRepository } from './project.repository';

@Injectable()
export class ProjectService {
    constructor(private readonly projectRepository: ProjectRepository) {}

    async createProject(createProjectDto: CreateProjectDto, id: number): Promise<Partial<IProject> & { message: string }> {
        const productId = await this.projectRepository.createProject(createProjectDto, id);
        return {
            ...productId,
            message: 'Project created successfully',
        };
    }

    async getProjects(page: number = 1, limit: number = 10): Promise<{ data: Partial<IProject>[]; total: number; currentPage: number }> {
        const result = await this.projectRepository.getProjects(page, limit);
        return { data: result.data, total: result.total, currentPage: page };
    }

    async getProjectById(id: number): Promise<Partial<IProject>> {
        const project = await this.projectRepository.getProjectById(id);
        if (!project) {
            throw new NotFoundException(`Project with ID ${id} not found`);
        }
        return project;
    }

    async updateProject(id: number, dto: CreateProjectDto): Promise<{ message: string }> {
        const project = await this.projectRepository.getProjectById(id);
        if (!project) {
            throw new NotFoundException(`Project with ID ${id} not found`);
        }
        await this.projectRepository.updateProject(id, dto);
        return { message: 'Project updated successfully' };
    }

    async deleteProject(id: number): Promise<{ message: string }> {
        const project = await this.projectRepository.getProjectById(id);
        if (!project) {
            throw new NotFoundException(`Project with ID ${id} not found`);
        }
        await this.projectRepository.deleteProject(id);
        return { message: 'Project deleted successfully' };
    }

    async createOrder(createOrderDto: CreateOrderDto, userId: number): Promise<number> {
        const project = await this.projectRepository.getProjectById(createOrderDto.project_id);

        if (!project) {
            throw new NotFoundException(`Project with ID ${createOrderDto.project_id} not found`);
        }

        // const orderId = await this.projectRepository.createOrder(createOrderDto, userId);
        return this.projectRepository.createOrder(createOrderDto, userId);
    }

    async getOrdersByProject(projectId: number): Promise<Partial<IOrder>[]> {
        const project = await this.projectRepository.getProjectById(projectId);
        if (!project) {
            throw new NotFoundException(`Project with ID ${projectId} not found`);
        }
        const orders = await this.projectRepository.getOrdersByProject(projectId);
        if (!orders || orders.length === 0) {
            throw new NotFoundException(`No orders found for project with ID ${projectId}`);
        }
        return orders;
    }

    async getAllOrders(
        page: number = 1,
        limit: number = 10,
    ): Promise<{ data: Partial<IProject>[]; total: number; message: string; currentPage: number }> {
        const result = await this.projectRepository.getAllOrders(page, limit);
        return {
            message: 'Orders retrieved successfully',
            data: result.data,
            total: result.total,
            currentPage: page,
        };
    }

    async getOderById(id: number): Promise<Partial<IOrder>> {
        const order = await this.projectRepository.getOrderById(id);
        if (!order) {
            throw new NotFoundException(`Order with ID ${id} not found`);
        }
        return order;
    }

    async updateOrder(id: number, dto: UpdateOrderDto): Promise<{ message: string }> {
        const order = await this.projectRepository.getOrderById(id);
        if (!order) {
            throw new NotFoundException(`Order with ID ${id} not found`);
        }
        if (dto.project_id) {
            const project = await this.projectRepository.getProjectById(dto.project_id);
            if (!project) {
                throw new NotFoundException(`Project with ID ${dto.project_id} not found`);
            }
        }
        await this.projectRepository.updateOrder(id, dto);
        return { message: 'Order updated successfully' };
    }

    async deleteOrder(id: number): Promise<{ message: string }> {
        const order = await this.projectRepository.getOrderById(id);
        if (!order) {
            throw new NotFoundException(`Order with ID ${id} not found`);
        }
        await this.projectRepository.deleteOrder(id);
        return { message: 'Order deleted successfully' };
    }
}
