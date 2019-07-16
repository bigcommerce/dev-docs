<h1>Loop Control Flow Helpers</h1>

<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#handlebars_any">{{any}}</a></li>
    <li><a href="#handlebars_all">{{all}}</a></li>
    <li><a href="#handlebars_contains">{{contains}}</a></li>
    <li><a href="#handlebars_each">{{each}}</a></li>
    <li><a href="#handlebars_for">{{for}}</a></li>
	</ul>
</div>

<a href='#handlebars_any' aria-hidden='true' class='block-anchor'  id='handlebars_any'><i aria-hidden='true' class='linkify icon'></i></a>

The following helpers are used to control loop execution.

## {{any}}

The `any` helper is custom to Stencil. It checks whether at least one parameter evaluates to `true`.  Parameters can be of different types (strings, numbers, arrays, or collections).

#### Examples

Formally, the `any` helper is invoked as shown here:

```
{{#any items selected=true}} 
  ... /* block to display if any items have selected=true */
{{/any}}
```

A usage example is http://cornerstone-light-demo.mybigcommerce.com/shop-all/garden, a category page in Stencil's Cornerstone base theme that does _not_ have faceted search turned on. Shoppers will see "Shop by price" filters instead of product filters. 

The Stencil code controlling this component resides in the theme's `templates/components/category/shop-by-price.html` file. In this component, the `{{#any...` Handlebars helper is used to determine whether a shopper has selected one of the filters, and whether a "reset" button needs to be displayed:

```
{{#any shop_by_price selected=true}}
    <li class="navList-item">
        <a href="{{category_url}}" class="navList-action">
            {{lang 'category.reset'}}
        </a>
    </li>
{{/any}}
```

---

<a href='#handlebars_all' aria-hidden='true' class='block-anchor'  id='handlebars_all'><i aria-hidden='true' class='linkify icon'></i></a>

## {{all}}

The `all` helper is custom to Stencil. It checks whether _all_ parameters evaluate to `true`. Parameters can be of different types (strings, numbers, arrays, or collections).

#### Example

```
{{#all items theme_settings.optionA theme_settings.optionB}}
  ... /* block to display, if all items evaluate to true */
{{/all}}
```

---

<a href='#handlebars_contains' aria-hidden='true' class='block-anchor'  id='handlebars_contains'><i aria-hidden='true' class='linkify icon'></i></a>

## {{contains}}

The `contains` helper is custom to Stencil. It checks whether the second parameter is included in the first parameter (typically a collection).

#### Example

```
{{#contains fonts "Roboto"}}
  ... /* block to display, if any items contain "Roboto" */
{{/contains}}
```

---

<a href='#handlebars_each' aria-hidden='true' class='block-anchor'  id='handlebars_each'><i aria-hidden='true' class='linkify icon'></i></a>

## {{each}}

The syntax for the `each` helper can be found in the official Handlebars documentation [here](http://handlebarsjs.com/builtin_helpers.html).

#### Example

```
{{#each array | object}}
  ...
{{else}} /* optional block to execute if the the list is empty */
  ...
{{/each}}
```

#### Notes

- Within an each block, use `{{this}}` to reference the current item.
- Within an each block, use `{{@index}}` to reference the current item's index number.
- When iterating through objects, `{{@key}}` returns the current key name.
- `{{each}}` loops can be nested.

---

<a href='#handlebars_for' aria-hidden='true' class='block-anchor'  id='handlebars_for'><i aria-hidden='true' class='linkify icon'></i></a>

## {{for}}

The `for` helper is a custom Stencil helper. In particular, this helper is limited to 100 iterations, in order to protect against infinite loops. 

The `for` helper has the following syntax, where parameters `<from>` and `<to>` are numbers, and `<context>` is an object:

```
{{#for <from> <to> <context>}}
  ...
{{/for}}
```

