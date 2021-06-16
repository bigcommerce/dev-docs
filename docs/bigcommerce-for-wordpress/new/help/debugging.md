### Details on how to debug

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
``