<?php


namespace App\helpers;

use App\Item;

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
}
