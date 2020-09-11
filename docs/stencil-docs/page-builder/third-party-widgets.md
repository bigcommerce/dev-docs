# Third-Party Widgets

<div class="otp" id="no-index">

### On this page
- [Creating third-party widgets](#creating-third-party-widgets)
- [Modifying BigCommerce widgets](#modifying-bigcommerce-widgets)
- [Exposing third-party widget templates](#exposing-third-party-widget-template)
- [Resources](#resources)

</div>

A third-party widget is a configurable, reusable component created and maintained by developers outside of BigCommerce. You can use third-party widgets to display custom content in a Stencil storefront. 

This article outlines the three main steps involved in using third-party widgets with [Page Builder](https://developer.bigcommerce.com/stencil-docs/page-builder/page-builder-overview).

## Creating third-party widgets
Widgets are injected into the storefront using the [Widgets API](https://developer.bigcommerce.com/api-reference/store-management/widgets). You can apply widgets in a merchant’s store using one of the following methods:
- OAuth token
- App Marketplace

### OAuth token
To use this method, you will need to obtain API credentails with OAuth content scope set to `modify`. For information about making requests against BigCommerce’s REST APIs, see [Authenticating BigCommerce’s REST APIs](https://developer.bigcommerce.com/api-docs/getting-started/authentication/rest-api-authentication).  After obtaining a token, you can inject, list, and remove widgets on any page of the store. To learn how to complete these actions, see [Widgets tutorial](https://developer.bigcommerce.com/api-docs/storefront/widgets/widgets-tutorial).

### App Marketplace

The [Apps Marketplace](https://www.bigcommerce.com/apps/) is the area inside a control panel where merchants can browse for apps available for installation on their BigCommerce store. 

To use this method, you will need to create a marketplace application that injects new widgets into the storefront using the Widgets API.

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">
    
<!-- theme: info -->

### 
Note
> If your marketplace application gets uninstalled, the content created using the application's widgets will remain in the store.

</div>
</div>
</div>

Widgets installed from an application can be instances or templates.

**Widget instance**

Widgets are units of content placed on specific pages in a Stencil theme.

A widget instance includes the widget’s content, look, behavior, accessibility, and limitations (for example, where content is displayed as decided by the app developer).

Depending on its configuration, the widget might allow modifications.

**Widget template**

Widget templates are Handlebars-enabled HTML templates that define a widget’s structure on a page. These templates can include conditional logic as well as looping. There is a limit of 1,000 total custom widget templates per store. This does not include templates pre-provided by BigCommerce. 

In a widget template, the structure of the widget is exposed, but the merchant ultimately determines where to use the widget and what content to display. Widget templates can be exposed in Page Builder, but app developers can also provide their own interfaces for merchants to manage and interact with their widgets outside of Page Builder.

> **Note**
>
> Widget instances and widget templates are both region-agnostic, meaning they can be used across any region available in a theme.

## Modifying BigCommerce widgets
You can extend a BigCommerce-provided widget by modifying the existing API parameters in the widget template.

The request parameters for a widget template are as follows:

|Parameter|Description|
|---|---|
|`name`|The name of the widget.|
|`template`|The skeleton UI of the widget rendered as Handlebars HTML.|
|`schema`|The JSON schema of data for the widget template. The schema represents the customizable options available in the sidebar of Page Builder.|

### Configuring settings for a widget
You can modify a BigCommerce-provided widget by re-configuring the existing settings in the widget template’s `schema` property when creating a widget template via API. The settings you define in this property will be exposed on the side panel of the Page Builder tool, providing the merchant the ability to modify how the widget appears on their storefront.

If you would like to change the options that exist for a widget in Page Builder, you can modify the schema to represent the customization options you would like to make available. Once the schema for the widget is modified, you will place the modified JSON object in the request body as the schema value and made a POST request for a widget template in order to expose the widget’s new customization options on Page Builder.

## Exposing third-party widget templates in page builder
To expose a third-party widget template in Page Builder, send a `POST` request to `/stores/{{STORE_HASH}}/v3/content/widget-templates`. Include the widget's `name`, `template`, and `schema` in the body of your request. The `schema` value should be the modified JSON object with customizable settings you want to incorporate for the widget.

If you successfully create the widget template, you should see the widget with its new customizable options reflected in Page Builder, under the **Custome** section. You do not need to make a POST request for the widget or widget placement in order to reflect the new widget in Page Builder.

>
> You do not need to make a POST request for the widget or widget placement in order to reflect the new widget in Page Builder.
