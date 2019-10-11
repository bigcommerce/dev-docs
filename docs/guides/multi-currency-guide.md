# Building Multi-Currency Storefronts

<div class="otp" id="no-index">

### On this Page
* [Beta Limitations](#multi-currency_beta-limitations)
* [Setup Multi Currency](#multi-currency_setup)
* [Display & Transactional Currencies](#multi-currency_currency)
* [Catalog Pricing](#multi-currency_pricing)	
* [Cart and Checkout](#multi-currency_cart-checkout)
* [Orders](#multi-currency_orders)
* [Promotions](#multi-currency_promotions)
* [Shipping](#multi-currency_shipping)
* [Refunds](#multi-currency_refunds)
* [Payment Methods Supported](#multi-currency_payment-methods-supported)
* [Tax](#multi-currency_tax)
* [Definitions](#multi-currency_definitions)
* [FAQ](#multi-currency_faq)
</div>

---

Multi Currency will allow stores to transact in the currency of their choice. The amount and currency the shopper sees in catalog, cart and checkout pages is the amount and currency we pass to the payment provider.

With the introduction of multi-currency, BigCommerce now supports both transactional and display-only currencies across the entire platform. With this change, the currency and amount sent to the payment provider will depend on whether the merchant has set the currency as transactional or display-only. By using multiple transactional currencies, merchants can allow their shopper to transact in a currency of their preference, make sure that the shopper knows exactly how much they’ll be charged on their account, and help them avoid extra fees.  

[Want to jump straight to setup?](#multi-currency_setup)

---

<a id="multi-currency_beta-limitations"></a>

## Beta Release Current Limitations
The following features are not supported:
-   [Optimized One-Page Checkout](https://support.bigcommerce.com/s/article/Optimized-Single-Page-Checkout) only, no legacy checkout
-   Stencil only
- Stripe credit cards only
- Storefront Elasticsearch
- Storefront product filtering
- Automatic tax calculation. Only manual tax is supported for now.
    - Avalara does not support multiple currencies on a single account
- Store credit is issued in default currency only. Regardless of display currency.
- Customer group discounts cannot be set in multiple currencies

---

<a id="multi-currency_setup"></a> 

## Set Up Multi Currency

Before setup make sure your store is configured in the following way:
* Manual Taxes
* Stripe
* Stencil
* Optimized Checkout

Please also take a moment to review current the [Currency API reference](https://developer.bigcommerce.com/api-reference/store-management/currency-api).

<div  class="HubBlock HubBlock--callout flex is-viewing is-padded is-padded-inner is-standalone">

<div  class="HubBlock-inner flex-1 w-full CalloutBlock--warning">

<div  class="HubBlock-content flex">

<div  class="flex-1">

<div  class="HubBlock-content-title">Currency Settings</div>

<div  class="MarkdownViewer markdown-body HubBlock-content-body">

<div  class="HtmlViewer">

<p>Make sure to not change the store’s default currency. This could cause currency to not function properly. </p>

</div>

</div>

</div>

</div>

</div>

</div>

The currency must be enabled in the control panel before it can be used via the API. This is because transactional currencies can’t be created via API. 

1. Under **Store Setup > Currencies** select Add a Currency. 
<div class="HubBlock HubBlock--image flex is-viewing is-padded is-standalone"><div class="HubBlock-inner flex-1 w-full"><div class="HubBlock-content"><div class=""><div class="ImageBlock-title">Add a Currency</div><img src="//s3.amazonaws.com/user-content.stoplight.io/6012/1552586125164" alt="Add a Currency" class="ui image"></div></div></div></div>

2.  Here set the currency details such as name and conversion rate. The newest addition is a check box:  **Yes, this currency is set as a transactional currency**. Check this box if you want shoppers to transact in this currency. If this box is not selected, it will be a display only currency.

<div class="HubBlock HubBlock--image flex is-viewing is-padded is-standalone"><div class="HubBlock-inner flex-1 w-full"><div class="HubBlock-content"><div class=""><div class="ImageBlock-title">Add a Currency Details</div><img src="//s3.amazonaws.com/user-content.stoplight.io/6012/1552586160832" alt="Add a Currency Details" class="ui image"></div></div></div></div>

3.  Set the currency display then  **Save**.

![]()

4.  After saving, to make the currency visible to the shopper, you will need to click visible.

<div class="HubBlock HubBlock--image flex is-viewing is-padded is-standalone"><div class="HubBlock-inner flex-1 w-full"><div class="HubBlock-content"><div class=""><img src="//s3.amazonaws.com/user-content.stoplight.io/6012/1552586250305" class="ui image"></div></div></div></div>

<div class="HubBlock--callout">
<div class="CalloutBlock--error">
<div class="HubBlock-content">
    
<!-- theme: error -->

### Default Currency
> Please do not change default currency. It will cause unintented currency conversion issues.

</div>
</div>
</div>

---

<a id="multi-currency_currency"></a>

## Display & Transactional Currency

Currency can be setup in two ways:
- display
- transactional


A store can still have display currency, with pricing set through either the a manual exchange rate or the BigCommerce Currency Service. 

### Display
Display currency will process the transaction in the store's default currency regardless of what the shopper has chosen on the storefront. 

With the new multi currency, hen the shopper reaches checkout, there is messaging that alerts them which currency the payment will be processed in. 

<div class="HubBlock HubBlock--image flex is-viewing is-padded is-standalone"><div class="HubBlock-inner flex-1 w-full"><div class="HubBlock-content"><div class="justify-center text-center"><div class="ImageBlock-title">Currency Display Checkout</div><img style="max-width:334px;max-height:475px" src="//s3.amazonaws.com/user-content.stoplight.io/6012/1552588391573" alt="Currency Display Checkout" class="ui centered fluid image"></div></div></div></div>

### Transactional

If a currency is set as transactional, this means that the shopper will pay in the selected currency. The amount in the checkout will be the final amount the shopper sees with their bank. 

Transactional currency must be set to a manual conversion rate. If the currency is changed from display only to transaction it will automatically set the exchange rate to be manual and use the last available exchange rate from the display only currency.

Multiple transactional currencies can be setup on a store.

<div class="HubBlock HubBlock--callout flex is-viewing is-padded is-padded-inner is-standalone">
	<div class="HubBlock-inner flex-1 w-full CalloutBlock--warning">
		<div class="HubBlock-content flex">
			<div class="flex-1">
				<div class="HubBlock-content-title">Conversion Fees</div>
				<div class="MarkdownViewer markdown-body HubBlock-content-body">
					<div class="HtmlViewer">
						<p>The shopper will not pay conversion fees, but if the shopper card issuing bank differs from the merchants bank account country, they may have cross-border fees.  This may change the final settlement amount.</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

---

## <a id="multi-currency_pricing"></a>Catalog Pricing
Multi Currency will convert the catalog default currency price of items into the selected non-default currency on the storefront. It does not change the default catalog pricing of products. 

   -   Catalog search and filtering by price only works for the default currency and auto-converted pricing for non-default transactional currencies. If merchant sets up pricing through Price Lists and has price filter enabled on their store, when shopper searches by price, no products will be displayed to them.
   -   'Shop by: Price' only works for default currency and auto-converted pricing for non-default transactional currencies. If merchant sets up pricing through Price Lists and has price filter enabled on their store, when shopper searches by price, no products will be displayed to them.
   -   Currency is not dynamically converted. To convert the merchant will need to do one of the following:
	   - Manually update their conversion rate from default currency to other transactional currencies,
	   - Set up automatic updates to their conversion rate through APIs,
	   - Set up explicit pricing per each currency using Price Lists (only available to Enterprise merchants)
   -   Pricing by currency only not by country.

### Price Lists

Price Lists can be created in any currency setup in the store. Both transactional and display currencies are available in Price Lists. Price records are not copied from one currency to another. The price record will need to be created for each currency.

<div class="HubBlock HubBlock--image flex is-viewing is-padded is-standalone"><div class="HubBlock-inner flex-1 w-full"><div class="HubBlock-content"><div class=""><div class="ImageBlock-title">Control Panel Price Lists</div><img src="//s3.amazonaws.com/user-content.stoplight.io/6012/1552585569950" alt="Control Panel Price Lists" class="ui image"></div></div></div></div>

<div class="HubBlock HubBlock--callout flex is-viewing is-padded is-padded-inner is-standalone">
	<div class="HubBlock-inner flex-1 w-full CalloutBlock--info">
		<div class="HubBlock-content flex">
			<div class="flex-1">
				<div class="HubBlock-content-title">Price List Limitations</div>
				<div class="MarkdownViewer markdown-body HubBlock-content-body">
					<div class="HtmlViewer">
						<p>This feature is limited to Enterprise plans and requires a Stencil theme.</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div> 

### Price List Modifiers

Modifiers will use the auto conversion rate. For example if the keychain is €30 and there is a modifier for engraving then the price is calculated as:

€30 + ($5 * auto conversion rate)

The above example assumes a default currency of USD.

### Price Record API

To create a price record in multiple currencies send a request using the [Set Price Records](/api-reference/catalog/pricelists-api/price-lists-records/setpricelistrecordcollection) endpoint. As long as the currency is available in the store, multiple currencies can be set in the request.

**Create Price Record** 
*[https://api.bigcommerce.com/stores/{store_hash}/v3/pricelists/{price_list_id}/records](https://developer.bigcommerce.com/api-reference/catalog/pricelists-api/price-lists-records/setpricelistrecordcollection)*

```json
[
  {
    "variant_id": 360,
    "price": 27.57,
    "sale_price": 12,
    "currency": "aud",
    "product_id": 189
  },
  {
    "variant_id": 360,
    "price": 27.57,
    "sale_price": 12,
    "currency": "eur",
    "product_id": 189
  }
]
```

**Price List Sample Response** 
*[https://api.bigcommerce.com/stores/{store-hash}/v3/pricelists/{price-list-id}/records?currency=usd](https://developer.bigcommerce.com/api-reference/catalog/pricelists-api/price-lists/getpricelistcollection)*

```json
{
  "data": [
    {
      "price_list_id": 4,
      "variant_id": 361,
      "price": 22.66,
      "sale_price": null,
      "retail_price": null,
      "map_price": null,
      "calculated_price": 22.66,
      "date_created": "2019-03-05T16:38:08Z",
      "date_modified": "2019-03-05T16:38:08Z",
      "currency": "usd",
      "product_id": 190
    },
    {
      "price_list_id": 4,
      "variant_id": 438,
      "price": 18.62,
      "sale_price": null,
      "retail_price": null,
      "map_price": null,
      "calculated_price": 18.62,
      "date_created": "2019-03-05T16:38:08Z",
      "date_modified": "2019-03-05T16:38:08Z",
      "currency": "usd",
      "product_id": 200
    },
    {
      "price_list_id": 4,
      "variant_id": 439,
      "price": 18.62,
      "sale_price": null,
      "retail_price": null,
      "map_price": null,
      "calculated_price": 18.62,
      "date_created": "2019-03-05T16:38:08Z",
      "date_modified": "2019-03-05T16:38:08Z",
      "currency": "usd",
      "product_id": 200
    }
  ],
  "meta": {
    "pagination": {
      "total": 26,
      "count": 26,
      "per_page": 50,
      "current_page": 1,
      "total_pages": 1
    }
  }
}
```

---

## <a id="multi-currency_cart-checkout"></a> Cart and Checkout

### Changing the Cart Currency

The cart currency can be set when creating a [Server to Server Cart](https://developer.bigcommerce.com/api-reference/cart-checkout/server-server-cart-api/cart/createacart). The currency needs to be setup in the [control panel first](#multi-currency_setup). 

**Example POST Create a Cart** 
*[https://api.bigcommerce.com/stores/{storehash}/v3/carts](https://developer.bigcommerce.com/api-reference/cart-checkout/server-server-cart-api/cart/createacart)*

```json
{
  "customer_id": 1,
  "line_items": [
    {
      "product_id": 77,
      "variant_id": 1,
      "quantity": 3
    },
    {
      "product_id": 77,
      "variant_id": 2,
      "quantity": 3
    }
  ],
  "channel_id": 1,
  "currency": {
    "code": "GBP"
  }
}
```

The API will return the item price and the currency of the item price in the store’s current transactional currency. 

In the example below the store’s default currency is USD, and the item is $7.95. Since the shopper has switched to Euros as the transactional currency, we now convert the line item price and taxes to Euros.

**API Example -- Storefront Cart and Checkout API**

*The item is set to show prices including tax. Abbreviated Response*

```json
{
  "id": "4c8681f7-cc64-4377-b5a3-cf5f762edf5d",
  "cart": {
    "id": "4c8681f7-cc64-4377-b5a3-cf5f762edf5d",
    "customerId": 19,
    "email": "cadenwhitfield@testing.com",
    "currency": {
      "name": "Euro",
      "code": "EUR",
      "symbol": "€",
      "decimalPlaces": 2
    },
    "isTaxIncluded": true,
    "baseAmount": 6.97,
    "discountAmount": 0,
    "cartAmount": 6.97,
    "lineItems": {
      "physicalItems": [
        {
          "id": "c56ab595-cc9f-4d52-abd3-065f6e7ad903",
          "variantId": 345,
          "productId": 174,
          "name": "1L Le Parfait Jar",
          "listPrice": 6.97,
          "salePrice": 6.97,
          "extendedListPrice": 6.97,
          "extendedSalePrice": 6.97
        }
      ]
    },
    "createdTime": "2019-01-17T18:38:26+00:00",
    "updatedTime": "2019-01-17T18:38:26+00:00"
  },
  ...
  "taxTotal": 0.53,
  "taxes": [
    {
      "name": "Sales Tax",
      "amount": 0.53
    }
  ],
  "subtotal": 6.97,
  "grandTotal": 6.97
}
```

If a shopper changes the currency and has added at least one item to the cart, they will still be charged in the original transactional currency. Below the shopper changed from USD to AUS. A message is displayed that they will still checkout using USD. 

*You will be billed for this order in USD*.

The API also still returns Australian Dollars as the currency.

<div class="HubBlock HubBlock--image flex is-viewing is-padded is-standalone"><div class="HubBlock-inner flex-1 w-full"><div class="HubBlock-content"><div class="justify-center text-center"><div class="ImageBlock-title">Shopper Order Summary Example</div><img style="max-width:334px;max-height:475px" src="//s3.amazonaws.com/user-content.stoplight.io/6012/1552588401736" alt="Shopper Order Summary Example" class="ui centered fluid image"></div></div></div></div>

To change the transactional currency of their cart, shopper needs to empty their cart and re-add their items in their desired transactional currency.

---

## <a id="multi-currency_orders"></a> Orders

The order history page will show the currency of the transaction.
Invoices will show the item price and the currency of the transaction.
Since each order can be in a different currency, the control panel order page will show the currency token. This also applies to Order Export data.
Shoppers will now see the orders history in the transactional currency, NOT the display currency. While the underlying historical data itself will remain unchanged, the page will now surface transactional currency and amount, rather than display currency and amount -- this change will apply to all orders, including historical ones. 

The APIs `default_currency_code` and `default_currency_id` are now in the transaction currency of the order. This is only for stores using multi-currency. 


**Default Currency Response V2 Orders**

*This is an abbreviated response*

```json
...      
  "currency_id": 4,
        "currency_code": "EUR",
        "currency_exchange_rate": 1,
        "default_currency_id": 4,
        "default_currency_code": "EUR"
...
```

<div class="HubBlock HubBlock--image flex is-viewing is-padded is-standalone"><div class="HubBlock-inner flex-1 w-full"><div class="HubBlock-content"><div class="justify-center text-center"><div class="ImageBlock-title">Shopper Order History</div><img style="max-width:805px" src="//s3.amazonaws.com/user-content.stoplight.io/6012/1552509931495" alt="Shopper Order History" class="ui centered fluid image"></div></div></div></div>

<div class="justify-center text-center"><div class="ImageBlock-title">Shopper Invoice</div><img style="max-width:805px" src="//s3.amazonaws.com/user-content.stoplight.io/6012/1552509971212" alt="Shopper Invoice" class="ui centered fluid image"></div>

<div class="HubBlock HubBlock--image flex is-viewing is-padded is-standalone"><div class="HubBlock-inner flex-1 w-full"><div class="HubBlock-content"><div class="justify-center text-center"><div class="ImageBlock-title">Control Panel Order History</div><img style="max-width:805px" src="//s3.amazonaws.com/user-content.stoplight.io/6012/1552510003858" alt="Control Panel Order History" class="ui centered fluid image"></div></div></div></div>

---

## <a id="multi-currency_promotions"></a> Promotions

Coupons are available in the default currency only. Attempting to use a coupon with a different currency will return an invalid coupon error. If a customer is checking out in the default currency then changes to a different currency, in the cart, the coupon code will still work. This is because once the cart is created, it is “locked” into the default currency until being deleted. Creating a coupon in a different currency is not available during the beta.

Cart Level discounts can be created in your currency of choice. The shopper must have the currency selected for the promotion to apply.

<div class="HubBlock HubBlock--image flex is-viewing is-padded is-standalone"><div class="HubBlock-inner flex-1 w-full"><div class="HubBlock-content"><div class="justify-center text-center"><div class="ImageBlock-title">Cart Level Discount</div><img style="max-width:805px" src="https://raw.githubusercontent.com/tatiana-perry/dev-docs-images/master/currency_beta/multi_currency_cart_level_discount_one.png" alt="Control Panel Order History" class="ui centered fluid image"></div></div></div></div>

---
## <a id="multi-currency_shipping"></a> Shipping

### Product Level Fixed Shipping
The shipping is set on the product level in the stores default currency. During checkout, BigCommerce will convert the shipping cost using the stores exchange rate and display that value to the shopper.  

### Flat Rate Shipping
Flat rate shipping is converted based on the stores currency. 

### Shipping Carriers
The currency is sent to the carrier and depending on the carrier, quotes are returned in the stores transactional currency. If the shipping carrier can not return in the transactional currency or the currency is display then it is converted using the transactional currency exchange rate set by the merchant.  
Shipping providers that support multiple currencies can supply quotes straight in shopper's transactional currency, so no currency conversion needed.
ShipperHQ does not support multiple currencies.

---

## <a id="multi-currency_refunds"></a> Refunds

### Default Currency
Works as normal and no changes were made. 

### Transactional Currency
The refund is shown in the transactional currency. When processing refunds the amount if refunded to the shopper in the transactional currency.  

### Display Currency
The refund is shown in the stores default currency. When processing refunds the shopper is refunded the transactional currency amount. 

For example if an order was purchased with a display currency of $36 AUD, where AUD exchange rate is set to 1.384615 and a store has USD currency set as a default, when processing a refund, the shopper will get $26 USD back.

---

## <a id="multi-currency_payment-methods-supported"></a> Payment Methods Supported

* Gift Certificates can be used in the currency they were purchased in. They can also be purchased as part of an order.
	* Gift certificates can also be setup per currency.
* Test Payment Gateway
* Stripe credit cards
* Store Credit is not converted in beta. If a customer has $10.00 USD worth of store credit and tries to transact in EUR, then store credit of €10.00 will be applied.

<div class="HubBlock HubBlock--image flex is-viewing is-padded is-standalone"><div class="HubBlock-inner flex-1 w-full"><div class="HubBlock-content"><div class="justify-center text-center"><div class="ImageBlock-title">Gift Certificates</div><img style="max-width:805px" src="https://raw.githubusercontent.com/tatiana-perry/dev-docs-images/master/currency_beta/gift_certificates_multi_currency.png" alt="Control Panel Order History" class="ui centered fluid image"></div></div></div></div>

**Create a Gift Certificate -- API Example**
[*https://api.bigcommerce.com/stores/{store_hash}/v2/gift_certificates*](https://developer.bigcommerce.com/api-reference/marketing/marketing-api/gift-certificates/createagiftcertificate)

```json
{
  "code": "10R-6E3-AO4-RST",
  "amount": "700.0000",
  "status": "active",
  "to_name": "Jane",
  "to_email": "janedoe@email.com",
  "from_name": "Tarzan",
  "from_email": "test1@test.com",
  "currency_code": "EUR"
}
```
---

## <a id="multi-currency_tax"></a> Tax
Automated tax provides on the BigCommerce platform do not supported calculating tax in multiple currencies. 

---

## <a id="multi-currency_definitions"></a> Definitions

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

## <a id="multi-currency_faq"></a> FAQ

**Does multi currency work with the Checkout SDK?**  
The Checkout SDK works with multi-currency. There is no additional setup needed for the SDK.
After setting up currency in the Control Panel the SDK will work as normal.

**Do my theme customizations work with multi currency?**  
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

**Will I get charged any fees?**  
BigCommerce will not change any fees. The shoppers bank may charge them fees. The merchant should
check with their payment gateway about any fees for settling in multiple currencies.

---

## Resources
- [Currency API](https://developer.bigcommerce.com/api-reference/store-management/currency-api)
- [Price List API](https://developer.bigcommerce.com/api-reference/catalog/pricelists-api)
- [Using Price Lists](https://support.bigcommerce.com/s/article/Price-Lists) (BigCommerce Knowledge Base)
- [Managing Currencies](https://support.bigcommerce.com/s/article/Managing-Currencies-Beta) (BigCommerce Knowledge Base)
- [Tax](https://support.bigcommerce.com/s/article/Manual-Tax-Setup#intro1) (BigCommerce Knowledge Base)
- [Supported Currencies](https://stripe.com/docs/currencies) (Stripe Documentation)
- [Supported Settlement Currencies](https://stripe.com/docs/connect/payouts#supported-settlement) (Stripe Documentation)