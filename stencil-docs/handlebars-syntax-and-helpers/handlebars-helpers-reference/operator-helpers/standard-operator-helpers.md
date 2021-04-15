<h1>Standard Operator Helpers</h1>

<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#handlebars_comparison">Comparison Operators</a></li>
    <li><a href="#handlebars_or">{{or}}</a></li>
    <li><a href="#handlebars_typeof">{{forOwn}}</a></li>
	</ul>
</div>

<a href='#handlebars-comparison' aria-hidden='true' class='block-anchor'  id='handlebars-comparison'></a>

## Comparison Operators

The following helpers are available to handle comparisons.

| Helper | Definition |
|--|--|
|`==`| equal to |
|`===`| equal to and equal type |
|`!=`| not equal |
|`<`| less than |
|`>`| greater than |
|`<=`| less than or equal to |
|`>=`| greater than or equal to |

### Equal to and Equal Type Example

To compare a string, use the `===` operator, as in this example from `templates/components/common/share.html`: 

```
  {{#if service '===' 'facebook'}}
    <svg>
      <use xlink:href="#icon-facebook"/>
    </svg>
  {{/if}}
```

### Not Equal or Not Equal Type Example

To improvise a `!==` (not equal or not equal type) comparison operator in Handlebars, you can use an [if](#if)/else structure as shown in this example:

```
  <nav class="navigation">
      <ul>
        {{#each nav_items}}
            {{#if name '===' 'About Us'}}
            {{else}}
              <li>
                <a class="top-level-nav-link" href="{{url}}">
                  {{name}}
                </a>
              </li>
            {{/if}}
        {{/each}}
      </ul>
    </nav>
```



<a href='#handlebars_or' aria-hidden='true' class='block-anchor'  id='handlebars_or'></a>

## Logical {{or}} Operator

The `or` operator has been customized for Stencil. It checks whether at least one of its parameters evaluates to true, and has the following syntax:

```
{{#or 1 0 0 0 0 0 0}} 
  ... /* execute this block if OR evaluates to true */
{{/or}}
```

### Example

Here is a usage example from Stencil's Cornerstone base theme, where it displays the cart's contents. The `templates/components/cart/content.html` template uses the `or` operator to determine whether an item contains either product options _or_ configurable fields. If at least one condition is true, the template displays an edit link for the item:

```
{{#or options configurable_fields}}
    <a href="#" data-item-edit="{{id}}">{{lang 'cart.checkout.change'}}</a>
{{/or}}
```

### Parameters 

The `or` operator's parameters are one or more strings, numbers, arrays, or collections. Parameters can be of mixed types. 



<a href='#handlebars_typeof' aria-hidden='true' class='block-anchor'  id='handlebars_typeof'></a>

## {{typeof}} Operator

The `typeof` operator returns the JavaScript type of a variable, such as:

- string
- number
- boolean
- object

By design, an array will return a `typeof` value of `object`.

### Example

```
<script>
    if (typeof(addthis) === "object") {
        addthis.toolbox('.addthis_toolbox');
    }
</script>
```

