<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpDiagnosisProceduresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_diagnosis_procedures', function (Blueprint $table) {
            $table->id();
            $table->string('DiagnosisProcedure_type')->nullable();
            $table->string('DiagnosisProcedure_code')->nullable();
            $table->string('DiagnosisProcedure_name')->nullable();
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
        Schema::dropIfExists('mhp_diagnosis_procedures');
    }
}
