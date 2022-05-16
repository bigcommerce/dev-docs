# Tax Properties for Products

Tax properties are ... They allow you merchants to receive more accurate tax calculations for a shopper's cart by factoring in ...  

The tax properties feature will allow you to:
-Add tax properties to **products**. Unlike tax codes, you can add **multiple** tax properties to a single product
-Add tax property fields that vary between tax providers (have **variable** inputs to tax calculations)      


## Tax Properties



### Create Tax Properties

<!--
type: tab
title: Request
-->

```JSON title="Example POST request with X-Auth-Token header 
POST https://api.bigcommerce.com/stores/{{STORE-HASH}}/v3/tax/properties
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

[
    {
      "code": "A-123456789",
      "display_name": "Example Tax Property 1",
      "description": "Food Industry"
    },
    {
      "code": "B-123456789",
      "display_name": "Example Tax Property 2",
      "description": "Clothing Industry"
    }  
  ]
```

<!--
type: tab
title: Response
-->

```JSON title="Example POST response 
{
    "data": [
        {
            "id": 1,
            "code": "A-123456789",
            "display_name": "Example Tax Property 1",
            "description": "Food Industry",
            "created_at": 1652474631,
            "updated_at": 1652474631
        },
        {
            "id": 2,
            "code": "B-123456789",
            "display_name": "Example Tax Property 2",
            "description": "Clothing Industry",
            "created_at": 1652474631,
            "updated_at": 1652474631
        }
    ],
    "meta": {}
}
```

<!-- type: tab-end -->

### Update Tax Properties

<!--
type: tab
title: Request
-->

```JSON title="Example PUT request with X-Auth-Token header 
PUT https://api.bigcommerce.com/stores/{{STORE-HASH}}/v3/tax/properties
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

[
    {
      "id": 1,
      "code": "A-123456789",
      "display_name": "Example Tax Property 1",
      "description": "Automobile Industry"
    }  
  ]
```

<!--
type: tab
title: Response
-->

```JSON title="Example PUT response 
{
    "data": [
        {
            "id": 1,
            "code": "A-123456789",
            "display_name": "Example Tax Property 1",
            "description": "Automobile Industry",
            "created_at": 1652474631,
            "updated_at": 1652476111
        }
    ],
    "meta": {}
}
```

<!-- type: tab-end -->

### Get Tax Properties

<!--
type: tab
title: Request
-->

```JSON title="Example GET request with X-Auth-Token header 
GET https://api.bigcommerce.com/stores/{{STORE-HASH}}/v3/tax/properties
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json
```

<!--
type: tab
title: Response
-->

```JSON title="Example GET response 
{
    "data": [
        {
            "id": 3,
            "code": "A-123456789",
            "display_name": "Example Tax Property 1",
            "description": "Automobile Industry",
            "created_at": 1652474631,
            "updated_at": 1652476111
        },
        {
            "id": 4,
            "code": "B-123456789",
            "display_name": "Example Tax Property 2",
            "description": "Clothing Industry",
            "created_at": 1652474631,
            "updated_at": 1652476372
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
                "current": "?page=1&limit=50"
            }
        }
    }
}
```

<!-- type: tab-end -->

### Delete Tax Properties

<!--
type: tab
title: Request
-->

```JSON title="Example DELETE request with X-Auth-Token header 
DELETE https://api.bigcommerce.com/stores/{{STORE-HASH}}/v3/tax/properties?id:in=1
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json
```

<!--
type: tab
title: Response
-->

```JSON title="Example DELETE response 
No Response
```

<!-- type: tab-end -->



## Product Tax Properties 

Tax properties can be added to products (i.e. Product Tax Property).

### Update Product with Tax Properties

<!--
type: tab
title: Request
-->

```JSON title="Example POST request with X-Auth-Token header 
POST https://api.bigcommerce.com/stores/{{STORE-HASH}}/v3/tax/properties
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json


```

<!--
type: tab
title: Response
-->

```JSON title="Example POST response 

```

<!-- type: tab-end -->


<!-- theme:info -->
> #### Note:
> Product Tax Properties are sent to the Tax Provider via the Tax Provider API. To see this in action, see [Estimate Taxes](...). 


### Get Product Tax Properties 

<!--
type: tab
title: Request
-->

```JSON title="Example GET request with X-Auth-Token header 
GET https://api.bigcommerce.com/stores/{{STORE-HASH}}/v3/tax/properties
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json


```

<!--
type: tab
title: Response
-->

```JSON title="Example GET response 

```

<!-- type: tab-end -->

### Delete Product Tax Properties

<!--
type: tab
title: Request
-->

```JSON title="Example DELETE request with X-Auth-Token header 
DELETE https://api.bigcommerce.com/stores/{{STORE-HASH}}/v3/tax/properties
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json


```

<!--
type: tab
title: Response
-->

```JSON title="Example DELETE response 

```

<!-- type: tab-end -->

## Related Resources 