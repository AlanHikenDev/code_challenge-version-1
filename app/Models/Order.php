<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    public function client()
    {
        return $this->hasOne('App\Models\Client','id','cliente_id');
        //return $this->hasOne(client::class, 'foreign_key', 'local_key');
    }

    public function order_detail() {
        return $this->hasMany('App\Models\Order_detail','order_id','id');
    }
}
