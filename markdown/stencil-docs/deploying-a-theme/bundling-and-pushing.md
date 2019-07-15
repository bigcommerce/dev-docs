<h1>Bundling and Pushing a Theme</h1>

<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
		<li><a href="#bundling_confirm-dependencies">Confirm Dependencies</a></li>
    <li><a href="#bundling_verify-directory">Verify Directory and File Permissions</a></li>
    <li><a href="#bundling_add-recaptcha-v2">Add reCAPTCHA v2</a></li>    
    <li><a href="#bundling_bundling-your-theme">Bundling Your Theme</a></li>
    <li><a href="#bundling_uploading-your-theme">Uploading Your Theme</a></li>
    <li><a href="#bundling_other-bundling">Other Bundling or Upload Errors</a></li>
	</ul>
</div>










<a href='#bundling_confirm-dependencies' aria-hidden='true' class='block-anchor'  id='bundling_confirm-dependencies'><i aria-hidden='true' class='linkify icon'></i></a>

## Confirm Dependencies

If you have customized a theme originally downloaded from the BigCommerce Theme Marketplace: Before you package your theme, make sure your theme directory includes all the dependencies that BigCommerce requires for submission. 

Follow the link for your scenario:

If you downloaded a refreshed version of Stencil's default Cornerstone theme: Run `npm install` in the theme directory to install refreshed JavaScript dependencies, as outlined in [Installing Stencil](/stencil-docs/getting-started/installing-stencil#installing_installing-stencils-js-utilities).

If you downloaded a different Marketplace theme, and its [version was lower than 1.10.0]():
You must also run `jspm install` in the theme directory.

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">
    
<!-- theme: warning -->

### No Automatic Check for Dependencies
> The `stencil bundle` and `stencil push` commands do not check for the dependencies that these build systems install. So if those dependencies are missing, these commands will not immediately report errors. However, your resulting .zip file will not properly upload to BigCommerce, and will not run properly on a storefront.

</div>
</div>
</div>

---

<a href='##bundling_add-recaptcha-v2' aria-hidden='true' class='block-anchor'  id='#bundling_add-recaptcha-v2'><i aria-hidden='true' class='linkify icon'></i></a>

## Add reCAPTCHA V2

reCAPTCHA v1 was deprecated as of March 31, 2018. To deter spam submission through storefront forms, BigCommerce now supports Google reCAPTCHA v2 challenges, to distinguish human customers/visitors from automated bots. We recommend that all storefront themes take advantage of this upgraded bot detection.

