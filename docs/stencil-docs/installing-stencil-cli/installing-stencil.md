# Installing Stencil CLI

<div class="otp" id="no-index">

### On this page
- [Installing on Mac](#installing-on-mac)
- [Installing on Windows](#installing-on-windows)
- [Installing on Linux](#installing-on-linux)
- [Live previewing a theme](#live-previewing-a-theme)
- [Resources](#resources)

</div>

Stencil CLI gives developers the power to locally edit and preview themes with no impact to a merchant’s live storefront, and it's built-in [Browsersync](https://github.com/bigcommerce/browser-sync) capabilities make simultaneous testing across desktop, mobile, and tablet devices a breeze. Once work is complete, developers can push themes to BigCommerce storefronts (and set them live) using Stencil CLI's simple, yet powerful commands.

This article contains the detailed instructions needed to install and configure Stencil CLI -- the first step to developing themes on the BigCommerce platform.

## Installing on Mac

To install Stencil CLI and it's dependencies on Mac, open a terminal and run the following commands:

```shell
# Install Node Version Manager (nvm)
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash

# Install Stencil CLI supported version of Node.js
nvm install 10.16

# Switch to Stencil CLI supported version of Node.js:
nvm use 10.16

# Install Stencil CLI
npm install -g @bigcommerce/stencil-cli
```

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

<!-- theme: info -->

> These instructions have been tested on **Mac OS X Yosemite**.

</div>
</div>
</div>

## Installing on Windows
There's two methods for installing Stencil CLI and its dependencies on Windows.

### Method 1: Install Dependencies Using Chocolatey
If you're not comfortable manually installing and configuring Python and Node.js on Windows, or if you prefer an easy installation option, use the [Chocolatey package manager](https://chocolatey.org/) to install Stencil CLI's dependencies. To do so, [open PowerShell](https://docs.microsoft.com/en-us/powershell/scripting/getting-started/starting-windows-powershell?view=powershell-6) as an administrator, and run the following commands:
```shell
 # Install Chocolatey
iex ((New-Object System.Net.WebClient).DownloadString("https://chocolatey.org/install.ps1"))

# Install git if you don't have it
choco install git

# Install nvm-windows and stencil compatible node.js
choco install nvm; nvm install 10.16; nvm use 10.16

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

### Execution policy errors
> If you receive an execution policy error while attempting to install chocolatey, refer to [Microsoft's Documentation](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.security/set-executionpolicy?view=powershell-6) and/or consult with your organization's system administrator to determine the appropriate course of action.
>
### Chocolatey installation alternatives
> For additional information on installing Chocolatey and alternative installation options, see [the installation page on chocolatey.org](https://chocolatey.org/install).

</div>
</div>
</div>

### Method 2: install dependencies manually
If you're a pro at installing and configuring Python and Node.js environments on Windows, feel free to install the required dependencies using your preferred method.

**Required Dependencies:**
* [Git](https://git-scm.com/downloads) - required to run npm install
* [Python 2.7.x](https://www.python.org/downloads/) - required to build some dependencies
* [Node.js 10.16 and npm](https://nodejs.org/en/download/releases/) - later versions not currently supported on Windows
* [Visual C++ Build Tools 2015](https://www.npmjs.com/package/windows-build-tools) - required to compile some dependencies

Once they're installed and configured, use `npm` to install Stencil CLI:

```shell
npm install -g @bigcommerce/stencil-cli
```

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

<!-- theme: info -->

> These instructions have been tested successfully on **Windows 10**.

</div>
</div>
</div>

## Installing on Linux

To install Stencil CLI and dependencies on debian-based distros, open a terminal and run the following commands:

```shell
## Update package list, then install node and npm
sudo apt-get update && sudo apt-get install nodejs npm

# Download nvm install.sh and run with bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash

# reload .bashrc so nvm command works
source ~/.bashrc

# Explicitly install supported node version
nvm install 10.16

# Install Stencil CLI
npm install -g @bigcommerce/stencil-cli
```

**Depending on the distro, you may also need to install:**
* g++
* [libsass](https://sass-lang.com/libsass)

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

<!-- theme: info -->

> These instructions have been tested on **Ubuntu 18.04**.

</div>
</div>
</div>

## Live previewing a theme

Once you've installed Stencil CLI, the next step on the road to theme development is downloading a theme to edit and previewing live changes using Stencil CLI's powerful Browsersync functionality. For detailed instructions on doing so, see [Live Previewing a Theme](https://developer.bigcommerce.com/stencil-docs/installing-stencil-cli/live-previewing-a-theme). Here's the gist:


```shell
# move into theme dir
cd ~/path/to/theme/dir

# initialize a new .stencil config for the theme
stencil init

# install theme modules
npm install

# serve a live, Browsersync enabled preview of the theme
stencil start
```

## Resources

### Additional resources
* [Demonstration of Stencil Installation and Launch](https://www.youtube.com/watch/iWBrJalyM0A) (Youtube)
