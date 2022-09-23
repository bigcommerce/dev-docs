# Data Solutions

The Settings API lets you set **storefront** channel settings for a store's prebuilt data solutions. These settings help merchants connect web analytics to a store. A store has global settings for each web analytic, from which any storefront channel can inherit. You can override these global settings with storefront-specific settings. 

You can get all web analytics, get a single web analytic, or update a single analytic. To get or update a single web analytic, the `id` of the web analytic must be specified in the path.

| Web analytic | ID |
| ------------- | -------- |
| Google Analytics | 1 |
| Visual Website Optimizer | 2 |
| Facebook Pixel | 3 |
| Segment | 4 |
| Site Verification Tags | 6 |
| Affiliate Conversion Tracking | 7 |
| Google Analytics 4 | 8 |

<!-- theme: info -->
> #### Note
> - You can obtain storefront channel IDs using the [Get all channels](/api-reference/store-management/channels/channels/listchannels) endpoint. 
> - To get or update settings for specific storefronts, specify the `channel_id` in the query. If you do not specify a channel ID in the query, the request defaults to the global settings for a store whose `channel_id` is 0. 
> - If you query a storefront channel, the response returns global (not storefront) settings if the channel inherits global settings. The `channel_id` in the response will be that of the default global channel (`0`).   
> - Web analytic ID 5 is no longer in use.

This article shows you how to manage web analytics using the Settings API. For more, see the [Settings API Reference](/api-reference/store-management/settings).


## Google Analytics

