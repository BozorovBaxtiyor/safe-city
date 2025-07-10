import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('districts', table => {
        table.increments('id').primary();
        table.string('name').notNullable().unique();
        table.string('description').notNullable();
        table
            .string('region_id')
            .notNullable()
            .references('id')
            .inTable('regions')
            .onDelete('CASCADE');
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('districts');
}
