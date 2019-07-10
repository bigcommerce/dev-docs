<h1>Custom String Helpers</h1>

<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#handlebars_block">{{block}}</a></li>
    <li><a href="#handlebars_concat">{{concat}}</a></li>
    <li><a href="#handlebars_dynamiccomponent">{{dynamicComponent}}</a></li>
    <li><a href="#handlebars_json">{{json}}</a></li>
    <li><a href="#handlebars_lang">{{lang}}</a></li>
    <li><a href="#handlebars_nl2br">{{nl2br}}</a></li>
    <li><a href="#handlebars_partial">{{partial}}</a></li>
    <li><a href="#handlebars_replace">{{replace}}</a></li>
    <li><a href="#handlebars_tolowercase">{{toLowerCase}}</a></li>
	</ul>
</div>

<a href='#handlebars_block' aria-hidden='true' class='block-anchor'  id='handlebars_block'><i aria-hidden='true' class='linkify icon'></i></a>

The following custom helpers are available to manipulate strings:

## {{block}} 

The `block` string helper is custom to Stencil. It defines a block of content, which can be overwritten by the [partial](#partial-helper) helper.

---

<a href='#handlebars_concat' aria-hidden='true' class='block-anchor'  id='handlebars_concat'><i aria-hidden='true' class='linkify icon'></i></a>

## {{concat}}

The `concat` helper is custom to Stencil. It concatenates two string objects from the page's context, which are passed as parameters. It returns a new string object.

#### Example

```
{{concat breadcrumbs.[0].name breadcrumbs.[0].url}}
```

---

<a href='#handlebars_dynamiccomponent' aria-hidden='true' class='block-anchor'  id='handlebars_dynamiccomponent'><i aria-hidden='true' class='linkify icon'></i></a>

## {{dynamicComponent}}

The `dynamicComponent` string helper is custom to Stencil. It inserts a dynamic partial from within the path that is supplied as its parameter.

---

<a href='#handlebars_json' aria-hidden='true' class='block-anchor'  id='handlebars_json'><i aria-hidden='true' class='linkify icon'></i></a>

## {{json}}

The `json` string helper is custom to Stencil. You can use this helper to convert a JavaScript string object (from the page's context) into a JSON string object.

---

<a href='#handlebars_lang' aria-hidden='true' class='block-anchor'  id='handlebars_lang'><i aria-hidden='true' class='linkify icon'></i></a>

## {{lang}}

The `lang` string helper is custom to Stencil. It maps keys to translation files, based on the locale indicated by the visitor’s browser. Its parameters are the following keys:

- `translationKey`: a string.
- `options`: key-value pairs.

---

<a href='#handlebars_nl2br' aria-hidden='true' class='block-anchor'  id='handlebars_nl2br'><i aria-hidden='true' class='linkify icon'></i></a>

## {{nl2br}}

The `nl2br` helper is custom to Stencil. You can call this helper on a string object from the page's context, to convert its contained newline characters (`\r\n`, `\n\r`, `\r`, `\n`) to `<br>` tags. The `nl2br` helper returns a new string object.

#### Example

This Handlebars statement:

```
{{nl2br settings.address}}
```

...will take this example string:

```
"settings": {
  "address": "\r\n685 Market St\r\nSan Francisco\r\n94105\r\nCA\r\n"
}
```

...and return

```
"<br>685 Market St<br>San Francisco<br>94105<br>CA<br>"
```

---

<a href='#handlebars_partial' aria-hidden='true' class='block-anchor'  id='handlebars_partial'><i aria-hidden='true' class='linkify icon'></i></a>

## {{partial}}

The `partial` string helper is custom to Stencil. It overrides block content defined by the [block](#block-helper) helper.

---

<a href='#handlebars_replace' aria-hidden='true' class='block-anchor'  id='handlebars_replace'><i aria-hidden='true' class='linkify icon'></i></a>

## {{replace}}

The `replace` string helper is custom to Stencil. It searches for the first parameter within the second parameter and, if it finds it, replaces the first parameter with the contents of the specified Handlebars block.

For example, the following code would search for the string `needle` within the scope defined by `haystack`. If found, it would replace that string with the Handlebars block defined by `<context...replacement>`:

```
{{#replace "needle" haystack}}
  {{<context to use as a replacement>}}
{{/replace}}
```

---

<a href='#handlebars_toLowerCase' aria-hidden='true' class='block-anchor'  id='handlebars_toLowerCase'><i aria-hidden='true' class='linkify icon'></i></a>

## {{toLowerCase}}

The `toLowerCase` helper is custom to Stencil. Use this helper to return a copy of a string object, in all-lowercase. The helper returns a new string object.

#### Example

This Handlebars statement:

```
{{toLowerCase head.title}}
```

...will take this example string:

```
"head": {
  "title": "This is my TEST Store"
}
```

...and return:

```
"this is my test store"
```

