<h1>Standard Comparison Helpers</h1>

<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#handlebars_and">{{and}}</a></li>
    <li><a href="#handlebars_gt">{{gt}}</a></li>
    <li><a href="#handlebars_gte">{{gte}}</a></li>
    <li><a href="#handlebars_has">{{has}}</a></li>
    <li><a href="#handlebars_eq">{{eq}}</a></li>
    <li><a href="#handlebars_ifeven">{{ifeven}}</a></li>
    <li><a href="#handlebars_ifnth">{{ifNth}}</a></li>
    <li><a href="#handlebars_ifodd">{{ifOdd}}</a></li>
    <li><a href="#handlebars_is">{{is}}</a></li>
    <li><a href="#handlebars_isnt">{{isnt}}</a></li>
    <li><a href="#handlebars_lt">{{lt}}</a></li>
    <li><a href="#handlebars_lte">{{lte}}</a></li>
    <li><a href="#handlebars_neither">{{neither}}</a></li>
    <li><a href="#handlebars_unlesseq">{{unlessEq}}</a></li>
    <li><a href="#handlebars_unlessgt">{{unlessGt}}</a></li>
    <li><a href="#handlebars_unlesslt">{{unlesslt}}</a></li>
    <li><a href="#handlebars_unlessgteq">{{{unlessGteq}}</a></li>
    <li><a href="#handlebars_unlesslteq">{{{unlessLteq}}</a></li>
	</ul>
</div>

<a href='#handlebars_and' aria-hidden='true' class='block-anchor'  id='handlebars_and'><i aria-hidden='true' class='linkify icon'></i></a>

The following standard helpers are available to handle comparisons.

## {{and}}

Block helper that renders the block if *both* of the given values are truthy. If you specify an inverse block, it will be rendered when falsy.

#### Parameters

* `a` {any}
* `b` {any}
* `options` {Object}: Handlebars-provided options object.
* `returns` {String}

---

<a href='#handlebars_gt' aria-hidden='true' class='block-anchor'  id='handlebars_gt'><i aria-hidden='true' class='linkify icon'></i></a>

## {{gt}}

Block helper that renders a block if `a` is *greater than* `b`.

If an inverse block is specified, it will be rendered when falsy. You may optionally use the `compare=""` hash argument for the second value.

#### Parameters

* `a` {String}
* `b` {String}
* `options` {Object}: Handlebars-provided options object.
* `returns` {String}: Block, or inverse block if specified and falsy.

---

<a href='#handlebars_gte' aria-hidden='true' class='block-anchor'  id='handlebars_gte'><i aria-hidden='true' class='linkify icon'></i></a>

## {{gte}}

Block helper that renders a block if `a` is *greater than or equal to* `b`.

If an inverse block is specified, it will be rendered when falsy. You may optionally use the `compare=""` hash argument for the second value.

#### Parameters

* `a` {String}
* `b` {String}
* `options` {Object}: Handlebars-provided options object
* `returns` {String}: Block, or inverse block if specified and falsy.

---

<a href='#handlebars_has' aria-hidden='true' class='block-anchor'  id='handlebars_has'><i aria-hidden='true' class='linkify icon'></i></a>

## {{has}}

Block helper that renders a block if `value` has `pattern`. If an inverse block is specified, it will be rendered when falsy.

#### Parameters

* `val` {any}: The value to check.
* `pattern` {any}: The pattern to check for.
* `options` {Object}: Handlebars-provided options object.
* `returns` {String}

---

<a href='#handlebars_eq' aria-hidden='true' class='block-anchor'  id='handlebars_eq'><i aria-hidden='true' class='linkify icon'></i></a>

## {{eq}}

Block helper that renders a block if `a` is *equal to* `b`. If an inverse block is specified,  it will be rendered when falsy. You may optionally use the `compare=""` hash argument for the second value.

#### Parameters

* `a` {String}
* `b` {String}
* `options` {Object}: Handlebars-provided options object.
* `returns` {String}: Block, or inverse block if specified and falsy.

---

<a href='#handlebars_ifeven' aria-hidden='true' class='block-anchor'  id='handlebars_ifeven'><i aria-hidden='true' class='linkify icon'></i></a>

## {{ifEven}}

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

---

<a href='#handlebars_ifNth' aria-hidden='true' class='block-anchor'  id='handlebars_ifNth'><i aria-hidden='true' class='linkify icon'></i></a>

## {{ifNth}}

Conditionally renders a block *if* dividing the `a` operand by `b` yields a remainder of zero. If you specify an inverse block, it will be rendered when the remainder is *not* zero.

#### Parameters

* {}: {Number}
* {}: {Number}
* `options` {Object}: Handlebars-provided options object.
* `returns` {String}: Block, or inverse block if specified and falsy.

---

<a href='#handlebars_ifOdd' aria-hidden='true' class='block-anchor'  id='handlebars_ifOdd'><i aria-hidden='true' class='linkify icon'></i></a>

## {{ifOdd}}

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

---

<a href='#handlebars_is' aria-hidden='true' class='block-anchor'  id='handlebars_is'><i aria-hidden='true' class='linkify icon'></i></a>

## {{is}}

Block helper that renders a block if `a` is *equal to* `b`. If an inverse block is specified, it will be rendered when falsy.

#### Parameters

* `a` {any}
* `b` {any}
* `options` {Object}: Handlebars-provided options object.
* `returns` {String}

---

<a href='#handlebars_isnt' aria-hidden='true' class='block-anchor'  id='handlebars_isnt'><i aria-hidden='true' class='linkify icon'></i></a>

## {{isnt}}

Block helper that renders a block if `a` is *not equal to* `b`. If an inverse block is specified, it will be rendered when falsy.

#### Parameters

* `a` {String}
* `b` {String}
* `options` {Object}: Handlebars-provided options object.
* `returns` {String}

---

<a href='#handlebars_lt' aria-hidden='true' class='block-anchor'  id='handlebars_lt'><i aria-hidden='true' class='linkify icon'></i></a>

## {{lt}}

Block helper that renders a block if `a` is *less than* `b`.

If an inverse block is specified, it will be rendered when falsy. You may optionally use the `compare=""` hash argument for the second value.

#### Parameters

* `context` {Object}
* `options` {Object}: Handlebars-provided options object.
* `returns` {String}: Block, or inverse block if specified and falsy.

---

<a href='#handlebars_lte' aria-hidden='true' class='block-anchor'  id='handlebars_lte'><i aria-hidden='true' class='linkify icon'></i></a>

## {{lte}}

Block helper that renders a block if `a` is *less than or equal to* `b`.

If an inverse block is specified, it will be rendered when falsy. You may optionally use the `compare=""` hash argument for the second value.

#### Parameters

* `a` {String}
* `b` {String}
* `options` {Object}: Handlebars-provided options object.
* `returns` {String}: Block, or inverse block if specified and falsy.

---

<a href='#handlebars_neither' aria-hidden='true' class='block-anchor'  id='handlebars_neither'><i aria-hidden='true' class='linkify icon'></i></a>

## {{neither}}

Block helper that renders a block if *neither of* the given values are truthy. If you specify an inverse block, it will be rendered when falsy.

#### Parameters

* `a` {any}
* `b` {any}
* `options` {}: Handlebars options object.
* `returns` {String}: Block, or inverse block if specified and falsy.

---

<a href='#handlebars_unlesseq' aria-hidden='true' class='block-anchor'  id='handlebars_unlesseq'><i aria-hidden='true' class='linkify icon'></i></a>

## {{unlessEq}}

Block helper that always renders the inverse block *unless `a` is equal to `b`*.

#### Parameters

* `a` {String}
* `b` {String}
* `options` {Object}: Handlebars-provided options object.
* `returns` {String}: Inverse block by default, or block if falsy.

---

<a href='#handlebars_unlessgt' aria-hidden='true' class='block-anchor'  id='handlebars_unlessgt'><i aria-hidden='true' class='linkify icon'></i></a>

## {{unlessGt}}

Block helper that always renders the inverse block *unless `a` is greater than `b`*.

#### Parameters

* `context` {Object}
* `options` {Object}: Handlebars-provided options object.
* `returns` {String}: Inverse block by default, or block if falsy.

---

<a href='#handlebars_unlesslt' aria-hidden='true' class='block-anchor'  id='handlebars_unlesslt'><i aria-hidden='true' class='linkify icon'></i></a>

## {{unlessLt}}

Block helper that always renders the inverse block *unless `a` is less than `b`*.

#### Parameters

* `context` {Object}
* `options` {Object}: Handlebars-provided options object.
* `returns` {String}: Block, or inverse block if specified and falsy.

---

<a href='#handlebars_unlessgteq' aria-hidden='true' class='block-anchor'  id='handlebars_unlessgteq'><i aria-hidden='true' class='linkify icon'></i></a>

## {{unlessGteq}}

Block helper that always renders the inverse block *unless `a` is greater than or equal to `b`*.

#### Parameters

* `context` {Object}
* `options` {Object}: Handlebars-provided options object.
* `returns` {String}: Block, or inverse block if specified and falsy.

---

<a href='#handlebars_unlesslteq' aria-hidden='true' class='block-anchor'  id='handlebars_unlesslteq'><i aria-hidden='true' class='linkify icon'></i></a>

## {{unlessLteq}}

Block helper that always renders the inverse block *unless `a` is less than or equal to `b`*.

#### Parameters

* `context` {Object}
* `options` {Object}: Handlebars-provided options object.
* `returns` {String}: Block, or inverse block if specified and falsy.

