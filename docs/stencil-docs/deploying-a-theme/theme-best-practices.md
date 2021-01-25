# Theme Development Best Practices Tutorial

<div class="otp" id="no-index">

### On this page
- [Importing theme images](#importing-theme-images)
- [Injecting theme variables](#injecting-theme-variables)
- [Using Lighthouse](#using-lighthouse)
- [Designing for accessibility](#designing-for-accessibility)
- [Resources](#resources)
</div>

In this tutorial, you will learn the correct way to import theme images and inject theme variables. Also, developers will learn how to improve theme designs using [Lighthouse](https://developers.google.com/web/tools/lighthouse) and [Accessibility best practices]().

## Importing images
There are two ways to import images. The quickest and easiest way to import images is to:
1. Connect your store via the [WebDAV](https://support.bigcommerce.com/s/article/File-Access-WebDAV) client of your choice.
2. Add images to the /content/folder directory.
3. Reference images from there, as shown in the examples below:

```json
<img src="/content/image.jpg">
```
If image is uploaded to WebDAV, you can access it within the theme using cdn handlebar helper as follows:

```json
{{cdn "webdav:/img/image.jpg"}}
```
The WebDAV import option allows you to upload images in bulk. However, we suggest that you select the specific files needed and not import the entire markup file or unessential files as this can affect page load time.

To learn about the BigCommerce folder structure best practices, see [Folder Structure](https://support.bigcommerce.com/s/article/File-Access-WebDAV#folder).

The second way to import images is to use the image manager within the Control Panel.
1. In the Control Panel, go to **Storefront** > **Image Manager**.
2. Click **Upload images...**
3. Click **Choose File** (or Browse) and select an image from your computer. Repeat for each additional image.
4. Click **Upload**.

When importing images ensure images are appropriately-sized and have low byte size to increase the speed of the page. See [Optimizing your Images](https://support.bigcommerce.com/s/article/Optimizing-Your-Images) for more details on how to adjust images.

## Injecting variables

Injecting javascript context variables allows you to access variables as needed to customize your theme. You can inject javascript context variables using the `inject` helper. The `inject` helper can be sent to the browser. Below is an example of an inject helper that can be added to your code.

```json
{inject "myProductName" product.title}}

<script>
// Note the lack of quotes around the jsContext handlebars helper, it becomes a string automatically.
var jsContext = JSON.parse({{jsContext}});

/* jsContext would output "{\"myProductName\": \"Sample Product\"}" which can feed directly into
your JavaScript. */

console.log(jsContext.myProductName); // Will output: Sample Product
</script>
```

We suggest injecting only specific files and only the variables you need. If you inject all settings, you could accidently inject PII (Personally-Identifying Information) and cause performance issues with your site.

## Using Lighthouse

Google [Lighthouse](https://developers.google.com/web/tools/lighthouse) is an open-source tool used to improve the performance, quality, accessibility, best practices, and more for web pages.

Enter an URL into Lighthouse, and it will generate a series of audits against the page. We highly encourage you to use Lighthouse as a validation step.

## Designing for accessibility

Accessible sites have benefits, including faster load speed, better SEO and useful for marketing your product. See [Developing Themes for Accessibility]() for more information.

## Resources
- [File Access (WebDAV)](https://support.bigcommerce.com/articles/Public/File-Access-WebDAV/)(knowledge Base)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Designing for Accessibility]()
- [Folder Structure](https://support.bigcommerce.com/s/article/File-Access-WebDAV#folder)
