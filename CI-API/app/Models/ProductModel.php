<?php

namespace App\Models;

use CodeIgniter\Model;

class ProductModel extends Model
{
    protected $table = 'products';
    protected $primaryKey = 'id';
    protected $allowedFields = ['nameProduct', 'descProduct', 'price', 'image', 'author', 'discount', 'created_at', 'stock'];
    // protected $useTimestamps = true;
}
