<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
	use HasFactory;
	public $timestamps = false;
	protected $table = 'order_item';
	protected $fillable = ['order_id', 'book_id', 'quantity', 'price'];

	public function book()
	{
		$this->hasOne(Book::class);
	}
	public function order()
	{
		$this->hasMany(Order::class);
	}
}
