# Channels, Sites and Routes APIs
<div class="otp" id="no-index">

### On This Page
- [How it Works]("#channels-sites-routes-how")
- [Channels and Listings](#channels-listings)
- [Sites and Routes](#sites-routes)

</div>

---
<a id="channels-sites-routes-how"></a>

BigCommerce's [Channels, Sites and Routes APIs](#) let developers build integrations between BigCommerce and external sales channels. These external channels include a variety of types, including Point of Sale (POS), marketplaces, marketing, CMS platforms, and social platforms.

With Channels, Sites and Routes APIs, developers can quickly create an app that provides merchants with the ability to manage the full experience of selling a product on both BigCommerce and an external platform, from listing products to receiving orders to shipping. They also provide the ability to build apps that help merchants optimize their selling across other services, such as re-pricers and other related services.

Through these integrations, merchants can easily expand where they sell their product catalog online,driving brand recognition, broader shopper reach, and greater merchandising opportunities.

---

## Channels and Listings

The `/channels/` endpoint allows the creations of an external platform on which you can list products beyond the BigCommerce Storefront. Each Channel represents an external platform, site or CMS.

The `/channels/{channelId}/listings` endpoint represents an individual product per channel, allowing you to override fields with different values, whether necessary for merchandising, external channel requirements, enabling a different language, or more.

## Sites and Routes

The endpoint for `/channels/{channel_id}/site` lets you define the external platform for each sales Channel.




