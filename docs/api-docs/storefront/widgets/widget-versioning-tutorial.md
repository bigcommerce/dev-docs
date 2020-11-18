# Widget Versioning Tutorial

<div class="otp" id="no-index">

### On this page
- [Create a widget template](#create-a-widget-template)
- [Update the widget template](#update-the-widget-template)
- [Upgrade the widget](#upgrade-the-widget)
- [Related resources](#related-resources)

</div>

This article documents how to use [widget versioning](https://developer.bigcommerce.com/api-docs/store-management/widgets/overview#widget-versioning) to update a widget template without updating its widgets.

###  Prerequisites

* A test store.
* API `access_token` with `content modify` scope.
* Knowledge of the [Widgets API](https://developer.bigcommerce.com/api-docs/storefront/widgets/widgets-overview).

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> ### Note
> This tutorial uses [Cornerstone](https://github.com/bigcommerce/cornerstone) theme.

</div>
</div>
</div>

## Create a widget template

To create a widget template, send a `POST` request to [`v3/content/widget-templates`](https://developer.bigcommerce.com/api-reference/store-management/widgets/widget-template/createwidgettemplate).

```http
POST /stores/{{store_hash}}/v3/content/widget-templates
Host: api.bigcommerce.com
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

{
  "name": "Simple Text",
  "schema": [
    {
      "type": "tab",
      "label": "Content",
      "sections": [
        {
          "settings": [
            {
              "type": "text",
              "label": "Text Content",
              "id": "textContent",
              "typeMeta": {
                "maxLength": 1000
              }
            }
          ]
        }
      ]
    }
  ],
  "template": "<h1>Hello, World!</h1>"
}
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/widgets/widget-template/createwidgettemplate#requestrunner)


<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> ### Note
> * Make a note of `uuid` and `current_version_uuid`. We will use them in the steps that follow.

</div>
</div>
</div>

You can view your widget template in the store's control panel using [Page Builder](https://support.bigcommerce.com/s/article/Page-Builder), BigCommerce's storefront editing and customization tool. You can locate your newly created widget template in the left pane under **Custom**. 

![Page Builder](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/widget-versioning-01 "Page Builder")

### Create a widget

In this tutorial, we will create and place our widget programmatically. To place your widget using Page Builder, drag and drop the widget template from the left pane onto the page.

To create a widget using the Widgets API, send a `POST` request to [`/v3/content/widgets`](https://developer.bigcommerce.com/api-reference/storefront/widgets-api/widget/createwidget). Replace the `widget_template_uuid` placeholder with the `uuid` from the [previous step](#create-a-widget-template).

```http
POST /stores/{{STORE_HASH}}/v3/content/widgets
Host: api.bigcommerce.com
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

{
  "name": "Version 1 Widget",
  "widget_configuration": {
    "textContent": "Posted via the API"
  },
  "widget_template_uuid": "{your-widget-template-uuid}"
}
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/widgets/widget/createwidget#requestrunner)

Look for `version_uuid` and `current_version_uuid` in the response. You will notice that widget's `version_uuid` matches `current_version_uuid` of the widget template.

```json
{
  "data": {
    "channel_id": 1,
    "date_created": "2020-11-06T18:05:21.679Z",
    "date_modified": "2020-11-06T18:05:21.679Z",
    "description": "",
    "name": "Version 1 Widget",
    "uuid": "03ada835-fc01-4cf1-9c05-af86ee141cd5",
    "version_uuid": "5bb17ca3-a8c3-4a5a-bbf1-18a2b9ee9ddd", // value matches current_version_uuid
    "widget_configuration": {...},
    "widget_template": {
      "channel_id": 1,
      "client_rerender": false,
      "current_version_uuid": "5bb17ca3-a8c3-4a5a-bbf1-18a2b9ee9ddd", // value matches version_uuid
      "date_created": "2020-11-06T18:04:34.817Z",
      "date_modified": "2020-11-06T18:04:34.817Z",
      "icon_name": "default",
      "kind": "custom",
      "name": "Simple Text",
      "schema": [...],
      "template": "<h1>Hello, World!</h1>",
      "uuid": "ee65e81f-a6a6-43a4-8d52-60bab87dbff3"
    }
  },
  "meta": {}
}
```

### Place the widget

Place your widget by [creating a placement](https://developer.bigcommerce.com/api-reference/store-management/widgets/placement/createplacement). For this tutorial, we will place our widget in the `home_below_featured_products` region. To get a list of all available regions, send a `GET` request to [`v3/content/regions`](https://developer.bigcommerce.com/api-reference/store-management/widgets/regions/getcontentregions).

To place your widget, send a `POST` request to [`/v3/content/placements`](https://developer.bigcommerce.com/api-reference/store-management/widgets/placement/createplacement).

```http
POST /stores/{{STORE_HASH}}/v3/content/placements
Host: api.bigcommerce.com
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

{
  "widget_uuid": "{your-widget-uuid}",
  "entity_id": "",
  "template_file": "pages/home",
  "status": "active",
  "sort_order": 1,
  "region": "home_below_featured_products"
}
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/widgets/placement/createplacement#requestrunner)

The widget should now be visible on your store's homepage under **Featured Products**.

## Update the widget template

To create a new version of the widget template without affecting the widget created from it, we are going to include the `"create_new_version": true` parameter in the `PUT` request to [`/v3/content/widget-templates/{uuid}`](https://developer.bigcommerce.com/api-reference/store-management/widgets/widget-template/updatewidgettemplate). This will create a new version record and associate that record to the current version. 

```http
POST /stores/{{store_hash}}v3/content/widget-templates/{uuid}
Host: api.bigcommerce.com
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

{
  "name": "Red Text",
  "schema": [
    {
      "type": "tab",
      "label": "Content",
      "sections": [
        {
          "settings": [
            {
              "type": "text",
              "label": "Text Content",
              "id": "textContent",
              "typeMeta": {
                "maxLength": 1000
              }
            }
          ]
        }
      ]
    }
  ],
  "template": "<h1 style='color:red;'>Hello, World!</h1>",
  "create_new_version": true
}
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/widgets/widget-template/updatewidgettemplate#requestrunner)

Let's look at our widget again. Send a `GET` request to [`/v3/content/widgets/{uuid}`](https://developer.bigcommerce.com/api-reference/store-management/widgets/widget/getwidget) to retrieve your widget's data.
You will notice that `current_version_uuid` has changed and is now different from the widget's `version_uuid`. Although we have updated the widget template, the widget created using that template did not change.

### Create a new widget

All widgets created after the update will be based on the most current version. Let's create another widget to test this functionality. 

Send a `POST` request to [`/v3/content/widgets`](https://developer.bigcommerce.com/api-reference/storefront/widgets-api/widget/createwidget) replacing the `widget_template_uuid` placeholder with your widget template `uuid`.

```http
POST /stores/{{STORE_HASH}}/v3/content/widgets
Host: api.bigcommerce.com
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

{
  "name": "Version 2 Widget",
  "widget_configuration": {
    "textContent": "Posted via the API"
  },
  "widget_template_uuid": "{your-widget-template-uuid}"
}
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/widgets/widget/createwidget#requestrunner)

To display the new widget next to the old one, place it in the same region. In our case, it is `home_below_featured_products`. 

You should now see two different widgets displayed below **Featured Products**.

![Add a new widget](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/widget-versioning-02 "Add a new widget")

## Upgrade the widget

To upgrade the widget derived from the original widget template, send `"upgrade":true` in a `PUT` request to [`/v3/content/widgets/{uuid}`](https://developer.bigcommerce.com/api-reference/store-management/widgets/widget/updatewidget). This will push the widget up to the latest widget template version.

![Upgrade the widget](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/widget-versioning-03 "Upgrade the widget")

## Related resources

### Articles
* [Widgets Overview](/api-docs/storefront/widgets/widgets-overview)
* [Page Builder Overview](https://developer.bigcommerce.com/stencil-docs/page-builder/page-builder-overview)

### Endpoints
* [Widgets API](/api-reference/storefront/widgets-api)