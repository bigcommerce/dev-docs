# App Development Best Practices

<div class="otp" id="no-index">

### On This Page
- [Multi-User Support](#multi-user-support)
- [Hosting](#hosting)
- [Managing Session Timeouts](#managing-session-timeouts)
- [Handling Requests Securely](#handling-requests-securely)
- [Updating Scopes](#updating-scopes)
- [Next Steps](#next-steps)
- [Resources](#resources)

</div>

This page contains best practices...

## Multi-User Support
Merchants often have more than one person working on their store. BigCommerce allows additional users to access your app when the store owner has granted them appropriate permissions. The requirements for supporting multi-user access are:
* Tokens must be stored against the `store_hash` and not against user info.
* Within the Dev Tools workspace, you must enable your app’s **Technical** > **Multiple Users** option.

In the payload returned when a user launches an app, users are distinguished by `owner_email` versus `user_email`. If these two emails match, the user is the store owner.

If you wish to enable user removal, you can do by filling in your app’s **Technical** > **Remove User Callback URL** field in Dev Tools. (Enabling user removal is optional).
For more advanced implementations, you can enable the store owner to grant specific permissions to different non-admin users. For example, person1@email.com could be restricted to editing product inventory but not seeing orders. If you decide to include this feature in your app, it’s a great feature to advertise.

## Hosting
BigCommerce stores are hosted on [Google Cloud Platform](https://cloud.google.com/) in the [us-central1](https://cloud.google.com/compute/docs/regions-zones/) region.

Therefore, you can maximize performance of your app (in terms of latency to the public API) by hosting in the same region. There is no requirement to do so, and you may host wherever you like.

## Managing Session Timeouts
We recommend that you add BigCommerce's JavaScript SDK to your Single-Click Apps to protect your app's users from getting logged out of the BigCommerce control panel after a period of idleness. To include our SDK, add this script tag to your Single-Click App:

```html
<script src="//cdn.bigcommerce.com/jssdk/bc-sdk.js">
```

Optionally, you can pass a logout callback function within the initialization call:


```javascript
Bigcommerce.init({
      onLogout: callback
});
```

This callback function will run when the user explicitly logs out of the BigCommerce control panel or is automatically logged out. The callback will allow your app to respond to this logout appropriately.

## Handling Requests Securely
The request comes from the client browser, rather than directly from BigCommerce. This allows you to use a non-publicly-available Auth Callback URI while testing your app.

For security, Auth and Load callbacks should be handled server-side. If you are building a client-side application (such as an AngularJS Single Page App), you should handle Auth and Load callbacks outside that application. Use a separate service that accepts the Auth and Load callback requests, generates tokens, validates requests, and then redirects the user to your client-side app’s entry point.

## Updating Scopes
As a best practice, your app should validate this list to ensure that it matches the app's needs, and fail if it does not. However, at this time, the user does not have any opportunity to pick and choose between scopes. The dialog presented to the user requires the user to approve all scopes or none.

## Next Steps

## Resources

### Sample Apps
* [Python / Flask](https://github.com/bigcommerce/hello-world-app-python-flask)
* [PHP / Silex](https://github.com/bigcommerce/hello-world-app-php-silex)
* [Ruby / Sinatra](https://github.com/bigcommerce/hello-world-app-ruby-sinatra)
* [Laravel / React](https://github.com/bigcommerce/laravel-react-sample-app)
* [Node / FaunaDB / Nelify](https://github.com/bigcommerce/channels-app/)

### Tools
* [Node API Client](https://github.com/getconversio/node-bigcommerce)
* [Python API Client](https://github.com/bigcommerce/bigcommerce-api-python)
* [PHP API Client](https://github.com/bigcommerce/bigcommerce-api-php)
* [Ruby API Client](https://github.com/bigcommerce/bigcommerce-api-ruby)
* [Ruby OmniAuth Gem](https://github.com/bigcommerce/omniauth-bigcommerce)
* [Big Design Developer Playground](https://developer.bigcommerce.com/big-design/)
* [Figma UI Kit](https://www.figma.com/file/jTVuUkiZ1j3rux8WHG4IKK/BigDesign-UI-Kit?node-id=0%3A1/duplicate)
* [Adobe Illustrator UI Kit](https://design.bigcommerce.com/bigdesign-ui-kit)

### Blog Posts
* [How to Test App Authentication Locally with ngrok](https://medium.com/bigcommerce-developer-blog/how-to-test-app-authentication-locally-with-ngrok-149150bfe4cf) (BigCommerce Developer Blog)
* [Building a BigCommerce App Using Laravel and React](https://medium.com/bigcommerce-developer-blog/building-a-bigcommerce-app-using-laravel-and-react-711ceceb5006) (BigCommerce Developer Blog)
* [Big Design Tutorial](https://medium.com/bigcommerce-developer-blog/bigdesign-build-native-looking-uis-with-the-bigcommerce-design-system-fb06a01a24f2) (BigCommerce Developer Blog)