<h1>Standard String Helpers</h1>
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#handlebars_camelcase">{{camelcase}}</a></li>
    <li><a href="#handlebars_capitalize">{{capitalize}}</a></li>
    <li><a href="#handlebars_capitalizeall">{{capitalizeAll}}</a></li>
    <li><a href="#handlebars_center">{{center}}</a></li>
    <li><a href="#handlebars_chop">{{chop}}</a></li>
    <li><a href="#handlebars_dashcase">{{dashcase}}</a></li>
    <li><a href="#handlebars_dotcase">{{dotcase}}</a></li>
    <li><a href="#handlebars_hyphenate">{{hyphenate}}</a></li>
    <li><a href="#handlebars_isstring">{{isString}}</a></li>
    <li><a href="#handlebars_lowercase">{{lowercase}}</a></li>
    <li><a href="#handlebars_occurrences">{{occurrences}}</a></li>
    <li><a href="#handlebars_pascalcase">{{pascalcase}}</a></li>
    <li><a href="#handlebars_pathcase">{{pathcase}}</a></li>
    <li><a href="#handlebars_plusify">{{plusify}}</a></li>
    <li><a href="#handlebars_reverse">{{reverse}}</a></li>
    <li><a href="#handlebars_sentence">{{sentence}}</a></li>
    <li><a href="#handlebars_snakecase">{{snakecase}}</a></li>
    <li><a href="#handlebars_split">{{split}}</a></li>
    <li><a href="#handlebars_startswith">{{startsWith}}</a></li>
    <li><a href="#handlebars_titleize">{{titleize}}</a></li>
    <li><a href="#handlebars_trim">{{trim}}</a></li>
    <li><a href="#handlebars_truncate">{{truncate}}</a></li>
    <li><a href="#handlebars_uppercase">{{uppercase}}</a></li>
	</ul>
</div>

<a href='#handlebars_camelcase' aria-hidden='true' class='block-anchor'  id='handlebars_camelcase'></a>

## {{camelcase}}

camelCases the characters in the given `string`.

#### Parameters

* `string` {String}: The string to camelcase.
* `returns` {String}

#### Example

```js
{{camelcase "foo bar baz"}};
//=> 'fooBarBaz'
```



<a href='#handlebars_capitalize' aria-hidden='true' class='block-anchor'  id='handlebars_capitalize'></a>

## {{capitalize}}

Capitalizes the first word in a sentence.

#### Parameters

* `str` {String}
* `returns` {String}

#### Example

```handlebars
{{capitalize "foo bar baz"}}
//=> "Foo bar baz"
```



<a href='#handlebars_capitalizeall' aria-hidden='true' class='block-anchor'  id='handlebars_capitalizeall'></a>

## {{capitalizeAll}}

Capitalizes all words in a string.

#### Parameters

* `str` {String}
* `returns` {String}

#### Example

```handlebars
{{capitalizeAll "foo bar baz"}}
//=> "Foo Bar Baz"
```



<a href='#handlebars_center' aria-hidden='true' class='block-anchor'  id='handlebars_center'></a>

## {{center}}

Centers a string, using non-breaking spaces.

#### Parameters

* `str` {String}
* `spaces` {String}
* `returns` {String}



<a href='#handlebars_chop' aria-hidden='true' class='block-anchor'  id='handlebars_chop'></a>

## {{chop}}

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



<a href='#handlebars_dashcase' aria-hidden='true' class='block-anchor'  id='handlebars_dashcase'></a>

## {{dashcase}}

dash-cases the characters in `string`. Replaces non-word characters and periods with hyphens.

#### Parameters

* `string` {String}
* `returns` {String}

#### Example

```js
{{dashcase "a-b-c d_e"}}
//=> 'a-b-c-d-e'
```



<a href='#handlebars_dotcase' aria-hidden='true' class='block-anchor'  id='handlebars_dotcase'></a>

## {{dotcase}}

dot.cases the characters in `string`.

#### Parameters

* `string` {String}
* `returns` {String}

#### Example

```js
{{dotcase "a-b-c d_e"}}
//=> 'a.b.c.d.e'
```



<a href='#handlebars_hyphenate' aria-hidden='true' class='block-anchor'  id='handlebars_hyphenate'></a>

## {{hyphenate}}

Replaces spaces in a string with hyphens.

#### Parameters

* `str` {String}
* `returns` {String}

#### Example

```handlebars
{{hyphenate "foo bar baz qux"}}
//=> "foo-bar-baz-qux"
```



<a href='#handlebars_isstring' aria-hidden='true' class='block-anchor'  id='handlebars_isstring'></a>

## {{isString}}

Returns true if `value` is a string.

#### Parameters

* `value` {String}
* `returns` {Boolean}

#### Example

