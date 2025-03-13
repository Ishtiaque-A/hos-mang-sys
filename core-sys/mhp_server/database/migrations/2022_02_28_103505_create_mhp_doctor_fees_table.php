<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpDoctorFeesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_doctor_fees', function (Blueprint $table) {
            $table->id();
            $table->string('doctorfee_id')->nullable();
            $table->string('doctor_id')->nullable();
            $table->integer('fee_name')->nullable();
            $table->string('item_code')->nullable();
            $table->string('accounts_id')->nullable();
            $table->string('accounts_type_id')->nullable();
            $table->string('accounts_group_id')->nullable();
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
        Schema::dropIfExists('mhp_doctor_fees');
    }
}
