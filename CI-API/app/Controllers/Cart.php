<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Models\CartModel;
use App\Models\ProductModel;
use CodeIgniter\I18n\Time;
use \Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Xendit\Configuration;
use Xendit\Invoice\InvoiceApi;

class Cart extends ResourceController
{
    public function __construct()
    {
        $xenditApiKey = getenv('XENDIT_SECRET_KEY');
        Configuration::setXenditKey($xenditApiKey);
    }
    // Middleware to check JWT
    private function getUserFromToken()
    {
        $authHeader = $this->request->getServer('HTTP_AUTHORIZATION');
        log_message('info', 'header: ' .  $authHeader);
        if (!$authHeader) {
            return $this->failUnauthorized('Missing or invalid JWT');
        }

        $token = explode(' ', $authHeader)[1];

        try {
            $key = getenv('JWT_SECRET');
            // $decoded = JWT::decode($token, new Key($key, 'HS256'));
            $decoded = JWT::decode($token, new Key($key, 'HS256'));
            // log_message('info', 'Decoded user ID: ' . $decoded);
            return $decoded->sub;
        } catch (\Exception $e) {
            return $this->failUnauthorized('Invalid token');
        }
    }

    // Add item to cart
    public function addItem()
    {
        // Log the incoming request data
        log_message('info', 'Request data: ' . json_encode($this->request->getJSON()));

        // $userId = $this->getUserFromToken();
        // if (!$userId) {
        //     return $this->failUnauthorized('Unauthorized');
        // }

        $userId = $this->getUserFromToken();
        if ($userId instanceof \CodeIgniter\HTTP\Response) {
            return $userId; // If getUserFromToken returns a response, return it directly
        }

        $cartModel = new CartModel();
        $productModel = new ProductModel();
        $cartData = $this->request->getJSON();

        if (!isset($cartData->cart)) {
            return $this->failValidationErrors('Invalid cart data');
        }

        $cartItems = $cartData->cart;
        // $totalBuy = $cartData->totalBuy;

        foreach ($cartItems as $item) {
            $productId = $item->id;
            $quantity = $item->quantity;
            $nameProduct = $item->nameProduct;
            $price = $item->price;

            // Check if the product exists
            $product = $productModel->find($productId);
            if (!$product) {
                log_message('info', "Product ID $productId not found.");
                continue; // Skip if the product doesn't exist
            }

            // Check if the item already exists in the cart
            $cartItem = $cartModel->where('user_id', $userId)->where('product_id', $productId)->first();
            if ($cartItem) {
                // Update quantity and total amount if item already exists in the cart
                $cartModel->update($cartItem['id'], ['quantity' => $quantity], ['updated_at' => Time::now()]);
            } else {
                // Add new item to the cart
                $cartModel->save([
                    'user_id' => $userId,
                    'product_id' => $productId,
                    'nameProduct' => $nameProduct,
                    'price' => $price,
                    'quantity' => $quantity,
                    'created_at' => Time::now(),
                ]);
            }
        }

        return $this->respondCreated(['message' => 'Cart updated successfully']);
    }

    // Increase item quantity in cart
    public function increaseQuantity($productId)
    {
        $userId = $this->getUserFromToken();
        if ($userId instanceof \CodeIgniter\HTTP\Response) {
            return $userId;
        }

        $cartModel = new CartModel();
        $cartItem = $cartModel->where('user_id', $userId)->where('product_id', $productId)->first();

        if (!$cartItem) {
            return $this->failNotFound('Item not found in cart');
        }

        $newQuantity = $cartItem['quantity'] += 1;
        $newTotal = $newQuantity * $cartItem['price'];

        $cartModel->update($cartItem['id'], ['quantity' => $newQuantity, 'total' => $newTotal, 'updated_at' => Time::now()]);

        return $this->respond(['message' => 'Quantity increased', 'quantity' => $newQuantity, 'total' => $newTotal]);
    }

    // Decrease item quantity in cart
    public function decreaseQuantity($productId)
    {
        $userId = $this->getUserFromToken();
        if ($userId instanceof \CodeIgniter\HTTP\Response) {
            return $userId;
        }

        $cartModel = new CartModel();
        $cartItem = $cartModel->where('user_id', $userId)->where('product_id', $productId)->first();

        if (!$cartItem) {
            return $this->failNotFound('Item not found in cart');
        }

        if ($cartItem['quantity'] <= 1) {
            return $this->fail('Cannot decrease quantity below 1');
        }

        $newQuantity = $cartItem['quantity'] - 1;
        $newTotal = $newQuantity * $cartItem['price'];

        $cartModel->update($cartItem['id'], ['quantity' => $newQuantity, 'total' => $newTotal, 'updated_at' => Time::now()]);

        return $this->respond(['message' => 'Quantity decreased', 'quantity' => $newQuantity, 'total' => $newTotal]);
    }


