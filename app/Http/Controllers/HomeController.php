<?php

namespace App\Http\Controllers;
use App\Models\Car;
use App\Models\Brand;
use App\Models\Fuel;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class HomeController extends Controller
{
    public function home() {
        $cars = Car::with(['brand', 'fuel'])->get();
        return Inertia::render('Home', compact('cars'));
    }

    public function show($id){
        $cars = Car::with(['brand', 'fuel', 'user'])->findOrFail($id);
        return Inertia::render('CarShow', compact('cars'));
    }

    public function create() {
        $brands = Brand::all(); 
        $fuels = Fuel::all();  
        
        return Inertia::render('CarCreate', [
            'brands' => $brands,
            'fuels' => $fuels
        ]);
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'brand_id' => 'required|exists:brands,id',
            'fuel_id' => 'required|exists:fuels,id',
            'model' => 'required|string|max:255',
            'etat' => 'required|in:neuf,occasion',
            'annee' => 'required|integer|min:1975|max:' . date('Y'),
            'kilometrage' => 'required|integer|min:0',
            'abs' => 'boolean',
            
            'image1_path' => 'required_without:image1_file',
            'image1_file' => 'required_without:image1_path|nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'image2_path' => 'nullable',
            'image2_file' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'image3_path' => 'nullable',
            'image3_file' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'image4_path' => 'nullable',
            'image4_file' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            
            'jantes' => 'required|in:16,17,18,19,NONE',
            'sellerie' => 'required|in:Cuir,Tissus',
            'couleur' => 'required|string|size:7|regex:/^#[0-9A-Fa-f]{6}$/',
            'type' => 'required|in:4X4,SUV,BREAK,LUDOSPACE,VAN,BERLINE',
            'cylindree' => 'required|in:1l,1.2l,1.5l,1.8l,2l,3l,NONE',
            'prix' => 'required|numeric|min:0',
            'description' => 'required|string|max:5000',
        ]);

        $fuel = Fuel::find($validated['fuel_id']);
        if ($fuel->fuel === 'Electrique' && $validated['cylindree'] !== 'NONE') {
            return back()->withErrors([
                'cylindree' => 'La cylindrée doit être NONE pour les véhicules électriques.'
            ]);
        }

        for ($i = 1; $i <= 4; $i++) {
            $fileKey = "image{$i}_file";
            $pathKey = "image{$i}_path";
            
            if ($request->hasFile($fileKey)) {
                $file = $request->file($fileKey);
                $filename = time() . '_' . $i . '_' . $file->getClientOriginalName();
                $path = $file->storeAs('cars', $filename, 'public');
                $validated[$pathKey] = Storage::url($path);
            } else if ($i === 1 && empty($validated[$pathKey])) {
                return back()->withErrors([
                    $pathKey => 'L\'image principale est obligatoire.'
                ]);
            } else if ($i > 1 && empty($validated[$pathKey])) {
                $validated[$pathKey] = null;
            }
            
            unset($validated[$fileKey]);
        }

        $validated['user_id'] = auth()->id();
        $validated['abs'] = $request->has('abs') ? 1 : 0;

        $car = Car::create($validated);

        return redirect()->route('show', $car->id)->with('success', 'Votre voiture a été ajoutée avec succès !');
    }
}
