# Create Widgets Powered by GraphQL

<div class="otp" id="no-index">

### On this page
- [Prerequisites](#prerequisites)
- [Create the widget template](#create-the-widget-template)
- [Place the widget using Page Builder](#place-the-widget-using-page-builder)
- [Place the widget using the API](#place-the-widget-using-the-api)
- [Related resources](#related-resources)

</div>

Widgets are configurable and reusable components of content that merchants can display on their storefront. Widgets consist of a combination of HTML/CSS, JavaScript, and Handlebars, and are rendered as part of the storefront’s HTML.

In this tutorial, we will walk you through the process of creating a product widget powered by BigCommerce's [Widgets API](https://developer.bigcommerce.com/api-docs/store-management/widgets/overview) and [GraphQL Storefront API](https://developer.bigcommerce.com/api-docs/storefront/graphql/graphql-storefront-api-overview). This setup allows widgets to dynamically update and display information such as product name, image, and price. By the end of this tutorial, you should have a functional widget that is configurable via the [Page Builder](https://support.bigcommerce.com/s/article/Page-Builder) UI in a store's control panel.

## Prerequisites

* [A BigCommerce store](https://support.bigcommerce.com/s/article/Starting-a-Bigcommerce-Trial).
* API OAuth [access token](https://developer.bigcommerce.com/api-docs/getting-started/authentication/rest-api-authentication) with the OAuth **Content** scope set to **modify**.
* Understanding of [widgets](https://developer.bigcommerce.com/api-docs/store-management/widgets/overview#widgets) and the [Widgets API](https://developer.bigcommerce.com/api-docs/store-management/widgets/overview).
* Familiarity with [Page Builder](https://developer.bigcommerce.com/stencil-docs/page-builder/page-builder-overview).

The steps in this tutorial assume that you are familiar with BigCommerce’s Widgets API, and have obtained the API `access_token` with the `content` `modify` scope. The API `access_token` is required to inject, remove, and list widgets into any page of the store. To learn more about the Widgets API, see [Widgets API Overview](https://developer.bigcommerce.com/api-docs/store-management/widgets/overview). For information on how to create an API account, see [Creating an API Account](https://support.bigcommerce.com/s/article/Store-API-Accounts#creating).

## Create the widget template

To create a widget, you first need to create a template for it. To [create a widget template](https://developer.bigcommerce.com/api-reference/store-management/widgets/widget-template/createwidgettemplate), send a `POST` request to `/v3/content/widget-templates`. 


```http
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/content/widget-templates
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json
 
{
  "name": "Product Widget",
  "storefront_api_query": "query Product($productId: Int = 1, $activeCurrencyCode: currencyCode) { site { product(entityId: $productId) { name entityId prices(currencyCode: $activeCurrencyCode) { price { currencyCode value } } defaultImage { url(width: 500, height: 500) } } } } ",
  "schema": [
    {
      "type": "hidden",
      "settings": [
        {
          "type": "graphQl",
          "id": "graphQueries",
          "typeMeta": {
            "mappings": {
              "productId": {
                "reads": "productId",
                "type": "Int!"
              }
            }
          }
        }
      ]
    },
    {
      "type": "tab",
      "label": "Content",
      "sections": [
        {
          "label": "Product",
          "settings": [
            {
              "type": "productId",
              "label": "Product",
              "id": "productId",
              "default": "",
              "typeMeta": {
                "placeholder": "Search by name or SKU"
              }
            }
          ]
        }
      ]
    }
  ],
  "template": "<div style=\"text-align:center\">\n<h1>{{_.data.site.product.name}}</h1>\n<div>\n<img src=\"{{_.data.site.product.defaultImage.url}}\">\n</div>\n<div>\n<p>${{_.data.site.product.prices.price.value}}</p>\n</div>\n</div>"
}
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/widgets/widget-template/createwidgettemplate#requestrunner)

**[Response:](https://developer.bigcommerce.com/api-reference/store-management/widgets/widget-template/createwidgettemplate#responses)**

```json
{
  "data": {
    "channel_id": 1,
    "client_rerender": false,
    "current_version_uuid": "3f4defcf-2429-425d-8e5a-7c3807fa9896",
    "date_created": "2021-04-09T21:23:16.274Z",
    "date_modified": "2021-04-09T21:23:16.274Z",
    "icon_name": "default",
    "kind": "custom",
    "name": "Product Widget",
    "schema": [
      {
        "settings": [
          {
            "id": "graphQueries",
            "type": "graphQl",
            "typeMeta": {
              "mappings": {
                "productId": {
                  "reads": "productId",
                  "type": "Int!"
                }
              }
            }
          }
        ],
        "type": "hidden"
      },
      {
        "label": "Content",
        "sections": [
          {
            "label": "Product",
            "settings": [
              {
                "default": "",
                "id": "productId",
                "label": "Product",
                "type": "productId",
                "typeMeta": {
                  "placeholder": "Search by name or SKU"
                }
              }
            ]
          }
        ],
        "type": "tab"
      }
    ],
    "storefront_api_query": "query Product($productId: Int = 1, $activeCurrencyCode: currencyCode) { site { product(entityId: $productId) { name entityId prices(currencyCode: $activeCurrencyCode) { price { currencyCode value } } defaultImage { url(width: 500, height: 500) } } } } ",
    "template": "<div style=\"text-align:center\">\n<h1>{{_.data.site.product.name}}</h1>\n<div>\n<img src=\"{{_.data.site.product.defaultImage.url}}\">\n</div>\n<div>\n<p>${{_.data.site.product.prices.price.value}}</p>\n</div>\n</div>",
    "template_engine": "handlebars_v3",
    "uuid": "95eaa664-b19e-4a31-b9c7-498f9bc60bae"
  },
  "meta": {}
}
```

|Property|Type|Description|
|-|-|-|
|`name`|string|The name of the widget template.|
|`schema`|object|The widget settings JSON [schema](https://developer.bigcommerce.com/stencil-docs/page-builder/widget-ui-schema) for [Page Builder](https://support.bigcommerce.com/s/article/Page-Builder) UI.|
|`template`|string|The [widget template](https://developer.bigcommerce.com/api-docs/store-management/widgets/overview#widget-templates) rendered as Handlebars HTML.|
|`storefront_api_query`|string|[GraphQL Storefront API](https://developer.bigcommerce.com/api-docs/storefront/graphql/graphql-storefront-api-overview) query that provides widget data; accessed in a template via `{{_.data}}`.|

### GraphQL queries

The `storefront_api_query` field allows you to query store data that widgets can use. The widget configuration provides the values for the `storefront_api_query` parameters.
For example, the `$productId` parameter comes from the widget configuration when a user selects a product. The `mappings` object from the widget template schema `settings` tells the widget to map the value of the widget configuration’s `productId` setting to the GraphQL parameter called `productId`.

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> ### Note
> * You can use the `activeCurrencyCode` query parameter to return user-selected currency.
> * There is no need to provide the mapping for the `activeCurrencyCode` property as it is auto-populated with the shopper’s active currency at the time of page load.

</div>
</div>
</div>

## Place the widget using Page Builder

After [creating the widget template](#create-the-widget-template), you should see it listed in Page Builder under **Custom**.

![Custom widgets](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/product-widget-01.png "Custom widgets")

Drag and drop the widget onto the desired page, select a product from the product picker, then publish your widget. 

![Product widget preview](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/product-widget-02.png "Product widget preview")

Doing so creates a [widget](https://developer.bigcommerce.com/api-reference/store-management/widgets/widget/createwidget) and a [widget placement](https://developer.bigcommerce.com/api-reference/store-management/widgets/placement/createplacement). For more information on placing and configuring widgets in the control panel, see [Page Builder](https://support.bigcommerce.com/s/article/Page-Builder) in the Help Center.

To view the widget's data, retrieve the widget's ID by accessing its `data-widget-id` attribute in the browser's developer tools, then pass it in a `GET` request to [`/v3/content/widgets/{uuid}`](https://developer.bigcommerce.com/api-reference/store-management/widgets/widget/getwidget).

Alternatively, you can send a `GET` request to [`/v3/content/widgets`](https://developer.bigcommerce.com/api-reference/store-management/widgets/widget/getwidgets), passing your `widget_template_uuid` as a query parameter.

The [response](https://developer.bigcommerce.com/api-reference/store-management/widgets/widget/getwidget#responses) should be similar to the following example:

```json

{
  "data": [
    {
      "channel_id": 1,
      "date_created": "2021-04-09T21:27:21.163Z",
      "date_modified": "2021-04-09T21:40:47.892Z",
      "description": "",
      "name": "Product Widget",
      "storefront_api_query_params": {
        "productId": 77
      },
      "uuid": "7e6d7a11-164e-4eb1-ae0a-af07f3e2c8fb",
      "version_uuid": "3f4defcf-2429-425d-8e5a-7c3807fa9896",
      "widget_configuration": {
        "_": {
          "id": "7e6d7a11-164e-4eb1-ae0a-af07f3e2c8fb"
        },
        "productId": "77"
      },
      "widget_template": {
        "channel_id": 1,
        "client_rerender": false,
        "current_version_uuid": "3f4defcf-2429-425d-8e5a-7c3807fa9896",
        "date_created": "2021-04-09T21:23:16.274Z",
        "date_modified": "2021-04-09T21:23:16.274Z",
        "icon_name": "default",
        "kind": "custom",
        "name": "Product Widget",
        "schema": [
          {
            "settings": [
              {
                "id": "graphQueries",
                "type": "graphQl",
                "typeMeta": {
                  "mappings": {
                    "productId": {
                      "reads": "productId",
                      "type": "Int!"
                    }
                  }
                }
              }
            ],
            "type": "hidden"
          },
          {
            "label": "Content",
            "sections": [
              {
                "label": "Product",
                "settings": [
                  {
                    "default": "",
                    "id": "productId",
                    "label": "Product",
                    "type": "productId",
                    "typeMeta": {
                      "placeholder": "Search by name or SKU"
                    }
                  }
                ]
              }
            ],
            "type": "tab"
          }
        ],
        "storefront_api_query": "query Product($productId: Int = 1, $activeCurrencyCode: currencyCode) { site { product(entityId: $productId) { name entityId prices(currencyCode: $activeCurrencyCode) { price { currencyCode value } } defaultImage { url(width: 500, height: 500) } } } } ",
        "template": "<div style=\"text-align:center\">\n<h1>{{_.data.site.product.name}}</h1>\n<div>\n<img src=\"{{_.data.site.product.defaultImage.url}}\">\n</div>\n<div>\n<p>${{_.data.site.product.prices.price.value}}</p>\n</div>\n</div>",
        "template_engine": "handlebars_v3",
        "uuid": "95eaa664-b19e-4a31-b9c7-498f9bc60bae"
      }
    }
  ],
  "meta": {...}
}
```

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> ### Note
>
> The value of the `productId` inside of the `widget_configuration` object is mapped to the `productId` parameter of the `storefront_api_query_params` object.

</div>
</div>
</div>

## Place the widget using the API

It is also possible to place widgets programmatically using the API. First, [create a widget](https://developer.bigcommerce.com/api-reference/store-management/widgets/widget/createwidget) by sending a `POST` request to `/v3/content/widgets`.

```http
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/content/widgets
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

{
  "name": "Product Widget",
  "widget_template_uuid": "{{TEMPLATE_UUID}}"
}
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/widgets/widget/createwidget#requestrunner)

Take note of the widget's `uuid` returned in the [response](https://developer.bigcommerce.com/api-reference/store-management/widgets/widget/createwidget#responses). You will need the widget's `uuid` to [create a placement](https://developer.bigcommerce.com/api-reference/store-management/widgets/placement/createplacement) for your widget.


**Response:**
```json
{
  "data": {
    "uuid": "{{WIDGET_UUID}}",
    ...
  }
}
```

To [create a placement](https://developer.bigcommerce.com/api-reference/store-management/widgets/placement/createplacement), send a `POST` request to `/v3/content/placements`.

```http
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/content/placements
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

{
  "widget_uuid": "{{WIDGET_UUID}}",
  "template_file": "{{TEMPLATE_FILE}}",
  "status": "active",
  "region": "{{REGION}}"
}
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/widgets/placement/createplacement#requestrunner)

For a list of accepted `template_file` values, see [create a placement](https://developer.bigcommerce.com/api-reference/storefront/widgets-api/placement/createplacement).

To [get a list of theme regions](https://developer.bigcommerce.com/api-reference/storefront/widgets-api/regions/getcontentregions) for the `region` property, send a `GET` request to `/v3/content/regions?template_file={{TEMPLATE_FILE}}`.

```http
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/content/regions?template_file={{TEMPLATE_FILE}}
X-Auth-Token: {{ACCESS_TOKEN}}
Accept: application/json
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/storefront/widgets-api/regions/getcontentregions#requestrunner)

## Related resources

### Articles
* [GraphQL Storefront API Overview](https://developer.bigcommerce.com/api-docs/storefront/graphql/graphql-storefront-api-overview)
* [Page Builder Overview](https://developer.bigcommerce.com/stencil-docs/page-builder/page-builder-overview)
* [Widgets API Overview](https://developer.bigcommerce.com/api-docs/store-management/widgets/overview)
* [Widget UI Schema](https://developer.bigcommerce.com/stencil-docs/page-builder/widget-ui-schema)

### Endpoints 
* [Widgets API](/api-reference/store-management/widgets)
