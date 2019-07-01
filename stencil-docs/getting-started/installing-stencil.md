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



<a href='#installing_prerequisites' aria-hidden='true' class='block-anchor'  id='installing_prerequisites'></a>

## Prerequisites by OS

<div class="tab-block">
    {'children': [{'title': ' Mac OS Prerequisites', 'blocks': [{'type': 'html', 'data': '<h1>Mac OS Prerequisites</h1>'}, {'type': 'callout', 'data': {'body': 'These instructions have been tested on Mac OS X Yosemite. Dependencies for other platforms will be added upon further testing.', 'title': 'Platform Support'}}, {'type': 'text', 'data': '## Installing Xcode \n\nYou must install the [Xcode development tools](https://developer.apple.com/xcode/) (latest stable version).', 'header': {'anchor': 'mac_xcode'}}, {'type': 'text', 'data': '---'}, {'type': 'text', 'data': '## Node.js \n\nStencil requires the <a href="https://nodejs.org/">Node.js</a> runtime environment, version <a href="https://nodejs.org/en/blog/release/">8.x</a>.\n\nWe recommend that you install or update Node.js using <a href="https://github.com/creationix/nvm#installation">nvm</a>. First install nvm, version <a href="https://github.com/creationix/nvm/tree/v0.31.0">0.31.0</a>, as follows:\n\n```\ncurl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash\n```\n\nNext, explicitly install a supported Node.js version, using this convention:<br>\n\n```\nnvm install 8\n```', 'header': {'anchor': 'mac_nodejs'}}, {'type': 'text', 'data': '---'}, {'type': 'text', 'data': '## Troubleshooting\n\nIf you run into any problems with Stencil installation or launch, please first see our [Troubleshooting Your Setup](https://developer.bigcommerce.com/stencil-docs/getting-started/running-stencil-locally/troubleshooting-your-setup) page. Next, please consult our Support resources, which include community/peer support via [BigCommerce Developer Community](https://support.bigcommerce.com/s/group/0F913000000HLjECAW/bigcommerce-developers) and [Stack Overflow](https://stackoverflow.com/questions/tagged/bigcommerce) forums.', 'header': {'anchor': 'mac_troubleshooting'}}]}, {'title': 'Linux Prerequisites', 'blocks': [{'type': 'html', 'data': '<h1>Linux Prerequisites</h1>'}, {'type': 'callout', 'data': {'body': 'These instructions have been tested on Linux/Ubuntu v.14.04.4. ', 'title': 'Platform Support'}}, {'type': 'text', 'data': '## Node.js 6.x+\n\nStencil requires **Node.js** version **6.x** or later<sup>1</sup>.\n\nWe recommend that you install or update Node.js using `nvm` as follows:', 'header': {'anchor': 'linux_nodejs'}}, {'type': 'code', 'data': '## update package list\nsudo apt-get update\n\n## install node and npm\nsudo apt-get install nodejs npm\n\n# download nvm install.sh and run with bash\ncurl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash\n\n# explicitly install a supported Node.js version\nnvm install 6.4.0\n\n# double check the installed node version:\nnodejs --version', 'config': {'mode': 'shell'}}, {'type': 'callout', 'data': {'body': '1. We have tested Stencil on Node.js versions **6.10.3** to **7.9.0**'}}, {'type': 'text', 'data': '---'}, {'type': 'text', 'data': '## Other Dependencies\n\nDepending on the distro, you may also need to install the following dependencies:\n* g++\n* [libsass](https://sass-lang.com/libsass)'}, {'type': 'text', 'data': '---'}, {'type': 'text', 'data': '## Troubleshooting\n\nIf you run into any problems with Stencil installation or launch, please first see our [Troubleshooting Your Setup](https://developer.bigcommerce.com/stencil-docs/getting-started/running-stencil-locally/troubleshooting-your-setup) page. Next, please consult our Support resources, which include community/peer support via [BigCommerce Developer Community](https://support.bigcommerce.com/s/group/0F913000000HLjECAW/bigcommerce-developers) and [Stack Overflow](https://stackoverflow.com/questions/tagged/bigcommerce) forums.', 'header': {'anchor': 'linux_troubleshooting'}}]}, {'title': 'Windows Prerequisites', 'blocks': [{'type': 'html', 'data': '<h1>Windows Prerequisites</h1>'}, {'type': 'callout', 'data': {'body': 'The following instructions have been tested on Windows 10. Dependencies for other platforms will be added upon further testing.', 'title': 'Platform Support'}}, {'type': 'text', 'data': '## Root Permissions\n\nYou must have authorization to run Powershell "as administrator" on your machine.', 'header': {'anchor': 'windows_root-permissions'}}, {'type': 'text', 'data': '---'}, {'type': 'text', 'data': '## Git Client and Git BASH\n\nYou must have a Git client installed. The Git for Windows distribution includes a Git client, and also provides the Git BASH emulator for command-line access. All commands should be run in Git Bash from here.', 'header': {'anchor': 'windows_git-client'}}, {'type': 'text', 'data': '---'}, {'type': 'text', 'data': "## Python Installation\n\nInstall [Python 2.7.x for Windows](https://www.python.org/downloads/windows/). This is required for Visual Studio's Windows Build Tools, installed below. **Python 3.x is not supported.**\n\nIn the installer dialog shown below, change the bottom default, so as to enable the `Add python.exe to Path` option. This provides global command-line access to Python.", 'header': {'anchor': 'windows_python-installation'}}, {'type': 'image', 'data': '//s3.amazonaws.com/user-content.stoplight.io/6116/1539115629012'}, {'type': 'text', 'data': '---'}, {'type': 'text', 'data': '## Node.js Installation\n\nStencil requires the [Node.js](https://nodejs.org/en/) runtime environment, version 6.x or later.\n\nOn Windows, we have tested Stencil CLI on selected Node.js version [7.10.0](https://nodejs.org/en/blog/release/v7.10.0/7.10.0). We recommend that you install only an LTS ("Long-Term Support"/"Mature and Dependable") version, and that you download that version\'s `.msi` installer (not its `.exe` binary).\n\n**Note:** _You can choose to instead download the latest x.x version of Node.js from the Node.js Foundation\'s archives, using URLs of the form: [https://nodejs.org/dist/latest-v8.x/](https://nodejs.org/dist/latest-v8.x/), [https://nodejs.org/dist/latest-v8.x/](https://nodejs.org/dist/latest-v8.x/), etc. In all cases, we recommend installing only LTS ("Long-Term Support"/"Mature and Dependable") versions, and that you download the .msi installer, not the .exe binary.\nHowever, please see the restriction on technical assistance in the Notes on Dependencies below._\n\nTo verify your Node.js installation or reinstallation, this [blog post](http://blog.teamtreehouse.com/install-node-js-npm-windows) provides Windows-specific tips and tests.', 'header': {'anchor': 'windows_node-installation'}}, {'type': 'callout', 'data': {'body': 'You will need to restart your computer to complete Node.js installation.', 'type': 'warning', 'title': 'Restart Required'}}, {'type': 'text', 'data': '## Python/Node Configuration\n\nAfter installing both Python and Node.js, configure Python within the Node.js runtime environment by running this npm command:\n\n`npm config set python python2.7`', 'header': {'anchor': 'windows_python-node-config'}}, {'type': 'callout', 'data': {'body': 'The [node package manager](https://www.npmjs.com/) was installed as part of Node.js. As you proceed through Stencil CLI setup (and later refreshes), you will use this command-line utility to install packages/modules, and to configure and manage dependencies and their versions.', 'title': 'About Node Package Manager (npm)'}}, {'type': 'text', 'data': '## C++ Compiler Options\n\nChoose to either install Turbo C++ or Visual Studio for your C++ Compiler.\n\n### Turbo C++\n\nYou can install Turbo C++ as a lighter version instead of Visual Studio. The installation takes about 5 minutes. After installation, a box opens that highlights the features of Turbo C++. This box can be closed since it is not needed to complete installation. If you prefer using Visual Studio then use the steps below.\n\n### Visual Studio Installation\nInstall MicroSoft Visual Studio. Stencil requires a 2013 or later release, Community Edition (free) or higher.\n\nBe sure to install Visual Studio\'s "Common Tools" component. You can also add this component later in the window shown below.\n\n### Visual Studio Version/Node Configuration\nFinally, configure Visual Studio within the Node.js runtime environment by running the following npm command.\n(Replace the 2015 parameter with 2013 or 2017, as needed, to match the Visual Studio release you have installed:)\n\n`npm config set msvs_version 2015`\n', 'header': {'anchor': 'windows_compiler-options'}}, {'type': 'callout', 'data': {'title': 'Notes on Dependencies', 'body': "While alternate versions might also support Stencil, BigCommerce does not offer technical assistance on substitutions for, or customized versions of, the tested dependencies listed here.\n\nOnce Stencil is fully installed, you can check dependencies' installed versions by examining your `<theme-name>/package.jsonfile`."}}, {'type': 'text', 'data': '## Troubleshooting\n\nIf you run into any problems with Stencil installation or launch, please first see our [Troubleshooting Your Setup](https://developer.bigcommerce.com/stencil-docs/getting-started/running-stencil-locally/troubleshooting-your-setup) page. Next, please consult our Support resources, which include community/peer support via [BigCommerce Developer Community](https://support.bigcommerce.com/s/group/0F913000000HLjECAW/bigcommerce-developers) and [Stack Overflow](https://stackoverflow.com/questions/tagged/bigcommerce) forums.', 'header': {'anchor': 'windows_troubleshooting'}}]}]}
