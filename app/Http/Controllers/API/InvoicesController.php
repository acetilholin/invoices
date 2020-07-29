<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Invoiceitems;
use Illuminate\Http\Request;
use App\Http\Resources\InvoiceitemsResource;
use App\Http\Resources\InvoiceResource;

class InvoicesController extends Controller
{

    public function index()
    {
        return InvoiceitemsResource::collection(Invoiceitems::all());
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
     * @param  \App\Invoiceitems  $invoiceitems
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(InvoiceitemsResource $invoiceitems)
    {

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Invoiceitems  $invoiceitems
     * @return \Illuminate\Http\JsonResponse
     */
    public function edit(Invoiceitems $invoiceitems)
    {
        return response()->json([
            'invoice' => InvoiceResource::make($invoiceitems)
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Invoiceitems  $invoiceitems
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, InvoiceitemsResource $invoiceitems)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Invoiceitems  $invoiceitems
     * @return \Illuminate\Http\Response
     */
    public function destroy(InvoiceitemsResource $invoiceitems)
    {
        //
    }
}
