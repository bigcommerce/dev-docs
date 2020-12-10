# Difference between V2 and V3 Catalog REST APIs

<div class="otp" id="no-index">

### On this page
- [V3 improvements](#v3-improvements)
- [Difference between V2 and V3 Catalog APIs](#difference-between-v2-and-v3-catalog-apis)
- [Related resources](#related-resources)

</div>

V2 and V3 Catalog REST APIs allow you to manage your store's products, categories, and brands, along with their sub-resources.

Both the V2 and V3 Catalog APIs authenticate with OAuth and can be used concurrently within a single application; however, data representation can be significantly different.

V2 and V3 REST APIs are not fully compatible. When resources are available through both APIs, we recommend using the V3 API as it contains performance optimizations and usability improvements.
For differences in resources, see the [Difference between V2 and V3 Catalog APIs](#difference-between-v2-and-v3-catalog-apis) section of this article.

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> ### Note
>
> * BigCommerce will not introduce new resources in V2 APIs.
> * BigCommerce will eventually migrate all existing V2 resources to V3.
> * Not all V2 resources have V3 counterparts. 

</div>
</div>
</div>

## V3 improvements

* You can perform most tasks with fewer API calls; for example, you can create a product with variants and custom fields in a single request.
* You can include sub-resources within a request.
* Each V3 resource includes a meta object, simplifying pagination.
* V3 [Brands](https://developer.bigcommerce.com/api-reference/store-management/catalog/brands/getbrandbyid), [Categories](https://developer.bigcommerce.com/api-reference/store-management/catalog/category/getcategorybyid), [Products](https://developer.bigcommerce.com/api-reference/store-management/catalog/products/getproductbyid), and [Product Variants](https://developer.bigcommerce.com/api-reference/store-management/catalog/product-variants/getvariantbyid) expose a metafields resource for use by developers to store custom data.
* V3 API is optimized for performance. In general, data can be sent, received, and processed faster via V3, relative to V2.

## Difference between V2 and V3 Catalog APIs

### Product variants and modifiers instead of option sets

V3 Catalog introduced a new option model, which included two types of options: [variant options](https://developer.bigcommerce.com/api-docs/store-management/products-overview#variant-options) and [modifiers](https://developer.bigcommerce.com/api-docs/store-management/products-overview#modifier-options). You can now create variants and modifiers in one call without having to create option sets beforehand. The new option model simplified the creation and management of variant prices and modifier adjusters and removed the need to use complex rules, in all but some cases.

#### Variant options
[Variant options](https://developer.bigcommerce.com/api-docs/store-management/products-overview#variant-options) represent options used for variant generation. A shopper has to choose from available variant options before adding a product to the cart. Variant options include multiple-choice types such as swatch, rectangle, radio button, and dropdown.

Variant options example: size or color.

#### Variants
[Variants](https://developer.bigcommerce.com/api-docs/store-management/products-overview#variant) are created based on the combination of variant options and have their own attributes such as image, prices, weight, and stock level.

Variant example: large blue t-shirt.

#### Modifiers
[Modifiers](https://developer.bigcommerce.com/api-docs/store-management/products-overview#modifier-options) represent options used for additional product customization such as gift wrapping, engraving, text to be printed on a t-shirt, or a warranty. Unlike variant options, modifiers do not generate variants, and you can display them as *required* or *optional* on the storefront. You can use modifiers along with [rules](https://developer.bigcommerce.com/api-docs/store-management/products-overview#complex-rules) to change a product's price or weight.
Modifiers include multiple-choice types such as swatch, rectangle, radio button, and dropdown, and non-multiple-choice types such as text, multi-line text, date picker, file upload, and pick list.

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> ### Note
>
> Product [variant options](https://developer.bigcommerce.com/api-reference/store-management/catalog/product-options/getoptionbyid) and [modifiers](https://developer.bigcommerce.com/api-reference/store-management/catalog/product-modifiers/getmodifierbyid) created using the V3 Catalog API belong to a single product instance and cannot be attached to other products in the catalog.

</div>
</div>
</div>

#### Creating variants using V2 and V3 Catalog API

The following workflows demonstrate the difference between creating a product with variants using V2 and V3 Catalog APIs.

**V2 API workflow to create a product with variants:**

1. Create a product using the V2 Products API.
2. Create options.
3. Create an option set using the V2 Option Sets API.
4. Link the product to the option set.
5. Create adjustments, such as price adjustment, using rules.

**V3 Catalog API workflow to create a product with variants:**

1. [Create a product](https://developer.bigcommerce.com/api-reference/store-management/catalog/products/createproduct) with variants by sending a `POST` request to `/v3/catalog/products`. You can specify the price directly on the variant level using the `price` property of the variant object.

#### Product variants

In V3, every purchasable entity in the catalog is a variant including the product itself. This structure enables enhanced inventory management flows, such as using the [variants](https://developer.bigcommerce.com/api-reference/store-management/catalog/variants/getvariants) endpoint to manage inventory levels. While it is possible to create an SKU with a subset of product options using the V2 API; in V3, you must create variants for every combination of option values. We recommend creating products using the V3 API as BigCommerce intends to move operations to the V3 API.

To reduce the number of API calls made, you can include variants with a `GET` request using the `?include=variants` query parameter.

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">

<!-- theme: warning -->

### V2 SKU rules will override variant pricing
>
> Creating SKU rules via the V2 API or CSV import will alter or override any variant price or sale price added to a product using the control panel, the V3 API, or [Price Lists UI](https://support.bigcommerce.com/s/article/Price-Lists).

</div>
</div>
</div>

### Product option sets

The V3 Catalog API does not include an endpoint to manage option sets, but it will respect option sets created using the [V2 Option Sets API](https://developer.bigcommerce.com/legacy/v2-catalog-products/v2-option-set-options) or the control panel. Currently, the control panel's Add/Edit Product section consumes the V2 API, and any products created and managed through the control panel will be converted to the V2 model using option sets. If you apply an option set to a V3 product, you will remove the product's variants.

### Product rules 

Most of the use cases for using V2 product rules can be solved by making adjustments directly to V3 variant options and modifiers. For cases where an adjustment depends on selecting multiple modifier values, use the V3's [Complex Rules](https://developer.bigcommerce.com/api-reference/store-management/catalog/product-complex-rules/createcomplexrule) resource. 
In V3, any variants or modifier adjusters created with non-null core properties such as price, weight, image, and purchasability will create a rule on the back-end. Such variants and modifier options will appear in V2 as product rules, and their edits will be shared across API versions.

## Related resources

### Articles
* [Catalog Overview](https://developer.bigcommerce.com/api-docs/store-management/products-overview)
* [Deprecations and sunsets](https://developer.bigcommerce.com/api-reference#deprecations-and-sunsets)

### Endpoints
* [V3 Product Complex Rules](https://developer.bigcommerce.com/api-reference/store-management/catalog/product-complex-rules)
* [V3 Product Options](https://developer.bigcommerce.com/api-reference/store-management/catalog/product-options)
* [V3 Product Modifiers](https://developer.bigcommerce.com/api-reference/store-management/catalog/product-modifiers)
* [V3 Product Variants](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/product-variants)