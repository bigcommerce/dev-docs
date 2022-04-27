# Data Solutions

This article introduces how to get web analytics using the Data Solutions API. 

To get or update a single web analytic, the `id` of the Web Analytic must be specified in the path.

| Web Analytic | Id |
| ------------- | -------- |
| Google Analytics | 1 |
| Visual Website Optimizer | 2 |
| Facebook Pixel | 3 |
| Segment | 4 |
| Site Verification Tags | 6 |
| Affiliate Conversion Tracking | 7 |

### Get a Web Analytic
  send a `GET` request to `/stores/{{STORE_HASH}}/v3/settings/analytics{id}`. 



```JSON title="Sample Request" lineNumbers
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/settings/analytics{id}
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json
```
The 

```JSON title="Sample Response" lineNumbers

```

### Update a Web Analytic



## Get All Web Analytics

To get all web analytics, send a `GET` request to `/stores/{{STORE_HASH}}/v3/settings/analytics`. 

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
