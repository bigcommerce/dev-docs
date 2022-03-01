# Stencil CLI Options and Commands



This article is a comprehensive command reference for Stencil CLI, BigCommerce's powerful theme development and deployment tool. For installation instructions for your OS, see [Installing Stencil CLI](/stencil-docs/installing-stencil-cli/installing-stencil). For more information on BigCommerce's Stencil Theme Engine, see [About Stencil](/stencil-docs/getting-started/about-stencil). Continue reading below for detailed information on each Stencil CLI command and option.

## Commands overview

The syntax to run a Stencil CLI command is as follows:

```shell title="Stencil CLI command syntax"
stencil COMMANDS [OPTIONS] <PARAMETERS>
```

Running `stencil help` outputs a full list of commands and their descriptions. For more detailed information and usage examples, click a link in the table below:

|Command                     |Description                                                                                 |
|-|--|
|[init](#stencil-init)       |Interactively creates a `.stencil` file or `secrets.stencil.json` and `config.stencil.json` files (if using Stencil V3.1 release or later), which configures how to run a BigCommerce store locally.|
|[start](#stencil-init)      |Starts up the BigCommerce storefront local development environment, using theme files in the current directory and data from the live store.                |
|[bundle](#stencil-bundle)   |Bundles up the theme into a structured `.zip` file, which can be uploaded to BigCommerce.      |
|[pull](#stencil-pull)       |Pulls the configuration from the active theme on your live store and updates your local configuration.|
|[download](#stencil-download)       |Downloads the theme files from the active theme on your live store, overwriting local files if desired.|
|[push](#stencil-push)       |Bundles the theme into `.zip` file; then directly uploads the `.zip` to BigCommerce.         |
|[release](#stencil-release) |Creates a new release in a theme's GitHub repository.                                       |
|[help](#stencil-help)       |Displays help and returns all the options available to use for the specified command.        |


![Basic Stencil CLI Options and Commands](//s3.amazonaws.com/user-content.stoplight.io/6116/1538055264839 "Basic Stencil CLI Options and Commands")

## stencil help

Displays help and returns all options available for the specified command.

```shell title="Usage: stencil help"
stencil help COMMAND
```
&nbsp;
```shell title="Example: stencil help"
~ $ stencil help
Usage: stencil [OPTIONS] COMMAND

Options:
  -V, --version  output the version number
  -h, --help     output usage information
...
```

## stencil init

Creates a `.stencil` file or `secrets.stencil.json` and `config.stencil.json` files (if using Stencil V3.1 release or later) used to configure the live preview when `stencil start` is run. You can specify the configuration information using the optional switches; if you do not specify the configuration information via options, Stencil CLI will prompt you to do so. 

NOTE: For custom templates, use only the `config.stencil.json` file. The `config.stencil.json` file contains theme-related configuration information like store URL, custom templates, etc.  The `secrets.stencil.json` file contains the access token.

```shell title="Usage: stencil init"
stencil init [--url STORE_URL] [--token API_TOKEN]
```

| Option                  | Alias | Description                                                                               |
|-|-|-|
| `--port HTTP_PORT`  |`-p`   | The `HTTP` port number to use when serving the live theme preview.                         |
| `--token API_TOKEN` |`-t`   | The [BigCommerce API Token](https://support.bigcommerce.com/s/article/Store-API-Accounts). |
| `--url STORE_URL`   |`-u`   | The BigCommerce storefront URL.                                                            |

## stencil start

Starts the live theme preview using the theme files in the current directory.

```shell title="Usage: stencil start"
stencil start [-V|--version] [-o|--open] [-v|--variation] [-t|--test] [-t|--tunnel]
stencil start [-h|--help]
```
&nbsp;
```shell title="Example: stencil start"
stencil start --open # opens live theme preview in default browser
```

| Option                       |Alias| Description                                                                           |
|-|-|-|
| `--version`                  |`-V` | Output the version number                                                            |
| `--open`                     |`-o` | Automatically open default browser                                                    |
| `--variation NAME`       |`-v` | Set which theme variation to use while developing                                     |
| `--test`                     |`-t` | Enable QA mode which will bundle all javascript for speed to test locally             |
| `--tunnel`                   |     | Create a tunnel URL which points to your local server which anyone can use            |
| `--no-cache`                 |`-n` | Turn off caching for API resource data (cache refreshes every 5 minutes)             |
| `--help`                     |`-h` | Output usage information                                                              |

<!-- theme: info -->
> #### --theme-editor and --theme-editor-port [port]:
> BigCommerce deprecated `-theme-editor` and `--theme-editor-port [port]` options as of v1.23.1. Please use [Page Builder](/stencil-docs/page-builder/page-builder-overview) instead.
&nbsp;

<!-- theme: warning -->
> #### Authentication errors
> If you receive an `Unauthorized, please use a valid username/token` error, authentication has failed. Make sure the API token you supplied is correct. For more information on creating store API accounts and generating tokens, see [Obtaining Store API Credentials](/stencil-docs/installing-stencil-cli/live-previewing-a-theme#step-3-serve-live-preview).

## stencil bundle

Bundles up the theme into a structured `.zip` file, which can be uploaded to BigCommerce.

```shell title="Usage: stencil bundle"
stencil bundle
```

## stencil pull

Pulls the configuration from the active theme on your live store and updates your local configuration. This is useful if any theme settings have been changed within Page Builder, as it will prevent you from overwriting them with your next theme upload by first syncing them.

```shell title="Usage: stencil pull"
stencil pull [OPTIONS]
```

| Option                        |Alias| Description                                                                         |
|-|--|--|
|`--host HOSTNAME`            |`-h` | Specify the API host (default: `api.bigcommerce.com`)                               |
|`--filename FILENAME`      |`-f` | Specify the filename to use for the merged configuration (default: `config.json`)   |
|`--saved`                      |`-s` | Downloads the most recently saved configuration instead of the live one.            |
|`--channel_id CHANNEL_ID`  |`-c` | Specify the channel ID of the storefront, if the store has multiple storefronts.    |
|`--help`                       |`-h` | Output usage information                                                            |

```shell title="Example: stencil pull"
stencil pull
```

## stencil push

Bundles up the theme into a structured `.zip file`; then directly uploads (pushes) the `.zip` to BigCommerce.

```shell title="Usage: stencil push"
stencil push [<OPTIONS>]
```

| Option                        |Alias| Description                                                                         |
|-|--|--|
|`--version`                    |`-V` | Output the version number                                                           |
|`--host HOSTNAME`            |     | Specify the API host (default: `api.bigcommerce.com`)                               |
|`--file FILENAME`          |`-f` | Specify the filename of the bundle to upload                                        |
|`--save FILENAME`           |`-s` | Specify the filename of the saved bundle                                            |
|`--channel_ids CHANNEL_ID`  |`-c` | Specify the channel ID(s) of the storefront, if the store has multiple storefronts |
|`--activate VARIATIONNAME` |`-a` | Skip activation prompt; specify variation or leave blank to select first variation  |
|                               |`-a -c {{channel_id_1 channel_id_2 ... channel_id_n}}`| Allows you to apply a theme to selected channels (at least one channel id should be provided)                                                                                      |                 
|                               |`-a -all_channels` or `a -allc`| Allows you to apply a theme to all available channels.     |   
|`--delete`                     |`-d` | Delete oldest private, non-active theme if upload limit reached                     |
|`--help`                       |`-h` | Output usage information                                                            |


```shell title="Example: stencil push"
stencil push -f Cornerstone-2.3.2.zip # uploads specified file, skips bundling if file already exists
```
<!-- theme: info -->
> #### --filename:
> You can use the `-f` or `--filename` option in cases where you have already run `stencil bundle` to bundle your theme, but the resulting .zip file has not yet been uploaded to BigCommerce. Use the generated .zip file's **filename** as a parameter to identify the generated file in your theme directory. An example of the command is outlined below.
> When you run `stencil push`, you can apply one theme to multiple storefront or channels. 
> When you run `stencil push` with the `-f` or `--filename` option, Stencil CLI skips all its bundling steps and diagnostics. It proceeds directly to uploading the specified file, displaying its processing progress bar to show upload status.


## stencil download

Download the theme files from your live store, overwriting files in your local directory.

```shell title="Usage: stencil download"
stencil download [OPTIONS]
```

| Option                        |Alias| Description                                                                         |
|-|--|--|
|`--host HOSTNAME`            |`-h` | Specify the API host (default: `api.bigcommerce.com`)                               |
|`--file FILENAME`          |`-f` | Specify a single file to download from the theme, e.g. `templates/layout/base.html` |
|`--exclude`                    |`-e` | Specify a directory to exclude from the download.                                   |
|`--channel_id CHANNEL_ID`  |`-c` | Specify the channel ID of the storefront, if the store has multiple storefronts.    |
|`--help`                       |`-h` | Output usage information                                                            |

```shell title="Example: stencil download"
stencil download -f package.json
```

## stencil release

Creates a new release in a theme’s GitHub repository. Developers outside BigCommerce can use this for forks (not master) of Stencil’s Cornerstone base theme, or for their own parallel themes independent of Cornerstone.


```shell title="Usage: stencil release"
stencil release [OPTIONS]
```

| Option      | Alias | Description                |
|-|-|-|
| `--version` | `-V`  | Output the version number |
| `--help`    | `-h`  | Output usage information  |

## Resources

### Related Articles
* [Authorizing and Initializing the CLI](/stencil-docs/installing-stencil-cli/installing-stencil)
* [Troubleshooting Your Setup](/stencil-docs/installing-stencil-cli/troubleshooting-your-setup)
