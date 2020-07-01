<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('username')->unique();
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->boolean('enabled')->default(false);
            $table->string('role')->default('user');
            $table->string('picture')->nullable();
            $table->boolean('force_password_reset')->nullable();
            $table->timestamp('last_seen')->nullable();
            $table->string('country')->nullable();
            $table->boolean('first_visit')->nullable();
            $table->string('reset_token')->nullable();
            $table->timestamp('token_time')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
