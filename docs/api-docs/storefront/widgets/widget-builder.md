# Widget Builder CLI

Widget Builder CLI is a powerful tool that lets you see a real-time preview of a widget outside the context of a store while it is being developed.

This article contains detailed instructions on how to install and configure Widget Builder CLI. 

## Prerequisites

* Node.js 14
* npm 6.14
* [A BigCommerce store](https://support.bigcommerce.com/s/article/Starting-a-Bigcommerce-Trial).
* API `access_token` with `content modify` scope.
* Knowledge of the [Widgets API](https://developer.bigcommerce.com/api-docs/storefront/widgets/widgets-overview).

## Installing on Mac

To install Widget Builder CLI on a Mac, open the terminal and follow the steps outlined in this section. 

1. Clone the [widget-builder](https://github.com/bigcommerce/widget-builder) GitHub repo.

2. Open the `widget-builder` directory and run the following command to install the Widget Builder CLI:

```shell
npm run install-cli
```

3. Once the installation is complete, you can retrieve usage information by running `widget-builder -h`. It will return a list of supported options and commands.

**Sample output**
`Usage: widget-builder [options] [command]`