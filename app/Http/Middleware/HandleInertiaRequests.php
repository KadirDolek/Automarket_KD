<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user() ? [
                    'id' => $request->user()->id,
                    'name' => $request->user()->name,
                    'first_name' => $request->user()->first_name,
                    'email' => $request->user()->email,
                    'role' => $request->user()->role ? [
                        'id' => $request->user()->role->id,
                        'role' => $request->user()->role->role,
                    ] : null,
                ] : null,
            ],
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
            'permissions' => [
                'canCreateCar' => $request->user() ? true : false,
                'isAdmin' => $request->user()?->role?->role === 'admin',
                'isModerator' => in_array($request->user()?->role?->role, ['admin', 'moderateur']),
            ],
        ];
    }
}
