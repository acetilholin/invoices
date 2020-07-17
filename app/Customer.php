<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    public function invoiceitems()
    {
        return $this->hasMany(Invoiceitems::class, 'post_id');
    }
}
