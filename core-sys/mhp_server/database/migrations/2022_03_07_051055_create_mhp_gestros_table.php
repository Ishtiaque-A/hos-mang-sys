<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMhpGestrosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mhp_gestros', function (Blueprint $table) {
            $table->id();
            $table->string('patient_id')->nullable();
            $table->longText('Gestro_History')->nullable();
            $table->longText('Gestro_Abdomen')->nullable();
            $table->string('skin')->nullable();
            $table->string('hand_finger')->nullable();
            $table->string('tongue_mouth')->nullable();
            $table->string('gynaecomastia')->nullable();
            $table->string('Parotid_Glands_Enlarged')->nullable();
            $table->string('Left_superclavicular_node')->nullable();
            $table->string('site')->nullable();
            $table->string('radiation')->nullable();
            $table->string('pattern')->nullable();
            $table->string('duration')->nullable();
            $table->string('frequency')->nullable();
            $table->string('score')->nullable();
            $table->string('vomiting')->nullable();
            $table->string('dysphagia')->nullable();
            $table->string('diarrhoea')->nullable();
            $table->string('constipation')->nullable();
            $table->string('habits')->nullable();
            $table->string('stoolType')->nullable();
            $table->string('PRBleed')->nullable();
            $table->string('bruit')->nullable();
            $table->string('murphy')->nullable();
            $table->string('noneTender')->nullable();
            $table->string('noMasses')->nullable();
            $table->string('tenderness')->nullable();
            $table->string('mass')->nullable();
            $table->string('umbillical')->nullable();
            $table->string('incisional')->nullable();
            $table->string('inguinal')->nullable();
            $table->string('femoral')->nullable();
            $table->string('perRectal')->nullable();
            $table->string('sigmoidoscopy')->nullable();
            $table->string('guaiac')->nullable();
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
        Schema::dropIfExists('mhp_gestros');
    }
}
