<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpEyesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_eyes', function (Blueprint $table) {
            $table->id();
            $table->string('patient_id')->nullable();
            $table->longText('eye_History')->nullable(); //arr
            $table->string('externalObservation')->nullable(); //obj
           
            $table->string('trailFramed')->nullable(); 
            $table->longText('eyeRx')->nullable(); // big obj
            $table->string('contractLens')->nullable(); // obj
            $table->string('contractLensInfoRight')->nullable(); // obj
            $table->string('contractLensInfoLeft')->nullable(); // obj
            $table->string('ancillaryTestInfo')->nullable(); // obj
            $table->longText('ancillaryTestImportExport')->nullable(); // arr
            $table->longText('posteriorEye')->nullable(); // arr
            $table->longText('posteriorEyeCheckbox')->nullable(); // arr
            $table->string('posteriorEyeShapeRight')->nullable(); // obj
            $table->string('posteriorEyeShapeLeft')->nullable(); // obj
            $table->string('posteriorEyeStartTime')->nullable(); 
            $table->string('posteriorEyeEndTime')->nullable(); 
            $table->string('posteriorEyeComment')->nullable();
            $table->string('kRight1')->nullable(); 
            $table->string('kRightD1')->nullable(); 
            $table->string('kRightD3')->nullable(); 
            $table->string('kRightD2')->nullable(); 
            $table->string('kRightAt1')->nullable(); 
            $table->string('kRightAt2')->nullable(); 
            $table->string('kRightCly')->nullable(); 
            $table->string('kRightClyAt')->nullable(); 
            $table->string('kLeft1')->nullable();
            $table->string('kLeft2')->nullable();
            $table->string('kLeft3')->nullable(); 
            $table->string('kLeftD1')->nullable(); 
            $table->string('kLeftD3')->nullable(); 
            $table->string('kLeftD2')->nullable(); 
            $table->string('kLeftAt1')->nullable(); 
            $table->string('kLeftAt2')->nullable(); 
            $table->string('kLeftCly')->nullable(); 
            $table->string('kLeftClyAt')->nullable(); 
            $table->string('previousSpectaclesValue1')->nullable(); //obj
            $table->string('previousSpectaclesValue2')->nullable(); //obj
            $table->string('previousSpectaclesValue3')->nullable(); //obj
            $table->string('UCVARightDistance')->nullable(); 
            $table->string('UCVARightNear')->nullable(); 
            $table->string('UCVALeftNear')->nullable(); 
            $table->string('UCVALeftDistance')->nullable(); 
            $table->string('UCVAOUDistance')->nullable(); 
            $table->string('UCVAOUNear')->nullable(); 
            $table->string('pinholeRightDistance')->nullable(); 
            $table->string('pinholeRightNear')->nullable(); 
            $table->string('pinholeOUNear')->nullable(); 
            $table->string('pinholeOUDistance')->nullable(); 
            $table->string('pinholeLeftDistance')->nullable(); 
            $table->string('pinholeLeftNear')->nullable(); 
            $table->string('coverDistancePhoria')->nullable(); 
            $table->string('coverDistanceTropia')->nullable(); 
            $table->string('coverDistanceTropiaSide')->nullable(); 
            $table->string('coverDistanceTropiaType')->nullable(); 
            $table->string('coverNearPhoria')->nullable(); 
            $table->string('coverNearTropia')->nullable(); 
            $table->string('coverNearTropiaSide')->nullable(); 
            $table->string('coverNearTropiaType')->nullable(); 
            $table->longText('eomType')->nullable(); //arr
            $table->string('isSaccades')->nullable(); 
            $table->longText('saccades')->nullable(); //arr
            $table->longText('eomValue')->nullable(); //arr
            
            $table->longText('intraOcularPressure')->nullable(); //arr
            $table->longText('intraOcularPressureCheckbox')->nullable(); //arr
            $table->string('intraOcularPressureLeftPre')->nullable(); 
            $table->string('intraOcularPressureLeftPost')->nullable(); 
            $table->string('intraOcularPressureRightPre')->nullable(); 
            $table->string('intraOcularPressureRightPost')->nullable(); 
            $table->string('intraOcularPressureStartTime')->nullable(); 
            $table->string('intraOcularPressureEndTime')->nullable(); 
            $table->string('pachymetryLeft')->nullable(); 
            $table->string('pachymetryRight')->nullable(); 
            $table->longText('eyeImage')->nullable(); //  arr image
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
        Schema::dropIfExists('mhp_eyes');
    }
}
