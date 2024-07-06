<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\API\ResponseTrait;
use App\Models\UserModel;
use CodeIgniter\RESTful\ResourceController;
use \Firebase\JWT\JWT;

class Login extends ResourceController
{
    use ResponseTrait;

    public function index()
    {
        $userModel = new UserModel();

        $username = $this->request->getVar('username');
        $password = $this->request->getVar('password');

        $user = $userModel->where('username', $username)->first();

        if (is_null($user)) {
            return $this->respond(['error' => 'Invalid username'], 401);
        }

        $pwd_verify = password_verify($password, $user['password']);

        if (!$pwd_verify) {
            return $this->respond(['error' => 'Invalid password.'], 401);
        }

        $key = getenv('JWT_SECRET');
        $iat = time();
        $exp = $iat + 60 * 15;

        $role = $user['role'];
        $payload = array(
            "username" => $user['username'],
            'role' => $role,
            "iss" => "Issuer of the JWT",
            "aud" => "Audience that the JWT",
            "sub" => $user['id'],
            "iat" => $iat,
            "exp" => $exp,
        );

        $token = JWT::encode($payload, $key, 'HS256');

        $response = [
            'message' => 'Login Succesful',
            'token' => $token,
            // 'role' => $role
        ];

        return $this->respond($response, 200);
    }
}
