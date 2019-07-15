<h1>Authorizing and Initializing the CLI</h1>
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#authorizing_authentication">Authentication</a></li>
    <li><a href="#authorizing_prerequisites">Prerequisites by OS</a></li>
    <li><a href="#authorizing_install">Install the Stencil Command Line Interface (CLI)</a></li>
    <li><a href="#authorizing_download">Download a Stencil Theme</a></li>
    <li><a href="#authorizing_installing-modules">Installing Modules and JS Utilities</a></li>
    <li><a href="#authorizing_initialize">Initialize the Stencil CLI</a></li>
	</ul>
</div>



The Stencil CLI enables local development and customization to  a Stencil theme with no impact to a merchant’s live storefront during the development process. When developing locally, developers will have access to real-time Browsersync preview and testing across desktop, mobile, and tablet devices/viewports. 

This article contains detailed instructions on how to authorize and initialize the Stencil CLI. This includes obtaining an authentication token, installing Stencil CLI on your particular OS, downloading a Stencil theme (Cornerstone or a Third Party Marketplace theme) to begin development on, installing Stencil's JS utilities, and finally initializing the CLI on a Stencil theme.

---

<a href='##authorizing_authentication' aria-hidden='true' class='block-anchor'  id='#authorizing_authentication'><i aria-hidden='true' class='linkify icon'></i></a>

## Authentication

