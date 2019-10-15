### On this Page
- [Adding and Configuring Currencies](#adding-and-configuring-currencies)
- [Current Limitations](#current-limitations)
- [Display and Transactional Currency](#display-and-transactional-currency)
- [Configuring the Store](#configuring-the-store)
- [Adding a Currency](#adding-a-currency)
- [Catalog Pricing](#catalog-pricing)
- [Cart and Checkout Currency](#cart-and-checkout-currency)
- [Orders](#orders)
- [Promotions](#promotions)
- [Shipping](#shipping)
- [Refunds](#refunds)
- [Payment Methods Supported](#payment-methods-supported)
- [Tax](#tax)
- [Definitions](#definitions)
- [FAQ](#faq)
- [Resources](#resources)

</div>

Intro

---

## Configuring the Store

Before enabling Multi-Currency settings, make sure the store is configured as follows:
* Manual Taxes (or Avalara)
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

## Configuring Currencies

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

---

