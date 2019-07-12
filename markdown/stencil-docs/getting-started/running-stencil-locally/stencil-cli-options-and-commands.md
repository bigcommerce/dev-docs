<h1>Stencil CLI Options and Commands</h1>
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#stencil_basic-cli">Basic CLI Options and Commands</a></li>
    <li><a href="#stencil_stencil-start">Stencil Start Options</a></li>
    <li><a href="#stencil_stencil-push">Stencil Push Options</a></li>
    <li><a href="#stencil_quick">Quick Reference</a></li>
    <li><a href="#stencil_local-launch-theme">Local Launch: Theme Only</a></li>
    <li><a href="#stencil_local-launch-theme-and-editor">Local Launch: Theme and Theme Editor</a></li>
    <li><a href="#stencil_local-launch-theme-and-editor">Local Launch: Disabling Caching</a></li>
    <li><a href="#stencil_troubleshooting-token-errors">Troubleshooting Token Errors</a></li>
	</ul>
</div>

<a href='##stencil_basic-cli' aria-hidden='true' class='block-anchor'  id='#stencil_basic-cli'><i aria-hidden='true' class='linkify icon'></i></a>

## Basic CLI Options and Commands

The syntax to run a basic Stencil CLI command is: `stencil <commands> [options] <parameter>`.

To see the basic options and commands that the Stencil CLI package supports, enter any of the following forms of the help option on your command line:

```
stencil
stencil help
stencil --help
stencil -h
```

Your terminal window will display options and commands listed in the tables below. 
	
<table>
  <tr>
    <th>Option</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>-h, --help</td>
    <td>Outputs usage information.</td>
  </tr>
  <tr>
    <td>-V, --version</td>
    <td>Outputs the version number (which is read from package.json file</span>).</td>
  </tr>
</table>

<p></p>
<table>
	
  <tr>
    <th>Command</th>
    <th>Description</th>
  </tr>
	
  <tr>
    <td>init</td>
    <td >Interactively creates a .stencil file, which configures how to run a BigCommerce store locally.</td>
  </tr>
	
  <tr>
    <td>start</td>
    <td>Starts up the BigCommerce store, using theme files in the current directory. 
    </td>
  </tr>
	
  <tr>
    <td>bundle</td>
    <td>Bundles up the theme into a structured .zip file, which can be uploaded to BigCommerce. (Please see <a href="https://developer.bigcommerce.com/stencil-docs/prepare-and-upload-a-theme/bundling-and-uploading">Bundling and Uploading a Theme)</a>.</td>
  </tr>
  
  <tr>
    <td>push</td>
    <td>Bundles up the theme into a structured .zip file, then directly uploads (pushes) the .zip to BigCommerce.</td>
  </tr>
  
  <tr>
    <td>release</td>
    <td>Creates a new release in a theme's GitHub repository. Developers outside BigCommerce can use this for forks (not master) of Stencil's Cornerstone base theme, or for their own parallel themes independent of Cornerstone.</td>
  </tr>
  
  <tr>
    <td>help &lt;command&gt;</td>
    <td>Displays help and returns all the options available to use for the specified command. For example, <code>stencil help bundle</code> will return the options that are available to use specifically with the <code>stencil bundle</code> command.
    </td>
  </tr> 
	
</table>


<!--
    title: #### Basic Stencil CLI Options and Commands

    data: //s3.amazonaws.com/user-content.stoplight.io/6116/1538055264839
-->

