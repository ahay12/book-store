<?php

namespace App\Models;

use CodeIgniter\Model;

class CartModel extends Model
{
    protected $table = 'carts';
    protected $primaryKey = 'id';
    protected $allowedFields = ['user_id', 'product_id', 'quantity', 'total'];

    // Fetch cart items for a specific user
    public function getCartItems($userId)
    {
        return $this->where('user_id', $userId)->findAll();
    }
}
