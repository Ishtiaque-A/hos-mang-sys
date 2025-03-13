<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpRespiratoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_respiratories', function (Blueprint $table) {
            $table->id();
            
            $table->string('patient_id')->nullable();
            $table->longText('Respiratory_History')->nullable();
            $table->longText('Respiratory_Examination_List')->nullable();
            $table->longText('Respiratory_Questionnaire')->nullable();
            $table->string('cough')->nullable();
            $table->string('dyspneaName')->nullable();
            $table->string('dyspneaClass')->nullable();
            $table->string('symptoms')->nullable();
            $table->string('medicalHistory')->nullable();
            $table->string('abnormalBreathing')->nullable();
            $table->string('vocal')->nullable();
            $table->string('breathSound')->nullable();
            $table->string('chestExpansion')->nullable();
            $table->string('criptationLeft')->nullable();
            $table->string('criptationRight')->nullable();
            $table->string('criptationBoth')->nullable();
            $table->string('criptationCondition')->nullable();
            $table->string('wheezingLeft')->nullable();
            $table->string('wheezingRight')->nullable();
            $table->string('wheezingBoth')->nullable();
            $table->string('wheezingCondition')->nullable();
            $table->string('vocalResonance')->nullable();
            $table->string('Pembortons_sign')->nullable();
            $table->string('Sleep_Apnoea_Risk')->nullable();   
            $table->string('Date')->nullable();
            $table->string('Age')->nullable();
            $table->string('Height')->nullable();
            $table->string('Sex')->nullable();
            $table->string('PFR_1st')->nullable();
            $table->string('FEV1_1st')->nullable();
            $table->string('FVC_1st')->nullable();
            $table->string('Predicted_1st_1')->nullable();
            $table->string('Predicted_1st_2')->nullable();
            $table->string('Predicted_1st_3')->nullable();
            $table->string('Percentage_Predicted_1st_1')->nullable();
            $table->string('Percentage_Predicted_1st_2')->nullable();
            $table->string('Percentage_Predicted_1st_3')->nullable();
            $table->string('Percentage_FEV1orFVC_1st')->nullable();      
            $table->string('PFR_2st')->nullable();
            $table->string('FEV1_2st')->nullable();
            $table->string('FVC_2st')->nullable();
            $table->string('Predicted_2st_1')->nullable();
            $table->string('Predicted_2st_2')->nullable();
            $table->string('Predicted_2st_3')->nullable();
            $table->string('Percentage_Predicted_2st_1')->nullable();           
            $table->string('Percentage_Predicted_2st_2')->nullable();
            $table->string('Percentage_Predicted_2st_3')->nullable();
            $table->string('Percentage_FEV1orFVC_2st')->nullable();

            $table->string('percussion')->nullable();
            $table->string('chestShape')->nullable();


            $table->string('Res_Rate')->nullable();
            $table->string('Peak_Flow')->nullable();
            $table->string('Insipiration')->nullable();
            $table->string('Expiration')->nullable();
            $table->string('Stop_Bang_Questionaria')->nullable();

            $table->boolean('SnoringScore')->default(0);
            $table->boolean('TiredScore')->default(0);
            $table->boolean('ObservedScore')->default(0);
            $table->boolean('PressureScore')->default(0);
            $table->boolean('BodyMassIndexScore')->default(0);
            $table->boolean('AgeScore')->default(0);
            $table->boolean('NeckScore')->default(0);
            $table->boolean('GenderScore')->default(0);

            $table->integer('total_score')->default(0);



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
        Schema::dropIfExists('mhp_respiratories');
    }
}
