<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Spatie\Analytics\Period;
use DateTime;

class StatisticController extends Controller
{
    public $days = 30;

    public function pageVisits()
    {
        $totalVisitors = 0;
        $days = $this->days;
        $substractDays = $this->days;
        $today = date("d.m.Y");
        $data = \Analytics::fetchTotalVisitorsAndPageViews(Period::days($days));

        foreach ($data as $dt) {
            $visitors[] = $dt['visitors'];
            $totalVisitors += $dt['visitors'];
            $dates[] = date('d.m', (strtotime("-$substractDays day", strtotime($today))));
            $substractDays--;
        }

        $average = round(($totalVisitors / $days), 1);

        return response()->json([
            'avg' => $average,
            'visitors' => $visitors,
            'totalVisitors' => $totalVisitors,
            'dates' => $dates,
            'days' => $days
        ], 200);
    }

    public function loadVisits(Request $request)
    {
        $dateFrom = $request->datefrom;
        $dateTo = $request->dateto;

        $dateFrom = date("d.m.Y", strtotime($request->datefrom));
        $dateTo = date("d.m.Y", strtotime($request->dateto));

        $substractDateTo = $dateTo;
        $totalVisitors = 0;
        $days = round((strtotime($dateTo) - strtotime($dateFrom)) / (60 * 60 * 24));

        $dateFrom = DateTime::createFromFormat('d.m.Y', $dateFrom);
        $dateTo = DateTime::createFromFormat('d.m.Y', $dateTo);

        $substractDays = $days;
        $today = date("d.m.Y");
        $data = \Analytics::fetchTotalVisitorsAndPageViews(Period::create($dateFrom, $dateTo));

        foreach ($data as $dt) {
            $visitors[] = $dt['visitors'];
            $totalVisitors += $dt['visitors'];
            $dates[] = date('d.m', (strtotime("-$substractDays day", strtotime($substractDateTo))));
            $substractDays--;
        }

        $average = round(($totalVisitors / ($days + 1)), 1);

        return response()->json([
            'visitors' => $visitors,
            'avg' => $average,
            'totalVisitors' => $totalVisitors,
            'dates' => $dates,
            'days' => $days + 1
        ], 200);
    }
}
