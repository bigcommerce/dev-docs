# BigCommerce Channels Overview

<div class="otp" id="no-index">

### On this page
- [Channels Toolkit](#channels-toolkit)
- [Channel Apps](#channel-apps)
  - [Discovery](#discovery)
  - [Display](#display)
  - [Note](#note)
  - [Management](#management)
- [Types of Channels](#types-of-channels)
  - [Storefront](#storefront)
  - [Point of Sale (POS)](#point-of-sale-pos)
  - [Marketplaces](#marketplaces)
  - [Marketing](#marketing)
- [Building a Channel App](#building-a-channel-app)
  - [Getting Started](#getting-started)
  - [Building the App](#building-the-app)
- [Related resources](#related-resources)

</div>

BigCommerce’s Channel Manager is the central place for merchants to discover, connect to, and manage their sales channels, including external channels like eBay, Amazon, Facebook, and Instagram. These external sales channels can extend the merchant's control panel experience in a number of ways, such as pushing orders from these external channels into the control panel alongside their BigCommerce storefront orders, allowing them to be fulfilled in the same way, and managing products on these channel from within the control panel in many of the same ways as they do for their BigCommerce storefronts.

Using BigCommerce’s [Channels Toolkit](https://developer.bigcommerce.com/api-docs/channels/channels-toolkit-reference), any BigCommerce [partner](https://www.bigcommerce.com/partners/) can create and list a sales channel app on BigCommerce's [App Marketplace](https://www.bigcommerce.com/apps/) for any merchant to install. Additionally, approved apps developed by [select partners](https://www.bigcommerce.com/partners/) are marketed and discoverable from within the Channel Manager in every BigCommerce store's control panel.

This article provides a high-level overview of channels and channel apps on BigCommerce and introduces BigCommerce's channels toolkit. For an in-depth technical guide to developing BigCommerce sales channel apps, see [Building Channel Apps](https://developer.bigcommerce.com/api-docs/channels/building-channel-apps).

## Channels Toolkit

The Channels Toolkit is a set of APIs, UI components, and patterns that provide partners and third-party developers with the ability to build integrations between BigCommerce and external sales channels. Currently, we consider sales channels to fall into 4 major groups:
* Point-of-sale (POS) systems
* Storefronts
* Online marketplaces
* Marketing platforms (including social networking sites)

With the Channels Toolkit, developers can quickly create an app that provides merchants the ability to manage the full experience of selling a product on both BigCommerce and an external platform, from listing products and running campaigns to receiving orders and fulfilling them . It also provides the ability to build apps that help merchants optimize their selling across channels, such as re-pricers and other related services.

While external channel integrations were possible to build by third parties previously, the BigCommerce’s Channels Toolkit provides additional capabilities that extend the functionality a third party can offer to merchants, and the value that third parties can get from providing such integrations via BigCommerce.

* **Big Design UI components** - These reusable components are built to be compatible with BigCommerce design guidelines & color palette, fully flexible, responsive, and accessible. They enable you to create an app that looks and feels native to BigCommerce, which ultimately allows merchants to scale their business as they can focus more on selling products and less on learning a new workflow every time they extend their offerings. BigDesign also enables you, as a technology partner, to launch your app more quickly, as it provides the building blocks and components needed to create a user experience. These components can be used for any type of app, not just channels.

* **Channels & Listings API Endpoints** - These API endpoints allow product data to now be managed for specific channels and product listings, rather than just at the BigCommerce product catalog level. This includes overriding fields with different values, whether necessary for merchandising, external channel requirements, enabling a different language, or more. They also provide merchants with greater flexibility in creating differentiated shopping experiences, as they can track and analyze how their products are performing for each individual sales channel.

* **Channel specific catalog  management in the control panel** - Previously, all functionality for creating and managing listings could only be  supported within the app itself. Via new API endpoints and how these APIs integrate with the control panel, BigCommerce now supports the ability for merchants to list and manage products from within the native BigCommerce control panel. Not only does this provide workflow improvements for merchants, but it enables partners to build more robust and complex integrations for external channels, as they are able to retrieve any channel and listing data that is relevant to a store.

For a comprehensive list of channel app development tools, see the [Channels Toolkit Reference](https://developer.bigcommerce.com/api-docs/channels/channels-toolkit-reference).

## Channel Apps

BigCommerce channel apps allow merchants to list products on external sales channels like point-of-sale devices, online marketplaces, marketing platforms, and social networking sites. Using BigCommerce's [Channels Toolkit](https://developer.bigcommerce.com/api-docs/channels/channels-toolkit-reference), developers can create channel apps that integrate with virtually any platform. Once published and approved, these apps are discoverable on [BigCommerce's App Marketplace](https://www.bigcommerce.com/apps/) for merchants to install. Additionally, approved apps developed by [select partners](https://www.bigcommerce.com/partners/) are marketed within the Channel Manager in every BigCommerce store's control panel.

### Discovery

**How do merchants discover channel apps?**

Via the [Apps Marketplace](https://www.bigcommerce.com/apps/) (the standard for apps of all types).

![App Marketplace](https://storage.googleapis.com/bigcommerce-production-dev-center/images/channels/channels-marketplace.png "App Marketplace")

Or, through the Channel Manager (select partners).

![Channel Manager](https://storage.googleapis.com/bigcommerce-production-dev-center/images/channels/channels-create-new-all-types.png "Channel Manager")

### Display

How do channels show up in Channel Manager? Our goal is to make it as easy as possible for merchants to manage and scale up their sales channels. As a result, we’ve made it possible for merchants to manage any of their sales channels, regardless of where they are marketed and discoverable, from a single source - the Channel Manager.

We enable this through our Channels API endpoints:
* Allowing any  app that is granted permission by the merchant during install process to create a channel.
* After an app creates a channel, the channel they create appears in the list of connected channels on the main manage screen of Channel Manager.

![Channels in Channel Manager](https://storage.googleapis.com/bigcommerce-production-dev-center/images/channels/channels-channel-overview.png "Channels in Channel Manager")

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

<!-- theme: info -->

### Note
> * BigCommerce has control of which platforms and types are available to create. It is currently a manual process to add new platforms. A channel instance can be only 1 type; however, a channel app can register multiple different channels.
> * For Channel Apps that are strategically approved ([select partners](https://developer.bigcommerce.com/api-docs/partner/becoming-a-partner)), the app appears as an option when adding a new channel. This starts the app install process.

</div>
</div>
</div>

### Management

Once installed, merchants manage channel apps via Channel Manager in the control panel. This includes status and key channel settings surfaced by channel apps via Channels API endpoints.

![Edit Channel Settings](https://storage.googleapis.com/bigcommerce-production-dev-center/images/channels/channels-edit-settings.png "Edit Channel Settings")

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> **Note**
>
> Apps provided by partners who don't use the Channel API will only appear in the App Marketplace and **My Apps**.

</div>
</div>
</div>

On the view products page, Merchants can list products on any installed channel that supports per-product listing capabilities.

![List Product](https://storage.googleapis.com/bigcommerce-production-dev-center/images/channels/channels-view-products.png "List Product")

Merchants can also list products from the product edit page.

![Manage Channel Assignment](https://storage.googleapis.com/bigcommerce-production-dev-center/images/channels/channels-all-assignments.png "Manage Channel Assignment")

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> **Note**
>
> Not all channel apps can or should support per product listing capabilities; determining if this functionality is appropriate and useful is up to the app developer.

</div>
</div>
</div>

## Types of Channels
You can use the toolkit to build channel apps for all types of channels.

### Storefront

A platform that enables merchants to power an online storefront outside of BigCommerce for selling their products. The fundamentals and core technology driving the Channels Toolkit for Storefronts is also what powers internal BigCommerce storefronts.

**Examples:**
* WordPress
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
A platform where merchants list their catalog and sell their products, with transactions processed by the marketplace platform.

**Examples**:
* Amazon
* eBay
* Facebook Marketplace
* Jet
* Walmart

### Marketing
A platform on which merchants communicate their brand and products with their shopper base, seeking to drive discovery and conversion. These channels don't support checkout directly.

**Examples**:
* Facebook Ads
* Google Shopping
* WordPress Blog
* Pinterest
* Instagram

## Building a Channel App
Any partner can build a channel app on BigCommerce.

**All Partners**
* More seamless integration within the BigCommerce control panel that looks and feels native due to following BC patterns & being more deeply integrated within core parts of the BC control panel
* Increased functionality that gives greater flexibility in building robust sales channel apps, which hopefully increases adoption and revenue

**Select Partners**
* Merchant marketing and discovery within the Channel Manager
* Ability to be promoted more highly within the Channel Manager “Add New Channel” section
* Ability to be promoted within control panel dashboard

### Getting Started
If you're not already a partner and familiar with the BigCommerce APIs and tools you need to get started, you'll need to:
1. [Become a partner](https://developer.bigcommerce.com/api-docs/partner/becoming-a-partner)
2. [Get acquainted with our APIs](https://developer.bigcommerce.com/api-docs/getting-started/about-our-api)
3. Sign up for developer account
4. Start a free trial

### Building the App
Once you're ready to get started developing the Channel App, see [Building Channel Apps](https://developer.bigcommerce.com/api-docs/channels/building-channel-apps) for a comprehensive guide.

## Related resources

### Articles
* [Building Channels Quick Start](https://developer.bigcommerce.com/api-docs/channels/quick-start)

<!--stackedit_data:
eyJoaXN0b3J5IjpbNzMwOTk4MTE2XX0=
-->
<!--stackedit_data:
eyJoaXN0b3J5IjpbODgxMjY3NTkxLC04OTM4NTIxODMsNzMwOT
k4MTE2XX0=
-->