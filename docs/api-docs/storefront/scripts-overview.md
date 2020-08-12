# Scripts API
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    	<li><a href="#scripts_script-manager-partner-guidelines">Script Manager API partner guidelines</a></li>

        <li><a href="#script_prerequisites">Prerequisites</a></li>
        <li><a href="#scripts_upgrades-installation">Upgrades and installation</a></li>
        <li><a href="#scripts_fixing-missing-scripts">Fixing missing scripts</a></li>
        <li><a href="#scripts_scripts-notes">Notes</a></li>
        <li><a href="#scripts_scripts-visibility">Visibility locations </a></li>
	</ul>
</div>

The BigCommerce Scripts API gives developers the ability to inject scripts into a store's template files programmatically. This ability means that apps and integrations can insert scripts into a user’s storefront without requiring the user to paste a snippet of code into their control panel manually. You can insert many types of scripts using this API, including the following:

* inserting analytics scripts
* inserting single-click app scripts
* inserting live chat and support plugins
* inserting theme extensions or connector apps

## Script Manager API partner guidelines


With the Script Manager API, your apps now can insert scripts into a user’s storefront without requiring the user to paste a snippet of code into their control panel manually. After installing your app, you can freely update these scripts and, if desired, automatically remove scripts if you uninstall your app.

The process of installing apps on our latest theme (Stencil) is relatively straightforward. However, if your app is already live, you may have already asked merchants to paste a code snippet in one of these two sections in the control panel:

- Footer Scripts
- Web Analytics

Also, since our older (Blueprint-based) themes do not support the Script Manager API, you’ll still need some way of providing users of older themes the documentation they need, without burdening users of newer themes with additional, unnecessary steps.

To help you transition to the Script Manager API, we’ve provided some recommended strategies to deal with these different situations. 

#### Stencil vs Blueprint

As mentioned above, BigCommerce supports two theme engines: Stencil and Blueprint. Stencil is our latest technology, and all new stores only have access to Stencil themes. However, older stores use our legacy theme engine, Blueprint, which cannot render scripts inserted through the Script Manager API.

Because of this, you’ll need to check whether a user is running Stencil to determine if their store supports the Script Manager API. To do this, use the [Get Store Information API](https://developer.bigcommerce.com/api/v2/#store-information-reference) endpoint and check the `stencil_enabled` flag. (requires [store_v2_information_read_only scope](https://developer.bigcommerce.com/api/#oauth-scopes)).

## Prerequisites
This article contains detailed information about the Scripts API and assumes you're familiar with BigCommerce App Installation process. For more information on the app installation process, see [App Installation](/api-docs/getting-started/building-apps-bigcommerce/building-apps#building-apps_installation-update-sequence)

## Upgrades and installation

### Installing an app on Stencil

We recommend inserting your scripts immediately after receiving the POST response during the Auth Callback flow for apps installed on Stencil stores. Add your scripts using the Create Script endpoint of the Script Manager API.

We highly recommend leaving the `auto_uninstall` flag set to true, so that your app will properly clean itself up when uninstalled. Find more information about this flag <a href="#script_object-properties">here</a>.


#### Upgrading Existing Apps on Stencil

If you already released your app, you may have existing users with pasted-in code somewhere in their control panel. There are a few possible ways to deal with this situation.

__Do nothing__


If you don’t need to upgrade existing merchants to the Script Manager API, it’s perfectly fine to leave them. You’ll need to maintain documentation for the manual uninstallation process so that merchants with older installations know what to clean up. You won’t be able to update or add scripts for these users automatically. 

 __Prompt merchants to upgrade__


If you want your merchants to update to the new Script Manager over time, you can prompt them to do so on your app’s landing page. You’ll need to keep track of which of your merchants are not using the Script Manager to know whether you need to display this prompt. Make sure to check that they are running Stencil (via the Get Store Information endpoint) before prompting them to upgrade.

Once a user decides to upgrade, you can walk them through removing the old pasted-in code in their control panel, and then, once the merchant clicks a button, install your scripts through the Script Manager API.

__Silently upgrade to the Script Manager API__


Finally, suppose your old, pasted-in scripts can live alongside the new Script Manager API scripts. In that case, you may be able to upgrade to using the Script Manager API without any user intervention required. Whether or not this is possible will vary depending on the implementation of your app.

While your merchants will be loading more data on their storefront pages than necessary, this method will allow you to transition to using the Script Manager API for all of your installations immediately. Keep in mind you’ll still need to document the manual uninstallation process for existing installations.

### Installing apps on Blueprint stores 

As mentioned, the Blueprint theme engine does not support the Script Manager API. You will not be able to render any scripts inserted through this API on any storefront pages. To prevent unpredictable behavior, should a user change their theme, we highly recommend checking the Get Store Information endpoint for Stencil support before installing any scripts through the Script Manager API. Additionally, you’ll still want to show the old manual installation steps when a store does not support Stencil. 

### Existing Blueprint installations 

Existing blueprint installations won’t be affected, but remember that if you prompt existing Stencil users to upgrade to the Script Manager, you’ll want to suppress this message for Blueprint users. 

### Fixing missing scripts

It’s possible that your app installation may find itself unexpectedly missing one or more scripts. Below are some possible causes of this issue.

1.) __The merchant deleted your script__ 

