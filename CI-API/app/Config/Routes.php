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
    $routes->post('logout', 'Logout');
    $routes->post('cart/add', 'Cart::addItem');
    $routes->get('cart', 'Cart::getCart');
    $routes->delete('cart/remove/(:num)', 'Cart::removeItem/$1');
    $routes->get('users', 'User', ['filter' => 'auth']);
});
