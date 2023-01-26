# Data Layer API

The Data Layer API allows BigCommerce to send data from BigCommerce-hosted storefronts to third-party analytics providers through [Big Open Data Layer](/api-docs/analytics/bodl-for-storefronts). Bigcommerce can build native integrations to analytic providers, such as Google Analytics 4, using the data layer. Partners may also build their own integrations using the data layer. In each case, you must first enable the data layer via the Data Layer API.

This guide shows you how to use the Data Layer API. For more info, see the [Data Layer API Reference](/api-reference/graphql/data-layer-api). 

## Get data layer

Send the following query to retrieve whether the data layer is enabled in the store: 

<!--
type: tab
title: Query
-->

```http title="Example query: Get data layer enabled flag" lineNumbers
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/...
X-Auth-Token: {{ACCESS_TOKEN}}
Accept: application/json

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
<!-- type: tab-end -->

## Enable data layer

Send the following query to enable the data layer in the store: 

<!--
type: tab
title: Mutation
-->

```http title="Example mutation: Enable data layer" lineNumbers
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/...
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

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

<!-- type: tab-end -->

## Disable data layer

Send the following query to disable the data layer in the store: 

<!--
type: tab
title: Mutation
-->

```http title="Example mutation: Disable data layer" lineNumbers
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/...
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

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
