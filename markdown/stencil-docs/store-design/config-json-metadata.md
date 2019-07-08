<h1>config.json Metadata</h1> 
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#config_keys-and-example">Keys and Example Values</a></li>
    <li><a href="#config_requirements-and-restrictions">Requirements and Restrictions</a></li>
    <li><a href="#config_video-demo">Video Demo</a></li>
	</ul>
</div>




The <span class="fp">config.json</span> file is used to configure your Stencil theme. Use to manage custom theme settings. 
The <span class="fp">config.json</span>file allows you to:
* Provide global context for Stencil’s CSS and Handlebars resources
* Set values for [Store Design](https://support.bigcommerce.com/s/article/Store-Design)
* Provide metadata for your theme’s listing in the Theme Marketplace
* Define variations included in your theme

---

<a href='#config_keys-and-example' aria-hidden='true' class='block-anchor'  id='config_keys-and-example'><i aria-hidden='true' class='linkify icon'></i></a>

## Keys and Example Values
Below is a list of all available keys and values in <span class="fp">config.json</span>. This will vary based on the theme customizations.

<a href="/stencil-docs/object-references/models/configjson" class="devdocs-schema-box">Config.json Object Reference</a>

---

<a href='#config_requirements-and-restrictions' aria-hidden='true' class='block-anchor'  id='config_requirements-and-restrictions'><i aria-hidden='true' class='linkify icon'></i></a>

## Requirements and Restrictions

Your theme's <span class="fp">config.json</span> file must meet the following requirements:

* It must be named <span class="fp">config.json</span>, must reside in the root of your `{theme-name}` top level subdirectory (e.g.: <span class="fp">/cornerstone/config.json</span> or <span class="fp">/stencil/config.json</span>), and must be valid JSON.
* The maximum allowable size for a theme's <span class="fn">config.json</span> file is 64 KB. Exceeding this limit will trigger an error upon uploading the theme to BigCommerce.
* Each key's value is restricted to 64 characters. Exceeding this limit will similarly trigger an upload error.
* Other than these size constraints, there is no limit on the number of keys and values that you can place in a theme's <span class="fn">config.json</span>.

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">
    
<!-- theme: warning -->

### Carefully Check Your Requirements
> There is no way to re-display this pop-up after selecting Done, so be sure to securely store the credentials before leaving this screen.

</div>
</div>
</div>

### Required Themewide Keys
The <span class="fn">config.json</span> file must contain at least the following keys, with appropriate values (as outlined above):

* `version`
* `settings` (which must itself be a valid JSON object)
* `variations` (an array of at least one, and at most four, variation objects)
* `meta` (an object; see specific requirements below)

### Required `meta` Keys

The meta object must contain at least the following keys, with appropriate values:

* `price`
* `author_name`
* `author_email`
* `author_support_url`
* `documentation_url`

For illustration, here is a commented excerpt:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">Meta Keys Example</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "Meta Keys Example"
subtitle: ""
lineNumbers: true
-->

```json
{
  ...
  "meta": {
    "price": 15000, // in cents; non-negative integer, minimum 0
    "author_name:" "eCommerce Themes, Inc.", // Must be a string, not null
    "author_email": "support@example.com", // Must be a string, should be a valid email address, not null
    "author_support_url": "http://example.com/contactus", //  Must be a string, should be a valid URL, not null
    "documentation_url": "http://example.com/guide", // Must be a string, limit of 255 characters,
          not null
    "composed_image": "path/to/composed.png", // Must be a string path to the composed-image file
    "features": [ // Array of feature strings, all of which must be in the list enumerated here: 
          https://github.com/bigcommerce/theme-registry/blob/master/app/schemas/theme_config.json#L33
      "fully_responsive" // Must include at least one feature, and no duplicate entries
    ]
  },
  ...
}
```

### Required `variation` Keys

For each variation that you choose to include in your theme (at least one is required), you must provide at least the following keys and sub-element, with appropriate values:

* `name`
* `id`
* `meta` (an object, containing at least:)
* `description`

For illustration, here is a redacted excerpt from Cornerstone:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">variations</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "variations"
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
        "description": "Ideal for a wide range of businesses and brands, this design is fully responsive, simple, and ready for you to add your branding, logo, and products. ....",
    ...
    }
  ]
```

---

<a href='#config_video-demo' aria-hidden='true' class='block-anchor'  id='config_video-demo'><i aria-hidden='true' class='linkify icon'></i></a>

## Video Demo
The following video is a walkthrough of the config.json. It goes over what the file contains and how to set values.

<iframe width="560" height="315" src="https://www.youtube.com/embed/VZYZsDoEOpQ" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

---

## Resources

### Additional Resources
* [Cornerstone config.json](https://github.com/bigcommerce/cornerstone/blob/master/config.json) (BigCommerce Cornerstone GitHub)
* [Theme Store](https://www.bigcommerce.com/theme-store/) (BigCommerce)

