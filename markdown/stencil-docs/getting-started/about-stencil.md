<h1>About Stencil</h1>
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#about_cornerstone">Cornerstone</a></li>
		<li><a href="#about_features-and-stack">Stencil Development Features</a></li>
		<li><a href="#about_blueprint">Blueprint (Legacy Framework)</a></li>
    <li><a href="#about_support">Support</a></li>
	</ul>
</div>


Stencil is BigCommerce's theme engine. It incorporates industry best practices in technology, design standards, SEO, and allows developers to build a stunning storefront that engages shoppers and encourages checkouts on any device. Stencil themes are supported on the [following browsers](https://support.bigcommerce.com/s/article/Themes-Supported-Browsers). Stencil is responsible for powering the BigCommerce [Cornerstone theme](#about_cornerstone).

The [Store Design](/configure-store-design-ui/store-design-overview) tool available on Stencil themes allows merchants to customize a storefront’s look and feel with no coding, making customizations possibble by a wide range of users.  Store Design enables quick and easy customization of a theme's colors, typography, banners, headings, carousel, and footer. It also enables customization of a storefront's layout characteristics, such as the number of products displayed in various panels, category pages, and brand pages. For details, see [Personalizing Your Theme](https://support.bigcommerce.com/articles/Learning/Personalizing-your-New-Theme) (BigCommerce Knowledge Base). 

BigCommerce Stencil themes are responsive, mobile friendly themes, allowing shoppers to have a first class experience across any device. Each Stencil theme can contain one to four variations. You can optimize individual variations for specific markets, audiences and styles, while still managing and distributing all of these variations as one theme. 

---

<a href='#about_cornerstone' aria-hidden='true' class='block-anchor'  id='about_cornerstone'><i aria-hidden='true' class='linkify icon'></i></a>

## Cornerstone

Stencil powers BigCommerce’s [Cornerstone](https://github.com/bigcommerce/cornerstone) theme, which serves as your base Stencil theme for creating custom sites. Cornerstone is available open source on [Github](https://github.com/bigcommerce/cornerstone). 

The Cornerstone theme comes with three style variations that are each fully responsive and ideal for a large catalog. The variations include:

* Cornerstone Light
* Cornerstone Warm
* Cornerstone Bold

See the [Cornerstone Light theme demo](http://cornerstone-light-demo.mybigcommerce.com/) to experience a Stencil theme's capabilities.

As the default theme on new/trial stores, Cornerstone is typically the first theme to support new theme-related features and improvements. See the [BigCommerce Developer Changelog](https://developer.bigcommerce.com/changelog) for the latest Cornerstone news and release notes.

---

<a href='#about_features-and-stack' aria-hidden='true' class='block-anchor'  id='about_features-and-stack'><i aria-hidden='true' class='linkify icon'></i></a>

## Stencil Development Features

Stencil contains features that allow BigCommerce theme developers to create beautiful, dynamic, and powerful storefronts.

### Stencil Command Line Interface (Stencil CLI)

The Stencil CLI enables developers to locally develop and customize on any Stencil theme with no impact on a merchant's live storefront during the development process. When developing locally, developers have access to real-time Browsersync preview and testing across desktop, mobile, and tablet devices/viewports.

Stencil CLI runs on the [Node.js](https://nodejs.org/en/) runtime environment. Installing Node.js also provides the required [npm package manager](https://www.npmjs.com/package/npm).

### Logic-Based Templates

Stencil's logic based templates allow BigCommerce developers to customize storefront pages efficiently with the lightweight templating language, [Handlebars.js](https://handlebarsjs.com/). Handlebars.js allows you to efficiently embed dynamic and conditional logic onto your storefront pages.

### CSS and Design Assets

Stencil's Sass and SCSS support allows developers to nest properties, variables, and mix-ins. Cornerstone uses a BigCommerce pattern library called [Citadel](https://www.npmjs.com/package/@bigcommerce/citadel), which is built on top of the [ZURB Foundation framework](https://foundation.zurb.com/sites/docs/), version 5.5.3. Foundation assets are located in these subdirectories in the base Stencil theme, Cornerstone:

* <span class="fp">cornerstone/assets/scss/settings/foundation/</span>
* <span class="fp">cornerstone/assets/scss/components/foundation/</span>

Foundation offers the framework for creating a responsive theme. You have the option of swapping out Foundation for another framework, although doing so would require significant work. Stencil does not support Foundation 6.x, due to incompatible updates introduced between versions 5.x and 6.x.

<div class="HubBlock--callout">
<div class="CalloutBlock--">
<div class="HubBlock-content">
    
<!-- theme:  -->

### Edit HTML and CSS Files from the BigCommerce Control Panel 
> If you are more comfortable working in HTML and CSS, Stencil's *Edit Theme Files* feature allows you to directly edit many of your theme's files from the Control Panel. See [Edit Theme Files](https://www.youtube.com/watch?v=waJ1dg_dAh8&index=related) to learn how (Youtube).

</div>
</div>
</div>

### Page-specific Resource Definition

Stencil's use of YAML front matter allows you to request only the objects you need on the storefront, increasing page speed and allowing you to define the content to render with just a few keystrokes.

### Javascript Event Hooks

Stencil themes can access remote objects through event hooks, using the hooks to trigger defined events based on shopper behavior. This will allow you to collect product data and optimize a shopper's experience. To facilitate theme-building, BigCommerce provides the [stencil-utils client-side JavaScript library](/stencil-docs/adding-event-hooks-to-your-theme/stencil-utils-api-reference) for managing event hooks.

---

<a href='#about_blueprint' aria-hidden='true' class='block-anchor'  id='about_blueprint'><i aria-hidden='true' class='linkify icon'></i></a>

## Blueprint (Legacy Framework)

If you are looking for information on Blueprint, BigCommerce's legacy theme framework, you can visit [Blueprint Themes](https://developer.bigcommerce.com/legacy/blueprint-themes).

---

<a href='#about_support' aria-hidden='true' class='block-anchor'  id='about_support'><i aria-hidden='true' class='linkify icon'></i></a>

## Support

### [Developer Community](https://support.bigcommerce.com/s/group/0F913000000HLjECAW/bigcommerce-developers)
This is a great place to get help from other developers who work on the BigCommerce platform. If you have BigCommerce specific questions this is the best place to ask. It’s also great for beginners to get assistance.

### [Stack Overflow](https://stackoverflow.com/questions/tagged/bigcommerce)
Are you a more experienced developer or have a programming language specific question? This is a good place to ask questions and get help. The developer community is the best place to get answers about the BigCommerce platform specifically.

If you need direct assistance, you can contact BigCommerce Support through [Live Chat, Phone Support, or Email Support](https://support.bigcommerce.com/s/contact).

---

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

