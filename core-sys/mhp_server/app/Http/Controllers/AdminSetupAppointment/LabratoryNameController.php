<?php

namespace App\Http\Controllers\AdminSetupAppointment;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpLabratory;
use Validator;

class LabratoryNameController extends Controller
{

    public function index()
    {

        $all_labratory = MhpLabratory::orderBy('id', 'desc')->get();


        return response()->json(
            ['status' => 200, 'all_labratory' => $all_labratory]
        );
    }
    // public function store(Request $request)
    // {

    //         $labratory = new MhpLabratory();
    //         $labratory->labratory_name = $request->labratory_name;

    //         $labratory->save();

    //         return response()->json(['status'=>200,'message'=>'Labratory Added Successfully']);

    // }


    public function store(Request $request)
    {
        // return $request->all();

        $request->validate([
            'labratory_name' => 'required',
        ]);

        if ($files = $request->file('image')) {
            $names = $files->getClientOriginalName();
            $name = rand(11, 99999) . $names;
            $files->move('labotory/', $name);
        } else {
            $name = "";
        }

        $labratory = new MhpLabratory();
        $labratory->labratory_name = $request->labratory_name;
        $labratory->address = $request->address;
        $labratory->phone = $request->phone;
        $labratory->fax = $request->fax;
        $labratory->email = $request->email;
        $labratory->websiteLink = $request->websiteLink;
        $labratory->logo = $name;
        $labratory->save();

        return response()->json(['status' => 200, 'message' => 'Labratory Added Successfully']);
    }


    public function edit($id)
    {
        $edit_labratory = MhpLabratory::find($id);
        return response()->json(['status' => 200, 'edit_labratory' => $edit_labratory]);
    }
    //     public function update(Request $request, $id)
    // {
    //         $update_lab=MhpLabratory::find($id);
    //         $update_lab->labratory_name=$request->labratory_name;
    //         $update_lab->update();

    //         return response()->json(['status'=>200,'message'=>'Labratory Updated Successfully']);

    // }


    public function update(Request $request, $id)
    {
        try {
            $update_lab = MhpLabratory::find($id);
            $update_lab->labratory_name = $request->labratory_name;
            $update_lab->address = $request->address;
            $update_lab->phone = $request->phone;
            $update_lab->fax = $request->fax;
            $update_lab->email = $request->email;
            $update_lab->websiteLink = $request->websiteLink;
            if ($files = $request->file('logo')) {

                if (file_exists('labotory/' . $update_lab->logo) && is_file('labotory/' . $update_lab->logo)) {
                    unlink('labotory/' . $update_lab->logo);
                }
                $names = $files->getClientOriginalName();
                $name = rand(11, 99999) . $names;
                $files->move('labotory/', $name);
                $update_lab->logo = $name;
            } else {
                $name = "";
            }
            $update_lab->update();

            return response()->json(['status' => 200, 'message' => 'Labratory Updated Successfully']);
        } catch (\Throwable $th) {
            return response()->json(['status' => 400, 'message' => $th->getMessage()]);
        }
    }

    public function destroy($id)
    {
        $del_lab = MhpLabratory::find($id);
        $del_lab->delete();
        return response()->json(['status' => 200, 'message' => 'Labratory Deleted Successfully']);
    }
}
