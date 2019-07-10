<div><h3 class="sub-docs-type" id="bigcommerce-for-wordpress">BigCommerce for Wordpress</h3>
<h1 class="sub-docs-title">Shortcodes</h1>
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
        <li><a href="#shortcode_product-shortcode">Products Shortcode</a></li>
        <li><a href="#plugin-settings_api-keys">API Keys</a></li>
	</ul>
</div>

Most of the plugin's functionality is exposed on the front-end of the site through shortcodes embedded on automatically created pages. The code controlling those shortcodes can be found in the classes in `src/BigCommerce/Shortcodes`.

<a href='#shortcode_product-shortcodes' aria-hidden='true' class='block-anchor'  id='shortcode_product-shortcodes'><i aria-hidden='true' class='linkify icon'></i></a>

## Products Shortcode
`[bigcommerce_product]`

The product shortcode can be used to include one or more products on other pages or posts on the WordPress site. Click the **Add Products** button above the editor to select products or build a dynamic query to include in the page.

While the shortcode can be built using the button, it can also be created manually. It accepts a number of optional attributes:

|Attribute|Expected Value|Example|
|-|-|-|
|`id`|A comma delimited list of BigCommerce product IDs        |`[bigcommerce_product id="11,13"]`|
|`post_id`|A comma delimited list of WordPress product post IDs|`[bigcommerce_product post_id="12,22"]`|
|`sku`|A comma delimited list of BigCommerce product SKUs|`[bigcommerce_product sku="ex44,ex47"]`|
|`category`|A comma delimited list of Product Category slugs|`[bigcommerce_product category="tee_shirts,pants"]`|
|`brand`| A comma delimited list of Brand slugs|`[bigcommerce_product brand="sony,rca"]`|
|`featured`|Set to 1 to limit the query to featured products  |`[bigcommerce_product featured="1"]`|
|`recent`|Set to 1 to limit the query to products imported in the last 2 days |`[bigcommerce_product recent="1"]`|
|`sale`|Set to 1 to limit the query to sale products|`[bigcommerce_product sale="1"]`|
|`search`|A search string to match against product titles, BigCommerce product IDs, or SKUs|`[bigcommerce_product search="CoolProduct Title"]`|
|`paged`| Set to 0 to disable pagination  |`[bigcommerce_product paged="0"]`|
|`per_page`|The number of products to show per page. Defaults to the value set in the theme customizer|`[bigcommerce_product per_page="12"]`|
|`order`|Whether to sort products in "ASC" or "DESC" order|`[bigcommerce_product order="ASC"]`|
|`orderby`|Which field to use for sorting. Accepts any field that WP_Query accepts (e.g., title, date)|`[bigcommerce_product orderby="title"]`|


---

<a href='#shortcode_other-short' aria-hidden='true' class='block-anchor'  id='shortcode_other-short'><i aria-hidden='true' class='linkify icon'></i></a>

## Other Shortcodes

|Shortcode|Description|
|-|-|-|
|`[bigcommerce_signin_form]` |The form for users to log in to the site. If user registration is enabled, it will also give a link to the registration page.
|`[bigcommerce_registration_form]`|A form to register a new customer account.
|`[bigcommerce_cart]`|The items currently in the customer’s cart.
|`[bigcommerce_account_profile]`|A form to update the customer’s profile.
|`[bigcommerce_order_history]`|A list of the customer’s past orders.
|`[bigcommerce_shipping_address_list]`|A list of the customer’s shipping addresses, and forms to add, remove, or update addresses.

---

