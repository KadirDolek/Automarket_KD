<?php

namespace Database\Seeders;

use App\Models\Brand;
use Illuminate\Database\Seeder;

class BrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $brands = [
            [
                'name' => 'Toyota',
                'logo' => 'https://images.seeklogo.com/logo-png/17/1/toyota-logo-png_seeklogo-171947.png',
            ],
            [
                'name' => 'Renault',
                'logo' => 'https://lemag.gueudet.fr/wp-content/uploads/gueudet/2023/07/Losange-logo-Renault-e1688320058225.jpg',
            ],
            [
                'name' => 'Peugeot',
                'logo' => 'https://static.vecteezy.com/system/resources/previews/020/499/892/non_2x/peugeot-brand-logo-car-symbol-black-design-french-automobile-illustration-free-vector.jpg',
            ],
            [
                'name' => 'BMW',
                'logo' => 'https://images.seeklogo.com/logo-png/24/2/bmw-logo-png_seeklogo-240426.png',
            ],
            [
                'name' => 'Mercedes',
                'logo' => 'https://images.seeklogo.com/logo-png/33/2/mercedes-benz-logo-png_seeklogo-332844.png',
            ],
            [
                'name' => 'Tesla',
                'logo' => 'https://cdn-s-www.lalsace.fr/images/75470FF1-1B19-498F-A027-CB1B16054B35/NW_raw/le-logo-tesla-evoque-une-coupe-de-moteu-electrique-1651236118.jpg',
            ],
        ];

        foreach ($brands as $brand) {
            Brand::create($brand);
        }
    }
}