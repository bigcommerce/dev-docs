# Site Launch Checklist

This document outlines our recommended steps for launching a BigCommerce for WordPress site. It assumes that you have a reasonable understanding of WordPress and BigCommerce and know how to install the BigCommerce for WordPress plugin. For an overview of BigCommerce and the BigCommerce for WordPress plugin, see the following articles:

- [BigCommerce Overview](https://support.bigcommerce.com/s/article/Getting-Started-with-the-New-Control-Panel)
- [Store profile](https://support.bigcommerce.com/s/article/Store-Profile-Settings)
- [Taxes](https://support.bigcommerce.com/s/article/Tax-Overview)
- [Shipping](https://support.bigcommerce.com/s/article/Shipping-Setup)
- [Payment methods](https://support.bigcommerce.com/s/article/Online-Payment-Methods)
- [BigCommerce for WordPress Overview](https://developer.bigcommerce.com/bigcommerce-for-wordpress/getting-started/introduction) 

## Required steps


### Connect BigCommerce for WordPress to BigCommerce using API credentials

BigCommerce for WordPress connects to the BigCommerce API with a set of API credentials. These credentials are for a single BigCommerce app. For production sites, you will need to create a separate set of API credentials to ensure proper rate limits are applied. 

A separate set of API credentials is required if you want more than one WordPress channel configured in your account, as using the standard **connect to BC** flow in the plugin will disconnect previous app connections from your other sites. For instructions on how to create additional API credentials, see [Multisite Setup](https://developer.bigcommerce.com/bigcommerce-for-wordpress/setup/multi-site).

API credentials can be set using constants in the site's `wp-config.php` file, as shown below. Values set in `wp-config.php` will override options in the database.

Setting API credentials in `wp-config.php` file: 

```
define( 'BIGCOMMERCE_API_URL', 'https://api.bigcommerce.com/stores/xxxxxxxxxx/v3/' );
define( 'BIGCOMMERCE_CLIENT_ID', 'xxxxxxxxxx' );
define( 'BIGCOMMERCE_CLIENT_SECRET', 'xxxxxxxxxx' );
define( 'BIGCOMMERCE_ACCESS_TOKEN', 'xxxxxxxxxx' );``

## Optional steps 

### Create a staging WordPress instance

To set up a staging site on WordPress without affecting the main site, you need to set up an additional channel for the staging site. This will ensure you can test the shopper experience end-to-end with all the URLs linking back to the staging instance and an independent set of products listed.

You can do this by installing BigCommerce for WordPress on a second WordPress site using the [API credentials](https://developer.bigcommerce.com/bigcommerce-for-wordpress/setup/multi-site#setting-up-a-wordpress-site-using-api-account-credentials) connection method and choosing to create a new channel during the setup process.




### Connect multiple channels into BigCommerce for WordPress

More than one channel can be connected to BigCommerce for WordPress to drive multi-region and other complex shopper experiences. For example, you can set up channels for US, FR, and UK regions that reference different names, descriptions, and price lists for each, and then have them activate when certain subdirectories are accessed. Alternatively, you can have a B2B channel that activates only when someone has a certain cookie set.

This requires activation of the `multi-channel` mode, which is a one-line command you add to your WordPress code, and some customization to tell WordPress when to use each channel.

Multi-channel mode: 

```js
add_filter( 'bigcommerce/channels/enable-multi-channel', '__return_true' );

```

For more details on how to build a multi-region storefront with BigCommerce for WordPress, see [Building a Multi-Region Storefront](https://medium.com/bigcommerce-developer-blog/build-a-multi-region-storefront-with-bigcommerce-for-wordpress-3-1-0-80cf56c3e8e9).





## Resources

- [Customization Guide](https://developer.bigcommerce.com/bigcommerce-for-wordpress/extending-the-plugin/customization-guide)
- [Proxy REST API Endpoints](https://developer.bigcommerce.com/bigcommerce-for-wordpress/extending-the-plugin/proxy-rest-api-endpoints)
- [BigCommerce Plugin Code Reference](https://bigcommerce.moderntribe.qa/)
- [BigCommerce for WordPress Changelog](https://github.com/bigcommerce/bigcommerce-for-wordpress/releases) (GitHub)
