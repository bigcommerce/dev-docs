# PayPal Smart Buttons

<div class="otp" id="no-index">

### On this page
- [Enable Smart Buttons on Your Stencil Theme](#enable-smart-buttons-on-your-stencil-theme)
- [Enabling Smart Buttons Customization via Page Builder](#enabling-smart-buttons-customization-via-page-builder)
- [Resources](#resources)

</div> 

PayPal Smart Buttons are available on Cornerstone versions 2.6.0+ for merchants who have **PayPal powered by Braintree** or **PayPal Express Checkout** enabled on their store.

Theme developers can enable Smart Buttons on a custom Stencil theme by adding the required settings to the <span class="fn">config.json</span> file.

Merchants will have the ability to customize some style aspects of the PayPal payment buttons at checkout using Page Builder for stores that have PayPal powered by Braintree or PayPal Express Checkout enabled. To make PayPal Smart Buttons customizable with Page Builder, a theme developer will need to make its customization properties available by adding its schema to the <span class="fn">schema.json</span> file.

## Enable Smart Buttons on Your Stencil Theme

Smart Buttons are included on Cornerstone versions 2.6.0+. If your theme does not already include Smart Buttons, append the `paymentbuttons` settings to the _Settings_ object within your <span class="fn">config.json</span> file. See the code sample below.

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">addition of `payment buttons` to "settings" object</div>
    </div><div class="HubBlock-header-subtitle">config.json</div>
</div>

<!--
title: "addition of `payment buttons` to "settings" object"
subtitle: "config.json"
lineNumbers: true
-->

```json
 "settings": {
    "..."
    "color_badge_product_sale_badges": "#007dc6",
    "color_text_product_sale_badges": "#ffffff",
    "color_hover_product_sale_badges": "#000000",
    "restrict_to_login": false,
    "swatch_option_size": "22x22",
    "social_icon_placement_top": false,
    "social_icon_placement_bottom": "bottom_none",
    "geotrust_ssl_common_name": "",
    "geotrust_ssl_seal_size": "M",
    "navigation_design": "simple",
    "price_ranges": true,
    "pdp-price-label": "",
    "pdp-sale-price-label": "Now:",
    "pdp-non-sale-price-label": "Was:",
    "pdp-retail-price-label": "MSRP:",
    "paymentbuttons-paypal-layout": "horizontal",
    "paymentbuttons-paypal-color": "gold",
    "paymentbuttons-paypal-shape": "pill",
    "paymentbuttons-paypal-size": "small",
    "paymentbuttons-paypal-label": "checkout",
    "paymentbuttons-paypal-tagline": true,
    "paymentbuttons-paypal-fundingicons": false
  },
```

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">

<!-- theme: warning -->

### Page Builder Customization
> Adding the above keys to the <span class="fn">config.json</span> file will enable Smart Buttons on a Stencil theme, however, the merchant will **not** be able to customize button styles with Page Builder unless setting configurations are added to the <span class="fn">schema.json</span> file.

</div>
</div>
</div>

<a id="page-builder"></a>

## Enabling Smart Buttons Customization via Page Builder

Merchants who enable PayPal powered by Braintree and PayPal Express Checkout can also customize PayPal Smart Buttons via Page Builder. As a theme developer, you can enable PayPal Smart Buttons customization via [Page Builder](/stencil-docs/stencil-theme-editor/schema-json-metadata), by appending the following object to the <span class="fn">schema.json</span> file:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">Addition to schema.json file in order to enable Page Builder customization</div>
    </div><div class="HubBlock-header-subtitle">schema.json</div>
</div>

<!--
title: "Addition to schema.json file in order to enable Page Builder customization"
subtitle: "schema.json"
lineNumbers: true
-->

```json
{
      "name": "Payment Buttons",
      "enable": "smartButtons",
      "settings": [
          {
            "type": "checkbox",
            "label": "Show Paypal tagline",
            "force_reload": true,
            "id": "paymentbuttons-paypal-tagline"
          },
          {
            "type": "checkbox",
            "label": "Show funding icons",
            "force_reload": true,
            "id": "paymentbuttons-paypal-fundingicons"
          },
          {
              "type": "select",
              "label": "Button color",
              "id": "paymentbuttons-paypal-color",
              "force_reload": true,
              "options": [
                {
                  "value": "gold",
                  "label": "Gold"
                },
                {
                  "value": "blue",
                  "label": "Blue"
                },
                {
                  "value": "silver",
                  "label": "Silver"
                },
                {
                  "value": "black",
                  "label": "Black"
                }
              ]
          },
          {
              "type": "select",
              "label": "Button shape",
              "id": "paymentbuttons-paypal-shape",
              "force_reload": true,
              "options": [
                {
                  "value": "pill",
                  "label": "Pill"
                },
                {
                  "value": "rect",
                  "label": "Rectangle"
                }
              ]
          },
          {
              "type": "select",
              "label": "Button size",
              "id": "paymentbuttons-paypal-size",
              "force_reload": true,
              "options": [
                {
                  "value": "small",
                  "label": "Small"
                },
                {
                  "value": "medium",
                  "label": "Medium"
                },
                {
                  "value": "large",
                  "label": "Large"
                },
                {
                  "value": "responsive",
                  "label": "Responsive"
                }
              ]
          },
          {
              "type": "select",
              "label": "Button content",
              "id": "paymentbuttons-paypal-label",
              "force_reload": true,
              "options": [
                {
                  "value": "checkout",
                  "label": "Paypal Checkout"
                },
                {
                  "value": "pay",
                  "label": "Pay with Paypal"
                },
                {
                  "value": "buynow",
                  "label": "Buy Now"
                },
                {
                  "value": "paypal",
                  "label": "Paypal"
                }
              ]
          },
          {
            "type": "select",
            "label": "Display style",
            "id": "paymentbuttons-paypal-layout",
            "force_reload": true,
            "options": [
              {
                "value": "horizontal",
                "label": "Show buttons horizontally"
              },
              {
                "value": "vertical",
                "label": "Show buttons vertically"
              }
            ]
```

<div class="HubBlock--callout">
<div class="CalloutBlock--error">
<div class="HubBlock-content">

<!-- theme: error -->

### Mutually Exclusive Options
> Some customization options are mutually exclusive, meaning when used in combination with other customization options, the smart button will completely fail to render on the page.

All mutually exclusive options are tied to the layout setting `vertical.` If your layout setting is `vertical,` take note of the following customization **restrictions**:

* If you have a layout setting of `vertical`, you **can not** have a button size of `small`.
* If you have a layout setting of `vertical`, you **can not** customize the `branding` of the button.
* If you have a layout setting of `vertical`, you **can not** customize the `tagline` of the button.
* If you have a layout setting of `vertical`, you **can not** customize the `funding icons` settings.

</div>
</div>
</div>

## Resources

### Related Articles

* [PayPal Checkout Customization](https://developer.paypal.com/demo/checkout/#/pattern/checkout) (PayPal)
