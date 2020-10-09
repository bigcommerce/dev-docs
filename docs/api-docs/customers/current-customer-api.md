# Current customer API

<div class="otp" id="no-index">

### On this page
- [Identifying logged-in customers securely](#identifying-logged-in-customers-securely)
- [Example JavaScript](#example-javascript)

</div>

## Identifying logged-in customers securely

If your application interacts dynamically with the BigCommerce storefront, and conveys information that is specific to a particular logged-in customer, you must confirm that customer’s identity within the insecure environment of the user’s browser.

To address this need, BigCommerce provides a Current Customer endpoint, which your app can access via JavaScript on the storefront. This endpoint returns a JWT with identifying details about the customer. The information is signed with your [OAuth client secret](/api-docs/getting-started/basics/authentication#authentication_client-id-secret).

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

<!-- theme: info  -->
### Note
> * Use the app's secret to validate the signature on the JWT.

</div>
</div>
</div>

## Example JavaScript

Below is example JavaScript that will access this JWT. To test the JWT functionality, you can install this JavaScript on your sandbox BigCommerce store. 

```html
<script type="text/javascript">
function customerJWT() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 ) {
           if (xmlhttp.status == 200) {
               alert('Customer JWT:\n' + xmlhttp.responseText);
           }
           else if (xmlhttp.status == 404) {
              alert('Not logged in!');
           }
           else {
               alert('Something went wrong');
           }
        }
    };
    xmlhttp.send();
}
customerJWT();
</script>
```
The above JavaScript should alert to the browser with a JWT token if you are logged into the storefront with a customer account. If no customer is logged in, BigCommerce will return a `404` response, and you will see an error message. The JWT returned from this endpoint (example below) can be decoded on [JWT.IO](https://jwt.io/).


**Example Logged In Customers Response**

```json
{
  "customer": {
    "id": 4927,
    "email": "john.doe@gmail.com",
    "group_id": "6"
  },
  "iss": "bc/apps",
  "sub": "abc123",
  "iat": 1480831863,
  "exp": 1480832763,
  "version": 1,
  "aud": "6sv16tfx3j5gsopm42ss5dd67g2srvq",
  "application_id": "6sv16tasdgr2b5hs5dd67g2srvq",
  "store_hash": "abc123",
  "operation": "current_customer"
}
```

By design, your application should send this token to the application’s server, validate it against your client secret, and then use it as a trusted indication of the logged-in customer’s identity, before displaying confidential information to them.

An end-to-end example that displays a customer’s recently purchased products is available in our [Ruby](https://github.com/bigcommerce/hello-world-app-ruby-sinatra/) and [PHP](https://github.com/bigcommerce/hello-world-app-php-silex/) sample apps.

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

<!-- theme: info -->

### IAT claim
> The iat claim is only good for 30 seconds.

</div>
</div>
</div>
