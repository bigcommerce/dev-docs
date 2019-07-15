<h1>Custom Fonts and Icons</h1>
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#custom-fonts-and-icons_applying-custom-fonts">Applying Custom Fonts</a></li>
    <li><a href="#custom-fonts-and-icons_applying-custom-icons">Applying Custom Icons</a></li>
	</ul>
</div>


<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">
    
<!-- theme: warning -->

### Custom Fonts Unavailable on Store Design
> Currently, custom fonts that you incorporate on your Stencil theme using this process will not be available for selection in Store Design.

</div>
</div>
</div>

<a href='#custom-fonts-and-icons_applying-custom-fonts' aria-hidden='true' class='block-anchor'  id='custom-fonts-and-icons_applying-custom-fonts'><i aria-hidden='true' class='linkify icon'></i></a>

## Applying Custom Fonts

### Staging the Fonts

First, acquire your custom fonts. In this logo scenario, we'll assume the single (nonexistent) font `MyFontFile.ttf`.
Next, [use WebDav to upload each custom font](). (Upload to WebDAV's default `/content/` folder.)

### Reference Fonts in Templates' `<head>`

Next, edit the appropriate template files' `<head>` sections to reference your custom fonts. In this logo example, you would edit the `/cornerstone/templates/layout/base.html` file's `<head>` section to insert the following code, which references the custom font you just uploaded:


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

```css
<style type="text/css" media="screen, print">
           @font-face {
               font-family: "MyFont";
               src: url("{{cdn 'webdav:MyFontFile.ttf'}}");
           }
</style>
```

### Update the CSS

Finally, update the appropriate CSS to reference the same font. Here, you would edit the `/cornerstone/assets/scss/layouts/header/_header.scss` file to include the two lines below `.header-logo-text`:

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

```
.header-logo-text {
display: block;
   font-family: 'MyFont';
   [...]
}
```

<div class="HubBlock--callout">
<div class="CalloutBlock--">
<div class="HubBlock-content">
    
<!-- theme:  -->

### Notes
> * The cdn custom Handlebars helper assumes WebDAV's default /content/ folder, so there is no need to specify that folder.
* Fonts staged via WebDAV, as in the above example, will not show up in the local version of your theme.

</div>
</div>
</div>

---

### Sass Stylesheet Support for Theme Fonts
	
To support Store Design, your theme's Sass stylesheet must call [Stencil's custom Sass functions](/stencil-docs/storefront-customization-custom-sass-functions) to transform fonts specified in the theme's `config.json` file. You must call these functions on each `config.json` font key whose value you want to make available to Sass variables.

The default Stencil theme includes these function calls in this stylesheet:
`{theme-name}/assets/scss/settings/foundation/type/_settings.scss`. If your theme relies on a Sass framework other than Foundation, the relevant stylesheet will be a different .scss file name within `{theme-name}/assets/scss/`.

	
#### How to Enable Fonts for Store Design

Assume that your theme's `config.json` contains the following key name and value (the details of both are arbitrary, but the key name must end in `-font`, and the value must follow a defined format):
	
`"headings-font": "Google_Open+Sans_700"`
	
In your Sass stylesheet, you would call the `stencilFontFamily` and `stencilFontWeight` custom Sass functions on the corresponding `config.json` key name:
	
```
$body-font-family: stencilFontFamily("body-font");
$body-font-weight: stencilFontWeight("body-font");
```

These functions would extract the corresponding `config.json` values as:

```
$body-font-family: 'Open Sans';
$body-font-weight: 700;
```
	
This transformation allows you to use the `$body-font-family` and `$body-font-weight` variables wherever needed in your theme. If a merchant uses Theme Editor to select a different font family and/or weight, the variables will propagate the change throughout your theme.


---

<a href='#custom-fonts-and-icons_applying-custom-icons' aria-hidden='true' class='block-anchor'  id='custom-fonts-and-icons_applying-custom-icons'><i aria-hidden='true' class='linkify icon'></i></a>

## Applying Custom Icons

### Installing Grunt

Some of a Stencil theme's static assets are handled with the Grunt JavaScript automator, where required. This means that you have some dependencies on both Grunt and npm. To get started:

First, make sure you have Grunt installed globally on your machine:

`npm install -g grunt-cli`

Then, from your theme's root directory, run:

`npm install`

### Calling Theme Icons 

A Stencil theme's icons are delivered via a single SVG sprite, which is embedded on the page in
`<theme-name>templates/layout/base.html`. This sprite is generated via the Grunt task `grunt svgstore`.

The task takes individual SVG files for each icon (in the theme's `assets/icons/` subdirectory) and bundles
them together, to be inlined on the top of the theme, inside a Handlebars partial.

You can then call each icon in a similar way to an inline image, via:

`<svg><use xlink:href="#icon-svgFileName" /></svg>`

The ID of each SVG icon you call is based on the filename of the icon you want, with `icon-` prepended.
For example:

`xlink:href="#icon-facebook"`

### Adding New Icons

Simply add your new icon SVG file to the `assets/icons/ `folder. Then, from your theme's root directory, run `grunt svgstore` or just `grunt`.

---

## Resources

### Additional Resources

* [Custom Icons Video Tutorial](https://www.youtube.com/watch/-w7Hbn_p_pw)  (Youtube)
* [Custom Fonts Video Tutorial](https://www.youtube.com/watch/-w7Hbn_p_pw) (Youtube) 

