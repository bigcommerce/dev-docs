# Transitioning to Stencil

<div class="otp" id="no-index">

### On This Page
- [Transitioning to Stencil](#Transitioning-to-Stencil)
    - [On This Page](#On-This-Page)
  - [What is Stencil?](#What-is-Stencil?)
  - [Why Transition to Stencil?](#Why-Transition-to-Stencil?)
  - [Technical Differences](#Technical-Differences)
    - [Developing Locally on Stencil CLI](#Developing-Locally-on-Stencil-CLI)
    - [Using Handlebars](#Using-Handlebars)
    - [Customize Store Design Mode](#Customize-Store-Design-Mode)
    - [Create Custom Templates](#Create-Custom-Templates)
  - [Resources](#Resources)

</div>

This article outlines the key differences between Blueprint and Stencil for developers, agency partners, and anyone interested in the enhanced capabilities of Stencil.

##  What is Stencil?

[Stencil](https://developer.bigcommerce.com/stencil-docs/getting-started/about-stencil) is BigCommerce’s latest theme framework engine. Launched in 2016, Stencil incorporates industry best practices in technology, design standards, and SEO. The framework’s themes are optimized for mobile, tablet, and desktop browsers. Stencil also allows developers to build storefronts that engage shoppers and encourage checkouts on any device. All of BigCommerce’s new storefronts use Stencil.

If you are still using our legacy theme framework, Blueprint, we highly encourage switching to Stencil so you can take advantage of the new features and benefits. For more in-depth information about Stencil’s features, see the [Stencil Theme Platform](https://support.bigcommerce.com/s/article/The-Stencil-Theme-Platform#features) page.

## Why Transition to Stencil?

Stencil improves the overall storefront experience for merchants and their customers. With enhancements in speed, security, and updates to your themes, this modern framework provides a more streamlined process for the everyday maintenance and tasks required to run a store.

Stencil themes are built on non-proprietary, open-source code to provide easier adoption and adaptation while providing greater flexibility and access for customization. In comparison, Blueprint, is built on a rigid, proprietary codebase, making it difficult to tailor and extend theme functionality.

For more information on the enhanced capabilities of Stencil, see the [Stencil vs. Legacy Blueprint](https://support.bigcommerce.com/s/article/The-Stencil-Theme-Platform#compare) page.

## Technical Differences

When transitioning any store from Blueprint to Stencil, you should be aware of a few key differences before you begin. Transitioning to Stencil allows developers to do the following:
- [Develop locally on Stencil CLI]()
- [Use Handlebars instead of global variables]()
- [Customize Store Design mode]()
- [Create custom templates]()


### Developing Locally on Stencil CLI

For complete control over a theme’s appearance, logic, and theme configuration files, developers can use the Stencil Command Line Interface (Stencil CLI). This interface allows you to design and preview storefronts locally before pushing them to production. Access to real-time previews and testing across various devices is available via [Browsersync](https://www.browsersync.io/), a browser testing assistant built into Stencil CLI.

While Blueprint themes allow users to add new files and assets to themes via WebDav, Stencil assets must be added to and bundled into the theme, or referenced from an external source.

For images referenced from anywhere in your Blueprint file directory, you will need to move these assets to your Stencil theme and ensure they are referenced appropriately. You can still reference assets from within the `/content/` folder in WebDav or from an external source.

For more information on Stencil theme assets, see the [Theme Assets](https://developer.bigcommerce.com/stencil-docs/storefront-customization/theme-assets) page.

### Using Handlebars

While dynamic content is represented by PHP variables enclosed within `%%` markers, dynamic BigCommerce store data in Stencil themes are represented by [Handlebars](https://handlebarsjs.com/), a JavaScript templating language.

Handlebars keeps your HTML page clean by separating the logic-less templates from the business logic in your JavaScript files. This organization improves the structure of the application, promoting maintainability and scalability. Handlebars also simplifies the task of manually updating data in the customer-facing display view.

For more information about Handlebars, refer to these external resources:
- [A Beginner’s Guide to Handlebars](https://www.sitepoint.com/a-beginners-guide-to-handlebars/)
- [Getting Started with Handlebars.js](http://blog.teamtreehouse.com/getting-started-with-handlebars-js)
- [Handlebars interactive tutorial](http://tryhandlebarsjs.com/)

For details on using Handlebars to surface objects in Stencil, see [Stencil Technology Stack](https://developer.bigcommerce.com/stencil-docs/getting-started/stencil-technology-stack).

### Customize Store Design Mode

While Blueprint uses Style Editor to customize legacy themes, Stencil uses Store Design. [Store Design](https://support.bigcommerce.com/s/article/Store-Design) is BigCommerce’s browser-based tool that enables merchants to rapidly modify and customize a storefront’s look and feel without writing any code. Stencil theme developers can configure settings for Store Design. The configuration determines the theme’s customizable aspects.

For example, by customizing the configuration of Store Design, you can modify how merchants customize colors, fonts, display of page features, and the number of products displayed per feature.

When you switch to Stencil from Blueprint, you won’t lose any of your store data. However, you will lose any customization you’ve hard-coded into your previous Blueprint theme.

### Create Custom Templates

Stencil allows theme developers and merchants to assign custom layout templates to the following types of storefront pages:
- Brand (unique to Stencil)
- Category
- Product
- Store (static page)

Unlike Blueprint, Stencil does not require that custom template file names start with an underscore. In the current Stencil release, you must create and bundle custom templates using Stencil CLI before you can upload the custom templates to stores. However, once you have created and uploaded templates, authorized store users can assign them to storefront pages through the control panel. For more information on custom templates, see the [Custom Templates](https://developer.bigcommerce.com/stencil-docs/storefront-customization/custom-templates) page.

### Resources

For more information about switching to Stencil, see the following resources:
- [Getting Started with the Stencil Framework - Youtube Playlist](https://www.youtube.com/watch?v=s5_GjU51h-w&list=PLwTYtMwfzbe7EZiIWPAmPtuwRHkY7BG-0&index=1)
- [Stencil Theme Editor](https://support.bigcommerce.com/s/article/Stencil-Themes)
- [Editing Stencil Theme Files](https://support.bigcommerce.com/s/article/Stencil-Themes#edit)
- [Personalizing Your Stencil Theme](https://support.bigcommerce.com/articles/Learning/Personalizing-your-New-Theme)
- [What to Consider When Changing Your Stencil Theme](https://support.bigcommerce.com/s/article/What-to-Consider-When-Changing-Your-Theme)
