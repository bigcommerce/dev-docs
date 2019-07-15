<h1>Remote API Tutorial</h1>

<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
		<li><a href="#remote_remote">Remote API Tutorial</a></li>
	</ul>
</div>

## Remote API Example

Client-side JavaScript can access event hooks directly, without using Handlebars statements. By setting up listeners for these events, you can exercise granular control over your storefront’s user interface. For example, you can pop up custom windows when certain events occur.

Below is an example implemented within a Stencil theme. This code adds an item to the shopping cart, and displays the result in a custom modal dialog rather than a cart page.

This particular example uses certain conventions of ES6 JavaScript (also known as ECMAScript 6 or ECMAScript 2015).

Here is the signature of the cart.itemAdd function used below, with parameters for product ID, quantity, and options:

`itemAdd(FormData, callback)`

Here is the signature of the cart.getContent function used further down:

`getContent(options, callback)`

This first complete code snippet calls cart.itemAdd, catches any errors, and displays the cart contents in a modal dialog:

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
 // Add item to cart
        utils.api.cart.itemAdd(new FormData(form), (err, response) => {
            const errorMessage = err || response.data.error;

            $addToCartBtn
                .val(originalBtnVal)
                .prop('disabled', false);

            this.$overlay.hide();

            // Guard statement
            if (errorMessage) {
                // Strip the HTML from the error message
                const tmp = document.createElement('DIV');
                tmp.innerHTML = errorMessage;

                return alert(tmp.textContent || tmp.innerText);
            }

            // Open preview modal and update content
            if (this.previewModal) {
                this.previewModal.open();

                this.updateCartContent(this.previewModal, response.data.cart_item.hash);
            } else {
                this.$overlay.show();
                // if no modal, redirect to the cart page
                this.redirectTo(response.data.cart_item.cart_url || this.context.urls.cart);
            }
        });
```

This final code snippet calls `cart.getContent` to fetch the cart contents, then display it in a preview format, which is specified by a template option with a value of `cart/preview`:

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
 /**
     * Get cart contents
     *
     * @param {String} cartItemHash
     * @param {Function} onComplete
     */
    getCartContent(cartItemHash, onComplete) {
        const options = {
            template: 'cart/preview',
            params: {
                suggest: cartItemHash,
            },
            config: {
                cart: {
                    suggestions: {
                        limit: 4,
                    },
                },
            },
        };

        utils.api.cart.getContent(options, onComplete);
    }
```

