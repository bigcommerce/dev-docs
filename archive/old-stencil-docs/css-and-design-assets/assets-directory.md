<h1>Assets Directory</h1>
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#assets_the-assets-directory">Assets Directory</a></li>
    <li><a href="#assets_video-demo">Video Demo</a></li>
    <li><a href="#assets_restrictions-permissions">Restrictions/Permissions</a></li>
	</ul>
</div>

<a href='#assets_the-assets-directory' aria-hidden='true' class='block-anchor'  id='assets_the-assets-directory'><i aria-hidden='true' class='linkify icon'></i></a>

## Assets Directory

Each Stencil theme’s <span class="fp">{theme-name}/assets/</span> directory contains CSS, JavaScript, and image assets that help create the design of storefront pages. A minimal <span class="fp">{theme-name}/assets/</span> directory contains the files and subdirectories that you can view on the [Cornerstone Github Repository](https://github.com/bigcommerce/cornerstone/tree/master/assets).

We will go further into detail about the subdirectories within <span class="fp">/assets/</span> below: 

### CDN Subdirectory

The <span class="fp">/cdn/</span> subdirectory is designed to contain large static assets that you will upload to a content delivery network, separately from the rest of your theme. For this reason – and by design – the contents of this directory (only) are excluded from theme bundling. For details, see [Staging a Theme for CDN Delivery](https://developer.bigcommerce.com/stencil-docs/prepare-and-upload-a-theme/staging-a-theme).

### Fonts Subdirectory

The <span class="fp">/fonts/</span> subdirectory contains local versions of theme-specific fonts.

### Icons Subdirectory

The <span class="fp">/icons/</span> subdirectory contains .svg files for icons used within a theme.

### Img Subdirectory

The <span class="fp">/img/</span> subdirectory contains images used in the theme’s display – background images, sprites, and other images not related to store content.

You would typically reference these image assets using Stencil's CDN Handlebars helper. For example, generically:

`<img src="{{cdn 'assets/img/image.jpg'}}">`

Or, with a realistic file name:

`<img src="{{cdn 'assets/img/size-chart.png'}}">`

### Akamai Image Manager
For Stencil themes only, images that use the default zoom library pass through Akamai Image Manager. This chooses the best image to serve based on the device. To bypass the image optimization, include `imbypass=on` as a query parameter in the image URL. This will serve un-optimized images.

**Examples of image bypass:**
* `<img src="{{cdn 'webdav:img/image.jpg?imbypass=on'}}">`
* `<img src="{{getImage settings.store_logo.image 'logo_size'}}?imbypass=on">`
* `<img src="{{cdn 'assets/img/image.jpg?imbypass=on'}}">`

### JS Subdirectory

The <span class="fp">/js/</span> subdirectory contains general JavaScript files used in the theme.

### SCSS Subdirectory

The <span class="fp">/scss/</span> subdirectory contains theme-specific CSS resources.

<div class="HubBlock--callout">
<div class="CalloutBlock--success">
<div class="HubBlock-content">
    
<!-- theme: success -->

###  Production-Safe Image References
> To avoid unexpected 404 errors on your production store, we recommend that you use short relative paths in your SCSS to reference images in your <span class="fp">/img/</span> subdirectory. So, for example, use references of the form:
`background: url('../img/header-bg.png');` rather than references of the form:
`background: url('/assets/img/header-bg.png');`

</div>
</div>
</div>

---

<a href='#assets_video-demo' aria-hidden='true' class='block-anchor'  id='assets_video-demo'><i aria-hidden='true' class='linkify icon'></i></a>

## Video Demo

Watch a video tour of the <span class="fp">/assets/</span> directory, its `/scss/` subdirectory, interactions between CSS and <span class="fn">config.json</span> values, Stencil custom Sass functions, and the <span class="fp">/img/</span> subdirectory.

<iframe width="560" height="315" src="https://www.youtube.com/embed/zUDNgprOEts" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>


---

<a href='#assets_restrictions-permissions' aria-hidden='true' class='block-anchor'  id='assets_restrictions-permissions'><i aria-hidden='true' class='linkify icon'></i></a>

##  Directory and File Restrictions/Permissions

This section's remaining pages list certain restrictions on changing some subdirectories' structure, contents, and file names.

In parts of your theme's directory tree where you are free to add new subdirectories and files, be sure to:

* Set newly added directories to permission `755 (drwxr-xr-x)`.
* Set newly added files to permission `644 (rw-r--r--)`.
* Without these permissions, running your theme locally will fail, with multiple error messages. Bundling your theme will also fail, blocking its upload to a store.

