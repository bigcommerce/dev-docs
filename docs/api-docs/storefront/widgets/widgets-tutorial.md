# Widgets Tutorial

<div class="otp" id="no-index">

### On this page
- [Create a region](#create-a-region)
- [Create a widget template](#create-a-widget-template)
- [Create a widget](#create-a-widget)
- [Create a placement](#create-a-placement)
- [Create a user interface](#create-a-user-interface)
- [Resources](#resources)

</div>

BigCommerce’s [Widgets API](https://developer.bigcommerce.com/api-docs/store-management/widgets/overview) allows you to create, manage, and apply widgets to your storefront. 

In this tutorial, you will create a [widget](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/widgets-tutorial-01.gif) (GitHub) that displays a row of three images and place that widget in a designated region on a category page.

###  Prerequisites
* A test store.
* API `access_token` with `content modify` scope.
* Knowledge of the [Widgets API](https://developer.bigcommerce.com/api-docs/storefront/widgets/widgets-overview).

## Create a region

For a widget to appear on a store’s page, it has to be placed in a region. Regions are added and removed at the file level by editing a page’s template. 

Let’s start by adding a new region called `category_header_banner`  to the template of your store’s category page. You will use this region to position your widget later. 

In `templates/pages/category.html`, add `{{{region name="category_header_banner"}}}` below the page heading.

```html
<!-- ... -->
{{#unless theme_settings.hide_category_page_heading }}
    <h1 class="page-heading">{{category.name}}
{{/unless}}

{{{region name="category_header_banner"}}}
<!-- ... -->
```

If you’re using [Stencil CLI](https://developer.bigcommerce.com/stencil-docs/installing-stencil-cli/installing-stencil) and editing theme files locally, push and apply your changes before proceeding to the next step.

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> ### Note
> * Regions can only be added to templates in [`templates/pages/`](https://developer.bigcommerce.com/stencil-docs/storefront-customization/directory-structure).
>* To edit theme files locally, use [Stencil CLI](https://developer.bigcommerce.com/stencil-docs/installing-stencil-cli/installing-stencil).
> * To edit theme files in the control panel, use [Page Builder](https://support.bigcommerce.com/s/article/Stencil-Themes#edit).

</div>
</div>
</div>

### Verify region creation

To verify region creation, send a `GET` request to [`/v3/content/regions`](https://developer.bigcommerce.com/api-reference/storefront/widgets-api/regions/getcontentregions) using `?template_file=pages/category` query string parameter.

```http
GET /stores/{{STORE_HASH}}/content/regions?template_file=pages/category
Host: api.bigcommerce.com
X-Auth-Token: {{ACCESS_TOKEN}}
Accept: application/json
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/storefront/widgets-api/regions/getcontentregions#requestrunner)

Look for the region’s name in the response.

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

## Create a widget template

Widgets derive from widget templates. Before you can create a widget, you must first create its template. To do so, send a `POST` request to [`/v3/content/widget-templates`](https://developer.bigcommerce.com/api-reference/storefront/widgets-api/widget-template/createwidgettemplate).

```http
POST /stores/{{store_hash}}/v3/content/widget-templates
Host: api.bigcommerce.com
X-Auth-Token: {{ACCESS_TOKEN}}
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
    "channel_id": 1,
    "client_rerender": false,
    "current_version_uuid": "c48b131a-ae9d-4767-b5d6-63d9e43bcf75",
    "date_created": "2020-11-03T18:51:22.877Z",
    "date_modified": "2020-11-03T18:51:22.877Z",
    "icon_name": "default",
    "kind": "custom",
    "name": "Header Images",
    "schema": [],
    "template": "{{#each images}}<a href='{{image_url}}'><img src={{image_source}} style='width:33.3%'/></a>{{/each}}",
    "uuid": "{your-widget-template-uuid}"
  },
  "meta": {}
}
```

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> ### Note
> * Make note of the `uuid` of the widget template in the response. You will use it to create the widget in the next step.
> * Multiple widgets can use the same widget template.

</div>
</div>
</div>

## Create a widget

To create a widget, you will need to reference the widget template `uuid` from the previous step. Send a `POST` request to [`/v3/content/widgets`](https://developer.bigcommerce.com/api-reference/storefront/widgets-api/widget/createwidget) making sure to replace the placeholder value inside `widget_template_uuid` with your template's `uuid`.


```http
POST /stores/{{STORE_HASH}}/v3/endpoint
Host: api.bigcommerce.com
X-Auth-Token: {{ACCESS_TOKEN}}
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
  "widget_template_uuid":"{your-widget-template-uuid}"
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
> * Make note of the widget’s `uuid` in the response. You will use it to create a placement in the next step.

</div>
</div>
</div>

## Create a placement

In the control panel UI, users can drag and drop widgets to place them in a region on a page. For the purpose of this tutorial, we will use the Widgets API to place the widget programmatically. 

To place your widget in the `category_header_banner` region of a category page, send a `POST` request to [`/v3/content/placements`](https://developer.bigcommerce.com/api-reference/storefront/widgets-api/placement/createplacement).

```http
POST /stores/{{store_hash}}/v3/content/placements
Host: api.bigcommerce.com
X-Auth-Token: {{ACCESS_TOKEN}}
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

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> ### Note
> * Home page does not support `entity_id`.
> * For category pages, if you do not assign a value to `entity_id`, the widget will appear on all of the category pages.


</div>
</div>
</div>

## Create a user interface

You can use [Page Builder](https://developer.bigcommerce.com/stencil-docs/page-builder/page-builder-overview) to move and configure widgets in the control panel. To add custom configuration settings to your a widget's [Page Builder UI](https://developer.bigcommerce.com/stencil-docs/page-builder/page-builder-overview), include the `schema` property in the [create widget template](#create-a-widget-template) request.

```json
{
   "name":"Header Images",
   "template":"{{#each images}}<a href='{{link}}'><img src={{imageUrl.src}} style='width:33.3%'/></a>{{/each}}",
   "schema":[
      {
         "type":"array",
         "label":"Images",
         "id":"images",
         "defaultCount":3,
         "entryLabel":"Image",
         "thumbnail":"imageUrl.src",
         "schema":[
            {
               "type":"tab",
               "label":"Content",
               "sections":[
                  {
                     "settings":[
                        {
                           "type":"imageManager",
                           "id":"imageUrl",
                           "default":{
                              "src":"https://cdn11.bigcommerce.com/s-n0i50vy/images/stencil/1280x1280/products/109/361/kinfolkessentialissue_1024x1024__22507.1456436715.jpg?c=2&imbypass=on",
                              "type":"IMAGE_MANAGER"
                           }
                        },
                        {
                           "label":"Link",
                           "type":"input",
                           "id":"link",
                           "default":"#"
                        }
                     ]
                  }
               ]
            }
         ]
      }
   ]
}
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/storefront/widgets-api/widget-template/createwidgettemplate#requestrunner)

To learn more about Page Builder, see [Page Builder Overview](https://developer.bigcommerce.com/stencil-docs/page-builder/page-builder-overview).

## Resources

### Related endpoints
* [Get All Categories](https://developer.bigcommerce.com/api-reference/store-management/catalog/category/getcategories)

### Related articles
* [Widgets Overview](/api-docs/storefront/widgets/widgets-overview)
* [Widgets Code Samples](/api-docs/storefront/widgets/widgets-code-samples)