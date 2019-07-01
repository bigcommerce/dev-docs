<h1>Transitioning to Stencil</h1>
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
		<li><a href="#transitionining-to-stencil_choosing-dev-path"> Choosing a Development Path</a></li>
		<li><a href="#transitionining-to-stencil_front-matter-quick-start">Front-Matter Quick Start</a></li>
    <li><a href="#transitionining-to-stencil_handlebars_quick-start">Handlebars Quick Start</a></li>
		<li><a href="#transitionining-to-stencil_seo-tips">SEO Tips and Best Practices</a></li>
		<li><a href="#transitionining-to-stencil_blueprint-to-stencil">Blueprint to Stencil Features Map</a></li>
    <li><a href="#transitionining-to-stencil_interacting-with-api">Interacting with the BigCommerce API</a></li>
    <li><a href="#transitionining-to-stencil_partnering-with-bc">Partnering with BigCommerce</a></li>
	</ul>
</div>

<a href='#transitionining-to-stencil_choosing-dev-path' aria-hidden='true' class='block-anchor'  id='transitionining-to-stencil_choosing-dev-path'></a>

## Choosing a Development Path

Are you approaching Stencil from a different theming framework, like Blueprint, BigCommerce's legacy framework? Or moving to the Stencil templating environment from a pure HTML and CSS-based design?

You have four (non-mutually exclusive) options for developing Stencil themes:

* Find an Agency Partner
* Light Customization using the Theme Editor
* Light Customization using HTML and CSS
* Adapting a Stencil Theme or Developing from Scratch

###  Find an Agency Partner

If you prefer to have an expert collaborator customize your theme, we recommend working with one of our certified certified BigCommerce Agency Partners. Reference the following resources to do so:

