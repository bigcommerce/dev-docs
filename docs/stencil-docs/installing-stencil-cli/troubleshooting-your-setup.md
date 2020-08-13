# Troubleshooting Your Setup

<div class="otp" id="no-index">

### On this page
- [Unsupported Node version](#unsupported-node-version)
- [`npm install` errors](#npm-install-errors)
- [`npm install` and `stencil init` errors](#npm-install-and-stencil-init-errors)
- [`stencil init`/`stencil start` errors](#stencil-initstencil-start-errors)
- [`stencil start` missing module errors](#stencil-start-missing-module-errors)
- [Mac OS: `Xcode/iOS license...` errors](#mac-os-xcodeios-license-errors)
- [ETIMEOUT errors on Node > 4.4.0](#etimeout-errors-on-node--440)
- [`stencil` command not found](#stencil-command-not-found)
- [`stencil start` errors](#stencil-start-errors)
- [500 errors](#500-errors)
- [Lint errors upon bundling](#lint-errors-upon-bundling)
- [Module not found errors upon bundling](#module-not-found-errors-upon-bundling)
- [Short undescriptive JavaScript diagnostics](#short-undescriptive-javascript-diagnostics)
- [TR-300 error upon theme upload](#tr-300-error-upon-theme-upload)
- [Reinstalling Stencil CLI](#reinstalling-stencil-cli)
- [Resources](#resources)

</div>

For any unexpected behavior you encounter while developing your Stencil theme, we recommend checking the terminal window where you started Stencil CLI.

In some cases, the terminal will provide a verbose error message specifying where to look for problems. It has the potential to provide further insight on the issue. Diagnostic suggestions are listed on this page for error messages that may not be helpful in revealing the issue you're experiencing.

## Unsupported Node version

If you receive the following error message, please reinstall Node.js to a supported "LTS" ("Long-Term Support") version:

```text
Debug: internal, implementation, error
        TypeError: Uncaught error: Object #<Object> has no method 'parse'
        at internals.implementation
        (/usr/local/lib/node_modules/stencil-cli/server/plugins/CssCompiler/index.js:32:26)
```

On Mac OS, we have tested Stencil CLI most robustly on Node.js version 4.4.0. On Linux, we have tested most robustly on version 4.1.2. On Windows, we have tested most robustly on version 4.6.1. You’ll find detailed steps (for each operating system) in these instructions' Installing Stencil Prerequisites by OS section.

## `npm install` errors

The following headings represent errors that may occur when running the `npm install` command. The content under each heading issues a fix for the issue.

### "Unmet peer dependency"

If you get any `Unmet Peer Dependency` errors when issuing the `npm install` command make sure you are running the `npm install` command **inside** your theme directory.

If running the `npm install ` command inside your theme directory does not resolve the error, try one of the following:

* Try removing your theme directory's `/node_modules/` subdirectory, by running `rm -rf node_modules`

* Run the `npm cache clean` command

* Re-run `npm install`

### Permissions errors

If you get a file-permissions error such as `EPERM` or `EACCES` when issuing the `npm install` command, try one of the workarounds listed on [Fixing npm Permissions](https://docs.npmjs.com/getting-started/fixing-npm-permissions) (docs.npmjs.com).

### "js/bundle" errors

If you get errors of the following type upon executing the `stencil init` command:

```text
Potentially unhandled rejection [6] TypeError: Error loading "js/bundle"
at file:/Users/<username>/Desktop/Fortune-1.4.6/assets/js/bundle.js
Error evaluating file:/Users/<username>/Desktop/Fortune-1.4.6/assets/js/bundle.js
Cannot read property 'createElement' of undefined...
```

Try the following workaround:

1. Download and unzip a fresh copy of the theme.

2. Refresh theme dependencies by running `npm install`.

3. Run `stencil init`.

*You will see the same error message as before, but proceed to:*

4. Delete the `assets/js/bundle.js` file.

5. Run `stencil init` again.
This should now execute properly.
6. Run `stencil start`.

8. Verify your theme's launch at: http://localhost:3000.

## `npm install` and `stencil init` errors

If you get an unexpected error messages when issuing the `npm install` or `stencil init` commands, check your Node.js version and ensure it aligns with a version compatible for the Stencil framework.

## `stencil init`/`stencil start` errors

If you get an unexpected error message or unexpected results upon executing the `stencil init`, `stencil start`, or other Stencil CLI commands, make sure you are working in the subdirectory for the specific theme you intend to launch.

One way of checking what directory you are working in is by running the `pwd` command in your terminal.

## `stencil start` missing module errors

If executing `stencil start` provokes errors like the following

```text
module.js:327
throw err;
^

Error: Cannot find module 'webpack'
at Function.Module._resolveFilename (module.js:325:15)
at Function.Module._load (module.js:276:25)
at Module.require (module.js:353:17)
at require (internal/module.js:12:17)
at Object. (/Users/jane.doe/themes/cornerstone/stencil.conf.js:2:15)
at Module._compile (module.js:409:26)
at Object.Module._extensions..js (module.js:416:10)
at Module.load (module.js:343:32)
at Function.Module._load (module.js:300:12)
at Module.require (module.js:353:17)
```

switch to your theme directory and run `npm install`. Running this command will add the missing JavaScript library dependencies.

If you receive the same error again after running `npm install`, you should completely uninstall and reinstall both the Stencil framework and Node.js.

## Mac OS: `Xcode/iOS license...` errors

On Mac OS, if you have recently installed a new version of Xcode, the command line will display the following error when you next try to use or reinstall Stencil:

`error: Agreeing to the Xcode/iOS license requires admin privileges, please re-run as root via sudo.`

To resolve this error, do the following:
* Launch Xcode.
* Accept its user agreement.
* Quit Xcode.
* Re-execute your Stencil command.

## ETIMEOUT errors on Node > 4.4.0

If you are running a version of Node.js higher than 4.4.0, and you receive an `ETIMEOUT` error when running Stencil CLI, re-install the latest version of Stencil CLI to resolve this error by following the workflow in Installing Stencil CLI/Framework.

## `stencil` command not found

### Reinstall Stencil CLI

If you receive the error message -bash: `stencil: command not found`, ensure that you have followed the steps on Installing Stencil CLI/Framework or attempt to reinstall the Stencil CLI.

### Redirect Bash shell

If you receive the error message -bash: stencil: command not found, enter echo $NVM_DIR. If this command returns nothing, then run source ~/.bash_profile and try running running stencil commands again.

### Check/Specify `nvm` version

If you receive a `stencil: command not found` error message upon executing stencil start from inside your theme subdirectory: Check whether nvm has installed multiple versions of Node.js, by entering the following command:

`ls ~/.nvm/versions/node`

If this reports more than one version, specify your platform's supported Node.js `<version_number>` by entering:

`nvm use <version_number>`

To prevent this error from recurring, add the same `nvm use <version_number>` command to your ~/.bash_profile file.

<a id="troubleshooting_stencil-start-errors"></a>

## `stencil start` errors

### "Unauthorized...username/token" error

If executing the `stencil start` command generates an `Unauthorized, please use a valid username/token` error, make sure the `.stencil` file contains the correct store URL. Also, verify that you copied the correct username and token. If you continue to get the same error, please reissue tokens.

## 500 errors

If you see errors like or _similar_ to below:

`{"statusCode":500,"error":"Internal Server Error","message":"An internal server error occurred"}`

They often indicate a template syntax error, such as unmatched or missing punctuation. Check your terminal window for more details.

## Lint errors upon bundling

If bundling your theme triggers multiple lint errors related to the `bundle.js` file, your theme is missing the `.eslintignore` file. Retrieve this file from the [Cornerstone repo](https://github.com/bigcommerce/cornerstone), then re-run `stencil bundle`.

## Module not found errors upon bundling

If you see the following error when running stencil bundle, this is a past bug that has since been corrected.

`[ModuleNotFoundError: Module not found: Error: Cannot resolve module 'pace' in...]`

To remove the error, please update your Cornerstone version.

## Short un-descriptive JavaScript diagnostics

If JavaScript errors in your browser's developer tools are not reporting filenames and line numbers, try changing your `webpack.conf.js` file's sourcemap entry from:

`devtool: 'eval-cheap-module-source-map'`

to:

`devtool: 'eval-source-map'`

The `eval-cheap-module-source-map` option performs faster rebuilds, but omits line numbers. The `eval-source-map` option is slower, but more verbose.

## TR-300 error upon theme upload

If uploading your theme triggers a TR-300 error, this can indicate an included source-map file (`bundle.js.map`) that exceeds its size limit of 5 MB. If your `bundle.js.map` exceeds that limit, the workaround is to move this file outside your theme directory before re-running `stencil bundle`.

Other reasons for this error include exceeding these stencil theme limitations:
* Max directory size for `/templates/` and `/parsed/templates/`: 1 MB
* Max for any single file in the bundle: 5 MB
* Max zipped size: 50 MB
* Max unzipped size: 100 MB
* Max total files: 2500

## Reinstalling Stencil CLI

If you encounter persistent problems in initializing or starting Stencil, you have the option of completely removing Stencil CLI and doing a fresh reinstall. You would do so as follows:

1. From your command line, issue the command:
`npm uninstall -g @bigcommerce/stencil-cli`

2. Navigate back to the Installing and Launching Stencil section and repeat all installation steps to reinstall dependencies and restore your theme, according to your development scenario.

A more-drastic measure is to uninstall and reinstall Stencil CLI's Node.js prerequisites (along with uninstalling Stencil CLI). We do not recommend this, as it might disable other Node.js applications on your local machine.

## Resources

### Related articles
* [Authorizing and Initializing the CLI](/stencil-docs/installing-stencil-cli/installing-stencil)
* [Stencil CLI Options and Commands](/stencil-docs/installing-stencil-cli/stencil-cli-options-and-commands)
