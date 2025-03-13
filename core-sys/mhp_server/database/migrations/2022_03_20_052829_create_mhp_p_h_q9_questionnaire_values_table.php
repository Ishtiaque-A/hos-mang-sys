<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpPHQ9QuestionnaireValuesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_p_h_q9_questionnaire_values', function (Blueprint $table) {
            $table->id();
            $table->string('PHQ9QuestionnaireValue_name')->nullable();
            $table->integer('PHQ9QuestionnaireValue_value')->nullable();
            $table->integer('delete_status')->default(0); 
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
        Schema::dropIfExists('mhp_p_h_q9_questionnaire_values');
    }
}
