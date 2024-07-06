<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\API\ResponseTrait;

class Logout extends BaseController
{
    use ResponseTrait;

    public function index()
    {
        $response = [
            'message' => 'Logout successful'
        ];

        return $this->respond($response, 200);
    }
}
