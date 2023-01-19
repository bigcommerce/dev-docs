# Buy Online Pick Up in Store (BOPIS)

<div class="otp" id="no-index">

### Table of contents

- [Preface](#preface)
- [Introduction](#introduction)
- [Shopper experience](#shopper-experience)
- [Merchant experience](#merchant-experience)
- [Frequently asked questions (FAQ)](#frequently-asked-questions)
- [Glossary](#glossary)

</div>

---

## Preface

Before you begin consuming this API doc, we want to take the time, upfront, to say a BIG thank you.

- Thank you for partnering with us.
- Thank you for all the time you will put aside to participate in the Open Beta process.
- And thank you for your continued trust in us to take your business forward.

This doc is designed to give you the ability to, through BigCommerce's APIs, implement end-to-end Buy Online Pick Up in Store (BOPIS) customized experiences for our joint merchants and their end customers (the shopper).

We hope you enjoy what you see, and we look forward to your feedback.

\- BigCommerce Team 

---

## Introduction

The primary focus of this doc is to develop new API endpoints and enhance existing endpoints so that you can easily unlock the use cases for Buy Online Pickup In Store (BOPIS), also known as Click & Collect, via our APIs.

When we think about BOPIS, 4 primary users come to mind:

- The **shopper** (interacting with the storefront, cart & checkout)
- The **merchant** (managing back-office operations, e.g. locations, inventory, pickup methods, catalog & orders)
- The **agency partner** (that implements the project/integrations)
- The **technology partner** (e.g. ERP, OMS, IMS, listing marketplace, etc) that the merchant uses)

There's a relationship amongst all of these users. **Back-office components** (like location and inventory data) may be stored on **partner solutions** (which serve as the source of truth) and exposed on the **storefront** (via Storefront GraphQL) & **Checkout** (via the Checkout API) to enable **partners** (like yourself) to create **BOPIS experiences** (e.g. store locator widgets) for the end customer (the shopper).

If we bring this all together in a visual, we believe it looks something like this:

<!--  inline: true -->
![BOPIS APIs.png](https://storage.googleapis.com/bigcommerce-production-dev-center/images/BOPIS%20APIs.png)

In the above diagram you'll see two coloured symbols:

- Purple - This represents that the API endpoint will be **updated** to support Buy Online Pick Up in Store (BOPIS).
- Aqua - This represents that the API endpoint is **new** and has been **introduced** to support Buy Online Pick Up in Store (BOPIS).

## Shopper experience
The shopper is the end-customer on the retailer's (merchant's) site, wanting to make a purchase.

We have updated 4 key resources to equip you with the ability to create your own custom shopper-facing BOPIS experiences:

- **Storefront GraphQL**
  - Inventory and Location information can be queried through using the GraphQL Storefront API.
- **Storefront API**
  - We have leveraged our **Checkout API's** existing consignment model and extended it by introducing a pickup fulfillment type in addition to the existing shipping fulfillment type.
  - We have added a **Pickup Options** storefront API that provides a way to search for available pickup options near provided coordinates.
- **Checkouts V3 (Server to Server)**
  - The pickup in store functionality will behave the same way as in our Storefront Checkouts API, i.e. Checkouts V3 is a server to server API. The pickup in store functionality will work the same way as the Storefront Checkouts API. 
- **Checkout SDK**
  - The Checkout SDK is powered by our Storefront Checkouts API, so any updates made to the Storefront Checkouts API will also be reflected in the SDK.

Developers customizing themes will be familiar with **Stencil Handlebars**. There will be no explicit updates made to handlebars. However, GraphQL can be used to define your own resources within the theme, which will inform handlebars.

<!--  inline: true -->
![BOPIS Storefront APIs.png](https://storage.googleapis.com/bigcommerce-production-dev-center/images/BOPIS%20Storefront%20APIs.png)

## Merchant experience
The merchant is the retailer who has a BigCommerce store and wants to sell online.

The primary target segment that will require these APIs are Mid-Market and Enterprise merchants that have in-house IT teams or work with agency partners to connect BigCommerce to external partner systems (e.g. ERP, OMS, IMS). To achieve this we've updated 2 existing endpoints and introduced 3 new endpoints:

- **Orders API**
  - We have introduced a new sub-resource, Order Consignments.
  - We have updated the existing Order sub-resources to enable BOPIS.
- **Catalog API**
  - Please note: There will be a breaking change when you begin consuming the new **Inventory API**.
    - The current Catalog API supports rudimentary inventory concepts within it today (`inventory_level`, `inventory_warning_level`, `inventory_tracking`).
    - Once you update to consume the new **Inventory API**, management of inventory via the Catalog API will cease. All inventory management will occur through the Inventory API.
- **Inventory API**
  - The new API Resource exposes location-aware, item-level inventory data and will allow developers to create BigCommerce apps and in-house API driven solutions that:
    - Track inventory across multiple locations
    - Display location-level inventory to shoppers
    - Provide multi-location fulfillment options
    - Facilitate BOPIS
    - Manage order fulfillment, post checkout
- **Locations API**
    - This new API Resource allows you to create new locations for your inventory.
- **Pickup Methods API**
  - This new API Resource is used to enable locations for pickup, and the options shoppers have for picking up their orders.
<!--  inline: true -->
![BOPIS Management APIs.png](https://storage.googleapis.com/bigcommerce-production-dev-center/images/BOPIS%20Management%20APIs.png)



## Frequently asked questions

[Click here to view the FAQ.](/docs/additional-reading/faq.md)

## Glossary

[Click here to view the glossary.](https://bigcommerce.stoplight.io/docs/api-beta-buy-online-pick-up-in-store/api-docs/glossary)
