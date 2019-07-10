<h1>Conditional Control Flow Helpers</h1>

<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#handlebars_if">{{if}}</a></li>
    <li><a href="#handlebars_unless">{{unless}}</a></li>
	</ul>
</div>

<a href='#handlebars_if' aria-hidden='true' class='block-anchor'  id='handlebars_if'><i aria-hidden='true' class='linkify icon'></i></a>

The following helpers provide control structures that test for conditions, and branch accordingly.

## {{if}}

The `if` helper has been customized for Stencil, and has the following syntax:

```
{{#if <statement>}}
  ... 
{{else if}}  /* optional else-if block */
  ...
{{else}}  /* optional else block */
  ...
{{/if}}
```

The `<statement>` that the `if` helper evaluates can take these forms:

- An object, as in: `{{#if object}}`.
- A comparison expression, as in: `{{#if <lvalue> <operator> <rvalue>}}`.


When you pass only one parameter to the `if` helper, it will return the following:
- For an array parameter, the array's length.
- For an empty object, a value of `false`.

---

<a href='#handlebars_unless' aria-hidden='true' class='block-anchor'  id='handlebars_unless'><i aria-hidden='true' class='linkify icon'></i></a>

## {{unless}}

The `unless` helper is logically the opposite of the [`if` helper](#if), subject to the [restrictions](#unless_restrix) below. The syntax for `unless` can be found in the official Handlebars documentation [here](http://handlebarsjs.com/builtin_helpers.html).

#### Formal Example

```
{{#unless statement}}
   ... /* block to display/execute unless statement is true */
{{/unless}}
```

#### Restrictions

Statements using `unless` can refer to: 

* Objects, as in: `{{#unless object}}`.

Unlike the `if` helper,  `unless` on the Stencil framework does not support operators for comparison expressions. 
So, for example, the following expression would throw an error:

```
{{#unless this.alt "===" "hidden"}}
```

A workaround for this logic is to recast the expression as `if`/not-equal-to. So the following expression would be valid:

```
{{#if this.alt "!==" "hidden"}}
```

#### Stencil Example 

Here is a usage example from Stencil's Cornerstone base theme: The `templates/pages/search.html` template displays search results. In this template's section that displays search suggestions, an `#unless` loop determines what to output for the final result:

```
{{#each category_results}}
<li class="category-suggestion">
    {{#each this}}
        <a href="{{url}}">{{name}}</a>
        {{#unless @last}} > {{/unless}}
    {{/each}}
</li>
{{/each}}
```

### Nested if/else Statements to Test for if/and Conditions

Handlebars does not provide an `if`/`and` conditional structure. However, to test for multiple conditions, you can nest `if`/`else` statements, as shown in this example:

```
 <nav class="navigation">
      <ul>
        {{#each nav_items}}
            {{#if name '===' 'About Us'}}
            {{else}}
              {{#if name '===' 'Contact Us'}}
              {{else}}
                <li>
                  <a class="top-level-nav-link" href="{{url}}">
                    {{name}}
                  </a>
                </li>
              {{/if}}
            {{/if}}
        {{/each}}
      </ul>
    </nav>
```


