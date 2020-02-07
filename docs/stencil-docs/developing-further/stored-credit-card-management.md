# Stored Payment Methods

<div class="otp" id="no-index">

### On This Page
- [Requirements](#requirements)
- [Adding Stored Credit Cards](#adding-stored-credit-cards)
- [FAQ](#faq)
- [Resources](#resources)

</div>

Cornerstone release [`2.6.0`](https://developer.bigcommerce.com/changelog#posts/cornerstone-2-6-0-release) added stored payment method management for saved credit cards to the customer `account.php` page. Cornerstone [`4.4.0`](https://developer.bigcommerce.com/changelog#posts/cornerstone-4-4-0-release) expands this functionality to include saving PayPal accounts via [PayPal powered by Braintree](https://support.bigcommerce.com/s/article/Connecting-with-PayPal-Powered-by-Braintre1). This article contains instructions for manually applying the changes made in `4.4.0` to themes `2.6.0 `- `4.3.1`. For a git diff of the files to change, see [Pull Request #1603](https://github.com/bigcommerce/cornerstone/pull/1603/files). If you're developing on a theme older than version `2.6.0` you'll first need to apply the changes made in `2.6.0`; to do so, see [Stored Credit Card Management](https://developer.bigcommerce.com/legacy/stencil-themes/installing-legacy-theme-modules). For theme update best practices, see [Theme Updates and Version Control](https://developer.bigcommerce.com/stencil-docs/developing-further/theme-updates-and-version-control).

```bash
cd assets/img/payment-methods/paypal.svg
curl -O https://raw.githubusercontent.com/leeBigCommerce/cornerstone/54f5681a6a15cd8477c51c6db9eb54ea3eb40972/assets/img/payment-methods/paypal.svg
```

## Update `config.json`

https://github.com/bigcommerce/cornerstone/pull/1603/files?file-filters%5B%5D=.html&file-filters%5B%5D=.json&file-filters%5B%5D=.md#diff-06b2d3b23dce96e1619d2b53d6c947ec

In `config.json`, replace `account_payment_methods` in the `features` array with `account_payment_methods_v2`:

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
      "account_payment_methods" // <--- replace with account_payment_methods_v2
    ]
  },
```

**meta > features**:
* `account_payment_methods_v2` -- add to features array to enable paypal vaulinging
* if present, must remove `account_payment_methods`
* `supported_payment_methods` -- whitelist for payment methods for the template to show

## payment-methods-list.html
Once the config changes listed above are made, a newer version of the `payment_methods` object will be given to the template.

## Update edit-payment-method.html
`customer.edit_stored_instrument.type` Added.

Using `type`, the view can decide to show or hide fields based on the current instrument being `stored_card` or `stored_paypal_account`.

The type is also posted back to the form handler in a hidden input so the handler can update the right kind of instrument accordingly.

```html
{{#partial "page"}}

    {{> components/common/breadcrumbs breadcrumbs=breadcrumbs}}

    <h2 class="page-heading">{{lang 'forms.payment_methods.edit.heading'}}</h2>

    {{> components/account/navigation account_page='payment_methods'}}

    <div class="account account--fixed">
        {{#if forms.error}}
            {{> components/common/alert-error forms.error}}
        {{/if}}

        {{#with customer.edit_stored_instrument}}
            <form action="{{forms.action}}" data-address-form class="form" method="post">
                <input type="hidden" name="token" value="{{token}}">
                <input type="hidden" name="currency_code" value="{{../currency_selector.active_currency_code}}">
                <input type="hidden" name="type" value="{{type}}">

                <h3 class="paymentMethodForm-heading">{{lang 'account.payment_methods.payment_method'}}</h3>

                <div class="paymentMethodForm">
                    {{#if type '===' 'stored_card'}}
                        <dl class="paymentMethodForm-details">
                            <dt class="paymentMethodForm-details-term">{{lang 'account.payment_methods.credit_card_number'}}</dt>
                            <dd class="paymentMethodForm-details-description">**** **** **** {{last_4}}</dd>
                        </dl>
                        <dl class="paymentMethodForm-details">
                            <dt class="paymentMethodForm-details-term">{{lang 'account.payment_methods.expiration'}}</dt>
                            <dd class="paymentMethodForm-details-description">{{expiry_month}}/{{expiry_year}}</dd>
                        </dl>
                    {{/if}}
                    {{#if type '===' 'stored_paypal_account'}}
                        <div class="form-field">
                            <h3 class="paymentMethodForm-heading">
                                {{lang 'account.payment_methods.paypal'}} {{lang 'common.account'}}
                            </h3>
                            <p>
                                {{email}}
                            </p>
                        </div>
                    {{/if}}
                    <div class="form-field">
                        <input type="checkbox" value="default_instrument" name="is_default" id="default_instrument" data-label="{{lang 'forms.payment_methods.default_instrument'}}" class="form-checkbox" {{#if is_default}}checked{{/if}}>
                        <label class="form-label" for="default_instrument">{{lang 'forms.payment_methods.default_instrument'}}</label>
                        <input type="checkbox" value="default_instrument" name="default_instrument" id="default_instrument" data-label="{{lang 'forms.payment_methods.default_instrument'}}" class="form-checkbox" {{#if customer.payment_methods.selected_payment_method.default_instrument}}checked{{/if}}>
                    </div>
                </div>

                {{#if type '===' 'stored_card'}}
                    <h3 class="paymentMethodForm-heading">{{lang 'account.payment_methods.billing_address'}}</h3>

                    <fieldset class="form-fieldset">
                        <div class="form-row form-row--half">
                            {{#each forms.billing_fields}}
                                {{{dynamicComponent 'components/common/forms'}}}
                            {{/each}}
                        </div>
                    </fieldset>
                {{/if}}
                <div class="form-actions">
                    <input type="submit" class="button button--primary" value="{{lang 'forms.payment_methods.submit_value'}}">
                    <a href="{{../urls.account.payment_methods.all}}" class="button">{{lang 'common.cancel'}}</a>
                    {{inject 'required' (lang 'common.required')}}
                    {{inject 'state_error' (lang 'errors.state_error')}}
                </div>
            </form>
        {{/with}}
    </div>
{{/partial}}
```


## Update _paymentMethods.scss

https://github.com/bigcommerce/cornerstone/pull/1603/files?file-filters%5B%5D=.html&file-filters%5B%5D=.json&file-filters%5B%5D=.md&file-filters%5B%5D=.scss#diff-1c33ed0c69f228483a39fce2616e1942

## Update en.json
[Content](https://github.com/bigcommerce/cornerstone/pull/1603/files?file-filters%5B%5D=.html&file-filters%5B%5D=.json&file-filters%5B%5D=.md#diff-b0d4c1fc9d8d2a5a213b27a72cf6c9fe)

## Update payment-methods-list.html

https://github.com/bigcommerce/cornerstone/pull/1603/files?file-filters%5B%5D=.json&file-filters%5B%5D=.md#diff-fd6c9ece0aca0816e9001c7733629457
Content

## Update payment-methods-list.html
```js
```

## FAQ
**Where is the card data stored?**

Card data is stored securely with the payment gateway.

**Is storing credit cards PCI compliant?**

Card data is stored securely with the payment gateway. The BigCommerce store is NOT storing the payment data.

**Can shoppers modify their stored card?**

After adding a card, shoppers will only be able to modify the billing address. If other credit card details need to be modified (such as expiration date), the shopper must delete and re-add the card.

## Resources

### Related Articles
* [Payments API](https://developer.bigcommerce.com/api-docs/payments/payments-api-overview)
* [Enabling Stored Cards](https://support.bigcommerce.com/s/article/Enabling-Stored-Credit-Cards) (BigCommerce Knowledge Base)
* [The Complete Guide to Checkout Customization on BigCommerce](https://medium.com/bigcommerce-developer-blog/the-complete-guide-to-checkout-customization-on-bigcommerce-6b566bc36fa9) (Developer Blog)
