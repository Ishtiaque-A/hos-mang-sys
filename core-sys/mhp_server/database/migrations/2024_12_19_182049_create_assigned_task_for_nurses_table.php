<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAssignedTaskForNursesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('assigned_task_for_nurses', function (Blueprint $table) {
            $table->id();
            $table->string("task_id")->nullable();
            $table->string("admission_id")->nullable();
            $table->string("patient_id")->nullable();
            $table->string("name")->nullable();
            $table->integer("status")->default(1);
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
        Schema::dropIfExists('assigned_task_for_nurses');
    }
}
