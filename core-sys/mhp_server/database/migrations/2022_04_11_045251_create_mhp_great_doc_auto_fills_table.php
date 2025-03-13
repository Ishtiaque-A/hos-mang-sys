<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpGreatDocAutoFillsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_great_doc_auto_fills', function (Blueprint $table) {
            $table->id();
             $table->string("auto_fill_id")->nullable();
               $table->string("auto_fill_text")->nullable();
               $table->string("auto_fill_history")->nullable();
               $table->string("patient_id")->nullable();
            $table->integer("delete_status")->default(0);
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
        Schema::dropIfExists('mhp_great_doc_auto_fills');
    }
}
