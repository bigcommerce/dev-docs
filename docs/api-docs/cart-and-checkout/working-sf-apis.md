# Working with the Storefront Cart and Checkout APIs

<div class="otp" id="no-index">

### On This Page
- [Prerequisites](#prerequisites)
- [Storefront Cart](#storefront-cart)
- [Storefront Checkout](#storefront-checkout)
- [Troubleshooting](#troubleshooting)
- [Resources](#resources)

</div>

BigCommerce's [Storefront API](https://developer.bigcommerce.com/api-reference#storefront-api) exposes storefront data to Stencil themes. You can use this client API to manage a shopper's cart, checkout, and order data via client-side JavaScript. 


This tutorial exhibits common use cases to help you get started with the Storefront API. Each use case contains JavaScript code snippets you can paste into your browser's console, allowing you to test in the context of your storefront session.


By the end of this tutorial, you should be familiar enough with some of the Storefront API endpoints to test them.


## Prerequisites

For this tutorial, you will need a BigCommerce store with at least two products and a shipping option. 


## Getting Started

To begin, navigate to your storefront and open your browser’s developer console.


For this tutorial, set the credentials option to `same-origin` and the content-type fetch request option to `application/json`. In production, your credentials will depend on your app setup. See [Request.credentials](https://developer.mozilla.org/en-US/docs/Web/API/Request/credentials) to learn more about other possible values. 


## Storefront Cart

The first part of this tutorial will cover using the [Storefront Cart API](https://developer.bigcommerce.com/api-reference/cart-checkout/storefront-cart-api) to create a cart, add a line item, and delete a line item directly from the storefront.

### Create a Cart

You can create a cart by sending a POST request to the [Create Cart](https://developer.bigcommerce.com/api-reference/cart-checkout/storefront-cart-api/cart/createacart) endpoint.


We will create the `createCart()` helper function to accomplish this. Copy and execute the code below to create the function. 


```js
function createCart(url, cartItems) {
   return fetch(url, {
       method: "POST",
       credentials: "same-origin",
       headers: {
           "Content-Type": "application/json"},
       body: JSON.stringify(cartItems),
   })
   .then(response => response.json());
 };
```

The `createCart()` function takes two arguments: 
* `url`: The Storefront Cart API url.
* `cartItems`: A `lineItems` array containing product IDs and quantities of the items we want to add.

To create a cart, execute the code below passing in `productId` values specific to your store.

```js
createCart(`/api/storefront/carts`, {
   "lineItems": [
   {
       "quantity": 1,
       "productId": 86
   },
   {
       "quantity": 1,
       "productId": 88
   }
   ]}
)
.then(data => console.log(JSON.stringify(data)))
.catch(error => console.error(error));
```

Your result should be similar to the one below. 

Response:

```json
{
 "id": "d4e978c2-bdcf-41b0-a49b-fecf4f5223c1",
 "customerId": 0,
 "email": "",
 "currency": {
   "name": "US Dollars",
   "code": "USD",
   "symbol": "$",
   "decimalPlaces": 2
 },
 "isTaxIncluded": false,
 "baseAmount": 274.5,
 "discountAmount": 0,
 "cartAmount": 274.5,
 "coupons": [],
 "discounts": [
	...
 ],
 "lineItems": {
   "physicalItems": [
     {
       "id": "57a877e0-d898-47d0-910d-88656e8dee0c",
       "parentId": null,
       "variantId": 66,
       "productId": 86,
       "sku": "ABS",
       "name": "[Sample] Able Brewing System",
       "url": "https://{store_url}/all/able-brewing-system/",
       "quantity": 1,
		...
       "extendedSalePrice": 225,
       "isShippingRequired": true,
       "type": "physical",
       "giftWrapping": null
     },
     {
       "id": "22c461a2-eff9-4b72-8d22-7c2792ce2c2d",
       "parentId": null,
       "variantId": 67,
       "productId": 88,
       "sku": "CC3C",
       "name": "[Sample] Chemex Coffeemaker 3 Cup",
       "url": "https://{store_url}/all/chemex-coffeemaker-3-cup/",
       "quantity": 1,
		...
       "extendedSalePrice": 49.5,
       "isShippingRequired": true,
       "type": "physical",
       "giftWrapping": null
     }
   ],
  ...
 },
 ...
}
```
Please take note of the value of the `cartId` as it will be used later in the tutorial. 

### Get a Cart

To display the contents of a cart, we need to send a GET request to the [Get a Cart](https://developer.bigcommerce.com/api-reference/cart-checkout/storefront-cart-api/cart/getacart) endpoint. By default, the cart response returns abbreviated product details. To get the full product details, we need to add the `include` query parameter.


Copy and execute the code below to create and subsequently call the `getCart()` helper function. 

```js
function getCart(url) {
   return fetch(url, {
       method: "GET",
       credentials: "same-origin"
   })
   .then(response => response.json());
};
 
getCart('/api/storefront/carts?include=lineItems.digitalItems.options,lineItems.physicalItems.options')
 .then(data => console.log(JSON.stringify(data)))
 .catch(error => console.error(error));
```

Response:

```json
[
 {
   "id": "d4e978c2-bdcf-41b0-a49b-fecf4f5223c1",
   "customerId": 0,
   "email": "",
   "currency": {
     "name": "US Dollars",
     "code": "USD",
     "symbol": "$",
     "decimalPlaces": 2
   },
   "isTaxIncluded": false,
   "baseAmount": 274.5,
   "discountAmount": 0,
   "cartAmount": 274.5,
   "coupons": [],
   "discounts": [
     ...
   ],
   "lineItems": {
     "physicalItems": [
       {
         "id": "57a877e0-d898-47d0-910d-88656e8dee0c",
         "parentId": null,
         "variantId": 66,
         "productId": 86,
         "sku": "ABS",
         "name": "[Sample] Able Brewing System",
         "url": "https://{store_url}/able-brewing-system/",
         "quantity": 1,
         ...
         "extendedSalePrice": 225,
         "isShippingRequired": true,
         "type": "physical",
         "giftWrapping": null,
         "options": []
       },
       {
         "id": "22c461a2-eff9-4b72-8d22-7c2792ce2c2d",
         "parentId": null,
         "variantId": 67,
         "productId": 88,
         "sku": "CC3C",
         "name": "[Sample] Chemex Coffeemaker 3 Cup",
         "url": "https://{store_url}/chemex-coffeemaker-3-cup/",
         "quantity": 1,
          ...
         "extendedSalePrice": 49.5,
         "isShippingRequired": true,
         "type": "physical",
         "giftWrapping": null,
         "options": []
       }
     ],
    ...
   },
   ...
 }
]
```

### Add a Cart Item

To add a new line item to the existing cart, the ID of the cart must be included in the endpoint. The card ID was returned as part of the “Create a Cart” POST request. Alternatively, you can retrieve the cart ID by making a “Get a Cart” GET request.
See [Add Cart Line Items](https://developer.bigcommerce.com/api-reference/cart-checkout/storefront-cart-api/cart-items/addcartlineitem) for more information.

Copy and execute the code below to create the `addCartItem()` helper function.

```js
function addCartItem(url, cartId, cartItems) {
     return fetch(url + cartId + '/items', {
         method: "POST",
         credentials: "same-origin",
         headers: {
             "Content-Type": "application/json"},
         body: JSON.stringify(cartItems),
     })
     .then(response => response.json());
};
```
Call the function to add a new line item to your cart. Make sure to replace the `cartId` and `productId` with your own values.


```js
addCartItem(`/api/storefront/carts/`, `d4e978c2-bdcf-41b0-a49b-fecf4f5223c1`, {
   "lineItems": [
     {
       "quantity": 1,
       "productId": 97
     }
   ]
 })
 .then(data => console.log(JSON.stringify(data)))
 .catch(error => console.error(error));
```

Response: 

```json
{
 "id": "d4e978c2-bdcf-41b0-a49b-fecf4f5223c1",
 "customerId": 0,
 "email": "",
 "currency": {
   "name": "US Dollars",
   "code": "USD",
   "symbol": "$",
   "decimalPlaces": 2
 },
 "isTaxIncluded": false,
 "baseAmount": 394.45,
 "discountAmount": 0,
 "cartAmount": 394.45,
 "coupons": [],
 "discounts": [
  ...
 ],
 "lineItems": {
   "physicalItems": [
     {
       "id": "57a877e0-d898-47d0-910d-88656e8dee0c",
       "parentId": null,
       "variantId": 66,
       "productId": 86,
       "sku": "ABS",
       "name": "[Sample] Able Brewing System",
       "url": "https://{store_url}/able-brewing-system/",
       "quantity": 1,
        ...
       "extendedSalePrice": 225,
       "isShippingRequired": true,
       "type": "physical",
       "giftWrapping": null
     },
     {
       "id": "22c461a2-eff9-4b72-8d22-7c2792ce2c2d",
       "parentId": null,
       "variantId": 67,
       "productId": 88,
       "sku": "CC3C",
       "name": "[Sample] Chemex Coffeemaker 3 Cup",
       "url": "https://{store_url}/chemex-coffeemaker-3-cup/",
       "quantity": 1,
        ...
       "extendedSalePrice": 49.5,
       "isShippingRequired": true,
       "type": "physical",
       "giftWrapping": null
     },
     {
       "id": "3f8dd1ed-f917-41be-b7f7-20c10f406e09",
       "parentId": null,
       "variantId": 69,
       "productId": 97,
       "sku": "TWB",
       "name": "[Sample] Tiered Wire Basket",
       "url": "https://{store_url}/tiered-wire-basket/",
       "quantity": 1,
        ...
       "extendedSalePrice": 119.95,
       "isShippingRequired": true,
       "type": "physical",
       "giftWrapping": null
     }
   ],
  ...
 },
...
}
```

### Delete a Cart Item

To delete a line item from a cart, send a DELETE request to the `/api/storefront/carts/{cartId}/items/{itemId}` endpoint passing in the `cartId` and `itemId` to be deleted.

```js
function deleteCartItem(url, cartId, itemId) {
   return fetch(url + cartId + '/items/' + itemId, {
       method: "DELETE",
       credentials: "same-origin",
       headers: {
           "Content-Type": "application/json",}
})
.then(response => response.json());
};
```

Pass your `cartId` and `itemId` to the `deleteCartItem()` helper function to delete the line item.

```js
deleteCartItem(`/api/storefront/carts/`, `d4e978c2-bdcf-41b0-a49b-fecf4f5223c1`, `3f8dd1ed-f917-41be-b7f7-20c10f406e09`)
.then(data => console.log(JSON.stringify(data)))
.catch(error => console.log(error));
```

Response:

```json
{
 "id": "d4e978c2-bdcf-41b0-a49b-fecf4f5223c1",
 "customerId": 0,
 "email": "",
 "currency": {
   "name": "US Dollars",
   "code": "USD",
   "symbol": "$",
   "decimalPlaces": 2
 },
 "isTaxIncluded": false,
 "baseAmount": 274.5,
 "discountAmount": 0,
 "cartAmount": 274.5,
 "coupons": [],
 "discounts": [
  ...
 ],
 "lineItems": {
   "physicalItems": [
     {
       "id": "57a877e0-d898-47d0-910d-88656e8dee0c",
       "parentId": null,
       "variantId": 66,
       "productId": 86,
       "sku": "ABS",
       "name": "[Sample] Able Brewing System",
       "url": "https://{store_url}/able-brewing-system/",
       "quantity": 1,
       ...
       "extendedSalePrice": 225,
       "isShippingRequired": true,
       "type": "physical",
       "giftWrapping": null
     },
     {
       "id": "22c461a2-eff9-4b72-8d22-7c2792ce2c2d",
       "parentId": null,
       "variantId": 67,
       "productId": 88,
       "sku": "CC3C",
       "name": "[Sample] Chemex Coffeemaker 3 Cup",
       "url": "https://{store_url}/chemex-coffeemaker-3-cup/",
       "quantity": 1,
       ...
       "extendedSalePrice": 49.5,
       "isShippingRequired": true,
       "type": "physical",
       "giftWrapping": null
     }
   ],
  ...
 },
...
}
```

## Storefront Checkout

In this section, we will add a billing address to a checkout, create a consignment, and update a consignment to add a shipping option directly from the storefront. See [Storefront Checkout](https://developer.bigcommerce.com/api-reference/cart-checkout/storefront-checkout-api) for more information.

Before proceeding, make sure you have added two different line items to your cart.

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">
    
<!-- theme:  -->
### Checkout ID
>Note: `checkoutId` is the `cartId`.

</div>
</div>
</div>

### Add a Billing Address

To add a billing address to a checkout, send a POST request to the [Add Checkout Billing Address](https://developer.bigcommerce.com/api-reference/cart-checkout/storefront-checkout-api/checkout-billing-address/checkoutsbillingaddressbycheckoutidpost) endpoint.


Copy and execute the code below to create the `addBillingAddress()` helper function.

```js
function addBillingAddress(url, cartId, data) {
   return fetch(url + cartId + `/billing-address`,  {
       method: "POST",
       credentials: "same-origin",
       headers: {
           "Content-Type": "application/json",
       },
       body: JSON.stringify(data),
   })
   .then(response => response.json());
};
```

Now call the `addBillingAddress()` function making sure to replace the `cartId` with your own value.

```js
addBillingAddress(`/api/storefront/checkouts/`, `d4e978c2-bdcf-41b0-a49b-fecf4f5223c1`, {
   "firstName": "Jane",
   "lastName": "Doe",
   "email": "janedoe@email.com",
   "company": "BigCommerce",
   "address1": "123 Main Street",
   "address2": "Apt 1",
   "city": "Austin",
   "stateOrProvinceCode": "TX",
   "countryCode": "USA",
   "postalCode": "78751"
   })
   .then(data => console.log(JSON.stringify(data)))
   .catch(error => console.error(error));
```

Response:

```json
{
 "id": "d4e978c2-bdcf-41b0-a49b-fecf4f5223c1",
 "cart": {
   "id": "d4e978c2-bdcf-41b0-a49b-fecf4f5223c1",
   "customerId": 0,
   "email": "janedoe@email.com",
   "currency": {
     "name": "US Dollars",
     "code": "USD",
     "symbol": "$",
     "decimalPlaces": 2
   },
   ...
   "coupons": [],
   "discounts": [
    ...
   ],
   "lineItems": {
     "physicalItems": [
       {
         "id": "57a877e0-d898-47d0-910d-88656e8dee0c",
         "parentId": null,
         "variantId": 66,
         "productId": 86,
         "sku": "ABS",
         "name": "[Sample] Able Brewing System",
         "url": "https://{store_url}}/able-brewing-system/",
         "quantity": 1,
        ...
         "extendedSalePrice": 225,
         "comparisonPrice": 225,
         "extendedComparisonPrice": 225,
         "isShippingRequired": true,
         "giftWrapping": null,
         "addedByPromotion": false
       },
       {
         "id": "22c461a2-eff9-4b72-8d22-7c2792ce2c2d",
         "parentId": null,
         "variantId": 67,
         "productId": 88,
         "sku": "CC3C",
         "name": "[Sample] Chemex Coffeemaker 3 Cup",
         "url": "https://{store_url}}/chemex-coffeemaker-3-cup/",
         "quantity": 1,
        ...
         "extendedSalePrice": 49.5,
         "comparisonPrice": 49.5,
         "extendedComparisonPrice": 49.5,
         "isShippingRequired": true,
         "giftWrapping": null,
         "addedByPromotion": false
       }
     ],
    ...
   },
   ...
 },
 "billingAddress": {
   "id": "5e6a8cad71318",
   "firstName": "Jane",
   "lastName": "Doe",
   "email": "janedoe@email.com",
   "company": "BigCommerce",
   "address1": "123 Main Street",
   "address2": "Apt 1",
   "city": "Austin",
   "stateOrProvince": "Texas",
   "stateOrProvinceCode": "TX",
   "country": "",
   "countryCode": "",
   "postalCode": "78751",
   "phone": "",
   "customFields": []
 },
 "consignments": [],
 "orderId": null,
 "shippingCostTotal": 0,
 "shippingCostBeforeDiscount": 0,
 "handlingCostTotal": 0,
 "taxTotal": 27.45,
 "coupons": [],
 "taxes": [
   {
     "name": "Tax",
     "amount": 27.45
   }
 ],
 "subtotal": 274.5,
 "grandTotal": 301.95,
...
 "customerMessage": ""
}
```

### Add a New Consignment 

A consignment consists of a shipping address with the associated line items. At a minimum, one shipping address with line items and shipping options must be included in the checkout. If multiple shipping locations are used, match each `lineItem` with the correct shipping address.  When adding a shipping address to the checkout, include the `?include=consignments.availableShippingOptions` query parameter to return the shipping options available for any address. 

See [Add New Consignment to Checkout](https://developer.bigcommerce.com/api-reference/cart-checkout/storefront-checkout-api/checkout-consignments/checkoutsconsignmentsbycheckoutidpost) for more information.


Create the `createConsignment()`helper function to test this functionality.


```js
function createConsignment(url, cartId, data) {
 return fetch(url + cartId + `/consignments?include=consignments.availableShippingOptions`,   {
     method: "POST",
     credentials: "same-origin",
     headers: {
         "Content-Type": "application/json" ,
     },
     body: JSON.stringify(data),
 })
 .then(response => response.json()); 
 };
```

Copy and execute the code below to create a new consignment. Make sure to replace the `cartId` with your own value.


```js
createConsignment(`/api/storefront/checkouts/`, `d4e978c2-bdcf-41b0-a49b-fecf4f5223c1`,
   [{
     "shippingAddress": {
         "firstName": "Jane",
         "lastName": "Doe",
         "email": "janedoe@email.com",
         "company": "BigCommerce",
         "address1": "123 Main Street",
         "address2": "Apt 1",
         "city": "Austin",
         "stateOrProvinceCode": "TX",
         "countryCode": "US",
         "postalCode": "78751"
     },
     "lineItems": [{
         "itemId": "57a877e0-d898-47d0-910d-88656e8dee0c",
         "quantity": 1
     }]
   },
   {
     "shippingAddress": {
         "firstName": "John",
         "lastName": "Doe",
         "email": "johnedoe@email.com",
         "company": "BigCommerce",
         "address1": "123 South Street",
         "address2": "Apt 5",
         "city": "Austin",
         "stateOrProvinceCode": "TX",
         "countryCode": "US",
         "postalCode": "78726"
     },
     "lineItems": [{
         "itemId": "22c461a2-eff9-4b72-8d22-7c2792ce2c2d",
         "quantity": 1
     }]
   }]
 )
 .then(data => console.log(JSON.stringify(data)))
 .catch(error => console.error(error));
```

Response:

```json
{
  "id": "d4e978c2-bdcf-41b0-a49b-fecf4f5223c1",
    "cart": {
      "id": "d4e978c2-bdcf-41b0-a49b-fecf4f5223c1",
      "customerId": 0,
      "email": "janedoe@email.com",
      "currency": {
        "name": "US Dollars",
        "code": "USD",
        "symbol": "$",
        "decimalPlaces": 2
      },
    ...
      "coupons": [],
      "discounts": [
        ...
      ],
      "lineItems": {
        "physicalItems": [
          {
            "id": "57a877e0-d898-47d0-910d-88656e8dee0c",
            "parentId": null,
            "variantId": 66,
            "productId": 86,
            "sku": "ABS",
            "name": "[Sample] Able Brewing System",
            "url": "https://{store_url}/able-brewing-system/",
            "quantity": 1,
            ...
            "extendedSalePrice": 225,
            "comparisonPrice": 225,
            "extendedComparisonPrice": 225,
            "isShippingRequired": true,
            "giftWrapping": null,
            "addedByPromotion": false
          },
          {
            "id": "22c461a2-eff9-4b72-8d22-7c2792ce2c2d",
            "parentId": null,
            "variantId": 67,
            "productId": 88,
            "sku": "CC3C",
            "name": "[Sample] Chemex Coffeemaker 3 Cup",
            "url": "https://{store_url}/chemex-coffeemaker-3-cup/",
            "quantity": 1,
            ...
            "comparisonPrice": 49.5,
            "extendedComparisonPrice": 49.5,
            "isShippingRequired": true,
            "giftWrapping": null,
            "addedByPromotion": false
          }
        ],
        ...
      },
      ...
    },
    "billingAddress": {
      "id": "5e6a8cad71318",
      "firstName": "Jane",
      "lastName": "Doe",
      "email": "janedoe@email.com",
      "company": "BigCommerce",
      "address1": "123 Main Street",
      "address2": "Apt 1",
      "city": "Austin",
      "stateOrProvince": "",
      "stateOrProvinceCode": "",
      "country": "",
      "countryCode": "",
      "postalCode": "78751",
      "phone": "",
      "customFields": []
    },
    "consignments": [
      {
        "id": "5e6a91ff83c6d",
        "shippingCost": 0,
        ...
        "lineItemIds": [
          "57a877e0-d898-47d0-910d-88656e8dee0c"
        ],
        "selectedShippingOption": null,
        "shippingAddress": {
          "firstName": "Jane",
          "lastName": "Doe",
          "email": "janedoe@email.com",
          "company": "BigCommerce",
          "address1": "123 Main Street",
          "address2": "Apt 1",
          "city": "Austin",
          "stateOrProvince": "Texas",
          "stateOrProvinceCode": "TX",
          "country": "United States",
          "countryCode": "US",
          "postalCode": "78751",
          "phone": "",
          "customFields": []
        },
        "availableShippingOptions": [
          {
            "id": "80ad65f7946c23bd4ee9a531d85c5e21",
            "type": "shipping_pickupinstore",
            "description": "Pickup In Store",
            "imageUrl": "",
            "cost": 0,
            ...
          },
          {
            "id": "4dcbf24f457dd67d5f89bcf374e0bc9b",
            "type": "freeshipping",
            "description": "Free Shipping",
            "imageUrl": "",
            "cost": 0,
            ...
          }
        ]
      },
      {
        "id": "5e6a91ffeac84",
        "shippingCost": 0,
        ...
        "lineItemIds": [
          "22c461a2-eff9-4b72-8d22-7c2792ce2c2d"
        ],
        "selectedShippingOption": null,
        "shippingAddress": {
          "firstName": "John",
          "lastName": "Doe",
          "email": "johnedoe@email.com",
          "company": "BigCommerce",
          "address1": "123 South Street",
          "address2": "Apt 5",
          "city": "Austin",
          "stateOrProvince": "Texas",
          "stateOrProvinceCode": "TX",
          "country": "United States",
          "countryCode": "US",
          "postalCode": "78726",
          "phone": "",
          "customFields": []
        },
        "availableShippingOptions": [
          {
            "id": "80ad65f7946c23bd4ee9a531d85c5e21",
            "type": "shipping_pickupinstore",
            "description": "Pickup In Store",
            "imageUrl": "",
            "cost": 0,
            "transitTime": "",
            "isRecommended": false,
            "additionalDescription": ""
          },
          {
            "id": "4dcbf24f457dd67d5f89bcf374e0bc9b",
            "type": "freeshipping",
            "description": "Free Shipping",
            "imageUrl": "",
            "cost": 0,
            ...
          },
          {
            "id": "85dfaf5f834d7e594f0bd7cf67d5b200",
            "type": "shipping_flatrate",
            "description": "Flat Rate",
            "imageUrl": "",
            "cost": 5,
            ...
          },
          {
            "id": "8809b0bbcc8bdc2d5cad2a4fcbd6cf09",
            "type": "shipping_byweight",
            "description": "Ship by Weight",
            "imageUrl": "",
            "cost": 10,
            ...
          }
        ]
      }
    ],
    "orderId": null,
    "shippingCostTotal": 0,
    "shippingCostBeforeDiscount": 0,
    "handlingCostTotal": 0,
    "taxTotal": 22.65,
    ...
    "subtotal": 274.5,
    ...
    "customerMessage": ""
  }
```

### Update a Consignment to Add a Shipping Option

To update a consignment, add your `consignmentId` and the appropriate `shippingOptionId` (located inside of the `availableShippingOptions` object) to the PUT request parameters. See [Update Checkout Consignment](https://developer.bigcommerce.com/api-reference/cart-checkout/storefront-checkout-api/checkout-consignments/checkoutsconsignmentsbycheckoutidandconsignmentidput) for more information.

>**Note:** Only one consignment can be updated at a time. 


Create the `updateConsignment()` helper function to accomplish this. 


```js
function updateConsignment(url, cartId, consignmentId, data,) {
 return fetch(url + cartId + `/consignments/` + consignmentId,   {
     method: "PUT",
     credentials: "same-origin",
     headers: {
         "Content-Type": "application/json;",
     },
     body: JSON.stringify(data),
 })
 .then(response => response.json());
};
```

Execute the code below to update the consignment, replacing `cartId` , `consigmentId`, and `shippingOptionId` with your own values.


```js
 updateConsignment(`/api/storefront/checkouts/`, `d4e978c2-bdcf-41b0-a49b-fecf4f5223c1`, `5e6a91ff83c6d`,{
   "shippingOptionId": "4dcbf24f457dd67d5f89bcf374e0bc9b"
})
 .then(data => console.log(JSON.stringify(data)))
 .catch(error => console.error(error));
```

Response:

```json
 "id": "d4e978c2-bdcf-41b0-a49b-fecf4f5223c1",
 "cart": {
   "id": "d4e978c2-bdcf-41b0-a49b-fecf4f5223c1",
   "customerId": 0,
   "email": "janedoe@email.com",
   "currency": {
     "name": "US Dollars",
     "code": "USD",
     "symbol": "$",
     "decimalPlaces": 2
   },
   ...
   "coupons": [],
   "discounts": [
    ...
   ],
   "lineItems": {
     "physicalItems": [
       {
         "id": "57a877e0-d898-47d0-910d-88656e8dee0c",
         "parentId": null,
         "variantId": 66,
         "productId": 86,
         "sku": "ABS",
         "name": "[Sample] Able Brewing System",
         "url": "https://{store_url}/able-brewing-system/",
         "quantity": 1,
         ...
         "extendedSalePrice": 225,
         "comparisonPrice": 225,
         "extendedComparisonPrice": 225,
         "isShippingRequired": true,
         "giftWrapping": null,
         "addedByPromotion": false
       },
       {
         "id": "22c461a2-eff9-4b72-8d22-7c2792ce2c2d",
         "parentId": null,
         "variantId": 67,
         "productId": 88,
         "sku": "CC3C",
         "name": "[Sample] Chemex Coffeemaker 3 Cup",
         "url": "https://{store_url}/chemex-coffeemaker-3-cup/",
         "quantity": 1,
         ...
         "extendedSalePrice": 49.5,
         "comparisonPrice": 49.5,
         "extendedComparisonPrice": 49.5,
         "isShippingRequired": true,
         "giftWrapping": null,
         "addedByPromotion": false
       }
     ],
    ...
   },
   ...
 },
 "billingAddress": {
   "id": "5e6a8cad71318",
   "firstName": "Jane",
   "lastName": "Doe",
   "email": "janedoe@email.com",
   "company": "BigCommerce",
   "address1": "123 Main Street",
   "address2": "Apt 1",
   "city": "Austin",
   "stateOrProvince": "",
   "stateOrProvinceCode": "",
   "country": "",
   "countryCode": "",
   "postalCode": "78751",
   "phone": "",
   "customFields": []
 },
 "consignments": [
   {
     "id": "5e6a91ff83c6d",
     "shippingCost": 0,
     "handlingCost": 0,
     "couponDiscounts": [],
     "discounts": [],
     "lineItemIds": [
       "57a877e0-d898-47d0-910d-88656e8dee0c"
     ],
     "selectedShippingOption": {
       "id": "4dcbf24f457dd67d5f89bcf374e0bc9b",
       "type": "freeshipping",
       "description": "Free Shipping",
       "imageUrl": "",
       "cost": 0,
       "transitTime": "",
       "additionalDescription": ""
     },
     "shippingAddress": {
       "firstName": "Jane",
       "lastName": "Doe",
       "email": "janedoe@email.com",
       "company": "BigCommerce",
       "address1": "123 Main Street",
       "address2": "Apt 1",
       "city": "Austin",
       "stateOrProvince": "Texas",
       "stateOrProvinceCode": "TX",
       "country": "United States",
       "countryCode": "US",
       "postalCode": "78751",
       "phone": "",
       "customFields": []
     }
   },
   {
     "id": "5e6a91ffeac84",
     "shippingCost": 0,
     "handlingCost": 0,
     "couponDiscounts": [],
     "discounts": [],
     "lineItemIds": [
       "22c461a2-eff9-4b72-8d22-7c2792ce2c2d"
     ],
     "selectedShippingOption": null,
     "shippingAddress": {
       "firstName": "John",
       "lastName": "Doe",
       "email": "johnedoe@email.com",
       "company": "BigCommerce",
       "address1": "123 South Street",
       "address2": "Apt 5",
       "city": "Austin",
       "stateOrProvince": "Texas",
       "stateOrProvinceCode": "TX",
       "country": "United States",
       "countryCode": "US",
       "postalCode": "78726",
       "phone": "",
       "customFields": []
     }
   }
 ],
 "orderId": null,
 "shippingCostTotal": 0,
 "shippingCostBeforeDiscount": 0,
 "handlingCostTotal": 0,
 "taxTotal": 22.65,
 "coupons": [],
 "taxes": [
   {
     "name": "Tax",
     "amount": 22.65
   }
 ],
 "subtotal": 274.5,
...
}
```

## Troubleshooting

**Did you get a 404?**  
Make sure you have at least one item in your cart. Removing all items deletes the cart and returns a 404 error. 


## Resources

### Related Endpoints
- [Storefront Cart](/api-reference/cart-checkout/storefront-cart-api)
- [Storefront Checkout](/api-reference/cart-checkout/storefront-checkout-api)

### Related Articles
- [Let’s Talk About CORS](https://medium.com/bigcommerce-developer-blog/lets-talk-about-cors-84800c726919) (Developer Blog)
