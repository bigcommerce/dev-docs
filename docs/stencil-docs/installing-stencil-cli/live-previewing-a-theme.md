# Live Previewing a Theme

Once you've installed the Stencil CLI, the next steps are downloading a theme to edit and previewing live changes using Stencil CLI's powerful Browsersync functionality. This article walks you through the process of downloading a theme for development, installing theme modules, and serving a live preview using Stencil CLI's `stencil start` command.

The steps in this article assume you've installed Stencil CLI on your system. If you haven't installed it yet, see [Installing Stencil CLI](/stencil-docs/installing-stencil-cli/installing-stencil) for detailed, system-specific instructions.

<!-- theme: warning -->
> #### Theme access, copyright, and distribution
> Developers may customize free and purchased marketplace themes; however, the original creator retains rights to the theme's design, which means derived themes may not be uploaded to a public theme marketplace (BigCommerce's or third-party) or sold privately.

## Obtaining store API credentials

Stencil CLI uses various BigCommerce APIs to inject store-specific data, like carousel images and products, into the live theme preview it serves up. To do so, you must supply the Stencil CLI with a Stencil CLI token. For detailed instructions, see [Store API Accounts](https://support.bigcommerce.com/s/article/Store-API-Accounts).

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

<!-- theme: warning -->
> #### Distribution of Cornerstone-based themes
> Distribution of Cornerstone-based themes is subject to BigCommerce's Cornerstone license, including the mandatory incorporation of BigCommerce's copyright statement.

Cornerstone and other themes can also be downloaded from the BigCommerce control panel. For instructions on doing so, see [Downloading and Uploading Custom Themes](https://support.bigcommerce.com/s/article/Stencil-Themes#download-upload) (BigCommerce Knowledge Base). 

<!-- theme: info -->
> #### Update themes after download  
> Downloading a theme does not include the current configuration of a theme. Run a [stencil pull](/stencil-docs/installing-stencil-cli/stencil-cli-options-and-commands#stencil-pull) command to obtain the theme's most recently saved version (appears only for themes customized for this store).
&nbsp;

## Installing theme modules

<!-- theme: warning -->
> #### Back up before reinstalling
> If you're re-installing an existing theme, be sure to back up the theme’s `.stencil` file or `secrets.stencil.json` and `config.stencil.json` files (if using Stencil V3.1 release or later). The files contain the store URL, username, access tokens, and other settings. If you would like to allow for complete rollback, back up your entire theme’s directory.

For theme versions `1.10.0+`, modules can be installed with `npm`:

```shell
# move into the theme dir
cd ~/path/to/theme/dir

# install modules using npm
npm install
```

This will install the `npm` modules required to properly leverage the Stencil event framework.

## Serving a live preview

Once Stencil CLI is installed and a theme is downloaded, a `.stencil` or `config.stencil.json` configuration file (if using Stencil V3.1 release or later) can be initialized for the theme and development can begin.

Stencil CLI uses [Browsersync](https://github.com/bigcommerce/browser-sync) to serve up a live preview of a theme in development. When the preview is opened on multiple devices or browser windows, scroll, click, refresh and form actions are mirrored across the browser instances.

The Browsersync preview is launched by executing the `stencil start` command in a terminal window. When `stencil start` is executed, Stencil CLI checks for the required `.stencil` configuration file or `secrets.stencil.json` and `config.stencil.json` configuration files (if using Stencil V3.1 release or later), which contains the following information:
* the store's URL
* an API access token
* a local port number

<!-- theme: info -->
> #### Note
> The store's URL should be a vanity URL.

This configuration file is created by running `stencil init` and entering the information listed above. Before doing so, be sure to [obtain store API credentials](#obtaining-store-api-credentials).

To initialize a new `.stencil` or `config.stencil.json` configuration file (if using Stencil V3.1 release or later) and start live preview, run the following commands in a terminal:

```shell
# move into the theme's directory
cd ~/path/to/theme/dir

# install theme modules (if you haven't already)
npm install

# create `.stencil` or `config.stencil.json` configuration file (if using Stencil V3.1 release or later)
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

Browse to the local URL to preview the theme and see changes updated in real-time. To preview the theme on multiple devices simultaneously, browse to the external URL on the desired devices. As you navigate through the site, Stencil CLI will use the store API token supplied to make API calls to BigCommerce's API and populate the theme preview with live store data in order to mimic production as closely as possible.

### Serving a live preview over HTTPS 

It is possible to serve a live preview over HTTPS using [ngrok](https://ngrok.com/docs). To get started with ngrok, follow the [Create an HTTPS Tunnel](https://developer.bigcommerce.com/docs/ZG9jOjE4MjIyODMy-step-2-connect-your-app-to-big-commerce#create-an-https-tunnel) section of the sample app tutorial. If your app does not run on port 3000, replace 3000 with the port of your app server.

## Debugging your theme

<!-- theme: info -->
> #### BitBucket re-authentication
> If you receive error messages about resolving BitBucket as an SSH host when running `stencil init`, enter the BitBucket password used to set up the BitBucket SSH Keys when prompted.

The Stencil framework provides built-in debugging tools to aid in your custom front-end development. To see what data is available on the page you are working on, add the debug query string to your store's localhost URL. For example, `http://localhost:3000/product/sample-product?debug=context`. This string will return a list of all the objects on the page in JSON syntax. If you want to view the available JSON objects and rendered page simultaneously, change the debug value to `bar`. For example, `http://localhost:3000/product/sample-product?debug=bar`.

For a full list of Stencil CLI commands, see [Stencil CLI Options and Commands](/stencil-docs/installing-stencil-cli/stencil-cli-options-and-commands). For help troubleshooting errors or installation issues, see [Troubleshooting Your Setup](/stencil-docs/installing-stencil-cli/troubleshooting-your-setup).



## Resources

### Additional resources
* [Demonstration of Stencil Installation and Launch](//youtube.com/watch/iWBrJalyM0A) (YouTube)
* [Stencil CLI GitHub Repo](https://github.com/bigcommerce/stencil-cli)
