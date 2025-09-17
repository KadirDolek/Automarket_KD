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

// Routes profil
Route::middleware(['auth'])->group(function () {
    Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');
});

// Catalogue public (accessible à tous)
Route::get('/catalogue', [CarController::class, 'index'])->name('cars.index');
Route::get('/cars/{car}', [CarController::class, 'show'])->name('cars.show');

// Routes voitures nécessitant une authentification
Route::middleware(['auth'])->group(function () {
    // Création de voiture - tous les utilisateurs connectés
    Route::get('/cars/create', [CarController::class, 'create'])->name('cars.create');
    Route::post('/cars', [CarController::class, 'store'])->name('cars.store');

    // Modification des voitures (gestion des permissions dans le contrôleur)
    Route::get('/cars/{car}/edit', [CarController::class, 'edit'])->name('cars.edit');
    Route::put('/cars/{car}', [CarController::class, 'update'])->name('cars.update');

    // Contacter le vendeur
    Route::post('/contact-seller/{car}', [CarController::class, 'contactSeller'])->name('cars.contact');
});

// Suppression de voiture (seuls admin et modérateur dans le contrôleur)
Route::delete('/cars/{car}', [CarController::class, 'destroy'])->middleware(['auth'])->name('cars.destroy');

// Routes admin et modérateur
Route::middleware(['auth', 'role:admin,moderateur'])->prefix('admin')->name('admin.')->group(function () {
    // Gestion des utilisateurs
    Route::resource('users', UserController::class);
    Route::put('/users/{user}/role', [UserController::class, 'updateRole'])->name('users.updateRole');

    // Gestion des marques
    Route::resource('brands', BrandController::class);
});

// Routes exclusivement admin (si vous avez des actions spécifiques aux admins)
Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    // Ajoutez ici des routes spécifiques aux admins si nécessaire
    // Par exemple : statistiques avancées, configuration système, etc.
});