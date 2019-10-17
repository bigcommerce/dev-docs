# Handlebars Helpers Reference

<div class="otp" id="no-index">

### On This Page
- [Array Helpers](#array-helpers)
- [Collection Helpers](#collection-helpers)
- [Example](#example)
- [Comparison Helpers](#comparison-helpers)
- [Control-Flow Helpers](#control-flow-helpers)
- [Conditional Control Flow](#conditional-control-flow)
- [Loop Control Flow](#loop-control-flow)
- [Date Helpers](#date-helpers)
- [HTML Helpers](#html-helpers)
- [Image Helpers](#image-helpers)
- [Inflection Helpers](#inflection-helpers)
- [Injection Helpers](#injection-helpers)
- [Markdown Helpers](#markdown-helpers)
- [Math Helpers](#math-helpers)
- [Number Helpers](#number-helpers)
- [Object Helpers](#object-helpers)
- [Operator Helpers](#operator-helpers)
- [Comparison Operators](#comparison-operators)
- [String Helpers](#string-helpers)
- [URL Helpers](#url-helpers)
- [Miscellaneous Helpers](#miscellaneous-helpers)
- [Resources](#resources)

</div>

This page describes all of the Handlebars helpers supported on the Stencil framework. It includes helpers that are custom to, or customized for, Stencil. They are marked as **Custom Helper**. Only certain standard helpers are whitelisted and they are listed below as **Standard Helpers**. 

For background information on using Handlebars helpers, please see the [official Handlebars documentation](http://handlebarsjs.com).



<a href='#handlebars-helpers-reference_array' aria-hidden='true' class='block-anchor'  id='handlebars-helpers-reference_array'><i aria-hidden='true' class='linkify icon'></i></a>


## Array Helpers

The following helpers manage arrays.

### {{join}}

**Custom Helper**

It joins an array of string items, with separators. It returns a string.

#### Parameters

- `values`: {Array}
- `separator`: {String}
- `limit=<number>`: An optional limit.


#### Example

Join is used with `{{pluck}}` to display the faceted search navigation . In the example below the arguments are:

* value -- `(pluck facets 'title')`
* seperator -- `,`
* limit -- `2`

```js
{{#if facets.length '>' 2}}
    {{lang 'search.faceted.browse-by'}} {{ join (pluck facets 'title') ', ' limit=2 }} &amp; {{ toLowerCase (lang 'search.faceted.more') }}
{{/if}}
```

### {{limit}}

**Custom Helper**

It limits the number of items returned from an array variable, and returns a new array.

#### Parameters

- `data`: {Array}
- `limit`: {Number}

#### Example

Assume that `{{cart.items}}` would return 10 items. You could use this helper to limit that behavior to only the first four items, by specifying:

```html
{{#each (limit cart.items 4)}}
    <li class="previewCartItem">
        <div class="previewCartItem-image">
            {{#if type '==' 'GiftCertificate'}}
                <img src="{{cdn ../../theme_settings.default_image_gift_certificate}}" alt="GiftCertificate" title="GiftCertificate">
            {{else}}
                {{> components/common/responsive-img
                    image=image
                    fallback_size=../../theme_settings.productthumb_size
                    lazyload=../../theme_settings.lazyload_mode
                    default_image=../../theme_settings.default_image_product
                }}
            {{/if}}
  ...
```


* [Paper Handlebars](https://github.com/bigcommerce/paper-handlebars/blob/master/spec/helpers/limit.js) 
* [Cornerstone](https://github.com/bigcommerce/cornerstone/blob/master/templates/components/common/cart-preview.html)



### {{pluck}}

**Custom Helper**

For one specified search key(s), it retrieves corresponding values from some or all elements in a specified collection.

The `pluck` helper returns the retrieved values in a comma-separated string. This helper's general form is:

```html
{{pluck ([limit] <collection> [<limit-value>]) '<search-key>'}}
```

#### Parameters

- `limit`, `limit-value`: Optional parameters to limit the number of results returned.
- `collection`: The collection to search.
- `search-key`: The string to search for.


### {{pluck}} Example 1

Assume that the `categories` collection contains:

```html
categories: [
  { "id": 1, "name": "Bakeware" },
  { "id": 2, "name": "Cookware" },
  { "id": 3, "name": "Cutlery" }
]
```

In this case, this Handlebars statement:

```html
{{pluck (limit categories 2) 'name'}}
<!-- Returns: ["Bakeware","Cookware"] -->
```

### {{pluck}} Example 2

If each category in `categories`  contains an image object, use dot notation to access the image's children:

```json
categories: [
  { "id": 1, "name": "Bakeware", "image": { "data": "http://...", "alt": "Bakeware image"} },
  { "id": 2, "name": "Cookware", "image": { "data": "http://...", "alt": "Cookware image"} },
  { "id": 3, "name": "Cutlery", "image": { "data": "http://...", "alt": "Cutlery image"} }
]
```

Handlebars statement:

```html
{{pluck (limit categories 2) 'image.data'}}
<!-- Returns a comma-separated list of image URLs -->
```

### {{after}}

**Standard Helper**

Returns all of the items in an array after the specified index. Opposite of [before](#before).

#### Parameters

* `array` {Array}: Collection.
* `n` {Number}: Starting index (number of items to exclude).
* `returns` {Array}: Array exluding `n` items.

#### Example

Given the array `['a', 'b', 'c']`:

```handlebars
{{after array 1}}
//=> '["c"]'
```



### {{arrayify}}

**Standard Helper**

Casts the given `value` to an array.

#### Parameters

* `value` {any}
* `returns` {Array}

#### Example

```handlebars
{{arrayify "foo"}}
//=> '["foo"]'
```



<a name="before"></a>

### {{before}}

**Standard Helper**

Returns all of the items in the collection before the specified count. Opposite of [after](#after).


#### Parameters

* `array` {Array}
* `n` {Number}
* `returns` {Array}: Array excluding items after the given number.

#### Example

Given the array `['a', 'b', 'c']`:

```handlebars
{{before array 2}}
//=> '["a", "b"]'
```



### {{eachIndex}}

**Standard Helper**

Add 0 based indexing to the current handlebars loop. 

#### Parameters

* `array` {Array}
* `options` {Object}
* `returns` {String}

#### Example

```html
"collection": ["Towels", "Bath Soap", "T-Shirts"]
```

```handlebars
{{#eachIndex collection}}
  {{this}} is {{index}}
{{/eachIndex}}
//=> Towels is 0, Bath Soap is 1, T-Shirts is 2
```



### {{filter}}

**Standard Helper**

Block helper that filters the given array. Renders the block for values that evaluate to `true`; otherwise, returns the inverse block.

#### Parameters

* `array` {Array}
* `value` {any}
* `options` {Object}
* `returns` {String}

#### Example

```handlebars
<!-- 
product: shirt
myProducts: 
- shirt
- mug
- book  -->

{{#filter myProducts product}}
  There is a {{this}} available.
{{else}}
  No products found
{{/filter}}
=> There is a shirt available.
```



<a name="first"></a>

### {{first}}

**Standard Helper**

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

**Standard Helper**

Iterates over each item in an array, and exposes the current item in the array as context to the inner block. In addition to the current array item, the helper exposes the following variables to the inner block:

* `index`
* `total`
* `isFirst`
* `isLast`

`@index` is exposed as a private variable, and additional private variables may be defined as hash arguments.

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
```

```html
{{#forEach accounts}}
  <a href="mailto:{{ email }}" title="Send an email to {{ name }}">
    {{ name }}
  </a>{{#unless isLast}}, {{/unless}}
{{/forEach}}
```



### {{inArray}}

**Standard Helper**

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
  "The product is available"
{{else}}
 "The product is no longer available"
{{/inArray}}
//=> "The product is no longer available"
```



### {{isArray}}

**Standard Helper**

Returns true if `value` is an es5 array.

#### Parameters

* `value` {any}: The value to test.
* `returns` {Boolean}

#### Example

```handlebars
{{isArray "applepearbananas"}}
<!-- results in: false -->

<!-- array: [apple, pears, bananas] -->
{{isArray array}}
<!-- results in: true -->
```



<a name="last"></a>

###  {{last}}

**Standard Helper**

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

**Standard Helper**

Block helper that compares the length of the given array to the number passed as the second argument. If the array length is equal to the given `length`, the block is returned. Otherwise, you have the option of returning an inverse block.

#### Parameters

* `array` {Array}
* `length` {Number}
* `options` {Object}
* `returns` {String}

#### Example

Given the collection:

```json
"collection": [
  {
    "name": "Mug",
    "id": 12
  },
  {
    "name": "Towel",
    "id": 239
  },
  {
    "name": "Poster",
    "id": 12
  }
]
```

```handlebars
{{#lengthEqual collection 3}}
  There are 3 products available.
{{else}}
  This are not 3 products available.
{{/lengthEqual}}
//=> 'There are 3 products available.'
```



### {{map}}

**Standard Helper**

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

**Standard Helper**

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

**Standard Helper**

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

**Standard Helper**

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



<a name="withAfter"></a>

### {{withAfter}}

**Standard Helper**

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



<a name="withBefore"></a>

### {{withBefore}}

**Standard Helper**

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



<a name="withFirst"></a>

### {{withFirst}}

**Standard Helper**

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



<a name="withLast"></a>

###  {{withLast}}

**Standard Helper**

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

**Standard Helper**

Block helper that sorts a collection and exposes the sorted collection as context inside the block.

#### Parameters

* `array` {Array}
* `prop` {String}
* `options` {Object}: Specify `reverse="true"` to reverse the array.
* `returns` {String}

#### Example

Given the collection:

```json
"collection": [
  {
    "name": "Mug",
    "id": 13
  },
  {
    "name": "Towel",
    "id": 239
  },
  {
    "name": "Poster",
    "id": 12
  }
]
```


```handlebars
{{#withSort collection "id"}}
  {{name}} : {{id}}
{{/withSort}}
//=> Poster : 12
Mug: 13
Towel: 239
```



<a href='#handlebars-helpers-reference_collection' aria-hidden='true' class='block-anchor'  id='handlebars-helpers-reference_collection'><i aria-hidden='true' class='linkify icon'></i></a>

## Collection Helpers


### {{isEmpty}}

**Standard Helper**

Block helper that returns a block *if* the given collection is empty. If the collection is not empty, returns the inverse block (if supplied).

#### Parameters

* `collection` {Object}
* `options` {Object}
* `returns` {String}

#### Example

```handlebars
<!-- array: [] -->
{{#isEmpty array}}
  AAA
{{else}}
  BBB
{{/isEmpty}}
<!-- results in: 'AAA' -->

<!-- array: [] -->
{{isEmpty array}}
<!-- results in: true -->
```



### {{iterate}}

**Standard Helper**

Iterates over an array or object.

#### Parameters

* `context` {Object|Array}: The collection to iterate over.
* `options` {Object}
* `returns` {String}

## Example

Given the array:
`[{name: 'a'}, {name: 'b'}, {name: 'c'}];`


```handlebars
{{#iterate array}}
  {{name}}
{{/iterate}}
=> `abc`
```



### {{length}}

**Standard Helper**

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



<a href="#handlebars-helpers-reference_comparison" aria-hidden='true' class='block-anchor'  id='handlebars-helpers-reference_comparison'><i aria-hidden='true' class='linkify icon'></i></a>

## Comparison Helpers



### {{and}}

**Standard Helper**

Block helper that renders the block if *both* of the given values are truthy. If you specify an inverse block, it will be rendered when falsy.

#### Parameters

* `a` {any}
* `b` {any}
* `options` {Object}: Handlebars-provided options object.
* `returns` {String}


#### Example

```handlebars
<!-- {great: true, magnificent: true} -->
{{#and great magnificent}}
  A
{{else}}
  B
{{/and}}
=> 'A'
```

```handlebars
<!-- {great: true, magnificent: false} -->
{{#and great magnificent}}A{{else}}B{{/and}}
=> 'B'
```



### {{gt}}

**Standard Helper**

Block helper that renders a block if `a` is *greater than* `b`. (a > b)

If an inverse block is specified, it will be rendered when falsy. You may optionally use the `compare=""` hash argument for the second value.

#### Parameters

* `a` {String}
* `b` {String}
* `options` {Object}: Handlebars-provided options object.
* `returns` {String}: Block, or inverse block if specified and falsy.

#### Example

```handlebars
{{#gt a b}}
  A
{{else}}
  B
{{/gt}}

a = 20, b=15 // true
=> 'A'
a = 15, b=15 //equal
=> 'B'
a = 14, b = 15 //false
=> 'B'
```



### {{gte}}

**Standard Helper**

Block helper that renders a block if `a` is *greater than or equal to* `b`. (a >= b)

If an inverse block is specified, it will be rendered when falsy. You may optionally use the `compare=""` hash argument for the second value.

#### Parameters

* `a` {String}
* `b` {String}
* `options` {Object}: Handlebars-provided options object
* `returns` {String}: Block, or inverse block if specified and falsy.

```handlebars
{{#gt a b}}
  A
{{else}}
  B
{{/gt}}

a = 20, b=15 // true
=> 'A'
a = 15, b=15 //equal
=> 'A'
a = 14, b = 15 //false
=> 'B'
```



### {{has}}

**Standard Helper**

Block helper that renders a block if `value` has `pattern`. If an inverse block is specified, it will be rendered when falsy.

#### Parameters

* `val` {any}: The value to check.
* `pattern` {any}: The pattern to check for.
* `options` {Object}: Handlebars-provided options object.
* `returns` {String}

#### Example

```handlebars
a = "product"
{{has "a"}}
=> 'true'
```



### {{eq}}

**Standard Helper**

Block helper that renders a block if `a` is *equal to* `b`. If an inverse block is specified,  it will be rendered when falsy. You may optionally use the `compare=""` hash argument for the second value.

#### Parameters

* `a` {String}
* `b` {String}
* `options` {Object}: Handlebars-provided options object.
* `returns` {String}: Block, or inverse block if specified and falsy.


#### Example

```handlebars
number = 8
{{#eq number compare=8}}
  A
{{/eq}
=> 'A'
```

```handlebars
number = 9
{{#eq number compare=8}}
  A
{{else}}
  B{
{{/eq}}
=> 'B'
```

```handlebars
number = 8
{{#eq number 8}}
  A
{{else}}
  B
{{/eq}}
-> 'B'
```



### {{ifEven}}

**Standard Helper**

Returns `true` if the given value is an even number.

#### Parameters

* `number` {Number}
* `options` {Object}: Handlebars-provided options object
* `returns` {String}: Block, or inverse block if specified and falsy.

#### Example

```handlebars
value = 8
{{#ifEven value}}
  render A
{{else}}
  render B
{{/ifEven}}
=> A
```

```handlebars
value = 9
{{#ifEven value}}
  render A
{{else}}
  render B
{{/ifEven}}
=> B
```



### {{ifNth}}

**Standard Helper**

Conditionally renders a block *if* dividing the `a` operand by `b` yields a remainder of zero. If you specify an inverse block, it will be rendered when the remainder is *not* zero.

#### Parameters

* `{}`: {Number}
* `{}`: {Number}
* `options` {Object}: Handlebars-provided options object.
* `returns` {String}: Block, or inverse block if specified and falsy.

```handlebars
var context = {
  items: [
    { name: 'Towel' },
    { name: 'Mug' },
    { name: 'T-shirt' },
    { name: 'Soap' },
    { name: 'Coffee' }
  ]
};

{{#each items}}
  <div{{#ifNth 2 @index}}{{else}} class="row-alternate"{{/ifNth}}>{{name}}</div>
{{/each}}

Returns:
'<div>Towel</div>',
'<div class="row-alternate">Mug</div>',
'<div>T-shirt</div>',
'<div class="row-alternate">Soap</div>',
'<div>Coffee</div>'
```



### {{ifOdd}}

**Standard Helper**

Block helper that renders a block if `value` is *an odd number*. If an inverse block is specified, it will be rendered when falsy.

#### Parameters

* `value` {Object}
* `options` {Object}: Handlebars-provided options object.
* `returns` {String}: Block, or inverse block if specified and falsy.

#### Example

```handlebars
value = 9
{{#ifOdd value}}
  render A
{{else}}
  render B
{{/ifOdd}}
=> 'B'
```

```handlebars
value = 8
{{#ifOdd value}}
  render A
{{else}}
  render B
{{/ifOdd}}
=> 'B'
```



### {{is}}

**Standard Helper**

Block helper that renders a block if `a` is *equal to* `b`. If an inverse block is specified, it will be rendered when falsy.

#### Parameters

* `a` {any}
* `b` {any}
* `options` {Object}: Handlebars-provided options object.
* `returns` {String}

```handlebars
value = 'CCC'
{{#is value "CCC"}}
  A
{{else}}
  B
{{/is}}
=> 'A'
```

```handlebars
value = 'BBB'
{{#is value "CCC"}}
  A
{{else}}
  B
{{/is}}
=> 'B'
```

```handlebars
value = 'CCC'
{{#is value compare="CCC"}}
  A
{{else}}
  B
{{/is}}
=> 'A'
```



### {{isnt}}

**Standard Helper**

Block helper that renders a block if `a` is *not equal to* `b`. If an inverse block is specified, it will be rendered when falsy.

#### Parameters

* `a` {String}
* `b` {String}
* `options` {Object}: Handlebars-provided options object.
* `returns` {String}

#### Example

```handlebars
number = 3
{{#isnt number 2}}
  A
{{else}}
  B
{{/isnt}}
=>'A'
```

```handlebars
value = 'Soap'
{{#isnt value "Soap"}}
  A
{{else}}
  B
{{/isnt}}
=>'A'
```

```handlebars
value='CCC'
{{#isnt value compare="CCC"}}
  A
{{else}}
  B
{{/isnt}}
=>'A'
```



### {{lt}}

**Standard Helper**

Block helper that renders a block if `a` is *less than* `b`.

If an inverse block is specified, it will be rendered when falsy. You may optionally use the `compare=""` hash argument for the second value.

#### Parameters

* `context` {Object}
* `options` {Object}: Handlebars-provided options object.
* `returns` {String}: Block, or inverse block if specified and falsy.


#### Example

```handlebars
{{#lt a b}}
  A
{{else}}
  B
{{/lt}}

a = 14
b = 15
=> 'A'

a = 15
b = 15
=>'B'

a = 20
b = 15
=> 'B'

```

```handlebars
number = 5
{{#lt number compare=8}}A{{/lt}}
=> 'A'
```

```handlebars
number = 42
{{#lt number compare=8}}A{{/lt}}
=> '' //empty block when value is greater than given number
```



### {{lte}}

**Standard Helper**

Block helper that renders a block if `a` is *less than or equal to* `b`.

If an inverse block is specified, it will be rendered when falsy. You may optionally use the `compare=""` hash argument for the second value.

#### Parameters

* `a` {String}
* `b` {String}
* `options` {Object}: Handlebars-provided options object.
* `returns` {String}: Block, or inverse block if specified and falsy.

#### Example

```handlebars
{{#lte a b}}A{{else}}B{{/lte}}
a = 14
b = 15
=> 'A'

a = 15
b = 15
=> 'A'

a = 20
b = 15
=> 'B'
```

```handlebars
number = 1
{{#lte number compare=8}}A{{/lte}}
=> 'A'

number = 8
{{#lte number compare=8}}A{{/lte}}
=> 'A'

number = 27
{{#lte number compare=8}}A{{/lte}}
=> '' //does not render a block if the value is greater than a given number

```



### {{neither}}

**Standard Helper**

Block helper that renders a block if *neither of* the given values are truthy. If you specify an inverse block, it will be rendered when falsy.

#### Parameters

* `a` {any}
* `b` {any}
* `options` {}: Handlebars options object.
* `returns` {String}: Block, or inverse block if specified and falsy.

#### Example

```handlebars
product = true
customer = false
{{#neither product customer}}A{{else}}B{{/neither}}
=> 'A'

product = false
customer = true
{{#neither great magnificent}}A{{else}}B{{/neither}}
=> 'B'
```



### {{unlessEq}}

**Standard Helper**

Block helper that always renders the inverse block *unless `a` is equal to `b`*.

#### Parameters

* `a` {String}
* `b` {String}
* `options` {Object}: Handlebars-provided options object.
* `returns` {String}: Inverse block by default, or block if falsy.

```handlebars
number = 10
{{#unlessEq number compare=8}}A{{/unlessEq}}
=> 'A'

number = 8
{{#unlessEq number compare=8}}A{{/unlessEq}}
=> '' // returns empty when value is equal to a given number
```



### {{unlessGt}}

**Standard Helper**

Block helper that always renders the inverse block *unless `a` is greater than `b`*.

#### Parameters

* `context` {Object}
* `options` {Object}: Handlebars-provided options object.
* `returns` {String}: Inverse block by default, or block if falsy.

#### Example

```handlebars
number = 5
{{#unlessGt number compare=8}}A{{/unlessGt}}
=> 'A'

number = 10
{{#unlessGt number compare=8}}A{{/unlessGt}}
=> '' // returns empty when value is greater than a given number

```



### {{unlessLt}}

**Standard Helper**

Block helper that always renders the inverse block *unless `a` is less than `b`*.

#### Parameters

* `context` {Object}
* `options` {Object}: Handlebars-provided options object.
* `returns` {String}: Block, or inverse block if specified and falsy.

#### Example

```handlebars
number = 10
{{#unlessLt number compare=8}}A{{/unlessLt}}
=> 'A'

number = 5
{{#unlessLt number compare=8}}A{{/unlessLt}}
=> '' //returns empty when the value is less than a given number

```



### {{unlessGteq}}

**Standard Helper**

Block helper that always renders the inverse block *unless `a` is greater than or equal to `b`*.

#### Parameters

* `context` {Object}
* `options` {Object}: Handlebars-provided options object.
* `returns` {String}: Block, or inverse block if specified and falsy.

#### Example

```handlebars
number = 4
{{#unlessGteq number compare=8}}A{{/unlessGteq}}
=> 'A'

number = 8
{{#unlessGteq number compare=8}}A{{/unlessGteq}}
=> '' //returns empty when the value is greater than or equal to a given number

number = 34
{{#unlessGteq number compare=8}}A{{/unlessGteq}}
=> '' // returns empty when the value is greater than or equal to a given number
```



### {{unlessLteq}}

**Standard Helper**

Block helper that always renders the inverse block *unless `a` is less than or equal to `b`*.

#### Parameters

* `context` {Object}
* `options` {Object}: Handlebars-provided options object.
* `returns` {String}: Block, or inverse block if specified and falsy.

#### Example

```handlebars
number = 10
{{#unlessLteq number compare=8}}A{{/unlessLteq}}
=> 'A'

number = 8
{{#unlessLteq number compare=8}}A{{/unlessLteq}}
=> '' // returns empty when the value is less than or equal to a given number

number = 4
{{#unlessLteq number compare=8}}A{{/unlessLteq}}
=> '' // returns empty when the value is less than or equal to a given number
```



<a href="#handlebars-helpers-reference_control-flow" aria-hidden='true' class='block-anchor'  id='handlebars-helpers-reference_control-flow'><i aria-hidden='true' class='linkify icon'></i></a>

## Control-Flow Helpers

* <a href="#ctrl_conditional">Conditional Control Flow</a>
* <a href="#ctrl_loop">Loop Control Flow</a>



<a id="ctrl_conditional"></a>

## Conditional Control Flow

The following helpers provide control structures that test for conditions, and branch accordingly.


### {{if}}

**Custom Helper**

The `<statement>` that the `if` helper evaluates can take these forms:

- An object, as in: `{{#if object}}`.
- A comparison expression, as in: `{{#if <lvalue> <operator> <rvalue>}}`.


When you pass only one parameter to the `if` helper, it will return the following:
- For an array parameter, the array's length.
- For an empty object, a value of `false`.

#### Example

```html
{{#if <statement>}}
  <!--...-->
{{else if}}  /* optional else-if block */
  <!--...-->
{{else}}  /* optional else block */
  <!--...-->
{{/if}}
```

```html
  {{#if product.call_for_price}}
      <p class="productView-price">
          <span>{{product.call_for_price}}</span>
      </p>
  {{/if}}
```

### Nested if/else Statements to Test for if/and Conditions

Handlebars does not provide an `if`/`and` conditional structure. However, to test for multiple conditions, you can nest `if`/`else` statements, as shown in this example:

```html
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

### Usage
* [Paper Handlebars](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/if.js)
* [Cornerstone](https://github.com/bigcommerce/cornerstone/blob/master/templates/components/amp/products/product-view-details.html)



### {{unless}}

**Custom Helper**

The `unless` helper is logically the opposite of the [`if` helper](#if), subject to the restrictions below. 

#### Example

```html
{{#unless statement}}
   <!-- render unless statement is true -->
{{/unless}}
```

```html
{{#if price.with_tax}}
    <div class="price-section price-section--withTax rrp-price--withTax" {{#unless price.rrp_with_tax}}style="display: none;"{{/unless}}>
        {{theme_settings.pdp-retail-price-label}}
        <span data-product-rrp-with-tax class="price price--rrp">
            {{price.rrp_with_tax.formatted}}
        </span>
    </div>
...
```

Here is a usage example from Stencil's Cornerstone base theme: The `templates/pages/search.html` template displays search results. In this template's section that displays search suggestions, an `#unless` loop determines what to output for the final result:

```html
{{#each category_results}}
<li class="category-suggestion">
    {{#each this}}
        <a href="{{url}}">{{name}}</a>
        {{#unless @last}} > {{/unless}}
    {{/each}}
</li>
{{/each}}
```

### Restrictions

Statements using `unless` can refer to:

* Objects, as in: `{{#unless object}}`.

Unlike the `if` helper, `unless` on the Stencil framework does not support operators for comparison expressions.
So, for example, the following expression would throw an error:

```html
{{#unless this.alt "===" "hidden"}}
```

A workaround for this logic is to recast the expression as `if`/not-equal-to. So the following expression would be valid:

```html
{{#if this.alt "!==" "hidden"}}
```

## Loop Control Flow

The following helpers are used to control loop execution.

### {{any}}

**Custom Helper**

It checks whether at least one parameter evaluates to `true`.  Parameters can be of different types (strings, numbers, arrays, or collections).

#### Examples

The `any` helper is invoked as shown here:

```html
{{#any items selected=true}}
  <!-- block to display if any items have selected=true -->
{{/any}}
```

A usage example is [`templates/components/category/shop-by-price.html`](https://github.com/bigcommerce/cornerstone/blob/master/templates/components/category/shop-by-price.html), a category page in Stencil's Cornerstone base theme that does _not_ have faceted search turned on. Shoppers will see "Shop by price" filters instead of product filters.

In this component, the `{{#any...` Handlebars helper is used to determine whether a shopper has selected one of the filters, and whether a "reset" button needs to be displayed:

```html
{{#any shop_by_price selected=true}}
    <li class="navList-item">
        <a href="{{category_url}}" class="navList-action">
            {{lang 'category.reset'}}
        </a>
    </li>
{{/any}}
```


### {{all}}

**Custom Helper**

It checks whether _all_ parameters evaluate to `true`. Parameters can be of different types (strings, numbers, arrays, or collections).

#### Example

```html
{{#all items theme_settings.optionA theme_settings.optionB}}
  ... /* block to display, if all items evaluate to true */
{{/all}}
```

```html
{{#all product.custom_fields theme_settings.show_custom_fields_tabs}}
    <li class="tab">
        <a class="tab-title" href="#tab-{{dashcase (lowercase (sanitize theme_settings.pdp-custom-fields-tab-label))}}">{{sanitize theme_settings.pdp-custom-fields-tab-label}}</a>
    </li>
{{/all}}
```

### {{contains}} 

**Custom Helper**

It checks whether the second parameter is included in the first parameter (typically a collection).

#### Example

```html
{{#contains fonts "Roboto"}}
  <!--block to display, if any items contain "Roboto"-->
{{/contains}}
```

### Usage
* [Paper Handlebars](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/contains.js)



### {{each}}

**Standard Helper**

Each is a built in block helper. Use it to loop over an array or object.

#### Examples

```html
{{#each array | object}}
  <!--...-->
{{else}} /* optional block to execute if the the list is empty */
  <!--...-->
{{/each}}
```

```html
<article data-section-type="footer-categories">
    <h5 class="amp-footer-heading">{{lang 'footer.categories'}}</h5>
    <ul class="amp-footer-list">
        {{#each categories}}
            <li>
                <a href="{{url}}">{{name}}</a>
            </li>
        {{/each}}
    </ul>
</article>
```


```handlebars
//Given the array
{
  "products": [
    "T-Shirt",
    "Mug"
  ]
}

{{#each products}}
  {{this}}! //optional separator
{{/each}}

=> T-Shirt!Mug!
```


```handlebars
//Given the array, use @index for the current index
{
  "products": [
    "T-Shirt",
    "Mug"
  ]
}

{{#each products}}
  {{@index}}: {{this}} //optional separator
{{/each}}
=> 0: T-Shirt
1: Mug
```

```handlebars
// Given the object

{
  "products": {
    "id": "T-Shirt",
    "id": "Mug"
  }
}
{{#each products}}
  {{this}} ! //optional separator
{{/each}}

=> T-Shirt!Mug!
```

```handlebars
// Given the object use @key for the current key in the loop
// each key must be different

{
  "products": {
    "id": "T-Shirt",
    "key": "Mug"
  }
}
{{#each products}}
  {{@key}}:{{this}}! //optional separator
{{/each}}

=> key:T-Shirt! 
  id:Mug! 
```


#### Notes

- Within an each block, use `{{this}}` to reference the current item.
- Within an each block, use `{{@index}}` to reference the current item's index number.
- When iterating through objects, `{{@key}}` returns the current key name.
- `{{each}}` loops can be nested.
- `{{each}}` does not work on strings. eg. `{"foo": "Good"}`



### {{for}}

**Custom Helper**

In particular, this helper is limited to 100 iterations, in order to protect against infinite loops.

The `for` helper has the following syntax, where parameters `<from>` and `<to>` are numbers, and `<context>` is an object:

#### Example

```html
{{#for <from> <to> <context>}}
  <!--...-->
{{/for}}
```

```html
<select class="form-select form-select--date" name="attribute[{{this.id}}][month]" {{#if required}}required{{/if}}>
    <option value="">{{lang 'common.month'}}</option>
    {{#for 1 12}}
        <option value="{{$index}}" {{#if ../selected_date.month '==' $index}}selected="selected"{{/if}}>
            {{lang (concat 'common.short_months.' $index)}}
        </option>
    {{/for}}
</select>
```

### Reference
* [Cornerstone](https://github.com/bigcommerce/cornerstone/blob/master/templates/components/products/options/date.html)
* [Paper Handlebars](https://github.com/bigcommerce/paper-handlebars/blob/master/helpers/for.js)



<a href="#handlebars-helpers-reference_date" aria-hidden='true' class='block-anchor'  id='handlebars-helpers-reference_date'><i aria-hidden='true' class='linkify icon'></i></a>

## Date Helpers


### {{moment}}

**Standard Helper**

Exposes `helper-date` as `moment`.

#### Example

```html
{{#partial "page"}}
<!--... -->
<script>
	var fooDate = Date("{{moment}}"); // > 2019-07-15T00:00:00-05:00
	console.log(fooDate.toString()); // > Jul 15 2019 12:20:23 GMT-0500 (Central Daylight Time)
</script>
<!-- ... -->
{{/partial}}
```



<a href='#handlebars-helpers-reference_html' aria-hidden='true' class='block-anchor'  id='handlebars-helpers-reference_html'><i aria-hidden='true' class='linkify icon'></i></a>

## HTML Helpers

The following standard helpers are available to handle HTML content.


### {{ellipsis}}

**Standard Helper**

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

**Standard Helper**

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

**Standard Helper**

Block helper for creating unordered lists (`<ul></ul>`).

#### Parameters

* `context` {Object}
* `options` {Object}
* `returns` {String}

#### Example

```handlebars
{{#ul data class="names"}}{{aaa}} {{bbb}}{{/ul}}

=> <ul class="names"><li>AAA BBB</li></ul>
```



### {{ol}}

**Standard Helper**

Block helper for creating ordered lists  (`<ol></ol>`).

#### Parameters

* `context` {Object}
* `options` {Object}
* `returns` {String}


#### Example

```handlebars
{{#ol data class="names"}}{{aaa}} {{bbb}}{{/ol}}

=> <ol class="names"><li>aaa bbb</li></ol>

```



### {{thumbnailImage}}

**Standard Helper**

Returns a `<figure>` with a thumbnail linked to a full picture.

#### Parameters

* `context` {Object}: Object with values/attributes to add to the generated elements:
* `context.alt` {String}
* `context.src` {String}
* `context.width` {Number}
* `context.height` {Number}
* `returns` {String}: HTML `<figure>` element with image and optional caption/link.


#### Example

```handlebars
{{{thumbnailImage context}}}

var context = {
  data: {
    id: 'id',
    alt: 'Picture of a placeholder',
    thumbnail: 'http://placehold.it/200x200/0eafff/ffffff.png',
    size: {
      width: 200,
      height: 200
    },
    full: 'http://placehold.it/600x400/0eafff/ffffff.png',
    caption: 'My new caption!'
  }
};

=>
'<figure id="image-id">',
'<a href="http://placehold.it/600x400/0eafff/ffffff.png" rel="thumbnail">',
'<img alt="Picture of a placeholder" src="http://placehold.it/200x200/0eafff/ffffff.png" width="200" height="200">',
'</a>',
'<figcaption>My new caption!</figcaption>',
'</figure>'
```



<a href='#handlebars-helpers-reference_image' aria-hidden='true' class='block-anchor'  id='handlebars-helpers-reference_image'><i aria-hidden='true' class='linkify icon'></i></a>

## Image Helpers

The Stencil framework provides the following custom helper to manage images.

### {{getImage}}

**Custom Helper**

It returns the URL for an image of the specified size. Values for the size parameter are defined in the `config.json` file’s `settings` section.

#### Parameters

- `stencilImage`: a StencilImage.
- `size`: a string referencing a key in the `theme_settings` object.
- `defaultImage` (optional): a string.

You can use the optional `defaultImage` parameter to specify an image that will be displayed in cases where the passed `stencilImage` value is null.


#### Example

```handlebars
{{getImage image "thumbnail"}}
```

### {{getImageSrcset}}

**Custom Helper**

The `getImageSrcset` helper is a replacement for `getImage` which allows you to generate either a single image URL (for an `<img>` `src`) or a list of image sizes for `srcset`. [Srcset](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-srcset) allows you to specify a list of sizes from which the browser may choose, based on the expected size of the image on the page, the device's pixel density, and other factors.

Similar to `getImage`, it accepts an `stencilImage` parameter, and optionally, a `defaultImage` to use as a fallback.

This helper's parameters are:

- `stencilImage`: a StencilImage
- `defaultImage` : a fallback image URL to use if the StencilImage is undefined.
- Image sizes specified as named parameters on the helper

You can then specify what sizes you want as named arguments on the helper.

**Default sizes**

By specifying `use_default_sizes=true` on the helper, a `srcset` string will be constructed with a set of sizes chosen by BigCommerce to be optimal for most uses.
```html
{{getImageSrcset image use_default_sizes=true}}
{{getImageSrcset image "https://place-hold.it/500x300" use_default_sizes=true}}
```

**Specifying a single '1x' size**

By specifying a single size as the '1x', size, you can choose to get an image at any size of your choosing. You can reference a value from the `theme_settings` object (similar to `getImage`), or you can specify your own size inline. Note that `getImageSrcset` does not require `theme_settings` keys to be wrapped in quotes, they should be referenced directly.

```html
{{getImageSrcset image 1x=1x=theme_settings.zoom_size}}
{{getImageSrcset image 1x="1280x800"}}
{{getImageSrcset image 1x="1280w"}}
```

**Specifying a custom srcset based on pixel density**

By specifying several sizes using the pixel density descriptor, you can generate a srcset of different image resolutions for different pixel density screens as described [here](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images#Resolution_switching_Same_size_different_resolutions). For example, you can specify a `2x` image for Retina screens, and a `1x` image for normal screens.

As above, you can reference `theme_settings` keys or specify your own size inline.
```html
{{getImageSrcset image 1x="1280w" 2x="2560w"}}
{{getImageSrcset image 1x="800w" 1.5x="1200w" 2x="1600w"}}
{{getImageSrcset image 1x="640x640" 2x="1280x1280"}}
```

**Specifying a custom srcset based on inherent width**

By specifying several sizes using the inherent width descriptor, you can generate a srcset of different image resolutions based on width, which can in turn be selected by the browser based on the expected size of the image when the page is painted. It is recommended to use this together with a `sizes` attribute on the `<img>` as described [here](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images#Resolution_switching_Different_sizes). In Cornerstone, this is handled automatically via JavaScript.

As above, you can reference `theme_settings` keys or specify your own size inline.
```html
{{getImageSrcset image 100w="100w" 200w="200w" 300w="300w"}}
```


**HTML Use**

```html
<img src="{{getImage image "default"}}" srcset="{{getImageSrcset image 100w="100w" 200w="200w" 300w="300w"}}" />
```

**Returns**

```html
<img src="https://cdn11.bigcommerce.com/s-abc123/images/stencil/640x640/products/86/286/ablebrewingsystem4_1024x1024__07155.1456436672.jpg?c=2" srcset="https://cdn11.bigcommerce.com/s-abc123/images/stencil/100w/products/86/286/ablebrewingsystem4_1024x1024__07155.1456436672.jpg?c=2 100w, https://cdn11.bigcommerce.com/s-abc123/images/stencil/200w/products/86/286/ablebrewingsystem4_1024x1024__07155.1456436672.jpg?c=2 200w,https://cdn11.bigcommerce.com/s-abc123/images/stencil/300w/products/86/286/ablebrewingsystem4_1024x1024__07155.1456436672.jpg?c=2 300w" />
```

**HTML Use**
```html
<img src="{{getImageSrcSet image 1x="1000x1000"}}" srcset="{{getImageSrcset image 1x="1000x1000" 2x="2000x2000"}}" />
```

**Returns**

```html
<img src="https://cdn11.bigcommerce.com/s-abc123/images/stencil/1000x1000/products/86/286/ablebrewingsystem4_1024x1024__07155.1456436672.jpg?c=2" srcset="https://cdn11.bigcommerce.com/s-abc123/images/stencil/1000x1000/products/86/286/ablebrewingsystem4_1024x1024__07155.1456436672.jpg?c=2 1x, https://cdn11.bigcommerce.com/s-abc123/images/stencil/2000x2000/products/86/286/ablebrewingsystem4_1024x1024__07155.1456436672.jpg?c=2 2x" />
```


**Default Sizes**

```html
    '80w': '80w',
    '160w': '160w',
    '320w': '320w',
    '640w': '640w',
    '960w': '960w',
    '1280w': '1280w',
    '1920w': '1920w',
    '2560w': '2560w',
```

## Inflection Helpers

The following standard helpers are available to transform strings.

### {{inflect}}

**Standard Helper**

Returns the singular or plural form of a word based on the count.

#### Parameters

* `count` {Number}
* `singular` {String}: The singular form
* `plural` {String}: The plural form
* `include` {String}: If to include the count before the work
* `returns` {String}

#### Example

products = 0  
customers = 1

```handlebars
{{inflect products "product" "products"}}
{{inflect customers "customer" "friends" true}}

=> products
1 customer
```


### {{ordinalize}}

**Standard Helper**

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



<a href='#handlebars-helpers-reference_injection' aria-hidden='true' class='block-anchor'  id='handlebars-helpers-reference_injection'><i aria-hidden='true' class='linkify icon'></i></a>

## Injection Helpers

The Stencil framework provides the following custom helpers to insert various resources into a page context

### {{cdn}}

**Custom Helper**

It is a URL transformer for content delivery networks.

When you reference static assets that you have locally staged outside your `<theme-name>` directory and uploaded using WebDAV, place the `webdav:` prefix before each corresponding `assetPath` parameter. For example, a link like:

```html
<img src="{{cdn 'webdav:img/image.jpg'}}">
```

...will be transformed to a result like:

```html
<img src="https://cdn.bcapp/3dsf74g/content/img/image.jpg">
```

The presumed WebDAV root directory is `/content/`. (So, in this example, the `image.jpg` file has been uploaded to the WebDAV `/content/` directory.) The presumed local directory is `<theme-name>/assets/`, so you can omit that path when referencing its contained files or subdirectories.

<a name="cdn-custom"></a>

###  CDN Custom Endpoints

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

```json
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

```html
<img src="{{cdn 'customcdn:img/image.jpg'}}" />
```

In local development, that helper would return:

<pre>&lt;img src="<b>/assets/cdn/</b>customcdn/img/image.jpg" /&gt;
</pre>

Whereas in production, it would return:

```html
<img src="https://bigcommerce.customcdn.net/img/image.jpg" />
```

As highlighted above, the helper is configured to rewrite *local* URLs to a `<theme-name>/assets/cdn/` subfolder. The `stencil bundle` command will exclude this local `assets/cdn/` subfolder from the bundle that it creates. This filtering circumvents the 50 MB size limit on the resulting .zip file.

### {{getFontsCollection}}

The `getFontsCollection` helper is custom to Stencil. It returns a link tag that loads all selected font collections. It takes no parameters.

<a name="inject"></a>

### {{inject}} and {{jsContext}}

**Custom Helpers**

Occasionally, your theme's client-side application code might need to incorporate dynamic data from the template context. Stencil provides two custom Handlebars helpers to help you achieve this: `inject`  and `jsContext`.

### About the {{inject}} Helper

The `inject` helper collects data definitions for injection into the `jsContext` variable. It composes a JSON object containing a subset of the template context to be sent to the browser. Parameters of the `inject` helper are:

- `key`: a string.
- `value`: multiple types supported.

An `inject` call takes this form:

```html
{{inject "stringBasedKey" contextValue}}
```

### About the {{jsContext}} Helper

The `jsContext` helper takes no parameters; it simply returns a JSON object containing all data collected by the `inject` helper. To retrieve the parsable JSON object, just call `{{jsContext}}` after all of the `{{inject}}` calls.


### {{inject}} + {{jsContext}} Example 1

To set up the product name in your client-side app, you can do the following, if you are in the context of a product:

```html
{{inject "myProductName" product.title}}

<script>
// Note the lack of quotes around the jsContext handlebars helper, it becomes a string automatically.
var jsContext = JSON.parse({{jsContext}});

/* jsContext would output "{\"myProductName\": \"Sample Product\"}" which can feed directly into
your JavaScript. */

console.log(jsContext.myProductName); // Will output: Sample Product
</script>
```

#### Notes on Example 1

You can compose your JSON object across multiple pages to create a different set of client-side data, depending on the currently loaded template context.

The Stencil theme makes the `jsContext` available on the active page scoped. It also makes it available on the global `PageManager` objects, as `this.context`.

### {{inject}} Example 2

The following code uses `inject` to add all product IDs into JavaScript on category pages. It resides in a theme's `<theme-name>/templates/pages/category.html` template. Note the two `inject` calls directly under the front matter:

```html

category:
    shop_by_price: true
    products:
        limit: {{theme_settings.categorypage_products_per_page}}

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
<h1 class="page-heading">{{category.name}}
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


In the example below from our [Developer Blog](https://medium.com/bigcommerce-developer-blog/build-a-bulk-order-form-using-the-bigcommerce-storefront-api-and-react-a9f73ec7f0d6), the inject helper will create a property on the `jsContext` object with the values we ask for in the pluck helper. In this case we are grabbing the product id, product name, product image, and product price.

```js
{{inject “productIds” (pluck category.products “id”)}}
{{inject “productNames” (pluck category.products “name”)}}
{{inject “productImages” (pluck category.products “image.data”)}}
{{inject “productPrices” (pluck category.products “price.without_tax.formatted”)}}
<script>
const pageContext = JSON.parse({{jsContext}});
let productData = [];
pageContext[‘productIds’].forEach((id, index) => {
    let imageURL = ‘’;
    pageContext[‘productImages’][index] === null ? 
    imageURL = ‘’ : 
    imageURL = pageContext[‘productImages’][index].replace(‘{:size}’, ‘100x100’);
productData.push({
    id: id,
    name: pageContext[‘productNames’][index],
    image: imageURL,
    price: pageContext[‘productPrices’][index],
    quantity: 0
    })
});
window.initBulkOrderForm(productData)
</script>
```

### {{stylesheet}}

**Custom Helper**

It renders a link tag to insert a stylesheet into your theme. (This is required if you want Theme Editor to rewrite the stylesheet file when a merchant customizes their theme.) This helper returns an HTML string.

#### Parameters

- path: String containing the path to the theme's CSS stylesheet file.
- Other parameters are optional, appended in the form: `key="value"`.

#### Example

```html
{{{stylesheet "assets/css/style.css" class="myStylesheet"}}}
```

## Markdown Helpers

The following standard helper is available to convert markdown.

### {{markdown}}
**Standard Helper**

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
//=> # Foo
```



<a href='#handlebars-helpers-reference_math' aria-hidden='true' class='block-anchor'  id='handlebars-helpers-reference_math'><i aria-hidden='true' class='linkify icon'></i></a>

## Math Helpers

The following standard helpers are available to handle mathematical operations.

### {{add}}

**Standard Helper**

Returns the sum of `a` plus `b`.

#### Parameters

* `a` {Number}
* `b` {Number}


#### Example

```handlebars
{{add value 5}}
=> 10

{{add value 5 10}}
=> 15
```



### {{subtract}}

**Standard Helper**

Return the difference of `a` minus `b`.

#### Parameters

* `a` {Number}
* `b` {Number}

#### Example

```handlebars
{{subtract value 10 5}}
=> 5
```



### {{divide}}

**Standard Helper**

Divides `a` by `b`.

### #Parameters

* `a` {Number}: numerator
* `b` {Number}: denominator


#### Example

```handlebars
{{divide value 5}}
=> 1
```



### {{multiply}}

**Standard Helper**

Multiplies `a` by `b`.

#### Parameters

* `a` {Number}: factor
* `b` {Number}: multiplier

```handlebars
{{multiply value 5}}
=> 25
```



### {{floor}}

**Standard Helper**

Gets the `Math.floor()` of the given value.

#### Parameters

* `value` {Number}

#### Example

```handlebars
value = 5.6
{{floor value}}
=> 5
```



### {{ceil}}

**Standard Helper**

Gets the `Math.ceil()` [ceiling] of the given value.

#### Parameters

* `value` {Number}

#### Example

```handlebars
value = 5.6

{{ceil value}}
=> 6
```



### {{round}}

**Standard Helper**

Rounds the given value.

#### Parameters

* `value` {Number}

#### Example

```handlebars
value = 5.69
{{round value}}
=>6
```



### {{sum}}

**Standard Helper**

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

**Standard Helper**

Returns the average of all numbers in the given array.

#### Parameters

* `array` {Array}: Array of numbers to add up and average.
* `returns` {Number}

#### Example

```handlebars
{{avg "[1, 2, 3, 4, 5]"}}
//=> '3'
```



<a href='#handlebars-helpers-reference_number' aria-hidden='true' class='block-anchor'  id='handlebars-helpers-reference_number'><i aria-hidden='true' class='linkify icon'></i></a>

## Number Helpers

The following standard helpers are available to handle and transform numbers.

### {{addCommas}}

**Standard Helper**

Adds commas to numbers.

#### Parameters

* `num` {Number}
* `returns` {Number}

#### Example

```handlebars
value = 2222222 

{{addCommas value}}
=> 2,222,222
```



### {{phoneNumber}}

**Standard Helper**

Converts a string or number to a formatted phone number.

#### Parameters

* `num` {Number|String}: The phone number to format, e.g., `8005551212`
* `returns` {Number}: The formatted phone number: `(800) 555-1212`


#### Example

```handlebars
value = 8005551212
{{phoneNumber value}}
=> (800) 555-1212
```



### {{random}}

**Standard Helper**

Generates a random number between two values.

#### Parameters

* `min` {Number}
* `max` {Number}
* `returns` {String}

#### Example

```handlebars
{{random 5 10}}
```



### {{toAbbr}}

**Standard Helper**

Abbreviates numbers to the given number of `precision`. This is for general numbers, not size in bytes.

#### Parameters

* `number` {Number}
* `precision` {Number}
* `returns` {String}

#### Example

```handlebars
number = 123456789
{{toAbbr number}}
=> 123.457m
```



### {{toExponential}}

**Standard Helper**

Returns a string, representing the given number in exponential notation.

#### Parameters

* `number` {Number}
* `fractionDigits` {Number}: Optional. An integer specifying the number of digits to use after the decimal point. Defaults to as many digits as necessary to specify the number.
* `returns` {Number}

#### Example

```handlebars
{{toExponential number digits}}
```

```handlebars
value = 5 
{{toExponential value 5}}
=> 5.00000e+0 // to the 5th place

{{toExponential value}}
=>5e+0
```



### {{toFixed}}

**Standard Helper**

Formats the given number, using fixed-point notation.

#### Parameters

* `number` {Number}
* `digits` {Number}: Optional. The number of digits to use after the decimal point. This can be a value between 0 and 20, inclusive, and implementations may optionally support a larger range of values. If this argument is omitted, it is treated as 0.
* `returns` {Number}

#### Examples

```handlebars
value = 5.5323
{{toFixed value}}
=> 6

{{toFixed value 3}}
=> 5.532
```



### {{toFloat}}

**Standard Helper**

Returns a floating point number.

#### Parameters

* `number` {Number}
* `returns` {Number}

#### Example

```handlebars
value = '12.1abc' 
{{toFloat value}}
=>12.1
```



### {{toInt}}

**Standard Helper**

Returns an integer.

#### Parameters

* `number` {Number}
* `returns` {Number}

#### Example

```handlebars
value = '12.1abc' 
{{toInt value}}
=>12
```



### {{toPrecision}}

**Standard Helper**

Returns the number in fixed-point or exponential notation rounded to precision significant digits.

#### Parameters

* `number` {Number}
* `precision` {Number}: Optional. The number of significant digits.
* `returns` {Number}


#### Example

```handlebars
value = 555.322 
{{toPrecision value 4}}
=> 555.3
```



<a href='#handlebars-helpers-reference_object' aria-hidden='true' class='block-anchor'  id='handlebars-helpers-reference_object'><i aria-hidden='true' class='linkify icon'></i></a>

## Object Helpers

The following standard helpers are available to handle objects.

### {{extend}}

**Standard Helper**

Extends the context with the properties of other objects. A shallow merge is performed to avoid mutating the context.

#### Parameters

* `objects` {Object}: One or more objects to extend.
* `returns` {Object}

#### Example
Extend can be used to extend a page layout. For example:

**layout.html**

```html
<!doctype html>
<html lang="en-us">
<head>
    {{#block "head"}}
        <title>{{title}}</title>

        <link rel="stylesheet" href="assets/css/screen.css" />
    {{/block}}
</head>
<body>
    <div class="site">
        <div class="site-hd" role="banner">
            {{#block "header"}}
                # {{title}}
            {{/block}}
        </div>
</body>
</html>

```
Now that a basic layout is defined, it can be used to extend other pages.

**page.html**

```html
{{#extend "layout"}}
    {{#content "body"}}
        <h2>Welcome Home</h2>

        <ul>
            {{#items}}
                <li>{{.}}</li>
            {{/items}}
        </ul>
    {{/content}}
{{/extend}}
```



### {{forIn}}

**Standard Helper**

Block helper that iterates over the properties of an object, exposing each key and value on the context.

#### Parameters

* `context` {Object}
* `options` {Object}
* `returns` {String}


#### Examples
Given an object `{object: {a: 'b', c: 'd', e: 'f'}}`

```handlebars
//iterate over each property
{{#forIn this}} 
  {{@key}} {{this}} 
{{/forIn}}
=> 'a b  c d  e f'
```

```handlebars
//return the inverse block of no object is passed
{{#forIn}} {{this}} {{else}} Nada. {{/forIn}}
=> ' Nada. '
```

```handlebars
//if private variables are used, they are exposed
{{#forIn this abc=object}} {{@abc.a}} {{/forIn}}
=> ' b '
```



### {{forOwn}}

**Standard Helper**

Block helper that iterates over the *own* properties of an object, exposing each key and value on the context.

#### Parameters

* `obj` {Object}: The object to iterate over.
* `options` {Object}
* `returns` {String}

#### Examples

Given an object `{object: {a: 'b', c: 'd', e: 'f'}}`

```handlebars
{{#forOwn this}} {{@key}} {{.}} {{/forOwn}}
=>  a b  c d  e f '
```

```handlebars
{{#forOwn}} {{this}} {{else}} Nada. {{/forOwn}}
=> ' Nada. '
```

```handlebars
{{#forOwn this abc=object}} {{@abc.c}} {{/forOwn}}
=>' d '
```



### {{toPath}}

**Standard Helper**

Takes arguments and, if they are string or number, converts them to a dot-delineated object property path.

#### Parameters

* `prop` {String|Number}: The property segments to assemble (can be multiple).
* `returns` {String}


#### Examples

```handlebars
{{toPath "a" "b" "c"}}
=> 'a.b.c'
```

```handlebars
{{toPath "a" (add 1 1) "b"}}
=> 'a.2.b'
```



### {{get}}

**Standard Helper**

Uses property paths (`a.b.c`) to get a value or nested value from the context. Works as a regular helper or block helper.

#### Parameters

* `prop` {String}: The property to get, optionally using dot notation for nested properties.
* `context` {Object}: The context object.
* `options` {Object}: The Handlebars options object, if used as a block helper.
* `returns` {String}

```handlebars
// ({a: 'b'}) // returns value for 'a'
{{get "a" this}}
=> 'b'
```

```handlebars
{
	a: {
		b: {
			c: {
				d: 'e'
			}
		}
	}
}

{{get "a.b.c.d" this}}
=> 'e'
```

```handlebars
//can be used as a block helper
{object: {a: 'b', c: 'd', e: 'f'}}

{{#get "a" this}} {{this}} {{/get}}
=> 'b'
```

```handlebars
{{#get "Yes" this}} {{this}} {{else}}No{{/get}}
=> No
```




### {{getObject}}

**Standard Helper**

Uses property paths (`a.b.c`) to get an object from the context. Unlike the `get` helper, this helper will return the actual object, including the given property key. Also, this helper does not work as a block helper.

#### Parameters

* `prop` {String}: The property to get, optionally using dot notation for nested properties.
* `context` {Object}: The context object.
* `returns` {String}

```handlebars
// a: 'b'
{{{stringify (getObject "a" this)}}}
=> {"a":"b"}
```



### {{hasOwn}}

**Standard Helper**

Returns true if `key` is an own, enumerable property of the given `context` object.

#### Parameters

* `key` {String}
* `context` {Object}: The context object.
* `returns` {Boolean}

#### Example

```handlebars
// a ='b'
// b = 'c'

{{hasOwn this "a"}}
=> true

// returns false since it only looks at a & b in this example
{{hasOwn this "c"}}
=> false 
```



### {{isObject}}

**Standard Helper**

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

**Standard Helper**

Deeply merges the properties of the given `objects` with the context object.

#### Parameters

* `object` {Object}: The target object. Pass an empty object to shallow-clone.
* `objects` {Object}
* `returns` {Object}

```handlebars
({
	a: {
		one: 'two'
	},
	b: {
		one: 'three'
	},
	c: {
		two: 'four'
	}
})

{{{stringify (merge a b c)}}
=>
{
	"one": "three",
	"two": "four"
}
```




### {{#JSONparse}}

**Standard Helper**

Block helper that parses a string using `JSON.parse`, then passes the parsed object to the block as context.

#### Parameters

* `string` {String}: The string to parse.
* `options` {Object}: Handlebars options object.

#### Example

This will return the product stock level to a page.

```html
{{#JSONparse product.stock_level}}
    {{this}}
{{/JSONparse}}
```



### {{JSONstringify}}

**Standard Helper**

Stringifies an object using `JSON.stringify`.

#### Parameters

* `obj` {Object}: Object to stringify.
* `returns` {String}

#### Example

```js
console.log({{{JSONstringify customer.payment_methods}}});
```



<a href='#handlebars-helpers-reference_operator' aria-hidden='true' class='block-anchor'  id='handlebars-helpers-reference_operator'><i aria-hidden='true' class='linkify icon'></i></a>

## Operator Helpers

The Stencil framework supports the following operator helpers:

* Comparison Operators
* Logical {{or}} Operator
* {{typeof}} Operator]

## Comparison Operators

**Standard Helpers**

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

```handlebars
  {{#if service '===' 'facebook'}}
    <svg>
      <use xlink:href="#icon-facebook"/>
    </svg>
  {{/if}}
```

### Not Equal or Not Equal Type Example

To improvise a `!==` (not equal or not equal type) comparison operator in Handlebars, you can use an [if](#if)/else structure as shown in this example:

```html
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



###  Logical {{or}} Operator

**Custom Helpers**

Checks whether at least one of its parameters evaluates to true, and has the following syntax:

```html
{{#or 1 0 0 0 0 0 0}}
  <!-- render this block if OR evaluates to true -->
{{/or}}
```
#### Parameters

The `or` operator's parameters are one or more strings, numbers, arrays, or collections. Parameters can be of mixed types.

#### Example

Here is a usage example from Stencil's Cornerstone base theme, where it displays the cart's contents. The `templates/components/cart/content.html` template uses the `or` operator to determine whether an item contains either product options _or_ configurable fields. If at least one condition is true, the template displays an edit link for the item:

```html
{{#or options configurable_fields}}
    <a href="#" data-item-edit="{{id}}">{{lang 'cart.checkout.change'}}</a>
{{/or}}
```



###  {{typeof}} Operator

**Standard Helpers**

The `typeof` operator returns the JavaScript type of a variable, such as:

- string
- number
- boolean
- object

By design, an array will return a `typeof` value of `object`.

#### Example

```js
<script>
    if (typeof(addthis) === "object") {
        addthis.toolbox('.addthis_toolbox');
    }
</script>
```



<a href='#handlebars-helpers-reference_string' aria-hidden='true' class='block-anchor'  id='handlebars-helpers-reference_string'><i aria-hidden='true' class='linkify icon'></i></a>

##  String Helpers

### {{block}} 

**Custom Helper**

It defines a block of content, which can be overwritten by the [partial](#partial-helper) helper.

#### Example

```html
<div class="body" data-currency-code="{{currency_selector.active_currency_code}}">
    {{#block "hero"}} {{/block}}
    <div class="container">
        {{#block "page"}} {{/block}}
    </div>
    {{> components/common/modal}}
    {{> components/common/alert-modal}}
</div>
```

### {{concat}}

**Custom Helper**

It concatenates two string objects from the page's context, which are passed as parameters. It returns a new string object.

#### Examples

```html
{{concat breadcrumbs.[0].name breadcrumbs.[0].url}}
```

```html
...
{{#for 1 5}}
    {{#if ../product.reviews.selected_rating '===' $index}}
        <option selected value="{{$index}}">{{lang (concat 'products.reviews.rating.' $index) }}</option>
    {{else}}
        <option value="{{$index}}">{{lang (concat 'products.reviews.rating.' $index) }}</option>
    {{/if}}
{{/for}}
...
```
                      

### {{dynamicComponent}}

**Custom Helper**

Inserts a dynamic partial from within the path that is supplied as its parameter.

#### Example

```html
...
{{#each forms.create_account.address_fields }}
    {{{dynamicComponent 'components/common/forms'}}}
{{/each}}
...
```

### {{json}}

**Custom Helper**

Convert a JavaScript string object (from the page's context) into a JSON string object.

#### Example

Returns the blog page contents. 

```handlebars
{{json blog}}
```

```json
{
	"name": "Blog",
	"recent_posts": [{
		"author": "",
		"date_published": "Aug 16th 2019",
		"show_read_more": false,
		"summary": "Recent Post",
		"tags": [],
		"thumbnail": null,
		"title": "First Post",
		"url": "/blog/first-post/"
	}],

	"url": "/blog/"
}
```

### {{lang}}

**Custom Helper**

Maps keys to translation files, based on the locale indicated by the visitor’s browser. Its parameters are the following keys:

- `translationKey`: a string.
- `options`: key-value pairs.

#### Example

```html
<label class="form-label" for="search_query_adv">
  {{lang 'forms.search.query' }}
  <small>{{lang 'common.required' }}</small>
</label>
```                        

### {{nl2br}}

**Custom Helper**

Call this helper on a string object from the page's context, to convert its contained newline characters (`\r\n`, `\n\r`, `\r`, `\n`) to `<br>` tags. The `nl2br` helper returns a new string object.

#### Example

```html
{{nl2br settings.address}}
```

`settings.address`:

```json
"settings": {
  "address": "\r\n685 Market St\r\nSan Francisco\r\n94105\r\nCA\r\n"
}
```

**Result:**

```html
"<br>685 Market St<br>San Francisco<br>94105<br>CA<br>"
```



### {{partial}}

**Custom Helper**

Overrides block content defined by the [block](#block-helper) helper.

#### Example

```html
{{#partial "head"}}
    {{#if pagination.category.previous}}
        <link rel="prev" href="{{pagination.category.previous}}">
    {{/if}}
    {{#if pagination.category.next}}
        <link rel="next" href="{{pagination.category.next}}">
    {{/if}}
{{/partial}}
```

### {{replace}}

**Custom Helper**

The `replace` string helper is custom to Stencil. It searches for the first parameter within the second parameter and, if it finds it, replaces the first parameter with the contents of the specified Handlebars block.

For example, the following code would search for the string `needle` within the scope defined by `haystack`. If found, it would replace that string with the Handlebars block defined by `<context...replacement>`:


#### Examples

```html
{{#replace "needle" haystack}}
  {{<context to use as a replacement>}}
{{/replace}}
```

```html
{{#replace '%%Syndicate%%' page.content}}
    {{> components/page/rss_feed}}
{{else}}
    <p>{{{page.content}}}</p>
{{/replace}}
```

### {{toLowerCase}}

**Custom Helper**

Return a copy of a string object, in all-lowercase. The helper returns a new string object.

#### Example

```html
# {{toLowerCase head.title}}
```

`head.title`:

```json
"head": {
  "title": "This is my TEST Store"
}
```

**Result:**

```html
# this is my test store
```

### {{camelcase}}

**Standard Helper**

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

**Standard Helper**

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

**Standard Helper**

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

**Standard Helper**

Centers a string, using non-breaking spaces.

#### Parameters

* `str` {String}
* `spaces` {String}
* `returns` {String}

#### Example

```handlebars
{{center "Get more features out-of-the-box to build, run and scale a better online business — without the hidden fees." 2}}
=> '&amp;nbsp;&amp;nbsp;Get more features out-of-the-box to build, run and scale a better online business — without the hidden fees.&amp;nbsp;&amp;nbsp;
```



### {{chop}}

**Standard Helper**

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

**Standard Helper**

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

**Standard Helper**

dot.cases the characters in `string`.

#### Parameters

* `string` {String}
* `returns` {String}

#### Example

```handlebars
{{dotcase "a-b-c d_e"}}
//=> 'a.b.c.d.e'
```




### {{hyphenate}}

**Standard Helper**

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

**Standard Helper**

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

**Standard Helper**

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

**Standard Helper**

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

**Standard Helper**

PascalCases the characters in `string`.

#### Parameters

* `string` {String}
* `returns` {String}

#### Example

```handlebars
{{pascalcase "foo bar baz"}}
//=> 'FooBarBaz'
```



### {{pathcase}}

**Standard Helper**

path/cases the characters in `string`.

#### Parameters

* `string` {String}
* `returns` {String}

#### Example

```handlebars
{{pathcase "a-b-c d_e"}}
//=> 'a/b/c/d/e'
```



### {{plusify}}

**Standard Helper**

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

**Standard Helper**

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

**Standard Helper**

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

**Standard Helper**

snake_cases the characters in the given `string`.

#### Parameters

* `string` {String}
* `returns` {String}

#### Example

```handlebars
{{snakecase "a-b-c d_e"}}
//=> 'a_b_c_d_e'
```



### {{split}}

**Standard Helper**

Splits `string` at the given `character`.

#### Parameters

* `string` {String}: The string to split.
* `returns` {String} `character`: Default is `,`

#### Example

```handlebars
{{split "a,b,c" ","}}
//=> ['a', 'b', 'c']
```




### {{startsWith}}

**Standard Helper**

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

**Standard Helper**

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

**Standard Helper**

Removes extraneous whitespace from the beginning and end of a string.

#### Parameters

* `string` {String}: The string to trim.
* `returns` {String}

#### Example

```handlebars
{{trim " ABC "}}
//=> 'ABC'
```



### {{uppercase}}

**Standard Helper**

Uppercases all of the characters in the given string. If used as a block helper, it will uppercase the entire block. This helper does not support inverse blocks.

#### Parameters

* `str` {String}: The string to uppercase.
* `options` {Object}: Handlebars options object.
* `returns` {String}

#### Example

```handlebars
{{uppercase 'f'}}
=> 'F'
```



<a href='#handlebars-helpers-reference_url' aria-hidden='true' class='block-anchor'  id='handlebars-helpers-reference_url'><i aria-hidden='true' class='linkify icon'></i></a>

## URL Helpers

### {{encodeURI}}

**Standard Helper**

Encodes a Uniform Resource Identifier (URI) component, by replacing each instance of certain characters by one, two, three, or four escape sequences that represent the UTF-8 encoding of the character.

#### Parameters

* `str` {String}: The un-encoded string.
* `returns` {String}: The encoded string.

#### Example

```handlebars
{{encodeURI "http://example.com?comment=Thyme &time=again"}}
=> 'http%3A%2F%2Fexample.com%3Fcomment%3DThyme%20%26time%3Dagain'
```



### {{decodeURI}}

**Standard Helper**

Decodes a Uniform Resource Identifier (URI) component.

#### Parameters

* `str` {String}
* `returns` {String}

#### Example

```handlebars
{{{decodeURI "http%3A%2F%2Fexample.com%3Fcomment%3DThyme%20%26time%3Dagain"}}}
=> 'http://example.com?comment=Thyme &time=again'
```



### {{urlResolve}}

**Standard Helper**

Takes a base URL, and an href URL, and resolves them as a browser would for an anchor tag.

#### Parameters

* `base` {String}
* `href` {String}
* `returns` {String}

#### Example

```handlebars
{{urlResolve "/one/two/three" "four"}}
=> '/one/two/four'

{{urlResolve "http://example.com/" "/one"}}
=> 'http://example.com/one'

{{urlResolve "http://example.com/one" "/two"}}
=> 'http://example.com/two'
```



### {{urlParse}}

**Standard Helper**

Parses a `url` string into an object.

#### Parameters

* `str` {String}: URL string.
* `returns` {String}: Returns stringified JSON.

#### Example

```handlebars
{{{JSONstringify (urlParse "http://foo.com/bar/baz?key=value" "json")}}}
=> '{"protocol":"http:","slashes":true,"auth":null,"host":"foo.com","port":null,"hostname":"foo.com","hash":null,"search":"?key=value","query":"key=value","pathname":"/bar/baz","path":"/bar/baz?key=value","href":"http://foo.com/bar/baz?key=value"}'
```



### {{stripQuerystring}}

**Standard Helper**

Strips the query string from a `url`.

#### Parameters

* `url` {String}
* `returns` {String}: The URL without the queryString.

#### Example

```handlebars
{{stripQuerystring "http://example.com?tests=true"}}
=> 'http://example.com'
```



### {{stripProtocol}}

**Standard Helper**

Strips the protocol from a `url`.

Useful for displaying media that might have an `http` protocol on secure connections. Will change `http://foo.bar` to `//foo.bar`

#### Parameters

* `str` {String}
* `returns` {String}: The URL with the `http` protocol stripped.

#### Example

```handlebars
testURL = 'https://bigcommerce.com'

{{stripProtocol testUrl}}
=> //bigcommerce.com/
```



<a href='#handlebars-helpers-reference_misc' aria-hidden='true' class='block-anchor'  id='handlebars-helpers-reference_misc'><i aria-hidden='true' class='linkify icon'></i></a>

## Miscellaneous Helpers

### {{default}}

**Standard Helper**

Returns the first value, if that value is defined; otherwise, returns the "default" value.

#### Parameters

* `value` {any}
* `defaultValue` {any}
* `returns` {String}

#### Example

```handlebars

//use the given value
title = 'B'
{{default title "A"}}
=> title: 'B'
```

```handlebars
//falls back to default value is none given

{title: null}
{{default title "A"}}
=> 'A'

// if empty return default
()
{{default title "A"}}
=> 'A'
```



### {{option}}

**Standard Helper**

Returns the given value of `prop` from `this.options`. Returns an empty string if no options are found.

#### Parameters

* `prop` {String}
* `returns` {any}

#### Examples

```handlebars
{{option "a.b.c"}} 
{{options: {a: {b: {c: 'ddd'}}
=> 'ddd'
```

```handlebars
{{option "a.b.c"}}
{{options: {a: {b: {c: 'ddd'}}
=> 'ddd'
```



### {{noop}}

**Standard Helper**

Block helper that renders the block without taking any arguments.

#### Parameters

* `options` {Object}
* `returns` {String}

#### Example

```handlebars
{message: 'This is a message'}
{{#noop}}{{message}}{{/noop}}
=> 'This is a message'
```



### {{withHash}}

**Standard Helper**

Block helper that builds the context for the block from the options hash.

#### Parameters

* `options` {Object}: Handlebars-provided options object.

#### Examples

```handlebars
//Return a string from new context
message: 'This is a test'
{{#withHash message="test"}}{{message}}{{/withHash}}
=> 'test'
```

```handlebars
// Return a string from the parent
message: 'This is a test'
{{#withHash message=this.message}}{{message}}{{/withHash}}
=> 'This is a test'
```


```handlebars
{{#withHash subject="Feedback" message="Hello!"}}{{subject}} - {{message}}{{/withHash}}
=> 'Feedback - Hello!'
```

```handlebars
//returns an empty string
{{#withHash}}{{message}}{{/withHash}}
=> ''
```



## Resources

* [Cornerstone](https://github.com/bigcommerce/cornerstone)
* [Paper Handlebars](https://github.com/bigcommerce/paper-handlebars/tree/master/helpers)