If you have based your theme on a theme/version that already incorporates reCAPTCHA v2, you do not need to take any further action. Compliant themes/versions currently are listed in [Updating Themes with reCAPTCHA V2](https://support.bigcommerce.com/s/article/Updating-Themes-with-reCAPTCHA-v2#updatingthemes) (Knowledge Base).

### How to Upgrade

To add reCAPTCHA v2 support to a theme, you will need to update script references in three template files:

* [Create-Account Template](https://github.com/bigcommerce/cornerstone/pull/951/files#diff-ecbae6e2b7d5bbf5c950d68878e79d99)
* [Write-Review Template](https://github.com/bigcommerce/cornerstone/pull/951/files#diff-945a5d7f1563068188ae39df568cfd43)
* [Contact-Us Template](https://github.com/bigcommerce/cornerstone/pull/951/files#diff-5351402159301e1c225752f03d9f1f8e)

See [PR #951](https://github.com/bigcommerce/cornerstone/pull/951/files) in the Cornerstone Github Repository to see differentials for each file that needs to be modified.

---

<a href='#bundling_verify-directory' aria-hidden='true' class='block-anchor'  id='bundling_verify-directory'><i aria-hidden='true' class='linkify icon'></i></a>

## Verify Directory and File Permissions

If you have added any new subdirectories or files to your base theme, verify that you have:

* Set newly added directories to permission `755` (`drwxr-xr-x`).
* Set newly added files to permission `644` (`rw-r--r--`).

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">
    
<!-- theme: warning -->

### Writable Permissions Are Required
> Without these writable permissions, bundling your theme will fail, blocking its upload to BigCommerce.

</div>
</div>
</div>

---

<a href='#bundling_bundling-your-theme' aria-hidden='true' class='block-anchor'  id='bundling_bundling-your-theme'><i aria-hidden='true' class='linkify icon'></i></a>

## Bundling Your Theme

Once you have verified the requirements above, you are ready to process and package your theme for upload to BigCommerce. Stencil CLI provides two options for creating a `.zip` file that contains all of your theme's essentials, while excluding redundant components. The options are either only bundling your theme, or bundling and pushing your theme. These options are available depending on how you've [authorized](/stencil-docs/getting-started/launching-stencil/authorizing-and-initializing) your theme:

### Bundle Only 

The `stencil bundle` command is available for all themes, whether they were initialized using OAuth or Basic-Auth tokens. To use it, just enter the following on your command line:

`stencil bundle`

The `bundle` command will notify you of its progress and completion.


####  Check/Adjust Zipfile's Size

Check the resulting `.zip` file's size before you proceed. The zipped bundle should be only a few megabytes. BigCommerce imposes a hard limit of 50 MB, and any file size approaching that is problematic. If your `.zip` file fits comfortably within the size limit above, jump directly to [Uploading Your Theme](bundling_uploading-your-theme). However, if your `.zip` file approaches or exceeds 50 MB, you must first use one of these procedures to restructure your theme to a size that's manageable for upload to BigCommerce:

* [Shrinking Your Theme by Excluding Static Assets (WebDAV)]()
* [Staging a Theme for CDN Delivery]()


### Bundle and Push 

The `stencil push` command is available only for themes that you have successfully initialized using an OAuth token (with `Themes:modify scope`). This command bundles your theme and uploads it to the associated store, in one continuous process.

For further requirements and usage details, please see the _Command-Line Upload_ in [Uploading Your Theme](bundling_uploading-your-theme) below.

For file-size error diagnostics and workarounds, please _Check/Adjust Zipfile's Size_ above.

### Software Requirements / Resolving Lint Errors

* Only use the `stencil bundle` or the `stencil push` command to process and package themes for submission. These commands generate `.zip` files that match BigCommerce's expected structure. They also generate metadata required for your theme to function properly.

* Do not create `.zip` files using general-purpose archiving software. The resulting files will trigger errors upon upload to BigCommerce.

* Do not open a bundled theme `.zip` file to add, delete, rename, or update files. Doing so will make your theme unusable on the production store.

* If bundling your theme triggers multiple lint errors related to the `bundle.js` file, then your theme is missing the `.eslintignore` file. Please retrieve this file from the [Stencil Cornerstone repo](https://github.com/bigcommerce/cornerstone/blob/master/.eslintignore), then re-run `stencil bundle` or `stencil push`.


---

<a href='#bundling_uploading-your-theme' aria-hidden='true' class='block-anchor'  id='bundling_uploading-your-theme'><i aria-hidden='true' class='linkify icon'></i></a>

## Pushing Your Theme

BigCommerce provides two alternatives for uploading a theme to its associated BigCommerce store. You can perform either a Control Panel Upload, or a Command Line Upload. These options are available depending on how you've authorized your theme:

### Control-Panel Upload (OAuth or Basic Auth)

Uploading your theme via the BigCommerce control panel's GUI is compatible with any store token (whether OAuth or Basic-Auth), and with any OAuth token scope, and with all versions of Stencil CLI. However, this option requires that you first use stencil bundle to package your theme into a .zip file. (Prepare your file according to Bundle Only above.)

For the upload steps in the control panel, see the [Uploading Custom Themes]() article in our Knowledge Base. 

For error codes that you might encounter when uploading a theme – and corresponding workarounds, see [Troubleshooting Theme Uploads]().

### Command-Line Upload (OAuth Required)

The stencil push command allows you to both bundle your theme and upload it to the store, with a single terminal command. To run stencil push, you must first:

Successfully initialize your theme using an OAuth token that was created with the Themes:modify scope.
Install Stencil CLI version 1.12.0 or higher.

To check your current Stencil CLI version, enter `stencil --version` or `stencil -V` on the command line. If you need to update an earlier version, reinstall Stencil CLI.

### Pushing a Theme 

To initiate bundling and pushing, enter the following on the command line:

`stencil push`

Stencil CLI is designed to display the same notifications, prompts, and selection options that you would receive when using the control panel's GUI. Below are some of the notifications and interactions you might see.

### Successful Bundling

Stencil CLI will display `ok` confirmations, or `not ok` errors, or `warnings` for individual substeps in bundling and uploading your theme. If bundling is successful, you will next see a `Processing` progress bar to track the upload.

<!--
    title: 
    data: //s3.amazonaws.com/user-content.stoplight.io/6116/1539055887301
-->

![](//s3.amazonaws.com/user-content.stoplight.io/6116/1539055887301 "")

### Successful Upload

Upon a successful upload, you will be prompted: `Would you like to apply your theme to your store at <storehash>? (y/N)` Any response except `y` or `Y` will be processed as "No." You can always apply the theme later through the control panel.

### Apply Which Variation?

If you chose to apply the newly uploaded theme, you will be prompted: `Which variation would you like to apply? (Use arrow keys)`

<!--
    title: 
    data: //s3.amazonaws.com/user-content.stoplight.io/6116/1539055910721
-->

![](//s3.amazonaws.com/user-content.stoplight.io/6116/1539055910721 "")

Use your arrow keys to move the selection caret/highlight to the variation you want, and then press `Enter`.

Stencil CLI will then confirm which variation is active on the storefront.

<!--
    title: 
    data: //s3.amazonaws.com/user-content.stoplight.io/6116/1539055915081
-->

![](//s3.amazonaws.com/user-content.stoplight.io/6116/1539055915081 "")

---

<a href='#bunding_theme-quota' aria-hidden='true' class='block-anchor'  id='bunding_theme-quota'><i aria-hidden='true' class='linkify icon'></i></a>

## Theme Quota Warning

If you run `stencil push` when your store's `My Themes` section has reached its [maximum of 20 themes](), you will be prompted to select at least one existing theme for deletion.



<!--
    title: 
    data: //s3.amazonaws.com/user-content.stoplight.io/6116/1539055988142
-->

![](//s3.amazonaws.com/user-content.stoplight.io/6116/1539055988142 "")

Custom themes – which are available for selection – will have a circle to their left. Marketplace themes and the store's active theme – all of which are protected from deletion – will be flagged `(Disabled)`.

Use your arrow keys to move the selection caret to each theme/version that you want to select. Then press the spacebar to select it. (Filled circles will indicate your selected themes/versions.)

If you are certain of your selections, you can next press `Enter` to delete the themes.



<div class="HubBlock--callout">
<div class="CalloutBlock--error">
<div class="HubBlock-content">
    
<!-- theme: error -->

###  Select Carefully – No Confirmation
> Once you press `Enter`, the selected themes will be deleted immediately, with no further confirmation.

If you have any doubts – especially about deleting multiple themes/versions – it is safest to delete them through the control panel GUI. This GUI allows you to compare uploaded versions, and to inspect their metadata.

</div>
</div>
</div>

---

<a href='#bundling_other-bundling' aria-hidden='true' class='block-anchor'  id='bundling_other-bundling'><i aria-hidden='true' class='linkify icon'></i></a>

## Other Bundling or Upload Errors

For any other `not ok` bundling or upload errors that you receive, please refer to these debugging guidelines Theme setup and sizing diagnostics in preceding sections throughout this page, or the following article titled [Troubleshooting Theme Uploads](/stencil-docs/prepare-and-upload-a-theme/troubleshooting-theme-uploads).

