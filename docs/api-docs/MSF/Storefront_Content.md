# Storefront & Content

## Scripts

Scripts are associated with a particular Site. Any Scripts that were created previously have been assigned to the default Site (which has an id of `1000` on each store). If you do not supply a `site_id` when creating a Script, it will be assigned to the default Site. In order to support multi-storefront stores, you should explicitly assign Scripts to the appropriate Site on which they are intended to render. If you want the exact same Script to show up on several Sites, you must create the Script on each site.

<a target="_blank" href="https://cdn11.bigcommerce.com/s-grief/content/dev-docs/scripts-diagram.png">
  <img src="https://cdn11.bigcommerce.com/s-grief/content/dev-docs/scripts-diagram.png">
</a>

[Scripts API reference documentation](https://developer.bigcommerce.com/api-reference/store-management/scripts)

From a UX perspective, you may wish to prompt merchants who are setting up your app to pick one or more storefront Sites on which your app's storefront functionality should be installed. It is also adviseable to provide a way to remove your Scripts from each Site, or install them on new Sites the merchant creates as they expand their business.

## Pages

Pages are associated with a particular Site. Any Pages that were created previously have been assigned to the default Site (which has an id of `1000` on each store).

<a target="_blank" href="https://cdn11.bigcommerce.com/s-grief/content/dev-docs/pages-diagram.png">
  <img src="https://cdn11.bigcommerce.com/s-grief/content/dev-docs/pages-diagram.png">
</a>

[Pages API reference documentation](https://developer.bigcommerce.com/api-reference/store-management/store-content/pages/getallpages)

A new V3 Pages API has been exposed to service multi-storefront use cases, while also providing several of the usual efficiency benefits of V3 APIs over their V2 equivalents. This new V3 Pages API has `site_id` as a required parameter.

If your application reads Pages-related data, be sure to filter by the appropriate `site_id` when dealing with a particular Site. Similarly, when writing new Pages, be sure to provide the correct `site_id`.

## Widgets

Widget Templates, Widgets, and Placements are all associated with a particular Site. Any previously existing objects have been assigned to the default Site (which has an id of `1000` on each store).

Going forward, it is recommended to interact directly with the appropriate `site_id` for the storefront you are managing content for using the filters supplied on each endpoint, and be sure to write the correct `site_id` when creating new objects.

## 301 Redirects

<a target="_blank" href="https://cdn11.bigcommerce.com/s-grief/content/dev-docs/redirects-diagram.png">
  <img src="https://cdn11.bigcommerce.com/s-grief/content/dev-docs/redirects-diagram.png">
</a>

[Redirects API documentation](https://developer.bigcommerce.com/api-reference/store-management/redirects)

Redirects are associated with a particular Site. Any Redirects that were created previously have been assigned to the default Site (which has an id of `1000` on each store).

A new V3 Redirects API has been exposed to service multi-storefront use cases, while also providing several of the usual efficiency benefits of V3 APIs over their V2 equivalents. This new V3 Redirects API has `site_id` as a required paramter.

If your application reads Redirects-related data, be sure to filter by the appropriate `site_id` when dealing with a particular Site. Similarly, when writing in new Redirects, be sure to provide the correct `site_id`.

## Themes

Previously, the Theme `/activate` endpoint would accept a `variation_id` and a `which` value.

To support application of stores to different storefront Sites, you must now _instead_ supply a `site_id` and `configuration_id` to indicate exactly which storefront you wish to apply a Theme to, and which set of theme settings (Configurations) should be used.

<a target="_blank" href="https://cdn11.bigcommerce.com/s-grief/content/dev-docs/themes-diagram.png">
  <img src="https://cdn11.bigcommerce.com/s-grief/content/dev-docs/themes-diagram.png">
</a>

[Themes API documentation](https://developer.bigcommerce.com/api-reference/store-management/themes)

To understand which Theme is active for a particular Site, you can check the `/v3/sites/ID/active-theme` endpoint.

Themes themselves have remained "global" to the store, but each Theme now exposes a list of Configurations which are any sets of theme settings which have been created for the Theme. Each Theme has a default set of settings, but additional settings can be created by using the Page Builder feature in the BigCommerce control panel, or by creating new Configurations with the public API.

Instead of downloading Themes by using the `/themes/{uuid}/actions/download` endpoint to create a download job, you can instead download the Theme (with its default Configuration) by simply using the `download_url` on the `/themes` collection GET endpoint. This download does not require any processing so it's much faster, but will only contain the default Configuration inside the theme. You can then merge the theme files with any Configuration of your choosing from the `/v3/themes/{uuid}/configurations` endpoint.

**Note:** Since each Theme can define its own Configuration, the JSON response on the Theme Configurations endpoint may differ for each Theme. The Configuration will be a valid JSON object, and will match the theme's Schema. A `/v3/themes/{uuid}/configurations/validate` endpoint can be used to test a potential configuration against the theme's Schema to validate it.

