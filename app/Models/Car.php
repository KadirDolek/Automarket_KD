<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'brand_id', 'fuel_id', 'model', 'etat', 'annee', 
        'kilometrage', 'abs', 'jantes', 'sellerie', 'couleur', 'type', 
        'cylindree', 'prix', 'description', 'image1_path', 'image2_path', 
        'image3_path', 'image4_path'
    ];

    protected $casts = [
        'abs' => 'boolean',
        'annee' => 'integer',
        'kilometrage' => 'integer',
        'prix' => 'decimal:2'
    ];

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

    //  NONE si électrique
    public function setCylindreeAttribute($value)
    {
        if ($this->fuel_id && Fuel::find($this->fuel_id)->fuel === 'Electrique') {
            $this->attributes['cylindree'] = 'NONE';
        } else {
            $this->attributes['cylindree'] = $value;
        }
    }
        
//     public function getEtatFormattedAttribute()
//     {
//         return $this->etat === 'neuf' ? 'Neuf' : 'Occasion';
//     }

//     public function getPrixFormattedAttribute()
//     {
//         return number_format($this->prix, 2, ',', ' ') . ' €';
//     }

//     public function getKilometrageFormattedAttribute()
//     {
//         return number_format($this->kilometrage, 0, '', ' ') . ' km';
//     }
}