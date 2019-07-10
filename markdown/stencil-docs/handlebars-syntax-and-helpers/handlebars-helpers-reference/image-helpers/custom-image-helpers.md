<h1>Custom Image Helpers</h1>

<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#handlebars_getimage">{{getImage}}</a></li>
	</ul>
</div>

<a href='#handlebars_getimage' aria-hidden='true' class='block-anchor'  id='handlebars_getimage'><i aria-hidden='true' class='linkify icon'></i></a>

The Stencil framework provides the following custom helper to manage images.

## {{getImage}}

The `getImage` helper is custom to Stencil. It returns the URL for an image of the specified size. Values for the size parameter are defined in the `config.json` file’s `settings` section.

This helper's parameters are:

- `stencilImage`: a StencilImage.
- `size`: a string.
- `defaultImage` (optional): a string. 

Here is an example: 

```
{{getImage image "thumbnail"}}
``` 

You can use the optional `defaultImage` parameter to specify an image that will be displayed in cases where the passed `stencilImage` value is null.



