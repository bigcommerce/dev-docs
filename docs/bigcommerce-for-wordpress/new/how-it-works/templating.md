# Templating

All templates that render on the front end are found in the `/wp-content/plugins/bigcommerce/templates/public` directory. To
Override any template, create a `bigcommerce` directory in your theme and copy the template file to that directory.

For example, copy

`wp-content/plugins/bigcommerce/templates/public/single-bigcommerce_product.php`

to

`wp-content/themes/<theme-name>/bigcommerce/single-bigcommerce_product.php`

Then, edit `wp-content/themes/<theme-name>/bigcommerce/single-bigcommerce_product.php` to override the default content.

**Note**: Most templates are used for rendering content inside of the content area of your theme's template. Only a few take over the entire page template. These may need modifications to match your theme.