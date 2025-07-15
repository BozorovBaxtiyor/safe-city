import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('objects', table => {
        table.increments('id').primary();
        table.integer('project_id').references('id').inTable('projects').notNullable();
        table.integer('order_id').references('id').inTable('orders').notNullable();
        table.integer('des_type_id').references('id').inTable('descriptions_types').notNullable();
        table.integer('des_id').references('id').inTable('descriptions').notNullable();
        table.integer('region_id').references('id').inTable('regions').notNullable();
        table.integer('district_id').references('id').inTable('districts').notNullable();
        table.string('name_and_address').notNullable();
        table.string('latitude').notNullable();
        table.string('longitude').notNullable();
        table.string('ip_subnet').notNullable();
        table.string('connection_type').notNullable();
        table.string('speed').notNullable();
        table.integer('created_by').references('id').inTable('users').notNullable();
        table.integer('updated_by').references('id').inTable('users').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());

        table.index(
            ['project_id', 'order_id', 'des_type_id', 'des_id', 'region_id', 'district_id'],
            'idx_objects_project_order_des_region_district',
        );
        table.index(['name_and_address'], 'idx_objects_name_and_address');
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('objects');
}
