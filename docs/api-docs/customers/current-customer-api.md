# Current Customer API



## Identifying logged-in customers securely

Suppose your application interacts dynamically with the BigCommerce storefront and conveys specific information to a particular logged-in customer. You must confirm that customer's identity within the insecure environment of the user's browser before revealing any sensitive information.

To address this need, BigCommerce provides a Current Customer endpoint that your app can access via JavaScript on the storefront. This endpoint allows a remote application, such as a third-party subscription billing app, to return a JWT with identifying customer details. The information is signed with your [OAuth client secret](/api-docs/getting-started/basics/authentication#authentication_client-id-secret).

<!-- theme: info -->
> #### Note
> - An app client ID is required in requests to `/customer/current.jwt`.
> - To generate an app client ID, create an app in the [BigCommerce Developer Portal](https://devtools.bigcommerce.com/).
> - Use the app's secret to validate the signature on the JWT.
> - The app doesn't need to be installed or published on a store to use the client ID to get the JWT.



## Example JavaScript

Install this [Current Customer API example](https://developer.bigcommerce.com/docs/e861a9c6b77b5-authentication#current-customer-api-example-request) JavaScript on your sandbox BigCommerce store to test JWT functionality. Include your application's client ID in the request to identify the requesting application.

<!-- theme: info -->
>#### Note
>The example JWT code block is decoded identifying the currently signed-in customer.

The JavaScript should alert the browser with a JWT token after logging into the storefront with a customer account. 

The second tab in the *Current API example request* displays the plain text example response. 

An end-to-end example that displays a customer's recently purchased products is available in our [Ruby](https://github.com/bigcommerce/hello-world-app-ruby-sinatra/) and [PHP](https://github.com/bigcommerce/hello-world-app-php-silex/) sample apps.

<!-- theme: info -->
> #### IAT and EXP claims
> The current customer tokens are valid for 15 minutes.


