<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use App\Models\Store;

class StatsController extends Controller
{
    public function index()
    {
        return response()->json([
            'stores_total' => Store::count(),
            'stores_pending' => Store::where('status', 'pending')->count(),
            'stores_approved' => Store::where('status', 'approved')->count(),
            'stores_rejected' => Store::where('status', 'rejected')->count(),
            'products_total' => Product::count(),
            'products_active' => Product::where('is_active', true)->count(),
            'categories_total' => Category::count(),
        ]);
    }
}
