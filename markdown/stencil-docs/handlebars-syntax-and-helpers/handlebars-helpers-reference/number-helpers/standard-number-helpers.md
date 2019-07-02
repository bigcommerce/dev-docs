<h1>Standard Number Helpers</h1>

<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#handlebars_addcommas">{{addCommas}}</a></li>
    <li><a href="#handlebars_phonenumber">{{phoneNumber}}</a></li>
    <li><a href="#handlebars_random">{{random}}</a></li>
    <li><a href="#handlebars_toabbr">{{toAbbr}}</a></li>
    <li><a href="#handlebars_toexponential">{{toExponential}}</a></li>
    <li><a href="#handlebars_tofixed">{{toFixed}}</a></li>
    <li><a href="#handlebars_tofloat">{{toFloat}}</a></li>
    <li><a href="#handlebars_toint">{{toInt}}</a></li>
    <li><a href="#handlebars_toprecision">{{toPrecision}}</a></li>
	</ul>
</div>

<a href='#handlebars_addcommas' aria-hidden='true' class='block-anchor'  id='handlebars_addcommas'><i aria-hidden='true' class='linkify icon'></i></a>

The following standard helpers are available to handle and transform numbers.

## {{addCommas}}

Adds commas to numbers.

#### Parameters

* `num` {Number}
* `returns` {Number}

---

<a href='#handlebars_phonenumber' aria-hidden='true' class='block-anchor'  id='handlebars_phonenumber'><i aria-hidden='true' class='linkify icon'></i></a>

## {{phoneNumber}}

Converts a string or number to a formatted phone number.

#### Parameters

* `num` {Number|String}: The phone number to format, e.g., `8005551212`
* `returns` {Number}: The formatted phone number: `(800) 555-1212`

---

<a href='#handlebars_random' aria-hidden='true' class='block-anchor'  id='handlebars_random'><i aria-hidden='true' class='linkify icon'></i></a>

## {{random}}

Generates a random number between two values.

#### Parameters

* `min` {Number}
* `max` {Number}
* `returns` {String}

---

<a href='#handlebars_toabbr' aria-hidden='true' class='block-anchor'  id='handlebars_toabbr'><i aria-hidden='true' class='linkify icon'></i></a>

## {{toAbbr}}

Abbreviates numbers to the given number of `precision`. This is for general numbers, not size in bytes.

#### Parameters

* `number` {Number}
* `precision` {Number}
* `returns` {String}

---

<a href='#handlebars_toexponential' aria-hidden='true' class='block-anchor'  id='handlebars_toexponential'><i aria-hidden='true' class='linkify icon'></i></a>

## {{toExponential}}

Returns a string, representing the given number in exponential notation.

#### Parameters

* `number` {Number}
* `fractionDigits` {Number}: Optional. An integer specifying the number of digits to use after the decimal point. Defaults to as many digits as necessary to specify the number.
* `returns` {Number}

#### Example

```js
{{toExponential number digits}};
```

---

<a href='#handlebars_tofixed' aria-hidden='true' class='block-anchor'  id='handlebars_tofixed'><i aria-hidden='true' class='linkify icon'></i></a>

## {{toFixed}}

Formats the given number, using fixed-point notation.

#### Parameters

* `number` {Number}
* `digits` {Number}: Optional. The number of digits to use after the decimal point. This can be a value between 0 and 20, inclusive, and implementations may optionally support a larger range of values. If this argument is omitted, it is treated as 0.
* `returns` {Number}

---

<a href='#handlebars_tofloat' aria-hidden='true' class='block-anchor'  id='handlebars_tofloat'><i aria-hidden='true' class='linkify icon'></i></a>

## {{toFloat}}

#### Parameters

* `number` {Number}
* `returns` {Number}

---

<a href='#handlebars_toint' aria-hidden='true' class='block-anchor'  id='handlebars_toint'><i aria-hidden='true' class='linkify icon'></i></a>

## {{toInt}}

#### Parameters

* `number` {Number}
* `returns` {Number}

---

<a href='#handlebars_toprecision' aria-hidden='true' class='block-anchor'  id='handlebars_toprecision'><i aria-hidden='true' class='linkify icon'></i></a>

## {{toPrecision}}

#### Parameters

* `number` {Number}
* `precision` {Number}: Optional. The number of significant digits.
* `returns` {Number}

