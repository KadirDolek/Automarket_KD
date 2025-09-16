<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use App\Models\User;

class AuthServiceProvider extends ServiceProvider
{
    public function boot()
    {
        $this->registerPolicies();

        // Définition des Gates
        Gate::define('manage-users', function (User $user) {
            return $user->isAdmin();
        });

        Gate::define('manage-brands', function (User $user) {
            return $user->isAdmin();
        });

        Gate::define('delete-cars', function (User $user) {
            return $user->isModerator() || $user->isAdmin();
        });

        Gate::define('create-cars', function (User $user) {
            return $user->isUser() || $user->isModerator() || $user->isAdmin();
        });

        Gate::define('contact-seller', function (User $user) {
            return $user->isUser() || $user->isModerator() || $user->isAdmin();
        });
    }
}