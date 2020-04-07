# Third-Party Widgets

A third-party widget is a configurable, reusable component that displays custom content in a Stencil storefront, created and maintained by developers outside of BigCommerce.

There are three main steps involved in using Third-Party Widgets with Page Builder. These are outlined in the following sections:

- Creating Third-Party Widgets Using Widgets API
- Modifying BigCommerce Widgets
- Exposing Third-Party Widget Templates in Page Builder

## Creating Third-Party Widgets Using Widgets API
Using the [Widgets API](#), developers can apply widgets in a merchant’s store using either:
- an OAuth Token
- a Marketplace App

### OAuth Token
This method requires the store owner to grant access to the developer via an OAuth token. After obtaining a token, the developer can inject, list, or remove widgets on any page of the store. To learn how to complete these actions, see our [Widgets tutorial](#) article.

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
You can extend a BigCommerce-provided widget by modifying the existing API parameters in the Widget Template.

The request parameters for a widget Template are as follows:

|Parameter|Description|
|---|---|
|`name`|Name of the widget|
|`template`|Handlebars HTML content. Also has access to Stencil Paper helpers. The template content implements the skeleton UI for the widget.|
|`schema`|The JSON schema of data for this template. The schema represents the customizable options available in the sidebar of Store Design.|

### Configure Settings for a Widget
You can modify a BigCommerce-provided widget by re-configuring the existing settings in the widget template’s `schema` property when creating a Widget Template via API. The settings you define in this property will be exposed on the side panel of the Store Design tool, providing the merchant the ability to modify how the widget appears on their storefront.

If you would like to change the options that exist for a widget in Store Design, you can modify the schema to represent the customization options you would like to make available. Once the schema for the Widget is modified, you will place the modified JSON object in the request body as the schema value and made a POST request for a Widget Template in order to expose the Widget’s new customization options on Store Design.

## Exposing Third-Party Widget Templates in Page Builder
To expose the third-party Widget Template in Store Design, you will need to make a POST request for the Widget Template. In the body of the request, the name should reflect the name of the Widget as a string, the template should reflect the skeleton UI of the Widget as HTML, and the schema value should be the modified JSON object with customizable settings you want to incorporate for the widget.

If you successfully create the Widget Template, you should see the Widget with its new customizable options reflected in Page Builder, under a Custom section. You do not need to make a POST request for the Widget or Widget Placement in order to reflect the new Widget in Page Builder.
