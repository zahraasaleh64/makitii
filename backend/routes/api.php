<?php

use App\Http\Controllers\Admin\CategoryController as AdminCategoryController;
use App\Http\Controllers\Admin\ProductController as AdminProductController;
use App\Http\Controllers\Admin\StatsController;
use App\Http\Controllers\Admin\StoreController as AdminStoreController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Public\CategoryController;
use App\Http\Controllers\Public\JobPostController;
use App\Http\Controllers\Public\ProductController;
use App\Http\Controllers\Public\StoreController;
use App\Http\Controllers\Vendor\JobPostController as VendorJobPostController;
use App\Http\Controllers\Vendor\ProductController as VendorProductController;
use App\Http\Controllers\Vendor\StoreController as VendorStoreController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes - Makitii
|--------------------------------------------------------------------------
*/

// --- Authentification ---
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
});

// --- Public : catégories, boutiques, produits ---
Route::get('/categories', [CategoryController::class, 'index']);

Route::get('/stores', [StoreController::class, 'index']);
Route::get('/stores/{slug}', [StoreController::class, 'show']);

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);

Route::get('/jobs', [JobPostController::class, 'index']);
Route::get('/jobs/{id}', [JobPostController::class, 'show']);

// --- Espace vendeur ---
Route::middleware(['auth:sanctum', 'role:vendor'])->prefix('vendor')->group(function () {
    Route::get('/store', [VendorStoreController::class, 'show']);
    Route::put('/store', [VendorStoreController::class, 'update']);
    Route::post('/store/logo', [VendorStoreController::class, 'updateLogo']);
    Route::post('/store/cover', [VendorStoreController::class, 'updateCover']);

    Route::get('/products', [VendorProductController::class, 'index']);
    Route::post('/products', [VendorProductController::class, 'store']);
    Route::get('/products/{id}', [VendorProductController::class, 'show']);
    Route::post('/products/{id}', [VendorProductController::class, 'update']);
    Route::delete('/products/{id}', [VendorProductController::class, 'destroy']);
    Route::delete('/products/{id}/images/{imageId}', [VendorProductController::class, 'destroyImage']);

    Route::get('/jobs', [VendorJobPostController::class, 'index']);
    Route::post('/jobs', [VendorJobPostController::class, 'store']);
    Route::get('/jobs/{id}', [VendorJobPostController::class, 'show']);
    Route::put('/jobs/{id}', [VendorJobPostController::class, 'update']);
    Route::delete('/jobs/{id}', [VendorJobPostController::class, 'destroy']);
});

// --- Espace admin ---
Route::middleware(['auth:sanctum', 'role:admin'])->prefix('admin')->group(function () {
    Route::get('/stats', [StatsController::class, 'index']);

    Route::get('/stores', [AdminStoreController::class, 'index']);
    Route::get('/stores/{id}', [AdminStoreController::class, 'show']);
    Route::put('/stores/{id}/approve', [AdminStoreController::class, 'approve']);
    Route::put('/stores/{id}/reject', [AdminStoreController::class, 'reject']);
    Route::delete('/stores/{id}', [AdminStoreController::class, 'destroy']);

    Route::get('/categories', [AdminCategoryController::class, 'index']);
    Route::post('/categories', [AdminCategoryController::class, 'store']);
    Route::post('/categories/{id}', [AdminCategoryController::class, 'update']);
    Route::delete('/categories/{id}', [AdminCategoryController::class, 'destroy']);

    Route::get('/products', [AdminProductController::class, 'index']);
    Route::delete('/products/{id}', [AdminProductController::class, 'destroy']);
});
