<h1>Customer Objects</h1>

<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
		<li><a href="#customer_customer">Customer</a></li>
    <li><a href="#customer_order-details">Order Details</a></li>
    <li><a href="#customer_recent-items">Recent Items</a></li>
    <li><a href="#customer_customer-wishlists">Customer Wishlists</a></li>
    <li><a href="#customer_wishlist-details">Wishlist Details</a></li>
    <li><a href="#customer_account-order-shipments">Account Order Shipments</a></li>
    <li><a href="#customer_account-orders">Account Orders</a></li>
    <li><a href="#customer_account-returns">Account Returns</a></li>
    <li><a href="#customer_account-new-returns">Account New Return</a></li>
    <li><a href="#customer_create-account">Create Account</a></li>
    <li><a href="#customer_shipping-addresses">Shipping Addresses</a></li>
    <li><a href="#customer_payment-methods">Payment Methods</a></li>
    <li><a href="#customer_edit-payment-methods">Edit Payment Methods</a></li>
    <li><a href="#customer_add-payment-methods">Add Payment Methods</a></li>
	</ul>
</div>

<a href='#customer_customer' aria-hidden='true' class='block-anchor'  id='customer_customer'><i aria-hidden='true' class='linkify icon'></i></a>

## Customer

**Description:** Customer-specific properties for a storefront customer object. When filtering/limiting, customers' default sorting is by customer id, from lowest to highest. (Called on several partials in the `<theme-name>/templates/components/` subdirectory: 
`page/contact-us-form.html`,
`common/subscription-form.html`,
`account/address-list.html`,
`account/messages-form.html`, and
`account/wishlist-list.html`.)

**Handlebars Expression:** `{{customer}}`

**Object Properties:**

<table>
  <tr>
    <td>Property</td>
    <td>Description</td>
  </tr>
  <tr>
    <td>id</td>
    <td>Customer’s ID</td>
  </tr>
  <tr>
    <td>name</td>
    <td>Customer’s name</td>
  </tr>
  <tr>
    <td>email</td>
    <td>Customer’s email address</td>
  </tr>
  <tr>
    <td>phone</td>
    <td>Customer’s phone number</td>
  </tr>

  <tr>
    <td>store_credit</td>
    <td>Customer’s store credit</td>
  </tr>

  <tr>
    <td>customer_group_id</td>
    <td>ID of this customer's group</td>
  </tr>

  <tr>
    <td>customer_group_name</td>
    <td>Name of this customer's group</td>
  </tr>

  <tr>
    <td>num_new_messages</td>
    <td>Number of unread messages for this customer</td>
  </tr>
  <tr>
    <td>num_wishlists</td>
    <td>Number of wishlists for this customer</td>
  </tr>
  <tr>
    <td>shipping_address</td>
    <td>Shipping address used for the order</td>
  </tr>
  <tr>
    <td><span class="indent1"> id</span></td>
    <td>Unique, system-generated ID</td>
  </tr>
  <tr>
    <td><span class="indent1"> first_name</span></td>
    <td>Customer’s shipping (first) name</td>
  </tr>
  <tr>
    <td><span class="indent1"> last_name</span></td>
    <td>Customer’s shipping (last) name</td>
  </tr>
  <tr>
    <td><span class="indent1"> company</span></td>
    <td>Customer's shipping company name</td>
  </tr>
  <tr>
    <td><span class="indent1"> address1</span></td>
    <td>Customer's shipping address, first line</td>
  </tr>
  <tr>
    <td><span class="indent1"> address2</span></td>
    <td>Customer's shipping address, second line</td>
  </tr>
  <tr>
    <td><span class="indent1"> city</span></td>
    <td>Customer's shipping city</td>
  </tr>
  <tr>
    <td><span class="indent1"> state</span></td>
    <td>Customer's shipping state</td>
  </tr>
  <tr>
    <td><span class="indent1"> zip</span></td>
    <td>Customer's shipping zip</td>
  </tr>
  <tr>
    <td><span class="indent1"> country</span></td>
    <td>Customer's shipping country</td>
  </tr>
  <tr>
    <td><span class="indent1"> phone</span></td>
    <td>Customer's shipping phone number</td>
  </tr>
  <tr>
    <td><span class="indent1"> state_id</span></td>
    <td>ID for customer's shipping state/province/region
