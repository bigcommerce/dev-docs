# Checking a Theme's Size

<div class="otp" id="no-index">

### On this page
- [Shrinking a theme](#shrinking-a-theme)
- [Organizing a theme](#organizing-a-theme)
- [Resources](#resources)

</div> 

Ideally, your theme should bundle into an archive of only a few megabytes (MB). BigCommerce imposes a hard limit of 50 MB, but most themes do not approach this limit unless they include many large static assets. If your theme does not exceed 50 MB, follow the steps outlined in [Bundling and Pushing a Theme](https://developer.bigcommerce.com/stencil-docs/deploying-a-theme/bundling-and-pushing) to process and package your theme for upload to BigCommerce.


If your theme exceeds the 50 MB limit, you have two options:

* Shrink your theme with the help of WebDAV.
* Stage your theme for CDN delivery.

## Shrinking a theme

### Restructuring your theme

In this section, you will first isolate static assets from your theme's local directory, then use WebDAV to cloud-host those assets, and finally reference those assets using Stencil's `{{cdn}}` Handlebars helper. For an existing theme, make a backup of your whole `theme‑name` directory before proceeding.

Examine your theme's `assets` subdirectory and its intended contents. Check for large static assets like images, especially in `assets/img/`, and videos that are likely to cause a bundled ZIP file to exceed BigCommerce's 50 MB limit.

Use WebDAV to upload these items to WebDAV's `remote /content/` directory. For more information on WebDAV, see [Connecting to WebDAV](https://support.bigcommerce.com/s/article/File-Access-WebDAV).

Throughout your theme, reference each of these assets using Stencil’s `{{cdn}}` Handlebars helper, prepending the `webdav:` option to the `assetPath` parameter.

Prepending `webdav:` will build a URL in the remote WebDAV directory. This allows your theme's deployed topology to diverge from your local directory structure. The `{{cdn}}` helper will treat `content` as the root WebDAV directory. 

For example, this statement:

```
<img src="{{cdn "webdav:img/image.jpg"}}">
```

will build the following URL:

```
<img src="https://cdn.bcapp/3dsf74g/content/img/image.jpg">
```

On your local machine, move the large static assets to a location where the `stencil bundle` command will ignore them. This can be a location outside your theme's directory, or it can be the `assets/cdn/` subdirectory, which `stencil bundle` excludes from bundling. Separating these assets is necessary to exclude them from the next step.

Run the `stencil bundle` command from inside your streamlined `theme‑name` directory. Once your resulting ZIP file is 50 MB or smaller, you are ready to upload it to BigCommerce. For more information, see [Bundling and Pushing a Theme](https://developer.bigcommerce.com/stencil-docs/deploying-a-theme/bundling-and-pushing).

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">

<!-- theme: warning -->

### URL references to assets

> Both in production and locally, subdirectories of your theme's `assets` directory, such as `img`,`js`, and `fonts`, are parallel to its `scss` subdirectory. Within your CSS, path references to such assets should reflect this parallel relationship, for example: `../img/test.jpg`.

</div>
</div>
</div>

### WebDAV folders and Stencil themes

If you have used WebDAV in developing BigCommerce's Blueprint generation of themes, you will see some differences when uploading Stencil themes. Depending on the type of theme that is active in the merchant's store, the directories accessible through WebDAV will change as shown in the table below.

| Blueprint theme | Stencil theme |
| ----------- | ----------- |
| `content` | `content` |
| `product_images` | `product_images` |
| `product_downloads` | `product_downloads` |
| `import_files` | `import_files` |
| `exports` | `exports` |
| `template` | - |
| `mobile_template` | - |

The overall difference is that the WebDAV `template` and `mobile_template` directories are **not** available for Stencil themes. These templates must reside and remain within your Stencil theme's local directory and file structure.

## Organizing a theme

For themes that would otherwise exceed BigCommerce's 50 MB limit on uploads, delivering your theme's large static assets using a CDN is an alternative to WebDAV.

The advantage of this alternative is that all assets stay within your theme's directory, so your theme's local structure matches its deployed structure. The disadvantage is that the procedure outlined below requires the expense of a CDN.

To stage your theme for CDN delivery, you would locally store your large static assets within your theme's
`assets/cdn/` subdirectory. By design, the `stencil bundle` command omits this subdirectory's contents. So those contents do not count against the 50 MB limit on the resulting ZIP file.

As you develop your theme, reference each of these assets using Stencil's `{{cdn}}` custom Handlebars helper, for example:

```
<img src="{{cdn "webdav:img/image.jpg"}}">
```

<div class="HubBlock--callout">
<div class="CalloutBlock--">
<div class="HubBlock-content">

<!-- theme:  -->

> The presumed WebDAV root directory is `content`. In this example, the `image.jpg` file had been uploaded to the WebDAV `content` directory. The presumed local directory for other CDNs is `assets`, so you can omit that path when referencing its contained files or subdirectories.

</div>
</div>
</div>

When you are ready to upload your theme to BigCommerce, follow the process outlined in [Bundling and Pushing a Theme](https://developer.bigcommerce.com/stencil-docs/deploying-a-theme/bundling-and-pushing).

## Resources

### Related articles
* [Bundling and Pushing a Theme](https://developer.bigcommerce.com/stencil-docs/deploying-a-theme/bundling-and-pushing)
* [Naming Your Theme and Theme Variations](https://developer.bigcommerce.com/stencil-docs/deploying-a-theme/naming-your-theme)
* [Preparing Thumbnail Images](https://developer.bigcommerce.com/stencil-docs/deploying-a-theme/preparing-thumbnail-images)
* [File Access (WebDAV)](https://support.bigcommerce.com/s/article/File-Access-WebDAV#manual) (BigCommerce Knowledge Base)
