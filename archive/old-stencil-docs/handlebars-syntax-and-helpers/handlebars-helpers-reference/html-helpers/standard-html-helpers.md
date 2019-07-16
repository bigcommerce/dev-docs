<h1>Standard HTML Helpers</h1>

<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#handlebars_ellipsis">{{ellipsis}}</a></li>
    <li><a href="#handlebars_sanitize">{{sanitize}}</a></li>
    <li><a href="#handlebars_ul">{{ul}}</a></li>
    <li><a href="#handlebars_ol">{{ol}}</a></li>
    <li><a href="#handlebars_thumbnailimage">{{thumbnailImage}}</a></li>
	</ul>
</div>

<a href='#handlebars_ellipsis' aria-hidden='true' class='block-anchor'  id='handlebars_ellipsis'><i aria-hidden='true' class='linkify icon'></i></a>

The following standard helpers are available to handle HTML content.

## {{ellipsis}}

Truncates a string to the specified `length`, and appends an elipsis, `…`.

#### Parameters

* `str` {String}
* `length` {Number}: The desired length of the returned string.
* `returns` {String}: The truncated string.

#### Example

```
{{ellipsis "<span>foo bar baz</span>" 7}}
//=> 'foo bar…'
```

---

<a href='#handlebars_sanitize' aria-hidden='true' class='block-anchor'  id='handlebars_sanitize'><i aria-hidden='true' class='linkify icon'></i></a>

## {{sanitize}}

Strips HTML tags from a string, so that only the text nodes are preserved.

#### Parameters

* `str` {String}: The string of HTML to sanitize.
* `returns` {String}

#### Example

```js
{{sanitize "<span>foo</span>"}}
//=> 'foo'
```

---

<a href='#handlebars_ul' aria-hidden='true' class='block-anchor'  id='handlebars_ul'><i aria-hidden='true' class='linkify icon'></i></a>

## {{ul}}

Block helper for creating unordered lists (`<ul></ul>`).

#### Parameters

* `context` {Object}
* `options` {Object}
* `returns` {String}

---

<a href='#handlebars_ol' aria-hidden='true' class='block-anchor'  id='handlebars_ol'><i aria-hidden='true' class='linkify icon'></i></a>

## {{ol}}

Block helper for creating ordered lists  (`<ol></ol>`).

#### Parameters

* `context` {Object}
* `options` {Object}
* `returns` {String}

---

<a href='#handlebars_thumbnailimage' aria-hidden='true' class='block-anchor'  id='handlebars_thumbnailimage'><i aria-hidden='true' class='linkify icon'></i></a>

## {{thumbnailImage}}

Returns a `<figure>` with a thumbnail linked to a full picture.

#### Parameters

* `context` {Object}: Object with values/attributes to add to the generated elements:
* `context.alt` {String}
* `context.src` {String}
* `context.width` {Number}
* `context.height` {Number}
* `returns` {String}: HTML `<figure>` element with image and optional caption/link.


