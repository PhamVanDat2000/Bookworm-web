<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
	use HasFactory;

	public $timestamps = false;
	protected $table = 'book';
	public function category()
	{
		return $this->belongsTo(Category::class);
	}
	public function auther()
	{
		return $this->belongsTo(Author::class);
	}
	public function discount()
	{
		return $this->hasOne(Discount::class);
	}
	public function reviews()
	{
		return $this->hasMany(Review::class);
	}
	public function orderItems()
	{
		return $this->hasOne(OrderItem::class);
	}
}
