# Overriding Templates

<div class="otp" id="no-index">
	
### On this page

- [Styling BC4WP templates](#styling-bc4wp-templates)
  
</div>

## Styling BC4WP templates

BC4WP includes template files that are used to display your BigCommerce data on your WordPress storefront. You can edit these templates to change both the content displayed and the styling of that content.

<!--
title: "Schema translations example"
lineNumbers: true
-->

```json
{
 "i18n.LineColor": {
   "default": "Line color",
   "fr-FR": "Couleur de la ligne",
   "en": "Line color",
   "zh-CH": "线条颜色"
 },
 "i18n.LineStyle": {
   "default": "Line style",
   "fr-FR": "Style de ligne",
   "en": "Line style",
   "zh-CH": "线型"
 },
 "i18n.LineWidth": {
   "default": "Line width",
   "fr-FR": "Largeur de ligne",
   "en": "Line width",
   "zh-CH": "行宽"
 },
 "i18n.LineThickness": {
   "default": "Line Thickness",
   "fr-FR": "Épaisseur de ligne",
   "en": "Line Thickness",
   "zh-CH": "线的粗细"
 },
 "i18n.Alignment": {
   "default": "Alignment",
   "fr-FR": "Alignement",
   "en": "Alignment",
   "zh-CH": "结盟"
 }
}
```

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