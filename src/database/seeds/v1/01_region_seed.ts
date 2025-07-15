import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    // // Deletes ALL existing entries
    // await knex('regions').del();

    // // Inserts seed entries
    // await knex('regions').insert([
    //     { name: 'Andijon' },
    //     { name: 'Buxoro' },
    //     { name: 'Jizzax' },
    //     { name: 'Qarshi' },
    //     { name: 'Navoiy' },
    //     { name: 'Namangan' },
    //     { name: 'Samarqand' },
    //     { name: 'Sirdaryo' },
    //     { name: 'Toshkent' },
    //     { name: "Farg'ona" },
    //     { name: 'Surxondaryo' },
    //     { name: 'Xorazm' },
    //     { name: 'Nukus' },
    // ]);
}
