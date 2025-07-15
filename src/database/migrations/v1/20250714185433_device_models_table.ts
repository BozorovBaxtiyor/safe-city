import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('device_models', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.text('description').nullable();
        table.integer('device_type_id').references('id').inTable('device_types').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('device_models');
}

