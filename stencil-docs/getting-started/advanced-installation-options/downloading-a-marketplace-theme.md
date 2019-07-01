<h1>Downloading a Marketplace Theme from the BigCommerce Control Panel</h1>

<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#downloading_setting-up-bitbucket">Setting Up BitBucket SSH Keys</a></li>
    <li><a href="#downloading_downloading-a-marketplace-theme">Downloading a Marketplace Theme for Customization</a></li>
    <li><a href="#downloading_checking-themes-version">Checking the Theme's Version</a></li>
    <li><a href="#downloading_jspm-steps">jspm Steps for Earlier Versions</a></li>
    <li><a href="#downloading_installing-modules">Installing Modules (Webpack themes)</a></li>
    <li><a href="#downloading_next-steps">Next Steps</a></li>
    </ul>
</div>

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">
    
<!-- theme: warning -->

### BitBucket Registry Access
> There is no way to re-display this pop-up after selecting Done, so be sure to securely store the credentials before leaving this screen.

</div>
</div>
</div>

<a href='#downloading_setting-up-bitbucket' aria-hidden='true' class='block-anchor'  id='downloading_setting-up-bitbucket'></a>

## Setting Up BitBucket SSH Keys for Pixel Union Marketplace Themes 

To set up Stencil CLI for Pixel Union Themes, you must authorize communication among your local system, the BitBucket registry, and GitHub.

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">
    
<!-- theme: warning -->

### BitBucket and Github Accounts Required
> There is no way to re-display this pop-up after selecting Done, so be sure to securely store the credentials before leaving this screen.

</div>
</div>
</div>

To authorize ongoing communication, you must set up a secure shell (SSH) key that is shared between BitBucket and GitHub. This is a multi-step process, which is beyond the scope of this documentation. However, we have tested the following instructions and found them to be reliable:

* [Setting up SSH for Git on BitBucket](
https://confluence.atlassian.com/bitbucket/set-up-ssh-for-git-728138079.html)

_Follow the default instructions to create a key in your `~/.ssh/config`_

* [Setting up SSH on GitHub (a series of linked steps)](
https://help.github.com/articles/connecting-to-github-with-ssh/)



<div class="HubBlock--callout">
<div class="CalloutBlock--">
<div class="HubBlock-content">
    
<!-- theme:  -->

###  Theme Access, Copyright/Ownership, and Distribution
> There is no way to re-display this pop-up after selecting Done, so be sure to securely store the credentials before leaving this screen.

</div>
</div>
</div>

<a href='#downloading_downloading-a-marketplace-theme' aria-hidden='true' class='block-anchor'  id='downloading_downloading-a-marketplace-theme'></a>

## Downloading a Marketplace Theme for Customization

Use these steps to download a theme (other than Cornerstone) available in the store control panel's Storefront Design area. 

1. If you have not yet added the theme to your store, start at **Storefront Design** > **Themes Marketplace**, and add the theme.

2. Go to **Storefront Design** > **My Themes**.

3. Click the theme's thumbnail:
	 
	* To download the store's currently active theme, click the image thumbnail at the top of the page, under the Current Theme heading.
	
	* To download an inactive theme, scroll down below the lower My Themes subheading, and click the appropriate theme's thumbnail.

Your selected theme will zoom up to a full-page description and display a Theme Options drop-down list at the upper right.

4. Note the version number displayed under the theme's title and credits. At Checking the Theme's Version below, you will use this number to choose between two installation flows.

5. From the Theme Options drop-down list, select the appropriate Download option. (The options visible depend on your theme's current state:)

	* Download current theme: Download the theme version that is now active on the storefront. (This option appears only if you selected the Current Theme.)

	* Download your latest customizations: Download the theme's most recently saved version. (This option appears only for themes that have been customized for this store.)

	* Download theme file: Download the theme as it was originally uploaded to Theme Marketplace. 

6. Unpack the zipped theme to a working directory.
(In the remainder of this documentation, substitute this working directory's name for the default `stencil` path or the `theme-name` placeholder.)

<!--
    title: #### Theme Options

    data: //s3.amazonaws.com/user-content.stoplight.io/6116/1538543505088
-->

#### Theme Options
![#### Theme Options
](//s3.amazonaws.com/user-content.stoplight.io/6116/1538543505088 "#### Theme Options
")

<div class="HubBlock--callout">
<div class="CalloutBlock--">
<div class="HubBlock-content">
    
<!-- theme:  -->

### Theme Download Shortcuts
> There is no way to re-display this pop-up after selecting Done, so be sure to securely store the credentials before leaving this screen.

</div>
</div>
</div>

<a href='#downloading_checking-themes-version' aria-hidden='true' class='block-anchor'  id='downloading_checking-themes-version'></a>

## Checking the Theme's Version

Refer to the theme's version number that you noted above at Downloading a Theme for Customization:

* If the version number is 1.10.0 or higher, the theme uses Webpack as its JavaScript build system. Skip ahead to the simplified installation instructions in Installing Modules (Webpack Themes).

* If the theme's version number is lower than 1.10.0, the theme uses jspm as its JavaScript build system. Follow the steps outlined on the jspm tab below on [jspm Steps to install modules for Stencil Themes](#downloading_checking-modules).


<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">
    
<!-- theme: warning -->

### Consider Updating Your Theme
> There is no way to re-display this pop-up after selecting Done, so be sure to securely store the credentials before leaving this screen.

</div>
</div>
</div>

<a href='#downloading_checking-modules' aria-hidden='true' class='block-anchor'  id='downloading_checking-modules'></a>

<div class="tab-block">
    {'children': [{'title': 'Webpack', 'blocks': [{'type': 'text', 'data': '## Installing Modules for Webpack themes\n\nFor Marketplace themes whose version number is 1.10.0 or higher, simply use npm to install the modules required to access Stencil JavaScript events:\n\n1. Navigate to your theme directory. This example assumes that this target directory has the default name Cornerstone:\n\n`cd cornerstone`\n\n2. Within that directory, install the stencil-utils module to ensure that all your dependencies are up to date:\n\n`npm install`'}]}, {'title': 'jspm', 'blocks': [{'type': 'text', 'data': '## Legacy: Configuring themes with jspm (Marketplace theme versions earlier than 1.10.0)\n\n* Installing jspm\n* Registering the jspm Instance\n* Installing jspm-git\n* Adding BitBucket as a jspm registry\n* Installing Modules (jspm Themes)'}, {'type': 'text', 'data': "Use the following steps for Marketplace themes (other than Cornerstone) for which the version number is lower than 1.10.0\n\n## Installing jspm \n\nYou must [install jspm](http://jspm.io) to manage your pre-1.10.0 theme's JavaScript dependencies. We have tested Stencil on jspm version 0.16.30 for Mac OS and Linux, and on version 0.16.31 for Windows. Use the following npm command to install a tested version of jspm with global scope - for Mac OS or Linux: \n\n`npm install -g jspm@0.16.30`\n\nOr, for Windows:\n\n`npm install -g jspm@0.16.31`\n\nYou can use the same command to upgrade an earlier jspm installation to a Stencil-supported version."}, {'type': 'text', 'data': '## Registering the jspm Instance \n\nNext, register your jspm instance with GitHub.\nNavigate to your [GitHub Personal Access Tokens page](https://github.com/settings/tokens).\n\nGenerate a new personal access token with the name Stencil and scope repo. GitHub provides specific instructions [here](https://help.github.com/articles/generating-an-ssh-key/).\n\nVerify that your new token includes the following scopes: \n\n* `repo:status`\n* `repo_deployment`\n* `public_repo`\n\nOnce you have generated your token, run the following command to associate your jspm module with your GitHub account:\n\n`jspm registry config github`\n\nYou will be prompted (`"Set up GitHub credentials?`) to enter your authentication token. Copy the personal access token you created above and paste it in.\n'}, {'type': 'text', 'data': '## Installing jspm-git \n\nFor the next step, you will need the [jspm-git registry plug-in](https://www.npmjs.com/package/jspm-git\\).\n\nTo install it with global scope, enter the following on a command line:\n`npm install -g jspm-git`\n\nIf you already have an earlier version of jspm-git installed, you might need to update it to handle Git projects with two-digit version numbers (such as `1.10.0`). If so, use this command:\n\n`npm upgrade jspm-git@latest`'}, {'type': 'text', 'data': '## Adding BitBucket as a jspm Registry \n\nWorking with downloaded Marketplace themes requires that you next add BitBucket as a registry for jspm. To proceed, set up a [BitBucket](https://bitbucket.org/product) account, if you do not already have one.\n\nNext, enter the following on a command line:\n\n`jspm registry create bitbucket jspm-git`\n\nYou will be prompted for a base URL for your git server. Enter the following: `ssh://git@bitbucket.org`'}, {'type': 'text', 'data': '## Installing Modules (jspm Themes)\n\t\nNext, install the npm and jspm modules required to access Stencil JavaScript events: Navigate to your theme directory. \n\nThis example assumes that this target directory has the default name `stencil`\n\n`cd stencil` \n\nWithin that directory, install (or reinstall) the `stencil-utils` module to ensure that all your dependencies are up to date:`npm install` Then execute the following command to complete installation: `jspm install`'}]}]}
</div>

<a href='#downloading_next-steps' aria-hidden='true' class='block-anchor'  id='downloading_next-steps'></a>

## Next Steps

To authorize, initialize, and launch your theme, follow the steps in [Launching Stencil](/stencil-docs/getting-started/launching-stencil) section.

Later, when you are ready to upload your customized theme to a store, you should follow the zipping and uploading instructions in Bundling and Submitting a Theme and Troubleshooting Theme Uploads.


<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">
    
<!-- theme: warning -->

### BitBucket Reauthentication 
> There is no way to re-display this pop-up after selecting Done, so be sure to securely store the credentials before leaving this screen.

</div>
</div>
</div>

