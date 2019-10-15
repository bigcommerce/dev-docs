# How Currencies Work

<div class="otp" id="no-index">

### On this Page
- [Catalog Pricing](#catalog-pricing)
- [Price Lists](#price-lists)
- [Price List Modifiers](#price-list-modifiers)
- [Price Records](#price-records)
- [S-2-S Cart and Checkout](#s-2-s-cart-and-checkout)
- [Storefront Cart and Checkout](#storefront-cart-and-checkout)
- [Orders](#orders)
- [Promotions](#promotions)
- [Shipping](#shipping)
- [Refunds](#refunds)
- [Payment Methods Supported](#payment-methods-supported)
- [Gift Certificates](#gift-certificates)

</div>

This article details how currencies are surfaced throughout BigCommerce APIs, user interfaces, and storefront components; it assumes you're already familiar with the core concepts behind BigCommerce's Multi-Currency settings. For a high level overview as well as instructions on how to add currencies to a BigCommerce store, see [Currencies Overview](https://developer.bigcommerce.com/api-docs/catalog/currencies/currencies-overview).

---

## Catalog Pricing

<a id="catalog-pricing"></a>

When Multiple Currencies are configured, BigCommerce will convert the catalog default currency price of items into the selected non-default currency on the storefront. It does not change the default catalog pricing of products. 

Catalog search and filtering by price only works for the default currency and auto-converted pricing for non-default transactional currencies. If a merchant sets up pricing through **Price Lists** and has price filter enabled on their store, when shopper searches by price, no products will be displayed to them.
* `Shop by: Price` only works for default currency and auto-converted pricing for non-default transactional currencies. If merchant sets up pricing through Price Lists and has price filter enabled on their store, when shopper searches by price, no products will be displayed to them.

Currency is not dynamically converted. To convert the merchant will need to do one of the following:
* Manually update their conversion rate from default currency to other transactional currencies,
* Set up automatic updates to their conversion rate through APIs,
* Set up explicit pricing per each currency using Price Lists (only available to Enterprise merchants)
* Pricing by currency only, not by country.

---

## Price Lists

<a id="price-lists"></a>

Price Lists can be created in any currency setup in the store. Both transactional and display currencies are available in Price Lists. Price records are not copied from one currency to another. The price record must be created for each currency.

![titled](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/multi-currency-price-overrides.png "Price Overrides")

<div class="HubBlock--callout">
<div class="CalloutBlock--error">
<div class="HubBlock-content">
    
<!-- theme: error -->

### Note
> This feature is limited to Enterprise plans and requires a Stencil theme.

</div>
</div>
</div>

---

## Price List Modifiers

<a id="price-list-modifiers"></a>

Modifiers use the auto conversion rate. For example, if the keychain is `€30`, and there's a modifier for engraving, the price is calculated as: `€30 + ($5 * auto conversion rate)`

The above example assumes a default currency of USD.

---

## Price Records

<a id="multi-currency-price-records"></a>

To create a price record in multiple currencies via API, send a `POST` request to the [Set Price Records](/api-reference/catalog/pricelists-api/price-lists-records/setpricelistrecordcollection) endpoint -- as long as the currency is available in the store, multiple currencies can be set in the request.


[**Create Price Record** ](https://developer.bigcommerce.com/api-reference/catalog/pricelists-api/price-lists-records/setpricelistrecordcollection):

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


[**Price List Sample Response** ](https://developer.bigcommerce.com/api-reference/catalog/pricelists-api/price-lists/getpricelistcollection):

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

## S-2-S Cart and Checkout

<a id="server-to-server-cart-and-checkout"></a>

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

---

## Storefront Cart and Checkout

<a id="storefront-cart-and-checkout"></a>

In the example below the store’s default currency is `USD`, and the item is `$7.95`. Since the shopper has switched to Euros as the transactional currency, we now convert the line item price and taxes to Euros:

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
  // ...
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

If a shopper changes the currency and has added at least one item to the cart, they will still be charged in the original transactional currency. Below the shopper changed from `USD` to `AUS`. A message is displayed that they will still checkout using `USD`:

`*You will be billed for this order in USD*.`

The API also still returns Australian Dollars as the currency.

![Order Summary](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/multi-currency-order-summary.png "Order Summary")

To change the transactional currency of their cart, the shopper will need to empty the cart and re-add the items in the desired transactional currency.

---

## Orders

<a id="orders"></a>

**Details:**
* The order history page shows the currency of the transaction.
* Invoices show item price and the currency of the transaction.
* Since each order can be in a different currency, the control panel order page shows the currency's token (this also applies to Order Export data).
* The shopper's order history shows the transactional currency, not the display currency. While the underlying historical data itself will remain unchanged, the page now surfaces the transactional currency and amount, rather than display currency and amount -- this change applies to all orders, including historical ones. 

The APIs `default_currency_code` and `default_currency_id` are now in the transaction currency of the order. This is only for stores using multi-currency. 


**Default Currency Response V2 Orders**

```json
// ...      
  "currency_id": 4,
        "currency_code": "EUR",
        "currency_exchange_rate": 1,
        "default_currency_id": 4,
        "default_currency_code": "EUR"
// ...
```

**Shopper Order History**:
![Shopper Order History](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/multi-currency-orders.png "Shopper Order History")

**Shopper Invoice:**
![Shopper Invoice](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/multi-currency-invoice.png "Shopper Invoice")

**Control Panel Order History**:
![Order Summary](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/multi-currency-admin-orders.png "Control Panel Order History")

---

## Promotions

<a id="promotions"></a>

Coupons are available in the default currency only. Attempting to use a coupon with a different currency will return an invalid coupon error. If a customer is checking out in the default currency then changes to a different currency, in the cart, the coupon code will still work. This is because once the cart is created, it is “locked” into the default currency until being deleted. Creating a coupon in a different currency is not available during the beta.

Cart Level discounts can be created in your currency of choice. The shopper must have the currency selected for the promotion to apply.

![Cart Level Discount](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/multi_currency_cart_level_discount_one.png "Cart Level Discount")

---

## Shipping

<a id="shipping"></a>

**Details:**
* **Product Level Fixed Shipping** - shipping is set at the product level in the store's default currency. During checkout, BigCommerce converts shipping costs using the store's exchange rate and displays that value to the shopper.  
* **Flat Rate Shipping** - flat rate shipping is converted based on the store's currency. 
* **Shipping Carriers** - the currency is sent to the carrier and depending on the carrier, quotes are returned in the stores transactional currency. If the shipping carrier can not return in the transactional currency or the currency is display then it is converted using the transactional currency exchange rate set by the merchant. Shipping providers that support multiple currencies can supply quotes straight in shopper's transactional currency, so no currency conversion needed. ShipperHQ does not support multiple currencies.

---

## Refunds

<a id="refunds"></a>

* **Default Currency** - Works as normal and no changes were made. 

* **Transactional Currency** - The refund is shown in the transactional currency. When processing refunds the amount if refunded to the shopper in the transactional currency.  

* **Display Currency** - The refund is shown in the stores default currency. When processing refunds the shopper is refunded the transactional currency amount; for example, if an order was purchased with a display currency of $36 AUD, where AUD exchange rate is set to 1.384615 and a store has USD currency set as a default, when processing a refund, the shopper will get $26 USD back.

---

## Payment Methods Supported

<a id="payment-methods-supported"></a>

| Payment Method    | Details                                                                                                                                                |
|-------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------|
| Gift Certificates | can be used in the currency they were purchased in and can be setup per currency                                                                       |
| Store Credit      | not converted in beta. If a customer has `$10.00 USD` worth of store credit and tries to transact in `EUR` , store credit of `€10.00` will be applied. |
| Credit Cards      | Processed through Stripe Payment Gateway or Test Payment Gateway                                                                                       |


<div class="HubBlock HubBlock--image flex is-viewing is-padded is-standalone"><div class="HubBlock-inner flex-1 w-full"><div class="HubBlock-content"><div class="justify-center text-center"><div class="ImageBlock-title">Gift Certificates</div><img style="max-width:805px" src="https://raw.githubusercontent.com/tatiana-perry/dev-docs-images/master/currency_beta/gift_certificates_multi_currency.png" alt="Control Panel Order History" class="ui centered fluid image"></div></div></div></div>

## Gift Certificates

[**Create a Gift Certificate**](https://developer.bigcommerce.com/api-reference/marketing/marketing-api/gift-certificates/createagiftcertificate)

```json
{
  "code": "10R-6E3-AO4-RST",
  "amount": "700.0000",
  "status": "active",
  "to_name": "Jane",
  "to_email": "janedoe@email.com",
  "from_name": "Tarzan",
  "from_email": "test1@test.com",
  "currency_code": "EUR"           // new property
}
```

**Control Panel UI**
![Gift Certificates](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/multi-currency-gift-cerfiticates.png "Gift Certificates")