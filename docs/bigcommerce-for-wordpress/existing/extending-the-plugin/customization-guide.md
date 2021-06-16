# Customization Guide



### Embedded checkout

Embedded Checkout includes settings within the WordPress theme customizer that allow you to adjust colors to blend the checkout page with your theme. For advanced users, the plugin provides the [Checkout Config hook](https://bigcommerce.moderntribe.qa/reference/hooks/bigcommerce-checkout-config/) to filter all available [Embedded Checkout config options](https://github.com/bigcommerce/checkout-sdk-js/blob/master/docs/interfaces/embeddedcheckoutoptions.md) (Github). Because of the method used to load the Embedded Checkout within the iframe, styling checkout must be accomplished by filtering the available `$checkout_config` options rather than targeting element classes or IDs with CSS.

Below, we define a function called `myCheckoutFunction()` that accepts `$checkout_config` as an argument. The function builds an array of checkout config styles that make the checkout step header text red, step number icons blue, and checkout body text green. Finally, we pass `myCheckoutFunction` to the Checkout Config hook. Try adding the below snippet to your theme’s `functions.php` file to test it out

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">myCheckoutFunction()</div>
    </div><div class="HubBlock-header-subtitle">functions.php</div>
</div>

<!--
title: "myCheckoutFunction()"
subtitle: "functions.php"
lineNumbers: true
-->

```javascript
function myCheckoutFunction($checkout_config) {
  $checkout_config['styles']['heading']['color'] = '#C70039'; //red
  $checkout_config['styles']['step']['icon']['backgroundColor'] = '#AE0BE6'; //purple
  $checkout_config['styles']['step']['color'] = '#0BE640'; //green
  return $checkout_config;
}
add_filter('bigcommerce/checkout/config', 'myCheckoutFunction');
```

Following this format, you can apply styles to other elements, like buttons, input fields, and checkboxes. See the full list of checkout elements that you can style and which properties you can adjust in the [Embedded Checkout Styles documentation](https://github.com/bigcommerce/checkout-sdk-js/blob/master/docs/interfaces/embeddedcheckoutstyles.md) (Github).

Note that styles apply globally to all elements on the checkout page. For example, styles applied to steps will apply to all steps rather than targeting only step 2 or 3.

## Email templates

You may wish to customize the built-in transactional emails sent from BigCommerce when placing or updating an order. You can add custom text or images to email templates to reflect your store’s branding.

Email templates can be customized and enabled/disabled on an individual basis from the BigCommerce control panel. For more information, see [Customizing Emails](https://support.bigcommerce.com/s/article/Customizing-Emails).

## Related resources

- [Theme Development - WordPress.org](https://codex.wordpress.org/Theme_Development)
- [How to Customize WordPress Plugins](https://wpengine.com/resources/customize-wordpress-plugin/)
- [Methods for Overriding Styles in WordPress](https://css-tricks.com/methods-overriding-styles-wordpress/)
