import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('orders', table => {
        table.increments('id').primary();
        table.string('order_number').notNullable();
        table.string('description').nullable();
        table.integer('project_id').references('id').inTable('projects').notNullable();
        table.integer('created_by').references('id').inTable('users').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('orders');
}

