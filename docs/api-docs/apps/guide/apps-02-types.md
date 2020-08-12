# Types of Apps

<div class="otp" id="no-index">

### On This Page
- [Single-Click](#single-click)

- [Connector](#connector)
- [Visibility](#visibility)
- [Next Steps](#next-steps)
- [Resources](#resources)

</div>

The first step when developing an app is deciding which type of app to develop. The two types of apps, single-click and connector, are defined by the method of authentication. [Single-click](#single-click) apps use an OAuth Authorization Code Grant flow. [Connector apps](#connector) require store owners to manually generate and configure store API credentials. In addition to the authentication method, apps can also differ by [visibility](#visibility).


## Single-Click

Single-click apps are the recommended app type. They use [OAuth 2.0 Authorization Code Grant](https://oauth.net/2/grant-types/authorization-code/) (oauth2.net) flow. Users initiate installation by clicking **Install**:

![Install App](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/apps-02-types-01.png "Install App")

The app requests the user to grant permissions associated to scopes configured for the app in [DevTools](https://devtools.bigcommerce.com/my/apps):

![App Permissions](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/apps-02-types-02.png "App Permissions")

Once granted, the app can request a permanent `access_token` for making REST API requests on the user's behalf.

## Connector
Connector apps use manual OAuth token creation instead of the single-click app flow. Store owners generate [store API credentials](https://developer.bigcommerce.com/api-docs/getting-started/authentication/rest-api-authentication#revoking-store-api-credentials) manually and enter them into the app's configuration. While single-click apps are recommended, the following use cases might not be compatible:

- Customized integrations that vary per store.
- Integrations that do not provide any content for an iFrame.
- Apps that do not provide web services for OAuth exchange (ex: native order sync app).

## Visibility
There are three visibility options for apps: **Draft**, **Unlisted**, and **Public**.


* **Draft**
  * **Description**: apps registered in [Dev Tools](https://devtools.bigcommerce.com/) but never submitted for approval
  * **Use Cases:**

    * installing on stores owned by the same email address as [DevTools](https://devtools.bigcommerce.com/auth/bigcommerce) account email
    * beta testing before publishing to marketplace
* **Unlisted**
  * **Description:** apps submitted and approved apps but not listed on [app marketplace](https://www.bigcommerce.com/apps/).

  * **Use Cases:**
    * installing on stores not owned by same email address as [**DevTools**](https://devtools.bigcommerce.com/auth/bigcommerce) account email
    * beta testing before publishing to marketplace
* **Public**
  * **Description:** apps submitted, approved, and listed on the marketplace

  * **Use Cases:**
    * making apps visible and installable on all stores
    * making $$$

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

<!-- theme: info -->

### Note
> * Only approved [partners](https://www.bigcommerce.com/partners/) can create unlisted apps.
> * To have an app unlisted, contact <a href="mailto:appstore@bigcommerce.com">appstore@bigcommerce.com</a>.

</div>
</div>
</div>

## Next Steps
[Begin App Development](https://developer.bigcommerce.com/api-docs/apps/guide/development)

## Resources

### Related Articles
* [Building Apps Quick Start](https://developer.bigcommerce.com/api-docs/apps/quick-start)

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
* [How to Test App Authentication Locally with ngrok](https://medium.com/bigcommerce-developer-blog/how-to-test-app-authentication-locally-with-ngrok-149150bfe4cf)
* [Building a BigCommerce App Using Laravel and React](https://medium.com/bigcommerce-developer-blog/building-a-bigcommerce-app-using-laravel-and-react-711ceceb5006)
* [Big Design Tutorial](https://medium.com/bigcommerce-developer-blog/bigdesign-build-native-looking-uis-with-the-bigcommerce-design-system-fb06a01a24f2)
