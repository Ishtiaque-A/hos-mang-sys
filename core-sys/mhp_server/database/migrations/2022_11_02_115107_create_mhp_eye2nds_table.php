<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpEye2ndsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_eye2nds', function (Blueprint $table) {
            $table->id();
            $table->string('patient_id')->nullable();
            $table->string('spectaclesFirstValue')->nullable(); //obj
            $table->string('spectaclesFirstRightValue')->nullable(); //obj
            $table->string('spectaclesSecondValue')->nullable(); //obj
            $table->string('spectaclesSecondRightValue')->nullable(); //obj
            $table->string('spectaclesThirdValue')->nullable(); //obj
            $table->string('spectaclesThirdRightValue')->nullable(); //obj
            $table->string('spectaclesFourthValue')->nullable(); //obj
            $table->string('spectaclesFourthRightValue')->nullable(); //obj
            $table->string('spectaclesFifthValue')->nullable(); //obj
            $table->string('spectaclesFifthRightValue')->nullable(); //obj
            $table->string('spectaclesSixthValue')->nullable(); //obj
            $table->string('spectaclesSixthRightValue')->nullable(); //obj
            $table->string('spectaclesSeventhValue')->nullable(); //obj
            $table->string('spectaclesSeventhRightValue')->nullable(); //obj

            $table->longText('eyeRx')->nullable(); // big object

            $table->string('pupilsRight')->nullable(); 
            $table->string('pupilsLeft')->nullable(); 
            $table->longText('pupilsTypeRight')->nullable(); //arr
            $table->longText('pupilsTypeLeft')->nullable(); //arr
            $table->string('pupilsLeftValue')->nullable(); 
            $table->string('pupilsRightValue')->nullable(); 
            $table->string('pupilsRightShape')->nullable(); //obj
            $table->string('pupilsLeftShape')->nullable(); //obj
            $table->longText('imageSitLamp')->nullable(); //image big string
            $table->string('sitLamp')->nullable(); 
            $table->string('gonioscopy')->nullable(); 
            $table->string('gonioscopyVanHarrik')->nullable(); 

            $table->longText('imageGonioscopy')->nullable(); // Image big string
            $table->longText('gonioscopyShapeRightS')->nullable(); //arr
            $table->longText('gonioscopyShapeRightN')->nullable(); //arr
            $table->longText('gonioscopyShapeRightT')->nullable(); //arr
            $table->longText('gonioscopyShapeRightI')->nullable(); //arr
            $table->longText('gonioscopyShapeRightC')->nullable(); //arr
            $table->longText('gonioscopyShapeLeftS')->nullable(); //arr
            $table->longText('gonioscopyShapeLeftN')->nullable(); //arr
            $table->longText('gonioscopyShapeLeftT')->nullable(); //arr
            $table->longText('gonioscopyShapeLeftI')->nullable();//arr
            $table->longText('gonioscopyShapeLeftC')->nullable(); //arr
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
        Schema::dropIfExists('mhp_eye2nds');
    }
}
