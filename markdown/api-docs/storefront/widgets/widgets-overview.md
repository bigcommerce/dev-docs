<h1>Widgets API</h1>
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
        <li><a href="#widgets_regions">Regions</a></li>
        <li><a href="#widgets_widget-templates">Widget Templates</a></li>
        <li><a href="#widgets_widgets">Widgets</a></li>
        <li><a href="#widgets_placements">Placements</a></li>
        <li><a href="#widgets_layouts">Layouts</a></li>
    <li><a href="#widgets_placement-and-layouts">Placements and Layouts</a></li>
    		<li><a href="#widgets_storefront">Widgets on the Storefront</a></li>
    		<li><a href="#widgets_definitions">Definitions</a></li>
	</ul>
</div>

<a href='#widgets_introduction' aria-hidden='true' class='block-anchor'  id='widgets_introduction'><i aria-hidden='true' class='linkify icon'></i></a>

The Widgets API allows developers to programmatically associate content with regions on a BigCommerce storefront. The content can consist of HTML, CSS, and JavaScript, and the API supports configuration via Handlebars variables. It can support many types of content such as YouTube Videos, image sliders, and chat apps.

Some benefits are:
* Inject modular, reusable blocks of content inside new and existing store pages
* Build tools that allow non-technical users to control content without editing theme files
* Target specific products, categories or brands with widgets

We are going to review all the components that make a widget. Then, we’ll use what we’ve learned to create a widget .

---

<a href='#widgets_regions' aria-hidden='true' class='block-anchor'  id='widgets_regions'><i aria-hidden='true' class='linkify icon'></i></a>

## Regions

