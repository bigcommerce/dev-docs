<h1>Scripts API</h1>
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    		<li><a href="#scripts_script-manager-partner-guidelines">Script Manager API Partner Guidelines</a></li>
        <li><a href="#script_prerequisites">Prerequisites</a></li>
        <li><a href="#scripts_upgrades-installation">Upgrades and Installation</a></li>
        <li><a href="#scripts_fixing-missing-scripts">Fixing Missing Scripts</a></li>
        <li><a href="#scripts_scripts-notes">Notes</a></li>
        <li><a href="#scripts_scripts-visibility">Visibility Locations </a></li>
	</ul>
</div>

---

The BigCommerce Scripts API gives developers the ability to inject scripts into a store's template files programmatically. This means that app and integrations can insert scripts into a user’s storefront without requiring the user to manually paste a snippet of code into their control panel. There are many use cases for this powerful API, for example:
* inserting analytics scripts
* inserting single-click app scripts
* inserting live chat and support plugins
* inserting theme extensions or connector apps

### Prerequisites

This article contains detailed information about the Scripts API and assumes you're familiar with BigCommerce App Installation process. For more information on the app installation process, see:
[App Installation](/api-docs/getting-started/building-apps-bigcommerce/building-apps#building-apps_installation-update-sequence)

---

<a href='#scripts_script-manager-partner-guidelines' aria-hidden='true' class='block-anchor'  id='scripts_script-manager-partner-guidelines'><i aria-hidden='true' class='linkify icon'></i></a>

## Script Manager API Partner Guidelines

With the Script Manager API, your Apps now have the ability to insert scripts into a user’s storefront without requiring the user to manually paste a snippet of code into their control panel. You can freely update these scripts while your App is installed, and, if desired, automatically remove scripts if your App is uninstalled.

For Apps being installed on our latest theme engine (Stencil), this process is relatively straightforward. However, if your App is already live, you may have already asked merchants to paste a code snippet in one of these two sections in the control panel:

- Footer Scripts
- Web Analytics

Also, since our older (Blueprint-based) themes do not support the Script Manager API, you’ll still need some way of providing users of older themes the documentation they need, without burdening users of newer themes with additional, unnecessary steps.

To help you transition to the Script Manager API, we’ve provided some recommended strategies to deal with these different situations. 

#### Stencil vs Blueprint

As mentioned above, BigCommerce supports two theme engines: Stencil and Blueprint. Stencil is our latest technology, and all new stores only have access to Stencil themes. However, older stores may still be using our legacy theme engine, Blueprint, which does not have the ability to render scripts inserted through the Script Manager API.

Because of this, you’ll need to check whether a user is running Stencil to determine if their store supports the Script Manager API. To do this, use the [Get Store Information API](https://developer.bigcommerce.com/api/v2/#store-information-reference) endpoint and check the `stencil_enabled` flag. (requires [store_v2_information_read_only scope](https://developer.bigcommerce.com/api/#oauth-scopes)).

---

<a href='#scripts_script-prerequisites' aria-hidden='true' class='block-anchor'  id='scripts_script-prerequisites'><i aria-hidden='true' class='linkify icon'></i></a>

## Prerequisites

To better understand the content of this document, you should be familiar with the app installation procedure, which is outlined here:
[App Installation](/api-docs/getting-started/building-apps-bigcommerce/building-apps#building-apps_installation-update-sequence)

---

<a href='#scripts_upgrades-installation' aria-hidden='true' class='block-anchor'  id='scripts_upgrades-installation'><i aria-hidden='true' class='linkify icon'></i></a>

## Upgrades and Installation

### Installing An App on Stencil

For Apps being installed on Stencil stores, we recommend inserting your scripts immediately after receiving the POST response during the Auth Callback flow. Add your scripts using the Create Script endpoint of the Script Manager API.

We highly recommend leaving the auto_uninstall flag set to true, so that your App will properly clean itself up when uninstalled. More information about this flag can be found <a href="#script_object-properties">here</a>.

#### Upgrading Existing Apps on Stencil

If your App has already been released, you may have existing users with pasted-in code somewhere in their control panel. There are a few possible ways to deal with this situation.

1.) __Do nothing__

If you don’t need to upgrade existing merchants to the Script Manager API, it’s perfectly fine to leave them as-is. You’ll need to maintain documentation for the manual uninstallation process so that merchants with older installations know what to clean up, and you won’t be able to automatically update or add scripts for these users. 

2.) __Prompt merchants to upgrade__

If you want your merchants to gradually update to the new Script Manager over time, you can prompt them to do so on your App’s landing page. You’ll need to keep track of which of your merchants are not using the Script Manager yet to know whether you need to display this prompt. Also, make sure to check that they are running Stencil (via the Get Store Information endpoint) before prompting them to upgrade.

Once a user decides to upgrade, you can walk them through removing the old pasted-in code in their control panel, and then, once the merchant clicks a button, install your scripts through the Script Manager API.

3.) __Silently upgrade to the Script Manager API__

Finally, if it’s possible for your old, pasted-in scripts to live alongside the new Script Manager API scripts, you may be able to upgrade to using the Script Manager API without any user intervention being required. Whether or not this is possible will vary depending on the implementation of your App.

While your merchants will be loading more data on their storefront pages than necessary, this method will allow you to transition to using the Script Manager API for all of your installations immediately. Keep in mind you’ll still need to document the manual uninstallation process for existing installations.

