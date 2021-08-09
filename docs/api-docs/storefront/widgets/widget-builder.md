# Widget Builder CLI

<div class="otp" id="no-index">

### On this page
- [Prerequisites](#prerequisites)
- [Installation instructions](#installation-instructions)
- [Upgrade the widget](#upgrade-the-widget)
- [Related resources](#related-resources)

</div>

The Widget Builder Command Line Interface (**CLI**) is a command line tool that lets you build and preview widgets in real time outside the context of your store.

This article contains detailed instructions on how to install and use the Widget Builder CLI. 

## Prerequisites

* Node.js 14
* npm 6.14
* [A BigCommerce store](https://support.bigcommerce.com/s/article/Starting-a-Bigcommerce-Trial).
* API `access_token` with `content modify` scope.
* Knowledge of the [Widgets API](https://developer.bigcommerce.com/api-docs/storefront/widgets/widgets-overview).

## Installation instructions

### Installing on a Mac
To install the Widget Builder CLI and its dependencies on a Mac, open the terminal and follow the steps outlined in this section. 

1. Clone the [widget-builder](https://github.com/bigcommerce/widget-builder) GitHub repo.

2. Navigate to the `widget-builder` directory and install the Widget Builder CLI.

```shell
npm run install-cli
```

3. To ensure that the installation was successful, run the following command:

```shell
widget-builder -h
```

This will retrieve usage information and return a list of supported options and commands.

**Sample output**

```shell
Usage: widget-builder [options] [command]

Options:
  -V, --version                  output the version number
  --gen-config                   generate a config.json file
  --gen-query-params             generate a queryParams.json file
  --auto-open <flag>             open browser automatically to the builder
                                 preview (default: "true")
  -h, --help                     display help for command

Commands:
  init                           Initialization of widget builder configuration
  start [options] [widgetPath]   starts the widget builder locally
  validate [options] <file>
  create <widget-template-name>  Create a blank widget template
  publish <widget-template>      Releases the widget template to the store
                                 belonging to the env config
  help [command]                 display help for command
```