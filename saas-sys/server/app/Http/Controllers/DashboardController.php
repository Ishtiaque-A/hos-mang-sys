<?php

namespace App\Http\Controllers;

use App\Traits\ApiCallTrait;
use App\Traits\FileProcessingTrait;
use App\Traits\GoogleLoginVerificationTrait;
use App\Traits\MailTrait;
use App\Traits\UserCheckTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class DashboardController extends BaseController {
    use ApiCallTrait, FileProcessingTrait, GoogleLoginVerificationTrait, MailTrait, UserCheckTrait;

    private function month($month) {
        switch ($month) {
            case '1':
                return 'January';
            case '2':
                return 'February';
            case '3':
                return 'March';
            case '4':
                return 'April';
            case '5':
                return 'May';
            case '6':
                return 'June';
            case '7':
                return 'July';
            case '8':
                return 'August';
            case '9':
                return 'September';
            case '10':
                return 'October';
            case '11':
                return 'November';
            case '12':
                return 'December';
            default:
                return '';
        }
    }

    public function dashboard(Request $request) {
        $duration = $request->input('duration') ?? 30;
        $prevDate = Carbon::now()->subDays($duration);
        $totalSellPrice = DB::table('purchases')
            ->where('created_at', '>=', $prevDate)
            ->sum('sell_price');
        $organizations = DB::table('organizations')
            ->where('created_at', '>=', $prevDate)
            ->count('id');
        $total_purchases = DB::table('purchases')
            ->where('created_at', '>=', $prevDate)
            ->count('id');
        $users = DB::table('users')
            ->where('created_at', '>=', $prevDate)
            ->count('id');
        $new_request = DB::table('subscription_requests')
            ->where('created_at', '>=', $prevDate)
            ->count('id');

        $prevDate = Carbon::now()->subMonths(12);
        $priceQuery = DB::table(DB::raw('(SELECT MONTH(created_at) as month, SUM(sell_price) as total_sell_price, COUNT(id) as purchase_count FROM purchases WHERE created_at >= ? GROUP BY MONTH(created_at)) as subquery'))
            ->addBinding($prevDate, 'select'); // Binding for the subquery

        $result = DB::table($priceQuery, 'subquery_alias')
            ->rightJoin(DB::raw('(SELECT 1 as month UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10 UNION SELECT 11 UNION SELECT 12) as months'), function ($join) {
                $join->on('subquery_alias.month', '=', 'months.month');
            })
            ->select('months.month', DB::raw('COALESCE(subquery_alias.total_sell_price, 0) as total_sell_price'), DB::raw('COALESCE(subquery_alias.purchase_count, 0) as purchase_count'))
            ->orderBy('months.month')
            ->get();

        $month = [];
        $amount = [];
        $purchase_count = [];
        if (isset($result[0])) {
            foreach ($result as $item) {
                $month[] = $this->month($item->month);
                $amount[] = $item->total_sell_price;
                $purchase_count[] = $item->purchase_count;
            }
        }

        return $this->successResponse([
            'summaries' => [
                'total_sell' => $totalSellPrice,
                'organizations' => $organizations,
                'total_purchases' => $total_purchases,
                'new_users' => $users,
                'new_request' => $new_request,
            ],
            'sell' => [
                'amount' => $amount,
                'month' => $month,
            ],
            'purchases' => [
                'count' => $purchase_count,
                'month' => $month,
            ],
        ]);
    }
}
