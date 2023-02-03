# Supporting Multiple Users



When you register your app in the [Developer Portal](https://devtools.bigcommerce.com/), you'll have the option of enabling **Multiple Users**. This allows store administrators to manually authorize users to load the app. This article describes how enabling **Multiple Users** impacts the app's user experience in the control panel, and discusses important implications for app developers to consider before enabling the feature.

## Enabling multiple users

Enabling **Multiple Users** in [Developer Portal](https://devtools.bigcommerce.com/) affects the control panel on any store your that has installed your app. If you already have an app published in the [Marketplace](https://www.bigcommerce.com/apps/), be aware that this setting takes effect immediately. We recommend testing **Multiple Users** using a separate app that is in draft status.

Let store owners know you've enabled this feature. Otherwise, they won't know they can grant access to users.

If **Multiple Users** is enabled after your app has launched, the update will cause the app scopes to change and users will be alerted of the new permission request.

## The control panel experience

Store owners will be able to adjust user permissions to grant or deny the store's other users access to your app. The next time the user logs in, they will see any apps they've received permission to access. Users can then click the app icon in the left nav to load it.

Use your draft app and your sandbox store to review this behavior.

## The load request

Apps with **Multiple Users** enabled can expect the `email` and `ID` of the user that initiated the callback in addition to the owner's `email` and `ID` in the JSON object sent in the `load` request. If a `load` request is sent with information for a user you haven't seen, provision the user account and associate it with the store in your database.

Because you know the store owner's `email` and `ID` from the app installation sequence, your app can distinguish store owners from other users. This allows you to provide different user experiences based on the information in the load request. Here is a summary of the two types of users:
- **Store owner**: Can `install`, `uninstall`, and `load` apps.
- **Users**: Cannot `install` or `uninstall` apps. Users are permitted only to `load` the apps that a store owner authorized.

## The remove user request
Store owners can also remove users. This action generates a `GET` request to the remove user callback URL that you provided in the [Developer Portal](https://devtools.bigcommerce.com/my/apps). When this occurs, your app should remove the user identified in the request from it's records.

For details about remove user and load requests, see [Single-click App Callbacks](/api-docs/apps/guide/callbacks).

## Next steps

* [Learn how to handle store events](/api-docs/apps/guide/users).

## Resources

## Related articles
* [Single-click App Callbacks](/api-docs/apps/guide/callbacks)

### Sample apps
* [Node / React / Next.js](https://github.com/bigcommerce/sample-app-nodejs)
* [Python / Flask](https://github.com/bigcommerce/hello-world-app-python-flask)
* [PHP / Silex](https://github.com/bigcommerce/hello-world-app-php-silex)
* [Ruby / Sinatra](https://github.com/bigcommerce/hello-world-app-ruby-sinatra)
* [Laravel / React](https://github.com/bigcommerce/laravel-react-sample-app)
* [Node / FaunaDB / Netlify](https://github.com/bigcommerce/channels-app/)

### Tools
* [Node API Client](https://github.com/bigcommerce/node-bigcommerce/)
* [Python API Client](https://github.com/bigcommerce/bigcommerce-api-python)
* [PHP API Client](https://github.com/bigcommerce/bigcommerce-api-php)
* [Ruby API Client](https://github.com/bigcommerce/bigcommerce-api-ruby)
* [Ruby OmniAuth Gem](https://github.com/bigcommerce/omniauth-bigcommerce)
* [Big Design Developer Playground](https://developer.bigcommerce.com/big-design)
* [Figma UI Kit](//figma.com/file/jTVuUkiZ1j3rux8WHG4IKK/BigDesign-UI-Kit?node-id=0%3A1/duplicate)
* [Adobe Illustrator UI Kit](https://design.bigcommerce.com/bigdesign-ui-kit)

### Blog posts
* [How to Test App Authentication Locally with ngrok](https://medium.com/bigcommerce-developer-blog/how-to-test-app-authentication-locally-with-ngrok-149150bfe4cf)
* [Building a BigCommerce App Using Laravel and React](https://medium.com/bigcommerce-developer-blog/building-a-bigcommerce-app-using-laravel-and-react-711ceceb5006)
* [Big Design Tutorial](https://medium.com/bigcommerce-developer-blog/bigdesign-build-native-looking-uis-with-the-bigcommerce-design-system-fb06a01a24f2)
