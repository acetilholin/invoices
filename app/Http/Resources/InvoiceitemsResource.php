<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class InvoiceitemsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $predracun = unserialize($this->predracun);
        return [
            'sifra_predracuna' => $this->sifra_predracuna,
            'ime_priimek' => $this->ime_priimek,
            'total' => round($predracun->totalPrice,2),
            'timestamp' => date('d-m-Y', strtotime($this->timestamp)),
            'expiration' => date('d-m-Y', strtotime($this->expiration)),
            'invoice_id' => $this->invoice_id,
            'work_date' => $this->work_date,
        ];
    }
}
