<?php

namespace App\Http\Controllers;

use App\Models\MhpLabAgentRateList;
use App\Models\MhpAllRateList;
use Illuminate\Http\Request;

class MhpLabAgentRateListController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = MhpLabAgentRateList::orderBy('id', 'asc')->get();
        return response()->json([
            "status" => 200,
            "message" => "All rate list categories",
            "category" => $data
        ]);
    }

    public function store(Request $request)

    {
        if ($files = $request->file('icon')) {
            $names = $files->getClientOriginalName();
            $name = rand(111, 99999) . $names;
            $files->move('labAgent/images/', $name);
        } else {
            $name = "";
        }

        $data = new MhpLabAgentRateList();
        $data->name = $request->name;
        $data->icon = $name;

        $data->save();
        return response()->json([
            "status" => 200,
            "message" => "Rate list category added successfully",
            "category" => $data
        ]);
    }

    public function show($id)
    {
        $data = MhpLabAgentRateList::find($id);
        return response()->json([
            "status" => 200,
            "category" => $data
        ]);
    }

    public function update(Request $request, $id)
    {
        $data = MhpLabAgentRateList::find($id);
        if ($files = $request->file('icon')) {
            $names = $files->getClientOriginalName();
            $name = rand(111, 99999) . $names;
            $files->move('labAgent/images/', $name);
        } else {
            $name = "";
        }
        $data->name = $request->name;
        $data->icon = $name;

        $data->save();
        return response()->json([
            "status" => 200,
            "message" => "Rate list category updated successfully",
            "category" => $data
        ]);
    }

    public function destroy($id)
    {
        $data = MhpLabAgentRateList::find($id);
        $data->delete();
        return response()->json([
            "status" => 200,
            "message" => "Rate list category deleted successfully",
        ]);
    }

    // All rate list 
    public function allRateList()

    {
        $data = MhpAllRateList::with("patient_birth_sex", "rateListCategory")->orderBy("id", "desc")->get();
        return response()->json([
            "status" => 200,
            "message" => "Rate list",
            "rateList" => $data
        ]);
    }
    public function addAllRateList(Request $request)

    {
        $data = new MhpAllRateList();
        $data->name = $request->name;
        $data->code = $request->code;
        $data->categoryId = $request->categoryId;
        $data->gender = $request->gender;
        $data->fee = $request->fee;
        $data->preBooking = $request->preBooking;
        $data->details = $request->details;
        $data->revenue = $request->revenue;

        $data->save();
        return response()->json([
            "status" => 200,
            "message" => "Rate list added successfully",
            "rateList" => $data
        ]);
    }

    public function editAllRateList($id)
    {
        $data = MhpAllRateList::find($id);
        return response()->json([
            "status" => 200,
            "rateList" => $data
        ]);
    }

    public function deleteAllRateList($id)
    {
        $data = MhpAllRateList::find($id);
        $data->delete();
        return response()->json([
            "status" => 200,
            "message" => "Rate list deleted successfully",
        ]);
    }
    public function updateAllRateList(Request $request,$id)
    {
        $data = MhpAllRateList::find($id);
        $data->name = $request->name;
        $data->code = $request->code;
        $data->categoryId = $request->categoryId;
        $data->gender = $request->gender;
        $data->fee = $request->fee;
        $data->preBooking = $request->preBooking;
        $data->details = $request->details;
        $data->revenue = $request->revenue;

        $data->save();
        return response()->json([
            "status" => 200,
            "message" => "Rate list updated successfully",
            "rateList" => $data
        ]);
    }
    public function rateListById($id)
    {
        $data = MhpAllRateList::with("patient_birth_sex", "rateListCategory")->where('categoryId', $id)->orderBy('id','desc')->get();
        return response()->json([
            "status" => 200,
            "message" => "Rate list updated successfully",
            "rateList" => $data
        ]);
    }
}
