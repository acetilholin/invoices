<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Klavzule;
use Illuminate\Http\Request;

class KlavzuleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $klavzule = Klavzule::all();
        return response()->json([
            'klavzule' => $klavzule
        ], 200);
    }
}
