<h1>Installing Stencil CLI</h1>
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#authorizing_prerequisites">Installing on Mac</a></li>
    <li><a href="#authorizing_prerequisites2">Installing on Windows</a></li>
    <li><a href="#authorizing_prerequisites3">Installing on Linux</a></li>
    <li><a href="#authorizing_download">Downloading Cornerstone</a></li>
    <li><a href="#authorizing_download2">Downloading a Marketplace theme</a></li>
    <li><a href="#authorizing_initialize">Live Previewing a Theme</a></li>
	</ul>
</div>

Stencil CLI allows developers to locally edit themes with no impact to a merchant’s live storefront. Additionally, developers have access to a real-time Browsersync preview and testing across desktop, mobile, and tablet devices. Once work is complete, a theme can be pushed to the storefront and set live using Stencil CLI's simple commands. 

This article contains detailed instructions on installing, configuring, and using Stencil CLI for theme development.

---

<a href='#authorizing_prerequisites' aria-hidden='true' class='block-anchor'  id='authorizing_prerequisites'><i aria-hidden='true' class='linkify icon'></i></a>

## Installing on Mac

**Required Dependencies**:
1. [Xcode](https://developer.apple.com/xcode/)
2. [Node.js 8.16](https://nodejs.org/en/download/releases/)
3. [nvm 0.31.0](https://github.com/creationix/nvm/tree/v0.31.0)

To install Stencil CLI and it's dependencies, run the following commands: 

```shell
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash

nvm install 8.16

npm install -g @bigcommerce/stencil-cli
```

These instructions have been tested on Mac OS X Yosemite.

---

## Installing on Windows

**Required Dependencies:**
* [git](https://git-scm.com/downloads)
* [python2.7.x](https://www.python.org/downloads/) - required to build some dependencies
* [node.js 8.16](https://nodejs.org/en/download/releases/) - later versions not currently supported on Windows
* [Visual C++ Build Tools](https://www.npmjs.com/package/windows-build-tools) - required to compile some dependencies

**Optional Tools:**
* [chocolatey](https://chocolatey.org/docs/installation) - package manager for Windows
* [nvm-windows](https://github.com/coreybutler/nvm-windows) - node.js version manager for windows

**There's two methods for installing stencil's dependencies on Windows:**
1. Install required dependencies manually (or using your preferred method).
2. Use chocolatey to install dependencies.

If you're experienced at installing and configuring `python` and `node.js` environments on Windows, feel free to install the required dependencies using your preferred method. If you're unsure, chocolatey is the easier option:

```shell
# Install chocolatey
iex ((New-Object System.Net.WebClient).DownloadString("https://chocolatey.org/install.ps1"))

# Install git if you don't have it
choco install git

# Install nvm-windows and stencil compatible node.js
choco install nvm; nvm install 8.16; nvm use 8.16

#####################################################################################
# Close PowerShell and re-open as admin 
#####################################################################################

# Install Windows C++ Build Tools (also installs python2)
npm install -g windows-build-tools --vs2015

# Tell npm to use python2
npm config set python python2.7

# Install Stencil CLI
npm install -g @bigcommerce/stencil-cli
```

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">

<!-- theme: warning -->

### Execution Policy Errors
> If you receive an execution policy error while attempting to install chocolatey, refer to [Microsoft's Documentation](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.security/set-executionpolicy?view=powershell-6) or consult with your organization's system administrator to determine the appropriate course of action.

</div>
</div>
</div>

---

## Installing on Linux

**Required Dependencies**
1. [Node.js 8.16](https://nodejs.org/en/download/releases/)
2. [nvm](https://github.com/nvm-sh/nvm)

**Depending on the distro, you may also need to install:**
* g++
* [libsass](https://sass-lang.com/libsass)

To install Stencil CLI and it’s dependencies, open a terminal, and enter:
```shell
## update package list
sudo apt-get update

## install node and npm
sudo apt-get install nodejs npm

# download nvm install.sh and run with bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash

# explicitly install supported node version
nvm install 8.16

# Install Stencil CLI
npm install -g @bigcommerce/stencil-cli
```

These instructions have been tested on Linux/Ubuntu v.14.04.4.

---

<a href='#authorizing_download' aria-hidden='true' class='block-anchor'  id='authorizing_download'><i aria-hidden='true' class='linkify icon'></i></a>

## Downloading Cornerstone

To begin using Stencil CLI for theme development, you'll first need to obtain a theme. To develop against BigCommerce's Cornerstone theme, clone [the repository](https://github.com/bigcommerce/cornerstone) from GitHub:

```shell
git clone https://github.com/bigcommerce/cornerstone.git
```

Cornerstone and other themes can also be downloaded from the BigCommerce Control Panel. For instructions on doing so, see [Downloading and Uploading Custom Themes](https://support.bigcommerce.com/s/article/Stencil-Themes#download-upload) (BigCommerce Knowledge Base).

<div class="HubBlock--callout">
<div class="CalloutBlock--error">
<div class="HubBlock-content">

#### Distribution of Cornerstone-based Themes
> Distribution of Cornerstone-based themes is subject to BigCommerce's Cornerstone license, including the mandatory incorporation of BigCommerce's copyright statement.

#### Back Up before Reinstalling
> If you are reinstalling over a base theme on which you have already begun development, first back up your theme’s .stencil file. This contains your store URL, BigCommerce username and access tokens, and other basic settings. Preserving those settings will speed up initializing and launching the new version. If you would like to allow for complete rollback, back up your entire theme’s directory.


</div>
</div>
</div>

---

<a href='#authorizing_initialize' aria-hidden='true' class='block-anchor'  id='authorizing_initialize'><i aria-hidden='true' class='linkify icon'></i></a>

## Downloading Marketplace Themes

It is also possible to download and develop against themes in the BigCommerce Themes Marketplace. To download a marketplace theme:
1. Navigate to **Storefront** > **Themes Marketplace**, and add the desired theme.
2. Once added, navigate to **Storefront** > **My Themes** > **Theme Thumbnail** > **Theme Options**.
3. Select the appropriate Download option.

![#### Theme Options](//s3.amazonaws.com/user-content.stoplight.io/6116/1562092313957 "#### Theme Options")

**Download Options**:
* **Download current theme:** Download the theme version active on the storefront (appears only if you selected the current theme).
* **Download your latest customizations:** Download the theme's most recently saved version (appears only for themes customized for this store).
* **Download theme file:** Download the theme as it was originally uploaded to Theme Marketplace.

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">

<!-- theme: warning -->

### Theme Access, Copyright/Ownership, and Distribution
> Marketplace themes other than Cornerstone must be purchased in order to be downloadable. You are entitled to customize a free or purchased theme for a store you support; however, the original creator retains rights to that theme's design. So, except for Cornerstone-based themes, you may not upload a derived theme to a public theme marketplace (whether BigCommerce's or third-party), nor sell it privately.

</div>
</div>
</div>

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">

<!-- theme: warning -->

### Setting Up BitBucket SSH Keys (Pixel Union Themes)
> To set up Stencil CLI for Pixel Union Themes, you must first authorize communication among your local system, the BitBucket registry, and GitHub. Therefore, steps beyond this point require that you have active accounts on both BitBucket and GitHub.

To authorize ongoing communication, you must first set up a secure shell (SSH) key that is shared between BitBucket and GitHub.

Setting up an SSH key is a multi-step process. We have included resources below to help achieve this step.

* [Setting up SSH for Git on BitBucket](https://confluence.atlassian.com/bitbucket/set-up-ssh-for-git-728138079.html) (Confluence)
* [Connecting to Github with SSH](https://help.github.com/articles/connecting-to-github-with-ssh/) (Github)

</div>
</div>
</div>

---

## Live Previewing a Theme

Stencil CLI's Browsersync makes it possible to serve up a live preview of a theme in development. This is done by using the `stencil start` command. When `stencil start` is executed, Stencil CLI checks for the required `.stencil` configuration file, which contains:
* the store's URL
* an API access token
* a local port number

This configuration file is created by running `stencil init`. Before doing so, be sure to obtain an API access token; for instructions on doing so, see: [Obtaining Store API Credentials](/api-docs/getting-started/authentication#authentication_getting-api-credentials). Once you have an API access token, `cd` into the theme's directory and run `stencil init`:

```shell
# move into theme dir
cd ~/path/to/them/dir

# start .stencil initialization prompt
stencil init

# prompt:
? What is the URL of your store\'s home page? # Your BigCommerce Storefront URL. Ex: https://yourstore.com/
? What port would you like to run the server on? (3000) # Enter a port number or press enter to use default
? What is your Stencil OAuth Access Token? # Enter your OAuth Access Token

# a .stencil file will be generated

# to serve the theme, run:
stencil start
```

After entering `stencil start`, Stencil CLI will output several URLs to the console:

```shell
# ...
[Browsersync] Proxying: http://localhost:3001
[Browsersync] Access URLs:
 -----------------------------------
       Local: http://localhost:3000  # preview real-time changes on your local machine
    External: http://10.4.10.71:3000 # preview real-time changes across multiple devices
 -----------------------------------
          UI: http://localhost:3002
 UI External: http://10.4.10.71:3002
 -----------------------------------
[Browsersync] Watching files...
```

Browse to the local URL to preview the theme and see changes updated in real-time. To preview the theme on multiple devices simultaneously, browse to the external URL on the desired devices.

For a full list of Stencil CLI commands, see [Stencil CLI Options and Commands](https://developer.bigcommerce.com/stencil-docs/installing-stencil-cli/stencil-cli-options-and-commands). For help troubleshooting errors or installation issues, see: [Troubleshooting Your Setup](https://developer.bigcommerce.com/stencil-docs/installing-stencil-cli/troubleshooting-your-setup).

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">

<!-- theme: warning -->

### BitBucket Reauthentication
> If you receive error messages about resolving BitBucket as an SSH host when running `stencil init`, enter the BitBucket password used to setup the BitBucket SSH Keys when prompted.

</div>
</div>
</div>

---

## Resources

### Additional Resources

* [Demonstration of Stencil Installation and Launch](https://www.youtube.com/watch/iWBrJalyM0A) (Youtube)