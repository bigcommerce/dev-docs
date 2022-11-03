# Custom Templates

The Stencil framework allows theme developers and merchants to assign custom layout templates to storefront pages. You can assign custom templates to the following storefront page types:

* Brand
* Category
* Product
* Page

This section explains how to author a custom template, map it to a URL, upload it to BigCommerce, and apply it to a storefront as a theme.

<!-- theme: warning -->
> #### Stencil versus blueprint themes
> If you are migrating from BigCommerce's legacy Blueprint themes framework, keep in mind these differences in how Stencil handles custom templates:
> * The brand option is entirely new in Stencil. If you are running on a Blueprint theme, you will not be able to create a custom template for brand pages.
> * Unlike Blueprint, Stencil does not require that custom template file names start with an underscore.
> * In the current Stencil release, you must create and bundle custom templates using Stencil CLI before you can upload the custom templates to stores. After you have created and uploaded templates, authorized store users can assign them to storefront pages through the control panel.


## Authoring a custom template

If you are a theme developer, your first step is to create a custom template page.

To create a custom page:

1. In the control panel navigate to **Storefront > Web Pages** in a non-active MSF-enabled control panel or if MSF is active on your store go to **Channel Manager > Channels > Edit Settings > Web Pages**. 
2. First, create a `custom` subdirectory in the `templates/pages` directory. 
3. Then, create the following four subdirectories under the `templates/pages/custom` directory: 

* brand
* category
* product
* page

4. Next, create the template file in .html format, and then place the file in the appropriate `templates/pages/custom/` subdirectory.

<!-- theme: warning -->
> #### File permissions required
> Make sure to set following permissions:

* `755 (drwxr-x-r-x)` on all new subdirectories
* `644 (rw-r–r–)` on all new files 

> Without these permissions, running your theme locally will fail with multiple error messages. You also will not be able to bundle your theme and the theme won't be uploaded to the store.

## Mapping a Template to a URL

### Mapping requirements and options

The requirements and options for mapping the `.stencil` or `config.stencil.json` (if using Stencil V3.1 release or later) template files to URLs are as follows:

* Each mapped URL must point to a URL for a brand, category, product, or static page that is already configured in the store. You cannot insert a placeholder URL that consists of an arbitrary string of letters, such as /abcdefghijklmnop/.

* The trailing slash is optional for each URL.

* The HTML files must reside in one of the following four subdirectories: brand, category, product, or page.

