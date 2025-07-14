import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('descriptions_types', table => {
        table.increments('id').primary();
        table.string('name').notNullable()
        table.string('description').notNullable();
        table.integer('created_by').references('id').inTable('users').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('descriptions_types');
}

