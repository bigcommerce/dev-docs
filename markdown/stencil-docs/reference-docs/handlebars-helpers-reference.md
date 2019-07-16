<h1>Handlebars Helpers Reference</h1>

<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li>Array Helpers</li>
    <li>Collection Helpers</li>
    <li>Comparison Helpers</li>
    <li>Control-Flow Helpers</li>
    <li>Date Helpers</li>
    <li>HTML Helpers</li>
    <li>Image Helpers</li>
    <li>Inflection Helpers</li>
		<li>Injection Helpers</li>
		<li>Markdown Helpers</li>
		<li>Math Helpers</li>
		<li>Number Helpers</li>
		<li>Object Helpers</li>
		<li>Operator Helpers</li>
		<li>String Helpers</li>
		<li>URL Helpers</li>
		<li>Miscellaneous Helpers</li>
    </ul>
</div>

This page describes all of the Handlebars helpers supported on the Stencil framework. It includes helpers that are custom to, or customized for, Stencil.

For background information on using Handlebars helpers, please see the [official Handlebars documentation](http://handlebarsjs.com).

# <a name="array"></a> Array Helpers

The following helpers are available to manage arrays:

* [Stencil Custom Array Helpers](#array_custom)
* [Standard Array Helpers](#array_std) 

## <a name="array_custom"></a> Stencil Custom Array Helpers

The following array helpers are custom to the Stencil framework.
### {{itemAt}}

_Block helper that returns the item at the specified index._

#### Parameters

* `array` {Array}
* `idx` {Number}
* `returns` {any} `value`

#### Example

Given the array `['a', 'b', 'c']`:

```handlebars
{{itemAt array 1}}
//=> 'b'
```

### {{join}}

The `join` helper is custom to Stencil. It joins an array of string items, with separators. It returns a string. 

#### Parameters

- `values`: {Array}
- `separator`: {String}
- `limit=<number>`: An optional limit.

### {{limit}}

The `limit` helper is custom to Stencil. It limits the number of items returned from an array variable, and returns a new array.

#### Parameters

- `data`: {Array}
- `limit`: {Number}

#### {{limit}} Example 

Assume that `{{cart.items}}` would return 10 items. You could use this helper to limit that behavior to only the first four items, by specifying: 

```
{{limit cart.items 4}}
```

### {{pluck}}

The `pluck` helper is custom to Stencil. For one specified search key(s), it retrieves corresponding values from some or all elements in a specified collection. 

The `pluck` helper returns the retrieved values in a comma-separated string. This helper's general form is:

```
{{pluck ([limit] <collection> [<limit-value>]) '<search-key>'}}
```

#### Parameters

- `limit`, `limit-value`: Optional parameters to limit the number of results returned.
- `collection`: The collection to search.
- `search-key`: The string to search for.


#### {{pluck}} Example 1

Assume that the `categories` collection contains:

```
categories: [
  { "id": 1, "name": "Bakeware" },
  { "id": 2, "name": "Cookware" },
  { "id": 3, "name": "Cutlery" }
]
```

In this case, this Handlebars statement:

```
{{pluck (limit categories 2) 'name'}}
```

...would return:

```
"Bakeware,Cookware"
```

#### {{pluck}} Example 2

If the `categories` themselves each contained an image object, then you could use dot notation to access that image object's children:

```
categories: [
  { "id": 1, "name": "Bakeware", "image": { "data": "http://...", "alt": "Bakeware image"} },
  { "id": 2, "name": "Cookware" "image": { "data": "http://...", "alt": "Cookware image"} },
  { "id": 3, "name": "Cutlery" "image": { "data": "http://...", "alt": "Cutlery image"} }
]
```

In this case, this Handlebars statement:

```
{{pluck (limit categories 2) 'image.data'}}
```

...would return a comma-separated list of image URLs.


## <a name="array_std"></a> Standard Array Helpers

The following standard array helpers are supported on the Stencil framework.

### <a name="after"></a> {{after}}

Returns all of the items in an array after the specified index. Opposite of [before](#before).

Given the array `['a', 'b', 'c']`:

#### Parameters

* `array` {Array}: Collection.
* `n` {Number}: Starting index (number of items to exclude).
* `returns` {Array}: Array exluding `n` items.

#### Example

```handlebars
{{after array 1}}
//=> '["c"]'
```

### {{arrayify}}

Casts the given `value` to an array.

#### Parameters

* `value` {any}
* `returns` {Array}

#### Example

```handlebars
{{arrayify "foo"}}
//=> '["foo"]'
```

### <a name="before"></a> {{before}}

Returns all of the items in the collection before the specified count. Opposite of [after](#after).

Given the array `['a', 'b', 'c']`:

#### Parameters

* `array` {Array}
* `n` {Number}
* `returns` {Array}: Array excluding items after the given number.

#### Example

```handlebars
{{before array 2}}
//=> '["a", "b"]'
```

### {{eachIndex}}

#### Parameters

* `array` {Array}
* `options` {Object}
* `returns` {String}

#### Example

```handlebars
{{#eachIndex collection}}
  {{item}} is {{index}}
{{/eachIndex}}
```

### {{filter}}

Block helper that filters the given array. Renders the block for values that evaluate to `true`; otherwise, returns the inverse block.

#### Parameters

* `array` {Array}
* `value` {any}
* `options` {Object}
* `returns` {String}

#### Example

```handlebars
{{#filter array "foo"}}AAA{{else}}BBB{{/filter}}
//=> 'BBB
```

### <a name="first"></a> {{first}}

Returns the first item, or first `n` items, of an array.

#### Parameters

* `array` {Array}
* `n` {Number}: Number of items to return, starting at `0`.
* `returns` {Array}

#### Example

Given the array `['a', 'b', 'c', 'd', 'e']`:

```handlebars
{{first array 2}}
//=> '["a", "b"]'
```

### {{forEach}}

Iterates over each item in an array, and exposes the current item in the array as context to the inner block. In addition to the current array item, the helper exposes the following variables to the inner block:

* `index`
* `total`
* `isFirst`
* `isLast`

Also, `@index` is exposed as a private variable, and additional private variables may be defined as hash arguments.

#### Parameters

* `array` {Array}
* `returns` {String}

#### Example

```js
var accounts = [
{'name': 'John', 'email': 'john@example.com'},
{'name': 'Malcolm', 'email': 'malcolm@example.com'},
{'name': 'David', 'email': 'david@example.com'}
];

// example usage
// {{#forEach accounts}}
//   <a href="mailto:{{ email }}" title="Send an email to {{ name }}">
//     {{ name }}
//   </a>{{#unless isLast}}, {{/unless}}
// {{/forEach}}
```

### {{inArray}}

Block helper that renders the block if an array has the given `value`. Optionally, you can specify an inverse block to render when the array does not have the given value.

#### Parameters

* `array` {Array}
* `value` {any}
* `options` {Object}
* `returns` {String}

#### Example

Given the array `['a', 'b', 'c']`:

```handlebars
{{#inArray array "d"}}
  foo
{{else}}
  bar
{{/inArray}}
//=> 'bar'
```

### {{isArray}}

Returns true if `value` is an es5 array.

#### Parameters

* `value` {any}: The value to test.
* `returns` {Boolean}

#### Example

```handlebars
{{isArray "abc"}}
//=> 'false'
```

### <a name="last"></a> {{last}}

Returns the last item, or last `n` items, of an array. Opposite of [first](#first).

#### Parameters

* `array` {Array}
* `n` {Number}: Number of items to return, starting with the last item.
* `returns` {Array}

#### Example

Given the array `['a', 'b', 'c', 'd', 'e']`:

```handlebars
{{last array 2}}
//=> '["d", "e"]'
```

### {{lengthEqual}}

Block helper that compares the length of the given array to the number passed as the second argument. If the array length is equal to the given `length`, the block is returned. Otherwise, you have the option of returning an inverse block.

#### Parameters

* `array` {Array}
* `length` {Number}
* `options` {Object}
* `returns` {String}

#### Example

Given the array `['a', 'b', 'c', 'd', 'e']`:

```handlebars
{{#lengthEqual array 10}}AAA{{else}}BBB{{/lengthEqual}}
//=> 'BBB'
```

### {{map}}

Returns a new array, created by calling `function` on each element of the given `array`.

#### Parameters

* `array` {Array}
* `fn` {Function}
* `returns` {String}

#### Example

Given an array `['a', 'b', 'c']`:

```js
// register `double` as a helper
function double(str) {
  return str + str;
}
// then used like this:
// {{map array double}}
//=> '["aa", "bb", "cc"]'
```

### {{some}}

Block helper that returns the block *if* the callback returns true for some value in the given array.

#### Parameters

* `array` {Array}
* `cb` {Function}: Callback function.
* {Options}: Handlebars-provided options object.
* `returns` {Array}

#### Example

Given the array `[1, 'b', 3]`:

```handlebars
{{#some array isString}}
  Render me if the array has a string.
{{else}}
  Render me if it doesn't.
{{/some}}
//=> 'Render me if the array has a string.'
```

### {{sort}}

Sorts the given `array`. If an array of objects is passed, you may optionally pass (as the second argument) a `key` to sort on. Alternatively, you may pass a sorting function as the second argument.

#### Parameters

* `array` {Array}: The array to sort.
* `key` {String|Function}: The object key to sort by, or a sorting function.

#### Example

Given an array `['b', 'a', 'c']`:


```handlebars
{{sort array}}
//=> '["a", "b", "c"]'
```

### {{sortBy}}

Sorts an `array`. If an array of objects is passed, you may optionally pass a `key` to sort on as the second argument. You may alternatively pass a sorting function as the second argument.

#### Parameters

* `array` {Array}: The array to sort.
* `props` {String|Function}: One or more properties to sort by, or sorting functions to use.

#### Example

Given an array `[{a: 'zzz'}, {a: 'aaa'}]`:

```handlebars
{{sortBy array "a"}}
//=> '[{"a":"aaa"}, {"a":"zzz"}]'
```

### <a name="withAfter"></a> {{withAfter}}

Use the items in the array, _after_ the specified index, as context inside a block. Opposite of [withBefore](#withBefore).

#### Parameters

* `array` {Array}
* `idx` {Number}
* `options` {Object}
* `returns` {Array}

#### Example

Given the array `['a', 'b', 'c', 'd', 'e']`:

```handlebars
{{#withAfter array 3}}
  {{this}}
{{/withAfter}}
//=> "de"
```

### <a name="withBefore"></a> {{withBefore}}

Use the items in the array, _before_ the specified index, as context inside a block. Opposite of [withAfter](#withAfter).

#### Parameters

* `array` {Array}
* `idx` {Number}
* `options` {Object}
* `returns` {Array}

#### Example

Given the array `['a', 'b', 'c', 'd', 'e']`:

```handlebars
{{#withBefore array 3}}
  {{this}}
{{/withBefore}}
//=> 'ab'
```

### <a name="withFirst"></a> {{withFirst}}

Uses a collection's first item inside a Handlebars block expression. Opposite of [withLast](#withLast).

#### Parameters

* `array` {Array}
* `idx` {Number}
* `options` {Object}
* `returns` {String}

#### Example

Given the array `['a', 'b', 'c']`:

```handlebars
{{#withFirst array}}
  {{this}}
{{/withFirst}}
//=> 'a'
```
### <a name="withLast"></a> {{withLast}}

Use the last item, or `n` items, in an array as context inside a block. Opposite of [withFirst](#withFirst).

#### Parameters

* `array` {Array}
* `idx` {Number}: The starting index.
* `options` {Object}
* `returns` {String}

#### Example

Given the array `['a', 'b', 'c']`:

```handlebars
{{#withLast array}}
  {{this}}
{{/withLast}}
//=> 'c'
```

### {{withSort}}

Block helper that sorts a collection and exposes the sorted collection as context inside the block.

#### Parameters

* `array` {Array}
* `prop` {String}
* `options` {Object}: Specify `reverse="true"` to reverse the array.
* `returns` {String}

#### Example

Given the array `['b', 'a', 'c']`:

```handlebars
{{#withSort array}}{{this}}{{/withSort}}
//=> 'abc'
```

# <a name="collection"></a> Collection Helpers

The following standard helpers are available to handle collections.

### {{isEmpty}}

Block helper that returns a block *if* the given collection is empty. If the collection is not empty, returns the inverse block (if supplied).

#### Parameters

* `collection` {Object}
* `options` {Object}
* `returns` {String}

### {{iterate}}

Iterates over an array or object.

#### Parameters

* `context` {Object|Array}: The collection to iterate over.
* `options` {Object}
* `returns` {String}

### {{length}}

Returns the length of the given collection. When using a string literal in the template, the string must be value JSON. See the example below. Otherwise, pass in an array or object from the context.

#### Parameters

* `value` {Array|Object|String}
* `returns` {Number}: The length of the value.

#### Example

```handlebars
{{length '["a", "b", "c"]'}}
//=> 3

//=> myArray = ['a', 'b', 'c', 'd', 'e'];
{{length myArray}}
//=> 5

//=> myObject = {'a': 'a', 'b': 'b'};
{{length myObject}}
//=> 2
```

# <a name="comparison"></a> Comparison Helpers

The following standard helpers are available to handle comparisons.

### {{and}}

Block helper that renders the block if *both* of the given values are truthy. If you specify an inverse block, it will be rendered when falsy.

#### Parameters

* `a` {any}
* `b` {any}
* `options` {Object}: Handlebars-provided options object.
* `returns` {String}

### {{gt}}

Block helper that renders a block if `a` is *greater than* `b`.

If an inverse block is specified, it will be rendered when falsy. You may optionally use the `compare=""` hash argument for the second value.

#### Parameters

* `a` {String}
* `b` {String}
* `options` {Object}: Handlebars-provided options object.
* `returns` {String}: Block, or inverse block if specified and falsy.

### {{gte}}

Block helper that renders a block if `a` is *greater than or equal to* `b`.

If an inverse block is specified, it will be rendered when falsy. You may optionally use the `compare=""` hash argument for the second value.

#### Parameters

* `a` {String}
* `b` {String}
* `options` {Object}: Handlebars-provided options object
* `returns` {String}: Block, or inverse block if specified and falsy.

### {{has}}

Block helper that renders a block if `value` has `pattern`. If an inverse block is specified, it will be rendered when falsy.

#### Parameters

* `val` {any}: The value to check.
* `pattern` {any}: The pattern to check for.
* `options` {Object}: Handlebars-provided options object.
* `returns` {String}

### {{eq}}

Block helper that renders a block if `a` is *equal to* `b`. If an inverse block is specified,  it will be rendered when falsy. You may optionally use the `compare=""` hash argument for the second value.

#### Parameters

* `a` {String}
* `b` {String}
* `options` {Object}: Handlebars-provided options object.
* `returns` {String}: Block, or inverse block if specified and falsy.

### {{ifEven}}

Returns `true` if the given value is an even number.

#### Parameters

* `number` {Number}
* `options` {Object}: Handlebars-provided options object
* `returns` {String}: Block, or inverse block if specified and falsy.

#### Example

```handlebars
{{#ifEven value}}
  render A
{{else}}
  render B
{{/ifEven}}
```

### {{ifNth}}

Conditionally renders a block *if* dividing the `a` operand by `b` yields a remainder of zero. If you specify an inverse block, it will be rendered when the remainder is *not* zero.

#### Parameters

* {}: {Number}
* {}: {Number}
* `options` {Object}: Handlebars-provided options object.
* `returns` {String}: Block, or inverse block if specified and falsy.

### {{ifOdd}}

Block helper that renders a block if `value` is *an odd number*. If an inverse block is specified, it will be rendered when falsy.

#### Parameters

* `value` {Object}
* `options` {Object}: Handlebars-provided options object.
* `returns` {String}: Block, or inverse block if specified and falsy.

#### Example

```handlebars
{{#ifOdd value}}
  render A
{{else}}
  render B
{{/ifOdd}}
```

### {{is}}

Block helper that renders a block if `a` is *equal to* `b`. If an inverse block is specified, it will be rendered when falsy.

#### Parameters

* `a` {any}
* `b` {any}
* `options` {Object}: Handlebars-provided options object.
* `returns` {String}

### {{isnt}}

Block helper that renders a block if `a` is *not equal to* `b`. If an inverse block is specified, it will be rendered when falsy.

#### Parameters

* `a` {String}
* `b` {String}
* `options` {Object}: Handlebars-provided options object.
* `returns` {String}

### {{lt}}

Block helper that renders a block if `a` is *less than* `b`.

If an inverse block is specified, it will be rendered when falsy. You may optionally use the `compare=""` hash argument for the second value.

#### Parameters

* `context` {Object}
* `options` {Object}: Handlebars-provided options object.
* `returns` {String}: Block, or inverse block if specified and falsy.

### {{lte}}

Block helper that renders a block if `a` is *less than or equal to* `b`.

If an inverse block is specified, it will be rendered when falsy. You may optionally use the `compare=""` hash argument for the second value.

#### Parameters

* `a` {String}
* `b` {String}
* `options` {Object}: Handlebars-provided options object.
* `returns` {String}: Block, or inverse block if specified and falsy.

### {{neither}}

Block helper that renders a block if *neither of* the given values are truthy. If you specify an inverse block, it will be rendered when falsy.

#### Parameters

* `a` {any}
* `b` {any}
* `options` {}: Handlebars options object.
* `returns` {String}: Block, or inverse block if specified and falsy.

### {{unlessEq}}

Block helper that always renders the inverse block *unless `a` is equal to `b`*.

#### Parameters

* `a` {String}
* `b` {String}
* `options` {Object}: Handlebars-provided options object.
* `returns` {String}: Inverse block by default, or block if falsy.

### {{unlessGt}}

Block helper that always renders the inverse block *unless `a` is greater than `b`*.

#### Parameters

* `context` {Object}
* `options` {Object}: Handlebars-provided options object.
* `returns` {String}: Inverse block by default, or block if falsy.

### {{unlessLt}}

Block helper that always renders the inverse block *unless `a` is less than `b`*.

#### Parameters

* `context` {Object}
* `options` {Object}: Handlebars-provided options object.
* `returns` {String}: Block, or inverse block if specified and falsy.

### {{unlessGteq}}

Block helper that always renders the inverse block *unless `a` is greater than or equal to `b`*.

#### Parameters

* `context` {Object}
* `options` {Object}: Handlebars-provided options object.
* `returns` {String}: Block, or inverse block if specified and falsy.

### {{unlessLteq}}

Block helper that always renders the inverse block *unless `a` is less than or equal to `b`*.

#### Parameters

* `context` {Object}
* `options` {Object}: Handlebars-provided options object.
* `returns` {String}: Block, or inverse block if specified and falsy.


# <a name="control"></a> Control-Flow Helpers

The following control-flow helpers have been customized for the Stencil framework:

* [Conditional Control Flow](#ctrl_conditional)
* [Loop Control Flow](#ctrl_loop)

Beyond the formal examples below, syntax and examples for control-flow helpers are covered in the official Handlebars documentation [here](http://handlebarsjs.com/builtin_helpers.html).


## <a name="ctrl_conditional"></a> Conditional Control Flow

The following helpers provide control structures that test for conditions, and branch accordingly.

### <a name="if"></a> {{if}}

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


### {{unless}}

The `unless` helper is logically the opposite of the [`if` helper](#if), subject to the [restrictions](#unless_restrix) below. The syntax for `unless` can be found in the official Handlebars documentation [here](http://handlebarsjs.com/builtin_helpers.html).

#### Formal Example

```
{{#unless statement}}
   ... /* block to display/execute unless statement is true */
{{/unless}}
```

#### <a name="unless_restrix"></a> Restrictions

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

## <a name="ctrl_loop"></a> Loop Control Flow

The following helpers are used to control loop execution.

### {{any}}

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

### {{all}}

The `all` helper is custom to Stencil. It checks whether _all_ parameters evaluate to `true`. Parameters can be of different types (strings, numbers, arrays, or collections).

#### Example

```
{{#all items theme_settings.optionA theme_settings.optionB}}
  ... /* block to display, if all items evaluate to true */
{{/all}}
```

### contains Helper

The `contains` helper is custom to Stencil. It checks whether the second parameter is included in the first parameter (typically a collection).

#### Example

```
{{#contains fonts "Roboto"}}
  ... /* block to display, if any items contain "Roboto" */
{{/contains}}
```

### {{each}}

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


### {{for}}

The `for` helper is a custom Stencil helper. In particular, this helper is limited to 100 iterations, in order to protect against infinite loops. 

The `for` helper has the following syntax, where parameters `<from>` and `<to>` are numbers, and `<context>` is an object:

```
{{#for <from> <to> <context>}}
  ...
{{/for}}
```


# <a name="date"></a> Date Helpers

The following standard Handlebars helper handles dates.

### {{moment}}

Exposes `helper-date` as `moment`.


# <a name="html"></a> HTML Helpers

The following standard helpers are available to handle HTML content.

### {{ellipsis}}

Truncates a string to the specified `length`, and appends an elipsis, `…`.

#### Parameters

* `str` {String}
* `length` {Number}: The desired length of the returned string.
* `returns` {String}: The truncated string.

#### Example

```js
{{ellipsis "<span>foo bar baz</span>", 7}}
//=> 'foo bar…'
```

### {{sanitize}}

Strips HTML tags from a string, so that only the text nodes are preserved.

#### Parameters

* `str` {String}: The string of HTML to sanitize.
* `returns` {String}

#### Example

```js
{{sanitize "<span>foo</span>"}}
//=> 'foo'
```

### {{ul}}

Block helper for creating unordered lists (`<ul></ul>`).

#### Parameters

* `context` {Object}
* `options` {Object}
* `returns` {String}

### {{ol}}

Block helper for creating ordered lists  (`<ol></ol>`).

#### Parameters

* `context` {Object}
* `options` {Object}
* `returns` {String}

### {{thumbnailImage}}

Returns a `<figure>` with a thumbnail linked to a full picture.

#### Parameters

* `context` {Object}: Object with values/attributes to add to the generated elements:
* `context.alt` {String}
* `context.src` {String}
* `context.width` {Number}
* `context.height` {Number}
* `returns` {String}: HTML `<figure>` element with image and optional caption/link.


# <a name="image"></a> Image Helpers

The Stencil framework provides the following custom helper to manage images.

## {{getImage}}

The `getImage` helper is custom to Stencil. It returns the URL for an image of the specified size. Values for the size parameter are defined in the `config.json` file’s `settings` section.

This helper's parameters are:

- `stencilImage`: a StencilImage.
- `size`: a string.
- `defaultImage` (optional): a string. 

Here is an example: 

```
{{getImage image "thumbnail"}}
``` 

You can use the optional `defaultImage` parameter to specify an image that will be displayed in cases where the passed `stencilImage` value is null.


# <a name="inflection"></a> Inflection Helpers

The following standard helpers are available to transform strings.

### {{inflect}}

Handles singular/plural forms.

#### Parameters

* `count` {Number}
* `singular` {String}: The singular form
* `plural` {String}: The plural form
* `include` {String}
* `returns` {String}

### {{ordinalize}}

Returns an ordinalized number (as a string).

#### Parameters

* `val` {String}: The value to ordinalize.
* `returns` {String}: The ordinalized number.

#### Example

```handlebars
{{ordinalize 1}}
//=> '1st'
{{ordinalize 21}}
//=> '21st'
{{ordinalize 29}}
//=> '29th'
{{ordinalize 22}}
//=> '22nd'
```

# <a name="injection"></a> Injection Helpers

The Stencil framework provides the following custom helpers to insert various resources into a page context:

* [{{cdn}}](#cdn)
* [{{getFontsCollection}}](#fonts)
* [{{inject}} and {{jsContext}}](#inject)
* [{{stylesheet}}](#stylesheet)

### <a name="cdn"></a> {{cdn}}

The `cdn` helper is custom to Stencil. It is a URL transformer for content delivery networks.

When you reference static assets that you have locally staged outside your `<theme-name>` directory and uploaded using WebDAV, place the `webdav:` prefix before each corresponding `assetPath` parameter. For example, a link like:

```
<img src="{{cdn "webdav:img/image.jpg"}}">
```

...will be transformed to a result like:

```
<img src="https://cdn.bcapp/3dsf74g/content/img/image.jpg">
```

The presumed WebDAV root directory is `/content/`. (So, in this example, the `image.jpg` file has been uploaded to the WebDAV `/content/` directory.) The presumed local directory is `<theme-name>/assets/`, so you can omit that path when referencing its contained files or subdirectories.


#### <a name="cdn-custom"></a> CDN Custom Endpoints

You can define custom CDN endpoints to use with the `cdn` Handlebars helper. This facilitates including large, high-resolution image assets in themes, without exceeding BigCommerce's [50 MB limit](/stencil-docs/prepare-and-upload-a-theme/bundling-and-uploading#bundling_bundling-your-theme) when bundling the theme for upload to BigCommerce. 

You could use a local version of the image in development, and a version on a CDN (e.g. Imgix) in production. To do so, define custom CDN endpoints in your theme's <span class="fn">config.json</span> [file](https://github.com/bigcommerce/cornerstone/blob/master/config.json), as highlighted in the example below:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">config.json</div>
    </div><div class="HubBlock-header-subtitle">custom cdn endpointexample</div>
</div>

<!--
title: "config.json"
subtitle: "custom cdn endpointexample"
lineNumbers: true
-->

```
{
  "name": "Cornerstone",
  "version": "1.3.5",
  "settings": {
    "homepage_new_products_count": 12,
    "homepage_featured_products_count": 8,
    "cdn": {
      "customcdn": "https://bigcommerce.customcdn.net"
          }
     }
}
```

After defining an endpoint, you can use the short name in the same way as you would use a `webdav:` abbreviation:

```
<img src="{{cdn "customcdn:img/image.jpg"}}" />
```

In local development, that helper would return:

<pre>&lt;img src="<b>/assets/cdn/</b>customcdn/img/image.jpg" /&gt;
</pre>

Whereas in production, it would return:

```
<img src="https://bigcommerce.customcdn.net/img/image.jpg" />
```
As highlighted above, the helper is configured to rewrite *local* URLs to a `<theme-name>/assets/cdn/` subfolder. The `stencil bundle` command will exclude this local `assets/cdn/` subfolder from the bundle that it creates. This filtering circumvents the 50 MB size limit on the resulting .zip file.


### <a name="fonts"></a> {{getFontsCollection}}

The `getFontsCollection` helper is custom to Stencil. It returns a link tag that loads all selected font collections. It takes no parameters.


### <a name="inject"></a> {{inject}} and {{jsContext}}

Occasionally, your theme's client-side application code might need to incorporate dynamic data from the template context. Stencil provides two custom Handlebars helpers to help you achieve this: `inject`  and `jsContext`.

#### About the {{inject}} Helper

The `inject` helper collects data definitions for injection into the `jsContext` variable. It composes a JSON object containing a subset of the template context to be sent to the browser. Parameters of the `inject` helper are:

- `key`: a string.
- `value`: multiple types supported. 

An `inject` call takes this form:

```
{{inject "stringBasedKey" contextValue}}
```

#### About the {{jsContext}} Helper

The `jsContext` helper takes no parameters; it simply returns a JSON object containing all data collected by the `inject` helper. To retrieve the parsable JSON object, just call `{{jsContext}}` after all of the `{{inject}}` calls.


#### {{inject}} + {{jsContext}} Example 1

To set up the product name in your client-side app, you can do the following, if you are in the context of a product:

```
{{inject "myProductName" product.title}}

<script>
// Note the lack of quotes around the jsContext handlebars helper, it becomes a string automatically.
var jsContext = JSON.parse({{jsContext}}); 

// jsContext would output "{\"myProductName\": \"Sample Product\"}" which can feed directly into 
your JavaScript.

console.log(jsContext.myProductName); // Will output: Sample Product
</script>
```

##### Notes on Example 1

You can compose your JSON object across multiple pages to create a different set of client-side data, depending on the currently loaded template context.

The Stencil theme makes the `jsContext` available on the active page scoped. It also makes it available on the global `PageManager` objects, as `this.context`.

#### {{inject}} Example 2

The following code uses `inject` to add all product IDs into JavaScript on category pages. It resides in a theme's `<theme-name>/templates/pages/category.html` template. Note the two `inject` calls directly under the front matter:

```
---
category:
    shop_by_price: true
    products:
        limit: {{theme_settings.categorypage_products_per_page}}
---
{{inject "categoryProductsPerPage" theme_settings.categorypage_products_per_page}}
{{inject "productIds" (pluck category.products 'id')}}
{{#partial "head"}}
    {{#if pagination.category.previous}}
        <link rel="prev" href="{{pagination.category.previous}}">
    {{/if}}
    {{#if pagination.category.next}}
        <link rel="next" href="{{pagination.category.next}}">
    {{/if}}
{{/partial}}

{{#partial "page"}}

{{> components/common/breadcrumbs breadcrumbs=breadcrumbs}}
{{#if category.image}}
    <img src="{{getImage category.image 'zoom_size'}}">
{{/if}}
<h1 class="page-heading">{{category.name}}</h1>
{{{category.description}}}
{{{snippet 'categories'}}}
<div class="page">
    <aside class="page-sidebar" id="faceted-search-container">
        {{> components/category/sidebar}}
    </aside>

    <main class="page-content" id="product-listing-container">
        {{#if category.products}}
            {{> components/category/product-listing}}
        {{else}}
            <p>{{lang 'categories.no_products'}}</p>
        {{/if}}
    </main>
</div>

{{/partial}}
{{> layout/base}}
```

### <a name="stylesheet"></a> {{stylesheet}}

The `stylesheet` helper is custom to Stencil. It renders a link tag to insert a stylesheet into your theme. (This is required if you want Theme Editor to rewrite the stylesheet file when a merchant customizes their theme.) This helper returns an HTML string.

#### Parameters

- path: String containing the path to the theme's CSS stylesheet file.
- Other parameters are optional, appended in the form: `key="value"`.

#### Example

```
{{{stylesheet "assets/css/style.css" class="myStylesheet"}}}
```


# <a name="markdown"></a> Markdown Helpers

The following standard helper is available to convert markdown.

### {{markdown}}

Block helper that converts a string of inline markdown to HTML.

#### Parameters

* `context` {Object}
* `options` {Object}
* `returns` {String}

#### Example

```html
{{#markdown}}
# Foo
{{/markdown}}
//=> <h1>Foo</h1>
```

# <a name="math"></a> Math Helpers

The following standard helpers are available to handle mathematical operations.


### {{add}}

Returns the sum of `a` plus `b`.

#### Parameters

* `a` {Number}
* `b` {Number}

### {{subtract}}

Return the differnece of `a` minus `b`.

#### Parameters

* `a` {Number}
* `b` {Number}

### {{divide}}

Divides `a` by `b`.

#### Parameters

* `a` {Number}: numerator
* `b` {Number}: denominator

### {{multiply}}

Multiplies `a` by `b`.

#### Parameters

* `a` {Number}: factor
* `b` {Number}: multiplier

### {{floor}}

Gets the `Math.floor()` of the given value.

#### Parameters

* `value` {Number}

### {{ceil}}

Gets the `Math.ceil()` [ceiling] of the given value.

#### Parameters

* `value` {Number}

### {{round}}

Rounds the given value.

#### Parameters

* `value` {Number}

### {{sum}}

Returns the sum of all numbers in the given array.

#### Parameters

* `array` {Array}: Array of numbers to add up.
* `returns` {Number}

#### Example

```handlebars
{{sum "[1, 2, 3, 4, 5]"}}
//=> '15'
```

### {{avg}}

Returns the average of all numbers in the given array.

#### Parameters

* `array` {Array}: Array of numbers to add up and average.
* `returns` {Number}

#### Example

```handlebars
{{avg "[1, 2, 3, 4, 5]"}}
//=> '3'
```

# <a name="number"></a> Number Helpers

The following standard helpers are available to handle and transform numbers.

### {{addCommas}}

Adds commas to numbers.

#### Parameters

* `num` {Number}
* `returns` {Number}

### {{phoneNumber}}

Converts a string or number to a formatted phone number.

#### Parameters

* `num` {Number|String}: The phone number to format, e.g., `8005551212`
* `returns` {Number}: The formatted phone number: `(800) 555-1212`

### {{random}}

Generates a random number between two values.

#### Parameters

* `min` {Number}
* `max` {Number}
* `returns` {String}

### {{toAbbr}}

Abbreviates numbers to the given number of `precision`. This is for general numbers, not size in bytes.

#### Parameters

* `number` {Number}
* `precision` {Number}
* `returns` {String}

### {{toExponential}}

Returns a string, representing the given number in exponential notation.

#### Parameters

* `number` {Number}
* `fractionDigits` {Number}: Optional. An integer specifying the number of digits to use after the decimal point. Defaults to as many digits as necessary to specify the number.
* `returns` {Number}

#### Example

```js
{{toExponential number digits}};
```

### {{toFixed}}

Formats the given number, using fixed-point notation.

#### Parameters

* `number` {Number}
* `digits` {Number}: Optional. The number of digits to use after the decimal point. This can be a value between 0 and 20, inclusive, and implementations may optionally support a larger range of values. If this argument is omitted, it is treated as 0.
* `returns` {Number}

### {{toFloat}}

#### Parameters

* `number` {Number}
* `returns` {Number}

### {{toInt}}

#### Parameters

* `number` {Number}
* `returns` {Number}

### {{toPrecision}}

#### Parameters

* `number` {Number}
* `precision` {Number}: Optional. The number of significant digits.
* `returns` {Number}


# <a name="object"></a> Object Helpers

The following standard helpers are available to handle objects.

### {{extend}}

Extends the context with the properties of other objects. A shallow merge is performed to avoid mutating the context.

#### Parameters

* `objects` {Object}: One or more objects to extend.
* `returns` {Object}

### {{forIn}}

Block helper that iterates over the properties of an object, exposing each key and value on the context.

#### Parameters

* `context` {Object}
* `options` {Object}
* `returns` {String}

### {{forOwn}}

Block helper that iterates over the *own* properties of an object, exposing each key and value on the context.

#### Parameters

* `obj` {Object}: The object to iterate over.
* `options` {Object}
* `returns` {String}

### {{toPath}}

Takes arguments and, if they are string or number, converts them to a dot-delineated object property path.

#### Parameters

* `prop` {String|Number}: The property segments to assemble (can be multiple).
* `returns` {String}

### {{get}}

Uses property paths (`a.b.c`) to get a value or nested value from the context. Works as a regular helper or block helper.

#### Parameters

* `prop` {String}: The property to get, optionally using dot notation for nested properties.
* `context` {Object}: The context object.
* `options` {Object}: The Handlebars options object, if used as a block helper.
* `returns` {String}

### {{getObject}}

Uses property paths (`a.b.c`) to get an object from the context. Unlike the `get` helper, this helper will return the actual object, including the given property key. Also, this helper does not work as a block helper.

#### Parameters

* `prop` {String}: The property to get, optionally using dot notation for nested properties.
* `context` {Object}: The context object.
* `returns` {String}

### {{hasOwn}}

Returns true if `key` is an own, enumerable property of the given `context` object.

#### Parameters

* `key` {String}
* `context` {Object}: The context object.
* `returns` {Boolean}

#### Example

```handlebars
{{hasOwn context key}}
```

### {{isObject}}

Returns true if `value` is an object.

#### Parameters

* `value` {String}
* `returns` {Boolean}

#### Example

```handlebars
{{isObject "foo"}}
//=> false
```

### {{merge}}

Deeply merges the properties of the given `objects` with the context object.

#### Parameters

* `object` {Object}: The target object. Pass an empty object to shallow-clone.
* `objects` {Object}
* `returns` {Object}

### {{JSONparse}}

Block helper that parses a string using `JSON.parse`, then passes the parsed object to the block as context.

#### Parameters

* `string` {String}: The string to parse.
* `options` {Object}: Handlebars options object.

### {{JSONstringify}}

Stringifies an object using `JSON.stringify`.

#### Parameters

* `obj` {Object}: Object to stringify.
* `returns` {String}


# <a name="operator"></a> Operator Helpers

The Stencil framework supports the following operator helpers:

[Comparison Operators](#op_comparison)
[Logical {{or}} Operator](#op_logical)
[{{typeof}} Operator](#op_type)

## <a name="op_comparison"></a> Comparison Operators

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

## <a name="op_logical"></a> Logical {{or}} Operator

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


## <a name="op_type"></a> {{typeof}} Operator

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


# <a name="string"></a> String Helpers

The following helpers are available to manipulate strings:

* [Stencil Custom String Helpers](#string_custom)
* [Standard String Helpers](#string_std)


## <a name="string_custom"></a> Stencil Custom String Helpers

The following string helpers are custom to the Stencil framework.

### <a name="block-helper"></a> {{block}} </span>

The `block` string helper is custom to Stencil. It defines a block of content, which can be overwritten by the [partial](#partial-helper) helper.

### {{concat}}

The `concat` helper is custom to Stencil. It concatenates two string objects from the page's context, which are passed as parameters. It returns a new string object.

#### Example

```
{{concat breadcrumbs.[0].name breadcrumbs.[0].url}}
```

### {{dynamicComponent}}

The `dynamicComponent` string helper is custom to Stencil. It inserts a dynamic partial from within the path that is supplied as its parameter.


### {{json}}

The `json` string helper is custom to Stencil. You can use this helper to convert a JavaScript string object (from the page's context) into a JSON string object.


### {{lang}}

The `lang` string helper is custom to Stencil. It maps keys to translation files, based on the locale indicated by the visitor’s browser. Its parameters are the following keys:

- `translationKey`: a string.
- `options`: key-value pairs.


### {{nl2br}}

The `nl2br` helper is custom to Stencil. You can call this helper on a string object from the page's context, to convert its contained newline characters (`\r\n`, `\n\r`, `\r`, `\n`) to `<br>` tags. The `nl2br` helper returns a new string object.

#### Example

This Handlebars statement:

```
{{nl2br settings.address}}
```

...will take this example string:

```
"settings": {
  "address": "\r\n685 Market St\r\nSan Francisco\r\n94105\r\nCA\r\n"
}
```

...and return

```
"<br>685 Market St<br>San Francisco<br>94105<br>CA<br>"
```

### <a name="partial-helper"></a> {{partial}}

The `partial` string helper is custom to Stencil. It overrides block content defined by the [block](#block-helper) helper.


### {{replace}}

The `replace` string helper is custom to Stencil. It searches for the first parameter within the second parameter and, if it finds it, replaces the first parameter with the contents of the specified Handlebars block.

For example, the following code would search for the string `needle` within the scope defined by `haystack`. If found, it would replace that string with the Handlebars block defined by `<context...replacement>`:

```
{{#replace "needle" haystack}}
  {{<context to use as a replacement>}}
{{/replace}}
```

### {{toLowerCase}}

The `toLowerCase` helper is custom to Stencil. Use this helper to return a copy of a string object, in all-lowercase. The helper returns a new string object.

#### Example

This Handlebars statement:

```
{{toLowerCase head.title}}
```

...will take this example string:

```
"head": {
  "title": "This is my TEST Store"
}
```

...and return:

```
"this is my test store"
```


## <a name="string_std"></a> Standard String Helpers

The following standard string helpers are supported on the Stencil framework.

### {{camelcase}}

camelCases the characters in the given `string`.

#### Parameters

* `string` {String}: The string to camelcase.
* `returns` {String}

#### Example

```js
{{camelcase "foo bar baz"}};
//=> 'fooBarBaz'
```

### {{capitalize}}

Capitalizes the first word in a sentence.

#### Parameters

* `str` {String}
* `returns` {String}

#### Example

```handlebars
{{capitalize "foo bar baz"}}
//=> "Foo bar baz"
```

### {{capitalizeAll}}

Capitalizes all words in a string.

#### Parameters

* `str` {String}
* `returns` {String}

#### Example

```handlebars
{{capitalizeAll "foo bar baz"}}
//=> "Foo Bar Baz"
```

### {{center}}

Centers a string, using non-breaking spaces.

#### Parameters

* `str` {String}
* `spaces` {String}
* `returns` {String}

### {{chop}}

Like `trim`, but removes both extraneous whitespace *and non-word characters* from the beginning and end of a string.

#### Parameters

* `string` {String}: The string to chop.
* `returns` {String}

#### Example

```js
{{chop "_ABC_"}}
//=> 'ABC'

{{chop "-ABC-"}}
//=> 'ABC'

{{chop " ABC "}}
//=> 'ABC'
```

### {{dashcase}}

dash-cases the characters in `string`. Replaces non-word characters and periods with hyphens.

#### Parameters

* `string` {String}
* `returns` {String}

#### Example

```js
{{dashcase "a-b-c d_e"}}
//=> 'a-b-c-d-e'
```

### {{dotcase}}

dot.cases the characters in `string`.

#### Parameters

* `string` {String}
* `returns` {String}

#### Example

```js
{{dotcase "a-b-c d_e"}}
//=> 'a.b.c.d.e'
```

### {{hyphenate}}

Replaces spaces in a string with hyphens.

#### Parameters

* `str` {String}
* `returns` {String}

#### Example

```handlebars
{{hyphenate "foo bar baz qux"}}
//=> "foo-bar-baz-qux"
```

### {{isString}}

Returns true if `value` is a string.

#### Parameters

* `value` {String}
* `returns` {Boolean}

#### Example

```handlebars
{{isString "foo"}}
//=> 'true'
```

### {{lowercase}}

Lowercases all characters in the given string.

#### Parameters

* `str` {String}
* `returns` {String}

#### Example

```handlebars
{{lowercase "Foo BAR baZ"}}
//=> 'foo bar baz'
```

### {{occurrences}}

Returns the number of occurrences of `substring` within the given `string`.

#### Parameters

* `str` {String}
* `substring` {String}
* `returns` {Number}: Number of occurrences.

#### Example

```handlebars
{{occurrences "foo bar foo bar baz" "foo"}}
//=> 2
```

### {{pascalcase}}

PascalCases the characters in `string`.

#### Parameters

* `string` {String}
* `returns` {String}

#### Example

```js
{{pascalcase "foo bar baz"}}
//=> 'FooBarBaz'
```

### {{pathcase}}

path/cases the characters in `string`.

#### Parameters

* `string` {String}
* `returns` {String}

#### Example

```js
{{pathcase "a-b-c d_e"}}
//=> 'a/b/c/d/e'
```

### {{plusify}}

Replaces spaces in the given string with pluses.

#### Parameters

* `str` {String}: The input string
* `returns` {String}: Input string with spaces replaced by plus signs

#### Example

```handlebars
{{plusify "foo bar baz"}}
//=> 'foo+bar+baz'
```

### {{reverse}}

Reverses a string.

#### Parameters

* `str` {String}
* `returns` {String}

#### Example

```handlebars
{{reverse "abcde"}}
//=> 'edcba'
```

### {{sentence}}

Sentence-cases the given string.

#### Parameters

* `str` {String}
* `returns` {String}

#### Example

```handlebars
{{sentence "hello world. goodbye world."}}
//=> 'Hello world. Goodbye world.'
```

### {{snakecase}}

snake_cases the characters in the given `string`.

#### Parameters

* `string` {String}
* `returns` {String}

#### Example

```js
{{snakecase "a-b-c d_e"}}
//=> 'a_b_c_d_e'
```

### {{split}}

Splits `string` at the given `character`.

#### Parameters

* `string` {String}: The string to split.
* `returns` {String} `character`: Default is `,`

#### Example

```js
{{split "a,b,c" ","}}
//=> ['a', 'b', 'c']
```

### {{startsWith}}

Tests whether a string begins with the given prefix.

#### Parameters

* `prefix` {String}
* `testString` {String}
* `options` {String}
* `returns` {String}

#### Example

```handlebars
{{#startsWith "Goodbye" "Hello, world!"}}
  Whoops
{{else}}
  Bro, do you even hello world?
{{/startsWith}}
```
### {{titleize}}

Title-cases the given string.

#### Parameters

* `str` {String}
* `returns` {String}

#### Example

```handlebars
{{titleize "this is title case"}}
//=> 'This Is Title Case'
```

### {{trim}}

Removes extraneous whitespace from the beginning and end of a string.

#### Parameters

* `string` {String}: The string to trim.
* `returns` {String}

#### Example

```js
{{trim " ABC "}}
//=> 'ABC'
```

### {{uppercase}}

Uppercases all of the characters in the given string. If used as a block helper, it will uppercase the entire block. This helper
does not support inverse blocks.

#### Parameters

* `str` {String}: The string to uppercase.
* `options` {Object}: Handlebars options object.
* `returns` {String}


# <a name="url"></a> URL Helpers

The following standard helpers are available to transform URLs.


### {{encodeURI}}

Encodes a Uniform Resource Identifier (URI) component, by replacing each instance of certain characters by one, two, three, or four escape sequences that represent the UTF-8 encoding of the character.

#### Parameters

* `str` {String}: The un-encoded string.
* `returns` {String}: The encoded string.

### {{decodeURI}}

Decodes a Uniform Resource Identifier (URI) component.

#### Parameters

* `str` {String}
* `returns` {String}

### {{urlResolve}}

Takes a base URL, and an href URL, and resolves them as a browser would for an anchor tag.

#### Parameters

* `base` {String}
* `href` {String}
* `returns` {String}

### {{urlParse}}

Parses a `url` string into an object.

#### Parameters

* `str` {String}: URL string.
* `returns` {String}: Returns stringified JSON.

### {{stripQuerystring}}

Strips the query string from a `url`.

#### Parameters

* `url` {String}
* `returns` {String}: The URL without the queryString.

### {{stripProtocol}}

Strips the protocol from a `url`.

Useful for displaying media that might have an `http` protocol on secure connections. Will change `http://foo.bar` to `//foo.bar`

#### Parameters

* `str` {String}
* `returns` {String}: The URL with the `http` protocol stripped.


# <a name="misc"></a> Miscellaneous Helpers

The following standard helpers are also supported on the Stencil framework.


### {{default}}

Returns the first value, if that value is defined; otherwise, returns the "default" value.

#### Parameters

* `value` {any}
* `defaultValue` {any}
* `returns` {String}

### {{option}}

Given the context `{options: {a: {b: {c: 'ddd'}}}}`, returns the given value of `prop` from `this.options`.

#### Parameters

* `prop` {String}
* `returns` {any}

#### Example

```handlebars
{{option "a.b.c"}}
<!-- results => `ddd` -->
```

### {{noop}}

Block helper that renders the block without taking any arguments.

#### Parameters

* `options` {Object}
* `returns` {String}

### {{withHash}}

Block helper that builds the context for the block from the options hash.

#### Parameters

* `options` {Object}: Handlebars-provided options object.

