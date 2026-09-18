<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class JobPostResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'location' => $this->location,
            'contract_type' => $this->contract_type,
            'is_active' => (bool) $this->is_active,
            'store' => new StoreResource($this->whenLoaded('store')),
            'created_at' => $this->created_at,
        ];
    }
}
