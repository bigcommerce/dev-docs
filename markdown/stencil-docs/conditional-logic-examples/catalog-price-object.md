<h1>Catalog Price Object: How Properties Interact</h1>

<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#catalog-price_excluding-tax">Examples Excluding Tax</a></li>
    <li><a href="#catalog-price_including-and-excluding">Examples Including and Excluding Tax</a></li>
    <li><a href="#catalog-price_quick-reference">Control Panel Mapping</a></li>
	</ul>
</div>

As a theme developer, you can use the *Catalog Price Object* to highlight the savings that a merchant is offering over the MSRP (Retail Price) directly on the storefront by simply referencing the product's [Catalog Price Object](/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/catalog-price) and the correct property for the product. 

Merchants can use Control Panel options to set the following prices for a catalog product:

<table>
  <tr>
    <th>Control Panel Field</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>Default Price</td>
    <td>This is the product’s standard store price. The <bb>Excluding/Including Tax</b> indicator to the right of the <b>Default Price</b> field is applicable to all price fields (Cost, MSRP, Sale Price).</td>
  </tr>
  <tr>
    <td>Cost Price</td>
    <td>The product's <b>Cost Price</b> property is never returned to the storefront by design. Generally, merchants would not want to reveal the true cost of goods to shoppers. The cost price field is meant for reports and third-party accounting integrations. </td>
  </tr>
  <tr>
    <td>MSRP (Retail Price)</td>
    <td>This field contains the Manufacturer's Standard Retail Price, also known as the list price. MSRP is the manufacturer's suggested retail price, a price recommended for the sale of an item in all retail outlets.</td>
  </tr>
  <tr>
    <td>Sale Price</td>
    <td>This field is the product's reduced store price.</td>
  </tr>
</table>

These options and assigned values are each represented in the [Catalog Price Object](/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/catalog-price), allowing theme developers to pull the information and render it onto the storefront to highlight the savings offered by a merchant.

---

<a href='##catalog-price_excluding-tax' aria-hidden='true' class='block-anchor'  id='#catalog-price_excluding-tax'><i aria-hidden='true' class='linkify icon'></i></a>

## Catalog Price Object Examples Excluding Tax

### No Sale Price Defined in Control Panel

Assume that a merchant has defined the following for a product in the Control Panel:

* **Default Price**
* **Cost Price**
* **Retail Price (MSRP)**

No **Sale Price** is defined for the product.

<!--
    title: #### Product in Control Panel (no Sale Price defined)

    data: //s3.amazonaws.com/user-content.stoplight.io/6116/1557355653770
-->

