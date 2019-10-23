<h1>Standard Inflection Helpers</h1>

<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#handlebars_inflect">{{inflect}}</a></li>
    <li><a href="#handlebars_ordinalize">{{ordinalize}}</a></li>
	</ul>
</div>

<a href='#handlebars_inflect' aria-hidden='true' class='block-anchor'  id='handlebars_inflect'><i aria-hidden='true' class='linkify icon'></i></a>

The following standard helpers are available to transform strings.

## {{inflect}}

Handles singular/plural forms.

#### Parameters

* `count` {Number}
* `singular` {String}: The singular form
* `plural` {String}: The plural form
* `include` {String}
* `returns` {String}



<a href='#handlebars_ordinalize' aria-hidden='true' class='block-anchor'  id='handlebars_ordinalize'><i aria-hidden='true' class='linkify icon'></i></a>

## {{ordinalize}}

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

