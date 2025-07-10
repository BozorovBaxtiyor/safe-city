// auth.repository.ts
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectKnex, Knex } from 'nestjs-knex';
import { IUser } from 'src/common/types/types';

import { PaginationQueryUsersDto } from './dto/get-all.users.input';
import { RegisterDto } from './dto/register.dto';
import { UpdateProfileDto } from './dto/update.dto';

@Injectable()
export class AuthRepository {
    constructor(@InjectKnex() private readonly knex: Knex) {}

    async findUserByUsername(username: string): Promise<IUser | undefined> {
        return this.knex<IUser>('users').where({ username }).first();
    }

    async   findUserById(userId: number): Promise<IUser | undefined> {
        return this.knex<IUser>('users').where('id', userId).first();
    }

    async findUserByUsernameOrEmail(username: string, email: string): Promise<IUser | undefined> {
        return this.knex<IUser>('users').where({ username }).orWhere({ email }).first();
    }

    async activateUser(id: number): Promise<void> {
        await this.knex('users').where('id', id).update({ status: 'active' });
    }

    async deactivateUser(id: number): Promise<void> {
        await this.knex('users').where('id', id).update({ status: 'inactive' });
    }

    async getUsernameById(userId: number): Promise<string | null> {
        return this.knex('users').select('username').where('id', userId).first();
    }

    async deleteUser(id: number): Promise<void> {
        await this.knex('users').where('id', id).del();
    }

    async createUser(registerDto: RegisterDto, hashedPassword: string): Promise<void> {
        await this.knex<IUser>('users').insert({
            username: registerDto.username,
            email: registerDto.email,
            password: hashedPassword,
            fullname: registerDto.fullName,
            region: registerDto.region,
            roll: 'user',
        }); 
    }

    async updateUserPassword(userId: number, hashedPassword: string): Promise<void> {
        await this.knex<IUser>('users').where('id', userId).update({
            password: hashedPassword,
            updated_at: new Date(),
        });
    }

    async createPasswordHistoryEntry(userId: number, updatedById: string, reason: string): Promise<void> {
        await this.knex('passwordHistory').insert({
            userId: userId,
            updatedBy: updatedById,
            reason,
            created_at: new Date(),
            updated_at: new Date(),
        });
    }

    async updateUserProfile(updateProfileDto: UpdateProfileDto, imageFilename?: string): Promise<void> {
        const updateObject: Partial<IUser> = {
            username: updateProfileDto.username,
            fullname: updateProfileDto.fullName,
            email: updateProfileDto.email,
            updated_at: new Date(),
        };

        if (imageFilename) {
            updateObject.avatar = `profiles/${imageFilename}`;
        }

        await this.knex<IUser>('users').where('id', updateProfileDto.userId).update(updateObject);
    }

    async updatePasswordWithTransaction(userId: number, newPassword: string): Promise<void> {
        await this.knex.transaction(async trx => {
            const user = await trx<IUser>('users').where('id', userId).first();

            if (!user) {
                throw new HttpException('IUser not found', HttpStatus.NOT_FOUND);
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);

            await trx<IUser>('users').where('id', userId).update({ password: hashedPassword, updated_at: new Date() });
        });
    }

    async getUsers(query: PaginationQueryUsersDto): Promise<Partial<IUser>[]> {
        const page = query.page ?? 1;
        const limit = query.limit ?? 10;
        const skip = (page - 1) * limit;
        return this.knex<IUser>('users')
            .whereNot('roll', 'superadmin') 
            .select('id', 'fullname', 'email', 'username', 'roll')
            .limit(limit)
            .offset(skip);
    }
}
