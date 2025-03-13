<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpRespiratoryExaminationListsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_respiratory_examination_lists', function (Blueprint $table) {
            $table->id();
            $table->string('patient_id')->nullable();
            $table->string('respiratory_id')->nullable();
            $table->string('examination_list_id')->nullable();
            $table->string('value')->nullable();
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
        Schema::dropIfExists('mhp_respiratory_examination_lists');
    }
}
