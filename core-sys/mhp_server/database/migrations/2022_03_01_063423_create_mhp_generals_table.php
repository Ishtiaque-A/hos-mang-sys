<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpGeneralsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_generals', function (Blueprint $table) {
            $table->id();
            $table->string('patient_id')->nullable();

            $table->string('history')->nullable();

            $table->string('pulse')->nullable();
            $table->string('respiratoryRate')->nullable();
            $table->string('o2saturation')->nullable();

            $table->string('bloodSuger')->nullable();
            $table->string('bloodSugerType')->nullable();

           
            $table->string('sitting_left')->nullable();
            $table->string('sitting_right')->nullable();
          
            $table->string('standing_left')->nullable();
            $table->string('standing_right')->nullable();
            
            $table->string('lying_left')->nullable();
            $table->string('lying_right')->nullable();
           
            $table->string('weight')->nullable();
            $table->string('height')->nullable();
            $table->string('BMI')->nullable();

            $table->string('waist_measurement')->nullable();
            $table->string('hip_measurement')->nullable();
            $table->string('WHR')->nullable();       
            $table->string('temp')->nullable();

            $table->boolean('Anaemic')->default(0);
            $table->boolean('Jaundiced')->default(0);
            $table->boolean('Cyanosis')->default(0);
            $table->boolean('Skin')->default(0);
     
            $table->string('capillary')->nullable();
            $table->string('dehydration')->nullable();
            $table->string('radioFD')->nullable();
            $table->string('nailSign')->nullable();
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
        Schema::dropIfExists('mhp_generals');
    }
}
