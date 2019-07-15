<h1>Checking a Theme's Size</h1>

<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
		<li><a href="#checking_checking">Checking a Theme's Size</a></li>
    <li><a href="#checking_organizing-your-theme">Shrinking a Theme by Excluding Static Assets Using WebDAV</a></li>
    <li><a href="#checking_organizing-your-theme">Organizing Your Theme</a></li>
	</ul>
</div>

<a href='#checking_checking' aria-hidden='true' class='block-anchor'  id='checking_checking'><i aria-hidden='true' class='linkify icon'></i></a>

Your theme should ideally bundle into an archive of only a few megabytes. BigCommerce imposes a hard limit of 50 MB, but most themes do not approach this limit unless they include many large static assets. If your theme is unlikely to or does not exceed 50 MB, you can directly go to [Bundling and Pushing a Theme]().

A few themes might exceed the 50 MB limit. If this is the case, you have two options:
* Shrink Your Theme with the help of WebDAV
* Stage Your Theme for CDN Delivery to restructure your theme to a size that's manageable for upload to BigCommerce.

---

## Shrinking a Theme by Excluding Static Assets Using WebDAV

Restructuring Your Theme
In this section, you will first isolate static assets from your theme’s local directory, then use WebDAV to cloud-host those assets, and finally reference those assets using Stencil’s cdn Handlebars helper. For an existing theme, make a backup of your whole <theme‑name> directory before proceeding.

Examine your theme’s /assets/ subdirectory and/or its intended contents. Check for large static assets like images (especially in /assets/img/) and videos that are likely culprits in causing a bundled .zip file to go toward or beyond BigCommerce’s 50 MB limit.

Use WebDAV to upload these items to WebDAV’s remote /content/ directory. For WebDAV specifics, please see BigCommerce’s Knowledge Base articles on:

* Connecting to WebDav
* WebDAV Folder Structure
* 
Throughout your theme, reference each of these assets using Stencil’s `cdn` custom Handlebars helper – prepending the `webdav:` option to the `assetPath` parameter.

Prepending `webdav:` will build a URL in the remote WebDAV directory. This allows your theme’s deployed topology to diverge from any your local directory structure. As noted above, the `cdn` helper will treat `/content/` as the default/root WebDAV directory. So, for example, this statement:

`<img src="{{cdn "webdav:img/image.jpg"}}">`

will build the URL transformed below:

`<img src="https://cdn.bcapp/3dsf74g/content/img/image.jpg">`

On your local machine, move the large static assets to a location where the `stencil bundle` command will ignore them. This can be a location outside your theme's directory, or it can be the `<theme-name>/assets/cdn/` subdirectory, which `stencil bundle` excludes from bundling. Separating these assets is necessary to exclude them from the next step.

Run or re-run the `stencil bundle` command from inside your streamlined <theme‑name> directory. Once your resulting `.zip` file is 50 MB or smaller, you are ready to [upload it to BigCommerce]().

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">
    
<!-- theme: warning -->

### URL References to Assets

> Both in production and locally, subdirectories of your theme’s assets/ directory – like img/,js/, and fonts/ – are parallel to its scss/ subdirectory. So within your CSS, path references to such assets should reflect this parallel relationship – for example: ../img/test.jpg.

</div>
</div>
</div>

### WebDAV Folders and Stencil Themes

If you have used WebDAV in developing BigCommerce’s earlier (Blueprint) generation of themes, you will see some differences when uploading Stencil themes.


The directories accessible through WebDAV will dynamically change, depending on the type of theme that is active in the merchant’s store, as follows:

## WebDAV Folders and Stencil Themes

If you have used WebDAV in developing BigCommerce's earlier (Blueprint) generation of themes, you will see some differences when uploading Stencil themes.<br><br>

The directories accessible through WebDAV will dynamically change, depending on the type of theme that is active in the merchant's store, as follows:<p></p>

<table>
  <tr>
    <td><b>Available while the merchant's active theme is Blueprint:</b></td>
    <td class=""><b>Available while the merchant's active
      theme is Stencil:</b></td>
  </tr>
  <tr>
    <td>/content/</td>
    <td>/content/</td>
  </tr>
  <tr>
    <td>/product_images/</td>
    <td>/product_images/</td>
  </tr>
  <tr>
    <td>/product_downloads/</td>
    <td>/product_downloads/</td>
  </tr>
  <tr>
    <td>/import_files/</td>
    <td>/import_files/</td>
  </tr>
  <tr>
    <td>/exports/</td>
    <td>/exports/</td>
  </tr>
  <tr>
    <td>/template/</td>
    <td>-</td>
  </tr>
  <tr>
    <td>/mobile_template/</td>
    <td>-</td>
  </tr>
 </table>

<i>The overall difference is that the WebDAV `/template/` and `/mobile_template/` directories are <b>not</b> available for Stencil themes. These templates must reside and remain within your Stencil theme's local directory and file structure.</i>

---

## Organizing Your Theme

For themes that would otherwise exceed BigCommerce's 50 MB limit on uploads, delivering your theme's large static assets via a CDN (content delivery network) is an alternative to the simpler WebDAV approach.

The advantage of this alternative is that all assets stay within your theme's directory, so your theme's local structure matches its deployed structure. The disadvantage is that the procedure outlined below requires the expense of a CDN.

To stage your theme for CDN delivery, you would locally store your large static assets within your theme's
`<theme-name>/assets/cdn/` subdirectory. By design, the `stencil bundle` command omits this subdirectory's contents. So those contents do not count against the 50 MB limit on the resulting `.zip` file.

Then, as you develop your theme, reference each of these assets using Stencil's `cdn` custom Handlebars helper, like below:

`<img src="{{cdn "webdav:img/image.jpg"}}">`

**Note:** _The presumed WebDAV root directory is /content/. (So, in this example, the `image.jpg` file had been uploaded to the WebDAV `/content/` directory.) The presumed local directory is `<theme-name>/assets/`, so you can omit that path when referencing its contained files or subdirectories._

When you are ready to upload your theme to BigCommerce, follow the procedure in [Bundling and Submitting a Theme](/stencil-docs/shipping-a-theme/bundling-and-submitting).

