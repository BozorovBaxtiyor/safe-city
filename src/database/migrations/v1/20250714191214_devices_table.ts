import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('devices', table => {
        table.increments('id').primary()
        table.integer('obeject_id').references('id').inTable('objects').notNullable();
        table.integer('device_model_id').references('id').inTable('device_models').notNullable();
        table.integer('device_type_id').references('id').inTable('device_types').notNullable();
        table.integer('created_by').references('id').inTable('users').notNullable();
        table.string('serial_number').notNullable();
        table.string('ip_address').notNullable();
        table.string('mac_address').notNullable();
        table.string('status').defaultTo('active');
        table.jsonb('extra_info').nullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('devices');
}

