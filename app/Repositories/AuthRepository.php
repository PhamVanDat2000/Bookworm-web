<?php

namespace App\Repositories;

use App\Http\Requests\AuthorRequest;
use App\Http\Requests\AuthRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
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
			return response([
				// 'status' => 'successful',
				'message' => 'Register successful'
			], 201);
		} else {
			return response([
				// 'status' => 'fail',
				'message' => 'Something wrong'
			], 500);
		}
	}
	public function loginUser(AuthRequest $request)
	{
		$user = $this->query->where('email', '=', $request->email)->first();
		if ($user) {
			$token =  $user->createToken('logintoken')->plainTextToken;
			if (Hash::check($request->password, $user->password)) {
				return response(
					[
						// 'status' => 'successful',
						'message' => 'Login successful',
						'user' => $user,
						'token' => $token
					],
					200
				);
			} else {
				return response([
					// 'status' => 'fail',
					'message' => 'Password not matches'
				], 401);
			}
		} else {
			return response([
				// 'status' => 'fail',
				'message' => 'This email is not registered'
			], 404);
		}
	}
	public function logoutUser()
	{
		Auth::user()->tokens->each(function ($token, $key) {
			$token->delete();
		});
		return response([
			// 'status' => 'successful',
			'message' => 'Logout success'
		], 200);
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
