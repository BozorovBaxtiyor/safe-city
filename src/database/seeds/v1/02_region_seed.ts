import { Knex } from 'knex';


export async function seed(knex: Knex): Promise<void> {
    // // Deletes ALL existing entries
    // await knex('regions').del();

    // // Inserts seed entries
    // await knex('regions').insert([
    //     { name: 'Andijon', description: 'Andijon viloyati, tarixiy va madaniy boyliklarga ega' },
    //     { name: 'Buxoro', description: 'Buxoro viloyati, boy madaniy meros va tarixiy shahar' },
    //     { name: 'Jizzax', description: "Jizzax viloyati, tog'li hudud va qishloq xo'jaligi" },
    //     {
    //         name: 'Qarshi',
    //         description: "Qashqadaryo viloyati, qishloq xo'jaligi va sanoat markazi",
    //     },
    //     {
    //         name: 'Navoiy',
    //         description: 'Navoiy viloyati, kon sanoati va tabiiy resurslar bilan mashhur',
    //     },
    //     { name: 'Namangan', description: "Namangan viloyati, qishloq xo'jaligi va savdo markazi" },
    //     { name: 'Samarqand', description: "Samarqand viloyati, O'zbekistonning tarixiy poytaxti" },
    //     {
    //         name: 'Sirdaryo',
    //         description: "Sirdaryo viloyati, daryo bo'yidagi qishloq xo'jalik viloyati",
    //     },
    //     {
    //         name: 'Toshkent',
    //         description: "Toshkent viloyati, O'zbekistonning eng yirik shahri va ma'muriy markazi",
    //     },
    //     {
    //         name: "Farg'ona",
    //         description: "Farg'ona vodiysidagi yirik sanoat va qishloq xo'jalik viloyati",
    //     },
    //     {
    //         name: 'Surxondaryo',
    //         description: "Surxondaryo viloyati, qishloq xo'jaligi va chegaraviy hudud",
    //     },
    //     { name: 'Xorazm', description: 'Xorazm viloyati, tarixiy shaharlar va qadimiy madaniyat' },
    //     { name: 'Nukus', description: "Qoraqalpog'iston Respublikasi markazi" },
    // ]);
}
