<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpEmployeeAcademicsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_employee_academics', function (Blueprint $table) {
            $table->id();
            $table->string('employee_id')->nullable();
            $table->string('degree_id')->nullable();
            $table->string('passing_year')->nullable();
            $table->string('result')->nullable();
            $table->string('institution_id')->nullable();
            $table->string('country_id')->nullable();
            $table->string('city_id')->nullable();
            $table->string('scan_copy')->nullable();
            $table->string('scan_copy_title')->nullable();
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
        Schema::dropIfExists('mhp_employee_academics');
    }
}
