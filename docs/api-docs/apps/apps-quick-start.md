# BigCommerce Apps Quick Start

In this quick start tutorial, you will create a [single-click app](https://developer.bigcommerce.com/api-docs/getting-started/building-apps-bigcommerce/types-of-apps) using [Node.js](https://nodejs.org/en/), [React](https://www.reactjs.org/), [Next.js](https://nextjs.org/), and [BigDesign](https://developer.bigcommerce.com/big-design/). 

## Prerequisites

To successfully complete this tutorial, you will need the following:

* [BigCommerce sandbox store](https://developer.bigcommerce.com/api-docs/partner/getting-started/create-a-sandbox-store) (required to develop and test apps)
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

You will need a publicly accessible URL to connect the draft app to BigCommerce. To add network access while in the development phase, you can use [ngrok](https://ngrok.com/docs), a free tool that lets you expose local servers like `localhost:3000` to the public internet over secure tunnels.

1. In a new terminal window, install [ngrok](https://www.npmjs.com/package/ngrok#usage).

```shell
npm install ngrok -g
```

2. Expose the web server on port 3000 to the internet.

```shell
ngrok http 3000
```

## Register the app

Next, register the draft app in the [Developer Portal](https://devtools.bigcommerce.com/) using the following steps:

1. [Sign in to the Developer Portal](https://devtools.bigcommerce.com/).
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

## Configure environment variables

After registering the draft app, add its credentials and auth callback URL to your project's environment variables file.

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> **Note**
> If deploying on Heroku, skip the `.env` setup. Instead, enter `env` variables in the Heroku App Dashboard under **Settings** > **Config Vars**.

</div>
</div>
</div>

1. Create an `.env` file in the root directory of your project.

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

> **Note**
> JWT key should be at least 32 random characters (256 bits) for HS256.

</div>
</div>
</div>

6. Specify `DB_TYPE`:
* If using Firebase, enter your project's Firebase config keys. For information on how to set up Cloud Firestore, see [Firebase quick start](https://firebase.google.com/docs/firestore/quickstart). 
* If using MySQL, enter your project's MySQL database config keys (host, database, user/pass and optionally port).
* If using Heroku with ClearDB, the database should create the necessary Config Var, namely, `CLEARDB_DATABASE_URL`.

## Start dev environment

In a separate terminal from `ngrok`, start the app's dev environment.

```shell
npm run dev
```
<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> **Note**
> Although you can use the `ngrok` npm package without creating an account, any unauthenticated tunnels you create will expire after two hours. For the best development experience, [create a free ngrok account](https://dashboard.ngrok.com/signup), [find your ngrok authtoken](https://dashboard.ngrok.com/get-started/your-authtoken), and [add the authtoken](https://ngrok.com/docs#getting-started-authtoken) to your global `ngrok` configuration.

</div>
</div>
</div>

## Install the app

Finally, install the draft app on any store registered to the same email as your [Developer Portal](https://devtools.bigcommerce.com/my/apps) account using the following steps: 

1. Sign in to the store, navigate to **Apps** > **My Apps** > [**My Draft Apps**](https://login.bigcommerce.com/deep-links/manage/marketplace/apps/my-apps/drafts), and install the app.
2. If everything is configured correctly, you should get an `Authorization Successful` message.
3. Navigate back to **My Apps** to see the list of installed apps.
4. Click **Launch** on the draft app to test the `/load` callback.
5. Navigate back to **My Apps** and click **Uninstall** to test the `/uninstall callback`.

Congrats! You've created and installed a BigCommerce draft app.

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> Interested in sharing or selling your app? Learn more about [becoming a BigCommerce partner](https://www.bigcommerce.com/partners/become-a-partner) and [getting your app approved](https://developer.bigcommerce.com/api-docs/partner/app-store-approval-requirements).

</div>
</div>
</div>

## Next steps
* [Learn more about building apps](https://developer.bigcommerce.com/api-docs/getting-started/building-apps-bigcommerce/building-apps)
* [Apply to become a BigCommerce partner](https://www.bigcommerce.com/partners/become-a-partner)
* [Check out the BC App Marketplace approval requirements](https://developer.bigcommerce.com/api-docs/partner/app-store-approval-requirements)

## Resources
* [BC App Marketplace](https://www.bigcommerce.com/apps/)
* [Authenticating BigCommerce's REST APIs](https://developer.bigcommerce.com/api-docs/getting-started/authentication/rest-api-authentication)
* [Testing locally with ngrok](https://developer.bigcommerce.com/api-docs/apps/guide/development#testing-locally-with-ngrok)
* [Types of apps](https://developer.bigcommerce.com/api-docs/getting-started/building-apps-bigcommerce/types-of-apps)
* [Becoming a partner](https://developer.bigcommerce.com/api-docs/partner/becoming-a-partner)
