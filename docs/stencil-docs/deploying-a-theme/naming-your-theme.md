<h1>Naming Your Theme and Theme Variations</h1>

<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
  	<li><a href="#naming_naming">Naming Your Theme</a></li>
  	<li><a href="#naming_creating">Creating and Naming a New Theme Variation</a></li>
  	<li><a href="#naming_changing">Changing a Theme Variation’s Font Family (config.json)</a></li>
  	<li><a href="#naming_preparing">Preparing a Variation’s Thumbnails</a></li>
	</ul>
</div>

<a href='#naming_naming' aria-hidden='true' class='block-anchor'  id='naming_naming'><i aria-hidden='true' class='linkify icon'></i></a>

## Naming Your Theme

You can configure certain values in [config.json](https://github.com/bigcommerce/cornerstone/blob/master/config.json) that outline the basic details of your theme. Here are the first few key/value sets in version 1.0.0 Cornerstone's config.json:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">Cornerstone config.json settings</div>
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
"version": "1.0.0",
"meta": {
  "price": 0,
   "documentation_url": 		
   "https://support.bigcommerce.com/articles/Public/Cornerstone-Theme-Manual",
  // ...
  }
}
```

The next code block shows how you might change these values to reflect your own theme’s name, version number, price on Theme Marketplace, and documentation URL:

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

---

<a href='#naming_creating' aria-hidden='true' class='block-anchor'  id='naming_creating'><i aria-hidden='true' class='linkify icon'></i></a>

## Creating and Naming a New Theme Variation

You define variations in your theme's <Span class="fn">config.json</span> file. Below is the Cornerstone Light variation’s definition, followed by the head of the `Bold` variation’s definition from Cornerstone's <span class="fn">config.json</span>:

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
      "desktop_screenshot": "desktop_screenshot.jpg",
      "mobile_screenshot": "mobile_screenshot.png",
      "description": "This is the light style of the Stencil Theme",
      "demo_url": "https://stencil-light.mybigcommerce.com",
      "optimized_for": ["fashion", "image_heavy", "etc"],
      "industries": []
    },
  },
  {
  "name": "Bold",
  "id": "bold"
  }
  // ...
]
```

Try inserting a new custom variation of your own, below the "Light" block shown above. Your variation’s definition might look something like this:

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
  {
    "name": "Bold",
    "id": "bold"
  }
  // ...
```

---

<a href='#naming_changing' aria-hidden='true' class='block-anchor'  id='naming_changing'><i aria-hidden='true' class='linkify icon'></i></a>

## Changing a Theme Variation’s Font Family (config.json)

To learn more about defining variations, see [Defining Global Styles](/stencil-docs/configure-store-design-ui/defining-global-styles) for details about each key/value pair. In particular, note the option to configure settings and variables that are scoped to each variation.

For example, you could insert the "`settings":...”body-font-family”` block shown below to set body text for one theme variation to a specific typeface/family:



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

---

<a href='#naming_preparing' aria-hidden='true' class='block-anchor'  id='naming_preparing'><i aria-hidden='true' class='linkify icon'></i></a>

## Preparing a Variation’s Thumbnails

For details on preparing screenshots that enable merchants to preview each variation – and to preview your theme as a whole in the BigCommerce control panel and Theme Marketplace, see Preparing Thumbnail Images.

<div class="HubBlock--callout">
<div class="CalloutBlock--">
<div class="HubBlock-content">

<!-- theme:  -->

### Using Stencil CLI to Change Variations
> To locally test/debug a specific variation of your theme, launch it by invoking the Stencil CLI’s (command-line interface’s) `stencil start -v` switch. Depending on how you’ve named your variation in <span class="fn">config.json, you would type something like this on the command line:

`stencil start -v MyCustomVariation`

</div>
</div>
</div>

---

## Resources

### Related Articles
* [Checking a Theme's Size](https://developer.bigcommerce.com/stencil-docs/deploying-a-theme/checking-a-themes-size)
* [Preparing Thumbnail Images](https://developer.bigcommerce.com/stencil-docs/deploying-a-theme/preparing-thumbnail-images)
* [Bundling and Pushing a Theme](https://developer.bigcommerce.com/stencil-docs/deploying-a-theme/bundling-and-pushing)
