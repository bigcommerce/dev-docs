# Overriding Templates

<div class="otp" id="no-index">
	
### On this page

- [Styling BC4WP templates](#styling-bc4wp-templates)
  
</div>

## Styling BC4WP templates

BC4WP includes template files that display your BigCommerce data on your WordPress storefront. You can edit these templates to change both the content displayed and the styling of that content.

### Templates location

You can find all of the BC4WP template files that render on the frontend in the `templates/public` folder. Templates within the `templates/public/components` subfolder render smaller content blocks within your theme’s template, while the following two control the entire page:

- `single-bigcommerce_product.php`: The template for rendering a single Product post.

- `archive-bigcommerce_product.php`: The template for rendering the Product post type archive.

These templates might require modification to match the styling of your theme. Both templates call the functions `get_header()` and `get_footer()` to render your theme's default header and footer.

You can render the page content inside the wrapper template found in `components/page-wrapper.php`. By modifying this wrapper template to match the HTML markup of a template in your theme, you can have consistent styling across your site.

### Template overrides

When WordPress updates a plugin, the new version overwrites existing plugin files. To ensure that your customizations persist through the update process, it’s important to use overrides in your theme files rather than editing plugin files directly.

To override any template, create a `/bigcommerce` directory in your theme and copy the template file to that directory.

Examples:

Copy `templates/public/single-bigcommerce_product.php` to `bigcommerce/single-bigcommerce_product.php`

Copy `templates/public/components/page-wrapper.php` to `bigcommerce/components/page-wrapper.php`

As WordPress loads, it checks for a custom template override in your theme's `/bigcommerce` directory. If no custom template is present, WordPress fetches the BC4WP plugin template instead.

### Required element classes

Changing element class names as you create custom templates may break BC4WP's JavaScript functionality. Add new element class names rather than removing or editing existing classes.