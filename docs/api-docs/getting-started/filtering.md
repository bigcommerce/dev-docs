<h1>Filtering</h1>

<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
		<li><a href="#filtering-includes">Includes</a></li>
		<li><a href="#filtering-including_excluding_fields">Including and Excluding Fields</a></li>
		<li><a href="#filtering-pagination-limit">Pagination and Limit</a></li>
	</ul>
</div>

To filter collections down to a particular set of items, you can add filters to your request as URL query parameters.

250 products is the maximum number of products that be returned. To view more than that, a script is needed to loop through each page.

These are the most common filter options available for the V3 API: 

| Operator | Expression  | Example | 
|--|--|--|
| Equals/equivalency | attribute=value  | `/v3/catalog/products?price=10` `/v3/catalog/products?name=My Product` |
| Greater than or equal to (for numbers or dates) | attribute:min=value  | `/v3/catalog/products?price:min=10` |
| Less than or equal to (for numbers or dates) | attribute:max=value | `/v3/catalog/products?price:max=10` |
| Greater than (for numbers or dates)| attribute:greater=value | `/v3/catalog/products?price:greater=10` |
| Less than (for numbers or dates) | attribute:less=value | `/v3/catalog/products?price:less=10` |
| SQL LIKE operator (for strings) | attribute:like=pattern | `/v3/catalog/categories?name:like=Shirts` |
| SQL IN operator (for arrays) | attribute:in=csv,list,of,values | `/v3/catalog/products?categories:in=123,456` |
| SQL NOT IN operator (for arrays) | attribute:not_in=csv,list,of,values | `/v3/catalog/products?categories:not_in=123,456` |

Available filters vary by endpoint. Refer to the GET method for an endpoint to see a list of available filters.

---

## Includes

Some endpoints allow an `?include` parameter to include subresources and other information in the primary GET response for a parent object.

This allows you to save API calls by getting more information in a response. However, it may slow down your response.

As an example, you can include a product's variants and images with the product response: `/v3/catalog/products?include=variants,images`

Availability of the `?include` parameter varies by endpoint. Refer to the GET method for an endpoint to see a list of fields that can be included.


---

### Including and Excluding Fields

Some endpoints support both `?include_fields` and `?exclude_fields`. 

`include_fields` will return ONLY the specified fields in the response. `exclude_fields` will omit the specified fields from the response.

You can specify any field that is available on the object. Excluding fields you don't care about (especially large fields like descriptions) can speed up your API request response time.



**Example Response Get Product Name and Price**  
Here, product name and price have been included:

`https://api.bigcommerce.com/stores/{{store_hash}}/v3/catalog/products?include_fields=name,price`



<!--
title: "Product Name and Price"
subtitle: ""
lineNumbers: true
-->

```json
{
    "data": [
        {
            "id": 77,
            "name": "Red printed scarf",
            "price": 12
        }    
    ]
} 
```

---

## Pagination and Limit

`?page` is the number of pages that are returned via api.

`?limit` is the number of results per page that are returned.

`page=2&limit=10`
This will return page 2 of the results with 10 items per page.

