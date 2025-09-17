<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BrandController extends Controller
{
    public function __construct()
    {
        // Les permissions sont déjà gérées par le middleware 'role:admin,moderateur' dans web.php
    }

    public function index()
    {
        $brands = Brand::withCount('cars')->paginate(10);
        
        return Inertia::render('Admin/Brands/Index', [
            'brands' => $brands
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Brands/Create');
    }

    public function show(Brand $brand)
    {
        $brand->load('cars');
        
        return Inertia::render('Admin/Brands/Show', [
            'brand' => $brand
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:brands',
            'logo' => 'nullable|image|max:2048'
        ]);
        
        if ($request->hasFile('logo')) {
            $validated['logo'] = $request->file('logo')->store('brands', 'public');
        }
        
        Brand::create($validated);
        
        return redirect()->route('admin.brands.index')
            ->with('success', 'Marque créée avec succès.');
    }

    public function edit(Brand $brand)
    {
        return Inertia::render('Admin/Brands/Edit', [
            'brand' => $brand
        ]);
    }

    public function update(Request $request, Brand $brand)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:brands,name,' . $brand->id,
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);

        if ($request->hasFile('logo')) {
            if ($brand->logo && Storage::exists($brand->logo)) {
                Storage::delete($brand->logo);
            }
            $validated['logo'] = $request->file('logo')->store('brands', 'public');
        } elseif ($request->has('remove_logo')) {
            if ($brand->logo && Storage::exists($brand->logo)) {
                Storage::delete($brand->logo);
            }
            $validated['logo'] = null;
        }

        $brand->update($validated);

        return redirect()->route('admin.brands.index')
            ->with('success', 'Marque mise à jour avec succès.');
    }

    public function destroy(Brand $brand)
    {
        if ($brand->cars()->count() > 0) {
            return redirect()->route('admin.brands.index')
                ->with('error', 'Impossible de supprimer cette marque car elle est associée à des véhicules.');
        }

        if ($brand->logo && Storage::exists($brand->logo)) {
            Storage::delete($brand->logo);
        }

        $brand->delete();

        return redirect()->route('admin.brands.index')
            ->with('success', 'Marque supprimée avec succès.');
    }
}