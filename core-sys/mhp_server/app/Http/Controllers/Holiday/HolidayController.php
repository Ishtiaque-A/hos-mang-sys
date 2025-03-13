<?php

namespace App\Http\Controllers\Holiday;

use Carbon\Carbon;
use App\Models\Holiday;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\HolidayGroup;
use App\Models\HolidaySubGroup;
use App\Models\WeekendHoliday;
use Illuminate\Support\Facades\Validator;
use PhpParser\Node\Stmt\TryCatch;

class HolidayController extends Controller
{

    public function index()
    {
        $holidays = Holiday::with('holidaySubGroup', 'groupBy')->latest()->get();
        return response()->json([
            'status' => 200,
            'data' => $holidays

        ]);
    }

    public function store(Request $request)
    {

        $holiday = new Holiday();
        $holiday->holiday_group_id = $request->group_by;
        $holiday->holiday_sub_group_id = $request->group_info;
        $holiday->date = date('Y-m-d', strtotime($request->date));
        if ($request->endDate) {
            $holiday->endDate = date('Y-m-d', strtotime($request->endDate));
        }
        $holiday->save();
        return response()->json(['status' => 200, 'message' => 'Holiday data created successfully', 'data' => $holiday]);
    }

    public function update(Request $request, $id)
    {
        $holiday = Holiday::find($id);
        $holiday->holiday_group_id = $request->group_by;
        $holiday->holiday_sub_group_id = $request->group_info;
        $holiday->date = date('Y-m-d', strtotime($request->date));
        if ($request->endDate) {
            $holiday->endDate = date('Y-m-d', strtotime($request->endDate));
        }
        $holiday->save();
        return response()->json(['status' => 200, 'message' => 'Holiday data update successfully', 'data' => $holiday]);
    }

    public function destroy($id)
    {
        $holiday = Holiday::find($id);
        $holiday->delete();
        return response()->json(['status' => 200, 'message' => 'Holiday data delete successfully']);
    }

    public function workingDayOnHolidayStore(Request $request)
    {
        $date = date('Y-m-d', strtotime($request->date));
        $holiday = Holiday::where('date', $date)->first();
        if ($holiday) {
            $updateholiday = new Holiday();
            $updateholiday->doctors_master_id = $request->doctorId;
            $updateholiday->holiday_group_id = $holiday->group_by;
            $updateholiday->holiday_sub_group_id = $holiday->group_info;
            $updateholiday->date = $date;
            $updateholiday->status = 0;
            $updateholiday->save();
            return response()->json(['status' => 200, 'message' => 'Add Doctor created successfully', 'data' => $holiday]);
        } else {
            return response()->json(['status' => 404, 'message' => "Dosen't have any holiday", 'data' => $holiday]);
        }
    }

    public function workingDayOniHoliday()
    {
        $holiday = Holiday::with('doctors')->where('status', 0)->latest()->get();
        return response()->json([
            'status' => 200,
            'data' => $holiday
        ]);
    }

    public function workingDayOnHolidayEdit(Request $request, $id)
    {
        $date = date('Y-m-d', strtotime($request->date));
        $holiday = Holiday::where('date', $date)->first();
        if ($holiday) {
            $updateholiday = Holiday::find($id);
            $updateholiday->doctors_master_id = $request->doctorId['id'];;
            $updateholiday->group_by = $holiday->group_by;
            $updateholiday->group_info = $holiday->group_info;
            $updateholiday->date = $date;
            $updateholiday->status = 0;
            $updateholiday->save();
            return response()->json(['status' => 200, 'message' => 'Add Doctor created successfully', 'data' => $holiday]);
        } else {
            return response()->json(['status' => 404, 'message' => "Dosen't have any holiday", 'data' => $holiday]);
        }
    }
    public function workingDayOnHolidayDelete($id)
    {
        $holiday = Holiday::find($id);
        $holiday->delete();
        return response()->json(['status' => 200, 'message' => 'Holiday data delete successfully']);
    }

