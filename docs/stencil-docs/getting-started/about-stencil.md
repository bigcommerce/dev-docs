# About Stencil

<div class="otp" id="no-index">

### On This Page
- [Cornerstone](#cornerstone)
- [Stencil CLI](#stencil-cli)
- [Flexible Templates](#flexible-templates)
- [Powerful CSS Stack](#powerful-css-stack)
- [Front Matter](#front-matter)
- [JavaScript Event Hooks](#javascript-event-hooks)
- [Blueprint (Legacy Framework)](#blueprint-legacy-framework)
- [Support](#support)
- [Resources](#resources)

</div>

Stencil is BigCommerce's theme engine. It incorporates industry best practices in technology, design standards, SEO, and allows developers to build a stunning storefront that engages shoppers and encourages checkouts on any device. Stencil themes are supported on the [following browsers](https://support.bigcommerce.com/s/article/Themes-Supported-Browsers). Stencil is responsible for powering the BigCommerce [Cornerstone theme](#cornerstone).

The [Page Builder](https://developer.bigcommerce.com/stencil-docs/page-builder/page-builder-overview) tool available on Stencil themes allows merchants to customize a storefront’s look and feel with no coding, making customizations possible by a wide range of users.  Store Design enables quick and easy customization of a theme's colors, typography, banners, headings, carousel, and footer. It also enables customization of a storefront's layout characteristics, such as the number of products displayed in various panels, category pages, and brand pages. For details, see [Personalizing Your Theme](https://support.bigcommerce.com/articles/Learning/Personalizing-your-New-Theme) (BigCommerce Knowledge Base). 

BigCommerce Stencil themes are responsive, mobile friendly themes, allowing shoppers to have a first class experience across any device. Each Stencil theme can contain one to four variations. You can optimize individual variations for specific markets, audiences, and styles, while still managing and distributing all of these variations as one theme.

## Cornerstone

BigCommerce's [Cornerstone](https://github.com/bigcommerce/cornerstone) theme is the building block and starting point for rapidly developing themes for BigCommerce. Cornerstone is available open source on [Github](https://github.com/bigcommerce/cornerstone).

Cornerstone comes in three, fully-responsive variations:

* Cornerstone Light
* Cornerstone Warm
* Cornerstone Bold

See the [Cornerstone Light theme demo](http://cornerstone-light-demo.mybigcommerce.com/) to experience a Stencil theme's capabilities.

As the default theme on new stores, Cornerstone is typically the first theme to support new theme-related features and improvements. See the [BigCommerce Developer Changelog](https://developer.bigcommerce.com/changelog) for the latest Cornerstone news and release notes.

## Stencil CLI

The Stencil CLI enables developers to locally develop and customize on any Stencil theme with no impact on a merchant's live storefront during the development process. When developing locally, developers have access to real-time Browsersync preview and testing across desktop, mobile, and tablet devices/viewports.

Stencil CLI runs on the [Node.js](https://nodejs.org/en/) runtime environment. Installing Node.js also provides the required [npm package manager](https://www.npmjs.com/package/npm).

## Flexible Templates

Stencil's logic based templates allow BigCommerce developers to customize storefront pages efficiently with the lightweight templating language, [Handlebars.js](https://handlebarsjs.com/). Handlebars.js allows you to efficiently embed dynamic and conditional logic onto your storefront pages.

## Powerful CSS Stack

Stencil themes support both **Sass** and **SCSS**. Developers can use these popular CSS pre-processors to nest CSS properties, variables, and mix-ins. 

Cornerstone uses a BigCommerce SCSS Framework [Citadel](https://www.npmjs.com/package/@bigcommerce/citadel), which is built on top of [Foundation](https://foundation.zurb.com/sites/docs/) `v5.5.3` (Foundation `v6.x` not currently supported).

Foundation assets are located in the following directories:
* <span class="fp">assets/scss/settings/foundation/</span>
* <span class="fp">assets/scss/components/foundation/</span>

## Front Matter

Stencil's use of **YAML Front Matter** allows developers to request only the objects needed on the storefront, increasing page speed and allowing developers to define the content to render with just a few keystrokes.

## JavaScript Event Hooks

Stencil themes can access remote objects through event hook and use the hooks to trigger defined events based on shopper behavior. This will allow you to collect product data and optimize a shopper's experience. To facilitate theme-building, BigCommerce provides [stencil-utils](https://developer.bigcommerce.com/stencil-docs/reference-docs/stencil-utils-api-reference) -- a client-side library for managing event hooks.

## Blueprint (Legacy Framework)

For information on Blueprint, BigCommerce's legacy theme framework, see: [Blueprint Themes](https://developer.bigcommerce.com/legacy/blueprint-themes).

## Support

### [Developer Community](https://support.bigcommerce.com/s/group/0F913000000HLjECAW/bigcommerce-developers)
This is a great place to get help from other developers who work on the BigCommerce platform. If you have BigCommerce specific questions this is the best place to ask. It’s also great for beginners to get assistance.

### [Stack Overflow](https://stackoverflow.com/questions/tagged/bigcommerce)
Are you a more experienced developer or have a programming language specific question? This is a good place to ask questions and get help. The developer community is the best place to get answers about the BigCommerce platform specifically.

If you need direct assistance, you can contact BigCommerce Support through [Live Chat, Phone Support, or Email Support](https://support.bigcommerce.com/s/contact).

## Resources

### Related Articles

* [Store Design](https://forum.bigcommerce.com/s/article/Store-Design) (BigCommerce Knowledge Base)
* [Personalizing Your Theme](https://support.bigcommerce.com/articles/Learning/Personalizing-your-New-Theme) (BigCommerce Knowledge Base)

### Sample Apps

* [Cornerstone Theme Demo](http://cornerstone-light-demo.mybigcommerce.com/)

### Additional Resources
* [stencil-cli Repository](https://github.com/bigcommerce/stencil-cli) (BigCommerce Github)
* [Cornerstone Repository](https://github.com/bigcommerce/cornerstone) (BigCommerce Github)
* [Cornerstone Theme Manual](https://support.bigcommerce.com/s/article/Cornerstone-Theme-Manual) (BigCommerce Knowledge Base)
