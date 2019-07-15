<h1>Troubleshooting Your Setup</h1>

<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#troubleshooting_unsupported">Unsupported Node Version</a></li>
    <li><a href="#troubleshooting_npm-install"><code>npm install</code> errors</a></li>
    <li><a href="#troubleshooting_npm-install-stencil-init">npm install and stencil init Errors</a></li>
    <li><a href="#troubleshooting_stencil-init">"stencil init/stencil start errors</a></li>
    <li><a href="#troubleshooting_stencil-start-missing-module"><code>stencil start</code>/missing module Errors</a></li>
    <li><a href="#troubleshooting_uncaught">"Uncaught TypeError: Illegal invocation" error</a></li>
    <li><a href="#troubleshooting_mac-os">Mac OS: "Xcode/iOS license..." Errors upon Stencil Commands</a></li>
    <li><a href="#troubleshooting_etimeout">ETIMEOUT Errors on Node >4.4.0</a></li>
    <li><a href="#troubleshooting_stencil-command-not-found"><code>stencil</code> command not found</a></li>
    <li><a href="#troubleshooting_500-errors">500 Errors</a></li>
    <li><a href="#troubleshooting_lint-errors">Lint Errors upon Bundling</a></li>
    <li><a href="#troubleshooting_module-not-found">"Module Not Found" Errors upon Bundling</a></li>
    <li><a href="#troubleshooting_short">Short or Undescriptive JavaScript Diagnostics</a></li>
    <li><a href="#troubleshooting_tr-300">TR-300 Error upon Theme Upload</a></li>
    <li><a href="#troubleshooting_uninstalling">Uninstalling and Reinstalling Stencil CLI</a></li>
	</ul>
</div>

For any unexpected behavior you encounter while developing your Stencil theme, we recommend your first check your terminal window where you started Stencil CLI. 

In some cases, the terminal will provide a verbose error message specifying where to look for problems. It has the potential to provide further insight on the issue. Diagnostic suggestions are listed on this page for error messages that may not be helpful in revealing the issue you're experiencing.

---

<a href='#troubleshooting_unsupported' aria-hidden='true' class='block-anchor'  id='troubleshooting_unsupported'><i aria-hidden='true' class='linkify icon'></i></a>

## Unsupported Node Version

If you receive the following error message, please reinstall Node.js to a supported "LTS" ("Long-Term Support") version:

```
Debug: internal, implementation, error
        TypeError: Uncaught error: Object #<Object> has no method 'parse'
        at internals.implementation 
        (/usr/local/lib/node_modules/stencil-cli/server/plugins/CssCompiler/index.js:32:26)
```

On Mac OS, we have tested Stencil CLI most robustly on Node.js version 4.4.0. On Linux, we have tested most robustly on version 4.1.2. On Windows, we have tested most robustly on version 4.6.1. You’ll find detailed steps (for each operating system) in these instructions' Installing Stencil Prerequisites by OS section.

---

<a href='#troubleshooting_npm-install' aria-hidden='true' class='block-anchor'  id='troubleshooting_npm-install'><i aria-hidden='true' class='linkify icon'></i></a>

## `npm install` Errors

The following headings represent errors that may occur when running the `npm install` command. The content under each heading issues a fix for the issue.

### "Unmet Peer Dependency"

If you get any `Unmet Peer Dependency` errors when issuing the `npm install` command make sure you are running the `npm install` command **inside** your theme directory.

If running the `npm install ` command inside your theme directory does not resolve the error, try one of the following:

* Try removing your theme directory's `/node_modules/` subdirectory, by running `rm -rf node_modules`

* Run the `npm cache clean` command

* Re-run `npm install`


### Permissions (EPERM or EACCES) Error

