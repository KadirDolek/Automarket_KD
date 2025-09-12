<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'brand_id',
        'fuel_id',
        'model',
        'etat',
        'annee',
        'kilometrage',
        'abs',
        'image1_path',
        'image2_path',
        'image3_path',
        'image4_path',
        'jantes',
        'sellerie',
        'couleur',
        'type',
        'cylindree',
        'prix',
        'description',
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    public function fuel()
    {
        return $this->belongsTo(Fuel::class);
    }
}
