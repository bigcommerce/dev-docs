# Plugin Settings

BigCommerce settings for WordPress are found in the left admin menu in WordPress, under the BigCommerce menu item.

<!--
    title: #### Plugin Settings

    data: //s3.amazonaws.com/user-content.stoplight.io/6012/1540476609033
-->

#### Plugin Settings
![#### Plugin Settings
](//s3.amazonaws.com/user-content.stoplight.io/6012/1540476609033 "#### Plugin Settings
")



`wp bigcommerce import products`

Product titles, descriptions, and post statuses can be edited in the WordPress admin. Your changes will be automatically synced with your BigCommerce channel and preserved during future imports.

## Cart Settings

When the cart is enabled, visitors to your store can add products to carts before checkout. If it is disabled, the “Add to Cart” button becomes a “Buy Now” button, sending customers directly to checkout for that product. When the cart is enabled, the plugin will automatically create a page to host the cart shortcode, `[bigcommerce_cart]`. This shortcode will show the current visitor’s cart. To use a different page as your Cart page, first create a page, insert the cart shortcode, then come back to the settings page and select it from the dropdown. Note: the plugin automatically creates this page.

### Currency Settings

The store’s currency code will be imported from the BigCommerce API as part of the product import process. If the PHP intl extension is available on your server, there is nothing else to configure. If it is not available, you will be presented with additional fields to control currency formatting. These will also be populated automatically from the API. Currency formatting can be filtered using the `bigcommerce/currency/format` filter.
