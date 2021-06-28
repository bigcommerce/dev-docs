# Overriding Styles

<div class="otp" id="no-index">
	
### On this page

- [CSS](#css)
- [Opting out of BigCommerce styles](#opting-out-of-bigcommerce-styles)

</div>

## CSS

BigCommerce for WordPress (BC4WP) uses [PostCSS](https://postcss.org/), a JavaScript tool that accepts CSS with special additional syntax and compiles it into normal CSS. Combined with PostCSS plugins, PostCSS offers many of CSS preprocessors' core features like Sass, with less overhead.

The `asset/pcss` directory contains PostCSS modules. The `assets/css` directory contains both the minified and uncompressed versions of the CSS files created during the PostCSS build process.

To style BC4WP elements with custom CSS, add your CSS to your theme’s style sheet rather than editing the BC4WP plugin style sheets directly. Your theme’s CSS has specificity over styles applied by the plugin and overrides the default styles.

For example, you might want to change the Add-To-Cart button from blue to orange by adding the following CSS to your theme’s style sheet:

```css
button.bc-btn.bc-btn--form-submit.bc-btn--add_to_cart {
  background-color: #ff9c33;
}
```

## Opting out of BigCommerce styles

To disable the BC4WP plugin styles entirely, take the following steps: 

1. From within the WordPress admin dashboard's lefthand menu, go to **Appearance** and select **Customize**.
2. Navigate to **BigCommerce** > **Colors & Theme**. 
2. Select **Disable Plugin Styles** from the **CSS** menu.