<h1>Staging A Theme for CDN Delivery</h1>

<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#staging_sizing-your-theme">Organizing Your Theme</a></li>
	</ul>
</div>

<a href='#staging_sizing-your-theme' aria-hidden='true' class='block-anchor'  id='staging_sizing-your-theme'><i aria-hidden='true' class='linkify icon'></i></a>

## Organizing Your Theme

For themes that would otherwise exceed BigCommerce's 50 MB limit on uploads, delivering your theme's large static assets via a CDN (content delivery network) is an alternative to the simpler WebDAV approach.

The advantage of this alternative is that all assets stay within your theme's directory, so your theme's local structure matches its deployed structure. The disadvantage is that the procedure outlined below requires the expense of a CDN.

To stage your theme for CDN delivery, you would locally store your large static assets within your theme's
`<theme-name>/assets/cdn/` subdirectory. By design, the `stencil bundle` command omits this subdirectory's contents. So those contents do not count against the 50 MB limit on the resulting `.zip` file.

Then, as you develop your theme, reference each of these assets using Stencil's `cdn` custom Handlebars helper, like below:

`<img src="{{cdn "webdav:img/image.jpg"}}">`

**Note:** _The presumed WebDAV root directory is /content/. (So, in this example, the `image.jpg` file had been uploaded to the WebDAV `/content/` directory.) The presumed local directory is `<theme-name>/assets/`, so you can omit that path when referencing its contained files or subdirectories._

When you are ready to upload your theme to BigCommerce, follow the procedure in [Bundling and Submitting a Theme](/stencil-docs/prepare-and-upload-a-theme/bundling-and-uploading).

