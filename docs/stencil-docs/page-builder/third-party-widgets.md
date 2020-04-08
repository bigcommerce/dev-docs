# Third-Party Widgets

<div class="otp" id="no-index">

- [Creating Third-Party Widgets Using Widgets API](#creating-third-party-widgets-using-widgets-api)
  - [OAuth Token](#oauth-token)
  - [Marketplace App](#marketplace-app)
- [Modifying BigCommerce Widgets](#modifying-bigcommerce-widgets)
  - [Configure Settings for a Widget](#configure-settings-for-a-widget)
- [Exposing Third-Party Widget Templates in Page Builder](#exposing-third-party-widget-templates-in-page-builder)

</div>

A third-party widget is a configurable, reusable component that displays custom content in a Stencil storefront, created and maintained by developers outside of BigCommerce.

This article outlines the three main steps involved in using third-party widgets with [Page Builder](https://developer.bigcommerce.com/stencil-docs/page-builder/page-builder-overview).

## Creating Third-Party Widgets Using Widgets API
Using the [Widgets API](https://developer.bigcommerce.com/api-reference/store-management/widgets), developers can apply widgets in a merchant’s store using either:
- an OAuth Token
- a Marketplace App

### OAuth Token
This method requires the store owner to grant access to the developer via an OAuth token. After obtaining a token, the developer can inject, list, or remove widgets on any page of the store. To learn how to complete these actions, see our [Widgets tutorial](https://developer.bigcommerce.com/api-docs/storefront/widgets/widgets-tutorial) article.

### Marketplace App
To create a widget via a marketplace app, you will need to create a marketplace application that injects new widgets into the storefront using the Widgets API.

Content created via widgets using a marketplace app will remain in the store even after the app is uninstalled. Widgets installed from an application can be instances or templates.

**Widget Instance**

A widget instance includes the widget’s
- content
- look
- feel
- behavior
- accessibility
- limitations (e.g. where content is displayed as decided by the app developer)

Depending on its configuration, the widget might allow modifications.

**Widget Template**

Widget templates are Handlebars-enabled HTML templates that define a widget’s structure on a page. In a widget template, the structure of the widget is exposed, but the merchant ultimately determines where to use the widget and what content to display. Widget templates can be exposed in Page Builder, but app developers can also provide their own interfaces for merchants to manage and interact with their widgets outside of Page Builder.

These templates can include both conditional and looping logic. There is a limit of 100 total widget templates per store.

> **Note**
>
> Widget instances and widget templates are both region-agnostic, meaning they can be used across any region available in a theme.

## Modifying BigCommerce Widgets
You can extend a BigCommerce-provided widget by modifying the existing API parameters in the widget template.

The request parameters for a widget template are as follows:

|Parameter|Description|
|---|---|
|`name`|Name of the widget|
|`template`|Handlebars HTML content. Also has access to Stencil Paper helpers. The template content implements the skeleton user interface for the widget.|
|`schema`|The JSON schema of data for this template. The schema represents the customizable options available in the sidebar of Page Builder.|

### Configure Settings for a Widget
You can modify a BigCommerce-provided widget by re-configuring the existing settings in the widget template’s `schema` property when creating a widget template via API. The settings you define in this property will be exposed on the side panel of the Page Builder tool, providing the merchant the ability to modify how the widget appears on their storefront.

If you would like to change the options that exist for a widget in Page Builder, you can modify the schema to represent the customization options you would like to make available. Once the schema for the widget is modified, you will place the modified JSON object in the request body as the schema value and made a POST request for a widget template in order to expose the widget’s new customization options on Page Builder.

## Exposing Third-Party Widget Templates in Page Builder
To expose a third-party widget template in Page Builder, you will need to make a POST request for the Widget Template. In the body of the request, the name should reflect the name of the widget as a string, the template should reflect the skeleton user interface of the widget as HTML, and the schema value should be the modified JSON object with customizable settings you want to incorporate for the widget.

If you successfully create the widget template, you should see the widget with its new customizable options reflected in Page Builder, under a custom section. You do not need to make a POST request for the widget or widget placement in order to reflect the new widget in Page Builder.
