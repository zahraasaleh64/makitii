<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\JobPostResource;
use App\Http\Resources\ProductResource;
use App\Http\Resources\StoreResource;
use App\Models\Store;
use Illuminate\Http\Request;

class StoreController extends Controller
{
    public function index(Request $request)
    {
        $query = Store::approved()
            ->with('category')
            ->withCount(['products' => fn ($q) => $q->active()]);

        if ($search = $request->query('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('city', 'like', "%{$search}%");
            });
        }

        if ($categoryId = $request->query('category_id')) {
            $query->where('category_id', $categoryId);
        }

        if ($type = $request->query('type')) {
            $query->where('type', $type);
        }

        if ($city = $request->query('city')) {
            $query->where('city', 'like', "%{$city}%");
        }

        $stores = $query->orderByDesc('created_at')->paginate(12)->withQueryString();

        return StoreResource::collection($stores);
    }

    public function show(Request $request, string $slug)
    {
        $user = auth('sanctum')->user();
        $storeUserId = Store::where('slug', $slug)->value('user_id');
        $isOwnerOrAdmin = $user && ($user->isAdmin() || $user->id === $storeUserId);

        $query = Store::with('category')->where('slug', $slug);

        if (!$isOwnerOrAdmin) {
            $query->approved();
        }

        $store = $query->firstOrFail();

        $productQuery = $store->products()->with(['category', 'images'])->orderByDesc('created_at');
        if (!$isOwnerOrAdmin) {
            $productQuery->active();
        }
        $products = $productQuery->limit(100)->get();

        $jobQuery = $store->jobPosts()->orderByDesc('created_at');
        if (!$isOwnerOrAdmin) {
            $jobQuery->active();
        }
        $jobs = $jobQuery->get();

        return response()->json([
            'store' => new StoreResource($store),
            'products' => ProductResource::collection($products),
            'jobs' => JobPostResource::collection($jobs),
        ]);
    }
}
