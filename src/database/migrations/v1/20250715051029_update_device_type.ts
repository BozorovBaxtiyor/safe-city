import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('device_types', table => {
        table.integer('created_by').references('id').inTable('users').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });

    await knex.schema.alterTable('device_models', table => {
        table.integer('created_by').references('id').inTable('users').notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('device_types', table => {
        table.dropColumn('created_by');
        table.dropColumn('created_at');
        table.dropColumn('updated_at');
    });

    await knex.schema.alterTable('device_models', table => {
        table.dropColumn('created_by');
    });
}
