# Overview

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