</td>
  </tr>
  <tr>
    <td><span class="indent1"> country_id</span></td>
    <td>ID for customer's shipping country</td>
  </tr>
  <tr>
    <td><span class="indent1"> destination</span></td>
    <td>Type of delivery destination: residential or business/commercial</td>
  </tr>
  <tr>
    <td><span class="indent1"> last_used</span></td>
    <td>Timestamp when this address was last used as a shipping address</td>
  </tr>
  <tr>
    <td><span class="indent1"> form_session_id</span></td>
    <td>Used for custom shipping forms</td>
  </tr>
	  <tr>
    <td><span class="indent1">payment_methods</span></td>
    <td>Used on the <a href="https://github.com/bigcommerce/cornerstone/blob/master/templates/components/account/payment-methods-list.html">payment methods page</a> to render list of customer's saved payment methods</td>
  </tr>
</table>

<a href='#customer_order-details' aria-hidden='true' class='block-anchor'  id='customer_order-details'><i aria-hidden='true' class='linkify icon'></i></a>

## Order Details

**Description:** The order properties for a specific order, usable on the order details page. (Called on the default `<theme-name>/templates/pages/account/orders/details.html` and `<theme-name&gt;/templates/pages/account/orders/invoice.html` templates, and on the `<theme-name&gt;/templates/components/account/order-contents.html` partial.)

**Handlebars Expression:** `{{order}}`

**Object Properties:**

<table>
  <tr>
    <td>Property</td>
    <td>Description</td>
  </tr>
  <tr>
    <td>date</td>
    <td>Date of the order</td>
  </tr>
  <tr>
    <td>id</td>
    <td>Unique, system-generated ID</td>
  </tr>
  <tr>
    <td>total</td>
    <td>Price object that defines the order’s total value</td>
  </tr>
  <tr>
    <td>status</td>
    <td>Order status code</td>
  </tr>
  <tr>
    <td>status_text</td>
    <td>Status text associated with the status code for the order</td>
  </tr>
  <tr>
    <td>returns_enabled</td>
    <td>Boolean that indicates whether merchant allows products from the order to be returned</td>
  </tr>
  <tr>
    <td>reorder_url</td>
    <td>URL to place reorders for items in this order</td>
  </tr>
  <tr>
    <td>invoice_url</td>
    <td>URL to display an invoice for this order</td>
  </tr>
  <tr>
    <td>is_complete</td>
    <td>Boolean indicating that the order has been completed</td>
  </tr>
  <tr>
    <td>comments</td>
    <td>Customer’s message about the order</td>
  </tr>
  <tr>
    <td>is_digital</td>
    <td>Boolean indicating whether the order will be delivered digitally</td>
  </tr>
  <tr>
    <td>items</td>
    <td>List of items for the order</td>
  </tr>
  <tr>
    <td><span class="indent1"> order_product_id</span></td>
    <td>Product ID</td>
  </tr>
  <tr>
    <td><span class="indent1"> name</span></td>
    <td>Product Name</td>
  </tr>
  <tr>
    <td><span class="indent1"> quantity</span></td>
    <td>Quantity Ordered</td>
  </tr>
  <tr>
    <td><span class="indent1"> refunded</span></td>
    <td>Price object that defines the value of this product that has been refunded</td>
  </tr>
  <tr>
    <td><span class="indent1"> event_date </span></td>
    <td>A chosen event date for the product</td>
  </tr>
  <tr>
    <td><span class="indent1"> price</span></td>
    <td>Price object that defines the product’s price</td>
  </tr>
  <tr>
    <td><span class="indent1">shipping_rows</span></td>
    <td>Array of shipping addresses, for each item in the order</td>
  </tr>
  <tr>
    <td><span class="indent2">address</span></td>
    <td>Street address to ship to</td>
  </tr>
  <tr>
    <td><span class="indent2">city</span></td>
    <td>City to ship to</td>
  </tr>
  <tr>
    <td><span class="indent2">state </span></td>
    <td>State to ship to</td>
  </tr>
  <tr>
    <td><span class="indent2">zip</span></td>
    <td>Postal/ZIP code to ship to</td>
  </tr>
  <tr>
    <td><span class="indent2">country</span></td>
    <td>Country to ship to</td>
  </tr>
  <tr>
    <td><span class="indent2"> gift_wrapping_name</span></td>
    <td>Name of the gift-wrapping option used</td>
  </tr>
  <tr>
    <td><span class="indent2"> type</span></td>
    <td>Type of purchase; value is one of: physical, digital, giftcertificate</td>
  </tr>
  <tr>
    <td><span class="indent2"> download_url</span></td>
    <td>URL at which customer can download digital item</td>
  </tr>
  <tr>
    <td><span class="indent2"> image</span></td>
    <td>The image of the order’s first product, in <a href="/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/stencil-image">Stencil image format</a></td>
  </tr>
  <tr>
    <td><span class="indent2">show_reorder</span>
