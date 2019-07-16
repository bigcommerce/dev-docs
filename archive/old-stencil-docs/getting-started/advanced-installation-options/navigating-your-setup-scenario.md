<h1>Navigating Your Setup Scenario</h1>
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#navigating_illustration">Illustration of Stencil's Setup Options</a></li>
    <li><a href="#navigating_initial">Intial Cornerstone Setup</a></li>
    <li><a href="#navigating_download-and-install">Download and Install a New Version of Cornerstone</a></li>
    <li><a href="#navigating_download-marketplace">Download a Marketplace Theme</a></li>
    <li><a href="#navigating_implementing-custom-build">Implementing a Custom Build System</a></li>
    <li><a href="#navigating_blueprint-store">Blueprint Store Launched Before January 26th, 2016</a></li>
	</ul>
</div>

<div class="HubBlock--callout">
<div class="CalloutBlock--success">
<div class="HubBlock-content">
    
<!-- theme: success -->

### Notes on Dependencies
> Our installation instructions have been tested on Mac OS X Yosemite, Linux/Ubuntu v.14.04.4, and Windows. Dependencies for other platforms/releases will be added upon further testing.


</div>
</div>
</div>

<a href='#navigating_illustration' aria-hidden='true' class='block-anchor'  id='navigating_illustration'><i aria-hidden='true' class='linkify icon'></i></a>

## Illustration of Stencil's Setup Options

The diagram below visually illustrates _all_ currently supported workflows for setting up a Stencil theme. You will choose one pathway to setup Stencil for your store. The color codes for each setup scenario are as follows: 

