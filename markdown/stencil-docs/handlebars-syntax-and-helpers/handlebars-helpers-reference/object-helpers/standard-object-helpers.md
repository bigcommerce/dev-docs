<h1>Standard Object Helpers</h1>

<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#handlebars_extend">{{extend}}</a></li>
    <li><a href="#handlebars_forin">{{forIn}}</a></li>
    <li><a href="#handlebars_forown">{{forOwn}}</a></li>
    <li><a href="#handlebars_topath">{{toPath}}</a></li>
    <li><a href="#handlebars_get">{{get}}</a></li>
    <li><a href="#handlebars_getobject">{{getObject}}</a></li>
    <li><a href="#handlebars_hasown">{{hasOwn}}</a></li>
    <li><a href="#handlebars_isobject">{{isObject}}</a></li>
    <li><a href="#handlebars_merge">{{merge}}</a></li>
    <li><a href="#handlebars_jsonparse">{{JSONparse}}</a></li>
    <li><a href="#handlebars_jsonstringify">{{JSONstringify}}</a></li>
	</ul>
</div>

<a href='#handlebars_extend' aria-hidden='true' class='block-anchor'  id='handlebars_extend'><i aria-hidden='true' class='linkify icon'></i></a>

The following standard helpers are available to handle objects.

## {{extend}}

Extends the context with the properties of other objects. A shallow merge is performed to avoid mutating the context.

#### Parameters

* `objects` {Object}: One or more objects to extend.
* `returns` {Object}

---

<a href='#handlebars_forin' aria-hidden='true' class='block-anchor'  id='handlebars_forin'><i aria-hidden='true' class='linkify icon'></i></a>

## {{forIn}}

Block helper that iterates over the properties of an object, exposing each key and value on the context.

#### Parameters

* `context` {Object}
* `options` {Object}
* `returns` {String}

---

<a href='#handlebars_forown' aria-hidden='true' class='block-anchor'  id='handlebars_forown'><i aria-hidden='true' class='linkify icon'></i></a>

## {{forOwn}}

Block helper that iterates over the *own* properties of an object, exposing each key and value on the context.

#### Parameters

* `obj` {Object}: The object to iterate over.
* `options` {Object}
* `returns` {String}

---

<a href='#handlebars_topath' aria-hidden='true' class='block-anchor'  id='handlebars_topath'><i aria-hidden='true' class='linkify icon'></i></a>

## {{toPath}}

Takes arguments and, if they are string or number, converts them to a dot-delineated object property path.

#### Parameters

* `prop` {String|Number}: The property segments to assemble (can be multiple).
* `returns` {String}

---

<a href='#handlebars_get' aria-hidden='true' class='block-anchor'  id='handlebars_get'><i aria-hidden='true' class='linkify icon'></i></a>

## {{get}}

Uses property paths (`a.b.c`) to get a value or nested value from the context. Works as a regular helper or block helper.

#### Parameters

* `prop` {String}: The property to get, optionally using dot notation for nested properties.
* `context` {Object}: The context object.
* `options` {Object}: The Handlebars options object, if used as a block helper.
* `returns` {String}

---

<a href='#handlebars_getobject' aria-hidden='true' class='block-anchor'  id='handlebars_getobject'><i aria-hidden='true' class='linkify icon'></i></a>

## {{getObject}}

Uses property paths (`a.b.c`) to get an object from the context. Unlike the `get` helper, this helper will return the actual object, including the given property key. Also, this helper does not work as a block helper.

#### Parameters

* `prop` {String}: The property to get, optionally using dot notation for nested properties.
* `context` {Object}: The context object.
* `returns` {String}

---

<a href='#handlebars_hasown' aria-hidden='true' class='block-anchor'  id='handlebars_hasown'><i aria-hidden='true' class='linkify icon'></i></a>

## {{hasOwn}}

Returns true if `key` is an own, enumerable property of the given `context` object.

#### Parameters

* `key` {String}
* `context` {Object}: The context object.
* `returns` {Boolean}

#### Example

```handlebars
{{hasOwn context key}}
```

---

<a href='#handlebars_isobject' aria-hidden='true' class='block-anchor'  id='handlebars_isobject'><i aria-hidden='true' class='linkify icon'></i></a>

## {{isObject}}

Returns true if `value` is an object.

#### Parameters

* `value` {String}
* `returns` {Boolean}

#### Example

```handlebars
{{isObject "foo"}}
//=> false
```

---

<a href='#handlebars_merge' aria-hidden='true' class='block-anchor'  id='handlebars_merge'><i aria-hidden='true' class='linkify icon'></i></a>

## {{merge}}

Deeply merges the properties of the given `objects` with the context object.

#### Parameters

* `object` {Object}: The target object. Pass an empty object to shallow-clone.
* `objects` {Object}
* `returns` {Object}

---

<a href='#handlebars_jsonparse' aria-hidden='true' class='block-anchor'  id='handlebars_jsonparse'><i aria-hidden='true' class='linkify icon'></i></a>

## {{JSONparse}}

Block helper that parses a string using `JSON.parse`, then passes the parsed object to the block as context.

#### Parameters

* `string` {String}: The string to parse.
* `options` {Object}: Handlebars options object.

---

<a href='#handlebars_jsonstringify' aria-hidden='true' class='block-anchor'  id='handlebars_jsonstringify'><i aria-hidden='true' class='linkify icon'></i></a>

## {{JSONstringify}}

Stringifies an object using `JSON.stringify`.

#### Parameters

* `obj` {Object}: Object to stringify.
* `returns` {String}


