<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'book';
    public function Category(){
        return $this->belongsTo(Category::class);
    }
    public function Auther(){
        return $this->belongsTo(Auther::class);
    }
    public function Discount(){
        return $this->hasOne(Discount::class);
    }
    public function Reviews(){
        return $this->hasMany(Review::class);
    }
    public function Order_items(){
        return $this->hasMany(order_items::class);
    }
}