A merchant can use a tracking code or property ID to connect Google Analytics to a store. This affects the fields that are requested and returned in [Get the Google Analytic](#get-the-google-analytic) and [Update the Google Analytic](#update-the-google-analytic) endpoints.
![Version on Google Analytics](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Version%20for%20Google%20Analytics.png).


### Get the Google Analytic

To get a Google Analytic, send a request to the [Get a web analytic](/api-reference/store-management/settings/analytics/get-web-analytic) endpoint and specify the `id` of Google Analytics in the path.

When a merchant uses a tracking code, your response will have a version of `1` in the `tracking_code` field. If a merchant has not entered a tracking code, `tracking_code` will return as an empty string.

<!--
type: tab
title: Request
-->

```http title="Example request: Get the Google Analytic" lineNumbers
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/settings/data-solutions/web-analytics/{id}
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json
```

<!--
type: tab
title: Response
-->

```json title="Example response: Get the Google Analytic" lineNumbers
{
  "data": {
    "id": 1,
    "channel_id": 0,
    "name": "Google Analytics",
    "enabled": true,
    "version": 1,
    "data_tag_enabled": true,
    "tracking_code": "GA-1234567890"
  },
  "meta": {}
}
```

<!-- type: tab-end -->

When a merchant uses a property ID, your response will have a version of `2` in the `property_id` field. If a merchant has not entered a property ID, `property_id` will return as an empty string.

<!--
type: tab
title: Request
-->

```http title="Example request: Get the Google Analytic" lineNumbers
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/settings/analytics/{id}
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json
```

<!--
type: tab
title: Response
-->

```json title="Example response: Get the Google Analytic" lineNumbers
{
  "data": {
    "id": 1,
    "channel_id": 0,
    "name": "Google Analytics",
    "enabled": true,
    "version": 2,
    "data_tag_enabled": true,
    "property_id": "GA-1234567890"
  },
  "meta": {}
}
```

<!-- type: tab-end -->

### Update the Google Analytic

To update a Google Analytic, send a request to the [Update a web analytic](/api-reference/store-management/settings/analytics/update-web-analytic) endpoint and specify the `id` of Google Analytics in the path.

<!--
type: tab
title: Request
-->

```http title="Example request: Update the Google Analytic" lineNumbers
PUT https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/settings/data-solutions/web-analytics/{id}
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

{
  "id": 1,
  "channel_id": 0,
  "name": "Google Analytics",
  "enabled": true,
  "version": 2,
  "data_tag_enabled": true,
  "property_id": "GA-1234567890"
}
```

<!--
type: tab
title: Response
-->

```json title="Example response: Update the Google Analytic" lineNumbers
{
  "data": {
    "id": 1,
    "channel_id": 0,
    "name": "Google Analytics",
    "enabled": true,
    "version": 2,
    "data_tag_enabled": true,
    "property_id": "GA-1234567890"
  },
  "meta": {}
}
```
<!-- type: tab-end -->

&nbsp;

## Visual Website Optimizer

### Get the Visual Website Optimizer Analytic

To get a Visual Website Optimizer Analytic, send a request to the [Get a web analytic](/api-reference/store-management/settings/analytics/get-web-analytic) endpoint and specify the `id` of Visual Website Optimizer in the path. If a merchant has not entered a VWO Smartcode, `vwo_smartcode` will return as an empty string.

<!--
type: tab
title: Request
-->

```http title="Example request: Get the Visual Website Optimizer Analytic" lineNumbers
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/settings/data-solutions/web-analytics/{id}
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json
```

<!--
type: tab
title: Response
-->

```json title="Example response: Get the Visual Website Optimizer Analytic" lineNumbers
{
  "data": {
    "id": 2,
    "channel_id": 0,
    "name": "Visual Website Optimizer",
    "enabled": false,
    "vwo_smartcode": "VWO-1234567890"
  },
  "meta": {}
}
```
<!-- type: tab-end -->

### Update the Visual Website Optimizer Analytic

To update a Visual Website Optimizer Analytic, send a request to the [Update a web analytic](/api-reference/store-management/settings/analytics/update-web-analytic) endpoint and specify the `id` of Visual Website Optimizer in the path.

<!--
type: tab
title: Request
-->

```http title="Example request: Update the Visual Website Optimizer Analytic" lineNumbers
PUT https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/settings/data-solutions/web-analytics/{id}
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

{
  "id": 2,
  "channel_id": 0,
  "name": "Visual Website Optimizer",
  "enabled": false,
  "vwo_smartcode": "VWO-1234567890"
}
```

<!--
type: tab
title: Response
-->

```json title="Example response: Update the Visual Website Optimizer Analytic" lineNumbers
{
  "data": {
    "id": 2,
    "channel_id": 0,
    "name": "Visual Website Optimizer",
    "enabled": false,
    "vwo_smartcode": "VWO-1234567890"
  },
  "meta": {}
}
```
<!-- type: tab-end -->

&nbsp;

## Facebook Pixel

### Get the Facebook Pixel Analytic

To get a Facebook Pixel Analytic, send a request to the [Get a web analytic](/api-reference/store-management/settings/analytics/get-web-analytic) endpoint and specify the `id` of Facebook Pixel in the path. If a merchant has not entered a Pixel ID, `pixel_id` will return as an empty string.

<!--
type: tab
title: Request
-->

```http title="Example request: Get the Facebook Pixel Analytic" lineNumbers
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/settings/data-solutions/web-analytics/{id}
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json
```
<!--
type: tab
title: Response
-->

```json title="Example response: Get the Facebook Pixel Analytic" lineNumbers
{
  "data": {
    "id": 3,
    "channel_id": 0,
    "name": "Facebook Pixel",
    "enabled": true,
    "pixel_id": "FP-1234567890"
  },
  "meta": {}
}
```
<!-- type: tab-end -->

### Update the Facebook Pixel Analytic

To update a Facebook Pixel Analytic, send a request to the [Update a web analytic](/api-reference/store-management/settings/analytics/update-web-analytic) endpoint and specify the `id` of Facebook Pixel in the path. 

<!--
type: tab
title: Request
-->

```http title="Example request: Update the Facebook Pixel Analytic" lineNumbers
PUT https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/settings/data-solutions/web-analytics/{id}
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

{
  "id": 3,
  "channel_id": 0,
  "name": "Facebook Pixel",
  "enabled": true,
  "pixel_id": "FP-1234567890"
}

```
<!--
type: tab
title: Response
-->

```json title="Example response: Update the Facebook Pixel Analytic" lineNumbers
{
  "data": {
    "id": 3,
    "channel_id": 0,
    "name": "Facebook Pixel",
    "enabled": true,
    "pixel_id": "FP-1234567890"
  },
  "meta": {}
}
```
<!-- type: tab-end -->

&nbsp;

## Segment

### Get the Segment Analytic

To get a Segment Analytic, send a request to the [Get a web analytic](/api-reference/store-management/settings/analytics/get-web-analytic) endpoint and specify the `id` of Segment in the path. If a merchant has not entered an API Key, `api_key` will return as an empty string.

<!--
type: tab
title: Request
-->

```http title="Example request: Get the Segment Analytic" lineNumbers
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/settings/data-solutions/web-analytics/{id}
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json
```

<!--
type: tab
title: Response
-->

```json title="Example response: Get the Segment Analytic" lineNumbers
{
  "data": {
    "id": 4,
    "channel_id": 0,
    "name": "Segment.com",
    "enabled": false,
    "api_key": "SEG-1234567890",
    "data_tag_enabled": true
  },
  "meta": {}
}
```
<!-- type: tab-end -->

### Update the Segment Analytic

To update a Segment Analytic, send a request to the [Update a web analytic](/api-reference/store-management/settings/analytics/update-web-analytic) endpoint and specify the `id` of Segment in the path.

<!--
type: tab
title: Request
-->

```http title="Example request: Update the Segment Analytic" lineNumbers
PUT https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/settings/data-solutions/web-analytics/{id}
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

{
  "id": 4,
  "channel_id": 0,
  "name": "Segment.com",
  "enabled": false,
  "api_key": "SEG-1234567890",
  "data_tag_enabled": true
}

```

<!--
type: tab
title: Response
-->

```json title="Example response: Update the Segment Analytic" lineNumbers
{
  "data": {
    "id": 4,
    "channel_id": 0,
    "name": "Segment.com",
    "enabled": false,
    "api_key": "SEG-1234567890",
    "data_tag_enabled": true
  },
  "meta": {}
}
```
<!-- type: tab-end -->

&nbsp;

## Site Verification Tags

### Get the Site Verification Tags Analytic

To get a Site Verification Tags Analytic, send a request to the [Get a web analytic](/api-reference/store-management/settings/analytics/get-web-analytic) endpoint and specify the `id` of Site Verification Tags in the path. If a merchant has not entered a verification tag, `verification_tag` will return as an empty string.

<!--
type: tab
title: Request
-->

```http title="Example request: Get the Site Verification Tags Analytic" lineNumbers
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/settings/data-solutions/web-analytics/{id}
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json
```

<!--
type: tab
title: Response
-->

```json title="Example response: Get the Site Verification Tags Analytic" lineNumbers
{
  "data": {
    "id": 6,
    "channel_id": 0,
    "name": "Site Verification Tags",
    "enabled": false,
    "verification_tag": "<meta name=\"google-site-verification\" content=\"twLOPnFqwX5JK2-RksTZp_QEkfUPPgfGJ0_UHrEKLcY\" />"
  },
  "meta": {}
}
```

<!-- type: tab-end -->

### Update the Site Verification Tags Analytic

To update a Site Verification Tags Analytic, send a request to the [Update a web analytic](/api-reference/store-management/settings/analytics/update-web-analytic) endpoint and specify the `id` of Site Verification Tags in the path. 

<!--
type: tab
title: Request
-->

```http title="Example request: Update the Site Verification Tags Analytic" lineNumbers
PUT https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/settings/data-solutions/web-analytics/{id}
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

{
  "id": 6,
  "channel_id": 0,
  "name": "Site Verification Tags",
  "enabled": false,
  "verification_tag": "<meta name=\"google-site-verification\" content=\"twLOPnFqwX5JK2-RksTZp_QEkfUPPgfGJ0_UHrEKLcY\" />"
}

```

<!--
type: tab
title: Response
-->

```json title="Example response: Update the Site Verification Tags Analytic" lineNumbers
{
  "data": {
    "id": 6,
    "channel_id": 0,
    "name": "Site Verification Tags",
    "enabled": false,
    "verification_tag": "<meta name=\"google-site-verification\" content=\"twLOPnFqwX5JK2-RksTZp_QEkfUPPgfGJ0_UHrEKLcY\" />"
},
  "meta": {}
}
```
<!-- type: tab-end -->

&nbsp;

## Affiliate Conversion Tracking

### Get the Affiliate Conversion Tracking Analytic

To get a Affiliate Conversion Tracking Analytic, send a request to the [Get a web analytic](/api-reference/store-management/settings/analytics/get-web-analytic) endpoint and specify the `id` of Affiliate Conversion Tracking in the path. If a merchant has not entered an Affiliate Conversion Tracking Code, `connection` will return as an empty string.

<!--
type: tab
title: Request
-->

```http title="Example request: Get the Affiliate Conversion Tracking Analytic" lineNumbers
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/settings/data-solutions/web-analytics/{id}
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json
```

<!--
type: tab
title: Response
-->

```json title="Example response: Get the Affiliate Conversion Tracking Analytic" lineNumbers
{
  "data": {
    "id": 7,
    "channel_id": 0,
    "name": "Affiliate Conversion Tracking",
    "enabled": false,
    "connection": "<script>js code here...</script>"
  },
  "meta": {}
}
```

<!-- type: tab-end -->

### Update the Affiliate Conversion Tracking Analytic

To update a Affiliate Conversion Tracking Analytic, send a request to the [Update a web analytic](/api-reference/store-management/settings/analytics/update-web-analytic) endpoint and specify the `id` of Affiliate Conversion Tracking in the path. 

<!--
type: tab
title: Request
-->

```http title="Example request: Update the Affiliate Conversion Tracking Analytic" lineNumbers
PUT https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/settings/data-solutions/web-analytics/{id}
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json


{
  "id": 7,
  "channel_id": 0,
  "name": "Affiliate Conversion Tracking",
  "enabled": false,
  "connection": "<script>js code here...</script>"
}
```

<!--
type: tab
title: Response
-->

```json title="Example response: Update the Affiliate Conversion Tracking Analytic" lineNumbers
{
  "data": {
    "id": 7,
    "channel_id": 0,
    "name": "Affiliate Conversion Tracking",
    "enabled": false,
    "connection": "<script>js code here...</script>"
  },
  "meta": {}
}
```

<!-- type: tab-end -->

&nbsp;

## Google Analytic 4 

### Get the Google Analytic 4 Analytic

To get a Google Analytic 4, send a request to the [Get a web analytic](/api-reference/store-management/settings/analytics/get-web-analytic) endpoint and specify the `id` of Google Analytic 4 in the path. If a merchant has not entered a measurement ID, `measurement_id` will return as an empty string.

<!--
type: tab
title: Request
-->

```http title="Example request: Get the Google Analytic 4 Analytic" lineNumbers
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/settings/data-solutions/web-analytics/{id}
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json
```

<!--
type: tab
title: Response
-->

```json title="Example response: Get the Google Analytic 4 Analytic" lineNumbers
{
  "data": {
    "id": 8,
    "channel_id": 0,
    "name": "Google Analytics 4",
    "enabled": false,
    "measurement_id": "G-0123456789",
    "data_tag_enabled": false
  },
  "meta": {}
}
```

<!-- type: tab-end -->

### Update the Google Analytic 4 Analytic

To update a Google Analytic 4, send a request to the [Update a web analytic](/api-reference/store-management/settings/analytics/update-web-analytic) endpoint and specify the `id` of Google Analytic 4 in the path. 

<!--
type: tab
title: Request
-->

```http title="Example request: Update the Google Analytic 4 Analytic" lineNumbers
PUT https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/settings/data-solutions/web-analytics/{id}
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

{
  "id": 8,
  "channel_id": 0,
  "name": "Google Analytics 4",
  "enabled": true,
  "measurement_id": "G-9876543210",
  "data_tag_enabled": true
}

```

<!--
type: tab
title: Response
-->

```json title="Example response: Update the Google Analytic 4 Analytic" lineNumbers
{
  "data": {
    "id": 8,
    "channel_id": 0,
    "name": "Google Analytics 4",
    "enabled": true,
    "measurement_id": "G-9876543210",
    "data_tag_enabled": true
  },
  "meta": {}
}
```

<!-- type: tab-end -->


## Get all web analytics

To get all analytics, send a request to the [Get all web analytics](/api-reference/store-management/settings/analytics/get-all-web-analytics) endpoint.

<!--
type: tab
title: Request
-->

```http title="Example request: Get all web analytics" lineNumbers
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/settings/data-solutions/web-analytics
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json
```

<!--
type: tab
title: Response
-->

```json title="Example response: Get all web analytics" lineNumbers
{
  "data": [
    {
      "id": 1,
      "channel_id": 0,
      "name": "Google Analytics",
      "enabled": true,
      "version": 2,
      "data_tag_enabled": true,
      "property_id": "GA-1234567890"
    },
    {
      "id": 2,
      "channel_id": 0,
      "name": "Visual Website Optimizer",
      "enabled": false,
      "vwo_smartcode": "VWO-1234567890"
    },
    {
      "id": 3,
      "channel_id": 0,
      "name": "Facebook Pixel",
      "enabled": true,
      "pixel_id": "FP-1234567890"
    },
    {
      "id": 4,
      "channel_id": 0,
      "name": "Segment.com",
      "enabled": false,
      "api_key": "SEG-1234567890",
      "data_tag_enabled": true
    },
    {
      "id": 6,
      "channel_id": 0,
      "name": "Site Verification Tags",
      "enabled": false,
      "verification_tag": ""
    },
    {
      "id": 7,
      "channel_id": 0,
      "name": "Affiliate Conversion Tracking",
      "enabled": false,
      "connection": "<script>js code here...</script>"
    }
    {
      "id": 8,
      "channel_id": 0,
      "name": "Google Analytics 4",
      "enabled": true,
      "measurement_id": "G-9876543210",
      "data_tag_enabled": true
    }
  ],
  "meta": {}
}
```
<!-- type: tab-end -->

&nbsp;

## Resources
- [Settings API Reference](/api-reference/store-management/settings)
- [Web Analytics Overview](https://support.bigcommerce.com/s/article/Data-Solutions?language=en_US#web-analytics)

### Web Analytics reference
- [Get all web analytics](/api-reference/store-management/settings/analytics/get-all-web-analytics)
- [Get a web analytic](/api-reference/store-management/settings/analytics/get-web-analytic)
- [Update a web analytic](/api-reference/store-management/settings/analytics/update-web-analytic)


