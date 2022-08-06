---
stoplight-id: 8093a34240fc9
---

# Store Logs API

The Store Logs API allows merchants to track events in their store. Each event creates an entry in the log. To process events over time, you can configure external systems to retrieve store log entries. For example, you can see how often merchants request shipping quotes from a carrier. You can also learn more about errors that occur on a store.

The store logs track events from all storefront channels. Examples of events include sign-ups for newsletters and changes to an order status. You can retrieve entries for 365 days after their timestamp. 

This guide demonstrates how to use the Store Logs API. For more info, see the [Store Logs API reference](/api-reference/store-management/store-logs). 

## Get store logs

Send a request to the [Get system logs](/api-reference/store-management/store-logs/system-logs/get-system-logs) endpoint. The API responds with the earliest 20 entries. The response orders the entries chronologically, from earliest to latest.

### Filter by log ID

To filter the entries by log ID, pass a comma-separated list of log IDs to the `id:in` query parameter. 

The following example retrieves entries by log ID: 

<!--
type: tab
title: Request
-->

```http title="Example request: Filter by log ID" lineNumbers
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/store/systemlogs?id:in=5,7
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json
```

<!--
type: tab
title: Response
-->

```json title="Example response: Filter by log ID" lineNumbers
{
  "data": [
    {
      "id": 5,
      "type": "emailintegration",
      "module": "Export Only",
      "severity": "success",
      "summary": "Subscriber subscriber@example.com stored for export.",
      "message": null,
      "date_created": "2021-12-20T23:15:24+00:00"
    },
    {
      "id": 7,
      "type": "design",
      "module": "Theme Download",
      "severity": "success",
      "summary": "user@example.com Downloaded LifeStyle-1.4.1.zip, 8e2a49c1-f85d-3149-ghce-5e2ba6d55p34",
      "message": "user@example.com Downloaded LifeStyle-1.4.1.zip, 8e2a49c1-f85d-3149-ghce-5e2ba6d55p34",
      "date_created": "2021-12-22T15:27:09+00:00"
    }
  ],
  "meta": {
    "pagination": {
      "total": 2,
      "count": 2,
      "per_page": 50,
      "current_page": 1,
      "total_pages": 1,
      "links": {
        "current": "?id%3Ain=5%2C7&page=1&limit=50"
      }
    }
  }
}
```

<!-- type: tab-end -->


### Filter by type 

The store logs categorize entries into various types. For example, requesting shipping quotes at checkout creates a `shipping` entry. To filter entries by type, use the `type` query parameter. For a list of log types, see the [Get system logs](/api-reference/store-management/store-logs/system-logs/get-system-logs) endpoint reference. 

The following example retrieves shipping entries:

<!--
type: tab
title: Request
-->

```http title="Example request: Filter by type" lineNumbers
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/store/systemlogs?type=shipping
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json
```

<!--
type: tab
title: Response
-->

