<?php

namespace Database\Factories;

use App\Models\Car;
use App\Models\User;
use App\Models\Brand;
use App\Models\Fuel;
use Illuminate\Database\Eloquent\Factories\Factory;

class CarFactory extends Factory
{
    protected $model = Car::class;

    public function definition()
    {
        $fuel = Fuel::inRandomOrder()->first();
        return [
            'user_id' => User::inRandomOrder()->first()->id,
            'brand_id' => Brand::inRandomOrder()->first()->id,
            'fuel_id' => $fuel->id,
            'model' => $this->faker->word,
            'etat' => $this->faker->randomElement(['neuf', 'occasion']),
            'annee' => $this->faker->numberBetween(1975, date('Y')),
            'kilometrage' => $this->faker->numberBetween(0, 300000),
            'abs' => $this->faker->boolean,
            'image1_path' => $this->faker->imageUrl(),
            'image2_path' => $this->faker->optional()->imageUrl(),
            'image3_path' => $this->faker->optional()->imageUrl(),
            'image4_path' => $this->faker->optional()->imageUrl(),
            'jantes' => $this->faker->randomElement(['16', '17', '18', '19', 'NONE']),
            'sellerie' => $this->faker->randomElement(['Cuir', 'Tissus']),
            'couleur' => $this->faker->hexColor,
            'type' => $this->faker->randomElement(['4X4', 'SUV', 'BREAK', 'LUDOSPACE', 'VAN', 'BERLINE']),
            'cylindree' => $fuel->name === 'Electrique' ? 'NONE' : $this->faker->randomElement(['1l', '1.2l', '1.5l', '1.8l', '2l', '3l']),
            'prix' => $this->faker->randomFloat(2, 5000, 100000),
            'description' => $this->faker->paragraph,
        ];
    }
}