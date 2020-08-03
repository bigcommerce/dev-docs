# Widgets Tutorial
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
	  <li><a href="#widget-tutorial_prerequisites">Prerequisites</a></li>
        <li><a href="#widget-tutorial_adding-a-region">Adding a Region</a></li>
        <li><a href="#widget-tutorial_creating-widget-template">Creating a Widget Template</a></li>
        <li><a href="#widget-tutorial_creating-widget">Creating a Widget</a></li>
        <li><a href="#widget-tutorial_creating-placement">Creating the Placement</a></li>
    		<li><a href="#widget-tutorial_reusing-widget-template">Reusing the Widget</a></li>
            <li><a href="#widget-tutorial_creating-user-interfaces-for-widgets">Creating User Interfaces for Widgets</a></li>
	</ul>
</div>

In this tutorial, we will cover:
* Creating a Region
* Creating a Widget Template
* Creating a Widget
* Placing the Widget

This tutorial assumes knowledge of [Widgets](/api-docs/storefront/widgets/widgets-overview). 

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">
    
<!-- theme:  -->
### Cornerstone Theme
> The instructions below use the Cornerstone Theme. Your theme may differ.

</div>
</div>
</div>

<a id="widget-tutorial_prerequisites"></a>

##  Prerequisites:
* Stencil Theme. This tutorial uses Cornerstone.
* Scopes  
The following Oauth scopes are required:
	* [Content](/api-docs/getting-started/authentication#authentication_oauth-scopes) set to Modify
* Image URL. If you don’t have one, there is an example in the tutorial.
* Category Page ID. A [GET Categories](/api-reference/catalog/catalog-api/category/getcategories) request will returns a list of category IDs.

To follow along we have created a Postman collection.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/068117f7cbf510527e49)

In this tutorial, we'll create a widget that shows three images with a hover effect. Each image will link out to a different location.
<!--
    title: #### Category Page Widget

    data: //s3.amazonaws.com/user-content.stoplight.io/6012/1551898706416
-->

