# Step 2: Connect Your App to BigCommerce



In this step, you connect your app to the BigCommerce ecosystem embedding it into **Draft Apps**.

## Install node-bigcommerce

To authenticate and use your app with the BigCommerce API, install BigCommerce's in-house [node-bigcommerce module (GitHub)](https://github.com/bigcommerce/node-bigcommerce).

```shell title="Install node client"
npm install github:bigcommerce/node-bigcommerce
```

<!-- theme: info -->
> #### View tested package versions
> You can view a list of all the tested package versions in the [package.json file on the Step 2 branch](https://github.com/bigcommerce/sample-app-nodejs/blob/step-2-connect-app-to-bc/package.json) of this sample app's repo.

## Setup the auth lib page

1. In the root directory of your app, create a `lib` folder.

2. In the `lib` folder, create an `auth.ts` file.

3. Open the `auth.ts` file and add the `BigCommerce` import at the top of the file.

```ts title="Add imports auth.ts" lineNumbers
import * as BigCommerce from 'node-bigcommerce';
```

4. Create a BigCommerce instance required as part of the authorization step when first installing the application.

```ts title="Create BC instance auth.ts" lineNumbers
// Create BigCommerce instance
// https://github.com/bigcommerce/node-bigcommerce/
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

The `bigcommerceSigned` function is called when loading or uninstalling the application.

5. Export the `getBCAuth` function.

```ts title="Export getBCAuth auth.ts" lineNumbers
export function getBCAuth(query: QueryParams) {
    return bigcommerce.authorize(query);
}
```

You use the `authorize` method for the `/auth` API endpoint which gets called when you install or update the app. The `authorize` method retrieves your permanent access token and returns it in the `data` object. 

6. Export the `getBCVerify` function.

```ts title="Exports getBCVerify auth.ts" lineNumbers
export function getBCVerify({ signed_payload_jwt }: QueryParams) {
    return bigcommerceSigned.verifyJWT(signed_payload_jwt);
}
```

The `verifyJWT` method employs the `signed_payload_jwt` query parameter to authenticate requests. You use the `verifyJWT` method for both `/load` and `/uninstall` API endpoints. To learn more about the OAuth flow, see [Single-Click App OAuth Flow](/api-docs/apps/guide/auth).

You can [view auth.ts (GitHub)](https://github.com/bigcommerce/sample-app-nodejs/blob/step-2-connect-app-to-bc/lib/auth.ts).

## Add API endpoints

Next.js maps all APIs that are part of the Next.js application to the `/api/*` route. You can take advantage of it by creating a sub-directory within the `pages` folder called `api`. This signals Next.js to treat files within `/pages/api` as API endpoints and automatically handle their routing. To learn more about Next.js API routes, see [API Routes](https://nextjs.org/docs/api-routes/introduction).

1. In the `pages` folder, create an `api` folder.

2. Open the `api` folder and add the following files: `auth.ts`, `load.ts`, and `uninstall.ts`.

3. Open the `auth.ts` file and add the logic to authorize the app. You can [view auth.ts (GitHub)](https://github.com/bigcommerce/sample-app-nodejs/blob/step-2-connect-app-to-bc/pages/api/auth.ts).

```ts title="Add logic auth.ts" lineNumbers
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

The `/auth` endpoint gets called when installing the app. Launching (loading) or uninstalling the app will not call the `/auth` endpoint.

4. Open the `load.ts` file and add the logic to sign the user in when the app calls the `/load` endpoint (when launching the app). You can [view load.ts (GitHub)](https://github.com/bigcommerce/sample-app-nodejs/blob/step-2-connect-app-to-bc/pages/api/load.ts).

```ts title="Add logic load.ts" lineNumbers
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

5. Open the `uninstall.ts` file and add the logic to remove a user who has uninstalled the application from their BigCommerce account. You can [view uninstall.ts (GitHub)](https://github.com/bigcommerce/sample-app-nodejs/blob/step-2-connect-app-to-bc/pages/api/uninstall.ts).

```ts title="Add logic uninstall.ts" lineNumbers
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

## Create an HTTPS tunnel

To connect your sample app to BigCommerce, you need a publicly accessible URL. To add network access while still in the development phase, you can use [ngrok](https://ngrok.com/docs), a free tool that lets you expose local servers like `localhost:3000` to the public internet over secure tunnels.

1. Open a new terminal window and install [ngrok](https://www.npmjs.com/package/ngrok#usage).

```shell title="Install ngrok"
npm install ngrok -g
```

2. Expose the web server on port 3000 to the internet.

```shell title="Expose server ngrok"
ngrok http 3000
```

3. Your terminal should display a message similar to the following:

![https tunnel](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Sample_app/nextjs-app-02.png "https tunnel")

<!-- theme: info -->
> #### Ngrok configuration
> Although you can use the `ngrok` npm package without creating an account, any unauthenticated tunnels you create will expire after two hours. For the best development experience, [create a free ngrok account](https://dashboard.ngrok.com/signup), [find your ngrok authtoken](https://dashboard.ngrok.com/get-started/your-authtoken), and [add the authtoken](https://ngrok.com/docs#getting-started-authtoken) to your global `ngrok` configuration.


## Register the draft app

To register an app, you need a BigCommerce store. If you do not have a BigCommerce store, visit the [BigCommerce Pricing](https://www.bigcommerce.com/essentials/pricing/) page to start a free trial.

1. In your [Developer Portal](https://devtools.bigcommerce.com/my/apps) account, click  **Create an app**.

![Create an app](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Sample_app/nextjs-app-03.png "Create an app")

2. Enter app details at the prompts. Because you are building a sample app, you can name it anything you want. Production-level apps should meet the general requirements outlined in [Approval Requirements](/api-docs/apps/guide/requirements). 

3. Click **Technical**. 

4. Under **App Features**, select **STORE OWNER** for Multiple Users and **SINGLE-CLICK** for App Type.

5. To fill out Callback URLs, retrieve the public HTTPS URL of your ngrok tunnel.

![HTTPS URL](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Sample_app/nextjs-app-05.png "HTTPS URL")

<!-- theme: warning -->
> #### Use the secure tunnel
> Avoid using the unsecured HTTP URL to prevent security policy errors.

* For Auth Callback URL, enter the URL of your app followed by `/api/auth`.
* For Load Callback URL, enter the URL of your app followed by `/api/load`.
* For Uninstall Callback URL, enter the URL of your app followed by `/api/uninstall`.

![Callback URL](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Sample_app/nextjs-app-06.png "Callback URL")

<!-- theme: info -->
> #### Next.js route mapping
> Next.js maps all APIs that are part of the Next.js application to the `/api/*` route. To learn more about Next.js API routes, see [API Routes](https://nextjs.org/docs/api-routes/introduction).


6. Because you will be modifying the Products API resource, set the Products OAuth scope to **MODIFY**. To learn more about the available OAuth scopes, see [OAuth scopes](/api-docs/getting-started/authentication/rest-api-authentication#oauth-scopes).

![OAuth scopes](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Sample_app/nextjs-app-07.png "OAuth Scopes")

7. Click **Update & Close**.

8. Select **Confirm Update**.

You should see your app listed under **My Apps** in your **Developer Portal** account. 

## Add your Client ID and Client Secret Key

It is best practice to declare environment variables in the `.env` environment file. You use the `.env` file to store your Client ID and Client Secret Key. 

Next.js comes pre-equipped to handle environment variables. It loads environment variables from `.env.local` into `process.env`, allowing you to use them in Next.js data fetching and API routes. To learn more, see [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables).

1. Create an `.env` file in the root directory of your app.

2. Add the app's credentials and auth callback placeholders to the `.env` file.

```shell title="Initial contents .env"
CLIENT_ID={app client id}
CLIENT_SECRET={app secret}

AUTH_CALLBACK=https://{ngrok_id}.ngrok.io/api/auth
```

<!-- theme: warning -->
> #### Don't commit authentication credentials
> Never share sensitive data such as API keys and passwords publicly. Avoid committing them to your repository.


3. Navigate to [Developer Portal > My Apps](https://devtools.bigcommerce.com/my/apps). Locate your app and click **View Client ID** to retrieve your app's credentials.
4. Copy the app's Client ID and Client Secret and paste them into the `.env` file.
5. Update `AUTH_CALLBACK` in `.env` with your `ngrok_id`. Because `env` variables are loaded on build, make sure to save your changes. 
6. Switch to the terminal window where the dev server is currently running and restart the dev environment. 

```shell title="Restart dev server"
npm run dev
```

<!-- theme: info -->
> #### Ngrok expiration and callbacks
> If ngrok stops working or your ngrok session expires, restart the tunnel to get the new `ngrok_id` and update the callback URLs in the Developer Portal and the `AUTH_CALLBACK` in the `.env` file.


## Install and launch the app

1. Sign in to your BigCommerce store and navigate to [**Apps** > **My Apps** > **My Draft Apps**](https://login.bigcommerce.com/deep-links/manage/marketplace/apps/my-apps/drafts). You should see your new app displayed under **My Draft Apps**.

![My draft apps](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Sample_app/nextjs-app-08.png "My draft apps")

2. Click the app's name. 

3. Click **Install**.

4. Click **Confirm**. 

You should see your app embedded in the BigCommerce platform.

![Embedded app](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Sample_app/nextjs-app-09.png "Embedded app")

[Next: Integrate the BigCommerce API and Add a Database](/api-docs/apps/tutorials/sample-app-nextjs/step-3-integrate)