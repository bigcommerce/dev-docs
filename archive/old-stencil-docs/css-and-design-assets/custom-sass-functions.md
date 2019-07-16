<h1>Custom Sass Functions</h1>
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#custom-sass-functions_stencilcolor">stencilColor</a></li>
    <li><a href="#custom-sass-functions_stencilfontfamily">stencilFontFamily</a></li>
    <li><a href="#custom-sass-functions_stencilfontweight">stencilFontWeight</a></li>
    <li><a href="#custom-sass-functions_stencilnumber">stencilNumber</a></li>
    <li><a href="#custom-sass-functions_stencilstring">stencilString</a></li>
    <li><a href="#custom-sass-functions_stencilimage">stencilImage</a></li>
    <li><a href="#custom-sass-functions_compiling-custom-sass-files">Compiling Custom Sass Files</a></li>
	</ul>
</div>


<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">
    
<!-- theme: warning -->

### Before You Customize
> The Stencil framework is designed to support your incorporation of custom Sass files/frameworks. However, BigCommerce does not offer technical assistance on substitutions for, or customized versions of, Stencil's default dependencies.

</div>
</div>
</div>

<a href='#custom-sass-functions_stencilcolor' aria-hidden='true' class='block-anchor'  id='custom-sass-functions_stencilcolor'><i aria-hidden='true' class='linkify icon'></i></a>

## stencilColor

`stencilColor` accepts (as a string) the key name of a color that you have defined in <span class="fn">config.json</span> as editable. It returns the color’s hexadecimal value.

In Stencil's Cornerstone (1.4.0) base theme, the <span class="fn">optimized-checkout.scss</span> file sets the background color for the page's header with the following code:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">optimized-checkout.scss</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "optimized-checkout.scss"
subtitle: ""
lineNumbers: true
-->

```css
.optimizedCheckout-header {
    background-color: stencilColor("optimizedCheckout-header-backgroundColor");
    // scss-lint:disable StringQuotes
    background-image: url(stencilImage('optimizedCheckout-backgroundImage', 'optimizedCheckout-backgroundImage-size'));
    // scss-lint:enable StringQuotes
    background-size: cover;
    ...
}
```

The above CSS fetches the background-color property's value by using the `stencilColor()` function to retrieve the `optimizedCheckout-header-backgroundColor` key's current value.

That `optimizedCheckout-header-backgroundColor` key is defined, and assigned a default value, in <span class="fn">config.json</span>. However, merchants can use [Store Design](https://support.bigcommerce.com/s/article/Store-Design) to change the value at any time. So using this `stencilColor()` call, the key's current value (which might have been altered from the static default value in <span class="fn">config.json</span>) will be fetched from a BigCommerce settings server.

---

<a href='#custom-sass-functions_stencilfontfamily' aria-hidden='true' class='block-anchor'  id='custom-sass-functions_stencilfontfamily'><i aria-hidden='true' class='linkify icon'></i></a>

## stencilFontFamily

`stencilFontFamily` accepts (as a string) the name of a font key that you have defined in config.json. It returns the corresponding font-family value, also as a string. For a key named "headings-font" and defined as Google Open Sans, `stencilFontFamily` would return a value like this to Sass variables:

`$headings-‐font-‐family: 'Open Sans';`

(The above example's name and definition in config.json are both arbitrary.)

Your Sass stylesheet must call stencilFontFamily for each <span class="fn">config.json</span> font key whose font-family value you want to provide to Sass variables. You would call the function in the following format (again assuming a key arbitrarily named "headings-font"):

`$headings-font-family: stencilFontFamily("headings-font");`

---

<a href='#custom-sass-functions_stencilfontweight' aria-hidden='true' class='block-anchor'  id='custom-sass-functions_stencilfontweight'><i aria-hidden='true' class='linkify icon'></i></a>

## stencilFontWeight

`stencilFontWeight` accepts (as a string) the key name of a font that you have defined in config.json. It returns (as an integer) the corresponding font-weight value. For a key arbitrarily named "headings-font" and defined as 700, it would return a value like this to Sass variables:

`$headings-‐font-‐weight: 700;`

Your Sass stylesheet may optionally call stencilFontWeight for each <span class="fn">config.json</span> font key whose weight value you want to provide to Sass variables. You would call the function in the following format:

`$headings-font-weight: stencilFontWeight("headings-font");`

---

<a href='#custom-sass-functions_stencilnumber' aria-hidden='true' class='block-anchor'  id='custom-sass-functions_stencilnumber'><i aria-hidden='true' class='linkify icon'></i></a>

## stencilNumber

`stencilNumber` accepts (as a string) a key name that you have defined in <span class="fn">config.json</span> as editable. It also accepts (also as a string) an _optional_ second parameter to define the unit. (This second parameter’s value defaults to `"px"`.) It returns the corresponding numeric value, postfixed with the defined unit.

You can use this function with arithmetical operators. For example, assume that your <span class="fn">config.json</span> contains a `"font-size"` value of `"3"`. The following statement would evaluate to `9rem`.

`stencilNumber("font-size", "rem") * 3`

---

<a href='#custom-sass-functions_stencilstring' aria-hidden='true' class='block-anchor'  id='custom-sass-functions_stencilstring'><i aria-hidden='true' class='linkify icon'></i></a>

## stencilString

`stencilString` accepts (as a string) a key name that you have defined in <span class="fn">config.json</span> as editable. It returns (also as a string) the key’s value. This function is used for purposes like defining font family names, or defining paths to images.

---

<a href='#custom-sass-functions_stencilimage' aria-hidden='true' class='block-anchor'  id='custom-sass-functions_stencilimage'><i aria-hidden='true' class='linkify icon'></i></a>

## stencilImage

`stencilImage` accepts (as a string) a key name for an image url that you have defined in <span class="fn">config.json</span>. It also accepts (as a string) the key name for the image size that you have defined in <span class="fn">config.json</span>. It returns the string value of the image URL and the size.

---

<a href='#custom-sass-functions_compiling-custom-sass-files' aria-hidden='true' class='block-anchor'  id='custom-sass-functions_compiling-custom-sass-files'><i aria-hidden='true' class='linkify icon'></i></a>

## Compiling Custom Sass Files

If you want to add your own custom Sass files, initiate auto-compilation of those files by including the associated tag in your HTML markup. Cornerstone's Sass file is named:

<span class="fp">/cornerstone/assets/scss/theme.scss</span>

To add a custom Sass file, place it at this path location, using an arbitrary filename prefix as shown:

<span class="fp">{theme-name}/assets/scss/{your-theme-or-file-name}.scss</span>

For example, to use the Foundation Sass framework, you might need:
	
<span class="fp">{theme-name}/assets/scss/main.scss</span>
<span class="fp">{theme-name}/assets/scss/widgets.scss</span>

Next, be sure the following tag is included within your <span class="fp">{theme-name}/templates/layout/base.html</span> file’s `<head>` tag, to compile your Sass to the specified object file:

`{{stylesheet '/assets/css/theme.css'}}`

While `stencil start` is running, it will recompile your custom Sass files to the specified <span class="fp">{theme-name}/assets/css/theme.css</span> file. (Note that this object file’s name is always the same, and is independent of your custom Sass files’ names.) For an additional example, please see [Replacing Content Blocks](https://developer.bigcommerce.com/stencil-docs/css-and-design-assets/page-composition-and-styling).

---

## Resources

### Related Articles
* [Page Composition & Styling](https://developer.bigcommerce.com/stencil-docs/css-and-design-assets/page-composition-and-styling)


