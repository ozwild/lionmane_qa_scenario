<?php

use Illuminate\Database\Seeder;

class TestDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = \Faker\Factory::create();
        $now = \Carbon\Carbon::now();

        $data = collect()->pad(76, null)
            ->map(function () use ($faker, $now) {
                return [
                    "first_name" => $faker->firstName,
                    "last_name" => $faker->lastName,
                    "birth_date" => $faker->dateTimeBetween('-50 years', 'now'),
                    "email" => $faker->email,
                    "telephone_1" => $faker->phoneNumber,
                    "telephone_2" => $faker->phoneNumber,
                    "telephone_3" => $faker->phoneNumber,
                    "created_at" => $now,
                    "updated_at" => $now,
                ];
            });

        DB::table('contacts')
            ->insert($data->toArray());

    }
}
