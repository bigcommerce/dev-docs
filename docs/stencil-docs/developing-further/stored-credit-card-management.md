# Stored Payment Methods

<div class="otp" id="no-index">

### On This Page
- [Requirements](#requirements)
- [Adding Stored Credit Cards](#adding-stored-credit-cards)
- [FAQ](#faq)
- [Resources](#resources)

</div>

Cornerstone release [`2.6.0`](https://developer.bigcommerce.com/changelog#posts/cornerstone-2-6-0-release) added stored payment method management for saved credit cards to the customer `account.php` page. Cornerstone [`4.4.0`](https://developer.bigcommerce.com/changelog#posts/cornerstone-4-4-0-release) expands this functionality to include saving PayPal accounts via [PayPal powered by Braintree](https://support.bigcommerce.com/s/article/Connecting-with-PayPal-Powered-by-Braintre1). This article contains instructions for manually applying the changes made in `4.4.0` to themes version `2.6.0 ` to `4.3.1`. For a full diff of the files to change, see [Pull Request #1603](https://github.com/bigcommerce/cornerstone/pull/1603/files). If you're developing on a theme older than version `2.6.0` you'll first need to apply the changes made in `2.6.0`; to do so, see [Stored Credit Card Management](https://developer.bigcommerce.com/legacy/stencil-themes/stored-credit-card-management). For theme update best practices, see [Theme Updates and Version Control](https://developer.bigcommerce.com/stencil-docs/developing-further/theme-updates-and-version-control).

![Save PayPal Account](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/stored-credit-card-management02.png "Save PayPal Account")

## Update `config.json`

In `config.json`, replace `account_payment_methods` in the `features` array with `account_payment_methods_v2` and add `csrf_protection`:

```json
{
  "name": "Cornerstone",
  "version": "4.3.1",
  "meta": {
    ...
    "features": [
      "fully_responsive",
      "mega_navigation",
      ...
      "csrf_protection",        // <-- add csrf_protection
      "account_payment_methods" // <-- replace with account_payment_methods_v2
    ]
  },
```

Then [add the `supported_payment_methods` array](https://github.com/leeBigCommerce/cornerstone/blob/54f5681a6a15cd8477c51c6db9eb54ea3eb40972/config.json#L325) and append `card` and `paypal` to it:

```json
    ...
    "supported_card_type_icons": [
      ...
    ],
    "supported_payment_methods": [ // <-- Add supported_payment_methods array
      "card",                      // <-- whitelist card and paypal
      "paypal"
    ],
    "lazyload_mode": "lazyload+lqip"
  },
  ...
```

This will enable saving PayPal and credit card accounts (and other non credit card payment methods) on the theme.

See the full diff, refer to [Pull Request #1603](https://github.com/bigcommerce/cornerstone/pull/1603/files?file-filters%5B%5D=.html&file-filters%5B%5D=.json&file-filters%5B%5D=.md#diff-06b2d3b23dce96e1619d2b53d6c947ec).

## Update `payment-methods-list.html`
Once the config changes listed above are made, a new version of the `payment_methods` object will be given to the template.

To use the updated object, apply the changes from [Pull Request #1603](https://github.com/bigcommerce/cornerstone/pull/1603/files?file-filters%5B%5D=.html) to `payment-methods-list.html`.

Once applied, saved PayPal accounts will be displayed in the payment method list:

![Payment Method List](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/tored-credit-card-management01.png "Payment Method List")

## Update `edit-payment-method.html`
The `customer.edit_stored_instrument` object has been lightly extended to include a `type` attribute.

Using `type`, we can show or hide fields based on the current instrument being `stored_card` or `stored_paypal_account`. The type is also posted back to the form handler in a hidden input so the handler can update the right kind of instrument accordingly.

Modify `edit-payment-method.html` to include changes from [Pull Request #1603](https://github.com/bigcommerce/cornerstone/pull/1603/files?file-filters%5B%5D=.html) to add the new user interface elements and behavior.

## Update `_paymentMethods.scss`

To style the newly added UI elements, update `_paymentMethods.scss` with the changes from [Pull Request #1603](https://github.com/bigcommerce/cornerstone/pull/1603/files?file-filters%5B%5D=#diff-1c33ed0c69f228483a39fce2616e1942)

## Add PayPal Logo

Included in the changes to `payment-methods-list.html` is a PayPal logo that's displayed on the payment method cards:

```
<img class="methodHeader-icon" src="{{cdn 'img/payment-methods/paypal.svg'}}" alt="{{lang 'account.payment_methods.paypal'}}" title="{{lang 'account.payment_methods.paypal'}}">
```

Download the `.svg` and save it to `assets/img/payment-methods`:

```bash
cd assets/img/payment-methods/paypal.svg
curl -O https://raw.githubusercontent.com/leeBigCommerce/cornerstone/54f5681a6a15cd8477c51c6db9eb54ea3eb40972/assets/img/payment-methods/paypal.svg
```

## Update `en.json`
At minimum, a translation for the `en` needs to be added to `lang/en.json: [Pull Request #1603](https://github.com/bigcommerce/cornerstone/pull/1603/files?file-filters%5B%5D=.html&file-filters%5B%5D=.json&file-filters%5B%5D=.md#diff-b0d4c1fc9d8d2a5a213b27a72cf6c9fe). Add translations for other locales as needed.

## FAQ
**Where is the card data stored?**

Card data is stored securely with the payment gateway.

**Is storing credit cards PCI compliant?**

Card data is stored securely with the payment gateway. The BigCommerce store is NOT storing the payment data.

**Can shoppers modify their stored card?**

After adding a card, shoppers can modify the billing address. To modify other the other details, shoppers will need to delete and re-add the card.

## Resources

### Related Articles
* [Payments API](https://developer.bigcommerce.com/api-docs/payments/payments-api-overview)
* [Enabling Stored Cards](https://support.bigcommerce.com/s/article/Enabling-Stored-Credit-Cards) (BigCommerce Knowledge Base)
* [The Complete Guide to Checkout Customization on BigCommerce](https://medium.com/bigcommerce-developer-blog/the-complete-guide-to-checkout-customization-on-bigcommerce-6b566bc36fa9) (Developer Blog)
