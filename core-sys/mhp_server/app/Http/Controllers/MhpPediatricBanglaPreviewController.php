<?php

namespace App\Http\Controllers;

use App\Models\MhpPatientEuducationHeading;
use App\Models\MhpPediatricBanglaPreview;
use Facade\FlareClient\Stacktrace\File as StacktraceFile;
use Illuminate\Http\Request;
use File;

class MhpPediatricBanglaPreviewController extends Controller
{
     public function index()
    {
      $pData= MhpPediatricBanglaPreview::get();

        return response()->json([
            'status' => 200,
            'message' => 'Data get Successfully',
            'pData' => $pData
        ]);

    }
     public function index_by_heading($id)
    {
      $Data= MhpPediatricBanglaPreview::where('headingId',$id)->get();

        return response()->json([
            'status' => 200,
            'message' => 'Data get Successfully',
            'Data' => $Data
        ]);

    }
    public function store(Request $request)
    {    
            if ($files = $request->file('pfileName')) {
                $fileNames = $files->getClientOriginalName();
                $fileName = rand(11, 99999).$fileNames;
                $files->move('Peditrict/', $fileName);
            }

            $peditrict = new MhpPediatricBanglaPreview();
            $peditrict->name =  $request->name;            
            $peditrict->headingId =  $request->headingId;            
            $peditrict->file =  $fileName;            
            $peditrict->save();
            
            return response()->json([
                'status' => 200,
                'message' => 'Data Inserted Successfully',
                'peditrict' => $peditrict
            ]);
    }
    public function destroy($id)
    {    
            $peditrict = MhpPediatricBanglaPreview::findOrFail($id);  
            $image_path = public_path("/Peditrict/{$peditrict->file}");
            if (File::exists($image_path)) {
                File::delete($image_path);
            }
            $peditrict->delete();

            return response()->json([
                'status' => 200,
                'message' => 'Data deleted Successfully'
            ]);
    }
    public function save_heading(Request $request)
    {    
            $data = new MhpPatientEuducationHeading();
            $data->name =  $request->name;            
            $data->save();
            
            return response()->json([
                'status' => 200,
                'message' => 'Data Inserted Successfully',
                'data' => $data
            ]);
    }
    public function heading()
    {    
            $data = MhpPatientEuducationHeading::get();
            
            return response()->json([
                'status' => 200,
                'message' => 'Data Inserted Successfully',
                'data' => $data
            ]);
    }
    public function heading_destroy($id)
    {    
            $data = MhpPatientEuducationHeading::find($id);
            $data->delete();
            
            return response()->json([
                'status' => 200,
                'message' => 'Data deleted Successfully'
            ]);
    }
      
}
