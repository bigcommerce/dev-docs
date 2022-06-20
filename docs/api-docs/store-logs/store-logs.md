---
stoplight-id: 8093a34240fc9
---

# Store Logs API

The store log tracks events that take place in your store. The store log is comprised of the **system log** and the **staff action log**. 

The Store Logs V3 API lets you retrieve your store's **system log**. The **system log** tracks events that take place on your storefront, including shipping quote requests, newsletter sign-ups, and more. Each of those events creates an entry in the system log that includes the event type, summary, reporter (module), severity, and creation date and time. You can retrieve only entries that have occurred within the past 365 days. 

This article guides API users on how to get entries for a store's **system logs**. This article shows users how to filter the response for various aspects of the entry, including event type, date created, and more. 


## Get system logs

### Filter by log ID

<!--
type: tab
title: Request
-->

```json title="Example GET request with X-Auth-Token header" lineNumbers
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/store/systemlogs?id:in=5,7
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json
```

<!--
type: tab
title: Response
-->

```json title="Example GET response" lineNumbers
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

<!--
type: tab
title: Request
-->

```json title="Example GET request with X-Auth-Token header" lineNumbers
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/store/systemlogs?type=design
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json
```

<!--
type: tab
title: Response
-->

```json title="Example GET response" lineNumbers
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

<!--
type: tab
title: Request
-->

```json title="Example GET request with X-Auth-Token header" lineNumbers
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/store/systemlogs?module=order status
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json
```

<!--
type: tab
title: Response
-->

```json title="Example GET response" lineNumbers
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

<!--
type: tab
title: Request
-->

```json title="Example GET request with X-Auth-Token header" lineNumbers
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/store/systemlogs?severity=2
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json
```

<!--
type: tab
title: Response
-->

```json title="Example GET response" lineNumbers
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


### Filter by date created 

<!--
type: tab
title: Request
-->

```json title="Example GET request with X-Auth-Token header" lineNumbers
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/store/systemlogs
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json
```

<!--
type: tab
title: Response
-->

```json title="Example GET response" lineNumbers
```

<!-- type: tab-end -->


### Filter by page

<!--
type: tab
title: Request
-->

```json title="Example GET request with X-Auth-Token header" lineNumbers
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/store/systemlogs
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json
```

<!--
type: tab
title: Response
-->

```json title="Example GET response" lineNumbers
```

<!-- type: tab-end -->



### Filter number of entries returned   

<!--
type: tab
title: Request
-->

```json title="Example GET request with X-Auth-Token header" lineNumbers
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/store/systemlogs
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json
```

<!--
type: tab
title: Response
-->

```json title="Example GET response" lineNumbers
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
            "total": 2,
            "count": 2,
            "per_page": 2,
            "current_page": 1,
            "total_pages": 1,
            "links": {
                "current": "?limit=2&page=1"
            }
        }
    }
}
```

<!-- type: tab-end -->


## Resources