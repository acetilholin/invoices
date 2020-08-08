<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Invoice;
use Illuminate\Http\Request;
use App\Http\Resources\InvoicesResource;
use App\Http\Resources\InvoiceResource;

class InvoiceController extends Controller
{

    public function index()
    {
        return InvoicesResource::collection(Invoice::all());
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
     * @param  InvoicesResource  $invoiceitems
     * @return void
     */
    public function show(InvoicesResource $invoiceitems)
    {

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Invoice  $invoice
     * @return \Illuminate\Http\JsonResponse
     */
    public function edit(Invoice $invoice)
    {
        $items = $invoice->items;

        foreach ($items as $item) {
            $allItems[] = $item;
        }

        return response()->json([
            'invoice' => InvoiceResource::make($invoice),
            'items' => $allItems
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Invoice  $invoice
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Invoice $invoice)
    {
        $invoiceData = request(['sifra_predracuna', 'ime_priimek', 'customer_id', 'timestamp', 'expiration', 'klavzula', 'author', 'work_date', 'total', 'quantity', 'vat']);
        $itemsData = request(['items']);
        $invoice->update($invoiceData);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Invoice  $invoice
     * @return \Illuminate\Http\Response
     */
    public function destroy(Invoice $invoice)
    {
        //
    }
}
