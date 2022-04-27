# Data Solutions

This article introduces how to get web analytics using the Data Solutions API. Because each web analytic requires different fields in the request and/or response, this article is divided by web analytic.  

You can get **all** web analytics, get a **single** web analytic, or **update** a single analytic. To get or update a **single** web analytic, the `id` of the Web Analytic must be specified in the path.

| Web Analytic | Id |
| ------------- | -------- |
| Google Analytics | 1 |
| Visual Website Optimizer | 2 |
| Facebook Pixel | 3 |
| Segment | 4 |
| Site Verification Tags | 6 |
| Affiliate Conversion Tracking | 7 |

## Google Analytics

| Field | Type | Description |
| ------------- | -------- |  -------- |
| id | integer | Id of the Web Analytic. `1` for Google Analytics |
| channel_id | integer | Id of the storefront channel. Default is `0`. |
| name | string | Name of Web Analytic `Google Analytics` |
| enabled | boolean | Whether merchant has enabled Google Analytics in their store |
| version | integer | Type of connection field that merchant is using to connect to Google Analytics. Value of 1 corresponds to `tracking_code`. Value of 2 corresponds to `property_id`.|
| data_tag_enabled | boolean | |
| tracking_code | string | Code merchant uses to connect Google Analytics to store. Only returned if version is `1`. |
| property_id | string | Id merchant uses to connect Google Analytics to store. Only returned if version is `2`.  |

The version corresponds with the "Connect with Field" merchants use to connect to Google Analytics (`tracking_code` or `property_id`):

![Version on Google Analytics](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Version%20for%20Google%20Analytics.png)

### Get a Web Analytic
Send a `GET` request to `/stores/{{STORE_HASH}}/v3/settings/analytics{id}`. 

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
        "property_id": "UA-215662744-1"
    },
    "meta": {}
}
```

### Update a Web Analytic

Send a `PUT` request to `/stores/{{STORE_HASH}}/v3/settings/analytics{id}`. 
```JSON title="Sample Request" lineNumbers
PUT https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/settings/analytics{id}
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

{
    "data": {
        "id": 1,
        "channel_id": 0,
        "name": "Google Analytics",
        "enabled": true,
        "version": 2,
        "data_tag_enabled": true,
        "property_id": "UA-215662744-1"
    },
    "meta": {}
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
        "property_id": "UA-215662744-1"
    },
    "meta": {}
}
```

## Visual Website Optimizer

| Field | Type | Description |
| ------------- | -------- |  -------- |
| id | integer | Id of the Web Analytic. `1` for Google Analytics |
| channel_id | integer | Id of the storefront channel. Default is `0`. |
| name | string | Name of Web Analytic `Google Analytics` |
| enabled | boolean | Whether merchant has enabled Google Analytics in their store |
| vwo_smartcode | string | |

### Get a Web Analytic


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
        "vwo_smartcode": ""
    },
    "meta": {}
}
```

### Update a Web Analytic


```JSON title="Sample Request" lineNumbers
PUT https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/settings/analytics/{id}
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

{
    "data": {
        "id": 2,
        "channel_id": 0,
        "name": "Visual Website Optimizer",
        "enabled": false,
        "vwo_smartcode": "example"
    },
    "meta": {}
}
```
```JSON title="Sample Response" lineNumbers
{
    "data": {
        "id": 2,
        "channel_id": 0,
        "name": "Visual Website Optimizer",
        "enabled": false,
        "vwo_smartcode": "example"
    },
    "meta": {}
}
```


## Facebook Pixel

| Field | Type | Description |
| ------------- | -------- |  -------- |
| id | integer | Id of the Web Analytic. `1` for Google Analytics |
| channel_id | integer | Id of the storefront channel. Default is `0`. |
| name | string | Name of Web Analytic `Google Analytics` |
| enabled | boolean | Whether merchant has enabled Google Analytics in their store |
| pixel_id | string | |
| is_oauth_connected | boolean | |

