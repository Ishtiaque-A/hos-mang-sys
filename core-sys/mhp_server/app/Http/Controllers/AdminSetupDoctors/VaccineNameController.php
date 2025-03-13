<?php

namespace App\Http\Controllers\AdminSetupDoctors;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpVaccineName;
use Illuminate\Support\Facades\Validator;

class VaccineNameController extends Controller
{
    public function index()
    {
        $vaccine_name = MhpVaccineName::orderBy('id', 'desc')->get();

        return response()->json(["status" => 200, "vaccine_name" => $vaccine_name]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'vaccine_name' => 'required|max:100',
        ]);
           
        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
            $vaccine_name = new MhpVaccineName();
            $vaccine_name->vaccine_name = $request->vaccine_name;
            $vaccine_name->save();

            return response()->json(['status'=>200,'message'=>'Vaccine Name added successfully']);
        }
        
    }

    public function edit($id)
    {
        $vaccine_name = MhpVaccineName::find($id);

        return response()->json(["status"=>200,"vaccine_name"=>$vaccine_name]);
    }

    
    public function update(Request $request, $id)
    {

            $validator = Validator::make($request->all(),[
            'vaccine_name' => 'required|max:100',
        ]);
           

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
            $update_path=MhpVaccineName::find($id);
            $update_path->vaccine_name=$request->vaccine_name;

            $update_path->update();

            return response()->json(['status'=>200,'message'=>'Vaccine Name updated successfully']);
        }
    }


    public function destroy ($id){
        $vaccine_name = MhpVaccineName::find($id);
        $vaccine_name->delete();
        return response()->json([
            "status"=> 200,
            "message"=> "Vaccine Name deleted successfully"
        ]);
    }
}
