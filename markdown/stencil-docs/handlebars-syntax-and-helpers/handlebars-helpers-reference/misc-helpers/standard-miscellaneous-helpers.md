<h1>Standard Miscellaneous Helpers</h1>

<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#handlebars_default">{{default}}</a></li>
    <li><a href="#handlebars_option">{{option}}</a></li>
    <li><a href="#handlebars_noop">{{noop}}</a></li>
    <li><a href="#handlebars_withhash">{{withHash}}</a></li>
	</ul>
</div>

<a href='#handlebars_default' aria-hidden='true' class='block-anchor'  id='handlebars_default'></a>

The following standard helpers are also supported on the Stencil framework.

## {{default}}

Returns the first value, if that value is defined; otherwise, returns the "default" value.

#### Parameters

* `value` {any}
* `defaultValue` {any}
* `returns` {String}



<a href='#handlebars_option' aria-hidden='true' class='block-anchor'  id='handlebars_option'></a>

## {{option}}

Given the context `{options: {a: {b: {c: 'ddd'}}}}`, returns the given value of `prop` from `this.options`.

#### Parameters

* `prop` {String}
* `returns` {any}

#### Example

```handlebars
{{option "a.b.c"}}
<!-- results => `ddd` -->
```



<a href='#handlebars_noop' aria-hidden='true' class='block-anchor'  id='handlebars_noop'></a>

## {{noop}}

Block helper that renders the block without taking any arguments.

#### Parameters

* `options` {Object}
* `returns` {String}



<a href='#handlebars_withhash' aria-hidden='true' class='block-anchor'  id='handlebars_withhash'></a>

## {{withHash}}

Block helper that builds the context for the block from the options hash.

#### Parameters

* `options` {Object}: Handlebars-provided options object.

