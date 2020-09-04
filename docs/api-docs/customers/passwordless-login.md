# Passwordless Customer Login

<div class="otp" id="no-index">

### On this Page
- [Logging in customers via email link](#logging-in-customers-via-email-link)
- [Sending the request](#sending-the-request)
- [Additional Resources](#additional-resources)
</div>

## Logging in customers via email link
Your application can send shoppers a one-time link via email that will sign them in to their [storefront account](https://support.bigcommerce.com/s/article/Customer-Account-Creation).

Use cases for this include:
* Reducing friction for customers, allowing them to proceed without needing to reset their passwords
* Providing an alternate method for signing in customers versus using the [Customer Login API](https://developer.bigcommerce.com/api-docs/customers/customer-login-api)

## Sending the request

Send a `POST` request to 
`{store-url}/login.php?action=passwordless_login`

The request body should include:
* `email`: The customer's email address. This email address is where they will receive the one-time login link.
* `redirect_url`: A link to the URL of the page where you want to redirect customers once they are logged in. This URL must be on the same domain as the store.
<br>
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
> If the request body does not include a `redirect_url`, customers will be redirected as follows:
> <br>
> - **Failed sign-in:** Sign-in page
> - **Successful sign-in:** User account page

</div>
</div>
</div>

### Response
Upon receiving a successful `POST` request, BigCommerce will send a response that contains:

* `expiry`: The time in seconds during which the login link is valid.
* `sent_email`: A value of `sign_in` indicates BigCommerce sent the login link to the customer via the email provided. A value of `password_reset` means the customer requested a sign-in link, however BigCommerce sent a reset password email instead. BigCommerce sends the email immediately upon recieving the `POST` request.

Example:

```json
{
"expiry": 900,
"sent_email": "sign_in"
}
```

### Email text

The customer will receive an email with the following subject line:

**{Store name} - Log in to your account**

The body of the email contains the following:

```html
Please click the link below to sign in to your account with {store name}.

You have requested a sign-in link. Please click here to sign in and continue.

Alternatively, paste the following link in your browser:
https://store-url/login.php?action=check_passwordless_login&token={token}&redirectUrl={redirect_URL}

This login is for {Store name} if you did not request this link, please ignore this email. Your account is still secure.
```
This email uses the same email templates as other emails in your store.

**Other status codes:**

`429`: *Too many requests, request was rate limited*

`404`: *Provided email does not belong to a customer*

## Additional Resources 
* [Customer Login SSO](https://developer.bigcommerce.com/api-reference/storefront/customer-login-sso)
* [Customers V3](https://developer.bigcommerce.com/api-reference/store-management/customers-v3)
