# Page Composition and Styling

<div class="otp" id="no-index">

### On This Page
- [Referencing a CSS Stylesheet](#referencing-a-css-stylesheet)
- [Template Composition](#template-composition)

</div> 

## Referencing a CSS Stylesheet

To apply CSS styling to a page in your theme, make sure that page's code includes a reference to the stylesheet you want to use. This example does so using the `{{partial}}` and `{{cdn}}` custom Handlebars helpers:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name"></div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: ""
subtitle: ""
lineNumbers: true
-->

```html
{{#partial "head"}}
    <link href="{{cdn '/assets/css/invoice.css'}}" rel="stylesheet">
{{/partial}}
```

## Template Composition

Template composition is a valuable Stencil feature. By defining blocks of overrideable content, your themes can insert templates on a per-page basis, while sharing code that is common to the whole theme.

### Defining Content Blocks

A base template defines content blocks by name. The following snippet uses `{{block}}` custom Handlebars helpers to define three content blocks, respectively named `head`, `hero`, and `page`:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">templates/layout/base.html</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "templates/layout/base.html"
subtitle: ""
lineNumbers: true
-->

```html
<!DOCTYPE html>
<html>
    <head>
        <title>{{ head.title }}</title>
        {{#block "head"}} {{/block}}
    </head>
    <body>
        <div class="body">
		    {{#block "hero"}} {{/block}}
		    <div class="container">
		        {{#block "page"}} {{/block}}
		    </div>
		    {{> components/common/modal}}
        </div>
    </body>
</html>
```

### Replacing Content Blocks

Pages can use a base template, replacing the defined blocks with their own content. This example replaces content for the head and page blocks:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">/templates/pages/account/orders/invoice.html</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "/templates/pages/account/orders/invoice.html"
subtitle: ""
lineNumbers: true
-->

```html
{{#partial "head"}}
    <link href="{{cdn '/assets/css/invoice.css'}}" rel="stylesheet">
{{/partial}}

{{#partial "page"}}
    <p>An invoice for a particular order would go here</p>
{{/partial}}
{{> layout/empty}}
```

### Matching Partials with Blocks

For any given name defined within the template rendering path, we recommend that you maintain a 1:1 mapping of partials to blocks.

