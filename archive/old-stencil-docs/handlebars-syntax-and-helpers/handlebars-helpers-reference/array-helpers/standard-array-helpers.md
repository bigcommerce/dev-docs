<h1>Standard Array Helpers</h1>

<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#handlebars_after">{{after}}</a></li>
    <li><a href="#handlebars_arrayify">{{arrayify}}</a></li>
    <li><a href="#handlebars_before">{{before}}</a></li>
    <li><a href="#handlebars_eachindex">{{eachIndex}}</a></li>
    <li><a href="#handlebars_filter">{{filter}}</a></li>
    <li><a href="#handlebars_first">{{first}}</a></li>
    <li><a href="#handlebars_foreach">{{forEach}}</a></li>
    <li><a href="#handlebars_inarray">{{inArray}}</a></li>
    <li><a href="#handlebars_isarray">{{isArray}}</a></li>
    <li><a href="#handlebars_last">{{last}}</a></li>
    <li><a href="#handlebars_lengthequal">{{lengthEqual}}</a></li>
    <li><a href="#handlebars_map">{{map}}</a></li>
    <li><a href="#handlebars_some">{{some}}</a></li>
    <li><a href="#handlebars_sort">{{sort}}</a></li>
    <li><a href="#handlebars_sortby">{{sortBy}}</a></li>
    <li><a href="#handlebars_withafter">{{withAfter}}</a></li>
    <li><a href="#handlebars_withbefore">{{withBefore}}</a></li>
    <li><a href="#handlebars_withfirst">{{withFirst}}</a></li>
    <li><a href="#handlebars_withlast">{{withLast}}</a></li>
    <li><a href="#handlebars_withsort">{{withSort}}</a></li>
	</ul>
</div>

<a href='#handlebars_after' aria-hidden='true' class='block-anchor'  id='handlebars_after'><i aria-hidden='true' class='linkify icon'></i></a>

The following standard array helpers are supported on the Stencil framework.

## {{after}}

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

---

<a href='#handlebars_arrayify' aria-hidden='true' class='block-anchor'  id='handlebars_arrayify'><i aria-hidden='true' class='linkify icon'></i></a>

## {{arrayify}}

Casts the given `value` to an array.

#### Parameters

* `value` {any}
* `returns` {Array}

#### Example

```handlebars
{{arrayify "foo"}}
//=> '["foo"]'
```

---

<a href='#handlebars_before' aria-hidden='true' class='block-anchor'  id='handlebars_before'><i aria-hidden='true' class='linkify icon'></i></a>

## {{before}}

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

---

<a href='#handlebars_eachindex' aria-hidden='true' class='block-anchor'  id='handlebars_eachindex'><i aria-hidden='true' class='linkify icon'></i></a>

## {{eachIndex}}

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

---

<a href='#handlebars_filter' aria-hidden='true' class='block-anchor'  id='handlebars_filter'><i aria-hidden='true' class='linkify icon'></i></a>

## {{filter}}

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

```handlebars
{{#filter collection "d" property="first"}}
	{{this.first}}
{{else}}
	ZZZ
{{/filter}}
```

---

<a href='#handlebars_first' aria-hidden='true' class='block-anchor'  id='handlebars_first'><i aria-hidden='true' class='linkify icon'></i></a>

## {{first}}

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

---

<a href='#handlebars_foreach' aria-hidden='true' class='block-anchor'  id='handlebars_foreach'><i aria-hidden='true' class='linkify icon'></i></a>

## {{forEach}}

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

---

<a href='#handlebars_inarray' aria-hidden='true' class='block-anchor'  id='handlebars_inarray'><i aria-hidden='true' class='linkify icon'></i></a>

## {{inArray}}

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

---

<a href='#handlebars_isarray' aria-hidden='true' class='block-anchor'  id='handlebars_isarray'><i aria-hidden='true' class='linkify icon'></i></a>

## {{isArray}}

Returns true if `value` is an es5 array.

#### Parameters

* `value` {any}: The value to test.
* `returns` {Boolean}

#### Example

```handlebars
{{isArray "abc"}}
//=> 'false'
```

---

<a href='#handlebars_last' aria-hidden='true' class='block-anchor'  id='handlebars_last'><i aria-hidden='true' class='linkify icon'></i></a>

## {{last}}

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

---

<a href='#handlebars_lengthequal' aria-hidden='true' class='block-anchor'  id='handlebars_lengthequal'><i aria-hidden='true' class='linkify icon'></i></a>

## {{lengthEqual}}

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

---

<a href='#handlebars_map' aria-hidden='true' class='block-anchor'  id='handlebars_map'><i aria-hidden='true' class='linkify icon'></i></a>

## {{map}}

Returns a new array, created by calling `function` on each element of the given `array`. The `{{map}}` helper does not modify the original, provided array, but results in a new one.

#### Parameters

* `array` {Array}
* `function` {Function}
* `returns` {String}

#### Example

Given an array `['c', 'a', 'b']`:

```
// then used like this:
// {{map array sort}}
//=> '["a", "b", "c"]'
```

---

<a href='#handlebars_some' aria-hidden='true' class='block-anchor'  id='handlebars_some'><i aria-hidden='true' class='linkify icon'></i></a>

## {{some}}

Block helper that returns the block *if* the callback<sup>1</sup> returns true for some value in the given array.

#### Parameters

* `array` {Array}
* `cb` {Function}: Callback function.
* {Options}: Handlebars-provided options object.
* `returns` {Array}

#### Example

Given the array `[1, 'b', 3]`:

```
{{#some array isString}}
  Render me if the array has a string.
{{else}}
  Render me if it doesn't.
{{/some}}
//=> 'Render me if the array has a string.'
```

<div class="HubBlock--callout">
<div class="CalloutBlock--">
<div class="HubBlock-content">
    
<!-- theme:  -->

> 1. Callback must be  a standard handlebars helper or a custom stencil helper that returns a Boolean value. For a list of helpers and their return types, see: [Handlebars Helpers Reference](https://developer.bigcommerce.com/stencil-docs/handlebars-syntax-and-helpers/handlebars-helpers-reference/handlebars-full)

</div>
</div>
</div>

---

<a href='#handlebars_sort' aria-hidden='true' class='block-anchor'  id='handlebars_sort'><i aria-hidden='true' class='linkify icon'></i></a>

## {{sort}}

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

---

<a href='#handlebars_sortby' aria-hidden='true' class='block-anchor'  id='handlebars_sortby'><i aria-hidden='true' class='linkify icon'></i></a>

## {{sortBy}}

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

---

<a href='#handlebars_withafter' aria-hidden='true' class='block-anchor'  id='handlebars_withafter'><i aria-hidden='true' class='linkify icon'></i></a>

## {{withAfter}}

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

---

<a href='#handlebars_withbefore' aria-hidden='true' class='block-anchor'  id='handlebars_withbefore'><i aria-hidden='true' class='linkify icon'></i></a>

## {{withBefore}}

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

---

<a href='#handlebars_withfirst' aria-hidden='true' class='block-anchor'  id='handlebars_withfirst'><i aria-hidden='true' class='linkify icon'></i></a>

## {{withFirst}}

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

---

<a href='#handlebars_withlast' aria-hidden='true' class='block-anchor'  id='handlebars_withlast'><i aria-hidden='true' class='linkify icon'></i></a>

## {{withLast}}

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

---

<a href='#handlebars_withsort' aria-hidden='true' class='block-anchor'  id='handlebars_withsort'><i aria-hidden='true' class='linkify icon'></i></a>

## {{withSort}}

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

