# Configuring Wallet Buttons

This article explains how to add wallet buttons to the Product Detail Page, or _PDP_. By default, wallet buttons are supported only by new stores using Cornerstone 6.7.0 and later. However, you can upgrade older themes to support wallet buttons by following the steps outlined in this article. 

<!-- theme: info -->
> #### Wallet button availability
> Wallet buttons are always available to the customer except in the following cases:
> * The product details form is invalid
> * The product is not purchasable

## Adding wallet buttons

To add wallet buttons to the PDP, you must update theme settings. Enable the merchant to toggle wallet buttons on and off by performing the following steps:

1. In `config.json`, add a `show_quick_payment_buttons` property and provide a default value.

<!-- theme: info -->
> #### Setting a default value
> To turn on this feature by default, set `"show_quick_payment_buttons": true`.

```json title="config.json, quick payment buttons default"
{
  ...,
  "settings": {
    ...,
    "show_quick_payment_buttons": true
  }
}
```

2. To create a checkbox for the merchant to toggle the feature on and off in **Page Builder**, add the following to the **Products** section of `schema.json`:

```json title="schema.json, checkbox configuration"
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

In **Page Builder**, the checkbox appears as follows:
 
![wallet-buttons-01](https://storage.googleapis.com/bigcommerce-production-dev-center/images/wallet-buttons-01.png "add-checkbox")

## Setting quantity of wallet buttons

To set the number of wallet buttons visible on the product page, perform the following steps:

1. In `config.json`, add a `paymentbuttons-number-of-buttons` property and provide a default value.

```json title="config.json, number of buttons default"
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

2. To add a **Page Builder** dialog for the merchant to configure the number of visible wallet buttons, add the following to the **Payments** section of `schema.json`:

```json title="schema.json, checkbox configuration"
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

The button should look as follows:

![wallet-buttons-02](https://storage.googleapis.com/bigcommerce-production-dev-center/images/wallet-buttons-02.png "wallet-buttons-quantity")

## Adding sorting for the wallet buttons

Merchants can choose an order for rendering wallet buttons. To add a sorting feature, perform the following steps.

1. Update `config.json` by adding `paymentbuttons-provider-sorting` configuration with a default value.

```
{
  ...,
  settings: {
    ...,
    "paymentbuttons-provider-sorting": []
  }
}
```
2. Update `schema.json` to add the sorting wallet buttons component into the Payments section for display in Page builder.

```
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

The sorting feature should look as follows:

![wallet-buttons-03](https://storage.googleapis.com/bigcommerce-production-dev-center/images/wallet-buttons-03.png "wallet-buttons-sorting")

<!-- theme: info -->
>Adding "heading" for a section can be skipped if it was added before.

```
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

To render wallet buttons, you should paste the following code under the **Add to Cart**  button on the PDP:

<!-- theme: info -->
>Additional steps may be required depending on your setup.

```
{{#if this.with_wallet_buttons}}
  {{#if wallet_buttons}}
    <div class="your-class-for-wallet-buttons-list">
      {{{wallet_buttons}}}
    </div>
  {{/if}}
{{/if}}
```

The buttons should look as follows:

![wallet-buttons-04](https://storage.googleapis.com/bigcommerce-production-dev-center/images/wallet-buttons-04.png "theme-markup")