![#### Category Page Widget
](//s3.amazonaws.com/user-content.stoplight.io/6012/1551898706416 "#### Category Page Widget
")

## Adding a Region
In `templates/pages/category.html`, add `{{{region name="category_header_banner"}}}` below the page heading.

```html
<!-- ... -->
{{#unless theme_settings.hide_category_page_heading }}
    <h1 class="page-heading">{{category.name}}
{{/unless}}

{{{region name="category_header_banner"}}}

{{{category.description}}}
<!-- ... -->
<div class="page">
```

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">
    
<!-- theme: info -->
> Regions can only be added to files under pages/templates, including subfolders.

</div>
</div>
</div>

To check if the region was added successfully, use [Get Content Regions](/api-reference/storefront/widgets-api/regions/getcontentregions).

`GET https://api.bigcommerce.com/stores/vm2iajhsih/v3/content/regions?template_file=pages/category`

<!--
title: "Sample Response"
subtitle: "Get Content Regions"
lineNumbers: true
-->

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

## Creating a Widget Template

Widget Templates are resuable pieces of HTML. In this tutorial we are creating a header image. You can set `image_source` property using Handlebars so the header image can be changed every time you reuse a template. You can also take advantage of the conditional logic within a template using `#each images`. Instead of creating a template with three lines of code for each image, you can loop through each image using one line of code. 

* `name` -- Name of the widget template (required)
* `template` -- HTML to create the widget template (required)

The response returns the UUID for the widget template. Make note of it for when we create the widget later.

**Example Create Widget Template**  
`POST https://api.bigcommerce.com/stores/{{store_hash}}/v3/content/widget-templates`

```json
{
  "name": "Header Images",
  "template": "{{#each images}}<a href='{{image_url}}'><img src={{image_source}} style='width:33.3%'/></a>{{/each}}"
}
```

<!--
title: "Sample Response "
subtitle: "Create Widget Template"
lineNumbers: true
-->

**Example Response Create Widget Template**  
`POST https://api.bigcommerce.com/stores/{{store_hash}}/v3/content/widget-templates`

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

## Creating a Widget

Next, we will use the widget template to add the links and images. For more examples, see [Code Samples](/api-docs/storefront/widgets/widgets-code-samples). 

* `name` -- This should be a short and descriptive name for the widget (required)
* `description` -- A longer explanation of the widget, if needed 
* `widget_configuration` -- Based on the original `widget_template` configuration and can vary by the widget created
	* `image_source` -- Since this is the Handlebar placeholder, it requires an image value.
* `widget_template_uuid` -- UUID from the Widget Template response

For widget_configuration `images` is the top level array, with `image_url` and `image_source` for each object. There are three images in this example since the width of each was set to 33.3%.

In the response the Widget UUID is returned. Make note of it for use later when creating the Placement.

<!--
title: "Sample Response"
subtitle: "Create a Widget"
lineNumbers: true
-->

**Example Create a Widget**  
**`/POST`** `https://api.bigcommerce.com/stores/{{store_hash}}/v3/content/widgets`

```json
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

**Create A Widget Response**

```json
{
    "data": {
        "uuid": "a8940709-5655-4401-a341-62c44e3180b2",
        "name": "Header Images",
        "widget_configuration": {
            "images": [
                {
                    "image_url": "{where-the-image-should-link-to}",
                    "image_source": "https://cdn11.bigcommerce.com/s-n0i50vy/images/stencil/1280x1280/products/91/309/thekinfolktablecover_1024x1024__80715.1456436719.jpg?c=2&imbypass=on"
                },
                {
                    "image_url": "{where-the-image-should-link-to}",
                    "image_source": "https://cdn11.bigcommerce.com/s-n0i50vy/images/stencil/1280x1280/products/109/361/kinfolkessentialissue_1024x1024__22507.1456436715.jpg?c=2&imbypass=on"
                },
                {
                    "image_url": "{where-the-image-should-link-to}",
                    "image_source": "https://cdn11.bigcommerce.com/s-n0i50vy/images/stencil/500x659/products/85/282/livingwithplants_grande__26452.1456436666.jpg?c=2&imbypass=on"
                }
            ],
            "_": {
                "id": "a8940709-5655-4401-a341-62c44e3180b2"
            }
        },
        "widget_template": {
            "uuid": "3a1b0044-c9b3-47d3-9929-01ab0c20243b",
            "name": "Header Images",
            "schema": [],
            "template": "{{#each images}}<a href='{{image_url}}'><img src={{image_source}} style='width:33.3%'/></a>{{/each}}",
            "date_created": "2019-02-25T18:35:04.904Z",
            "date_modified": "2019-02-25T18:35:04.904Z",
            "kind": "custom"
        },
        "date_created": "2019-02-25T18:36:45.238Z",
        "date_modified": "2019-02-25T18:36:45.238Z",
        "description": ""
    },
    "meta": {}
}
```

## Creating the Placement

Placement defines the page and region where the widget should appear. Remember that [Placements](/api-docs/storefront/widgets/widgets-overview#widgets_placements) can either lead to a Layout or they can be used on their own. In this walkthrough we will use Layouts. 

* `widget_uuid` -- UUID of the Widget
* `entity_id` -- The page, category, brand or product ID where the widget should appear
* `sort_order` -- If there is more than one Widget on a page, use the sort order to control the order they are displayed.
* `region` -- Region where the template will show. It should match the template file.
* `template_file` -- Template file the region was added to
* `status` -- Whether the widget is active or inactive

If you want to see the results of the widget without a layout, use the placement without the layout code sample below. If you would like to learn more about layouts, use the Create Placement code sample below. 

**Example Create a Placement**  
`/POST https://api.bigcommerce.com/stores/{{store_hash}}/v3/content/placements`

```json
{
  "widget_uuid": "{your-widget-uuid}",
  "entity_id": "{your-category-id}",
  "sort_order": 1,
  "region": "category_header_banner",
  "template_file": "pages/category",
  "status": "active"
}
```

<!--
title: "Sample Response"
subtitle: "Create Placement"
lineNumbers: true
-->

**Example Response Create Placement**  
`/POST https://api.bigcommerce.com/stores/{{store_hash}}/v3/content/placements`

```json
{
    "data": {
        "uuid": "bb34b23b-0d4b-4b9b-9e24-c8b0dcfd5e08",
        "template_file": "pages/category",
        "region": "",
        "sort_order": 0,
        "entity_id": "21",
        "status": "active",
        "widget": {
            "uuid": "a8940709-5655-4401-a341-62c44e3180b2",
            "name": "Header Images",
            "widget_configuration": {
                "images": [
                    {
                        "image_url": "{where-the-image-should-link-to}",
                        "image_source": "https://cdn11.bigcommerce.com/s-n0i50vy/images/stencil/1280x1280/products/91/309/thekinfolktablecover_1024x1024__80715.1456436719.jpg?c=2&imbypass=on"
                    },
                    {
                        "image_url": "{where-the-image-should-link-to}",
                        "image_source": "https://cdn11.bigcommerce.com/s-n0i50vy/images/stencil/1280x1280/products/109/361/kinfolkessentialissue_1024x1024__22507.1456436715.jpg?c=2&imbypass=on"
                    },
                    {
                        "image_url": "{where-the-image-should-link-to}",
                        "image_source": "https://cdn11.bigcommerce.com/s-n0i50vy/images/stencil/500x659/products/85/282/livingwithplants_grande__26452.1456436666.jpg?c=2&imbypass=on"
                    }
                ],
                "_": {
                    "id": "a8940709-5655-4401-a341-62c44e3180b2"
                }
            },
            "widget_template": {
                "uuid": "3a1b0044-c9b3-47d3-9929-01ab0c20243b",
                "name": "Header Images",
                "schema": [],
                "template": "{{#each images}}<a href='{{image_url}}'><img src={{image_source}} style='width:33.3%'/></a>{{/each}}",
                "date_created": "2019-02-25T18:35:04.904Z",
                "date_modified": "2019-02-25T18:35:04.904Z",
                "kind": "custom"
            },
            "date_created": "2019-02-25T18:36:45.238Z",
            "date_modified": "2019-02-25T18:36:45.238Z",
            "description": ""
        },
        "date_created": "2019-02-25T18:37:10.658Z",
        "date_modified": "2019-02-25T18:37:10.658Z"
    },
    "meta": {}
}

```

## Reusing the widget template

Now that you have created the widget template, you can reuse it on different pages.

To reuse the widget template:
1. Choose where to display the widget by either creating a [Region](/api-reference/storefront/widgets-api/regions/getcontentregions) or use and existing one
2. Decide if the Widget should appear on all pages or if it should use an `entity_id`
3. Get the [Widget Template ID](/api-reference/storefront/widgets-api/widget-template/getwidgettemplates)
4. [Create the Widget](/api-reference/storefront/widgets-api/widget/createwidget) with the Widget Template ID
5. [Create a Placement](/api-reference/storefront/widgets-api/placement/createplacement) using the Widget

## Creating user interfaces for Widgets
Customers use the drag-and-drop editor, [Page Builder](https://developer.bigcommerce.com/stencil-docs/page-builder/page-builder-overview), to rearrange and edit BigCommerce's built-in widgets. You can create a user interface for custom widget settings using pre-defined schema. For more information, see [Page Builder Overview](https://developer.bigcommerce.com/stencil-docs/page-builder/page-builder-overview).


## Resources

### Related Endpoints
* [Widgets API](/api-reference/storefront/widgets-api)

### Related Articles
* [Widgets Overview](/api-docs/storefront/widgets/widgets-overview)
* [Wigets Code Samples](/api-docs/storefront/widgets/widgets-code-samples)
