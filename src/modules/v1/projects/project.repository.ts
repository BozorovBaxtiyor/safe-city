import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectKnex } from 'nestjs-knex';
import { IOrder, IProject } from 'src/common/types/types';
import { CreateOrderDto } from './dto/create_order.dto';
import { CreateProjectDto } from './dto/create_project.dto';
import { UpdateOrderDto } from './dto/update_order.dto';

@Injectable()
export class ProjectRepository {
    constructor(@InjectKnex() private readonly knex: Knex) {}

    async createProject(dto: CreateProjectDto, userId: number): Promise<Partial<IProject>> {
        const [project] = await this.knex<IProject>('projects')
            .insert({ ...dto, created_by: userId })
            .returning('id');
        return project as Partial<IProject>; // Ensure the return type matches Promise<Partial<IProject>>
    }

    async getProjects(page: number, limit: number): Promise<{ data: Partial<IProject>[]; total: number }> {
        const offset = (page - 1) * limit;
        const [total] = await this.knex('projects').count('* as count');
        const projects = await this.knex<IProject>('projects')
            .join('users', 'projects.created_by', 'users.id')
            .select('projects.*', 'users.fullname as created_by')
            .limit(limit)
            .offset(offset);
        return { data: projects, total: Number(total.count) };
    }

    async getProjectById(id: number): Promise<Partial<IProject> | null> {
        const project = await this.knex<IProject>('projects').where({ id }).first();
        return project ? (project as Partial<IProject>) : null;
    }

    async updateProject(id: number, dto: CreateProjectDto): Promise<void> {
        await this.knex<IProject>('projects').where({ id }).update(dto);
    }

    async deleteProject(id: number): Promise<void> {
        await this.knex<IProject>('projects').where({ id }).del();
    }

    async createOrder(createOrderDto: CreateOrderDto, userId: number): Promise<number> {
        const [orderId] = await this.knex('orders')
            .insert({ ...createOrderDto, created_by: userId })
            .returning('id');
        return orderId.id;
    }

    async getOrdersByProject(projectId: number): Promise<Partial<IOrder>[]> {
        return this.knex<IOrder>('orders').where({ project_id: projectId }).select('id', 'order_number');
    }

    async getAllOrders(page: number, limit: number): Promise<{ data: Partial<IOrder>[]; total: number }> {
        const offset = (page - 1) * limit;
        const [total] = await this.knex('orders').count('* as count');
        const orders = await this.knex<IOrder>('orders')
            .join('projects', 'orders.project_id', 'projects.id')
            .join('users', 'orders.created_by', 'users.id')
            .select('orders.*', 'projects.name as project_name', 'users.fullname as created_by')
            .limit(limit)
            .offset(offset);
        return { data: orders, total: Number(total.count) };
    }

    async getOrderById(id: number): Promise<Partial<IOrder> | null> {
        const order = await this.knex<IOrder>('orders')
            .where('orders.id', id)
            .join('projects', 'orders.project_id', 'projects.id')
            .join('users', 'orders.created_by', 'users.id')
            .select('orders.*', 'projects.name as project_name', 'users.fullname as created_by')
            .first();
        return order ? (order as Partial<IOrder>) : null;
    }

    async updateOrder(id: number, dto: UpdateOrderDto): Promise<void> {
        await this.knex<IOrder>('orders').where({ id }).update(dto);
    }

    async deleteOrder(id: number): Promise<void> {
        await this.knex<IOrder>('orders').where({ id }).del();
    }
}