### Get a Web Analytic

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
        "pixel_id": "1158961408242086",
        "is_oauth_connected": true
    },
    "meta": {}
}
```

### Update a Web Analytic


```JSON title="Sample Request" lineNumbers
PUT https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/settings/analytics/{id}
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

{
    "data": {
        "id": 3,
        "channel_id": 0,
        "name": "Facebook Pixel",
        "enabled": true,
        "pixel_id": "1158961408242086",
        "is_oauth_connected": true
    },
    "meta": {}
}

```

```JSON title="Sample Response" lineNumbers
{
    "data": {
        "id": 3,
        "channel_id": 0,
        "name": "Facebook Pixel",
        "enabled": true,
        "pixel_id": "1158961408242086",
        "is_oauth_connected": true
    },
    "meta": {}
}
```

## Segment

### Get a Web Analytic

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
        "api_key": "zyqsE73vEsJGDbYfXM6rKpM4vR4DuYd1",
        "data_tag_enabled": true
    },
    "meta": {}
}
```

### Update a Web Analytic

```JSON title="Sample Request" lineNumbers
PUT https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/settings/analytics/{id}
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

{
    "data": {
        "id": 4,
        "channel_id": 0,
        "name": "Segment.com",
        "enabled": false,
        "api_key": "zyqsE73vEsJGDbYfXM6rKpM4vR4DuYd1",
        "data_tag_enabled": true
    },
    "meta": {}
}

```

```JSON title="Sample Response" lineNumbers
{
    "data": {
        "id": 4,
        "channel_id": 0,
        "name": "Segment.com",
        "enabled": false,
        "api_key": "zyqsE73vEsJGDbYfXM6rKpM4vR4DuYd1",
        "data_tag_enabled": true
    },
    "meta": {}
}
```


## Site Verification Tags

### Get a Web Analytic

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
        "verification_tag": ""
    },
    "meta": {}
}
```

### Update a Web Analytic

```JSON title="Sample Request" lineNumbers
PUT https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/settings/analytics/{id}
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

{
    "data": {
        "id": 6,
        "channel_id": 0,
        "name": "Site Verification Tags",
        "enabled": false,
        "verification_tag": ""
    },
    "meta": {}
}

```

```JSON title="Sample Response" lineNumbers
{
    "data": {
        "id": 6,
        "channel_id": 0,
        "name": "Site Verification Tags",
        "enabled": false,
        "verification_tag": ""
    },
    "meta": {}
}
```

## Affiliate Conversion Tracking

### Get a Web Analytic

```JSON title="Sample Request" lineNumbers
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/settings/analytics/{id}
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json
```

```JSON title="Sample Response" lineNumbers
{
    "data": {
        "id": 7,
        "channel_id": 0,
        "name": "Affiliate Conversion Tracking",
        "enabled": false,
        "connection": ""
    },
    "meta": {}
}
```

### Update a Web Analytic

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
        "connection": ""
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
        "connection": ""
    },
    "meta": {}
}
```


## Get All Web Analytics

To get all web analytics, send a `GET` request to `/stores/{{STORE_HASH}}/v3/settings/analytics`. All six web analytics will be returned. As shown, fields for codes in which a merchant has not entered a value will return as an empty string.     

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
            "property_id": "UA-215662744-1"
        },
        {
            "id": 2,
            "channel_id": 0,
            "name": "Visual Website Optimizer",
            "enabled": false,
            "vwo_smartcode": ""
        },
        {
            "id": 3,
            "channel_id": 0,
            "name": "Facebook Pixel",
            "enabled": true,
            "pixel_id": "1158961408242086",
            "is_oauth_connected": true
        },
        {
            "id": 4,
            "channel_id": 0,
            "name": "Segment.com",
            "enabled": false,
            "api_key": "zyqsE73vEsJGDbYfXM6rKpM4vR4DuYd1",
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
            "connection": ""
        }
    ],
    "meta": {}
}
```
