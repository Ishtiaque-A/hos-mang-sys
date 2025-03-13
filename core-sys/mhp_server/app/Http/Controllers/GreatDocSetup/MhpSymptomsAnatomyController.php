<?php

namespace App\Http\Controllers\GreatDocSetup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpSymptomAnatomy;
use App\Models\MhpMainBodyPart;
use App\Models\MhpSubBodyPart;
use App\Models\MhpPatientSymptomAnatomy;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
class MhpSymptomsAnatomyController extends Controller
{
  
  public function index()
    {
        $symptoms_anatomy = DB::table('mhp_symptom_anatomies')->leftJoin('mhp_main_body_parts','mhp_main_body_parts.id','=','mhp_symptom_anatomies.main_body_part_id')->leftJoin('mhp_sub_body_parts','mhp_sub_body_parts.id','=','mhp_symptom_anatomies.sub_body_part_id')->leftJoin('mhp_birth_sexes','mhp_birth_sexes.id','=','mhp_symptom_anatomies.gender_id')->where('mhp_symptom_anatomies.delete_status',0)->select('mhp_symptom_anatomies.*','mhp_main_body_parts.MainBodyPart_name','mhp_sub_body_parts.SubBodyPart_name','mhp_birth_sexes.birth_sex_name')->orderBy('mhp_symptom_anatomies.id','desc')->get();
        return response()->json([
            'status' => 200,
            'symptoms_anatomy' => $symptoms_anatomy ,
        ]);
    }

    public function store(Request $request)
    {   


        $validator = Validator::make($request->all(),[
            'main_body_part_id' => 'required|max:100',
            'side_selection_name' => 'required|max:100',
            'gender_id' => 'required',
            'symptom_name'=>'required|unique:mhp_symptom_anatomies'

        ],
// ['MainBodyPart_id.required'=>'Main Body Part Name is required']
         );

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }
        else{
            $symptoms_anatomy = new MhpSymptomAnatomy();
            $symptoms_anatomy->main_body_part_id = $request->main_body_part_id;
            $symptoms_anatomy->sub_body_part_id = $request->sub_body_part_id;
            $symptoms_anatomy->side_selection_name = $request->side_selection_name;
            $symptoms_anatomy->gender_id = $request->gender_id;
            $symptoms_anatomy->symptom_name = $request->symptom_name;
            $symptoms_anatomy->save();

            return response()->json([
                'status' => 200,
                'message' => 'Symptom added Successfully',
            ]);

        }
}

   public function edit($id)
    {
        $edit_anatomy=MhpSymptomAnatomy::find($id);
        return response()->json(['status'=>200,'edit_anatomy'=>$edit_anatomy]);
    }

        public function update(Request $request, $id)
    {

      
        $update_symptoms_anatomy=MhpSymptomAnatomy::find($id);
        $update_symptoms_anatomy->main_body_part_id=$request->main_body_part_id;
        $update_symptoms_anatomy->sub_body_part_id=$request->sub_body_part_id;
        $update_symptoms_anatomy->side_selection_name=$request->side_selection_name;
        $update_symptoms_anatomy->gender_id=$request->gender_id;
        $update_symptoms_anatomy->symptom_name =$request->symptom_name;
        $update_symptoms_anatomy->update();

        return response()->json(['status'=>200,'message'=>'Symptoms Updated Successfully']);
    }
    


public function destroy($id)
    {
        $del_anatomy = MhpSymptomAnatomy::find($id);

        if ($del_anatomy)
        {
            if ($del_anatomy['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_anatomy->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Symptoms deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Symptom  Found',
            ]);
        }


    }

//mobile api 


