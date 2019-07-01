<h1>Cart Objects</h1>

<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
		<li><a href="#cart_cart">Cart</a></li>
    <li><a href="#cart_cart-items">Cart Items</a></li>
    <li><a href="#cart_strikeout">Strikeout Pricing Example</a></li>
    <li><a href="#cart_cart-status">Cart Status Message</a></li>
    <li><a href="#cart_suggested">Suggested Products</a></li>
	</ul>
</div>

<a href='#cart_cart' aria-hidden='true' class='block-anchor'  id='cart_cart'></a>

## Cart

<b>Description:</b> The cart-specific properties for the current session

**Handlebars Expression:** `{{cart}}`

<b>Object Properties:</b>

<table>
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>quantity</td>
    <td>Total number of items in the cart</td>
  </tr>
  <tr>
    <td class="">additional_checkout_buttons</td>
    <td class="">Generates checkout buttons for third-party payments (PayPal, Google Checkout, etc.)</td>
  </tr>
  <tr>
    <td>show_primary_checkout_button</td>
    <td>Boolean that determines whether to show a checkout button</td>
  </tr>
  <tr>
    <td>show_multiple_address_shipping</td>
    <td>Boolean: If >1 physical items are in the cart, and checkout button is displayed: whether to also display the "Ship to multiple addresses"/"Multiple Shipping Addresses” user option</td>
  </tr>
  
  <tr>
    <td class="">discount</td>
    <td class="">Discount being applied to the cart in the current session</td>
  </tr>
  <tr>
    <td>gift_wrapping_cost</td>
    <td>Price object that defines the cost associated with adding gift wrapping to the items in the cart</td>
  </tr>
  <tr>
    <td>sub_total</td>
		<td>Price object</a> that defines the total cost of all the items in the cart. Might or might not include tax, based on the tax display settings the merchant has configured. Excludes shipping, discounts, and gift wrapping.</td>
  </tr>
  <tr>
    <td>grand_total</td>
    <td>Price object that defines the total cost of all the items in the cart. Incorporates estimated shipping, discounts, taxes, and gift wrapping.</td>
  </tr>
  <tr>
    <td class="">shipping_handling</td>
    <td class="">Current configuration of the shipping estimator for this session’s current cart; will be null/undefined if the cart contains no physical products</td>
  </tr>
  <tr>
    <td class=""><span class="indent1">handling_cost</span></td>
    <td class="">Price object that defines the handling cost for the carted items (if any)</td>
  </tr>
  <tr>
    <td class=""><span class="indent1">show_estimator</span></td>
    <td class="">Boolean indicating whether the merchant wants to show the shipping estimator to customers</td>
  </tr>
  <tr>
    <td class=""><span class="indent2"> countries</span></td>
    <td class="">Countries available to ship to</td>
  </tr>
  <tr>
    <td class=""><span class="indent2"> states</span></td>
    <td class="">List of states/provinces/regions for the country</td>
  </tr>
  <tr>
    <td class=""><span class="indent2"> selected_state</span></td>
    <td class="">The state/province/region that the customer selected for the shipping estimate</td>
  </tr>

  <tr>
    <td class=""><span class="indent2"> selected_zip</span></td>
    <td class="">The ZIP/postal code that the customer selected for the shipping estimate</td>
  </tr>
  
  <tr>
    <td class=""><span class="indent2"> selected_city</span></td>
    <td class="">The city/town that the customer selected for the shipping estimate</td>
  </tr>
  
  <tr>
    <td class=""><span class="indent2"> shipping_cost</span></td>
    <td class=""><a href="/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/price">Price object</a> that defines shipping cost</td>
  </tr>
  <tr>
    <td class=""><span class="indent2"> provider</span></td>
    <td class="">Shipping provider associated with this shipping estimate</td>
  </tr>
  <tr>
    <td class="">coupons</td>
    <td class="">List of coupons applied to the cart; default sorting is by coupon <span class="inline-code">id</span>, from lowest to highest</td>
  </tr>
  <tr>
    <td class=""><span class="indent1"> id</span></td>
    <td class="">Unique ID of the coupon</td>
  </tr>
  <tr>
    <td class=""><span class="indent1"> code</span></td>
    <td class="">Code associated with the coupon</td>
  </tr>
  <tr>
    <td class=""><span class="indent1"> discount</span></td>
    <td class="">Discount associated with the coupon</td>
  </tr>
  <tr>
    <td class=""><span class="indent1"> type</span></td>
    <td class="">Coupon type</td>
  </tr>
  <tr>
    <td class="">gift_certificates</td>
    <td class="">List of gift certificates applied to the cart</td>
  </tr>
  <tr>
    <td class=""><span class="indent1"> id</span></td>
    <td class="">Unique system ID for the gift certificate</td>
  </tr>
  <tr>
    <td class=""><span class="indent1"> code</span></td>
    <td class="">Customer code used to identify the gift certificate</td>
  </tr>
  <tr>
    <td class=""><span class="indent1"> remaining</span></td>
    <td class=""><a href="/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/price">Price object</a> that defines the amount remaining on the gift certificate</td>
  </tr>
  <tr>
    <td class=""><span class="indent1"> used</span></td>
    <td class=""><a href="/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/price">Price object</a> that defines the amount already used on the gift certificate</td>
  </tr>
  <tr>
    <td class=""><span class="indent1"> remove_url</span></td>
    <td class="">URL to remove gift certificate from the cart</td>
  </tr>
  <tr>
    <td class="">taxes</td>
    <td class="">List of all applicable taxes for the cart</td>
  </tr>
  <tr>
    <td class=""><span class="indent1"> name</span></td>
    <td class="">Name of the applied tax</td>
  </tr>
  <tr>
    <td class=""><span class="indent1"> cost</span></td>
    <td class=""><a href="/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/price">Price object</a> that defines the cost of the applied tax</td>
  </tr>
  <tr>
    <td class=""><span class="indent1"> included</span></td>
    <td class="">Boolean that indicates whether taxes are included in the total price for the cart’s contents</td>
  </tr>
