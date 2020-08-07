# Work-in-Progress API Specifications
The specification files in this directory are part of the BigCommerce DevDocs team's ongoing work to improve the organization of BigCommerce's API documentation. These are work-in-progress drafts and shouldn't be used as a source-of-truth.

Refer to the `BigCommerce_*` files in `dev-docs/reference/` for the up-to-date specs used to generate the [API reference documentation for the Dev Center](https://developer.bigcommerce.com/api-reference).

## File Naming Convention
File names are composed by period separating the following:

* Resource name (exactly matching name in URL)
* API version or type
  * `v2` - V2 REST API
  * `v3` - V3 REST API
  * `sf` - Storefront API
* Open API Specification version
  * `oas2` - Open API V2 (AKA "Swagger")
  * `oas3` - Open API V3 (successor to Swagger)
* File extension
  * `.yml` for YAML specs
  * `.json` for JSON specs

**Example**:

```
carts.sf.oas2.yaml
```

>### Note
>* No API type is specified for specifications that define APIs other than V2, V3, or Storefront (e.g. `payment_processing` and `shipping_provider`)
