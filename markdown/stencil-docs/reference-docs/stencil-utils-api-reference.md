# Stencil Utils Reference

<div class="otp" id="no-index">

###  On this Page

- [Installing](#installing)
- [API -- getPage](#getpage)
- [Cart -- getCart](#getcart)
- [Cart -- getCartQuantity](#getcartquantity)
- [Cart -- itemAdd](#itemadd)
- [Cart -- itemUpdate](#itemupdate)
- [Cart -- itemRemove](#itemremove)
- [Cart -- update](#update)
- [Cart -- getItemGiftWrappingOptions](#getitemgiftwrappingoptions)
- [Cart -- submitItemGiftWrappingOption](#submititemgiftwrappingoption)
- [Cart -- getContent](#getcontent)
- [Cart -- getShippingQuotes](#getshippingquotes)
- [Cart -- submitShippingQuotes](#submitshippingquote)
- [Cart -- applyCode](#applycode)
- [Cart -- applyGiftCertificate](#applygiftcertificate)
- [Country -- getById country](#countrygetbyid)
- [Country -- getByName](#getbyname)
- [Product Attributes -- optionChange](#optionchange)
- [Product Attributes -- configureInCart](#configureincart)
- [Product Resource -- getById](#product-resource)
- [Search Resource -- search](#search)
</div>

---
[Stencil Utils](https://github.com/bigcommerce/stencil-utils) is a utility library that contains the BigCommerce Stencil Events system and other functions that make building a theme with the Stencil framework a breeze.

These functions help you set up asynchronous requests to modify the customer’s cart or storefront view. By using this abstraction library, you can gain more-granular control over themes’ presentation. Use stencil-utils to:
- Interact with the cart
- Use `getPage` to return a template file.

---

<a id="installing"></a>

## Installing

### As an ES6 module
1. Run  `npm install @bigcommerce/stencil-utils`  to install the latest tagged version of stencil-utils for use with your theme.
2. Import the library  `import utils from 'bigcommerce/stencil-utils';`  in modules that depend on it.

### Standalone

If you do not want to support ES6 modules, Stencil Utils can be included as a normal script:
-   Copy the bundled script from  `dist/stencil-utils.min.js`  to your theme.
-   Include the script in your HTML document
-   Access stencil utils from  `window.stencilUtils`


---

<a id="api"></a>

## API [api.js]

<a id="getpage"></a>

### [getPage ](https://github.com/bigcommerce/stencil-utils/blob/master/src/api.js) 
Request a page using [Ajax](https://developer.mozilla.org/en-US/docs/Web/Guide/AJAX).  
`utils.api.getPage(url, options, callback)`

<table>
  <tbody><tr>
    <th>Argument</th>
    <th>Type</th>
    <th>Description/Usage</th>
  </tr>
  <tr>
    <td>url</td>
    <td>String</td>
    <td>URL to which you want to send a request (for example: localhost:4000/cart.php)</td>
  </tr>
  <tr>
    <td>options</td>
    <td>Object</td>
		<td>Can contain <code>template</code>, <code><a href="https://developer.mozilla.org/en-US/docs/Web/API/FormData">FormData</a></code> (for POST methods), <code>params</code>&nbsp;(for GET methods), and/or <code>config</code>.   
		The <code>template</code> option allows you to select a particular template, or an array of templates, for rendering one page. Each value must correspond to a file present in the theme's <code>templates/components/</code> subdirectory. 
      The `config` option can be used to pass extra resources, corresponding to attributes that are valid in a page's front matter, as an object.
    </td>
  </tr>
  <tr>
    <td>callback</td>
    <td>Function</td>
    <td>Asynchronous function call to handle the results</td>
  </tr>
</tbody>
</table>

The <code>config</code> argument works like front matter: it encapsulates JSON. For a usage example of <code>config</code>, see the [Remote API Example](/stencil-docs/adding-event-hooks-to-your-theme/remote-api-example#remote_remote-api-example).

**getPage Example**

In the following example (from `common/faceted-search.js`), `api.getPage()` is called to help execute an `updateView()` function:

```js
updateView() {
        $(this.options.blockerSelector).show();

        api.getPage(urlUtils.getUrl(), this.requestOptions, (err, content) => {
            $(this.options.blockerSelector).hide();

            if (err) {
                throw new Error(err);
            }

            // Refresh view with new content
            this.refreshView(content);
        });
    }
 ```

### Usage in Cornerstone
- [`assets/js/theme/wishlist.js`](https://github.com/bigcommerce/cornerstone/blob/master/assets/js/theme/wishlist.js)
- [`assets/js/theme/gift-certificate.js`](https://github.com/bigcommerce/cornerstone/blob/master/assets/js/theme/gift-certificate.js)
- [`assets/js/theme/faceted-search.js`](https://github.com/bigcommerce/cornerstone/blob/master/assets/js/theme/common/faceted-search.js)

---

<a id="cart"></a>

## Cart API 

The following functions allow your theme to work with [cart](https://github.com/bigcommerce/stencil-utils/blob/9cf7c26b0a1f9ca9da83274ebc375e73f20acac5/src/api/cart.js) contents in customized ways.

<a id="getcart"></a>

### [getCart](https://github.com/bigcommerce/stencil-utils/blob/master/src/api/cart.js#L11)

| Argument | Type | Description |
| -- | -- | -- |
| options | object | Return product variant options |
| callback | Function | Asynchronous function call to handle the results |


**getCart Example**

`util.api.cart.getCart()`

```js
utils.api.cart.getCart({}, (err, response) => {
		console.log(response);
		console.log(err);
});

utils.api.cart.getCart({includeOptions: true}, (err, response) => {
		console.log(response);
		console.log(err);
});
```


<a id="getcartquantity"></a>


### [getCartQuantity](https://github.com/bigcommerce/stencil-utils/blob/master/src/api/cart.js#L28) 

Get a sum of the cart line item quantities. 

`utils.api.cart.getCartQuantity()`

<table>
  <tbody><tr>
    <th>Argument</th>
    <th>Type</th>
    <th>Description/Usage</th>
  </tr>
  <tr>
    <td>quantity</td>
    <td>int</td>
    <td>A sum of physical, digital, and custom product quantities and gift certificate quantities</td>
  </tr>
  <tr>
    <td>callback</td>
    <td>Function</td>
    <td>Asynchronous function call to handle the results</td>
  </tr>
</tbody>
</table>

<br>

**getCartQuantity Example**

```js
utils.api.cart.getCartQuantity(quantity => {
		console.log(`Quantity: ${quantity}`);
});
```

### Usage in Cornerstone
- [`assets/js/theme/global/cart-preview.js`](https://github.com/bigcommerce/cornerstone/blob/master/assets/js/theme/global/cart-preview.js)

---

<a id="itemadd"></a>

### [itemAdd](https://github.com/bigcommerce/stencil-utils/blob/master/src/api/cart.js#L51)

The `itemAdd`function allows your code to add an item to the cart, with options:

<code>utils.api.cart.itemAdd(<a href="https://developer.mozilla.org/en-US/docs/Web/API/FormData">FormData</a>, callback)</code>

<table>
  <tbody><tr>
    <th>Argument</th>
    <th>Type</th>
    <th>Description/Usage</th>
  </tr>
  <tr>
    <td>formData</td>
    <td><a href="https://developer.mozilla.org/en-US/docs/Web/API/FormData">FormData</a> object </td>
    <td>Contains all details about the added item and its product options</td>
  </tr>
  <tr>
    <td>callback</td>
    <td>Function</td>
    <td>Asynchronous function call to handle the results</td>
  </tr>
</tbody>
</table>


**itemAdd Example**

<code>itemAdd</code> is called at the head of the following example (from <code>common/product-details.js</code>) to populate the cart:

```js

        utils.api.cart.itemAdd(this.filterEmptyFilesFromForm(new FormData(form)), (err, response) => {
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

                return showAlertModal(tmp.textContent || tmp.innerText);
            }

            // Open preview modal and update content
            if (this.previewModal) {
                this.previewModal.open();

                this.updateCartContent(this.previewModal, response.data.cart_item.id);
            } else {
                this.$overlay.show();
                // if no modal, redirect to the cart page
                this.redirectTo(response.data.cart_item.cart_url || this.context.urls.cart);
            }
        });
    }
 ```

### Usage in Cornerstone
- [`assets/js/theme/common/product-details.js`](https://github.com/bigcommerce/cornerstone/blob/master/assets/js/theme/common/product-details.js)

---

<a id="itemupdate"></a>

### [itemUpdate](https://github.com/bigcommerce/stencil-utils/blob/master/src/api/cart.js#L70)

The <code>itemUpdate</code> function allows your code to update a specified cart item’s quantity:

`utils.api.cart.itemUpdate(itemId, qty, callback)`

<table>
  <tbody><tr>
    <th>Argument</th>
    <th>Type</th>
    <th>Description/Usage</th>
  </tr>
  <tr>
    <td>itemId</td>
    <td>String</td>
    <td>The item’s ID</td>
  </tr>
  <tr>
    <td>qty</td>
    <td>Integer</td>
    <td>The item’s quantity in the cart</td>
  </tr>
  <tr>
    <td>callback</td>
    <td>Function</td>
    <td>Asynchronous function call to handle the results</td>
  </tr>
</tbody></table>

<b>itemUpdate Example</b>


```js

     cartUpdate($target) {
        const itemId = $target.data('cartItemid');
        const $el = $(`#qty-${itemId}`);
        const oldQty = parseInt($el.val(), 10);
        const maxQty = parseInt($el.data('quantityMax'), 10);
        const minQty = parseInt($el.data('quantityMin'), 10);
        const minError = $el.data('quantityMinError');
        const maxError = $el.data('quantityMaxError');
        const newQty = $target.data('action') === 'inc' ? oldQty + 1 : oldQty - 1;
        // Does not quality for min/max quantity
        if (newQty < minQty) {
            return swal({
                text: minError,
                type: 'error',
            });
        } else if (maxQty > 0 && newQty > maxQty) {
            return swal({
                text: maxError,
                type: 'error',
            });
        }

        this.$overlay.show();

        utils.api.cart.itemUpdate(itemId, newQty, (err, response) => {
            this.$overlay.hide();

            if (response.data.status === 'succeed') {
                // if the quantity is changed "1" from "0", we have to remove the row.
                const remove = (newQty === 0);

                this.refreshContent(remove);
            } else {
                $el.val(oldQty);
                swal({
                    text: response.data.errors.join('\n'),
                    type: 'error',
                });
            }
        });
    }
 ```

### Usage in Cornerstone
- [`assets/js/theme/cart.js`](https://github.com/bigcommerce/cornerstone/blob/d786c6ecbed5ad588ed9489f79e2226455a07b21/assets/js/theme/cart.js)

---
<a id="itemremove"></a>

### [itemRemove](https://github.com/bigcommerce/stencil-utils/blob/master/src/api/cart.js#L106)

The <code>itemRemove</code> function allows your code to remove items from the cart:

`utils.api.cart.itemRemove(itemId, callback)`

<table>
  <tbody>
	<tr>
    <th>Argument</td>
    <th>Type</td>
    <th>Description/Usage</td>
  </tr>
  <tr>
    <td>itemId</td>
    <td>String</td>
    <td>The item’s ID</td>
  </tr>
  <tr>
    <td>callback</td>
    <td>Function</td>
    <td>Asynchronous function call to handle the results</td>
  </tr>
	</tbody>
</table>


<b>itemRemove Example</b>

In the following example (from <code>cart.js</code>), <code>itemRemove</code> is called before the if/else test:

```js
		cartRemoveItem(itemId) {
        this.$overlay.show();
        utils.api.cart.itemRemove(itemId, (err, response) => {
            if (response.data.status === 'succeed') {
                this.refreshContent(true);
            } else {
                alert(response.data.errors.join('\n'));
            }
        });
    } 
```

### Usage in Cornerstone

- [`assets/js/theme/cart.js`](https://github.com/bigcommerce/cornerstone/blob/d786c6ecbed5ad588ed9489f79e2226455a07b21/assets/js/theme/cart.js)

---

<a id="update"></a>

### [update](https://github.com/bigcommerce/stencil-utils/blob/master/src/api/cart.js#L160)

The <code>update</code> function allows your code to update the set of items in the cart:

`utils.api.cart.update(itemId, qty, callback)`


<table>
  <tbody><tr>
    <th>Argument</th>
    <th>Type</th>
    <th>Description/Usage</th>
  </tr>
  <tr>
    <td>items</td>
    <td>Array</td>
    <td>The items in the cart</td>
  </tr>
  <tr>
    <td>callback</td>
    <td>Function</td>
    <td>Asynchronous function call to handle the results</td>
  </tr>
</tbody>
</table>


**update Example**

The following example shows a call to `update` within the `itemUpdate` function:

```js

    itemUpdate(itemId, qty, callback) {
        let callbackArg = callback;
        let items;

        if (Array.isArray(itemId) && typeof qty === 'function') {
            callbackArg = qty;
            items = itemId;
        } else {
            items = [
                {
                    id: itemId,
                    quantity: qty,
                },
            ];
        }

        this.update(items, (err, response) => {
            const emitData = {
                items,
                err,
                response,
            };

            Hooks.emit('cart-item-update-remote', emitData);
            callbackArg(err, response);
        });
    } 
```

---


<a id="getitemgiftwrappingoptions"></a>


### [getItemGiftWrappingOptions](https://github.com/bigcommerce/stencil-utils/blob/master/src/api/cart.js#L132)

The `getItemGiftWrappingOptions` function allows your code to retrieve gift-wrapping options for the current cart item, in customized ways:


`utils.api.cart.getItemGiftWrappingOptions(itemId, callback)`

<table>
  <tbody>
		<tr>
    <th>Argument</th>
    <th>Type</th>
    <th>Description/Usage</th>
  </tr>
  <tr>
    <td>itemId</td>
    <td>String</td>
    <td>The cart item</td>
  </tr>
  <tr>
    <td>callback</td>
    <td>Function</td>
    <td>Asynchronous function call to handle the results</td>
  </tr>
	</tbody>
</table>


**getItemGiftWrappingOptions Example**

The following example (from `cart.js`) calls `getItemGiftWrappingOptions` to display gift-wrapping options in a modal:

```js
    bindGiftWrappingEvents() {
        const modal = defaultModal();

        $('[data-item-giftwrap]').on('click', event => {
            const itemId = $(event.currentTarget).data('itemGiftwrap');
            const options = {
                template: 'cart/modals/gift-wrapping-form',
            };

            event.preventDefault();

            modal.open();

            utils.api.cart.getItemGiftWrappingOptions(itemId, options, (err, response) => {
                modal.updateContent(response.content);

                this.bindGiftWrappingForm();
            });
        });
    }
  ```

### Usage in Cornerstone

- [`assets/js/theme/cart.js`](https://github.com/bigcommerce/cornerstone/blob/master/assets/js/theme/cart.js)

---


<a id="submititemgiftwrappingoption"></a>


### [submitItemGiftWrappingOption](https://github.com/bigcommerce/stencil-utils/blob/master/src/api/cart.js#L150)

The `submitItemGiftWrappingOption` function allows your code to handle the customer’s gift-wrapping selection for the current cart item:

`utils.api.cart.submitItemGiftWrappingOption(itemId, qty, callback)`

<table>
  <tbody>
		<tr>
    <th>Argument</th>
    <th>Type</th>
    <th>Description/Usage</th>
  </tr>
  <tr>
    <td>itemId</td>
    <td>String</td>
    <td>The cart item</td>
  </tr>
  <tr>
    <td>callback</td>
    <td>Function</td>
    <td>Asynchronous function call to handle the results</td>
  </tr>
</tbody>
</table>


**submitItemGiftWrappingOption Example**

This commented example shows a simple call to `submitItemGiftWrappingOption`:

```js

    /**
     * Submit giftwrapping options
     *
     * @param {String} itemId
     * @param {Function} callback
     */
    submitItemGiftWrappingOption(itemId, params, callback) {
        this.remoteRequest(`/gift-wrapping/${itemId}`, 'POST', { params }, callback);
    }
 ```

---

<a id="getcontent"></a>

### [getContent](https://github.com/bigcommerce/stencil-utils/blob/master/src/api/cart.js#L174)

The `getContent` function allows your code to display the cart contents in customized ways:

`utils.api.cart.getContent(options, callback)`

<table>
  <tbody><tr>
    <th>Argument</th>
    <th>Type</th>
    <th>Description/Usage</th>
  </tr>
  <tr>
    <td>options</td>
    <td>Object</td>
    <td>Template containing content and totals children</td>
  </tr>
  <tr>
    <td>callback</td>
    <td>Function</td>
    <td>Asynchronous function call to handle the results</td>
  </tr>
</tbody>
</table>

**getContent Examples**

This example (from <code>cart.js</code>) shows a call to <code>getContent</code> within the <code>refreshContent</code> function:

```js
refreshContent(remove) {
        const $cartItemsRows = $('[data-item-row]', this.$cartContent);
        const $cartPageTitle = $('[data-cart-page-title]');
        const options = {
            template: {
                content: 'cart/content',
                totals: 'cart/totals',
                pageTitle: 'cart/page-title',
                statusMessages: 'cart/status-messages',
            },
        };

        this.$overlay.show();

        // Remove last item from cart? Reload
        if (remove && $cartItemsRows.length === 1) {
            return window.location.reload();
        }

        utils.api.cart.getContent(options, (err, response) => {
            this.$cartContent.html(response.content);
            this.$cartTotals.html(response.totals);
            this.$cartMessages.html(response.statusMessages);

            $cartPageTitle.replaceWith(response.pageTitle);
            this.bindEvents();
            this.$overlay.hide();

            const quantity = $('[data-cart-quantity]', this.$cartContent).data('cart-quantity') || 0;

            $('body').trigger('cart-quantity-update', quantity);
        });
    } 
```

### Usage in Cornerstone

- [`assets/js/theme/global/cart-preview.js`](https://github.com/bigcommerce/cornerstone/blob/master/assets/js/theme/global/cart-preview.js)
- [`assets/js/theme/cart.js`](https://github.com/bigcommerce/cornerstone/blob/master/assets/js/theme/cart.js)
- [`assets/js/theme/common/product-details.js`](https://github.com/bigcommerce/cornerstone/blob/master/assets/js/theme/common/product-details.js)



---

<a id="get-shipping-quotes"></a>

### [getShippingQuotes](https://github.com/bigcommerce/stencil-utils/blob/master/src/api/cart.js#L193)

The `getShippingQuotes` function allows your code to retrieve shipping-cost quotes for the cart’s contents. It returns `shippingQuote` objects that contain IDs. You must follow `getShippingQuotes` by calling `submitShippingQuote` on a `quoteId`:

`utils.api.cart.getShippingQuotes(params, renderWith, callback)`

<table>
  <tbody><tr>
    <th>Argument</th>
    <th>Type</th>
    <th>Description/Usage</th>
  </tr>
  <tr>
    <td>params</td>
    <td>Object</td>
    <td>Contains country_id, state_id, and zip_code</td>
  </tr>
  <tr>
    <td>template</td>
    <td>String/Array/Object</td>
    <td>The template to use for rendering</td>
  </tr>
  <tr>
    <td>callback</td>
    <td>Function</td>
    <td>Asynchronous function call to handle the results</td>
  </tr>
</tbody>
</table>

See submitShippingQutoes for an example. 

### Usage in Cornerstone
- [`assets/js/theme/cart/shipping-estimator.js`](https://github.com/bigcommerce/cornerstone/blob/master/assets/js/theme/cart/shipping-estimator.js)

---

<a id="submitshippingquote"></a>

### [submitShippingQuote](https://github.com/bigcommerce/stencil-utils/blob/master/src/api/cart.js#L218)

The `submitShippingQuote` function must be called after `getShippingQuote`, which returns `shippingQuote` objects that contain IDs. The cart page renders the shipping quotes. When the user selects one of the quotes, this function sends that `quoteId` to the backend:

`utils.api.cart.submitShippingQuote(quoteId, callback)`

<table>
  <tbody>
		<tr>
    <th>Argument</th>
    <th>Type</th>
    <th>Description/Usage</th>
  </tr>
  <tr>
    <td>quoteId</td>
    <td>Number</td>
    <td>ID for a shipping quote returned by <code>getShippingQuotes</code></td>
  </tr>
  <tr>
    <td>callback</td>
    <td>Function</td>
    <td>Asynchronous function call to handle the results</td>
  </tr>
</tbody>
	</table>


**getShippingQuotes and submitShippingQuote Example**

The following example from `cart/shipping-estimator.js` shows calls to both `getShippingQuotes` and `submitShippingQuote`:

```js
bindEstimatorEvents() {
        const $estimatorContainer = $('.shipping-estimator');
        const $estimatorForm = $('.estimator-form');

        $estimatorForm.on('submit', (event) => {
            const params = {
                country_id: $('[name="shipping-country"]', $estimatorForm).val(),
                state_id: $('[name="shipping-state"]', $estimatorForm).val(),
                city: $('[name="shipping-city"]', $estimatorForm).val(),
                zip_code: $('[name="shipping-zip"]', $estimatorForm).val(),
            };

            event.preventDefault();

            utils.api.cart.getShippingQuotes(params, 'cart/shipping-quotes', (err, response) => {
                $('.shipping-quotes').html(response.content);

                // bind the select button
                $('.select-shipping-quote').on('click', (clickEvent) => {
                    const quoteId = $('.shipping-quote:checked').val();

                    clickEvent.preventDefault();

                    utils.api.cart.submitShippingQuote(quoteId, () => {
                        location.reload();
                    });
                });
            });
        }); 
```

### Usage in Cornerstone
- [`assets/js/theme/cart/shipping-estimator.js`](https://github.com/bigcommerce/cornerstone/blob/master/assets/js/theme/cart/shipping-estimator.js)

---

<a id="applycode"></a>

### [applyCode](https://github.com/bigcommerce/stencil-utils/blob/master/src/api/cart.js#L234)

The `applyCode` function applies a coupon code or gift certificate to the cart:

`utils.api.cart.applyCode(code, callback)`

<table>
  <tbody>
		<tr>
    <th>Argument</th>
    <th>Type</th>
    <th>Description/Usage</th>
  </tr>
  <tr>
    <td>code</td>
    <td>String</td>
    <td>Alphanumeric representation of the coupon or gift-certificate code</td>
  </tr>
  <tr>
    <td>callback</td>
    <td>Function</td>
    <td>Asynchronous function call to handle the results</td>
  </tr>
</tbody>
</table>

In the following example from `cart.js`,  `applyCode` is called before the final if/else test to apply a coupon code:

```js
bindPromoCodeEvents() {
        const $couponContainer = $('.coupon-code');
        const $couponForm = $('.coupon-form');
        const $codeInput = $('[name="couponcode"]', $couponForm);

        $('.coupon-code-add').on('click', (event) => {
            event.preventDefault();

            $(event.currentTarget).hide();
            $couponContainer.show();
            $('.coupon-code-cancel').show();
            $codeInput.focus();
        });

        $('.coupon-code-cancel').on('click', (event) => {
            event.preventDefault();

            $couponContainer.hide();
            $('.coupon-code-cancel').hide();
            $('.coupon-code-add').show();
        });

        $couponForm.on('submit', (event) => {
            const code = $codeInput.val();

            event.preventDefault();

            // Empty code
            if (!code) {
                return alert($codeInput.data('error'));
            }

            utils.api.cart.applyCode(code, (err, response) => {
                if (response.data.status === 'success') {
                    this.refreshContent();
                } else {
                    alert(response.data.errors.join('\n'));
                }
            });
        });
    }
```

### Usage in Cornerstone

- [`assets/js/theme/cart.js`](https://github.com/bigcommerce/cornerstone/blob/master/assets/js/theme/cart.js)


---

<a id="apply-gift-certificate"></a>

### [applyGiftCertificate](https://github.com/bigcommerce/stencil-utils/blob/master/src/api/cart.js#L250)

Apply a gift certificate to a cart.

`utils.api.cart.applyGiftCertificate(code, callback)`

| Argument | Type | Description |
| -- | -- | -- |
| code | string | Gift certificate code to apply |
| callback | Function | Asynchronous function call to handle the results |


**applyGiftCertificate Example**

```js
            utils.api.cart.applyGiftCertificate(code, (err, resp) => {
                if (resp.data.status === 'success') {
                    this.refreshContent();
                } else {
                    swal({
                        text: resp.data.errors.join('\n'),
                        type: 'error',
                    });
                }
            });
        });
    }
```

### Usage in Cornerstone
- [`assets/js/theme/cart.js`](https://github.com/bigcommerce/cornerstone/blob/master/assets/js/theme/cart.js)

---

<a id="countriesresource"></a>


## Countries Resource

These functions allow your theme or app to retrieve standardized country names, by numeric ID or by string.

<a id="country-get-by-id"></a>

### [getById](https://github.com/bigcommerce/stencil-utils/blob/master/src/api/countries.js#L23)

The `getById` function retrieves standardized country names by numeric ID:

`utils.api.countries.getById(countryId, callback)`

<table>
  <tbody><tr>
    <th>Argument</th>
    <th>Type</th>
    <th>Description/Usage</th>
  </tr>
  <tr>
    <td>countryId</td>
    <td>Number</td>
    <td>Country code</td>
  </tr>
  <tr>
    <td>callback</td>
    <td>Function</td>
    <td>Asynchronous function call to handle the results</td>
  </tr>
	</tbody>
</table>


The following example a call to `getById`, followed by a call to the `getByName` function (described below):

```js
/*   
	*Get country data by id wrapper
     * @param {Number} id
     * @param {Function} callback
*/

    getById(id, callback) {
        const url = this.endpoint + id;

        this.remoteRequest(url, 'GET', {}, callback);
    }

/*
     * Get country data by country name
     * @param name
     * @param callback
*/
    getByName(name, callback) {
        const url = this.endpoint + name;

        this.remoteRequest(url, 'GET', {}, callback);
    }
}
```

---

<a id="get-by-name"></a>

### [getByName](https://github.com/bigcommerce/stencil-utils/blob/master/src/api/countries.js#L34)

The `getByName` function retrieves states by country name, and returns an array of states that can be used in the callback:

`utils.api.countries.getByName(countryName, callback)`

<table>
  <tbody>
		<tr>
    <td>Argument</td>
    <td>Type</td>
    <td>Description/Usage</td>
  </tr>
  <tr>
    <td>countryName</td>
    <td>String</td>
    <td>Country name</td>
  </tr>
  <tr>
    <td>callback</td>
    <td>Function</td>
    <td>Asynchronous function call to handle the results</td>
  </tr>
	</tbody>
</table>


In the following example from `common/state-country.js`, `getByName` is called after the initial if test:

```js
$('select[data-field-type="Country"]').on('change', (event) => {
        const countryName = $(event.currentTarget).val();

        if (countryName === '') {
            return;
        }

        utils.api.country.getByName(countryName, (err, response) => {
            if (err) {
                alert(context.state_error);

                return callback(err);
            }

            const $currentInput = $('[data-field-type="State"]');

            if (!_.isEmpty(response.data.states)) {
                // The element may have been replaced with a select, reselect it
                const $selectElement = makeStateRequired($currentInput, context);

                addOptions(response.data, $selectElement, options);
                callback(null, $selectElement);
            } else {
                const newElement = makeStateOptional($currentInput, context);

                callback(null, newElement);
            }
        });
    }); 
```

### Usage in Cornerstone
- [`assets/js/theme/common/state-country.js`](https://github.com/bigcommerce/cornerstone/blob/master/assets/js/theme/common/state-country.js)


---

<a id="product-attribute-resource"></a>

## Product Attributes Resource


<a id="optionchange"></a>

### [optionChange](https://github.com/bigcommerce/stencil-utils/blob/master/src/api/product-attributes.js#L24) 

The `optionChange` function is fired when the customer selects a product option for the current cart item (for example, changing a shirt’s color from a default "yellow" to "green").

`utils.api.productAttributes.optionChange(productId, params, callback)`

<table>
  <tbody>
		<tr>
    <th>Argument</th>
    <th>Type</th>
    <th>Description/Usage</th>
  </tr>
  <tr>
    <td>params</td>
    <td>Object</td>
    <td>Contains a collection of IDs that map to product properties (color, size, etc.)</td>
  </tr>
  <tr>
    <td>productId</td>
    <td>Number</td>
    <td>ID for this product</td>
  </tr>
  <tr>
    <td>callback</td>
    <td>Function</td>
    <td>Asynchronous function call to handle the results</td>
  </tr>
	</tbody>
</table>


**optionChange Examples**

In this example (from `common/product-details.js`), `optionChange` is called to update options in a Quick View modal:

```js
// Update product attributes. If we're in quick view and the product has options, then also update the initial view in case items are oos
        if (_.isEmpty(productAttributesData) && hasOptions) {
            const $productId = $('[name="product_id"]', $form).val();

            utils.api.productAttributes.optionChange($productId, $form.serialize(), (err, response) => {
                const attributesData = response.data || {};

                this.updateProductAttributes(attributesData);
                this.updateView(attributesData);
            });
        } else {
            this.updateProductAttributes(productAttributesData);
        } 
```

### Usage in Cornerstone
- [`assets/js/theme/common/product-details.js`](https://github.com/bigcommerce/cornerstone/blob/master/assets/js/theme/common/product-details.js)
- [`assets/js/theme/cart.js`](https://github.com/bigcommerce/cornerstone/blob/master/assets/js/theme/cart.js)

---

<a id="configureincart"></a>

### [configureInCart](https://github.com/bigcommerce/stencil-utils/blob/master/src/api/product-attributes.js#L50)

Configure product options in the cart. 

`utils.api.productAttributes.configureInCart(itemId, options, callback)`

| Argument | Type | Description|
| --- | --- | -- |
| itemId | number | product ID|
| params | object | |
| callback | Function | Asynchronous function call to handle the results |

**configureCart Example**

```js

   utils.api.productAttributes.configureInCart(itemId, options, (err, response) => {
       modal.updateContent(response.content);
       this.bindGiftWrappingForm();
 ```

### Usage in Cornerstone

- [`assets/js/theme/cart.js`](https://github.com/bigcommerce/cornerstone/blob/master/assets/js/theme/cart.js)


---

<a id="product-resource"></a>

## Product Resource

The `product.getById` function allows your code to retrieve, and to present, detailed product information by product ID.

<a id="product-get-by-id"></a>

### [getById](https://github.com/bigcommerce/stencil-utils/blob/master/src/api/product.js)

`utils.api.product.getById(productId, params, callback)`

<table>
  <tbody><tr>
    <th>Argument</th>
    <th>Type</th>
    <th>Description/Usage</th>
  </tr>
  <tr>
    <td>productId</td>
    <td>Number</td>
    <td>ID for this product</td>
  </tr>
  <tr>
    <td>params</td>
    <td>Object</td>
    <td>Contains request options and/or presentation template</td>
  </tr>
  <tr>
    <td>callback</td>
    <td>Function</td>
    <td>Asynchronous function call to handle the results</td>
  </tr>
	</tbody>
</table>


**product.getById Example**

```js
	$('body').on('click', '.quickview', (event) => {
        event.preventDefault();

        const productId = $(event.currentTarget).data('product-id');

        modal.open({ size: 'large' });

        utils.api.product.getById(productId, { template: 'products/quick-view' }, (err, response) => {
            modal.updateContent(response);

            modal.$content.find('.productView').addClass('productView--quickView');

            return new ProductDetails(modal.$content.find('.quickView'), context);
        });
    }); 
  ```

### Usage in Cornerstone
- [`assets/js/theme/global/quick-view.js`](https://github.com/bigcommerce/cornerstone/blob/master/assets/js/theme/global/quick-view.js)

---

<a id="search"></a>

## Search Resource

The `search` function allows you to present a customized user interface for search results.

### [search](https://github.com/bigcommerce/stencil-utils/blob/master/src/api/search.js)

`utils.api.search.search(query, params, callback)`

<table>
  <tbody><tr>
    <th>Argument</th>
    <th>Type</th>
    <th>Description/Usage</th>
  </tr>
  <tr>
    <td>query</td>
    <td>String</td>
    <td>Contains the customer’s search query</td>
  </tr>
  <tr>
    <td>params</td>
    <td>Object</td>
    <td>Contains request options and/or presentation template</td>
  </tr>
  <tr>
    <td>callback</td>
    <td>Function</td>
    <td>Asynchronous function call to handle the results</td>
  </tr>
</tbody>
</table>

**search Example**

```js

    const doSearch = _.debounce((searchQuery) => {
        utils.api.search.search(searchQuery, { template: 'search/quick-results' }, (err, response) => {
            if (err) {
                return false;
            }

            $quickSearchResults.html(response);
        });
    }, 200);
```

### Usage in Cornerstone
- [`assets/js/theme/global/quick-search/js`](https://github.com/bigcommerce/cornerstone/blob/master/assets/js/theme/global/quick-search.js)



---

## Resources
* [Stencil Utils](https://github.com/bigcommerce/stencil-utils) (BigCommerce GitHub)