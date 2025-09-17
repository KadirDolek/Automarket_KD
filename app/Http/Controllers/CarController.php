<?php

namespace App\Http\Controllers;

use App\Models\Car;
use App\Models\Brand;
use App\Models\Fuel;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Http\Request;

class CarController extends Controller
{
    public function __construct()
    {
        // Les permissions sont gérées dans web.php et dans les méthodes individuelles
        // Pas besoin de middleware ici car déjà défini dans les routes
    }

    public function index(Request $request)
    {
        $query = Car::with(['brand', 'fuel', 'user']);
        
        // Filtres non cumulatifs (un seul filtre actif à la fois)
        if ($request->has('brand')) {
            $query->whereHas('brand', function($q) use ($request) {
                $q->where('name', $request->brand);
            });
        } elseif ($request->has('fuel')) {
            $query->whereHas('fuel', function($q) use ($request) {
                $q->where('fuel', $request->fuel);
            });
        } elseif ($request->has('type')) {
            $query->where('type', $request->type);
        } elseif ($request->has('etat')) {
            $query->where('etat', $request->etat);
        } elseif ($request->has('min_price')) {
            $query->where('prix', '>=', $request->min_price);
        } elseif ($request->has('max_price')) {
            $query->where('prix', '<=', $request->max_price);
        }
        
        $cars = $query->latest()->paginate(12);
        
        $brands = Brand::all();
        $fuels = Fuel::all();
        $types = ['4X4', 'SUV', 'BREAK', 'LUDOSPACE', 'VAN', 'BERLINE'];
        $etats = ['neuf', 'occasion'];
        
        return Inertia::render('Catalogue', [
            'cars' => $cars,
            'brands' => $brands,
            'fuels' => $fuels,
            'types' => $types,
            'etats' => $etats,
            'filters' => $request->all()
        ]);
    }

    public function show(Car $car)
    {
        $car->load(['brand', 'fuel', 'user']);
        
        $annualRate = 0.03;
        $monthlyRate = $annualRate / 12;
        $numberOfPayments = 60;
        $monthlyPayment = $car->prix * $monthlyRate / (1 - pow(1 + $monthlyRate, -$numberOfPayments));
        
        return Inertia::render('Cars/Show', [
            'car' => $car,
            'monthlyPayment' => round($monthlyPayment, 2)
        ]);
    }

    public function create()
    {
        $brands = Brand::all();
        $fuels = Fuel::all();
        $types = ['4X4', 'SUV', 'BREAK', 'LUDOSPACE', 'VAN', 'BERLINE'];
        $etats = ['neuf', 'occasion'];
        $jantes = ['16', '17', '18', '19', 'NONE'];
        $selleries = ['Cuir', 'Tissus'];
        $cylindrees = ['1l', '1.2l', '1.5l', '1.8l', '2l', '3l', 'NONE'];

        return Inertia::render('Cars/Create', compact('brands','fuels','types','etats','jantes','selleries','cylindrees'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'brand_id' => 'required|exists:brands,id',
            'fuel_id' => 'required|exists:fuels,id',
            'model' => 'required|string|max:255',
            'etat' => 'required|in:neuf,occasion',
            'annee' => 'required|integer|between:1975,'.date('Y'),
            'kilometrage' => 'required|integer|min:0',
            'abs' => 'boolean',
            'jantes' => 'required|in:16,17,18,19,NONE',
            'sellerie' => 'required|in:Cuir,Tissus',
            'couleur' => 'required|string|max:7',
            'type' => 'required|in:4X4,SUV,BREAK,LUDOSPACE,VAN,BERLINE',
            'cylindree' => 'required|numeric|in:1,1.2,1.5,1.8,2,3',
            'prix' => 'required|numeric|min:0',
            'description' => 'required|string',
            'image1_path' => 'required|image|max:2048',
            'image2_path' => 'nullable|image|max:2048',
            'image3_path' => 'nullable|image|max:2048',
            'image4_path' => 'nullable|image|max:2048',
        ]);
        
        $imagePaths = [];
        for ($i = 1; $i <= 4; $i++) {
            if ($request->hasFile("image{$i}_path")) {
                $imagePaths["image{$i}_path"] = $request->file("image{$i}_path")->store('cars', 'public');
            }
        }
        
        $car = Car::create(array_merge($validated, [
            'user_id' => auth()->id(),
        ], $imagePaths));
        
        return redirect()->route('cars.show', $car)->with('success', 'Véhicule ajouté avec succès!');
    }

