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
    $routes->resource('user');
    // $routes->resource('/login')
});
$routes->post('api/login', 'Login::index');
// $route['/api/login'] = 'Login::login';
