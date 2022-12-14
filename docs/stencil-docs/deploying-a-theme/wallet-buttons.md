# Wallet Button Configuration

Theme developers can add wallet buttons on the Product Display Page (PDP). By default, the wallet buttons are supported only by new stores with the latest Cornerstone theme. This article contains information on how to upgrade your theme to add wallet buttons. 

Wallet buttons should always be available to the customer except when the product details form is invalid or if the product is not purchasable.

## Adding wallet buttons 

To add wallet buttons on the Product Details Page (PDP) you will need to update the theme settings. In the `config.json` file, you should make an ability for the merchant to turn on and off the feature by performing the following steps.

1. Add `show_quick_payment_buttons` configuration with a default value.

<!-- theme: info -->
>To make it turned on by default set "show_quick_payment_buttons": true.

```
{
  ...,
  settings: {
    ...,
    "show_quick_payment_buttons": true
  }
}
```
2. Update the `schema.json` file to create a checkbox for togging the feature on Page Builder.

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

<!-- theme: info -->
>The settings option is responsible for providing an array of data to the theme.


The checkbox should look as follows:
 

## Setting quantity of wallet buttons

To set the number of wallet buttons on the PDP, perform the following steps:

1. Update the `config.json` as follows:

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
>Add `paymentbuttons-number-of-buttons` configuration with a default value.

<!-- theme: info -->
>If the settings option is not provided, then only one button will be shown by default. The customer will have an access to other buttons by clicking on **More payment options** button.

2. Add base wallet buttons count section in the Payments section of Page builder by updating `schema.json`.

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

### Adding sorting for the wallet buttons

Merchants can choose an order for rendering wallet buttons. To add a sorting feature, perform the following updates.

1. Update the `config.json` file as follows:

```
{
  ...,
  settings: {
    ...,
    "paymentbuttons-provider-sorting": []
  }
}
```
<!-- theme: info -->
>Add `paymentbuttons-provider-sorting` configuration with a default value.

2. Update the `schema.json` file as follows:

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
<!-- theme: info -->
>Adding “heading” for a section can be skipped if it was added before.

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


The sorting feature should look as follows:



  
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


