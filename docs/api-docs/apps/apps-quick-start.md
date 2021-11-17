# BigCommerce Apps Quick Start

<div class="otp" id="no-index">

### On this page
- [Prerequisites](#prerequisites)
- [Get started](#get-started)
- [Add and start ngrok](#add-and-start-ngrok)
- [Register a draft app](#register-a-draft-app)
- [Configure sandbox environment](#confige-sandbox-environment)
- [Install the app](#install-the-app)
- [Next steps](#next-steps)
- [Resources](#resources)

</div>

In this quick start tutorial, you will create a [single-click app](https://developer.bigcommerce.com/api-docs/getting-started/building-apps-bigcommerce/types-of-apps) using [Node.js](https://nodejs.org/en/), [React](https://www.javascript.com/), [Next.js](https://nextjs.org/), and [BigDesign](https://developer.bigcommerce.com/big-design/). 

## Prerequisites

To successfully complete this tutorial, you will need the following:

* [Store / Dev Sandbox](https://www.bigcommerce.com/essentials/free-trial/) (required to develop and test apps)
* [Developer Portal Account](https://devtools.bigcommerce.com/) (required to register apps)
* Experience using [npm](https://www.npmjs.com/)
* Node.js version 10.13+

## Get started

1. Start by forking the [sample-app-nodejs](https://github.com/bigcommerce/sample-app-nodejs) repository.
2. Navigate to the root directory of your project and install npm packages.

```shell
npm install
```

## Add and start ngrok

You will need a publicly accessible URL to connect your sample app to BigCommerce. To add network access while in the development phase, you can use [ngrok](https://ngrok.com/docs), a free tool that lets you expose local servers like `localhost:3000` to the public internet over secure tunnels.

1. In a new terminal window, install [ngrok](https://www.npmjs.com/package/ngrok#usage).

```shell
npm install ngrok -g
```

2. Expose the web server on port 3000 to the internet.

```shell
ngrok http 3000
```

## Register a draft app

Next, register a draft app in the [Developer Portal](https://devtools.bigcommerce.com/) using the sandbox's app URL. To do so:
1. [Login to the Developer Portal](https://devtools.bigcommerce.com/).
2. Click **Create an app**.
3. Give the app a name.
4. Click **Technical**.
5. Enter Auth Callback URL as `https://{ngrok_id}.ngrok.io/api/auth`. For example, `https://12345.ngrok.io/api/auth`. You can get the `ngrok_id` from the terminal that is running `ngrok http 3000`.
6. Enter Load Callback URL as `https://{ngrok_id}.ngrok.io/api/load`.
7. Enter Uninstall Callback URL as `https://{ngrok_id}.ngrok.io/api/uninstall`.
8. Because you will be modifying the Products API resource, set the Products OAuth scope to **MODIFY**. To learn more about the available OAuth scopes, see [OAuth scopes](https://developer.bigcommerce.com/api-docs/getting-started/authentication/rest-api-authentication#oauth-scopes).
9. Click **Update & Close**.
10. Click **View Client ID** -- this is the app's client ID and client secret.

Keep this tab open for the next step.

## Configure sandbox environment

After registering the app, enter the app's credentials and auth callback into your sandbox's [environment variables](https://codesandbox.io/docs/secrets) (codesandbox.io).

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> ### Note
> If deploying on Heroku, skip the `.env` setup. Instead, enter `env` variables in the Heroku App Dashboard under **Settings** > **Config Vars**.

</div>
</div>
</div>

1. Create an `.env` file in the root directory of your app.

2. Copy the contents of `.env-sample` to `.env`.

```shell

# Get the Client ID and Secret from the Developer Portal
CLIENT_ID={app client id}
CLIENT_SECRET={app secret}

AUTH_CALLBACK=https://{ngrok_id}.ngrok.io/api/auth

# Replace jwt key with a 32+ random character secret
JWT_KEY={SECRET}

# Specify the type of database
DB_TYPE=firebase

# If using firebase, enter your config here
FIRE_API_KEY={firebase key}
FIRE_DOMAIN={firebase domain}
FIRE_PROJECT_ID={firebase project id}

# If using mysql, enter your config here
MYSQL_HOST={mysql host}
MYSQL_DATABASE={mysql database name}
MYSQL_USERNAME={mysql username}
MYSQL_PASSWORD={mysql password}
MYSQL_PORT={mysql port *optional*}
```

[See code in GitHub](https://github.com/bigcommerce/sample-app-nodejs/blob/main/.env-sample)

3. Replace the `CLIENT_ID` and `CLIENT_SECRET` with the app's client ID and client secret from the [Developer Portal](https://devtools.bigcommerce.com/).

4. Update the `AUTH_CALLBACK` with the `ngrok_id`. You can get the `ngrok_id` from the terminal that is running `ngrok http 3000`. 

5. Enter a JSON Web Token (**JWT**) secret. To learn more about JWT, see the [Internet Engineering Task Force documentation](https://datatracker.ietf.org/doc/html/rfc7519).

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> ### Note
> JWT key should be at least 32 random characters (256 bits) for HS256.

</div>
</div>
</div>

6. Specify `DB_TYPE`:
* If using Firebase, enter your Firebase config keys. For information on how to set up Cloud Firestore, see [Firebase quick start](https://firebase.google.com/docs/firestore/quickstart). 
* If using MySQL, enter your MySQL database config keys (host, database, user/pass and optionally port).
* If using Heroku with ClearDB, the database should create the necessary Config Var, namely, `CLEARDB_DATABASE_URL`.

## Start dev environment

In a separate terminal from `ngrok`, start your dev environment.

```shell
npm run dev
```
<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> ### Note
> If `ngrok` stops working or your `ngrok` session expires, restart the tunnel to get the new `ngrok_id` and update the callback URLs in the Developer Portal and the `AUTH_CALLBACK` in the `.env` file.

</div>
</div>
</div>

## Install the app
1. Log into your store and navigate to **Apps** > **My Apps** > [**My Draft Apps**](https://login.bigcommerce.com/deep-links/manage/marketplace/apps/my-apps/drafts) and install the app.
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

* [App Store Approval Requirements](https://developer.bigcommerce.com/api-docs/partner/app-store-approval-requirements)
* [Authenticating BigCommerce's REST APIs](https://developer.bigcommerce.com/api-docs/getting-started/authentication/rest-api-authentication)
* [Becoming a Partner](https://developer.bigcommerce.com/api-docs/partner/becoming-a-partner)
* [Testing locally with ngrok](https://developer.bigcommerce.com/api-docs/apps/guide/development#testing-locally-with-ngrok)
* [Types of Apps](https://developer.bigcommerce.com/api-docs/getting-started/building-apps-bigcommerce/types-of-apps)