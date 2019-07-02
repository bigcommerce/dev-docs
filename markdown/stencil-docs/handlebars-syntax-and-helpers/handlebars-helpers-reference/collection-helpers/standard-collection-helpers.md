<h1>Collection Helpers</h1>

<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#handlebars_isempty">{{isEmpty}}</a></li>
    <li><a href="#handlebars_iterate">{{iterate}}</a></li>
    <li><a href="#handlebars_length">{{length}}</a></li>
	</ul>
</div>

<a href='#handlebars_isempty' aria-hidden='true' class='block-anchor'  id='handlebars_isempty'><i aria-hidden='true' class='linkify icon'></i></a>

The following standard helpers are available to handle collections.

## {{isEmpty}}

Block helper that returns a block *if* the given collection is empty. If the collection is not empty, returns the inverse block (if supplied).

#### Parameters

* `collection` {Object}
* `options` {Object}
* `returns` {String}

---

<a href='#handlebars_iterate' aria-hidden='true' class='block-anchor'  id='handlebars_iterate'><i aria-hidden='true' class='linkify icon'></i></a>

## {{iterate}}

Iterates over an array or object.

#### Parameters

* `context` {Object|Array}: The collection to iterate over.
* `options` {Object}
* `returns` {String}

---

<a href='#handlebars_length' aria-hidden='true' class='block-anchor'  id='handlebars_length'><i aria-hidden='true' class='linkify icon'></i></a>

## {{length}}

Returns the length of the given collection. When using a string literal in the template, the string must be value JSON. See the example below. Otherwise, pass in an array or object from the context.

#### Parameters

* `value` {Array|Object|String}
* `returns` {Number}: The length of the value.

#### Example

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

```js
{{length '["a", "b", "c"]'}}
//=> 3

//=> myArray = ['a', 'b', 'c', 'd', 'e'];
{{length myArray}}
//=> 5

//=> myObject = {'a': 'a', 'b': 'b'};
{{length myObject}}
//=> 2
```