You need to have an authentication token to use the Stencil CLI. To learn how to obtain an API token, see [Obtaining Store API Credentials](/api-docs/getting-started/authentication#authentication_getting-api-credentials).

---

<a href='##authorizing_prerequisites' aria-hidden='true' class='block-anchor'  id='#authorizing_prerequisites'><i aria-hidden='true' class='linkify icon'></i></a>

## Prerequisites by OS

Each OS has different prerequisites that need to be fulfilled before installing the Stencil CLI. Check the correct subsection below before attempting installation. 
* [Mac OS](#mac)
* [Linux](#linux)
* [Windows](#windows)


### <a name="mac"></a>Mac OS

These instructions have been tested on Mac OS X Yosemite. Dependencies for other platforms will be added upon further testing.

1. Install [Xcode Development tools](https://developer.apple.com/xcode/) (latest stable version).

2. Install Node.js 8.x+.
* Stencil requires the [Node.js](https://nodejs.org/) runtime environment, version [8.x or later](https://nodejs.org/en/blog/release/).  
* We recommend that you install or update Node.js using [nvm](https://github.com/creationix/nvm#installation). First install nvm, version [0.31.0](https://github.com/creationix/nvm/tree/v0.31.0), as follows:

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash
```

Next, explicitly install a supported Node.js version:

```
nvm install 8.1.0
```

### <a name="linux"></a>Linux

These instructions have been tested on Linux/Ubuntu v.14.04.4.

_You should have administrator/root permissions on your machine. If not, you may need to precede some of the below commands with the `sudo` prefix._

1. Install a [Git Client](https://git-scm.com/downloads)

2. Install Node.js 8.x+

* Stencil requires the [Node.js](https://nodejs.org/) runtime environment, version [8.x or later](https://nodejs.org/en/blog/release/).  

* We recommend that you install or update Node.js using `nvm` as follows:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">Install/Update Node.js using nvm</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "Install/Update Node.js using nvm"
subtitle: ""
lineNumbers: true
-->

```js
## update package list
sudo apt-get update

## install node and npm
sudo apt-get install nodejs npm

# download nvm install.sh and run with bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash

# explicitly install a supported Node.js version
nvm install 8.1.0

# double check the installed node version:
nodejs --version
```

3. Install Other Dependencies (if necessary)

* Depending on the distro, you may also need to install the following dependencies:

	* g++
	* [libsass](https://sass-lang.com/libsass)

### <a name="windows"></a>Windows

The following instructions have been tested on Windows 10. Dependencies for other platforms will be added upon further testing.

_You must have authorization to run Powershell “as administrator” on your machine._

1. Install a [Git Client](https://git-scm.com/downloads)

* You must have a Git client installed. The Git for Windows distribution includes a Git client, and also provides the Git BASH emulator for command-line access. All commands should be run in Git Bash from here.

2. Install [Python 2.7.x for Windows](https://www.python.org/downloads/windows/). 

* This is required for Visual Studio’s Windows Build Tools, installed below. **Python 3.x is nsot supported.**

* In the installer dialog (shown below), change the bottom default to enable the `Add python.exe to Path` option. This provides global command-line access to Python.

<!--
    title: 
    data: //s3.amazonaws.com/user-content.stoplight.io/6116/1562046167474
-->

![](//s3.amazonaws.com/user-content.stoplight.io/6116/1562046167474 "")

3. Install Node.js 8.x+.

* We recommend that you install only an LTS (“Long-Term Support”/“Mature and Dependable”) version, and that you download that version’s `.msi` installer (not its `.exe` binary).

* You can choose to instead download the latest x.x version of Node.js from the Node.js Foundation’s archives, using URLs of the form: https://nodejs.org/dist/latest-v8.x/, https://nodejs.org/dist/latest-v8.x/, etc. 

* To verify your Node.js installation or reinstallation, the article [How to Install Node.js and NPM Windows](https://blog.teamtreehouse.com/install-node-js-npm-windows) (Treehouse) provides Windows-specific tips and tests.

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">
    
<!-- theme: warning -->

### Restart Required
> You will need to restart your computer to complete Node.js installation.

</div>
</div>
</div>

4. Configure Python within the Node.js runtime environment by running this npm command:

`npm config set python python2.7`

<div class="HubBlock--callout">
<div class="CalloutBlock--">
<div class="HubBlock-content">
    
<!-- theme:  -->

### About Node Package Manager (npm)
> The node package manager was installed as part of Node.js. As you proceed through Stencil CLI setup (and later refreshes), you will use this command-line utility to install packages/modules, and to configure and manage dependencies and their versions.

</div>
</div>
</div>

5. Choose to either install Turbo C++ or Visual Studio for your C++ Compiler.

#### Turbo C++

You can install Turbo C++ as a lighter version instead of Visual Studio. The installation takes about 5 minutes. After installation, a box opens that highlights the features of Turbo C++. This box can be closed since it is not needed to complete installation. If you prefer using Visual Studio then use the steps below.

#### Visual Studio Installation
Install MicroSoft Visual Studio. Stencil requires a 2013 or later release, Community Edition (free) or higher.

Be sure to install Visual Studio’s “Common Tools” component. You can also add this component later in the window shown below.

#### Visual Studio Version/Node Configuration

Finally, configure Visual Studio within the Node.js runtime environment by running the following npm command. (Replace the 2015 parameter with 2013 or 2017, as needed, to match the Visual Studio release you have installed:)

`npm config set msvs_version 2015`

<div class="HubBlock--callout">
<div class="CalloutBlock--">
<div class="HubBlock-content">
    
<!-- theme:  -->

### Notes on Dependencies
> While alternate versions might also support Stencil, BigCommerce does not offer technical assistance on substitutions for, or customized versions of, the tested dependencies listed here.

Once Stencil is fully installed, you can check dependencies’ installed versions by examining your <theme-name>/package.jsonfile.

</div>
</div>
</div>

---

<div class="HubBlock--callout">
<div class="CalloutBlock--">
<div class="HubBlock-content">
    
<!-- theme:  -->

### Troubleshooting
> If you run into any problems with Stencil installation or launch, first consult [Troubleshooting Your Setup](/stencil-docs/getting-started/launching-stencil/troubleshooting-your-setup). 

If that does not resolve your issue, consult our [Support resources](https://support.bigcommerce.com/s/), which include community and peer support via [BigCommerce Developer Community](https://support.bigcommerce.com/s/group/0F913000000HLjECAW/bigcommerce-developers) and [Stack Overflow](https://stackoverflow.com/questions/tagged/bigcommerce) forums.

</div>
</div>
</div>

---

<a href='#authorizing_install' aria-hidden='true' class='block-anchor'  id='authorizing_install'><i aria-hidden='true' class='linkify icon'></i></a>

## Install the Stencil Command Line Interface (CLI)

After [obtaining API credentials](/api-docs/getting-started/authentication#authentication_getting-api-credentials) and ensuring you have met all the [prerequisites for your OS](#installing_prerequisites), you are ready to install the Stencil CLI. 

You can do this via the following command (_If you are using Windows, you will need to run this command in git bash._):

`npm install -g @bigcommerce/stencil-cli`


<div class="HubBlock--callout">
<div class="CalloutBlock--">
<div class="HubBlock-content">
    
<!-- theme:  -->

### Items to note 
> * The command above requires <a href="https://www.npmjs.com/">npm</a> to be installed in your local development environment.

* In Windows, this `npm` command's execution might at times appear to freeze. However, the installer is running. Give it several minutes to complete installation.

* On Mac OS machines with installed xcode, version 5.x, this `npm` command has generated errors of the form: 
`npm ERR! invalid: string_decoder`. The workaround is to upgrade xcode to the latest stable xcode version. 

* If you receive a file-permissions error and you did not install Node.js via <a href="https://github.com/creationix/nvm#installation">nvm</a> (Node Version Manager), 
then either install nvm now, or follow one of the workarounds on [Resolving EACCES permissions errors when installing packages globally](https://docs.npmjs.com/getting-started/fixing-npm-permissions) (NPM).

</div>
</div>
</div>

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">
    
<!-- theme: warning -->

### CLI Force Upgrade and Cornerstone 2.0.0
> To ensure the Stencil CLI is compatible with all the changes introduced in Cornerstone 2.0.0, you must upgrade to the latest version of Stencil CLI (1.15.1) if using Cornerstone 2.x.x.

Occasionally, you will receive a command line prompt to run the installation command when you restart your Stencil server. This occurs when BigCommerce publishes a critical fix in Stencil CLI, to resolve an issue like a newly discovered security exploit.

</div>
</div>
</div>

---

<a href='#authorizing_download' aria-hidden='true' class='block-anchor'  id='authorizing_download'><i aria-hidden='true' class='linkify icon'></i></a>

## Download a Stencil Theme 

You should have the [Stencil CLI successfully installed](installing_installing-the-stencil-cli) on your local machine.

To begin locally developing and customizing a Stencil theme, you must first download a theme. If you plan on developing on top of the Cornerstone theme, you can follow the standard practice of cloning the repository from GitHub. If you would like to develop on top of a third party theme, you must follow the instructions provided in [Download a Third-Party Marketplace Theme](#authorizing_download-third-party). 

### Download Cornerstone

The instructions below will instruct you how to download Cornerstone by cloning the Cornerstone repository from GitHub. You can also download Cornerstone from the BigCommerce Control Panel. If you prefer to download Cornerstone from the Control Panel, see [Downloading and Uploading Custom Themes](https://support.bigcommerce.com/s/article/Stencil-Themes#download-upload) (BigCommerce Knowledge Base).

To clone Cornerstone from GitHub, follow the steps below: 
(_Windows users need to run this in `git bash`._)

1. In your terminal, cd to the directory you would like to use for working on themes, then clone the cornerstone repo:

`git clone https://github.com/bigcommerce/cornerstone.git`
  
_If the above command fails and you are accessing GitHub anonymously, give the URL this alternate prefix:_

`git clone git://github.com/bigcommerce/cornerstone.git`

In the next step, we'll Stencil's [JavaScript utilities](#authorizing_installing-stencils-js-utilities) to enable API access via Ajax.

<div class="HubBlock--callout">
<div class="CalloutBlock--error">
<div class="HubBlock-content">
    
<!-- theme: error -->

### Distribution of Cornerstone-based Themes
> Distribution of Cornerstone-based themes is subject to BigCommerce's Cornerstone license, including the mandatory incorporation of BigCommerce's copyright statement.

</div>
</div>
</div>

<div class="HubBlock--callout">
<div class="CalloutBlock--error">
<div class="HubBlock-content">
    
<!-- theme: error -->

### Back Up before Reinstalling
> If you are reinstalling over a base theme on which you have already begun development, first back up your theme’s .stencil file. This contains your store URL, BigCommerce username and access tokens, and other basic settings. Preserving those settings will speed up initializing and launching the new version. If you would like to allow for complete rollback, back up your entire theme’s directory.

</div>
</div>
</div>

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">
    
<!-- theme: warning -->

### Theme Access, Copyright/Ownership, and Distribution
> Marketplace themes other than Cornerstone must be purchased in order to be downloadable. You are entitled to customize a free or purchased theme for a store that you support. However, the theme's original creator retains rights to that theme's design. So, except for Cornerstone-based themes, you may not upload a derived theme to a public theme marketplace (whether BigCommerce's or third-party), nor sell it privately.

</div>
</div>
</div>

### Download a Third-Party Marketplace Theme

If you would prefer to develop on top of a third party theme, use these steps to download an available Marketplace Theme from the BigCommerce Theme Marketplace. Downloading a third-party Marketplace Theme for development must be done through the BigCommerce Control Panel.

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">
    
<!-- theme: warning -->

### Setting Up BitBucket SSH Keys (Pixel Union Themes)
> To set up Stencil CLI for Pixel Union Themes, you must first authorize communication among your local system, the BitBucket registry, and GitHub. Therefore, steps beyond this point require that you have active accounts on both BitBucket and GitHub.

To authorize ongoing communication, you must first set up a secure shell (SSH) key that is shared between BitBucket and GitHub. 

Setting up an SSH key is a multi-step process. We have included resources below to help achieve this step. 

* [Setting up SSH for Git on BitBucket](https://confluence.atlassian.com/bitbucket/set-up-ssh-for-git-728138079.html) (Confluence)
* [Connecting to Github with SSH](
https://help.github.com/articles/connecting-to-github-with-ssh/) (Github)

</div>
</div>
</div>

#### Download the Marketplace Theme from the BigCommerce Control Panel

1. If you have not yet added the theme to your store, start at **Storefront Design** > **Themes Marketplace**, and add the theme.

2. Go to **Storefront Design** > **My Themes**.

3. Click the theme's thumbnail:
	 
	- To download the store's active theme, click the image thumbnail at the top of the page, under the **Current Theme** heading.
	
	- To download an inactive theme, scroll down below the lower My Themes subheading, and click the theme's thumbnail.

Your selected theme will zoom up to a full-page description and display a Theme Options drop-down list at the upper right.

4. Note the version number displayed under the theme's title and credits. At Checking the Theme's Version below, you will use this number to choose between two installation flows.

5. From the Theme Options drop-down list, select the appropriate Download option. (The options visible depend on your theme's current state:)

	- Download current theme: Download the theme version that is now active on the storefront. (This option appears only if you selected the Current Theme.)

	- Download your latest customizations: Download the theme's most recently saved version. (This option appears only for themes that have been customized for this store.)

	- Download theme file: Download the theme as it was originally uploaded to Theme Marketplace. 

6. Unpack the zipped theme to a working directory.
(In the remainder of this documentation, substitute this working directory's name for the default `stencil` path or the `theme-name` placeholder.)

#### Check the Marketplace Theme's Version

Refer to the theme's version number you noted above in "Downloading a Marketplace Theme for Customization."

* If the version number is 1.10.0 or higher, the theme uses Webpack as its JavaScript build system. Skip ahead to the simplified installation instructions in Installing Modules (Webpack Themes).

* If the theme's version number is lower than 1.10.0, the theme uses jspm as its JavaScript build system. Follow the steps outlined on the jspm tab below on [jspm Steps to install modules for Stencil Themes](#downloading_checking-modules).

<!--
    title: #### Theme Options

    data: //s3.amazonaws.com/user-content.stoplight.io/6116/1562092313957
-->

#### Theme Options
![#### Theme Options
](//s3.amazonaws.com/user-content.stoplight.io/6116/1562092313957 "#### Theme Options
")

<div class="HubBlock--callout">
<div class="CalloutBlock--">
<div class="HubBlock-content">
    
<!-- theme:  -->

### Theme Download Shortcuts
> Some versions of the BigCommerce control panel offer you shortcuts for steps 3–5 above, removing the need to click the theme card/thumbnail:

For your store’s currently active theme, look for a version number to the right of the thumbnail. You can select the Advanced drop-down list to display options similar to those at step 5 above.

For inactive themes, look for a version number at the theme card’s lower left. Also, you can select the “…” menu at the theme card’s lower right to display options similar to those at step 5 above.

</div>
</div>
</div>

---

<a href='#authorizing_installing-modules' aria-hidden='true' class='block-anchor'  id='authorizing_installing-modules'><i aria-hidden='true' class='linkify icon'></i></a>

## Installing Modules and Javascript Utilities for Stencil Themes

### Checking the Theme’s Version

Refer to the theme’s version number that you noted above at Downloading a StencilTheme for Customization.

* If the version number is 1.10.0 or higher, the theme uses Webpack as its JavaScript build system. Skip ahead to the simplified installation instructions in 'Installing Modules for Webpack Themes.'

* If the theme’s version number is lower than 1.10.0, the theme uses jspm as its JavaScript build system. Follow the steps outlined on the subsection below 'Install Modules for themes with jspm.'

### Install Modules for Webpack Themes

For Cornerstone and Third PArty Marketplace themes whose version number is 1.10.0 or higher, simply use npm to install the modules required to access Stencil JavaScript events:

1. Navigate to your theme directory. This example assumes that this target directory has the default name Cornerstone:

`cd cornerstone`

2. Within that directory, install the `stencil-utils` module to ensure that all your dependencies are up to date:

`npm install`

This will install the required npm modules to properly leverage the Stencil event framework.

### Install Modules for themes with jspm (Marketplace theme versions earlier than 1.10.0)

* Installing jspm
* Registering the jspm Instance
* Installing jspm-git
* Adding BitBucket as a jspm registry
* Installing Modules (jspm Themes)

#### Installing jspm 

You must [install jspm](http://jspm.io) to manage your pre-1.10.0 theme's JavaScript dependencies. We have tested Stencil on jspm version 0.16.30 for Mac OS and Linux, and on version 0.16.31 for Windows. Use the following npm command to install a tested version of jspm with global scope - for Mac OS or Linux: 

`npm install -g jspm@0.16.30`

Or, for Windows:

`npm install -g jspm@0.16.31`

You can use the same command to upgrade an earlier jspm installation to a Stencil-supported version.

#### Registering the jspm Instance 

Next, register your jspm instance with GitHub. Navigate to your [GitHub Personal Access Tokens page](https://github.com/settings/tokens).

Generate a new personal access token with the name Stencil and scope repo. GitHub provides [specific instructions](https://help.github.com/articles/generating-an-ssh-key/).

Verify that your new token includes the following scopes: 

* `repo:status`
* `repo_deployment`
* `public_repo`

Once you have generated your token, run the following command to associate your jspm module with your GitHub account:

`jspm registry config github`

You will be prompted (`"Set up GitHub credentials?`) to enter your authentication token. Copy the personal access token you created above and paste it in.

#### Installing jspm-git 

For the next step, you will need the [jspm-git registry plug-in](https://www.npmjs.com/package/jspm-git\).

To install it with global scope, enter the following on a command line:
`npm install -g jspm-git`

If you already have an earlier version of jspm-git installed, you might need to update it to handle Git projects with two-digit version numbers (such as `1.10.0`). If so, use this command:

`npm upgrade jspm-git@latest`

#### Adding BitBucket as a jspm Registry 

Working with downloaded Marketplace themes requires that you next add BitBucket as a registry for jspm. To proceed, set up a [BitBucket](https://bitbucket.org/product) account, if you do not already have one.

Next, enter the following on a command line:

`jspm registry create bitbucket jspm-git`

You will be prompted for a base URL for your git server. Enter the following: `ssh://git@bitbucket.org`

#### Installing Modules (jspm Themes)
	
Next, install the npm and jspm modules required to access Stencil JavaScript events. 

Navigate to your theme directory. 

This example assumes that this target directory has the default name `cornerstone`

`cd cornerstone` 

Within that directory, install (or reinstall) the `stencil-utils` module to ensure that all your dependencies are up to date:`npm install` Then execute the following command to complete installation: `jspm install`

---

<a href='#authorizing_initialize' aria-hidden='true' class='block-anchor'  id='authorizing_initialize'><i aria-hidden='true' class='linkify icon'></i></a>

## Initialize the Stencil CLI

Use these steps to Initialize the Stencil CLI get started locally developing a theme.

1. Have your store API account’s Client ID and Access Token hashes ready. Refer back to [Obtaining Store API Credentials](/api-docs/getting-started/authentication#authentication_getting-api-credentials) if necessary.

2. Starting from the subdirectory for the appropriate theme (and store), initialize Stencil CLI by running the following command (Windows users need to run this in git bash):

`stencil init`

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">
    
<!-- theme: warning -->

### BitBucket Reauthentication 
> When you issue the `stencil init` command to [authorize and initialize Stencil](/stencil-docs/getting-started/launching-stencil/authorizing-and-initializing), you might receive error messages about resolving BitBucket as an SSH host. If your theme requires BitBucket Keys, these errors occur when you have not recently logged into BitBucket. 

To clear the errors, enter the BitBucket password you used when setting up BitBucket SSH Keys when prompted.

</div>
</div>
</div>

3. You will be prompted to provide the homepage URL of the production store against which you want to develop (for example, https://storename.com or https://storename.mybigcommerce.com). 

4. Next, you will be prompted to enter the port where you would like to run your store on your local machine. This can be any port you like, but we recommend using port 3000.

5. Next, you will be prompted: What is your Stencil OAuth Client ID? Enter your store API account’s Client ID. If you used this Client ID when you last ran stencil init, you’ll see it hinted on the command line, and can just confirm it.

6. Finally, you will be prompted: What is your Stencil OAuth Access Token? If you entered these credentials when you last ran stencil init, you’ll see the token hinted in cleartext. If not, paste your Access Token hash onto the command line. Then press Enter.

Your terminal window should now confirm that you have successfully initialized Stencil CLI on your local machine. With Stencil CLI initialized, you are ready to start Stencil and begin development. To start developing, run the `stencil start` command and navigate to the specified port.

### Using Browsersync to Render the Store on Desktop/Tablet/Mobile for Testing

The Stencil framework uses Browsersync to help you rapidly test your storefront themes across devices of different viewports. After you launch Stencil with `stencil start`, your console window will display several IP addresses below the BigCommerce “B”.

<!--
    title: 
    data: //s3.amazonaws.com/user-content.stoplight.io/6116/1561488543458
-->

![](//s3.amazonaws.com/user-content.stoplight.io/6116/1561488543458 "")

Note the `External` IP address. You can copy/paste this URL to access the Browsersync server from multiple devices. Then, watch as scrolling and other actions sync up across devices. (Note: Firewalls and other security measures might interfere with this feature.)

To maximize the adoption of your themes, we recommend that you use such testing to design responsive themes that display and function well across multiple viewport sizes.

---

## Resources

### Additional Resources

* [Demonstration of Stencil Installation and Launch](https://www.youtube.com/watch/iWBrJalyM0A) (Youtube)

