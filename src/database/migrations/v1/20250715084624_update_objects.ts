import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('objects', table => {
        table.string('name').nullable().defaultTo('"Xavfsiz shahar" konsepsiyasi');
        table.dropColumn('name_and_address');
        table.string('address').notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('objects', table => {
        table.dropColumn('address');
        table.string('name_and_address').notNullable();
        table.dropColumn('name');
    });
}
