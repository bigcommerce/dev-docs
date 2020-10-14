# BigCommerce Apps Quick Start Tutorial

<div class="otp" id="no-index">

### On this page
- [Get started](#get-started)
- [Fork the sandbox](#fork-the-sandbox)
- [Register a draft app](#register-a-draft-app)
- [Configure sandbox environment](#configure-sandbox-environment)
- [Install the app](#install-the-app)
- [Next steps](#next-steps)
- [Resources](#resources)

</div>

In this quick start tutorial, you'll create a [single-click app](https://developer.bigcommerce.com/api-docs/getting-started/building-apps-bigcommerce/types-of-apps) using CodeSandbox, Node.JS, and Express.

## Get started
You'll need a [Developer Portal](https://devtools.bigcommerce.com/) account to register the draft app and a BigCommerce store to test the installation. If you don't already have both, get them now:
1. [Start a free trial](https://www.bigcommerce.com/essentials/free-trial/)
2. [Create a Developer Portal Account](https://devtools.bigcommerce.com/)

## Fork the sandbox
Once you have a [Developer Portal](https://devtools.bigcommerce.com/) account and a store, fork our [express-hello-world-app](https://codesandbox.io/s/express-hello-world-app-fq5t1?file=/app.js). To do so:
1. [Open the Express Hello World App in CodeSandbox](https://codesandbox.io/s/express-hello-world-app-fq5t1?file=/app.js).
1. Click **Fork** in the top right.

## Register a draft app
Next, register a draft app in the [Developer Portal](https://devtools.bigcommerce.com/) using the sandbox's app URL. To do so:
1. [Login to the Developer Portal](https://devtools.bigcommerce.com/)
1. Click **Create an App**
1. Give the app a name
1. Click **Technical**
1. Enter Auth Callback URL. Ex: `https://{{YOUR_FORK}}.sse.codesandbox.io/auth`
1. Enter Load Callback URL. Ex: `https://{{YOUR_FORK}}.sse.codesandbox.io/load`
1. Enter Uninstall Callback URL. Ex: `https://{{YOUR_FORK}}.sse.codesandbox.io/uninstall`
1. Click **Update & Close**
1. Click **View Client ID** -- this is the app's `client_id` and `client_secret`

Keep this tab open for the next step.

## Configure sandbox environment
After registering the app, enter the app's credential's and auth callback into your sandbox's [environment variables](https://codesandbox.io/docs/secrets) (codesandbox.io):
* `callback` => `https://{{YOUR_FORK}}.sse.codesandbox.io/auth`
* `client_id` => the app's client ID from the [Developer Portal](https://devtools.bigcommerce.com/)
* `client_secret` => the app's client secret from the [Developer Portal](https://devtools.bigcommerce.com/)

## Install the app
1. Log in to your store and navigate to **Apps** > **My Apps** > [**My Draft Apps**](https://login.bigcommerce.com/deep-links/manage/marketplace/apps/my-apps/drafts) and install the app.
2. If everything is configured correctly, you should get an `Authorization Successful` message.
3. Navigate back to **My Apps** to see the list of installed apps.
4. Click **Launch** on the draft app to test the `/load` callback.
5. Navigate back to **My Apps** and click **Uninstall** to test the `/uninstall callback`.

Congrats! You've created and installed your first BigCommerce app.

## Next steps
* [Apply to become a BigCommerce partner](https://www.bigcommerce.com/partners/) (required to publish apps to marketplace)
* [Learn more about Building Apps](https://developer.bigcommerce.com/api-docs/getting-started/building-apps-bigcommerce/building-apps)
* [Check out the App Marketplace](https://www.bigcommerce.com/apps/)

## Resources
* [Becoming a Partner](https://developer.bigcommerce.com/api-docs/partner/becoming-a-partner)
* [Types of Apps](https://developer.bigcommerce.com/api-docs/getting-started/building-apps-bigcommerce/types-of-apps)
* [Authenticating BigCommerce's REST APIs](https://developer.bigcommerce.com/api-docs/getting-started/authentication/rest-api-authentication)
* [Building an App](https://developer.bigcommerce.com/api-docs/getting-started/building-apps-bigcommerce/building-apps)
* [App Store Approval Requirements](https://developer.bigcommerce.com/api-docs/partner/app-store-approval-requirements)
