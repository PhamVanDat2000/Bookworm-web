<?php

namespace App\Repositories;

use App\Http\Requests\OrderRequest;
use App\Models\Order;
use App\Models\OrderItem;
use Carbon\Carbon;
use Illuminate\Http\Request;

class OrderRepository extends BaseRepository
{
	protected $query;

	public function __construct()
	{
		$this->query = Order::query();
	}

	public function makeOrder(OrderRequest $request)
	{
		$_order = Order::create(['order_date' => Carbon::now(), ...$request->all()]);
		foreach ($request['products'] as $product) {
			OrderItem::create([...$product, 'order_id' => $_order->id]);
		}
		return $_order;
	}

	public function create($data)
	{
		// TODO: Implement create() method.
	}
	public function filter($condition)
	{
		// TODO: Implement filter() method.
	}
	public function getById($id)
	{
		// TODO: Implement getById() method.
	}
	public function update($data)
	{
		// TODO: Implement update() method.
	}
	public function getAll()
	{
		// TODO: Implement update() method.
	}
}
