<h1>Widgets Tutorial</h1>
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
	  <li><a href="#widget-tutorial_prerequisites">Prerequisites</a></li>
        <li><a href="#widget-tutorial_add-a-region">Add a Region</a></li>
        <li><a href="#widget-tutorial_create-widget-template">Create a Widget Template</a></li>
        <li><a href="#widget-tutorial_create-widget">Create a Widget</a></li>
        <li><a href="#widget-tutorial_create-placement">Create the Placement</a></li>
        <li><a href="#widget-tutorial_create-layout">Create the Layout</a></li>
    		<li><a href="#widget-tutorial_reuse-widget-template">Reuse the Widget</a></li>
	</ul>
</div>

---

In this tutorial, we will cover:
* Creating a Region
* Creating a Widget Template
* Creating a Widget
* Placing the Widget
* Creating the Layout

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

---
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

We will be making a widget that shows three images, with a hover effect and each image linking out to a different location. 

<!--
    title: #### Category Page Widget

    data: //s3.amazonaws.com/user-content.stoplight.io/6012/1551898706416
-->

![#### Category Page Widget
](//s3.amazonaws.com/user-content.stoplight.io/6012/1551898706416 "#### Category Page Widget
")

---

<a href='#widget-tutorial_add-a-region' aria-hidden='true' class='block-anchor'  id='widget-tutorial_add-a-region'><i aria-hidden='true' class='linkify icon'></i></a>

## Add a Region
Add `{{{region name="category_header_banner"}}}` to <span class=”fp”>pages/category.html</span>. This is where the widgets will appear on the category page. In this example, the region is added to line 24. 

<!--
    title: #### Add Region to category.html

    data: //s3.amazonaws.com/user-content.stoplight.io/6012/1551898921184
-->

![#### Add Region to category.html
](//s3.amazonaws.com/user-content.stoplight.io/6012/1551898921184 "#### Add Region to category.html
")

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">
    
<!-- theme: info -->
### Regions
> Regions can only be added to files under pages/templates, including subfolders.

</div>
</div>
</div>

To check the region was added successfully, use [Get Content Regions](/api-reference/storefront/widgets-api/regions/getcontentregions).


**Example Response Get Content Regions**  
`/GET https://developer.bigcommerce.com/api-reference/storefront/widgets-api/regions/getcontentregions`


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

---

<a href='#widget-tutorial_create-widget-template' aria-hidden='true' class='block-anchor'  id='widget-tutorial_create-widget-template'><i aria-hidden='true' class='linkify icon'></i></a>

## Create a Widget Template

Widget Templates are the reusable piece of structure. In this walkthrough we are creating a header image. `image_source` is set using handlebars so the header image can be changed every time the template is reused. The template also takes advantage of conditional logical with `#each images`. Instead of creating a template with three lines of code for each image, one line can loop through each image provided. 


* name -- Name of the widget template (required)
* template -- Html to create the widget template (required)

In the response the Widget Template UUID returned. Make note of it for use later when creating the Widget.

**Example Create Widget Template**  
`/POST https://api.bigcommerce.com/stores/{{store_hash}}/v3/content/widget-templates`

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
`/POST https://api.bigcommerce.com/stores/{{store_hash}}/v3/content/widget-templates`


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

---

<a href='#widget-tutorial_create-widget' aria-hidden='true' class='block-anchor'  id='widget-tutorial_create-widget'><i aria-hidden='true' class='linkify icon'></i></a>

## Create a Widget

Here, we will use the Widget Template to add the links and the images. There are many ways to use widget templates and we will go over just one. For more examples, see [Code Samples](/api-docs/storefront/widgets/widgets-code-samples). 

* name -- Something short and descriptive. (required)
* description -- a longer explanation if needed (not required)
* widget_configuration -- Based on the original widget_template configuration and can vary by the widget created.
	* image_source -- Since this is the handlebar placeholder, it requires an image value.
* widget_template_uuid -- UUID from the Widget Template response.

For widget_configuration `images is the top level array, with `image_url` and `image_source` for each object. There are three images in this example since the width of each was set to 33.3%.

In the response the Widget UUID is returned. Make note of it for use later when creating the Placement.

<!--
title: "Sample Response"
subtitle: "Create a Widget"
lineNumbers: true
-->

**Example Create a Widget**  
`/POST https://api.bigcommerce.com/stores/{{store_hash}}/v3/content/widgets`

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

---

<a href='#widget-tutorial_create-placement' aria-hidden='true' class='block-anchor'  id='widget-tutorial_create-placement'><i aria-hidden='true' class='linkify icon'></i></a>

## Create the Placement

Placement defines the page and region where the widget should appear. Remember that [Placements](/api-docs/storefront/widgets/widgets-overview#widgets_placements) can either lead to a Layout or they can be used on their own. In this walkthrough we will use Layouts. 

* widget_uuid -- UUID of the Widget
* entity_id -- The page, category, brand or product ID the widget should appear on
* sort_order -- If there is more than one Widget on a page, use the sort order to control the order they are displayed
* region -- region the template will show. It should match the template file
* template_file -- template file the region was added to
* status -- if the widget is active or inactive


If you wanted to see the results of the Widget without a layout, use the Placement without the layout code sample below. If you would like to learn more about Layouts use the Create Placement code sample below. 

**Example Create a Placement Without a Layout**  
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

To make use of Layouts for custom markdown use the code sample below. Replace the `widget_uuid` with your own.

Make note of the `placement_uuid` for use in Layouts later.

**Example Create a Placement With a Layout**  
`/POST https://api.bigcommerce.com/stores/{{store_hash}}/v3/content/placements`

```json

{
  "widget_uuid": "{your-widget-uuid}",
  "entity_id": "{your-category-id}",
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

---

<a href='#widget-tutorial_create-layout' aria-hidden='true' class='block-anchor'  id='widget-tutorial_create-layout'><i aria-hidden='true' class='linkify icon'></i></a>

## Create a Layout

A Layout accepts any html. Using a layout can allow you to create complicated widget placements on the storefront. 

* entity_id -- The page, category, brand or product ID the widget should appear on. 
* region -- region the template will show. It should match the template file
* template_file -- template file the region was added to
* markup -- this accepts any valid HTML and CSS including style tags. 
* bc-placement -- A special id that is used in layouts. It is populated with the placement ID.

The markup in the sample requst body adds the style of opacity to each image on hover.

**Example Create a Layout**  
`/POST https://api.bigcommerce.com/stores/{{store_hash}}/v3/content/layouts`

```json
{
  "entity_id": "{your-category-id}",
  "region": "category_header_banner",
  "template_file": "pages/category",
  "markup": "<style>img:hover{opacity: 0.3;}</style><div><div style='padding:5px margin-bottom:40px;'><bc-placement id='bb34b23b-0d4b-4b9b-9e24-c8b0dcfd5e08'></bc-placement></div></div>"
}
```

<!--
title: "Sample Response"
subtitle: "Create Layout"
lineNumbers: true
-->

**Example Response Create a Layout**  
`/POST https://api.bigcommerce.com/stores/{{store_hash}}/v3/content/layouts`

```json
{
    "data": {
        "uuid": "cacdadcf-07ec-43f3-aec4-f8e3382d7618",
        "template_file": "pages/category",
        "entity_id": "21",
        "region": "category_header_banner",
        "markup": "<style>img:hover{opacity: 0.3;}</style><div><div style='padding:5px;'><bc-placement id='bb34b23b-0d4b-4b9b-9e24-c8b0dcfd5e08'></bc-placement></div></div>",
        "date_created": "2019-02-25T18:38:08.455Z",
        "date_modified": "2019-02-25T18:38:08.455Z"
    },
    "meta": {}
}
```

At this point you should see the widget on the category page of your choice. 

---

<a href='#widget-tutorial_reuse-widget-template' aria-hidden='true' class='block-anchor'  id='widget-tutorial_reuse-widget-template'><i aria-hidden='true' class='linkify icon'></i></a>

## Reuse the Widget Template

Now that the Widget Template has been created it can be reused on a different page again. 

To reuse the Widget Template:
* Choose where to display the widget by either creating a [Region](/api-reference/storefront/widgets-api/regions/getcontentregions) or use and existing one
* Decide if the Widget should appear on all pages or if it should use an `entity_id`
* Get the [Widget Template ID](/api-reference/storefront/widgets-api/widget-template/getwidgettemplates)
* [Create the Widget](/api-reference/storefront/widgets-api/widget/createwidget) with the Widget Template ID
* Either [Create a Placement](/api-reference/storefront/widgets-api/placement/createplacement) or [Create a Layout](/api-reference/storefront/widgets-api/layout/createlayout) using the Widget

---

<a href='#widget-tutorial_resources' aria-hidden='true' class='block-anchor'  id='widget-tutorial_resources'><i aria-hidden='true' class='linkify icon'></i></a>

## Resources

### Related Endpoints
* [Widgets API](/api-reference/storefront/widgets-api)

### Related Articles
* [Widgets Overview](/api-docs/storefront/widgets/widgets-overview)
* [Wigets Code Samples](/api-docs/storefront/widgets/widgets-code-samples)

