# Deprecations and Sunsets



This article provides a reference for deprecated APIs and exposes BigCommerce's plans to sunset specific API operations and properties. We recommend setting up a feed alert for our [Developer Changelog](/changelog) to receive the most up-to-date information about API changes.

## Deprecations

The following V2 APIs are deprecated. We discourage using these APIs as BigCommerce no longer supports them. Instead, consider using the provided V3 replacements.

| Deprecated API | Replacement |
|-|-|
|`/v2/brands`| [V3 Brands](/api-reference/catalog/catalog-api/brands/getbrands)|
|`/v2/categories`| [V3 Categories](/api-reference/catalog/catalog-api/category/getcategories)|
|`/v2/customers`| [V3 Customers](/api-reference/customer-subscribers/v3-customers-api)|
|`/v2/options`| [V3 Options](/api-reference/catalog/catalog-api/product-options), [V3 Modifiers](/api-reference/catalog/catalog-api/product-modifiers) |
|`/v2/option_sets`|[V3 Options](/api-reference/catalog/catalog-api/product-options), [V3 Variants](/api-reference/store-management/catalog/product-variants)|
|`/v2/products `| [V3 Products](/api-reference/catalog/catalog-api/products/getproducts)|
|`/v2/redirects`|[V3 Redirects](/api-reference/storefront/redirects)|


<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> ### Note
> * In V3, `options` and `modifiers` attach directly to products. Use `options` and `modifiers` together to access the contents of the former V2 `options` response.
> * `option_sets` endpoint is intentionally not available in the V3 API. For more information, see [Difference between V2 and V3 Catalog APIs](/api-docs/store-management/catalog/v2-vs-v3#difference-between-v2-and-v3-catalog-apis).

</div>
</div>
</div>

## Sunsets

BigCommerce has scheduled the removal of the following operations.

| Sunset operation | Endpoint | Sunset date | Replacement |
|-|-|-|-|
| `DELETE Collection` | `/v2/customers`| March 31, 2021| [`DELETE /v3/customers`](/api-reference/store-management/customers-v3/customers/customersdelete)|
| `DELETE Collection` | `/v2/option_sets`| May 10, 2020| None; can still be deleted individually by ID.|
| `DELETE Collection` | `/v2/products`| May 10, 2020| [`DELETE /v3/catalog/products`](/api-reference/store-management/catalog/products/deleteproducts)|

BigCommerce has scheduled the removal of the following properties.

| Sunset property | Endpoint | Sunset date | Replacement |
|-|-|-|-|
|`is_enabled`| [Channels](/api-reference/store-management/channels/channels/listchannels) | May, 10, 2020 | `status` |

## Related resources 

* [Developer Changelog](/changelog)
* [Difference between V2 and V3 Catalog REST APIs](/api-docs/store-management/catalog/v2-vs-v3)
