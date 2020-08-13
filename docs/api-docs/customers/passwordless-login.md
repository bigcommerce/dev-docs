# Passwordless Customer Login

<div class="otp" id="no-index">

### On this Page
- [Logging in customers via email link](#logging-in-customers-via-email-link)
- [Sending the request](#sending-the-request)
- [Additional resources](#additional-resources)
</div>

## Logging in customers via email link
Your application can send shoppers a one-time link via email that will sign them in to their [storefront account](https://support.bigcommerce.com/s/article/Customer-Account-Creation).

Use cases for this include:
* Reducing friction for customers, allowing them to proceed without needing to reset their passwords
* An alternate method for signing in customers versus using the [Customer Login API](https://developer.bigcommerce.com/api-docs/customers/customer-login-api)

## Sending the request

Send a `POST` request to 
`{store-url}/login.php?action=passwordless_login`

The request body should include:
* `email`: The customer's email address. This is where they will receive the one-time login link.
Example: 
<br>

```json
{
"email": "jane_doe@test.com",
"redirect_url": "/checkout"
}
```
<div class="HubBlock--callout">
<div class="CalloutBlock--">
<div class="HubBlock-content">
    
<!-- theme:  -->
### Redirect URL
> The POST request body can also include `redirect_url`. This should be a link to the URL where you want to redirect customers once they're successfully logged in. If `redirect_url` is not provided, customers will be redirected as follows:
> <br>
> - **Failed sign-in:** Sign in page
<br>
> - **Successful sign-in:** User account page

</div>
</div>
</div>

### Response

Upon receiving a successful `POST` request, BigCommerce will send a response that contains:

* `expiry`: The time in seconds during which the login link is valid.
* `sent_email`: A value of `sign_in` indicates BigCommerce sent the login link to the customer via the email provided. A value of `password_reset` means the customer requested a sign-in link, however BigCommerce sent a reset password email instead. 

Example:

```json
{
"expiry": 900,
"sent_email": "sign_in"
}
```

**Other status codes:**

`429`: *Too many requests, request was rate limited*

`404`: *Provided email does not belong to a customer*

## Additional Resources 
* [Customer Login SSO](https://developer.bigcommerce.com/api-reference/storefront/customer-login-sso)
* [Customers V3](https://developer.bigcommerce.com/api-reference/store-management/customers-v3)
