// ./src/database/seeds/v1/seed_super_admin.ts
import * as bcrypt from 'bcrypt';
import { Knex } from 'knex';
import { IUser } from '../../../common/types/types';

export async function seed(knex: Knex): Promise<void> {
    // Delete existing entries
    await knex('users').del();

    // Generate hashed password with proper error handling
    let hashedPassword: string;
    try {
        hashedPassword = await bcrypt.hash('superadmin', 10);
    } catch (err: unknown) {
        const error = err as Error;
        console.error('Error hashing password:', error.message);
        throw new Error(`Failed to hash password: ${error.message}`);
    }

    // Insert seed entries
    await knex<IUser>('users').insert([
        {
            username: 'superadmin',
            email: 'superadmin@example.com',
            password: hashedPassword,
            fullname: 'Samandar Olimov',
            roll: 'superadmin',
            region_id: 2
        },
    ]);
}
