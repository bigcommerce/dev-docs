# Wallet Button Configuration

This article provides information on adding wallet buttons on the Product Display Page (PDP). By default, wallet buttons are supported only by new stores using Cornerstone 6.7.0 and later. However, you can upgrade older themes to support wallet buttons by following the steps outlined in this article. 

<!-- theme: info -->
>Wallet buttons should always be available to the customer except when the product details form is invalid or if the product is not purchasable.

## Adding wallet buttons 

To add wallet buttons on the Product Details Page (PDP) you will need to update theme settings. You should make an ability for the merchant to turn on and off the feature by performing the following steps.

1. In `config.json`, add `show_quick_payment_buttons` configuration with a default value.

<!-- theme: info -->
>To turn on this feature by default, set "show_quick_payment_buttons": true.

```
{
  ...,
  settings: {
    ...,
    "show_quick_payment_buttons": true
  }
}
```
2. Update`schema.json` to create a checkbox for togging the feature on Page Builder by adding the following to the Products section:

```
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

The checkbox should look as follows:
 
 ![wallet-buttons-01](https://storage.googleapis.com/bigcommerce-production-dev-center/images/wallet-buttons-01.png "add-checkbox")

## Setting quantity of wallet buttons

To set the number of wallet buttons visible on the product page, perform the following steps:

1. Update `config.json` by adding `paymentbuttons-number-of-buttons` configuration with a default value.

```
{
  ...,
  settings: {
    ...,
    "paymentbuttons-number-of-buttons": 1
  }
}
```

<!-- theme: info -->
>If the settings option is not provided, then only one button will be shown by default. The customer will have an access to other buttons by clicking on **More payment options** button.

2. Update `schema.json` to add base wallet buttons count section into the Payments section for display in Page builder.

```
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

### Adding sorting for the wallet buttons

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

  
### Adding wallet buttons to theme markup

To render wallet buttons, you should paste the following code under the **Add to Cart**  button on the Product details page:

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


