<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\Brand;
use App\Models\Fuel;

class CarSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::where('role_id',1)->get();
        $brands= Brand::all();
        $fuels = Fuel::all();

        $cars = [
            [
                'model' => 'Clio',
                'etat' => 'occasion',
                'annee' => 2020,
                'kilometrage' => 45000,
                'abs' => true,
                'jantes' => '16',
                'sellerie' => 'Tissus',
                'couleur' => '#FF0000',
                'type' => 'BERLINE',
                'cylindree' => 1.2,
                'prix' => 14500.00,
                'description' => 'Voiture économique en excellent état, entretien à jour. Climatisation, radio CD, 5 portes. Parfait pour un usage urbain.',
                'image1_path' => 'cars/clio_1.jpg',
                'image2_path' => 'cars/clio_2.jpg',
                'image3_path' => 'cars/clio_3.jpg',
            ],
            [
                'model' => '308',
                'etat' => 'neuf',
                'annee' => 2023,
                'kilometrage' => 0,
                'abs' => true,
                'jantes' => '17',
                'sellerie' => 'Cuir',
                'couleur' => '#0000FF',
                'type' => 'BERLINE',
                'cylindree' => 1.5,
                'prix' => 28900.00,
                'description' => 'Nouveau modèle avec toutes les options, livraison immédiate. Écran tactile, GPS, caméra de recul, régulateur de vitesse.',
                'image1_path' => 'cars/clio_1.jpg',
                'image2_path' => 'cars/clio_2.jpg',
                'image3_path' => 'cars/clio_3.jpg',
            ],
            [
                'model' => 'T-Roc',
                'etat' => 'occasion',
                'annee' => 2021,
                'kilometrage' => 32000,
                'abs' => true,
                'jantes' => '18',
                'sellerie' => 'Cuir',
                'couleur' => '#00FF00',
                'type' => 'SUV',
                'cylindree' => 2,
                'prix' => 26500.00,
                'description' => 'SUV compact spacieux et confortable, idéal pour famille. Toit panoramique, sièges chauffants, radar de stationnement.',
                'image1_path' => 'cars/clio_1.jpg',
                'image2_path' => 'cars/clio_2.jpg',
                'image3_path' => 'cars/clio_3.jpg',
            ],
            [
                'model' => 'Model 3',
                'etat' => 'occasion',
                'annee' => 2022,
                'kilometrage' => 25000,
                'abs' => true,
                'jantes' => '19',
                'sellerie' => 'Cuir',
                'couleur' => '#FFFFFF',
                'type' => 'BERLINE',
                'cylindree' => null,
                'prix' => 38900.00,
                'description' => 'Voiture électrique performante, autonomie de 400km. Autopilot, superchargeur inclus, intérieur premium.',
                'image1_path' => 'cars/clio_1.jpg',
                'image2_path' => 'cars/clio_2.jpg',
                'image3_path' => 'cars/clio_3.jpg',
            ],
            [
                'model' => '3008',
                'etat' => 'occasion',
                'annee' => 2019,
                'kilometrage' => 58000,
                'abs' => true,
                'jantes' => '17',
                'sellerie' => 'Tissus',
                'couleur' => '#888888',
                'type' => 'SUV',
                'cylindree' => 1.8,
                'prix' => 21900.00,
                'description' => 'SUV familial spacieux, bon état général. Grand coffre, entretien chez concessionnaire, pneus neufs.',
                'image1_path' => 'cars/clio_1.jpg',
                'image2_path' => 'cars/clio_2.jpg',
                'image3_path' => 'cars/clio_3.jpg',
            ],
            [
                'model' => 'Twingo',
                'etat' => 'occasion',
                'annee' => 2018,
                'kilometrage' => 42000,
                'abs' => false,
                'jantes' => '16',
                'sellerie' => 'Tissus',
                'couleur' => '#FFA500',
                'type' => 'BERLINE',
                'cylindree' => 1,
                'prix' => 8900.00,
                'description' => 'Petite citadine économique, parfaite pour la ville. Consommation réduite, assurance pas chère, maniable en ville.',
                'image1_path' => 'cars/clio_1.jpg',
                'image2_path' => 'cars/clio_2.jpg',
                'image3_path' => 'cars/clio_3.jpg',
            ],
            [
                'model' => 'Kadjar',
                'etat' => 'occasion',
                'annee' => 2020,
                'kilometrage' => 38000,
                'abs' => true,
                'jantes' => '17',
                'sellerie' => 'Tissus',
                'couleur' => '#663399',
                'type' => 'SUV',
                'cylindree' => 1.5,
                'prix' => 22900.00,
                'description' => 'SUV compact confortable, faible consommation. Entretien récent, contrôle technique ok, carnet d\'entretien complet.',
                'image1_path' => 'cars/clio_1.jpg',
                'image2_path' => 'cars/clio_2.jpg',
                'image3_path' => 'cars/clio_3.jpg',
            ],
            [
                'model' => 'Zoe',
                'etat' => 'neuf',
                'annee' => 2023,
                'kilometrage' => 0,
                'abs' => true,
                'jantes' => '16',
                'sellerie' => 'Tissus',
                'couleur' => '#00FFFF',
                'type' => 'BERLINE',
                'cylindree' => null,
                'prix' => 32500.00,
                'description' => 'Citadine électrique, autonomie 350km, charge rapide. Bonus écologique inclus, garantie 7 ans, connectivité smartphone.',
                'image1_path' => 'cars/clio_1.jpg',
                'image2_path' => 'cars/clio_2.jpg',
                'image3_path' => 'cars/clio_3.jpg',
            ],
            [
                'model' => 'Captur',
                'etat' => 'occasion',
                'annee' => 2021,
                'kilometrage' => 29000,
                'abs' => true,
                'jantes' => '17',
                'sellerie' => 'Cuir',
                'couleur' => '#FF69B4',
                'type' => 'SUV',
                'cylindree' => 1.3,
                'prix' => 24500.00,
                'description' => 'SUV urbain design, intérieur personnalisable. Toit contrasté, jantes alliage, écran tactile 7 pouces.',
                'image1_path' => 'cars/clio_1.jpg',
                'image2_path' => 'cars/clio_2.jpg',
                'image3_path' => 'cars/clio_3.jpg',
            ],
            [
                'model' => 'Megane',
                'etat' => 'occasion',
                'annee' => 2022,
                'kilometrage' => 15000,
                'abs' => true,
                'jantes' => '18',
                'sellerie' => 'Cuir',
                'couleur' => '#000000',
                'type' => 'BERLINE',
                'cylindree' => 1.8,
                'prix' => 27800.00,
                'description' => 'Berline compacte récente, équipements haut de gamme. Radar de recul, régulateur adaptatif, phones LED, sellerie cuir chauffante.',
                'image1_path' => 'cars/clio_1.jpg',
                'image2_path' => 'cars/clio_2.jpg',
                'image3_path' => 'cars/clio_3.jpg',
            ]
        ];

        foreach ($cars as $voiture) {
            DB::table('cars')->insert([
                'user_id' => $users->random()->id,
                'brand_id' => $brands->random()->id,
                'fuel_id' => $fuels->random()->id,
                ...$voiture,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
