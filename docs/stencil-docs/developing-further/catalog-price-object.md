# Catalog Price Object Examples

<div class="otp" id="no-index">

### On this page
- [Catalog price object examples excluding tax](#catalog-price-object-examples-excluding-tax)
- [Catalog price object examples including and excluding tax](#catalog-price-object-examples-including-and-excluding-tax)
- [Control panel quick reference](#control-panel-quick-reference)
- [Resources](#resources)

</div> 

As a theme developer, you can use the catalog price object to highlight the savings that a merchant is offering over the MSRP directly on the storefront by referencing the product's `price` object and the correct property for the product.

Merchants can use control panel options to set the following prices for a catalog product:

| Field | Description |
| ----------- | ----------- |
| Default Price | This is the product’s standard store price. The **Excluding/Including Tax** indicator to the right of the **Default Price** field is applicable to all price fields (**Cost**, **MSRP**, **Sale Price**).|
| Cost | The product's `cost` property is never returned to the storefront by design. Generally, merchants would not want to reveal the true cost of goods to shoppers. The **Cost** field is meant for reports and third-party accounting integrations.|
| MSRP | This field contains the manufacturer's suggested retail price, a price recommended for the sale of an item in all retail outlets. |
| Sale Price | This field is the product's reduced store price. |


These options and assigned values are each represented in the catalog price object, allowing theme developers to pull the information and render it onto the storefront to highlight the savings offered by a merchant.

## Catalog price object examples excluding tax

### No sale price defined in control panel

Assume that a merchant has defined the following for a product in the control panel:

* **Default Price**
* **Cost**
* **MSRP**

A corresponding catalog price object for the product will be structured as shown below:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">Catalog price object (no sale price defined)</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "Catalog price object (no sale price defined)"
subtitle: ""
lineNumbers: true
-->

```json
"product": {
    // ...
  },
  "price": {
    "without_tax": {
      "formatted": "$20.00",
      "value": 20
    },
    "tax_label": "Sales Tax",
    "rrp_without_tax": {
      "formatted": "$25.00",
      "value": 25
    },
    "saved": {
      "formatted": "$5.00",
      "value": 5
    },
    "retail_price_range": {
      "min": {
        "without_tax": {
          "formatted": "$25.00",
          "value": 25
        }
      },
      "max": {
        "without_tax": {
          "formatted": "$25.00",
          "value": 25
        }
      }
    }
  }
```

In this example:

| Property | Description |
| ----------- | ----------- |
| `without_tax` | This property maps to the control panel’s **Default Price** field.|
| `rrp_without_tax` | `rrp` stands for "regular retail price." This property maps to the control panel's **MSRP** field.|
| `saved` | This value is the difference between the existing values for `without_tax` (**Default Price**) and `rrp_without_tax` (**MSRP**).|

### Sale price defined in control panel

Assume that a merchant has defined the following for a product in the control panel:

* **Default Price**
* **Cost**
* **MSRP**
* **Sale Price**

A corresponding catalog price object for the product will be structured as shown below:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">Catalog price object (sale price defined)</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "Catalog price object (sale price defined)"
subtitle: ""
lineNumbers: true
-->

```json
"product": {
  // ...
  "price": {
    "without_tax": {
      "formatted": "$15.00",
      "value": 15
    },
    "tax_label": "Sales Tax",
    "sale_price_without_tax": {
      "formatted": "$15.00",
      "value": 15
    },
    "non_sale_price_without_tax": {
      "formatted": "$20.00",
      "value": 20
    },
    "rrp_without_tax": {
      "formatted": "$25.00",
      "value": 25
    },
    "saved": {
      "formatted": "$10.00",
      "value": 10
    },
    "retail_price_range": {
      "min": {
        "without_tax": {
          "formatted": "$25.00",
          "value": 25
        }
      },
      "max": {
        "without_tax": {
          "formatted": "$25.00",
          "value": 25
        }
      }
    }
  }
```

In this example:

| Property  | Description |
| ----------- | ----------- |
| `sale_price_without_tax` | This property maps to the product’s effective price in the control panel's **Sale Price** field. The `sale_price_without_tax` property will directly expose the sale price set on a base product, variant, or price record.|
| `non_sale_price_without_tax` | This property displays the regular store price.|

Properties noted will only be displayed if a sale price is set on the product.

### Prices and conditional logic example

Stencil structures product prices for backward compatibility with the BigCommerce platform's traditional treatment of prices. This behavior enables you to add logic that determines whether to display a strikeout price on the storefront.

The example below tests for the presence of the `sale_price_without_tax` property. (You could also look for the `sale_price_with_tax` property.) The presence of the `sale_price_without_tax` property means that the product has been given a sale price.

With the logic below, the page will display a strikeout standard price next to the **Sale Price** field, indicating the current selling price of the product.

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">Conditional logic </div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "Conditional logic "
subtitle: ""
lineNumbers: true
-->

```
  {{#or price.sale_price_without_tax price.sale_price_with_tax}}
     ... [code to display on-sale strikeout pricing or content for a discounted product]  ...
  {{/or}}
```

## Catalog price object examples including and excluding tax

Depending on the store’s  [**Tax Display Settings**](https://login.bigcommerce.com/deep-links/manage/settings/tax/settings), the `price` object will display prices in one of the following ways:

* **Including tax**
* **Excluding tax**
* **Including and excluding tax**

This display setting affects how values are returned in the catalog price object and how the values appear on storefront pages.

<!-- #### Configure tax display settings
![Configure tax display settings
](https://storage.cloud.google.com/bigcommerce-production-dev-center/images/tax-settings.png " Configure tax display settings
") -->

 ![Configure tax display settings](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/catalog-price-object-examples.png "Configure tax display settings.")

### No sale price defined in control panel

Assume that a merchant has defined the following tax configurations for a product in the control panel:

* Show prices on product pages including and excluding tax
* Use a flat rate of 10% tax

There is no defined sale price for the product.

A corresponding catalog price object will be structured as shown below:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">Product including and excluding tax (no sale price defined)</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "Product including and excluding tax (no sale price defined)"
subtitle: ""
lineNumbers: true
-->

```json
"product": {
  "price": {
    "with_tax": {
      "formatted": "$165.00",
      "value": 165
    },
    "without_tax": {
      "formatted": "$150.00",
      "value": 150
    },
    "rrp_with_tax": {
      "formatted": "$275.00",
      "value": 275
    },
    "rrp_without_tax": {
      "formatted": "$250.00",
      "value": 250
    },
    "saved": {
      "formatted": "$110.00",
      "value": 110
      },
    "tax_label": "Tax"
  }
}
```

In this example:

| Property | Description |
| ----------- | ----------- |
| `with_tax` | This property represents the `without_tax` value plus a 10% tax markup.|
| `rrp_with_tax` | This property represents the `rrp_without_tax` value plus a 10% tax markup.|

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">

<!-- theme: warning -->

### Tax display configurations
> The same properties and values are returned for **Including tax** and **Including and excluding tax** display settings. These properties and values are not available for a control panel setting of **Excluding tax**.

</div>
</div>
</div>

### Sale price defined in control panel

Assume that a merchant has defined the following tax configurations for a product in the control panel, alongside a defined sale price:

* Show prices on product pages including and excluding tax
* Use a flat rate of 10% tax

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">Product including and excluding tax (sale price defined)</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "Product Including and Excluding Tax (Sale Price defined)"
subtitle: ""
lineNumbers: true
-->

```json
"product": {
  "price": {
    "with_tax": {
      "formatted": "$135.30",
      "value": 135.3
    },
    "without_tax": {
      "formatted": "$123.00",
      "value": 123
    },
    "sale_price_without_tax": {
      "formatted": "123.00",
      "value": 123
    },
    "sale_price_with_tax": {
      "formatted": "135.30",
      "value": 135.3
    },
    "rrp_with_tax": {
      "formatted": "$275.00",
      "value": 275
    },
    "rrp_without_tax": {
      "formatted": "$250.00",
      "value": 250
    },
    "saved": {
      "formatted": "$139.70",
      "value": 139.7
    },
    "non_sale_price_without_tax": {
      "formatted": "$150.00",
      "value": 150
    },
    "non_sale_price_with_tax": {
      "formatted": "$165.00",
      "value": 165
    },
    "tax_label": "Tax"
  }
}
```

In this example:

| Property | Description |
| ----------- | ----------- |
| `non_sale_price_with_tax` | This property represents the standard store price with tax.|
| `non_sale_price_without_tax` | This property represents the standard store price without tax.|
| `sale_price_with_tax` and `sale_price_without_tax` | These properties represent the product's defined sale price.|
| `saved` | This value is based on the difference between the `with_tax` and `non_sale_price_with_tax` values.|

## Control panel quick reference

The table below explains the mapping between the control panel fields and the catalog price object properties and values.

| Field | Catalog Price Object Property | Description |
| ----------- | ----------- | ----------- |
| Default Price (excluding tax) |<ul><li><b>Sale Price</b> is defined:</li> <code>{{ product.price.non_sale_price_without_tax }}</code><li><b>Sale Price</b> is not defined:</li> <code>{{ product.price.without_tax }}</code></ul>| The standard store price for the product. |
 Default Price (including tax) |<ul><li><b>Sale Price</b> is defined:</li> <code>{{ product.price.non_sale_price_with_tax }}</code><li><b>Sale Price</b> is not defined:</li> <code>{{ product.price.with_tax }}</code></ul>| The standard store price for the product, with tax. |
 Cost |Cost  is not returned in the catalog price object.| This field represents true cost of goods, and is typically meant for reports and third-party accounting integrations. |
MSRP (excluding tax)|`{{ product.price.rrp_without_tax }}`| This field represents the product’s list price, or the manufacturer's suggested retail price. |
MSRP (including tax)|`{{ product.price.rrp_with_tax }}`| This field represents the product’s list price, or the manufacturer's suggested retail price, including tax. |
Sale Price (excluding tax)|`{{product.price.sale_price_without_tax}}`| This product’s discounted/sale price. |
Sale Price (including tax)|`{{ product.sale_price_with_tax }}`| This product’s discounted/sale price, with tax. |
Difference between Default Price and MSRP (*Default Price - MSRP)*|`{{ product.price.saved }}`| The customer’s savings on the effective price versus list price. |

## Resources

### Related Articles

* [Theme Objects](https://developer.bigcommerce.com/stencil-docs/reference-docs/global-objects-and-properties)
* [Adding a Product](https://support.bigcommerce.com/s/article/Adding-Products-v3#product-details) (BigCommerce Knowledge Base)