    // holiday Group
    public function holidayGroup(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'group_by' => 'required',
            ]);
            if ($validator->fails()) {
                return response()->json(['status' => 422, 'message' => $validator->errors()]);
            }

            $holiday = new HolidayGroup();
            $holiday->name = $request->group_by;
            $holiday->save();
            return response()->json(['status' => 200, 'message' => 'Holiday Group data created successfully']);
        } catch (\Throwable $th) {
            return response()->json(['status' => 500, 'message' => 'Error creating holiday', 'error' => $th->getMessage()]);
        }
    }

    public function holidayGroupData()
    {
        try {
            $data = HolidayGroup::latest()->get();
            return response()->json(['status' => 200, 'message' => 'Holiday Group successfully get data', 'data' => $data]);
        } catch (\Throwable $th) {
            return response()->json(['status' => 500, 'message' => 'Error geting holiday group', $th->getMessage()]);
        }
    }

    public function holidayGroupEdit($id)
    {
        try {
            $data = HolidayGroup::where('id', $id)->first();
            return response()->json(['status' => 200, 'message' => 'Holiday Group successfully get data', 'data' => $data]);
        } catch (\Throwable $th) {
            return response()->json(['status' => 500, 'message' => 'Error geting holiday group', $th->getMessage()]);
        }
    }



    public function holidayGroupUpdate(Request $request, $id)
    {
        try {
            $validator = Validator::make($request->all(), [
                'group_by' => 'required',
            ]);
            if ($validator->fails()) {
                return response()->json(['status' => 422, 'message' => $validator->errors()]);
            }
            $holiday = HolidayGroup::find($id);
            $holiday->name = $request->group_by;
            $holiday->save();
            return response()->json(['status' => 200, 'message' => 'Holiday Group data update successfully', 'data' => $holiday]);
        } catch (\Throwable $th) {
            return response()->json(['status' => 500, 'message' => 'Error geting holiday group', $th->getMessage()]);
        }
    }

    public function holidayGroupDestroy($id)
    {
        try {
            $holiday = HolidayGroup::find($id);
            $holiday->delete();
            return response()->json(['status' => 200, 'message' => 'Holiday Group data delete successfully']);
        } catch (\Throwable $th) {
            return response()->json(['status' => 500, 'message' => 'Error geting holiday group', $th->getMessage()]);
        }
    }

    // holiday sub group data

    public function holidaySubGroupData()
    {
        try {
            $data = HolidaySubGroup::with('holidayGroup')->latest()->get();
            return response()->json(['status' => 200, 'message' => 'Holiday Sub Group successfully get data', 'data' => $data]);
        } catch (\Throwable $th) {
            return response()->json(['status' => 500, 'message' => 'Error geting holiday sub group', $th->getMessage()]);
        }
    }

    public function holidayGroupDataForSubGroup()
    {
        try {
            $data = HolidayGroup::with('holidaysubGroup')->latest()->get();
            return response()->json(['status' => 200, 'message' => 'Holiday Sub Group successfully get data', 'data' => $data]);
        } catch (\Throwable $th) {
            return response()->json(['status' => 500, 'message' => 'Error geting holiday sub group', $th->getMessage()]);
        }
    }

    public function holidayGroupDataForHolidayList()
    {
        try {
            $data = HolidaySubGroup::latest()->get();
            return response()->json(['status' => 200, 'message' => 'Holiday Sub Group successfully get data', 'data' => $data]);
        } catch (\Throwable $th) {
            return response()->json(['status' => 500, 'message' => 'Error geting holiday sub group', $th->getMessage()]);
        }
    }

    public function holidaySubGroup(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'group_by' => 'required',
                'sub_group_name' => 'required',
            ]);
            if ($validator->fails()) {
                return response()->json(['status' => 422, 'message' => $validator->errors()]);
            }
            $holiday = new HolidaySubGroup();
            $holiday->holiday_group_id = $request->group_by;
            $holiday->sub_group_name = $request->sub_group_name;
            $holiday->save();
            return response()->json(['status' => 200, 'message' => 'Holiday Group data created successfully']);
        } catch (\Throwable $th) {
            return response()->json(['status' => 500, 'message' => 'Error creating holiday', 'error' => $th->getMessage()]);
        }
    }

    public function holidaySubGroupEdit($id)
    {
        try {
            $holidayGroup = HolidaySubGroup::with('holidayGroup')->where('id', $id)->first();
            return response()->json(['status' => 200, 'message' => 'Holiday Group successfully get data', 'data' => $holidayGroup]);
        } catch (\Throwable $th) {
            return response()->json(['status' => 500, 'message' => 'Error geting holiday group', $th->getMessage()]);
        }
    }

    public function holidaySubGroupUpdate(Request $request, $id)
    {
        try {
            $validator = Validator::make($request->all(), [
                'group_by' => 'required',
                'sub_group_name' => 'required',
            ]);
            if ($validator->fails()) {
                return response()->json(['status' => 422, 'message' => $validator->errors()]);
            }
            $holiday = HolidaySubGroup::find($id);
            $holiday->holiday_group_id = $request->group_by;
            $holiday->sub_group_name = $request->sub_group_name;
            $holiday->save();
            return response()->json(['status' => 200, 'message' => 'Holiday Group data update successfully', 'data' => $holiday]);
        } catch (\Throwable $th) {
            return response()->json(['status' => 500, 'message' => 'Error geting holiday group', $th->getMessage()]);
        }
    }

    public function holidaySubGroupDestroy($id)
    {
        try {
            $holiday = HolidaySubGroup::find($id);
            $holiday->delete();
            return response()->json(['status' => 200, 'message' => 'Holiday Sub Group data delete successfully']);
        } catch (\Throwable $th) {
            return response()->json(['status' => 500, 'message' => 'Error geting holiday sub group', $th->getMessage()]);
        }
    }

    public function GetHolidaySunGroupName($id)
    {
        try {
            $data = HolidaySubGroup::where('holiday_group_id', $id)->latest()->get();
            return response()->json(['status' => 200, 'message' => 'Holiday Sub Group successfully get data', 'data' => $data]);
        } catch (\Throwable $th) {
            return response()->json(['status' => 500, 'message' => 'Error geting holiday sub group', $th->getMessage()]);
        }
    }

    // holiday weekend
    public function holidayWeekend(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'search.*' => 'required',
            ]);
            // return $request->all();
            if ($validator->fails()) {
                return response()->json(['status' => 422, 'message' => $validator->errors()]);
            }
            $data = WeekendHoliday::get();
            if (!$data) {
                foreach ($request->search as $item) {
                    $holiday = new WeekendHoliday();
                    $holiday->name = $item['name'];
                    $holiday->effictive_date = date('Y-m-d', strtotime($item['effictive_date'] . '+ 24 hours'));
                    $holiday->save();
                }
            } else {
                WeekendHoliday::truncate();
                foreach ($request->search as $item) {
                    $holiday = new WeekendHoliday();
                    $holiday->name = $item['name'];
                    $holiday->effictive_date = date('Y-m-d', strtotime($item['effictive_date'] . '+ 24 hours'));
                    $holiday->save();
                }
            }


            return response()->json(['status' => 200, 'message' => 'Holiday weekend created successfully']);
        } catch (\Throwable $th) {
            return response()->json(['status' => 500, 'message' => 'Error creating holiday', 'error' => $th->getMessage()]);
        }
    }

    public function holidayWeekendData()
    {
        try {
            $data = WeekendHoliday::latest()->get();
            return response()->json(['status' => 200, 'message' => 'Holiday weekend data successfully get', 'data' => $data]);
        } catch (\Throwable $th) {
            return response()->json(['status' => 500, 'message' => 'Error geting holiday group', $th->getMessage()]);
        }
    }

    public function holidayWeekendEdit($id)
    {
        try {
            $data = WeekendHoliday::where('id', $id)->first();
            return response()->json(['status' => 200, 'message' => 'Holiday weekend data successfully get', 'data' => $data]);
        } catch (\Throwable $th) {
            return response()->json(['status' => 500, 'message' => 'Error geting holiday group', $th->getMessage()]);
        }
    }

    public function holidayWeekendUpdate(Request $request, $id)
    {
        try {
            $validator = Validator::make($request->all(), [
                'search.*' => 'required',
            ]);
            if ($validator->fails()) {
                return response()->json(['status' => 422, 'message' => $validator->errors()]);
            }
            foreach ($request->search as $item) {
                $holiday = WeekendHoliday::where('id', $id)->first();
                $holiday->name = $item;
                $holiday->save();
            }
            return response()->json(['status' => 200, 'message' => 'Holiday Weekend successfully get data']);
        } catch (\Throwable $th) {
            return response()->json(['status' => 500, 'message' => 'Error geting holiday group', $th->getMessage()]);
        }
    }
}
