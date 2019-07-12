<h1>Settings</h1>

**Description:** Common settings shared across every BigCommerce storefront

**Handlebars Expression:** `{{settings}}`

**Object Properties:**

| Property | Description |
| --- | --- |
| account_creation_enabled | Site-wide boolean value that indicates whether to allow customers to create accounts |
| show_product_rating | Site-wide boolean value that indicates whether to display product ratings (in numeric or star format) to visitors |
| show_product_reviews | Site-wide boolean value that indicates whether to display full-text product reviews to visitors |
| show_newsletter_box | Site-wide boolean value that indicates whether to display a mailing-list invite to visitors |
|  gift_certificates_enabled | Site-wide boolean value that indicates whether to enable the gift certificate system for this store |
|  blog_enabled | Site-wide boolean value that indicates whether the blog is visible for this store |
|  data_tag_enabled | Site-wide boolean that indicates whether GAEE is enabled in a theme. For {{settings.data_tag_enabled}} to be true, the enhanced_ecommerce key must be present in config.json and a GAEE experiment must be enabled along with GA property value set in Advanced Settings > Analytics > GA in the BigCommerce Control Panel |
| show_wishlist | Site-wide boolean value that indicates whether to allow customers to create wishlists |
| base_url | The normal shop URL |
| client_ip_address | IP address of the customer browsing the store |
|country_code|The country code corresponding to the IP|
|request|object that contaisn details about the HTTP request|
| &#x21B3; referer|refer of the request|
| &#x21B3; host|hostname of the request|
| &#x21B3; user_agent|user agent string of the request|
| &#x21B3; is_crawler|renders "true" if user angent is known crawler; "false" otherwise
| &#x21B3; absolute_path|The absolute URL requested. **Never** use request.path in the actual body of the page<sup>1</sup>
| secure_base_url | The SSL-enabled, secure, shop URL |
| address | Store’s complete physical address, as entered by merchant in the [Store Profile](https://support.bigcommerce.com/s/article/Store-Profile-Settings)|
| store_name | Name of the BigCommerce store |
| store_logo | The store’s logo |
| &#x21B3; title | Title for the logo – the text configured in the control panel under Storefront Design Design Options Logo |
| &#x21B3; image | Optional image file, as a Stencil image object. To access the store_logo use: `{{settings.store_logo.image.data}}` and `{{settings.store_logo.image.alt}}` to access the alt tag. These are pulled from the Stencil image object. |
| privacy_cookie | If enabled, a string containing merchant-customizable text for (European Union–required) cookie-setting notification; if disabled, a boolean with a value of false |
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
| &#x21B3; product | Collection of product-related URLs |
| &nbsp; &nbsp; &#x21B3; post_review | URL to submit a Write Review form `/postreview.php`  |
| &#x21B3; cart | URL to the cart page `/cart.php` |
| &#x21B3; checkout  | Collection of checkout related URLs |
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
| &nbsp; &nbsp; &nbsp; &nbsp; &#x21B3; search | RSS feed of products matching the active search query |
| &nbsp; &nbsp; &nbsp; &nbsp; &#x21B3; search_atom | RSS feed of products matching the active search query, in Atom format |
| &nbsp; &nbsp; &#x21B3; blog | RSS feed of recent blog posts `/rss.php?action=newblogs&type=rss` |
| &nbsp; &nbsp; &#x21B3; blog_atom | RSS feed of recent blog posts, in Atom format `/rss.php?action=newblogs&type=atom` |
| &#x21B3; contact_us_submit | URL to submit the Contact Us form `/pages.php?action=sendContactForm`|
| &#x21B3; search | URL to submit a search request `/search.php` |
| &#x21B3; compare | A string String containing the URL to the products comparison page `/compare` |
| &#x21B3; sitemap | URL to the sitemap `/sitemap.php` |
| &#x21B3; subscribe | Collection of subscription-related URLs |
| &nbsp; &nbsp; &#x21B3; action | URL to which the the newsletter subscription will be submitted `/subscribe.php` |
| money | List of child items that define the store’s default currency formatting |
| &#x21B3; currency_token | Symbol for the currency |
| &#x21B3; currency_location | Whether currency symbol appears at left or right of the quantity |
| &#x21B3; decimal_token | Symbol for decimal separator |
| &#x21B3; decimal_places | Number of decimal places to display |
| &#x21B3; thousands_token | Symbol for thousands separator |
| returns_enabled | Boolean that indicates whether the control-panel setting for the returns system is enabled |
| tax_label | Defines the Tax Label (VAT, Sales Tax, etc.) that a merchant can set in the control panel’s Settings > Tax page for display to customers |
| add_this | Object that defines links for the AddThis social sharing component |
| &#x21B3; buttons | Array of buttons to display for AddThis social sharing `{{#each settings.add_this.buttons}}{{service}}{{/each}}` `{{#each settings.add_this.buttons}}{{annotations}}{{/each}}` |
| service | String containing the name of this button's social-media service (facebook, email, print, twitter, linkedin, google, etc.) |
| annotation | String containing HTML attributes associated with this button |
| maintenance | Object that manages information about the store when in maintenance (offline) mode |
| header | If store is in maintenance mode, string containing header text for the "Down for Maintenance" window displayed to visitors; otherwise, null |
| message | If store is in maintenance mode, string containing merchant-customizable body text (and optionally, HTML) for the "Down for Maintenance" window displayed to visitors; otherwise, null |
| notice | If store is in maintenance mode, one of three strings identifying the store's status, and generating a corresponding text notice to merchants about how to proceed: AdminPrelaunchNotice for preview stores, AdminMaintenanceNotice for active stores taken down for maintenance, or AdminHibernationModeNotice for deactivated stores; otherwise, null |
| phone_number | The contact phone number for the store located in the [stores profile](https://support.bigcommerce.com/s/article/Store-Profile-Settings).  |
| rss_item_limit | An integer that sets a limit on the number of RSS items to display |
| password_requirements | Collection of properties representing BigCommerce requirements for customer-account passwords: |
| alpha | Regular expression representing required/acceptable alphabetic characters |
| numeric | Regular expression representing required/acceptable numeric characters |
| minlength | Integer representing minimum acceptable password length |
| error | String that passes a standard error message for noncompliant passwords |
| measurements | Collection of units-of-measure definitions, to be used when displaying product details: |
| &#x21B3; length | Units of measure for product length |
| &#x21B3; weight | Units of measure for product weight |
| Time and date settings | The four settings below are configured in the control panel under **Store Setup > Store Settings > Language and Date > Date Settings** . Date formats follow php conventions. |
| store_time_zone | Store's time zone, as selected in the control panel's Your Timezone drop-down list |
| store_dst_correction | Whether or not this time zone observes Daylight Saving Time (boolean), as set by the control panel's Enable DST Correction check box |
| display_date_format | Brief display format/pattern for dates, as configured in the control panel's Display Date Format field |
| extended_display_date_format | Extended display format/pattern for dates, as configured in the control panel's Extended Display Date Format field |
| show_payment_methods | A boolean value. If true available payment methods on a store will be shown. If false they are hidden.  |
| as payments_url| Exposes the BigCommerce payments URL. `https://payments.bigcommerce.com`|
| secure_host | Returns the SSL url for a store. Example: `https://www.bigcommerce.com` |
| store_hash | Returns the store hash as a string.  |
|  is_eu_ip_address| A boolean value. Return true if the shoppers ip address is in the EU. |
| show_newsletter_box | Returns `1` if customers to allowed to subscribe to the [store newsletter](https://support.bigcommerce.com/s/article/Collecting-Newsletter-Subscriptions#newsletter). Returns `0` if customers are not able to subscribe. |
| show_newsletter_summary | Returns a `1` if the [newsletter summary](https://support.bigcommerce.com/s/article/Collecting-Newsletter-Subscriptions#newsletter) is shown. Returns `0` if it is now shown. If `show_newsletter_box` is `0` then `show_newsletter_summary` will also be `0`. |
| newsletter_summary | Returns the [newsletter summary](https://support.bigcommerce.com/s/article/Collecting-Newsletter-Subscriptions#newsletter) |
| amp_analytics_id | Returns Google AMP analytics ID |
| bulk_discount_enabled | Boolean that return `true` if bulk discount is enabled on products. |


<div class="HubBlock--callout">
<div class="CalloutBlock--">
<div class="HubBlock-content">
    
<!-- theme:  -->

> 1. Never use `{{settings.request.path}}` in the actual HTML of the page. Only use it for handlebars conditional log. Displaying this value in the HTML exposes the the page to injection attacks. 

</div>
</div>
</div>

