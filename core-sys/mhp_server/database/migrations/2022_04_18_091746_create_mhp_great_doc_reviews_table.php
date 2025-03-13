<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpGreatDocReviewsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_great_doc_reviews', function (Blueprint $table) {
            $table->id();
            $table->integer('patient_ID');
            $table->string('patient_name')->nullable();
            $table->string('review_name')->nullable();
            $table->string('date')->nullable();
            $table->string('note')->nullable();

            $table->integer('doctor_id');
            $table->string('doctor_name')->nullable();
            $table->string('patient_mobile')->nullable();
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
        Schema::dropIfExists('mhp_great_doc_reviews');
    }
}
