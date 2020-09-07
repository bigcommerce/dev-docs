# Third-Party Widgets

<div class="otp" id="no-index">

### On this page
- [Creating third-party widgets](#creating-third-party-widgets)
- [Modifying BigCommerce widgets](#modifying-bigcommerce-widgets)
- [Exposing third-party widget templates](#exposing-third-party-widget-templates)

</div>

A third-party widget is a configurable, reusable component that displays custom content in a Stencil storefront, created and maintained by developers outside of BigCommerce.

This article outlines the three main steps involved in using third-party widgets with [Page Builder](https://developer.bigcommerce.com/stencil-docs/page-builder/page-builder-overview).

## Creating third-party widgets
You can add widgets to a merchant’s store using the [Widgets API](https://developer.bigcommerce.com/api-reference/store-management/widgets) through either an OAuth token or a marketplace app. 

### OAuth token
This method requires the store owner to grant access to the developer through an OAuth token. After obtaining a token, you can inject, list, or remove widgets on any page of the store. To learn how to complete these actions, see [Widgets Tutorial](https://developer.bigcommerce.com/api-docs/storefront/widgets/widgets-tutorial).

### Marketplace app
To create a widget via a marketplace app, you will need to create a marketplace application that injects new widgets into the storefront using the Widgets API.

Content created via widgets using a marketplace app will remain in the store even after the app is uninstalled. Widgets installed from an application can be instances or templates.

**Widget instance**

A widget instance includes the following attributes of  widget:
- content
- look
- feel
- behavior
- accessibility
- limitations (e.g. where content is displayed as decided by the app developer)

Depending on its configuration, the widget might allow modifications.

**Widget template**

Widget templates are Handlebars-enabled HTML templates that define a widget's structure on a page. In a widget template, the structure of the widget is exposed, but the merchant ultimately determines where to use the widget and what content to display. Widget templates can be exposed in Page Builder, but app developers can also provide their own interfaces for merchants to manage and interact with their widgets outside of Page Builder.

These templates can include both conditional and looping logic. There is a limit of 1000 total widget templates per store.

> **Note**
>
> Widget instances and widget templates are both region-agnostic, meaning they can be used across any region available in a theme.

## Modifying BigCommerce widgets
You can extend a BigCommerce-provided widget by modifying the existing API parameters in the widget template.

The request parameters for a widget template are as follows:

|Parameter|Description|
|---|---|
|`name`|Name of the widget|
|`template`|Handlebars HTML content. Also has access to Stencil Paper helpers. The template content implements the skeleton user interface for the widget.|
|`schema`|The JSON schema of data for this template. The schema represents the customizable options available in the sidebar of Page Builder.|

### Configure settings for a widget
You can modify a BigCommerce-provided widget by re-configuring the existing settings in the `schema` property of the widget's template. The settings you define in this property will be exposed on the side panel of the Page Builder tool, providing the merchant the ability to modify how the widget appears on their storefront.

To change the options that exist for a widget in Page Builder, you can modify the `schema` to represent the customization options you would like to make available. Once the `schema` for the widget is modified, you will place the modified JSON object in the request body as the `schema` value and make a `POST` request for a widget template to expose the widget's new customization options on Page Builder.

## Exposing third-party widget templates
To expose a third-party widget template in Page Builder, you need to make a `POST` request for the Widget Template. In the body of the request, the `name` should reflect the name of the widget as a string, the `template` should reflect the skeleton user interface of the widget as HTML, and the `schema` value should be the modified JSON object with customizable settings you want to incorporate for the widget.

If you successfully create the widget template, you should see the widget with its new customizable options reflected in Page Builder, under a custom section. You do not need to make a `POST` request for the widget or widget placement in order to reflect the new widget in Page Builder.
