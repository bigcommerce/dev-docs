# Rendering Headless Widgets

<<<<<<< HEAD
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
=======
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
>>>>>>> 2bb13f5681b56840e19fb7eb6b8b42640cc4f753
      }
    }
  }
}
```

<<<<<<< HEAD
The API will return the rendered content of all widgets within the page as an array of regions with region name and HTML.
=======
To test it out using the GraphQL Storefront API Playground, [log into your store](https://login.bigcommerce.com/deep-links/manage) and navigate to **Advanced Settings** > **Storefront API Playground**.

>>>>>>> 2bb13f5681b56840e19fb7eb6b8b42640cc4f753
