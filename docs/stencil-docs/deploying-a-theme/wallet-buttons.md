# Configuring Wallet Buttons

<!-- theme: info -->
> #### Familiarity with Stencil development
> The file structures for each theme can be unique; therefore, some knowledge of [Stencil](/stencil-docs/getting-started/about-stencil) development may be required to render wallet buttons. The examples in this article use the Cornerstone theme.

This article explains how to add wallet buttons to the Product Detail Page, or _PDP_. Cornerstone 6.7.0+ supports wallet buttons by default; however, you can upgrade older themes to support wallet buttons by following the steps outlined in this article.

<!-- theme: info -->
> #### Wallet button availability
> Wallet buttons are always available to the customer except in the following cases:
> * The product details form is invalid.
> * The product is not purchasable.

## Adding wallet buttons

By default, wallet buttons are not enabled on the PDP. To add wallet buttons, you must first prepare your theme by adding a checkbox to Page Builder. The checkbox allows the merchant to control the display of wallet buttons on the PDP on your store. Perform the following steps to add the checkbox:

1. In `config.json`, add a `show_quick_payment_buttons` property and provide a default value.

<!-- theme: info -->
> #### Setting a default value
> To turn on this feature by default, set `"show_quick_payment_buttons": true`.

```json title="config.json, quick payment buttons default" lineNumbers
{
  ...,
  "settings": {
    ...,
    "show_quick_payment_buttons": true
  }
}
```

2. To create a checkbox for the merchant to toggle the feature on and off in Page Builder, add the following code to the Products section of `schema.json`:

```json title="schema.json, checkbox configuration" lineNumbers
{
  ...,
  {
    "name": "Products",
    "settings": [
      ...,
      {
        "type": "checkbox",
        "label": "Show quick payment buttons",
        "force_reload": true,
        "id": "show_quick_payment_buttons"
      },
      ...,
    ]
  }  
}
```

In Page Builder, the checkbox appears as follows:
 
