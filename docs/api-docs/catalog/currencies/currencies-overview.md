# Currencies Overview

<div class="otp" id="no-index">

### On this Page
- [Display vs. Transactional](#display-vs-transactional)
- [Pre-configuring the store](#pre-configuring-the-store)
- [Adding a currency](#adding-a-currency)
- [How currencies work](#how-currencies-work)
- [Supported features](#supported-features)
- [Definitions](#definitions)
- [FAQ](#faq)
- [Resources](#resources)

</div>

BigCommerce’s flexible Currency settings assist developers in building Multi-Currency storefronts that empower shoppers and merchants to do business in their currency of choice. Allowing customers to shop and check out in their native currency provides a more consistent and positive shopping experience, and maintaining price expectations throughout the shopping process encourages conversions for merchants.

This article provides a high-level guide to Multi-Currency concepts on BigCommerce as well as specific instructions on [adding currencies](#adding-a-currency) via the control panel. For additional details on how you can surface currencies throughout BigCommerce APIs, user interfaces, and storefront components, see [How Currencies Works](https://developer.bigcommerce.com/api-docs/catalog/currencies/how-currencies-work).

## Display vs. Transactional

<a id="display-vs-transactional-currencies"></a>

In BigCommerce, you can set up two types of currency: a **display currency** and **transactional currency**.

1. **Display Currency** - When you set the currency to display-only, shoppers in associated countries will see prices on the storefront in that currency; but the transaction of the actual order is in the store’s default currency. Shoppers at checkout see the estimated price in the display currency with a note indicating the actual currency and charge amount.

2. **Transactional Currency** - When you enable a currency as transactional, shoppers in associated countries will see both prices on the storefront in that currency and the charge amount in that currency when they check out.

![Display Currency](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/multi-currency-display-currency.png "Display Currency")

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

<!-- theme: info -->

### Note
> * If the shopper's card-issuing bank differs from the merchant's bank account country, additional cross-border fees may apply that can change the final settlement amount.
> * You can choose whether a currency should be display-only or transactional when adding or editing a currency.

</div>
</div>
</div>

## Pre-configuring the Store

<a id="pre-configuring-the-store"></a>

Before setting up multiple currencies on a store, ensure to configure the store as follows:
* Stripe Payment Gateway
* Stencil Theme
* Optimized One-Page Checkout

Additionally, review the [Currency API reference](https://developer.bigcommerce.com/api-reference/store-management/currency-api) to get acquainted with the endpoints and resources related to configuring multiple currencies.

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

<!-- theme: info -->

> Make sure not to change the store’s default currency. This change could cause currency to not function properly.

</div>
</div>
</div>

## Adding a currency

<a id="adding-a-currency"></a>

Transactional currencies can't be created via API just yet, so you will need to add them via the control panel. To do so:

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

## How currencies work

<a id="how-currencies-work"></a>

For details on how to surface currencies throughout BigCommerce APIs, user interfaces, and storefront components, see [How Currencies Works](https://developer.bigcommerce.com/api-docs/catalog/currencies/how-currencies-work).

## Supported features

<a id="supported-features"></a>

See the table below for a list of supported and unsupported features.

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
| Display Currency | Store's display currency is when a merchant displays prices in a currency on a storefront in which the shopper might or might not use to perform a transaction. Display currency is also often called "presentment currency" in the payments industry. |
| Transactional Currency | Transactional currency is what currency and amount BC passes to the payment provider and the currency/amount charged to a shopper's bank account. If there's a discrepancy between the storefront display currency and the transactional currency, a shopper has to pay a conversion fee and the conversion rate used is outside of BC's purview. |
| Settlement Currency | Settlement currency is when the merchant gets paid out to their bank account. If there's a discrepancy between the currency that a shopper transacts in and the currency in which a merchant settles, the merchant has to pay a conversion fee, and the conversion rate used is outside of BC's purview. The merchant can set their settlement currency through its payment provider. |
|BigCommerce Conversion Rate | Any conversion rate set on BigCommerce to convert product’s default currency pricing into a new non-default currency. The conversion rate could be static or dynamic. |
| Static Conversion Rate | One of the two auto-converted pricing options. If a merchant manually enters a static conversion rate, the conversion rate will remain the same until/unless the merchant updates their currency settings to use a different conversion rate. The advantage of using this method is to avoid constantly fluctuating prices in non-default currencies. |
| Dynamic Conversion Rate | One of the two auto-converted pricing options. If a merchant selects a dynamic conversion rate, they've tied themselves to a currency conversion service, which will update the conversion rate at a certain frequency. This option helps shopper-facing pricing remain most aligned to the store's default currency and keeps non-default currency conversion rate at market rate. Merchants can use BigCommerce Currency Service provided in the Currency setup page, or they can use API to update the exchange rate automatically from their trusted source. |
| Bank Conversion Rate | Conversion rate is used by merchants' or shoppers' payment or credit card providers when auto-converting from store's transactional currency. This rate might not align with the BC conversion rate, and BC has no visibility into it. |
| Multi Currency Pricing | Rather than opting for auto-converting product pricing from default currency using BC conversion rate, the merchant has a choice to set price per product per currency. You can implement Multi Currency Pricing through price lists. |

## FAQ

<a id="faq"></a>

**Do Multi-Currency settings work with the Checkout SDK?**
The Checkout SDK works with multi-currency. There is no additional setup needed for the SDK.
After setting up the currency in the Control Panel, the SDK will work as normal.

**Do my theme customizations work with Multi-Currency Settings?**
If you set up the theme to show the currency on the storefront, there should be no issues. Please see your
theme developer if that is not the case.

**Can shoppers still select a currency?**
Shoppers are always able to select their currency of choice on the storefront. The selection depends on the store's themes and customizations.

**Will my analytics show in the transactional or display currency?**
Analytics show an approximate price in the store's default currency. The configured exchange rate determines the approximate price. There is no
abandoned cart analytics or web analytics such as Google Analytics. Currently, it does not break down analytics by currency.

**How can I set up settlement currencies in Stripe?**
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

### Additional resources

- [Supported Currencies](https://stripe.com/docs/currencies) (Stripe Documentation)
- [Supported Settlement Currencies](https://stripe.com/docs/connect/payouts#supported-settlement) (Stripe Documentation)
