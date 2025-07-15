import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("users", (table) => {
        table.increments("id").primary();
        table.string("username").notNullable().unique();
        table.string("email").notNullable().unique();
        table.string('fullname').notNullable()
        table.string("password").notNullable();
        table.string("roll").notNullable().defaultTo("user");
        table.integer('region_id').notNullable().references('id').inTable('regions');
        table.string("avatar").defaultTo(null)
        table.timestamps(true, true);
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("users");
}

