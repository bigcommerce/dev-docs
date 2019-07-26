<h1>Building a Multi-Region Storefront</h1>

<div class="otp" id="no-index">

### On This Page

* [The BigCommerce Approach to Serving Multiple Regions](#the-bigCommerce-approach-to-serving-multiple-regions)
* [Primary Use Cases](#primary-use-cases)
* [Multi-Region Implementation Examples](#multi-region-implementation-examples)

</div>

This article demonstrates some BigCommerce for WordPress plugin Multi-Channel capabilities and provides an example to illustrate how a multi-region storefront can be set up with minimal code.

This is also a representation of what is possible with the BigCommerce public APIs today. If you are looking to implement your own custom storefront and it needs to support more than one region, you can apply the concepts here too.

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">
    
<!-- theme: info -->

> This article was adapted from [Build a Multi-Region Storefront with BigCommerce for WordPress 3.1.0+](https://medium.com/bigcommerce-developer-blog/build-a-multi-region-storefront-with-bigcommerce-for-wordpress-3-1-0-80cf56c3e8e9) featured on the [BigCommerce Developer Blog](https://medium.com/bigcommerce-developer-blog).

</div>
</div>
</div>

--- 

## The BigCommerce Approach to Serving Multiple Regions

One of the key characteristics of a multi-channel architecture is that multiple user-facing experiences share a single backend. With BigCommerce for WordPress, and with other channel integrations built on BigCommerce, that single backend is BigCommerce, which is the source of truth for the catalog, orders, and customers.

A single product might be listed on several channels, and across those channels, the product details may vary. For example, a pair of sneakers that’s sold on a site serving the US region might have a different price and description than the pair that is sold on the French site. But despite those variations, there is a single product record for the pair of sneakers which is managed from the BigCommerce control panel. Similarly, orders placed on different channels all flow into a single admin view within BigCommerce, and each order is attributed back to its channel source. This allows you to maintain a central source of truth for managing your orders, while tracking sales performance across various channels. No need to jump around into different accounts!

---

## Primary Use Cases

Let’s begin with a common multi-site use cases: multi-region. Businesses with a global footprint have the need to tailor product merchandising to the regions where they do business, which means translating product details into the local language and showing prices in the proper currency.
While you could serve multiple regions with separate sites, there are advantages to orchestrating multiple experience from a single site. Lower overhead and a streamlined workflow for managing site admin are a few major considerations. The BigCommerce for WordPress plugin consolidates multiple channels into a single product view, giving you the ability to filter products by channel and edit product details on a channel-specific basis.

That being said, the BigCommerce for WordPress multi-store functionality isn’t tied only to multi-region. You could potentially build multi-store experiences around a range of broader use cases including B2B scenarios like separate wholesale and retail sites or “vendor portals”, featuring a product catalog specific to each vendor.
The reason for this versatility is that multi-channel is controlled within the plugin using two hooks: one that activates the multi-channel functionality within the plugin and another that wraps the logic for changing channels. The important distinction is that we allow developers to define that logic themselves, which means that the trigger for changing channel views can be anything — the shopper’s geo IP, a customer attribute — any condition that you can detect.

---

## Multi-Region Implementation Examples

In this section we’ll dive into enabling multi-region storefronts. These two different examples are based on simple child plugins, which trigger the channel view when a user’s region is France. The French channel includes product details that have been translated into the appropriate language and also switches the currency code and symbol to Euro.
Note: Both examples have a sample child plugin you can download as a starter at the bottom of this post.

### Enabling Multi-Channel

For both examples, the BigCommerce for WordPress multi-channel mode is enabled using this filter:

```php
add_filter( ‘bigcommerce/channels/enable-multi-channel’, ‘__return_true’ );
```

With the enable-multi-channel functionality activated, we can supply logic to change the channel view based on a condition that we define — like the user’s location. This filter also activates changes within the admin interface that allow users to manage channel listings.

![BigCommerce for WordPress Settings](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/img/multi-region-storefront-01.png "BigCommerce for WordPress Settings")

A simple way to get the term id for a channel, which you’ll need later, is to hover over one of the ‘rename’, ‘make primary’ or ‘disconnect’ actions here to see the term id in the url.

### Triggering a Region via Geo IP Lookup

A common requirement for multi-region implementations is automatically selecting the right region based on the shopper’s geo location. We’ll unlock this with help from the free GeoIP Detection plugin to detect the user’s location based on geo IP. By default, the plugin reaches out to an API for geo-location data, but you can also specify a database to pull location data from instead (for example GeoLite2 City database, which can enabled during GeoIP plugin setup).

he GeoIP Detection plugin supplies this function, which does a lookup of geo-location data for the current user:

```php
geoip_detect2_get_info_from_current_ip()
```

The child plugin uses this function to check the user’s location against the country code ‘FR’ if the GeoIP detect plugin is also installed (so there isn’t an error when the child plugin calls the function above).

The logic looks like this:

```php
$userInfo = geoip_detect2_get_info_from_current_ip();
if (function_exists('geoip_detect2_get_info_from_current_ip')) {
  if ($userInfo->country->isoCode == 'FR') {
    // Switch from primary channel (US in the demo) to FR channel
  }
} else {
  // Echo out warning that GeoIP detect plugin is not act
}
```

### Changing the Channel View

Here’s where the multi magic happens. If the shopper’s location matches France, we trigger three changes:
1. set the current channel to the one containing French product listings
2. change the currency code to ‘EUR’, and
3. switch the currency symbol to ‘€’.

Within the code these changes are done with the following WordPress filters:

```php
add_filter('bigcommerce/channel/current', function($channel) {
 return get_term(41, \BigCommerce\Taxonomies\Channel\Channel::NAME);
}, 10, 1);
add_filter('pre_option_' . 'bigcommerce_currency_code', function() {
 return 'EUR';
}, 10, 0);
```

If you have the php-intl extension on your server, the currency formatting will automatically work out at this point. If you don’t, there are additional filters to use that are explicit:

```php
add_filter('pre_option_bigcommerce_currency_symbol', function() {
 return '€';
}, 10, 0);
add_filter('pre_option_bigcommerce_currency_symbol_position', function() {
 return 'left';
}, 10, 0);
add_filter('pre_option_bigcommerce_decimal_units', function() {
 return 2;
}, 10, 0);
add_filter('pre_option_bigcommerce_integer_units', function() {
 return 16;
}, 10, 0);
```

Added up into something runnable, the code looks like:

```php
add_filter( 'bigcommerce/channels/enable-multi-channel', '__return_true' );

if (function_exists('geoip_detect2_get_info_from_current_ip')) {
	$userInfo = geoip_detect2_get_info_from_current_ip();
	if ($userInfo->country->isoCode == 'FR') {
		add_filter( 'bigcommerce/channel/current', function( $channel ) {
			// logic to set the channel
			return get_term( 41, \BigCommerce\Taxonomies\Channel\Channel::NAME );
		}, 10, 1 );
		
		add_filter( 'pre_option_' . 'bigcommerce_currency_code', function() {
			return 'EUR';
		}, 10, 0 );
		
		add_filter( 'pre_option_bigcommerce_currency_symbol', function() {
			return '€';
		}, 10, 0 );
		// also, pre_option_bigcommerce_currency_symbol_position, pre_option_bigcommerce_integer_units, pre_option_bigcommerce_decimal_units
	}
} else {
	echo '<!-- Warning: The plugin GeoIP Detection is not active. -->';
}
```

### Testing GeoIP Triggering

You can test the French channel on the storefront using a VPN or a cloud-based geo tester like LocaBrowser to appear as if you are in a French location.

### Triggering a Region via Query String

Another common implementation is using the url as a trigger for a specific locale. Using much of the same logic but replacing the GeoIP check with a query string check, another child plugin example can be produced in a matter of minutes.

Here's a high-level view of the code:

```php
if ( $_GET[ 'region' ] !== 'en' && ($_GET[ 'region' ] === 'fr' || strpos($_SERVER['HTTP_REFERER'], 'region=fr') !== false) ) {
 // Same channel filters as the GeoIP example
}
```

### Adding a Region Selector

To allow the user to switch back and forth between the US and French regions on the storefront, add a simple menu. 

As an example, here's one based on a Code Pen published by Axel Köhler:

![Region Selector](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/img/multi-region-storefront-02.png "Region Selector")

Here’s the PHP code for the region selector:

```php
<?
$bc4wp_regions = [
    'en' => [
        'img' => 'http://i64.tinypic.com/fd60km.png',
        'url' => '?region=en',
        'label' => 'United States',
    ],
    'fr' => [
        'img' => 'http://i65.tinypic.com/300b30k.png',
        'url' => '?region=fr',
        'label' => 'France',
    ]
];
?>

<ul class="languagepicker">
<?
    $selected_region = 'en';
    if (isset($_GET['region']) && isset($bc4wp_regions[$_GET['region']])) {
        $selected_region = $_GET['region'];
    }
    
    echo '<a href="'.$bc4wp_regions[$selected_region]['url'].'"><li><img src="'.$bc4wp_regions[$selected_region]['img'].'"/>'.$bc4wp_regions[$selected_region]['label'].'</li></a>';
    
    unset($bc4wp_regions[$selected_region]);
    
    foreach ($bc4wp_regions as $region) {
        echo '<a href="'.$region['url'].'"><li><img src="'.$region['img'].'"/>'.$region['label'].'</li></a>';
    } 
?>
</ul>
```

And some CSS to style it:

```css
.languagepicker {
    background-color: #FFF;
    display: inline-block;
    padding: 0;
    height: 40px;
    overflow: hidden;
    transition: all .3s ease;
    margin: 0 50px 10px 0;
    vertical-align: top;
    position: absolute;
    top: 65px;
    right: 25px;
    z-index: 100000;
    border-radius: 10px;
}

.languagepicker:hover {
    /* don't forget the 1px border */
    height: 81px;
}

.languagepicker a{
    color: #000;
    text-decoration: none;
}

.languagepicker li {
    display: block;
    padding: 0px 20px;
    line-height: 40px;
    border-top: 1px solid #EEE;
}

.languagepicker li:hover{
    background-color: #EEE;
}

.languagepicker a:first-child li {
    border: none;
    background: #FFF !important;
}

.languagepicker li img {
    margin-right: 5px;
}

.roundborders {
    border-radius: 5px;
}

.large:hover {
    /* 
    don't forget the 1px border!
    The first language is 40px heigh, 
    the others are 41px
    */
    height: 245px;
}
```

I also added this to mask the ‘flash’ of the pricing loading for a specific channel:

```css
.bc-product__pricing--cached { visibility: hidden !important; }
```

In the child plugin for this example, the PHP template and CSS for the menu are included. This means you don’t have to modify your theme files to accomplish this UX, which is a nice perk.

The end result is this region selection UX:

![BigCommerce Multi-Region Example](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/img/multi-region-storefront-03.gif "BigCommerce Multi-Region Example")

## Resources

### Sample Apps
Jump start your development with one of these child plugins, based on the examples above:
* By GeoIP: http://bit.ly/bc4wp-geoip-region-activation
* By Query String: http://bit.ly/bc4wp-query-string-activation

### Related Articles
* [Build a Multi-Region Storefront with BigCommerce for WordPress 3.1.0+](https://medium.com/bigcommerce-developer-blog/build-a-multi-region-storefront-with-bigcommerce-for-wordpress-3-1-0-80cf56c3e8e9)
* [BigCommerce for WordPress Plugin](https://www.bigcommerce.com/solutions/wordpress-ecommerce-plugin/)