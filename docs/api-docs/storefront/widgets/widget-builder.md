# Widget Builder CLI

<div class="otp" id="no-index">

### On this page
- [Prerequisites](#prerequisites)
- [Installing Widget Builder CLI](#installing-widget-builder-cli)
- [Configuring Widget Builder CLI](#configuring-widget-builder-cli)
- [Building widgets](#building-widgets)
- [Publishing to store](#publishing-to-store)
- [Resources](#resources)

</div>

The Widget Builder Command Line Interface (**CLI**) is a command-line tool that lets you build, edit, and preview custom storefront widgets in real-time outside the context of your BigCommerce store.

This article contains detailed instructions on how to get started with the Widget Builder CLI. 

## Prerequisites

* Node.js 14
* npm 6.14
* [A BigCommerce store](https://support.bigcommerce.com/s/article/Starting-a-Bigcommerce-Trial).
* API `access_token` with `content modify` scope. For information on how to generate store API credentials, see [Obtaining store API credentials](https://developer.bigcommerce.com/api-docs/getting-started/authentication/rest-api-authentication#obtaining-store-api-credentials).

## Installing the Widget Builder CLI

Follow these instructions to install the Widget Builder CLI and its dependencies. 

1. In a terminal, clone the [widget-builder](https://github.com/bigcommerce/widget-builder) GitHub repo.

2. Navigate to the `widget-builder` directory and install the Widget Builder CLI.

```shell
npm run install-cli
```

3. To retrieve usage information and view supported options and commands, run the following command:

```shell
widget-builder -h
```

**Sample output:**

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

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

<!-- theme: info -->

> Refer to [Widget Builder README.MD](https://github.com/bigcommerce/widget-builder) for the latest supported `node` version.

</div>
</div>
</div>

## Configuring the Widget Builder CLI

Once you have installed the Widget Builder CLI, the next step is to set up your store's environment. You will need the store's Client ID, Access Token, and API Path to generate appropriate configurations. 

To get started, run the following command:

```shell
widget-builder init
```

When prompted, enter your API account credentials. This will create the `.env` file with the necessary parameter assignments.

**Sample output:**

```shell
Thank you for using Widget Builder

            
This guide will help you get your environment set up.

Before continuing, please make sure you've created or received a Store API account.
You'll need those credentials in order to generate the appropriate configurations.
You can find more information here. https://support.bigcommerce.com/s/article/Store-API-Accounts#creating

? Are you ready to continue? You may press any key to continue Yes
? What is the Client ID? xxxxxxxxxxxxx
? What is the Access Token? xxxxxxxxxxxxx
? What is the API Path? https://api.bigcommerce.com/stores/xxxxx/v3/
[2021-09-08T15:12:40.271Z] Successfully created your configuration, you're all set!
```
### Resetting configurations

If you need to reset the configurations, run the `widget-builder init` command to overwrite the existing assignments.

## Building widgets

To start Widget Builder locally, open the directory containing your widget template files and run the following command:

```shell
widget-builder start [path to widget template]
```
Your default browser should open automatically on port 8080.

### Starter template

To jump start widget development, the Widget Builder CLI provides a blank template with the appropriate files needed to start building widgets. To use the starter template, run the following command:

```shell
widget-builder create [widget template name]
```

**Sample output:**

```shell
[2021-09-08T17:29:38.868Z] Successfully created ./test-widget-one 
[2021-09-08T17:29:38.870Z] Successfully created schema.json in ./test-widget-one/schema.json
[2021-09-08T17:29:38.871Z] Successfully created config.json in ./test-widget-one/config.json
[2021-09-08T17:29:38.871Z] Successfully created widget.html in ./test-widget-one/widget.html
[2021-09-08T17:29:39.564Z] Starting widget-builder at http://localhost:8080!
[2021-09-08T17:29:39.887Z] Socket connected.
```

Your default browser should open automatically and display a text widget on port 8080.

## Publishing to store

To publish a widget to your BigCommerce store, run the following command:

```shell
widget-builder publish [path to widget template]
```

## Resources

* [Authenticating BigCommerce's REST APIs](https://developer.bigcommerce.com/api-docs/getting-started/authentication/rest-api-authentication)
* [Widgets API Overview](https://developer.bigcommerce.com/api-docs/store-management/widgets/overview)
* [Widget Builder GitHub repository](https://github.com/bigcommerce/widget-builder)
