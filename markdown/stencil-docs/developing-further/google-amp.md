<h1>Google AMP</h1>
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#google-amp_implement">Implement Google AMP into your Stencil theme</a></li>
    <li><a href="#google-amp_location-of-amp-files">Location of AMP Files within Cornerstone</a></li>
    <li><a href="#google-amp_local-testing">Local Testing</a></li>
	</ul>
</div>

Google AMP (Accelerated Mobile Pages) is an open-source project to improve page speed on mobile devices by using a specific framework for a page’s code. The improved performance on mobile devices provides a better browsing experience for shoppers and boosts ranking on Google search. To learn more about the Google AMP project, see [AMP Overview](https://www.ampproject.org/support/faqs/overview) on the Google AMP project site.

### Benefits of using Stencil with Google AMP

- AMP makes websites load fast on mobile.
- Google AMP has a positive effect on your store’s Search Engine Optimization (SEO).
- AMP websites are more accessible in search results.

The article will walk you through enabling Google AMP pages in your theme. 

<div class="HubBlock--callout">
<div class="CalloutBlock--">
<div class="HubBlock-content">
    
<!-- theme:  -->

> This example uses Cornerstone.

</div>
</div>
</div>

<a href='#google-amp_implement' aria-hidden='true' class='block-anchor'  id='google-amp_implement'><i aria-hidden='true' class='linkify icon'></i></a>

## Implement Google AMP into your Stencil theme

Google AMP will be automatically added if your store's theme is based on Cornerstone themes 1.6.0+.

Please see the user documentation on configuring Google AMP into your store via the [Control Panel](https://support.bigcommerce.com/articles/Public/Google-AMP?_ga=2.135679409.1406470381.1541441523-967431010.1523308107).

If you are using a custom theme for your storefront, you will have to perform a few extra steps in order to fully configure Google AMP on your store. Reference the text information and code samples below to do so. If you do not have a custom theme, you can bypass the remainder of this article.

After you have completed the previous steps, move onto these steps if you have a custom storefront theme activated.

Ensure the Google Analytics ID has been added in the control panel. This is what will be used to track AMP analytics. You can use more than one ID to track [AMP traffic vs non-AMP traffic](https://developers.google.com/analytics/devguides/collection/amp-analytics/#amp_vs_non-amp_traffic).

In the `/amp/category.html`, `layout/amp.html` and `amp/product.html` template files replace `theme_settings` with `settings`.

Example: In `layout/amp.html` (referenced below) replace `theme_settings.amp_analytics_id` with
`settings.amp_analytics_id`.

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">templates/layout/amp.html</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "templates/layout/amp.html"
subtitle: ""
lineNumbers: true
-->

```js
{{{snippet 'htmlhead'}}}
         <script async custom-element="amp-form" src="https://cdn.ampproject.org/v0/amp-form-0.1.js"></script>
         <script async custom-element="amp-sidebar" src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"></script>
			  {{#if settings.amp_analytics_id}}
         			<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
         {{/if}}
         {{#block "amp-scripts"}}{{/block}}
```

In [config.json](https://github.com/bigcommerce/cornerstone/blob/master/config.json) (referenced below) make sure `google_amp` is still in the features array. See below for code snippet.

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">config.json</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "config.json"
subtitle: ""
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
      "customized_checkout"
    ]
```

If you are having any implementation issues, review the [full Pull Request #964](https://github.com/bigcommerce/cornerstone/pull/946/files) for changes that need to be made to implement Google AMP. 

---

<a href='#google-amp_location-of-amp-files' aria-hidden='true' class='block-anchor'  id='google-amp_location-of-amp-files'><i aria-hidden='true' class='linkify icon'></i></a>

## Location of AMP Files within Cornerstone


In versions 1.6.0+ of Cornerstone, there are a few key file locations where the AMP information is located:

* Base AMP layout template is located in [templates/layout/amp.html](https://github.com/bigcommerce/cornerstone/blob/master/config.json).
* The files for Google AMP are located in [/templates/pages/amp](https://github.com/bigcommerce/cornerstone/tree/master/templates/pages/amp). This is where `product.html` and `category.html` are located. (Note: there may be other files in this folder, but the product and category pages are the only one pages that currently support Google AMP).
* The CSS is located in [templates/components/amp/css](https://github.com/bigcommerce/cornerstone/tree/master/templates/components/amp/css).

After the Google Analytics ID has been added via Control Panel, you can toggle AMP on the product and category pages using the [settings](https://support.bigcommerce.com/articles/Public/Google-AMP?_ga=2.205799699.1406470381.1541441523-967431010.1523308107) there.


---

<a href='#google-amp_local-testing' aria-hidden='true' class='block-anchor'  id='google-amp_local-testing'><i aria-hidden='true' class='linkify icon'></i></a>

## Local Testing

You are able to test your AMP enabled pages at the following endpoints when running your store locally:

* `localhost:3000/amp/category_url/`
* `localhost:3000/amp/product_url/`

---

## Resources

### Related Articles

* [Adding Google AMP in the Control Panel](https://support.bigcommerce.com/articles/Public/Google-AMP?_ga=2.228533533.1406470381.1541441523-967431010.1523308107) (BigCommerce Support)
* [Adding Analytics to your AMP Pages](https://developers.google.com/analytics/devguides/collection/amp-analytics/) (Google)
* [Google AMP Home Page](https://www.ampproject.org/) (Google)
* [Google Developer AMP Resources](https://developers.google.com/amp/) (Google)

