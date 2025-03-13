<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpProcedureReportChartsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_procedure_report_charts', function (Blueprint $table) {
            $table->id();
            $table->text("item_number")->nullable();
            $table->text("indication")->nullable();
            $table->text("procedure")->nullable();
            $table->text("findings")->nullable();
            $table->text("process")->nullable();
            $table->text("antibiotics")->nullable();
            $table->text("pathology")->nullable();
            $table->text("discharge")->nullable();
            $table->text("followup")->nullable();
            $table->text("incision")->nullable();
            $table->text("drain")->nullable();
            $table->text("blood_loss")->nullable();
            $table->text("observation")->nullable();
            $table->text("diet")->nullable();
            $table->text("analgesia")->nullable();
            $table->text("dvt_prop")->nullable();
            $table->text("antibiotics_two")->nullable();
            $table->text("post_operative")->nullable();
            $table->text("patient_position")->nullable();
            $table->text("process_details")->nullable();
            $table->text("anesthetic")->nullable();
            $table->text("signed_by")->nullable();

            $table->string("ward")->nullable();
            $table->string("bed")->nullable();
            $table->string("department")->nullable();
            $table->string("doctor_id")->nullable();
            $table->string("patient_id")->nullable();
            $table->string("assistant_surgeon")->nullable();
            $table->string("anesthesia")->nullable();
            $table->string("procedure_date")->nullable();
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
        Schema::dropIfExists('mhp_procedure_report_charts');
    }
}
