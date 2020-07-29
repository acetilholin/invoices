<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class InvoiceResource extends JsonResource
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
            'id' => $this->id,
            'sifra_predracuna' => $this->sifra_predracuna,
            'ime_priimek' => $this->ime_priimek,
            'total' => $predracun->totalPrice,
            'items' => $predracun->items,
            'vat' => $predracun->vat,
            'timestamp' => $this->timestamp,
            'expiration' => $this->expiration,
            'totalQty' => $predracun->totalQuantity,
            'author' => $this->author,
            'prejemnik' => $this->prejemnik,
            'workDate' => $this->work_date,
            'klavzula' => $this->klavzula
        ];
    }
}
