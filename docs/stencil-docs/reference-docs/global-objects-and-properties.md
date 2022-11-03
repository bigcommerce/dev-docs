# Global Objects and Properties

 

Global objects and properties are common components shared across the entire BigCommerce storefront.

<!-- theme: info -->
> #### Debugging Your Theme
> The Stencil framework provides built-in debugging tools to aid in your custom front-end development. When you want to see what data is available on the page you are working on, you can simply add the debug query string to your store’s localhost URL. For example:
> `http://localhost:3000/product/this-is-a-sample-product?debug=context` will return a list of all the objects available on the page, in JSON syntax. 
> If you want to view the available JSON objects and rendered page at the same time, simply change the debug value to "bar": `http://localhost:3000/product/this-is-a-sample-product?debug=bar`

## Banner

**Description:** Elements of marketing banners at page’s top and/or bottom

**Handlebars Expressions:** `{{banner}}`, `{{{banner}}}`

**Object Properties:**

| Property | Description |
|----|----|
| banners | Blocks of static HTML content to define banners |
| &nbsp;&nbsp;top | Array of HTML content/strings, for custom top-banner content; banners are populated from the BigCommerce control panel |
| &nbsp;&nbsp;bottom | Array of HTML content/strings, for custom bottom-banner content; banners are populated from the BigCommerce control panel |

<!-- theme: warning -->
> ####  Handlebars Formatting Exception
> Where a banner contains HTML, the banner helper must be placed in triple braces, as in this example: `{{{banner}}}`. (Double braces would escape the HTML.)

## Breadcrumbs

**Description:** Defines a page's breadcrumbs – available on virtually all pages that have a breadcrumb trail.

**Handlebars Expression:** `{{breadcrumbs}}`

**Object Properties:**

| Property | Description |
|----|----|
| name | Displayed name of this breadcrumb element. |
| url | URL of this breadcrumb element. |

## Carousel

**Description:** A list of images, text, and style assets for a storefront’s image slide show.

**Handlebars Expression:** `{{carousel}}`

**Object Properties:**

| Property | Description |
|----|----|
| swap_frequency | Indicates how often (in seconds) the slides will change; the value must be between 1 and 90,000 seconds. |
| slides | Object containing properties for each slide in the slideshow. |
| &nbsp;&nbsp;image | Path to the image file used on this slide. |
| &nbsp;&nbsp;alt_text | Alt text for the image. |
| &nbsp;&nbsp;url | URL to which the image will link. |
| &nbsp;&nbsp;heading | Heading message defined by the merchant. |
| &nbsp;&nbsp;heading_color | Color of the heading text. |
| &nbsp;&nbsp;text | Subheading defined by the merchant. |
| &nbsp;&nbsp;text_color | Color of the subheading text. |
| &nbsp;&nbsp;button_text | Text displayed on a call-to-action button defined by the merchant. |
| &nbsp;&nbsp;button_text_color | Color of the button. | 

## Cart

**Description:** Returns the ID of the cart if one exists. To return more cart information use the [Storefront Cart API](/api-reference/cart-checkout/storefront-cart-api). 

**Handlebars Expression:** `{{cart_id}}`

**Object Properties:**

|Property|Description|
| -- | -- |
| cart_id| ID of the shopper's cart. String |

## Currency Selector

**Description:** A list of all supported currencies, and the currency that is actively in use in the storefront.

**Handlebars Expression:** `{{currency_selector}}`

**Object Properties:**

| Property | Description |
|----|----|
| active_currency_id | ID of the currency actively in use in the storefront. |
| active_currency_flag | Country flag used to represent the active currency. |
| active_currency_name | Name of the active currency. |
| active_currency_code | Code for the active currency. |
| currencies | List of all the currencies supported for this storefront. |
| &nbsp;&nbsp;is_active | Boolean that indicates whether this currency is active for use in the storefront. |
| &nbsp;&nbsp;switch_url | The URL to invoke a switch to this currency. |
| &nbsp;&nbsp;id | ID of the currency. |
| &nbsp;&nbsp;name | Name of the currency. |
| &nbsp;&nbsp;flag | Country flag used to visually represent the currency. | 
 

 ## Categories

 **Description:** A array of category objects filled with all categories shown in the current page context; default sorting is by category ID, from lowest to highest.

