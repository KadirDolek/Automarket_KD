<?php

namespace Database\Seeders;

use App\Models\Car;
use App\Models\Role;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
    $this->call([
        RoleSeeder::class,
        FuelSeeder::class,
        BrandSeeder::class,
        AvatarSeeder::class,
    ]);

    foreach (Role::all() as $role) {
                User::factory()->create([
                'role_id' => $role->id,
                'password' => 'password'
        ]);
    }

    Car::factory(20)->create();
}
}
