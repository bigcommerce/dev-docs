<h1>Installing Stencil</h1>
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#installing_prerequisites">Prerequisites by OS</a></li>
    <li><a href="#installing_installing-the-stencil-cli">Installing the Stencil CLI</a></li>
    <li><a href="#installing_cloning-cornerstone">Cloning the Cornerstone Repo</a></li>
    <li><a href="#installing_installing-stencils-js-utilities">Installing Stencil's JS Utilities</a></li>
    <li><a href="#installing_video-demo">Video Demo</a></li>
	</ul>
</div>

The Stencil CLI enables developers to locally develop and customize on any Stencil theme with no impact to a merchant’s live storefront during the development process. When developing locally, you will have access to real-time Browsersync preview and testing across desktop, mobile, and tablet devices/viewports. This article contains detailed instructions on installing Stencil CLI on Mac, Windows, and Linux.

### Prerequisites

You will need to have an authentication token to use the Stencil CLI. See Getting API Credentials in [Authentication](https://developer.bigcommerce.com/api-docs/getting-started/authentication#authentication_getting-api-credentials) in our API Docs to learn how to obtain an API Token.

Each OS has different prerequisites. Be sure to check the correct tab in the [Prerequisites by OS](#installing_prerequisites) (Mac OS, Linux, or Windows) section before attempting installation.

---

<a href='#installing_prerequisites' aria-hidden='true' class='block-anchor'  id='installing_prerequisites'><i aria-hidden='true' class='linkify icon'></i></a>

## Prerequisites by OS

Each OS has different prerequisites that need to be fulfilled before installing the Stencil CLI. Check the correct subsection below before attempting installation. 
* [Mac OS](#mac)
* [Linux](#linux)
* [Windows](#windows)


<a name="mac"></a>

### Mac OS

These instructions have been tested on Mac OS X Yosemite. Dependencies for other platforms will be added upon further testing.

1. Install [Xcode Development tools](https://developer.apple.com/xcode/) (latest stable version).

2. Install Node.js 6.x+.
* Stencil requires the [Node.js](https://nodejs.org/) runtime environment, version [6.x or later](https://nodejs.org/en/blog/release/).  We have tested Stencil on selected Node.js versions, from [6.10.3](https://nodejs.org/en/blog/release/v6.10.3/) to [7.9.0](https://nodejs.org/en/blog/release/v7.9.0/). 
* We recommend that you install or update Node.js using [nvm](https://github.com/creationix/nvm#installation). First install nvm, version [0.31.0](https://github.com/creationix/nvm/tree/v0.31.0), as follows:

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash
```

Next, explicitly install a supported Node.js version:

```
nvm install 6.4.0
```

<a name="linux"></a>

### Linux

These instructions have been tested on Linux/Ubuntu v.14.04.4.

_You should have administrator/root permissions on your machine. If not, you may need to precede some of the below commands with the `sudo` prefix._

1. Install a [Git Client](https://git-scm.com/downloads)

2. Install Node.js 8.x+

* Stencil requires  **Node.js**  version  **8.x**  or later.

* We recommend that you install or update Node.js using `nvm` as follows:

```shell
## update package list
sudo apt-get update

## install node and npm
sudo apt-get install nodejs npm

# download nvm install.sh and run with bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash

# explicitly install a supported Node.js version
nvm install 6.4.0

# double check the installed node version:
nodejs --version
```


3. Install Other Dependencies (if necessary)

* Depending on the distro, you may also need to install the following dependencies:

	* [g++](https://courses.cs.washington.edu/courses/cse373/99au/unix/g++.html)
	* [libsass](https://sass-lang.com/libsass)


<a name="windows"></a>

### Windows

The following instructions have been tested on Windows 10. Dependencies for other platforms will be added upon further testing.

_You must have authorization to run Powershell “as administrator” on your machine._

1. Install a [Git Client](https://git-scm.com/downloads)

* You must have a Git client installed. The Git for Windows distribution includes a Git client, and also provides the Git BASH emulator for command-line access. All commands should be run in Git Bash from here.

2. Install [Python 2.7.x for Windows](https://www.python.org/downloads/windows/). 

* This is required for Visual Studio’s Windows Build Tools, installed below. **Python 3.x is nsot supported.**

* In the installer dialog (shown below), change the bottom default to enable the `Add python.exe to Path` option. This provides global command-line access to Python.

![Python Installer Windows](https://s3.amazonaws.com/user-content.stoplight.io/6116/1539115629012 "Python Installer Windows")

3. Install Node.js 8.x+.


* We recommend that you install only an LTS (“Long-Term Support”/“Mature and Dependable”) version, and that you download that version’s `.msi` installer (not its `.exe` binary).

* You can choose to instead download the latest x.x version of Node.js from the Node.js Foundation’s archives, using URLs of the form: https://nodejs.org/dist/latest-v8.x/, https://nodejs.org/dist/latest-v8.x/, etc. 

* To verify your Node.js installation or reinstallation, the article [How to Install Node.js and NPM Windows](https://blog.teamtreehouse.com/install-node-js-npm-windows) (Treehouse) provides Windows-specific tips and tests.

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">
    
<!-- theme: {{callout_type}} -->

### Restart Required
> You will need to restart your computer to complete Node.js installation.

</div>
</div>
</div>

4. Configure Python within the Node.js runtime environment by running this npm command:

`npm config set python python2.7`

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">
    
<!-- theme: {{callout_type}} -->

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
<div class="CalloutBlock--info">
<div class="HubBlock-content">
    
<!-- theme: {{callout_type}} -->

### Notes on Dependencies
> While alternate versions might also support Stencil, BigCommerce does not offer technical assistance on substitutions for, or customized versions of, the tested dependencies listed here.

> Once Stencil is fully installed, you can check dependencies’ installed versions by examining your <theme-name>/package.jsonfile.

</div>
</div>
</div>

### Troubleshooting

If you run into any problems with Stencil installation or launch, first consult [Troubleshooting Your Setup](/stencil-docs/getting-started/launching-stencil/troubleshooting-your-setup). 

If that does not resolve your issue, consult our [Support resources](https://support.bigcommerce.com/s/), which include community and peer support via [BigCommerce Developer Community](https://support.bigcommerce.com/s/group/0F913000000HLjECAW/bigcommerce-developers) and [Stack Overflow](https://stackoverflow.com/questions/tagged/bigcommerce) forums.

---

<a href='#installing_installing-the-stencil-cli' aria-hidden='true' class='block-anchor'  id='installing_installing-the-stencil-cli'><i aria-hidden='true' class='linkify icon'></i></a>

## Install Stencil CLI

In your terminal (git bash recommended for Windows), use `npm` to install the Stencil CLI:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name"></div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: ""
subtitle: ""
lineNumbers: true
-->

```shell
npm install -g @bigcommerce/stencil-cli
```

### Items to Note

* The command above requires <a href="https://www.npmjs.com/">npm</a> to be installed in your local development environment.

* In Windows, this `npm` command's execution might at times appear to freeze. However, the installer is running. 
Give it several minutes to complete installation.

* On Mac OS machines with installed xcode, version 5.x, this `npm` command has generated errors of the form: 
`npm ERR! invalid: string_decoder`. The workaround is to upgrade xcode to the latest stable xcode version 
(7.3.1 as of this page's last revision). 

* If you receive a file-permissions error, and you did not install Node.js via <a href="https://github.com/creationix/nvm#installation">nvm</a> (Node Version Manager), 
then either install nvm now, or follow one of the workarounds on [this external page](https://docs.npmjs.com/getting-started/fixing-npm-permissions).

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

<a href='#installing_cloning-cornerstone' aria-hidden='true' class='block-anchor'  id='installing_cloning-cornerstone'><i aria-hidden='true' class='linkify icon'></i></a>

## Cloning Cornerstone Repo

In your terminal, `cd` to the directory you would like to use for working on themes, then clone the cornerstone repo:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name"></div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: ""
subtitle: ""
lineNumbers: true
-->

```shell
git clone git://github.com/bigcommerce/cornerstone.git
```

In the next step, we'll install Stencil's [JavaScript utilities](/stencil-docs/getting-started/installing-stencil#installing_installing-stencils-js-utilities) to enable API access via Ajax.

<div class="HubBlock--callout">
<div class="CalloutBlock--error">
<div class="HubBlock-content">
    
<!-- theme: error -->

### Back Up before Reinstalling
> If you are reinstalling over a base theme on which you have already begun development, first back up your theme's `.stencil` file. This contains your store URL, BigCommerce username and access tokens, and other basic settings. Preserving those settings will speed up initializing and launching the new version. If you would like to allow for complete rollback, back up your entire theme's directory.

</div>
</div>
</div>

---

<a href='#installing_installing-stencils-js-utilities' aria-hidden='true' class='block-anchor'  id='installing_installing-stencils-js-utilities'><i aria-hidden='true' class='linkify icon'></i></a>

## Installing Stencil CLI JS Dependencies

Before we can start using Stencil, we need to install some `npm` modules to leverage the Stencil event framework. To do so, `cd` into the cornerstone repo and run `npm install`:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name"></div>
    </div><div class="HubBlock-header-subtitle">Terminal</div>
</div>

<!--
title: ""
subtitle: "Terminal"
lineNumbers: true
-->

```shell
cd cornerstone # move into cornerstone repo you just cloned

npm install # install dependencies with node package manager
```

Now that your installation is complete, you can move on to [preparing your store/tokens](/stencil-docs/getting-started/authentication-and-tokens)

---

<a href='#installing_video-demo' aria-hidden='true' class='block-anchor'  id='installing_video-demo'><i aria-hidden='true' class='linkify icon'></i></a>

## Video Demo

Watch a brief demonstration of the Stencil installation and launch:

<iframe width="560" height="315" src="https://www.youtube.com/embed/iWBrJalyM0A" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

