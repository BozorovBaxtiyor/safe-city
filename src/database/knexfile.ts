// knexfile.ts
import * as dotenv from 'dotenv';
import type { Knex } from 'knex';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

interface ExtendedConnectionOptions extends Knex.PgConnectionConfig {
    ssl?: {
        rejectUnauthorized: boolean;
        require?: boolean;
    };
}

console.log(`Using database: ${process.env.DB_NAME}`);
console.log(`Database host: ${process.env.DB_HOST}`);
console.log(`Database port: ${process.env.DB_PORT}`);
console.log(`Database user: ${process.env.DB_USER}`);
console.log(`Environment: ${process.env.NODE_ENV}`);
console.log(`Database password: ${process.env.DB_PASSWORD ? '******' : 'not set'}`);






const knexConfig: { [key: string]: Knex.Config } = {
    development: {
        debug: true,
        client: 'pg',
        connection: {
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT || '25060', 10),
            user: process.env.DB_USER,
            password: String(process.env.DB_PASSWORD),
            database: process.env.DB_NAME,
            ssl: {
                rejectUnauthorized: false,
                require: true,
            },
        } as ExtendedConnectionOptions,
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            directory: path.resolve(process.cwd(), '../database/migrations/v1'),
            extension: 'ts',
            tableName: 'knex_migrations',
        },
        seeds: {
            directory: path.resolve(process.cwd(), '../database/seeds/v1'),
            extension: 'ts',
        },
    },
    production: {
        client: 'pg',
        connection: {
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT || '25060', 10),
            user: process.env.DB_USER,
            password: String(process.env.DB_PASSWORD),
            database: process.env.DB_NAME,
            ssl: {
                rejectUnauthorized: false,
                require: true,
            },
        } as ExtendedConnectionOptions,
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            directory: path.resolve(process.cwd(), '../database/migrations/v1'),
            extension: 'js',
            tableName: 'knex_migrations',
        },
        seeds: {
            directory: path.resolve(process.cwd(), '../database/seeds/v1'),
            extension: 'js',
        },
    },
};

export default knexConfig;
