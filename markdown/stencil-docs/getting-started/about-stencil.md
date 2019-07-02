<h1>About Stencil</h1>
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
		<li><a href="#about_what-is-stencil"> What is Stencil?</a></li>
		<li><a href="#about_features-and-stack"> Stencil Development Features and Technology Stack</a></li>
		<li><a href="#about_blueprint"> Blueprint (Legacy Framework) Documentation </a></li>
    <li><a href="#about_support">Support</a></li>
	</ul>
</div>


<a href='#about_what-is-stencil' aria-hidden='true' class='block-anchor'  id='about_what-is-stencil'><i aria-hidden='true' class='linkify icon'></i></a>

## What is Stencil?

Stencil is BigCommerce's theme engine. It incorporates industry best practices in technology, design standards, and SEO, and allows you to build a stunning storefront that engages shoppers and encourages checkouts on any device. Stencil themes are supported on the [following browsers](https://support.bigcommerce.com/s/article/Themes-Supported-Browsers).

In addition to the features listed below, Stencil allows merchants to customize a storefront’s look and feel with no coding, making it accessible to a wide range of users.

Stencil powers BigCommerce’s [Cornerstone](https://github.com/bigcommerce/cornerstone) theme, which serves as your framework for creating custom sites. Cornerstone is available on Github and will be referenced throughout the documentation in order to demonstrate Stencil’s capabilities. See the [Cornerstone theme demo](http://cornerstone-light-demo.mybigcommerce.com/).



<a href='#about_features-and-stack' aria-hidden='true' class='block-anchor'  id='about_features-and-stack'><i aria-hidden='true' class='linkify icon'></i></a>

## Stencil Development Features and Technology Stack

Stencil provides the following features, allowing BigCommerce theme developers to create beautiful, dynamic, and powerful storefronts.


### Stencil Command Line Interface (Stencil CLI)

The Stencil CLI enables developers to locally develop and customize on any Stencil theme with no impact on a merchant's live storefront during the development process. When developing locally, you will have access to real-time Browsersync preview and testing across desktop, mobile, and tablet devices/viewports.

Stencil CLI runs on the [Node.js](https://nodejs.org/en/) runtime environment. Installing Node.js also provides the required [npm package manager](https://www.npmjs.com/package/npm).

### Logic-Based Templates

Stencil's logic based templates allow BigCommerce developers to customize storefront pages efficiently with the lightweight templating languge, Handlebars.js.  Handlebars allows you to efficiently embed dynamic and conditional logic onto your storefront pages.

### CSS and Design Assets

Stencil's Sass and SCSS support allows developers to nest properties, variables, and mix-ins. Cornerstone uses a BigCommerce pattern library called Citadel, which is built on top of the ZURB Foundation framework, version 5.5.3.

**Note:** Stencil does not support Foundation 6.x, due to incompatible updates introduced between versions 5.x and 6.x.

Foundation offers the framework for creating a responsive theme. You have the option of swapping out Foundation for another framework, although doing so would require significant work.

Foundation assets bundled with Cornerstone are located in these subdirectories: 

* `Cornerstone/assets/scss/settings/foundation/ `
* `Cornerstone/assets/scss/components/foundation/`

### Page-specific Resource Definition

YAML front matter allows you to request only the objects you need on the storefront, increasing page speed and allowing you to define the content to render with just a few keystrokes.

### Javascript Event Hooks

Stencil themes can access remote objects through event hooks, using the hooks to trigger defined events based on shopper behavior. This will allow you to collect product data and optimize a shopper's experience. To facilitate theme-building, BigCommerce provides the [stencil-utils client-side JavaScript library](/stencil-docs/adding-event-hooks-to-your-theme/stencil-utils-api-reference) for managing event hooks.

For more information, see the [Event Hook Overview](/stencil-docs/adding-event-hooks-to-your-theme/event-hook-overview-and-examples#event_event-hook).

---

## Store Design

[Store Design](https://support.bigcommerce.com/s/article/Store-Design) is a browser-based tool that enables merchants to rapidly customize a theme's look and feel with no coding.

Theme developers' can customize the configuration of the Store Design tool. A developer's configuration choices determine the customizable theme aspects and the range of choices that exists for each customizable aspect using the Store Design tool. For example, a developer can grant access to customization to colors, fonts, display of page features, and number of products to display per feature with the Store Design tool.

### Stencil Theme Variations

Each Stencil theme can contain one to four variations. You can optimize individual variations for specific markets, audiences and styles – while still managing and distributing all of these variations as one theme.
Cornerstone comes with 3 variations: Cornerstone Light, Cornerstone Warm, and Cornerstone Bold.

### Responsive, Mobile-Friendly Themes

BigCommerce stores powered by Stencil allow shoppers to have a first class experience _across any device_.



<a href='#about_blueprint' aria-hidden='true' class='block-anchor'  id='about_blueprint'><i aria-hidden='true' class='linkify icon'></i></a>

## Blueprint (Legacy Framework) Documentation

If you are looking for information on Blueprint, BigCommerce's legacy theme framework, you can visit [Blueprint Themes](https://developer.bigcommerce.com/legacy/blueprint-themes).



<a href='#about_support' aria-hidden='true' class='block-anchor'  id='about_support'><i aria-hidden='true' class='linkify icon'></i></a>

## Support

### [Developer Community](https://forum.bigcommerce.com/s/group/0F913000000HLjECAW/bigcommerce-developers)

This is a great place to get help from other developers who work on the BigCommerce platform. If you have BigCommerce specific questions this is the best place to ask. It’s also great for beginners to get assistance.

### [StackOverflow](https://stackoverflow.com/questions/tagged/bigcommerce)

Are you a more experienced developer or have a programming language specific question? This is a good place to ask questions and get help. The developer community is the best place to get answers about the BigCommerce platform specifically.

If you need direct assistance, you can contact BigCommerce Support through [Live Chat, Phone Support, or Email Support](https://support.bigcommerce.com/s/contact). 




## Resources
### Related Articles
* [Store Design](https://forum.bigcommerce.com/s/article/Store-Design) (BigCommerce Knowledge Base)

### Sample Apps 
* [Cornerstone Github Repository](https://github.com/bigcommerce/cornerstone)
* [Cornerstone Theme Demo](http://cornerstone-light-demo.mybigcommerce.com/)

