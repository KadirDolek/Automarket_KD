<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DashboardController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Mail;
use App\Mail\DemoMail;
use Inertia\Inertia;

Route::get('/Welcome', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');


Route::get('/mail-test', function () {
    Mail::to('bataganiramani@gmail.com')->send(new DemoMail());
    return 'Mail envoyé.';
})->name('mail');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    Route::get('/create', [HomeController::class, 'carCreate'])->name('create');
    Route::post('/store', [HomeController::class, 'store'])->name('store');
    Route::get('/edit/{id}', [HomeController::class, 'carEdit'])->name('carEdit');
    Route::put('/update/{id}', [HomeController::class, 'carUpdate'])->name('carUpdate');
    Route::delete('/delete/{id}', [HomeController::class, 'carDestroy'])->name('carDestroy');
});

Route::middleware('auth')->prefix('admin')->name('admin.')->group(function () {
    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    Route::get('/users/{id}/edit', [UserController::class, 'edit'])->name('users.edit');
    Route::put('/users/{id}', [UserController::class, 'update'])->name('users.update');
});

Route::get('/',[HomeController::class, 'home'])->name('home');
Route::get('/home/{id}', [HomeController::class, 'show'])->name('show');

require __DIR__.'/auth.php';
