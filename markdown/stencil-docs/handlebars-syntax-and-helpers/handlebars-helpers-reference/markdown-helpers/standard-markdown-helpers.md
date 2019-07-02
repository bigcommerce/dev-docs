<h1>Standard Markdown Helpers</h1>

<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#handlebars_markdown">{{markdown}}</a></li>
	</ul>
</div>

<a href='#handlebars_markdown' aria-hidden='true' class='block-anchor'  id='handlebars_markdown'></a>

The following standard helper is available to convert markdown.

## {{markdown}}

Block helper that converts a string of inline markdown to HTML.

#### Parameters

* `context` {Object}
* `options` {Object}
* `returns` {String}

#### Example

```html
{{#markdown}}
# Foo
{{/markdown}}
//=> <h1>Foo</h1>
```

