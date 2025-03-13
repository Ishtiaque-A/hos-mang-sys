<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpMentalPsq9Ques1stsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_mental_psq9_ques1sts', function (Blueprint $table) {
            $table->id();
            $table->string('patient_id')->nullValue();
            $table->string('mental_health_id')->nullValue();
            $table->string('psq9question_id')->nullValue();
            $table->string('question_value_id')->nullValue();
            $table->string('total_score')->nullValue();
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
        Schema::dropIfExists('mhp_mental_psq9_ques1sts');
    }
}