```json title="Example response: Filter by type" lineNumbers
{
  "data": [
    {
      "id": 6,
      "type": "shipping",
      "module": "FedEx Ground Home Delivery (5-7 Business Days) (flatrate)",
      "severity": "success",
      "summary": "Successfully retrieved shipping quote",
      "message": "{\"quoteId\":\"2470214433\",\"cacheInfo\":\"cached for 3600s\",\"customerGroup\":{\"id\":4,\"name\":\"Wholesale Customers\"},\"customerEmail\":\"customer@example.com\",\"customerId\":4,\"destination\":{\"streetAddress1\":\"123 Example Street\",\"streetAddress2\":\"\",\"city\":\"Austin\",\"postcode\":\"12345\",\"stateName\":\"Texas\",\"stateIso2\":\"TX\",\"countryIso2\":\"US\",\"addressType\":\"residential\"},\"items\":[{\"name\":\"example product (ABC-1234)\",\"id\":\"23\",\"quantity\":2,\"weight\":32,\"width\":4,\"height\":4,\"length\":4,\"attributes\":[],\"omittedReason\":\"\"}],\"groupedResults\":{\"flatrate\":{\"rates\":[{\"handling\":0,\"price\":3,\"description\":\"FedEx Ground Home Delivery (5-7 Business Days)\",\"additionalDescription\":\"\"}],\"carrierType\":\"flatrate\"}},\"settings\":[]}",
      "date_created": "2021-12-22T23:44:15+00:00"
    },
    {
      "id": 92,
      "type": "shipping",
      "module": "USPS (endicia)",
      "severity": "errors",
      "summary": "Some shipping quotes were not able to be retrieved",
      "message": "{\"errorDetail\":\"[\\\"Account ID example_id is invalid. Error encountered (Log ID: 62407)\\\"]\",\"quoteId\":\"1659036199\",\"cacheInfo\":\"cached for 3600s\",\"customerGroup\":{\"id\":3,\"name\":\"Retail Customers\"},\"customerEmail\":\"customer2@example.com\",\"customerId\":1,\"destination\":{\"streetAddress1\":\"123 Example St\",\"streetAddress2\":\"\",\"city\":\"Austin\",\"postcode\":\"12345\",\"stateName\":\"Texas\",\"stateIso2\":\"TX\",\"countryIso2\":\"US\",\"addressType\":\"residential\"},\"items\":[{\"name\":\"example product (ABC-1234)\",\"id\":\"23\",\"quantity\":3,\"weight\":32,\"width\":4,\"height\":4,\"length\":4,\"attributes\":[],\"omittedReason\":\"\"},{\"name\":\"example product 2 (ABC-1111)\",\"id\":\"113\",\"quantity\":2,\"weight\":2000,\"width\":2,\"height\":2,\"length\":2,\"attributes\":[],\"omittedReason\":\"\"}],\"settings\":{\"deliveryServices\":[\"PriorityExpress\",\"ParcelSelect\",\"MediaMail\"]}}",
      "date_created": "2022-07-28T19:23:19+00:00"
    }
  ],
  "meta": {
    "pagination": {
      "total": 2,
      "count": 2,
      "per_page": 50,
      "current_page": 1,
      "total_pages": 1,
      "links": {
        "current": "?type=shipping&page=1&limit=50"
      }
    }
  }
}
```

<!-- type: tab-end -->

### Filter by module

To see how often merchants request shipping quotes from a specific carrier, URL-encode the carrier name and pass it to the `module` query parameter. 

The following example retrieves shipping entries by module:

<!--
type: tab
title: Request
-->

```http title="Example request: Filter by module" lineNumbers
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/store/systemlogs?module=USPS+%28endicia%29
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json
```

<!--
type: tab
title: Response
-->

```json title="Example response: Filter by module" lineNumbers
{
  "data": [
    {
      "id": 92,
      "type": "shipping",
      "module": "USPS (endicia)",
      "severity": "errors",
      "summary": "Some shipping quotes were not able to be retrieved",
      "message": "{\"errorDetail\":\"[\\\"Account ID example_id is invalid. Error encountered (Log ID: 62407)\\\"]\",\"quoteId\":\"1659036199\",\"cacheInfo\":\"cached for 3600s\",\"customerGroup\":{\"id\":3,\"name\":\"Retail Customers\"},\"customerEmail\":\"customer2@example.com\",\"customerId\":1,\"destination\":{\"streetAddress1\":\"123 Example St\",\"streetAddress2\":\"\",\"city\":\"Austin\",\"postcode\":\"12345\",\"stateName\":\"Texas\",\"stateIso2\":\"TX\",\"countryIso2\":\"US\",\"addressType\":\"residential\"},\"items\":[{\"name\":\"example product (ABC-1234)\",\"id\":\"23\",\"quantity\":3,\"weight\":32,\"width\":4,\"height\":4,\"length\":4,\"attributes\":[],\"omittedReason\":\"\"},{\"name\":\"example product 2 (ABC-1111)\",\"id\":\"113\",\"quantity\":2,\"weight\":2000,\"width\":2,\"height\":2,\"length\":2,\"attributes\":[],\"omittedReason\":\"\"}],\"settings\":{\"deliveryServices\":[\"PriorityExpress\",\"ParcelSelect\",\"MediaMail\"]}}",
      "date_created": "2022-07-28T19:23:19+00:00"
    }
  ],
  "meta": {
    "pagination": {
      "total": 1,
      "count": 1,
      "per_page": 50,
      "current_page": 1,
      "total_pages": 1,
      "links": {
        "current": "?module=USPS+%28endicia%29&page=1&limit=50"
      }
    }
  }
}
```

