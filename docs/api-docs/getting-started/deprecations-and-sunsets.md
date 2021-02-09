# Deprecations and Sunsets

<div class="otp" id="no-index">

### On this page
- [Deprecations](#deprecations)
- [Sunsets](#sunsets)
- [Related resources](#related-resources)

</div>

## Deprecations

The following endpoints are deprecated. We discourage using these endpoints as they are no longer supported by BigCommerce. Instead, consider using the provided V3 replacements.

| Endpoints | Replacements |
|-|-|
|`/v2/brands`| [V3 Brands](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/brands/getbrands)|
|`/v2/categories`| [V3 Categories](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/category/getcategories)|
|`/v2/customers`| [V3 Customers](https://developer.bigcommerce.com/api-reference/customer-subscribers/v3-customers-api)|
|`/v2/options`| [V3 Options](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/product-options), [V3 Modifiers](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/product-modifiers) |
|`/v2/option_sets`|[V3 Options](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/product-options), [V3 Variants](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/product-variants)|
|`/v2/products `| [V3 Products](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/products/getproducts)|
|`/v2/redirects`|[V3 Redirects](https://developer.bigcommerce.com/api-reference/storefront/redirects)|


<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> ### Note
> * In V3, `options` and `modifiers` attach directly to products. Use `options` and `modifiers` together to access the contents of the former V2 `options` response.
> * `option_sets` endpoint is intentionally not available in the V3 API. See [Difference between V2 and V3 Catalog APIs](https://developer.bigcommerce.com/api-docs/store-management/catalog/v2-vs-v3#difference-between-v2-and-v3-catalog-apis) for more information.

</div>
</div>
</div>

## Sunsets

The following operations are scheduled to be removed.

| Operation | Endpoints | Sunset | Replacement |
|-|-|-|-|
| `DELETE Collection` | `/v2/customers`| March 31, 2021| [`DELETE /v3/customers`](https://developer.bigcommerce.com/api-reference/customer-subscribers/v3-customers-api/customers/customersdelete)|
| `DELETE Collection` | `/v2/option_sets`| May 10, 2020| None; can still be deleted individually by ID.|
| `DELETE Collection` | `/v2/products`| May 10, 2020| [`DELETE /v3/catalog/products`](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/products/deleteproducts)|

The following properties are scheduled to be removed.

| Property | Endpoints | Sunset | Replacement |
|-|-|-|-|
|`is_activated`| [Channels](https://developer.bigcommerce.com/api-reference/cart-checkout/channels-listings-api/channels/listchannels) | May, 10, 2020 | `status` |

## Related resources 

### Articles
* [Learn more about V2 vs V3 API](https://developer.bigcommerce.com/api-docs/store-management/catalog/v2-vs-v3).