    // // Get user's cart
    // public function getCart()
    // {
    //     $userId = $this->getUserFromToken();
    //     if (!$userId) {
    //         return $this->failUnauthorized('Unauthorized');
    //     }

    //     $cartModel = new CartModel();
    //     $cartItems = $cartModel->getCartItems($userId);
    //     // print_r($cartItems);
    //     return $this->respond($cartItems);
    // }

    // Get user's cart
    public function getCart()
    {
        $userId = $this->getUserFromToken();
        if ($userId instanceof \CodeIgniter\HTTP\Response) {
            return $userId; // If getUserFromToken returns a response, return it directly
        }

        $cartModel = new CartModel();
        $cartItems = $cartModel->getCartItems($userId);

        // Accumulate quantity and total
        $totalAmount = 0;

        foreach ($cartItems as $item) {
            $totalAmount += $item['price'] * $item['quantity'];
        }

        // Include accumulated totals in the response
        $response = [
            'cart' => $cartItems,
            'totalAmount' => $totalAmount
        ];

        return $this->respond($response);
    }



    // Remove item from cart
    public function removeItem($id)
    {
        $userId = $this->getUserFromToken();
        if (!$userId) {
            return $this->failUnauthorized('Unauthorized');
        }

        $cartModel = new CartModel();
        $cartItem = $cartModel->find($id);
        if (!$cartItem || $cartItem['user_id'] !== $userId) {
            return $this->failNotFound('Item not found');
        }

        $cartModel->delete($id);
        return $this->respondDeleted(['message' => 'Item removed from cart']);
    }

    // // checkout
    // public function checkout()
    // {
    //     $userId = $this->getUserFromToken();
    //     if ($userId instanceof \CodeIgniter\HTTP\Response) {
    //         return $userId;
    //     }

    //     $cartModel = new CartModel();
    //     $cartItems = $cartModel->getCartItems($userId);

    //     $totalAmount = 0;
    //     foreach ($cartItems as $item) {
    //         $totalAmount += $item['price'] * $item['quantity'];
    //     }

    //     if ($totalAmount == 0) {
    //         return $this->fail('Your cart is empty');
    //     }

    //     $apiInstance = new InvoiceApi();
    //     $create_invoice_request = new Xendit\Invoice\CreateInvoiceRequest([
    //         'external_id' => 'order-' . time(),
    //         'description' => 'Order payment for user ID ' . $userId,
    //         'amount' => $totalAmount,
    //         'invoice_duration' => 172800,
    //         'currency' => 'IDR',
    //         'reminder_time' => 1
    //     ]);
    //     $for_user_id = "66856ede003b91620b24d58c";

    //     try {
    //         $result = $apiInstance->createInvoice($create_invoice_request, $for_user_id);
    //         return $this->respond(['message' => 'Checkout successful', 'invoice_url' => $result->getInvoiceUrl()]);
    //     } catch (\Xendit\XenditSdkException $e) {
    //         log_message('error', 'Xendit create invoice error: ' . $e->getMessage());
    //         return $this->failServerError('Failed to create payment invoice');
    //     }
    // }

    // Checkout and create Xendit invoice
    public function checkout()
    {
        $userId = $this->getUserFromToken();
        if ($userId instanceof \CodeIgniter\HTTP\Response) {
            return $userId;
        }

        $cartModel = new CartModel();
        $cartItems = $cartModel->getCartItems($userId);

        $totalAmount = 0;

        foreach ($cartItems as $item) {
            $totalAmount += $item['price'] * $item['quantity'];

            if ($totalAmount == 0) {
                return $this->fail('Your cart is empty');
            }
            // Collect item details for Xendit invoice
            $items[] = [
                'name' => $item['nameProduct'], // Assuming 'nameProduct' is the product name field
                'quantity' => $item['quantity'],
                'price' => $item['price'], // Include price if needed
            ];
        }

        // Initialize Xendit
        Configuration::setXenditKey(getenv('XENDIT_SECRET_KEY'));

        $apiInstance = new InvoiceApi();
        $params = [
            'external_id' => 'checkout_' . uniqid(),
            'amount' => $totalAmount,
            'items' => $items,
            'payer_email' => 'customer@example.com', // Change this to the actual payer's email
            'description' => 'Purchase from Your Store',
            'invoice_duration' => 86400, // 24 hours
            'success_redirect_url' => 'http://localhost:5173',
        ];
        $for_user_id = "62efe4c33e45694d63f585f0";
        // print_r($params);

        // Create Xendit invoice
        try {
            $result = $apiInstance->createInvoice($params);
            return $this->respond(['invoice_url' => $result['invoice_url']]);
        } catch (\Xendit\XenditSdkException $e) {
            return $this->fail('Failed to create invoice: ' . $e->getMessage());
        }
    }
}
