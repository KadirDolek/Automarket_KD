<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BrandSeeder extends Seeder
{
    public function run()
    {
        $brands = [
            'Renault', 'Peugeot', 'Citroën', 'Volkswagen', 'Ford', 
            'Opel', 'BMW', 'Mercedes', 'Audi', 'Toyota', 
            'Nissan', 'Hyundai', 'Kia', 'Fiat', 'Volvo',
            'Tesla', 'Mazda', 'Honda', 'Suzuki', 'Skoda'
        ];

        foreach ($brands as $brand) {
            DB::table('brands')->insert([
                'name' => $brand,
                'logo' => 'brands/' . strtolower($brand) . '.png',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}