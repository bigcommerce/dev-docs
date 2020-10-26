# Widgets Tutorial

<div class="otp" id="no-index">

### On This Page
- [Create a region](#create-a-region)
- [Verify region creation](#verify-region-creation)
- [Create a widget template](#create-a-widget-template)
- [Create a widget](#create-a-widget)
- [Create a placement](#create-a-placement)
- [Create a user interface](#create-a-user-interface)
- [Resources](#resources)

</div>

In this tutorial, you'll create a [category page widget](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/widgets-tutorial-01.gif) (github) that displays a row of three images.

###  Prerequisites
* API `access_token` with `content modify` scope.
* Knowledge of [Widgets](https://developer.bigcommerce.com/api-docs/storefront/widgets/widgets-overview).

## Create a region

In the UI, users drag and drop widgets to *place* them in a region on a page. Theme developers add, remove, and position regions by editing a page's template. Let's add a new region called `category_header_banner` to the category page; we'll place our widget here later.

In `templates/pages/category.html`, add `{{{region name="category_header_banner"}}}` below the page heading.

```html
<!-- ... -->
{{#unless theme_settings.hide_category_page_heading }}
    <h1 class="page-heading">{{category.name}}
{{/unless}}

{{{region name="category_header_banner"}}}
<!-- ... -->
```

If you're using [Stencil CLI](https://developer.bigcommerce.com/stencil-docs/installing-stencil-cli/installing-stencil) and editing theme files locally, push and apply your changes before proceeding to the next step.

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> ### Note
> * Regions can only be added to templates in [`templates/pages/`](https://developer.bigcommerce.com/stencil-docs/storefront-customization/directory-structure).
> * [Install and Configure Stencil CLI](https://developer.bigcommerce.com/stencil-docs/installing-stencil-cli/installing-stencil) to edit theme files locally.
> * Use [Page Builder](https://support.bigcommerce.com/s/article/Stencil-Themes#edit) to edit theme files via control panel UI.

</div>
</div>
</div>

## Verify region creation

To verify region creation, send a `GET` request to [`/v3/content/regions`](https://developer.bigcommerce.com/api-reference/storefront/widgets-api/regions/getcontentregions).

```http
GET /stores/{{STORE_HASH}}/content/regions?template_file=pages/category
Host: api.bigcommerce.com
X-Auth-Token: {{ACCESS_TOKEN}}
X-Auth-Client: {{CLIENT_ID}}
Accept: application/json
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/storefront/widgets-api/regions/getcontentregions#requestrunner)

Then, look for the region's name in the response.

```json
{
  "data": [
    {
      "name": "header_bottom"
    },
    {
      "name": "category_header_banner"
    }
  ],
  "meta": {}
}
```

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

>### Note
> * Use the `?template_file=pages/category` query string parameter to get the category template's regions.

</div>
</div>
</div>

## Create a widget template

Widgets derive from widget templates. Before we create our widget, we must first create it's template. To do so, send a `POST` request to [`/v3/content/widget-templates`](https://developer.bigcommerce.com/api-reference/storefront/widgets-api/widget-template/createwidgettemplate).

```http
POST /stores/{{store_hash}}/v3/content/widget-templates
Host: api.bigcommerce.com
X-Auth-Token: {{ACCESS_TOKEN}}
X-Auth-Client: {{CLIENT_ID}}
Content-Type: application/json
Accept: application/json

{
  "name": "Header Images",
  "template": "{{#each images}}<a href='{{image_url}}'><img src={{image_source}} style='width:33.3%'/></a>{{/each}}"
}
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/widgets/widget-template/createwidgettemplate#requestrunner)

**Response:**

```json
{
    "data": {
        "uuid": "3a1b0044-c9b3-47d3-9929-01ab0c20243b",
        "name": "Header Images",
        "schema": [],
        "template": "{{#each images}}<a href='{{image_url}}'><img src={{image_source}} style='width:33.3%'/></a>{{/each}}",
        "date_created": "2019-02-25T18:35:04.904Z",
        "date_modified": "2019-02-25T18:35:04.904Z",
        "kind": "custom"
    },
    "meta": {}
}
```

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> ### Note
> * The response contains the `uuid` of the widget template. Make note of it; its used to create the widget later.
> * Widget templates accept [Handlebars expressions](https://developer.bigcommerce.com/stencil-docs/reference-docs/handlebars-helpers-reference).
> * Multiple widgets can use the same widget template.

</div>
</div>
</div>

## Create a widget

Now, use the widget template to create the widget. To do so, send a `POST` request to [`/v3/content/widgets`](https://developer.bigcommerce.com/api-reference/storefront/widgets-api/widget/createwidget).

```http
POST /stores/{{STORE_HASH}}/v3/endpoint
Host: api.bigcommerce.com
X-Auth-Token: {{ACCESS_TOKEN}}
X-Auth-Client: {{CLIENT_ID}}
Content-Type: application/json
Accept: application/json

{
  "name": "Header Images",
  "template": "{{#each images}}<a href='{{image_url}}'><img src={{image_source}} style='width:33.3%'/></a>{{/each}}",
  "widget_configuration": {
  	"images": [{
  	"image_source": "https://cdn11.bigcommerce.com/s-n0i50vy/images/stencil/1280x1280/products/109/361/kinfolkessentialissue_1024x1024__22507.1456436715.jpg?c=2&imbypass=on"
  	},
  	{
  	"image_source":"https://cdn11.bigcommerce.com/s-n0i50vy/images/stencil/500x659/products/85/282/livingwithplants_grande__26452.1456436666.jpg?c=2&imbypass=on"
  },
  {
  "image_source":
  	"https://cdn11.bigcommerce.com/s-n0i50vy/images/stencil/1280x1280/products/109/361/kinfolkessentialissue_1024x1024__22507.1456436715.jpg?c=2&imbypass=on"
	}
  ]
  },
  "widget_template_uuid":"d9438e99-4a0f-4c69-b0af-912a44881fab"
}
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/widgets/widget/createwidget#requestrunner)

| Property | Description |
|---|---|
| `name` | short widget name displayed to user (required) |
| `description` | long description displayed to user (optional) |
| `template` | widget's template; overrides `widget_template_uuid` template |
| `widget_configuration` | data for Handlebars context |
| `widget_template_uuid` | default template `uuid` |

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> ### Note
> * Note the widget's UUID in the response for creating the placement in the next step.

</div>
</div>
</div>

## Create a placement

In the UI, users drag and drop widgets to *place* them in a region on a page. Here, we'll use the API to programmatically place our widget. To do so, send a `POST` request to [`/v3/content/placements`](https://developer.bigcommerce.com/api-reference/storefront/widgets-api/placement/createplacement).

```http
POST /stores/{{store_hash}}/v3/content/placements
Host: api.bigcommerce.com
X-Auth-Token: {{ACCESS_TOKEN}}
X-Auth-Client: {{CLIENT_ID}}
Content-Type: application/json
Accept: application/json

{
  "widget_uuid": "{your-widget-uuid}",
  "entity_id": "{your-category-id}",
  "sort_order": 1,
  "region": "category_header_banner",
  "template_file": "pages/category",
  "status": "active"
}
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/widgets/placement/createplacement#requestrunner)

| Property | Description |
|---|---|
| `widget_uuid` | UUID of the widget |
| `entity_id` |  page, category, brand, or product ID |
| `sort_order` | widget sort order |
| `region` | region the template will show |
| `template_file` | template file region added to |
| `status` | active or inactive |

## Create a user interface

In the control panel, users use [Page Builder](https://developer.bigcommerce.com/stencil-docs/page-builder/page-builder-overview) to move and configure widgets. You can optionally add custom configuration settings to your a widget's [Page Builder UI](https://developer.bigcommerce.com/stencil-docs/page-builder/page-builder-overview) by including the `schema` property in the create [widget template request](#create-a-widget-template).

```json
{
  "name": "Header Images",
  "template": "{{#each images}}<a href='{{image_url}}'><img src={{image_source}} style='width:33.3%'/></a>{{/each}}",
  "schema": [
    {
      "type": "tab",
      "label": "Content",
      "sections": [
        {
          "label": "Product cards",
          "settings": [
            {
              "type": "boolean",
              "label": "Show product name",
              "id": "showProductName",
              "default": true
            }
          ]
        }
      ]
    }
  ]
}
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/storefront/widgets-api/widget-template/createwidgettemplate#requestrunner)

For more information, see [Page Builder Overview](https://developer.bigcommerce.com/stencil-docs/page-builder/page-builder-overview).

## Resources

### Related endpoints
* [Widgets API](/api-reference/storefront/widgets-api)

### Related articles
* [Widgets Overview](/api-docs/storefront/widgets/widgets-overview)
* [Wigets Code Samples](/api-docs/storefront/widgets/widgets-code-samples)
* [Page Builder Overview](https://developer.bigcommerce.com/stencil-docs/page-builder/page-builder-overview)