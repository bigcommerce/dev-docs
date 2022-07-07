# Subscription Foundation

Subscription Foundation delivers an [open source framework](https://github.com/bigcommerce/subscription-foundation) for BigCommerce customers to subscribe to one or more channels. It provides a template for custom subscription billing and invoicing solutions for your business or client. Subscription Foundation includes a default integration with Stripe Billing, which can significantly accelerate your development time. 

Subscription Foundation uses the [Channels toolkit](/api-docs/channels/guide/overview#channels-toolkit) to display the custom subscription channel in the **Channel Manager** of a store's control panel alongside other sales channels. 

## Software requirements 
* [Node.js](https://nodejs.org/en/) 14.17.0
* The [npm](https://www.npmjs.com/) package manager
* A [supported SQL database engine](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-schema/data-sources/), either SQLite or another of your choice

## Configure accounts

<!-- theme: info -->
> #### Account configuration requirements
> * Because there is a [store email address constraint](/api-docs/apps/guide/developer-portal#store-email-address-constraint?source=subscription-foundation) on draft and private apps, you need to make sure that both your sandbox store and your Dev Portal account use the same email address. 
> * We recommend that you use a sandbox store that has the same multi-storefront status as the production store you're developing for. For example, if you're developing for a multi-storefront enabled merchant store, use a multi-storefront sandbox. For information on configuring multi-storefront, see [Multi-Storefront](https://support.bigcommerce.com/s/article/Multi-Storefront?language=en_US).

To configure your accounts, complete the following steps:
1. To develop and test apps, you need a BigCommerce sandbox store. If you don't have one, [Create a Sandbox Store](/api-docs/partner/getting-started/create-a-sandbox-store?source=subscription-foundation).
2. To register apps and create app API accounts, you need a BigCommerce Dev Portal account. If you don't have one, create a [Dev Portal account](https://devtools.bigcommerce.com/?source=subscription-foundation).



## Fork and install the source repository
To fork the repository, complete the following steps:

1. Fork the [subscription-foundation repository (GitHub)](https://github.com/bigcommerce/subscription-foundation) to your GitHub account.
2. Clone your fork to your local development environment.
3. Navigate to your root directory of your cloned repository and install the default packages for your app by running the following command:

```shell title="Install packages"
npm install
```
## Create an HTTPS tunnel

After you successfully install the packages, prepare to expose the app to the internet so you can install it on your sandbox store.

Because you must serve apps over fully-qualified publicly accessible URLs, this guide uses a tool called [ngrok](https://ngrok.com/docs) to open HTTP tunnels that securely expose `localhost` ports to the internet.  

To get started with ngrok, follow the [Create an HTTPS Tunnel](/api-docs/apps/tutorials/sample-app-nextjs/step-2-connect#create-an-https-tunnel) section of the sample app tutorial. If your app does not run on port 3000, replace `3000` with the port of your app server.

<!-- theme: success -->
> #### Make note of your ngrok ID
> After you successfully start ngrok, make sure to note your ngrok ID. You will use it later.


## Create an app profile

As a next step, you need to create a draft app profile to generate app API account credentials.  To develop and test the app, you need to install it on your [sandbox store](#configure-accounts). 

To install your app on your sandbox store, complete the following steps:

1. Sign in to the [Dev Portal](https://devtools.bigcommerce.com/?source=subscription-foundation). Then follow our directions to [create an app](/api-docs/apps/guide/developer-portal#create-an-app?source=subscription-foundation). Enter the following values on the **Technical** tab.

2. In the **Callback URLs** section, supply the following URLs. Replace `{ngrok_id}` with the ngrok ID you noted in [Create an HTTPS tunnel](#create-an-https-tunnel).

| Callback | URL value |
|:---------|:----|
| Auth Callback | `https://{ngrok_id}.ngrok.io/api/auth` |
| Load Callback | `https://{ngrok_id}.ngrok.io/api/load` |
| Uninstall Callback | `https://{ngrok_id}.ngrok.io/api/uninstall` |

3. In the **OAuth scopes** section, add the following scopes:

| UI Name | Permission | Parameter |
|:--------|:-----------|:----------|
| Orders | modify | `store_v2_orders` |
| Order Transactions | modify | `store_v2_transactions` |
| Products | modify | `store_v2_products` |
| Customers | modify | `store_v2_customers` |
| Content | modify | `store_v2_content` |
| Carts | modify | `store_cart` |
| Channel Listings | modify | `store_channel_listings` |
| Channel Settings | modify | `store_channel_settings` |
| Information & Settings | modify | `store_v2_information` |
| Sites & Routes | read-only | `store_sites_read_only` |
| Storefront API Tokens | generate tokens | `store_storefront_api` |

4. On the **App Supported Features** tab, select **MULTI STOREFRONT** to specify this is a multi-storefront enabled app.

5. Click **Update & Close**, then click **Confirm Update** to acknowledge the OAuth scopes you configured.

Make sure to remain signed in to the Dev Portal.

## Configure Stripe

Subscription Foundation uses Stripe Connect so that your app can use one single connection to submit payments to the previously configured Stripe accounts of multiple BigCommerce merchants. See [Stripe Billing](https://support.bigcommerce.com/s/article/Connecting-Stripe-Payment-Gateway?language=en_US#billing) for merchant configuration instructions.

During development, you'll work with two Stripe accounts.

| Account | Description |
|:---------|:----|
| Account One | This account simulates a merchant's pre-existing account |
| Account Two | This account is configured as the app's dedicated Stripe Connect-enabled account. |

<!-- theme: info -->
> #### Multi-tenant functionality
> During installation, the app UI prompts the merchant to enter the keys for their store's Stripe account so that the app can initiate an OAuth authorization code grant flow to link the merchant's Stripe account to the app's Stripe Connect-enabled account.

### Create Stripe accounts

To create a Stripe account, complete the following steps:

1. To create the Stripe account that simulates your merchant's pre-existing Stripe account, [sign up with Stripe](https://dashboard.stripe.com/register). Your app uses this account's client ID to process subscriber payments and manage subscriptions. Make sure to give it a merchant-specific name.

2. Sign in to the [Stripe Dashboard](https://dashboard.stripe.com/).

3. On the [Stripe Dashboard](https://dashboard.stripe.com/), create and configure a second app-specific Stripe account. The app uses this account's client secret to process subscription payments.

   a. On the top left corner of your Stripe Dashboard, click the name of your merchant-specific account. Select **+ New Account** from the drop-down list.

   b. Give the new account a name that clearly identifies it as app-specific to differentiate it from the merchant-specific payment and subscription management account. This guide uses **BigCommerce App** as an example.
   
   ![BigCommerce App](https://storage.googleapis.com/bigcommerce-production-dev-center/images/BigCommerce-app-image.png "The Stripe dashboard's new account dropdown menu")
   
   c. Under **Get started with Stripe**, copy the **Secret key**.
   
<!-- theme: success -->
> #### Make note of the secret key
> Make note of the **secret key** and keep it in a safe location. In a later step, you will use the secret key to update the `STRIPE_SECRET_KEY` environment variable in the `.env` file.


### Enable Stripe Connect for Platforms

**As you complete the following steps, make sure that you are making changes to the app-specific account. To verify, check the top left corner of your Stripe Dashboard for the app account name you chose in step 3b of the preceding section.**

<!-- theme: info -->
> #### Test mode
> You can simulate transactions in test mode to confirm your integration works correctly.

To configure test mode, complete the following steps:

1. On your [Stripe Dashboard](https://dashboard.stripe.com/), click **Connect** to enable [Stripe Connect for Platforms](https://dashboard.stripe.com/test/connect/accounts/overview). 

2. Click **Get started**.

3. Select **Platform or Marketplace**, then click **Continue**.

4. To configure the app-specific account's Stripe Connect settings, go to [**Settings > Connect settings**](https://dashboard.stripe.com/test/settings/connect) on your Stripe Dashboard. 

5. Under **Integration** do the following:
   
   a. Copy the **Test mode client ID**.
   
<!-- theme: success -->
> #### Make note of the Test mode client ID 
> Make sure to store it in a safe place. In a later step, you will set the client ID as the value of the `NEXT_PUBLIC_STRIPE_CLIENT_ID` variable in the `.env` file.

   b. Set **OAuth settings** to **OAuth for Standard accounts**. 

   c. Click **Redirects**, then click **+ Add URI**. Add the following callback URI for your app:
   
   ```http title="Your app's Stripe callback URI"
   https://{ngrok_id}.ngrok.io/stripe/callback
   ```

## Configure the BigCommerce store

After you successfully configure for test mode, configure your BigCommerce sandbox store in the store control panel.

To configure the store to make subscription charges, complete the following steps:

1. In the BigCommerce store control panel, navigate to the [Stripe settings section](https://login.bigcommerce.com/deep-links/settings/payment/stripev3) and make sure that **Test Mode** is set to **Yes**.

![stripe-settings](https://storage.googleapis.com/bigcommerce-production-dev-center/images/stripe-settings.png)

2. To start a subscription, shoppers must check out using a stored payment instrument. To enable this functionality, go to [Stripe settings](https://login.bigcommerce.com/deep-links/settings/payment/stripev3), locate the **Stored Credit Cards** section, and toggle on **Enable stored credit cards with Stripe**. 

![stored-credit-cards](https://storage.googleapis.com/bigcommerce-production-dev-center/images/stored-credit-cards.png)

3. If you don't have a stored card to charge, go to your BigCommerce storefront and add some products to your cart. Begin the checkout sequence and either sign in as a shopper or create a new account. During the payments step, select **Save this card for later**.

## Declare environment variables

<!-- theme: info -->
> #### Note on naming conventions
> In some places, this guide and app template code refer to a Stripe API account's public key as a **client ID**, and its secret key as a **client secret**.

To declare environment variables, run the following commands in your terminal:

1. Create a `.env` file in the root directory of your project.

2. Copy the contents of `.env.sample` to `.env` with the following command:

```shell title="Copy .env.sample contents"
cp .env.sample .env
```
Open the `.env` file you just created and update the following environment variables:

| Environment variable | Description | Reference location |
|:---------------------|:------------|:-------------------|
| `NEXT_PUBLIC_APP_URL` | A public-facing URL that can receive webhooks. | On this page, see [Create an HTTPS tunnel](#create-an-https-tunnel); see also [the HTTPS tunnel section of the Sample App Tutorial](/api-docs/apps/tutorials/sample-app-nextjs/step-2-connect#create-an-https-tunnel?source=subscription-foundation)  |
| `NEXT_PUBLIC_APP_ID` | The app's ID | [Find an App's ID](/api-docs/apps/tutorials/id#find-in-developer-portal?source=subscription-foundation) |
| `BC_APP_CLIENT_ID` | The app API account's client ID | [View App Credentials](/api-docs/apps/guide/developer-portal#view-credentials?source=subscription-foundation) |
| `BC_APP_SECRET` | The app API account's client secret | [View App Credentials](/api-docs/apps/guide/developer-portal#view-credentials?source=subscription-foundation) |
| `NEXT_PUBLIC_STRIPE_CLIENT_ID` | The app-specific Stripe Connect API account client ID | see [Enable Stripe Connect for Platforms](#enable-stripe-connect-for-platforms) |
| `STRIPE_SECRET_KEY` | The app-specific Stripe Connect API account client secret | see [Create Stripe Accounts](#create-stripe-accounts) |


## Run migration and start the server

<!-- theme: info -->
> #### Database note
> This example uses SQLite as a data store. In production, we recommend using a database that has more robust concurrency support, such as PostgreSQL. For information on switching databases, see the [Replacing SQLite](#replacing-sqlite) section.

To run the migration and start the server, complete the following steps:

1. If you're using SQLite, which is the default data store for Subscription Foundation, skip to the next step. Otherwise, follow the instructions in [Replacing SQLite](#replacing-sqlite).

2. Run the pre-configured Prisma migration script to create the database tables and initial client as defined in `/prisma/migrations/*` with the following command: 

```shell title="Run Prisma migration"
npx prisma migrate dev
```

![npx_prisma_migrate](https://storage.googleapis.com/bigcommerce-production-dev-center/images/npx_prisma_migrate.png)

3. Start the app server with the following npm script:

```shell title="Start the app server"
npm run dev
```

After the app server and ngrok are running, you can install the draft app on your sandbox store. For more information about installing and troubleshooting apps in development, read our App Tutorial section on [Installing and launching an app](/api-docs/apps/tutorials/sample-app-nextjs/step-2-connect#install-and-launch-the-app).

## Replacing SQLite

To use an alternate SQL database, complete the following steps:

1. Update the `/prisma/schema.prisma` file with a `provider` other than `SQLite`. For a list of options, read [Prisma's reference docs](https://prisma.io/docs/reference/tools-and-interfaces/prisma-schema/data-sources/).

2. In `/prisma/.env`, update the value of the `DATABASE_URL` variable to match your new database connection string.

3. Run the prisma migration script with the following command:

```shell title="Run Prisma migration"
npx prisma migrate dev
```

4. To generate a fresh app client that uses the new database provider, run the following script:

```shell title="Run Prisma generate"
npx prisma generate 
```

5. To access this database locally, run the following command, then use a visual editor to verify that the database tables have been created.

```shell title="Run Prisma studio"
npx prisma studio
```

6. Start the app server by running the following command:

```shell title="Start the app server"
npm run dev
```


## Managing subscription products

To add new subscription rules and edit existing ones, complete the following steps:

1. In the store control panel, navigate to the **Channel Manager** menu and click **Stripe Subscriptions**.
2. Click the product you want to modify. For more information, see [Foundations for Stripe Billing](https://support.bigcommerce.com/s/article/Connecting-Stripe-Payment-Gateway?language=en_US#billing).

<!-- theme: info -->
> #### Subscription sales channel
> The app will create its own dedicated sales channel upon installation.

If you plan to use the API to add products to the subscription sales channel, see [product channel assignments](/api-docs/multi-storefront/api-guide#products) for more information.

## Troubleshooting

### Issue: Environment variable not found when running 

This error can occur when the `/prisma/schema.prisma` file contains the incorrect provider, or the `.env` file contains an incorrect `DATABASE_URL`. Verify that the information in both files is correct.

### Issue: A "Not found" error during app installation

If you don't enable the proper OAuth scopes, the `/api/auth` request might fail. Go to the [Dev Portal](https://devtools.bigcommerce.com) to verify the proper OAuth scopes are enabled in your app's profile. To learn more, read [Managing Apps in the Developer Portal](/api-docs/apps/guide/developer-portal#edit-technical-details). Make sure your scopes equal or exceed those listed in the [Creating an app profile](#create-an-app-profile) section.

## Resources
### Related articles
* [Subscription Foundation README](https://github.com/bigcommerce/subscription-foundation/blob/main/README.md)
* [Connecting with Stripe](https://support.bigcommerce.com/s/article/Connecting-Stripe-Payment-Gateway#foundations)