</td>
    <td>Boolean indicating whether the customer should see a button for reordering items on the Account Order Details page</td>
  </tr>
  <tr>
    <td><span class="indent2"> reorder_message</span></td>
    <td>An error message to be displayed when the customer attempts to reorder items that can’t be reordered</td>
  </tr>
  <tr>
    <td><span class="indent2"> options</span></td>
    <td>A list of options selected when this product was purchased</td>
  </tr>
  <tr>
    <td><span class="indent3"> name</span></td>
    <td>Display name for the option ("Small", “Medium”, etc.)</td>
  </tr>
  <tr>
    <td><span class="indent3"> value</span></td>
    <td>Value that customer selected for the option</td>
  </tr>
  <tr>
    <td>billing_address</td>
    <td>Billing address used for the order</td>
  </tr>
  <tr>
    <td><span class="indent1"> full_name</span></td>
    <td>Customer's billing name</td>
  </tr>
  <tr>
    <td><span class="indent1"> company</span></td>
    <td>Customer's billing company name</td>
  </tr>
  <tr>
    <td><span class="indent1"> address_lines</span></td>
    <td>Customer's billing address</td>
  </tr>
  <tr>
    <td><span class="indent1"> city</span></td>
    <td>Customer's billing city</td>
  </tr>
  <tr>
    <td><span class="indent1"> state</span></td>
    <td>Customer's billing state</td>
  </tr>
  <tr>
    <td><span class="indent1"> country</span></td>
    <td>Customer billing country</td>
  </tr>
  <tr>
    <td><span class="indent1"> zip</span></td>
    <td>Customer billing ZIP</td>
  </tr>
  <tr>
    <td><span class="indent1"> phone</span></td>
    <td>Customer billing phone number</td>
  </tr>
  <tr>
    <td>shipping_address_count</td>
    <td>Number of shipping addresses the customer has specified for this order</td>
  </tr>
  <tr>
    <td>shipping_address</td>
    <td>Shipping address used for the order</td>
  </tr>
  <tr>
    <td><span class="indent1"> full_name</span></td>
    <td>Customer's shipping name</td>
  </tr>
  <tr>
    <td><span class="indent1"> company</span></td>
    <td>Customer's shipping company name</td>
  </tr>
  <tr>
    <td><span class="indent1"> address_lines</span></td>
    <td>Customer's shipping address</td>
  </tr>
  <tr>
    <td><span class="indent1"> city</span></td>
    <td>Customer's shipping city</td>
  </tr>
  <tr>
    <td><span class="indent1"> state</span></td>
    <td>Customer's shipping state</td>
  </tr>
  <tr>
    <td><span class="indent1"> country</span></td>
    <td>Customer's shipping country</td>
  </tr>
  <tr>
    <td><span class="indent1"> zip</span></td>
    <td>Customer's shipping zip</td>
  </tr>
  <tr>
    <td><span class="indent1"> phone</span></td>
    <td>Customer's shipping phone number</td>
  </tr>
  <tr>
    <td>payment_method</td>
    <td>Customer’s payment method for this order (payment gateway)</td>
  </tr>
  <tr>
    <td>card_number_last_four</td>
    <td>Last four digits of customer’s credit card</td>
  </tr>
  <tr>
    <td>total_rows</td>
    <td>A list of “total” rows containing total pricing information</td>
  </tr>
  <tr>
    <td><span class="indent1"> label</span></td>
    <td>The label of the total row (Subtotal, Tax, Grand Total, etc.)</td>
  </tr>
</table>

<a href='#customer_recent-items' aria-hidden='true' class='block-anchor'  id='customer_recent-items'><i aria-hidden='true' class='linkify icon'></i></a>

## Recent Items

**Description:** Items the customer has recently viewed. (Called on the default `<theme-name>/templates/pages/account/recent-items.html` template.)

**Handlebars Expression:** `{{customer.recently_viewed_products}}`

**Object Properties:** References the standard [product card model](/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/common-product-card-model).

<a href='#customer_customer-wishlists' aria-hidden='true' class='block-anchor'  id='customer_customer-wishlists'><i aria-hidden='true' class='linkify icon'></i></a>

## Customer Wishlists

**Description:** Array of product wishlists, specific to this store, for the customer. (Called on the default `<theme-name>/templates/components/account/wishlist-list.html` partial.)

**Handlebars Expression:** `{{customer.wishlists}}` 

**Object Properties:**

