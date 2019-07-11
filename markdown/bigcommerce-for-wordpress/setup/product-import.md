<div><h3 class="sub-docs-type" id="bigcommerce-for-wordpress">BigCommerce for Wordpress</h3>
<h1 class="sub-docs-title">Product Import</h1>

Products are imported from the BigCommerce API on a [WordPress cron job](https://developer.wordpress.org/plugins/cron/), or using a WP-CLI command: `wp bigcommerce import products`

The import runs in several stages:
1. A list of all products from the API is added to a queue for processing.
2. Any products on the site that are no longer available in the BigCommerce store are marked for deletion.
3. The queue is processed in chunks (five items at a time), whereby products are imported, updated, or deleted to match the data in BigCommerce.
4. Currency and other store information from the API updates settings in WordPress.


<div class="HubBlock--callout">
<div class="CalloutBlock--">
<div class="HubBlock-content">
    
<!-- theme:  -->

### WordPress Currency Processing
> The WordPress sites you connect to your BigCommerce store will process in the same default currency as the BigCommerce store.

</div>
</div>
</div>

