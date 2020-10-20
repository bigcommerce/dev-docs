# Marketing API Overview

<div class="otp" id="no-index">

### On this page
- [OAuth scopes](#oauth-scopes)
- [Banners](#banners)
- [Coupons](#coupons)
- [Gift certificates](#gift-certificates)
- [Resources](#resources)

</div>

The Marketing API enables you to generate product discounts, issue gift certificates, and convey marketing information using storefront banners.  

When to use:

* Create a banner to display marketing information on a specific page of a store.
* Issue a coupon code for customers to obtain discounted pricing on a product or a category of products.
* Generate a gift certificate deliverable via email.

## OAuth scopes

| Name | Permission | Parameter |
| -- | -- | -- |
| Marketing | modify | `store_v2_marketing` |
| Marketing | read-only | `store_v2_marketing_read_only` |

For more information on available authentication methods, see [Authentication](https://developer.bigcommerce.com/api-docs/getting-started/authentication).

## Banners
You can use banners to convey information to customers. 

To add a banner to a storefront, `POST` to `/v2/banners`.

```http
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v2/banners
Accept: application/json
Content-Type: application/json
X-Auth-Token: {{ACCESS_TOKEN}}

{
  "name": "Sale Banner",
  "content": "<p> Sale! Tuesday at 9am! </p>",
  "page": "home_page",
  "location": "top",
  "date_type": "always",
  "visible": 1
}
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/marketing/banners/createabanner#requestrunner)

## Coupons
You can use coupons to issue category or product discounts for customers who apply a given code.

To create a coupon code, `POST` to `/v2/coupons`.

```http
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v2/coupons
Accept: application/json
Content-Type: application/json
X-Auth-Token: {{ACCESS_TOKEN}}

{
  "name": "5% off order total",
  "type": "per_item_discount",
  "code": "4F75AF0C3802D39",
  "enabled": true,
  "amount": "5",
  "applies_to": {
    "entity": "categories",
    "ids": [
      0
    ]
  }
}
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/marketing/coupons/postcoupons#requestrunner)

## Gift certificates
You can use gift certificates to offer customers prepaid vouchers as an alternative to cash for purchases within the store. 

To issue a gift certificate, `POST` to `/v2/gift_certificates`.

```http
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v2/gift_certificates
Accept: application/json
Content-Type: application/json
X-Auth-Token: {{ACCESS_TOKEN}}

{
  "template": "Birthday",
  "message": "Congratulations!",
  "amount": "700.0000",
  "to_name": "Jane",
  "to_email": "test@test.com",
  "from_name": "John",
  "from_email": "test1@test.com",
  "code": "XQ2-1R7-7C1-Q0C",
  "status": "active"
}
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/marketing/gift-certificates/createagiftcertificate#requestrunner)

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

<!-- theme:  -->

### Note
> A gift certificate created using the Marketing API will not trigger an email notification to the specified recipient.

</div>
</div>
</div>

## Resources

### Related endpoints
- [Marketing API](https://developer.bigcommerce.com/api-reference/store-management/marketing)
