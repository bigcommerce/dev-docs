<h1>Shipper HQ Metafields</h1>
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
        <li><a href="#shipper-hq-object-properties">ShipperHQ Object Properties</a></li>
        <li><a href="#control-panel-behavior">Control Panel Behavior</a></li>
        <li><a href="#add-shipperhq-metafield">Add ShipperHQ Metafield</a></li>
	</ul>
</div>

When ShipperHQ is enabled on a store, additional fields become available on the product level:
* [Shipping Groups](https://support.bigcommerce.com/s/article/ShipperHQ#ship-groups)
* [Origin Locations](https://support.bigcommerce.com/s/article/ShipperHQ#origin-loc)
* [Dimensional Rules](https://support.bigcommerce.com/s/article/ShipperHQ#dim-rules) 

These field values can be set in the Control Panel by the merchant as well as using one of the following:
* [Product Metafields Endpoint](/api-reference/catalog/catalog-api/product-metafields/createproductmetafield)
* [Variant Metafields Endpoint](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/product-variants-metafields/createvariantmetafield)

---

<a href='#shipper-hq-object-properties' aria-hidden='true' class='block-anchor'  id='shipper-hq-object-properties'><i aria-hidden='true' class='linkify icon'></i></a>

## ShipperHQ Object Properties

| Property | Type | Values |
|---|---|---|
| permission_set | string | This must be set to `write`. Setting to any other field will cause unintended behavior. **required** |
| key | enum | Members: `shipping-groups`, `shipping-origins`, `shipping-dimensional-rules` **required** |
| value | JSON encoded string | This will be the name of the attribute type in ShipperHQ. This needs to be input exactly how it is listed within ShipperHQ. To pass in more than one Shipping Origin, Origin Location or Dimensional Rule use an array with a comma-separated list. White spaces and special characters need to be escaped. Must be a JSON encoded string `"[\"Origin Name from SHQ-1\",\" Origin Name from SHQ-2\"]"` **required** |
| namespace | string | This will always be `shipping.shipperhq` **required** |
| resource_type | string | Either `product` or `variant` |
| resource_id | string | ID of the product or variant **read-only** |
| description | string | ShipperHQ shipping origins associated with this product/sku. **read-only** |
| date_created | string | Date and time of the metafield's creation. **read-only** |
| date_modified | string | Date and time when the metafield was last updated. **read-only** |
| id | number | ID of the Metafield. **read-only** |

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">
    
<!-- theme: warning -->
### Entering Metafield Data
> The metafields must be entered exactly, otherwise they will not work. Since metafields can also be used to store information against a product, if the <code>namespace</code> for example is set to shipping and not <code>shipping.shipperhq</code>, it will not update the shipping information.

</div>
</div>
</div>

---

<a href='#control-panel-behavior' aria-hidden='true' class='block-anchor'  id='control-panel-behavior'><i aria-hidden='true' class='linkify icon'></i></a>

## Control Panel Behavior

When Shipping Origins are set using the API, the fields cannot be deleted using the Control Panel. A /DELETE request must be sent to the metafields resource.


---

<a href='#add-shipperhq-metafield' aria-hidden='true' class='block-anchor'  id='add-shipperhq-metafield'><i aria-hidden='true' class='linkify icon'></i></a>

## Add ShipperHQ Metafield


<!--
title: "SHQ Add Metafield Request"
subtitle: "/POST https://api.bigcommerce.com/stores/{{store_hash}}/v3/catalog/products/{{product_id}}/metafields"
lineNumbers: true
-->

**Example Request Add ShipperHQ Metafields**  
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

**Example Add ShipperHQ Metafield Response**  
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

---

## Resources
### Related Endpoints
* [Product Metafield](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/product-metafields/createproductmetafield)
* [Variant Metafield](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/product-variants-metafields/createvariantmetafield)
### Related Articles
* [ShipperHQ](https://support.bigcommerce.com/s/article/ShipperHQ) (Knowledge Base)

