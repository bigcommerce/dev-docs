<div><h3 class="sub-docs-type" id="bigcommerce-for-wordpress">BigCommerce for Wordpress</h3>

# AMP for the BigCommerce WordPress plugin
#### Prepared by XWP for BigCommerce

<div class="otp" id="no-index">

### On This Page
- [What's AMP?](#whats-amp)
- [AMP real world example](#amp-real-world-example)
- [How to enable AMP](#how-to-enable-amp)
- [WordPress AMP plugin support](#wordpress-amp-plugin-support)
- [Choosing an AMP mode](#choosing-an-amp-mode)
- [Previewing AMP](#previewing-amp)
- [AMP Tools](#amp-tools)
- [AMP for SEO](#amp-for-seo)
- [Customizing AMP templates](#customizing-amp-templates)

</div> 

## What's AMP?

AMP stands for Accelerated Mobile Pages and is an [open source project](https://www.ampproject.org/) created by Google and maintained by thousands of developers who care deeply about a better and faster web.

AMP aims to load your web pages faster and thus providing a better end user experience. It does this by using a subset of HTML called AMP HTML which is very similar to HTML, with a few restrictions. There is also AMP JS which is a whitelisted and concise JavaScript library and most importantly the AMP Cache which search engines like Google use to serve AMP pages.

While AMP is quite widely used in the publishing industry and many large news organizations have taken advantage of it, AMP has not yet been rolled out in any significant way to ecommerce stores. This means there is a big opportunity for online stores to get in early and start publishing AMP valid stores to increase traffic, conversion rates, and ultimately sales.

## AMP real world example

A user who is looking to purchase a Christmas gift for a loved one would typically go to Google and search for the item. Let’s say they’re looking for a picture frame, they type “Picture Frame” in to the search box, and Google presents a search result page of websites and ecommerce stores selling picture frames.

You may notice when doing a Google search of your own, that Google now includes AMP specific results at the top of the SERP (search engine results page). It shows a carousel of AMP enabled content that is related to your search.

By clicking one of the results in the AMP carousel, let’s say it’s a product page of a picture frame that we searched for above, the website loads almost instantaneously. This is because Google has cached the AMP version of the websites which provide AMP valid markup and can show the pages as soon as a user clicks it without the user having to wait.

Search engine optimization is one of the key advantages of AMP, however user experience is also just as important of an advantage. A user browsing the AMP cached version of your site will feel like the pages are loading immediately which leads to higher conversions and more sales.

The good news is that BigCommerce for WordPress ships with AMP by default.

## How to enable AMP

Enabling AMP in the BigCommerce for WordPress plugin is simple. All you need to do is download the [Official AMP Plugin for WordPress](https://wordpress.org/plugins/amp/), noting that its the “official” one by WordPress.com VIP, XWP, and Google.

Once you’ve downloaded the plugin, extract it to the plugins directory of your WordPress install and activate the plugin from WordPress admin.

Alternatively, you can use the WordPress installer to install the Official AMP Plugin for WordPress by clicking Plugins in your WordPress admin sidebar and then Add New. Search for AMP, click Install Now, and then click Activate

Once the plugin is installed and activated, your store will immediately start serving an AMP version of the store when requested.

## WordPress AMP plugin support

The Official AMP Plugin for WordPress is currently at version 0.7.2 and the BigCommerce for WordPress plugin fully supports this version.

Version 1.0 of the Official AMP Plugin for WordPress is due to be released shortly and the great news is that BigCommerce for WordPress already fully supports this version of the AMP plugin. Version 1.0 brings a whole new set of features including the ability to validate AMP inside WordPress and we’re excited to be able to support that with the BigCommerce plugin.

## Choosing an AMP mode

The official AMP Plugin for WordPress plugin allows you to serve AMP pages in 3 different ways. Let’s see what they are and which mode is best suited for you.

### Paired mode (v0.7+)

Paired mode uses your existing theme and through clever sanitization and post CSS processing, the plugin does it’s best to create an AMP valid version of it. Your AMP theme and WordPress theme look extremely similar except they’re just accessed from different URL’s.

In paired mode, there is usually additional development work needed to be done to your theme to make it AMP valid. The Official AMP Plugin for WordPress plugin does a really good job of reducing the size of the CSS and loading only what is needed on the page, but because of 3rd party plugins and custom theme development, you may need to conditionally remove parts of your site when AMP is valid for it to pass validation. The plugin helps you do this and in version 1.0 it has an interface to let you know of any failing AMP validations that need to be fixed.

### Native mode (v0.7+)

Native mode is very much the same as paired mode in terms of rendering, however it will always render the AMP version of the theme. It’s basically always on AMP.

For more technical details on how the 3 modes are differentiated, please check out the [Theme docs for the Official AMP Plugin for WordPress](https://github.com/ampproject/amp-wp/wiki/Adding-Theme-Support).

### Classic mode (v0.1+) - Legacy

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">
    
<!-- theme: warning -->

> Classic is now considered legacy -- Paired and Native are the recommended AMP Plugin modes.

</div>
</div>
</div>

This is the original mode for rendering AMP pages and it renders an AMP theme that is separate and different from your WordPress theme. Think of it as a whole new WordPress theme that is only displayed when the site is being viewed as AMP. The AMP theme is customizable and can be branded to align with your brand.

Generally this mode works out of the box and not much customization is needed to be done to your website for it to be AMP valid, this is because it uses specific a specific AMP valid theme. The draw back being that your website theme is different from the AMP theme.

## Previewing AMP

Once AMP is enabled and you’ve decided on a mode, you will probably want to preview what your site looks like. This is easy to do but depending on the mode you selected, you would need to preview the AMP theme differently.
Classic mode
If you’re running with classic, you can preview the mode in two ways:

1. yourdomain.com/products/product-slug/amp

2. yourdomain.com/products/product-slug/?amp

By visiting any of these two URL’s the AMP version will be shown in a browser.

### Paired Mode
For paired mode, you can only use the ?amp query parameter to show the AMP version in a browser.

`yourdomain.com/products/product-slug/amp`

### Native Mode
As discussed earlier, native mode will always display the AMP version of the theme.

## AMP Tools

There are a number of tools that you can use to help you with AMP development, testing, and maintenance.

### AMP Test
To test if a webpage is AMP valid, you can use the AMP Test tool provided by Google:
https://search.google.com/test/amp

### AMP Validator
The official AMP project provides an AMP validator tool for validating and debugging AMP pages:
https://validator.ampproject.org/

### AMP Validator for Chrome
If you’re using Chrome, there is an AMP Validator extension that allows you to test AMP pages directly while browsing your website:
[https://chrome.google.com/webstore/detail/amp-validator/nmoffdblmcmgeicmolmhobpoocbbmknc?hl=en](https://chrome.google.com/webstore/detail/amp-validator/nmoffdblmcmgeicmolmhobpoocbbmknc?hl=en)

## AMP for SEO

Earlier we talked about how AMP can be beneficial for SEO purposes and driving web traffic to your store. Just by enabling the Official AMP Plugin for WordPress and BigCommerce for WordPress plugins, your AMP pages will automatically get indexed and cached by Google without having to submit or request this from Google. This is because the plugin adds a reference to the AMP page on each canonical web page that has an AMP version.

There is nothing additional that you need to do to get the added SEO benefit from AMP, it’s all handled for you by the plugin and Google crawler.

## Customizing AMP templates

The BigCommerce for WordPress plugin ships with beautifully customized AMP templates that look great. You may however want to customize these AMP templates to be more aligned with your brand.

### Classic Mode
The classic AMP theme can be customized in the WordPress Customizer. Click on `Appearance` on the WordPress Admin menu and then click `Customize`. The WordPress Customizer will then open and you’ll see a panel for AMP. Click `AMP` and then `Design` and from this panel you can change the look and feel.

You may want to go a step further an customize the actual HTML markup and output. This is customized in the same way as the non-AMP BigCommerce templates.

Firstly, create a folder in your theme called `bigcommerce`. In this folder add an additional folder called `amp`. You can now copy and paste any template you would like to override from `bigcommerce/templates/public/amp` in to this folder and modify them. The BigCommerce plugin will look in your theme first for an AMP template before it looks at the template from the plugin.

### Paired and Native Mode

Paired and native mode uses your existing WordPress theme to display. So there is little to no customization needed in terms of the theme layout and branding. You may however want to override the html outputted by the components on a product archive or product page. To do this, you do exactly what you would in classic. Create a folder in your theme called `bigcommerce/amp/components`. In this folder copy and paste any components that you would want to override from the plugin `bigcommerce/templates/public/amp`.
