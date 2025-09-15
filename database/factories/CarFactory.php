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
        $carImages = [
            'https://cdn.motor1.com/images/mgl/y2Gpjl/s3/mercedes-g-klasse-2024.jpg',
            'https://i.ytimg.com/vi/66yYFMQz71E/sddefault.jpg',
            'https://www.ferrariofcentralnj.com/imagetag/17920/main/l/Used-2024-Mercedes-Benz-G-Class-AMG-G-63-1718189556.jpg',
            'https://imagescdn.dealercarsearch.com/Media/24723/21999094/638893193459150180.jpg?auto_fix=true&quality=80&sharp_amount=false',
        ];
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
            'image1_path' => $this->faker->randomElement($carImages),
            'image2_path' => $this->faker->optional()->randomElement($carImages),
            'image3_path' => $this->faker->optional()->randomElement($carImages),
            'image4_path' => $this->faker->optional()->randomElement($carImages),
            'jantes' => $this->faker->randomElement(['16', '17', '18', '19']),
            'sellerie' => $this->faker->randomElement(['Cuir', 'Tissus']),
            'couleur' => $this->faker->hexColor,
            'type' => $this->faker->randomElement(['4X4', 'SUV', 'BREAK', 'LUDOSPACE', 'VAN', 'BERLINE']),
            'cylindree' => $fuel->name == 'Electrique' ? 'NONE' : $this->faker->randomElement(['1l', '1.2l', '1.5l', '1.8l', '2l', '3l']),
            'prix' => $this->faker->randomFloat(2, 5000, 100000),
            'description' => $this->faker->paragraph,
        ];
    }
}