**Handlebars Expression:** `{{categories}}`

```handlebars title="Example: Categories usage" lineNumbers
<!-- renders a UL of categories for the current page context -->
<ul class="people_list">
  {{#each categories}}
    <li>{{this.name}}</li>
  {{/each}}
</ul>
```

**Object Properties:**

The table below displays properties for the individual category objects within the array.

| Property | Description |
|----|----|
| id | ID of the top-level category listed |
| image | Path to the image file used on this slide. |
| &nbsp;&nbsp;alt | &nbsp;&nbsp;The image alt name. Defaults to category name |
| &nbsp;&nbsp;data | &nbsp;&nbsp;Public category image url. |
| name | Name of the top-level category |
| description | Description of the top-level category (optional &ndash; when requested in front matter) |
| url | URL to the category page |
| count | Number of products in this category |
| children | List of child categories for this top-level category |
| &nbsp;&nbsp;id | ID of the child category |
| &nbsp;&nbsp;name | Name of the child category |
| &nbsp;&nbsp;description | Description of the child category (optional &ndash; when requested in front matter) |
| &nbsp;&nbsp;url | URL of the child category |
| &nbsp;&nbsp;is_active | Boolean that indicates which category is your “breadcrumb” category on an item's product display page (PDP). For example, an emerald necklace may be in the _Jewelry_ and _Accessories_ categories. If you navigated to the product from the _Jewelry_ category, `is_active: true` will be present on the _Jewelry_ object. |
| &nbsp;&nbsp;count | Number of products in this child category. |
| &nbsp;&nbsp;image | Path to the image file used on this slide. |
| &nbsp;&nbsp;&nbsp; alt | &nbsp;&nbsp;&nbsp; The image alt name. Defaults to category name. |
| &nbsp;&nbsp;&nbsp; data | &nbsp;&nbsp;&nbsp; Public category image URL. |

## Faceted Search

**Description:** Faceted-search object for searching globally, by category, or by brand.

**Handlebars Expression:** `{{faceted_search}}`

**Object Properties:**

| Property | Description |
|----|----|
| facets | List of all search facets available |
| **selected** | Container for the selected search facets (selected facets contain properties below) |
| &nbsp;&nbsp;remove_all_url | URL to remove all selected search restrictions |
| &nbsp;&nbsp;items | Currently enabled search facets |

## Featured Products

**Description:** Renders a list of all the featured products for the BigCommerce storefront.

**Handlebars Expression:** `{{products.featured}}`

**Object Properties:** References the [product card model](/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/common-product-card-model).

**Usage Example:**

