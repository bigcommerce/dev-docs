<h1>Google Analytics Enhanced ECommerce</h1>
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#google-analytics_prerequisites">Prerequisites</a></li>
    <li><a href="#google-analytics_implementing">Implementing Data Tags</a></li>
    <li><a href="#google-analytics_data-tag-ref">Data Tag Reference</a></li>
    <li><a href="#google-analytics_additional-resources">Additional Resources</a></li>
	</ul>
</div>

Google Analytics is a free analytics tool that helps you track visitors and conversions on your store. BigCommerce has updated the Google Analytics integration to support Enhanced Ecommerce.  As apart of the Enhanced ECommerce feature, Stencil themes now support Data Tags. 

Data Tags provide detailed data on the way shoppers interact with your store’s products. However, data tags are not limited to only product data collection. Data Tags can also track your store’s header and footer for promotions and can collect data on whether those promotions were viewed and/or clicked. BigCommerce’s Data Tags are powered by [Segment](https://segment.com/docs/destinations/google-analytics/) and [Platform.js](https://github.com/segment-integrations/analytics.js-integration-google-analytics/blob/master/lib/index.js), and will send your store’s product data through to Google Analytics. 

Cornerstone versions 2.6.0+ will have Data Tags already included in the theme.

<div class="HubBlock--callout">
<div class="CalloutBlock--error">
<div class="HubBlock-content">
    
<!-- theme: error -->

### GAEE for Blueprint
> While you can implement data tags with Blueprint themes, we do not currently have specific documentation on how to do this. The data tag HTML structure, however, will be the same as it is in a Stencil theme. 

</div>
</div>
</div>

<a href='#google-analytics_prerequisites' aria-hidden='true' class='block-anchor'  id='google-analytics_prerequisites'><i aria-hidden='true' class='linkify icon'></i></a>

## Prerequisites

* Current active BigCommerce store
* Using [Optimized One-Page Checkout](https://support.bigcommerce.com/s/article/Optimized-Single-Page-Checkout)

Data Tags will work on any theme. For this tutorial, we will be adding data tags to the Cornerstone theme. 

### Downloading a Theme
This tutorial will be based off of Cornerstone. If you do not already have a local copy of Cornerstone on your machine, see [Downloading the Cornerstone Theme](/stencil-docs/getting-started/advanced-installation-options/downloading-the-cornerstone-theme).

If you would like to implement Data Tags on your custom theme and do not already have a copy of your custom theme downloaded, see [Downloading/Customizing Marketplace Themes](/stencil-docs/getting-started/advanced-installation-options/downloading-a-marketplace-theme).

Note: the remainder of this tutorial will be working off the refer to the theme’s base folder as ‘cornerstone’.

---

<a href='#google-analytics_implementing' aria-hidden='true' class='block-anchor'  id='google-analytics_implementing'><i aria-hidden='true' class='linkify icon'></i></a>

## Implementing Data Tags on a Cornerstone Based Theme

### Include the Enhanced ECommerce Property

1. Open your local copy of your theme and navigate to the theme’s <span class="fp">cornerstone/config.json</span> file.

2. In the config.json file, navigate to the features array. There’s should be a property in this array called `enhanced ecommerce`. If the `enhanced ecommerce` property is not present in the features array, add it. The features object should then look similar to the code below.


<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">Enhanced ECommerce Feature</div>
    </div><div class="HubBlock-header-subtitle">config.json</div>
</div>

<!--
title: "Enhanced ECommerce Feature"
subtitle: "config.json"
lineNumbers: true
-->

```json
    "features": [
      "fully_responsive",
      "mega_navigation",
      "multi_tiered_sidebar_menu",
      "masonry_design",
      "frontpage_slideshow",
      "quick_add_to_cart",
      "switchable_product_view",
      "product_comparison_table",
      "complex_search_filtering",
      "customizable_product_selector",
      "cart_suggested_products",
      "free_customer_support",
      "free_theme_upgrades",
      "high_res_product_images",
      "product_filtering",
      "advanced_quick_view",
      "product_showcase",
      "persistent_cart",
      "one_page_check_out",
      "product_videos",
      "google_amp",
      "customized_checkout",
      "account_payment_methods",
      "enhanced_ecommerce",
      "csrf_protection"
    ]
```

You are now ready to begin adding data tags into the HTML files across your Cornerstone theme. 

### Adding Data Tags into Cornerstone’s HTML files

Data tags must be manually added to a product in order to track shopper events and interactions with a product. Since data tags collect product data at a very granular level, you will have to add tags in multiple locations for a single product to get a comprehensive look at the product's data. It's imperative to note that a product can be viewed by clicking any of the following:

* The name of the product
* The “Quick View” Button
* The product image

So, if you would like to track the clicks on a specific product, in order to ensure you get a fully comprehensive look at shoppers’ interactions with a product, you will want to include a data tag on each of these fields. If a specific product possesses multiple data tags, the data tag that is closest to the product is the one that  will track clicks, product impressions, or product views.

Data tags will be implemented in your store by using simple HTML. In order to begin tracking, you will add data tags as an attribute to the already existing HTML tags present in your theme. 

See [Pull Request #1377](https://github.com/bigcommerce/cornerstone/pull/1377/commits/55fc73eeb1edc6e140005ca811f090f06ab35435) to see how Data Tags were implemented in Cornerstone 2.6.0.

### Data Tag Implementation Example

You can see a data tag implemented in the HTML form tag in the code sample below:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">Data Tag HTML</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "Data Tag HTML"
subtitle: ""
lineNumbers: true
-->

```html
<form action="{{urls.compare}}" method='POST' data-list-name="Brand: {{brand.name}}" data-product-compare>
    {{#if theme_settings.product_list_display_mode '===' 'grid'}}
        {{> components/products/grid products=brand.products show_compare=brand.show_compare theme_settings=theme_settings event="list"}}
    {{else}}
        {{> components/products/list products=brand.products show_compare=brand.show_compare theme_settings=theme_settings event="list"}}
    {{/if}}
</form>

{{> components/common/paginator pagination.brand}}
```

In the above snippet, the data tag is embedded in a `<form>` HTML tag. The data tag is `data-list-name` and its value is `“Brand: {{brand.name}}”`.

---

<a href='#google-analytics_data-tag-ref' aria-hidden='true' class='block-anchor'  id='google-analytics_data-tag-ref'><i aria-hidden='true' class='linkify icon'></i></a>

## Data Tag Reference

Currently, BigCommerce supports 11 different data tags. Below is a table with a breakdown of each tag and its description.

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">
    
<!-- theme: warning -->

### Mandatory Data
> * If tracking promotions data, either `data-banner-id` or `data-name` is required.
* If tracking data for a product, either `data-entity-id` or `data-name` is required.
* If tracking data for a product list, `data-product-list` or `data-entity-id` is required.

The “tracked product” refers to the product on which you are inserting the data tag.

</div>
</div>
</div>

<table>
  <tr>
  	<th>Data Tag</th>
    <th>Description</th>
  	<th>Value Type</th>
  	<th>Example</th>
  </tr>
   <tr>
     <td><code>data-list-name</code></td>
     <td>The <code>data-list-name</code> tag denotes the name of the list that will be reflected on Google Analytics.</td>
  	<td>string or handlebars helper</td>
     <td> <b>String Example</b>:<code>data-list-name=“Kitchen Appliances”</code> 	
       <br><br>
<b>Handlebars Value Example</b>: The <code>data-list-name</code> tag can also get its value using Handlebars. For example, if you are adding a data tag to your carousel products in products/carousel.html, you could create the tag <code>data-list-name="{{list}}"</code> and define the list value in products/new.html to be: <code>list="New products"</code></td>
  </tr>
   <tr>
     <td><code>data-entity-id</code></td>
     <td>The <code>data-entity-id</code> is equal to the tracked item’s id.</td>
  	<td>integer</td>
    <td><code>data-entity-id=12</code></td>
  </tr>
   <tr>
    <td><code>data-position</code></td>
       <td>The <code>data-position</code> tag is equal to the tracked product’s position or the tracked promotion’s position.</td>
  	<td>If the data-tag is for a promotion, the value type should be string. The string should denote where the promotion is.
       <br><br>
       Value is an integer if creating the data tag for a product. The integer should represent the product’s placement. An example use case for this data tag is to answer a question like, “does the product in position one sell more than the product in position four?”</td>
       <td><b>String Value Example:</b> <code>data-position="center"</code>
       <br><br>
         <b>Integer Value Example:</b> <code>data-position=2
</code>
       </td>
  </tr>
     <tr>
    <td><code>data-banner-id</code></td>
       <td>The <code>data-banner-id</code> tag is the id of the banner being tracked. The banner id is not to be mistaken with the promotion id.</td>
  	<td>integer</td>
       <td><code>data-banner-id=5</code></td>
  </tr>
     <tr>
  	<td><code>data-event-type</code></td>
       <td>The <code>data-event-type</code> tag is equal to the shopper event that will be tracked. There are four shopper/product interactions you can measure and set. Custom events are not yet implemented.</td>
  	<td>string that can be either:
      <ul>
        <li>“promotion”</li> 
        <li>“promotion click”</li>
        <li>“product”</li>
        <li>“list”</li>
       <td><code>data-event-type=“promotion”</code></td>
  </tr>
     <tr>
  	<td><code>data-name</code></td>
       <td>The <code>data-name</code> tag is equal to the tracked product’s or banner’s name. 
</td>
  	<td>string or handlebars helper</td>
       <td><b>String Value Example:</b> <code>data-name=“Ruffle Off-the-Shoulder Top”</code>
         
         <br><br>
         
         <b>Handlebars Value Example:</b> The <code>data-name</code> tag can also get its value using Handlebars.

 For example, if you are adding a data tag to your footer in products/footer.html, you could create the tag: <code>data-name=”{{this.banner-name}}”</code>

Alternatively, if you are adding a data tag to a product list item in products/list-item.html, you could create the tag below <code>data-name=“{{name}}”</code> as long as these values are defined.</td>
  </tr>
     <tr>
  	<td><code>data-product-category</code></td>
       <td>The <code>data-product-category</code> tag is equal to the tracked product’s category.
</td>
  	<td>string</td>
       <td><code>data-product-category=“Women’s Apparel”</code></td>
  </tr>
     <tr>
  	<td><code>data-product-brand</code></td>
       <td>The <code>data-product-brand</code> tag is equal to the tracked product’s brand.
</td>
  	<td>string</td>
       <td><code>data-product-brand=“Ralph Lauren Corporation”</code></td>
  </tr>
     <tr>
  	<td><code>data-product-price</code></td>
       <td>The <code>data-product-price</code> tag is equal to the tracked product’s price.
</td>
  	<td>integer</td>
       <td><code>data-product-price=“27.99”</code></td>
  </tr>
     <tr>
  	<td><code>data-product-sku</code></td>
       <td>The <code>data-product-sku</code> tag is equal to the tracked product’s sku value.
</td>
  	<td>string</td>
       <td><code>data-product-sku=”S18T-Ots-YM”</code></td>
  </tr>
     <tr>
  	<td><code>data-product-variant</code></td>
       <td>The <code>data-product-variant</code> is equal to the tracked product’s variant.
</td>
  	<td>string</td>
       <td><code>data-product-variant=”4-Yellow”</code></td>
  </tr>
</table>

---

<a href='#google-analytics_additional-resources' aria-hidden='true' class='block-anchor'  id='google-analytics_additional-resources'><i aria-hidden='true' class='linkify icon'></i></a>


## Resources

### Pull Requests
* [Cornerstone PR #1377](https://github.com/bigcommerce/cornerstone/pull/1377/commits/55fc73eeb1edc6e140005ca811f090f06ab35435) (BigCommerce Github)
* [Google Analytics Product Data Tags](https://github.com/bigcommerce/cornerstone/commit/9a4ddcae7f531a9d542aeb8ebf38c8bda2656b1c) (BigCommerce Github)
### Related Articles
* [Customizing the BigCommerce Google Analytics Enhanced ECommerce Integration](https://medium.com/bigcommerce-developer-blog/customizing-the-bigcommerce-google-analytics-enhanced-ecommerce-integration-803d4338d018) (BigCommerce Developer Blog)
### Additonal Resources
* [Google Analytics Enhanced ECommerce](https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#ecommerce-data) (Google)

