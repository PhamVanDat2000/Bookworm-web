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
		$_user = User::create([...$request->all()]);
		if ($_user) {
			return back()->with('success', 'Register successful');
		} else {

			return back()->with('fail', 'Something wrong');
		}
	}
	public function loginUser(AuthRequest $request)
	{
		$user = $this->query->where('email', '=', $request->email)->first();
		if ($user) {
			if (Hash::check($request->password, $user->password)) {
				$request->session()->put('loginId', $user->id);
				return back()->with('success', 'Login successful');
			} else {
				return back()->with('fail', 'Password not matches');
			}
		} else {
			return back()->with('fail', 'This email is not registered');
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
