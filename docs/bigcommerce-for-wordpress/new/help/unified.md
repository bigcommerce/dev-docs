## Details on how to debug

<div class="otp" id="no-index">
	
### On this page

- [Details on how to debug](#details-on-how-to-debug)
- [Troubleshooting](#troubleshooting)

</div>

If the site is not importing as expected, enable diagnostic logging to produce a detailed log of the import process.

![Diagnostic logging](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/details-on-how-to-debug.png)

After the next import has run, click **Get Diagnostics** to display data from the logs.

If running an import from the command line, add the `--debug` flag to get additional information as the import runs, including API error messages.

`wp bigcommerce import products --debug`

If network latency is causing your API requests to timeout, the timeout duration can be increased with a filter:

```js
add_filter( 'bigcommerce/api/timeout', function () {
	return 60;
} );
```

## Troubleshooting

### Error on "Add to Cart" button, 404 error

#### Symptom

> Not Found: The requested URL /bigcommerce/cart/42 was not found on this server.  
> Additionally, a 404 Not Found error was encountered while trying to use an ErrorDocument to handle the request.

#### Solution
In WordPress, go to Settings → Permalinks. Scroll to the bottom of the page and click Save. This resets the site’s redirects properly.

### PHP getenv() Errors

#### Symptom
When in use the plugin floods the error log with the following:

> PHP message: PHP Warning: getenv() expects exactly 1 parameter, 2 given in wp-content/plugins/bigcommerce-for-wordpress-0.11.1/bigcommerce.php on line 58

#### Solution
You can expect to see that error if you're on PHP version 5.4 or lower (the plugin requires 5.6+).
