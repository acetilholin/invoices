<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInvoicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->string('sifra_predracuna');
            $table->string('ime_priimek');
            $table->unsignedInteger('customer_id');
            $table->date('timestamp');
            $table->date('expiration');
            $table->string('klavzula');
            $table->string('author');
            $table->string('invoice_id');
            $table->date('work_date')->nullable();
            $table->float('total');
            $table->float('quantity');
            $table->float('vat');
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
        Schema::dropIfExists('invoices');
    }
}
