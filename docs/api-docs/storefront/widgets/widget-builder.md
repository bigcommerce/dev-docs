# Widget Builder



Widget Builder is a command-line tool that lets you build, edit, and preview custom storefront widgets in real time, outside the context of your BigCommerce store.

This article is a guide to help you learn how to use Widget Builder. 

## Prerequisites

* Node.js 14
* [npm](https://www.npmjs.com/) 6.14
* A BigCommerce [store](https://support.bigcommerce.com/s/article/Starting-a-Bigcommerce-Trial) or [sandbox store](/api-docs/partner/getting-started/create-a-sandbox-store).
* Store API OAuth credentials for `content` resources with scope `modify`. For information on how to generate store API credentials, see [Obtaining store API credentials](/api-docs/getting-started/authentication/rest-api-authentication#obtaining-store-api-credentials).

<!-- theme: warning -->
> Because the OAuth scope of these API credentials permits you to modify store content, we strongly recommend that you develop widgets using a [sandbox store](/api-docs/partner/getting-started/create-a-sandbox-store).



For more information on OAuth Scopes and authentication, see [Authentication](/api-docs/getting-started/authentication).

## Install Widget Builder

To install Widget Builder and its dependencies, follow these instructions: 

1. Open a terminal, and verify that you are using supported versions of Node.js and `npm`.

<!-- theme: info -->
> Refer to the [Widget Builder README.md](https://github.com/bigcommerce/widget-builder) for the latest supported Node.js and `npm` versions.



2. Clone the [widget-builder](https://github.com/bigcommerce/widget-builder) GitHub repository.

3. Navigate to the `widget-builder` directory, and install Widget Builder using the following command:

```shell
npm run install-cli
```

To retrieve usage information and view supported options and commands, run the following command:

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

Once you have installed Widget Builder, the next step is to configure your development environment with your store's authentication credentials so that you can work with your store's data during the development process. You'll need the store's `Client ID`, `Access Token`, and `API Path`. To configure the environment, follow these instructions:

1. Locate or create a parent directory for the widgets you plan to develop using these credentials.

**Sample input:**

```shell
# organized by name of store 
cd ~/bc-projects/tools-r-us
mkdir widget-workshop
cd widget-workshop
```

2. Run the interactive sequence that generates the configuration file. The session will prompt you to enter your API account credentials. Begin by running `widget-builder init`. 

**Sample session:**

```shell
~/bc-projects/tools-r-us/widget-workshop % widget-builder init

Thank you for using Widget Builder

            
This guide will help you get your environment set up.

Before continuing, please make sure you've created or received a Store API account.
You'll need those credentials in order to generate the appropriate configurations.
You can find more information here. https://support.bigcommerce.com/s/article/Store-API-Accounts#creating

? Are you ready to continue? You may press any key to continue (Y/n) 
  > Y
? What is the Client ID? 
  > xxxxxxxxxxxxx
? What is the Access Token? 
  > xxxxxxxxxxxxx
? What is the API Path? 
  > xxxxxxxxxxxxx
[2021-09-08T15:12:40.271Z] Successfully created your configuration, you're all set!
```
## Reset or create parallel configurations

If you need to reset the configuration, you can run the `widget-builder init` command in the same directory to overwrite the existing assignments. Running `widget-builder init` in a sibling directory will create a separate development environment. 

Initializing Widget Builder at multiple levels of a single file hierarchy can have unpredictable results and is not recommended.
 
 
<!-- theme: info -->
> To use Widget Builder as a development tool, you must run `widget-builder` commands from the same directory where you ran `widget-builder init`.


  
## Generate a scaffold with `create`

Jump-start widget development with Widget Builder's `create` command, which creates a child directory, populates it with blank template files, and starts a development server. To use the generator, run the following command:

```shell
widget-builder create <[path/to/]some-widget>
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

Your default browser will open automatically and display a text widget on port 8080.

## Continue development with `start`

Widget Builder's `start` command will start the development server for an existing widget that is located in a child directory of the environment root. Navigate to that environment root, then run the following command:

```shell
widget-builder start <[path/to/]widget-name>
```
**Sample output:**

```shell
[2021-09-08T17:29:39.564Z] Starting widget-builder at http://localhost:8080!
[2021-09-08T17:29:39.887Z] Socket connected.
```

Your default browser will open automatically on port 8080.

## Publish to store

To publish a widget to your BigCommerce store, navigate to its environment root, then run the following command:

```shell
widget-builder publish <[path/to/]widget-name>
```

Publishing a widget from the same path will update or overwrite your existing widget. If you have a widget with the same name currently deployed in your store, the updated widget will **immediately** replace the previous version on your live storefront.

To add published widgets to your store, open your store's control panel and navigate to **Storefront** **>** **My Themes**. Click the **Customize** button on your active theme, and locate your published widget in the **Custom** section of the left-side menu.

If you're interested in making your widgets available for download or sale on other stores, check out the [BigCommerce App Marketplace](https://www.bigcommerce.com/apps/toolswidgets/) and learn about [becoming a partner developer](/api-docs/partner/becoming-a-partner).

## Resources

* [Authenticating BigCommerce's REST APIs](/api-docs/getting-started/authentication/rest-api-authentication)
* [Widgets API Overview](/api-docs/store-management/widgets/overview)
* [Widget Builder GitHub repository](https://github.com/bigcommerce/widget-builder)
* [Widgets on the App Marketplace](https://www.bigcommerce.com/apps/toolswidgets/)
* [Becoming a Partner Developer](/api-docs/partner/becoming-a-partner)
