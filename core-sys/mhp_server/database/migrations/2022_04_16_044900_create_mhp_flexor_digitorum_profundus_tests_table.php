<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpFlexorDigitorumProfundusTestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_flexor_digitorum_profundus_tests', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->integer('delete_status')->default(0); 
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
        Schema::dropIfExists('mhp_flexor_digitorum_profundus_tests');
    }
}
