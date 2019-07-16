<h1>Authoring, Testing, and Uploading Custom Templates</h1>

<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
		<li><a href="#authoring-testing-uploading_authoring">Authoring Templates</a></li>
    <li><a href="#authoring-testing-uploading_local-mapping">Local Mapping and Testing</a></li>
		<li><a href="#authoring-testing-uploading_theme-upload">Theme Upload</a></li>
		<li><a href="#authoring-testing-uploading_troubleshooting">Troubleshooting Template Authoring</a></li>
	</ul>
</div>

<a href='#authoring-testing-uploading_authoring' aria-hidden='true' class='block-anchor'  id='authoring-testing-uploading_authoring'><i aria-hidden='true' class='linkify icon'></i></a>

## Authoring a Custom Template

As a the theme developer, you must first create the `custom` subdirectory in the `templates/pages` directory, and four required subdirectories inside of it (brand, category, product, page), which will result in the following directory paths:

* <span class=”fp”>templates/pages/custom/brand</span> 
* <span class=”fp”>templates/pages/custom/category</span>
* <span class=”fp”>templates/pages/custom/product</span>
* <span class=”fp”>templates/pages/custom/page</span>

Next,  create the template HTML files, and then place them in the appropriate `<theme-name>/templates/pages/custom/` subdirectories corresponding to the types listed above. 

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">
    
<!-- theme: warning -->

### Subdirectory/File Permissions Required
> Be sure to set permission `755 (drwxr-x-r-x)` on any new subdirectories that you add.
Also, be sure to set permission `644 (rw-r–r–)` on any new files that you add.

Without these permissions, running your theme locally will fail with multiple error messages.
Bundling your theme will also fail, blocking its upload to a store.

</div>
</div>
</div>

---

<a href='#authoring-testing-uploading_local-mapping' aria-hidden='true' class='block-anchor'  id='authoring-testing-uploading_local-mapping'><i aria-hidden='true' class='linkify icon'></i></a>

## Local Mapping and Testing

To test your custom templates locally, you must edit your `<theme-name>/.stencil` file to create mappings between each local template and a corresponding URL. Within the `.stencil` file, look for the following section:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name"></div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: ""
subtitle: ""
lineNumbers: true
-->

```json
"customLayouts": {
    "product": {},
    "brand": {},
    "category": {},
    "page": {}
  }
```

In this section, you would populate keys to create mappings. As a simple example, assume that you have a product custom template named alternate-`product.html`, and you want to see that template locally at the URL: `http://localhost:3000/test-url/`. In this case, you must populate the product key as follows:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name"></div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: ""
subtitle: ""
lineNumbers: true
-->

```json
    "product": {
    	"alternate-product.html":"/test-url/"
    },
```

### Expanded Mapping Example

Here is a more-complete example in which the `brand`, `page`, and `category` keys are also populated:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name"></div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: ""
subtitle: ""
lineNumbers: true
-->

```json
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

### Mapping Requirements and Options

In the .stencil mapping examples above:

* Each mapped URL must be a URL for a brand, category, product, or static page that is _already configured in the store_. This means that you cannot insert a placeholder URL that is an arbitrary string of letters, such as /abcdefghijklmnop/.
* Each URL’s trailing slash is _optional_.
* The HTML files must reside in either the brand, category, product, or page subdirectories.
* All brand URLs are nested under the /brands/ parent. Use URL encoding with brand URLs.
* That parent for brand URLs is /brands/ (plural), while the corresponding subdirectory for HTML files is /brand/ (singular).
* After editing your `.stencil` file, you must restart stencil to see your changes locally. Enter `stencil start` on the command line, appending any appropriate switches for your workflow (e.g.: `stencil start -e -n`).

### Why These URL Requirements?

When you create a local custom template page for products, you expect that page to have access to all Stencil product objects. However, the server cannot readily determine the page type of each local custom template. So we give it a hint: We instruct the server to look at the page type of the URL to which you have mapped the template.

In the above `.stencil` configuration example’s final entry, the server will look at the URL `/custom‑category/` within the store, deduce that the page type is `category`, and return a category context to Stencil CLI. This allows Stencil CLI to properly display the page in the browser when you visit http://localhost:3000/custom‑category/ locally, or when shoppers visit the corresponding public store page.

### Mapping Multiple URLs
Beyond the single URL mapped to each template in the above examples, you have the option of mapping an array of URLs to each template. This is shown in the following example for the product template:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name"></div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: ""
subtitle: ""
lineNumbers: true
-->

```json
  "customLayouts": {
    "product": {
      "featured-product.html": ["/special-product-one", "/special-product-two"],
      "clearance-product.html": "/clearance-product"
    },
    "brands": {},
    "categories": {},
    "page": {}
  }
}
```

---

<a href='#authoring-testing-uploading_theme-upload' aria-hidden='true' class='block-anchor'  id='authoring-testing-uploading_theme-upload'><i aria-hidden='true' class='linkify icon'></i></a>

## Theme Upload

Finally, you must bundle and upload the theme to BigCommerce. See the Bundling and Uploading a Theme article for instructions on how to achieve this.

---

<a href='#authoring-testing-uploading_troubleshooting' aria-hidden='true' class='block-anchor'  id='authoring-testing-uploading_troubleshooting'><i aria-hidden='true' class='linkify icon'></i></a>

## Troubleshooting Template Authoring

Here are solutions to some known problems in locally authoring and testing custom templates:

### Viewing Custom Brand Templates Locally

If you are having trouble viewing custom brand templates locally, ensure that the URL used in your .stencil file is of the form: /brands/brandname. This is necessary because all the brand pages are located under the /brands/ URL path.
Also, bear in mind that currently, all brand URLs are Unicode-encoded. So, for example, you should replace a hyphen with: %252d.

### Outdated Stencil CLI

If you have an old version of Stencil CLI installed, it might lack support for custom templates. You can easily update your CLI by executing the following command:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name"></div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: ""
subtitle: ""
lineNumbers: true
-->

```shell
npm install -g bigcommerce/stencil-cli
```

