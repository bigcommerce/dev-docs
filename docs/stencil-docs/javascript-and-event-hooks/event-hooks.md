# Event Hooks



Stencil themes provide access to remote resources through data tags and event hooks. Developers can use these hooks to trigger defined events. A theme can hook to an event to perform actions or calculations based on shopper behavior.

Stencil themes incorporate event hooks by importing the stencil-utils module. If take a look at [cornerstone/assets/js/theme/](https://github.com/bigcommerce/cornerstone/tree/master/assets/js/theme), you will see the import statement `'import utils from '@bigcommerce/stencil-utils';` at the top of files using leveraging event hooks.

## Cookie Notification Example

In the example below, the `cookie-privacy-notification` hook enables customization of the alert window that displays European Union–required cookie notifications:

First, ensure you have loaded the `stencil-utils` package with the following command:

`import utils from '@bigcommerce/stencil-utils';`

European websites must notify users of cookies to comply with European Union law.
The following code implements a hook that will alert shoppers that the website uses cookies.

```js title="Example cookie notification hook" lineNumbers
export default function() {

  // Here you can override the default browser alert box by
  // hooking to the 'cookie-privacy-notification' hook.
  utils.hooks.on('cookie-privacy-notification', (event, privacyMessage) => {

    // You can make your own custom modal or alert box
    // appear in your theme using the privacyMessage provided
    myCustomAlert(privacyMessage);

    // Call event.preventDefault() to prevent the default
    // browser alert from occurring in stencil-utils
    event.preventDefault();
  });
}
```

A theme would listen for the `cookie-privacy-notification` event to override the browser’s default notification UI.

## Cart Dialog Example

In the following code snippet from Cornerstone in [templates/components/products/product-view.html](https://github.com/bigcommerce/cornerstone/blob/master/templates/components/products/product-view.html), note the data tag named `data‑cart‑item‑add`:

```handlebars title="templates/components/products/product-view.html: data‑cart‑item‑add" lineNumbers
<form class="form" method="post" action="{{product.cart_url}}"
    enctype="multipart/form-data" data-cart-item-add>
```

This data tag enables the emission of the `cart‑item‑add` event in this next snippet:

```js title="Emitter, cart‑item‑add event" lineNumbers
/*  
 * Import all product-specific js
 */
[...]
import utils from '@bigcommerce/stencil-utils';
[...]
addProductToCart() {
    utils.hooks.on('cart-item-add', (event) => {
        event.preventDefault();
    });
}
```

## Stencil Data Tags and Event Hooks
Stencil themes provide the following chains of data tags, delegated DOM (Document Object Model) events, emitted Stencil event hooks, and Stencil event parameter(s).

### Cart Item Added

Hook for items added to the customer’s shopping cart.

```js title="Function signature: cart item added" lineNumbers
itemAdd() {
    this.$body.on('submit', '[data-cart-item-add]', (event) => {
        this.emit('cart-item-add', event, event.target);
    });
}
```



| Data Tag | Delegated DOM Event | Stencil Event/Hook | Stencil Event Parameters |
|---|---|---|
| data-cart-item-add | submit | cart-item-add | event, event.target |

### Faceted-Search Events

Hooks for faceted-search selections that the customer initiates or submits.


```js title="Function signature: faceted-search events" lineNumbers
searchEvents() {
  this.$body.on('click', '[data-faceted-search-facet]', (event) => {
        this.emit('facetedSearch-facet-clicked', event);
  });

  this.$body.on('submit', '[data-faceted-search-range]', (event) => {
		this.emit('facetedSearch-range-submitted', event);
  });
}
```

| Data Tag | Delegated DOM Event | Stencil Event/Hook | Stencil Event Parameter(s) |
|---|---|---|
| data-faceted-search-facet | click | facetedSearch-facet-clicked | event |
| data-faceted-search-range | submit | facetedSearch-range-submitted | event |


## Resources

### Additional Resources
* [cookieNotification.js](https://github.com/bigcommerce/cornerstone/blob/637ef1b0ff130333aea128663daa6d1a4d37fb78/assets/js/theme/global/cookieNotification.js) (BigCommerce GitHub)
