# Create Widgets Powered by GraphQL

<div class="otp" id="no-index">

### On this page
- [Prerequisites](#prerequisites)
- [Create the widget template](#create-the-widget-template)
- [Place the widget using Page Builder](#place-the-widget-using-page-builder)
- [Place the widget using the API](#place-the-widget-using-the-api)
- [Resources](#resources)

</div>

In this tutorial, you'll create a [widget template](https://developer.bigcommerce.com/api-docs/store-management/widgets/overview#widget-templates) for a custom featured product widget powered by BigCommerce's [GraphQL Storefront API](https://developer.bigcommerce.com/api-docs/storefront/graphql/graphql-storefront-api-overview) that is configurable via the [Page Builder](https://support.bigcommerce.com/s/article/Page-Builder) UI in a store's control panel.

## Prerequisites
* [API OAuth access token](https://developer.bigcommerce.com/api-docs/getting-started/authentication/rest-api-authentication) with `content` `modify` [scope](https://developer.bigcommerce.com/api-docs/getting-started/authentication/rest-api-authentication#oauth-scopes).  
* Understanding of [widgets](https://developer.bigcommerce.com/api-docs/store-management/widgets/overview#widgets) and the [Widgets API](https://developer.bigcommerce.com/api-docs/store-management/widgets/overview).
* Familiarity with [Page Builder](https://developer.bigcommerce.com/stencil-docs/page-builder/page-builder-overview).

## Create the widget template

To [create a custom widget template](https://developer.bigcommerce.com/api-reference/store-management/widgets/widget-template/createwidgettemplate), send a `POST` request to `/v3/content/widget-templates`.

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

**[Response:](https://developer.bigcommerce.com/api-reference/store-management/widgets/widget-template/createwidgettemplate#responses)**

```json
{
  "data": {
    "uuid": "479e6ffe-73bc-4a0c-8e49-654d97691e8b",
    "name": "Product Widget",
    ...
}
```

|Property|Type|Description|
|-|-|-|
|`name`|string|The name of the widget.|
|`template`|string|The [widget template](https://developer.bigcommerce.com/api-docs/store-management/widgets/overview#widget-templates)|
|`schema`|object|The widget settings [schema](https://developer.bigcommerce.com/stencil-docs/page-builder/widget-ui-schema) for [Page Builder](https://support.bigcommerce.com/s/article/Page-Builder) UI|
|`storefront_api_query`|string|[GraphQL Storefront API](https://developer.bigcommerce.com/api-docs/storefront/graphql/graphql-storefront-api-overview) query that provides widget data; accessed in template via `{{_.data}}` |

## Place the widget using Page Builder

After [creating the widget template](#create-the-widget-template), you should see the widget listed in [Page Builder](https://developer.bigcommerce.com/stencil-docs/page-builder/page-builder-overview) under **Custom**.

![Product widget preview](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/product-widget.png)

 Drag and drop the widget onto the desired page; doing so creates [a widget](https://developer.bigcommerce.com/api-reference/store-management/widgets/widget/createwidget) and a [widget placement](https://developer.bigcommerce.com/api-reference/store-management/widgets/placement/createplacement).
To see the placement and widget you just created, send a `GET` request to `/v3/content/placements`.

```http
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/content/placements
X-Auth-Token: {{ACCESS_TOKEN}}
Accept: application/json
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/widgets/placement/getplacements#requestrunner)

**Response:**

```json
{
  "data": [
    {
      "uuid": "bb34b23b-0d4b-4b9b-9e24-c8b0dcfd5e08",
      "template_file": "pages/category",
      "region": "",
      "sort_order": 0,
      "entity_id": "21",
      "status": "active",
      "widget": {...},
      ...
  ],
  "meta": {...}
}
```

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> ### Note
> * For more information on placing and configuring widgets in the control panel, see [Page Builder](https://support.bigcommerce.com/s/article/Page-Builder) in the Help Center.

</div>
</div>
</div>

## Place the widget using the API

It is also possible to place widgets programmatically via API.

First, [create a widget](https://developer.bigcommerce.com/api-reference/store-management/widgets/widget/createwidget) by sending a `POST` request to `/stores/{{STORE_HASH}}/v3/content/widgets`.

```http
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/content/widgets
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

{
  "name": "Custom GraphQL Featured Product Widget",
  "widget_template_uuid": "{{TEMPLATE_UID}}"
}
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/widgets/widget/createwidget#requestrunner)

The [create widget response](https://developer.bigcommerce.com/api-reference/store-management/widgets/widget/createwidget#responses) contains the widget's `uuid`.

```json
{
  "data": {
    "uuid": "{{WIDGET_UUID}}",
    ...
  }
}
```

Use the widget's `uuid` to [create a placement](https://developer.bigcommerce.com/api-reference/store-management/widgets/placement/createplacement) by sending a `POST` request to `/stores/{{STORE_HASH}}/v3/content/placements`.

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

To [get a list of theme regions](https://developer.bigcommerce.com/api-reference/storefront/widgets-api/regions/getcontentregions) for the `region` property, send a `GET` request to `/v3/content/regions?template_file={{TEMPLATE_FILE}}`.

```http
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/content/regions?template_file={{TEMPLATE_FILE}}
X-Auth-Token: {{ACCESS_TOKEN}}
Accept: application/json
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/storefront/widgets-api/regions/getcontentregions#requestrunner)



<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> ### Note
> * For a list of accepted `template_file` values, see [create a placement](https://developer.bigcommerce.com/api-reference/storefront/widgets-api/placement/createplacement).


</div>
</div>
</div>

## Resources
- [Store API Accounts](https://support.bigcommerce.com/s/article/Store-API-Accounts) (BigCommerce Knowledge Base)
- [GraphQL Storefront API Overview](https://developer.bigcommerce.com/api-docs/storefront/graphql/graphql-storefront-api-overview)
- [Widgets API](https://developer.bigcommerce.com/api-docs/store-management/widgets/overview)
- [Widget UI Schema](https://developer.bigcommerce.com/stencil-docs/page-builder/widget-ui-schema)
- [Widget UI Input Types](https://developer.bigcommerce.com/stencil-docs/page-builder/schema-settings)
