<?php

namespace App\Repositories;

use App\Http\Requests\AuthorRequest;
use App\Http\Requests\AuthRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthRepository extends BaseRepository
{
	protected $query;
	public function __construct(BookRepository $bookRepository)
	{
		$this->query = User::query();
	}
	public function registerUser(AuthRequest $request)
	{
		$_user = User::create([
			...$request->all(),
			'password' => Hash::make($request->password)
		]);
		if ($_user) {
			return response()->json([
				'status' => 'success',
				'message' => 'Register successful'
			]);
		} else {
			return response()->json([
				'status' => 'fail',
				'message' => 'Something wrong'
			]);
		}
	}
	public function loginUser(AuthRequest $request)
	{
		$user = $this->query->where('email', '=', $request->email)->first();
		if ($user) {
			if (Hash::check($request->password, $user->password)) {
				return response()->json(
					[
						'status' => 'success',
						'message' => 'Login successful',
						'user' => $user
					]
				);
			} else {
				return response()->json([
					'status' => 'fail',
					'message' => 'Password not matches'
				]);
			}
		} else {
			return response()->json([
				'status' => 'fail',
				'message' => 'This email is not registered'
			]);
		}
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
