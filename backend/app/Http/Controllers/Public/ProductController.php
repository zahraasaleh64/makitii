<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::active()
            ->whereHas('store', fn ($q) => $q->approved())
            ->with(['category', 'store.category', 'images']);

        if ($search = $request->query('search')) {
            $query->where('name', 'like', "%{$search}%");
        }

        if ($categoryId = $request->query('category_id')) {
            $query->where('category_id', $categoryId);
        }

        if ($storeId = $request->query('store_id')) {
            $query->where('store_id', $storeId);
        }

        if ($type = $request->query('type')) {
            $query->where('type', $type);
        }

        if ($condition = $request->query('condition')) {
            $query->where('condition', $condition);
        }

        if ($request->boolean('featured')) {
            $query->featured();
        }

        $products = $query->orderByDesc('featured')->orderByDesc('created_at')->paginate(12)->withQueryString();

        return ProductResource::collection($products);
    }

    public function show(int $id)
    {
        $product = Product::active()
            ->whereHas('store', fn ($q) => $q->approved())
            ->with(['category', 'store.category', 'images'])
            ->findOrFail($id);

        return new ProductResource($product);
    }
}
