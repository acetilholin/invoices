<?php


namespace App\helpers;


use Illuminate\Support\Facades\Validator;

class CustomerHelper
{
    public function customerValidator($request)
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
            return $messages;
        } else {
            return null;
        }
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
