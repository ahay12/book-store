<?php

namespace App\Models;

use CodeIgniter\Model;

class UserModel extends Model
{
    protected $table            = 'users';
    protected $primaryKey       = 'id';
    protected $returnType       = 'array';
    protected $allowedFields    = ['username', 'password'];

    // protected function beforeInsert(array $data): array
    // {
    //     if (!empty($data['password'])) {
    //         $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);
    //     }

    //     return $data;
    // }
}
