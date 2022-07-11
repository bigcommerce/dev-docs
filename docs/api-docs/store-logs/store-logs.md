---
stoplight-id: 8093a34240fc9
---

# Store Logs API

The [store logs](https://support.bigcommerce.com/s/article/Using-Store-Logs) track events that take place in a store. Store logs have two components: **system logs** and **staff action logs**. 

The **Store Logs API** lets you retrieve a store's **system log**. The system log tracks events that take place on your storefront, including shipping quote requests, newsletter sign-ups, and more. Each of these events creates an entry in the system log that includes the event type, summary, reporter (module), severity, and a timestamp. You can retrieve entries for 365 days after their timestamp. 

This article guides API users on how to get system log entries and filter by attributes such as event type, severity, and more. 


## Get system logs

Send a request to the [Get system logs](/api-reference/store-management/store-logs/system-logs/get-system-logs) endpoint. 

### Get unfiltered entries

You can get entries that were created within the past 365 days. When you use no query parameters in your request, the API returns 20 entries with the earliest timestamp. The entries are ordered from the earliest to latest timestamp.

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
      "type": "shipping",
      "module": "FedEx Ground Home Delivery (5-7 Business Days) (flatrate)",
      "severity": "success",
      "summary": "Successfully retrieved shipping quote",
      "message": "{\"quoteId\":\"2470214433\",\"cacheInfo\":\"cached for 3600s\",\"customerGroup\":{\"id\":4,\"name\":\"Wholesale Customers\"},\"customerEmail\":\"customer@example.com\",\"customerId\":4,\"destination\":{\"streetAddress1\":\"123 Example Street\",\"streetAddress2\":\"\",\"city\":\"Austin\",\"postcode\":\"12345\",\"stateName\":\"Texas\",\"stateIso2\":\"TX\",\"countryIso2\":\"US\",\"addressType\":\"residential\"},\"items\":[{\"name\":\"example product (ABC-1234)\",\"id\":\"23\",\"quantity\":2,\"weight\":32,\"width\":4,\"height\":4,\"length\":4,\"attributes\":[],\"omittedReason\":\"\"}],\"groupedResults\":{\"flatrate\":{\"rates\":[{\"handling\":0,\"price\":3,\"description\":\"FedEx Ground Home Delivery (5-7 Business Days)\",\"additionalDescription\":\"\"}],\"carrierType\":\"flatrate\"}},\"settings\":[]}",
      "date_created": "2021-12-22T23:44:15+00:00"
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

To filter the entries by type, use the `type` query parameter. Examples of log type include `general`, `payment`, and `shipping`. For a complete list of log types, consult the [API endpoint reference](/api-reference/store-management/store-logs/system-logs/get-system-logs).  The following example requests `design`-type entries: 

<!--
type: tab
title: Request
-->

```http title="Example request: Filter by type" lineNumbers
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/store/systemlogs?type=design
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
      "id": 1,
      "type": "design",
      "module": "Theme Download",
      "severity": "success",
      "summary": "user@example.com Downloaded Cornerstone-6.2.0.zip, 2zs05d70-3fb3-113m-43t0-179242c3acd9",
      "message": "user@example.com Downloaded Cornerstone-6.2.0.zip, 2zs05d70-3fb3-113m-43t0-179242c3acd9",
      "date_created": "2021-12-16T19:10:26+00:00"
    },
    {
      "id": 6,
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
        "current": "?type=design&page=1&limit=50"
      }
    }
  }
}
```

<!-- type: tab-end -->


### Filter by module 

To filter the entries by `module`, use the `module` query parameter. Modules further categorize the type of log. For example, the log type `shipping` has many modules including `Zone based free shipping (freeshipping)` and `FedEx Ground Home Delivery (5-7 Business Days) (flatrate)`. Examples of modules for other log types include `export only`, `email message`, `theme download`, and more. The following example requests entries from the `order status` module: 
>>> DESCRIBE MORE ABOUT WHAT A MODULE IS. LINK TO SPEC FOR FURTHER LIST? IS THERE AN ENUM LIST IN THE SPEC?

<!--
type: tab
title: Request
-->

```http title="Example request: Filter by module" lineNumbers
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/store/systemlogs?module=order+status
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
      "id": 2,
      "type": "ordersettings",
      "module": "Order Status",
      "severity": "success",
      "summary": "Successfully customized order status",
      "message": "{\"id\":11,\"customLabelBefore\":\"Awaiting Shipment\",\"customLabelAfter\":\"Package ready to be picked up by Fed Ex\",\"userId\":4,\"userUid\":3172923,\"userEmail\":\"user@example.com\",\"userRole\":\"admin\"}",
      "date_created": "2021-12-18T04:46:40+00:00"
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
        "current": "?module=order+status&page=1&limit=50"
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
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/store/systemlogs?page=2&limit=3
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
      "id": 4,
      "type": "general",
      "module": "",
      "severity": "notices",
      "summary": "Restoring order 1234000002",
      "message": "Restoring order 1234000002",
      "date_created": "2021-12-19T19:15:56+00:00"
    },
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
      "id": 6,
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
      "total": 3,
      "count": 3,
      "per_page": 3,
      "current_page": 2,
      "total_pages": 1,
      "links": {
        "previous": "?page=1&limit=3",
        "current": "?page=2&limit=3"
      }
    }
  }
}
```

<!-- type: tab-end -->


## Resources
- [Store Logs API reference](/api-reference/store-management/store-logs)
- [Store Logs support article](https://support.bigcommerce.com/s/article/Using-Store-Logs)