<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#handlebars_encodeuri">{{encodeURI}}</a></li>
    <li><a href="#handlebars_decodeuri">{{decodeURI}}</a></li>
    <li><a href="#handlebars_urlresolve">{{urlResolve}}</a></li>
    <li><a href="#handlebars_urlparse">{{urlParse}}</a></li>
    <li><a href="#handlebars_stripquerystring">{{stripQuerystring}}</a></li>
    <li><a href="#handlebars_stripprotocol">{{stripProtocol}}</a></li>
	</ul>
</div>

<a href='#handlebars_encodeuri' aria-hidden='true' class='block-anchor'  id='handlebars_encodeuri'><i aria-hidden='true' class='linkify icon'></i></a>

The following standard helpers are available to transform URLs.

## {{encodeURI}}

Encodes a Uniform Resource Identifier (URI) component, by replacing each instance of certain characters by one, two, three, or four escape sequences that represent the UTF-8 encoding of the character.

#### Parameters

* `str` {String}: The un-encoded string.
* `returns` {String}: The encoded string.



<a href='#handlebars_decodeuri' aria-hidden='true' class='block-anchor'  id='handlebars_decodeuri'><i aria-hidden='true' class='linkify icon'></i></a>

## {{decodeURI}}

Decodes a Uniform Resource Identifier (URI) component.

#### Parameters

* `str` {String}
* `returns` {String}



<a href='#handlebars_urlresolve' aria-hidden='true' class='block-anchor'  id='handlebars_urlresolve'><i aria-hidden='true' class='linkify icon'></i></a>

## {{urlResolve}}

Takes a base URL, and an href URL, and resolves them as a browser would for an anchor tag.

#### Parameters

* `base` {String}
* `href` {String}
* `returns` {String}



<a href='#handlebars_urlparse' aria-hidden='true' class='block-anchor'  id='handlebars_urlparse'><i aria-hidden='true' class='linkify icon'></i></a>

## {{urlParse}}

Parses a `url` string into an object.

#### Parameters

* `str` {String}: URL string.
* `returns` {String}: Returns stringified JSON.



<a href='#handlebars_stripquerystring' aria-hidden='true' class='block-anchor'  id='handlebars_stripquerystring'><i aria-hidden='true' class='linkify icon'></i></a>

## {{stripQuerystring}}

Strips the query string from a `url`.

#### Parameters

* `url` {String}
* `returns` {String}: The URL without the queryString.



<a href='#handlebars_stripprotocol' aria-hidden='true' class='block-anchor'  id='handlebars_stripprotocol'><i aria-hidden='true' class='linkify icon'></i></a>

## {{stripProtocol}}

Strips the protocol from a `url`.

Useful for displaying media that might have an `http` protocol on secure connections. Will change `http://foo.bar` to `//foo.bar`

#### Parameters

* `str` {String}
* `returns` {String}: The URL with the `http` protocol stripped.

