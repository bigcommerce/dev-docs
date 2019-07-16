<h1>Transitioning to Stencil</h1>
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
		<li><a href="#transitioning_find">Find an Agency Partner</a></li>
    <li><a href="#transitioning_adapt">Adapt a Stencil Theme or Develop from Scratch</a></li>
    <li><a href="#transitioning_transition">Transition to Stencil from Blueprint</a></li>
    <li><a href="#transitioning_seo-tips">SEO Tips and Best Practices</a></li>
    <li><a href="#transitioning_interacting">Interacting with the BigCommerce API</a></li>
</div>

Whether you are new to Stencil or approaching Stencil from a different platform or theming framework (such as BigCommerce’s Legacy Blueprint), there are a few ways to develop a custom theme for your BigCommerce Stencil storefront. This article will provide instruction on how to transition to Stencil depending on your skill set, budget, and approach to the framework.

---

<a href='#transitioning_find' aria-hidden='true' class='block-anchor'  id='transitioning_find'><i aria-hidden='true' class='linkify icon'></i></a>

##  Find an Agency Partner

If you prefer an expert customize your theme, we recommend working with one of our certified certified BigCommerce Agency Partners. See our [Partner Directory](https://partners.bigcommerce.com/directory/search?i=75) and [Working with a Design Partner](https://support.bigcommerce.com/articles/Learning/Working-with-a-Design-Partner) find an agency partner.

---

<a href='#transitioning_adapt' aria-hidden='true' class='block-anchor'  id='transitioning_adapt'><i aria-hidden='true' class='linkify icon'></i></a>

## Adapt a Stencil Theme or Develop from Scratch

For complete control over a theme's appearance and logic including the ability to edit _all_ theme configuration files–you will want to use the Stencil Command-line interface, also known as the Stencil CLI.

---

<a href='#transitioning_transition' aria-hidden='true' class='block-anchor'  id='transitioning_transition'><i aria-hidden='true' class='linkify icon'></i></a>

## Transition to Stencil from Blueprint

All new BigCommerce storefronts are powered by the Stencil theme engine. However, some BigCommerce stores still use our legacy theme framework, Blueprint. If you're still using this legacy framework, consider switching to Stencil. Transitioning to Stencil allows developers to take advantage of new features, including [Google Analytics Enhanced Ecommerce](/developing-further/google-analytics-enhanced-ecommerce), [Price Lists](/api-docs/catalog/price-list-overview) and [Google AMP](/developing-further/google-amp). Stencil also features a CLI that allows you to design and preview storefronts locally before pushing them to production. BigCommerce's base Stencil theme, Cornerstone, is also natively mobile responsive.

### Technical Differences

#### PHP vs Handlebars

Dynamic BigCommerce store data in Stencil themes are represented by Handlebars.js, a Javascript templating language. Dynamic content was previously represented by PHP variables enclosed within %% markers.

For details on using Handlebars to surface objects in Stencil, see the following resources:

* [Handlebars Overview](https://developer.bigcommerce.com/stencil-docs/handlebars-syntax-and-helpers/handlebars-overview)
* [Global Objects and Properties Overview](https://developer.bigcommerce.com/stencil-docs/stencil-object-model-reference/stencil-objects/global-objects/global-objects-and-properties-overview)

### WebDav vs CLI

In Blueprint themes, users were able to add new files and assets to themes [via WebDav](https://support.bigcommerce.com/s/article/File-Access-WebDAV). In Stencil, assets must be added to and bundled into the theme, or referenced from an external source. 

### Customizing checkout with Stencil

Stores created before March 2019 had the option to switch to One Page Checkout (for Developers). This gave developers access to an editable checkout file. Switching to Stencil won't affect One Page Checkout (for Developers). However, you should consider switching to Optimized One Page Checkout, as One Page Checkout (for Developers) will eventually be deprecated for all stores. See [The Complete Guide to Checkout Customization on BigCommerce](https://medium.com/bigcommerce-developer-blog/the-complete-guide-to-checkout-customization-on-bigcommerce-6b566bc36fa9) (Developer Blog) for more information.

### Updating a theme

As with Blueprint themes, Stencil themes can receive updates from theme developers. You can apply theme updates by going to the BigCommerce Control Panel. When in the control panel, navigate to **Storefront** › **My Themes**, and click **Update**. 

BigCommerce shares updates to Cornerstone in our Changelog (https://developer.bigcommerce.com/changelog) so you can verify that updates don't conflict with your customizations. 

For more on theme updates and best practices for handling version control, view this guide:
https://developer.bigcommerce.com/stencil-docs/getting-started/advanced-installation-options/theme-updates-and-version-control#theme-updates_goruck-best-pracs

### FAQ

**How will this affect my store? Will I lose data?**

No store data will be lost when you switch from Blueprint to Stencil. A store's theme is the presentation layer that renders your store catalog. You will lose any information you've hard-coded into your previous Blueprint theme.

**How can I retain assets from my Blueprint theme?**

For images referenced from anywhere in your Blueprint file directory, you will need to move these assets to your Stencil theme and reference them appropriately. You can still reference assets from within the /content/ folder in WebDav or from an external source.

**Can I work on a custom Stencil theme without disrupting my live store?**

Yes. The Stencil CLI allows you to preview theme changes on your live store locally. The changes won't be reflected on your live store until you publish them.

**Can I still use developer checkout?**

If your store was created before March 2019, you will still be able to use One Page Checkout (for Developers). Consider switching to Optimized One Page Checkout, as this legacy checkout will eventually be deprecated for all stores.

---

<a href='#transitioning_seo-tips' aria-hidden='true' class='block-anchor'  id='transitioning_seo-tips'><i aria-hidden='true' class='linkify icon'></i></a>

## SEO Tips and Best Practices

Search-engine optimization (SEO) helps translate an elegant theme into a successful, high-conversion storefront. Because so many shoppers reach online stores through a search engine, a search-optimized site will be more visible–attracting more traffic.

Stencil is designed for high SEO performance. However, you will want to keep SEO in mind as you build out each theme and storefront. For guidelines, see the following BigCommerce support articles (which are a series of intermediate to advanced chapters in our Guide to SEO):

* [SEO Do’s and Don’ts](https://support.bigcommerce.com/s/article/What-is-SEO) (Knowledge Base)
* [Developing a Keyword Strategy](https://support.bigcommerce.com/articles/Learning/Developing-a-Keyword-Strategy/) (Knowledge Base)
* [SEO Success Essentials](https://support.bigcommerce.com/articles/Learning/Bigcommerce-SEO-Success-Essentials/) (Knowledge Base)
* [Advanced SEO on BigCommerce](https://support.bigcommerce.com/s/article/Advanced-SEO-on-Bigcommerce) (Knowledge Base)
* [Guide to Keyword Research](https://support.bigcommerce.com/s/article/Value-of-Keywords) (Knowledge Base).

---

<a href='#transitioning_interacting' aria-hidden='true' class='block-anchor'  id='transitioning_interacting'><i aria-hidden='true' class='linkify icon'></i></a>

## Interacting with the BigCommerce API

Interacting with the BigCommerce API BigCommerce’s growing API resources enable application developers to create private scripts or apps that support a single store, or to create public apps offered to multiple stores via BigCommerce’s App Marketplace.

As a theme developer, you can rely on apps to enhance your themes’ capabilities, and to extend or complement the storefront features built into the BigCommerce platform. Popular app areas include inventory management, email marketing, coupons, reviews, shipping, tax accounting, and security. For more information, see BigCommerce’s:

* [App Marketplace](https://www.bigcommerce.com/apps/) (BigCommerce)
* [API Documentation](https://developer.bigcommerce.com/api-docs)

<a href='#partner-with-bc' aria-hidden='true' class='block-anchor'  id='partner-with-bc'><i aria-hidden='true' class='linkify icon'></i></a>

<div class="HubBlock--callout">
<div class="CalloutBlock--">
<div class="HubBlock-content">
    
<!-- theme:  -->

### Partnering with BigCommerce
> No formal business relationship is required to develop themes on the BigCommerce platform. However, consider applying to become a become a BigCommerce Agency Partner, to accelerate your development of new business and revenue. For details, see our:

* [Overview of BigCommerce Partnerships](https://www.bigcommerce.com/partners/) (BigCommerce)
* [Agency Partners](https://www.bigcommerce.com/partners/design-solution/) (BigCommerce)
* [Technology Partners](https://www.bigcommerce.com/partners/developers/) (BigCommerce)
* [Partnership Application](https://partners.bigcommerce.com/English/register_email.aspx) (BigCommerce)


</div>
</div>
</div>

---

## Resources

### Related Articles

* [API Documentation](https://developer.bigcommerce.com/api-docs)
* [What to Consider When Changing Your Theme](https://support.bigcommerce.com/s/article/What-to-Consider-When-Changing-Your-Theme) (Knowledge Base)
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
* [Stencil and the BigCommerce Control Panel](https://www.youtube.com/watch?v=d2F6F8LJXzs&list=PLwTYtMwfzbe7EZiIWPAmPtuwRHkY7BG-0&index=2) (Youtube)

