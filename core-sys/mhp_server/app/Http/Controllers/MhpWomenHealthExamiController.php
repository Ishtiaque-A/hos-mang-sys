<?php

namespace App\Http\Controllers;

use App\Models\MhpWomenHealthExami;
use App\Models\MhpWomenHealthExamiBreastLump;
use App\Models\MhpWomenHealthExamiBreastNippleDischarge;
use App\Models\MhpWomenHealthExamiCervix;
use App\Models\MhpWomenHealthExamiCst;
use App\Models\MhpWomenHealthExamiGynecologies;
use App\Models\MhpWomenHealthExamiObstetric;
use App\Models\MhpWomenHealthExamiVulva;
use Illuminate\Http\Request;

class MhpWomenHealthExamiController extends Controller
{
    public function store(Request $request)
    {
        $women = new MhpWomenHealthExami();
        $women->patient_id = $request->patient_id;
        $women->LMP_date = $request->LMP_date;
        $women->LSCS_ternary = $request->LSCS_ternary;
        $women->pregnant_ternary = $request->pregnant_ternary;
        $women->lastCervicalScreen_date = $request->lastCervicalScreen_date;
        $women->periodType_input = $request->periodType_input;
        $women->periodDays_input = $request->periodDays_input;
        $women->periodCycle_input = $request->periodCycle_input;
        $women->periodYears_input = $request->periodYears_input;
        $women->volume_value = $request->volume_value;
        $women->PVBleeding_vale = $request->PVBleeding_vale;
        $women->PVDischarge_value = $request->PVDischarge_value;
        $women->vulval_value = $request->vulval_value;
        $women->miscarriage_value = $request->miscarriage_value;
        $women->breastLump_side_value = $request->breastLump_side_value;
        $women->breast_pain_ternary_value = $request->breast_pain_ternary_value;
        $women->breast_abscess_ternary_value = $request->breast_abscess_ternary_value;
        $women->pelvic_mass = $request->pelvic_mass;
        $women->forniceal_tenderness_ternary = $request->forniceal_tenderness_ternary;
        $women->bulky_uterus_ternary = $request->bulky_uterus_ternary;
        $women->breast_ternery = $request->breast_ternery;
        $women->peau_ternary = $request->peau_ternary;
        $women->redness_ternary = $request->redness_ternary;
        $women->nipple_inversion_ternary = $request->nipple_inversion_ternary;
        $women->visibleVeins_ternary = $request->visibleVeins_ternary;
        $women->teethering_ternary = $request->teethering_ternary;
        $women->hot_ternary = $request->hot_ternary;
        $women->axillary_nodes_ternary = $request->axillary_nodes_ternary;
        $women->skin_dimpling_ternary = $request->skin_dimpling_ternary;
        $women->asymetric_elevation_ternary = $request->asymetric_elevation_ternary;
        $women->supraclavicular_node_ternary = $request->supraclavicular_node_ternary;
        $women->swelling_ternary = $request->swelling_ternary;
        $women->lump_cm_for_nipple_ternary = $request->lump_cm_for_nipple_ternary;
        $women->lump_o_clock = $request->lump_o_clock;
        $women->bartholin_glandes_value = $request->bartholin_glandes_value;
        $women->forniceal_mass_value = $request->forniceal_mass_value;
        $women->anteverted_uterus_ternary = $request->anteverted_uterus_ternary;
        $women->uterine_tenderness_ternary = $request->uterine_tenderness_ternary;
        $women->retroverted_uterus_ternary = $request->retroverted_uterus_ternary;
        $women->LMP_input = $request->LMP_input;
        $women->LLO_ternary = $request->LLO_ternary;
        $women->LUI_ternary = $request->LUI_ternary;
        $women->RLO_ternary = $request->RLO_ternary;
        $women->LLI_ternary = $request->LLI_ternary;
        $women->RLI_ternary = $request->RLI_ternary;
        $women->RUO_ternary = $request->RUO_ternary;
        $women->MUI_ternary = $request->MUI_ternary;

        $women->vulva = $request->vulva;
        $women->breastNippleDischarge = $request->breastNippleDischarge;
        $women->cst = $request->cst;
        $women->obstetricsValue = $request->obstetricsValue;
        $women->breastLump = $request->breastLump;
        $women->cervix = $request->cervix;
        $women->gynecologiesValue = $request->gynecologiesValue;

        $women->lumpX= $request->lumpX;
        $women->lumpY= $request->lumpY;
        $women->bartholinGlandesSide= $request->bartholinGlandesSide;
        $women->LUO_ternary= $request->LUO_ternary;

        $women->save();

        return response()->json([
            'status' => 200,
            'message' => 'Women health data Inserted Successfully',
            'women' => $women
        ]);
    }


