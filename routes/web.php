<?php

use App\Http\Controllers\CarController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

// Inclure les routes d'authentification
require __DIR__.'/auth.php';

// Page d'accueil
Route::get('/', [HomeController::class, 'index'])->name('home');

// Route dashboard
Route::get('/dashboard', function () {
    return inertia('Dashboard');
})->middleware(['auth'])->name('dashboard');



Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');
Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');
// Catalogue public
Route::get('/catalogue', [CarController::class, 'index'])->name('cars.index');
Route::get('/cars/{car}', [CarController::class, 'show'])->name('cars.show');



// Routes nécessitant une authentification
Route::middleware(['auth'])->group(function () {

    // Création de voiture - user, moderateur, admin
    Route::get('/cars/create', [CarController::class, 'create'])->middleware('role:user,moderateur,admin')->name('cars.create');
    Route::post('/cars', [CarController::class, 'store'])->middleware('role:user,moderateur,admin')->name('cars.store');

    // Modifier les voitures (uniquement propriétaire, moderateur, admin -> géré dans CarController)
    Route::get('/cars/{car}/edit', [CarController::class, 'edit'])->name('cars.edit');
    Route::put('/cars/{car}', [CarController::class, 'update'])->name('cars.update');

    // Contacter le vendeur
    Route::post('/contact-seller/{car}', [CarController::class, 'contactSeller'])->middleware('role:user,moderateur,admin')->name('cars.contact');

    // Supprimer une voiture (moderateur, admin uniquement)
    Route::delete('/cars/{car}', [CarController::class, 'destroy'])->middleware('role:moderateur,admin')->name('cars.destroy');
});

// Routes admin
Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::resource('users', UserController::class)->except(['create', 'edit']);
    Route::get('/users/create', [UserController::class, 'create'])->name('users.create');
    Route::get('/users/{user}/edit', [UserController::class, 'edit'])->name('users.edit');
    Route::put('/users/{user}/role', [UserController::class, 'updateRole'])->name('users.updateRole');

    Route::resource('brands', BrandController::class)->except(['create', 'edit']);
    Route::get('/brands/create', [BrandController::class, 'create'])->name('brands.create');
    Route::get('/brands/{brand}/edit', [BrandController::class, 'edit'])->name('brands.edit');
});
