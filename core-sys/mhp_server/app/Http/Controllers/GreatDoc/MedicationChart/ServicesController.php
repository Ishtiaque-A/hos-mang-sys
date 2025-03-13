<?php

namespace App\Http\Controllers\GreatDoc\MedicationChart;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpService;
// use Illuminate\Support\Facades\Validator;
use Validator;
class ServicesController extends Controller
{
       
 public function index()
    {
        $service = MhpService::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'service'=>$service]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'services_name' => 'required|max:100',
        ]);
           

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
            $service = new MhpService();
            $service->services_name = $request->services_name;
            $service->save();

            return response()->json(['status'=>200,'message'=>'service Added Successfully']);
        }
    }


    public function edit($id)
    {
        $service=MhpService::find($id);
        return response()->json(['status'=>200,'service'=>$service]);
    }


    public function update(Request $request, $id)
    {

            $validator = Validator::make($request->all(),[
            'services_name' => 'required|max:100',
        ]);
           

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
            $update_service=MhpService::find($id);
            $update_service->services_name=$request->services_name;

            $update_service->update();

            return response()->json(['status'=>200,'message'=>'service  Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_service = MhpService::find($id);

        if ($del_service)
        {
            if ($del_service['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_service->delete();
            return response()->json([
                'status' => 200,
                'message' => 'service  deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No service  Found',
            ]);
        }


    }
}