#### Basic Stencil CLI Options and Commands
![#### Basic Stencil CLI Options and Commands
](//s3.amazonaws.com/user-content.stoplight.io/6116/1538055264839 "#### Basic Stencil CLI Options and Commands
")

<div class="HubBlock--callout">
<div class="CalloutBlock--">
<div class="HubBlock-content">
    
<!-- theme:  -->

### 'stencil start' and 'stencil push' Options
> The `stencil start` and `stencil push` CLI Commands have additional custom options that can be used with the command, which are detailed below.

</div>
</div>
</div>

---

<a href='##stencil_stencil-start' aria-hidden='true' class='block-anchor'  id='#stencil_stencil-start'><i aria-hidden='true' class='linkify icon'></i></a>

## Stencil Start Options

To see Stencil CLI's additional options for the `stencil start` command (described above), enter the following on your command line:

`stencil help start` 

Your terminal screen should read similar to the table below.

<table>
	<tr>
    <th>Option</th>
    <th>Definition</th> 
	</tr>
  <tr>
    <td>-V, --version</td>
    <td>Outputs the version number</td> 
  </tr>
  <tr>
    <td>-o, --open</td>
    <td>Automatically open default browser</td> 
  </tr>
	  <tr>
			<td>-v, --variation [name]</td>
			<td>Set which theme variation to use while developing</td> 
  </tr>
	  <tr>
			<td>-t, --test</td>
			<td>Enable QA mode which will bundle all javascript for speed to test locally</td> 
		</tr>
		<tr>
			<td>--tunnel</td>
			<td>Create a tunnel URL which points to your local server which anyone can use</td> 
		</tr>
	  <tr>
			<td>-e, --theme-editor</td>
			<td>Run Theme Editor server</td> 
  </tr>
	  <tr>
    <td>-n, --no-cache</td>
    <td>Turns off caching for API resource data per storefront page. The cache lasts for 5 minutes before automatically refreshing.</td> 
  </tr>
	  <tr>
			<td>--theme-editor-port [port]</td>
			<td>Run the Theme Editor on a different port</td> 
  </tr>
	  <tr>
			<td>-h, --help</td>
			<td>output usage information</td> 
  </tr>
</table>


---

<a href='#stencil_stencil-push' aria-hidden='true' class='block-anchor'  id='stencil_stencil-push'><i aria-hidden='true' class='linkify icon'></i></a>

## Stencil Push Options

To see Stencil CLI's additional options for the stencil push command (described above), enter the following on your command line:

`stencil help push`

Your terminal screen should read similar to the table below.

<table>
	<tr>
    <th>Option</th>
    <th>Definition</th> 
	</tr>
  <tr>
    <td>-V, --version</td>
    <td>outputs the version number</td> 
  </tr>
  <tr>
    <td>--host [hostname]</td>
    <td>specify the API host (default: https://api.bigcommerce.com)</td> 
  </tr>
	  <tr>
			<td>-f, --file [filename]</td>
			<td>specify the filename of the bundle to upload</td> 
  </tr>
	  <tr>
			<td>-s, --save [filename]</td>
			<td>specify the filename to save the bundle as</td> 
		</tr>
		<tr>
			<td>-a, --activate [variationname]</td>
			<td>This will skip the prompts that normally come up asking if you would like to activate the theme and to specify a variation.

You can either specify the variation name after the flag or leave it blank to select the first variation (Light for Cornerstone).</td> 
		</tr>
	  <tr>
			<td>-h, --help</td>
			<td>Output usage information.</td> 
		</tr>
</table>

You can use the `-f` or `--filename` option in cases where you have already run `stencil bundle` to bundle your theme, but the resulting .zip file has not yet uploaded to BigCommerce. Use the generated .zip file's **filename** as a parameter to identify the generated file in your theme directory. An example of the command is outlined below.

`stencil push -f Cornerstone-2.3.2.zip`

In this example, `Cornerstone-2.3.2.zip` is the name of the file that was generated after running `stencil bundle`.

When you run `stencil push` with the `-f` or `--filename` option, Stencil CLI skips all its bundling steps and diagnostics. It proceeds directly to uploading the specified file, displaying its processing progress bar to show upload status.



---

<a href='#stencil_quick' aria-hidden='true' class='block-anchor'  id='stencil_quick'><i aria-hidden='true' class='linkify icon'></i></a>

## Theme Editor Local Launch Quick Reference

<table> 
	<tr>
		<th>Launch type</th>
		<th>Command</th>
		<th>Theme Port URL</th>
		<th>Theme Editor Port URL</th>
	</tr>
	<tr>
		<td>Theme Only</td>
		<td><code>stencil start</code></td>
		<td>http://localhost:3000 (or custom 
		port)</td>
		<td>N/A</td>
	</tr>
	<tr>
		<td>Theme, Theme Editor</td>
		<td><code>stencil start -e</code>
		</td>
		<td>http://localhost:3000 (or custom 
		port)</td>
		<td>http://localhost:8181</td>
	</tr>
	<tr>
		<td>Theme <b>and</b> Theme Editor 
		</td>
		<td><code>stencil start -e --theme-
		editor-port 9000</code></td>
		<td>http://localhost:3000 (or custom 
		port)</td>
		<td>http://localhost:9000
