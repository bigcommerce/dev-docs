# V2 Catalog Products and V3 Catalog APIs

<div class="otp" id="no-index">

### On this page
- [V3 improvements](#v3-improvements)
- [Difference between V2 Catalog Products and V3 Catalog APIs](#difference-between-v2-catalog-products-and-v3-catalog-apis)
- [Related resources](#related-resources)

</div>

V2 Catalog Products and V3 Catalog REST APIs allow you to manage your store's physical and digital products.

Both the V2 Catalog Products and V3 Catalog APIs authenticate with OAuth and are designed to be used concurrently within a single application; however, data representation is significantly different.

V2 and V3 REST APIs are not fully compatible. For differences in resources, see [Difference between V2 Catalog Products and V3 Catalog APIs](#difference-between-v2-catalog-products-and-v3-catalog-apis). When resources are available through both APIs, we recommend using the V3 API as it contains performance optimizations and usability improvements.


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
* You can include subresources within a request.
* Each V3 resource includes a meta object, simplifying pagination.
* V3 Brands, Categories, Products, and Product Variants expose a metafields resource for use by developers to store custom data.
* V3 API is optimized for performance. In general, data can be sent, received, and processed faster via V3, relative to V2.

## Difference between V2 Catalog Products and V3 Catalog APIs

### Product variants and modifiers

V3 Catalog introduced a new option model which includes two types of options: [variant options](https://developer.bigcommerce.com/api-docs/store-management/products-overview#variant-options) and [modifier options](https://developer.bigcommerce.com/api-docs/store-management/products-overview#modifier-options). The new option model  simplifies the creation and management of variant prices and modifier adjusters and removes the need to use complex rules, in all but some cases.

|Option type |Example|
|-|-|
|**Variant options** are any choices that the shopper needs to make that will result in selecting a variant.|Item’s size and color.|
|**Modifier options** are any choices that the shopper can make to change how the merchant fulfills the product. |Shipping insurance and special engraving.|

In V3 Catalog, variants and modifiers are attached directly to the product, without the need to create an option set beforehand. 

The following workflows demonstrate the difference between creating a product with variants using V2 Catalog Products and V3 Catalog APIs.

**V2 Catalog Products API workflow to create a product with variants**

1. Create the product
2. Create the options
3. Create an option set
4. Assign the option set to the product
5. Create adjustments, such as price adjustment, using rules


**V3 Catalog API workflow to create a product with variants**

1. Create the product with variants in one call
2. Create adjustments, such as price adjustment, directly on the variant or modifier

#### Product variants

In V3, every purchasable entity in the catalog is a variant, including the product itself. This enables enhanced inventory management flows, such as the ability to use the [variants](https://developer.bigcommerce.com/api-reference/store-management/catalog/variants/updatevariantsbatch) endpoint to manage inventory levels. While it is possible to create a SKU with a subset of product options using the V2 API, in V3, variants must be created for every combination of option values. We recommend creating products using the V3 API as BigCommerce intends to move operations to the V3 API.

To reduce the number of API calls made, include variants with a `GET` request using `?include=variants`.

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">

<!-- theme: warning -->

### V2 SKU rules will override variant pricing
> Creating SKU rules via the V2 API or via CSV import will alter or override any variant price or sale price added to a product using the control panel, the V3 API, or Price Lists UI.

</div>
</div>
</div>

### Product option sets

V3 Catalog does not include an endpoint to manage option sets, but it will respect option sets created using the [V2 Option sets API](https://developer.bigcommerce.com/legacy/v2-catalog-products/v2-option-set-options) operation or the control panel. Currently, the control panel's Add/Edit Product section consumes the V2 API and any products created and managed through the control panel will be converted to the V2 model using option sets. If you apply an option set to a V3 product, the product's variants will be removed.

### Product rules 

Most of the use cases for using V2 product rules can be solved by making adjustments directly to V3 variants and modifier options. For cases where an adjustment depends on selecting multiple modifier values, use the V3's [complex rules](https://developer.bigcommerce.com/api-reference/store-management/catalog/product-complex-rules/createcomplexrule) resource. 
In V3, any variants or modifier adjusters created with non-null core properties such as price, weight, image, and purchasability will create a rule on the back-end. Such variants and modifier options will appear in V2 as product rules and their edits will be shared across API versions.

## Related resources

### Articles
* [Catalog Overview](https://developer.bigcommerce.com/api-docs/store-management/products-overview)
* [Deprecations and sunsets](https://developer.bigcommerce.com/api-reference#deprecations-and-sunsets)

### Endpoints
* [V3 Product Complex Rules](https://developer.bigcommerce.com/api-reference/store-management/catalog/product-complex-rules)
* [V3 Product Options](https://developer.bigcommerce.com/api-reference/store-management/catalog/product-options)
* [V3 Product Modifiers](https://developer.bigcommerce.com/api-reference/store-management/catalog/product-modifiers)
* [V3 Product Variants](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/product-variants)