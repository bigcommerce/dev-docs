<h1>Orders API Overview</h1>
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    		<li><a href="#orders-api-overview_create-order">Create an Order</a></li>
            <ul>
                <li><a href="#orders-api-overview_add-produt-options">Add an Existing Product with Options</a></li>
                <li><a href="#orders-api-overview_add-custom-product">Create a Custom Product</a></li>
                <li><a href="#orders-api-overview_order-products">Order Products</a></li>
                <li><a href="#orders-api-overview_add-billing-address">Add a Billing Address</a></li>
                <li><a href="#orders-api-overview_add-shipping-address">Add a Shipping Address</a></li>
                <li><a href="#orders-api-overview_other-recommended-fields">Other Recommended Fields</a></li>
                <li><a href="#orders-api-overview_create-order-example">Create Order Example</a></li>
            </ul>
            <li><a href="#orders-api-guide_order-response">Order Response</a></li>
            <li><a href="#orders-api-overview_shipping-order">Shipping an Order</a></li>
            <ul>
                <li><a href="#orders-api-overview_create-order-shipment">Create an Order Shipment</a></li>
                <li><a href="#orders-api-overview_multiple-locations">Multiple Locations</a></li>
                <li><a href="#orders-api-overview_custom-quotes">Custom Quotes</a></li>
                <li><a href="#orders-api-overview_shipping-carrier">Shipping Carrier</a></li>
            </ul>
            <li><a href="#orders-api-overview_taxes">Taxes</a></li>
                <ul><li><a href="#orders-api-overview_taxes_avalara">Avalara</a></li></ul>
            <li><a href="#orders-api-overview_calculation_totals">Calculation of Totals</a></li>
            <li><a href="#orders-api-overview_order_status">Order Status</a></li>
            <ul><li><a href="#orders-api-overview_custom-order-status">Custom Order Status</a></li></ul>
            <li><a href="#orders-api-overview_faq">FAQ</a></li>
	</ul>
</div>

<a href='#orders-api-overview_introduction' aria-hidden='true' class='block-anchor'  id='orders-api-overview_introduction'><i aria-hidden='true' class='linkify icon'></i></a>

## Introduction

The Orders API is used when an order is being created manually. If you are using the Server to Server Checkout an Order can be created using the orders endpoint. The order can then be updated if needed.

A sample order workflow might include:
* Creating the order for either an existing customer or guest
* Taking payment using either the Control Panel or third party payment solutions
* Creating a shipment for the order to generate an order confirmation email and mark it as shipped


### Prerequisites:
**BigCommerce Store**  
An active BigCommerce store with a sellable [product](/api-reference/catalog/catalog-api/products/createproduct)

