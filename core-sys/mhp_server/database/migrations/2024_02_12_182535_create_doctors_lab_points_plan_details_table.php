<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDoctorsLabPointsPlanDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('doctors_lab_points_plan_details', function (Blueprint $table) {
            $table->id();
            $table->integer('plan_id');
            $table->integer('test_id');
            $table->string('point_percentage');
            $table->string('point_amount');
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
        Schema::dropIfExists('doctors_lab_points_plan_details');
    }
}
