<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpEntExaminationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_ent_examinations', function (Blueprint $table) {
            $table->id();
            $table->string('patient_id')->nullable();
            $table->longText('Ear_Lesion')->nullable();
            $table->longText('Ent_Others')->nullable();
            $table->string('ear_his_side')->nullable();          
            $table->string('earDischarge_his_value')->nullable(); 
            $table->string('deafness_his_value')->nullable(); 
            $table->string('tinnitus_his_side')->nullable(); 
            $table->string('face_his_side')->nullable(); 
            $table->string('earLesion')->nullable();
            $table->string('earLesionPart')->nullable();
            $table->string('earlessionleftMMX')->nullable();
            $table->string('earlessionRightMMX')->nullable();
            $table->string('earCanal_value')->nullable(); 
            $table->string('earCanal_side')->nullable(); 
            $table->string('discharge_side')->nullable(); 
            $table->string('body_side')->nullable(); 
            $table->string('lymph_value')->nullable(); 
            $table->string('wax_side')->nullable(); 
            $table->string('glueEar_side')->nullable(); 
            $table->string('glueEar_value')->nullable(); 
            $table->string('mastoid_value')->nullable(); 
            $table->string('tympanic_side')->nullable(); 
            $table->string('tympanic_value')->nullable(); 
            $table->string('renne_value')->nullable(); 
            $table->string('weber_value')->nullable(); 
            $table->string('louderDeafer_side')->nullable(); 
            $table->string('sensorinural_side')->nullable(); 
            $table->string('conduct_side')->nullable(); 
            $table->string('louder_side')->nullable(); 
            $table->string('inflamed_ternary')->nullable(); 
            $table->string('uvula_ternary')->nullable(); 
            $table->string('tonsil_side')->nullable(); 
            $table->string('tonsilValue')->nullable(); 
            $table->string('ulser_value')->nullable(); 
            $table->string('tongue_value')->nullable(); 
            $table->string('tongueLesion_value')->nullable(); 
            $table->string('nose_side')->nullable(); 
            $table->string('nose_value')->nullable(); 
            $table->string('nasalSeptal_ternary')->nullable(); 
            $table->string('mucosa_ternary')->nullable(); 
            $table->string('turbinates_ternary')->nullable(); 
            $table->string('polip_ternary')->nullable(); 
            $table->string('polipAnterior_ternary')->nullable(); 
            $table->string('clearDischarge_ternary')->nullable(); 
            $table->string('bleedingAnterior_ternary')->nullable(); 
            $table->string('bleedingPosterior_ternary')->nullable(); 
            $table->string('foreign_ternary')->nullable(); 
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
        Schema::dropIfExists('mhp_ent_examinations');
    }
}
