# Request Runner

Use the Request Runner steps outlined here to add it to your PRs.

## Adding a Button

A request runner button is composed two pieces of markdown:

1. image markdown: `![Image alt](/image/path)` (for the button image), nested in
2. link markdown: `[text/image](/Path)` (for telling the request runner what request to load)

The path to the request runner button is:

```
https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg
```

The link path can be a URL for any API reference operation page. Just append `#requestrunner` to the end like so:

```
https://developer.bigcommerce.com/api-reference/catalog/catalog-api/brands/getbrands#requestrunner
````

`#requestrunner` at the end of an `<a>` tag's `href` is what triggers the request runner code.
