<?php

namespace App\Http\Controllers;

use App\Models\MhpSkinExamiHistory;
use App\Models\MhpSkinExamination;
use App\Models\MhpSkinExamiType;
use App\Models\MhpSkinExmiImage;
use App\Models\MhpSkinExmiSymtom;
use Illuminate\Http\Request;

class MhpSkinExaminationController extends Controller
{
    public function store(Request $request)
    {
        $Skin = new MhpSkinExamination();
        $Skin->patient_id = $request->patient_id;
         $Skin->historyValue= implode(",",$request->historyValue);
         $Skin->type=implode(",",$request->type);
        $Skin->acute = $request->acute;
        $Skin->chronic = $request->chronic;
        $Skin->duration = $request->duration;
        $Skin->durationType = $request->durationType;
        $Skin->stable = $request->stable;
        $Skin->growing = $request->growing;
        $Skin->site = $request->site;
        $Skin->neck = $request->neck;
        $Skin->scapula = $request->scapula;
        $Skin->upperBack = $request->upperBack;
        $Skin->lowerBack = $request->lowerBack;
        $Skin->chestUpper = $request->chestUpper;
        $Skin->chestLower = $request->chestLower;
        $Skin->arm = $request->arm;
        $Skin->forearm = $request->forearm;
        $Skin->hand = $request->hand;
        $Skin->finger = $request->finger;
        $Skin->interdigital = $request->interdigital;
        $Skin->nail = $request->nail;
        $Skin->areolar = $request->areolar;
        $Skin->mammary = $request->mammary;
        $Skin->abdomen = $request->abdomen;
        $Skin->umbilical = $request->umbilical;
        $Skin->inguinal = $request->inguinal;
        $Skin->groin = $request->groin;
        $Skin->buttock = $request->buttock;
        $Skin->perineal = $request->perineal;
        $Skin->thigh = $request->thigh;
        $Skin->leg = $request->leg;
        $Skin->knee = $request->knee;
        $Skin->foot = $request->foot;
        $Skin->interdigitalSpace = $request->interdigitalSpace;
        $Skin->size1 = $request->size1;
        $Skin->size2 = $request->size2;
        $Skin->shape = $request->shape;
        $Skin->color = $request->color;
        $Skin->palpation = $request->palpation;
        $Skin->temparature = $request->temparature;
        $Skin->arrangements = $request->arrangements;
        $Skin->save();

        return response()->json([
            'status' => 200,
            'message' => 'Skin data Inserted Successfully',
            'Skin' => $Skin
        ]);
    }



    public function store_history(Request $request)
    {
       // return $request->all();
        $data = new MhpSkinExamiHistory();
        $data->patient_id = $request->patient_id;
        $data->skin_exami_id = $request->skin_exami_id;
        $data->history_id = $request->history_id;
        $data->value = $request->value;  
        $data->save();

        return response()->json([
            'status' => 200,
            'message' => 'Data Inserted Successfully',
            'data' => $data
        ]);
    }

    public function store_type(Request $request)
    {
        $data = new MhpSkinExamiType();
        $data->patient_id = $request->patient_id;
        $data->skin_exami_id = $request->skin_exami_id;
        $data->type_id = $request->type_id;
        $data->value = $request->value;  
        $data->save();

        return response()->json([
            'status' => 200,
            'message' => 'Data Inserted Successfully',
            'data' => $data
        ]);
    }


    public function store_images(Request $request)
    {  
        
        if ($files = $request->file('image')) {
            $names = $files->getClientOriginalName();
            $name = rand(11, 99999).$names;
            $files->move('images/skinExmi', $name);
        }else{
            $name = "";
        }

        $data = new MhpSkinExmiImage();
        $data->patient_id = $request->patient_id;
        $data->skin_exami_id = $request->skin_exami_id;
        $data->bodyPart_name = $request->bodyPart_name;
        $data->image = $name;  
        $data->save();

        return response()->json([
            'status' => 200,
            'message' => 'Data Inserted Successfully',
            'data' => $data
        ]);
    }

    public function store_syntoms(Request $request)
    {
       // return $request->all();
       $data = new MhpSkinExmiSymtom();
       $data->patient_id = $request->patient_id;
       $data->skin_exami_id = $request->skin_exami_id;
       $data->bodyPart_name = $request->bodyPart_name;
       $data->symptom_id = $request->symptom_id;  
       $data->save();

       return response()->json([
           'status' => 200,
           'message' => 'Data Inserted Successfully',
           'data' => $data
       ]);
    }
}
