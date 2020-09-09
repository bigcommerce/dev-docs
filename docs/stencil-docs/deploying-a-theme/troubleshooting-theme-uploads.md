# Troubleshooting Theme Uploads

<div class="otp" id="no-index">

### On this page
- [Restrictions](#restrictions)
- [Error codes](#error-codes)
- [Warnings](#warnings)
- [Workarounds and further info](#workarounds-and-further-info)

</div> 

## Restrictions

Custom theme uploads must meet these restrictions:

* You may upload a maximum of 20 custom themes at a time to the control panel's `Storefront` > `My Themes` section.
* If you reach this maximum, you can delete custom themes to make room for more uploads.
* Before uploading, you must package custom themes into a Stencil-specific zip file format, using Stencil CLI's `stencil bundle` command.
* A theme's zip file must be no larger than 50 MB. If your file exceeds that size, please use either a WebDAV or a CDN upload to exclude large static assets.
* Generated parsed template files must be less than 1 MB.

## Error codes

| Error code | Meaning |
|:- | - |
| TR-100, -101, -700, -1200, -1300 | A server error occurred. |
| TR-200 | Problem uploading the theme. |
| TR-300 | Invalid zip file. (Among other possible root causes, this can indicate an included <code>bundle.js.map</code> source-map file that exceeds its size limit of 5 MB. As a workaround, move this file outside your theme directory before re-running <code>stencil bundle</code>). |
| TR-301 | Failed to unzip file. |
| TR-400 | The zip contains restricted/invalid file(s) - e.g., a file with an invalid extension. |
| TR-500 | The zip file is larger than the 50 MB limit, or the parsed JSON for templates exceeds the 1 MB size limit. |
| TR-600 | The zip file is missing a required file (<code>theme-name/templates/pages/home.html</code>). |
| TR-601 | The zip file is missing some parsed template file(s); or, one or more non-<code>.html</code> files are present in the <code>theme-name/templates/</code></nobr> subdirectory. |
| TR-800 | There was a problem processing the contained `config.json` file. <b>Please check the `config.json` documentation for the required keys and for keys that require values. |
| TR-900 | The contained `config.json` file is missing the required developer information. |
| TR-901 | A theme variation defined in the contained config.json file is missing its required external ID. |
| TR-902 | Two or more theme variations defined in the contained config.json file share a external ID. All external IDs must be unique. | 
| TR-1000 | There was a problem processing the contained <a href="/stencil-docs/stencil-theme-editor/schema-json-metadata">schema.json</a> file. |
| TR-1001 | The theme is missing its required <a href="/stencil-docs/stencil-theme-editor/schema-json-metadata">schema.json</a> file. |
| TR-1400 | There was a problem processing template <a href="/stencil-docs/front-matter/front-matter-overview">front matter</a>. |
| TR-1401 | There was a database validation error when saving <a href="/stencil-docs/front-matter/front-matter-overview">front matter</a> to the database. |
| TR-1500 | There was a problem uploading your files due to multi-threading (multiple simultaneous uploads). Please try again. |
| TR-1600 | There was a temporary problem on our system. Please try again. |
| TR-1601 | There was a problem with processing screenshots. |
| TR-1700, -1800, -1801, -1802, -1803 | System error, possibly temporary. Please try again. |
| TR-3402 | You are not allowed to edit your active theme. [Please select <code>Make a Copy</code>, then edit the resulting copy of your theme.] |
| TR-4400 | One or more values in the <code>config.json</code> file exceed the 64-character limit. (Can also indicate string lengths that exceed their limits in other JSON files.) |

## Warnings

Warnings will not block a theme's upload, but these onscreen and/or log messages notify you of problems within the zipped theme. Here are the warnings and their meanings:

| Warning |
|-|
| (These messages do not have numeric codes) |
| Issue in processing this theme's thumbnail screenshot (`composed_image`). |
| Issue in processing this theme's full-size screenshot (`desktop_screenshot`). |
| Issue in processing this theme's mobile [screenshot](/stencil-docs/stencil-theme-editor/config-json-metadata) (`mobile_screenshot`). |
| Missing file: This theme does not support the Theme Editor, as it is missing its required `[schema.json]` file. |
| One or more of this theme's screenshots are not image files. |
| Theme is missing a valid thumbnail image (`composed_image`). |
| Theme is missing a valid full-size image (`desktop_screenshot`). |
| Theme is missing a valid mobile image (`mobile_screenshot`). |
| One or more of this theme's images is not of a supported file type. Valid filetypes are: JPEG, PNG, GIF. |
| Thumbnail (`composed_image`) image dimensions are not right. The expected dimensions are 600 x 760 pixels. |
| Full-size (`desktop_screenshot`) image dimensions are not right. The expected dimensions are 2048 x 2600 pixels. |
| Mobile (`mobile_screenshot`) image dimensions are not right. The expected dimensions are 304 x 540 pixels. |
| Too-large image file size for a theme screenshot `composed_image` (thumbnails), `desktop_screenshot`, or `mobile_screenshot`] . The maximum supported size is x, but the file's actual size is y. |

## Workarounds and further info

If a custom theme does not render properly after you upload and apply it to a storefront, make sure you have created the theme's zip file using the `stencil bundle` command, on a Mac OS, Linux computer, or virtual machine. Using the `stencil bundle` command will exclude Windows-specific errors that have occurred on some bundles.

If you repeatedly encounter the same error or warning and neither this page nor our KB resolves the problem, see support resources for theme developers in our [Developer Community](https://forum.bigcommerce.com/s/group/0F913000000HLjECAW/bigcommerce-developers).
