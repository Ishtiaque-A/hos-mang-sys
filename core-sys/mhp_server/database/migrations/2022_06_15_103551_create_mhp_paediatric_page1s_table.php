<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpPaediatricPage1sTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_paediatric_page1s', function (Blueprint $table) {
            $table->id();
             $table->string("pregnancyComplications")->nullable();
            $table->string("bloodGroup")->nullable();
            $table->string("antidGiven")->nullable();
            $table->string("labour")->nullable();
            $table->string("spontaneous")->nullable();
            $table->string("induced")->nullable();
            $table->string("labourComplications")->nullable();
            $table->string("typeBirth")->nullable();
            $table->string("estimatedGestation")->nullable();
            $table->string("abnormalities")->nullable();
            $table->string("problemsRequiring")->nullable();
            $table->string("birthWeight")->nullable();
            $table->string("birthLength")->nullable();
            $table->string("birthHead")->nullable();
            $table->string("newbornHearing")->nullable();
            $table->string("vitaminKGiven")->nullable();
            $table->string("vitaminKGiven1")->nullable();
            $table->string("vitaminKGiven2")->nullable();
            $table->string("hepbImmunisation")->nullable();
            $table->string("hepbImmunisation2")->nullable();
            $table->string("hepBImmunoglobin")->nullable();
            $table->string("hepBImmunoglobin1")->nullable();
            $table->string("postPartumComplications")->nullable();
            $table->string("feedingAtDischarge")->nullable();
            $table->string("difficultiesWithFeeding")->nullable();
            $table->string("dateOfDischarge")->nullable();
            $table->string("dischargeWeight")->nullable();
            $table->string("headCirc")->nullable();
            $table->string("patient_id")->nullable();
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
        Schema::dropIfExists('mhp_paediatric_page1s');
    }
}
