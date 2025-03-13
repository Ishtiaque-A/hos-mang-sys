<?php

namespace App\Http\Controllers\AdminSetupDoctors;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpVaccineAgainst;
use DB;
class VaccineAgainstController extends Controller
{

      public function index()
    {
        $vaccine_tags = DB::table('mhp_vaccine_againsts')->leftJoin('mhp_vaccine_names','mhp_vaccine_names.id','mhp_vaccine_againsts.vaccine_id')->select('mhp_vaccine_againsts.*','mhp_vaccine_names.vaccine_name')->orderBy('mhp_vaccine_againsts.id', 'desc')->get();

        return response()->json(["status" => 200, "vaccine_tags" => $vaccine_tags]);
    }

        public function store(Request $request)
    {
       // return  $request->all();
    
            // $vaccine_against = new MhpVaccineAgainst();
            // $vaccine_against->vaccine_id = $request->vaccine_id;
            // $vaccine_against->against_tags = implode(",",$request->against_tags);
            // $vaccine_against->save();

            MhpVaccineAgainst::create($request->all());
            return response()->json([
                "status" => 200,
                "message" => "Vaccine Against Tags added successfully"
            ]);
        
    }
      public function edit($id)
    {
        // $vaccine_against = MhpVaccineAgainst::find($id);
         $vaccine_against = DB::table('mhp_vaccine_againsts')->leftJoin('mhp_vaccine_names','mhp_vaccine_names.id','mhp_vaccine_againsts.vaccine_id')->select('mhp_vaccine_againsts.*','mhp_vaccine_names.vaccine_name')->where('mhp_vaccine_againsts.id',$id)->first();

        return response()->json(["status"=>200,"vaccine_against"=>$vaccine_against]);
    }
        public function update (Request $request, $id) {
           MhpVaccineAgainst::find($id)->update($request->all());;
            return response()->json([
                "status" => 200,
                "message" => "Vaccine Against updated successfully"
            ]);
        
    }

      public function destroy ($id){
        $vaccine_against = MhpVaccineAgainst::find($id);
        $vaccine_against->delete();
        return response()->json([
            "status"=> 200,
            "message"=> "Vaccine Against deleted successfully"
        ]);
    }
}
