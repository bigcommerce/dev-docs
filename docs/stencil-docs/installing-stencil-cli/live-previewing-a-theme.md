# Live Previewing a Theme

<div class="otp" id="no-index">

### On This Page
- [Obtaining Store API Credentials](#obtaining-store-api-credentials)
- [Downloading a Theme](#downloading-a-theme)
- [Installing Theme Modules](#installing-theme-modules)
- [Serving Live Preview](#serving-live-preview)
- [Resources](#resources)

</div>

Once you've installed the Stencil CLI, the next steps are downloading a theme to edit and previewing live changes using Stencil CLI's powerful Browsersync functionality. This article walks you through the process of downloading a theme for development, installing theme modules, and serving a live preview using Stencil CLI's `stencil start` command. 

The steps in this article assume you've installed Stencil CLI on your system. If you haven't installed it yet, see [Installing Stencil CLI](https://developer.bigcommerce.com/stencil-docs/installing-stencil-cli/installing-stencil) for detailed, system-specific instructions.


## Obtaining Store API credentials

Stencil CLI uses various BigCommerce APIs to inject store-specific data, like carousel images and products, into the live theme preview it serves up. To do so, you must supply the Stencil CLI with a store API token. For detailed instructions, see [Store API Accounts](https://support.bigcommerce.com/s/article/Store-API-Accounts). 


To automatically create a store API account with the scopes and permissions required by Stencil CLI, select **Create Stencil-CLI Token** in the **Create API Accounts** dropdown:

![Create API Account](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/create-api-account.png "Create API Account")

The **Stencil-CLI Access Level** can then be set by selecting **local development only** or **publish theme**:

![Create Stencil-CLI Token](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/create-stencil-cli-token.png "Create Stencil-CLI Token")

* **local development only** - can read theme related store data, but can not publish
* **publish theme** - can read theme related store data and push themes to the live storefront

## Downloading a theme

To develop against BigCommerce's Cornerstone theme (which is the building block and starting point for rapidly developing themes for BigCommerce) clone [the repository](https://github.com/bigcommerce/cornerstone) from GitHub:

```shell
git clone https://github.com/bigcommerce/cornerstone.git
```

Cornerstone and other themes can also be downloaded from the BigCommerce control panel. For instructions on doing so, see [Downloading and Uploading Custom Themes](https://support.bigcommerce.com/s/article/Stencil-Themes#download-upload) (BigCommerce Knowledge Base).

It is also possible to download and develop against themes in the BigCommerce Themes Marketplace. To do so:
1. Navigate to **Storefront** > **Theme Marketplace**, and add the desired theme.
2. Once added, navigate to **Storefront** > **My Themes** > **Theme Thumbnail** > **Theme Options**.
3. Select the appropriate Download option.


**Download Options**:
* **Download current theme** - download the theme active on the storefront (appears when current theme is selected).
* **Download your latest customizations** - download the theme's most recently saved version (appears only for themes customized for this store).
* **Download theme file** - download the theme as it was originally uploaded to Theme Marketplace.

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">

<!-- theme: warning -->

### Theme Access, Copyright, and Distribution
> Developers may customize free and purchased marketplace themes; however, the original creator retains rights to the theme's design, which means derived themes may not be uploaded to a public theme marketplace (BigCommerce's or third-party) or sold privately.

</div>
</div>
</div>

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">

<!-- theme: warning -->

### Distribution of Cornerstone-Based Themes
> Distribution of Cornerstone-based themes is subject to BigCommerce's Cornerstone license, including the mandatory incorporation of BigCommerce's copyright statement.

### Back Up before Reinstalling
> If you're re-installing an existing theme, be sure to back up the theme’s `.stencil` file. This file contains the store URL, username, access tokens, and other settings. If you would like to allow for complete rollback, back up your entire theme’s directory.


</div>
</div>
</div>

## Installing theme modules

 
For theme versions `1.10.0+`, modules can be installed with `npm`:

```shell
# move into the theme dir
cd ~/path/to/theme/dir

# install modules using npm
npm install
```

This will install the `npm` modules required to properly leverage the Stencil event framework.

## Serving a live preview

Once Stencil CLI is installed and a theme is downloaded, a `.stencil` configuration file can be initialized for the theme and development can begin. 

Stencil CLI uses [Browsersync](https://github.com/bigcommerce/browser-sync) to serve up a live preview of a theme in development. When the preview is opened on multiple devices or browser windows, scroll, click, refresh and form actions are mirrored across the browser instances.

The Browsersync preview is launched by executing the `stencil start` command in a terminal window. When `stencil start` is executed, Stencil CLI checks for the required `.stencil` configuration file, which contains the following information:
* the store's URL
* an API access token
* a local port number

This configuration file is created by running `stencil init` and entering the information listed above (before doing so, be sure to [obtain store API credentials](#obtaining-store-api-credentials)). 


To initialize a new `.stencil` configuration file and start live preview, run the following commands in a terminal:

```shell
# move into the theme's directory
cd ~/path/to/theme/dir

# install theme modules (if you haven't already)
npm install

# create .stencil configuration file
stencil init --url https://yourstore.com/ --token 19d3ae6-dc15-4af9-bead-a2c703aa7b --port 3000

# serve a live preview of the theme:
stencil start
```

`stencil start` will output several URLs:

```shell
# ...
[Browsersync] Proxying: http://localhost:3001
[Browsersync] Access URLs:
 --
       Local: http://localhost:3000  # preview real-time changes on your local machine
    External: http://10.4.10.71:3000 # preview real-time changes across multiple devices
 --
          UI: http://localhost:3002
 UI External: http://10.4.10.71:3002
 --
[Browsersync] Watching files...
```

Browse to the local URL to preview the theme and see changes updated in real-time. To preview the theme on multiple devices simultaneously, browse to the external URL on the desired devices. As you navigate through the site, Stencil CLI will use store API token supplied to make API calls to BigCommerce's API and populate the theme preview with live store data in order to mimic production as closely as possible. 

For a full list of Stencil CLI commands, see [Stencil CLI Options and Commands](https://developer.bigcommerce.com/stencil-docs/installing-stencil-cli/stencil-cli-options-and-commands). For help troubleshooting errors or installation issues, see [Troubleshooting Your Setup](https://developer.bigcommerce.com/stencil-docs/installing-stencil-cli/troubleshooting-your-setup).

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">

<!-- theme: warning -->

### BitBucket Re-Authentication
> If you receive error messages about resolving BitBucket as an SSH host when running `stencil init`, enter the BitBucket password used to set up the BitBucket SSH Keys when prompted.

</div>
</div>
</div>

## Resources

### Additional Resources
* [Demonstration of Stencil Installation and Launch](https://www.youtube.com/watch/iWBrJalyM0A) (Youtube)
* [Stencil CLI GitHub Repo](https://github.com/bigcommerce/stencil-cli)