If you get a file-permissions error such as `EPERM` or `EACCES` when issuing the `npm install` command, try one of the workarounds listed on the [npm docs.](https://docs.npmjs.com/getting-started/fixing-npm-permissions) page. 

### "js/bundle" Errors

If you get errors of the following type upon executing the `stencil init` command:

```
Potentially unhandled rejection [6] TypeError: Error loading "js/bundle" 
at file:/Users/<username>/Desktop/Fortune-1.4.6/assets/js/bundle.js

Error evaluating file:/Users/<username>/Desktop/Fortune-1.4.6/assets/js/bundle.js

Cannot read property 'createElement' of undefined...
```

Try the following workaround:

1. Download and unzip a fresh copy of the theme.

3. Refresh theme dependencies by running `npm install && jspm install`

3. Run `stencil init`.

*You will see the same error message as before, but proceed to:*

4. Delete the `<theme-name>/assets/js/bundle.js` file.

5. Run `stencil init` again.
This should now execute properly.
6. Run `stencil start`

8. Verify your theme's launch at: http://localhost:3000.

---

<a href='#troubleshooting_npm-install-stencil-init' aria-hidden='true' class='block-anchor'  id='troubleshooting_npm-install-stencil-init'><i aria-hidden='true' class='linkify icon'></i></a>

## `npm install` and `stencil init` Errors

If you get an unexpected error messages when issuing the `npm install` or `stencil init` commands, check your Node.js version and ensure it aligns with a version compatible for the Stencil framework.

---

<a href='#troubleshooting_stencil-init' aria-hidden='true' class='block-anchor'  id='troubleshooting_stencil-init'><i aria-hidden='true' class='linkify icon'></i></a>

## `stencil init`/`stencil start` Errors

If you get an unexpected error message or unexpected results upon executing the `stencil init`, `stencil start`, or other Stencil CLI commands, make sure you are working in the subdirectory for the specific theme you intend to launch. 

One way of checking what directory you are working in is by running the `pwd` command in your terminal.

---

<a href='#troubleshooting_stencil-start-missing-module' aria-hidden='true' class='block-anchor'  id='troubleshooting_stencil-start-missing-module'><i aria-hidden='true' class='linkify icon'></i></a>

## `stencil start`/missing module Errors

If executing `stencil start` provokes errors like the following

```
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

---

<a href='#troubleshooting_uncaught' aria-hidden='true' class='block-anchor'  id='troubleshooting_uncaught'><i aria-hidden='true' class='linkify icon'></i></a>

## "Uncaught TypeError: Illegal invocation" error

If you receive an `Uncaught TypeError: Illegal invocation` console error, and previously installed Stencil using the original jspm-based installation flow and later switched to our current webpack installation flow, please remove your theme's `/node_modules/` subdirectory, then re-run `npm install` inside your theme's directory.

---

<a href='#troubleshooting_mac-os' aria-hidden='true' class='block-anchor'  id='troubleshooting_mac-os'><i aria-hidden='true' class='linkify icon'></i></a>

## Mac OS: "Xcode/iOS license..." Errors upon Stencil Commands

On Mac OS, if you have recently installed a new version of Xcode, the command line will display the following error when you next try to use or reinstall Stencil: 

`error: Agreeing to the Xcode/iOS license requires admin privileges, please re-run as root via sudo.`

To resolve this error, do the following:
* Launch Xcode.
* Accept its user agreement.
* Quit Xcode.
* Re-execute your Stencil command.


---

<a href='#troubleshooting_etimeout' aria-hidden='true' class='block-anchor'  id='troubleshooting_etimeout'><i aria-hidden='true' class='linkify icon'></i></a>

## ETIMEOUT Errors on Node >4.4.0

If you are running a version of Node.js higher than 4.4.0, and you receive an `ETIMEOUT` error when running Stencil CLI, re-install the latest version of Stencil CLI to resolve this error by following the workflow in Installing Stencil CLI/Framework.

---

<a href='#troubleshooting_stencil-command-not-found' aria-hidden='true' class='block-anchor'  id='troubleshooting_stencil-command-not-found'><i aria-hidden='true' class='linkify icon'></i></a>

## `stencil` command not found

### Reinstall Stencil CLI

If you receive the error message -bash: `stencil: command not found`, ensure that you have followed the steps on Installing Stencil CLI/Framework or attempt to reinstall the Stencil CLI. 

### Redirect Bash shell

If you receive the error message -bash: stencil: command not found, enter echo $NVM_DIR. If this command returns nothing, then run source ~/.bash_profile and try running running stencil commands again.

### Check/Specify `nvm` Version

If you receive a `stencil: command not found` error message upon executing stencil start from inside your theme subdirectory: Check whether nvm has installed multiple versions of Node.js, by entering the following command:

`ls ~/.nvm/versions/node`

If this reports more than one version, specify your platform's supported Node.js `<version_number>` by entering: 

`nvm use <version_number>`

To prevent this error from recurring, add the same `nvm use <version_number>` command to your ~/.bash_profile file.


---

## `stencil start` errors

### "Unauthorized...username/token" Error

If executing the `stencil start` command generates an `Unauthorized, please use a valid username/token` error: Please make sure that the `.stencil` file contains the correct store URL. Also, verify that you have copied the correct username and token. If you continue to get the same error, please reissue tokens.

### "Unable to load registry %bitbucket%"

If you have downloaded and installed a Marketplace theme (other than Cornerstone), and after running stencil start, received the error `Unable to load registry %bitbucket%`: Try this workaround.

1. Back up your current theme directory/directories. 
(In a default installation, the theme directory is named `.../cornerstone/`. Prior to March 2017, this directory's name defaulted to `.../stencil/`. Use the same substitutions for other code examples on this page.)

2. To ensure that you install refreshed dependencies, delete your `<theme-name>/node_modules/` and `<theme-name>/assets/jspm_packages/` subdirectories. (You can check installed versions of dependencies by examining your `<theme-name>/package.json` file.)

3. Starting inside your theme directory, enter this alternate sequence of commands:

```
npm install -g jspm-git
npm install
jspm config registries.bitbucket.baseurl git+ssh://git@bitbucket.org/
jspm config registries.bitbucket.handler jspm-git
jspm install
```

4. Re-launch your theme.

---

<a href='#troubleshooting_500-errors' aria-hidden='true' class='block-anchor'  id='troubleshooting_500-errors'><i aria-hidden='true' class='linkify icon'></i></a>

## 500 Errors

If you see errors like or _similar_ to below:

`{"statusCode":500,"error":"Internal Server Error","message":"An internal server error occurred"}`

They often indicate a template syntax error, such as unmatched or missing punctuation. Check your terminal window for more details.

---

<a href='#troubleshooting_lint-errors' aria-hidden='true' class='block-anchor'  id='troubleshooting_lint-errors'><i aria-hidden='true' class='linkify icon'></i></a>

## Lint Errors upon Bundling

If bundling your theme triggers multiple lint errors related to the `bundle.js` file, your theme is missing the `.eslintignore` file. Retrieve [this file from the Cornerstone repo](https://github.com/bigcommerce/cornerstone), then re-run `stencil bundle`.


---

<a href='#troubleshooting_module-not-found' aria-hidden='true' class='block-anchor'  id='troubleshooting_module-not-found'><i aria-hidden='true' class='linkify icon'></i></a>

## "Module Not Found" Errors upon Bundling

If you see the following error when running stencil bundle, this is a past bug that has since been corrected.

`[ModuleNotFoundError: Module not found: Error: Cannot resolve module 'pace' in...]`

To remove the error, please update your Cornerstone version. 

---

<a href='#troubleshooting_short' aria-hidden='true' class='block-anchor'  id='troubleshooting_short'><i aria-hidden='true' class='linkify icon'></i></a>

## Short or Undescriptive JavaScript Diagnostics

If JavaScript errors in your browser's developer tools are not reporting filenames and line numbers, try changing your `webpack.conf.js` file's sourcemap entry from:

`devtool: 'eval-cheap-module-source-map'`

to:

`devtool: 'eval-source-map'`

The `eval-cheap-module-source-map` option performs faster rebuilds, but omits line numbers. The `eval-source-map` option is slower, but more verbose. 

---

<a href='#troubleshooting_tr-300' aria-hidden='true' class='block-anchor'  id='troubleshooting_tr-300'><i aria-hidden='true' class='linkify icon'></i></a>

## TR-300 Error upon Theme Upload

If uploading your theme triggers a TR-300 error, this can indicate an included source-map file (`bundle.js.map`) that exceeds its size limit of 5 MB. If your `bundle.js.map` exceeds that limit, the workaround is to move this file outside your theme directory before re-running `stencil bundle`. 

---

<a href='#troubleshooting_uninstalling' aria-hidden='true' class='block-anchor'  id='troubleshooting_uninstalling'><i aria-hidden='true' class='linkify icon'></i></a>

## Uninstalling and Reinstalling Stencil CLI

If you encounter persistent problems in initializing or starting Stencil, you have the option of completely removing Stencil CLI and doing a fresh reinstall. You would do so as follows:

1. From your command line, issue the command:
`npm uninstall -g @bigcommerce/stencil-cli`

2. Navigate back to the Installing and Launching Stencil section and repeat all installation steps to reinstall dependencies and restore your theme, according to your development scenario.

A more-drastic measure is to uninstall and reinstall Stencil CLI's Node.js prerequisites (along with uninstalling Stencil CLI). We do not recommend this, as it might disable other Node.js applications on your local machine.

---

## Resources

### Related Articles
* Authorizing and Initializing the CLI
* Stencil CLI Options and Commands



