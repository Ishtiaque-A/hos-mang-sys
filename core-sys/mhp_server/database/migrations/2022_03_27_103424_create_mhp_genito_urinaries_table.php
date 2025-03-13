<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpGenitoUrinariesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_genito_urinaries', function (Blueprint $table) {
            $table->id();
            $table->string('patient_id')->nullable();
            $table->longText('Genito_History')->nullable();
            $table->string('renalMass')->nullable();
            $table->string('tenderness')->nullable();
            $table->string('renalBruit')->nullable();
            $table->string('aboveMargin')->nullable();
            $table->string('noUpperBorder')->nullable();
            $table->string('translucent')->nullable();
            $table->string('separation')->nullable();

            $table->string('rectalExaminationPostion')->nullable();
            $table->string('rectalExamination')->nullable();

            $table->string('hydrocele')->nullable();
            $table->string('scrotalTenderness')->nullable();
            $table->string('testicularSwelling')->nullable();
            $table->string('testicularMass')->nullable();
            $table->string('testicularTenderness')->nullable();
            $table->string('retractedTestis')->nullable();
            $table->string('undescendedTestis')->nullable();
            $table->string('penialWart')->nullable();
            $table->string('pearly')->nullable();
            $table->string('inguinal')->nullable();
            $table->string('phimosis')->nullable();
            $table->string('paraphimosis')->nullable();
            $table->string('scrotal')->nullable();

            $table->tinyInteger('urineAnalysisAllNormal')->default(0);
            
            $table->string('leucocytes')->nullable();
            $table->string('nitrites')->nullable();
            $table->string('bilirubin')->nullable();
            $table->string('ketones')->nullable();
            $table->string('urobiliongen')->nullable();
            $table->string('glucose')->nullable();
            $table->string('specificGravity')->nullable();
            $table->string('ph')->nullable();
            $table->string('color')->nullable();
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
        Schema::dropIfExists('mhp_genito_urinaries');
    }
}
