<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNeurologyLowerLimb2ndsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('neurology_lower_limb2nds', function (Blueprint $table) {
            $table->id();
            $table->string('patient_id')->nullable();

            $table->string('lowerKneeJerk')->nullable();
            $table->string('lowerKneeJerkRight')->nullable();
            $table->string('lowerAnkleJerk')->nullable();
            $table->string('lowerAnkleJerkRight')->nullable();
            $table->string('lowerPlanterReflex')->nullable();
            $table->string('lowerPlanterReflexRight')->nullable();

            $table->string('lowerHeelShin')->nullable();
            $table->string('lowerToeFinger')->nullable();
            $table->string('lowerFootTapping')->nullable();
            $table->string('lowerFemoralNerve')->nullable();
            $table->string('lowerSciaticNerve')->nullable();
            $table->string('lowerCommonNerve')->nullable();
            $table->string('lowerRombergTest')->nullable();
            $table->string('lowerHeelToeWaking')->nullable();
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
        Schema::dropIfExists('neurology_lower_limb2nds');
    }
}
