# Stencil Utils Reference

[Stencil Utils](https://github.com/bigcommerce/stencil-utils) is a utility library that contains the BigCommerce Stencil Events system and other methods that make building a theme with the Stencil framework a breeze.

These methods help you set up asynchronous requests to modify the customer’s cart or storefront view. By using this abstraction library, you can gain more-granular control over themes’ presentation. Use stencil-utils to:
- Interact with the cart
- Use `getPage` to return a template file.

## Installing

### As an ES6 module
1. Run  `npm install @bigcommerce/stencil-utils`  to install the latest tagged version of stencil-utils for use with your theme.
2. Import the library  `import utils from 'bigcommerce/stencil-utils';`  in modules that depend on it.

### Standalone

If you do not want to support ES6 modules, Stencil Utils can be included as a normal script:
-   Copy the bundled script from  `dist/stencil-utils.min.js`  to your theme.
-   Include the script in your HTML document
-   Access stencil utils from  `window.stencilUtils`

## api.js

### Get page
[getPage](https://github.com/bigcommerce/stencil-utils/blob/master/spec/api.spec.js) 
 
This method takes the form `utils.api.getPage(url, options, callback);`.

| Argument | Type | Description/Usage |
|---|---|---|
| url | String | request URL (ex: `/cart.php`) |
| options | Object | Can contain `template`, [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) (for POST methods), `params` (for GET methods), and/or `config`. <br><br>The `template` option allows you to select a particular template, or an array of templates, for rendering one page. Each value must correspond to a file present in the theme's `templates/components/` subdirectory. <br><br>The `config` option can be used to pass extra resources, corresponding to attributes that are valid in a page's front matter, as an object. |
| callback | Function | Asynchronous function call to handle the results |


The `config` argument works like front matter: it encapsulates JSON. For a usage example of `config`, see the [Remote API Example](/stencil-docs/adding-event-hooks-to-your-theme/remote-api-example#remote_remote-api-example).

In the following example (from `common/faceted-search.js`), `api.getPage()` is called to help execute an `updateView()` function.

```js title="Example: getPage" lineNumbers
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

## Cart API 

The following methods allow your theme to work with [cart](https://github.com/bigcommerce/stencil-utils/blob/9cf7c26b0a1f9ca9da83274ebc375e73f20acac5/src/api/cart.js) contents in customized ways.

### Get cart
[getCart](https://github.com/bigcommerce/stencil-utils/blob/master/src/api/cart.js#L11)

This method takes the form `utils.api.cart.getCart(options, callback);`.

| Argument | Type | Description |
|---|---|---|
| options | object | Return product variant options |
| callback | Function | Asynchronous function call to handle the results |


```js title="Example: getCart" lineNumbers
utils.api.cart.getCart({}, (err, response) => {
  console.log(response);
  console.log(err);
});

utils.api.cart.getCart({includeOptions: true}, (err, response) => {
  console.log(response);
  console.log(err);
});
```
### Get cart quantity
[getCartQuantity](https://github.com/bigcommerce/stencil-utils/blob/master/src/api/cart.js#L28) 

Get a sum of the cart line item quantities. It takes the form `utils.api.cart.getCartQuantity(options, callback);`.

| Argument | Type | Description |
|---|---|---|
| options | object | Return product variant options |
| callback | Function | Asynchronous function call to handle the results |

```js title="Example: getCartQuantity" lineNumbers
utils.api.cart.getCartQuantity({}, (err, response) => {
  console.log(response);
  console.log(err);
});

utils.api.cart.getCartQuantity({includeOptions: true}, (err, response) => {
  console.log(response);
  console.log(err);
});
```

### Usage in Cornerstone
- [`assets/js/theme/global/cart-preview.js`](https://github.com/bigcommerce/cornerstone/blob/master/assets/js/theme/global/cart-preview.js)

### Item add
[itemAdd](https://github.com/bigcommerce/stencil-utils/blob/master/src/api/cart.js#L51)

The `itemAdd`method allows your code to add an item to the cart, with options. This method takes the form `utils.api.cart.itemAdd(FormData, callback);`.

| Argument | Type | Description/Usage |
|---|---|---|
| FormData| [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) object | Contains all details about the added item and its product options. <br><br>FormData example: <br>`action: add` <br>`product_id: 123` <br> `attribute[123]: 321` <br>`qty[]: 1` |
| callback| Function | Asynchronous function call to handle the results |

`itemAdd` is called at the head of the following example (from `common/product-details.js`) to populate the cart.  

```js title="Example: itemAdd" lineNumbers
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
```

### Usage in Cornerstone
- [`assets/js/theme/common/product-details.js`](https://github.com/bigcommerce/cornerstone/blob/master/assets/js/theme/common/product-details.js)

### Item update

[itemUpdate](https://github.com/bigcommerce/stencil-utils/blob/master/src/api/cart.js#L70)

The `itemUpdate` method allows your code to update a specified cart item’s quantity. This method takes the form `utils.api.cart.itemUpdate(itemId, qty, callback);`.

| Argument | Type | Description/Usage |
|---|---|---|
| itemId | String | The item’s ID |
| qty | Integer | The item’s quantity in the cart |
| callback | Function | Asynchronous function call to handle the results |

```js title="Example: itemUpdate" lineNumbers
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

### Item remove
[itemRemove](https://github.com/bigcommerce/stencil-utils/blob/master/src/api/cart.js#L106)

The `itemRemove` method allows your code to remove items from the cart. This method takes the form `utils.api.cart.itemRemove(itemId, callback);`.

| Argument| Type | Description/Usage |
|---|---|---|
| itemId | String | The item’s ID |
| callback | Function | Asynchronous function call to handle the results |


In the following example (from `cart.js`), `itemRemove` is called before the if/else test.

```js title="Example: itemRemove" lineNumbers
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

### Update
[update](https://github.com/bigcommerce/stencil-utils/blob/master/src/api/cart.js#L160)

The `update` method allows your code to update the set of items in the cart. It takes the form `utils.api.cart.update(itemId, qty, callback);`.

| Argument | Type | Description/Usage |
|---|---|---|
| items | Array | The items in the cart |
| callback | Function | Asynchronous function call to handle the results |


The following example shows a call to `update` within the `itemUpdate` method:

```js title="Example: update" lineNumbers
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

### Get item gift wrapping options
[getItemGiftWrappingOptions](https://github.com/bigcommerce/stencil-utils/blob/master/src/api/cart.js#L132)

The `getItemGiftWrappingOptions` method allows your code to retrieve gift-wrapping options for the current cart item, in customized ways. It takes the form `utils.api.cart.getItemGiftWrappingOptions(itemId, callback);`.

| Argument | Type | Description/Usage |
|---|---|---|
| itemId | String | The cart item |
| callback | Function | Asynchronous function call to handle the results |


The following example (from `cart.js`) calls `getItemGiftWrappingOptions` to display gift-wrapping options in a modal.

```js title="Example: getItemGiftWrappingOptions" lineNumbers
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

### Submit item gift wrapping option
[submitItemGiftWrappingOption](https://github.com/bigcommerce/stencil-utils/blob/master/src/api/cart.js#L150)

The `submitItemGiftWrappingOption` method allows your code to handle the customer’s gift-wrapping selection for the current cart item. This method takes the form `utils.api.cart.submitItemGiftWrappingOption(itemId, qty, callback);`.

| Argument | Type | Description/Usage |
|---|---|---|
| itemId | String | The cart item |
| callback | Function | Asynchronous function call to handle the results |


```js title="Example: submitItemGiftWrappingOption" lineNumbers
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

### Get content
[getContent](https://github.com/bigcommerce/stencil-utils/blob/master/src/api/cart.js#L174)

The `getContent` method allows your code to display the cart contents in customized ways. It takes the form `utils.api.cart.getContent(options, callback);`.

| Argument | Type | Description/Usage |
|---|---|---|
| options | Object | Template containing content and totals children |
| callback | Function | Asynchronous function call to handle the results |


This example (from `cart.js`) shows a call to `getContent` within the `refreshContent` function.

```js title="Example: getContent" lineNumbers
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

### Get shipping quotes
[getShippingQuotes](https://github.com/bigcommerce/stencil-utils/blob/master/src/api/cart.js#L193)

The `getShippingQuotes` method allows your code to retrieve shipping-cost quotes for the cart’s contents. It returns `shippingQuote` objects that contain IDs. You must follow `getShippingQuotes` by calling `submitShippingQuote` on a `quoteId`. This method takes the form `utils.api.cart.getShippingQuotes(params, renderWith, callback);`.

| Argument | Type | Description/Usage |
|---|---|---|
| params | Object | Contains country_id, state_id, and zip_code |
| template | String/Array/Object | The template to use for rendering |
| callback | Function | Asynchronous function call to handle the results |


See `submitShippingQuotes` for an example. 

### Usage in Cornerstone
- [`assets/js/theme/cart/shipping-estimator.js`](https://github.com/bigcommerce/cornerstone/blob/master/assets/js/theme/cart/shipping-estimator.js)

### Submit shipping quote
[submitShippingQuote](https://github.com/bigcommerce/stencil-utils/blob/master/src/api/cart.js#L218)

This method takes the form `utils.api.cart.submitShippingQuote(quoteId, callback);`.

The `submitShippingQuote` method must be called after `getShippingQuote`, which returns `shippingQuote` objects that contain IDs. The cart page renders the shipping quotes. When the user selects one of the quotes, this method sends that `quoteId` to the backend.

| Argument | Type | Description/Usage |
|---|---|---|
| quoteId | Number | ID for a shipping quote returned by `getShippingQuotes` |
| callback | Function | Asynchronous function call to handle the results |


The following example from `cart/shipping-estimator.js` shows calls to both `getShippingQuotes` and `submitShippingQuote`.

```js title="Example: getShippingQuotes and submitShippingQuote" lineNumbers
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
}
```

### Usage in Cornerstone
- [`assets/js/theme/cart/shipping-estimator.js`](https://github.com/bigcommerce/cornerstone/blob/master/assets/js/theme/cart/shipping-estimator.js)

### Apply code
[applyCode](https://github.com/bigcommerce/stencil-utils/blob/master/src/api/cart.js#L234)

The `applyCode` method applies a coupon code or gift certificate to the cart. It takes the form `utils.api.cart.applyCode(code, callback);`.

| Argument | Type | Description/Usage |
|---|---|---|
| code | String | Alphanumeric representation of the coupon or gift-certificate code |
| callback | Function | Asynchronous function call to handle the results |

In the following example from `cart.js`, `applyCode` is called before the final if/else test to apply a coupon code:

```js title="Example: applyCode" lineNumbers
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

### Apply gift certificate
[applyGiftCertificate](https://github.com/bigcommerce/stencil-utils/blob/master/src/api/cart.js#L250)

This method applies a gift certificate to a cart. It takes the form `utils.api.cart.applyGiftCertificate(code, callback);`.

| Argument | Type | Description |
|---|---|---|
| code | string | Gift certificate code to apply |
| callback | Function | Asynchronous function call to handle the results |

The following example calls `appleGiftCertificate`.

```js title="Example: applyGiftCertificate" lineNumbers
utils.api.cart.applyGiftCertificate(code, (err, resp) => {
  if (resp.data.status === 'success') {
    this.refreshContent();
  } else {
    alert({
      text: resp.data.errors.join('\n'),
      type: 'error',
    });
  }
});
```

### Usage in Cornerstone
- [`assets/js/theme/cart.js`](https://github.com/bigcommerce/cornerstone/blob/master/assets/js/theme/cart.js)

## Countries Resource
These methods allow your theme or app to retrieve standardized country names, by numeric ID or by string.

### Country get by id
[getById](https://github.com/bigcommerce/stencil-utils/blob/master/src/api/countries.js#L23)

The country `getById` method retrieves standardized country names by numeric ID. This method takes the form `utils.api.countries.getById(countryId, callback);`.

| Argument | Type | Description/Usage |
|---|---|---|
| countryId | Number | Country code |
| callback | Function | Asynchronous function call to handle the results |


The following example makes a call to country `getById`.

```js title="Example: getById and getByName" lineNumbers
utils.api.countries.getById(countryId, (err, res) => {
  const url = this.endpoint + countryId;
  this.remoteRequest(url, 'GET', {}, callback);
});
```

### Get by name
[getByName](https://github.com/bigcommerce/stencil-utils/blob/master/src/api/countries.js#L34)

The `getByName` method retrieves states by country name, and returns an array of states that can be used in the callback. It takes the form `utils.api.countries.getByName(countryName, callback);`.

| Argument | Type | Description/Usage |
|---|---|---|
| countryName | String | Country name |
| callback | Function | Asynchronous function call to handle the results |

In the following example from `common/state-country.js`, `getByName` is called after the initial `if` test:

```js title="Example: getByName" lineNumbers

callback(err, element) => {
  if(err) {
    console.log(err);
    return;
  }
  if(element) {
    console.log(element);
    //do something
  }
}

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

## Product Attributes Resource

### Option change
[optionChange](https://github.com/bigcommerce/stencil-utils/blob/master/src/api/product-attributes.js#L24) 

The `optionChange` method is fired when the customer selects a product option for the current cart item (for example, changing a shirt’s color from a default "yellow" to "green"). This method takes the form `utils.api.productAttributes.optionChange(productId, params, callback);`.

| Argument | Type | Description/Usage |
|---|---|---|
| params | Object | Contains a collection of IDs that map to product properties (color, size, etc.) |
| productId | Number | ID for this product |
| callback | Function | Asynchronous function call to handle the results |

In this example (from `common/product-details.js`), `optionChange` is called to update options in a Quick View modal.

```js title="Example: optionChange" lineNumbers
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

### Configure in cart
[configureInCart](https://github.com/bigcommerce/stencil-utils/blob/master/src/api/product-attributes.js#L50)

This method configures product options in the cart. It takes the form `utils.api.productAttributes.configureInCart(itemId, options, callback);`.

| Argument | Type | Description|
|---|---|---|
| itemId | number | product ID|
| params | object | |
| callback | Function | Asynchronous function call to handle the results |

```js title="Example: configureCart" lineNumbers
utils.api.productAttributes.configureInCart(itemId, options, (err, response) => {
  modal.updateContent(response.content);
  this.bindGiftWrappingForm();
});
 ```

### Usage in Cornerstone

- [`assets/js/theme/cart.js`](https://github.com/bigcommerce/cornerstone/blob/master/assets/js/theme/cart.js)

## Product Resource
### Product get by id
[getById](https://github.com/bigcommerce/stencil-utils/blob/master/src/api/product.js)

The product `getById` method allows your code to retrieve, and to present, detailed product information by product ID. This method takes the form `utils.api.product.getById(productId, params, callback);`.

| Argument | Type | Description/Usage |
|---|---|---|
| productId | Number | ID for this product |
| params | Object | Contains request options and/or presentation template |
| callback | Function | Asynchronous function call to handle the results |

```js title="Example: Product getById" lineNumbers
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

## Search Resource

The `search` method allows you to present a customized user interface for search results.

### Search
[search](https://github.com/bigcommerce/stencil-utils/blob/master/src/api/search.js)

The core search method takes the form `utils.api.search.search(query, params, callback);`.

| Argument | Type | Description/Usage |
|---|---|---|
| query | String | Contains the customer’s search query |
| params | Object | Contains request options and/or presentation template |
| callback | Function | Asynchronous function call to handle the results |

```js title="Example: search" lineNumbers
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

## Config Object

A `config` object can be passed in as part of the Stencil Utils API.

The object only returns data **in the context** of that call. The config will not be available to anything else. It will not surface objects that are not normally available to the page. Use YAML to return objects in the context of an entire page. Some config objects can only be used on the listed pages, while others are available globally. 

```js title="Example: config" lineNumbers
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
  console.log(options);
  return onComplete(options);
}
```

### Product search attributes

[Product Search Results](https://github.com/bigcommerce/cornerstone/blob/master/templates/pages/search.html)

```json title="Example: Product search results" lineNumbers
{
  "search": {
    "product_results": {
        "limit": 5
    }
  }
}
```

## Brands

### Brand list
[Brand List Page](https://github.com/bigcommerce/cornerstone/blob/master/templates/pages/brands.html)

```json title="Example: Brand list object" lineNumbers
{
  "brands": {
    "limit": 5
  }
}
```

### Brand page
[Brand Page](https://github.com/bigcommerce/cornerstone/blob/master/templates/pages/brand.html)

```json title="Example: Brand page object" lineNumbers
{
  "brand": {
    "products": {
      "limit": 5
    }
  }
}
```

### Cart

[Cart Page](https://github.com/bigcommerce/cornerstone/blob/master/templates/pages/cart.html)

```json title="Example: Cart object" lineNumbers
{
  "cart": {
    "suggestions": {
      "limit": 5
    }
  }
}
```

### Product

[Product Page](https://github.com/bigcommerce/cornerstone/blob/master/templates/pages/product.html)

```json title="Example: Product object" lineNumbers
{
  "product": {
    "videos": {
      "limit": 11
    },
    "images": {
      "limit": 12
    },
    "reviews": {
      "limit": 13
    },
    "related_products": {
      "limit": 14
    },
    "similar_by_views": {
      "limit": 15
    }
  }
}
```
 
### Blog

[Blog Page](https://github.com/bigcommerce/cornerstone/blob/master/templates/pages/blog.html)

```json title="Example: Blog object" lineNumbers
{
  "blog": {
    "posts": {
      "limit": 5,
      "pages": 3,
      "summary": 10
    }
  }
}
```


### Category

[Category Page](https://github.com/bigcommerce/cornerstone/blob/master/templates/pages/category.html)

```json title="Example: Category page object" lineNumbers
{
  "category": {
    "shop_by_price": false,
    "products": {
      "limit": 5
    }
  }
}
```

### Global Objects

```json title="Products" lineNumbers
{
  "products": {
    "featured": 3,
    "new": 4,
    "top_sellers": 10
  }
}
```
&nbsp;
```json title="Example: " lineNumbers
{
  "products": {
    "featured": {
      "limit": "5"
    },
    "new": {
      "limit": "10"
    },
    "top_sellers": {
      "limit": "15"
    }
  }
}
```
&nbsp;
```json title="All objects" lineNumbers
{
  "customer": {
    "addresses": false,
    "returns": true,
    "wishlists": {
      "limit": 3
    },
    "orders": {
      "limit": 4
    },
    "recently_viewed_products": true
  },
  "products": {
    "featured": {
      "limit": 3
    },
    "new": {
      "limit": 4
    },
    "top_sellers": {
      "limit": 5
    }
  },
  "carousel": true,
  "blog": {
    "recent_posts": {
      "limit": 7
    },
    "summary": 6
  },
  "cart": true,
  "shipping_messages": true,
  "categories": {
    "description": true
  },
  "shop_by_brand": {
    "limit": 4
  }
}
```

## Resources
* [Stencil Utils](https://github.com/bigcommerce/stencil-utils) (BigCommerce GitHub)
