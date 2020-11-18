# V2 Products API and V3 Catalog API

<div class="otp" id="no-index">

### On this page
- [V3 improvements](#v3-improvements)
- [V2 Products versus V3 Catalog](#v2-products-versus-v3-catalog)
- [Related resources](#related-resources)

</div>

V2 Products and V3 Catalog REST APIs allow you to manage catalog products from server-side code.

Both the V2 Products and V3 Catalog APIs authenticate with OAuth and are designed to be used concurrently within a single application; however, there are significant differences in how the data is represented.

Not all V2 Products resources are accessible in V3 Catalog. For resources that are available through both APIs, we recommend using the V3 API as it contains performance optimizations and other improvements. For differences in resources, see [Difference between APIs]().

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> ### Note
>
> * No new resources will be introduced in V2 APIs.
> * All existing V2 resources will eventually be migrated to V3.
> * Not all V2 resources have V3 counterparts. 

</div>
</div>
</div>

## V3 improvements

* Most tasks can be performed with fewer API calls; for example, a product with variants and custom fields can be created in a single request.
* Subresources can be included within a request.
* Each V3 resource includes a meta object, simplifying pagination.
* V3 Brands, Categories, Products, and Product Variants expose a metafields resource for use by developers to store custom data.
* V3 API is optimized for performance. In general, data can be sent, received, and processed faster via V3, relative to V2.

## V2 Products versus V3 Catalog

### Product Options and Modifiers

V3 Catalog introduced a clear separation between [options that define variants](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/product-variants) and [options that are modifiers of a variant](https://developer.bigcommerce.com/api-reference/store-management/catalog/product-modifiers). This simplified the creation and management of variant prices and modifier adjusters and removed the need to use complex rules, in all but some cases. 

In V3 Catalog, options and modifiers are attached directly to the product, without the need to create an option set beforehand. When a product option is created and assigned to a product using the V2 API, editing the global option using the V3 API’s [product options](https://developer.bigcommerce.com/api-reference/store-management/catalog/product-options/updateoption) or [product modifiers](https://developer.bigcommerce.com/api-reference/store-management/catalog/product-modifiers/updatemodifier) endpoints will automatically copy the V2 global product option to a local product variant or modifier adjuster.

What this does:

* Changes the `option_value` > `id`. Not the `option_id`.
* Creates a copy directly on the product.
* Copies over any variants, modifiers, and option set rules.
* In the control panel, the product is listed as having a (custom) option set.
* Global option set rules are copied as product rules and the `sort_order` is updated so that they are executed before any existing product rules, which should mirror the behavior before the product was changed.

What this does not do:

* Remove the option set from the store entirely. It is still available in the control panel as an option set to be assigned.
* Change product pricing, rules, or any other product modifiers. They will be copied over and assigned the product correctly.

The following workflows demonstrate the difference between creating products with variants in V2 Products and V3 Catalog APIs.

**Workflow to create product options and option sets in V2 Products:**

1. Create the product
2. Create the options
3. Create an option set
4. Assign the option set to the product
5. Create adjustments, such as price adjustment, using rules


**Workflow to create products with variants in V3 Catalog:**

1. Create the product with variants in one call
2. Create adjustments, such as price adjustment, directly on the variant or modifier

### Product Option Sets

V3 Catalog does not include an endpoint to manage option sets but it will respect option sets created using V2 Products or the control panel. Currently, the control panel’s Add/Edit Product section consumes the V2 API and any products created and managed through the control panel will be converted to the V2 model using option sets. If you apply an option set to a V3 product, the product’s variants will be removed.

### Product Rules 

Most of the use cases for using V2 product rules can be solved by making adjustments directly on V3 variants and modifier options. For cases where an adjustment depends on the selection of multiple modifier values, use V3’s [complex rules](https://developer.bigcommerce.com/api-reference/store-management/catalog/product-complex-rules/createcomplexrule) resource. 
In V3, any variants or modifier adjusters created with non-null core properties such as price, weight, image, and purchasability will create a rule on the back-end. Such variants and modifier options will appear in V2 as product rules and their edits will be shared across API versions.

### Product Variants

In V3, every purchasable entity in the catalog is a variant, including the product itself. This enables enhanced inventory management flows such as the ability to use the [variants](https://developer.bigcommerce.com/api-reference/store-management/catalog/variants/updatevariantsbatch) endpoint to manage inventory levels. While it is possible to create a SKU with a subset of product options using the V2 API; in V3, variants must be created for every combination of option values. We recommend creating products using the V3 API as BigCommerce intends to move operations to the V3 API.

To lower the number of API calls being made, variants can be included with a GET request using `?include=variants`.

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">

<!-- theme: warning -->

### V2 SKU rules will override Variant pricing
> Creating SKU rules via the V2 API or via CSV import will alter or override any Variant price or sale price added to a product via the Control Panel, V3 API or Price Lists UI.

</div>
</div>
</div>

## Related resources

### Articles
* [Catalog Overview](https://developer.bigcommerce.com/api-docs/store-management/products-overview)
* [Deprecations and sunsets](https://developer.bigcommerce.com/api-reference#deprecations-and-sunsets)

### Endpoints
* [V3 Product Complex Rules](https://developer.bigcommerce.com/api-reference/store-management/catalog/product-complex-rules)
* [V3 Product Options](https://developer.bigcommerce.com/api-reference/store-management/catalog/product-options)
* [V3 Product Modifiers](https://developer.bigcommerce.com/api-reference/store-management/catalog/product-modifiers)
* [V3 Product Variants](https://developer.bigcommerce.com/api-reference/catalog/catalog-api/product-variants)