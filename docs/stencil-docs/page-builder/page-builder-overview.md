# Page Builder Overview

<div class="otp" id="no-index">

### On this page
- [Theme Styles](#theme-styles)
- [Widgets](#widgets)
- [Layers](#layers)
- [Related resources](#related-resources)

</div>

Page Builder is a browser-based tool that offers merchants visual editing and content management capabilities to design their stores. The Page Builder interface consists of [Theme Styles](https://support.bigcommerce.com/s/article/Page-Builder#styles), [Widgets](https://support.bigcommerce.com/s/article/Page-Builder#builder), and [Layers](https://support.bigcommerce.com/s/article/Page-Builder#layers).

## Theme Styles

To customize the different style elements of a theme, such as colors, font, and text size, merchants can use the **Theme Styles** feature of Page Builder. 

As a theme developer, you can configure your theme's settings, which will determine how merchants can personalize your theme. For example, you can modify how merchants can customize colors, fonts, and the number of products to display per feature. For information on how to configure your theme's files, see [Theme Styles Configuration](https://developer.bigcommerce.com/stencil-docs/page-builder/theme-styles-configuration). 

## Widgets

Page Builder's **Widgets** tool lets store owners create and manage page content for their stores. Merchants can use widgets in the control panel to drag and drop content such as text, images, videos, banners, carousels, and product lists. 

Developers can build user interfaces for their custom [widgets](https://developer.bigcommerce.com/api-docs/store-management/widgets/overview#widgets) within the Page Builder platform using a pre-configured schema. While BigCommerce provides the setting, logic, and design, the widget author provides information about the various configurations that make up the widget. BigCommerce uses the same mechanism for all platform-provided widgets.

New widgets are injected into the storefront using BigCommerce's [Widgets API](https://developer.bigcommerce.com/api-docs/store-management/widgets/overview). You can add custom configuration settings to your widget's Page Builder UI by including the `schema` property in the [Create a Widget Template](https://developer.bigcommerce.com/api-reference/store-management/widgets/widget-template/createwidgettemplate) request. 

For settings that can be passed as JSON objects into the `schema` property of the [Create a Widget Template](https://developer.bigcommerce.com/api-reference/store-management/widgets/widget-template/createwidgettemplate) endpoint, see [Widgets UI Schema](https://developer.bigcommerce.com/stencil-docs/page-builder/widget-ui-schema). 

To learn more about using third-party widgets with Page Builder, see [Third-Party Widgets](https://developer.bigcommerce.com/stencil-docs/page-builder/third-party-widgets).

For step-by-step tutorials on creating and managing widgets, see [Widgets API Tutorials](https://developer.bigcommerce.com/api-docs/store-management/widgets/tutorials).

## Layers

The **Layers** tool helps merchants organize existing widgets on the current page. 

## Related resources
- [Cornerstone Theme Manual](https://support.bigcommerce.com/s/article/Cornerstone-Theme-Manual)
- [Page Builder](https://support.bigcommerce.com/s/article/Page-Builder)
- [Widgets API](https://developer.bigcommerce.com/api-docs/store-management/widgets/overview)