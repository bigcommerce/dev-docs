<h1>Implementation Example</h1>

<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
		<li><a href="#implementation_cornerstone-example">Cornerstone Implementation Example</a></li>
	</ul>
</div>

<a href='##implementation_cornerstone-example' aria-hidden='true' class='block-anchor'  id='#implementation_cornerstone-example'><i aria-hidden='true' class='linkify icon'></i></a>

## Cornerstone Implementation Example

Here is an example based on this file within Cornerstone:
`cornerstone/templates/components/cart/shipping-estimator.html`

In the excerpt below, each highlighted `{{lang...}}` statement is a Handlebars helper. Each of the statements abstracts the message indicated by its (English-language) key name to enable internationalization of that message:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name"></div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: ""
subtitle: ""
lineNumbers: true
-->

```js
<div class="shipping-estimator" style="display: none;">
    <form class="estimator-form">
      <button class="shipping-estimate-hide">{{lang 'cancel'}}</button>
      <select name="shipping-country">
      <option>{{lang 'cart.shipping_estimator.select_a_country'}}</option>
      {{#each countries}}
          <option value="{{id}}" {{#if selected}}selected="selected"{{/if}}>
                {{name}}
          </option>
      {{/each}}
      </select>
      <select name="shipping-state">
      <option>{{lang 'cart.shipping_estimator.select_a_state'}}</option>
      {{#each states}}
          <option value="{{id}}" {{#if selected}}selected="selected"{{/if}}>
              {{name}}
          </option>
      {{/each}}
      </select>
      <input type="text" name="shipping-zip" value="{{selected_zip}}">
      <button class="shipping-estimate-submit">{{lang 'cart.shipping_estimator.estimate_shipping'}}
      </button>
    </form>
    <div class="shipping-quotes"></div>
</div>

```

In the excerpts below, you can see that the default theme’s basic `.../lang/en.json` file includes matches, and value definitions, for each of the translation keys in the Handlebars helpers above:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name"></div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: ""
subtitle: ""
lineNumbers: true
-->

```js
{
  "header": {
        "welcome_back": "Welcome back, {name}"
  },
  ...
      "label": "Cart",
        "is_empty": "Your cart is empty",
        "coupon_code": "Coupon Code",
        "gift_certificate": "Gift Certificate",
        "freeshipping": "Free Shipping",
        "shipping_peritem": "Per Item Shipping",
      "shipping_estimator": {
            "add_info": "Add Info",
          "select_a_country": "Select a Country",
          "select_a_state": "Select a State",
          "estimate_shipping": "Estimate Shipping"
      }
  },
  "common": {
        "currency_converter": "Currency Converter",
        "newsletter_signup": "Sign up for our newsletter",
        "form_submit": "Submit",
        "required": "Required",
        "email_address": "Email Address",
      "edit": "Edit",
      "no": "No",
      "yes": "Yes",
      "cancel": "Cancel",
      "share": "Share",
      "delete": "Delete",
      "public": "Public",
        "private": "Private",
        "view_all": "View All",
        "paginator": {
            "page_of": "Page {current} of {total}"
      },
      ...
```

Translation files for other languages would use the same format, to define these keys’ values in their respective languages.

