<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNeurologyLowerLimbsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('neurology_lower_limbs', function (Blueprint $table) {
            $table->id();
            $table->string('patient_id')->nullable();
            $table->string('lowerlimbTemp')->nullable();
            $table->string('hip1')->nullable();
            $table->string('hip2')->nullable();
            $table->string('knee1')->nullable();
            $table->string('knee2')->nullable();
            $table->string('ankle1')->nullable();
            $table->string('ankle2')->nullable();
            $table->string('fingerFlexionLower')->nullable();
            $table->string('fingerExtensionLower')->nullable();
            $table->string('fingerAbductionLower')->nullable();
            $table->string('fingerAdductionLower')->nullable();
            $table->string('fingerNthLower')->nullable();
            $table->string('fingerSideLower')->nullable();
            $table->string('hipRight1')->nullable();
            $table->string('hipRight2')->nullable();
            $table->string('kneeRight1')->nullable();
            $table->string('kneeRight2')->nullable();
            $table->string('ankleRight1')->nullable();
            $table->string('ankleRight2')->nullable();
            $table->string('fingerFlexionLowerRight')->nullable();
            $table->string('fingerExtensionLowerRight')->nullable();
            $table->string('fingerAbductionLowerRight')->nullable();
            $table->string('fingerAdductionLowerRight')->nullable();
            $table->string('fingerNthLowerRight')->nullable();
            $table->string('fingerSideLowerRight')->nullable();
            $table->string('hipReflexes1')->nullable();
            $table->string('hipReflexes2')->nullable();
            $table->string('kneeReflexes1')->nullable();
            $table->string('kneeReflexes2')->nullable();
            $table->string('ankleReflexes1')->nullable();
            $table->string('ankleReflexes2')->nullable();
            $table->string('fingerFlexionLowerReflexes')->nullable();
            $table->string('fingerExtensionLowerReflexes')->nullable();
            $table->string('fingerAbductionLowerReflexes')->nullable();
            $table->string('fingerAdductionLowerReflexes')->nullable();
            $table->string('fingerNthLowerReflexes')->nullable();
            $table->string('fingerSideLowerReflexes')->nullable();
            $table->string('vibrationLowerLimb')->nullable();
            $table->string('proprioceptionLowerLimb')->nullable();
            $table->string('pinLowerLimb')->nullable();
            $table->string('lightLowerLimb')->nullable();
            $table->string('peripheralLowerLimb')->nullable();
            $table->string('peripheralLowerLimbValuve')->nullable();
            $table->string('redialLowerLimb')->nullable();
            $table->string('ulnarLowerLimb')->nullable();
            $table->string('medianLowerLimb')->nullable();
            $table->string('lesionLowerLimb')->nullable();

            $table->string('lowerLimbValue')->nullable();
            $table->string('pictureLowerLimbValue')->nullable();
            $table->string('lowerLimbpower')->nullable();

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
        Schema::dropIfExists('neurology_lower_limbs');
    }
}
