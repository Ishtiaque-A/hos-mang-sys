<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpGreatDocProceduresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_great_doc_procedures', function (Blueprint $table) {
            $table->id();
               $table->string("procedure_action_name")->nullable();
               $table->string("procedure_for_name")->nullable();
               $table->string("procedure_further_details")->nullable();
               $table->string("procedure_name")->nullable();
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
        Schema::dropIfExists('mhp_great_doc_procedures');
    }
}
