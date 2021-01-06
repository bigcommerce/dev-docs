# Contextual Filters

<div class="otp" id="no-index">

### On this page
- [View active storefront filters](#view-active-storefront-filters)
- [View available storefront filters](#view-available-storefront-filters)
- [View available category-level filters](#view-available-category-level-filters)
- [View contextual filters](#view-contextual-filters)
- [Configure contextual filters](#configure-contextual-filters)
- [Related resources](#related-resources)

</div>

The [Settings API](https://developer.bigcommerce.com/api-reference/store-management/settings) allows you to manage settings and configurations for BigCommerce hosted stores and headless storefronts. 

You can use the [Contextual Filters](insert-link-here) endpoint of the Settings API to programmatically configure a store's Product Filtering feature, also known as "faceted search".
Additionally, the [Contextual Filters](insert-link-here) endpoint enables you to merchandise diverse product catalogs by creating a different faceted search configuration for each channel and product category on a store. With this feature, you can configure the product categories for various product lines with a different set of enabled filters, so that shoppers can filter by the most relevant criteria.

This article demonstrates how to use [Contextual Filters](insert-link-here) to configure filters that appear on a particular category page.

### Limitations

* Currently, the API only supports the default channel with an ID of 1.
* You can configure contextual filters for Category pages, but not for Brand or Search Results pages at this time.

###  Prerequisites

* [A BigCommerce store](https://support.bigcommerce.com/s/article/Starting-a-Bigcommerce-Trial).
* API `access_token` with `information & settings modify` scope.
* Knowledge of the [Settings API](https://developer.bigcommerce.com/api-reference/store-management/settings).
* Pro or Enterprise store plan. To upgrade, see [Changing Your Store's Plan](https://support.bigcommerce.com/s/article/How-do-I-upgrade-my-stores-plan).

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> ### Note
> * Your store plan must support Product Filtering to use contextual filters. 
> * Product Filtering is available for Pro and Enterprise plans. To upgrade, see [Changing Your Store's Plan](https://support.bigcommerce.com/s/article/How-do-I-upgrade-my-stores-plan).
> * Enterprise accounts have the ability to use [custom fields](https://support.bigcommerce.com/s/article/Custom-Fields) as product filters to provide shoppers with additional ways to customize their search. 

</div>
</div>
</div>

## View active storefront filters

There are two ways to retrieve your store's currently active storefront filters: using the Settings API or through the store's control panel. To view all configured filters using the API, send a `GET` request to [`/v3/settings/search/filters`](insert-link-here).

```http
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/settings/search/filters
X-Auth-Token: {{ACCESS_TOKEN}}
Accept: application/json
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/widgets/widget-template/createwidgettemplate#requestrunner) 
// replace link

The response will contain all of the filters currently active on your store. 

**Response:**

```json
{
   "data": [
       {
           "id": "Y2F0ZWdvcnk=",
           "display_name": "Category",
           "type": "category",
           "items_to_show": 15,
           "collapsed_by_default": false,
           "display_product_count": true,
           "is_enabled": true
       },
       {
           "id": "U2l6ZQ==",
           "display_name": "Size",
           "type": "product",
           "display_product_count": true,
           "collapsed_by_default": false,
           "items_to_show": 10,
           "sort_by": "alpha",
           "is_enabled": true
       },
       {
           "id": "cHJpY2U=",
           "display_name": "Price",
           "type": "price",
           "collapsed_by_default": false,
           "is_enabled": true
       }
       ...
   ],
   "meta": {}
}
```

The filters returned from completing this `GET` request should match the filters you see in the control panel under **Storefront Filters**. This set of storefront filters is what you currently have configured on your store. 

To access **Storefront Filters** in the control panel, go to **Products** > **Product Filtering**. 

![Products Filters](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/contextual-filters-01.png "Products Filters")

## View available storefront filters

The list of available storefront filters is derived from the product information in the catalog. You create new available filters by changing the product information in your catalog, such as adding new [product options](https://support.bigcommerce.com/s/article/Product-Options-v3) or [custom fields](https://support.bigcommerce.com/s/article/Custom-Fields).

To retrieve all available storefront filters, send a `GET` request to [`/v3/settings/search/filters/available`](insert-link-here).

```http
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/settings/search/filters/available
X-Auth-Token: {{ACCESS_TOKEN}}
Accept: application/json
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/widgets/widget-template/createwidgettemplate#requestrunner) // replace link

**Response:**

```json
{
    "data": [
        {
            "id": "Y2F0ZWdvcnk=",
            "type": "category",
            "name": "Category",
            "product_count": 7
        },
        {
            "id": "YnJhbmQ=",
            "type": "brand",
            "name": "Brand",
            "product_count": 8
        },
        ...
        {
            "id": "Ym9vbA==",
            "type": "other",
            "name": "Other"
        }
    ],
    "meta": {}
}
```

## View available category-level filters

To retrieve a list of filters available on a given category, include the `category_id` query parameter in your `GET` request to [`/v3/settings/search/filters/available`](insert-link-here). Currently, the Settings API only supports the default `channel_id` of 1.

```http
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/settings/search/filters/available?channel_id=1&category_id={{CATEGORY_ID}}
X-Auth-Token: {{ACCESS_TOKEN}}
Accept: application/json
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/widgets/widget-template/createwidgettemplate#requestrunner) // replace link

**Response:**

```json
{
    "data": [
        {
            "id": "YnJhbmQ=",
            "type": "brand",
            "name": "Brand",
            "product_count": 3
        },
        {
            "id": "cmF0aW5n",
            "type": "rating",
            "name": "Rating",
            "product_count": 1
        },
        {
            "id": "cHJpY2U=",
            "type": "price",
            "name": "Price",
            "price_range_min": 9.95,
            "price_range_max": 225
        },
        {
            "id": "Q29sb3I=",
            "type": "product",
            "name": "Color",
            "product_count": 1
        },
        {
            "id": "U2l6ZQ==",
            "type": "product",
            "name": "Size",
            "product_count": 1
        },
        {
            "id": "Ym9vbA==",
            "type": "other",
            "name": "Other"
        }
    ],
    "meta": {}
}
```

The filters returned from completing this `GET` request are the filters available for configuration on the given category. In this example, we have Brand, Rating, Price, Color, Size, and Other filters to pick from when choosing which filters to activate for the Kitchen category. In reality, you will be able to select from more filters.

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> ### Categories
> To get a list of your store's categories, send a `GET` request to [`/v3/catalog/categories`](https://developer.bigcommerce.com/api-reference/store-management/catalog/category/getcategories).

</div>
</div>
</div>

## View contextual filters

To see if there are any contextual overrides present on a given category, send a `GET` request to [`/v3/settings/search/filters/contexts`](insert-link-here) specifying the `category_id` query parameter.

```http
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/settings/search/filters/contexts?channel_id=1&category_id={{CATEGORY_ID}}
X-Auth-Token: {{ACCESS_TOKEN}}
Accept: application/json
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/widgets/widget-template/createwidgettemplate#requestrunner) // replace link

The response will contain the category's existing contextual overrides. 

**Response:**

```json
{
    "data": [
        {
            "context": {
                "channel_id": 1,
                "category_id": 21
            },
            "data": [
                {
                    "id": "U2l6ZQ==",
                    "display_name": "Size",
                    "type": "product",
                    "display_product_count": false,
                    "collapsed_by_default": false,
                    "items_to_show": 5,
                    "sort_by": "alpha",
                    "is_enabled": false
                },
                {
                    "id": "cHJpY2U=",
                    "display_name": "Price",
                    "type": "price",
                    "collapsed_by_default": true,
                    "is_enabled": true
                },
                ...
                {
                    "id": "Ym9vbA==",
                    "display_name": "Other",
                    "type": "other",
                    "is_enabled": true,
                    "display_product_count": true,
                    "collapsed_by_default": true,
                    "show_free_shipping_filter": true,
                    "show_is_featured_filter": true,
                    "show_in_stock_filter": true
                }
            ]
        },
    ],
    "meta": {}
}
```
The order and names of returned filters should match the filters listed under **Category Filters** in the control panel. 

![Category Filters](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/contextual-filters-02.png "Category Filters")

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> ### Note
> The order of the data you send determines the sort order of the filters on the storefront implicitly. You can change the order of the filters on the live site by changing the order of the array's data.

</div>
</div>
</div>

## Configure contextual filters

Using the [Contextual Filters](insert-link-here) endpoint, you can configure available category-level filters. To test it out, update some of your category's properties such as `display_name`, `display_product_count`, or `collapsed_by_default` and send a `PUT` request to [`/v3/settings/search/filters/contexts`](insert-link-here).

```http
PUT /stores/{{STORE_HASH}}/v3/settings/search/filters/contexts
Host: api.bigcommerce.com
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

[
  {
    "data": [
       {
           "id": "U2l6ZQ==",
           "display_name": "Kitchen Size",
           "type": "product",
           "display_product_count": false,
           "collapsed_by_default": true,
           "items_to_show": 5,
           "sort_by": "alpha",
           "is_enabled": false
       },
       {
           "id": "cHJpY2U=",
           "display_name": "Product Price",
           "type": "price",
           "collapsed_by_default": false,
           "is_enabled": true
       },
       {
           "id": "cmF0aW5n",
           "display_name": "Item Rating",
           "type": "rating",
           "collapsed_by_default": true,
           "is_enabled": true
       },
       {
           "id": "YnJhbmQ=",
           "display_name": "Brand",
           "type": "brand",
           "sort_by": "alpha",
           "items_to_show": 10,
           "collapsed_by_default": false,
           "display_product_count": true,
           "is_enabled": true
       },
       {
           "id": "Q29sb3I=",
           "display_name": "Color",
           "type": "product",
           "display_product_count": true,
           "collapsed_by_default": false,
           "items_to_show": 10,
           "sort_by": "alpha",
           "is_enabled": true
       },
       {
           "id": "Ym9vbA==",
           "display_name": "Other",
           "type": "other",
           "is_enabled": true,
           "display_product_count": true,
           "collapsed_by_default": true,
           "show_free_shipping_filter": true,
           "show_is_featured_filter": true,
           "show_in_stock_filter": true
       }
    ],
    "context": {
      "channel_id": 1,
      "category_id": 21
    }
  }
]
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/widgets/widget-template/createwidgettemplate#requestrunner) // replace link

Refresh your store and open the category you just updated in the control panel. 

![Updated Category Filters](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/contextual-filters-03.png "Updated Category Filters")

You can also view the changes on the storefront. 

![Updated Category Filters](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/contextual-filters-04.png "Updated Category Filters")

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> ### Note
> * You can add new filters using [custom fields](https://support.bigcommerce.com/s/article/Custom-Fields).
> * For information on how to manage filters using the control panel, see [Product Filtering](insert-link-here). 
> * A storefront can display up to 12 filters per page.

</div>
</div>
</div> 

## Related resources

### Articles
* [Custom Fields](https://support.bigcommerce.com/s/article/Custom-Fields)
* [Product Filtering](insert-link-here)

### Endpoints
* [Settings API](https://developer.bigcommerce.com/api-reference/store-management/settings)
* [Get All Categories](https://developer.bigcommerce.com/api-reference/store-management/catalog/category/getcategories)