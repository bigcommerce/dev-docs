---
stoplight-id: 8093a34240fc9
---

# Store Logs API

The Store Logs API allows merchants to track events in their store.  Each event creates an entry in the log. Merchants can send these entries into external systems to process events over time. For example, merchants can see how often they request shipping quotes from a carrier. They can also catch errors that occur on their store.

The store log tracks events from all storefront channels. Examples of events include sign-ups for newsletters and changes to an order status. Merchants can retrieve entries for 365 days after their timestamp. 

This guide shows you how to retrieve store logs with various filters. For more info, see the [Store Logs API reference](/api-reference/store-management/store-logs). 

## Get store logs

Send a request to the [Get system logs](/api-reference/store-management/store-logs/system-logs/get-system-logs) endpoint. The API returns 20 entries with the earliest timestamp. The entries are ordered from the earliest to latest timestamp.

### Filter by log ID

To filter the entries by log ID, pass a comma-separated list of log IDs to the `id:in` query parameter. 

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

The store log categorizes entries into various types. For example, requesting shipping quotes at checkout creates a `shipping` entry. You can filter entries by type. To do so, use the `type` query parameter. Below is an example of how to retrieve shipping entries:

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

For a list of log types, consult the [API endpoint reference](/api-reference/store-management/store-logs/system-logs/get-system-logs). 

You can see how often merchants request shipping quotes from a specific carrier. To do so, specify the carrier with the `module` query parameter. Below is an example of how to retrieve entries for quotes requests to Endicia:

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

Each log entry describes an event that has an associated outcome, which this API refers to as its `severity`. To filter the results by severity, use the `severity` query parameter and specify the severity's corresponding integer in the query. For a list of severity values, see the [Get system logs](/api-reference/store-management/store-logs/system-logs/get-system-logs) endpoint.

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

### Filter by paginated results   

To specify the page and number of entries returned per page, use the query parameters `page` and `limit`, respectively. The following example shows a response that starts at entry 4, as you request page 2 with 3 entries per page.  

<!--
type: tab
title: Request
-->

```http title="Example request: Filter by paginated results" lineNumbers
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/store/systemlogs?page=2&limit=2
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json
```

<!--
type: tab
title: Response
-->

```json title="Example response: Filter by paginated results" lineNumbers
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
- [Store Logs API reference](/api-reference/store-management/store-logs)
- [Store Logs support article](https://support.bigcommerce.com/s/article/Using-Store-Logs)
