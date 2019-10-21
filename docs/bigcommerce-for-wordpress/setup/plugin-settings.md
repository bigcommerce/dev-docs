<div><h3 class="sub-docs-type" id="bigcommerce-for-wordpress">BigCommerce for Wordpress</h3>

# Plugin Settings

<div class="otp" id="no-index">

### On This Page
- [Product Sync](#product-sync)
- [Cart Settings](#cart-settings)
- [Theme Customizer](#theme-customizer)
- [Navigation Menus](#navigation-menus)
- [Reviews](#reviews)
- [Gift Certificate Settings](#gift-certificate-settings)

</div>

BigCommerce settings for WordPress are found in the left admin menu in WordPress, under the BigCommerce menu item.

<!--
    title: #### Plugin Settings

    data: //s3.amazonaws.com/user-content.stoplight.io/6012/1540476609033
-->

#### Plugin Settings
![#### Plugin Settings
](//s3.amazonaws.com/user-content.stoplight.io/6012/1540476609033 "#### Plugin Settings
")

## Product Sync
Once the plugin is connected, the plugin will import products using the BigCommerce API. This will run automatically using [WordPress cron](https://developer.wordpress.org/plugins/cron/), using the schedule set on the settings page (default: every five minutes).
If you choose to disable the cron job, you can set a server-side cron job to run the sync using WP-CLI. The command to import products is:

`wp bigcommerce import products`

Product titles, descriptions, and post statuses can be edited in the WordPress admin. Your changes will be automatically synced with your BigCommerce channel and preserved during future imports.

## Cart Settings

When the cart is enabled, visitors to your store can add products to carts before checkout. If it is disabled, the “Add to Cart” button becomes a “Buy Now” button, sending customers directly to checkout for that product. When the cart is enabled, the plugin will automatically create a page to host the cart shortcode, `[bigcommerce_cart]`. This shortcode will show the current visitor’s cart. To use a different page as your Cart page, first create a page, insert the cart shortcode, then come back to the settings page and select it from the dropdown. Note: the plugin automatically creates this page.

### Currency Settings

The store’s currency code will be imported from the BigCommerce API as part of the product import process. If the PHP intl extension is available on your server, there is nothing else to configure. If it is not available, you will be presented with additional fields to control currency formatting. These will also be populated automatically from the API. Currency formatting can be filtered using the `bigcommerce/currency/format` filter.

### Accounts and Registration

User accounts in WordPress will be connected to customer accounts in BigCommerce. If user registration is enabled in WordPress (the “Anyone can register” checkbox in **Settings** › **General** in the WordPress admin), customers will be able to register accounts and manage their profiles. 

The plugin requires several pages to support user account management. These pages will all be created automatically. Each will contain a shortcode that renders the relevant content. If any are deleted, they will be automatically re-created for you. If you have multiple pages with these shortcodes, you may select which will be treated as canonical using the dropdowns in this settings section. 

The “Support Email” field will be used to give customers an address to contact you with questions about orders.
The cart page should be excluded from any page caching system enabled for your site.

## Theme Customizer
The visual presentation of your store can be customized using the WordPress theme customizer. Open the theme customizer and find the "BigCommerce" panel, which contains several sections.

* **Buttons:** Control the labels applied to buttons for interacting with products.  

* **Colors & Themes:** Customize colors to better match your theme.
  
* **Catalog Pages:** Control the presentation of lists of products. 
 
* **Product Single:** Control the presentation of individual product pages.  

* **Product Archive:** Customize labels and filters for the prouct archive.

## Navigation Menus

The BigCommerce for WordPress plugin creates several pages, which can be added to the WordPress navigation menus using the standard WordPress admin(**Appearance** › **Menus**, or in the theme customizer). 
Some of these pages acquire special functionality when they are added to navigation menus:

* **Cart:** The cart menu item will show the number of items in the current user's cart.
  
* **Login:** If the user is logged in, the login page menu item becomes a link to log out.
  
* **Register:** If user registration is disabled, the menu item will be disabled (it won't render on the front end of the site). If the user is logged in, the menu item will link to the user's account profile.  
* **Account Profile, Order History, Addresses:** If the user is not logged in, these menu items will be disabled (they won't render on the front end of the site).

## Reviews
Reviews placed on the WordPress store are synced to BigCommerce for permanent storage as well as usage on other channels. Additionally, reviews are stored in a local, custom database for quick access.
The review system on WordPress is enabled or disabled by the site’s Comments setting, under Settings → Discussion in the WordPress admin. Additionally, each product has a Comments switch which can be used to override the global settings.

## Gift Certificate Settings
If the gift certificate setting is enabled in WordPress, shoppers will be able to purchase gift certificates from the site. Gift certificate functionality relies on two pages that are automatically created by the plugin. Both pages can be replaced by pages you create containing the appropriate shortcodes.

* Gift Certificate Page: The page where customers purchase gift certificates. 
Use the shortcode `[bigcommerce_gift_form]`

* Gift Certificate Balance Page:
The page where customers can check their gift certificate balance. Use the shortcode`[bigcommerce_gift_balance]`