<table>
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>Unique system ID of the wishlist</td>
  </tr>
  <tr>
    <td>num_items</td>
    <td>Number of items in the wishlist</td>
  </tr>
  <tr>
    <td>name</td>
    <td>Customer-defined name of the wishlist</td>
  </tr>
  <tr>
    <td>is_public</td>
    <td>Boolean value indicating whether the wishlist is publicly available </td>
  </tr>
  <tr>
    <td>is_editable</td>
    <td>Boolean indicating whether the "Remove Item" button, and account navigation controls, are displayed (i.e., whether the customer viewing the wishlist is this wishlist’s owner)</td>
  </tr>
  <tr>
    <td>token</td>
    <td>Unique public token for the wishlist</td>
  </tr>
  <tr>
    <td>view_url</td>
    <td>URL to view the wishlist</td>
  </tr>
  <tr>
    <td>edit_url</td>
    <td>URL to edit the wishlist</td>
  </tr>
  <tr>
    <td>delete_url</td>
    <td>URL to delete the wishlist</td>
  </tr>
  <tr>
    <td>share_url</td>
    <td>URL to share the wishlist</td>
  </tr>
</table>


<a href='#customer_wishlist-details' aria-hidden='true' class='block-anchor'  id='customer_wishlist-details'><i aria-hidden='true' class='linkify icon'></i></a>

## Wishlist Details

**Description:** Wishlist information for a specific wishlist. (Called on the default `<theme-name>/templates/pages/account/wishlist-details.html` template and `<theme-name>/templates/components/account/wishlist-item-list.html`partial.)

**Handlebars Expression:** `{{wishlist}}`

**Object Properties:**

<table>
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>Unique system ID for the wishlist</td>
  </tr>
  <tr>
    <td>name</td>
    <td>Customer-defined name of the wishlist</td>
  </tr>
  <tr>
    <td>is_public</td>
    <td>Boolean value indicating whether the wishlist is publicly available </td>
  </tr>
  <tr>
    <td>token</td>
    <td>Unique public token for the wishlist</td>
  </tr>
  <tr>
    <td>share_url</td>
    <td>URL used to share the wishlist</td>
  </tr>
  <tr>
    <td>items</td>
		<td>List of items in the wishlist; extends <a href="">the product card model</a>, adding the extra properties below:</td>
  </tr>
  <tr>
    <td class=""><span class="indent1"> id</span></td>
    <td class="">Unique system ID for this wishlist item</td>
  </tr>
  <tr>
    <td class=""><span class="indent1"> product_id</span></td>
    <td class="">Product ID for the item</td>
  </tr>
  <tr>
    <td class=""><span class="indent1"> remove_url</span></td>
    <td class="">URL to remove the product from the wishlist</td>
  </tr>
</table>

<a href='#customer_account-order-shipments' aria-hidden='true' class='block-anchor'  id='customer_account-order-shipments'><i aria-hidden='true' class='linkify icon'></i></a>

## Account Order Shipments

<b>Description:</b> Objects to manage shipments associated with a specific order details for the current customer. (Called on the default `<theme-name&gt;/templates/pages/account/orders/details.html` template.) 

**Handlebars Expression:** `{{shipments}}`

<b>Object Properties:</b>

<table>
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>date_shipped</td>
    <td>Shipping date for this shipment</td>
  </tr>
  <tr>
    <td>shipping_provider</td>
    <td>Carrier for this shipment</td>
  </tr>
  <tr>
    <td>shipping_method</td>
    <td>Shipping method for this shipment</td>
  </tr>
  <tr>
    <td>show_shipping_method</td>
    <td>Boolean indicating whether to display the shipping method to the customer</td>
  </tr>
  <tr>
    <td>shipping_track</td>
    <td>Tracking information for this shipment</td>
  </tr>
  <tr>
		<td><span class="indent1">url</span></td>
    <td>Tracking URL for this shipment</td>
  </tr>
  <tr>
		<td><span class="indent1">number</span></td>
    <td>Tracking number for this shipment</td>
  </tr>
</table>

<a href='#customer_account-orders' aria-hidden='true' class='block-anchor'  id='customer_account-orders'><i aria-hidden='true' class='linkify icon'></i></a>

## Account Orders

**Description:** Objects to manage completed orders for the current customer. By default, orders sort by order id, from lowest to highest. (Called on the default `<theme-name>/templates/pages/account/orders/all.html`and `<theme-name&gt;/templates/pages/account/orders/completed.html`  templates, and on the `<theme-name>/templates/components/account/orders-list.html` partial.)

**Handlebars Expression:** `{{customer.orders}}`

<b>Object Properties:</b>

