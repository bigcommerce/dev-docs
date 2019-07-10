# Components

*Below are the various components (and their markup) used in devdocs articles.*


## Callouts
* info (blue)
* warning (orange)
* success (green)
* error (red)

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">
    
<!-- theme: {{callout_type}} -->

### Pro-Tip:
> Copy and paste the components into your favorite text expander (like PhraseExpress or PhraseExpander), or add to your favorite code editor's snippets.

</div>
</div>
</div>

## Callout Blocks

**Markup:**

```html
<div class="HubBlock--callout">
<div class="CalloutBlock--{{callout_type}}">
<div class="HubBlock-content">
    
<!-- theme: {{callout_type}} -->

### {{title}}
> There is no way to re-display this pop-up after selecting Done, so be sure to securely store the credentials before leaving this screen.

</div>
</div>
</div>
```

**Example:**

```html
<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">
    
<!-- theme: {{callout_type}} -->

### Pro-Tip:
> Copy and paste the components into your favorite text expander (like PhraseExpress or PhraseExpander), or add to your favorite code editor's snippets.

</div>
</div>
</div>
```

**Result:**

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">
    
<!-- theme: {{callout_type}} -->

### Pro-Tip:
> Copy and paste the components into your favorite text expander (like PhraseExpress or PhraseExpander), or add to your favorite code editor's snippets.

</div>
</div>
</div>

---

## Code Blocks

**Markup:**

```markdown
<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">{{title}}</div>
    </div><div class="HubBlock-header-subtitle">{{subtitle}}</div>
</div>

<!--
title: "{{title}}"
subtitle: "{{subtitle}}"
lineNumbers: true
-->

```{{code_lang}}
{code}}{{new-line}}```
```

**Example:**

```html
<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">Some JSON</div>
    </div><div class="HubBlock-header-subtitle">An Example</div>
</div>

<!--
title: "Some JSON"
subtitle: "An Example"
lineNumbers: true
-->

\```json
{
    "fruits": [
        "apples",
        "oranges",
        "bananas"
    ]
}
\```
```

**Result:**

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">Some JSON</div>
    </div><div class="HubBlock-header-subtitle">An Example</div>
</div>

<!--
title: "Some JSON"
subtitle: "An Example"
lineNumbers: true
-->

```json
{
    "fruits": [
        "apples",
        "oranges",
        "bananas"
    ]
}
```

---

## Images

**Markdown:**

```markdown
<!--
    title: {{title}}
    data: {{src}}
-->

#### {{title}}
![{{title}}]({{src}} "{{title}}")
```

**Example:**

```html
<!--
    title: {{title}}
    data: {{src}}
-->

#### Dev Tools
![Dev Tools](/assets/img/devtools.png "Dev Tools")
```

**Result:**

<!--
    title: {{title}}
    data: {{src}}
-->

#### Dev Tools
![Dev Tools](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/img/devtools.png "Dev Tools")

---

## Schema Blocks

**Markup:**
```html
<a href="{{path}}" class="devdocs-schema-box">Name of Reference</a>
```

**Example:**
```html
<a href="/api-reference/store-management/store-information-api/models/storeinformation" class="devdocs-schema-box">Store Information Object Reference</a>
```

**Result:**

<a href="/api-reference/store-management/store-information-api/models/storeinformation" class="devdocs-schema-box">Store Information Object Reference</a>

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

<!-- theme: {{callout_type}} -->

> `{{path}}` - the relative path to the Dev Center page that contains the reference HTML.  

</div>
</div>
</div>

## Menu

**Example**

# Webhooks
<div class="otp" id="no-index">

### On this Page
	
