<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\JobPost;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\Store;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DemoSeeder extends Seeder
{
    public function run(): void
    {
        $categoryByName = fn (string $name) => Category::where('name', $name)->first()?->id;

        $stores = [
            [
                'imageSlug' => 'mariam',
                'categorySlug' => 'restaurants',
                'owner' => ['name' => 'Mariam Diallo', 'email' => 'mariam@makitii.com'],
                'store' => [
                    'name' => 'Chez Mariam Restaurant',
                    'category' => 'Bazar',
                    'type' => 'business',
                    'city' => 'Conakry',
                    'address' => 'Quartier Kaloum, Conakry',
                    'whatsapp_number' => '+224620111222',
                    'description' => "Cuisine guinéenne traditionnelle faite maison : riz gras, sauce arachide, poulet braisé et bien plus. Livraison rapide sur Conakry.",
                    'status' => 'approved',
                ],
                'products' => [
                    ['name' => 'Riz gras au poulet', 'price' => 45000, 'type' => 'product', 'description' => "Riz gras généreux servi avec un demi-poulet braisé et légumes frais."],
                    ['name' => 'Sauce arachide + riz blanc', 'price' => 35000, 'type' => 'product', 'description' => "Sauce arachide onctueuse à la viande de bœuf, accompagnée de riz blanc."],
                    ['name' => 'Brochettes de bœuf (x6)', 'price' => 30000, 'type' => 'product', 'description' => "Brochettes de bœuf marinées, grillées au feu de bois, servies avec oignons et piment."],
                    ['name' => 'Jus de bissap frais 1L', 'price' => 15000, 'type' => 'product', 'description' => "Jus de bissap naturel, rafraîchissant et peu sucré."],
                    ['name' => 'Service Traiteur pour Cérémonies & Mariages', 'price' => 2500000, 'type' => 'service', 'description' => "Buffet complet, cuisine traditionnelle sur place ou livrée avec service pour tous vos événements."],
                ],
                'jobs' => [
                    [
                        'title' => 'Cuisinier spécialisé cuisine locale',
                        'contract_type' => 'CDI',
                        'location' => 'Kaloum, Conakry',
                        'description' => 'Restaurant réputé à Kaloum recrute un chef cuisinier passionné par les plats locaux guinéens (sauce feuille, riz gras, poulet braisé).',
                    ],
                    [
                        'title' => 'Livreur Moto express',
                        'contract_type' => 'Temps plein',
                        'location' => 'Conakry',
                        'description' => 'Recherche livreur sérieux et ponctuel doté d’un permis moto valide pour assurer les livraisons à domicile.',
                    ],
                ],
            ],
            [
                'imageSlug' => 'bah-mode',
                'categorySlug' => 'mode-vetements',
                'owner' => ['name' => 'Ibrahima Bah', 'email' => 'ibrahima@makitii.com'],
                'store' => [
                    'name' => 'Bah Mode & Style',
                    'category' => 'Mode',
                    'type' => 'business',
                    'city' => 'Conakry',
                    'address' => 'Marché Madina, Conakry',
                    'whatsapp_number' => '+224622333444',
                    'description' => "Vêtements homme et femme, dernières tendances et tissus africains de qualité. Livraison partout en Guinée.",
                    'status' => 'approved',
                ],
                'products' => [
                    ['name' => 'Ensemble bazin brodé homme', 'price' => 350000, 'type' => 'product', 'description' => "Ensemble bazin riche brodé à la main, disponible en plusieurs coloris et tailles."],
                    ['name' => 'Robe wax femme', 'price' => 180000, 'type' => 'product', 'description' => "Robe en tissu wax, coupe moderne et élégante, taille sur mesure disponible."],
                    ['name' => 'Chemise slim fit homme', 'price' => 95000, 'type' => 'product', 'description' => "Chemise slim fit en coton, idéale pour le bureau ou les sorties."],
                    ['name' => 'Foulard en soie imprimé', 'price' => 45000, 'type' => 'product', 'description' => "Foulard léger en soie avec motifs colorés."],
                    ['name' => 'Sac à main similicuir', 'price' => 120000, 'type' => 'product', 'description' => "Sac à main tendance, plusieurs compartiments, bandoulière ajustable."],
                    ['name' => 'Couture sur mesure Bazin & Wax', 'price' => 150000, 'type' => 'service', 'description' => "Service de retouche et confection sur-mesure de tenues traditionnelles et modernes avec vos tissus."],
                ],
                'jobs' => [
                    [
                        'title' => 'Tailleur / Modéliste Bazin & Wax',
                        'contract_type' => 'CDD',
                        'location' => 'Madina, Conakry',
                        'description' => 'Atelier de couture recherche un tailleur expérimenté pour coupe, couture et finitions de vêtements hommes et femmes.',
                    ],
                ],
            ],
            [
                'imageSlug' => 'camara-electro',
                'categorySlug' => 'electronique',
                'owner' => ['name' => 'Fatoumata Camara', 'email' => 'fatoumata@makitii.com'],
                'store' => [
                    'name' => 'Camara Electro Plus',
                    'category' => 'Électronique',
                    'type' => 'business',
                    'city' => 'Conakry',
                    'address' => 'Avenue de la République, Conakry',
                    'whatsapp_number' => '+224625555666',
                    'description' => "Smartphones, accessoires et petit électroménager neufs et garantis. Traitement et livraison express.",
                    'status' => 'approved',
                ],
                'products' => [
                    ['name' => 'Smartphone Galaxy A15 128Go', 'price' => 1450000, 'type' => 'product', 'description' => "Smartphone récent, 128 Go de stockage, double SIM, garantie 12 mois."],
                    ['name' => 'Écouteurs sans fil Bluetooth', 'price' => 180000, 'type' => 'product', 'description' => "Écouteurs sans fil avec réduction de bruit, autonomie 20h."],
                    ['name' => 'Power bank 20000mAh', 'price' => 165000, 'type' => 'product', 'description' => "Batterie externe haute capacité, charge rapide, deux ports USB."],
                    ['name' => 'Fer à repasser à vapeur', 'price' => 220000, 'type' => 'product', 'description' => "Fer à repasser à vapeur, semelle céramique, 1800W."],
                    ['name' => 'Réparation & Changement d’Écran Smartphone', 'price' => 120000, 'type' => 'service', 'description' => "Diagnostic et réparation express d'écrans cassés, connecteurs de charge et batteries toutes marques."],
                ],
                'jobs' => [
                    [
                        'title' => 'Technicien Réparation Mobile & Informatique',
                        'contract_type' => 'CDI',
                        'location' => 'Kaloum, Conakry',
                        'description' => 'Boutique informatique recrute technicien qualifié pour le diagnostic et dépannage matériel de téléphones et PC.',
                    ],
                ],
            ],
            [
                'imageSlug' => 'traore-meubles',
                'categorySlug' => 'meubles-deco',
                'owner' => ['name' => 'Sékou Traoré', 'email' => 'sekou@makitii.com'],
                'store' => [
                    'name' => 'Traoré Meubles & Déco',
                    'category' => 'Meubles & décoration',
                    'type' => 'business',
                    'city' => 'Kindia',
                    'address' => 'Route Nationale, Kindia',
                    'whatsapp_number' => '+224628777888',
                    'description' => "Meubles sur mesure et articles de décoration pour la maison. Fabrication locale et livraison régionale.",
                    'status' => 'approved',
                ],
                'products' => [
                    ['name' => 'Canapé 3 places en tissu', 'price' => 2200000, 'type' => 'product', 'description' => "Canapé confortable 3 places, tissu résistant, plusieurs coloris disponibles."],
                    ['name' => 'Table basse en bois massif', 'price' => 650000, 'type' => 'product', 'description' => "Table basse artisanale en bois massif, finition vernie."],
                    ['name' => 'Lampe de chevet design', 'price' => 85000, 'type' => 'product', 'description' => "Lampe de chevet moderne avec abat-jour en tissu."],
                    ['name' => 'Conception & Montage de Meubles sur Mesure', 'price' => 450000, 'type' => 'service', 'description' => "Fabrication sur plan de dressings, cuisines équipées et bibliothèques sur mesure."],
                ],
                'jobs' => [
                    [
                        'title' => 'Menuisier Ébéniste d’atelier',
                        'contract_type' => 'CDI',
                        'location' => 'Kindia',
                        'description' => 'Menuiserie artisanale recherche un menuisier confirmé pour la fabrication et la pose de mobilier haut de gamme.',
                    ],
                ],
            ],
            [
                'imageSlug' => 'camara-electro',
                'categorySlug' => 'electronique',
                'owner' => ['name' => 'Amadou Kaba', 'email' => 'amadou.kaba@makitii.com'],
                'store' => [
                    'name' => 'Kaba Freelance & Design',
                    'category' => 'Électronique',
                    'type' => 'individual',
                    'city' => 'Conakry',
                    'address' => 'Kipé, Ratoma, Conakry',
                    'whatsapp_number' => '+224624112233',
                    'description' => "Graphiste & Développeur web freelance. Création de logos, identités visuelles, sites web et gestion de réseaux sociaux.",
                    'status' => 'approved',
                ],
                'products' => [
                    ['name' => 'Création de Logo & Charte Graphique', 'price' => 250000, 'type' => 'service', 'description' => "Design de logo unique et professionnel, fourni avec palette de couleurs, typographies et fichiers haute résolution."],
                    ['name' => 'Développement de Site Web Vitrine', 'price' => 1200000, 'type' => 'service', 'description' => "Site web moderne, responsive et rapide pour promouvoir votre entreprise ou activité professionnelle."],
                    ['name' => 'Pack Visuels Réseaux Sociaux (10 Affiches)', 'price' => 350000, 'type' => 'service', 'description' => "Conception de 10 affiches et bannières promotionnelles adaptées à Facebook, Instagram et WhatsApp."],
                ],
                'jobs' => [],
            ],
            [
                'imageSlug' => 'sow-beaute',
                'categorySlug' => 'beaute-cosmetiques',
                'owner' => ['name' => 'Aissatou Sow', 'email' => 'aissatou@makitii.com'],
                'store' => [
                    'name' => 'Sow Beauté Naturelle',
                    'category' => 'Madina',
                    'type' => 'business',
                    'city' => 'Conakry',
                    'address' => 'Ratoma, Conakry',
                    'whatsapp_number' => '+224629999000',
                    'description' => "Produits de beauté et soins naturels pour la peau et les cheveux. Conseils personnalisés par WhatsApp.",
                    'status' => 'pending',
                ],
                'products' => [
                    ['name' => 'Beurre de karité pur 500g', 'price' => 40000, 'type' => 'product', 'description' => "Beurre de karité 100% naturel, non raffiné, pour peau et cheveux."],
                    ['name' => 'Huile de coco vierge 250ml', 'price' => 30000, 'type' => 'product', 'description' => "Huile de coco pressée à froid, idéale pour le soin des cheveux."],
                ],
                'jobs' => [],
            ],
            [
                'imageSlug' => 'barry-chaussures',
                'categorySlug' => 'chaussures',
                'owner' => ['name' => 'Alpha Condé Barry', 'email' => 'alpha.barry@makitii.com'],
                'store' => [
                    'name' => 'Barry Chaussures Import',
                    'category' => 'Mode',
                    'type' => 'business',
                    'city' => 'Labé',
                    'address' => 'Centre-ville, Labé',
                    'whatsapp_number' => '+224621444555',
                    'description' => "Chaussures importées pour homme, femme et enfant à prix imbattables.",
                    'status' => 'rejected',
                    'rejection_reason' => 'Informations de contact incomplètes, merci de renseigner un numéro WhatsApp valide et une adresse précise.',
                ],
                'products' => [
                    ['name' => 'Baskets homme running', 'price' => 210000, 'type' => 'product', 'description' => "Baskets légères et confortables pour le sport ou le quotidien."],
                ],
                'jobs' => [],
            ],
        ];

        foreach ($stores as $entry) {
            $user = User::firstOrCreate(
                ['email' => $entry['owner']['email']],
                [
                    'name' => $entry['owner']['name'],
                    'password' => Hash::make('password'),
                    'role' => 'vendor',
                    'phone' => $entry['store']['whatsapp_number'],
                ]
            );

            $storeData = $entry['store'];
            $categoryName = $storeData['category'];
            unset($storeData['category']);

            $store = Store::firstOrCreate(
                ['user_id' => $user->id],
                array_merge($storeData, [
                    'category_id' => $categoryByName($categoryName),
                    'slug' => Store::generateUniqueSlug($storeData['name']),
                    'logo_path' => "stores/logos/{$entry['imageSlug']}.png",
                    'cover_path' => "stores/covers/{$entry['imageSlug']}.png",
                ])
            );

            if (! $store->logo_path) {
                $store->update([
                    'logo_path' => "stores/logos/{$entry['imageSlug']}.png",
                    'cover_path' => "stores/covers/{$entry['imageSlug']}.png",
                ]);
            }

            foreach ($entry['products'] as $index => $productData) {
                $isService = ($productData['type'] ?? 'product') === 'service';

                $product = Product::firstOrCreate(
                    ['store_id' => $store->id, 'name' => $productData['name']],
                    [
                        'category_id' => $categoryByName($categoryName),
                        'type' => $productData['type'] ?? 'product',
                        'description' => $productData['description'],
                        'price' => $productData['price'],
                        'condition' => $isService ? null : ($productData['price'] > 500000 ? 'occasion' : 'neuf'),
                        'negotiable' => ! $isService && $productData['price'] > 150000,
                        'location' => $storeData['city'] ?? null,
                        'featured' => $index === 0,
                        'is_active' => true,
                    ]
                );

                if ($product->images()->count() === 0) {
                    ProductImage::create([
                        'product_id' => $product->id,
                        'path' => "products/seed/{$entry['categorySlug']}.png",
                        'is_primary' => true,
                    ]);
                }
            }

            if (! empty($entry['jobs'])) {
                foreach ($entry['jobs'] as $jobData) {
                    JobPost::firstOrCreate(
                        ['store_id' => $store->id, 'title' => $jobData['title']],
                        [
                            'description' => $jobData['description'],
                            'location' => $jobData['location'],
                            'contract_type' => $jobData['contract_type'],
                            'is_active' => true,
                        ]
                    );
                }
            }
        }
    }
}
