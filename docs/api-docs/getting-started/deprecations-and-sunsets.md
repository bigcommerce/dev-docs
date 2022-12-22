# Deprecations and Sunsets



This article provides a reference for deprecated APIs and exposes BigCommerce's plans to sunset specific API operations and properties. We recommend setting up a feed alert for our [Developer Changelog](/changelog) to receive the most up-to-date information about API changes.

## Deprecations

The following APIs are deprecated. We discourage using these APIs, as BigCommerce no longer supports them. Instead, consider using the suggested replacements.

| Deprecated API | Replacement |
|:---------------|:------------|
| `/v2/brands` | [V3 Catalog Brands](/api-reference/store-management/catalog/brands/getbrands) |
| `/v2/categories` | [V3 Catalog Categories](/api-reference/store-management/catalog/category/getcategories) |
| `/v2/customers` | [V3 Customers](/api-reference/store-management/customers-v3) |
|`/v2/options`| [V3 Catalog Product Modifiers](/api-reference/store-management/catalog/product-modifiers/getmodifiers), [V3 Catalog Product Variant Options](/api-reference/store-management/catalog/product-variant-options/getoptions). See the [Accessing product options](#accessing-product-options-with-V3) callout.  |
|`/v2/option_sets`| [V3 Catalog Product Modifiers](/api-reference/store-management/catalog/product-modifiers/getmodifiers), [V3 Catalog Product Variant Options](/api-reference/store-management/catalog/product-variant-options/getoptions). The `option_sets` endpoint is intentionally not available in the V3 Catalog API. For more information, see [V2 vs V3 Catalog APIs](/legacy/v2-products/v2-v3). |
|`/v2/products `| [V3 Catalog Products](/api-reference/store-management/catalog/products/getproducts) |
|`/v2/redirects`| [V3 Redirects](/api-reference/store-management/redirects) |
|`/v3/content/widgets/search` | [V3 Get All Widgets](/api-reference/store-management/widgets/widget/getwidgets) |


<!-- theme: info -->
> #### Accessing product options with V3
> In V3, `modifiers` attach directly to products and `options` attach to variants. Use `options` and `modifiers` together to access the contents of the former V2 `options` response.


## Sunsets

We have removed the following endpoints.

| Sunset endpoint / API | Replacement endpoint / API |
|:----------------------|:---------------------------|
| `DELETE Collection` [V2 Customers](/api-reference/store-management/customers-v2)  | `DELETE Customers` [V3 Customers](/api-reference/store-management/customers-v3/customers/customersdelete) |
| `DELETE Collection` [V2 Option Sets](/legacy/v2-catalog-products/v2-option-sets) | None; can still be deleted individually by ID. |
| `DELETE Collection` [V2 Products](/legacy/v2-catalog-products/v2-products) | `DELETE Products` [V3 Products](/api-reference/store-management/catalog/products/deleteproducts) or individually `DELETE Product` [V2 Products](/legacy/v2-catalog-products/v2-products#delete-a-product) |

We have removed the following properties.

| API | Sunset property | Replacement property |
|:----|:----------------|:---------------------|
[V3 Channels](/api-reference/store-management/channels/channels/listchannels) |`is_enabled` | `status` |

## Related resources 

* [Developer Changelog](/changelog)
* [Difference between V2 and V3 Catalog REST APIs](/api-docs/store-management/catalog/v2-vs-v3)
