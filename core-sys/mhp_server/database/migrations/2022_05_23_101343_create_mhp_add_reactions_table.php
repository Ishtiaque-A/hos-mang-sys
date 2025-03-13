<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpAddReactionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_add_reactions', function (Blueprint $table) {
            $table->id();
            $table->string("patient_id")->nullable();
            $table->string("drug_name")->nullable();
            $table->string("reaction")->nullable();
            $table->string("severty")->nullable();
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
        Schema::dropIfExists('mhp_add_reactions');
    }
}
