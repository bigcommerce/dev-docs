# BigCommerce Channels Overview

<div class="otp" id="no-index">

### On this Page
- [Channels Toolkit](#channels-toolkit)
- [Channel Apps](#channel-apps)
- [Types of Channels](#types-of-channels)
- [Building a Channel App](#building-a-channel-app)
- [Resources](#resources)

</div>

BigCommerce's Channel Manager lets merchants connect to external sales channels like eBay, Amazon, Facebook, and Instagram. Orders from these external channels appear in a merchant's BigCommerce control panel alongside their BigCommerce storefront orders and are fulfilled in the same way. Using BigCommerce's [Channels Toolkit](https://developer.bigcommerce.com/api-docs/channels/channels-toolkit-reference), any BigCommerce [partner](https://www.bigcommerce.com/partners/) can create and list a channel app on BigCommerce's [App Marketplace](https://www.bigcommerce.com/apps/) for any merchant to install. Additionally, approved apps developed by [select partners](https://www.bigcommerce.com/partners/) are listed in the Channel Manager in every BigCommerce store's control panel.

This article provides a high-level overview of channels and channel apps on BigCommerce and introduces BigCommerce's channels toolkit. For an in-depth technical guide to developing BigCommerce channel apps, see [Building Channel Apps](https://developer.bigcommerce.com/api-docs/channels/building-channel-apps).

## Channels Toolkit

The Channels Toolkit is a set of APIs, UI components, patterns, and app frameworks that provide partners and 3rd party developers with the ability to build integrations between BigCommerce and external sales channels. These external channels include a variety of types, including Point-of-sale systems, online marketplaces, marketing platforms, and social networking sites.

With the Channels Toolkit, developers can quickly create an app that provides merchants the ability to easily manage the full experience of selling a product on both BigCommerce and an external platform, from listing products to receiving orders to shipping. It also provides the ability to build apps that help merchants optimize their selling across channels, such as re-pricers, and other related services.

While external channel integrations were possible to build by 3rd parties previously, the BigCommerce's Channels Toolkit provides additional functionality that extends the functionality a 3rd party can offer to merchants and the value that 3rd parties can get from providing such integrations via BigCommerce.

* **Big Design UI components** - These reusable components are built to be compatible with BigCommerce design guidelines & color palette, fully flexible, responsive, and accessible. They enable you to create an app that looks and feels native to BigCommerce, which ultimately is less disruptive to a merchant’s workflow, as they are familiar with the experience and navigating much of the app’s functionality. Note: these can be used for any type of app, not just channels.
* **Channels & Listings API Endpoints** - These API endpoints allow product data to now be managed for specific channels and product listings, rather than just at the BigCommerce product catalog level. This includes overriding fields with different values, whether necessary for merchandising, external channel requirements, enabling a different language, or more.
* **Channel Specific Catalog management in the Control Panel** - Previously, all functionality for creating and managing listings must have been supported within the app itself. Via new API endpoints, BigCommerce now supports the ability for merchants to list and manage products from within the native BigCommerce control panel. Not only does this provide workflow improvements for merchants, but it enables partners to build more robust and complex integrations for external channels, as they are able to retrieve any channel and listing data that is relevant to a store.

For a comprehensive list of channel app development tools, see the [Channels Toolkit Reference](https://developer.bigcommerce.com/api-docs/channels/channels-toolkit-reference).

## Channel Apps

BigCommerce Channel Apps allow merchants to list products on external sales channels like Point-of-Sale devices, online marketplaces, marketing platforms, and social networking sites. Using BigCommerce's [Channels Toolkit](), developers can create channel apps that integrate with virtually any platform. Once published and approved, these apps are listed on [BigCommerce's App Marketplace]() for merchants to install. Additionally, approved apps developed by [select partners](https://www.bigcommerce.com/partners/) are listed within the Channel Manager in every BigCommerce store's control panel.

### Discovery

**How do merchants discover channel apps?** Via the App Marketplace (the standard for apps of all types):

![App Marketplace](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/channels-overview-01.png "App Marketplace")

Or, through Channel Manager (select partners):

![Channel Manager](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/channels-overview-02.png "Channel Manager")

### Display

**How do channels show up in Channel Manager?**
* Via channels api endpoints
* any app that is granted permission by the merchant during install process can choose to create a Channel.
* After an app creates a channel, the channel they create will show in the list of connected channels on the first screen of the Channel Manager.

![Channels in Channel Manager](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/channels-overview-03.png "Channels in Channel Manager")

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

<!-- theme: info -->

### Note
> * BigCommerce has control of which platforms and types are available to create. It is currently a manual process to add new platforms. A channel can be only 1 type.
> * For Channel Apps that are strategically approved (select partners), the app will show as an option when adding a new channel. This will start the app install process.

</div>
</div>
</div>

### Management

Once installed, merchants manage channel apps via Channel Manager in the control panel -- this includes status and key channel settings surfaced by channel apps via Channels API endpoints:

![Channel Management](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/channels-overview-04.png "Channel Management")

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

<!-- theme: info -->

### Note
> * Partners who don't use the Channel API will only be in the App Marketplace and in **My Apps**.

</div>
</div>
</div>

From within the list of all their products, a merchant can select one or more products to be listed for sale on any of the channels that have been created via the API or within the Channel Manager if the Channel supports per-product listing capabilities:

![Channel Listing Settings](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/channels-overview-05.png "Channel Listing Settings")

While managing their product details, merchants will be able to select which channels the product should be listed for sale on:

![Product Details Channel Settings](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/channels-overview-06.png "Product Details Channel Settings")

When a Channel is selected, a selection of fields that have been designated by the channel to be editable will surface. Editing these will override core product details. Also, additional fields can be defined by the Channel that are not in our Catalog model. "Battery Size", for example. This is important for Marketplace channels.

![Channel Settings](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/channels-overview-07.png "Channel Settings")

## Types of Channels
The toolkit can be used to build channel apps for all types of channels...

### Storefront
A platform that enables merchants to power an online storefront outside of BigCommerce for selling their products. This is also used for internal BigCommerce storefronts.

**Examples:**
* Wordpress
* Bloomreach
* Acquia
* Drupal

### Point of Sale (POS)
A physical system used by merchants to process transactions, maintain their product catalog, track customers, and more.

**Examples**:
* Springboard
* Bindo
* Vend

### Marketplaces
A platform on which 3rd parties (merchants) list their catalog and sell their products, with transactions processed by the marketplace platform.

**Examples**:
* Amazon
* eBay
* Facebook Marketplace
* Jet
* Walmart

### Marketing
A platform on which merchants communicate their brand and products with their shopper base, seeking to drive discovery and conversion. These channels do not support checkout directly.

**Examples**:
* Facebook Ads
* Google Shopping
* WordPress blog
* Pinterest
* Instagram

## Building a Channel App
Any partner can build a channel app on BigCommerce....

**All Partners**
* More seamless integration within the BigCommerce control panel that looks and feels native due to following BC patterns & being more deeply integrated within core parts of the BC control panel
* Increased functionality that gives greater flexibility in building robust sales channel apps, which hopefully increases adoption and revenue

**Select Partners**
* Merchant marketing and discovery within the Channel Manager
* Ability to be promoted more highly within the Channel Manager “Add New Channel” section
* Ability to be promoted within control panel dashboard

### Getting Started
First, if you're not already a partner and familiar with BigCommerce APIs and tools get started by...
* become a partner
* get aquainted with our apis
* signup for dev account
* free trial / sandbox

### Building the App
Once you're ready to get started developing the Channel App, see [Building Channel Apps](https://developer.bigcommerce.com/api-docs/channels/building-channel-apps) for a comprehensive guide.

## Resources
* [Building Channel Apps](https://developer.bigcommerce.com/api-docs/channels/)
* [Channels Toolkit Reference](https://developer.bigcommerce.com/api-docs/channels/)
* [Channel App Best Practices](https://developer.bigcommerce.com/api-docs/channels/)
* [Channel App Requirements](https://developer.bigcommerce.com/api-docs/channels/)

<!--stackedit_data:
eyJoaXN0b3J5IjpbNzMwOTk4MTE2XX0=
-->
<!--stackedit_data:
eyJoaXN0b3J5IjpbODgxMjY3NTkxLC04OTM4NTIxODMsNzMwOT
k4MTE2XX0=
-->