<?php

namespace Database\Seeders;

use App\Models\Brand;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $brands = ['Toyota', 'Renault', 'Peugeot', 'BMW', 'Mercedes', 'Tesla'];
        foreach ($brands as $brand) {
            Brand::create(['name' => $brand]);
        }
    }
}
