import { table } from "console";
import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('regions', table => {
        table.string('description').nullable().defaultTo(null).alter()
    });

    await knex.schema.alterTable('districts', table => {
        table.string('description').nullable().defaultTo(null).alter();
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('regions', table => {
        table.string('description').notNullable().alter();
    });

    await knex.schema.alterTable('districts', table => {
        table.string('description').notNullable().alter();
    });
}

