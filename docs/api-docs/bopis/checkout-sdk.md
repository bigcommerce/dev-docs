The Checkout JS SDK is a JavaScript wrapper for our Storefront Checkouts API. Please refer to [Storefront Checkouts Reference](https://bigcommerce.stoplight.io/docs/api-beta-buy-online-pick-up-in-store/api-reference/storefront-checkouts) for more detailed information.

To support BOPIS, we would be adding a `loadPickupOptions` method to the [CheckoutService](https://github.com/bigcommerce/checkout-sdk-js/blob/master/docs/classes/checkoutservice.md) class, allowing you to load pickup options to your storefront checkout.

```js title="Example" lineNumbers
const consignmentId = '123';
const searchArea = {
    radius: {
        value: 1.4,
        unit: 'KM' // Another unit allowed here is 'MI'
    },
    coordinates: {
        latitude: 1.4,
        longitude: 0
    }
};


const query: PickupOptionRequestBody = { consignmentId, searchArea };

const state = await checkoutService.loadPickupOptions(query: PickupOptionRequestBody);

/*
* Pickup options are once fetched and then cached against the consignmentId and
* searchArea. So unless you change either of the parameters the options there won’t 
* be an API call to the server and memoized options will be returned to checkout App
*/

// To log/see pickup options
console.log(state.data.getPickupOptions(consignmentId, searchArea));
```

For more info on how to incorporate the Checkout JS SDK into your BOPIS experience, see the [End to End API Guide](https://bigcommerce.stoplight.io/docs/api-beta-buy-online-pick-up-in-store/api-docs/end-to-end-guide). 
