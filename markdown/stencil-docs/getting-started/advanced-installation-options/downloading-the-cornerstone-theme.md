<h1>Downloading the Cornerstone Theme from the BigCommerce Control Panel</h1>
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#downloading_backup-before-reinstalling">Back Up Before Reinstalling</a></li>
    <li><a href="#downloading_downloading-cornerstone-zip">Downloading the Cornerstone .zip file</a></li>
    <li><a href="#downloading_reinstalling-dependencies">Reinstalling Dependencies and Relaunching</a></li>
    <li><a href="#downloading_next-steps">Next Steps</a></li>
	</ul>
</div>

<a href='#downloading_backup-before-reinstalling"' aria-hidden='true' class='block-anchor'  id='downloading_backup-before-reinstalling"'><i aria-hidden='true' class='linkify icon'></i></a>

## Back Up Before Reinstalling
If you are reinstalling over a base theme on which you have already begun development, first back up at least your theme's .stencil file. This file contains your store URL, your BigCommerce username and access tokens, and other basic settings. Preserving those settings will speed up initializing and launching the new version. To allow complete rollback, back up your whole theme directory. (In a current default installation, this directory is named `cornerstone`. Prior to March 2017, this directory's name defaulted to `stencil`).

<div class="HubBlock--callout">
<div class="CalloutBlock--error">
<div class="HubBlock-content">
    
<!-- theme: error -->

### Back Up Your Themes
> Remember to back up your .stencil file to speed up launching a new version of the theme.

</div>
</div>
</div>

---

<a href='##downloading_downloading-cornerstone-zip' aria-hidden='true' class='block-anchor'  id='#downloading_downloading-cornerstone-zip'><i aria-hidden='true' class='linkify icon'></i></a>

## Downloading the Cornerstone .zip file from the Control Panel

### Prerequisites
* If you have not yet added Cornerstone to your store, navigate to `Storefront` > `Themes Marketplace` and add the Cornerstone theme to your store.

The steps below are required only if you are downloading a clean copy of Stencil's default Cornerstone theme, specifically from the BigCommerce Theme Marketplace. If you are downloading a Marketplace theme other than Cornerstone for customization, you must follow the workflow outlined in [Downloading a Marketplace Theme](https://developer.bigcommerce.com/stencil-docs/getting-started/advanced-installation-options/downloading-a-marketplace-theme).


1. Go to `Storefront` > `My Themes`.
2. Click the Cornerstone theme's thumbnail:
	* If Cornerstone is the store's currently active theme, click its image thumbnail at the top of the page, under the `Current Theme` heading.
	* If Cornerstone is _not_ the current theme, scroll down below the lower My Themes subheading, find, and click the Cornerstone thumbnail.

The Cornerstone theme's description should zoom to full-page and display a Theme Options drop-down list at the upper right.

3. From the `Theme Options` drop-down list, select `Download theme file` to download this Cornerstone release as it was refreshed on Theme Marketplace. 
4. Unpack the zipped theme to a working directory. This can either be the directory where you have been developing your theme or a new directory.

---

<a href='##downloading_reinstalling-dependencies' aria-hidden='true' class='block-anchor'  id='#downloading_reinstalling-dependencies'><i aria-hidden='true' class='linkify icon'></i></a>

## Reinstalling Dependencies and Relaunching

* Ensure that your theme includes all current dependencies by repeating the [Stencil Utils installation.](https://developer.bigcommerce.com/stencil-docs/getting-started/installing-stencil#installing_installing-stencils-js-utilities) 

* To relaunch, repeat the steps listed in the _Launching Stencil_ section.


---

<a href='##downloading_next-steps' aria-hidden='true' class='block-anchor'  id='#downloading_next-steps'><i aria-hidden='true' class='linkify icon'></i></a>

## Next Steps

When you are ready to upload your custom theme to a store, follow the instructions in [Bundling and Uploading a Theme](https://developer.bigcommerce.com/stencil-docs/prepare-and-upload-a-theme/bundling-and-uploading).

<div class="HubBlock--callout">
<div class="CalloutBlock--error">
<div class="HubBlock-content">
    
<!-- theme: error -->

### Distribution of Cornerstone-based Themes
> Distribution of Cornerstone-based themes is subject to BigCommerce's Cornerstone license, including the mandatory incorporation of BigCommerce's copyright statement.

</div>
</div>
</div>

---

## Resources
### Related Articles
* [Downloading a Marketplace Theme from the BigCommerce Control Panel](https://developer.bigcommerce.com/stencil-docs/getting-started/advanced-installation-options/downloading-a-marketplace-theme)
* [Bundling and Uploading a Theme
](https://developer.bigcommerce.com/stencil-docs/prepare-and-upload-a-theme/bundling-and-uploading)
* [Installing Stencil](https://developer.bigcommerce.com/stencil-docs/getting-started/installing-stencil)

