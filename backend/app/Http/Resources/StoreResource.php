<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class StoreResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'type' => $this->type,
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
            'logo_url' => $this->logo_path ? Storage::disk('public')->url($this->logo_path) : null,
            'cover_url' => $this->cover_path ? Storage::disk('public')->url($this->cover_path) : null,
            'address' => $this->address,
            'city' => $this->city,
            'whatsapp_number' => $this->whatsapp_number ?: $this->phone ?: $this->user?->phone,
            'phone' => $this->phone,
            'email' => $this->email,
            'status' => $this->status,
            'rejection_reason' => $this->when($request->user()?->id === $this->user_id || $request->user()?->isAdmin(), $this->rejection_reason),
            'category' => new CategoryResource($this->whenLoaded('category')),
            'products_count' => $this->whenCounted('products'),
            'owner' => $this->whenLoaded('user', function () {
                return [
                    'id' => $this->user->id,
                    'name' => $this->user->name,
                    'email' => $this->user->email,
                    'phone' => $this->user->phone,
                ];
            }),
            'created_at' => $this->created_at,
        ];
    }
}
