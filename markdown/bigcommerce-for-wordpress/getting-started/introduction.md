<div><h3 class="sub-docs-type" id="bigcommerce-for-wordpress">BigCommerce for Wordpress</h3>
<h1 class="sub-docs-title" id="introduction">Introduction</h1>
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
        <li><a href="#introduction_how-it-works">How it Works</a></li>
	</ul>
</div>

BigCommerce for WordPress allows you to power content-driven WordPress storefronts with the ecommerce functionality of BigCommerce. Product data is pulled into WordPress as a custom post type, giving you the freedom to embed products in posts and pages to create a tailored shopping experience. The plugin utilizes the full suite of BigCommerce APIs, allowing shoppers to seamlessly complete a purchase end-to-end on WordPress.

You can use the BigCommerce for WordPress plugin as a building block to create an ecommerce solution that’s unique to your brand. Whether you want to link multiple WordPress storefronts to a single BigCommerce store or extend the open source plugin to create custom-made solutions, BigCommerce for WordPress makes it easy to combine the power of BigCommerce with the flexible presentation of WordPress.


<a href='#introduction_how-it-works' aria-hidden='true' class='block-anchor'  id='introduction_how-it-works'><i aria-hidden='true' class='linkify icon'></i></a>

## How It Works

BigCommerce for WordPress connects your WordPress site to your BigCommerce store via API, and pulls all of the relevant data into a variety of database tables, some custom, some default WordPress. Products are a post type: product data is stored in the post table and product meta is stored in the post_meta table.

Orders data is stored on the BigCommerce servers and is accessible in your WordPress site via API with custom code and via a nice UI in the BigCommerce admin. 

Most store options and settings are managed inside the BigCommerce UI, including Shipping, Taxes, and Payment Gateways.


### Templating

All templates that render on the front end are found in the `/wp-content/plugins/bigcommerce/templates/public` directory. To
Override any template, create a `bigcommerce` directory in your theme and copy the template file to that directory.

For example, copy

```
wp-content/plugins/bigcommerce/templates/public/single-bigcommerce_product.php
```

to

```
wp-content/themes/<theme-name>/bigcommerce/single-bigcommerce_product.php
```

Then, edit `wp-content/themes/<theme-name>/bigcommerce/single-bigcommerce_product.php` to override the default content.

**Note**: Most templates are used for rendering content inside of the content area of your theme's template. Only a few take over the entire page template. These may need modifications to match your theme.

### Shopper Experience

When a customer visits the store, the products they see are stored locally in WordPress. A cart is optional–when the customer clicks add-to-cart, they can either be directed to a cart page or delivered directly to the checkout page.
When a shopper proceeds to checkout, they land on the BigCommerce checkout page in an embedded iframe, which can be styled to match your WordPress site. This creates a seamless experience for the shopper because they remain on your WordPress site and domain for the entire shopping experience. BigCommerce embedded checkout also allows you to leverage the built-in security and PCI-compliance of the BigCommerce checkout.

### Channels

Channels allow you to manage products in BigCommerce and sell them on other storefronts, like one or more WordPress sites, or in marketplaces, like Amazon and Facebook. A key concept is that the products listed on other channels are managed centrally from your BigCommerce store, so inventory is tracked neatly across all channels. This means that if all of your product ends up being sold through Amazon, your Facebook store will also be sold out.

### WordPress as a Channel

When using the WordPress plugin for BigCommerce, each connected WordPress site is considered another channel. This means that your WordPress store is aware of inventory levels, because those are monitored centrally in your BigCommerce store, and when an order is placed, it appears in the BigCommerce Order View UI along with orders received on other channels. Orders are labeled with the channel they originated from, to help you track sales data across multiple channels.

While merchants traditionally sell primarily through their BigCommerce store and supplement with channels, it is possible to mask the main BigCommerce store and treat any given channel as the primary store. This would allow you to use WordPress as your primary store.