* [Black arrows: Initial setup with the default Cornerstone theme.](#navigating_initial)

* [Orange arrows: Refresh Cornerstone from Theme Marketplace.](#navigating_cornerstone-refresh)

* [Purple arrows: Customize a theme (_other than_ Cornerstone) downloaded from Theme Marketplace.](#navigating_download-marketplace)

* [Green arrows: Configure a custom JavaScript build system](#navigating_implementing-custom-build).

* [Blue arrows: Adds onto any of the preceding four scenarios. If developing for a BigCommerce Blueprint production store launched before Jan. 26, 2016, you must add one extra step to enable Stencil in the store's control panel.](#navigating_blueprint-store)

<!--
    title: 
    data: //s3.amazonaws.com/user-content.stoplight.io/6116/1538540242143
-->

![](//s3.amazonaws.com/user-content.stoplight.io/6116/1538540242143 "")

<div class="HubBlock--callout">
<div class="CalloutBlock--">
<div class="HubBlock-content">
    
<!-- theme:  -->

### Detailed Steps Described Below
> Continue reading to get a detailed description and breakdown of the steps required for each setup scenario.

</div>
</div>
</div>

<a href='#navigating_initial' aria-hidden='true' class='block-anchor'  id='navigating_initial'><i aria-hidden='true' class='linkify icon'></i></a>

## Initial Cornerstone Setup 

This is the workflow to start developing based on BigCommerce's default Cornerstone theme. This workflow uses Webpack as the JavaScript build system. Steps required:

* [Install your necessary prerequisites](/stencil-docs/getting-started/installing-stencil#installing_prerequisites)
* [Install Stencil CLI](/stencil-docs/getting-started/installing-stencil#installing_installing-the-stencil-cli)
* [Clone the Cornerstone theme using Github](/stencil-docs/getting-started/installing-stencil#installing_cloning-cornerstone)
* [Install JavaScript Utilities](/stencil-docs/getting-started/installing-stencil#installing_installing-stencils-js-utilities)
* [Create an API Account to prepare store and tokens](/stencil-docs/getting-started/authentication-and-tokens#authentication_creating-an-api-account)


Once you have completed these steps, proceed to the _Launching Stencil_ section.

---

<a href='#navigating_download-and-install' aria-hidden='true' class='block-anchor'  id='navigating_download-and-install'><i aria-hidden='true' class='linkify icon'></i></a>

## Download and Install a New Version of Cornerstone 

If you would like to download and install a **new** version of Cornerstone from BigCommerce's Theme Marketplace, perform the following steps:

* Ensure all necessary prerequisites are installed
* [Ensure Stencil CLI is installed](/stencil-docs/getting-started/installing-stencil#installing_installing-the-stencil-cli)
* [Download a new Cornerstone .zip file](/stencil-docs/getting-started/advanced-installation-options/downloading-the-cornerstone-theme#downloading_downloading-cornerstone-zip)
* [Reinstall JavaScript Utilities](/stencil-docs/getting-started/installing-stencil#installing_installing-stencils-js-utilities)
* Repeat steps in _Launching Stencil_

---

<a href='#navigating_download-marketplace' aria-hidden='true' class='block-anchor'  id='navigating_download-marketplace'><i aria-hidden='true' class='linkify icon'></i></a>

## Download a Marketplace Theme 

If you would like to customize a theme _other than_ Cornerstone, follow the required steps to download a theme from BigCommerce's Theme Marketplace. This workflow requires BitBucket. Some earlier theme versions will also require additional steps for the jspm JavaScript build system. Steps required:

* [Install all necessary prerequisites](/stencil-docs/getting-started/installing-stencil#installing_prerequisites)
* [Install Stencil CLI](/stencil-docs/getting-started/installing-stencil#installing_installing-the-stencil-cli)
* [Set up BitBucket and Download the Marketplace theme's .zip file](/stencil-docs/getting-started/advanced-installation-options/downloading-a-marketplace-theme#downloading_setting-up-bitbucket)
* [Install JavaScript Utilities within the Marketplace Theme](/stencil-docs/getting-started/installing-stencil#installing_installing-stencils-js-utilities)
* [Create an API Account to Prepare Your Store and Tokens](/stencil-docs/getting-started/authentication-and-tokens#authentication_creating-an-api-account)
* Complete the steps outlined in _Launching Stencil_

---

<a href='#navigating_implementing-custom-build' aria-hidden='true' class='block-anchor'  id='navigating_implementing-custom-build'><i aria-hidden='true' class='linkify icon'></i></a>

## Implement a Custom JavaScript Build System 

The Stencil framework currently uses Webpack 4 as its default Javascript Build system (jspm for older versions), but if you prefer, you can substitute this for a custom JavaScript build system such as Grunt. Steps recommended:

* [Install all necessary prerequisites](/stencil-docs/getting-started/installing-stencil#installing_prerequisites)
* [Install Stencil CLI](/stencil-docs/getting-started/installing-stencil#installing_installing-the-stencil-cli)
* [Clone the Cornerstone theme using Github](/stencil-docs/getting-started/installing-stencil#installing_cloning-cornerstone)
* [Install JavaScript Utilities](/stencil-docs/getting-started/installing-stencil#installing_installing-stencils-js-utilities)
* [Configure your custom build system](/stencil-docs/getting-started/advanced-installation-options/configuring-webpack-or-custom-build)
* [Create an API Account to Prepare Your Store and Tokens](/stencil-docs/getting-started/authentication-and-tokens)
* Proceed to _Launching Stencil_

---

<a href='#navigating_blueprint-store' aria-hidden='true' class='block-anchor'  id='navigating_blueprint-store'><i aria-hidden='true' class='linkify icon'></i></a>

## Blueprint Store Launched before January 26th, 2016

If your store is **both**:
* running on a Blueprint theme
* was launched before Jan. 26th, 2016 

and you would like to enable Stencil development on it, you must perform the following steps:

* Follow the installation path above that corresponds to your development scenario
* Enable Stencil in the store’s control panel

---

## Resources
### Related Articles
* [Downloading a Marketplace Theme from the BigCommerce Control Panel](https://developer.bigcommerce.com/stencil-docs/getting-started/advanced-installation-options/downloading-a-marketplace-theme)
* [Configuring Webpack or a Custom Build System](https://developer.bigcommerce.com/stencil-docs/getting-started/advanced-installation-options/configuring-webpack-or-custom-build)
* [Installing Stencil](https://developer.bigcommerce.com/stencil-docs/getting-started/installing-stencil)
* [Creating an API Account to Obtain OAuth Tokens](https://developer.bigcommerce.com/stencil-docs/getting-started/authentication-and-tokens)
* [Downloading the Cornerstone Theme from the BigCommerce Control Panel](https://developer.bigcommerce.com/stencil-docs/getting-started/advanced-installation-options/downloading-the-cornerstone-theme)


