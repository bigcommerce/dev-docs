<h1>Front Matter Overview</h1>

<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#front-matter-overview_declaring-objects">Declaring Objects</a></li>
    <li><a href="#front-matter-overview_yaml-syntax">YAML Syntax – Requirements</a></li>
    <li><a href="#front-matter-overview_filtering-attributes">Filtering Attributes</a></li>
    <li><a href="#front-matter-overview_combining-front-matter">Combining Front Matter with Handlebars Attributes</a></li>
    <li><a href="#front-matter-overview_default-versus-custom">Default versus Custom Attributes, per Page</a></li>
    <li><a href="#front-matter-overview_declaring-multiple">Declaring Multiple Attributes</a></li>
	</ul>
</div>








<a href='#front-matter-overview_declaring-objects' aria-hidden='true' class='block-anchor'  id='front-matter-overview_declaring-objects'><i aria-hidden='true' class='linkify icon'></i></a>

## Declaring Front-Matter Objects

When you create a store page that requires specific attributes (such as 'New Products') to be displayed, you must first declare the object and attribute on the page in a front-matter block at the top of the page's HTML template file. The front matter block makes the attribute accessible on the page. Then, to display the attribute on the storefront page, you will reference the the object using Handlebars within the page's HTML.
For example, to display 'new products' on a storefront's home page, you first need to make new products accessible on the home page. To achieve this, include the following front matter block at the top of the [home.html](https://github.com/bigcommerce/cornerstone/blob/master/templates/pages/home.html) file to declare the products object with its new attribute. This allows a storefront's home page to access a store's "New Products."

```
---
products:
    new:
    	limit: {{theme_settings.homepage_new_products_count}}
---
```

**Note:** A 'limit' is required for Product Objects to render on a storefront page. You can hard code the limit value or utilize handlebars.js to reference it from the theme's config.json file. In this case, the limit value is being referenced from the `settings` JSON object in the `config.json` file using handlebars.js. Information on required attributes is detailed in the Front Matter Attributes Reference. 

After including the front matter block at the top of the home.html file, the New Products attribute will be accessible in the home page's context. As previously stated, simply including the front matter block will not display the attribute on the page. In order to actually display the new products on the desired storefront page, you will refernce the attribute using Handlebars in the same file you have added the front matter block to.
In this example, we will include the following code in Cornerstone's [home.html](https://github.com/bigcommerce/cornerstone/blob/master/templates/pages/home.html) file to display New Products on our store's home page. 


```
  {{#if products.new}}
        {{> components/products/new products=products.new columns=theme_settings.homepage_new_products_column_count}}
    {{/if}}
```


<a href='#front-matter-overview_yaml-syntax' aria-hidden='true' class='block-anchor'  id='front-matter-overview_yaml-syntax'><i aria-hidden='true' class='linkify icon'></i></a>

## YAML Syntax – Requirements

Stencil front matter uses the conventions of [YAML]() (short for the recursive "YAML Ain't Markup Language"). Here are the YAML conventions you must follow in front matter:

Place the front-matter block at the top of your template.
Fence the beginning and end of the front-matter block with a row of three hyphens (---), as you see in the examples here.
Show attribute > key relationship (or object > property relationship) by indenting the children. In the example above, products is the object,
Place a colon (:) directly after each attribute name, and directly after each key name. (Colons separate key:value pairs.)
Identifiers are case-sensitive.

### Restrictions

You can use front matter to specify attributes on the tops of pages in your
`<theme-name>/templates/pages/` subdirectory.

You **cannot** use front matter to accomplish this on pages in the following subdirectories:
* `<theme-name>/templates/components/`
* `<theme-name>/templates/layout/`
* `<theme-name>/templates/pages/custom/` 

* Indent using only spaces, not tabs. (YAML forbids tabs, to avoid inconsistent encoding of tabs across platforms.) An indent of even one space indicates a child.

* Front matter on a given page cannot exceed 64 KB.

* If a front-matter directive contains an invalid option, Stencil CLI will silently ignore that option.



<a href='#front-matter-overview_filtering-attributes' aria-hidden='true' class='block-anchor'  id='front-matter-overview_filtering-attributes'><i aria-hidden='true' class='linkify icon'></i></a>

## Filtering Attributes

Some attributes can accept indented keys, or key-value pairs, to further define the attribute. For example, limit is a key commonly used to restrict the number of objects to return for an attribute.
To return products similar to the product that a customer is currently viewing – with a limit of six – you would declare front matter as follows:

```
---
products:
    similar_by_views:
        limit: 6
---
```

Most keys have a default value, as listed in the [Front Matter Attributes]() Reference. Specifying the key without a value will call that default value. The default value for `similar_by_views:limit:` happens to be `4`, so inserting `limit` with no integer will display four products:

```
---
products:
    similar_by_views:
        limit:
---
```


<div class="HubBlock--callout">
<div class="CalloutBlock--">
<div class="HubBlock-content">
    
<!-- theme:  -->

### Filtering for Faster Page Loads
> To keep your pages lightweight, specify only the attributes you need per page. Also, use the limit key (with appropriate values) for attributes that accept it.

</div>
</div>
</div>

<a href='#front-matter-overview_combining-front-matter' aria-hidden='true' class='block-anchor'  id='front-matter-overview_combining-front-matter'><i aria-hidden='true' class='linkify icon'></i></a>

## Combining Front Matter with Handlebars Attributes

The next example builds on front-matter object invocation and filtering, by showing a corresponding Handlebars statement in HTML. Here is how you would declare the `products` object to return four new products, and to then display each product’s name:

```
---
products:
    new:
        limit: 4
---

<h1> This is the HTML for the new-products example </h1>
{{#each products.new}}
    <p>{{ name }}</p>
{{/each}}
```

<div class="HubBlock--callout">
<div class="CalloutBlock--">
<div class="HubBlock-content">
    
<!-- theme:  -->

###  Reading the Handlebars
> In the above HTML, the {{ name }} identifier calls an attribute of Stencil’s common product card model, which consolidates details about a given product. For this and other objects that you can access through HTML, please see our reference section on Handlebars objects.

</div>
</div>
</div>

<a href='#front-matter-overview_default-versus-custom' aria-hidden='true' class='block-anchor'  id='front-matter-overview_default-versus-custom'><i aria-hidden='true' class='linkify icon'></i></a>

## Default versus Custom Attributes, per Page

To make templates readily useful, they automatically include a page’s default attributes. For example, a theme’s [product.html](https://github.com/bigcommerce/cornerstone/blob/master/templates/pages/product.html) page will automatically include a product attribute.

However, if you want to include additional attributes on a page, you can declare those attributes in front matter using the conventions shown above. [The Declaring Objects](#front-matter-overview_declaring-objects) example shows the only way to display a "new products" storefront section, which requires front-matter invocation.

<a href='#front-matter-overview_declaring-multiple' aria-hidden='true' class='block-anchor'  id='front-matter-overview_declaring-multiple'><i aria-hidden='true' class='linkify icon'></i></a>

## Declaring Multiple Attributes

Below is an example that assumes you want to include a product’s reviews and also related products. To display images for the related products, the HTML statement `<img src="{{getImage image 'gallery'}}">` relies on Stencil's `{{getImage}}` custom Handlebars helper:

```
---
product:
   reviews:
       limit: 9
   related_products:
       limit: 10
---


<h2>{{ product.name }}</h2>
{{#each product.reviews.list}}
    <p>{{text}}</p>
{{/each}}
<h3>Related Products</h3>
{{#each product.related_products}}
  <img src="{{getImage image 'gallery'}}">
  <p>{{ name }}</p>
{{/each}}
```