</div>



<a href='#installing_installing-the-stencil-cli' aria-hidden='true' class='block-anchor'  id='installing_installing-the-stencil-cli'></a>

## Install Stencil CLI

In your terminal (git bash recommended for Windows), use `npm` to install the Stencil CLI:

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
> There is no way to re-display this pop-up after selecting Done, so be sure to securely store the credentials before leaving this screen.

</div>
</div>
</div>



<a href='#installing_cloning-cornerstone' aria-hidden='true' class='block-anchor'  id='installing_cloning-cornerstone'></a>

## Cloning Cornerstone Repo

In your terminal, `cd` to the directory you would like to use for working on themes, then clone the cornerstone repo:

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
> There is no way to re-display this pop-up after selecting Done, so be sure to securely store the credentials before leaving this screen.

</div>
</div>
</div>



<a href='#installing_installing-stencils-js-utilities' aria-hidden='true' class='block-anchor'  id='installing_installing-stencils-js-utilities'></a>

## Installing Stencil CLI JS Dependencies

Before we can start using Stencil, we need to install some `npm` modules to leverage the Stencil event framework. To do so, `cd` into the cornerstone repo and run `npm install`:

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



<a href='#installing_video-demo' aria-hidden='true' class='block-anchor'  id='installing_video-demo'></a>

## Video Demo

Watch a brief demonstration of the Stencil installation and launch:

<iframe width="560" height="315" src="https://www.youtube.com/embed/iWBrJalyM0A" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

