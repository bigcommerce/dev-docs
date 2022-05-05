# Data Solutions API

The Data Solutions API allows you to configure **storefront** channel settings for a store's prebuilt data analytic solutions.  

Note that a store has global settings for data solutions, from which any storefront channel can inherit. A merchant can override these global settings with storefront-specific settings for their data solutions. This API configures settings for **storefront** channels at the store's global level (`channel_id` is 0) and at the specific storefront channel level.   

This article introduces how to configure web analytics using the Data Solutions API. Because each web analytic requires different fields in the request and/or response, this article is divided by web analytic.

You can get **all** web analytics, get a **single** web analytic, or **update** a single analytic. To get or update a **single** web analytic, the `id` of the Web Analytic must be specified in the path.

| Web Analytic | Id |
| ------------- | -------- |
| Google Analytics | 1 |
| Visual Website Optimizer | 2 |
| Facebook Pixel | 3 |
| Segment | 4 |
| Site Verification Tags | 6 |
| Affiliate Conversion Tracking | 7 |

**Note**: Web Analytic id 5 is no longer in use.

## Google Analytics

| Field | Type | Description |
| ------------- | -------- |  -------- |
| id | integer | Id of the Web Analytic. `1` for Google Analytics |
| channel_id | integer | Id of the storefront channel. Default is `0`. |
| name | string | Name of Web Analytic `Google Analytics` |
| enabled | boolean | Whether merchant has [enabled Google Analytics](https://support.bigcommerce.com/s/article/Data-Solutions?language=en_US#web-analytics) in their store |
| version | integer | Corresponds to connection field that merchant is using to connect to Google Analytics. Value is `1` for `tracking_code` or `2` for `property_id`. |
| data_tag_enabled | boolean | |
| tracking_code | string | Code merchant uses to connect Google Analytics to store. Only returned if version is `1`. |
| property_id | string | Id merchant uses to connect Google Analytics to store. Only returned if version is `2`.  |

The version corresponds with the "Connect with Field" that a merchant is using to connect to Google Analytics. This connection field affects the fields that are requested and returned in [Get the Google Analytic](#get-the-google-analytic) and [Update the Google Analytic](#update-the-google-analytic).
![Version on Google Analytics](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Version%20for%20Google%20Analytics.png).


### Get the Google Analytic

When a merchant uses `tracking_code` for the connection field, your response will have a version of `1` as well as the `tracking_code` field. If a merchant has not entered a tracking code, `tracking_code` will return as an empty string.

```JSON title="Sample Request" lineNumbers
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/settings/analytics/{id}
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json
```

```JSON title="Sample Response" lineNumbers
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

When a merchant uses `property_id` for the connection field, your response will have a version of `2` as well as the `property_id` field. If a merchant has not entered a property ID, `property_id` will return as an empty string.

```JSON title="Sample Request" lineNumbers
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/settings/analytics/{id}
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json
```

```JSON title="Sample Response" lineNumbers
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
### Update the Google Analytic

```JSON title="Sample Request" lineNumbers
PUT https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/settings/analytics{id}
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

```JSON title="Sample Response" lineNumbers
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
&nbsp;

## Visual Website Optimizer

| Field | Type | Description |
| ------------- | -------- |  -------- |
| id | integer | Id of the Web Analytic. `2` for Visual Website Optimizer |
| channel_id | integer | Id of the storefront channel. Default is `0`. |
| name | string | Name of Web Analytic `Visual Website Optimizer` |
| enabled | boolean | Whether merchant has [enabled Visual Website Optimizer](https://support.bigcommerce.com/s/article/Data-Solutions?language=en_US#web-analytics) in their store |
| vwo_smartcode | string | | 

### Get the Visual Website Optimizer Analytic

If a merchant has not entered a VWO Smartcode, `vwo_smartcode` will return as an empty string.

```JSON title="Sample Request" lineNumbers
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/settings/analytics/{id}
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json
```

```JSON title="Sample Response" lineNumbers
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

### Update the Visual Website Optimizer Analytic


```JSON title="Sample Request" lineNumbers
PUT https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/settings/analytics/{id}
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
```JSON title="Sample Response" lineNumbers
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
&nbsp;

## Facebook Pixel

| Field | Type | Description |
| ------------- | -------- |  -------- |
| id | integer | Id of the Web Analytic. `1` for Facebook Pixel |
| channel_id | integer | Id of the storefront channel. Default is `0`. |
| name | string | Name of Web Analytic `Facebook Pixel` |
| enabled | boolean | Whether merchant has [enabled Facebook Pixel](https://support.bigcommerce.com/s/article/Data-Solutions?language=en_US#web-analytics) in their store |
| pixel_id | string | |
| is_oauth_connected | boolean | |

### Get the Facebook Pixel Analytic

If a merchant has not entered a Pixel ID, `pixel_id` will return as an empty string.

```JSON title="Sample Request" lineNumbers
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/settings/analytics/{id}
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json
```

```JSON title="Sample Response" lineNumbers
{
    "data": {
        "id": 3,
        "channel_id": 0,
        "name": "Facebook Pixel",
        "enabled": true,
        "pixel_id": "FP-1234567890",
        "is_oauth_connected": true
    },
    "meta": {}
}
```

### Update the Facebook Pixel Analytic


```JSON title="Sample Request" lineNumbers
PUT https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/settings/analytics/{id}
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

{
  "id": 3,
  "channel_id": 0,
  "name": "Facebook Pixel",
  "enabled": true,
  "pixel_id": "FP-1234567890",
  "is_oauth_connected": true
}

```

```JSON title="Sample Response" lineNumbers
{
    "data": {
        "id": 3,
        "channel_id": 0,
        "name": "Facebook Pixel",
        "enabled": true,
        "pixel_id": "FP-1234567890",
        "is_oauth_connected": true
    },
    "meta": {}
}
```
&nbsp;

## Segment

| Field | Type | Description |
| ------------- | -------- |  -------- |
| id | integer | Id of the Web Analytic. `1` for Segment |
| channel_id | integer | Id of the storefront channel. Default is `0`. |
| name | string | Name of Web Analytic `Segment` |
| enabled | boolean | Whether merchant has [enabled Segment](https://support.bigcommerce.com/s/article/Data-Solutions?language=en_US#web-analytics) in their store |
| api_key | string | |
| data_tag_enabled | boolean | |

### Get the Segment Analytic

If a merchant has not entered an API Key, `api_key` will return as an empty string.

```JSON title="Sample Request" lineNumbers
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/settings/analytics/{id}
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json
```

```JSON title="Sample Response" lineNumbers
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

### Update the Segment Analytic

```JSON title="Sample Request" lineNumbers
PUT https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/settings/analytics/{id}
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

```JSON title="Sample Response" lineNumbers
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
&nbsp;

## Site Verification Tags

| Field | Type | Description |
| ------------- | -------- |  -------- |
| id | integer | Id of the Web Analytic. `1` for Site Verification Tags |
| channel_id | integer | Id of the storefront channel. Default is `0`. |
| name | string | Name of Web Analytic `Site Verification Tags` |
| enabled | boolean | Whether merchant has [enabled Site Verification Tags](https://support.bigcommerce.com/s/article/Data-Solutions?language=en_US#web-analytics) in their store |
| verification_tag | string | |

### Get the Site Verification Tags Analytic

If a merchant has not entered a verification tag, `verification_tag` will return as an empty string.

```JSON title="Sample Request" lineNumbers
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/settings/analytics/{id}
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json
```

```JSON title="Sample Response" lineNumbers
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

### Update the Site Verification Tags Analytic

```JSON title="Sample Request" lineNumbers
PUT https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/settings/analytics/{id}
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

```JSON title="Sample Response" lineNumbers
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

&nbsp;

## Affiliate Conversion Tracking

| Field | Type | Description |
| ------------- | -------- |  -------- |
| id | integer | Id of the Web Analytic. `1` for Affiliate Conversion Tracking |
| channel_id | integer | Id of the storefront channel. Default is `0`. |
| name | string | Name of Web Analytic `Affiliate Conversion Tracking` |
| enabled | boolean | Whether merchant has [enabled Affiliate Conversion Tracking](https://support.bigcommerce.com/s/article/Data-Solutions?language=en_US#web-analytics) in their store |
| connection | string | Affiliate Conversion Tracking Code |

### Get the Affiliate Conversion Tracking Analytic

If a merchant has not entered an Affiliate Conversion Tracking Code, `connection` will return as an empty string.

```JSON title="Sample Request" lineNumbers
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/settings/analytics/{id}
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json
```

```JSON title="Sample Response" lineNumbers
{
  "id": 7,
  "channel_id": 0,
  "name": "Affiliate Conversion Tracking",
  "enabled": false,
  "connection": "<script>js code here...</script>"
}
```

### Update the Affiliate Conversion Tracking Analytic

```JSON title="Sample Request" lineNumbers
PUT https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/settings/analytics/{id}
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

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

```JSON title="Sample Response" lineNumbers
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

&nbsp;

## Get All Web Analytics

All six web analytics will be returned. As shown, fields for codes (e.g. `verification_tag`) in which a merchant has not entered a value will return as an empty string.     

```JSON title="Sample Request" lineNumbers
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/settings/analytics
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json
```

```JSON title="Sample Response" lineNumbers
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
            "pixel_id": "FP-1234567890",
            "is_oauth_connected": true
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
    ],
    "meta": {}
}
```

&nbsp;

## Related Resources
- [Overview Web Analytics](https://support.bigcommerce.com/s/article/Data-Solutions?language=en_US#web-analytics)
- [Google Analytics](https://support.bigcommerce.com/s/article/Setting-Up-Google-Analytics?language=en_US)
- [Visual Website Optimizer](...)
- [Facebook Pixel](https://support.bigcommerce.com/s/article/Facebook-Pixel?language=en_US)
- [Segment](https://support.bigcommerce.com/s/article/Setting-up-Segment-com?language=en_US)
- [Site Verification Tags](...)
- [Affiliate Conversion Tracking](https://support.bigcommerce.com/s/article/Passing-Order-Data-to-Affiliate-Programs?language=en_US)