public function getAllSymptomsByGender($name,$gender){

    $getAllSymptomsByGender=DB::table('mhp_symptom_anatomies')
    ->leftJoin('mhp_main_body_parts','mhp_main_body_parts.id','=','mhp_symptom_anatomies.main_body_part_id')
    ->leftJoin('mhp_sub_body_parts','mhp_sub_body_parts.id','=','mhp_symptom_anatomies.sub_body_part_id')
    ->leftJoin('mhp_birth_sexes','mhp_birth_sexes.id','=','mhp_symptom_anatomies.gender_id')
    ->where('mhp_main_body_parts.MainBodyPart_name',$name)
    ->orWhere('mhp_sub_body_parts.SubBodyPart_name', $name)
    ->where('mhp_birth_sexes.birth_sex_name',$gender)
    ->where('mhp_symptom_anatomies.delete_status',0)->get();


    //     $getAllSymptomsByGender=DB::table('mhp_symptom_anatomies')
    // ->leftJoin('mhp_main_body_parts','mhp_main_body_parts.id','=','mhp_symptom_anatomies.main_body_part_id')
    // ->leftJoin('mhp_sub_body_parts','mhp_sub_body_parts.id','=','mhp_symptom_anatomies.sub_body_part_id')
    // ->leftJoin('mhp_birth_sexes','mhp_birth_sexes.id','=','mhp_symptom_anatomies.gender_id')
    // ->where('mhp_main_body_parts.MainBodyPart_name','LIKE', '%' .$name. '%')
    // ->orWhere('mhp_sub_body_parts.SubBodyPart_name','LIKE','%' .$name.'%')
    // ->where('mhp_birth_sexes.birth_sex_name','LIKE','%' .$gender.'%')
    // ->where('mhp_symptom_anatomies.delete_status',0)->get();


    // dd($getAllSymptomsByGender);
 
     return response()->json([
                'status' => 200,
                'getAllSymptomsByGender' => $getAllSymptomsByGender,
            ]);

}

  public function getAllSubBodySymptoms($id){
    $getSubBodyAllSymptoms=MhpSymptomAnatomy::where('sub_body_part_id',$id)->where('delete_status',0)->get();
        return response()->json([
                'status' => 200,
                'getSubBodyAllSymptoms' => $getSubBodyAllSymptoms,
            ]);
}
  public function getSymptomsByMainBodyPartName($name){

      $allSymptomsByMainBodyName=DB::table('mhp_symptom_anatomies')->leftJoin('mhp_main_body_parts','mhp_main_body_parts.id','=','mhp_symptom_anatomies.main_body_part_id')->where('mhp_main_body_parts.MainBodyPart_name','like', '%' .$name. '%')->select('mhp_symptom_anatomies.*','mhp_main_body_parts.MainBodyPart_name')->where('mhp_symptom_anatomies.delete_status', 0)->get();


return response()->json(['status'=>200,'allSymptomsByMainBodyName' => $allSymptomsByMainBodyName]);
}

    public function getAllSymptomsBySubOrMainBodyPartName($name){
  $getAllSymptoms=DB::table('mhp_symptom_anatomies')
    ->leftJoin('mhp_main_body_parts','mhp_main_body_parts.id','=','mhp_symptom_anatomies.main_body_part_id')
    ->leftJoin('mhp_sub_body_parts','mhp_sub_body_parts.id','=','mhp_symptom_anatomies.sub_body_part_id')
    ->where('mhp_main_body_parts.MainBodyPart_name','like', '%' .$name. '%')
    ->orWhere('mhp_sub_body_parts.SubBodyPart_name', 'like', '%' .$name. '%')
    ->select('mhp_symptom_anatomies.*','mhp_symptom_anatomies.symptom_name','mhp_sub_body_parts.SubBodyPart_name','mhp_main_body_parts.MainBodyPart_name')
    ->where('mhp_symptom_anatomies.delete_status',0)->get();

    $Both='both';
      $getAllSymptomsExpectFemaleLowerAbdomen=DB::table('mhp_symptom_anatomies')
    ->leftJoin('mhp_main_body_parts','mhp_main_body_parts.id','=','mhp_symptom_anatomies.main_body_part_id')
    ->leftJoin('mhp_sub_body_parts','mhp_sub_body_parts.id','=','mhp_symptom_anatomies.sub_body_part_id')
    ->leftJoin('mhp_birth_sexes','mhp_birth_sexes.id','=','mhp_symptom_anatomies.gender_id')
    ->where('mhp_main_body_parts.MainBodyPart_name','like', '%' .$name. '%')
    ->where('mhp_symptom_anatomies.gender_id',$Both)

    ->orWhere('mhp_sub_body_parts.SubBodyPart_name', 'like', '%' .$name. '%')
    ->where('mhp_symptom_anatomies.gender_id',$Both)

    ->select('mhp_symptom_anatomies.*','mhp_symptom_anatomies.symptom_name','mhp_sub_body_parts.SubBodyPart_name','mhp_main_body_parts.MainBodyPart_name','mhp_birth_sexes.birth_sex_name')
    ->where('mhp_symptom_anatomies.delete_status',0)->get();

      return response()->json([
                'status' => 200,
                'getAllSymptoms' => $getAllSymptoms,
                'LowerAbdomenForAll'=>$getAllSymptomsExpectFemaleLowerAbdomen
            ]);


}
  public function getFemaleSymptomsBySubOrMainBodyPartName($name){
    $femaleName='Female';
  $getAllSymptoms=DB::table('mhp_symptom_anatomies')
    ->leftJoin('mhp_main_body_parts','mhp_main_body_parts.id','=','mhp_symptom_anatomies.main_body_part_id')
    ->leftJoin('mhp_sub_body_parts','mhp_sub_body_parts.id','=','mhp_symptom_anatomies.sub_body_part_id')
    ->leftJoin('mhp_birth_sexes','mhp_birth_sexes.id','=','mhp_symptom_anatomies.gender_id')
    ->where('mhp_main_body_parts.MainBodyPart_name','like', '%' .$name. '%')
    ->where('mhp_birth_sexes.birth_sex_name',$femaleName)
    ->orWhere('mhp_sub_body_parts.SubBodyPart_name', 'like', '%' .$name. '%')
        ->where('mhp_birth_sexes.birth_sex_name',$femaleName)

    ->select('mhp_symptom_anatomies.*','mhp_symptom_anatomies.symptom_name','mhp_sub_body_parts.SubBodyPart_name','mhp_main_body_parts.MainBodyPart_name','mhp_birth_sexes.birth_sex_name')
    ->where('mhp_symptom_anatomies.delete_status',0)->get();

      return response()->json([
                'status' => 200,
                'getAllSymptoms' => $getAllSymptoms,
            ]);
}


//save patient symptom anatomy 
public function saveSymptomAnatomy(Request $request){
            $save_symptoms_anatomy=new MhpPatientSymptomAnatomy();
        $save_symptoms_anatomy->patient_id=$request->patient_id;
        $save_symptoms_anatomy->symptoms=implode(',', $request->symptoms);

        $save_symptoms_anatomy->save();

        return response()->json(['status'=>200,'message'=>'Patient Symptom added Successfully']);
}
}

  

