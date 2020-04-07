# Troubleshooting Theme Uploads

<div class="otp" id="no-index">

### On This Page
- [Restrictions](#restrictions)
- [Error Codes](#error-codes)
- [Warnings](#warnings)
- [Workarounds and Further Info](#workarounds-and-further-info)

</div> 

## Restrictions

Custom theme uploads must meet these restrictions:

* You may upload a maximum of 20 custom themes at a time to the control panel's `Store Design` > `My Themes` section.
* If you reach this maximum, you can delete custom themes to make room for more uploads.
* Before uploading, you must package custom themes into a Stencil-specific `.zip` file format, using Stencil CLI's `stencil bundle` command.
* A theme's `.zip` file must be no larger than 50 MB. If your file exceeds that size, please use either a WebDAV or a CDN upload to exclude large static assets.
* Generated parsed template files must be less than 1 MB.

## Error Codes

<table>
  <tr>
    <th>Error Code</th>
    <th>Meaning</th>
  </tr>
  <tr>
    <td>TR-100, -101, -700, -1200, -1300</td>
    <td>A server error occurred.</td>
  </tr>
  <tr>
    <td>TR-200</td>
    <td>Problem uploading the theme.</td>
  </tr>
  <tr>
    <td>TR-300</td>
    <td>Invalid .zip file. (Among other possible root causes, this can indicate an included <code>bundle.js.map</code> source-map file that exceeds its size limit of 5 MB. As a workaround, move this file outside your theme directory before re-running <code>stencil bundle</code>).</td>
  </tr>
  <tr>
    <td>TR-301</td>
    <td>Failed to unzip file.</td>
  </tr>
  <tr>
    <td>TR-400</td>
    <td>The .zip contains restricted/invalid file(s) - e.g., a file with an invalid extension.</td>
  </tr>
  <tr>
    <td>TR-500</td>
    <td>The .zip file is larger than the 50MB limit; or the parsed JSON for templates exceeds the 1MB size limit.</td>
  </tr>
  <tr>
    <td>TR-600</td>
    <td>The .zip file is missing a required file (<code>theme-name/templates/pages/home.html</code>).</td>
  </tr>
  <tr>
    <td>TR-601</td>
    <td>The .zip file is missing some parsed template file(s); or, one or more non-<code>.html</code> files are present in the <code>theme-name/templates/</code></nobr> subdirectory.</td>
  </tr>
  <tr>
    <td>TR-800</td>
    <td>There was a problem processing the contained config.json file. <b>Please check the config.json documentation for required keys and for keys that require values.</b></td>
  </tr>
  <tr>
    <td>TR-900</td>
    <td>The contained config.json file is missing required developer information.</td>
  </tr>
  <tr>
    <td>TR-901</td>
    <td>A theme variation defined in the contained config.json file is missing its required external ID.</td>
  </tr>
  <tr>
    <td>TR-902</td>
    <td>Two or more theme variations defined in the contained config.json file share a external ID. All external IDs must be unique.</td>
  </tr>
  <tr>
    <td>TR-1000</td>
    <td>There was a problem processing the contained <a href="/stencil-docs/stencil-theme-editor/schema-json-metadata">schema.json</a> file.</td>
  </tr>
  <tr>
    <td>TR-1001</td>
    <td>The theme is missing its required <a href="/stencil-docs/stencil-theme-editor/schema-json-metadata">schema.json</a> file.</td>
  </tr>
  <tr>
    <td class="">TR-1400</td>
    <td class="">There was a problem processing template <a href="/stencil-docs/front-matter/front-matter-overview">front matter</a>.</td>
  </tr>
  <tr>
    <td>TR-1401</td>
    <td>There was a database validation error when saving <a href="/stencil-docs/front-matter/front-matter-overview">front matter</a> to the database.</td>
  </tr>
  <tr>
    <td>TR-1500</td>
    <td>There was a problem uploading your files, due to multi-threading (multiple simultaneous uploads). Please try again.</td>
  </tr>
  <tr>
    <td>TR-1600</td>
    <td>There was a temporary problem on our system. Please try again.</td>
  </tr>
  <tr>
    <td>TR-1601</td>
    <td>There was a problem processing screenshots.</td>
  </tr>
  <tr>
    <td>TR-1700, -1800, -1801, -1802, -1803</td>
    <td>System error, possibly temporary. Please try again.</td>
  </tr>
  <tr>
    <td>TR-3402</td>
    <td>You are not allowed to edit your active theme. [Please select <code>Make a Copy</code>, then edit the resulting copy of your theme.]</td>
  </tr>
  <tr>
    <td>TR-4400</td>
    <td>One or more values in the <code>config.json</code> file exceed the 64-character limit. (Can also indicate string lengths that exceed their limits in other JSON files.)</td>
  </tr>
 </table>

## Warnings

Warnings will not block a theme's upload, but these onscreen and/or log messages notify you of problems within the zipped theme. Here are the warnings and their meanings:

| Warning |
|-|
| (These messages do not have numeric codes) |
| Issue in processing this theme's thumbnail screenshot (`composed_image`). |
| Issue in processing this theme's full-size screenshot (`desktop_screenshot`). |
| Issue in processing this theme's mobile [screenshot](/stencil-docs/stencil-theme-editor/config-json-metadata) (`mobile_screenshot`). |
| Missing file: This theme does not support Theme Editor, as it is missing its required `[schema.json]` file. |
| One or more of this theme's screenshots are not image files. |
| Theme is missing a valid thumbnail image `composed_image`). |
| Theme is missing a valid full-size image `desktop_screenshot`). |
| Theme is missing a valid mobile image (`mobile_screenshot`). |
| One or more of this theme's images is not of a supported file type. Valid filetypes are: `.jpg`, `.jpeg`, `.png`, `.gif`. |
| Thumbnail (`composed_image`) image dimensions are not right. Expected 600 x 760 pixels. |
| Full-size (`desktop_screenshot`) image dimensions are not right. Expected 2048 x 2600 pixels. |
| Mobile (`mobile_screenshot`) image dimensions are not right. Expected 304 x 540 pixels. |
| Too-large image file size for a theme screenshot `composed_image` (thumbnails), `desktop_screenshot`, or `mobile_screenshot`] . The maximum supported size is x, but the file's actual size is y. |

## Workarounds and Further Info

If a custom theme does not render properly after you upload and apply it to a storefront, make sure you have created the theme's `.zip` file using the `stencil bundle` command, on a Mac OS, Linux computer, or virtual machine. This will exclude Windows-specific errors that have occurred on some bundles.

If you repeatedly encounter the same error or warning and neither this page nor our KB resolves the problem, see support resources for theme developers in our [Developer Community](https://forum.bigcommerce.com/s/group/0F913000000HLjECAW/bigcommerce-developers).
