<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Order_detail extends Model
{
    use HasFactory;

    public function product()
    {
        return $this->hasOne('App\Models\Product','id','product_id');
        //return $this->hasOne(client::class, 'foreign_key', 'local_key');
    }
}
