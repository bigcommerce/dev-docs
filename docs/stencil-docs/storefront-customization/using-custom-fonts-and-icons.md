# Custom Fonts and Icons

<div class="otp">

- [Applying Custom Fonts](#applying-custom-fonts)
- [Sass Stylesheet Support for Theme Fonts](#sass-stylesheet-support-for-theme-fonts)
- [Applying Custom Icons](#applying-custom-icons)

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


<a id="markdown-applying-custom-fonts" name="applying-custom-fonts"></a>

## Applying Custom Fonts

There are two paths to take for using custom fonts.
- Change to a new Google Font
- Use a custom font

### Google Fonts

[Google Fonts](https://fonts.google.com/) is a collection of open source fonts available for use. The base Cornerstone theme uses Karla and Montserrat. Google Fonts come included in the Cornerstone theme.  In `config.json` update each place you want the change with the name of the new Google Font.  
Make sure it follows of the format `Google_FontName_Weight`.

```json
//old
"body-font": "Google_Karla_400"

//new
"body-font": "Google_Lato_700"
```

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

<!-- theme: info -->

### Check with your theme developer
> If you are using a different theme, please check with the theme developer on using Google Fonts.


</div>
</div>
</div>


### Custom Fonts

Custom fonts can be used an any theme. To use a custom font upload it to the stores `/content/` folder in [WebDav](https://support.bigcommerce.com/s/article/File-Access-WebDAV).


![content folder markdown](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/content_folder_webdav.png "Content Folder Webdav")


### Reference Fonts in Templates' `<head>`

Next, edit the appropriate template files' `<head>` sections to reference your custom fonts. In this logo example, you would edit the `/cornerstone/templates/layout/base.html` file's `<head>` section to insert the following code, which references the custom font you just uploaded:

```html
<style type="text/css" media="screen, print">
           @font-face {
               font-family: "MyFont";
               src: url("{{cdn 'webdav:MyFontFile.ttf'}}");
           }
</style>
```

For all possible browser support use:

```html
<style type="text/css" media="screen, print">
           @font-face {
               font-family: "MyFont";
				src: url("{{cdn 'webdav:MyFontFile.eot'}}"); /* IE9 Compat Modes */
				src: url("{{cdn 'webdav:MyFontFile.eot?#iefix'}}"), /* IE6-IE8 */
					 url("{{cdn 'webdav:MyFontFile.woff2'}}"), /* Super Modern Browsers */
					 url("{{cdn 'webdav:MyFontFile.woff'}}"), /* Pretty Modern Browsers */
					 url("{{cdn 'webdav:MyFontFile.svg#svgFontName'}}"); /* Legacy iOS */
           }
</style>
```

### Update the CSS

Finally, update the appropriate CSS to reference the same font. In this example , you would edit the `/cornerstone/assets/scss/layouts/header/_header.scss` file to change the header font.

```css
.header-logo-text {
display: block;
   font-family: 'MyFont';
   [...]
}
```

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

<!-- theme: {{callout_type}} -->

### CDN Handlebars
> The CDN custom Handlebars helper assumes WebDAV's default /content/ folder, so there is no need to specify that folder.
> Fonts staged via WebDAV, as in the above example, will not show up in the local version of your theme.

</div>
</div>
</div>

Any location where the font is not overridden in the CSS, it falls back on the font in `config.json`. Make sure to update the font there to prevent fallbacks.



<a id="markdown-sass-stylesheet-support-for-theme-fonts" name="sass-stylesheet-support-for-theme-fonts"></a>

##  Sass Stylesheet Support for Theme Fonts

To support Store Design, your theme's Sass stylesheet must call [Stencil's custom Sass functions](/stencil-docs/storefront-customization/custom-sass-functions) to transform fonts specified in the theme's `config.json` file. You must call these functions on each `config.json` font key whose value you want to make available to Sass variables.

The default Stencil theme includes these function calls in this stylesheet:
`{theme-name}/assets/scss/settings/foundation/type/_settings.scss`. If your theme relies on a Sass framework other than Foundation, the relevant stylesheet will be a different .scss file name within `{theme-name}/assets/scss/`.


### How to Enable Fonts for Store Design

Assume that your theme's `config.json` contains the following key name and value (the details of both are arbitrary, but the key name must end in `-font`, and the value must follow a defined format):

`"headings-font": "Google_Open+Sans_700"`

In your Sass stylesheet, you would call the `stencilFontFamily` and `stencilFontWeight` custom Sass functions on the corresponding `config.json` key name:

```css
$body-font-family: stencilFontFamily("body-font");
$body-font-weight: stencilFontWeight("body-font");
```

These functions would extract the corresponding `config.json` values as:

```css
$body-font-family: 'Open Sans';
$body-font-weight: 700;
```

This transformation allows you to use the `$body-font-family` and `$body-font-weight` variables wherever needed in your theme. If a merchant uses Theme Editor to select a different font family and/or weight, the variables will propagate the change throughout your theme.



<a id="markdown-applying-custom-icons" name="applying-custom-icons"></a>

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



## Resources

### Additional Resources
* [Stencil Custom Sass Functions](https://developer.bigcommerce.com/stencil-docs/storefront-customization/custom-sass-functions)
* [Custom Icons Video Tutorial](https://www.youtube.com/watch/-w7Hbn_p_pw)  (BigCommerce Youtube)
* [Custom Fonts Video Tutorial](https://www.youtube.com/watch/-w7Hbn_p_pw) (BigCommerce Youtube)
* [Google Fonts](https://fonts.google.com/) (Google)
