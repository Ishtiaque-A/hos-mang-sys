<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpPatientsFamilySocialHistoryAlcoholsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_patients_family_social_history_alcohols', function (Blueprint $table) {
            $table->id();
            $table->string('patients_id')->nullable();
            $table->string('is_drinker')->nullable();
            $table->string('days_per_week')->nullable();
            $table->string('standard_drinks_per_day')->nullable();
            $table->string('past_alc_consumption')->nullable();
            $table->string('year_started')->nullable();
            $table->string('year_stopped')->nullable();
            $table->string('comments')->nullable();
            $table->integer('delete_status')->default(0);
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
        Schema::dropIfExists('mhp_patients_family_social_history_alcohols');
    }
}
