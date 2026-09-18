<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => 'admin@makitii.com'],
            [
                'name' => 'Administrateur Makitii',
                'password' => Hash::make('password'),
                'role' => 'admin',
                'phone' => '+224620000000',
            ]
        );
    }
}