    // public function vulva_store(Request $request)
    // {
    //     $women = new MhpWomenHealthExamiVulva();
    //     $women->patient_id = $request->patient_id;
    //     $women->women_health_id = $request->women_health_id;
    //     $women->vulvas_id = $request->vulvas_id;
    //     $women->value = $request->value;
    //     $women->save();

    //     return response()->json([
    //         'status' => 200,
    //         'message' => 'Data Inserted Successfully',
    //         'women' => $women
    //     ]);
    // }

    // public function breastNippleDischarge_store(Request $request)
    // {
    //     $women = new MhpWomenHealthExamiBreastNippleDischarge();
    //     $women->patient_id = $request->patient_id;
    //     $women->women_health_id = $request->women_health_id;
    //     $women->breast_nipple_discharges_id = $request->breast_nipple_discharges_id;
    //     $women->value = $request->value;
    //     $women->save();

    //     return response()->json([
    //         'status' => 200,
    //         'message' => 'Data Inserted Successfully',
    //         'women' => $women
    //     ]);
    // }

    // public function cst_store(Request $request)
    // {
    //     $women = new MhpWomenHealthExamiCst();
    //     $women->patient_id = $request->patient_id;
    //     $women->women_health_id = $request->women_health_id;
    //     $women->csts_id = $request->csts_id;
    //     $women->value = $request->value;
    //     $women->save();

    //     return response()->json([
    //         'status' => 200,
    //         'message' => 'Data Inserted Successfully',
    //         'women' => $women
    //     ]);
    // }

    // public function obstetrics_store(Request $request)
    // {
    //     $women = new MhpWomenHealthExamiObstetric();
    //     $women->patient_id = $request->patient_id;
    //     $women->women_health_id = $request->women_health_id;
    //     $women->obstetrics_id = $request->obstetrics_id;
    //     $women->value = $request->value;
    //     $women->save();

    //     return response()->json([
    //         'status' => 200,
    //         'message' => 'Data Inserted Successfully',
    //         'women' => $women
    //     ]);
    // }

    // public function breastLump_store(Request $request)
    // {
    //     $women = new MhpWomenHealthExamiBreastLump();
    //     $women->patient_id = $request->patient_id;
    //     $women->women_health_id = $request->women_health_id;
    //     $women->breast_lumps_id = $request->breast_lumps_id;
    //     $women->value = $request->value;
    //     $women->save();

    //     return response()->json([
    //         'status' => 200,
    //         'message' => 'Data Inserted Successfully',
    //         'women' => $women
    //     ]);
    // }

    // public function cervixe_store(Request $request)
    // {
    //     $women = new MhpWomenHealthExamiCervix();
    //     $women->patient_id = $request->patient_id;
    //     $women->women_health_id = $request->women_health_id;
    //     $women->cervixes_id = $request->cervixes_id;
    //     $women->value = $request->value;
    //     $women->save();

    //     return response()->json([
    //         'status' => 200,
    //         'message' => 'Data Inserted Successfully',
    //         'women' => $women
    //     ]);
    // }

    // public function gynecologies_store(Request $request)
    // {
    //     $women = new MhpWomenHealthExamiGynecologies();
    //     $women->patient_id = $request->patient_id;
    //     $women->women_health_id = $request->women_health_id;
    //     $women->gynecologies_id = $request->gynecologies_id;
    //     $women->value = $request->value;
    //     $women->save();

    //     return response()->json([
    //         'status' => 200,
    //         'message' => 'Data Inserted Successfully',
    //         'women' => $women
    //     ]);
    // }
}
