<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\User;
use Faker\Generator as Faker;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(User::class, function (Faker $faker) {
    return [
        'username' => $faker->userName,
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'email_verified_at' => now(),
        'password' => Hash::make('test@test.test'),
        'enabled' => $faker->boolean,
        'role' => $faker->randomElement(['user', 'admin']),
        'picture' => Str::random(10).'.jpg',
        'force_password_reset' => $faker->boolean,
        'last_seen' => now(),
        'country' => $faker->countryCode,
        'first_visit' => $faker->boolean,
        'reset_token' => Str::random(10),
        'token_time' => now(),
        'remember_token' => Str::random(10),
    ];
});
