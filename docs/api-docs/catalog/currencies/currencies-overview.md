# Managing Currencies

<div class="otp" id="no-index">

### On this Page
- [Multi-Currency Beta](#multi-currency-beta)
- [Display vs. Transactional Currencies](#display-vs-transactional-currencies)
- [Pre-Configuring the Store](#pre-configuring-the-store)
- [Adding a Currency](#adding-a-currency)
- [How Multiple Currencies are Surfaced](#how-multiple-currencies-are-surfaced)
- [Current Limitations](#current-limitations)
- [Definitions](#definitions)
- [FAQ](#faq)
- [Resources](#resources)

</div>

BigCommerce's currency settings allow developers to build multi-currency storefronts. The amount and currency the shopper sees in catalog, cart and checkout pages is the amount and currency we pass to the payment provider.

With the introduction of Multi-Currency settings, BigCommerce now supports both transactional and display-only currencies. The currency and amount sent to he payment provider depends on whether the currency is transactional or display-only. By using multiple transactional currencies, merchants can allow shoppers to transact in a currency of their preference, which helps shoppers knows exactly how much they’ll be charged at checkout.

---

## Multi-Currency Beta
Multiple transactional currencies is now available as an opt-in feature on all stores. In the control panel, go to **Store Setup** › **Currencies** and click the *Try it now** button under the Early Access opt-in notice.

![titled](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/multi-currency-try-it-now.png "title")

To use multiple transactional currencies, the store must:

* be using a Stencil theme.
* be using the Optimized One-Page Checkout type.
* have Stripe payment gateway set up and enabled (your store's default currency can use any gateway).

Currently, Stripe cannot be enabled for a specific currency (it is also enabled for the default currency). This is a known issue and will be fixed in a later release.
Automatic tax calculation and document submission is compatible with multiple currencies. However, the application of automatic tax depends on the countries supported by the tax provider.

Some BigCommerce features do not yet support multiple transactional currencies, including:

* Blueprint themes
* Legacy checkout
* Coupon Codes
* Draft orders
* Storefront product filtering
* Storefront elastic search
* Store credit*

*Store credit currently only works with default currency. If a shopper selects a transactional currency other than the default currency, they will not be able to see or use any assigned store credit.
 
## Display vs. Transactional Currencies

<a id="multi-currency_currency"></a>

Currency can be setup in two ways:
1. **Display**
   * Process in the store's default currency (regardless of currency chosen by shopper). 
   * When the shopper reaches checkout, a notification is displayed that shows the currency the payment will be processed in.
   * Can use either manual exchange rate or automatic exchange rates set by the BigCommerce Payment Service
2. **Transactional** -  the shopper will pay in the selected currency. The amount in the checkout will be the final amount the shopper sees with their bank; transactional currency must be set to a manual conversion rate. If the currency is changed from display only to transaction it will automatically set the exchange rate to be manual and use the last available exchange rate from the display only currency. Multiple transactional currencies can be setup on a store. The shopper will not pay conversion fees, but if the shopper card issuing bank differs from the merchants bank account country, they may have cross-border fees. This may change the final settlement amount.

---


## Pre-Configuring the Store

Before enabling multiple currencies on a store, ensure it is configured as follows:
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

---

<a id="multi-currency_setup"></a> 

## Adding a Currency

Transactional currencies can't be created via API just yet, so they'll need to be added via the control panel. To do so:

 1. Navigate to **Store Setup > Currencies**, then select **Add a Currency...**
 2. Enter a **Currency Name**
 3. Select an option for **Exchange Rate** (enter the exchange rate manually, or get exchange rate from BigCommerce's Currency Service)
 4. Check **Set as transactional currency?** if shoppers will transact in this currency -- if this box is not selected, it will be a display only currency.
 5. Configure **Currency Display** fields with desired settings, then
 6. Click **Save**.

![Add a Currency](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/multi-currency-add-currency.png "Add a Currency")

After saving, be sure to check **visible** to make the currency visible to shoppers:

![Currency List](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/multi-currency-currencies-list.png "Currency List")

<div class="HubBlock--callout">
<div class="CalloutBlock--error">
<div class="HubBlock-content">
    
<!-- theme: error -->

### Note
> Do not change the default currency -- this will cause unintented currency conversion issues.

</div>
</div>
</div>

## How Multiple Currencies are Surfaced



## Current Limitations

<a id="multi-currency_beta-limitations"></a>

See the table below for a list of Currencies Beta release supported and un-supported features.

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

---

## Definitions

<a id="multi-currency_definitions"></a>

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

---

## FAQ

<a id="multi-currency_faq"></a>

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
abandoned cart analytics or web analytics such as Google Analytics. Currently it does not break down anayltics by currency.

**How can I setup settlement currencies in Stripe?**  
Please reach out to Stripe for more information on setting up the account. 
[Supported Settlement Currencies](https://stripe.com/docs/connect/payouts#supported-settlement) (Stripe Documentation)

---

## Resources
- [Currency API](https://developer.bigcommerce.com/api-reference/store-management/currency-api)
- [Price List API](https://developer.bigcommerce.com/api-reference/catalog/pricelists-api)
- [Using Price Lists](https://support.bigcommerce.com/s/article/Price-Lists) (BigCommerce Knowledge Base)
- [Managing Currencies](https://support.bigcommerce.com/s/article/Managing-Currencies-Beta) (BigCommerce Knowledge Base)
- [Tax](https://support.bigcommerce.com/s/article/Manual-Tax-Setup#intro1) (BigCommerce Knowledge Base)
- [Supported Currencies](https://stripe.com/docs/currencies) (Stripe Documentation)
- [Supported Settlement Currencies](https://stripe.com/docs/connect/payouts#supported-settlement) (Stripe Documentation)