<table>
  <tr>
    <td>Property</td>
    <td>Description</td>
  </tr>
  <tr>
    <td>pagination</td>
    <td>References pagination model</td>
  </tr>
  <tr>
    <td>date</td>
    <td>Date this order was placed</td>
  </tr>
  <tr>
    <td>last_update_date</td>
    <td>Date this order was last updated</td>
  </tr>
  <tr>
    <td>id</td>
    <td>ID for this order</td>
  </tr>
  <tr>
    <td>total</td>
    <td>Total value of this order</td>
  </tr>
  <tr>
    <td>status</td>
    <td>Status of this order ("Completed" or other)</td>
  </tr>
  <tr>
    <td>return_url</td>
    <td>URL for returning items in this order</td>
  </tr>
  <tr>
    <td>reorder_url</td>
    <td>URL for reordering items in this order</td>
  </tr>
  <tr>
    <td>details_url</td>
    <td>URL for details about this order</td>
  </tr>
  <tr>
    <td>payment_instructions</td>
    <td>Text field defined by merchant as to payment instructions for manual gateways such as “Bank Deposit”</td>
  </tr>
  <tr>
    <td>image</td>
    <td>Image of the order’s first product, in Stencil image format</td>
  </tr>
  <tr>
    <td>items</td>
    <td>Array of products in this order</td>
  </tr>
    <tr>
    <td><span class="indent1">name</span></td>
    <td>Name of this product</td>
  </tr>
  <tr>
    <td><span class="indent1">quantity</span></td>
    <td>Quantity of this product ordered</td>
  </tr>
  <tr>
    <td><span class="indent1">refunded</span></td>
    <td>Price object that defines the amount of this product that has been refunded</td>
  </tr>
  <tr>
    <td><span class="indent1">expected_release_date</span></td>
    <td>Expected ship date if the product is set to pre-order status</td>
  </tr>
  <tr>
    <td><span class="indent1">type</span></td>
    <td>Type of purchase; value is one of: physical, digital, giftcertificate</td>
  </tr>
  <tr>
    <td><span class="indent1">download_url</span></td>
    <td>URL for customer to download a digital product</td>
  </tr>
  <tr>
    <td><span class="indent1">image</span></td>
    <td>The image for this ordered product</td>
  </tr>
  <tr>
    <td><span class="indent1">options</span></td>
    <td>Array of additional product details (size, color, etc.), as name/value pairs</td>
  </tr>
  <tr>
    <td><span class="indent2">name</span></td>
    <td>Displayed name for this category of information</td>
  </tr>
  <tr>
    <td><span class="indent2">value</span></td>
    <td>Displayed value for this product’s entry</td>
  </tr>
</table>

<a href='#customer_account-returns' aria-hidden='true' class='block-anchor'  id='customer_account-returns'><i aria-hidden='true' class='linkify icon'></i></a>

## Account Returns

**Description:** Objects to manage returns for the current customer. (Called on the default `<theme-name>/templates/pages/account/returns.html` template.) 

**Handlebars Expression:** `{{customer.returns}}`

**Object Properties:**

<table>
  <tr>
    <td>Property</td>
    <td>Description</td>
  </tr>
  <tr>
    <td>date_requested</td>
    <td>Date on which the customer requested this return</td>
  </tr>
  <tr>
    <td>id</td>
    <td>The ID for this return</td>
  </tr>
  <tr>
    <td>quantity</td>
    <td>Quantity of items returned</td>
  </tr>
  <tr>
    <td>reason</td>
    <td>Reason for return; merchants can define actions beyond the default strings created with each store, which are: Received Wrong Product, Wrong Product Ordered, Not Satisfied With The Product, and There Was A Problem With The Product</td>
  </tr>
  <tr>
    <td>action</td>
    <td>Return action; merchants can define actions beyond the default set created with each store (Repair, Replacement, or Store Credit)</td>
  </tr>
  <tr>
    <td>comments</td>
    <td>Comments that the customer entered with the return request</td>
  </tr>
  <tr>
    <td>status</td>
    <td>Status of the return: Pending, Received, Authorized, Repaired, 
Refunded, Rejected, or Cancelled</td>
  </tr>
  <tr>
    <td>product</td>
    <td>Array of products included in the return</td>
  </tr>
  <tr>
    <td>url</td>
    <td>URL for this product</td>
  </tr>
  <tr>
    <td>name</td>
    <td>Name of this product</td>
  </tr>
  <tr>
    <td>options</td>
    <td>Array of additional product details (size, color, etc.), as name/value pairs</td>
  </tr>
  <tr>
		<td><span class="indent1">name</span></td>
    <td>Displayed name for this category of information</td>
  </tr>
  <tr>
		<td><span class="indent1">value</span></td>
    <td>Displayed value for this product’s entry</td>
  </tr>
  <tr>
    <td>image</td>
    <td>Image for this product</td>
  </tr>
