# Currencies Overview

<div class="otp" id="no-index">

### On this Page
- [Display vs. Transactional](#display-vs-transactional)
- [Pre-Configuring the Store](#pre-configuring-the-store)
- [Adding a Currency](#adding-a-currency)
- [How Currencies Work](#how-currencies-work)
- [Supported Features](#supported-features)
- [Definitions](#definitions)
- [FAQ](#faq)
- [Resources](#resources)

</div>

BigCommerce’s flexible Currency settings assist developers in building Multi-Currency storefronts that empower shoppers and merchants to do business in their currency of choice. Allowing customers to shop and check out in their native currency provides a more consistent and positive shopping experience, and maintaining price expectations throughout the shopping process encourages conversions for merchants.

This article provides a high-level guide to Multi-Currency concepts on BigCommerce as well as specific instructions on [adding currencies](#adding-a-currency) via the control panel. For additional details on how currencies are surfaced throughout BigCommerce APIs, user interfaces, and storefront components, see [How Currencies Works](https://developer.bigcommerce.com/api-docs/catalog/currencies/how-currencies-work)

## Display vs. Transactional

<a id="display-vs-transactional-currencies"></a>

In BigCommerce, there are two types of currency that can be set up: a **display currency** and **transactional currency**.

1. **Display Currency** - When a currency is set to display-only, shoppers in associated countries will see prices on the storefront in that currency, but the actual order will be transacted in the store’s default currency. Shoppers at checkout see the estimated price in the display currency with a note indicating the actual currency and amount to be charged.

2. **Transactional Currency** - When a currency is enabled as transactional, shoppers in associated countries will both see prices on the storefront in that currency and be charged in that currency when they check out.

![Display Currency](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/multi-currency-display-currency.png "Display Currency")

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

<!-- theme: info -->

### Note
> * If the shopper’s card-issuing bank differs from the merchant's bank account country, additional cross-border fees may apply that can change the final settlement amount.
> * You can choose whether a currency should be display-only or transactional when adding or editing a currency.

</div>
</div>
</div>

## Pre-Configuring the Store

<a id="pre-configuring-the-store"></a>

Before setting up multiple currencies on a store, ensure the store is configured as follows:
* Stripe Payment Gateway
* Stencil Theme
* Optimized One-Page Checkout

Additionally, review the [Currency API reference](https://developer.bigcommerce.com/api-reference/store-management/currency-api) to get aquainted with the endpoints and resources related to configuring multiple currencies.

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

<!-- theme: info -->

> Make sure to not change the store’s default currency. This could cause currency to not function properly.

</div>
</div>
</div>

## Adding a Currency

<a id="adding-a-currency"></a>

Transactional currencies can't be created via API just yet, so they'll need to be added via the control panel. To do so:

1. Navigate to **Store Setup > Currencies**, then select **Add a Currency...**
2. Select the currency code that corresponds to the currency you want to set up, then click Next.
3. Configure the currency’s display and transactional settings.
4. Click **Save**.

For more in-depth instructions and helpful screenshots, see [Adding a Currency](https://support.bigcommerce.com/s/article/Managing-Currencies-Beta#add) in the Help Center.

<div class="HubBlock--callout">
<div class="CalloutBlock--error">
<div class="HubBlock-content">

<!-- theme: error -->

### Note
> Do not change the default currency -- this may lead to unintended currency conversion issues.
For instance, changing the default currency will not trigger price recalculation for the catalog.
Additionally, changing the default currency will enable the newly assigned currency as transactional.


</div>
</div>
</div>

## How Currencies Work

<a id="how-currencies-work"></a>

For details on how currencies are surfaced throughout BigCommerce APIs, user interfaces, and storefront components, see [How Currencies Works](https://developer.bigcommerce.com/api-docs/catalog/currencies/how-currencies-work)

## Supported Features

<a id="supported-features"></a>

See the table below for a list of supported and un-supported features.

| Supported                                    | Not Supported                                  |
|----------------------------------------------|------------------------------------------------|
| Optimized One-Page Checkout                  | Legacy Checkout                                |
| Stencil Themes                               | Legacy Blueprint Themes                        |
| Stripe Payment Gateway                       | Other Payment Gateways                         |
| Store credit in default currency             | Store credit in display currencies             |
| Customer group discounts in default currency | Customer group discounts in display currencies |
| Discounts created through Promotions         | Legacy coupon codes                            |
| Storefront Elasticsearch                     |                                                |
| Storefront product filtering                 |                                                |

## Definitions

<a id="definitions"></a>

| Name | Description |
| -- | -- |
| Default Currency | Store's default currency is the one from which any auto-conversion of pricing (product, tax, shipping, promotions) will happen.|
| Display Currency | Currency that is displayed on the storefront. This might or might not mean that shopper can actually transact in that currency. Display currency is also often called "presentment currency" in the payments industry. |
| Transactional Currency | Transactional currency is what currency and amount BC passes to the payment provider and the currency/amount that the shopper will be charged to their bank account. If there's a discrepancy between the storefront display currency and the transactional currency, a shopper has to pay a conversion fee and the conversion rate that will be used will be outside of BC's purview. |
| Settlement Currency | This is the currency in which the merchant gets paid out to their bank account. If there's a discrepancy between the currency that shopper transacts in and the currency in which merchant settles, merchant has to pay a conversion fee and the conversion rate used will be outside of BC's purview. Merchant is able to set their settlement currency through their payment provider. |
|BigCommerce Conversion Rate | Any conversion rate set on BigCommerce used to convert product’s default currency pricing into a new non-default currency. Conversion rate could be static or dynamic. |
| Static Conversion Rate | One of the two auto-converted pricing options. If a merchant manually enters a static conversion rate, then the conversion rate will remain the same until/unless merchant updates their currency settings to use a different conversion rate. The advantage of using this method is to avoid constantly fluctuating price in non-default currencies. |
| Dynamic Conversion Rate | One of the two auto-converted pricing options. If a merchant selects a dynamic conversion rate, they've tied themselves to a currency conversion service, which will update the conversion rate at a certain frequency. This helps shopper-facing pricing remain most aligned to the store's default currency and keeps non-default currency conversion rate at market rate. Merchant can either use BigCommerce Currency Service provided in the Currency setup page, or they can use API to automatically update the exchange rate from their trusted source. |
| Bank Conversion Rate | Conversion rate used by merchant’s or shopper’s payment or credit card provider when auto-converting from store’s transactional currency. This rate might not align to the BC conversion rate and BC has no visibility into it. |
| Multi Currency Pricing | Rather than opting for auto-converting product pricing from default currency using BC conversion rate, merchant has a choice to set price per product per currency. This will be implemented through price lists. |

## FAQ

<a id="faq"></a>

**Do Multi-Currency settings work with the Checkout SDK?**
The Checkout SDK works with multi-currency. There is no additional setup needed for the SDK.
After setting up currency in the Control Panel the SDK will work as normal.

**Do my theme customizations work with Multi-Currency Settings?**
If the theme is setup to show the currency on the storefront there should be no issues. Please see your
theme developer if that is not the case.

**Can shoppers still select a currency?**
Shoppers will still be able to select their currency of choice on the storefront. This will depend on the stores themes and customizations.

**Will my analytics show in the transactional or display currency?**
Analytics shows an approximate price in the store's default currency. This is based on the configured exchange rate. There is no
abandoned cart analytics or web analytics such as Google Analytics. Currently it does not break down analytics by currency.

**How can I setup settlement currencies in Stripe?**
Please reach out to Stripe for more information on setting up the account.
[Supported Settlement Currencies](https://stripe.com/docs/connect/payouts#supported-settlement) (Stripe Documentation)

## Resources

<a id="resources"></a>

- [How Currencies Works](https://developer.bigcommerce.com/api-docs/catalog/currencies/how-currencies-work)
- [Currency API](https://developer.bigcommerce.com/api-reference/store-management/currency-api)
- [Price List API](https://developer.bigcommerce.com/api-reference/catalog/pricelists-api)
- [Using Price Lists](https://support.bigcommerce.com/s/article/Price-Lists) (BigCommerce Knowledge Base)
- [Managing Currencies](https://support.bigcommerce.com/s/article/Managing-Currencies-Beta) (BigCommerce Knowledge Base)
- [Tax](https://support.bigcommerce.com/s/article/Manual-Tax-Setup#intro1) (BigCommerce Knowledge Base)

### Additional Resources

- [Supported Currencies](https://stripe.com/docs/currencies) (Stripe Documentation)
- [Supported Settlement Currencies](https://stripe.com/docs/connect/payouts#supported-settlement) (Stripe Documentation)
