# Theme Development Best Practices Tutorial

<div class="otp" id="no-index">

### On this page
- [Importing images](#importing-images)
- [Injecting variables](#injecting-variables)
- [Using Lighthouse](#using-lighthouse)
- [Designing for accessibility](#designing-for-accessibility)
- [Resources](#resources)
</div>

In this tutorial, you will learn the correct way to import theme images and inject theme variables. Also, theme developers will learn how to improve theme designs using [Lighthouse](https://developers.google.com/web/tools/lighthouse) and [accessibility best practices](https://developer.bigcommerce.com/stencil-docs/theme-accessibility).

## Importing images
There are two ways to import images. The quickest and easiest way to import images is to:
1. Connect your store via the [WebDAV](https://support.bigcommerce.com/s/article/File-Access-WebDAV) client of your choice.
2. Add images to the `/content` directory.
3. Reference images from there, as shown in the examples below:

```json
<img src="/content/image.jpg">
```
If you upload the image using a WebDAV client, you can access it within the theme using the `cdn` handlebar helper as follows:

```json
{{cdn "webdav:/img/image.jpg"}}
```
The WebDAV import option allows you to upload images in bulk. However, we suggest that you select the specific files needed and not import the entire markup file or unessential files as this can affect page load time.

To learn about the BigCommerce folder structure best practices, see [Folder Structure](https://support.bigcommerce.com/s/article/File-Access-WebDAV#folder).

The second way to import images is to use the image manager within the control panel.
1. In the control panel, go to **Storefront** > **Image Manager**.
2. Click **Upload images...**
3. Click **Choose File** (or Browse) and select an image from your computer. Repeat for each additional image.
4. Click **Upload**.

When importing images, ensure images are appropriately-sized and have low byte size to increase a store's site speed. We recommend using a recent Stencil theme which uses responsive images. Once you have that, the best practice is to upload the best quality images you have, and BigCommerce will take care of optimizing them. JPEGs are recommended over other formats. See [Optimizing your Images](https://support.bigcommerce.com/s/article/Optimizing-Your-Images) for more details on how to optimize images.

## Injecting variables

Injecting javascript context variables allow you to access variables as needed to customize your theme. You can inject javascript context variables using the `inject` helper. The `inject` helper can be sent to the browser. Below is an example of an inject helper that can be added to your code.

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

Google [Lighthouse](https://developers.google.com/web/tools/lighthouse) is an open-source tool used to improve the performance, quality, accessibility, best practices, and more for web pages. Enter a URL into Lighthouse, and it will generate a series of audits against the page. We highly encourage you to use Lighthouse as a validation step.

We recommend that you use Lighthouse to focus on the following metrics for optimizing your BigCommerce store.
* [Largest Contentful Paint (LCP)](#largest-contentful-paint)
* [First Input Delay (FID)](#first-input-delay)
* [Cumulative Layout Shift (CLS)](#cumulative-layout-shift)

### Largest Contentful Paint
LCP is the metric that reports the time it takes to display the largest image on the screen. This metric is important because page speed ensures visitors receive the best performance and presentation of the site.

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
* Use an image CDN
* Optimize your server

### First Input Delay
FID is the metric that measures the delay users experience when interacting with a page. It is the time it takes for the site to respond when a user clicks a link, selects a button, taps on the screen, etc.

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

**Good score:**
The optimal FID score is 100 milliseconds or less. 

</div>
</div>
</div>

To improve FID:
* Reduce the effect of third-party code
* Reduce JavaScript execution time
* Reduce duration of your longest task

Lighthouse does not display FID since it can only be measured in the field. Real user interaction is needed in order to measure the response delay. Instead, Lighthouse displays Total Blocking Time (TBT) which also captures a user's interactivity. Improvements to TBT will also improve your FID score.

A good TBT score is 300 milliseconds or less.

### Cumulative Layout Shift (CLS)

CLS is the metric that measures visual stability. This metric measures how often users experience unexpected layout shifts. A layout shift is when a visible element changes its position from one rendered frame to the next. For example, a layout shift can occur when a user is viewing a page and a video moves on top of the home carousel. These unexpected movements can result in an unpleasant experience for the user.

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

**Good score:**
The optimal CLS score is 0.1 seconds or less. 

</div>
</div>
</div>

To improve CLS:
* Add size attributes to elements
* Reserve space for injected content
* Avoid inserting ads or banners dynamically
* Ensure to load critical CSS before content

### Optimization example

In this example, the performance score is currently 47. The LCP score is 6.2s, the TBT score is 410 ms, and the CLS score is 1.137 which are all less than optional scores.

![Performance Metrics](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/performance-example-1.png "Performance Metrics")

To improve performance, let's start by removing usused JavaScript. Lighthouse and the **Coverage** tab offers suggestions of unused JavaScript code that can be removed. The red section of the bar is unused bytes. The green section is used bytes.

![Coverage tab](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/performance-example-2.png "Coverage tab")

In addition to removing unused bytes, you can minify, compress, and refractor CSS/JavaScript files. This includes removing line breaks, whitespace, and comments.

**Minify example**

```json
code {
padding: 1px 5px 1px 5px;
font-family: Consolas, Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, 
    Bitstream Vera Sans Mono, Courier New, monospace, serif;
background-color: #eeeeee;}
```

```json
code {padding: 1px 5px 1px 5px;font-family: Consolas, Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;background-color: #eeeeee;}
```

Lighthouse displays information relevant to elements contributing to the CLS score. In this example, the banner above the carousel causes a loading issue. Once the image is resized or removed the CLS score improves.

After removing some unused bytes, minifying JavaScript files, and resizing an image, the performance score is 77. The LCP score is now 4.3s, the TBT score is 120 ms and the CLS score is 0.001. You can continue to remove additional unused bytes to improve your performance score and metrics. 

![Improved Performance Metrics](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/performance-example-3.png "Improved Performance Metrics")

Using Lighthouse is an important step in optimizing your site and improving the user experience. It is an easy to use best practice tip that provides powerful insights. 

## Designing for accessibility

Accessible sites have benefits, including faster load speed, better SEO, and useful for marketing your product. See [Developing Themes for Accessibility](https://developer.bigcommerce.com/stencil-docs/theme-accessibility) for more information.

## Resources
- [File Access (WebDAV)](https://support.bigcommerce.com/articles/Public/File-Access-WebDAV/)(knowledge Base)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Designing for Accessibility]()
- [Folder Structure](https://support.bigcommerce.com/s/article/File-Access-WebDAV#folder)
