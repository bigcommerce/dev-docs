<h1>Cart Price Properties</h1>
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#cart-price-relationships_rrp">RRP</a></li>
    <li><a href="#cart-price-relationships_bulk-pricing">Bulk Pricing</a></li>
    <li><a href="#cart-price-relationships_price">Price</a></li>
    <li><a href="#cart-price-relationships_cart-item-full-response">Cart Item Full Response</a></li>
	</ul>
</div>

This page shows the price properties available on the `{{cart.items}}` object. 

For the examples below we will use a cart_item with the following pricing:
* Base Price: $100
* MSRP: $99
* Sale Price: $55
* Bulk Pricing: Set as a percentage.
    * Buy two items get 1%
    * Buy three items get 2%
    * Buy four items get 3%

<a href='#cart-price-relationships_rrp' aria-hidden='true' class='block-anchor'  id='cart-price-relationships_rrp'><i aria-hidden='true' class='linkify icon'></i></a>

## RRP
`rrp` is the MSRP or Manufactures Suggested Retail Price. This number will always be the same unless it is changed at the product level.

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">rrp</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "rrp"
subtitle: ""
lineNumbers: true
-->

```json
    "rrp": {
      "formatted": "$99.00",
      "value": 99
    },
```

---

<a href='#cart-price-relationships_bulk-pricing' aria-hidden='true' class='block-anchor'  id='cart-price-relationships_bulk-pricing'><i aria-hidden='true' class='linkify icon'></i></a>

## Bulk Pricing 

`bulk_pricing` shows the lowest calculated price. 

Item on sale with 2 items added to the cart:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">Item not on sale with 2 items added to the cart</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "Item not on sale with 2 items added to the cart"
subtitle: ""
lineNumbers: true
-->

```json
    "bulk_pricing": {
      "base_price": {
        "formatted": "$99.00",
        "value": 99
      },
```

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">Item on sale with 2 items added to the cart</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "Item on sale with 2 items added to the cart"
subtitle: ""
lineNumbers: true
-->

```json
    "bulk_pricing": {
      "base_price": {
        "formatted": "$54.45",
        "value": 54.45
      },
```

---

<a href='#cart-price-relationships_price' aria-hidden='true' class='block-anchor'  id='cart-price-relationships_price'><i aria-hidden='true' class='linkify icon'></i></a>

## Price

`price` shows the lowest calculated price of a single cart item. 

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">Two items in cart not on sale</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "Two items in cart not on sale"
subtitle: ""
lineNumbers: true
-->

```
    "price": {
      "formatted": "$100.00",
      "value": 100
    },

```

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">Two items in cart on sale</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "Two items in cart on sale"
subtitle: ""
lineNumbers: true
-->

```
    "price": {
      "formatted": "$55.00",
      "value": 55
    },
```

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">Two items in cart on sale with bulk pricing</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "Two items in cart on sale with bulk pricing"
subtitle: ""
lineNumbers: true
-->

```
    "price": {
      "formatted": "$54.45",
      "value": 54.45
    },
```

---

<a href='#cart-price-relationships_cart-item-full-response' aria-hidden='true' class='block-anchor'  id='cart-price-relationships_cart-item-full-response'><i aria-hidden='true' class='linkify icon'></i></a>

## Cart Item Object Example

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">Cart Item Response</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "Cart Item Response"
subtitle: ""
lineNumbers: true
-->

```
[
  {
    "availability": "",
    "brand": {
      "name": ""
    },
    "bulk_pricing": {
      "base_price": {
        "formatted": "$54.45",
        "value": 54.45
      },
      "discount_amount": null,
      "discount_percentage": null
    },
    "can_modify": true,
    "configurable_fields": [],
    "custom_fields": [],
    "id": "0c78e8f6-bc12-4a97-ba43-d1ebbdff1d71",
    "image": null,
    "max_purchase_quantity": null,
    "min_purchase_quantity": "0",
    "name": "BigCommerce Water Bottle",
    "options": [],
    "price": {
      "formatted": "$54.45",
      "value": 54.45
    },
    "product_id": 202,
    "quantity": 2,
    "release_date": "",
    "remove_url": "/cart.php?action=remove&item=0c78e8f6-bc12-4a97-ba43-d1ebbdff1d71",
    "rrp": {
      "formatted": "$99.00",
      "value": 99
    },
    "show_gift_wrapping": true,
    "sku": "",
    "total": {
      "formatted": "$108.90",
      "value": 108.9
    },
    "type": "Item",
    "url": "https://{store_hash}/bigcommerce-water-bottle/"
  }
]
```