The code example below displays the global `{{products.featured}}` object on the `cornerstone/templates/pages/home.html` page template from [Stencil's base Cornerstone theme](https://github.com/bigcommerce/cornerstone/blob/master/templates/pages/home.html#L5) (GitHub).

`{{products.featured}}` returns 10 products by default.

First, you must declare the object using Front Matter. To declare the object, the following front matter must be placed at the top of the template HTML page. This following declaration also limits the number of featured products to be displayed:

```yml title="Example: Frontmatter declaration"
products:
  [...]
  featured:
    limit: {{theme_settings.homepage_featured_products_count}} //limits the number of featured products to be displayed.
```

The `homepage_featured_products_count` limit is one of two relevant variables defined in [Cornerstone's `config.json` file](https://github.com/bigcommerce/cornerstone/blob/master/config.json#L45) (GitHub).

```json title="homepage_featured_products_count"
"settings": {
  // ...
  "homepage_featured_products_count": 8,
  // ...
  "homepage_featured_products_column_count": 4,
  // ...    
}
```

In the body of [Cornerstone's `home.html` template](https://github.com/bigcommerce/cornerstone/blob/master/templates/pages/home.html#L27) (GitHub), the below Handlebars conditional statement is responsible for displaying the `{{products.featured}}` object. This is the object that we declared above using front matter.

```handlebars title="home.html"
{{#if products.featured}}
  {{> components/products/featured products=products.featured columns=theme_settings.homepage_featured_products_column_count}}
{{/if}}
```

This above statement formats the _Featured Products_ display according to the `homepage_featured_products_column_count` variable, which is the second relevant variable defined in [Cornerstone's `config.json` file](https://github.com/bigcommerce/cornerstone/blob/master/config.json#L53) (GitHub).

## Footer

**Description:**The footer content for each storefront page

**Handlebars Expression:** `{{footer}}`

**Object Properties:**

| Property | Description |
|----|----|
| sitemap_url | The URL to the sitemap, based on store’s SEO setting |
| scripts | Scripts to be loaded after the HTML has loaded; includes performance metrics |

## HTML Head

**Description:** Data to be included in the HTML `<head>` element<br>

**Handlebars Expression:**`{{head}}`

**Object Properties:**

| Property | Description |
|----|----|
| character_set | The character set to specify |
| meta_tags | Meta tags to improve store SEO |
| title | Current page’s title |
| stylesheets | CSS files to be included |
| scripts | Scripts to be loaded in the &lt;head&gt; tag |
| favicon | The store’s favicon (Favorite icon) |
| rsslinks | RSS feeds to improve SEO |

## Is_Ajax

**Description:** Boolean; returns `true` if the current executing request is an Ajax request

**Handlebars Expression:** `{{is_ajax}}`

No properties available for this object.

## New Products

**Description:** A list of new products for the BigCommerce storefront

**Handlebars Expression:**`{{products.new}}`

**Object Properties:** References the [product card model](/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/common-product-card-model).

**Usage Example:**

To access the global `{{products.new}}` object on your page, you must first use front matter to declare the object at the top of your page template.

`{{products.new}}` returns 10 products by default. 

The code example below declares the global `{{products.new}}` object on the `cornerstone/templates/pages/home.html` page template from [Stencil's base Cornerstone Theme](https://github.com/bigcommerce/cornerstone/blob/master/templates/pages/home.html#L3) (GitHub).

```yml title="Example: Frontmatter declaration"
products:
  new:
    limit: {{theme_settings.homepage_new_products_count}}
```

The `homepage_featured_products_count` limit is one of two relevant variables defined in Cornerstone's `config.json` file (GitHub).

```json title="config.json"
"settings": {
  "homepage_new_products_count": 5,
  // ...
  "homepage_new_products_column_count": 4,
  // ...
}
```

In the body of [Cornerstone's home.html template](https://github.com/bigcommerce/cornerstone/blob/master/templates/pages/home.html#L36) (GitHub), the below Handlebars conditional statement is responsible for displaying the `{{products.featured}}` object. This is the object that we declared above using front matter.

```handlebars title="home.html"
{{#if products.new}}
  {{> components/products/new products=products.new columns=theme_settings.homepage_new_products_column_count}}
{{/if}}
```

This above statement formats the _New Products_ display according to the `homepage_new_products_column_count` variable, which is the second relevant variable defined in [Cornerstone's config.json file](https://github.com/bigcommerce/cornerstone/blob/master/config.json#L46) (GitHub

## Page Content

**Description:** Defines elements of merchant’s store page

**Handlebars Expression:** `{{page}}`

**Object Properties:**

| Property | Description |
|----|----|
| title | Page title, to be used as the HTML `title` tag |
| description | Description for the page, to be used as the HTML `meta &gt; description` tag |
| content | HTML content of the page |
| sub_pages | Array of child pages |
| &nbsp;&nbsp;title | Title of this child page |
| &nbsp;&nbsp;url | URL of this child page |

## Pages

**Description:** A list of all web content pages for the BigCommerce storefront

**Handlebars Expression:** `{{pages}}`

**Object Properties:**

| Property | Description |
|----|----|
| name | Name of the page |
| url | URL of the page |
| children | List of child pages for this page |
| &nbsp;&nbsp;name | Name of the child page |
| &nbsp;&nbsp;url | URL of the child page |

## Page Type Property

**Description:** A string representing the type of page currently displayed. <br>

**Handlebars Expression:** `{{page_type}}`

**Values:** The four most-commonly-used values for `{{page_type}}` are:

* default (for a home page)
* product (for a product page)
* category (for a category page)
* page (for a Web [static] page)

All possible values for `{{page_type}}` are:

| account | shippingaddressform | account_new_return |
|-|-|-|
| account_addressbook | account_downloaditem | account_inbox |
| editaccount | account_orderstatus | account_orders |
| invoice_print | account_order | account_recentitems |
| account_saved_return | account_returns | wishlists |
| add-wishlist | wishlist | createaccount_thanks |
| createaccount | forgotpassword | login |
| getnewpassword | blog | blog_post |
| brand | brands | cart |
| category | compare | 403 |
| 404 | error | giftcertificates_balance |
| giftcertificates | giftcertificates_redeem | default |
| page | page_contact_form | product |
| rss | search | sitemap |
| newsletter_subscribe | unsubscribe | hibernation |
| maintenance |

## Pagination

**Description:** Defines pagination of storefront pages

**Handlebars Expression:** `{{pagination}}`

**Object Properties:**

| Property | Description |
|----|----|
| next | Link to next page, if any |
| previous | Link to previous page, if any |
| sort | Field to sort by |
| current | Number representing which page (in the current collection) the customer is viewing. |
| total | Total number of results, across all pages. |
| links | Array of pages that surround the current page; displayed as a set of links, dynamically sized based on the current page number. |
| &nbsp;&nbsp;url | URL to this page of results. |
| &nbsp;&nbsp;number | The page number of this link, based on an index starting at 1. |

## Search

**Description:** Defines search parameters for the merchant’s site

**Handlebars Expression:** `{{forms.search}}`

**Object Properties:**

| Property | Description |
|----|----|
| query | Active search query, if available. |
| section | Active search-results section: either content or product. |
| content_url | URL to the content section. |
| product_url | URL to the product section. |
| name | Brand name |
| suggested_query | An alternative query – related to the current query – that can be offered to substitute for misspelled entries. |
| has_suggestions | Boolean – true if there is at least one of brand results, category results, or a (non-null) suggested_query. |
| brand_results | Array of brands that match the search query; default sorting is by brand id, from lowest to highest. |
| url | URL of the brand. |
| name | Displayed name for the brand. |
| category_results | An array of category paths matching the search query; used to populate category suggestions. |
| url | URL of the category. |
| name | Displayed name for the category. |
| values | Values of the submitted search form. |
| brand | Any brand ID that the customer has selected from drop-down list. |
| price_from | Any minimum price the customer has specified. |
| price_to | Any maximum price the customer has specified. |
| featured_products | Whether customer has chosen to view featured products: null = no preference; 1 = only featured products; 2 = only non-featured products. |
| free_shipping | Value indicating customer’s preference for free shipping within search results: null = no preference; 1 = free shipping only; 2 = paid shipping only. |
| result_count | Combined number of returned results for product and content search. |
| category_options | Array of options to present to customer as search-by-category fields. |
| id | Category ID |
| name | Displayed name of the category. |
| state | If category contains children, and customer selects a child category: Whether that category’s display will default to closed (collapsed) or opened (expanded). |
| children | Array of objects representing a child category; recursively replicates the structure of its parent. |
| content_results | Search results across blog posts and storefront pages (not products or categories). |
| title | Title of the result (title embedded in blog post or page). |
| content | Summary of text from the blog post or page (first 200 characters). |
| url | URL to the result. |
| type | Either post (for blog posts) or page (for storefront pages). |
| product_results | Results of customer’s last search by product (each result contains the below properties). |
| &nbsp;&nbsp;products | List of search results for a product; points to [product card model](/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/common-product-card-model). |
| &nbsp;&nbsp;show_compare | Boolean corresponding to merchant’s control-panel selection whether or not to enable product comparisons.  |
| &nbsp;&nbsp;faceted_search_enabled | Boolean that defines whether product-filtering search is enabled for the store. |
| &nbsp;&nbsp;facets | All available search filters. |
| &nbsp;&nbsp;pagination | References pagination model. |
| &nbsp;&nbsp;selected | Currently selected filters. |

## Settings

**Description:** Common settings shared across every BigCommerce storefront

**Handlebars Expression:** `{{settings}}`

**Object Properties:**

| Property | Description |
|-|-|
| account_creation_enabled | Site-wide boolean value that indicates whether to allow customers to create accounts |
| show_product_rating | Site-wide boolean value that indicates whether to display product ratings (in numeric or star format) to visitors |
| show_product_reviews | Site-wide boolean value that indicates whether to display full-text product reviews to visitors |
| show_newsletter_box | Site-wide boolean value that indicates whether to display a mailing-list invite to visitors |
|  gift_certificates_enabled | Site-wide boolean value that indicates whether to enable the gift certificate system for this store |
|  blog_enabled | Site-wide boolean value that indicates whether the blog is visible for this store |
|  data_tag_enabled | Site-wide boolean that indicates whether GAEE is enabled in a theme. For {{settings.data_tag_enabled}} to be true, the enhanced_ecommerce key must be present in config.json and a GAEE experiment must be enabled along with GA property value set in Analytics > GA in an active MSF-enabled BigCommerce control panel |
| show_wishlist | Site-wide boolean value that indicates whether to allow customers to create wishlists |
| base_url | The normal shop URL |
| client_ip_address | IP address of the customer browsing the store |
|country_code|The country code corresponding to the IP|
|request|object that contains details about the HTTP request|
| &#x21B3; referer|refer of the request|
| &#x21B3; host|hostname of the request|
| &#x21B3; origin|origin of the request|
| &#x21B3; user_agent|user agent string of the request|
| &#x21B3; is_crawler|renders "true" if user angent is known crawler; "false" otherwise
| &#x21B3; absolute_path|The absolute URL requested. **Never** use request.path in the actual body of the page<sup>1</sup>
| &#x21B3; locale|The browser's locale. Allows for varying experience based on shopper locale.
| secure_base_url | The SSL-enabled, secure, shop URL. |
| address | Store’s complete physical address, as entered by merchant in the [Store Profile](https://support.bigcommerce.com/s/article/Store-Profile-Settings)|
| store_name | Name of the BigCommerce store. |
| store_logo | The store’s logo. |
| &#x21B3; title | Title for the logo – the text configured in the control panel under **Storefront** > Logo. |
| &#x21B3; image | Optional image file, as a Stencil image object. To access the store_logo use: `{{settings.store_logo.image.data}}` and `{{settings.store_logo.image.alt}}` to access the alt tag. These are pulled from the Stencil image object. |
| privacy_cookie | If enabled, a string containing merchant-customizable text for (European Union–required) cookie-setting notification; if disabled, a boolean with a value of false. |
| urls | Global URLs that the template can access – for example, the template could link to the cart page using {{urls.cart}} |
| &#x21B3; home | Store’s home page |
| &#x21B3; account | Collection of (customer and storefront) account-related URLs:|
| &nbsp; &nbsp; &#x21B3; index | Account index page `/account.php` |
| &nbsp; &nbsp; &#x21B3; orders | Collection of orders-related URLs: |
| &nbsp; &nbsp; &nbsp; &nbsp; &#x21B3; all | List of all orders. `/account.php?action=order_status` |
| &nbsp; &nbsp; &nbsp; &nbsp; &#x21B3; completed | URL to view completed orders `/account.php?action=view_orders` |
|  &nbsp; &nbsp; &nbsp; &nbsp; &#x21B3; save_new_return | URL to submit a New Return form<. `/account.php?action=save_new_return` |
| &nbsp; &nbsp; &#x21B3; update_action | URL to submit an Edit Account form. `/account.php?action=update_account` |
| &nbsp; &nbsp; &#x21B3; returns | List of returns. `/account.php?action=view_returns` |
|  &nbsp; &nbsp; &#x21B3; addresses | List of addresses; default sorting is by address id, from lowest to highest. `/account.php?action=address_book` |
| &nbsp; &nbsp; &#x21B3; inbox | List of messages in customer’s inbox. `/account.php?action=inbox` |
| &nbsp; &nbsp; &#x21B3; send_message | URL to submit a message to the merchant. `/account.php?action=send_message` |
| &nbsp; &nbsp; &#x21B3; add_address | Link to add shipping address form. `/account.php?action=add_shipping_address` |
| &nbsp; &nbsp; &#x21B3; wishlists | Collection of wishlist-related URLs: |
| &nbsp; &nbsp; &nbsp; &nbsp; &#x21B3; add | URL to the Add Wishlist form `/wishlist.php?action=addwishlist` |
| &nbsp; &nbsp; &nbsp; &nbsp; &#x21B3; edit | URL to the Edit Wishlist form `/wishlist.php?action=editwishlist` |
| &nbsp; &nbsp; &nbsp; &nbsp; &#x21B3; delete | URL to delete a wishlist `/wishlist.php?action=deletewishlist` |
| &nbsp; &nbsp; &nbsp; &nbsp; &#x21B3; all | URL to view all wishlists `/wishlist.php` |
| &nbsp; &nbsp; &#x21B3; details | URL to the Edit Account form `/account.php?action=account_details` |
| &nbsp; &nbsp; &#x21B3; recent_items | URL to a list of recently viewed items `/account.php?action=recent_items` |
| &#x21B3; brands | URL to view all brands; default sorting is by brand id, from lowest to highest |
| &#x21B3; gift_certificate | Collection of gift-certificate–related URLs: |
| &nbsp; &nbsp; &#x21B3; purchase | URL to a form for purchasing a gift certificate `/giftcertificates.php` |
| &nbsp; &nbsp; &#x21B3; redeem | URL to view redemption information `/giftcertificates.php?action=redeem` |
| &nbsp; &nbsp; &#x21B3; balance | URL to check the balance of a gift certificate `/giftcertificates.php?action=balance` |
| &#x21B3; auth | Collection of authorization-related URLs: |
| &nbsp; &nbsp; &#x21B3; login | URL to the login form `/login.php` |
| &nbsp; &nbsp; &#x21B3; check_login | URL to which to submit the login form `/login.php?action=check_login` |
| &nbsp; &nbsp; &#x21B3; create_account | URL to the Create Account form page `/login.php?action=create_account` |
| &nbsp; &nbsp; &#x21B3; save_new_account | URL to which to submit the Create Account form< `/login.php?action=save_new_account` |
| &nbsp; &nbsp; &#x21B3; forgot_password | URL to the Forgot Password form `/login.php?action=reset_password` |
| &nbsp; &nbsp; &#x21B3; send_password_email | Submission URL for the Forgot Password form `/login.php?action=send_password_email` |
| &nbsp; &nbsp; &#x21B3; save_new_password | Submission URL for saving a new password `/login.php?action=save_new_password` |
| &nbsp; &nbsp; &#x21B3; logout | URL for customer to log out of their account `/login.php?action=logout` |
| &#x21B3; product | Collection of product-related URLs: |
| &nbsp; &nbsp; &#x21B3; post_review | URL to submit a Write Review form `/postreview.php`  |
| &#x21B3; cart | URL to the cart page `/cart.php` |
| &#x21B3; checkout  | Collection of checkout related URLs: |
| &nbsp; &nbsp; &#x21B3; single_address  | URL for the customer to check out with a single shipping address `/checkout.php` |
| &nbsp; &nbsp; &#x21B3; multiple_address  | URL for the customer to check out with multiple shipping addresses `/checkout.php?action=multiple` |
| &#x21B3; rss | Collection of RSS-related URLs: |
| &nbsp; &nbsp; &#x21B3; products | Collection of product-feed–related URLs: |
| &nbsp; &nbsp; &nbsp; &nbsp; &#x21B3; new| RSS feed of new products `/rss.php?type=rss` |
| &nbsp; &nbsp; &nbsp; &nbsp; &#x21B3; new_atom | RSS feed of new products, in Atom format `/rss.php?type=atom` |
| &nbsp; &nbsp; &nbsp; &nbsp; &#x21B3; popular | RSS feed of popular products `/rss.php?action=popularproducts&type=rss` |
| &nbsp; &nbsp; &nbsp; &nbsp; &#x21B3; popular_atom | RSS feed of popular products, in Atom format `/rss.php?action=popularproducts&type=atom` |
| &nbsp; &nbsp; &nbsp; &nbsp; &#x21B3; featured | RSS feed of featured products `/rss.php?action=featuredproducts&type=rss';` |
| &nbsp; &nbsp; &nbsp; &nbsp; &#x21B3; featured_atom | RSS feed of featured products, in Atom format `/rss.php?action=featuredproducts&type=atom` |
| &nbsp; &nbsp; &nbsp; &nbsp; &#x21B3; search | RSS feed of products matching the active search query. |
| &nbsp; &nbsp; &nbsp; &nbsp; &#x21B3; search_atom | RSS feed of products matching the active search query, in Atom format. |
| &nbsp; &nbsp; &#x21B3; blog | RSS feed of recent blog posts `/rss.php?action=newblogs&type=rss` |
| &nbsp; &nbsp; &#x21B3; blog_atom | RSS feed of recent blog posts, in Atom format `/rss.php?action=newblogs&type=atom` |
| &#x21B3; contact_us_submit | URL to submit the Contact Us form `/pages.php?action=sendContactForm`|
| &#x21B3; search | URL to submit a search request `/search.php` |
| &#x21B3; compare | A string containing the URL to the products comparison page `/compare` |
| &#x21B3; sitemap | URL to the sitemap `/sitemap.php` |
| &#x21B3; subscribe | Collection of subscription-related URLs. |
| &nbsp; &nbsp; &#x21B3; action | URL to which the newsletter subscription will be submitted `/subscribe.php` |
| money | List of child items that define the store’s default currency formatting |
| &#x21B3; currency_token | Symbol for the currency |
| &#x21B3; currency_location | Whether currency symbol appears at left or right of the quantity |
| &#x21B3; decimal_token | Symbol for decimal separator |
| &#x21B3; decimal_places | Number of decimal places to display |
| &#x21B3; thousands_token | Symbol for thousands separator |
| returns_enabled | Boolean that indicates whether the control-panel setting for the returns system is enabled |
| tax_label | Defines the Tax Label (VAT, Sales Tax, etc.) that a merchant can set in an active MSF-enabled control panel’s Settings > Tax page for display to customers |
| add_this | Object that defines links for the AddThis social sharing component |
| &#x21B3; buttons | Array of buttons to display for AddThis social sharing `{{#each settings.add_this.buttons}}{{service}}{{/each}}` `{{#each settings.add_this.buttons}}{{annotations}}{{/each}}` |
| service | String containing the name of this button's social-media service (facebook, email, print, twitter, linkedin, google, etc.). |
| annotation | String containing HTML attributes associated with this button. |
| maintenance | Object that manages information about the store when in maintenance (offline) mode. |
| header | If store is in maintenance mode, string containing header text for the "Down for Maintenance" window displayed to visitors; otherwise, null. |
| message | If store is in maintenance mode, string containing merchant-customizable body text (and optionally, HTML) for the "Down for Maintenance" window displayed to visitors; otherwise, null. |
| notice | If store is in maintenance mode, one of three strings identifying the store's status, and generating a corresponding text notice to merchants about how to proceed: AdminPrelaunchNotice for preview stores, AdminMaintenanceNotice for active stores taken down for maintenance, or AdminHibernationModeNotice for deactivated stores; otherwise, null. |
| phone_number | The contact phone number for the store located in the [stores profile](https://support.bigcommerce.com/s/article/Store-Profile-Settings).  |
| rss_item_limit | An integer that sets a limit on the number of RSS items to display. |
| password_requirements | Collection of properties representing BigCommerce requirements for customer-account passwords: |
| alpha | Regular expression representing required/acceptable alphabetic characters. |
| numeric | Regular expression representing required/acceptable numeric characters. |
| minlength | Integer representing minimum acceptable password length. |
| error | String that passes a standard error message for noncompliant passwords. |
| measurements | Collection of units-of-measure definitions, to be used when displaying product details: |
| &#x21B3; length | Units of measure for product length |
| &#x21B3; weight | Units of measure for product weight |
| Time and date settings | The four settings below are configured in an active MSF-enabled control panel under **Settings > General > Date & Timezone**. Date formats follow php conventions. |
| store_time_zone | Store's time zone, as selected in the control panel's Your Timezone drop-down list |
| store_dst_correction | Whether or not this time zone observes Daylight Saving Time (boolean), as set by the control panel's Enable DST Correction check box |
| display_date_format | Brief display format/pattern for dates, as configured in the control panel's Display Date Format field |
| extended_display_date_format | Extended display format/pattern for dates, as configured in the control panel's Extended Display Date Format field |
| show_payment_methods | A boolean value. If true available payment methods on a store will be shown. If false they are hidden.  |
| as payments_url| Exposes the BigCommerce payments URL. `https://payments.bigcommerce.com`.|
| secure_host | Returns the SSL url for a store. Example: `https://www.bigcommerce.com`. |
| store_hash | Returns the store hash as a string.  |
| is_eu_ip_address| A boolean value. Return true if the shoppers ip address is in the EU. |
| show_newsletter_box | Returns `1` if customers are allowed to subscribe to the [store newsletter](https://support.bigcommerce.com/s/article/Collecting-Newsletter-Subscriptions#newsletter). Returns `0` if customers are not able to subscribe. |
| show_newsletter_summary | Returns a `1` if the [newsletter summary](https://support.bigcommerce.com/s/article/Collecting-Newsletter-Subscriptions#newsletter) is shown. Returns `0` if it is now shown. If `show_newsletter_box` is `0` then `show_newsletter_summary` will also be `0`. |
| newsletter_summary | Returns the [newsletter summary](https://support.bigcommerce.com/s/article/Collecting-Newsletter-Subscriptions#newsletter). |
| amp_analytics_id | Returns Google AMP analytics ID |
| bulk_discount_enabled | Boolean that return `true` if bulk discount is enabled on products. |

## Sitemap

**Description:** A list of all sitemap properties for this BigCommerce storefront: pages, categories, and brands.

**Handlebars Expression:** `{{sitemap}}`

**Object Properties:**

| Property | Description |
|----|----|
| subsection_url | URL to subsection content (pages, categories, brands) of the sitemap. |
| label | Subsection title (pages, categories, brands.) |
| body | List of all sitemap subsections. |
| &nbsp;&nbsp;url | URL to the page, category, or brand. |
| &nbsp;&nbsp;label | Label of the page, category, or bran.d |
| &nbsp;&nbsp;children  | Nested list of children within pages or categories; will be null for brands. |
| &nbsp;&nbsp;&nbsp;url | URL to the child page or category. |
| &nbsp;&nbsp;&nbsp;label | Label for the child page or category. |

## Social Links

**Description:** Array of all social-media site links for the storefront.<br>

**Handlebars Expression:** `{{social_media}}`

**Object Properties:**<br><br>

| Property | Description |
|----|----|
| name | Internal name of this social-media platform (e.g., "googleplus"). |
| url | URL to point to, set by merchant in control panel (https://www.facebook.com/BigCommerce, etc.). |
| position | Display sort order for this platform within the social-media list. |
| display_name | Displayed/formatted name of this social-media platform (e.g., “Google+”).  |

## Template Property

**Description:** A string containing the name of the root template currently being rendered in the page context. <br>

**Handlebars Expression:** `{{template}}`

**Values:** Values will reflect each theme's specific directory structure. Possible values include:

* `pages/home`
* `pages/brand` (for brand pages)
* `pages/brands`
* `pages/cart`
* `pages/category` (for category pages)
* `pages/contact-us`
* `pages/page` (for Web [static] pages)
* `pages/product` (for product pages)
* `pages/errors/404`
* `pages/auth/login`
* `pages/custom/product/<some_page_name>` (for a custom product page)
(etc.)

## Top Sellers

**Description:** Object to display a sidebar of top-selling products.<br>

**Handlebars Expression:** `{{products.top_sellers}}`

**Object Properties:** References the [product card model](/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/common-product-card-model).

**Usage Example:**

`{{products.top_sellers}}` returns 10 products by default.

To access the global`{{products.top_sellers}}` object on your page, you must first use [front matter](/stencil-docs/front-matter/front-matter-attributes-reference) to declare the object at the top of your page template. For example, you would place this front-matter declaration at the top of your template file:

```yml title="Template frontmatter"
products:
  top_sellers:
```
