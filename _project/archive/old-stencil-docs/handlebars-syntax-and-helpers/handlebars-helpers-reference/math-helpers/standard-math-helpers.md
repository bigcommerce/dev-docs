<h1>Standard Math Helpers</h1>

<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#handlebars_add">{{add}}</a></li>
    <li><a href="#handlebars_subtract">{{subtract}}</a></li>
    <li><a href="#handlebars_divide">{{divide}}</a></li>
    <li><a href="#handlebars_multiply">{{multiply}}</a></li>
    <li><a href="#handlebars_floor">{{floor}}</a></li>
    <li><a href="#handlebars_ceil">{{ceil}</a></li>
    <li><a href="#handlebars_round">{{round}}</a></li>
    <li><a href="#handlebars_sum">{{sum}}</a></li>
    <li><a href="#handlebars_avg">{{avg}}</a></li>
	</ul>
</div>

<a href='#handlebars_add' aria-hidden='true' class='block-anchor'  id='handlebars_add'><i aria-hidden='true' class='linkify icon'></i></a>

The following standard helpers are available to handle mathematical operations.

## {{add}}

Returns the sum of `a` plus `b`.

#### Parameters

* `a` {Number}
* `b` {Number}



<a href='#handlebars_subtract' aria-hidden='true' class='block-anchor'  id='handlebars_subtract'><i aria-hidden='true' class='linkify icon'></i></a>

## {{subtract}}

Return the differnece of `a` minus `b`.

#### Parameters

* `a` {Number}
* `b` {Number}



<a href='#handlebars_divide' aria-hidden='true' class='block-anchor'  id='handlebars_divide'><i aria-hidden='true' class='linkify icon'></i></a>

## {{divide}}

Divides `a` by `b`.

#### Parameters

* `a` {Number}: numerator
* `b` {Number}: denominator



<a href='#handlebars_multiply' aria-hidden='true' class='block-anchor'  id='handlebars_multiply'><i aria-hidden='true' class='linkify icon'></i></a>

## {{multiply}}

Multiplies `a` by `b`.

#### Parameters

* `a` {Number}: factor
* `b` {Number}: multiplier



<a href='#handlebars_floor' aria-hidden='true' class='block-anchor'  id='handlebars_floor'><i aria-hidden='true' class='linkify icon'></i></a>

## {{floor}}

Gets the `Math.floor()` of the given value.

#### Parameters

* `value` {Number}



<a href='#handlebars_ceil' aria-hidden='true' class='block-anchor'  id='handlebars_ceil'><i aria-hidden='true' class='linkify icon'></i></a>

## {{ceil}}

Gets the `Math.ceil()` [ceiling] of the given value.

#### Parameters

* `value` {Number}



<a href='#handlebars_round' aria-hidden='true' class='block-anchor'  id='handlebars_round'><i aria-hidden='true' class='linkify icon'></i></a>

## {{round}}

Rounds the given value.

#### Parameters

* `value` {Number}



<a href='#handlebars_sum' aria-hidden='true' class='block-anchor'  id='handlebars_sum'><i aria-hidden='true' class='linkify icon'></i></a>

## {{sum}}

Returns the sum of all numbers in the given array.

#### Parameters

* `array` {Array}: Array of numbers to add up.
* `returns` {Number}

#### Example

```handlebars
{{sum "[1, 2, 3, 4, 5]"}}
//=> '15'
```



<a href='#handlebars_avg' aria-hidden='true' class='block-anchor'  id='handlebars_avg'><i aria-hidden='true' class='linkify icon'></i></a>

## {{avg}}

Returns the average of all numbers in the given array.

#### Parameters

* `array` {Array}: Array of numbers to add up and average.
* `returns` {Number}

#### Example

```handlebars
{{avg "[1, 2, 3, 4, 5]"}}
//=> '3'
```