#### Product in Control Panel (no Sale Price defined)
![#### Product in Control Panel (no Sale Price defined)
](//s3.amazonaws.com/user-content.stoplight.io/6116/1557355653770 "#### Product in Control Panel (no Sale Price defined)
")

A corresponding [Catalog Price Object](/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/catalog-price) for the product will be structured as follows:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">Catalog Price Object (no Sale Price defined)</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "Catalog Price Object (no Sale Price defined)"
subtitle: ""
lineNumbers: true
-->

```
"product": {
    ...
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

Items to note about the Catalog Price Object above: 

* `without_tax`: this property maps to the control panel’s **Default Price** field.
* `rrp_without_tax`: `rrp` is an abbreviation for "regular retail price." This property maps to the control panel's **MSRP (Retail Price)** field. 
* `saved`:  this property is the difference between the existing values for `without_tax` (**Default Price**) and `rrp_without_tax` (**MSRP**).


---

### Sale Price Defined in Control Panel

Assume that a merchant has defined the following for a product in the Control Panel:

* **Default Price**
* **Cost Price**
* **Retail Price (MSRP)**
* **Sale Price**

<!--
    title: #### Product in Control Panel (Sale Price defined)

    data: //s3.amazonaws.com/user-content.stoplight.io/6116/1556748687478
-->

#### Product in Control Panel (Sale Price defined)
![#### Product in Control Panel (Sale Price defined)
](//s3.amazonaws.com/user-content.stoplight.io/6116/1556748687478 "#### Product in Control Panel (Sale Price defined)
")

A corresponding *Catalog Price Object* for the product will be structured as shown below:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">Catalog Price Object (Sale Price defined)</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "Catalog Price Object (Sale Price defined)"
subtitle: ""
lineNumbers: true
-->

```
"product": {
  ...
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

Items to note about the *Catalog Price* Object above: 

* The `sale_price_without_tax` property maps to the product’s effective price is the Control Panel's **Sale Price** field. The `sale_price_without_tax` property will directly expose the  **Sale Price** set on a base product, variant, or price record. 
* The regular store price is now displayed in an added property called `non_sale_price_without_tax`. 

Properties noted will only be displayed if a **Sale Price** is set on the product.

---

<a href='#catalog-price_prices-and-conditional' aria-hidden='true' class='block-anchor'  id='catalog-price_prices-and-conditional'><i aria-hidden='true' class='linkify icon'></i></a>

### Prices and Conditional Logic Example

Stencil structures product prices for backward compatibility with the BigCommerce platform's traditional treatment of prices. This behavior enables you to add logic that determines whether to display a strikeout price on the storefront.

The example below tests for the presence of the `sale_price_without_tax` property (you could also look for the `sale_price_with_tax` property). The presence of the `sale_price_without_tax` property means that the product has been given a **Sale Price**. 

With the logic below, the page will display the standard store price with a strikeout across it, placed next to the **Sale Price**, indicating the current selling price of the product.



<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">Conditional Logic </div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "Conditional Logic "
subtitle: ""
lineNumbers: true
-->

```
  {{#or price.sale_price_without_tax price.sale_price_with_tax}}
     ... [code to display on-sale strikeout pricing or content for an on sale product]  ...
  {{/or}}
```

---

<a href='##catalog-price_including-and-excluding' aria-hidden='true' class='block-anchor'  id='#catalog-price_including-and-excluding'><i aria-hidden='true' class='linkify icon'></i></a>

## Catalog Price Object Examples Including and Excluding Tax 

Depending on how the store has been set up in the Control Panel’s **Store Setup** › **Tax** › **Configure Tax Display Settings**, the *Catalog Price Object* properties may represent prices in the following ways:

* **Including tax**
* **Excluding tax**
* **Including and excluding tax** 

This display setting affects how values are returned in the *Catalog Price Object* and how the values appear on storefront pages.

<!--
    title: #### Configure Tax Display Settings

    data: //s3.amazonaws.com/user-content.stoplight.io/6116/1539842045139
-->

#### Configure Tax Display Settings
![#### Configure Tax Display Settings
](//s3.amazonaws.com/user-content.stoplight.io/6116/1539842045139 "#### Configure Tax Display Settings
")

---

### No Sale Price Defined in Control Panel

Assume that a merchant has defined the following for a tax configurations for a product in the Control Panel:

* Show prices on Product Pages **Including and excluding tax**
* Flat 10% tax rate configured

There is no defined a **Sale Price** for the product.

A corresponding *Catalog Price Object* for the product will be structured as shown below:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">Product Including and Excluding Tax (no Sale Price defined)</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "Product Including and Excluding Tax (no Sale Price defined)"
subtitle: ""
lineNumbers: true
-->

```
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

Items to note about the *Catalog Price Object* example above:

* `with_tax`: This property represents the `without_tax` value plus a 10% tax markup.
* `rrp_with_tax`: This property represents the `rrp_without_tax` value plus a 10% tax markup.

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">
    
<!-- theme: warning -->

### Tax Display Configurations
> You would see these same properties and values if the Control Panel setting had been **Including tax** (as opposed to **Including and excluding tax**). These properties and values would not be available for a Control Panel setting of **Excluding tax**.

</div>
</div>
</div>

---

### Sale Price Defined in Control Panel 

Assume that a merchant has defined the following for a tax configurations for a product in the Control Panel, alongside a defined **Sale Price**:

* Show prices on Product Pages **Including and excluding tax**
* Flat 10% tax rate configured

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">Product Including and Excluding Tax (Sale Price defined)</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "Product Including and Excluding Tax (Sale Price defined)"
subtitle: ""
lineNumbers: true
-->

```
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
      formatted: "135.30",
      value: 135.3
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

Items to note about the *Catalog Price Object* above:

* The `non_sale_price_without_tax` and `non_sale_price_with_tax` properties represent the standard store price with and without tax.
* The `sale_price_without_tax` and `sale_price_without_tax` represent the product's defined **Sale Price**.
* The `saved` value is based on the difference between the `with_tax` and `non_sale_price_with_tax` values.

---

<a href='#catalog-price_quick-reference' aria-hidden='true' class='block-anchor'  id='catalog-price_quick-reference'><i aria-hidden='true' class='linkify icon'></i></a>

## Control Panel Mapping

<table> 
  <tr>
    <th>Control-Panel Field</th>
    <th>Catalog Price Object Property</th>   
    <th>Description</th>
  </tr>
  <tr>
    <td>Default Price (excluding tax)</td>
    <td>
      <ul>
        <li>if <b>Sale Price</b> defined:</li> <code>{{ product.price.non_sale_price_without_tax }}</code>
        <li>if no <b>Sale Price</b> defined</li> <code>{{ product.price.without_tax }}</code>
    </td>    
    <td>The standard store price for the product.</td>
  </tr>
  <tr>   
    <td>Default Price (including tax)</td>
    <td><li>if <b>Sale Price</b> defined:</li><code>{{ product.price.non_sale_price_with_tax }}</code>
      <li>if no <b>Sale Price</b> defined</li> <code>{{ product.price.with_tax }}</code>
    </td>   
    <td>The standard store price for the product, with tax.</td>
  </tr>
  <tr>
    <td>Cost Price</td>
    <td>Cost Price is not returned in the Catalog Price Object.</td>
    <td>This field represents true cost of goods, and is typically meant for reports and third-party accounting integrations.</td>
  </tr>  
  <tr>   
    <td>MSRP (Retail Price) (excluding tax)</td>
    <td><code>{{ product.price.rrp_without_tax }}</code></td>  
    <td>Represents the product’s list price, or Manufacturer's Standard Retail Price (Retail Price).</td>
  </tr>  
  <tr>   
    <td>MSRP (Retail Price) (including tax)</td>
    <td><code>{{ product.price.rrp_with_tax }}</code></td>
    <td>Used to represent the product’s list price or Manufacturer's Standard Retail Price (MSRP), including tax.</td>
  </tr>  
  <tr>
    <td>Sale Price (excluding tax)</td>
    <td><code>{{product.price.sale_price_without_tax}}</code></td>
    <td>This product’s discounted/sale price.</td>
  </tr> 
  <tr>
    <td>Sale Price (including tax)</td>
    <td><code>{{ product.sale_price_with_tax }}</code></td>
    <td>This product’s discounted/sale price, with tax.</td>
  </tr>
  <tr>   
    <td>Difference between Default Price and MSRP (Retail Price) (<i>Default Price - MSRP (Retail Price)</i>)</td>
    <td><code>{{ product.price.saved }}</code></td>
    <td>The customer’s savings on the effective price versus list price.</td>
  </tr>  
</table>

---

## Resources

### Related Articles

* [Catalog Price Object](/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/catalog-price)
* [Adding a New Product](https://support.bigcommerce.com/s/article/Adding-Products#new-product) (BigCommerce Knowledge Base)