    public function edit(Car $car)
    {
        // Vérifier que l'utilisateur peut modifier cette voiture
        if (!$this->canEditCar($car)) {
            abort(403, 'Action non autorisée.');
        }
        
        $brands = Brand::all();
        $fuels = Fuel::all();
        $types = ['4X4', 'SUV', 'BREAK', 'LUDOSPACE', 'VAN', 'BERLINE'];
        $etats = ['neuf', 'occasion'];
        $jantes = ['16', '17', '18', '19', 'NONE'];
        $selleries = ['Cuir', 'Tissus'];
        $cylindrees = ['1l', '1.2l', '1.5l', '1.8l', '2l', '3l', 'NONE'];
        
        return Inertia::render('Cars/Edit', [
            'car' => $car->load(['brand', 'fuel']),
            'brands' => $brands,
            'fuels' => $fuels,
            'types' => $types,
            'etats' => $etats,
            'jantes' => $jantes,
            'selleries' => $selleries,
            'cylindrees' => $cylindrees
        ]);
    }

    public function update(Request $request, Car $car)
    {
        // Vérifier que l'utilisateur peut modifier cette voiture
        if (!$this->canEditCar($car)) {
            abort(403, 'Action non autorisée.');
        }
        
        $validated = $request->validate([
            'brand_id' => 'required|exists:brands,id',
            'fuel_id' => 'required|exists:fuels,id',
            'model' => 'required|string|max:255',
            'etat' => 'required|in:neuf,occasion',
            'annee' => 'required|integer|between:1975,'.date('Y'),
            'kilometrage' => 'required|integer|min:0',
            'abs' => 'boolean',
            'jantes' => 'required|in:16,17,18,19,NONE',
            'sellerie' => 'required|in:Cuir,Tissus',
            'couleur' => 'required|string|max:7',
            'type' => 'required|in:4X4,SUV,BREAK,LUDOSPACE,VAN,BERLINE',
            'cylindree' => 'required|numeric|in:1,1.2,1.5,1.8,2,3',
            'prix' => 'required|numeric|min:0',
            'description' => 'required|string',
            'image1_path' => 'nullable|image|max:2048',
            'image2_path' => 'nullable|image|max:2048',
            'image3_path' => 'nullable|image|max:2048',
            'image4_path' => 'nullable|image|max:2048',
        ]);
        
        $imagePaths = [];
        for ($i = 1; $i <= 4; $i++) {
            if ($request->hasFile("image{$i}_path")) {
                if ($car->{"image{$i}_path"}) {
                    Storage::disk('public')->delete($car->{"image{$i}_path"});
                }
                $imagePaths["image{$i}_path"] = $request->file("image{$i}_path")->store('cars', 'public');
            }
        }
        
        $car->update(array_merge($validated, $imagePaths));
        
        return redirect()->route('cars.show', $car)->with('success', 'Véhicule modifié avec succès!');
    }

    public function destroy(Car $car)
    {
        // Vérifier que seuls admin et modérateur peuvent supprimer
        $user = auth()->user();
        if (!$user->isAdmin() && !$user->isModerator()) {
            abort(403, 'Action non autorisée.');
        }
        
        $car->delete();
        
        return redirect()->route('cars.index')->with('success', 'Véhicule supprimé avec succès.');
    }

    public function contactSeller(Car $car, Request $request)
    {
        $validated = $request->validate([
            'message' => 'required|string|min:10|max:1000'
        ]);
        
        // logique mail
        // Mail::to($car->user->email)->send(new ContactSellerMail(auth()->user(), $car, $validated['message']));
        
        return back()->with('success', 'Votre message a été envoyé au vendeur.');
    }

    /**
     * Vérifier si l'utilisateur peut modifier la voiture
     */
    private function canEditCar(Car $car)
    {
        $user = auth()->user();
        
        // Si c'est le propriétaire de la voiture
        if ($car->user_id === $user->id) {
            return true;
        }
        
        // Si c'est un admin ou modérateur
        if ($user->isAdmin() || $user->isModerator()) {
            return true;
        }
        
        return false;
    }
}