[Regions](/api-reference/storefront/widgets-api/models/themeregion) are specific locations in the Stencil theme files where a widget is placed. A region is added at the file level using the format {{{region name="..."}}}. A region can be named however you like, but it is best practice to give it a name that is descriptive of the location and function. A theme file can have as many regions as you want, with more than one widget assigned to the region and the [Placement](/api-docs/storefront/widgets/widgets-overview#widgets_placements) `sort_order` controlling how the widgets appear on the Storefront.

<!--
    title: #### Storefront --Content Region

    data: //s3.amazonaws.com/user-content.stoplight.io/6012/1551970794664
-->


![#### Storefront --Content Region
](//s3.amazonaws.com/user-content.stoplight.io/6012/1551970794664 "#### Storefront --Content Region
")

<!--
    title: #### Template File -- Content Region

    data: //s3.amazonaws.com/user-content.stoplight.io/6012/1551970767918
-->


![#### Template File -- Content Region
](//s3.amazonaws.com/user-content.stoplight.io/6012/1551970767918 "#### Template File -- Content Region
")

Most themes in the BigCommerce marketplace come with predefined regions. It is best to utilize those first. By editing the theme and adding theme regions, updates will need to be manually managed. 

---

<a href='#widgets_widget-templates' aria-hidden='true' class='block-anchor'  id='widgets_widget-templates'><i aria-hidden='true' class='linkify icon'></i></a>

## Widget Templates

[Widget Templates](/api-reference/storefront/widgets-api/models/widgettemplate) are handlebars-enabled HTML templates which define the structure of the widget on a page. Widget Templates can use the built in handlebar helpers such as {{if}} and {{each}}. Using the helpers allows for conditional logic to be built into the Widget Templates. Widget templates can be reused to build multiple widgets.

### Widget Template Examples
**Simple List**

The Simple List template creates a list where each item in the list can have a different color. This example uses the [each block helper](https://handlebarsjs.com/builtin_helpers.html) in handlebars to loop through each item in the list and display it. The text and color are determined by handlebars placeholders that are set when creating the [Widget]((/api-reference/storefront/widgets-api/widget/createwidget).

<br>

<!--
title: "Simple List"
subtitle: "The list takes advantage of loops to display each list item on the page. "
lineNumbers: true
-->

The list takes advantage of loops to display each list item on the page. 

```json
{
  "name": "Simple List",
  "template": "<ul>{{#each list_items}}<li style=\"color:{{color}};\">{{text}}</li>{{/each}}</ul>"
}
```


<!--
title: "Image Slider"
subtitle: "The slider takes advantage of loops to display each slide on the page."
lineNumbers: true
-->

The slider takes advantage of loops to display each slide on the page.

```json
{
"name": "Simple Slider",
"template": "<ul class='slider'>{{#each slides}}<li class='slide'><img src={{image}}'/</li>{{/each}}</ul>"
}
```

---

<a href='#widgets_widgets' aria-hidden='true' class='block-anchor'  id='widgets_widgets'><i aria-hidden='true' class='linkify icon'></i></a>

## Widgets

[Widgets](/api-reference/storefront/widgets-api/models/widget) are a unit of content that are placed on specific pages in a Stencil theme. Widgets are made of a widget configuration written in json and a widget template UUID. Widgets are rendered as part of the HTML on the storefront.

<!--
    title: #### Storefront -- Widget

    data: //s3.amazonaws.com/user-content.stoplight.io/6012/1551971053085
-->

#### Storefront -- Widget
![#### Storefront -- Widget
](//s3.amazonaws.com/user-content.stoplight.io/6012/1551971053085 "#### Storefront -- Widget
")

### Widget Configuration

A Widget Configuration is the JSON payload that defines the content to be rendered with a given Widget Template. In the previous simple list example, the widget template loops over a list_items array using `{{#each}}`. 

In the example below, we define the list_items array and supply values for the color and text of each list item. Since the template is created separately from the configuration, the same template UUID can be used multiple times for configuration.

<!--
title: "Widget Configuration Slides"
subtitle: ""
lineNumbers: true
-->

**Widget Configuration Slides**

```json
{
  "slides": [
    {"image":"http://imageurl.com/nh35jn/test.png"},
    {"image":"http://imageurl.com/fdhdfh/test2.png"}
  ]
}
```

<!--
title: "Widget Configuration List Items"
subtitle: ""
lineNumbers: true
-->

**Widget Configuration List Items**

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

### Reusing Widget Configuration
> Keep in mind that when reusing the `widget_configuration` the array will have to be called `list_items`. Otherwise, the widget will be created on the frontend, but there will be no data, so nothing is rendered. This is because `list_items` was defined when the widget template was originally created. The widget configuration name can anything that is set when the widget_template is created.

</div>
</div>
</div>

<!--
title: "List Items Example: Incorrect"
subtitle: ""
lineNumbers: true
-->

**List Items Example: Incorrect**

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

<!--
title: "List Items Example: Correct"
subtitle: ""
lineNumbers: true
-->

**List Items Example: Correct**

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

---

<a href='#widgets_placements' aria-hidden='true' class='block-anchor'  id='widgets_placements'><i aria-hidden='true' class='linkify icon'></i></a>

## Placements

[Placements](/api-reference/storefront/widgets-api/placement/createplacement) determine the Region where the Widget is placed and in what order. The order of the placement is controlled by the `sort_order` when creating the placement. 
A placement must be created in order use a Widget on the storefront.


Placements can be used in two ways:
* On their own using the `sort_order` and region to determine placement in a theme.
* With a Layout, for more control arranginging widgets such as a table or column. Using Layouts is an optional step. The Widget can still be rendered without a Layout.

### Placements `entity_id`

When creating a placement, there is an option to provide an `entity_id`. 
This is the ID for a specific page, brand, category or page. For example, if a Widget needs to be on all product pages, leave `entity_id` blank. If the Widget should only appear on a certain product page, then assign `entity_id` the product ID. 

`entity_id` can be used with the following page types:
* pages/brand
* pages/category
* pages/page
* pages/product


### Create a Widget Placement with Region

Below, the region and sort order have a value, so the widget will appear on the home page. 

<!--
title: "Widget with Region"
subtitle: ""
lineNumbers: true
-->

**Widget with Region**

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

### Create a Widget Placement Without a Region
Leaving the region and sort order off the request will return just the `placement_id` in the response, allowing for the widget to be rendered using Layouts. 

<!--
title: "Widget Without a Region"
subtitle: ""
lineNumbers: true
-->

**Widget Without a Region**

```json
{
    "widget_uuid": "2dfeb50e-5f8c-4df2-8525-a338091eed32",
    "entity_id": "14",
    "template_file": "pages/home",
    "status": "active"
}
```

---

<a href='#widgets_layouts' aria-hidden='true' class='block-anchor'  id='widgets_layouts'><i aria-hidden='true' class='linkify icon'></i></a>

### Layouts
[Layouts](/api-reference/storefront/widgets-api/models/layout) allow a developer to control the position of widgets on the storefront. A Layout allows you to style around the Placement. Layout uses the markup field which accepts any valid HTML and CSS. A Layout can contain multiple Placements.

<!--
    title: #### Storefront -- Layouts

    data: //s3.amazonaws.com/user-content.stoplight.io/6012/1551971170727
-->

#### Storefront -- Layouts
![#### Storefront -- Layouts
](//s3.amazonaws.com/user-content.stoplight.io/6012/1551971170727 "#### Storefront -- Layouts
")

### Layouts `bc-placements`

`bc-placements` is a special field that takes in a placement id and allows the widget to be positioned anywhere in the layout. The `id` is the Placement ID.

<!--
title: "Layouts bc-placements Example"
subtitle: ""
lineNumbers: true
-->

**Layouts bc-placements Example**

```html
<div>
   <div style="width: 33.3%; float: left; display: inline-block; padding: 5px; box-sizing: border-box">
     <bc-placement id="73ee60d9-72e4-4dce-be93-c96b861cb5ff"></bc-placement>
   </div>
   <div style="width: 33.3%; float: left; display: inline-block; padding: 5px; box-sizing: border-box">
     <bc-placement id="3466ccb8-cb3e-4811-8266-acae20d1bb93"></bc-placement>
   </div>
     <div style="width: 33.3%; float: left; display: inline-block; padding: 5px; box-sizing: border-box">
     <bc-placement id="73ee60d9-72e4-4dce-be93-c96b861cb5ff"></bc-placement>
   </div>
</div>
```

---

<a href='#widgets_placement-and-layouts' aria-hidden='true' class='block-anchor'  id='widgets_placement-and-layouts'><i aria-hidden='true' class='linkify icon'></i></a>

## Placements and Layouts

In order to position widgets inside a page you need to use placements. Placements determine in which region the widgets is located and in what the order it will be displayed in case there are other widgets in the same region. 

Placements can be used in two ways:

**1. Placement + Widget:**  
When creating a placement with a widget, the widget content takes the full region width. Any additional widgets that are placed onto the same region will be stacked above or below based on the `sort_order` property for each placement.

If you are creating marketplace applications that create placements directly, you don’t need to use the `sort_order` property. 

**2. Placement + Layout:**  
If you want to arrange widgets inside a page using a multi-column style system, then you can create the placement with a Layout. You can also add additional styling around placements when using Layouts.  

Using Layouts is optional and most recommended when you have multiple placements that you want to arrange in a particular way. You can still arrange content in a multi-column style system using HTML and CSS only without having to use Layouts when creating a single placement. 

<a href='#widgets_storefront' aria-hidden='true' class='block-anchor'  id='widgets_storefront'><i aria-hidden='true' class='linkify icon'></i></a>

## Widgets on the Storefront

Widgets are rendered on the storefront as a data tag in the HTML.

* Region -- data-content-region
* Layout -- data-layout-id
* Widget -- data-widget-id
* Placement does not generate a data tag. Only the Widget.

A Region can contain multiple Layouts with Widgets and Placements or Widgets without a Layout. Within a single region, you might have widgets whose positioning is determined by a Layout, as well as widgets whose positioning is determined simply by a Placement. In the example below, the region is named “widget_page.” Nested within that region is a Layout, which contains a widget. The region also contains a Placement, or a widget that’s been placed on the page without a Layout.

<!--
    title: #### Storefront

    data: //s3.amazonaws.com/user-content.stoplight.io/6012/1551971208326
-->

#### Storefront
![#### Storefront
](//s3.amazonaws.com/user-content.stoplight.io/6012/1551971208326 "#### Storefront
")

<!--
    title: #### Widgets Console

    data: //s3.amazonaws.com/user-content.stoplight.io/6012/1551895293134
-->

#### Widgets Console
![#### Widgets Console
](//s3.amazonaws.com/user-content.stoplight.io/6012/1551895293134 "#### Widgets Console
")

---

<a href='#widgets_definitions' aria-hidden='true' class='block-anchor'  id='widgets_definitions'><i aria-hidden='true' class='linkify icon'></i></a>

## Definitions

| Name | Definition |
|--|--|
| Widgets | Widgets are the units of content to be placed on specific pages in a Stencil theme. Each widget is comprised of a widget configuration and a widget template. *There is a limit of 1000 widgets per store.* | 
| Widget Templates | Widget Templates are Handlebars-enabled HTML templates which define the widget’s structure on a page. These templates can include conditional logic as well as looping. *There is a limit of 100 total widget templates per store.* |
| Placements | Placements are the records to track which widget appears on which page, and in what order.  Currently, placements can only exist on the following pages: </br>* pages/blog-post </br> * pages/blog</br>* pages/brand</br>* pages/brands</br>* pages/cart</br>* pages/category</br>* pages/home</br>* pages/page</br>* pages/product</br>* pages/search</br> *There is a limit of 75 placements per template file and 6500 total placements per store.*|
| Regions | Regions are specific spots in a Stencil template file where Widgets can be placed. Regions are defined at the theme file level using the following syntax: `{{{region name="..."}}}`. There can be many widgets inside a given region, and these widgets can have an assigned sort order. |
| Widget Configuration | This is a JSON payload that contains data used when rendering the widget. Each widget has a configuration, and there is a 64kb limit on the size of the JSON. The widget configuration must be valid JSON, but we don’t enforce any additional requirement on the structure of the configuration. |
| Layout | A way to style multiple widgets on a page or position a Widget. A Layout will accept any HTML and CSS. *There is a limit of 1000 total layouts per store.* |

---

<a href='#widget_resources' aria-hidden='true' class='block-anchor'  id='widget_resources'><i aria-hidden='true' class='linkify icon'></i></a>

## Resources

### Related Endpoints
* [Widgets API](/api-reference/storefront/widgets-api)
* [Widgets Tutorial](/api-docs/storefront/widgets/widgets-tutorial)
* [Wigets Code Samples](/api-docs/storefront/widgets/widgets-code-samples)


