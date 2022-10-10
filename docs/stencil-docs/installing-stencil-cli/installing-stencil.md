# Installing Stencil CLI



Stencil CLI gives developers the power to locally edit and preview themes with no impact to a merchant’s live storefront, and it's built-in [Browsersync](https://github.com/bigcommerce/browser-sync) capabilities make simultaneous testing across desktop, mobile, and tablet devices a breeze. Once work is complete, developers can push themes to BigCommerce storefronts (and set them live) using Stencil CLI's simple, yet powerful commands.

This article contains the detailed instructions needed to install and configure Stencil CLI -- the first step to developing themes on the BigCommerce platform.

## Installing on Mac

To install Stencil CLI and its dependencies on Mac, open a terminal and run the following commands. Refer to [Stencil CLI README.MD](https://github.com/bigcommerce/stencil-cli) for latest `node` version supported.


<!-- theme: info -->
> These instructions have been tested on **Mac OS X Yosemite**.


```shell
# For ARM based macs
arch -x86_64 /bin/zsh

# Install Node Version Manager (nvm)
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash

# Install Stencil CLI supported version of Node.js
nvm install 14.20.0

# Switch to Stencil CLI supported version of Node.js:
nvm use 14.20.0

# Install Stencil CLI
npm install -g @bigcommerce/stencil-cli
```

### Installing on Mac with Apple silicon

Installing Stencil CLI and its dependencies on Macs that use Apple silicon, such as the M1 chip, requires Rosetta. Rosetta allows a Mac with Apple silicon to use apps built for a Mac with an Intel processor. The following steps will guide you through opening a Rosetta terminal and installing Stencil CLI and its dependencies.


<!-- theme: info -->
> These instructions have been tested on a **MacBook Air** with an M1 chip.


To open the Rosetta terminal:

1. Open **Finder**.
2. Go to **Applications** > **Utilities** > **Terminal**.
3. Right-click **Terminal** and select **Get Info**.
4. Check the **Open using Rosetta** checkbox.
5. Close the window and quit all terminal instances.
6. Start a new terminal, and install Rosetta if prompted.

Run the following commands:

```shell
# Install Stencil CLI supported version of Node.js
nvm install 14.20.0

# Switch to Stencil CLI supported version of Node.js
nvm use 14.20.0

# Install Stencil CLI
npm install -g @bigcommerce/stencil-cli
```

## Installing on Windows
There are two methods for installing Stencil CLI and its dependencies on Windows.


### Method 1: Install dependencies using Chocolatey
If you're not comfortable manually installing and configuring Python and Node.js on Windows, or if you prefer an easy installation option, use the [Chocolatey package manager](https://chocolatey.org/) to install Stencil CLI's dependencies. To do so, [open PowerShell](https://docs.microsoft.com/en-us/powershell/scripting/getting-started/starting-windows-powershell?view=powershell-6) as an administrator, and run the following commands:
```shell
 # Install Chocolatey
iex ((New-Object System.Net.WebClient).DownloadString("https://chocolatey.org/install.ps1"))

# Install git if you don't have it
choco install git

#####################################################################################
# Close PowerShell and re-open as admin
#####################################################################################

# Install nvm-windows and stencil compatible node.js
choco install nvm; nvm install 14.20.0; nvm use 14.20.0

# Install Windows C++ Build Tools (also installs python2)
npm install -g windows-build-tools --vs2015

# Tell npm to use python2
npm config set python python2.7

# Install Stencil CLI
npm install -g @bigcommerce/stencil-cli
```

<!-- theme: warning -->
> #### Execution policy errors
> If you receive an execution policy error while attempting to install chocolatey, refer to [Microsoft's Documentation](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.security/set-executionpolicy?view=powershell-6) and/or consult with your organization's system administrator to determine the appropriate course of action.


<!-- theme: info -->
> #### Chocolatey installation alternatives
> For additional information on installing Chocolatey and alternative installation options, see [the installation page on chocolatey.org](https://chocolatey.org/install).

### Method 2: Install dependencies manually

If you're a pro at installing and configuring Python and Node.js environments on Windows, feel free to install the required dependencies using your preferred method.

**Required Dependencies:**
* [Git](https://git-scm.com/downloads) - required to run npm install
* [Python 2.7.x](https://www.python.org/downloads/) - required to build some dependencies
* [Node.js 14 and npm](https://nodejs.org/en/download/releases/) - later versions not currently supported on Windows
* [Visual C++ Build Tools 2015](https://www.npmjs.com/package/windows-build-tools) - required to compile some dependencies

Once they're installed and configured, use `npm` to install Stencil CLI:

```shell
npm install -g @bigcommerce/stencil-cli
```

<!-- theme: info -->
> These instructions have been tested successfully on **Windows 10**.
> Refer to [Stencil CLI README.MD](https://github.com/bigcommerce/stencil-cli) for latest `node` version supported.

## Installing on Linux

To install Stencil CLI and dependencies on debian-based distros, open a terminal and run the following commands:

```shell
# Download and install nvm if you don't have it.
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.36.0/install.sh | bash

# Reload .bashrc so nvm command works
source ~/.bashrc

# Explicitly install and use supported node version
nvm install 14.20.0

nvm use 14.20.0

# Install stencil
npm install -g @bigcommerce/stencil-cli
```

**Depending on the distro, you may also need to install:**
* g++
* [libsass](https://sass-lang.com/libsass)
* git

<!-- theme: info -->
> #### Note
> * These instructions have been tested on **Ubuntu 18.04**.
> * Refer to [Stencil CLI README.MD](https://github.com/bigcommerce/stencil-cli) for latest `node` version supported.
> * Refer to [nvm](https://github.com/nvm-sh/nvm) for latest `nvm` install instructions.


## Live previewing a theme

Once you've installed Stencil CLI, the next step on the road to theme development is downloading a theme to edit and previewing live changes using Stencil CLI's powerful Browsersync functionality. For detailed instructions on doing so, see [Live Previewing a Theme](/stencil-docs/installing-stencil-cli/live-previewing-a-theme). Here's the gist:


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
## Troubleshooting

### Chocolatey install error
If you receive an error installing Chocolatey, run the following command to enable scripts on your system.

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned
```

### Visual Studio not found error
If you receive the error "Could not find VS", run the following commands:

```powershell
choco install python visualcpp-build-tools -y
npm config set msvs_version 2017 
```

### Python npm configuration error
If you receive "Error: Could not find any Python installation to use", run the following command:

```powershell
choco install python --version=2.7.2
```


## Resources

* [Dockerizing BigCommerce's Stencil CLI](https://medium.com/bigcommerce-developer-blog/dockerizing-bigcommerces-stencil-cli-f508ddc0c3c0) (medium.com)
