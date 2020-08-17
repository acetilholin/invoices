<?php

namespace App\Http\Controllers\API;

use App\Customer;
use App\helpers\CustomerHelper;
use App\helpers\MsgFormatterHelper;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\CustomersResource;
use Illuminate\Support\Facades\Validator;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return CustomersResource::collection(Customer::all());
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
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $helper = new CustomerHelper();
        $validation = $helper->customerValidator($request);

        if ($validation) {
            return response()->json(['error' => $validation], 401);
        }

        $customerData = request(['naziv_partnerja', 'kraj_ulica', 'posta', 'email', 'telefon', 'id_ddv', 'sklic_st']);

        Customer::create($customerData)->save();
        return response()->json([
            'success' => trans('customer.customerCreated')
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Customer  $customer
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Customer $customer)
    {

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Customer  $customer
     * @return \Illuminate\Http\JsonResponse
     */
    public function edit(Customer $customer)
    {
        return response()->json([
            'customer' => $customer->getAttributes()
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Customer  $customer
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, Customer $customer)
    {
        $customerData = request(['naziv_partnerja', 'kraj_ulica', 'posta', 'email', 'telefon', 'id_ddv', 'sklic_st']);
        $customer->update($customerData);
        return response()->json([
            'success' => trans('customer.customerEdited')
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Customer  $customer
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Customer $customer)
    {
        $customer->delete();
        return response()->json([
            'success' => trans('customer.customerDeleted')
        ], 200);
    }
}