<!-- type: tab-end -->

### Filter by severity 

Each event has an associated outcome, also known as `severity`. To filter the results by severity, use the `severity` query parameter. Specify the severity's corresponding integer in the query. For a list of severity values, see the [Get system logs](/api-reference/store-management/store-logs/system-logs/get-system-logs) endpoint reference.

The following example retrieves notices, which have a `severity` of `2`:

<!--
type: tab
title: Request
-->

```http title="Example request: Filter by severity" lineNumbers
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/store/systemlogs?severity=2
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json
```

<!--
type: tab
title: Response
-->

```json title="Example response: Filter by severity" lineNumbers
{
  "data": [
    {
      "id": 3,
      "type": "general",
      "module": "",
      "severity": "notices",
      "summary": "Marking order 1234000002 as deleted.",
      "message": "Marking order 1234000002 as deleted.",
      "date_created": "2021-12-19T19:12:31+00:00"
    },
    {
      "id": 4,
      "type": "general",
      "module": "",
      "severity": "notices",
      "summary": "Restoring order 1234000002",
      "message": "Restoring order 1234000002",
      "date_created": "2021-12-19T19:15:56+00:00"
    }
  ],
  "meta": {
    "pagination": {
      "total": 2,
      "count": 2,
      "per_page": 50,
      "current_page": 1,
      "total_pages": 1,
      "links": {
        "current": "?severity=2&page=1&limit=50"
        }
    }
  }
}
```

<!-- type: tab-end -->

### Filter with pagination

As stated at the beginning of the section, the [Get system logs](/api-reference/store-management/store-logs/system-logs/get-system-logs) endpoint returns the **earliest** 20 entries by default. To retrieve newer or differently grouped subsets of entries, use a combination of the `page` and `limit` query parameters. 

The following example requests page two with two entries per page, which returns the third and fourth oldest entries:  

<!--
type: tab
title: Request
-->

```http title="Example request: Filter with pagination" lineNumbers
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/store/systemlogs?page=2&limit=2
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json
```

<!--
type: tab
title: Response
-->

```json title="Example response: Filter with pagination" lineNumbers
{
  "data": [
    {
      "id": 3,
      "type": "general",
      "module": "",
      "severity": "notices",
      "summary": "Marking order 1234000002 as deleted.",
      "message": "Marking order 1234000002 as deleted.",
      "date_created": "2021-12-19T19:12:31+00:00"
    },
    {
      "id": 4,
      "type": "general",
      "module": "",
      "severity": "notices",
      "summary": "Restoring order 1234000002",
      "message": "Restoring order 1234000002",
      "date_created": "2021-12-19T19:15:56+00:00"
    }
  ],
  "meta": {
    "pagination": {
      "total": 2,
      "count": 2,
      "per_page": 2,
      "current_page": 2,
      "total_pages": 1,
      "links": {
        "previous": "?page=1&limit=2",
        "current": "?page=2&limit=2"
      }
    }
  }
}
```

<!-- type: tab-end -->


## Resources
- [Store Logs API Reference](/api-reference/store-management/store-logs)
- [Store Logs Support Article](https://support.bigcommerce.com/s/article/Using-Store-Logs)

### Endpoint reference
- [Get system logs](/api-reference/store-management/store-logs/system-logs/get-system-logs)
