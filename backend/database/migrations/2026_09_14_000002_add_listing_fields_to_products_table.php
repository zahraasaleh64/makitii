<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->enum('condition', ['neuf', 'comme_neuf', 'occasion'])
                ->nullable()
                ->after('price');
            $table->boolean('negotiable')->default(false)->after('condition');
            $table->string('location')->nullable()->after('negotiable');
            $table->boolean('featured')->default(false)->after('location');
            $table->timestamp('expires_at')->nullable()->after('featured');
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn(['condition', 'negotiable', 'location', 'featured', 'expires_at']);
        });
    }
};
