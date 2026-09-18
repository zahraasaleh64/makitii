<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\StoreResource;
use App\Models\Store;
use Illuminate\Http\Request;

class StoreController extends Controller
{
    public function index(Request $request)
    {
        $query = Store::with(['category', 'user'])
            ->withCount('products');

        if ($status = $request->query('status')) {
            $query->where('status', $status);
        }

        if ($search = $request->query('search')) {
            $query->where('name', 'like', "%{$search}%");
        }

        $stores = $query->orderByDesc('created_at')->paginate(15)->withQueryString();

        return StoreResource::collection($stores);
    }

    public function show(int $id)
    {
        $store = Store::with(['category', 'user'])->withCount('products')->findOrFail($id);

        return new StoreResource($store);
    }

    public function approve(int $id)
    {
        $store = Store::findOrFail($id);
        $store->update(['status' => 'approved', 'rejection_reason' => null]);

        return new StoreResource($store->fresh());
    }

    public function reject(Request $request, int $id)
    {
        $data = $request->validate([
            'reason' => ['nullable', 'string', 'max:500'],
        ]);

        $store = Store::findOrFail($id);
        $store->update([
            'status' => 'rejected',
            'rejection_reason' => $data['reason'] ?? null,
        ]);

        return new StoreResource($store->fresh());
    }

    public function destroy(int $id)
    {
        $store = Store::findOrFail($id);
        $store->delete();

        return response()->json(['message' => 'Boutique supprimée.']);
    }
}
