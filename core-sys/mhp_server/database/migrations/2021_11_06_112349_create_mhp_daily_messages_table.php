<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpDailyMessagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_daily_messages', function (Blueprint $table) {
            $table->id();
            $table->integer('patient_id')->nullable();
            $table->string('priority')->nullable();
            $table->string('subject')->nullable();
            $table->string('is_current_patient')->nullable();
            $table->string('link_to_patient')->nullable();
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
        Schema::dropIfExists('mhp_daily_messages');
    }
}
