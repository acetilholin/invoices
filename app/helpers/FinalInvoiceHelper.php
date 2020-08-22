<?php


namespace App\helpers;


use App\FinalInvoice;

class FinalInvoiceHelper
{
    public function sifraPredracuna()
    {
        $finalInvoices = FinalInvoice::all();

        $max = 0;
        foreach ($finalInvoices as $final) {
            $sifraPredracuna = $final->sifra_predracuna;
            preg_match('/^\d{1,3}/', $sifraPredracuna, $match);
            $num = $match[0];
            $max = $num > $max ? $num : $max;
        }
        return ($max + 1).'/'.date("Y");
    }

    public function exportToFinalInvoices($invoiceData)
    {
        $finalInvoice = FinalInvoice::where('iid', $invoiceData['iid'])->first();

        if (!$finalInvoice) {
            $sifraPredracuna = $this->sifraPredracuna();
            unset($invoiceData['id']);
            FinalInvoice::create($invoiceData);
        } else {
            throw new \Exception(trans('final.alreadyExists'));
        }
    }
}
