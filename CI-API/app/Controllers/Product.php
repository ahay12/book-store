<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use App\Models\ProductModel;
use CodeIgniter\I18n\Time;

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
define('IMAGE_BASE_URL', 'http://localhost:4000/images/');

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
        $uploadPath = 'images/';
        $model = new ProductModel();
        $data = [
            'images' => $this->request->getFile('image'),
            'nameProduct' => $this->request->getVar('nameProduct'),
            'descProduct' => $this->request->getVar('descProduct'),
            'author' => $this->request->getVar('author'),
            'price' => $this->request->getVar('price'),
            'discount' => $this->request->getVar('discount'),
            'created_at' => Time::now(),
        ];

        if (isset($data['discount'])) {
            $data['price'] -= $data['discount'];
        }

        // Upload image handling
        $validation = $this->validate([
            'image' => [
                'rules' => 'uploaded[image]|mime_in[image,image/jpeg,image/png,image/webp]|max_size[image,1024]',
                'errors' => [
                    'uploaded' => 'Image is required.',
                    'mime_in'  => 'Invalid image format. Only JPG are allowed.',
                    'max_size' => 'Image size exceeds the limit (1 MB).',
                ],
            ],
        ]);

        if (!$validation) {
            return $this->respond([
                'error' => 'validation_errors',
                'messages' => $this->validator->getErrors(),
            ], 400);
        }

        $image = $this->request->getFile('image');
        $imageName = $image->getRandomName();

        if (!$image->move($uploadPath, $imageName)) {
            $response = [
                'error' => 'upload error',
                'message' => 'Failed upload image',
            ];
        };

        $data['image'] = IMAGE_BASE_URL . $imageName;

        $model->insert($data);
        // print_r($data);
        $response = [
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
            'descProduct' => $this->request->getVar('descProduct'),
            'author' => $this->request->getVar('author'),
            'price' => $this->request->getVar('price'),
            'discount' => $this->request->getVar('discount')
        ];

        if (isset($data['discount'])) {
            $data['price'] -= $data['discount'];
        }

        $model->update($id, $data);

        $response = [
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
        $data = $model->where('id', $id)->first();


        // if (empty($data['image'])) {
        //     return $this->failNotFound('Data not found or no file associated.');
        // }

        // $deleted = unlink($data['image'], true);

        if ($data) {
            $model->delete($id);
            $response = [
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
