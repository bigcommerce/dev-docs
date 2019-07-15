<h1>Event Hooks</h1>

<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#event_cookie-notification">Cookie Notification Example</a></li>
    <li><a href="#event_cart-dialog">Cart Dialog Example</a></li>
    <li><a href="#event_stencil-data-tags">Stencil Data Tags and Event Hooks</a></li>
	</ul>
</div>

<a href='#event_event-hook' aria-hidden='true' class='block-anchor'  id='event_event-hook'><i aria-hidden='true' class='linkify icon'></i></a>

Stencil themes provide access to remote resources through data tags and event hooks. Developers can use these hooks to trigger defined events. A theme can hook to an event to perform actions or calculations based on shopper behavior.

Stencil themes incorporate event hooks by importing the stencil-utils module. If take a look at [cornerstone/assets/js/theme/](https://github.com/bigcommerce/cornerstone/tree/master/assets/js/theme), you will see the import statement `'import utils from '@bigcommerce/stencil-utils';` at the top of files using leveraging event hooks.

---

<a href='#event_cookie-notification' aria-hidden='true' class='block-anchor'  id='event_cookie-notification'><i aria-hidden='true' class='linkify icon'></i></a>

## Cookie Notification Example

In the example below, the `cookie-privacy-notification` hook enables customization of the alert window that displays European Union–required cookie notifications:

First, ensure you have loaded the `stencil-utils` package with the following command:

`import utils from '@bigcommerce/stencil-utils';`

European websites must notify users of cookies to comply with European Union law.
The following code implements hook that will alert shoppers that the website uses cookies.


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

---

<a href='#event_cart-dialog' aria-hidden='true' class='block-anchor'  id='event_cart-dialog'><i aria-hidden='true' class='linkify icon'></i></a>

## Cart Dialog Example

In the following code snippet from Cornerstone in [templates/components/products/product-view.html](https://github.com/bigcommerce/cornerstone/blob/master/templates/components/products/product-view.html), note the data tag named `data‑cart‑item‑add`:

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

```
<form class="form" method="post" action="{{product.cart_url}}"
    enctype="multipart/form-data" data-cart-item-add>
```

This data tag enables the emission of the `cart‑item‑add` event in this next snippet:

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

```
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

---

## Stencil Data Tags and Event Hooks
Stencil themes provide the following chains of data tags, delegated DOM (Document Object Model) events, emitted Stencil event hooks, and Stencil event parameter(s).

### Cart Item Added

Hook for items added to the customer’s shopping cart.

**Function Signature:**

```
itemAdd() {
    this.$body.on('submit', '[data-cart-item-add]', (event) => {
        this.emit('cart-item-add', event, event.target);
    });
}
```

<table>
	<tr>
		<th>Data Tag</th>
		<th>Delegated DOM Event</th>
		<th>Stencil Event/Hook</th>
		<th>Stencil Event Parameter(s)</th>
	</tr>
	<tr>
		<td>data-cart-item-add</td>
		<td>submit</td>
		<td>cart-item-add</td>
		<td>event, event.target</td>
	</tr>
</table>

### Faceted-Search Events

Hooks for faceted-search selections that the customer initiates or submits.

**Function Signature**

```
searchEvents() {
  this.$body.on('click', '[data-faceted-search-facet]', (event) => {
        this.emit('facetedSearch-facet-clicked', event);
  });
 
  this.$body.on('submit', '[data-faceted-search-range]', (event) => {
        this.emit('facetedSearch-range-submitted', event);
  });
}

```

<table>
	<tr>
		<th>Data Tag</th>
		<th>Delegated DOM Event</th>
		<th>Stencil Event/Hook</th>
		<th>Stencil Event Parameter(s)</th>
	</tr>
	<tr>
		<td>data-faceted-search-facet</td>
		<td>click</td>
		<td>facetedSearch-facet-clicked</td>
		<td>event</td>
	</tr>
	<tr>
		<td>data-faceted-search-range</td>
		<td>submit</td>
		<td>facetedSearch-range-submitted</td>
		<td>event</td>
	</tr>
</table>

## Resources

### Additional Resources
* [cookieNotification.js](https://github.com/bigcommerce/cornerstone/blob/637ef1b0ff130333aea128663daa6d1a4d37fb78/assets/js/theme/global/cookieNotification.js) (BigCommerce Github)

