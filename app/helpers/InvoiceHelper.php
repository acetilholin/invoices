<?php


namespace App\helpers;

use App\Invoice;
use App\Item;
use App\Recipient;

class InvoiceHelper
{
    public function insertData($items)
    {
        foreach ($items as $item) {
            if ($item['id']) {
                Item::where('id', $item['id'])
                    ->update([
                        'qty' => $item['qty'],
                        'unit' => $item['unit'],
                        'item_price' => $item['item_price'],
                        'discount' => $item['discount'],
                        'total_price' => $item['total_price'],
                        'description' => $item['description']
                    ]);
            } else {
                Item::create($item)->save();
            }
        }
    }

    public function sifraPredracuna()
    {
        $invoices = Invoice::all();

        $max = 0;
        foreach ($invoices as $invoice) {
            $sifraPredracuna = $invoice->sifra_predracuna;
            preg_match('/^\d{1,3}/', $sifraPredracuna, $match);
            $num = $match[0];
            $max = $num > $max ? $num : $max;
        }
        return $max.'/'.date("Y");
    }

    public function insertAllData($invoiceData, $recipientData, $items)
    {
        $invoice = Invoice::create($invoiceData);
        $invoice = $invoice->getAttributes();
        $id = $invoice['id'];

        if ($recipientData['title'] !== null && $recipientData['street'] !== null && $recipientData['posta'] !== null) {
            $recipientData['invoice_id'] = $id;
            Recipient::create($recipientData);
        }

        if ($items) {
            foreach ($items as $item) {
                $item['invoice_id'] = $id;
                Item::create($item);
            }
        }
    }
}
