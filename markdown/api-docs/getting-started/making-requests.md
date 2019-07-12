<h1>Quick Start</h1>
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    		<li><a href="#making-requests_prerequisites">Overview<a/></li>
        <li><a href="#making-requests_get-products">Getting a List of Products</a></li>
        <li><a href="#making-requests_create-a-product">Creating a Product</a></li>
        <li><a href="#making-requests_troubleshooting">Troubleshooting</a></li>
	</ul>
</div>

<a href='#making-requests_prerequisites' aria-hidden='true' class='block-anchor'  id='making-requests_prerequisites'><i aria-hidden='true' class='linkify icon'></i></a>

## Overview

This Quick Start guide will take you through the minimum required steps to begin making API requests. By the end of this guide, you’ll be able to retrieve a store’s product catalog, create a new product, and troubleshoot common errors.

Before we begin, here are a few key concepts:
* API requests are always made against a single store’s data, and API tokens are issued on a per-store basis. The first step to using the BigCommerce API is creating a BigCommerce store.
* API Credentials can be generated from a store’s control panel. If you’re testing requests or writing a script for a single store, start here to quickly get your token and begin making API calls. 
* If you’re building an app that will install in a store’s control panel, you’ll need to generate an API token programmatically during the [app installation process](/api-docs/getting-started/building-apps-bigcommerce/building-apps#building-apps_installation-update-sequence). However in the beginning, it’s still a good idea to generate API credentials from the control panel to start testing requests with minimal effort.


### Prerequisites
* [API Credentials](/api-docs/getting-started/authentication#authentication_getting-api-credentials)
* [Scope](/api-docs/getting-started/authentication#authentication_oauth-scopes) set to `Products Modify`
* BigCommerce Store (`store_hash`)

*Note: You can use any API client (like Postman) for this walkthrough, but these steps are written with the built-in HTTP request maker in mind.*

---

<a href='#making-requests_get-products' aria-hidden='true' class='block-anchor'  id='making-requests_get-products'><i aria-hidden='true' class='linkify icon'></i></a>

## Getting a List of Products

In this walkthrough, we'll get a list of products from the store, use a limit filter to only show the first 10 products, and sort products by name. 

In the request maker below, we've prefilled the URL to /GET products: `https://api.bigcommerce.com/stores/{store_hash}/v3/catalog/products`

To add [filters](/api-docs/getting-started/filtering), append `?page=10&sort=name` to the end of the request URL.


In the request maker tabs, replace these placeholders with the appropriate values:  
- `{X-Auth-Token}` Header - Access Token from API Credentials
- `{X-Auth-Client}` Header - Client Id from API Credentials
- `store_hash` variable - the hash in your api path 
	- `https://api.bigcommerce.com/stores/{store_hash}/v3/`

 
Hit the send button and review your response.


**Try it Now**  
*Get all products*

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/00c3651bcff8d70a61e8)

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">GET Products Response</div>
    </div><div class="HubBlock-header-subtitle">200 OK</div>
</div>

<!--
title: "GET Products Response"
subtitle: "200 OK"
lineNumbers: true
-->

```json
{
  "data": [
    {
      "id": 174,
      "name": "1L Le Parfait Jar",
      "type": "physical",
      "sku": "",
      "description": "<p><span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vel metus ac est egestas porta sed quis erat. Integer id nulla massa. Proin vitae enim nisi. Praesent non dignissim nulla. Nulla mattis id massa ac pharetra. Mauris et nisi in dolor aliquam sodales. Aliquam dui nisl, dictum quis leo sit amet, rutrum volutpat metus. Curabitur libero nunc, interdum ac libero non, tristique porttitor metus. Ut non dignissim lorem, in vestibulum leo. Vivamus sodales quis turpis eget.</span></p>",
      "weight": 1,
      "width": 0,
      "depth": 0,
      "height": 0,
      "price": 7.95,
      "cost_price": 0,
      "retail_price": 10,
      "sale_price": 0,
      "map_price": 0,
      "tax_class_id": 0,
      "product_tax_code": "",
      "calculated_price": 7.95,
      "categories": [
        23,
        21
      ],
      "brand_id": 36,
      "option_set_id": null,
      "option_set_display": "right",
      "inventory_level": 0,
      "inventory_warning_level": 0,
      "inventory_tracking": "none",
      "reviews_rating_sum": 0,
      "reviews_count": 0,
      "total_sold": 7,
      "fixed_cost_shipping_price": 0,
      "is_free_shipping": false,
      "is_visible": true,
      "is_featured": false,
      "related_products": [
        -1
      ],
      "warranty": "",
      "bin_picking_number": "",
      "layout_file": "product.html",
      "upc": "",
      "mpn": "",
      "gtin": "",
      "search_keywords": "jar, glass",
      "availability": "available",
      "availability_description": "",
      "gift_wrapping_options_type": "any",
      "gift_wrapping_options_list": [],
      "sort_order": 0,
      "condition": "New",
      "is_condition_shown": false,
      "order_quantity_minimum": 0,
      "order_quantity_maximum": 0,
      "page_title": "",
      "meta_keywords": [],
      "meta_description": "",
      "date_created": "2018-08-15T14:48:46+00:00",
      "date_modified": "2018-09-12T17:32:23+00:00",
      "view_count": 14,
      "preorder_release_date": null,
      "preorder_message": "",
      "is_preorder_only": false,
      "is_price_hidden": false,
      "price_hidden_label": "",
      "custom_url": {
        "url": "/all/1l-le-parfait-jar/",
        "is_customized": true
      },
      "base_variant_id": 345,
      "open_graph_type": "product",
      "open_graph_title": "",
      "open_graph_description": "",
      "open_graph_use_meta_description": true,
      "open_graph_use_product_name": true,
      "open_graph_use_image": true
    },
    {
      "id": 167,
      "name": "Able Brewing System",
      "type": "physical",
      "sku": "",
      "description": "<p><span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vel metus ac est egestas porta sed quis erat. Integer id nulla massa. Proin vitae enim nisi. Praesent non dignissim nulla. Nulla mattis id massa ac pharetra. Mauris et nisi in dolor aliquam sodales. Aliquam dui nisl, dictum quis leo sit amet, rutrum volutpat metus. Curabitur libero nunc, interdum ac libero non, tristique porttitor metus. Ut non dignissim lorem, in vestibulum leo. Vivamus sodales quis turpis eget.</span></p>",
      "weight": 1,
      "width": 0,
      "depth": 0,
      "height": 0,
      "price": 225,
      "cost_price": 0,
      "retail_price": 0,
      "sale_price": 0,
      "map_price": 0,
      "tax_class_id": 0,
      "product_tax_code": "",
      "calculated_price": 225,
      "categories": [
        23,
        21
      ],
      "brand_id": 43,
      "option_set_id": 52,
      "option_set_display": "right",
      "inventory_level": 0,
      "inventory_warning_level": 0,
      "inventory_tracking": "none",
      "reviews_rating_sum": 0,
      "reviews_count": 0,
      "total_sold": 2,
      "fixed_cost_shipping_price": 0,
      "is_free_shipping": false,
      "is_visible": true,
      "is_featured": false,
      "related_products": [
        -1
      ],
      "warranty": "",
      "bin_picking_number": "",
      "layout_file": "product.html",
      "upc": "",
      "mpn": "",
      "gtin": "",
      "search_keywords": "",
      "availability": "available",
      "availability_description": "",
      "gift_wrapping_options_type": "any",
      "gift_wrapping_options_list": [],
      "sort_order": 0,
      "condition": "New",
      "is_condition_shown": false,
      "order_quantity_minimum": 0,
      "order_quantity_maximum": 0,
      "page_title": "",
      "meta_keywords": [],
      "meta_description": "",
      "date_created": "2018-08-15T14:48:36+00:00",
      "date_modified": "2018-08-20T15:11:17+00:00",
      "view_count": 21,
      "preorder_release_date": null,
      "preorder_message": "",
      "is_preorder_only": false,
      "is_price_hidden": false,
      "price_hidden_label": "",
      "custom_url": {
        "url": "/all/able-brewing-system/",
        "is_customized": true
      },
      "base_variant_id": 338,
      "open_graph_type": "product",
      "open_graph_title": "",
      "open_graph_description": "",
      "open_graph_use_meta_description": true,
      "open_graph_use_product_name": true,
      "open_graph_use_image": true
    },
    {
      "id": 181,
      "name": "All Purpose Cleaner",
      "type": "physical",
      "sku": "",
      "description": "<p><span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vel metus ac est egestas porta sed quis erat. Integer id nulla massa. Proin vitae enim nisi. Praesent non dignissim nulla. Nulla mattis id massa ac pharetra. Mauris et nisi in dolor aliquam sodales. Aliquam dui nisl, dictum quis leo sit amet, rutrum volutpat metus. Curabitur libero nunc, interdum ac libero non, tristique porttitor metus. Ut non dignissim lorem, in vestibulum leo. Vivamus sodales quis turpis eget.</span></p>",
      "weight": 1,
      "width": 0,
      "depth": 0,
      "height": 0,
      "price": 15,
      "cost_price": 0,
      "retail_price": 0,
      "sale_price": 0,
      "map_price": 0,
      "tax_class_id": 0,
      "product_tax_code": "",
      "calculated_price": 15,
      "categories": [
        21,
        22
      ],
      "brand_id": 37,
      "option_set_id": null,
      "option_set_display": "right",
      "inventory_level": 0,
      "inventory_warning_level": 0,
      "inventory_tracking": "none",
      "reviews_rating_sum": 0,
      "reviews_count": 0,
      "total_sold": 0,
      "fixed_cost_shipping_price": 0,
      "is_free_shipping": false,
      "is_visible": true,
      "is_featured": false,
      "related_products": [
        -1
      ],
      "warranty": "",
      "bin_picking_number": "",
      "layout_file": "product.html",
      "upc": "",
      "mpn": "",
      "gtin": "",
      "search_keywords": "",
      "availability": "available",
      "availability_description": "",
      "gift_wrapping_options_type": "any",
      "gift_wrapping_options_list": [],
      "sort_order": 0,
      "condition": "New",
      "is_condition_shown": false,
      "order_quantity_minimum": 0,
      "order_quantity_maximum": 0,
      "page_title": "",
      "meta_keywords": [],
      "meta_description": "",
      "date_created": "2018-08-15T14:48:51+00:00",
      "date_modified": "2018-08-15T15:01:15+00:00",
      "view_count": 0,
      "preorder_release_date": null,
      "preorder_message": "",
      "is_preorder_only": false,
      "is_price_hidden": false,
      "price_hidden_label": "",
      "custom_url": {
        "url": "/all/all-purpose-cleaner/",
        "is_customized": true
      },
      "base_variant_id": 352,
      "open_graph_type": "product",
      "open_graph_title": "",
      "open_graph_description": "",
      "open_graph_use_meta_description": true,
      "open_graph_use_product_name": true,
      "open_graph_use_image": true
    }

  ],
  "meta": {
    "pagination": {
      "total": 39,
      "count": 10,
      "per_page": 10,
      "current_page": 1,
      "total_pages": 4,
      "links": {
        "next": "?limit=10&sort=name&page=2",
        "current": "?limit=10&sort=name&page=1"
      },
      "too_many": false
    }
  }
}
```

The products are returned in a data array that contains each product object. Located at the bottom of the response is the meta object that shows the total number of products being returned, but also the products `per_page` which is 10, set using the limit query in the request.

### Next Steps
* Try including other filter paramters such as name or include and exclude. See [Get All Products](/api-reference/catalog/catalog-api/products/getproducts) for a full list of available filters. 

---

<a href='#making-requests_create-a-product' aria-hidden='true' class='block-anchor'  id='making-requests_create-a-product'><i aria-hidden='true' class='linkify icon'></i></a>

## Create a Product

In this walkthrough, we'll create an example product: BigCommerce Hoodie. The minimum parameters to create a product are: name, price, category, type and weight. 

* **Name**: The name of your product as a string.
* **Price**: How much the items costs in number format. 
* **Category**: The `{category_id}` for the category this product belongs to. An item can be assigned to more than one category. You can /GET the category id by using:

`https://api.bigcommerce.com/stores/{store_hash}/v3/catalog/categories`

* **Type**: Is the item physical or digital?
	- Physical items are anything that is shipped to the customer, such as a t-shirt.
	- Digital items are products that the customer downloads, such as a PDF of an ebook. 
* **Weight**: How much the product weighs as a number. The measurement unit is determined by the [store settings](https://forum.bigcommerce.com/s/article/Store-Settings#physical). 

Review the information pre-populated in the Body tab below. Make sure to run a GET request for the categories first and update request with the appropriate category ID.

**Try it Now**  
*Create a Product**

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/00c3651bcff8d70a61e8)

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">Response POST Products</div>
    </div><div class="HubBlock-header-subtitle">200 OK</div>
</div>

<!--
title: "Response POST Products"
subtitle: "200 OK"
lineNumbers: true
-->

```json
{
    "data": {
        "id": 196,
        "name": "BigCommerce Hoodie",
        "type": "physical",
        "sku": "",
        "description": "A super soft hoodie to wear",
        "weight": 5,
        "width": 12,
        "depth": 0,
        "height": 0,
        "price": 25.99,
        "cost_price": 0,
        "retail_price": 0,
        "sale_price": 0,
        "map_price": 0,
        "tax_class_id": 0,
        "product_tax_code": "",
        "calculated_price": 25.99,
        "categories": [
            20,
            21
        ],
        "brand_id": 0,
        "option_set_id": null,
        "option_set_display": "right",
        "inventory_level": 0,
        "inventory_warning_level": 0,
        "inventory_tracking": "none",
        "reviews_rating_sum": 0,
        "reviews_count": 0,
        "total_sold": 0,
        "fixed_cost_shipping_price": 0,
        "is_free_shipping": false,
        "is_visible": true,
        "is_featured": false,
        "related_products": [
            -1
        ],
        "warranty": "",
        "bin_picking_number": "",
        "layout_file": "",
        "upc": "",
        "mpn": "",
        "gtin": "",
        "search_keywords": "",
        "availability": "available",
        "availability_description": "",
        "gift_wrapping_options_type": "any",
        "gift_wrapping_options_list": [],
        "sort_order": 0,
        "condition": "New",
        "is_condition_shown": false,
        "order_quantity_minimum": 0,
        "order_quantity_maximum": 0,
        "page_title": "",
        "meta_keywords": [],
        "meta_description": "",
        "date_created": "2018-09-21T17:12:59+00:00",
        "date_modified": "2018-09-21T17:12:59+00:00",
        "view_count": 0,
        "preorder_release_date": null,
        "preorder_message": "",
        "is_preorder_only": false,
        "is_price_hidden": false,
        "price_hidden_label": "",
        "custom_url": {
            "url": "/bigcommerce-hoodie/",
            "is_customized": false
        },
        "base_variant_id": 402,
        "open_graph_type": "product",
        "open_graph_title": "",
        "open_graph_description": "",
        "open_graph_use_meta_description": true,
        "open_graph_use_product_name": true,
        "open_graph_use_image": true,
        "variants": [
            {
                "id": 402,
                "product_id": 196,
                "sku": "",
                "sku_id": null,
                "price": 25.99,
                "calculated_price": 25.99,
                "sale_price": 0,
                "retail_price": 0,
                "map_price": 0,
                "weight": 5,
                "width": 12,
                "height": 0,
                "depth": 0,
                "is_free_shipping": false,
                "fixed_cost_shipping_price": 0,
                "calculated_weight": 5,
                "purchasing_disabled": false,
                "purchasing_disabled_message": "",
                "image_url": "",
                "cost_price": 0,
                "upc": "",
                "mpn": "",
                "gtin": "",
                "inventory_level": 0,
                "inventory_warning_level": 0,
                "bin_picking_number": "",
                "option_values": []
            }
        ],
        "images": [],
        "primary_image": null,
        "videos": [],
        "custom_fields": [],
        "bulk_pricing_rules": [],
        "reviews": []
    },
    "meta": {}
}
```

### Next Steps
* To see a full list of fields that can be sent in a request see [Create a Product](/api-reference/catalog/catalog-api/products/createproduct)
* Try to make a different product with new attributes.

---

<a href='#making-requests_troubleshooting' aria-hidden='true' class='block-anchor'  id='making-requests_troubleshooting'><i aria-hidden='true' class='linkify icon'></i></a>

## Troubleshooting

**Did you get a status of 403 Forbidden?**
* Check the Client ID and Client Token.
* Make sure your request headers are correct.
* Be sure you replaced `{store_hash}` with your store hash. 
* Make sure the request url is correct.

**Did you get a 200 but nothing was returned?**
* Make sure your store has products.

**Did you get a status of 404?**
* Check the request url for errors.

