<h1>Layouts, Utilities, and Settings Directories</h1>
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#layouts-utilities-settings_the-layouts-directory">Layouts Directory</a></li>
    <li><a href="#layouts-utilities-settings_the-utilities-directory">Utilities Directory</a></li>
    <li><a href="#layouts-utilities-settings_the-settings-directory">Settings Directory</a></li>
	</ul>
</div>

<a href='#layouts-utilities-settings_the-layouts-directory' aria-hidden='true' class='block-anchor'  id='layouts-utilities-settings_the-layouts-directory'></a>

## Layouts Directory

The <span class="fp">{theme-name}/assets/scss/layouts/</span> subdirectory contains .scss files that provide default styling for major layout components of theme pages. You can see the <span class="fp">/layouts/</span> subdirectory's internal structure on the [Cornerstone Github Repository](https://github.com/bigcommerce/cornerstone/tree/master/assets/scss/layouts)



<a href='#layouts-utilities-settings_the-utilities-directory' aria-hidden='true' class='block-anchor'  id='layouts-utilities-settings_the-utilities-directory'></a>

## Utilities Directory

The <span class="fp">{theme-name}/assets/scss/utilities</span> subdirectory contains mixins and tools, beyond the Citadel library, that help create UI’s. You can apply these CSS snippets to your HTML for quick prototyping when you need a unique, yet repeatable, style.

Every utility in this subdirectory will have both a class and a mixin. For example, consider the utility `truncatedText:` You can use it by applying the class `.u-truncatedText`, or by applying the mixin @include u-truncatedText;.



<a href='#layouts-utilities-settings_the-settings-directory' aria-hidden='true' class='block-anchor'  id='layouts-utilities-settings_the-settings-directory'></a>

## Settings Directory

The <span class="fp">{theme-name}/assets/scss/settings/</span> subdirectory contains SCSS variables for your framework. Files here map directly to components. If present, these variables override defaults in consumed libraries. The <span class="fp">/settings/</span> subdirectory's internal structure can be viewed at the [Cornerstone Github Repository](https://github.com/bigcommerce/cornerstone/tree/master/assets/scss/settings) 
	
The nested subdirectory for your chosen framework contains a file that includes that framework’s variables. For example, in the default Stencil theme, this file is: <span class="fp">/settings/foundation/_foundation.scss</span>.

Within each subdirectory nested at the ultimate level is one primary file, <span class="fn">_settings.scss</span>, that imports all other variables that have been broken into logical files, such as <span class="fn">_colors.scss</span>, <span class="fn">_typography.scss</span>, and <span class="fn">_z-index.scss</span>.
	
### Sass Stylesheet Support for Theme Fonts
	
To support Theme Editor, your theme's Sass stylesheet must call Stencil's custom Sass functions to transform fonts specified in the theme's <span class="fn">config.json</span> file. You must call these functions on each <span class="fn">config.json</span> font key whose value you want to make available to Sass variables.

The default Stencil theme includes these function calls in this stylesheet:
<span class="fp">{theme-name}/assets/scss/settings/foundation/type/_settings.scss</span>. However, if your theme relies on a Sass framework other than Foundation, the relevant stylesheet will be a different .scss file name within <span class="fp">{theme-name}/assets/scss/</span>.

	
### How to Enable Fonts for Theme Editor

Assume that your theme's <span class="fn">config.json</span> contains the following key name and value (the details of both are arbitrary, but the key name must end in `-font`, and the value must follow a defined format):
	
`"headings-font": "Google_Open+Sans_700"`
	
In your Sass stylesheet, you would call the stencilFontFamily and stencilFontWeight custom Sass functions on the corresponding <span class="fn">config.json</span> key name:
	
```
$body-font-family: stencilFontFamily("body-font");
$body-font-weight: stencilFontWeight("body-font");
```

These functions would extract the corresponding <span class="fn">config.json</span> values as:

```
$body-font-family: 'Open Sans';
$body-font-weight: 700;
```
	
This transformation allows you to use the `$body-font-family` and `$body-font-weight` variables wherever needed in your theme. If a merchant uses Theme Editor to select a different font family and/or weight, the variables will propagate the change throughout your theme.




## Resources

### Sample Apps
* [Cornerstone Github Repository Layouts](https://github.com/bigcommerce/cornerstone/tree/master/assets/scss/layouts) (BigCommerce GitHub)
* [Cornerstone Github Repository Settings](https://github.com/bigcommerce/cornerstone/tree/master/assets/scss/settings) (BigCommerce GitHub)
* [Cornerstone Github Repository Utilities](https://github.com/bigcommerce/cornerstone/tree/master/assets/scss/utilities) (BigCommerce GitHub)