**Scopes**  
The following [OAuth](/api-docs/getting-started/authentication#authentication_oauth-scopes) scopes are required:
* Modify Orders

---

<a href='#orders-api-overview_create-order' aria-hidden='true' class='block-anchor'  id='orders-api-overview_create-order'><i aria-hidden='true' class='linkify icon'></i></a>

## Create an Order

We will go over adding an existing product, adding a custom product, adding a billing address and adding a shipping address. At the end of this section, you will be able to see the full sample request to create an order.

Want to skip ahead and see the [full request](/api-docs/orders/orders-api-overview#orders-api-overview_create-order-example)?

At a minimum, an order needs products and a billing address. If either of these fields are left off the order is rejected.

A order can be created with either an existing Product or using a Custom Product.

<a href='#orders-api-overview_add-produt-options' aria-hidden='true' class='block-anchor'  id='orders-api-overview_add-produt-options'><i aria-hidden='true' class='linkify icon'></i></a>

### Add an Existing Product with Options

**Required Fields:**
- product_id
- product_options (required if adding a product with variants)
	- product_option > id
	- product_option > value
- quantity
- price_inc_tax (optional)
- price_ex_tax (optional)

To get the `product_option > id` and `product_option > value`, make a request to [Get Variants](/api-reference/catalog/catalog-api/product-variants/getvariantsbyproductid). Variants will return the `option_value > id` and `option_values > option_id`.

Make note of the `option_values > id` and `option_values > option_id`. These will be passed into the products array.

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">
    
<!-- theme:  -->
### Pricing
> If price_ex_tax or price_inc_tax is set, then they both need to bet specified. Otherwise the order total will not calculate correctly.

</div>
</div>
</div>


<!--
title: "Example /GET Variants Response"
subtitle: "https://api.bigcommerce.com/stores/{store_hash}/v3/catalog/products/{product_id}/variants"
lineNumbers: true
-->

**Example Variants Response**  
`/GET https://api.bigcommerce.com/stores/{store_hash}/v3/catalog/products/{product_id}/variants`

```json
{
    "data": [
        {
            "id": 421,
            "product_id": 184,
            "sku": "RED",
            "sku_id": 383,
            "price": null,
            "calculated_price": 249,
            "sale_price": null,
            "retail_price": null,
            "map_price": null,
            "weight": null,
            "calculated_weight": 15,
            "width": null,
            "height": null,
            "depth": null,
            "is_free_shipping": false,
            "fixed_cost_shipping_price": null,
            "purchasing_disabled": false,
            "purchasing_disabled_message": "",
            "image_url": "",
            "cost_price": 0,
            "upc": "",
            "mpn": "",
            "gtin": "",
            "inventory_level": 0,
            "inventory_warning_level": 0,
            "bin_picking_number": "",
            "option_values": [
                {
                    "id": 180,
                    "label": "Red",
                    "option_id": 200,
                    "option_display_name": "Color"
                },
                {
                    "id": 192,
                    "label": "Small",
                    "option_id": 230,
                    "option_display_name": "T-Shirt Size"
                }
            ]
        }
...
```

Next, create the products array which includes the custom product and the existing product with product options. Using the `option_id` and `option_value > id` from the previous request we can build the products array. 

`product_options` > `id` = `option_values` > `option_id`

`product_options` > `value` = `option_values` > `id`

The `product_options` > `value` must be passed in as a string.

<!--
title: "Example Products Array"
subtitle: "This is an abbreviated request"
lineNumbers: true
-->
**Example Products Array**  
This is an abbreviated request

```json
"products":[
          {
              "name": "BigCommerce Poster",
              "quantity": 1,
              "price_inc_tax": 10.98,
              "price_ex_tax": 10.00
          },
          {
              "product_id": 184,
                "product_options":[
                    {
                        "id": 200,
                        "value": "180"
                    },
                    {
                        "id": 230,
                        "value": "192"
                    }
                ]

          }
      ]
```

<a href='#orders-api-overview_add-custom-product' aria-hidden='true' class='block-anchor'  id='orders-api-overview_add-custom-product'><i aria-hidden='true' class='linkify icon'></i></a>

### Create a Custom Product

**Required Fields:**
* name – Product Name
* quantity – Number of items
* price_inc_tax – Price including tax
* price_ex_tax – Price excluding tax
* sku (optional)


<!--
title: "Custom Order Products Array"
subtitle: "This is an abbreviated request"
lineNumbers: true
-->
**Example Custom Order Products Array**  
This is an abbreviated request

```json
  "products": [
    {
      "name": "BigCommerce Poster",
      "quantity": 1,
      "price_inc_tax": 10.98,
      "price_ex_tax": 10
    },

     {
      "name": "BigCommerce Coffee Mug",
      "quantity": 1,
      "price_inc_tax": 50.00,
      "price_ex_tax": 45.00
    }
  ]
```

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">
    
<!-- theme:  -->

### Custom Products
> Creating a custom product does not add it to the catalog. Only to the current order.

</div>
</div>
</div>

<a href='#orders-api-overview_order-products' aria-hidden='true' class='block-anchor'  id='orders-api-overview_order-products'><i aria-hidden='true' class='linkify icon'></i></a>

### Order Products

**Pricing**

If price is not specified, it will automatically pick up the price from the store’s product catalog. However, you can override this via `price_inc_tax` and `price_ex_tax`.

If the `price_inc_tax` or `price_ex_tax` specified then any variant pricing is ignored and the order products base_price is updated according to the store settings. For example, if the store is set to display prices with tax included, then the `base_price` will be `price_inc_tax`.


**Stock**

For products that are configured to track stock, the quantity specified on the order will reduce the stock on hand. When there is not enough inventory to fulfill the order, the order will be rejected with an “out of stock” error code.

**Min and Max Quantities**

For products that have min and max quantities specified in their settings, the API will honor these, and will reject orders appropriately.

**Options**

For products where product options are required, the API will validate these requirements to ensure that the product options are specified.

<a href='#orders-api-overview_add-billing-address' aria-hidden='true' class='block-anchor'  id='orders-api-overview_add-billing-address'><i aria-hidden='true' class='linkify icon'></i></a>

### Add a Billing Address

**Required Fields:**
* first_name 
* last_name 
* street_1 
* city 
* state 
* zip 
* country 
* country_iso2 
* email

<!--
title: "Add a Billing Address"
subtitle: "This is an abbreviated request"
lineNumbers: true
-->

**Example Add Billing Address**  
This is an abbreviated request

```json
    "billing_address": {
        "first_name": "Jane",
        "last_name": "Doe",
        "company": "",
        "street_1": "123 Main Street",
        "street_2": "",
        "city": "Austin",
        "state": "Texas",
        "zip": "78751",
        "country": "United States",
        "country_iso2": "US",
        "email": "janedoe@email.com"
    }
```

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">
    
<!-- theme:  -->
### Shipping Address
> If a shipping address is not provided, it defaults to the billing address.

</div>
</div>
</div>

<a href='#orders-api-overview_add-shipping-address' aria-hidden='true' class='block-anchor'  id='orders-api-overview_add-shipping-address'><i aria-hidden='true' class='linkify icon'></i></a>

### Add a Shipping Address - optional

**Required Fields:**
* first_name 
* last_name 
* street_1 
* city 
* state 
* zip 
* country 
* country_iso2 
* email

The shipping address is input as an array object since more than one shipping address can be added at a time. Adding multiple shipping addresses allows for an order to ship to multiple locations.

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">Add a shipping address</div>
    </div><div class="HubBlock-header-subtitle">This is an abbreviated request</div>
</div>

<!--
title: "Add a shipping address"
subtitle: "This is an abbreviated request"
lineNumbers: true
-->

**Example Add a shipping address**  
This is an abbreviated request

```json
    "shipping_addresses": [
        {
            "first_name": "Trishy",
            "last_name": "Test",
            "company": "Acme Pty Ltd",
            "street_1": "666 Sussex St",
            "street_2": "",
            "city": "Anywhere",
            "state": "Some State",
            "zip": "12345",
            "country": "United States",
            "country_iso2": "US",
            "phone": "",
            "email": "trish@testing.com"
        }
```

<a href='#orders-api-overview_other-recommended-fields' aria-hidden='true' class='block-anchor'  id='orders-api-overview_other-recommended-fields'><i aria-hidden='true' class='linkify icon'></i></a>

### Other Recommended Fields
Below are fields which are recommended but not required when creating an order.

**Customer ID**

The customer_id will determine the price the shopper pays for an item. Customer ID’s are tied to customer group discounts and Price Lists. Set the `customer_id` to 0 when creating a guest order.

**Shipping Address**

If a shipping address is not provided, it will default to the billing addresses provided.

**Status**

If a status is not provided, it defaults to a status of 1 or Pending. 

**Discounts**

Manual discounts are supported. To add a manual discount either overwrite the product price or use `discount_amount`. This accepts a fixed dollar amount.

<a href='#orders-api-overview_create-order-example' aria-hidden='true' class='block-anchor'  id='orders-api-overview_create-order-example'><i aria-hidden='true' class='linkify icon'></i></a>

### Create Order Example

After the products, billing and shipping address are added, an order can be created.

<!--
title: "Create an Order Request"
subtitle: ""
lineNumbers: true
-->

**Example Create an Order Request**  
`/POST https://api.bigcommerce.com/stores/{store_hash}/v2/orders`

```json
{
  "status_id": 0,
  "customer_id": 11,
  "billing_address": {
    "first_name": "Jane",
    "last_name": "Doe",
    "street_1": "123 Main Street",
    "city": "Austin",
    "state": "Texas",
    "zip": "78751",
    "country": "United States",
    "country_iso2": "US",
    "email": "janedoe@email.com"
  },
  "shipping_addresses": [
    {
      "first_name": "Trish",
      "last_name": "Test",
      "company": "Acme Pty Ltd",
      "street_1": "666 Sussex St",
      "city": "Austin",
      "state": "Texas",
      "zip": "78751",
      "country": "United States",
      "country_iso2": "US",
      "email": "elsie@example.com"
    }
  ],
  "products": [
    {
      "name": "BigCommerce Poster",
      "quantity": 1,
      "price_inc_tax": 10.98,
      "price_ex_tax": 10
    },
     {
      "name": "BigCommerce Coffee Mug",
      "quantity": 1,
      "price_inc_tax": 50.00,
      "price_ex_tax": 45.00
    },
          {
              "product_id": 184,
                "product_options":[
                    {
                        "id": 200,
                        "value": "180"
                    },
                    {
                        "id": 230,
                        "value": "192"
                    }
                ]

          }
  ]
}
```

---

<a href='#orders-api-guide_order-response' aria-hidden='true' class='block-anchor'  id='orders-api-guide_order-response'><i aria-hidden='true' class='linkify icon'></i></a>

## Order Response

The response will have abbreviated order contents with sub-resources available to get the full order information. The order is automatically set to a status of 1 or Pending. It also returns an id which is the order id. 

In the example below, the order ID is 193.
* The order products sub-resource will list the products added.
* The shipping_addresses sub-resource will have the shipping addresses.
* The coupons sub-resource will have any coupons added to the order.

<div class="HubBlock--callout">
<div class="CalloutBlock--">
<div class="HubBlock-content">
    
<!-- theme:  -->
### Coupons
> Coupons can not be added to an order via API. Use the `discount_amount` instead.

</div>
</div>
</div>


<!--
title: "Create Order Response"
subtitle: ""
lineNumbers: true
-->

**Example Create Order Response**

```json
{
  "id": 193,
  "customer_id": 0,
  "date_created": "Fri, 12 Oct 2018 19:06:23 +0000",
  "date_modified": "Fri, 12 Oct 2018 19:06:23 +0000",
  "date_shipped": "",
  "status_id": 1,
  "status": "Pending",
  "subtotal_ex_tax": "10.0000",
  "subtotal_inc_tax": "10.9800",
  "subtotal_tax": "0.9800",
  "base_shipping_cost": "0.0000",
  "shipping_cost_ex_tax": "0.0000",
  "shipping_cost_inc_tax": "0.0000",
  "shipping_cost_tax": "0.0000",
  "shipping_cost_tax_class_id": 0,
  "base_handling_cost": "0.0000",
  "handling_cost_ex_tax": "0.0000",
  "handling_cost_inc_tax": "0.0000",
  "handling_cost_tax": "0.0000",
  "handling_cost_tax_class_id": 0,
  "base_wrapping_cost": "0.0000",
  "wrapping_cost_ex_tax": "0.0000",
  "wrapping_cost_inc_tax": "0.0000",
  "wrapping_cost_tax": "0.0000",
  "wrapping_cost_tax_class_id": 0,
  "total_ex_tax": "10.0000",
  "total_inc_tax": "10.9800",
  "total_tax": "0.9800",
  "items_total": 1,
  "items_shipped": 0,
  "payment_method": "Manual",
  "payment_provider_id": null,
  "payment_status": "",
  "refunded_amount": "0.0000",
  "order_is_digital": false,
  "store_credit_amount": "0.0000",
  "gift_certificate_amount": "0.0000",
  "ip_address": "",
  "geoip_country": "",
  "geoip_country_iso2": "",
  "currency_id": 1,
  "currency_code": "USD",
  "currency_exchange_rate": "1.0000000000",
  "default_currency_id": 1,
  "default_currency_code": "USD",
  "staff_notes": null,
  "customer_message": null,
  "discount_amount": "0.0000",
  "coupon_discount": "0.0000",
  "shipping_address_count": 1,
  "is_deleted": false,
  "ebay_order_id": "0",
  "cart_id": null,
  "billing_address": {
    "first_name": "Jane",
    "last_name": "Doe",
    "company": "",
    "street_1": "123 Main Street",
    "street_2": "",
    "city": "Austin",
    "state": "Texas",
    "zip": "78751",
    "country": "United States",
    "country_iso2": "US",
    "phone": "",
    "email": "janedoe@email.com",
    "form_fields": []
  },
  "is_email_opt_in": false,
  "credit_card_type": null,
  "order_source": "external",
  "external_source": null,
  "products": {
    "url": "https://api.bigcommerce.com/stores/{store_hash}/v2/orders/193/products",
    "resource": "/orders/193/products"
  },
  "shipping_addresses": {
    "url": "https://api.bigcommerce.com/stores/{store_hash}/v2/orders/193/shippingaddresses",
    "resource": "/orders/193/shippingaddresses"
  },
  "coupons": {
    "url": "https://api.bigcommerce.com/stores/{store_hash}/v2/orders/193/coupons",
    "resource": "/orders/193/coupons"
  },
  "external_id": null,
  "external_merchant_id": null,
  "custom_status": "Pending"
}
```

---

<a href='#orders-api-overview_shipping-order' aria-hidden='true' class='block-anchor'  id='orders-api-overview_shipping-order'><i aria-hidden='true' class='linkify icon'></i></a>

## Shipping an Order
We will go over creating a shipment for an order, shipping quotes, shipping carriers and shipping to multiple locations. 

<a href='#orders-api-overview_create-order-shipment' aria-hidden='true' class='block-anchor'  id='orders-api-overview_create-order-shipment'><i aria-hidden='true' class='linkify icon'></i></a>

### Create an Order Shipment

**Required Fields:**
* order_address_id
* shipping_provider
* items

Once an Order has products, a billing address and at least one shipping address a order shipment can be created. Order shipments are a way to mark an order as shipped with the shipping information. 

To get the `order_address_id`  use the ID returned in [Order Shipping Address](https://developer.bigcommerce.com/api-reference/orders/orders-api/order-shipping-addresses/getordersorderidshippingaddressesid).

The items array requires the product quantity and `order_product_id`. The `order_product_id` is the ID returned from [Order Products](https://developer.bigcommerce.com/api-reference/orders/orders-api/order-products/getordersorderidproducts).

There does not need to be a shipping provider. If the shipping provider is not sent in at all, it will default to custom and a tracking link is not generated. To have the tracking link generated without a shipping provider, provide an empty string. To add a shipping provider, see the available options on [Order Shipment](/api-reference/orders/orders-api/models/ordershipment). 

Once the order shipment is created, it will automatically send out an email to the billing address with the shipment confirmation. To stop this behavior adjust the [Order Notification](https://support.bigcommerce.com/s/article/Customer-Order-Notifications#enable) settings in the Control Panel. 

If the order shipment is deleted, the status of the shipment is still in shipped. The status will need to be [manually changed](/api-reference/orders/orders-api/order-status/getorderstatuses).

<br>

<!--
title: "Create Order Shipment"
subtitle: ""
lineNumbers: true
-->

**Example Create Order Shipment**  
`https://api.bigcommerce.com/stores/{store_hash}/v2/orders/{order_id}/shipments`

```json
{
  "tracking_number": "EJ958083578UK",
  "comments": "Janes Order",
  "order_address_id": "128",
  "shipping_provider": "",
  "items": [
        {
            "order_product_id": 194,
            "product_id": 0,
            "quantity": 1
        },
        {
            "order_product_id": 195,
            "product_id": 0,
            "quantity": 1
        }
  ]
}
```

<!--
title: "Order Shipment Response"
subtitle: ""
lineNumbers: true
-->

**Example Order Shipment Response**

```json
{
    "id": 11,
    "order_id": 228,
    "customer_id": 11,
    "order_address_id": 131,
    "date_created": "Wed, 13 Mar 2019 16:35:37 +0000",
    "tracking_number": "EJ958083578US",
    "merchant_shipping_cost": "0.0000",
    "shipping_method": "None",
    "comments": "Ready to go...",
    "shipping_provider": "",
    "tracking_carrier": "",
    "billing_address": {
        "first_name": "Jane",
        "last_name": "Doe",
        "company": "",
        "street_1": "123 Main Street",
        "street_2": "",
        "city": "Austin",
        "state": "Texas",
        "zip": "78751",
        "country": "United States",
        "country_iso2": "US",
        "phone": "",
        "email": "janedoe@email.com"
    },
    "shipping_address": {
        "first_name": "Trishy",
        "last_name": "Test",
        "company": "Acme Pty Ltd",
        "street_1": "666 Sussex St",
        "street_2": "",
        "city": "Anywhere",
        "state": "Some State",
        "zip": "12345",
        "country": "United States",
        "country_iso2": "US",
        "phone": "",
        "email": "elsie@example.com"
    },
    "items": [
        {
            "order_product_id": 194,
            "product_id": 0,
            "quantity": 1
        },
        {
            "order_product_id": 195,
            "product_id": 0,
            "quantity": 1
        }
    ]
}

```

<a href='#orders-api-overview_multiple-locations' aria-hidden='true' class='block-anchor'  id='orders-api-overview_multiple-locations'><i aria-hidden='true' class='linkify icon'></i></a>

### Multiple Locations

Orders can have multiple shipment locations. There needs to be more than one product or quantity of a product and more than one shipping addresses. A shipping address can be added either during the create or using an update.

To ship to multiple locations create an order shipment for each location and items. Only one POST request per shipment.

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">
    
<!-- theme:  -->
### Shipping Address
> When adding shipping addresses during an order PUT or POST, the API will allow you to add more than is necessary.

</div>
</div>
</div>

<a href='#orders-api-overview_custom-quotes' aria-hidden='true' class='block-anchor'  id='orders-api-overview_custom-quotes'><i aria-hidden='true' class='linkify icon'></i></a>

### Custom Quotes
An order can be created with a `shipping_cost_ex_tax` and `shipping_cost_inc_tax`. This is a way to add a custom shipping amount to an order. This can be added when creating or updating an order. 

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">
    
<!-- theme:  -->
### Shipping Cost
> Both `shipping_cost_ex_tax` and `shipping_cost_inc_tax` must be included otherwise, the final order amount will not be calculated correctly. 

</div>
</div>
</div>

<a href='#orders-api-overview_shipping-carrier' aria-hidden='true' class='block-anchor'  id='orders-api-overview_shipping-carrier'><i aria-hidden='true' class='linkify icon'></i></a>

### Shipping Carrier
Generating a quote through a shipping carrier is currently not supported. A shipping carrier can be specified when creating an Order Shipment. The quote can be generate elsewhere, then update the `shipping_cost_ex_tax` and `shipping_cost_inc_tax` for the order total to be correct.. 

---

<a href='#orders-api-overview_taxes' aria-hidden='true' class='block-anchor'  id='orders-api-overview_taxes'><i aria-hidden='true' class='linkify icon'></i></a>

## Taxes
Tax will be calculated based on the tax rules specified in the store, except in the case of automatic taxes. However, in both cases, you can optionally override the tax values by specifying `price_inc_tax` and `price_ex_tax`.

If a store has automatic tax enabled, BigCommerce does not compute sales tax on orders created via the API.

<a href='#orders-api-overview_taxes_avalara' aria-hidden='true' class='block-anchor'  id='orders-api-overview_taxes_avalara'><i aria-hidden='true' class='linkify icon'></i></a>

### Avalara
When the store is subscribed to Avalara Premium, a value of API Tax Override is written to the Order Tax object’s name field.

Abbreviated state names in shipping and billing addresses will prevent tax documents from being submitted to Avalara. To ensure successful Avalara tax-document submission, spell state names out in full. For example, supplying CA as a state name leads to no tax-document submission. Supplying California as a state name leads to a successful submission.

POST or PUT orders on stores with Avalara Premium cause tax documents to be submitted. If a store has subscribed to Avalara Premium, BigCommerce automatically submits tax documents to Avalara when the order achieves a paid status. See Order Status below for a list of paid statuses.

You can create overrides for calculated values such as product prices, subtotal and totals by sending a fixed value in the request. If values are not supplied for these properties, they will be automatically calculated based on the preset store values and tax rules.


| Existing Status | Status Passed | Resultant Status | Avalara Tax Document Submission |
| --- | --- | --- | --- |
| Any | None | `Pending` | None |
| Paid or `Refunded` | Paid | Paid | None |
| Unpaid or `Refunded` | Unpaid | Unpaid | None |
| Paid or `Refunded` | Unpaid | Unpaid | Tax document voided |
| Unpaid or `Refunded` | Paid | Paid | Tax document submitted |

---

<a href='##orders-api-overview_override-preset-values' aria-hidden='true' class='block-anchor'  id='#orders-api-overview_override-preset-values'><i aria-hidden='true' class='linkify icon'></i></a>

## Overriding Preset Values
You can create overrides for calculated values such as product prices, subtotal and totals by sending a fixed value in the request. If values are not supplied for these properties, they will be automatically calculated based on the preset store values and tax rules.

---

<a href='#orders-api-overview_calculation_totals' aria-hidden='true' class='block-anchor'  id='orders-api-overview_calculation_totals'><i aria-hidden='true' class='linkify icon'></i></a>

## Calculation of Totals
When not specified, order subtotal and total are automatically calculated.

You can override order subtotal and/or total. If you choose to override one, we strongly recommend that override both, because the system will not be able to accurately calculate the other.

Edits to the following properties will trigger a recalculation of the subtotal and total:

*   products
*   discount_amount
*   shipping_cost_ex_tax
*   shipping_cost_inc_tax
*   handling_cost_ex_tax
*   handling_cost_inc_tax
*   wrapping_cost_ex_tax
*   wrapping_cost_inc_tax
*   billing_address
*   shipping_addresses

---

<a href='#orders-api-overview_order_status' aria-hidden='true' class='block-anchor'  id='orders-api-overview_order_status'><i aria-hidden='true' class='linkify icon'></i></a>

## Order Status
When moving through order management, the order status is not automatically updated. This needs to be changed as needed. 

You can specify `status_id`, which will automatically set the corresponding status. When `status_id` is not specified, it will be automatically set to 1, which will set status to Pending.

The following statuses are of the paid type:
* Shipped
* Partially Shipped
* Awaiting Pickup
* Awaiting Shipment
* Completed
* Awaiting Fulfillment

BigCommerce considers all statuses other than those above to be of the unpaid type, except Refunded, which is considered neither paid or unpaid. 

<a href='#orders-api-overview_custom-order-status' aria-hidden='true' class='block-anchor'  id='orders-api-overview_custom-order-status'><i aria-hidden='true' class='linkify icon'></i></a>

### Custom Order Status

The order status label can be changed in the Control Panel. This **does not** change the underlying functionality. See our support article on [Order Status](https://support.bigcommerce.com/s/article/Order-Statuses#rename).

---

<a href='#orders-api-overview_faq' aria-hidden='true' class='block-anchor'  id='orders-api-overview_faq'><i aria-hidden='true' class='linkify icon'></i></a>

## FAQ

**Is adding coupons available?**

Coupon redemption is not currently supported. The `coupon_discount` field can not be written to. A discount can be added to the order by using the `discount_amount`.

**How do I create an order for a guest?**

To specify a guest checkout, set `customer_id` to 0.

**How do I set the order source?**

The `order_source` cannot be specified, and will be set to external. You can optionally specify a value for `external_source` to specify which external source the order is coming from - e.g., POS system X, accounting system Y, etc.

**Can I create an order with only custom products?**

Yes, the products are not added to the store's catalog.

**What is the difference between country_ISO2 and country?** 

In the shipping and billing addresses, there is no requirement to specify country when `country_ISO2` is specified and vice versa.

**How can I take a payment for an Order?**
You can either process payment through a third party or using the Control Panel. 

**Can I generate a shipping quote from a carrier using the API?**

Not at this time. If an order is created either in the Control Panel or via API, then it returns a 204 when trying to get a [Shipping Quote](https://developer.bigcommerce.com/api-reference/orders/orders-api/models/shippingquotes).


---

<a href='#orders-api-overview_resources' aria-hidden='true' class='block-anchor'  id='orders-api-overview_resources'><i aria-hidden='true' class='linkify icon'></i></a>

## Resources
### Webhooks
- [Orders](/api-docs/getting-started/webhooks/webhook-events#webhook-events_orders)

### Related Endpoints
- [Orders](/api-reference/orders/orders-api/orders/postorders)
- [Order Shipments](/api-reference/orders/orders-api/order-shipments/postordersorderidshipments)
- [Order Status](/api-reference/orders/orders-api/order-status/getorderstatuses)
- [Shipping Quotes](/api-reference/orders/orders-api/order-shipping-addresses-quotes/getordersorderidshippingaddressesshippingaddressidshippingquotes)
- [Order Products](/api-reference/orders/orders-api/order-products/getordersorderidproducts)
- [Order Shipping Address](/api-reference/orders/orders-api/order-shipping-addresses/getordersorderidshippingaddresses)
- [Order Coupons](/api-reference/orders/orders-api/order-coupons/getordersorderidcoupons)
    
### Related Articles
- [Order Status](https://support.bigcommerce.com/s/article/Order-Statuses#rename) (BigCommerce Support)
- [Order Notifications](https://support.bigcommerce.com/s/article/Customer-Order-Notifications#enable) (BigCommerce Support) 

