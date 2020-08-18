
# Using Front Matter

<div class="otp" id="no-index">

### On this page
- [Declaring front matter objects](#declaring-front-matter-objects)
- [Filtering attributes](#filtering-attributes)
- [Combining front matter and Handlebars](#combining-front-matter-and-handlebars)
- [Default vs custom attributes](#default-vs-custom-attributes)
- [Declaring multiple attributes](#declaring-multiple-attributes)
- [Resources](#resources)

</div>

## Declaring front matter objects

When you create a store page that requires specific attributes (such as 'New Products') to be displayed, you must first declare the object and attribute on the page in a front matter block at the top of the page's HTML template file. The front matter block makes the attribute accessible on the page. Then, to display the attribute on the storefront page, you will reference the object using Handlebars within the page's HTML.
For example, to display 'new products' on a storefront's home page, you first need to make new products accessible on the home page. To achieve this, include the following front matter block at the top of the [home.html](https://github.com/bigcommerce/cornerstone/blob/master/templates/pages/home.html) file to declare the products object with its new attribute. This allows a storefront's home page to access a store's "New Products".

```yaml
products:
    new:
    	limit: {{theme_settings.homepage_new_products_count}}
```

**Note:** A 'limit' is required for product objects to render on a storefront page. You can hard code the limit value or utilize handlebars.js to reference it from the theme's config.json file. In this case, the limit value is being referenced from the `settings` JSON object in the `config.json` file using handlebars.js. Information on required attributes is detailed in the front matter attributes Reference.

After including the front matter block at the top of the home.html file, the New Products attribute will be accessible in the home page's context. As previously stated, simply including the front matter block will not display the attribute on the page. In order to actually display the new products on the desired storefront page, you will reference the attribute using Handlebars in the same file you have added the front matter block to.
In this example, we will include the following code in Cornerstone's [home.html](https://github.com/bigcommerce/cornerstone/blob/master/templates/pages/home.html) file to display New Products on our store's home page.

```html
  {{#if products.new}}
        {{> components/products/new products=products.new columns=theme_settings.homepage_new_products_column_count}}
    {{/if}}
```

### Restrictions

You can use front matter to specify attributes on the tops of pages in your `templates/pages/` subdirectory.

You **cannot** use front matter to accomplish this on pages in the following subdirectories:
* `templates/components/`
* `templates/layout/`
* `templates/pages/custom/`

* Indent using only spaces, not tabs. (YAML forbids tabs, to avoid inconsistent encoding of tabs across platforms.) An indent of even one space indicates a child.

* Front matter on a given page cannot exceed 64 KB.

* If a front matter directive contains an invalid option, Stencil CLI will silently ignore that option.

## Filtering attributes

Some attributes can accept indented keys, or key-value pairs, to further define the attribute. For example, limit is a key commonly used to restrict the number of objects to return for an attribute.
To return products similar to the product that a customer is currently viewing – with a limit of six – you would declare front matter as follows:

```yaml

products:
    similar_by_views:
        limit: 6

```

Most keys have a default value, as listed in the [front matter Attributes](https://developer.bigcommerce.com/stencil-docs/reference-docs/front-matter-reference) Reference. Specifying the key without a value will call that default value. The default value for `similar_by_views:limit:` happens to be `4`, so inserting `limit` with no integer will display four products:

```yaml

products:
    similar_by_views:
        limit:

```

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

<!-- theme:info  -->

### Filtering for Faster Page Loads
> To keep your pages lightweight, specify only the attributes you need per page. Also, use the limit key (with appropriate values) for attributes that accept it.

</div>
</div>
</div>

## Combining front matter and Handlebars

The next example builds on front matter object invocation and filtering, by showing a corresponding Handlebars statement in HTML. Here is how you would declare the `products` object to return four new products, and to then display each product’s name:

```html

products:
    new:
        limit: 4

#  This is the HTML for the new-products example
{{#each products.new}}
    <p>{{ name }}</p>
{{/each}}
```

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

<!-- theme:info  -->

### Reading the Handlebars
> In the above HTML, the {{ name }} identifier calls an attribute of Stencil’s common product card model, which consolidates details about a given product. For this and other objects that you can access through HTML, please see our [reference](https://developer.bigcommerce.com/stencil-docs/reference-docs/handlebars-helpers-reference#Front-Matter-overview_declaring-objects) section on Handlebars objects.

</div>
</div>
</div>

## Default vs custom attributes

To make templates readily useful, they automatically include a page’s default attributes. For example, a theme’s [product.html](https://github.com/bigcommerce/cornerstone/blob/master/templates/pages/product.html) page will automatically include a product attribute.

However, if you want to include additional attributes on a page, you can declare those attributes in front matter using the conventions shown above. [The Declaring Objects](#declaring-multiple-attributes) example shows the only way to display a "new products" storefront section, which requires front matter invocation.

## Declaring multiple attributes

Below is an example that assumes you want to include a product’s reviews and also related products. To display images for the related products, the HTML statement `<img src="{{getImage image 'gallery'}}">` relies on Stencil's `{{getImage}}` custom Handlebars helper:

```html

product:
   reviews:
       limit: 9
   related_products:
       limit: 10

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

## Resources
* [Front Matter Reference](https://developer.bigcommerce.com/stencil-docs/reference-docs/front-matter-reference)
