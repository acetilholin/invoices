<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Setting;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $settings = Setting::all();
        $klavzule = $settings[0]->getAttributes();
        $company = $settings[1]->getAttributes();

        return response()->json([
            'klavzule' => $klavzule,
            'company' => $company
        ], 200);
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Setting  $settings
     * @return \Illuminate\Http\Response
     */
    public function show(Setting $settings)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Setting  $settings
     * @return \Illuminate\Http\Response
     */
    public function edit(Setting $settings)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Setting  $settings
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, Setting $settings)
    {
        $data = request(['visible', 'data']);

        Setting::where('data', $data['data'])
            ->update(['visible' => $data['visible']]);

        return response()->json([
            'success' => trans('settings.settingChanged')
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Setting  $settings
     * @return \Illuminate\Http\Response
     */
    public function destroy(Setting $settings)
    {
        //
    }
}