Merchants receive a warning when attempting to delete a script belonging to an app, but we do allow them to do so.

To handle this situation gracefully, we recommend you check the [Get Scripts](/api-reference/storefront/content-scripts-api/scripts/getscripts) endpoint on your App Detail Page (returned by the [Load Callback URI](/api-docs/getting-started/building-apps-bigcommerce/building-apps#building-apps_processing-signed-payload) to determine whether the expected scripts are present. If they are not, you can prompt the user to click a button to repair their installation automatically.

We ask that you request the user’s permission rather than doing this automatically, as they may have had a good reason for deleting the missing script. 

2.) __The merchant's theme is not set up correctly__ 

The theme templates must have the handlebars expressions {{head.scripts}} and {{footer.scripts}} in the pages to render scripts. If either of these is absent, scripts on that page with location set to head or footer (respectively) will not render correctly.

Of particular note, {{head.scripts}} was only recently added to the checkout and order confirmation pages in our Cornerstone theme, and widespread adoption of this standard outside of Cornerstone is still an ongoing process.

To ensure your app is compatible with as many themes as possible, we recommend footer overhead for checkout, order_confirmation, and all_pages visibilities. 

3.) __Scripts are not rendering in the checkout and order confirmation__ 

To render scripts, the store must have BigCommerce’s Optimized one-page checkout enabled. This is the default checkout type for all new Stencil stores. Existing stores have to change the checkout type as detailed in this article manually. 

Stencil themes from the marketplace support the [Optimized One-Page Checkout](https://support.bigcommerce.com/articles/Public/Optimized-Single-Page-Checkout#signup). However, there could be instances where the merchant maintains their private theme without the ability to support the Optimized one-page checkout. In this case, the merchant must add the theme support, following the steps [here](https://stencil.bigcommerce.com/docs/optimized-checkout-prereqs).  

## Notes

- If you are injecting scripts into the checkout, you will need to update the scope to Checkout Content. The [store owner](https://support.bigcommerce.com/articles/Public/Store-API-Accounts/) can only create accounts.
- Merchants will be able to see the scripts installed on the store in the Control Panel. Within the native tag manager, merchant actions are limited to viewing and deleting a script.
- Scripts can be located in the header `{{head.scripts}}` or footer `{{footer.scripts}}`.
- Scripts Manager is only for Stencil themes. Blueprint store users will still need to copy and paste in code.
- The current visibility options are `storefront`, `checkout`, `all_pages`, and `order_confirmation`.
- Scripts injected via the Scripts API will not render when you are developing a theme locally via Stencil CLI.
- Each app can have 10 scripts. 
- You can install up to five scripts in a single call. 

```js
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'GA_TRACKING_ID');
</script>
```

## Script Visibility Locations

| Scope | Visibility |
| -- | -- |
| `all_pages` | Add Wishlist </br> Blog List </br> Blog Post</br> Brand Pages </br> All Brands Page </br> Cart </br> Category </br> Checkout </br> My Account </br> Product Compare </br> Order Confirmation </br> Page </br> Payment Methods</br> Login </br> Contact Form </br> Product </br> Search </br> All Wishlist </br> Wish List <br> 404 page |
| `storefront` |  Add Wishlist </br> Blog List </br> Blog Post</br> Brand Pages </br> All Brands Page </br> Cart </br> Category </br> Product Compare </br> Page </br> Contact Form </br> My Account </br> Product </br> Search </br> All Wishlist </br> Login </br> Wish List <br> 404 page|
| `checkout` | Checkout | 
| `order_confirmation` | Order Confirmation | 

Scripts can not be injected to:
- giftcertificates.php
- sitemap.php


## Resources

## Related Endpoints
* [Scripts](/api-reference/content/content-scripts-api)
