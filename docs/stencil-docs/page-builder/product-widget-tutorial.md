# Product Widget Tutorial

<div class="otp" id="no-index">

### On this page
- [Prerequisites](#prerequisites)
- [Create a product widget](#create-a-product-widget)
- [Widget preview](#widget-preview)
- [Resources](#resources)

</div>

Widgets are configurable and reusable components of content that merchants can display on their storefront. Widgets consist of a combination of HTML, JavaScript, CSS, and Handlebars, and are rendered as part of the storefront’s HTML. 

In this tutorial, we will walk you through the process of creating a product widget that can display and dynamically update its information, such as product name, image, and price, using BigCommerce’s Widgets API and GraphQL. By the end of this tutorial, you should have a functional widget displayed in the control panel and accessible through the Page Builder UI.

## Prerequisites
* API OAuth token with the OAuth Scopes content set to `modify`. 
* Understanding of [widgets](https://developer.bigcommerce.com/api-docs/store-management/widgets/overview#widgets) and the [Widgets API](https://developer.bigcommerce.com/api-docs/store-management/widgets/overview). 

The steps in this tutorial assume that you are familiar with BigCommerce’s Widgets API, and have obtained the API `access_token` with the `content modify` scope. The API `access_token` is required to inject, remove, and list widgets into any page of the store. To learn more about the Widgets API, see [Widgets API Overview](https://developer.bigcommerce.com/api-docs/store-management/widgets/overview). For information on how to create an API account, see [Creating an API Account](https://support.bigcommerce.com/s/article/Store-API-Accounts#creating). 

## Create a product widget
To create and expose a custom widget in Page Builder, you first need to create a template for it. A widget template is created by sending a `POST` request to the [Create a Widget Template](https://developer.bigcommerce.com/api-reference/store-management/widgets/widget-template/createwidgettemplate) endpoint. 

Your request should include the following parameters:

* `name` (string) - The name of the widget.
* `template` (html) - The skeleton UI of the widget rendered as Handlebars HTML.
* `schema` (json) - The JSON schema of data for the widget template. The schema represents the customizable options available in the sidebar of Page Builder.
* `storefront_api_query` (graphql) - A [Storefront API GraphQL](https://developer.bigcommerce.com/api-docs/storefront/graphql/graphql-storefront-api-overview) query that can fetch store information to be used in the widget. This data is available to Handlebars within `{{_.data}}`.

### Template schema 
For a widget to have a custom user interface within the Page Builder platform, the body of the request must include a `schema` property. The settings you define in this property will be exposed on the side panel of the Page Builder tool, providing merchants with the ability to modify how the widget appears on their storefront. 

You can limit the amount of widget customizations available to a merchant by configuring the settings in the template’s schema. To learn more about schema settings, see [Widget UI Schema](https://developer.bigcommerce.com/stencil-docs/page-builder/widget-ui-schema). 

### Create a template
To [create a widget template](https://developer.bigcommerce.com/api-reference/store-management/widgets/widget-template/createwidgettemplate), send a `POST` request to `/stores/{{STORE_HASH}}/v3/content/widget-templates`.
 
```http
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/content/widget-templates
X-Auth-Token: {{ACCESS_TOKEN}}
X-Auth-Client: {{CLIENT_ID}}
Content-Type: application/json
Accept: application/json
 
{
  "name": "Product Widget",
  "storefront_api_query": "query Product($productId: Int = 1) { site { product(entityId: $productId) { name entityId prices { price { currencyCode value } } defaultImage { url(width: 500, height: 500) } } } } ",
  "schema": [
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

**Response:**

```json
{
    "data": {
        "uuid": "479e6ffe-73bc-4a0c-8e49-654d97691e8b",
        "name": "Product Widget",
        "schema": [
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
        "template": "<div style=\"text-align:center\">\n<h1>{{_.data.site.product.name}}</h1>\n<div>\n<img src=\"{{_.data.site.product.defaultImage.url}}\">\n</div>\n<div>\n<p>${{_.data.site.product.prices.price.value}}</p>\n</div>\n</div>",
        "date_created": "2020-09-08T21:40:20.310Z",
        "date_modified": "2020-09-09T00:17:01.755Z",
        "kind": "custom",
        "storefront_api_query": "query Product($productId: Int = 1) { site { product(entityId: $productId) { name entityId prices { price { currencyCode value } } defaultImage { url(width: 500, height: 500) } } } } ",
        "icon_name": "default",
        "template_engine": "handlebars_v3",
        "client_rerender": false,
        "site_id": null,
        "channel_id": 1
    },
    "meta": {}
}
```

## Widget preview

You should now see your widget with its customizable options reflected in Page Builder, under the Custom section.

> You do not need to send a `POST` request to [Create a Widget](https://developer.bigcommerce.com/api-reference/store-management/widgets/widget/createwidget) or [Create a Widget Placement](https://developer.bigcommerce.com/api-reference/store-management/widgets/placement/createplacement) endpoints to reflect the new widget in Page Builder.

The following screenshot shows how the widget is rendered in the Page Builder UI.

![Product widget preview](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/product-widget.png)

### Regions

In the control panel, merchants can drag and drop widgets to place them in a region on a page. Widget instances and widget templates are region-agnostic, meaning they can be used across any region available in a theme.

## Resources

- [Store API Accounts](https://support.bigcommerce.com/s/article/Store-API-Accounts) (BigCommerce Knowledge Base)
- [GraphQL Storefront API Overview](https://developer.bigcommerce.com/api-docs/storefront/graphql/graphql-storefront-api-overview)
- [Widgets API](https://developer.bigcommerce.com/api-docs/store-management/widgets/overview)
- [Widget UI Schema](https://developer.bigcommerce.com/stencil-docs/page-builder/widget-ui-schema)
- [Widget UI Input Types](https://developer.bigcommerce.com/stencil-docs/page-builder/schema-settings)
