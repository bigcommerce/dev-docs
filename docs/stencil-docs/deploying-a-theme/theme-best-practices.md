# Theme Development Best Practices Tutorial

<div class="otp" id="no-index">

### On this page
- [Importing images](#importing-images)
- [Injecting variables](#injecting-variables)
- [Using Lighthouse](#using-lighthouse)
- [Designing for accessibility](#designing-for-accessibility)
- [Related resources](#related-resources)
</div>

In this tutorial, you will learn the correct way to import theme images and inject theme variables. Also, you will learn how to improve theme designs using [Lighthouse](https://developers.google.com/web/tools/lighthouse) and [accessibility best practices](https://developer.bigcommerce.com/stencil-docs/theme-accessibility).

## Importing images
There are two ways to import images. The steps below describe the quickest and easiest way to import images.
1. Connect to your store using the [WebDAV](https://support.bigcommerce.com/s/article/File-Access-WebDAV) client of your choice.
2. Add images to the `/content` directory.
3. Upload the images using a WebDAV client. You can access the images within the theme using the `cdn` Handlebars helper as follows:

```json
{{cdn "webdav:/img/image.jpg"}}
```
The WebDAV import option allows you to upload images in bulk. However, we recommend that you only select the specific files needed. Importing the entire markup folder or unessential files can affect page load time.

To learn about the BigCommerce folder structure best practices, see the [Folder Structure](https://support.bigcommerce.com/s/article/File-Access-WebDAV#folder) page in the Help Center.

The second way to import images is to use the image manager within the control panel:
1. In the control panel, go to **Storefront** > **Image Manager**.
2. Click **Upload images...**
3. Click **Choose File** (or **Browse**) and select an image from your computer. Repeat for each additional image.
4. Click **Upload**.

When importing images, ensure your images are high quality, the appropriate dimensions, and are low byte sizes. Doing this increases a store's site speed. We recommend using Stencil themes that support responsive images. Once you have selected a theme, upload the images you have, and BigCommerce will optimize them. We recommend JPEGs over other formats. For more details on how to optimize images, see [Optimizing your Images](https://support.bigcommerce.com/s/article/Optimizing-Your-Images).

## Injecting variables

Injecting JavaScript context variables allow you to access store data through your theme. You can inject JavaScript context variables using the `{{inject}}` Handlebars helper. Be sure to assign a custom variable name to the injected variable.

You can then use the `{{jsContext}}` Handlebars helper to access a stringified JSON object containing all injected data with your assigned custom variable names as keys in the key-value pairs. For more information, see [injection helpers](https://developer.bigcommerce.com/stencil-docs/reference-docs/handlebars-helpers-reference#inject). 

The code example below uses `{{inject}}` and `{{jsContent}}` to log the product name to your browser's console when added to Cornerstone's `product.html` file: 

```javascript
{{inject "myProductName" product.title}}

<script>
// Note the lack of quotes around the jsContext handlebars helper, it becomes a string automatically.
var jsContext = JSON.parse({{jsContext}});
/* jsContext would output "{\"myProductName\": \"Sample Product\"}" which can feed directly into
your JavaScript. */
console.log(jsContext.myProductName); // Will output: Sample Product
</script>
```

We recommend injecting only the variables you need. If you inject all settings, you could accidentlly inject PII (Personally-Identifying Information) and cause performance issues with your site.

## Using Lighthouse

Google [Lighthouse](https://developers.google.com/web/tools/lighthouse) is an open-source tool used to improve web page performance, quality, and accessibility. Enter a URL into Lighthouse, and it will generate a series of audits against the page. We highly encourage you to use Lighthouse as a validation step.

We recommend that you use Lighthouse to focus on the following metrics for optimizing your BigCommerce store.
* [Largest Contentful Paint](#largest-contentful-paint)
* [First Input Delay](#first-input-delay)
* [Cumulative Layout Shift](#cumulative-layout-shift)

### Largest Contentful Paint
Largest Contentful Paint (LCP) is the metric that reports the time it takes to display the largest image on the screen. This metric is important because page speed ensures visitors receive the best performance and presentation of the site.

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

**Good score:**
The optimal LCP score is 2.5 seconds or faster. 

</div>
</div>
</div>

To improve LCP:
* Make images smaller or remove anything preventing a quick download.
* Avoid JavaScript or external scripts to load images.
* Use an image CDN.
* Optimize your server.

### First Input Delay
First Input Delay (FID) is the metric that measures the delay users experience when interacting with a page. It is the time it takes for the site to respond when a user clicks a link, selects a button, taps on the screen, etc.

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

**Good score:**
The optimal FID score is 100 milliseconds or less. 

</div>
</div>
</div>

To improve FID:
* Reduce the effect of third-party code.
* Reduce JavaScript execution time.
* Reduce the duration of your longest task.

Lighthouse does not display FID since measuring the response delay requires real user interaction. Instead, Lighthouse displays Total Blocking Time (TBT) to gauge how long a page takes to become useable. TBT is the sum of task loading time over 50ms measured between the first text or image rendering and the time it takes for a fully interactive page. Improvements to TBT will also improve your FID score.

A good TBT score is 300 milliseconds or less.

### Cumulative Layout Shift

Cumulative Layout Shift (CLS) is the metric that measures visual stability. This metric measures how often users experience unexpected layout shifts. A layout shift is when a visible element changes its position from one rendered frame to the next. For example, a layout shift can occur when a user views a page and a video moves on top of the home carousel. These unexpected movements can result in an unpleasant experience for the user.

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

**Good score:**
The optimal CLS score is 0.1 seconds or less. 

</div>
</div>
</div>

To improve CLS:
* Add size attributes to elements.
* Reserve space for injected content.
* Avoid inserting ads or banners dynamically.
* Load critical CSS before the content.

### Optimization example

In this example, the performance score is currently 47. The LCP score is 6.2 s, the TBT score is 410 ms, and the CLS score is 1.137, which are all less than optimal scores.

![Performance Metrics](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/performance-example-1.png "Performance Metrics")

To improve performance, let's start by measuring usused JavaScript. In Chrome DevTools, the **Lighthouse** and **Coverage** tabs offer suggestions of unused JavaScript code that you can potentially remove. The red section of the bar represents unused bytes; the green section represents used bytes. It is important to note that unused JavaScript means your page has not used it yet. The JavaScript in red might be connected to event listeners that only fire when a user interacts with your page.

![Coverage tab](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/performance-example-2.png "Coverage tab")

In addition to removing unused code, you can minify, compress, and refactor CSS and JavaScript files by removing line breaks, whitespace, and comments.

**Minification example**

```css
.element-class {
padding: 1px 5px 1px 5px;
font-family: Consolas, Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, 
    Bitstream Vera Sans Mono, Courier New, monospace, serif;
background-color: #eeeeee;}
```

```css
.element-class{padding: 1px 5px 1px 5px;font-family: Consolas, Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;background-color: #eee;}
```

Lighthouse displays information relevant to elements contributing to the CLS score. In this example, the banner above the carousel causes a loading issue. Once the image is resized or removed the CLS score improves.

After removing some unused bytes, minifying JavaScript files, and resizing an image, the performance score is 77. The LCP score is now 4.3 s, the TBT score is 120 ms and the CLS score is 0.001. You can continue to remove additional unused bytes to improve your performance score and metrics. 

![Improved Performance Metrics](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/performance-example-3.png "Improved Performance Metrics")

Using Lighthouse is an important step in optimizing your site and improving the user experience. It is an easy to use best practice tip that provides powerful insights. 

## Designing for accessibility

Accessible sites have benefits, including faster load speed, better SEO, and useful for marketing your product. See [Developing Themes for Accessibility](https://developer.bigcommerce.com/stencil-docs/theme-accessibility) for more information.

## Related resources
- [File Access (WebDAV)](https://support.bigcommerce.com/articles/Public/File-Access-WebDAV/)(Knowledge Base)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Designing for Accessibility](https://developer.bigcommerce.com/stencil-docs/theme-accessibility)
- [Folder Structure](https://support.bigcommerce.com/s/article/File-Access-WebDAV#folder)
