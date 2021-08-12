# Rendering Headless Widgets

The GraphQL Storefront API allows you to retrieve HTML content of rendered widgets for a given page making it possible to preview widgets in contexts other than Stencil.

You can request rendered widget content by `pageType` (`renderedRegionsByPageType`) or as a combination of `pageType` and `entityId` (`renderedRegionsByPageTypeAndEntityId`). The API will return the rendered content of all widgets within the specified parameters as an array of regions with region name and HTML.

The following sample GraphQL query demonstrates how to request rendered widget content by page type:

**GraphQL query**

```graphql
query {
  site {
    content {
      renderedRegionsByPageType(pageType: HOME) {
        regions {
          name
          html
        }
      }
    }
  }
}
```

To test it out using the GraphQL Storefront API Playground, [log into your store](https://login.bigcommerce.com/deep-links/manage) and navigate to **Advanced Settings** > **Storefront API Playground**.

