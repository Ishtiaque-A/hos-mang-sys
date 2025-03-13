<?php

namespace App\Http\Controllers;


use App\Models\LabTestName;
use Illuminate\Http\Request;
use Validator;
use DB;


class LabTestNameController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // $testName = DB::table('lab_test_names')->leftJoin('mhp_lab_test_types','mhp_lab_test_types.id','=','lab_test_names.test_type_id')->get();
        // return response()->json([
        //     'status' => 200,
        //     'testName' => $testName ,
        // ]);

         $testName = LabTestName::with('TypeName')->get();
        return response()->json([
            'status' => 200,
            'testName' => $testName ,
        ]);
 
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // $testName= new LabTestName();
        // $testName->test_type_id=$request->test_type_id;
        // $testName->test_name=$request->test_name;
        // $testName->save();

        
        // return response()->json([
        //     'status' => 200,
        //     'message' => 'Lab Test Name Inserted Successfully',
        //     'testName' => $testName
        // ]);
        $validator = Validator::make($request->all(),[
            'test_name' => 'required|max:100',                                        
            'test_type_id' => 'required|max:100',                                        
        ]);
           
        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
            $testName = new LabTestName();
            $testName->test_type_id=$request->test_type_id;
            $testName->test_name = $request->test_name;
            $testName->save();

            return response()->json(['status'=>200,'message'=>'Lab Test Name Added Successfully']);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\LabTestName  $labTestName
     * @return \Illuminate\Http\Response
     */
    public function show(LabTestName $labTestName)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\LabTestName  $labTestName
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $data = LabTestName::with('TypeName')->find($id);

        return response()->json([
            'status' => 200,
            "testName" => $data
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\LabTestName  $labTestName
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // $testName = LabTestName::find($id);
        // $testName->test_name = $request->test_name;
        // $testName->test_type_id = $request->test_type_id;
        // $testName->update();

        // return response()->json([
        //     'status' => 200,
        //     'message' => 'Lab Test Name Update Successfully',
        //     'testName' => $testName
        // ]);
        $validator = Validator::make($request->all(),[
            'test_name' => 'required|max:100',
            'test_type_id' => 'required|max:100',
        ]);
           

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
            $update_path=LabTestName::find($id);
            $update_path->test_name=$request->test_name;
            $update_path->test_type_id=$request->test_type_id;

            $update_path->update();

            return response()->json(['status'=>200,'message'=>'Lab Test Name  Updated Successfully']);
        }
    } 

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\LabTestName  $labTestName
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {
         //return $id;
        $testName = LabTestName::find($id);
         $testName->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Lab Test Name Delete Successfully',
            'data'=>$testName
        ]);
    }
}