</table>

<a href='#customer_account-new-return' aria-hidden='true' class='block-anchor'  id='customer_account-new-return'><i aria-hidden='true' class='linkify icon'></i></a>

## Account New Return

**Description:** Objects to handle a new return for the current customer. (Called on the default `<theme-name>/templates/pages/account/add-return.html` template.)

**Handlebars Expression:** `{{forms.return}}`

**Object Properties:**

<table>
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>order_id</td>
    <td>ID for the original order</td>
  </tr>
  <tr>
    <td>reasons</td>
    <td>Reasons for return</td>
  </tr>
  <tr>
    <td>actions</td>
    <td>Return actions: an array of strings arbitrarily defined by the merchant: refund, exchange, credit, etc.</td>
  </tr>
  <tr>
    <td>order_products</td>
    <td>Array of products from the order that are available to return</td>
  </tr>
  <tr>
    <td><span class="indent1">id</span></td>
    <td>ID for the product</td>
  </tr>
  <tr>
    <td><span class="indent1">name</span></td>
    <td>Name of this product</td>
  </tr>
  <tr>
    <td><span class="indent1">product_id</span></td>
    <td>ID for this product</td>
  </tr>
  <tr>
    <td><span class="indent1">price</span></td>
    <td>Price object that defines this product’s price</td>
  </tr>
  <tr>
    <td><span class="indent1">quantity</span></td>
    <td>Quantity of the product returned</td>
  </tr>
  <tr>
    <td><span class="indent1">options</span></td>
    <td>Array of additional product details (size, color, etc.), as name/value pairs</td>
  </tr>
  <tr>
    <td><span class="indent3">name</span></td>
    <td>Displayed name for this category of information</td>
  </tr>
  <tr>
    <td><span class="indent3">value</span></td>
    <td>Displayed value for this product’s entry</td>
  </tr>
</table>

<a href='#customer_create-account' aria-hidden='true' class='block-anchor'  id='customer_create-account'><i aria-hidden='true' class='linkify icon'></i></a>

## Create Account

**Description:** Object to enable the current customer to create a store account. (Called on the default `<theme-name&gt;/templates/pages/auth/create-account.html` template.)

**Handlebars Expression:** `{{forms.create_account}}`

**Object Properties:**

