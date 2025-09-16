<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FuelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('fuels')->insert([
            ['fuel'=>'Essence','created_at'=>now(),'updated_at'=>now()],
            ['fuel'=>'Diesel','created_at'=>now(),'updated_at'=>now()],
            ['fuel'=>'Electrique','created_at'=>now(),'updated_at'=>now()],
        ]);
    }
}
