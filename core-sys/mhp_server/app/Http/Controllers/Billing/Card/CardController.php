<?php

namespace App\Http\Controllers\Billing\Card;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MhpCard;
use Illuminate\Support\Facades\Validator;

class CardController extends Controller
{
    public function index()
    {
        $card = MhpCard::where('delete_status',0)->orderBy('id','desc')->get();


        return response()->json(
            ['status'=>200,'card'=>$card]);
    }



    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),[
            'card_name' => 'required|max:100',
        ]);
           

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
            $card = new MhpCard();
            $card->card_name = $request->card_name;
            $card->save();

            return response()->json(['status'=>200,'message'=>'Card Added Successfully']);
        }
    }


    public function edit($id)
    {
        $card=MhpCard::find($id);
        return response()->json(['status'=>200,'card'=>$card]);
    }


    public function update(Request $request, $id)
    {

            $validator = Validator::make($request->all(),[
            'card_name' => 'required|max:100',
        ]);
           

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages(),
            ]);

        }else{
            $update_card=MhpCard::find($id);
            $update_card->card_name=$request->card_name;

            $update_card->update();

            return response()->json(['status'=>200,'message'=>'Card  Updated Successfully']);
        }
    }

    public function destroy($id)
    {
        $del_card = MhpCard::find($id);

        if ($del_card)
        {
            if ($del_card['delete_status']==0){
                $delete_status = 1;
            }else{
                $delete_status = 0;
            }
            $del_card->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Card  deleted successfully',
            ]);

        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No card  Found',
            ]);
        }


    }
}
