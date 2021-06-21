# How It Works

BigCommerce for WordPress connects your WordPress site to your BigCommerce store via API, and pulls all of the relevant data into a variety of database tables, some custom, some default WordPress. Products are a post type: product data is stored in the post table and product meta is stored in the post_meta table.

Orders data is stored on the BigCommerce servers and is accessible in your WordPress site via API with custom code and via a nice UI in the BigCommerce admin. 

Most store options and settings are managed inside the BigCommerce UI, including Shipping, Taxes, and Payment Gateways.

## Templating

All templates that render on the front end are found in the `/wp-content/plugins/bigcommerce/templates/public` directory. To
Override any template, create a `bigcommerce` directory in your theme and copy the template file to that directory.

For example, copy

`wp-content/plugins/bigcommerce/templates/public/single-bigcommerce_product.php`

to

`wp-content/themes/<theme-name>/bigcommerce/single-bigcommerce_product.php`

Then, edit `wp-content/themes/<theme-name>/bigcommerce/single-bigcommerce_product.php` to override the default content.

**Note**: Most templates are used for rendering content inside of the content area of your theme's template. Only a few take over the entire page template. These may need modifications to match your theme.