<table>
  <tr>
    <td>Property</td>
    <td>Description</td>
  </tr>
  <tr>
    <td>recaptcha</td>
    <td>Objects for integrating the Google reCAPTCHA service to distinguish human visitors from ’bots (automated agents)</td>
  </tr>
  <tr>
    <td><span class="indent1">enabled</span></td>
    <td>Boolean indicating whether reCAPTCHA is enabled for this store</td>
  </tr>
  <tr>
    <td><span class="indent1">public_key</span></td>
    <td>Public key (site key) that reCAPTCHA returns upon merchant’s enabling CAPTCHA security in Store Settings > Display Settings</td>
  </tr>
  <tr>
    <td>address_fields</td>
    <td>Array of form fields that define each shipping address for this customer; for details, see this repo: <NOBR><a href="https://github.com/bigcommerce/cornerstone/tree/master/templates/components/common/forms">https://github.com/bigcommerce/cornerstone/tree/master/templates/components/common/forms</a></nobr></td>
  </tr>
  <tr>
    <td><span class="indent1">class_name</span></td>
    <td>Specifies a CSS class (defined in the theme's <code>/assets/scss/</code> subdirectory) to apply to a field within the array; for corresponding control-panel steps, see this support article:
 <NOBR><a href="https://support.bigcommerce.com/articles/Public/Editing-Form-Fields#advanced-settings">https://support.bigcommerce.com/articles/Public/Editing-Form-Fields#advanced-settings</a> </td>
  </tr>
  <tr>
    <td>account_fields</td>
    <td>Object of form fields; for details, see this repo:
 <NOBR><a href="https://github.com/bigcommerce/cornerstone/tree/master/templates/components/common/forms">https://github.com/bigcommerce/cornerstone/tree/master/templates/components/common/forms</a></nobr></td>
  </tr>
  <tr>
    <td><span class="indent1">class_name</span></td>
    <td>Specifies a CSS class to apply to a field within the array; for corresponding control-panel steps, see:
<a href="https://support.bigcommerce.com/articles/Public/Editing-Form-Fields#advanced-settings">https://support.bigcommerce.com/articles/Public/Editing-Form-Fields#advanced-settings</a></td>
  </tr>
  <tr>
    <td>error</td>
    <td>BCApp generated message to display when customer’s account creation fails</td>
  </tr>
  <tr>
    <td>checking_out</td>
    <td>Boolean indicating whether customer created the account during a purchase checkout</td>
  </tr>
</table>

<a href='#customer_shipping-addresses' aria-hidden='true' class='block-anchor'  id='customer_shipping-addresses'><i aria-hidden='true' class='linkify icon'></i></a>

## Shipping Addresses

**Description:** Object to enable the customer to enter shipping and contact information. (Called on the default `<theme-name>/templates/components/account/address-list.html` partial.)

**Handlebars Expression:**`{{customer.addresses}}`

**Object Properties:**

<table>
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>id</td>
    <td>ID for this shipping address</td>
  </tr>
  <tr>
    <td>customer_id</td>
    <td>ID for this customer</td>
  </tr>
  <tr>
    <td>first_name</td>
    <td>First name to ship to</td>
  </tr>
  <tr>
    <td>last_name</td>
    <td>Last name to ship to</td>
  </tr>
  <tr>
    <td>company</td>
    <td>Company name to ship to</td>
  </tr>
  <tr>
    <td>address1</td>
    <td>Street (etc.) address, first line</td>
  </tr>
  <tr>
    <td>address2</td>
    <td>Street (etc.) address, second line</td>
  </tr>
  <tr>
    <td>city</td>
    <td>City to ship to</td>
  </tr>
  <tr>
    <td>state</td>
    <td>State/province/region to ship to</td>
  </tr>
  <tr>
    <td>zip</td>
    <td>Postal/ZIP code to ship to</td>
  </tr>
  <tr>
    <td>country</td>
    <td>Country to ship to</td>
  </tr>
  <tr>
    <td>phone</td>
    <td>Addressee’s phone number</td>
  </tr>
  <tr>
    <td>state_id</td>
    <td>ID for destination state/province/region</td>
  </tr>
  <tr>
    <td>country_id</td>
    <td>ID for destination country</td>
  </tr>
  <tr>
    <td>destination</td>
    <td>residential or commercial</td>
  </tr>
  <tr>
    <td>last_used</td>
    <td>Boolean, indicating whether this was the last-used shipping address for this customer</td>
  </tr>
  <tr>
    <td>full_name</td>
    <td>Full name of addressee</td>
  </tr>
  <tr>
    <td>edit_url</td>
    <td>URL for customer to edit this shipping address</td>
  </tr>
  <tr>
    <td>delete_url</td>
    <td>URL for customer to delete this shipping address </td>
  </tr>
</table>



<a href='#customer_payment-methods' aria-hidden='true' class='block-anchor'  id='customer_payment-methods'><i aria-hidden='true' class='linkify icon'></i></a>

## Payment Methods

**Description:** Object to view stored customer payment methods. 

**Called on:** [`[<theme-name>/templates/pages/account/payment-methods.html`](https://github.com/bigcommerce/cornerstone/blob/master/templates/pages/account/payment-methods.html)

**Handlebars Expression:**`{{customer.payment_methods}}`

**Object Properties:**
| Property | Description  |
|--|--|
| add_url | URL to add a payment method to this provider |
| display_name | display name set on the payment settings page for the gateway |
| methods | array |
| ↳ bigpay_token | unique ID identifying the payment method |
| ↳ billing_address | object |
|&nbsp; &nbsp; ↳ address_line_1 | Address Line One |
|&nbsp; &nbsp; ↳ address_line_2 | Address Line Two |
|&nbsp; &nbsp; ↳ city | City |
|&nbsp; &nbsp; ↳ company | Company |
|&nbsp; &nbsp; ↳ country_code |Country code |
|&nbsp; &nbsp; ↳ country_name | Country name |
|&nbsp; &nbsp; ↳ first_name | First name |
|&nbsp; &nbsp; ↳ last_name | Last name |
|&nbsp; &nbsp; ↳ phone | Phone |
|&nbsp; &nbsp; ↳ postal_code | Postal Code |
|&nbsp; &nbsp; ↳ state | State |
|  ↳ brand | Brand of card. visa. mastercard etc. |
| ↳ default_instrument | Boolean, whether the card is the default payment method for the shopper |
| ↳ delete_url | URL to delete this specific payment method |
| ↳ edit_url | URL to edit this specific payment method |
| ↳ expiry_month | Expiration month |
| ↳ expiry_year | Expiration Year |
| ↳ last_4 | Last four of card |
| ↳ provider | ID of the provider to add a vaulted card |
| ↳ expiry_year | Expiration Year | 



<a href='#customer_edit-payment-methods' aria-hidden='true' class='block-anchor'  id='customer_edit-payment-methods'><i aria-hidden='true' class='linkify icon'></i></a>

## Edit Payment Methods

**Description:** Object to view stored customer payment methods.

**Called on:** [`<theme-name>/templates/pages/account/payment-methods.html`](https://github.com/bigcommerce/cornerstone/blob/master/templates/pages/account/payment-methods.html)

**Handlebars Expression:**`{{customer.payment_methods}}`

**Object Properties:**
| Property | Description  |
|--|--|
| bigpay_token | unique ID identifying the payment method |
| billing_address | object |
| ↳ address_line_1 | Address Line One |
| ↳ address_line_2 | Address Line Two |
| ↳ city | City |
| ↳ company | Company |
| ↳ country_code |Country code |
| ↳ country_name | Country name |
| ↳ first_name | First name |
| ↳ last_name | Last name |
| ↳ phone | Phone |
| ↳ postal_code | Postal Code |
| ↳ state | State |
|brand | Brand of card. visa. mastercard etc. |
|default_instrument | Boolean, whether the card is the default payment method for the shopper |
| forms | Contains all the availble form fields on the update payments page. Object |
| &nbsp; ↳ action | The url to update payment methods. `/account.php?action=update_payment_method` |
| &nbsp; ↳  billing_fields | Array. The drop down for the billing country selection. |
| &nbsp; &nbsp; ↳  chooseprefix | Appears at the top of the country drop-down. Ex. `Choose a Country` |
| &nbsp; &nbsp; ↳  class_name | Field identifier Ex. `Field200` |
| &nbsp; &nbsp; ↳  id | Id of the Field Ex. `FormField_11`  |
| &nbsp; &nbsp; ↳  label | Field Label . Appears above the field. Ex. `Country`|
| &nbsp; &nbsp; ↳  name | Field identifier `FormField[2][11]` |
| &nbsp; &nbsp; ↳  options | Only returns if the field has a dropdown value |
| &nbsp; &nbsp;  &nbsp; &nbsp; ↳  label | Country label Ex. `United States` |
| &nbsp; &nbsp;  &nbsp; &nbsp; ↳  selected | This only appears in the results if the field is selected. Boolean Ex. `true` |
| &nbsp; &nbsp;  &nbsp; &nbsp; ↳  value | Country value Ex. `United States` | 
| &nbsp; &nbsp; ↳  partial | The type of field. `select`, `text`, `multiline` |
| &nbsp; &nbsp; ↳  private_id | The ID of the field. (Used by the backend to identify what type of value has been provided.) e.g. "City"  |
| &nbsp; &nbsp; ↳  required |  Boolean value to indicate whether the field is required or not.|
| &nbsp; &nbsp; ↳  type |  The type of field e.g. "singleline" for a First Name text entry or "singleselect" for a Country drop down |
| &nbsp; &nbsp; ↳  validation | A JSON string used by the front-end to provide validation and error cues. |
| &nbsp; &nbsp; ↳  size |  This indicates the size of the field's box. Not used. Always empty. (Theme styles will override this anyway.)|
| &nbsp; &nbsp; ↳  value | Returns if there is a current value for the field e.g. 90210 |
| last_four | last four of the credit card |
| provider | Credit card provider |



<a href='#customer_add-payment-methods' aria-hidden='true' class='block-anchor'  id='customer_add-payment-methods'><i aria-hidden='true' class='linkify icon'></i></a>

## Add Payment Methods

**Description:** Object to add stored customer payment methods.

**Called on:** [`<theme-name>/templates/pages/account/payment-methods.html`](https://github.com/bigcommerce/cornerstone/blob/master/templates/pages/account/add-payment-method.html)

**Handlebars Expression:** 
* `{{vault}}`
* `{{countries}}`
* `{{forms}}`

**Object Properties:**
| Property | Description  |
|--|--|
| vault | Object |
|&nbsp;↳ access_token | token needed to submit with the ADD payment method form otherwise form submission will fail with 401 Unauthorized |
|&nbsp;↳ expires_at | Expiration Date in Unix Timestamp|
| countries |  countries with state information, used in the country and state drop downs when submitting the ADD payment form |
| &nbsp; ↳ code | country code |
| &nbsp; ↳ label | country name that appears in the dropdown |
| &nbsp; ↳ value | country name |
| &nbsp; ↳ name | state name |
| forms | Object |
| &nbsp; ↳ provider | ID of the provider to add a vaulted card. Ex. stripe |

