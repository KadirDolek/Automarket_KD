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
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('brand_id')->constrained()->onDelete('cascade');
            $table->foreignId('fuel_id')->constrained()->onDelete('cascade');
            $table->string('model');
            $table->enum('etat', ['neuf', 'occasion']);
            $table->year('annee');
            $table->integer('kilometrage');
            $table->boolean('abs');
            $table->string('image1_path');
            $table->string('image2_path')->nullable();
            $table->string('image3_path')->nullable();
            $table->string('image4_path')->nullable();
            $table->enum('jantes', ['16', '17', '18', '19', 'NONE']);
            $table->enum('sellerie', ['Cuir', 'Tissus']);
            $table->string('couleur', 7);
            $table->enum('type', ['4X4', 'SUV', 'BREAK', 'LUDOSPACE', 'VAN', 'BERLINE']);
            $table->enum('cylindree', ['1l', '1.2l', '1.5l', '1.8l', '2l', '3l', 'NONE']);
            $table->decimal('prix', 12, 2);
            $table->longText('description');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cars');
    }
};
