<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDoctorsLabPointsPlanSharesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('doctors_lab_points_plan_shares', function (Blueprint $table) {
            $table->id();
            $table->integer('plan_id');
            $table->integer('plan_master_id')->nullable();
            $table->string('share_percentage')->nullable();
            $table->string('total_percentage')->nullable();
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
        Schema::dropIfExists('doctors_lab_points_plan_shares');
    }
}
