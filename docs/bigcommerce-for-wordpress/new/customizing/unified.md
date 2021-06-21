# Customizing

<div class="otp" id="no-index">
	
### On this page
- [Overview](#overview)
- [Overriding styles](#overriding-styles)
- [Overriding templates](#overriding-templates)

</div>

## Overview

BigCommerce for WordPress (BC4WP) is compatible out-of-the-box with all standard WordPress themes and includes full support for the Genesis theme framework. The plugin includes templates and stylesheets to render all of the elements and pages you need to merchandise your products and move shoppers through checkout, including:

- Product Cards
- Product Detail Pages
- Product Listing Pages
- Product Archive Page
- Cart Page
- Gift Certificate Page
- Customer Account, Registration, and Order History Pages
- Shipping & Returns Page
- Checkout Page

Although the plugin will work with any theme, as a theme developer, you can choose to offer BigCommerce for WordPress support by styling the pages and elements created by the plugin to fit your theme’s design.

Plugin developers can also fork [BigCommerce for WordPress on GitHub](https://github.com/bigcommerce/bigcommerce-for-wordpress), where the plugin is available as an open-source project. We encourage developers to adapt BigCommerce for WordPress to fit any custom use case imaginable! If you’re building a custom feature that you think would benefit the wider community, consider submitting a pull request on GitHub to add your feature to the code base.

This guide will walk through the available options to develop themes that support BigCommerce for WordPress and extend the plugin through custom development.

## Overriding styles
### CSS

BigCommerce for WordPress uses [PostCSS](https://postcss.org/), a JavaScript tool that accepts CSS with special additional syntax and compiles it into normal CSS. Combined with PostCSS plugins, PostCSS offers many of CSS preprocessors' core features like Sass, with less overhead.

The `asset/pcss` directory contains PostCSS modules. The `assets/css` directory contains both the minified and uncompressed versions of the CSS files created during the PostCSS build process.

### Custom CSS

To style BigCommerce for WordPress elements with custom CSS, add your CSS to your theme’s stylesheet rather than editing the plugin stylesheets directly. Your theme’s CSS will have specificity over styles applied by the plugin and will override the default styles.

For example, you might want to change the Add-To-Cart button from blue to orange by adding the following CSS to your theme’s stylesheet:

```css
button.bc-btn.bc-btn--form-submit.bc-btn--add_to_cart {
  background-color: #ff9c33;
}
```

### Opting out of BigCommerce styles

If you wish to disable the built-in plugin styles entirely, you have the option to do so. In the WordPress theme customizer, navigate to BigCommerce > Colors & Theme and select Disable Plugin Styles from the CSS dropdown menu.

## Overriding templates


BC4WP includes template files that are used to display your BigCommerce data on your WordPress storefront. You can edit these templates to change both the content displayed and the styling of that content.

### Templates location

You can find all of the BC4WP template files that render on the frontend in the `templates/public` folder. Templates within the `templates/public/components` subfolder render smaller content blocks within your theme’s template, while the following two control the entire page:

- `single-bigcommerce_product.php`: The template for rendering a single Product post.

- `archive-bigcommerce_product.php`: The template for rendering the Product post type archive.

These templates may require modification to match the styling of your theme. Both templates call the functions `get_header()` and `get_footer()` to render your theme's default header and footer.

You can render the page content inside the wrapper template found in `components/page-wrapper.php`. By modifying this wrapper template to match the HTML markup of a template in your theme, you can have consistent styling across your site.



### Template overrides

When a WordPress plugin is updated, the new version overwrites existing plugin files. To ensure that your customizations persist through the update process, it’s important to use overrides in your theme files rather than editing plugin files directly.

To override any template, create a bigcommerce directory in your theme and copy the template file to that directory.

Examples:

Copy `templates/public/single-bigcommerce_product.php` to `bigcommerce/single-bigcommerce_product.php`

Copy `templates/public/components/page-wrapper.php` to `bigcommerce/components/page-wrapper.php`

As WordPress loads, it will first check for a custom template override in your theme's `/bigcommerce` directory; if there is no custom template there, WordPress will fetch the built-in plugin template instead.

### Required element classes

BC4WP relies on specially named element classes for JavaScript functionality, and we strongly recommend leaving the default class names untouched as you create custom templates. You are, however, welcome to create additional classes.