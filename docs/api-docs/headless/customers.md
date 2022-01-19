# Managing Customers



This section covers different ways to associate customers to headless carts.

## Customer login using GraphQL

You can login a customer account using client-side or server-side code.

### Client-side GraphQL customer login

To login a customer account with an email address and a password in client-side code, use the following [GraphQL Storefront API](https://developer.bigcommerce.com/api-docs/storefront/graphql/graphql-storefront-api-overview) customer login mutation.

**Customer login mutation**

```graphql
mutation Login($email: String!, $pass: String!) {
  login(email: $email, password: $pass) {
    result
  }
}
```

When a customer is logged in using the customer login mutation, subsequent queries made to the GraphQL Storefront API will return customer-specific results (for example, customer group pricing) using the context of the logged in customer.

### Server-side GraphQL customer login

To make queries from the perspective of a particular customer in server-side code, use [customer impersonation tokens](https://developer.bigcommerce.com/api-docs/storefront/graphql/graphql-storefront-api-overview#customer-impersonation-tokens).

When you use customer impersonation tokens to authenticate requests made to the GraphQL Storefront API, the tokens receive store information from the perspective of the customer corresponding to the customer ID passed in the `X-Bc-Customer-Id` header of the `POST` request. Pricing, product availability, customer account, and customer details will be reflected.

## Customer Single Sign-on

If a customer logs into your headless storefront, and then is redirected to a BigCommerce-hosted page, you can use the [Customer Login API](https://developer.bigcommerce.com/api-docs/storefront/customer-login-api) to create a single sign-on experience between your headless storefront and BigCommerce. Doing so will make the redirection from the headless storefront to BigCommerce a more seamless experience for the customer.

You can log a customer into an embedded checkout by setting `redirect_to` in the Customer Login JWT payload to the relative path of the `embedded_checkout_url` generated using the [Carts API](https://developer.bigcommerce.com/api-reference/store-management/carts).

**JWT payload example**

```http
{
  "iss": {{CLIENT_ID}},
  "iat": 1535393113,
  "jti": {{UUID}},
  "operation": "customer_login",
  "store_hash": {{STORE_HASH}},
  "customer_id": {{CUSTOMER_ID}},
  "channel_id": {{CHANNEL_ID}},
  "redirect_to": "/cart.php?embedded=1&action=loadInCheckout&id=bc218c65-7a32-4ab7-8082-68730c074d02&token=aa958e2b7922035bf3339215d95d145ebd9193deb36ae847caa780aa2e003e4b",
  "request_ip": "111.222.333.444"
}
```

## Identifying logged-in customers

If a customer logs into a BigCommerce-hosted cart or checkout, then navigates back to the headless storefront, you will need to confirm the customer's identity before revealing sensitive information.
To address this need, BigCommerce provides the [Current Customers API](https://developer.bigcommerce.com/api-docs/storefront/current-customer-api) accessible via client-side JavaScript. The [Get Current Customer](https://developer.bigcommerce.com/api-reference/storefront/current-customers/current-customers/getcurrentcustomer) endpoint returns a `JWT` (signed with your OAuth client secret) that contains customer details.

## Surfacing customer group pricing

When querying the GraphQL Storefront API, customer-specific pricing will be reflected in query results if the customer is first logged in using the [customer login mutation](https://next.stoplight.io/bigcommerce/bigcommerce-dev-docs/version%2F1.3/05-headless-customers.md#client-side-graphql-customer-login) or a [customer impersonation token](https://developer.bigcommerce.com/api-docs/storefront/graphql/graphql-storefront-api-overview#customer-impersonation-tokens).

For server-side REST implementations, you can use the [Pricing API](https://developer.bigcommerce.com/api-reference/store-management/pricing) to [get prices](https://developer.bigcommerce.com/api-reference/store-management/pricing/products/get-prices) for a particular customer group.

```http
POST https://api.bigcommerce.com/stores/{store_hash}/v3/pricing/products
Accept: application/json
Content-Type: application/json
X-Auth-Token: {{ACCESS_TOKEN}}

{
  "channel_id": 1,
  "currency_code": "USD",
  "customer_group_id": 0,
  "items": [
    {
      "product_id": 0,
      "variant_id": 0,
      "options": [
        {
          "option_id": 0,
          "value_id": 0
        }
      ]
    }
  ]
}
```

**Response example**

```json
{
  "data": [
    {
      "product_id": 1,
      "variant_id": 1,
      "options": [...],
      "retail_price": {
        "as_entered": 1.5,
        "entered_inclusive": true,
        "tax_exclusive": 1.1,
        "tax_inclusive": 1.5
      },
      "sale_price": {...},
      "minimum_advertised_price": {...},
      "price": {...},
      "calculated_price": {...},
      "price_range": {...},
      "retail_price_range": {...},
      "bulk_pricing": [...]
    }
  ],
  "meta": {}
}
```

## Next steps

- [Learn how to create an order](https://developer.bigcommerce.com/api-docs/storefronts/guide/orders)