</table>

<a href='#cart_cart-items' aria-hidden='true' class='block-anchor'  id='cart_cart-items'></a>

## Cart Items

<b>Description:</b> A list of items added to the cart in the current session

<b>Handlebars Expression:</b> `{{cart.items}}`

<b>Object Properties:</b>

<table>
  <tr>
    <td>Property</td>
    <td>Description</td>
  </tr>
  <tr>
    <td class="">id</td>
    <td class="">Unique system ID for the item in the cart</td>
  </tr>
  <tr>
    <td class="">quantity</td>
    <td class="">Quantity of the item being ordered</td>
  </tr>
  <tr>
    <td class="">type</td>
    <td class="">String indicating the type of purchase: either "Item" or "GiftCertificate"</td>
  </tr>
  <tr>
    <td class="">can_modify</td>
    <td class="">Boolean indicating whether the customer may modify the quantity of, or remove, this cart item</td>
  </tr>
  <tr>
    <td class="">remove_url</td>
    <td class="">URL to remove this item from the cart</td>
  </tr>
  
  <tr>
    <td class="">sku</td>
    <td class="">SKU for this cart item</td>
  </tr>
  
  <tr>
    <td class="">If type == Item</td>
    <td class="">If the item in the cart is a purchasable product, these properties are available:</td>
  </tr>
  <tr>
    <td class=""><span class="indent1">product_id</span></td>
    <td class="">Product ID for the cart item</td>
  </tr>
  <tr>
    <td class=""><span class="indent1">name</span></td>
    <td class="">Product name of the cart item</td>
  </tr>
  <tr>
    <td class=""><span class="indent1">url</span></td>
    <td class="">Link to the product page for the cart item</td>
  </tr>
  <tr>
    <td class=""><span class="indent1">availability</span></td>
    <td class="">An optional availability message set by the merchant</td>
  </tr>
  <tr>
    <td class=""><span class="indent1">image</span></td>
    <td class="">Product image for the cart item</td>
  </tr>
  <tr>
    <td class=""><span class="indent1">event_date</span></td>
    <td class="">Chosen event date for event-based products</td>
  </tr>
  <tr>
    <td class=""><span class="indent1">show_wrapping_options</span></td>
    <td class="">Boolean indicating whether the wrapping options are shown</td>
  </tr>
  <tr>
    <td class=""><span class="indent1">rrp</span></td>
    <td class=""><a href="/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/price">Price object</a> that defines the cart item's list price (MSRP); can be used to display struck-out list prices, as explained <a href="#strikeout">here</a></td>
  </tr>
  <tr>
    <td class=""><span class="indent1">price</span></td>
    <td class=""><a href="/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/price">Price object</a> that defines the unit price of the cart item, after discounts; to see how this and the next three price properties relate to each other, please see <a href="/docs/cart-price-properties">Cart Price Properties</a></td>
  </tr>
  <tr>
    <td class=""><span class="indent1">price_discounted</span></td>
    <td class=""><a href="/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/price">Price object</a> that defines the unit price, after all cart discounts and promotions</td>
  </tr>
  <tr>
    <td class=""><span class="indent1">total</span></td>
    <td class=""><a href="/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/price">Price object</a> that defines the total price (price * quantity) of the cart item</td>
  </tr>
  <tr>
    <td class=""><span class="indent1">total_discounted</span></td>
    <td class=""><a href="/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/price">Price object</a> that defines the total price (price * quantity), after all cart discounts and promotions</td>
  </tr>
  <tr>
    <td class=""><span class="indent1">brand</span></td>
    <td class="">Brand properties</td>
  </tr>
  <tr>
    <td class=""><span class="indent2"> name</span></td>
    <td class="">The product’s brand name</td>
  </tr>
  <tr>
    <td class=""><span class="indent1">release_date</span></td>
    <td class="">If a pre-order product was added to the cart,  displays a message about when the item is expected to ship to the customer</td>
  </tr>
  <tr>
    <td class="">gift_wrapping</td>
    <td class="">Gift-wrapping options</td>
  </tr>
  <tr>
    <td class=""><span class="indent1"> name</span></td>
    <td class="">Name of the gift-wrapping option</td>
  </tr>
  <tr>
    <td class=""><span class="indent1"> price</span></td>
    <td class=""><a href="/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/price">Price object</a> that defines the price of the gift-wrapping option</td>
  </tr>
  <tr>
    <td class=""><span class="indent1"> message</span></td>
    <td class="">Customer-defined message for the gift wrapping </td>
  </tr>
  <tr>
    <td class=""><span class="indent1"> remove_url</span></td>
    <td class="">URL to remove the gift-wrapping option</td>
  </tr>
  <tr>
    <td class="">options</td>
    <td class="">Options chosen when product was added to cart</td>
  </tr>
  <tr>
    <td class=""><span class="indent1"> name</span></td>
    <td class="">Name of the option</td>
  </tr>
  <tr>
    <td><span class="indent1"> value</span></td>
    <td class="">Value of the option</td>
  </tr>
  
  <tr>
		<td>bulk_pricing</td>
    <td>Properties for applying bulk-pricing discounts to cart items</td>
  </tr>

  <tr>
    <td class=""><span class="indent1"> base_price </span></td>
    <td class="">The lowest calculated price on an item. For example, 2 items are $99, 3 items are $98 and 4 items are $97. There are 3 items in the cart, the base price will be $98. </td>
  </tr>

  <tr>
    <td class=""><span class="indent1"> discount_amount </span></td>
    <td class="">Bulk-discount amount per item, if applicable; otherwise, null</td>
  </tr>  

  <tr>
    <td class=""><span class="indent1"> discount_percentage </span></td>
    <td class="">Bulk-discount percentage per item, if applicable; otherwise, null</td>
  </tr>  
   
  <tr>
    <td class="">configurable_fields</td>
    <td class="">Custom product fields set when product was added to cart</td>
  </tr>
  <tr>
    <td class=""><span class="indent1"> name</span></td>
    <td class="">Name of the custom option</td>
  </tr>
  <tr>
    <td class=""><span class="indent1"> value</span></td>
    <td class="">Value of the custom option</td>
  </tr>
  <tr>
    <td class="">If type == GiftCertificate</td>
    <td class="">If the item in the cart is a gift certificate, these properties are available:</td>
  </tr>
  <tr>
    <td class=""><span class="indent1"> name</span></td>
    <td class="">Sender’s name </td>
  </tr>
  <tr>
    <td class=""><span class="indent1"> edit_url</span></td>
    <td class="">URL to edit the gift certificate</td>
  </tr>
  <tr>
    <td class=""><span class="indent1"> recipient</span></td>
    <td class="">Recipient’s name</td>
  </tr>
  <tr>
    <td class=""><span class="indent1"> price</span></td>
    <td class=""><a href="/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/price">Price object</a> that defines the gift certificate’s basic price</td>
  </tr>
  <tr>
    <td class=""><span class="indent1"> total</span></td>
    <td class=""><a href="/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/price">Price object</a> that defines the gift certificate’s total cost, with applicable taxes included</td>
  </tr>
