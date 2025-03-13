<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpExamHistoryMappingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_exam_history_mappings', function (Blueprint $table) {
            $table->id();
            $table->string('examination_name_id')->nullable();
            $table->string('history_name_id')->nullable();
            $table->string('selection_parameter_id')->nullable();
            $table->string('selection_criteria_id')->nullable();
            $table->string('has_extension')->nullable();
            $table->string('extension_title')->nullable();
            $table->string('multiple_extension')->nullable();
            $table->string('single_selection')->nullable();
            $table->string('multiple_selection')->nullable();
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
        Schema::dropIfExists('mhp_exam_history_mappings');
    }
}
