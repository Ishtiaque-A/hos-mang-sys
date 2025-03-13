<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpExamHistExtensionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_exam_hist_extensions', function (Blueprint $table) {
            $table->id();
            $table->integer('examination_name_id')->nullable();
            $table->integer('history_name_id')->nullable();
            $table->string('extension_code')->nullable();
            $table->string('extension_name')->nullable();
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
        Schema::dropIfExists('mhp_exam_hist_extensions');
    }
}
