<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpDiagnosisProcedureActionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_diagnosis_procedure_actions', function (Blueprint $table) {
            $table->id();
            $table->string('DiagnosisProcedureActions_type')->nullable();
            $table->string('DiagnosisProcedureActions_name')->nullable();
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
        Schema::dropIfExists('mhp_diagnosis_procedure_actions');
    }
}
