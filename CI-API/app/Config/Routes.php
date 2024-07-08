<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');
$routes->group('', ['filter' => 'cors'], static function (RouteCollection $routes): void {
    $routes->options('product', '\Dummy');
    $routes->options('product/(:any)', '\Dummy');
    $routes->resource('product');
    $routes->post('login', 'Login');
    $routes->post('register', 'Register');
    $routes->options('login', 'Login');
    $routes->options('register', 'Register');
    $routes->post('logout', 'Logout');
    $routes->post('cart/add', 'Cart::addItem');
    $routes->options('cart/add', 'Cart::addItem');
    $routes->post('cart/checkout', 'Cart::checkout', ['filter' => 'auth']);
    $routes->get('cart', 'Cart::getCart');
    $routes->options('cart', 'Cart::getCart');
    $routes->delete('cart/remove/(:num)', 'Cart::removeItem/$1');
    $routes->options('cart/remove/(:num)', 'Cart::removeItem/$1');
    $routes->patch('cart/decreaseQuantity/(:num)', 'Cart::decreaseQuantity/$1');
    $routes->patch('cart/increaseQuantity/(:num)', 'Cart::increaseQuantity/$1');
    $routes->options('cart/decreaseQuantity/(:num)', 'Cart::decreaseQuantity/$1');
    $routes->options('cart/increaseQuantity/(:num)', 'Cart::increaseQuantity/$1');
    $routes->get('users', 'User', ['filter' => 'auth']);
});