* When mapping URLs, make sure to convert any special characters to their [URL-encoded equivalents](https://www.urlencoder.org/).

* After editing your `.stencil` or `config.stencil.json` files (if you are using Stencil V3.1 release or later), you must restart the Stencil app to view your changes locally. 
To restart stencil, type `stencil start` at a command prompt, and append the appropriate switches for your workflow, for example: `stencil start -e -n`.

### Local mapping and testing
When you create a local custom template page for products, you expect that page to have access to all Stencil product objects. To enable custom template pages to access Stencil objects, the server has been configured to look at the page type of the URL where you mapped the template.

To test your custom templates locally, edit your `.stencil` or `config.stencil.json` file (if you are using Stencil V3.1 release or later) to create mappings between each local template and a corresponding URL. In the `.stencil` file or `config.stencil.json` file, look for the following section:

```json title="customLayouts properties config.stencil.json" lineNumbers
"customLayouts": {
    "product": {},
    "brand": {},
    "category": {},
    "page": {}
  }
```

In this section, populate each key with a URL to create a mapping. For example, if you have a custom product template named alternate-product.html, and you want to view that template locally at http://localhost:3000/test-url/, you need to populate the product key as shown in the following example:

```json title="Populate product key" lineNumbers
"product": {
    	"alternate-product.html":"/test-url/"
},
```
### Expanded mapping example

The following code sample provides a more extensive example where the brand, page, and category keys are also populated:

```json title="Populated brand, page, and category keys" lineNumbers
{
  "normalStoreUrl": "http://cornerstone-light-demo.mybigcommerce.com",
  "port": 3000,
  "username": "stencil",
  "token": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "customLayouts": {
    "product": {
      "custom-product.html": "/custom-product/"
    },
    "brand": {
      "custom-brand.html": "/brands/custombrand/"
    },
    "page": {
      "custom-page.html": "/custom-page/"
    },
    "category": {
      "custom-category.html": "/custom-category/"
    }
  }
}
```
In the final entry of the `.stencil` or `config.stencil.json` (if you're using Stencil V3.1 release or later) configuration example above, the server will look at the `/custom‑category/` URL within the store, deduce that the page type is *category*, and return a category context to Stencil CLI. This allows Stencil CLI to properly display the page in the browser when you visit `http://localhost:3000/custom‑category/` locally, or when shoppers visit the corresponding public store page.

### Mapping multiple URLs

In addition to mapping a single array to a URL you can also map an array of URLs to each template. This is shown in the following example for the product template:


```json title="Map multiple URLs" lineNumbers
  "customLayouts": {
    "product": {
      "featured-product.html": ["/special-product-one", "/special-product-two"],
      "clearance-product.html": "/clearance-product"
    },
    "brands": {},
    "categories": {},
    "page": {}
  }
```

## Specifying custom front matter

You can add front matter directly to a custom template. For more information on using front matter, see [Using Front Matter](/stencil-docs/storefront-customization/using-front-matter) 

The following example shows how to add front matter data to the `templates/pages/custom/brand/custom-brand.html` file. 


<!-- 
type: tab
title: Custom template - custom-brand.html
-->
  
```handlebars title="Example: Specifying front matter in custom templates"
---
brand:
  products:
     limit: {{theme_settings.brandpage_products_per_page}}
cart: true
---
<div>...</div>
```

<!-- type: tab-end -->


## Uploading a theme 

Before you can apply your custom template to pages you need to bundle and push the theme to BigCommerce. For detailed instructions, see [Bundling and Pushing a Theme](/stencil-docs/deploying-a-theme/bundling-and-pushing).

## Applying custom templates to pages

After a new theme has been uploaded to BigCommerce, the merchant (or any authorized store user) can assign the custom templates to individual store pages in the BigCommerce control panel to make it live on the storefront.

## Applying custom template associations

Using the Custom Template Associations API, you can update template layout files applied to your product for non-default channels. You can overwrite the template for existing records with the same channel ID, entity ID, and type. For more information, see the [Upsert Custom Template Associations](https://developer.bigcommerce.com/api-reference/69377d30c3d6e-upsert-custom-template-associations) API endpoint.

## Troubleshooting template authoring

See [Applying a Custom Template](https://support.bigcommerce.com/s/article/Stencil-Themes#custom-template) (BigCommerce Knowledge base) for more information.

## Troubleshooting custom templates

This section provides solutions to some known problems that may occur when you author and test custom templates.

### Viewing custom brand templates Locally

If you are having trouble viewing custom brand templates locally, ensure that the URL used in your `.stencil` or `config.stencil.json` file (if you're using Stencil V3.1 release or later) adheres to the following path sequence: /brands/brandname

This is necessary because all the brand pages are located under the /brands/ URL path. Also, remember that all brand URLs are Unicode-encoded and adhere to Unicode formatting For example if your URL uses a hypen, you should it with *%252d*.

### Outdated Stencil CLI

If you have an old version of Stencil CLI installed, custom templates may not be supported and you need to update your CLI. To update CLI, issue the following command:
`npm install -g bigcommerce/stencil-cli`

## Resources

### Related Articles
* [Blueprint Themes](/legacy/blueprint-themes)
* [Applying a Custom Template](https://support.bigcommerce.com/s/article/Stencil-Themes#custom-templates) (BigCommerce Knowledge Base)

### Additional Resources

* [Custom Templates Video Demo](//youtube.com/watch?v=qgaDX7bhmd8) (YouTube)
