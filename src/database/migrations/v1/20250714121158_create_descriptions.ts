import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('descriptions', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.text('description').nullable();
        table.integer('des_id').references('id').inTable('descriptions_types').notNullable();
        table.integer('created_by').references('id').inTable('users').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('descriptions');
}