* [Webhook Endpoints](#webhook-events_endpoints)
* [Webhook Response Struture](#webhook-events_response-structure)

</div>

Page anchors. There must a space between the a tag and the menu title otherwise it will not work.

```markdown
<a id="webhook-events_endpoints"></a>

## Webhook Endpoints
```

```markdown
<a id="webhook-events_response-structure"></a>

## Webhook Response Struture
```
---

## Try in Postman Buttons

* See [Creating a Run in Postman Button](https://learning.getpostman.com/docs/postman_for_publishers/run_button/creating_run_button/) for instructions on creating the button and generating the markdown.
Example formatted collection. Use as a baseline:
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/3f005ed74030e01bbf7a)


---
## Page Template

# Page Title
<div class="otp" id="no-index">

### On this Page
	
* [Section One](#section-one)
* [Section Two](#section-two)
* [Section Three](#section-three)

</div>

---
This is the introduction paragraph.
Cupcake pie pudding wafer liquorice chocolate cake sweet topping gingerbread. Topping pudding muffin brownie. Sugar plum dessert tart fruitcake macaroon. Marzipan soufflé cotton candy ice cream jelly-o.

Biscuit croissant wafer icing. Wafer liquorice sweet roll pie chocolate cake fruitcake. Chocolate cake marzipan oat cake carrot cake fruitcake gummi bears. Brownie danish jelly soufflé sesame snaps sweet roll danish tart carrot cake.

---

<a id="section-one"></a>

## Section Two

Cupcake pie pudding wafer liquorice chocolate cake sweet topping gingerbread. Topping pudding muffin brownie. Sugar plum dessert tart fruitcake macaroon. Marzipan soufflé cotton candy ice cream jelly-o.

Biscuit croissant wafer icing. Wafer liquorice sweet roll pie chocolate cake fruitcake. Chocolate cake marzipan oat cake carrot cake fruitcake gummi bears. Brownie danish jelly soufflé sesame snaps sweet roll danish tart carrot cake.

```json
	{
		"variant_id": 3121,
		"price": 10.0,
		"sale_price": 8.0,
		"retail_price": 12.0,
		"map_price": 6.0,
		"currency": "EUR"
	}
```

---

## Section Three

Caramels powder cake apple pie dragée. Candy canes sweet roll cookie pastry danish. Muffin bear claw fruitcake liquorice topping chocolate cake cotton candy chocolate.

Bonbon donut brownie macaroon cotton candy dragée danish. Biscuit sweet lemon drops chocolate bar powder chocolate apple pie donut chupa chups. Danish bonbon jelly-o jelly chocolate jelly beans sesame snaps.

<div class="HubBlock--callout">
<div class="CalloutBlock--error">
<div class="HubBlock-content">
    
<!-- theme: error -->

### Error:
> This is a error. 
> This error spans several lines. But in the same block.

</div>
</div>
</div>

Jelly cookie jelly-o. Carrot cake jelly beans gingerbread donut muffin dragée icing. Dessert jelly-o candy canes croissant cupcake. Icing candy canes pie macaroon.

---

<a id="section-three"></a>

## Section Three

|Endpoint|Operations| Reference
|---|---|---|
| `/v2/hooks/` | `GET` - Get all webhooks on a store | [Get All Webhooks](https://developer.bigcommerce.com/api-reference/webhooks/webhooks/getallwebhooks) |
| `/v2/hooks/` | `POST` Create a webhook| [Create a Webhook](https://developer.bigcommerce.com/api-reference/webhooks/webhooks/createwebhooks) |
| `/v2/hooks/{id}` | `GET` Get a webhook by `{id}` | [Get a Webhook](https://developer.bigcommerce.com/api-reference/webhooks/webhooks/getwebhook) |
| `/v2/hooks/{id}` | `PUT` Update a webhook by `{id}` | [Update a Webhook](https://developer.bigcommerce.com/api-reference/webhooks/webhooks/updateawebhook) |
| `/v2/hooks/{id}` | `DELETE` - Delete a webhook by `{id}` | [Delete a Webhook ](https://developer.bigcommerce.com/api-reference/webhooks/webhooks/deleteawebhook)|

**Try it Now**
*Create a refund*
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/3f005ed74030e01bbf7a)

**Request**

[Refund Quote Request Model](https://bigcommerce-order-refunds-api-beta.docs.stoplight.io/order-refunds-api/models/postrefundquoterequest)

`POST /orders/{id}/refund_quotes`

```json
{
  "items": [
    {
      "item_type": "PRODUCT",
      "item_id": 8,
      "quantity": 1,
      "reason": "Testing the Refund API!"
    },
    {
      "item_type": "SHIPPING",
      "item_id": 9,
      "amount": 10,
      "reason": "Testing the Refund API!"
    }
  ]
}
```

**Response**

[Refund Quote Response Model](https://bigcommerce-order-refunds-api-beta.docs.stoplight.io/order-refunds-api/models/postrefundquoteresponse)

```json
{
  "data": {
    "total_refund_amount": 20.83,
    "total_refund_tax_amount": 0.83,
    "rounding": 0,
    "adjustment": 0,
    "is_tax_included": false,
    "order_level_refund_amount": 0,
    "refund_methods": [
      [
        {
          "provider_id": "storecredit",
          "provider_description": "Store Credit",
          "amount": 20.83,
          "is_offline": false,
          "is_offline_provider": false,
          "offline_reason": ""
        }
      ],
      [
        {
          "provider_id": "testgateway",
          "provider_description": "Test Payment Gateway",
          "amount": 20.83,
          "is_offline": false,
          "is_offline_provider": false,
          "offline_reason": ""
        }
      ]
    ]
  },
  "meta": {}
}
```

---

## Resources


