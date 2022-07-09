<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthRequest;
use App\Http\Requests\BookRequest;
use App\Repositories\AuthRepository;
use App\Repositories\BookRepository;
use Illuminate\Http\Request;

class AuthController extends Controller
{
	private AuthRepository $_authRepository;
	public function __construct(AuthRepository $authRepository)
	{
		$this->_authRepository = $authRepository;
	}

	public function registerUser(AuthRequest $request)
	{
		return $this->_authRepository->registerUser($request);
	}
	public function loginUser(AuthRequest $request)
	{
		return $this->_authRepository->loginUser($request);
	}
}
