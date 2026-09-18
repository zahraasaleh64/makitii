<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with(['category', 'store', 'images']);

        if ($search = $request->query('search')) {
            $query->where('name', 'like', "%{$search}%");
        }

        if ($storeId = $request->query('store_id')) {
            $query->where('store_id', $storeId);
        }

        $products = $query->orderByDesc('created_at')->paginate(20)->withQueryString();

        return ProductResource::collection($products);
    }

    public function destroy(int $id)
    {
        $product = Product::with('images')->findOrFail($id);

        foreach ($product->images as $image) {
            Storage::disk('public')->delete($image->path);
        }

        $product->delete();

        return response()->json(['message' => 'Produit supprimé.']);
    }
}
