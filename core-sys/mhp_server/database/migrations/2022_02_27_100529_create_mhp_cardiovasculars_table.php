<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpCardiovascularsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_cardiovasculars', function (Blueprint $table) {
            $table->id();
            $table->string('patient_id')->nullable();

            $table->longText('cardiovascular_history')->nullable();
            $table->longText('dyspnea')->nullable();
            $table->longText('riskfector')->nullable();
            
            $table->string('Ankle_oedema_Right')->nullable();
            $table->string('Ankle_oedema_left')->nullable();

            $table->string('brachial_Right')->nullable();
            $table->string('brachial_left')->nullable();
            $table->string('dorsalis_pedis_Right')->nullable();
            $table->string('dorsalis_pedis_left')->nullable();
            $table->string('femoral_Right')->nullable();
            $table->string('femoral_left')->nullable();
            $table->boolean('is_ajr')->default(0);
            $table->boolean('is_calf_tenderness')->default(0);
            $table->boolean('is_pacemaker_box')->default(0);
            $table->boolean('is_radio_factory_delay')->default(0);
            $table->boolean('is_trendelenburg_test')->default(0);
            $table->boolean('is_varicose_veins')->default(0);

            $table->string('jvp')->nullable();
            $table->string('notes')->nullable();
            $table->string('popliteal_Right')->nullable();
            $table->string('popliteal_left')->nullable();
            $table->string('posterior_tibialis_Right')->nullable();

            $table->string('posterior_tibialis_left')->nullable();
            $table->string('radial_Right')->nullable();
            $table->string('radial_left')->nullable();
            

            $table->string('carotid_bruit')->nullable();
            $table->string('apex_beat')->nullable();
            $table->string('intercostal_space')->nullable();
            $table->string('heart_sound')->nullable();
            $table->string('murmur')->nullable();
            $table->string('volume')->nullable();
            $table->string('radiations')->nullable();
         
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
        Schema::dropIfExists('mhp_cardiovasculars');
    }
}
