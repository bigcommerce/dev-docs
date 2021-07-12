# Rendering Headless Widgets

Using the GraphQL Storefront API, you can request the widget content for a page while building or editing a theme. This means that you can preview the storefront pages, including widgets on the page, without having to rely on the Stencil CLI. 

The GraphQL Storefront API allows you to fetch widget HTML making it easier to render widgets in contexts other than Stencil.

You can request rendered widget content by page type or entity ID as shown in the following GraphQL ideation:

**GraphQL ideation**

```js
query {
  site {
    content {
      renderedRegionsByPageType(pageType:"product", entityId:123) {
        regionName        
        html
      }
    }
  }
}
```

The API will return the rendered content of all widgets within the page as an array of regions with region name and HTML.
