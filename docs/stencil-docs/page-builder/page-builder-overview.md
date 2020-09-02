# Page Builder Overview

<div class="otp" id="no-index">

### On this page
- [Theme Styles](#theme-styles)
- [Widgets](#widgets)
- [Layers](#layers)
- [Resources](#resources)

</div>

Page Builder is a browser-based tool that offers merchants visual editing and content management capabilities to design their stores. The Page Builder interface consists of [Theme Styles](https://support.bigcommerce.com/s/article/Page-Builder#styles), [Widgets](https://support.bigcommerce.com/s/article/Page-Builder#builder), and [Layers](https://support.bigcommerce.com/s/article/Page-Builder#layers).

## Theme Styles

To customize the different style elements of a theme, such as colors, font, and text size, merchants can use the **Theme Styles** feature of Page Builder. 

As a theme developer, you can configure your theme's settings, which will determine how merchants can personalize your theme. For example, you can modify how merchants can customize colors, fonts, and the number of products to display per feature. For information on how to configure your theme's files, see [Configuration](/docs/stencil-docs/page-builder/configuration.md). 

## Widgets

Page Builder's **Widgets** tool lets store owners create and manage page content for their stores. Merchants can use widgets in the control panel to drag and drop content such as text, images, videos, banners, carousels, and product lists. 

Developers can build user interfaces for their custom [widgets](https://developer.bigcommerce.com/api-docs/storefront/widgets/widgets-overview) within the Page Builder platform using a pre-configured schema. While BigCommerce provides the setting, logic, and design, the widget author provides information about the various configurations that make up the widget. BigCommerce uses the same mechanism for all platform-provided widgets.

New widgets are injected into the storefront using BigCommerce's [Widgets API](https://developer.bigcommerce.com/api-docs/store-management/widgets/overview). You can add custom configuration settings to your widget's Page Builder UI by including the `schema` property in the [**Create a Widget Template**](https://developer.bigcommerce.com/api-reference/store-management/widgets/widget-template/createwidgettemplate) request. For settings that can be passed as JSON objects into the `schema` property of the **Create a Widget Template** endpoint, see [Widgets UI Schema](/docs/stencil-docs/page-builder/widgets-ui-schema.md). For a step-by-step tutorial on creating widget templates, see [Widgets Tutorial](https://developer.bigcommerce.com/api-docs/store-management/widgets/tutorial). 

## Layers

The **Layers** tool helps merchants organize existing widgets on the current page. 

## Resources
- [Cornerstone Theme Manual](https://support.bigcommerce.com/s/article/Cornerstone-Theme-Manual) (BigCommerce Knowledge Base)
- [Page Builder](https://support.bigcommerce.com/s/article/Page-Builder) (BigCommerce Knowledge Base)
- [Widgets API](https://developer.bigcommerce.com/api-docs/store-management/widgets/overview)
