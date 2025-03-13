<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpPatientsFamilySocialHistoryTobaccosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_patients_family_social_history_tobaccos', function (Blueprint $table) {
            $table->id();
            $table->string('patients_id')->nullable();
            $table->string('current_smoking_history')->nullable();
            $table->string('date_started')->nullable();
            $table->string('tobacco_type')->nullable();
            $table->string('tobacco_year_started')->nullable();
            $table->string('tobacco_year_stopped')->nullable();
            $table->string('is_fresho_leaf')->nullable();
            $table->string('amount_per_day')->nullable();
            $table->string('is_cessation_advice')->nullable();
            $table->string('advice_suggestion')->nullable();
            $table->string('comments_tobacco')->nullable();
            $table->string('delete_status')->default(0);
            $table->string('created_by')->nullable();
            $table->string('updated_by')->nullable();
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
        Schema::dropIfExists('mhp_patients_family_social_history_tobaccos');
    }
}
