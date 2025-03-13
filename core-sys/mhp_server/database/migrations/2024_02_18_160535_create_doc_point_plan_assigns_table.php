<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDocPointPlanAssignsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('doc_point_plan_assigns', function (Blueprint $table) {
            $table->id();
            $table->integer('plan_id');
            $table->integer('plan_master_id');
            $table->integer('share_user_id');
            $table->integer('status')->default(1);
            $table->string('share_type');
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
        Schema::dropIfExists('doc_point_plan_assigns');
    }
}
