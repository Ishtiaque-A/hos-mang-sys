<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpMSAnkelAndFeetTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_m_s_ankel_and_feet', function (Blueprint $table) {
            $table->id();
            $table->string('patient_id')->nullable();
             $table->string('footInspectio')->nullable();
             $table->string('MTPJointNumber')->nullable();
             $table->string('MTPJointSymptom')->nullable();
             $table->string('PIPJointNumber')->nullable();
             $table->string('PIPJointSymptom')->nullable();
             
             $table->string('DIPJointNumber')->nullable();
             $table->string('DIPJointSymptom')->nullable();

             $table->string('toesSymptomNumber')->nullable();
             $table->string('toesSymptomRight')->nullable();

             $table->string('dorsumSymptom')->nullable();
             $table->string('planterSymptom')->nullable();

             $table->string('nailNumber')->nullable();
             $table->string('nailSymptom')->nullable();

             $table->string('feelPalpation')->nullable();
             $table->string('feelPalpationToesLeft')->nullable();

             $table->string('feelPalpationMTPJointSide')->nullable();
             $table->string('feelPalpationMTPJoint')->nullable();
             $table->string('feelPalpationPIPJoint')->nullable();
             $table->string('feelPalpationDIPJoint')->nullable();

             $table->string('feelPalpationMedialMalleolus')->nullable();
             $table->string('feelPalpationLateralMalleolus')->nullable();
   
             $table->string('feelPalpationTenderOver')->nullable();
             $table->string('feelPalpationSwollenOver')->nullable();
             $table->string('arteriaDorsalisPedisPluse')->nullable();

             $table->string('planterAspectOfFoot')->nullable();

             $table->string('feelPalpationNailSide')->nullable();
             $table->string('feelPalpationNailNumber')->nullable();
             $table->string('feelPalpationNailSymptom')->nullable();

    
             $table->string('feelPalpationTender')->nullable();
             $table->string('feelPalpationWarm')->nullable();
             $table->string('feelPalpationPittingOedema')->nullable();

             $table->string('dorsiFlexionMove')->nullable();
             $table->string('planterFlexionMove')->nullable();
             $table->string('achilleTendonType')->nullable();
             $table->string('achilleTendon')->nullable();

             $table->string('planterReflex')->nullable();
             $table->string('ankleJerk')->nullable();
             $table->string('ankleS1')->nullable();
             $table->string('ankleL4')->nullable();
             $table->string('ankleL5')->nullable();


             $table->string('ankleHistoryValue')->nullable();
             
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
        Schema::dropIfExists('mhp_m_s_ankel_and_feet');
    }
}
