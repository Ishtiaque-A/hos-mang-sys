<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGreatLabBoothRequisionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('great_lab_booth_requisions', function (Blueprint $table) {
            $table->id();
            $table->integer('booth_id');
            $table->integer('branch_id')->nullable();
            $table->integer('requisition_no');
            $table->string('status');
            $table->string('requisitor_name')->nullable();
            $table->string('date')->nullable();
            $table->string('approved_by')->nullable();
            $table->text('remarks')->nullable();
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
        Schema::dropIfExists('great_lab_booth_requisions');
    }
}
