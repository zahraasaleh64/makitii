<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CategoryController extends Controller
{
    public function index()
    {
        return CategoryResource::collection(Category::orderBy('name')->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:categories,name'],
            'icon' => ['nullable', 'image', 'max:2048'],
        ]);

        $category = Category::create(['name' => $data['name']]);

        if ($request->hasFile('icon')) {
            $category->update(['icon' => $request->file('icon')->store('categories/icons', 'public')]);
        }

        return new CategoryResource($category->fresh());
    }

    public function update(Request $request, int $id)
    {
        $category = Category::findOrFail($id);

        $data = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:categories,name,'.$category->id],
            'icon' => ['nullable', 'image', 'max:2048'],
            'remove_icon' => ['nullable', 'boolean'],
        ]);

        $category->name = $data['name'];

        if ($request->hasFile('icon')) {
            if ($category->icon) {
                Storage::disk('public')->delete($category->icon);
            }
            $category->icon = $request->file('icon')->store('categories/icons', 'public');
        } elseif ($request->boolean('remove_icon') && $category->icon) {
            Storage::disk('public')->delete($category->icon);
            $category->icon = null;
        }

        $category->save();

        return new CategoryResource($category->fresh());
    }

    public function destroy(int $id)
    {
        $category = Category::findOrFail($id);

        if ($category->icon) {
            Storage::disk('public')->delete($category->icon);
        }

        $category->delete();

        return response()->json(['message' => 'Catégorie supprimée.']);
    }
}
