
<div><h3 class="sub-docs-type" id="bigcommerce-for-wordpress">BigCommerce for Wordpress</h3>

# Introduction
<div class="otp" id="no-index">

### On This Page
- [How It Works](#how-it-works)

</div>

BigCommerce for WordPress allows you to power content-driven WordPress storefronts with the ecommerce functionality of BigCommerce. Product data is pulled into WordPress as a custom post type, giving you the freedom to embed products in posts and pages to create a tailored shopping experience. The plugin utilizes the full suite of BigCommerce APIs, allowing shoppers to seamlessly complete a purchase end-to-end on WordPress.

You can use the BigCommerce for WordPress plugin as a building block to create an ecommerce solution that’s unique to your brand. Whether you want to link multiple WordPress storefronts to a single BigCommerce store or extend the open source plugin to create custom-made solutions, BigCommerce for WordPress makes it easy to combine the power of BigCommerce with the flexible presentation of WordPress.

## How It Works

BigCommerce for WordPress connects your WordPress site to your BigCommerce store via API, and pulls all of the relevant data into a variety of database tables, some custom, some default WordPress. Products are a post type: product data is stored in the post table and product meta is stored in the post_meta table.

Orders data is stored on the BigCommerce servers and is accessible in your WordPress site via API with custom code and via a nice UI in the BigCommerce admin. 

Most store options and settings are managed inside the BigCommerce UI, including Shipping, Taxes, and Payment Gateways.

### Templating

All templates that render on the front end are found in the `/wp-content/plugins/bigcommerce/templates/public` directory. To
Override any template, create a `bigcommerce` directory in your theme and copy the template file to that directory.

For example, copy

`wp-content/plugins/bigcommerce/templates/public/single-bigcommerce_product.php`

to

`wp-content/themes/<theme-name>/bigcommerce/single-bigcommerce_product.php`

Then, edit `wp-content/themes/<theme-name>/bigcommerce/single-bigcommerce_product.php` to override the default content.

**Note**: Most templates are used for rendering content inside of the content area of your theme's template. Only a few take over the entire page template. These may need modifications to match your theme.