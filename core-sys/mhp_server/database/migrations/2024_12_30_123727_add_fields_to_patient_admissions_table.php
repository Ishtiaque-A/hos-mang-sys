<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddFieldsToPatientAdmissionsTable extends Migration
{
    public function up()
    {
        Schema::table('patient_admissions', function (Blueprint $table) {
            $table->string('referred_by')->nullable();
            $table->string('paying')->nullable();
            $table->string('nonpaying')->nullable();
        });
    }

    public function down()
    {
        Schema::table('patient_admissions', function (Blueprint $table) {
            $table->dropColumn(['referred_by', 'paying', 'nonpaying']);
        });
    }
}
