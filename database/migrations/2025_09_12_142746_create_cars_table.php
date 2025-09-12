<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cars', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('brand_id')->constrained('brands');
            $table->foreignId('fuel_id')->constrained('fuels');
            $table->string('model');
            $table->enum('etat',['neuf','occasion']);
            $table->year('annee');
            $table->integer('kilometrage');
            $table->boolean('abs')->default(false);
            $table->enum('jantes', ['16', '17', '18', '19', 'NONE'])->default('NONE');
            $table->enum('sellerie', ['Cuir', 'Tissus']);
            $table->string('couleur', 7);
            $table->enum('type', ['4X4', 'SUV', 'BREAK', 'LUDOSPACE', 'VAN', 'BERLINE']);
            $table->enum('cylindree', ['1l', '1.2l', '1.5l', '1.8l', '2l', '3l', 'NONE'])->default('NONE');
            $table->decimal('prix', 12, 2);
            $table->text('description');
            $table->string('image1_path');
            $table->string('image2_path')->nullable();
            $table->string('image3_path')->nullable();
            $table->string('image4_path')->nullable();
            $table->timestamps();
        });

        // Ajout de la contrainte CHECK après création de la table
        DB::statement('ALTER TABLE cars ADD CONSTRAINT check_cars_annee CHECK (annee BETWEEN 1975 AND YEAR(CURDATE()))');
   
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {   
        DB::statement('ALTER TABLE cars DROP CONSTRAINT IF EXISTS check_cars_annee');
        Schema::dropIfExists('cars');
    }
};
