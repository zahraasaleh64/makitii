<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Application unifiée (frontend + backend)
|--------------------------------------------------------------------------
|
| Le frontend React est compilé (`npm run build` dans /frontend) directement
| dans backend/public/build. Laravel sert ce build pour toute route qui
| n'est pas de l'API (/api/...), les tokens Sanctum (/sanctum/...) ou les
| fichiers publics uploadés (/storage/...) : c'est React Router qui prend
| ensuite le relais côté client pour la navigation (/boutiques, /produits,
| etc.). Backend et frontend ne forment donc plus qu'une seule application,
| servie sur une seule URL.
|
*/

$serveFrontend = function () {
    $indexFile = public_path('build/index.html');

    abort_unless(
        file_exists($indexFile),
        404,
        "Frontend non compilé. Lancez `npm run build` dans le dossier frontend (voir README)."
    );

    return response(file_get_contents($indexFile), 200)
        ->header('Content-Type', 'text/html');
};

Route::get('/', $serveFrontend);

Route::get('/{any}', $serveFrontend)
    ->where('any', '^(?!api|sanctum|storage|build).*$');
