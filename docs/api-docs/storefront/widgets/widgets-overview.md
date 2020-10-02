# Widgets API


<div class="otp" id="no-index">

### On this page

- [Regions](#regions)
- [Widget templates](#widget-templates)
- [Widgets](#widgets)
- [Placements](#placements)
- [Placements and widgets](#placements-and-widgets)
- [Widgets on the storefront](#widgets-on-the-storefront)
- [Definitions](#definitions)
- [Resources](#resources)

</div>

The Widgets API allows developers to programmatically associate content with regions on a BigCommerce storefront. The content can consist of HTML, CSS, and JavaScript, and the API supports configuration via [Handlebars](https://handlebarsjs.com/) variables. It can support many types of content such as YouTube Videos, image sliders, and chat apps.

Some benefits are:
* Inject modular, reusable blocks of content inside new and existing store pages
* Build tools that allow non-technical users to control content without editing theme files
* Target specific products, categories or brands with widgets

In this article, we are going to review all the components that make a widget. Then, we’ll use what we’ve learned to create a widget.

## Regions

[Regions](https://developer.bigcommerce.com/api-reference/storefront/widgets-api/regions/getcontentregions) are specific locations in the Stencil theme files where you can place a widget. You can add a region at the file level using the format `{{{region name="..."}}}` and name the region however you like, but it is best practice to give it a name that is descriptive of the location and function. A theme file can have as many regions as you want, with more than one widget assigned to the region and the [Placements](https://developer.bigcommerce.com/api-docs/store-management/widgets/overview#placements) `sort_order` controlling how the widgets appear on the storefront.

![Content Region](//s3.amazonaws.com/user-content.stoplight.io/6012/1551970794664 "Content Region")

![Content Region](//s3.amazonaws.com/user-content.stoplight.io/6012/1551970767918 "Content Region")

Most themes in the BigCommerce marketplace come with predefined regions. It is best to use those first. By editing the theme and adding theme regions, updates will need to be managed manually.

<!-- ### Global regions

Global regions are special regions you can use to place and manage content sitewide. Widgets placed in a global region will appear on every page of the storefront where that region exists. This makes global regions useful for displaying high-priority information, such as special promotion advertising banners, across multiple storefront pages.

To create a global region, add the `--global` suffix to the region name as shown in the following example:

`{{{region name=”header_bottom--global”}}}`

>Note
>
>`header_bottom--global`region is currently the only global region available by default.  -->

## Widget templates

[Widget templates](/api-reference/storefront/widgets-api/widget-template/getwidgettemplates) are Handlebars-enabled HTML templates which define the structure of the widget on a page. Widget templates can use the built-in Handlebars helpers such as {{if}} and {{each}}. Using the helpers allows for conditional logic to be built into the Widget templates. Widget templates can be reused to build multiple widgets.

### Widget template examples

**Simple list**

The simple list template creates a list where each item in the list can have a different color. This example uses the [each block helper](https://handlebarsjs.com/api-reference/helpers.html) in Handlebars to loop through each item in the list and display it. The text and color are determined by Handlebars placeholders that are set when creating the [widget](/api-reference/storefront/widgets-api/widget/createwidget).

The list takes advantage of loops to display each list item on the page.

```json
{
  "name": "Simple List",
  "template": "<ul>{{#each list_items}}<li style=\"color:{{color}};\">{{text}}</li>{{/each}}</ul>"
}
```

The slider takes advantage of loops to display each slide on the page.

```json
{
"name": "Simple Slider",
"template": "<ul class='slider'>{{#each slides}}<li class='slide'><img src={{image}}'/</li>{{/each}}</ul>"
}
```

## Widgets

[Widgets](/api-reference/storefront/widgets-api/widget/getwidgets) are a unit of content that are placed on specific pages in a Stencil theme. Widgets are made of a widget configuration written in JSON and a widget template UUID. Widgets are rendered as part of the HTML on the storefront.

![Widget](//s3.amazonaws.com/user-content.stoplight.io/6012/1551971053085 "Storefront Widget")

### Widget configuration

A Widget configuration is the JSON payload that defines the content to be rendered with a given widget template. In the previous simple list example, the widget template loops over a `list_items` array using `{{#each}}`.

In the example below, we define the `list_items` array and supply values for the color and text of each list item. Since the template is created separately from the configuration, the same template UUID can be used multiple times for configuration.

**Widget configuration slides**

```json
{
  "slides": [
    {"image":"http://imageurl.com/nh35jn/test.png"},
    {"image":"http://imageurl.com/fdhdfh/test2.png"}
  ]
}
```

**Widget configuration list items**

```json
{
	"list_items": [{
			"color": "orange",
			"text": " Item One"
		},
		{
			"color": "blue",
			"text": "Item Two"
		}
	]
}

```

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

<!-- theme:  -->

### Reusing widget configuration
> Keep in mind that when reusing the `widget_configuration` the array will have to be called `list_items`. Otherwise, the widget will be created on the frontend, but there will be no data, so nothing is rendered. This is because `list_items` was defined when the widget template was originally created. The widget configuration name can be anything that is set when the widget_template is created.

</div>
</div>
</div>

**List items example: Incorrect**

```json
{
  "name": "Simple List",
  "widget_configuration": {
    "list_items_two": [
      {
        "color": "orange",
        "text": "Fifth item"
      },
      {
        "color": "blue",
        "text": "Sixth item"
      }
    ]
  },
  "widget_template_uuid": "7bfb9a46-75cc-45bc-bf39-a6a43b77111f"
}
```

The example above uses `list_items_two`, on line four, in the configuration which is not the same as `list_items`. If `list_items` has already been established during the initial configuration it must be set as `list_items` when being used again.


**List items example: Correct**

```json
{
  "name": "Simple List",
  "widget_configuration": {
    "list_items": [
      {
        "color": "orange",
        "text": "Fifth item"
      },
      {
        "color": "blue",
        "text": "Sixth item"
      }
    ]
  },
  "widget_template_uuid": "7bfb9a46-75cc-45bc-bf39-a6a43b77111f"
}
```

## Placements

[Placements](/api-reference/storefront/widgets-api/placement/createplacement) determine the region where the widget is placed and in what order. The order of the placement is controlled by the `sort_order` when creating the placement.
A placement must be created in order to use a widget on the storefront.

Placements can be used with `sort_order` and region to determine placement in a theme.

### Placements entity_id

When creating a placement, there is an option to provide an `entity_id`.
This is the ID for a specific product, brand, category or page. For example, if a widget needs to be on all product pages, leave `entity_id` blank. If the widget should only appear on a certain product page, then assign `entity_id` the product ID.

`entity_id` can be used with the following page types:
* pages/brand
* pages/category
* pages/page
* pages/product

### Create a widget placement with region

Below, the region and sort order have a value, so the widget will appear on the home page.

**Widget with region**

```json
{
    "widget_uuid": "2dfeb50e-5f8c-4df2-8525-a338091eed32",
    "entity_id": "14",
    "sort_order": 1,
    "region": "home_header_image",
    "template_file": "pages/home",
    "status": "active"
}
```

### Create a widget placement without a region
Leaving the region and sort order off the request will return just the `placement_id` in the response, allowing for the widget to be rendered using layouts.

**Widget without a region**

```json
{
    "widget_uuid": "2dfeb50e-5f8c-4df2-8525-a338091eed32",
    "entity_id": "14",
    "template_file": "pages/home",
    "status": "active"
}
```

## Placements and widgets

Placements determine which region widgets are located in and the order that they're displayed.

When creating a placement with a widget, the widget content takes the full region width. Any additional widgets that are placed onto the same region will be stacked above or below based on the `sort_order` property for each placement.

If you are creating marketplace applications that create placements directly, you don’t need to use the `sort_order` property.

## Widgets on the storefront

Widgets are rendered on the storefront as a data tag in the HTML.

* Region -- data-content-region
* Widget -- data-widget-id
* Placement does not generate a data tag. 

A region can contain multiple placements with widgets.

## Definitions

| Name | Definition |
|--|--|
| Widgets | Widgets are the units of content to be placed on specific pages in a Stencil theme. Each widget is comprised of a widget configuration and a widget template. *There is a limit of `10,000` widgets per store.* |
| Widget templates | Widget templates are Handlebars-enabled HTML templates which define the widget’s structure on a page. These templates can include conditional logic as well as looping. *There is a limit of `1,000` total custom widget templates per store. This does not include templates pre-provided by BigCommerce.* |
| Placements | Placements are the records to track which widget appears on which page, and in what order.  Currently, placements can only exist on the following pages: </br>* pages/blog-post </br> * pages/blog</br>* pages/brand</br>* pages/brands</br>* pages/cart</br>* pages/category</br>* pages/home</br>* pages/page</br>* pages/product</br>* pages/search</br> *There is a limit of 75 placements per template file and `10,000` total placements per store.*|
| Regions | Regions are specific spots in a Stencil template file where Widgets can be placed. Regions are defined at the theme file level using the following syntax: `{{{region name="..."}}}`. Many widgets can reside within a given region, and these widgets can have an assigned sort order. |
| Widget configuration | This is a JSON payload that contains data used when rendering the widget. Each widget has a configuration, and there is a 64kb limit on the size of the JSON. The widget configuration must be valid JSON, but we don’t enforce any additional requirement on the structure of the configuration. |

## Resources

### Related endpoints
* [Widgets API](/api-reference/storefront/widgets-api)
* [Widgets Tutorial](/api-docs/storefront/widgets/widgets-tutorial)
* [Wigets Code Samples](/api-docs/storefront/widgets/widgets-code-samples)
