# Request Runner

<div class="otp" id="no-index">

### On this Page	
- [Adding a Button](#adding-a-button)
- [Demo Buttons](#demo-buttons)

</div>

This page demos this Request Runner.

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
https://austin-dev-docs.docs.stoplight.io/api-reference/store-management/catalog/brands/getbrands#requestrunner
````

`#requestrunner` at the end of an `<a>` tag's `href` is what triggers the request runner code.

**Example Markdown**:

```markdown
[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](/api-reference/reference/catalog/summary/getcatalogsummary#requestrunner)
```

## Demo Buttons


```
[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](/api-reference/reference/catalog/summary/getcatalogsummary#requestrunner)
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](/api-reference/reference/catalog/summary/getcatalogsummary#requestrunner)

```
[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](/api-reference/reference/store-information-api/store-information-reference/getstore#requestrunner)
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](/api-reference/reference/store-information-api/store-information-reference/getstore#requestrunner)

```
[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](/api-reference/reference/store-information-api/time-zone/gettime#requestrunner)
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](/api-reference/reference/store-information-api/time-zone/gettime#requestrunner)



