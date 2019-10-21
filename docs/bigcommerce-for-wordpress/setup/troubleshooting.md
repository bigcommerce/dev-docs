<div><h3 class="sub-docs-type" id="bigcommerce-for-wordpress">BigCommerce for Wordpress</h3>

# Troubleshooting

<div class="otp" id="no-index">

### On This Page
- [Error on "Add to Cart" button, 404 error](#error-on-%22add-to-cart%22-button-404-error)
- [PHP getenv() Errors](#php-getenv-errors)

</div> 

## Error on "Add to Cart" button, 404 error

### Symptom

> Not Found: The requested URL /bigcommerce/cart/42 was not found on this server.  
> Additionally, a 404 Not Found error was encountered while trying to use an ErrorDocument to handle the request.

### Solution
In WordPress, go to Settings → Permalinks. Scroll to the bottom of the page and click Save. This resets the site’s redirects properly.

## PHP getenv() Errors

### Symptom: 
When in use the plugin floods the error log with the following:

> PHP message: PHP Warning: getenv() expects exactly 1 parameter, 2 given in wp-content/plugins/bigcommerce-for-wordpress-0.11.1/bigcommerce.php on line 58

### Solution
You can expect to see that error if you're on PHP version 5.4 or lower (the plugin requires 5.6+).
