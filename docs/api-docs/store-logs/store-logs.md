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


### Filter by type 

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


### Filter by module 

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


### Filter by severity 

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
```

<!-- type: tab-end -->


## Resources