### Installing Apps on Blueprint Stores 

As mentioned, the Blueprint theme engine does not support the Script Manager API. Any scripts inserted through this API will not be rendered on any storefront pages. To prevent unpredictable behavior should a user change their theme, we highly recommend checking the Get Store Information endpoint for Stencil support prior to installing any scripts through the Script Manager API. Additionally, you’ll still want to show the old manual installation steps when a store does not support Stencil. 

### Existing Blueprint Installations 

Existing blueprint installations won’t be affected, but remember that if you are prompting existing Stencil users to upgrade to the Script Manager, you’ll want to suppress this message for Blueprint users. 

---

<a href='#scripts_fixing-missing-scripts' aria-hidden='true' class='block-anchor'  id='scripts_fixing-missing-scripts'><i aria-hidden='true' class='linkify icon'></i></a>

### Fixing Missing Scripts

It’s possible that your App installation may find itself unexpectedly missing one or more scripts. Below are some possible causes of this issue.

1.) __The Merchant Deleted Your Script__ 

Merchants are given a warning when attempting to delete a script belonging to an App, but we do allow them to do so.

If you want to handle this situation gracefully, we recommend you check the [Get Scripts](/api-reference/storefront/content-scripts-api/scripts/getscripts) endpoint on your App Detail Page (returned by the [Load Callback URI](/api-docs/getting-started/building-apps-bigcommerce/building-apps#building-apps_processing-signed-payload) to determine whether the expected scripts are present. If they are not, you can prompt the user to click a button to automatically repair their installation.

We ask that you request the user’s permission rather than doing this automatically, as they may have had a good reason for deleting the missing script. 

2.) __The Merchant's Theme is Not Set Up Correctly__ 

In order to render scripts, the theme templates must have the handlebars expressions {{head.scripts}} and {{footer.scripts}} in the pages where scripts should be rendered. If either of these is absent, scripts on that page with location set to head or footer (respectively) will not be rendered.

Of particular note, {{head.scripts}} was only recently added to the checkout and order confirmation pages in our Cornerstone theme, and widespread adoption of this standard outside of Cornerstone is still an ongoing process.

To ensure your App is compatible with as many themes as possible, we recommend footer over head for checkout, order_confirmation and all_pages visibilities. 

3.) __Scripts Are Not Rendering in the Checkout and Order Confirmation__ 

In order to render scripts, the store must have BigCommerce’s Optimized one-page checkout enabled. This is the default checkout type for all new Stencil stores. Existing stores have to manually change the checkout type as detailed in this article. 

Stencil themes from the marketplace support the [Optimized One-Page Checkout](https://support.bigcommerce.com/articles/Public/Optimized-Single-Page-Checkout#signup). However, there could be instances where the merchant maintains their own private theme and the theme has not been updated to support the Optimized one-page checkout. In this case, the merchant is required to add the theme support, following the steps [here](https://stencil.bigcommerce.com/docs/optimized-checkout-prereqs).  

---

<a href='#scripts_scripts-notes' aria-hidden='true' class='block-anchor'  id='scripts_scripts-notes'><i aria-hidden='true' class='linkify icon'></i></a>

## Notes

- If you are injecting scripts into the Checkout, you will need to update the scope to Checkout Content. Accounts can only be created by the [store owner](https://support.bigcommerce.com/articles/Public/Store-API-Accounts/).
- Merchants will be able to see the scripts installed on the store in the Control Panel. Within the native tag manager, merchant actions will be limited to viewing a script and deleting a script.
- Scripts can be located in the header `{{head.scripts}}` or footer `{{footer.scripts}}`.
- Scripts Manager is only for Stencil themes. Blueprint store users will still need to copy and paste in code.
- The current visibility options are `storefront`, `checkout`, `all_pages` and `order_confirmation`.
- Scripts injected via the Scripts API will not render when you are developing a theme locally via Stencil CLI.

---

<a href='#scripts_scripts-visibility' aria-hidden='true' class='block-anchor'  id='scripts_scripts-visibility'><i aria-hidden='true' class='linkify icon'></i></a>

## Script Visibility Locations

| Scope | Visibility |
| -- | -- |
| `all_pages` | Add Wishlist </br> Blog List </br> Blog Post</br> Brand Pages </br> All Brands Page </br> Cart </br> Category </br> Checkout </br> Checkout </br> Product Compare </br> Order Confirmation </br> Page </br> Contact Form </br> Product </br> Search </br> All Wishlist </br> Wish List |
| `storefront` |  Add Wishlist </br> Blog List </br> Blog Post</br> Brand Pages </br> All Brands Page </br> Cart </br> Category </br> Checkout </br> Checkout </br> Product Compare </br> Page </br> Contact Form </br> Product </br> Search </br> All Wishlist </br> Wish List |
| `checkout` | Checkout | 
| `order_confirmation` | Order Confirmation | 

Scripts can not be injected to:
- giftcertificates.php
- sitemap.php
- account.php
- login.php
- 404 pages

---


<a href='#scripts_related-endpoints' aria-hidden='true' class='block-anchor'  id='scripts_related-endpoints'><i aria-hidden='true' class='linkify icon'></i></a>

## Resources

## Related Endpoints
* [Scripts](/api-reference/content/content-scripts-api)

