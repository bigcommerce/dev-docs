# Questions
* Will BigDesign and the sample app be available for this?



# Channels SDK

---

The Channel SDK is a set of [APIs](#channel-listings-api), [UI components, patterns](#big-design-ui-components), and [app frameworks](#app-framework) that provides developers with the ability to build integrations between BigCommerce and external sales channels. These external channels include a variety of types, including Point of Sale (POS), marketplaces, marketing, and social, and platforms, such as Facebook, Amazon, eBay, and CMS platforms, like WordPress.

Through these integrations, merchants can easily expand where they sell their product catalog online, driving increased revenue through expanded brand recognition, broader shopper reach, and greater merchandising opportunities.

With the Channel SDK, developers can quickly create an app that provides merchants with the ability to manage the full experience of selling a product on both BigCommerce and an external platform, from listing products to receiving orders to shipping. It also provides the ability to build apps that help merchants optimize their selling across channels, such as re-pricers, and other related services.

---

## Channels SDK Components

<a id="big-design-ui-components"></a>

### Big Design UI components

These reusable components are built to be compatible with BigCommerce design guidelines & color palette, fully flexible, responsive, and accessible. They enable you to create an app that looks and feels native to BigCommerce, which ultimately is less disruptive to a merchant’s workflow, as they are familiar with the experience and navigating much of the app’s functionality. The UI components can be used for any app, not just Channels.

<a id="channel-listings-api"></a>

### Channel & Listing API

These API endpoints allow product data to be managed for specific channels and product listings, rather than just at the BigCommerce product catalog level. This includes overriding fields with different values, whether necessary for merchandising, external channel requirements, enabling a different language, or more.


<a id="app-framework"></a>

## App Framework

Some text here

---

## Building a Channel App

How you build your channel app will depend on what kind of platform / channel you are building for and the functionality that is required or desired. The key, high level steps you need to take are:

1. <a href="#type-of-app">Determine what kind of app you’ll be building</a>
2. <a href="#needed-components">Decide what APIs, patterns, and UI components you’ll need</a>
3. <a href="#building-the-app">Build the app</a>

---

<a id="type-of-app"></a>

## Type of App

Each type of channel app will differ in how it’s built due to the different functionality and requirements needed as a result of:

* What type of channel it is?
* Will the app be in BigCommerce’s Channel Manager or the app marketplace?

The Channel SDK and BigCommerce support a variety of different types of channels, including (but not limited to):

(CM): indicates integration lives in Channel Manager

**External Storefronts**

A platform that enables merchants to power an online storefront outside of BigCommerce for selling their products. Some examples of external storefronts include: 
* [Wordpress](https://wordpress.org/plugins/bigcommerce/)
* [Bloomreach](https://www.bigcommerce.com/solutions/bloomreach/) 
* [Acquia](https://www.bigcommerce.com/acquia/)
* [Drupal](https://www.bigcommerce.com/solutions/drupal/)


**Point of Sale (POS)**

A physical system used by merchants to process transactions, maintain their product catalog, track customers, and more. Examples of ecommerce POS providers include: 
* [Clover](https://www.bigcommerce.com/apps/clover/) - in open beta
* [Hike](https://www.bigcommerce.com/apps/hike-pos)
* [Lightspeed](https://www.bigcommerce.com/apps/lightspeed-retail-pos-connector-by-kosmos-esync/)

**Marketplaces**

A platform on which 3rd parties (merchants) list their catalog and sell their products, with transactions processed by the marketplace platform. Some examples of marketplaces include: 
* Amazon (CM)
* [eBay](https://www.bigcommerce.com/apps/inkfrog-open) (CM)
* Facebook Marketplace (CM)
* Walmart
* Wish

**Marketing**

A platform on which merchants communicate their brand and products with their shopper base, seeking to drive discovery and conversion. Some examples of marketing platforms include: 

* [Google Shopping](https://www.bigcommerce.com/apps/google-shopping-by-sales-orders/) 
* [Facebook Ads](https://www.bigcommerce.com/apps/facebook-ads-by-sales-orders/)

---

<a id="needed-components"></a>

## What Components You Need

The BigCommerce APIs, webhooks, UI components, and patterns that you need to make your channel app will vary depending on the type of channel, functionality, and where the app lives (Channel Manager vs. App Marketplace). 

### APIs and Webhooks
The APIs that you integrate with and how you use them (read only vs. modify) will determine what BigCommerce scopes your app requests when it is installed by a merchant and what endpoints you’ll need to integrate with. 

BigCommerce provides webhooks for 3rd party developers, enabling them to respond in near real-time to events that occur within the BigCommerce system. Depending on the frequency of updates that your channel app needs to manage, you can choose to either poll the API endpoints or integrate with webhooks (recommended if changes happen frequently or have downstream impacts, such as inventory changes that could impact a merchant’s SLA with a marketplace). An overview, tutorial, and all events can be found here.



<a id="building-the-app"></a>

## Building the App

---

## Channel Manager vs. App Marketplace

The BigCommerce Channel Manager and App Marketplace are the two places where channel apps can be discovered and installed by merchants. While there are similar requirements for building an app that will be marketed in either of these two locations, there are unique benefits, requirements, and considerations for apps that are made available in the Channel Manager. 

| Features/ Requirements | Channel Manager | App Marketplace |
| ---| ---| ---|
| Preferred app placement & discovery in the control panel | Yes | No |
| Required to use BigCommerce’s Big Design  UI components | Yes | No|
| Must be express-installable app | Yes | No |
| Must build and submit app according to BigCommerce requirements | Yes | Yes |

### Preferred App Placement in the Control Panel

Currently, certain channel apps, including native BigCommerce apps and specific partner apps, can be found in a merchant’s BigCommerce control panel in the “Channel Manager” section. Partners can work with the BigCommerce team to get strategic placement in this section, enabling merchants to see their specific channel first. Additionally, this discovery takes place in the control panel, which is deeply integrated into all merchants’ day to day workflow; whereas those found in the app marketplace must be found by searching within the app marketplace, which is not natively found in the control panel.

### Must Use Big Design Components

In order to make an app feel and look native to BigCommerce, our Big Design UI components must be used, as they conform to our design and style guidelines. Any app that is in the channel manager must use these in order to maintain consistency with the BigCommerce control panel.

### Must be an Express-Installable App

An express installable app means that all scopes and permissions will be automatically granted to the app when the merchant chooses to install it. This enables a much more seamless installation process, as the merchant has to click fewer times to install the app.

### Must Meet App Requirements

Any app, whether it is in the app marketplace or channel manager,must meet BigCommerce’s [app requirements](https://developer.bigcommerce.com/api-docs/partner/app-store-approval-requirements).



