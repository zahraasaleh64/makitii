<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    /**
     * Les 12 rubriques de la place de marché Makitii.
     * La clé "icon" correspond au slug utilisé par le frontend pour choisir
     * la petite icône SVG affichée sur les cartes de catégorie (voir
     * frontend/src/lib/categoryIcons.jsx). Elle ne pointe plus vers un
     * fichier image stocké côté serveur.
     */
    public function run(): void
    {
        $categories = [
            'Véhicules' => 'vehicules',
            'Immobilier' => 'immobilier',
            'Électronique' => 'electronique',
            'Meubles & décoration' => 'meubles-decoration',
            'Emplois' => 'emplois',
            'Mode' => 'mode',
            'Enfants & bébés' => 'enfants-bebes',
            'Agriculture & animaux' => 'agriculture-animaux',
            'Sports & équipement' => 'sports-equipement',
            'Loisirs' => 'loisirs',
            'Bazar' => 'bazar',
            'Madina' => 'madina',
        ];

        $position = 0;
        foreach ($categories as $name => $iconSlug) {
            $position++;
            $category = Category::firstOrCreate(
                ['slug' => Str::slug($name)],
                ['name' => $name]
            );

            $category->update([
                'name' => $name,
                'icon' => $iconSlug,
                'position' => $position,
            ]);
        }

        // Supprime les anciennes rubriques (boutique/restaurant) qui ne font
        // plus partie de la nomenclature Makitii "annonces classées".
        $currentSlugs = array_map(fn ($name) => Str::slug($name), array_keys($categories));
        Category::whereNotIn('slug', $currentSlugs)->delete();
    }
}
