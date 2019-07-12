<h1>Working with the Storefront Cart and Checkout APIs</h1>
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#working-sf-apis_prerequisites">Prerequisites</a></li>
    <li><a href="#working-sf-apis_create-postdata">Create postData() Function</a></li>
    <li><a href="#working-sf-apis_storefront-cart">Storefront Cart</a></li>
    <li><a href="#working-sf-apis_storefront-checkout">Storefront Checkout</a></li>
    <li><a href="#working-sf-apis_troubleshooting">Troubleshooting</a></li>
	</ul>
</div>

<a href='#working-sf-apis_prerequisites' aria-hidden='true' class='block-anchor'  id='working-sf-apis_prerequisites'><i aria-hidden='true' class='linkify icon'></i></a>

## Prerequisites:
* Chrome/Firefox/Safari - Fetch does not work every version of [Internet Explorer](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#Browser_compatibility). We recommend installing a [polyfill](https://github.com/github/fetch#html), then use fetch as usual.
* BigCommerce Store with at least two [products](/api-reference/catalog/catalog-api/products/createproduct) and a [shipping option](/api-docs/shipping/shipping-overview#shipping_shipping-zone-methods) available. 
* Familiar with browser developer console

This tutorial reviews the Fetch API and then uses it to complete some storefront actions. 

Interaction with the Storefront APIs should be done using JavaScript. The Storefront APIs do not require API Tokens to work. The URL should be served over https and be on the [permanent URL](https://forum.bigcommerce.com/s/article/Changing-Domains); otherwise, it can cause [CORs](https://developers.google.com/web/ilt/pwa/working-with-the-fetch-api#cross-origin_requests) errors in the console.

---

<a href='#working-sf-apis_create-postdata' aria-hidden='true' class='block-anchor'  id='working-sf-apis_create-postdata'><i aria-hidden='true' class='linkify icon'></i></a>

## Create postData() function

Below is the function we are going to use to create a new cart using the Storefront Cart API.

<!--
title: "postData"
subtitle: ""
lineNumbers: true
-->
**postData**

```js
postData(`/api/storefront/cart`, {
        "lineItems": [
        {
            "quantity": 1,
            "productId": 196
        },
        {
            "quantity": 1,
            "productId": 184
        }
        ]}
    )
  .then(data => console.log(JSON.stringify(data))) 
  .catch(error => console.error(error));

function postData(url = ``, cartItems = {}) {
      return fetch(url, {
          method: "POST",
          credentials: "same-origin",
          headers: {
              "Content-Type": "application/json" },
          body: JSON.stringify(cartItems), 
      })
      .then(response => response.json()); 
  }
```

Let’s review the function. First, we call the `postData()` function, which is defined at the bottom of the code excerpt.

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">
    
<!-- theme:  -->
### Hoisted Functions
> JavaScript allows function declarations to be [hoisted](https://scotch.io/tutorials/understanding-hoisting-in-javascript#toc-hoisting-functions), so the function postData() can be called before being defined.

</div>
</div>
</div>

The `postData()` function accepts two arguments: a URL string and a body. 

The URL string that we pass in is `/api/storefront/cart`. There is no need to provide the full store URL when making the request in the browser because the URL path appends to the current website URL.

For the request body, we pass in the `lineItems` array, which contains the product IDs and quantities to add to cart. 

Note that when we define the `postData` function, we set the body parameter to cartItems, which is an empty object. When the `lineItems` array is passed to the function, the cartItems object automatically wraps the array in a set of outer curly braces. Keep this in mind when adapting this code to accept a different request body--otherwise, your request body may wind up with an extra set of curly braces.  

After the line items, fetch uses [then()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) which accepts the data that is returned and prints it to the console. 

If there is an error, the next line [catch()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch) prints the returned error to the console. 

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name"></div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: ""
subtitle: ""
lineNumbers: true
-->

```js
function postData(url = ``, cartItems = {}) {
      return fetch(url, {
          method: "POST",
          credentials: "same-origin",
          headers: {
              "Content-Type": "application/json" },
          body: JSON.stringify(cartItems), 
      })
     .then(response => response.json()); 
  }
```

Next, we are going to walk through the postData() function above. Here the arguments for `url` and `cartItems` are defined. In later examples, you will see we can pass in different items depending on what we need in the fetch request.  postData() returns another function, fetch(). Fetch takes a URL, method and a body. Other [arguments](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#Supplying_request_options) can be added such as credentials, headers, etc. 

[Credentials](https://github.com/github/fetch#sending-cookies) are set to [same-origin](https://developer.mozilla.org/en-US/docs/Web/API/Request/credentials). The credentials that you need will depend on your app setup. Review your app setup carefully; otherwise, this will cause [CORs](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) errors. Below is a simplified guide on when to use each type of credential.

| Credential | When to Use |
| -- | -- |
| same-origin | If the request and response server is the same. Ex. bigcommerce.com => bigcommerce.com |
| include | If the request and response domain are different. Ex. bigcommerce.com => developers.bigcommerce.com  |
| omit | To disable sending cookies to any domain |

Content-Type is set to application/json. The body data needs to match the content-type. BigCommerce only sends and accepts the Storefront API  data in json. 

 The body is set to [JSON.stringify()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) which converts JavaScript values to a string. 

Finally, `.then()` is parsing the response to JSON. 

Now that we have the basics of creating a function with the fetch() API, we are going to use it to create a cart, get a cart and delete cart items. 

---

<a href='#working-sf-apis_storefront-cart' aria-hidden='true' class='block-anchor'  id='working-sf-apis_storefront-cart'><i aria-hidden='true' class='linkify icon'></i></a>

## Storefront Cart

### Create a Cart

First, we pass in the request URL to create a cart into the function call. 

Then we need to pass in the `lineItems` array. The `quantity` and `productId` are required to create a cart. If there are [variants](/api-reference/catalog/catalog-api/product-variants/getvariantsbyproductid) then the variantId or optionId with the optionValues need to be added.  See [Create Cart](/api-reference/cart-checkout/storefront-cart-api/cart/createacart) for more examples. The response will be printed to the browser console.  Make sure to note the value for cartId as it will be used later.


<!--
title: "Create Cart"
subtitle: ""
lineNumbers: true
-->

**Create a Cart**  
`/POST https://<store_url>/api/storefront/carts`

```js
postData(`/api/storefront/cart`, {
        "lineItems": [
        {
            "quantity": 1,
            "productId": 191
        },
        {
            "quantity": 1,
            "productId": 185
        }
        ]}
    )
  .then(data => console.log(JSON.stringify(data))) 
  .catch(error => console.error(error));

function postData(url = ``, cartItems = {}) {
      return fetch(url, {
          method: "POST",
          credentials: "same-origin",
          headers: {
              "Content-Type": "application/json" },
          body: JSON.stringify(cartItems), 
      })
      .then(response => response.json()); 
  }
```

<!--
title: "Create Cart Response"
subtitle: ""
lineNumbers: true
-->

**Example Response Create a Cart**

```json
{
	"id": "1650fb51-172b-4cde-a220-90c6a8ef9293",
	"customerId": 0,
	"email": "",
	"currency": {
		"name": "US Dollars",
		"code": "USD",
		"symbol": "$",
		"decimalPlaces": 2
	},
	"isTaxIncluded": false,
	"baseAmount": 73.95,
	"discountAmount": 0,
	"cartAmount": 73.95,
	"coupons": [],
	"discounts": [{
		"id": "7349b13a-1453-4050-a769-1a6ad1823369",
		"discountedAmount": 0
	}, {
		"id": "4a69cbdf-4320-4e1f-852b-0edc2a55f13a",
		"discountedAmount": 0
	}],
	"lineItems": {
		"physicalItems": [{
			"id": "7349b13a-1453-4050-a769-1a6ad1823369",
			"parentId": null,
			"variantId": 362,
			"productId": 191,
			"sku": "",
			"name": "Openhouse No. 3",
			"url": "https://{store_url)/all/openhouse-no-3/",
			"quantity": 1,
			"brand": "Openhouse Magazine",
			"isTaxable": true,
			"imageUrl": "https://cdn11.bigcommerce.com/s-{store_hash)/products/191/images/475/openhousevol3_1024x1024__59692__16355.1534344544.330.500.jpg?c=2",
			"discounts": [],
			"discountAmount": 0,
			"couponAmount": 0,
			"listPrice": 27.95,
			"salePrice": 27.95,
			"extendedListPrice": 27.95,
			"extendedSalePrice": 27.95,
			"isShippingRequired": true,
			"type": "physical",
			"giftWrapping": null
		}, {
			"id": "4a69cbdf-4320-4e1f-852b-0edc2a55f13a",
			"parentId": null,
			"variantId": 356,
			"productId": 185,
			"sku": "",
			"name": "Utility Caddy",
			"url": "https://{store_url)/all/utility-caddy/",
			"quantity": 1,
			"brand": "OFS",
			"isTaxable": true,
			"imageUrl": "https://cdn11.bigcommerce.com/s-{store_hash)/products/185/images/449/utilitybucket1_1024x1024__78563__75042.1534344535.330.500.jpg?c=2",
			"discounts": [],
			"discountAmount": 0,
			"couponAmount": 0,
			"listPrice": 46,
			"salePrice": 46,
			"extendedListPrice": 46,
			"extendedSalePrice": 46,
			"isShippingRequired": true,
			"type": "physical",
			"giftWrapping": null
		}],
		"digitalItems": [],
		"giftCertificates": [],
		"customItems": []
	},
	"createdTime": "2018-11-06T19:22:51+00:00",
	"updatedTime": "2018-11-06T19:22:51+00:00"
}
```

### Get a Cart


The function below is slightly different. The postData() that was present in Create a Cart above is removed since the function only needs to print the response data to the console. To return the full product data in a cart, an include query parameter must be added. See [Get Cart endpoint](/api-reference/cart-checkout/storefront-cart-api/cart/getacart) for more details. 


<!--
title: "Get Cart"
subtitle: ""
lineNumbers: true
-->
**Example Get a Cart**
`/GET https://<store_url>/api/storefront/carts`

```js
fetch('/api/storefront/cart?include=lineItems.digitalItems.options,lineItems.physicalItems.options', {
  credentials: 'same-origin'}
     )
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(JSON.stringify(myJson));
  });
```

<!--
title: "Get Cart Response"
subtitle: ""
lineNumbers: true
-->
**Example Get Cart Response**

```json
[{
	"id": "1650fb51-172b-4cde-a220-90c6a8ef9293",
	"customerId": 0,
	"email": "",
	"currency": {
		"name": "US Dollars",
		"code": "USD",
		"symbol": "$",
		"decimalPlaces": 2
	},
	"isTaxIncluded": false,
	"baseAmount": 73.95,
	"discountAmount": 0,
	"cartAmount": 73.95,
	"coupons": [],
	"discounts": [{
		"id": "7349b13a-1453-4050-a769-1a6ad1823369",
		"discountedAmount": 0
	}, {
		"id": "4a69cbdf-4320-4e1f-852b-0edc2a55f13a",
		"discountedAmount": 0
	}],
	"lineItems": {
		"physicalItems": [{
			"id": "7349b13a-1453-4050-a769-1a6ad1823369",
			"parentId": null,
			"variantId": 362,
			"productId": 191,
			"sku": "",
			"name": "Openhouse No. 3",
			"url": "https://{store_url)/all/openhouse-no-3/",
			"quantity": 1,
			"brand": "Openhouse Magazine",
			"isTaxable": true,
			"imageUrl": "https://cdn11.bigcommerce.com/s-{store_hash)/products/191/images/475/openhousevol3_1024x1024__59692__16355.1534344544.330.500.jpg?c=2",
			"discounts": [],
			"discountAmount": 0,
			"couponAmount": 0,
			"listPrice": 27.95,
			"salePrice": 27.95,
			"extendedListPrice": 27.95,
			"extendedSalePrice": 27.95,
			"isShippingRequired": true,
			"type": "physical",
			"giftWrapping": null,
			"options": [{
				"name": "Add a $5 Donation",
				"nameId": 82,
				"value": "",
				"valueId": 186
			}]
		}, {
			"id": "4a69cbdf-4320-4e1f-852b-0edc2a55f13a",
			"parentId": null,
			"variantId": 356,
			"productId": 185,
			"sku": "",
			"name": "Utility Caddy",
			"url": "https://{store_url)/all/utility-caddy/",
			"quantity": 1,
			"brand": "OFS",
			"isTaxable": true,
			"imageUrl": "https://cdn11.bigcommerce.com/s-{store_hash)/products/185/images/449/utilitybucket1_1024x1024__78563__75042.1534344535.330.500.jpg?c=2",
			"discounts": [],
			"discountAmount": 0,
			"couponAmount": 0,
			"listPrice": 46,
			"salePrice": 46,
			"extendedListPrice": 46,
			"extendedSalePrice": 46,
			"isShippingRequired": true,
			"type": "physical",
			"giftWrapping": null,
			"options": []
		}],
		"digitalItems": [],
		"giftCertificates": [],
		"customItems": []
	},
	"createdTime": "2018-11-06T19:22:51+00:00",
	"updatedTime": "2018-11-06T19:22:51+00:00"
}]
```

### Add Item to Cart

To add a line item, adjust the fetch statement. It needs to accept the `url` and `cartId`.  `cartItems` is again passed as the body of the request. 

<!--
title: "Add Item to Cart"
subtitle: ""
lineNumbers: true
-->

**Example Add Item to a Cart**  
`/PUT https://<store_url>/api/storefront/carts/{cartId}/items`

```js
postData(`/api/storefront/carts/`, `1d2d2445-5e5d-4798-ada1-37652a7822c8` ,{
    "lineItems": [
      {
        "quantity": 3,
        "productId": 133
      }
    ]
  })
  .then(data => console.log(JSON.stringify(data))) 
  .catch(error => console.error(error));
  
function postData(url = ``, cartId = ``, cartItems = {}) {
      return fetch(url + cartId + '/items', {
          method: "POST",
          credentials: "same-origin",
          headers: {
              "Content-Type": "application/json" },
          body: JSON.stringify(cartItems), 
      })
      .then(response => response.json()); 
}
```

### Delete Cart Item

In the code below there are a few changes. One is the arguments for deleteCartItem() now accept a cartId and itemId as strings. These are passed into the deleteCartItem() at the top. The URL is being built using concatenation. 

We have also introduced a new way to handle errors. Error handling in fetch can be pulled out into a standalone function and be used to return any data or messages you want as a way to keep the code [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself). 

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">
    
<!-- theme: warning -->
### Delete Cart Items
> Deleting the last item in your cart deletes the cart.

</div>
</div>
</div>



<!--
title: "Delete Cart Item"
subtitle: ""
lineNumbers: true
-->

**Example Delete Cart Item**  
`https://<store_url>/api/storefront/carts/{cartId}/items/{itemId}`

```js
deleteCartItem(`/api/storefront/carts/`, `f996cb68-b1df-422e-b3dd-0f90faa10210`, `e51ac38d-dacd-449d-b503-f087f14bde67`)
.then(data => console.log(JSON.stringify(data)))
.catch(error => console.log(error))

function deleteCartItem(url = ``, cartId = ``, itemId = ``) {
return fetch(url + cartId + '/items/' + itemId, {
method: "DELETE",
credentials: "same-origin",
headers:

{ "Content-Type": "application/json", }
})
.then(response => response.json());
}
```

<a href='#working-sf-apis_storefront-checkout' aria-hidden='true' class='block-anchor'  id='working-sf-apis_storefront-checkout'><i aria-hidden='true' class='linkify icon'></i></a>

## Storefront Checkout
Next, we will cover using the Storefront Checkout to add a billing address, add a shipping address and update a shipping address to add the shipping option.

Make sure you have created a cart using the Storefront Cart, added two different `lineItems` and have a shipping method set up on the store. See [Create Cart](#working-sf-apis_storefront-cart) above if you deleted your cart and need to make a new one. 

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">
    
<!-- theme:  -->
### Checkout ID
> checkoutId and the cartId are same.

</div>
</div>
</div>

### Add Billing Address to Checkout

A billing address is required to complete a checkout. In postData() we pass in the `checkoutId` and the billing address object.

<!--
title: "Add billing address"
subtitle: ""
lineNumbers: true
-->

**Example Add Billing Address**  
`https://<store_url>/api/storefront/checkouts/{checkoutId}/billing-address`

```js
postData(`/api/storefront/checkouts/`, `e8b7c677-f67a-4e39-a5ed-f405c9a06bcf`, {
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

function postData(url = ``, checkoutId = ``, data = {},) {
    return fetch(url + checkoutId + `/billing-address`,  {
        method: "POST", 
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json()); 
}

```

### Add Shipping Address or Consignment to Checkout 

A consignment consists of a shipping address with the associated lineItems.  At a minimum, at least one shipping address with line items and shipping options must be part of the checkout.

A shipping address can only be added to checkout with lineItems. If multiple shipping locations are used, match each `lineItem` with the correct shipping address as shown in the example below. For more examples see [Create Consignment](/api-reference/cart-checkout/storefront-checkout-api/checkout/checkoutsconsignmentsbycheckoutidpost).

When adding a shipping address to the checkout `?include=consignments.availableShippingOptions` must be included to return the shipping options available for any address. To add the shipping option a [put request](/api-reference/cart-checkout/storefront-checkout-api/checkout/checkoutsconsignmentsbycheckoutidandconsignmentidput) must be sent for each consignment. We will cover this in the next section. 

To get the line item IDs needed for consignment, send a request to [/GET Checkout](/api-reference/cart-checkout/storefront-checkout-api/checkout/checkoutsbycheckoutidget). Try to modify the /GET Cart request so it returns Checkout Details. If you are having trouble, see the code sample below. 

<!--
title: "Get Checkout by ID"
subtitle: ""
lineNumbers: true
-->
**Example Get Checkout by ID**  
`/GET https://<store_url>/api/storefront/checkouts/{checkoutId}`

```js
fetch('/api/storefront/checkouts/1650fb51-172b-4cde-a220-90c6a8ef9293', {
  credentials: 'same-origin'}
     )
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(JSON.stringify(myJson));
  });
```

<!--
title: "Get Checkout Response"
subtitle: ""
lineNumbers: true
-->
**Example Get Checkout Response**

```json
{
	"id": "1650fb51-172b-4cde-a220-90c6a8ef9293",
	"cart": {
		"id": "1650fb51-172b-4cde-a220-90c6a8ef9293",
		"customerId": 0,
		"email": "janedoe@email.com",
		"currency": {
			"name": "US Dollars",
			"code": "USD",
			"symbol": "$",
			"decimalPlaces": 2
		},
		"isTaxIncluded": false,
		"baseAmount": 73.95,
		"discountAmount": 0,
		"cartAmount": 73.95,
		"coupons": [],
		"discounts": [{
			"id": "7349b13a-1453-4050-a769-1a6ad1823369",
			"discountedAmount": 0
		}, {
			"id": "4a69cbdf-4320-4e1f-852b-0edc2a55f13a",
			"discountedAmount": 0
		}],
		"lineItems": {
			"physicalItems": [{
				"id": "7349b13a-1453-4050-a769-1a6ad1823369",
				"parentId": null,
				"variantId": 362,
				"productId": 191,
				"sku": "",
				"name": "Openhouse No. 3",
				"url": "https://{store_url)/all/openhouse-no-3/",
				"quantity": 1,
				"brand": "Openhouse Magazine",
				"isTaxable": true,
				"imageUrl": "https://cdn11.bigcommerce.com/s-{store_hash)/products/191/images/475/openhousevol3_1024x1024__59692__16355.1534344544.330.500.jpg?c=2",
				"discounts": [],
				"discountAmount": 0,
				"couponAmount": 0,
				"listPrice": 27.95,
				"salePrice": 27.95,
				"extendedListPrice": 27.95,
				"extendedSalePrice": 27.95,
				"isShippingRequired": true,
				"giftWrapping": null,
				"addedByPromotion": false
			}, {
				"id": "4a69cbdf-4320-4e1f-852b-0edc2a55f13a",
				"parentId": null,
				"variantId": 356,
				"productId": 185,
				"sku": "",
				"name": "Utility Caddy",
				"url": "https://{store_url)/all/utility-caddy/",
				"quantity": 1,
				"brand": "OFS",
				"isTaxable": true,
				"imageUrl": "https://cdn11.bigcommerce.com/s-{store_hash)/products/185/images/449/utilitybucket1_1024x1024__78563__75042.1534344535.330.500.jpg?c=2",
				"discounts": [],
				"discountAmount": 0,
				"couponAmount": 0,
				"listPrice": 46,
				"salePrice": 46,
				"extendedListPrice": 46,
				"extendedSalePrice": 46,
				"isShippingRequired": true,
				"giftWrapping": null,
				"addedByPromotion": false
			}],
			"digitalItems": [],
			"giftCertificates": [],
			"customItems": []
		},
		"createdTime": "2018-11-06T19:22:51+00:00",
		"updatedTime": "2018-11-06T19:25:26+00:00"
	},
	"billingAddress": {
		"id": "5be1eaa653e37",
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
	"consignments": [],
	"orderId": null,
	"shippingCostTotal": 0,
	"shippingCostBeforeDiscount": 0,
	"handlingCostTotal": 0,
	"taxTotal": 12.22,
	"coupons": [],
	"taxes": [{
		"name": "This is tax",
		"amount": 12.22
	}],
	"subtotal": 73.95,
	"grandTotal": 86.17,
	"giftCertificates": [],
	"createdTime": "2018-11-06T19:22:51+00:00",
	"updatedTime": "2018-11-06T19:25:26+00:00",
	"customerMessage": ""
}
```

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">
    
<!-- theme:  -->
### Add a Cart Item
>  If your cart only has one lineItem or a quantity of one, run a [POST Cart](/api-reference/cart-checkout/storefront-cart-api/cart/createacart) request with a new lineItem, then come back here.

</div>
</div>
</div>

Below, there are two shipping addresses in an array with a lineItem assigned to each. Note that `?include=consignments.availableShippingOptions` is being added as a query parameter. Without this, the `availableShippingOptions` will not return in the response. 


<!--
title: "Create Consignment"
subtitle: ""
lineNumbers: true
-->
**Example Create Consignment**  
`/POST https://<store_url>/api/storefront/checkouts/{checkoutId}/consignments`


```js
postData(`/api/storefront/checkouts/`, `1650fb51-172b-4cde-a220-90c6a8ef9293`,
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
            "itemId": "fb924c6c-10fb-456a-bccb-02d9fb426199",
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
            "itemId": "98ceac68-cac9-49af-9050-95494f32474c",
            "quantity": 1
        }]
    }
    ]

)
  .then(data => console.log(JSON.stringify(data))) // JSON-string from `response.json()` call
  .catch(error => console.error(error));

function postData(url = ``, checkoutId = ``, data = {},) {
    return fetch(url + checkoutId + `/consignments?include=consignments.availableShippingOptions`,   {
        method: "POST", 
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json" ,
        },
        body: JSON.stringify(data), 
    })
    .then(response => response.json()); }
```

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">
    
<!-- theme: warning -->
### Signed In Customer
> When a signed in customer proceeds to the create consignment step with an incomplete shipping address, the shipping address will auto-populate with the the most recently used address from the customer's address book.

</div>
</div>
</div>

<!--
title: "Create Consignment Response"
subtitle: ""
lineNumbers: true
-->

**Example Create Consignment Response**

```json
{
	"id": "1650fb51-172b-4cde-a220-90c6a8ef9293",
	"cart": {
		"id": "1650fb51-172b-4cde-a220-90c6a8ef9293",
		"customerId": 0,
		"email": "janedoe@email.com",
		"currency": {
			"name": "US Dollars",
			"code": "USD",
			"symbol": "$",
			"decimalPlaces": 2
		},
		"isTaxIncluded": false,
		"baseAmount": 73.95,
		"discountAmount": 0,
		"cartAmount": 73.95,
		"coupons": [],
		"discounts": [{
			"id": "7349b13a-1453-4050-a769-1a6ad1823369",
			"discountedAmount": 0
		}, {
			"id": "4a69cbdf-4320-4e1f-852b-0edc2a55f13a",
			"discountedAmount": 0
		}],
		"lineItems": {
			"physicalItems": [{
				"id": "7349b13a-1453-4050-a769-1a6ad1823369",
				"parentId": null,
				"variantId": 362,
				"productId": 191,
				"sku": "",
				"name": "Openhouse No. 3",
				"url": "https://{store_url)/all/openhouse-no-3/",
				"quantity": 1,
				"brand": "Openhouse Magazine",
				"isTaxable": true,
				"imageUrl": "https://cdn11.bigcommerce.com/s-{store_url)/products/191/images/475/openhousevol3_1024x1024__59692__16355.1534344544.330.500.jpg?c=2",
				"discounts": [],
				"discountAmount": 0,
				"couponAmount": 0,
				"listPrice": 27.95,
				"salePrice": 27.95,
				"extendedListPrice": 27.95,
				"extendedSalePrice": 27.95,
				"isShippingRequired": true,
				"giftWrapping": null,
				"addedByPromotion": false
			}, {
				"id": "4a69cbdf-4320-4e1f-852b-0edc2a55f13a",
				"parentId": null,
				"variantId": 356,
				"productId": 185,
				"sku": "",
				"name": "Utility Caddy",
				"url": "https://{store_url)/all/utility-caddy/",
				"quantity": 1,
				"brand": "OFS",
				"isTaxable": true,
				"imageUrl": "https://cdn11.bigcommerce.com/s-{store_url)/products/185/images/449/utilitybucket1_1024x1024__78563__75042.1534344535.330.500.jpg?c=2",
				"discounts": [],
				"discountAmount": 0,
				"couponAmount": 0,
				"listPrice": 46,
				"salePrice": 46,
				"extendedListPrice": 46,
				"extendedSalePrice": 46,
				"isShippingRequired": true,
				"giftWrapping": null,
				"addedByPromotion": false
			}],
			"digitalItems": [],
			"giftCertificates": [],
			"customItems": []
		},
		"createdTime": "2018-11-06T19:22:51+00:00",
		"updatedTime": "2018-11-06T19:53:35+00:00"
	},
	"billingAddress": {
		"id": "5be1eaa653e37",
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
	"consignments": [{
		"id": "5be1f13f00e2c",
		"shippingCost": 0,
		"handlingCost": 0,
		"couponDiscounts": [],
		"discounts": [],
		"lineItemIds": ["7349b13a-1453-4050-a769-1a6ad1823369"],
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
		"availableShippingOptions": [{
			"id": "9363fd74-8508-4f8b-beb2-77ede2beaa1c",
			"type": "shipping_byweight",
			"description": "Ship by Weight",
			"imageUrl": "",
			"cost": 8,
			"transitTime": "",
			"isRecommended": false
		}, {
			"id": "20ae4fdf-747f-4ec5-86da-11ecd70ae03e",
			"type": "shipping_flatrate",
			"description": "Flat Rate",
			"imageUrl": "",
			"cost": 12,
			"transitTime": "",
			"isRecommended": false
		}, {
			"id": "b7783bb7-7695-467f-afd0-bf1c84fffdd2",
			"type": "shipping_upsready",
			"description": "UPS® (UPS Next Day Air®)",
			"imageUrl": "/img/shipping-providers/upsready_70x70.png",
			"cost": 44.41,
			"transitTime": "1 business day",
			"isRecommended": false
		}]
	}, {
		"id": "5be1f13f07bae",
		"shippingCost": 0,
		"handlingCost": 0,
		"couponDiscounts": [],
		"discounts": [],
		"lineItemIds": ["4a69cbdf-4320-4e1f-852b-0edc2a55f13a"],
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
		"availableShippingOptions": [{
			"id": "620a7267-8e0d-4868-bf24-2b3983ccc746",
			"type": "shipping_byweight",
			"description": "Ship by Weight",
			"imageUrl": "",
			"cost": 8,
			"transitTime": "",
			"isRecommended": false
		}, {
			"id": "834a4114-df5e-453d-a476-8de2287d1dfa",
			"type": "shipping_flatrate",
			"description": "Flat Rate",
			"imageUrl": "",
			"cost": 12,
			"transitTime": "",
			"isRecommended": false
		}, {
			"id": "9f40c667-0ab5-46d4-b436-c678517c5415",
			"type": "shipping_upsready",
			"description": "UPS® (UPS Next Day Air®)",
			"imageUrl": "/img/shipping-providers/upsready_70x70.png",
			"cost": 44.41,
			"transitTime": "1 business day",
			"isRecommended": false
		}]
	}],
	"orderId": null,
	"shippingCostTotal": 0,
	"shippingCostBeforeDiscount": 0,
	"handlingCostTotal": 0,
	"taxTotal": 5.92,
	"coupons": [],
	"taxes": [{
		"name": "This is tax",
		"amount": 5.92
	}],
	"subtotal": 73.95,
	"grandTotal": 79.87,
	"giftCertificates": [],
	"createdTime": "2018-11-06T19:22:51+00:00",
	"updatedTime": "2018-11-06T19:53:35+00:00",
	"customerMessage": ""
}
```

### Update Consignment to Add a Shipping Option

So far we have created a cart, added a billing address and shipping address, and assigned the lineItems to the address they should be shipped. Now we are going to make two PUT requests to assign a shipping option for each address. Only one consignment can be updated at a time. If you sent in the `?include=consignments.availableShippingOptions` with the previous request, then pick the appropriate `shippingOptionId` for each consignment. 

<!--
title: "Example Consignment with Available Shipping Options"
subtitle: ""
lineNumbers: true
-->

**Example Consignment with Available Shipping Options**

```json
	"consignments": [{
		"id": "5be1f13f00e2c",
		"shippingCost": 0,
		"handlingCost": 0,
		"couponDiscounts": [],
		"discounts": [],
		"lineItemIds": ["7349b13a-1453-4050-a769-1a6ad1823369"],
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
		"availableShippingOptions": [{
			"id": "9363fd74-8508-4f8b-beb2-77ede2beaa1c",
			"type": "shipping_byweight",
			"description": "Ship by Weight",
			"imageUrl": "",
			"cost": 8,
			"transitTime": "",
			"isRecommended": false
		}, {
			"id": "20ae4fdf-747f-4ec5-86da-11ecd70ae03e",
			"type": "shipping_flatrate",
			"description": "Flat Rate",
			"imageUrl": "",
			"cost": 12,
			"transitTime": "",
			"isRecommended": false
		}, {
			"id": "b7783bb7-7695-467f-afd0-bf1c84fffdd2",
			"type": "shipping_upsready",
			"description": "UPS® (UPS Next Day Air®)",
			"imageUrl": "/img/shipping-providers/upsready_70x70.png",
			"cost": 44.41,
			"transitTime": "1 business day",
			"isRecommended": false
		}]
```

<!--
title: "Update Consignment with Available Shipping Options"
subtitle: ""
lineNumbers: true
-->

**Example Update Consignment with Available Shipping Options**  
`/PUT https://<store_url>/api/storefront/checkouts/{checkoutId}/billing-address/{addressId}`

```js
postData(`/api/storefront/checkouts/`, `1650fb51-172b-4cde-a220-90c6a8ef9293`, `5be1f13f07bae`,{"shippingOptionId": "9f40c667-0ab5-46d4-b436-c678517c5415"})
  .then(data => console.log(JSON.stringify(data))) 
  .catch(error => console.error(error));

function postData(url = ``, checkoutId = ``, consignmentId = ``, data = {},) {
    return fetch(url + checkoutId + `/consignments/` + consignmentId,   {
        method: "PUT", 
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json;",
        },
        body: JSON.stringify(data), 
    })
    .then(response => response.json()); 
}
```

---

<a href='#working-sf-apis_troubleshooting' aria-hidden='true' class='block-anchor'  id='working-sf-apis_troubleshooting'><i aria-hidden='true' class='linkify icon'></i></a>

## Troubleshooting

**Did you get a CORs error response?**  
Check to make sure you have the right credentials set up. Most requests will use same-origin or include. 

**Did you get a 404?**  
Make sure you have at least one item in your cart. Deleting all items removes the cart and returns a 404 in the browser console.

---

<a href='#working-sf-apis_realated-endpoints' aria-hidden='true' class='block-anchor'  id='working-sf-apis_realated-endpoints'><i aria-hidden='true' class='linkify icon'></i></a>

## Resources

### Related Endpoints
- [Storefront Cart](/api-reference/cart-checkout/storefront-cart-api)
- [Storefront Checkout](/api-reference/cart-checkout/storefront-checkout-api)

### Related Articles
- [How To Embed a Shipping Location Map on the BigCommerce Order Confirmation Page](https://medium.com/bigcommerce-developer-blog/how-to-embed-a-google-map-on-the-bigcommerce-order-confirmation-page-8264747e654d) (Developer Blog)
- [Let’s Talk About CORS](https://medium.com/bigcommerce-developer-blog/lets-talk-about-cors-84800c726919) (Developer Blog)

