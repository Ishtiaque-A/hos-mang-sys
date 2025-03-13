<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDoctorsLabPointsPlansTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('doctors_lab_points_plans', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable();
            $table->string('total_share')->nullable();
            $table->string('effective_date')->nullable();
            $table->string('expiry_date')->nullable();
            $table->string('others')->nullable();
            $table->integer('status')->default(1)->comment('1=active,0=inactive')->nullable();
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
        Schema::dropIfExists('doctors_lab_points_plans');
    }
}
