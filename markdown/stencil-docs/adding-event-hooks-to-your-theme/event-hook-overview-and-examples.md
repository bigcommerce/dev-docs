<h1>Event Hook Overview and Examples</h1>

<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#event_event-hook">Event Hook Overview</a></li>
    <li><a href="#event_cookie-notification">Cookie Notification Example</a></li>
    <li><a href="#event_cart-dialog">Cart Dialog Example</a></li>
	</ul>
</div>

<a href='#event_event-hook' aria-hidden='true' class='block-anchor'  id='event_event-hook'><i aria-hidden='true' class='linkify icon'></i></a>

## Event Hook Overview 

Stencil themes provide access to remote resources through data tags and event hooks. Developers can use these hooks to trigger defined events: A theme can hook to an event to perform its own actions or calculations, based on shopper behavior.

Your Stencil themes incorporate these resources by importing the stencil-utils module, using this statement:

`import utils from '@bigcommerce/stencil-utils';`

<a href='#event_cookie-notification' aria-hidden='true' class='block-anchor'  id='event_cookie-notification'><i aria-hidden='true' class='linkify icon'></i></a>

## Cookie Notification Example

In the JavaScript-only example below, the `cookie-privacy-notification` hook enables customization of the alert window that displays European Union–required cookie notifications:

First, ensure you have loaded the `stencil-utils` package with the following command:

`import utils from '@bigcommerce/stencil-utils';`

European websites must notify users of cookies to comply with European Union law.
The following code implements hook that will alert shoppers that the website uses cookies.

```
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

A theme could listen for the `cookie-privacy-notification` event to override the browser’s default notification UI.


<a href='#event_cart-dialog' aria-hidden='true' class='block-anchor'  id='event_cart-dialog'><i aria-hidden='true' class='linkify icon'></i></a>

## Cart Dialog Example

In the following code snippet from Cornerstone in [templates/components/products/product-view.html](https://github.com/bigcommerce/cornerstone/blob/master/templates/components/products/product-view.html), note the data tag named `data‑cart‑item‑add`:

```
<form class="form" method="post" action="{{product.cart_url}}"
    enctype="multipart/form-data" data-cart-item-add>
```

This data tag enables the emission of the `cart‑item‑add` event in this next snippet:

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