(#### = custom port)</td>
	</tr>


---

<a href='#stencil_local-launch-theme' aria-hidden='true' class='block-anchor'  id='stencil_local-launch-theme'><i aria-hidden='true' class='linkify icon'></i></a>

## Local Launch: Theme Only

After initializing Stencil, issue the following command in your theme directory (_Windows users need to run this in git bash_):

`stencil start`

When you navigate to your designated port (e.g `http://localhost:3000`), you should see the storefront you selected with the local Stencil theme applied.

---

<a href='#stencil_local-launch-theme-and-editor' aria-hidden='true' class='block-anchor'  id='stencil_local-launch-theme-and-editor'><i aria-hidden='true' class='linkify icon'></i></a>

## Local Launch: Theme and Theme Editor

If you want to view or reconfigure the Theme Editor/Store Design settings, you can run Stencil locally while also launching a local version of Theme Editor. This will help you see the UX changes that result from editing the `schema.json` file. 

To run Stencil locally while also launching a local version of Theme Editor, start in your theme directory and run the same command as above (`stencil start`), but append the `-e` option:

`stencil start -e`

The Theme Editor server will run in parallel with the stencil theme at [http://localhost:8181](http://localhost:8181/).

### Customizing Theme Editor's Port

You can override Theme Editor's default port by appending the "--theme-editor-port [port]" option. For example, to specify port `9000`, you would enter:

`stencil start -e --theme-editor-port 9000
`

To verify Theme Editor's launch, you would then go to http://localhost:9000. Using this option, you can specify any port between `1024` and `65535`.

---

<a href='#stencil_disabling' aria-hidden='true' class='block-anchor'  id='stencil_disabling'><i aria-hidden='true' class='linkify icon'></i></a>

## Local Launch: Disabling Caching

By default, Stencil caches API resource data per storefront page. This minimizes server traffic while you develop your theme locally.
If you prefer to see your changes reflected immediately from your live store, you can turn off caching by appending the `--no-cache` or `-n` option:

`stencil start --no-cache`
`stencil start -n`

### To re-enable caching:

Kill the current Stencil server (_ctrl + c will do the job_) and restart Stencil, this time omitting the `--no-cache` or `-n` option.

`stencil start` 


---

## Troubleshooting Token Errors

If you receive the following error message, 

`Unauthorized, please use a valid username/token`

then store token authentication has failed.

In this case, please track back and review the following articles:

* [Authentication & Tokens](https://developer.bigcommerce.com/stencil-docs/getting-started/authentication-and-tokens): How to issue or reissue tokens in the BigCommerce control panel.
* [Authorizing and Initializing Stencil](https://developer.bigcommerce.com/stencil-docs/getting-started/running-stencil-locally/authorizing-and-initializing): How to initialize Stencil with your username and token

---

## Resources
### Related Articles
* [Authorizing and Initializing Stencil](https://developer.bigcommerce.com/stencil-docs/getting-started/running-stencil-locally/authorizing-and-initializing)
* [Creating an API Account to Obtain OAuth Tokens](https://developer.bigcommerce.com/stencil-docs/getting-started/authentication-and-tokens)

