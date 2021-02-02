# Widgets API


<div class="otp" id="no-index">

### On this page

- [Regions](#regions)
- [Widget templates](#widget-templates)
- [Widgets](#widgets)
- [Widget versioning](#widget-versioning)
- [Placements](#placements)
- [Widgets on the storefront](#widgets-on-the-storefront)
- [Definitions](#definitions)
- [Related resources](#related-resources)

</div>

The Widgets API allows developers to create units of content and programmatically place them on specific pages of a BigCommerce storefront. The content can consist of HTML, CSS, and JavaScript, and is configurable using [Handlebars](https://handlebarsjs.com/) variables. The Widgets API supports various content types, such as YouTube videos, image sliders, and chat apps. 

When to use:
* Inject modular, reusable blocks of content inside new and existing store pages.
* Build tools that allow non-technical users to control content without editing theme files.
* Target specific products, categories, or brands with widgets.

In this article, we will review the components that make up a widget. 

## Regions

[Regions](https://developer.bigcommerce.com/api-reference/storefront/widgets-api/regions/getcontentregions) are specific locations in the Stencil theme template files where you can place a widget. You can add a region at the file level using the format `{{{region name="..."}}}` and name the region however you like, but it is best practice to give it a name that is descriptive of the location and function. A theme file can have as many regions as you want, with more than one widget assigned to the region and the [placements](https://developer.bigcommerce.com/api-docs/store-management/widgets/overview#placements) `sort_order` controlling how the widgets appear on the storefront.

![Content Region](//s3.amazonaws.com/user-content.stoplight.io/6012/1551970794664 "Content Region")

![Content Region](//s3.amazonaws.com/user-content.stoplight.io/6012/1551970767918 "Content Region")

Most themes in the BigCommerce marketplace come with predefined regions. It is best to use those first. If you edit a theme and add new theme regions, you will need to manage updates manually.

### Global regions

Global regions are special regions you can use to place and manage content sitewide. Widgets placed in a global region will appear on the storefront pages where that region exists. This makes global regions useful for displaying high-priority information, such as special promotion advertising banners, across multiple storefront pages.

 ![Global Region](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/widgets-overview-03.png "Global Region")

To create a global region, add the `--global` suffix to the region name as shown in the following example:

```handlebars
{{{region name="header_bottom--global"}}}
```

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> ### Note
>
>`header_bottom--global` region is currently the only global region available by default.

</div>
</div>
</div>

To remove the default `header_bottom--global` region from your theme, delete or comment out the `{{{region name="header_bottom--global"}}}` line of code from your theme's `templates/components/common/header.html` file. 

[See it in Cornerstone](https://github.com/bigcommerce/cornerstone/search?q=%7B%7B%7Bregion+name%3D%22header_bottom--global%22%7D%7D%7D).

## Widget templates

[Widget templates](/api-reference/storefront/widgets-api/widget-template/getwidgettemplates) are reusable Handlebars-enabled HTML templates which define the structure of the widget on a page. You can use built-in Handlebars helpers such as `{{if}}` and `{{each}}` to add conditional logic to a widget template. 

You can reuse widget templates to build multiple widgets.

### Widget template examples

The following template examples use the built-in Handlebars [`#each`](https://handlebarsjs.com/guide/builtin-helpers.html#each) helper to loop through and display each item on the page.

**List**

The list template creates a list where each item in the list can have a different color. The text and color are determined by Handlebars placeholders that are set when creating the [widget](/api-reference/storefront/widgets-api/widget/createwidget).

```json
{
  "name": "List",
  "template": "<ul>{{#each list_items}}<li style='color:{{color}};'>{{text}}</li>{{/each}}</ul>"
}
```

**Slider**

The slider template creates an image slider where each item in the slider can have a different image. The images are determined by Handlebars placeholders that are set when creating the [widget](/api-reference/storefront/widgets-api/widget/createwidget).

```json
{
"name": "Slider",
"template": "<ul class='slider'>{{#each slides}}<li class='slide'><img src={{image}}'/</li>{{/each}}</ul>"
}
```

## Widgets

[Widgets](/api-reference/storefront/widgets-api/widget/getwidgets) are units of content placed on specific pages in a Stencil theme. Widgets consist of a widget configuration and a widget template UUID and render as part of the storefront's HTML.

![Widget](//s3.amazonaws.com/user-content.stoplight.io/6012/1551971053085 "Storefront Widget")

### Widget configuration

A widget configuration is the JSON payload that defines the content you can render with a given widget template. In the previous list example, the widget template loops over an array of list items using `{{#each}}`.

In the following example, we define the `list_items` array and supply values for the color and text of each list item. Since you create the template separately from the configuration, you can use the same template UUID multiple times.

**Widget configuration list items**

```json
{
	"list_items": [{
			"color": "orange",
			"text": "Item One"
		},
		{
			"color": "blue",
			"text": "Item Two"
		}
	]
}
```

**Widget configuration slides**

```json
{
  "slides": [
    {"image":"http://imageurl.com/nh35jn/test.png"},
    {"image":"http://imageurl.com/fdhdfh/test2.png"}
  ]
}
```

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

<!-- theme:  -->

### Reusing widget configuration
> You set the widget configuration name when creating the widget template.
> When reusing the widget configuration, the objects array must use the name established during the initial configuration. Otherwise, you will create the widget on the frontend, but there will be no data, and nothing displayed.

</div>
</div>
</div>

When reusing the widget configuration from our list example, you must call the items array `list_items`, because you defined the `list_items` array when creating the widget template.

**List items example: Incorrect**

```json
{
  "name": "List",
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

The example above uses `list_items_two` in the configuration, which is not the same as `list_items`. If you have already established `list_items` during the initial configuration, it must be set as `list_items` when you use it again.

**List items example: Correct**

```json
{
  "name": "List",
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

## Widget versioning

Widget versioning allows developers to release updates to widget templates without impacting existing widgets created using those templates. 

A single widget template can have multiple versions, each with its own `template` and `schema` properties. The widget template’s `current_version_uuid` property points to the most recent version of the widget template. When you create a widget, it automatically uses the most current version of the widget template and saves it as the `version_uuid` property. 

### Old relationship model
Prior to widget versioning, a widget would point to a widget template only via the `widget_template_uuid` property. The widget would always use the latest version of the widget template, and updating the widget template would subsequently update all of its widgets.

 ![Old Relationship Model](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/widgets-overview-01.png "Old Relationship Model")

### New relationship model
Widget versioning introduced `current_version_uuid` and `version_uuid` properties. Now, in addition to `widget_template_uuid`, the widget can specify the template version via `version_uuid`. 

 ![New Relationship Model](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/widgets-overview-02.png "New Relationship Model")

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

<!-- theme:  -->

### Note
>  Although a widget template can have multiple versions; there can only be one active version at a time. This setup means that a template can have multiple `version_uuid`’s associated with it, but it cannot have more than one `current_version_uuid`.

</div>
</div>
</div>

**Widget template definitions**

| Property | Definition |
|--|--|
| `uuid` | The identifier of the original widget template.|
| `current_version_uuid` | The identifier of the most recent version of the widget template.|

**Widget definitions**

| Property | Definition |
|--|--|
| `widget_template_uuid` | The identifier of the widget template. (The value is static.)|
| `current_version_uuid` | The identifier of the most recent version of the widget template.|
| `version_uuid` | The version of the widget template used to create or update the widget.|

### Update a widget template 

To update a widget template without impacting existing widgets, set the `create_new_version` property to `true` when sending a `PUT` request to [`/v3/content/widget-templates/{uuid}`](https://developer.bigcommerce.com/api-reference/store-management/widgets/widget-template/updatewidgettemplate). This will create a new widget template version, but it will not impact the widgets created before the update. 

Updating the widget template with `create_new_version` set to `true` will change the value of the `current_version_uuid` in the widget and the widget template, but it will not change the value of the widget’s `version_uuid`.

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

<!-- theme:  -->

### Note
>  It is possible to update your widget template without creating a new version. To do so, exclude the `create_new_version` field or set it to `false` when making a `PUT` request to [update the widget template](https://developer.bigcommerce.com/api-reference/store-management/widgets/widget-template/updatewidgettemplate). 

</div>
</div>
</div>

## Placements

[Placements](/api-reference/storefront/widgets-api/placement/createplacement) determine the region where you place widgets and in what order. 

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

<!-- theme:  -->

### Note
> - To display a widget on the storefront, you must create a placement.
> - A region can contain multiple placements with widgets.

</div>
</div>
</div>

### Placements sort_order

When creating a placement with a widget, the widget content takes the full region width. The placement's `sort_order` property controls the display order of the widget. You would stack any additional widgets in the same region above or below based on each placement's `sort_order` property.

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

<!-- theme:  -->

### Note
> If you are creating marketplace applications that create placements directly, you do not need to use the `sort_order` property.

</div>
</div>
</div>

### Placements entity_id

When creating a placement, there is an option to provide an `entity_id`. The `entity_id` is the identifier for a specific product, brand, category, or page. For example, if a widget needs to be on all product pages, leave `entity_id` blank. If the widget should only appear on a certain product page, assign the product ID to `entity_id`.

You can use `entity_id` with the following page types:
* pages/brand
* pages/category
* pages/page
* pages/product

### Create a widget placement with region

In the following example, both the region and sort order have a value so that the widget will appear on a specific category page.

**Widget with region**

```json
{
  "widget_uuid": "2dfeb50e-5f8c-4df2-8525-a338091eed32",
  "entity_id": "21",
  "sort_order": 1,
  "region": "header_bottom",
  "template_file": "pages/category",
  "status": "active"
}
```

### Create a widget placement without a region

Leaving the region and sort order off the request will return just the `placement_id` in the response, allowing for the widget's rendering using layouts.

**Widget without a region**

```json
{
    "widget_uuid": "2dfeb50e-5f8c-4df2-8525-a338091eed32",
    "entity_id": "21",
    "template_file": "pages/category",
    "status": "active"
}
```

## Widgets on the storefront

Widgets are rendered on the storefront as a data tag in the HTML.

* Region -- `data-content-region`
* Widget -- `data-widget-id`
* Placement does not generate a data tag. 

## Definitions

| Name | Definition |
|--|--|
| Widgets | Widgets are the units of content to be placed on specific pages in a Stencil theme. Each widget is composed of a widget configuration and a widget template. *There is a limit of `10,000` widgets per store.* |
| Widget templates | Widget templates are Handlebars-enabled HTML templates that define the widget’s structure on a page. These templates can include conditional logic as well as looping. *There is a limit of `1,000` total custom widget templates per store. This does not include templates pre-provided by BigCommerce.* |
| Placements | Placements determine the region where you place widgets and in what order. Currently, placements can only exist on the following pages:</br>* pages/account/add-address </br>* pages/account/add-return </br>* pages/account/add-wishlist </br>* pages/account/addresses </br>* pages/account/download-item </br>* pages/account/edit </br>* pages/account/inbox </br>* pages/account/orders/all </br>* pages/account/orders/completed </br>* pages/account/orders/details </br>* pages/account/orders/invoice </br>* pages/account/recent-items </br>* pages/account/return-saved </br>* pages/account/returns </br>* pages/account/wishlist-details </br>* pages/account/wishlists </br>* pages/auth/account-created </br>* pages/auth/create-account </br>* pages/auth/forgot-password </br>* pages/auth/login </br>* pages/auth/new-password </br>* pages/blog </br>* pages/blog-post </br>* pages/brand </br>* pages/brands </br>* pages/cart </br>* pages/category </br>* pages/compare </br>* pages/contact-us </br>* pages/errors/403 </br>* pages/errors/404 </br>* pages/errors/generic </br>* pages/gift-certificate/balance </br>* pages/gift-certificate/purchase </br>* pages/gift-certificate/redeem </br>* pages/home </br>* pages/order-confirmation </br>* pages/page </br>* pages/product </br>* pages/search </br>* pages/sitemap </br>* pages/subscribed </br>* pages/unavailable/hibernation </br>* pages/unavailable/maintenance </br>* pages/unsubscribe </br> *There is a limit of 75 placements per template file and `10,000` total placements per store.*|
| Regions | Regions are specific spots in a Stencil template file where you can place widgets. Regions are defined at the theme file level using the following syntax: `{{{region name="..."}}}`. Many widgets can reside within a given region, and these widgets can have an assigned sort order. |
| Widget configuration | This is a JSON payload that contains data used when rendering the widget. Each widget has a configuration, and there is a 64kb limit on the JSON size. The widget configuration must be valid JSON, but we don’t enforce any additional configuration structure requirements. |

## Related resources

### Articles
* [Widgets Tutorial](/api-docs/store-management/widgets/tutorials/tutorial)
* [Widgets Code Samples](/api-docs/store-management/widgets/samples)

### Endpoints
* [Widgets API](/api-reference/store-management/widgets)
