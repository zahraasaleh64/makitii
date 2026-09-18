<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            // Clé utilisée par le frontend pour choisir une icône SVG locale
            // (voir frontend/src/lib/categoryIcons.jsx), ce n'est plus une
            // image stockée sur le serveur.
            'icon' => $this->icon,
            'listings_count' => $this->when(
                $this->products_count !== null,
                fn () => (int) $this->products_count
            ),
        ];
    }
}
