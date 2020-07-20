<?php

namespace App\Http\Controllers\API;

use App\Customer;
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
        $rules = array(
            'naziv_partnerja' => 'required|max:120',
            'posta' => 'required',
            'kraj_ulica' => 'required|unique_with:customers,naziv_partnerja,posta'
        );

        $customerData = request(['naziv_partnerja', 'kraj_ulica', 'posta', 'email', 'telefon', 'id_ddv', 'sklic_st']);
        $validator = Validator::make($customerData, $rules, $this->messages());

        if ($validator->fails()) {
            $formatter = new MsgFormatterHelper();
            $messages = $formatter->formatt($validator->errors()->all());
            return response()->json(['error' => $messages], 401);
        }

        Customer::create($customerData)->save();
        $customers = Customer::all();
        return response()->json([
            'success' => trans('customer.customerCreated'),
            'customers' => $customers
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
        return response()->json([
            'customer' => $customer->getAttributes()
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function edit(Customer $customer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Customer $customer)
    {
        //
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
        $customers = $this->index();
        return response()->json([
            'success' => trans('customer.customerDeleted'),
            'customers' => $customers
        ], 200);
    }

    protected function messages()
    {
        return [
            'naziv_partnerja.required' => trans('customer.nazivRequired'),
            'naziv_partnerja.max' => trans('customer.nazivPartnerjaMax'),
            'posta.required' => trans('customer.postRequired'),
            'kraj_ulica.required' => trans('customer.streetRequired'),
            'kraj_ulica.unique_with' => trans('customer.companyExists')
        ];
    }
}
