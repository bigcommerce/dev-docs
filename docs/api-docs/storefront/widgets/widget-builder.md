# Widget Builder

<div class="otp" id="no-index">

### On this page
- [Prerequisites](#prerequisites)
- [Install Widget Builder](#install-widget-builder)
- [Configure Widget Builder](#configure-widget-builder)
- [Reset or create parallel configurations](#reset-or-create-parallel-configurations)
- [Generate a scaffold with `create`](#generate-a-scaffold-with-create)
- [Continue development with `start`](#continue-development-with-start)
- [Publish to store](#publish-to-store)
- [Resources](#resources)

</div>

Widget Builder is a command-line tool that lets you build, edit, and preview custom storefront widgets in real time, outside the context of your BigCommerce store.

This article is a guide to help you learn how to use Widget Builder. 

## Prerequisites

* Node.js 14
* [npm](https://www.npmjs.com/) 6.14
* A BigCommerce [store](https://support.bigcommerce.com/s/article/Starting-a-Bigcommerce-Trial) or [sandbox store](https://developer.bigcommerce.com/api-docs/partner/getting-started/create-a-sandbox-store).
* API `access_token` with `content modify` scope. For information on how to generate store API credentials, see [Obtaining store API credentials](https://developer.bigcommerce.com/api-docs/getting-started/authentication/rest-api-authentication#obtaining-store-api-credentials).


<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

<!-- theme: info -->

> Refer to the [Widget Builder README.md](https://github.com/bigcommerce/widget-builder) for the latest supported `node` version.

</div>
</div>
</div>

## Install Widget Builder

Follow these instructions to install Widget Builder and its dependencies. 

1. In a terminal, clone the [widget-builder](https://github.com/bigcommerce/widget-builder) GitHub repo.

2. Navigate to the `widget-builder` directory and install Widget Builder.

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

## Configure Widget Builder

Once you have installed Widget Builder, the next step is to set up the widget development environment for your store.  This configuration will authorize you to access your store's data during the development process. You will need the store's `Client ID`, `Access Token`, and `API Path` to configure the environment. 

To get started, locate or create a parent directory for the widgets you plan to develop using these credentials.

**Sample input:**

```shell
# organized by name of store  
cd ~/bc-projects/tools-r-us
mkdir widget-workshop
cd widget-workshop
```

Next, start the interactive sequence that will generate a `.env` file to authenticate the widgets you build in the subfolders of this parent directory.  The session will prompt you to enter your API account credentials. Begin by running `widget-builder init`. 

**Sample session:**

```shell
~/bc-projects/tools-r-us/widget-workshop % widget-builder init

Thank you for using Widget Builder

            
This guide will help you get your environment set up.

Before continuing, please make sure you've created or received a Store API account.
You'll need those credentials in order to generate the appropriate configurations.
You can find more information here. https://support.bigcommerce.com/s/article/Store-API-Accounts#creating

? Are you ready to continue? You may press any key to continue (Y/n) Yes
? What is the Client ID? xxxxxxxxxxxxx
? What is the Access Token? xxxxxxxxxxxxx
? What is the API Path? https://api.bigcommerce.com/stores/xxxxx/v3/
[2021-09-08T15:12:40.271Z] Successfully created your configuration, you're all set!
```
## Reset or create parallel configurations

If you need to reset the configuration, you can run the `widget-builder init` command in the same directory to overwrite the existing assignments.  Running `widget-builder init` in a sibling directory will create a separate development environment.  

Initializing Widget Builder at multiple levels of a single file hierarchy can have unpredictable results and is not recommended.
 
 
<div class="HubBlock--callout">
<div class="CalloutBlock--warn">
<div class="HubBlock-content">

<!-- theme: warn -->

> To use Widget Builder as a development tool, you must run `widget-builder` commands from the same directory where you ran `widget-builder init`.

</div>
</div>
</div>
  
## Generate a scaffold with `create`

Jump-start widget development with Widget Builder's `create` command, which creates a child directory, populates it with blank template files, and spins up a development server.  To use the generator, run the following command:

```shell
widget-builder create [[path-to/]some-widget]
```

**Sample output:**

```shell
[2021-09-08T17:29:38.868Z] Successfully created ./some-widget 
[2021-09-08T17:29:38.870Z] Successfully created schema.json in ./some-widget/schema.json
[2021-09-08T17:29:38.871Z] Successfully created config.json in ./some-widget/config.json
[2021-09-08T17:29:38.871Z] Successfully created widget.html in ./some-widget/widget.html
[2021-09-08T17:29:39.564Z] Starting widget-builder at http://localhost:8080!
[2021-09-08T17:29:39.887Z] Socket connected.
```

Your default browser should open automatically and display a text widget on port 8080.

## Continue development with `start`

To spin up the development server for any existing widget, first ensure that it is located in a child directory of the root where you configured the corresponding environment.  Navigate to that environment root, then run the following command:

```shell
widget-builder start [[path-to/]widget-name]
```
**Sample output:**

```shell
[2021-09-08T17:29:39.564Z] Starting widget-builder at http://localhost:8080!
[2021-09-08T17:29:39.887Z] Socket connected.
```

Your default browser should open automatically on port 8080.

## Publish to store

To publish a widget to your BigCommerce store, navigate to its environment root, then run the following command:

```shell
widget-builder publish [[path/to/]widget-name]
```

If you're interested in making your widgets available for download or sale on other stores, check out the [BigCommerce App Marketplace](https://www.bigcommerce.com/apps/toolswidgets/) and learn about [becoming a partner developer](https://developer.bigcommerce.com/api-docs/partner/becoming-a-partner).

## Resources

* [Authenticating BigCommerce's REST APIs](https://developer.bigcommerce.com/api-docs/getting-started/authentication/rest-api-authentication)
* [Widgets API Overview](https://developer.bigcommerce.com/api-docs/store-management/widgets/overview)
* [Widget Builder GitHub repository](https://github.com/bigcommerce/widget-builder)
* [Widgets on the App Marketplace](https://www.bigcommerce.com/apps/toolswidgets/)
* [Becoming a Partner Developer](https://developer.bigcommerce.com/api-docs/partner/becoming-a-partner)
