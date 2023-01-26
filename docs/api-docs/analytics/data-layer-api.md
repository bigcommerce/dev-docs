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
