# Overriding Styles

## CSS

BigCommerce for WordPress uses [PostCSS](https://postcss.org/), a JavaScript tool that accepts CSS with special additional syntax and compiles it into normal CSS. Combined with PostCSS plugins, PostCSS offers many of CSS preprocessors' core features like Sass, with less overhead.

The `asset/pcss` directory contains PostCSS modules. The `assets/css` directory contains both the minified and uncompressed versions of the CSS files created during the PostCSS build process.

## Custom CSS

To style BigCommerce for WordPress elements with custom CSS, add your CSS to your theme’s stylesheet rather than editing the plugin stylesheets directly. Your theme’s CSS will have specificity over styles applied by the plugin and will override the default styles.

For example, you might want to change the Add-To-Cart button from blue to orange by adding the following CSS to your theme’s stylesheet:

```css
button.bc-btn.bc-btn--form-submit.bc-btn--add_to_cart {
  background-color: #ff9c33;
}
```

### Opting out of BigCommerce styles

If you wish to disable the built-in plugin styles entirely, you have the option to do so. In the WordPress theme customizer, navigate to BigCommerce > Colors & Theme and select Disable Plugin Styles from the CSS dropdown menu.