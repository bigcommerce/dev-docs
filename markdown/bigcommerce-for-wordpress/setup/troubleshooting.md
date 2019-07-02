<div><h3 class="sub-docs-type" id="bigcommerce-for-wordpress">BigCommerce for Wordpress</h3>
<h1 class="sub-docs-title">Troubleshooting</h1>
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
        <li><a href="#troubleshooting_add-cart-error">Error on "Add to Cart" button, 404 error</a></li>
        <li><a href="#troubleshooting_php-getenv">PHP getenv() Errors</a></li>
	</ul>
</div>

<a href='#troubleshooting_add-cart-error' aria-hidden='true' class='block-anchor'  id='troubleshooting_add-cart-error'><i aria-hidden='true' class='linkify icon'></i></a>

## Error on "Add to Cart" button, 404 error

### Symptom

> Not Found: The requested URL /bigcommerce/cart/42 was not found on this server.  
> Additionally, a 404 Not Found error was encountered while trying to use an ErrorDocument to handle the request.

### Solution
In WordPress, go to Settings → Permalinks. Scroll to the bottom of the page and click Save. This resets the site’s redirects properly.

---

<a href='#troubleshooting_php-getenv' aria-hidden='true' class='block-anchor'  id='troubleshooting_php-getenv'><i aria-hidden='true' class='linkify icon'></i></a>

## PHP getenv() Errors

### Symptom: 
When in use the plugin floods the error log with the following:


> PHP message: PHP Warning: getenv() expects exactly 1 parameter, 2 given in wp-content/plugins/bigcommerce-for-wordpress-0.11.1/bigcommerce.php on line 58


### Solution
You can expect to see that error if you're on PHP version 5.4 or lower (the plugin requires 5.6+).

