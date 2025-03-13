<?php

/**
 * Laravel - A PHP Framework For Web Artisans
 *
 * @package  Laravel
 * @author   Taylor Otwell <taylor@laravel.com>
 */

// Define the path to the public directory
$publicPath = __DIR__ . '/public';

// Parse the requested URI
$uri = urldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));

// If the requested URI does not correspond to an existing file in the public directory,
// route the request to Laravel's index.php
if ($uri !== '/' && file_exists($publicPath . $uri)) {
    return false;
}

// Require the index.php file
require_once $publicPath . '/index.php';
