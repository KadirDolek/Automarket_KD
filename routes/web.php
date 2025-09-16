// routes/web.php
<?php

use App\Http\Controllers\CarController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

// Inclure les routes d'authentification
require __DIR__.'/auth.php';

// Page d'accueil
Route::get('/', [HomeController::class, 'index'])->name('home');

// Route dashboard (si elle n'existe pas déjà)
Route::get('/dashboard', function () {
    return inertia('Dashboard');
})->middleware(['auth'])->name('dashboard');

// Catalogue public
Route::get('/catalogue', [CarController::class, 'index'])->name('cars.index');
Route::get('/cars/{car}', [CarController::class, 'show'])->name('cars.show');

// Routes nécessitant une authentification
Route::middleware(['auth'])->group(function () {
    // Création de voiture - accessible à ceux qui ont la permission create-cars
    Route::get('/cars/create', [CarController::class, 'create'])->middleware('can:create-cars')->name('cars.create');
    Route::post('/cars', [CarController::class, 'store'])->middleware('can:create-cars')->name('cars.store');
    
    // Contact vendeur - accessible à ceux qui ont la permission contact-seller
    Route::post('/contact-seller/{car}', [CarController::class, 'contactSeller'])->middleware('can:contact-seller')->name('cars.contact');
    
    // Suppression de voitures - accessible à ceux qui ont la permission delete-cars
    Route::delete('/cars/{car}', [CarController::class, 'destroy'])->middleware('can:delete-cars')->name('cars.destroy');
    
    // Routes admin - accessibles à ceux qui ont les permissions manage-users et manage-brands
    Route::middleware('can:manage-users')->group(function () {
        Route::get('/admin/users', [UserController::class, 'index'])->name('admin.users.index');
        Route::put('/admin/users/{user}/role', [UserController::class, 'updateRole'])->name('admin.users.updateRole');
    });
    
    Route::middleware('can:manage-brands')->group(function () {
        Route::resource('/admin/brands', BrandController::class)->except(['show']);
    });
});