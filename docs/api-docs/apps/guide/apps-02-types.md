# Types of Apps



The first step when developing an app is deciding which type of app to develop. In addition to the authentication method, apps can differ by [visibility](#visibility). 

## Installation and authentication method

All BigCommerce apps use OAuth-based API Accounts. Each request to any of our APIs must contain an `X-Auth-Token` header with a BigCommerce-generated bearer token as its value. When a token is marked invalid, BigCommerce can use the account's client ID and client secret to generate a fresh token. However, apps can implement OAuth in two main ways. [Single-click](#single-click) apps use authorization code grants to request bearer tokens. [Manually configured connector apps](#connector) require the installing merchant to define an API Account valid for their store alone, and manage their own bearer tokens. 

For security, transparency, and ease of use by non-developer merchants, **we strongly recommend that you write only single-click apps**. If your use case requires merchants to work with their own API Accounts or encourages them to work extensively with third-party accounts outside the store control panel, the best practice is to write a [single-click wrapper app](#single-click-wrapper) to manage the connection.

### Single-click

Single-click apps install in a few clicks and provide a GUI front end embedded in the control panel with which merchants can interact. They use [OAuth 2.0 authorization code grants](https://oauth.net/2/grant-types/authorization-code/) to request and set bearer tokens. Each single-click app generates bearer tokens using a single API Account that belongs to the developer, and issues one unique token to each store that installs it. Merchants install new single-click apps in one of two ways: either by clicking through from the app's listing in the [Apps Marketplace](), or by navigating to the app's direct [installation URL]().

![Install an app from the marketplace](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/apps-02-types-01.png "Install an app from the marketplace")

[Learn more about the installation process for single-click apps](https://developer.bigcommerce.com/api-docs/apps/guide/auth).

### Connector
True connector apps will not show up anywhere in the merchant's store control panel. Connector apps use [store-only API credentials](/api-docs/getting-started/authentication/rest-api-authentication#store-api-accounts) that the merchant manually creates in their store control panel's **Advanced Settings** **>** **API Accounts** view. The merchant then enters those API credentials when they configure the connector app and manually manages the app's access tokens. The merchant is responsible for revoking or changing the app's access when they stop using it, or it requests a change in the scope of its permissions. Although connector apps may seem like good solutions for the following use cases, we recommend that you handle them with a [single-click wrapper app](#single-click-wrapper) instead: 

- Integrations with OAuth scopes that vary from store to store
- Integrations that do not have user settings
- Direct connections to legacy third-party apps that cannot be modified to manage OAuth tokens with authorization code grants

### Single-click wrapper

A single-click wrapper app brings the discoverability and transparent merchant user experience of a single-click app to the use cases for a connector app. They install, load, and behave just like traditional single-click apps. The difference is that their functionality complements and enables the work of a related connector app. If you choose to implement your app's core functionality with merchants' manually created API accounts, use a single-click wrapper to remind merchants they're using your connector and keep them informed about the status of their connection.  Single-click wrapper apps can add value in the following ways:

- They can list a connector app's potential OAuth scopes and describe the benefits of enabling each one
- They can remind the merchant that they have enabled your integration and describe what it does
- They can connect the merchant with troubleshooting resources and contact information
- They can display details of the merchant's subscription to the connector app's services
- They can describe how to reauthorize the related connector app or modify the scope of the store API account that it requires
- They can manage user accounts for a third-party service 


## Visibility
There are three visibility options for apps: **Draft**, **Unlisted**, and **Public**.

| Visibility | Description | Use Cases |
| --- | --- | --- |
| Draft | Apps registered in the [Developer Portal](https://devtools.bigcommerce.com/) but never submitted for approval | <li>Installing on stores owned by the same email address as the [Developer Portal](https://devtools.bigcommerce.com/auth/bigcommerce) account email</li><li>Beta testing before publishing to the [App Marketplace](https://www.bigcommerce.com/apps/)</li> |
| Unlisted | Apps submitted and approved but not listed on the [App Marketplace](https://www.bigcommerce.com/apps/) | <li>Installing on stores not owned by same email address as the [Developer Portal](https://devtools.bigcommerce.com/auth/bigcommerce) account email</li><li>Beta testing before publishing to the [App Marketplace](https://www.bigcommerce.com/apps/) |
| Public | Apps submitted, approved, and listed on the [App Marketplace](https://www.bigcommerce.com/apps/) | <li>Making apps visible and installable on all stores</li><li>Making apps sellable on the [App Marketplace](https://www.bigcommerce.com/apps/) |

<!-- theme: info -->
> #### Note
> * Only approved [partners](https://www.bigcommerce.com/partners/) can create unlisted apps.
> * To have an app unlisted, contact <a href="mailto:appstore@bigcommerce.com">appstore@bigcommerce.com</a>.


## Control panel locations

## Access type

## Next step
* [Next: Begin app development](https://developer.bigcommerce.com/api-docs/apps/guide/development)
* [Previous: Introduction](https://developer.bigcommerce.com/api-docs/apps/guide/intro)

## Resources

### Related articles
* [Building Apps Quick Start](/api-docs/apps/quick-start)

### Sample apps
* [Node / React / Next.js](https://github.com/bigcommerce/sample-app-nodejs) with [quick start tutorial](https://developer.bigcommerce.com/api-docs/apps/quick-start)
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
* [BigDesign Tutorial](https://medium.com/bigcommerce-developer-blog/bigdesign-build-native-looking-uis-with-the-bigcommerce-design-system-fb06a01a24f2)
