<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpPaediatricFourYearHealthChecksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_paediatric_four_year_health_checks', function (Blueprint $table) {
            $table->id();
              $table->string('patient_id')->nullable();
            $table->string('weight')->nullable();
            $table->string('height')->nullable();
            $table->string('bmi')->nullable();
            $table->boolean('vision_test')->nullable()->comment('1=true,0=false');
            $table->string('result_vision_chart')->nullable();
            $table->string('vision_chart')->nullable();
            $table->string('visible_plaque')->nullable();
            $table->string('white_spot')->nullable();
            $table->string('testes_fully_descended')->nullable();
            $table->string('family_health_history')->nullable();
            $table->string('parent_qtn')->nullable();
            $table->string('age_appropriate')->nullable();
            $table->string('hearing')->nullable();
            $table->string('vision')->nullable();
            $table->string('outcome')->nullable();
            $table->string('oral_health')->nullable();
            $table->string('bleeding_gum')->nullable();
            $table->string('facial')->nullable();
            $table->string('comments')->nullable();
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
        Schema::dropIfExists('mhp_paediatric_four_year_health_checks');
    }
}