```handlebars
{{isString "foo"}}
//=> 'true'
```



<a href='#handlebars_lowercase' aria-hidden='true' class='block-anchor'  id='handlebars_lowercase'></a>

## {{lowercase}}

Lowercases all characters in the given string.

#### Parameters

* `str` {String}
* `returns` {String}

#### Example

```handlebars
{{lowercase "Foo BAR baZ"}}
//=> 'foo bar baz'
```



<a href='#handlebars_occurrences' aria-hidden='true' class='block-anchor'  id='handlebars_occurrences'></a>

## {{occurrences}}

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



<a href='#handlebars_pascalcase' aria-hidden='true' class='block-anchor'  id='handlebars_pascalcase'></a>

## {{pascalcase}}

PascalCases the characters in `string`.

#### Parameters

* `string` {String}
* `returns` {String}

#### Example

```js
{{pascalcase "foo bar baz"}}
//=> 'FooBarBaz'
```



<a href='#handlebars_pathcase' aria-hidden='true' class='block-anchor'  id='handlebars_pathcase'></a>

## {{pathcase}}

path/cases the characters in `string`.

#### Parameters

* `string` {String}
* `returns` {String}

#### Example

```js
{{pathcase "a-b-c d_e"}}
//=> 'a/b/c/d/e'
```



<a href='#handlebars_plusify' aria-hidden='true' class='block-anchor'  id='handlebars_plusify'></a>

## {{plusify}}

Replaces spaces in the given string with pluses.

#### Parameters

* `str` {String}: The input string
* `returns` {String}: Input string with spaces replaced by plus signs

#### Example

```handlebars
{{plusify "foo bar baz"}}
//=> 'foo+bar+baz'
```



<a href='#handlebars_reverse' aria-hidden='true' class='block-anchor'  id='handlebars_reverse'></a>

## {{reverse}}

Reverses a string.

#### Parameters

* `str` {String}
* `returns` {String}

#### Example

```handlebars
{{reverse "abcde"}}
//=> 'edcba'
```



<a href='#handlebars_sentence' aria-hidden='true' class='block-anchor'  id='handlebars_sentence'></a>

## {{sentence}}

Sentence-cases the given string.

#### Parameters

* `str` {String}
* `returns` {String}

#### Example

```handlebars
{{sentence "hello world. goodbye world."}}
//=> 'Hello world. Goodbye world.'
```



<a href='#handlebars_snakecase' aria-hidden='true' class='block-anchor'  id='handlebars_snakecase'></a>

## {{snakecase}}

snake_cases the characters in the given `string`.

#### Parameters

* `string` {String}
* `returns` {String}

#### Example

```js
{{snakecase "a-b-c d_e"}}
//=> 'a_b_c_d_e'
```



<a href='#handlebars_split' aria-hidden='true' class='block-anchor'  id='handlebars_split'></a>

## {{split}}

Splits `string` at the given `character`.

#### Parameters

* `string` {String}: The string to split.
* `returns` {String} `character`: Default is `,`

#### Example

```js
{{split "a,b,c" ","}}
//=> ['a', 'b', 'c']
```



<a href='#handlebars_startswith' aria-hidden='true' class='block-anchor'  id='handlebars_startswith'></a>

## {{startsWith}}

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



<a href='#handlebars_titleize' aria-hidden='true' class='block-anchor'  id='handlebars_titleize'></a>

## {{titleize}}

Title-cases the given string.

#### Parameters

* `str` {String}
* `returns` {String}

#### Example

```handlebars
{{titleize "this is title case"}}
//=> 'This Is Title Case'
```



<a href='#handlebars_trim' aria-hidden='true' class='block-anchor'  id='handlebars_trim'></a>

## {{trim}}

Removes extraneous whitespace from the beginning and end of a string.

#### Parameters

* `string` {String}: The string to trim.
* `returns` {String}

#### Example

```js
{{trim " ABC "}}
//=> 'ABC'
```



<a href='#handlebars_truncate' aria-hidden='true' class='block-anchor'  id='handlebars_truncate'></a>

## {{truncate}}

Returns the first `{{x}}` number of characters in a string (unless it reaches the end of the string first, in which case it will return fewer). Returns a new string that is truncated to the given length.

#### Parameters
* `str` {String}: String to be truncated
* `length` {Integer}: Length to be truncated

#### Example
```javascript
{{lang (truncate 'blog.post.body.' 40) }}
```



<a href='#handlebars_uppercase' aria-hidden='true' class='block-anchor'  id='handlebars_uppercase'></a>

## {{uppercase}}

Uppercases all of the characters in the given string. If used as a block helper, it will uppercase the entire block. This helper
does not support inverse blocks.

#### Parameters

* `str` {String}: The string to uppercase.
* `options` {Object}: Handlebars options object.
* `returns` {String}

