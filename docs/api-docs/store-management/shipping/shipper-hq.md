# ShipperHQ Metafields
<div class="otp" id="no-index">
	<h3> On this page </h3>
	<ul>
        <li><a href="#shipper-hq-object-properties">ShipperHQ object properties</a></li>
        <li><a href="#control-panel-behavior">Control panel behavior</a></li>

        <li><a href="#add-shipperhq-metafield">Add ShipperHQ metafield</a></li>
	</ul>
</div>

When you enable ShipperHQ on a store, additional fields become available on the product level:
* [Shipping Groups](https://support.bigcommerce.com/s/article/ShipperHQ#ship-groups)
* [Origin Locations](https://support.bigcommerce.com/s/article/ShipperHQ#origin-loc)
* [Dimensional Rules](https://support.bigcommerce.com/s/article/ShipperHQ#dim-rules) 

These field values can be set in the Control Panel by the merchant as well as using one of the following:
* [Product Metafields Endpoint](/api-reference/catalog/catalog-api/product-metafields/createproductmetafield)
* [Variant Metafields Endpoint](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/product-variants-metafields/createvariantmetafield)

## ShipperHQ object properties

| Property | Type | Values |
|-|-|-|
| permission_set | string | This must be set to `write`. Setting to any other field will cause unintended behavior. (**required**) |
| key | enum | Members: `shipping-groups`, `shipping-origins`, `shipping-dimensional-rules`. (**required**) |
| value | JSON encoded string | This will be the name of the attribute type in ShipperHQ. Input the name exactly how it is listed within ShipperHQ. To pass in more than one Shipping Origin, Origin Location or Dimensional Rule, use an array with a comma-separated list. White spaces and special characters need to be escaped. Must be a JSON encoded string `"[\"Origin Name from SHQ-1\",\" Origin Name from SHQ-2\"]"`. (**required**) |
| namespace | string | This will always be `shipping.shipperhq`. (**required**) |
| resource_type | string | Either `product` or `variant`.(**read-only**)|
| resource_id | string | ID of the `product` or `variant`. (**read-only**) |
| description | string | ShipperHQ shipping origins associated with this product/sku. (**read-only**) |
| date_created | string | Date and time of the metafield's creation. (**read-only**) |
| date_modified | string | Date and time when the metafield was last updated. (**read-only**) |
| id | number | ID of the metafield. (**read-only**) |


<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">
    
<!-- theme: warning -->
### Entering metafield data
> You must enter the metafields exactly, otherwise, they will not work. Since metafields can store information against a product, if the `namespace` for example is set to shipping and not `shipping.shipperhq`, it will not update the shipping information.


</div>
</div>
</div>

## Control panel behavior

When you set Shipping Origins using the API, you cannot delete the fields using the control panel. You must send a `DELETE` request to the metafields resource.


## Add ShipperHQ metafield

<!--
title: "SHQ Add Metafield Request"
subtitle: "/POST https://api.bigcommerce.com/stores/{{store_hash}}/v3/catalog/products/{{product_id}}/metafields"
lineNumbers: true
-->

To add a ShipperHQ metafield, set the `namespace` field to `shipping.shipperhq`: 
`/POST https://api.bigcommerce.com/stores/{{store_hash}}/v3/catalog/products/{{product_id}}/metafields`

```json
{
	"permission_set": "write",
	"key": "shipping-origins",
	"value": "[\"Alaska\",\"California\"]",
	"namespace": "shipping.shipperhq"
}
```

<!--
title: "SHQ Add Metafield Response"
subtitle: ""
lineNumbers: true
-->

Response: 

`200 /POST https://api.bigcommerce.com/stores/{{store_hash}}/v3/catalog/products/{{product_id}}/metafields`

```json
{
	"data": [{
			"id": 51,
			"key": "shipping-origins",
			"value": "[\"Alaska\",\"California\"]",
			"namespace": "shipping.shipperhq",
			"permission_set": "write",
			"resource_type": "product",
			"resource_id": 214,
			"description": "ShipperHQ shipping origins associated with this product/sku",
			"date_created": "2018-07-19T17:56:08+00:00",
			"date_modified": "2018-07-24T14:51:43+00:00"
		},
		{
			"id": 52,
			"key": "shipping-groups",
			"value": "[\"SHIPPING GROUP NAME\"]",
			"namespace": "shipping.shipperhq",
			"permission_set": "write",
			"resource_type": "product",
			"resource_id": 214,
			"description": "ShipperHQ shipping group rules associated with this product/sku",
			"date_created": "2018-07-24T14:51:43+00:00",
			"date_modified": "2018-07-24T14:51:43+00:00"
		},
		{
			"id": 53,
			"key": "shipping-dimensional-rules",
			"value": "[\"DIMENSIONAL RULES NAME\"]",
			"namespace": "shipping.shipperhq",
			"permission_set": "write",
			"resource_type": "product",
			"resource_id": 214,
			"description": "ShipperHQ dimensional rules associated with this product/sku",
			"date_created": "2018-07-24T14:51:43+00:00",
			"date_modified": "2018-07-24T14:51:43+00:00"
		}
	],
	"meta": {
		"pagination": {
			"total": 3,
			"count": 3,
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

## Resources
### Related endpoints
* [Product Metafield](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/product-metafields/createproductmetafield)
* [Variant Metafield](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/product-variants-metafields/createvariantmetafield)
### Related articles
* [ShipperHQ](https://support.bigcommerce.com/s/article/ShipperHQ) (Knowledge Base)