* [Partner Directory](https://partners.bigcommerce.com/directory/) (BigCommerce)
* [Working with a Design Partner](https://support.bigcommerce.com/articles/Learning/Working-with-a-Design-Partner) (Knowledge Base)

### Light Customization with Stencil Theme Editor

Stencil can be customized without the use of any specialized development tools or techniques by using of the Stencil Theme Editor. The Stencil Theme Editor still enables customization of a theme's colors, typography, banners, headings, carousel, and footer. It also enables customization of broader layout characteristics, such as the number of products displayed in various panels, category pages, and brand pages.

For details, see the following support resources:

* [Theme Editor](https://support.bigcommerce.com/s/article/Stencil-Themes) (Knowledge Base)
* [Personalizing Your Theme](https://support.bigcommerce.com/articles/Learning/Personalizing-your-New-Theme) (Knowledge Base)

### Light Customization with HTML and CSS

If you are most comfortable working in HTML and CSS, Stencil's *Edit Theme Files* feature allows you to directly edit most of your theme's files from the Control Panel. For details, see the following resources:

* [Editing Stencil Theme Files](https://support.bigcommerce.com/s/article/Stencil-Themes#edit) (Knowledge Base)
* [Getting Started with the Stencil Framework](https://www.youtube.com/watch?v=waJ1dg_dAh8&index=11&list=PLwTYtMwfzbe7EZiIWPAmPtuwRHkY7BG-0) (Video overview of copying and editing a theme's files)

### Adapt a Stencil Theme, or Develop from Scratch

For complete control over a theme's appearance and logic – including the ability to edit _all_ theme configuration files – you will want to use the Stencil Command-line interface, also known as the Stencil CLI.

To learn Stencil CLI's templating conventions, see Installing Stencil CLI. Also take a look at BigCommerce's [Getting Started with the Stencil Framework](https://www.youtube.com/playlist?list=PLwTYtMwfzbe7EZiIWPAmPtuwRHkY7BG-0) video playlist.



<a href='#transitionining-to-stencil_front-matter-quick-start' aria-hidden='true' class='block-anchor'  id='transitionining-to-stencil_front-matter-quick-start'></a>

## Front-Matter Quick Start

Stencil templates start with a section of "front matter" where you can and concisely customize each page's design and layout details. 

This front-matter section uses conventions from YAML, a simple, widely used markup language. If you haven't used these conventions before, refer to our [Front-Matter Overview](https://developer.bigcommerce.com/stencil-docs/front-matter/front-matter-overview).



<a href='#transitionining-to-stencil_handlebars_quick-start' aria-hidden='true' class='block-anchor'  id='transitionining-to-stencil_handlebars_quick-start'></a>

## Handlebars Quick Start

Stencil uses Handlebars.js to assemble dynamic content into the storefront pages that are displayed to shoppers. The dynamic content can be drawn from a few sources, like the store's catalog.

Handlebars' syntax is quite simple, and it allows you to accomplish powerful JavaScript operations with minimal JavaScript code. To learn more about Handlebars.js, see these third-party tutorials: 

* [Learn Handlebars in 10 Minutes or Less](http://tutorialzine.com/2015/01/learn-handlebars-in-10-minutes/) (Tutorial Zine)
* [A Beginner’s Guide to Handlebars](https://www.sitepoint.com/a-beginners-guide-to-handlebars/) (SitePoint)
* [Getting Started with Handlebars.js](http://blog.teamtreehouse.com/getting-started-with-handlebars-js) (Team Treehouse)
* [Handlebars interactive tutorial](http://tryhandlebarsjs.com/) (Try Handlebars)



<a href='#transitionining-to-stencil_seo-tips' aria-hidden='true' class='block-anchor'  id='transitionining-to-stencil_seo-tips'></a>

## SEO Tips and Best Practices

Search-engine optimization (SEO) helps translate an elegant theme into a successful, high-conversion storefront. Because so many shoppers reach online stores through a search engine, a search-optimized site will be more visible – attracting more traffic. 

The Stencil framework is [designed for high SEO performance](https://www.bigcommerce.com/improve-organic-traffic/) (BigCommerce). However, you will want to keep SEO in mind as you build out each theme and storefront. For guidelines, please see these BigCommerce support articles (which are a series of intermediate to advanced chapters in our Guide to SEO):

* [SEO Do's and Don'ts](https://support.bigcommerce.com/s/article/What-is-SEO) (Knowledge Base)
* [Developing a Keyword Strategy](https://support.bigcommerce.com/articles/Learning/Developing-a-Keyword-Strategy/) (Knowledge Base)
* [SEO Success Essentials](https://support.bigcommerce.com/articles/Learning/Bigcommerce-SEO-Success-Essentials/) (Knowledge Base)
* [Advanced SEO on BigCommerce](https://support.bigcommerce.com/s/article/Advanced-SEO-on-Bigcommerce) (Knowledge Base)

Also checkout our [Guide to Keyword Research](https://support.bigcommerce.com/s/article/Value-of-Keywords) (Knowledge Base).



<a href='#transitionining-to-stencil_blueprint-to-stencil' aria-hidden='true' class='block-anchor'  id='transitionining-to-stencil_blueprint-to-stencil'></a>

## Blueprint-to-Stencil Features Map 

This following support and video resurces are designed to help you identify the Stencil counterparts to familiar Blueprint components.

* [What to Consider When Changing Your Theme](https://support.bigcommerce.com/s/article/What-to-Consider-When-Changing-Your-Theme) (Knowledge Base)
* [Stencil and the BigCommerce Control Panel](https://www.youtube.com/watch?v=d2F6F8LJXzs&list=PLwTYtMwfzbe7EZiIWPAmPtuwRHkY7BG-0&index=2) (Video tour of Blueprint-to-Stencil changes in the BigCommerce control panel)



<a href='#transitionining-to-stencil_interacting-with-api' aria-hidden='true' class='block-anchor'  id='transitionining-to-stencil_interacting-with-api'></a>

## Interacting with the BigCommerce API

Interacting with the BigCommerce API
BigCommerce's growing API resources enable application developers to create private scripts or apps that support a single store, or to create public apps offered to multiple stores via BigCommerce's App Marketplace.

As a theme developer, you can rely on apps to enhance your themes' capabilities, and to extend or complement the storefront features built into the BigCommerce platform. Popular app areas include inventory management, email marketing, coupons, reviews, shipping, tax accounting, and security. For more information, see BigCommerce's:

* [App Marketplace](https://www.bigcommerce.com/apps/) (BigCommerce)
* [API Documentation](https://developer.bigcommerce.com/api-docs)



<a href='#transitionining-to-stencil_partnering-with-bc' aria-hidden='true' class='block-anchor'  id='transitionining-to-stencil_partnering-with-bc'></a>

## Partnering with BigCommerce

No formal business relationship is required to develop themes on the BigCommerce platform. However, consider applying to become a become a BigCommerce Agency Partner, in order to accelerate your development of new business and revenue. For details, see our:

* [Overview of BigCommerce Partnerships](https://www.bigcommerce.com/partners/) (BigCommerce)
* [Agency Partners](https://www.bigcommerce.com/partners/design-solution/) (BigCommerce)
* [Technology Partners](https://www.bigcommerce.com/partners/developers/) (BigCommerce)
* [Partnership Application](https://partners.bigcommerce.com/English/register_email.aspx) (BigCommerce)



## Resources

### Related Articles
* [Front-Matter Overview](https://developer.bigcommerce.com/stencil-docs/front-matter/front-matter-overview)
* [API Documentation](https://developer.bigcommerce.com/api-docs)
* [Editing Stencil Theme Files](https://support.bigcommerce.com/s/article/Stencil-Themes#edit) (Knowledge Base)
* [Working with a Design Partner](https://support.bigcommerce.com/articles/Learning/Working-with-a-Design-Partner) (Knowledge Base)
* [Theme Editor](https://support.bigcommerce.com/s/article/Stencil-Themes) (Knowledge Base)
* [Personalizing Your Theme](https://support.bigcommerce.com/articles/Learning/Personalizing-your-New-Theme) (Knowledge Base)
* [What to Consider When Changing Your Theme](https://support.bigcommerce.com/s/article/What-to-Consider-When-Changing-Your-Theme) (Knowledge Base)
* [SEO Do's and Don'ts](https://support.bigcommerce.com/s/article/What-is-SEO) (Knowledge Base)
* [Developing a Keyword Strategy](https://support.bigcommerce.com/articles/Learning/Developing-a-Keyword-Strategy/) (Knowledge Base)
* [SEO Success Essentials](https://support.bigcommerce.com/articles/Learning/Bigcommerce-SEO-Success-Essentials/) (Knowledge Base)
* [Advanced SEO on BigCommerce](https://support.bigcommerce.com/s/article/Advanced-SEO-on-Bigcommerce) (Knowledge Base)
* [Guide to Keyword Research](https://support.bigcommerce.com/s/article/Value-of-Keywords) (Knowledge Base)
* [Getting Started with the Stencil Framework](https://www.youtube.com/playlist?list=PLwTYtMwfzbe7EZiIWPAmPtuwRHkY7BG-0) (Video Playlist)
* [Getting Started with the Stencil Framework](https://www.youtube.com/watch?v=waJ1dg_dAh8&index=11&list=PLwTYtMwfzbe7EZiIWPAmPtuwRHkY7BG-0) (Video overview of copying and editing a theme's files)
* [Stencil and the BigCommerce Control Panel](https://www.youtube.com/watch?v=d2F6F8LJXzs&list=PLwTYtMwfzbe7EZiIWPAmPtuwRHkY7BG-0&index=2) (Video tour of Blueprint-to-Stencil changes in the BigCommerce control panel)
* [Overview of BigCommerce Partnerships](https://www.bigcommerce.com/partners/) (BigCommerce)
* [Agency Partners](https://www.bigcommerce.com/partners/design-solution/) (BigCommerce)
* [Technology Partners](https://www.bigcommerce.com/partners/developers/) (BigCommerce)
* [Partnership Application](https://partners.bigcommerce.com/English/register_email.aspx) (BigCommerce)
* [App Marketplace](https://www.bigcommerce.com/apps/) (BigCommerce)

### Additional Resources
* [Learn Handlebars in 10 Minutes or Less](http://tutorialzine.com/2015/01/learn-handlebars-in-10-minutes/) (Tutorial Zine)
* [A Beginner’s Guide to Handlebars](https://www.sitepoint.com/a-beginners-guide-to-handlebars/) (SitePoint)
* [Getting Started with Handlebars.js](http://blog.teamtreehouse.com/getting-started-with-handlebars-js) (Team Treehouse)
* [Handlebars interactive tutorial](http://tryhandlebarsjs.com/) (Try Handlebars)