![wallet-buttons-01](https://storage.googleapis.com/bigcommerce-production-dev-center/images/wallet-buttons-01.png "add-checkbox")

## Setting quantity of wallet buttons

To set the number of wallet buttons visible on the product page, perform the following steps:

1. In `config.json`, add a `paymentbuttons-number-of-buttons` property and provide a default value.

```json title="config.json, number of buttons default" lineNumbers
{
  ...,
  "settings": {
    ...,
    "paymentbuttons-number-of-buttons": 1
  }
}
```

<!-- theme: info -->
> #### Default number of buttons
> If the `paymentbuttons-number-of-buttons` property is not defined, only **one** button will be shown. The customer will have access to any other buttons by clicking **More payment options**.

2. To add a Page Builder dialog for the merchant to configure the number of visible wallet buttons, add the following code to the Payments section of `schema.json`:

```json title="schema.json, visible wallet buttons" lineNumbers
{
  ...,
  {
    "name": "Payments",
    "settings": [
      ...,
      {
        "type": "heading",
        "content": "Quick payment buttons"
      },
      {
        "type": "select",
        "label": "Number of buttons always visible",
        "force_reload": true,
        "id": "paymentbuttons-number-of-buttons",
        "options": [
          {
            "value": 1,
            "label": "1"
          },
          {
            "value": 2,
            "label": "2"
          }
        ]
      },
      ...
    ]
  }  
}
```

In Page Builder, the dialog appears as follows:

![wallet-buttons-02](https://storage.googleapis.com/bigcommerce-production-dev-center/images/wallet-buttons-02.png "wallet-buttons-quantity")

## Sorting wallet buttons

Adding a sorting features allows merchants to choose the order in which wallet buttons appear to shoppers. To add a sorting feature, perform the following steps:

1. In `config.json`, add a `paymentbuttons-provider-sorting` property and provide a default value.

```json title="config.json, sorting wallet buttons" lineNumbers
{
  ...,
  "settings": {
    ...,
    "paymentbuttons-provider-sorting": []
  }
}
```

2. To add the sorting component to the wallet buttons Page Builder dialog, add the following code to the Payments section of `schema.json`:

```json title="schema.json, sorting feature" lineNumbers
{
  ...,
  {
    "name": "Payments",
    "settings": [
      ...,
      {
        "type": "heading",
        "content": "i18n.QuickPaymentButtons"
      },
      {
        "type": "sort",
        "label": "i18n.ProviderSortingOrderLabel",
        "id": "paymentbuttons-provider-sorting",
        "force_reload": true,
        "options": [
          {
            "value": "paypal",
            "label": "i18n.PayPalProviderSortingLabel",
            "enabledBy": "paypal"
          },
          {
            "value": "paypal-credit",
            "label": "i18n.PayPalCreditProviderSortingLabel",
            "enabledBy": "paypal-credit"
          },
          {
            "value": "paypal-venmo",
            "label": "i18n.PayPalVenmoProviderSortingLabel",
            "enabledBy": "paypal-venmo"
          },
          {
            "value": "sepa",
            "label": "i18n.PayPalSepaProviderSortingLabel",
            "enabledBy": "sepa"
          },
          {
            "value": "googlepay",
            "label": "i18n.GooglepayProviderSortingLabel",
            "enabledBy": "googlepay"
          },
          {
            "value": "applepay",
            "label": "i18n.ApplepayProviderSortingLabel",
            "enabledBy": "applepay"
          },
          {
            "value": "afterpay",
            "label": "i18n.AfterpayProviderSortingLabel",
            "enabledBy": "afterpay"
          },
          {
            "value": "amazonpay",
            "label": "i18n.AmazonProviderSortingLabel",
            "enabledBy": "amazonpay"
          },
          {
            "value": "masterpass",
            "label": "i18n.MasterpassProviderSortingLabel",
            "enabledBy": "masterpass"
          }
        ]
      },
      ...
    ]
  }  
}
```

In Page Builder, the dialog appears as follows:

![wallet-buttons-03](https://storage.googleapis.com/bigcommerce-production-dev-center/images/wallet-buttons-03.png "wallet-buttons-sorting")

<!-- theme: info -->
>Adding "heading" for a section can be skipped if it was added before.

```json title="schema.json, previous-heading-section" lineNumbers
{
  ...,
  {
    "name": "Payments",
    "settings": [
      ...,
      {
        "type": "heading",
        "content": "i18n.QuickPaymentButtons"
      },
      ...
    ]
  }  
}
```

  
## Adding wallet buttons to theme markup

<!-- theme: warning -->
> #### The previous steps are required
> If you don't perform the preceding steps, your theme will not successfully render wallet buttons.

To render wallet buttons, you must perform the preceding steps described in this article. [Add wallet buttons](#adding-wallet-buttons), [set the quantity of buttons](#setting-quantity-of-wallet-buttons), and [sort the buttons](#sorting-wallet-buttons) as desired, then insert the following code underneath the **Add to Cart** button on the PDP.

<!-- theme: info -->
> Additional steps may be required depending on your theme's setup.

```handlebars title="schema.json, render-wallet-buttons" lineNumbers
{{#if this.with_wallet_buttons}}
  {{#if wallet_buttons}}
    <div class="your-class-for-wallet-buttons-list">
      {{{wallet_buttons}}}
    </div>
  {{/if}}
{{/if}}
```

The wallet buttons appear on the PDP as follows:

![wallet-buttons-04](https://storage.googleapis.com/bigcommerce-production-dev-center/images/wallet-buttons-04.png "theme-markup")


## Resources

### Related articles

* [Theme Styles Configuration](/stencil-docs/page-builder/theme-styles-configuration)
* [Page Builder](https://support.bigcommerce.com/s/article/Page-Builder?language=en_US)
* [Other Objects and Properties Overview](/stencil-docs/reference-docs/other-objects-and-properties-overview)
