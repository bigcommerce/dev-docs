# Third-Party Widgets

<div class="otp" id="no-index">

### On this page

- [Creating third-party widgets](#creating-third-party-widgets)
- [Modifying BigCommerce widgets](#modifying-bigcommerce-widgets)
- [Exposing third-party widget templates](#exposing-third-party-widget-templates)
- [Resources](#resources)

</div>

A third-party widget is a configurable, reusable component created and maintained by developers outside of BigCommerce. You can use third-party widgets to display custom content in a Stencil storefront. 

This article outlines the three main steps involved in using third-party widgets with [Page Builder](https://developer.bigcommerce.com/stencil-docs/page-builder/page-builder-overview).

## Creating third-party widgets

Widgets are injected into the storefront using the [Widgets API](https://developer.bigcommerce.com/api-reference/store-management/widgets). You can apply [widgets](https://developer.bigcommerce.com/api-docs/store-management/widgets/overview#widgets) and [widget templates](https://developer.bigcommerce.com/api-docs/store-management/widgets/overview#widget-templates) in a merchant’s store using one of the following methods:

- OAuth token
- App Marketplace

### OAuth token

To use this method, you will need to obtain API credentials with OAuth content scope set to `modify`. For information about making requests against BigCommerce’s REST APIs, see [Authenticating BigCommerce’s REST APIs](https://developer.bigcommerce.com/api-docs/getting-started/authentication/rest-api-authentication).  After obtaining the token, you can inject, list, and remove widgets on any page of the store. To learn how to complete these actions, see [Widgets Tutorial](https://developer.bigcommerce.com/api-docs/storefront/widgets/widgets-tutorial).

### App Marketplace

The [Apps Marketplace](https://www.bigcommerce.com/apps/) is an area inside the control panel where merchants can browse for apps available for installation on their BigCommerce store.

To create a widget using the App Marketplace, you will need to create a marketplace application that injects new widgets into the storefront using the Widgets API.

>Note
>
>Content created by an application's widget will remain in the store even if the application gets uninstalled.

## Modifying BigCommerce widgets

You can extend a BigCommerce-provided widget by modifying the existing API parameters in the widget template. The API parameters for a widget template are as follows:

|Parameter|Description|
|---|---|
|`name`|The name of the widget.|
|`template`|The skeleton UI of the widget rendered as Handlebars HTML.|
|`schema`|The JSON schema of data for the widget template. The schema represents the customizable options available in the sidebar of Page Builder.|

### Configuring settings for a widget

To modify a BigCommerce-provided widget, re-configure the existing settings in the widget template’s `schema` property when creating a widget template via the API. The settings you define in this property will be exposed in Page Builder UI, providing merchants the ability to modify how the widget appears on their storefront.

You can change widget's customization options by modifying the template's `schema`. Once you have modified the `schema`, place the modified JSON object in the request body as the `schema` value and make a `POST` request for the [Widget Template](https://developer.bigcommerce.com/api-reference/storefront/widgets-api/widget-template/createwidgettemplate) to expose the new customization options on Page Builder.

## Exposing third-party widget templates

To expose a third-party widget template in Page Builder, make a `POST` request for the [Widget Template](https://developer.bigcommerce.com/api-reference/storefront/widgets-api/widget-template/createwidgettemplate). Include the widget's `name`, `template`, and `schema` in the body of your request. The `schema` value should be the modified JSON object with customizable settings you want to incorporate for the widget.

If you successfully create the widget template, you should see the widget with its new customizable options reflected in Page Builder, under the **Custom** section.

>Note
>
> You do not need to make a `POST` request for the [Widget](https://developer.bigcommerce.com/api-reference/storefront/widgets-api/widget/createwidget) or [Widget Placement](https://developer.bigcommerce.com/api-reference/storefront/widgets-api/placement/createplacement) to reflect the new widget in Page Builder.

## Resources

- [Widgets API](https://developer.bigcommerce.com/api-docs/store-management/widgets/overview)
- [Widgets Tutorial](https://developer.bigcommerce.com/api-docs/store-management/widgets/tutorial)