# Data Layer API

The Data Layer API allows BigCommerce to send data from BigCommerce-hosted storefronts to third-party analytics providers through [Big Open Data Layer](/api-docs/analytics/bodl-for-storefronts). Bigcommerce can build native integrations to analytic providers, such as Google Analytics 4, using the data layer. Partners may also build their own integrations using the data layer. In each case, you must first enable the data layer via the Data Layer API.

This guide shows you how to use the Data Layer API. For more info, see the [Data Layer API Reference](/api-reference/graphql/data-layer-api). 

## Get data layer enabled flag

<!--
type: tab
title: Query
-->

```graphql title="Example query: Get data layer enabled flag" lineNumbers
query {
  store {
    settings {
      dataSolutions {
        isDataLayerEnabled
      }
    }
  }
}
```
<!--
type: tab
title: Response
-->

```graphql title="Example response: Get data layer enabled flag" lineNumbers
{
  "data": {
    "store": {
      "settings": {
        "dataSolutions": {
          "isDataLayerEnabled": false
        }
      }
    }
  }
}
```

## Enable data layer

<!-- type: tab-end -->

<!--
type: tab
title: Mutation
-->

```graphql title="Example mutation: Enable data layer" lineNumbers
mutation {
  settings {
    dataSolutions {
      updateDataLayer (input: {isDataLayerEnabled: true}) {
        dataSolutions {
          isDataLayerEnabled
        }
      }
    }
  }
}
```
<!--
type: tab
title: Response
-->

```graphql title="Example response: Enable data layer" lineNumbers
{
  "data": {
    "store": {
      "settings": {
        "dataSolutions": {
          "isDataLayerEnabled": true
        }
      }
    }
  }
}
```

## Disable data layer

<!-- type: tab-end -->

<!--
type: tab
title: Mutation
-->

```graphql title="Example mutation: Disable data layer" lineNumbers
mutation {
  settings {
    dataSolutions {
      updateDataLayer (input: {isDataLayerEnabled: false}) {
        dataSolutions {
          isDataLayerEnabled
        }
      }
    }
  }
}
```

<!--
type: tab
title: Response
-->

```graphql title="Example response: Disable data layer" lineNumbers
{
  "data": {
    "store": {
      "settings": {
        "dataSolutions": {
          "isDataLayerEnabled": false
        }
      }
    }
  }
}
```

<!-- type: tab-end -->

## Resources
- [Data Layer API Reference](/api-reference/graphql/data-layer-api)
- [Big Open Data Layer](/api-docs/analytics/bodl-for-storefronts)
