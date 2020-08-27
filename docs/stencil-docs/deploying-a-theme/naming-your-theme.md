# Naming Your Theme and Theme Variations

<div class="otp" id="no-index">

### On this page
- [Naming your theme](#naming-your-theme)
- [Creating and naming a new theme variation](#creating-and-naming-a-new-theme-variation)
- [Changing a theme variation’s font family](#changing-a-theme-variations-font-family-configjson)
- [Preparing a variation’s thumbnails](#preparing-a-variations-thumbnails)
- [Resources](#resources)

</div> 

## Naming your theme

The basic details of the Cornerstone theme are outlined in the theme's configuration file, [`config.json`](https://github.com/bigcommerce/cornerstone/blob/master/config.json). You can update the Cornerstone's `config.json` file to reflect your theme's values, such as name, version number, and documentation URL. 


Here are the first key-value sets in Cornerstone's `config.json`: 

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name"></div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "Cornerstone config.json settings"
subtitle: ""
lineNumbers: true
-->

```json
{
  "name": "Cornerstone",
  "version": "4.9.0",
  "meta": {
    "price": 0,
    "documentation_url": "https://support.bigcommerce.com/articles/Public/Cornerstone-Theme-Manual",
  // ...
  }
}
```

The following example shows how to change Cornerstone's configurations to reflect your own theme's name, version number, price on Theme Marketplace, and documentation URL:


<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name"></div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: ""
subtitle: ""
lineNumbers: true
-->

```json
{
"name": "MyTheme",
"version": "1.1.2",
"meta": {
  "price": 10000,
  "documentation_url": "https://www.mywebsite.com/theme-docs/my-theme.html",
  // ...
  }
}
```

## Creating and naming a new theme variation

You define variations in your theme's `config.json` file. Below is the Cornerstone Light variation's definition from Cornerstone's `config.json`:


<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name"></div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: ""
subtitle: ""
lineNumbers: true
-->

```json
  "variations": [
    {
      "name": "Light",
      "id": "light",
      "meta": {
        "desktop_screenshot": "desktop_light.png",
        "mobile_screenshot": "mobile_light.png",
        "description": "Ideal for a wide range of businesses and brands, this design is fully responsive, simple, and ready for you to add your branding, logo, and products. It comes ready to build a clean looking and beautiful store with features such as homepage carousel, social media icons, featured and top selling products, and faceted search (which is available on select BigCommerce plans). Fully express your brand by using our Theme Editor to quickly and easily style your site's fonts and colors, all without the need to write code.",
        "demo_url": "https://cornerstone-light-demo.mybigcommerce.com",
        "optimized_for": [
          "multi_purpose",
          "mobile_tablet_desktop",
          "sales_discounts",
          "large_catalog"
        ],
        //...
      },
      //..
    },
```

Try inserting your custom variation into the `variations` object of Cornerstone's `config.json`. Your variation's definition might look something like this:


<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name"></div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: ""
subtitle: ""
lineNumbers: true
-->

```json
"variations": [
// ...
  {
    "name": "MyCustomVariation",
    "id": "my_custom_variation",
    "meta": {
      "desktop_screenshot": "my_custom_desktop_screenshot.jpg",
      "mobile_screenshot": "my_custom_mobile_screenshot.png",
      "description": "This is a really cool custom style of the Stencil Theme",
      "demo_url": "https://stencil-custom.mybigcommerce.com",
      "optimized_for": ["fashion", "image_heavy", "etc"],
      "industries": []
    },
  },
  // ...
```

## Changing a theme variation's font family


To learn more about defining variations, see [Defining Global Styles](/stencil-docs/configure-store-design-ui/defining-global-styles). In particular, note the option to configure settings and variables that are scoped to each variation.

The following example shows how to set the body of a theme variation to a specific typeface/family by inserting the `body-font-family` key into the `settings` object:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name"></div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: ""
subtitle: ""
lineNumbers: true
-->

```json
{
  "name": "MyCustomVariation",
  "id": "my_custom_variation",
  "settings": {
    // ...
    "body-font-family": "MyCoolFont, AnotherFont, sans-serif",
    // ...
  }
}
```

## Preparing a variation's thumbnails


For details on preparing screenshots that enable merchants to preview each variation, and to preview your theme as a whole in the BigCommerce control panel and Theme Marketplace, see [Preparing Thumbnail Images](https://developer.bigcommerce.com/stencil-docs/deploying-a-theme/preparing-thumbnail-images).

<div class="HubBlock--callout">
<div class="CalloutBlock--">
<div class="HubBlock-content">

<!-- theme:  -->

### Using Stencil CLI to change variations
> To locally test/debug a specific variation of your theme, launch it by invoking the Stencil CLI’s `stencil start -v` switch. Enter the following code into the terminal, replacing `variation-name` with your theme's variation name as listed in `config.json`:

`stencil start -v variation-name`

</div>
</div>
</div>

## Resources

### Related articles
* [Checking a Theme's Size](https://developer.bigcommerce.com/stencil-docs/deploying-a-theme/checking-a-themes-size)
* [Preparing Thumbnail Images](https://developer.bigcommerce.com/stencil-docs/deploying-a-theme/preparing-thumbnail-images)
* [Bundling and Pushing a Theme](https://developer.bigcommerce.com/stencil-docs/deploying-a-theme/bundling-and-pushing)
