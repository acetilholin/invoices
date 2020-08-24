<?php

namespace App\Http\Controllers\API;

use App\FinalInvoice;
use App\Http\Controllers\Controller;
use App\Invoice;
use Illuminate\Http\Request;
use App\Http\Resources\FinalInvoiceResource;
use Illuminate\Support\Facades\DB;

class FinalInvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return FinalInvoiceResource::collection(FinalInvoice::all());
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
     * @param  \App\FinalInvoice  $finalInvoice
     * @return \Illuminate\Http\Response
     */
    public function show(FinalInvoice $finalInvoice)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\FinalInvoice  $finalInvoice
     * @return \Illuminate\Http\Response
     */
    public function edit(FinalInvoice $finalInvoice)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\FinalInvoice  $finalInvoice
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, FinalInvoice $finalInvoice)
    {
        $data = $finalInvoice->getAttributes();
        $invoice = Invoice::where('iid', $data['iid'])->first();
        $invoiceData = $invoice->getAttributes();
        unset($invoiceData['id']);
        $finalInvoice->update($invoiceData);

        return response()->json([
            'success' => trans('final.finalIsUpdated')
        ], 200);
    }

    public function interval(Request $request)
    {
        $from = $request->from;
        $to = $request->to;

        $finalInvoices = DB::table('final_invoices')
            ->whereBetween('timestamp', [$from, $to])
            ->orderBy('timestamp', 'asc')
            ->get();

        foreach ($finalInvoices as $invoice) {
            $allInvoices[] = $invoice;
        }

        return response()->json([
            'finalInvoices' => $allInvoices,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\FinalInvoice  $finalInvoice
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(FinalInvoice $finalInvoice)
    {
        $finalInvoice->delete();
        return response()->json([
            'success' => trans('final.finalInvoiceDeleted')
        ], 200);
    }
}