</table>

<a href='#cart_strikeout' aria-hidden='true' class='block-anchor'  id='cart_strikeout'></a>

## Strikeout Pricing Example

As a theme developer, you can use the `{{cart.items.rrp}}` property to display strike-out pricing in the Cart context. Here is the general approach:

In your `<theme-name>/templates/components/cart/content.html` file, as you iterate over the list of items in the cart, you would check each item's `type`. (No `rrp` property is available where the `type` is `GiftCertificate`.)

If the type is `Item`, then you would check the {{cart.items.rrp}} value. If the value is _not_ `null`, then you would know that you can display a strike-out price for the item. Below is a sample code skeleton:

```
{{#each cart.items}}
   ...
  {{#if type '==' 'GiftCertificate'}}
      {{#if rrp}}
          ... /* your code to display strike-thru pricing */
      {{else}}
          ... /* your code to display normal pricing */
      {{/if}}
  {{/if}}
 ```

For further details about catalog price properties, please see [Catalog Price Object: How Properties Interact](/stencil-docs/conditional-logic-examples/catalog-price-object). For usage examples of the `{{cart.items}}` `price` and `total` properties, please see [Cart Price Properties](/stencil-docs/conditional-logic-examples/cart-price-relationships).

<a href='#cart_cart-status' aria-hidden='true' class='block-anchor'  id='cart_cart-status'></a>

## Cart Status Message

<b>Description:</b> A list of relevant messages for the cart in the current session

<b>Handlebars Expression:</b> `{{cart.status_messages}}`

<b>Object Properties:</b>

<table>
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>message</td>
    <td>System-generated messages for the cart</td>
  </tr>
  <tr>
    <td>type</td>
    <td>Type of message: error, info, or success</td>
  </tr>
</table>

<a href='#cart_suggested' aria-hidden='true' class='block-anchor'  id='cart_suggested'></a>

## Suggested Products

<b>Description:</b> A list of suggested products, based on cart contents; displays only if enabled by the `cart.suggestions` front-matter attribute, and only immediately after a product is added to the cart

<b>Handlebars Expression:</b> `{{cart.suggested_products}}`

<b>Object Properties:</b> References standard product card model.

