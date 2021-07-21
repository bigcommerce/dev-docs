[Step 1: Set up your local environment](../docs/Step-1-Set-up-your-local-environment.md)

# Step 2: Connect Your App to BigCommerce

In this step, you will connect your app to the BigCommerce ecosystem embedding it into **Draft Apps**.

## Install node-bigcommerce

To authenticate and use your app with the BigCommerce API, install the [node-bigcommerce](https://www.npmjs.com/package/node-bigcommerce) node module.

```shell
npm install node-bigcommerce
```

## Setup the auth lib page

1. In the root directory of your app, create a `lib` folder.

2. In the `lib` folder, create an `auth.ts` file.

3. Open the `auth.ts` file and add the `BigCommerce` import at the top of the file.

```js
import * as BigCommerce from 'node-bigcommerce';
```

4. Create a BigCommerce instance required as part of the authorization step when first installing the application.

```js
// Create BigCommerce instance
// https://github.com/getconversio/node-bigcommerce
const bigcommerce = new BigCommerce({
    logLevel: 'info',
    clientId: process.env.CLIENT_ID,
    secret: process.env.CLIENT_SECRET,
    callback: process.env.AUTH_CALLBACK,
    responseType: 'json',
    headers: { 'Accept-Encoding': '*' },
    apiVersion: 'v3'
});

const bigcommerceSigned = new BigCommerce({
    secret: process.env.CLIENT_SECRET,
    responseType: 'json'
});

interface QueryParams {
    [key: string]: string;
}
```

The `bigcommerceSigned` function will be called when loading or uninstalling the application.

5. Export the `getBCAuth` function.

```js
export function getBCAuth(query: QueryParams) {
    return bigcommerce.authorize(query);
}
```

You will use the `authorize` method for the `/auth` API endpoint which gets called when you install or update the app. The `authorize` method will retrieve your permanent access token and return it in the `data` object. 

6. Export the `getBCVerify` function.

```js
export function getBCVerify({ signed_payload }: QueryParams) {
    return bigcommerceSigned.verify(signed_payload);
}
```

The `verify` method employs the `signed_payload` query parameter to authenticate requests. You will use the `verify` method for both `/load` and `/uninstall` API endpoints. To learn more about the OAuth flow, see [Single-Click App OAuth Flow](https://developer.bigcommerce.com/api-docs/apps/guide/auth).

[View code in GitHub](https://github.com/bigcommerce/sample-app-nodejs/blob/step-2-connect-app-to-bc/lib/auth.ts)

## Add API endpoints

Next.js maps all APIs that are part of the Next.js application to the `/api/*` route. For example, `/pages/api/load` will be routed to `https://your_app_address/api/load`. You can take advantage of it by creating a sub-directory within the `pages` folder called `api`. This will signal Next.js to treat files within `/pages/api` as API endpoints. Instead of looking for React components, Next.js will look for and handle API routes. Next.js will also automatically handle routing for files placed within `/pages/api`. To learn more about Next.JS API routes, see [API Routes](https://nextjs.org/docs/api-routes/introduction). 

1. In the `pages` folder, create an `api` folder.

2. Open the api folder and add the following files: `auth.ts`, `load.ts`, and `uninstall.ts`.

3. Open the `auth.ts` file and add the logic to authorize the app.

```js
import { NextApiRequest, NextApiResponse } from 'next';
import { getBCAuth } from '../../lib/auth';

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
    try {
        // First, authorize the application
        // req.query: query param passed from the Control Panel to your app
        await getBCAuth(req.query);
        // Once the app has been authorized, redirect to the homepage (/pages/index.tsx)
        res.redirect(302, '/');
    } catch (error) {
        const { message, response } = error;
        res.status(response?.status || 500).json({ message });
    }
}
```

[View code in GitHub](https://github.com/bigcommerce/sample-app-nodejs/blob/step-2-connect-app-to-bc/pages/api/auth.ts)

The `/auth` endpoint gets called when installing the app. Launching (loading) or uninstalling the app will not call the `/auth` endpoint.

4. Open the `load.ts` file and add the logic to log the user in when the app calls the `/load` endpoint (when launching the app).

```js
import { NextApiRequest, NextApiResponse } from 'next';
import { getBCVerify } from '../../lib/auth';

export default async function load(req: NextApiRequest, res: NextApiResponse) {
    try {
        await getBCVerify(req.query);

        res.redirect(302, '/');
    } catch (error) {
        const { message, response } = error;
        res.status(response?.status || 500).json({ message });
    }
}
```

[View code in GitHub](https://github.com/bigcommerce/sample-app-nodejs/blob/step-2-connect-app-to-bc/pages/api/load.ts)

5. Open the `uninstall.ts` file and add the logic to remove a user who has uninstalled your application from their BigCommerce account.

```js
import { NextApiRequest, NextApiResponse } from 'next';
import { getBCVerify } from '../../lib/auth';

export default async function uninstall(req: NextApiRequest, res: NextApiResponse) {
    try {
        await getBCVerify(req.query);

        res.status(200).end();
    } catch (error) {
        const { message, response } = error;
        res.status(response?.status || 500).json(message);
    }
}
```

[View code in GitHub](https://github.com/bigcommerce/sample-app-nodejs/blob/step-2-connect-app-to-bc/pages/api/uninstall.ts)

## Create an HTTPS tunnel

To connect your sample app to BigCommerce, you need a publicly accessible URL. To add network access while still in the development phase, you will use [ngrok](https://ngrok.com/docs), a free tool that lets you expose local servers like `localhost:3000` to the public internet over secure tunnels.

1. Open a new terminal window and install [ngrok](https://www.npmjs.com/package/ngrok#usage).

```shell
npm install ngrok -g
```

2. Expose the web server on port 3000 to the Internet.

```shell
ngrok http 3000
```

3. Your terminal should display a message similar to the following:

![https tunnel](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Sample_app/nextjs-app-02.png "https tunnel")

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> ### Note
> When installed as an npm package, ngrok sessions expire every two hours. To prevent your session from timing out, you can create a ngrok account and download ngrok for your machine. To learn more, see [Download & setup ngrok](https://ngrok.com/download).

</div>
</div>
</div>

## Register the draft app

To register your draft app, you need a BigCommerce store. If you do not have a BigCommerce store, visit the [BigCommerce Pricing](https://www.bigcommerce.com/essentials/pricing/) page to start a free trial.

1. In your [Developer Portal](https://devtools.bigcommerce.com/my/apps) account, click  **Create an app**.

![Create an app](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Sample_app/nextjs-app-03.png "Create an app")

2. Enter app details at the prompts. Because you are building a sample app, you can name it anything you want. Production-level apps should meet the general requirements outlined in [Approval Requirements](https://developer.bigcommerce.com/api-docs/apps/guide/requirements). 

3. Click on section 2: **Technical**. 

4. Under **App Features**, select **STORE OWNER** for Multiple Users and **SINGLE-CLICK** for App Type.

5. To fill out Callback URLs, retrieve the public HTTPS URL of your ngrok tunnel.

![HTTPS URL](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Sample_app/nextjs-app-05.png "HTTPS URL")

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">

> ### Warning
> Avoid using the HTTP URL to prevent security policy errors.

</div>
</div>
</div>

* For Auth Callback URL, enter the URL of your app followed by `/api/auth`.
* For Load Callback URL, enter the URL of your app followed by `/api/load`.
* For Uninstall Callback URL, enter the URL of your app followed by `/api/uninstall`.

![Callback url](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Sample_app/nextjs-app-06.png "Callback url")

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> ### Note
> Next.js maps all APIs that are part of the Next.js application to the `/api/*` route. To learn more about Next.js API routes, see [API Routes](https://nextjs.org/docs/api-routes/introduction).

</div>
</div>
</div>

6. Because your sample app will be modifying the Products API resource, you need to set the Products OAuth scope to **MODIFY**. To learn more about the available OAuth scopes, see [OAuth scopes](https://developer.bigcommerce.com/api-docs/getting-started/authentication/rest-api-authentication#oauth-scopes).

![OAuth scopes](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Sample_app/nextjs-app-07.png "OAuth Scopes")

7. Click **Update & Close**.

8. Select **Confirm Update**.

You should see your app listed under **My Apps** in your **Developer Portal** account. 

## Add your Client ID and Client Secret Key

It is best practice to declare environment variables in the environment file named `.env`. You will use the `.env` file to store your Client ID and Client Secret Key. 

Next.js comes pre-equipped to handle environment variables. It loads environment variables from `.env.local` into `process.env`, allowing you to use them in Next.js data fetching and API routes. To learn more, see [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables).

1. Create an `.env` file in the root directory of your app.

2. Add the app's credentials and auth callback placeholders to the `.env` file.

```
CLIENT_ID={app client id}
CLIENT_SECRET={app secret}

AUTH_CALLBACK=https://{ngrok_id}.ngrok.io/api/auth
```
<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">

> ### Warning
> Never share sensitive data such as API keys and passwords publicly.

</div>
</div>
</div>

3. Navigate to [Developer Portal > My Apps](https://devtools.bigcommerce.com/my/apps). Locate your app and click **View Client ID** to retrieve your app's credentials.
4. Copy the app's Client ID and Client Secret and paste them into the `.env` file.
5. Update `AUTH_CALLBACK` in `.env` with your `ngrok_id`. Because `env` variables are loaded on build, make sure to save your changes. 
6. Switch to the terminal window where the dev server is currently running and restart the dev environment. 

```shell	
npm run dev
```

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> ### Note
> If ngrok stops working or your ngrok session expires, restart the tunnel to get the new `ngrok_id` and update the callback URLs in the Developer Portal and the `AUTH_CALLBACK` in the `.env` file.

</div>
</div>
</div>

## Install and launch the app

1. Log into your BigCommerce store and navigate to [**Apps** > **My Apps** > **My Draft Apps**](https://login.bigcommerce.com/deep-links/manage/marketplace/apps/my-apps/drafts). You should see your new app displayed under **My Draft Apps**.

![My draft apps](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Sample_app/nextjs-app-08.png "My draft apps")

2. Click the app's name. 

3. Click **Install**.

4. Click **Confirm**. 

You should see your app embedded in the BigCommerce platform.

![Embedded app](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Sample_app/nextjs-app-09.png "Embedded app")

[Next: Integrate the BigCommerce API and Add a Database](../docs/Step-3-Integrate-the-BigCommerce-API.md)