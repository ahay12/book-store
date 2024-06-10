<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\ProductModel;

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

class Product extends ResourceController
{
    use ResponseTrait;
    // all users
    public function index()
    {
        $model = new ProductModel();
        $data['product'] = $model->orderBy('id', 'DESC')->findAll();
        return $this->respond($data);
    }
    // create
    public function create()
    {
        $model = new ProductModel();
        $data = [
            'nameProduct' => $this->request->getVar('nameProduct'),
            'price' => $this->request->getVar('price'),
        ];
        $model->insert($data);
        $response = [
            'status' => 201,
            'error' => null,
            'messages' => [
                'success' => 'Data produk berhasil ditambahkan.'
            ]
        ];
        return $this->respondCreated($response);
    }
    // single user
    public function show($id = null)
    {
        $model = new ProductModel();
        $data = $model->where('id', $id)->first();
        if ($data) {
            return $this->respond($data);
        } else {
            return $this->failNotFound('Data tidak ditemukan.');
        }
    }
    // update
    public function update($id = null)
    {
        $model = new ProductModel();
        $id = $this->request->getVar('id');
        $data = [
            'nameProduct' => $this->request->getVar('nameProduct'),
            'price' => $this->request->getVar('price'),
        ];
        $model->update($id, $data);
        $response = [
            'status' => 200,
            'error' => null,
            'messages' => [
                'success' => 'Data produk berhasil diubah.'
            ]
        ];
        return $this->respond($response);
    }
    // delete
    public function delete($id = null)
    {
        $model = new ProductModel();
        $data = $model->where('id', $id)->delete($id);
        if ($data) {
            $model->delete($id);
            $response = [
                'status' => 200,
                'error' => null,
                'messages' => [
                    'success' => 'Data produk berhasil dihapus.'
                ]
            ];
            return $this->respondDeleted($response);
        } else {
            return $this->failNotFound('Data tidak ditemukan.');
        }
    }
}
