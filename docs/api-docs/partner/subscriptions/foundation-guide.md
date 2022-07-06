# Subscription Foundation

Subscription Foundation is an open-source BigCommerce "subscribe and save" application framework. It provides a template to scaffold custom subscription billing and invoicing solutions for your business or client. Subscription Foundation provides a default integration with Stripe Billing, which significantly accelerates your development time. 

Subscription Foundation utilizes the [Channels toolkit](/api-docs/channels/guide/overview#channels-toolkit), which lets the custom subscription channel appear in the **Channel Manager** view of a store's control panel, alongside other sales channels.

## Software requirements 
* [Node.js](https://nodejs.org/en/) 14.x
* The [npm](https://www.npmjs.com/) package manager
* A [supported SQL database engine](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-schema/data-sources/), either SQLite or another of your choice

## Configure accounts

To configure your accounts you need to make sure the following requirements are met:

1. Because there is a [store email address constraint](/api-docs/apps/guide/developer-portal#store-email-address-constraint?source=subscription-foundation) on draft and private apps, you need to make sure that both your sandbox store and your Dev Portal account use the same email address. 
2. The sandbox store must support multi-storefront sales.
3. To develop and test apps, you need a BigCommerce sandbox store. If you don't have one, [Create a Sandbox Store](/api-docs/partner/getting-started/create-a-sandbox-store?source=subscription-foundation).
4. To register apps and create app API accounts, you need a BigCommerce Developer Portal account. If you don't have one, create a [Dev Portal account](https://devtools.bigcommerce.com/?source=subscription-foundation).

## Fork and install the source repository 

As a first step you need to fork the source repository, clone it to your development, and install the dpackages for your app

**To fork and install the source repository**

1. Fork the [subscription-foundation repository (GitHub)](https://github.com/bigcommerce/subscription-foundation) to your GitHub account.
2. Clone your fork to your local development environment.
3. Navigate to your root directory of your cloned repository and install the default packages for your app by issuing the following command:

```shell title="Install packages"
npm install
```
## Create an HTTPS tunnel

After you successfully install the packages, prepare to expose the app to the internet so you can install it on your sandbox store. 

Because you must serve apps over fully-qualified publicly accessible URLs, this guide uses a tool called [ngrok](https://ngrok.com/docs) to open HTTP tunnels that securely expose `localhost` ports to the internet. 

To get started with ngrok, read the [Create an HTTPS Tunnel](/api-docs/apps/tutorials/sample-app-nextjs/step-2-connect#create-an-https-tunnel) tutorial.

After you successfully start ngrok, make sure to note your ngrok ID. You will use it later.

## Create an app profile

As a next step, you need to create an app profile to generate app API account credentials. 

To develop and test the app, you need to install it on your [sandbox store](#configure-accounts). 

**To create a draft app**

1. Sign in to the Dev Portal. Then follow the directions to [create an app](/api-docs/apps/guide/developer-portal#create-an-app?source=subscription-foundation). Enter the following values on the **Technical** tab.

2. In the **Callback URLs** section, supply the following URLs, replacing `{ngrok_id}` with your ngrok ID which you noted in an earlier step.

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

4. On the **App Supported Features** tab, select the option that indicates this is a multi-storefront enabled app.

5. Click **Update & Close**, then click **Confirm Update** to acknowledge the OAuth scopes you configured.

Make sure to remain signed into the Dev Portal

## Configure Stripe

Subscription Foundation uses Stripe Connect so that your app can use one signle connection to submit payments to multiple previously configured Stripe merchant accounts. See [Stripe Billing](https://support.bigcommerce.com/s/article/Connecting-Stripe-Payment-Gateway?language=en_US#billing) for merchant configuration instructions.

The integration between Stripe and BigCommerce requires that the app uses two keys to issue charges: the **merchant-specific Stripe account's public key** and the **app-specific Stripe account's secret key**.

Using two separate keys provides the following benefits:
* The merchant can change between Stripe accounts they use without breaking the integration.
* The merchant's own Stripe account stores the entire shopper payment history, including subscription and one-time purchases. 
* The usage of public and secret keys ensures that your configuration is PCI compliant.

For development you will use two Stripe accounts:

| Account | Description |
|:---------|:----|
| Account One | This account simulates a merchant's pre-existing account |
| Account Two | This account is configured as the app's dedicated Stripe Connect-enabled account. |


<!-- theme: info -->
> #### Multi-tenant functionality
> During installation, the app UI prompts the merchant to enter the keys for their Stripe account so that the app can initiate an authorization flow for the OAuth grant code to link the merchant's Stripe account to the app's Stripe Connect-enabled account. 

### Create Stripe accounts

To get started, complete the following steps:

1. To create the Stripe account that simulates your merchant's pre-existing Stripe account, [sign up with Stripe](https://dashboard.stripe.com/register). Your app uses this account's client ID to process subscriber payments and manage subscriptions. Make sure to give it a merchant-specific name.

2. Sign in to the [Stripe Dashboard](https://dashboard.stripe.com/).

3. On the [Stripe Dashboard](https://dashboard.stripe.com/), create and configure a second app-specific Stripe account. The app uses this account's client secret to process subscription payments.

   a. On the top left corner of your Stripe Dashboard, click the name of your merchant-specific account. Select **+ New Account** from the dropdown menu.

   b. Give the new account a name that clearly identifies it as app-specific to differentiate it from the merchant-specific payment and subscription management account. This guide uses **BigCommerce App** as an example.
   
   ![BigCommerce App](https://storage.googleapis.com/bigcommerce-production-dev-center/images/BigCommerce-app-image.png "The Stripe dashboard's new account dropdown menu")
   
   c. Under **Get started with Stripe**, copy the **Secret key** and make sure to store it in a safe place. In a later step, you will use the secret key to update the `STRIPE_SECRET_KEY` environment variable in the .env file.

### Enable Stripe Connect for Platforms

**During this following steps, make sure that you are logged into your the app-specific account by ehcking the top left corner of your Stripe Dashboard.**

<!-- theme: info -->
> #### Test mode
> You can simulate transactions in test mode to confirm your integration works correctly. 

**To configure test mode**

1. On your Stripe Dashboard click **Connect** to enable [Stripe Connect for Platforms](https://dashboard.stripe.com/test/connect/accounts/overview). 

2. Click **Get started**.

3. Select **Platform or Marketplace**, then click **Continue**.

4. To configure the app-specific account's Stripe Connect settings, on your Stripe Dashboard go to [**Settings > Connect settings**](https://dashboard.stripe.com/test/settings/connect). 

5. Under **Integration** do the following:
   
   a. Copy the **Test mode client ID** and make sure to store it at a safe place. You will use the client ID in a later step to update `NEXT_PUBLIC_STRIPE_CLIENT_ID` in the .env file.

   b. Set **OAuth settings** to **OAuth for Standard accounts**. 

   c. Click **Redirects**, and then click **+ Add URI**. Add the callback URI for your app:
   
   ```http title="Your app's Stripe callback URI"
   https://{ngrok_id}.ngrok.io/stripe/callback
   ```

## Configure the BigCommerce store

After you have successfully created a test configuration, you need to configure your BigCommerce store in the BigCommerce store control panel.

**To configure the store to make subscription charges**

1. In the BigCommerce store control panel, in the [Stripe settings section](https://login.bigcommerce.com/deep-links/settings/payment/stripev3), make sure that **Test Mode** is set to **Yes**.
   
   ![stripe-settings](https://storage.googleapis.com/bigcommerce-production-dev-center/images/stripe-settings.png)
   
2. To start a subscription, shoppers must check out using a stored credit card. To enable this functionality, go to [Stripe settings](https://login.bigcommerce.com/deep-links/settings/payment/stripev3), locate the **Stored Credit Cards** section, and toggle on **Enable stored credit cards with Stripe**. 
   
   ![stored-credit-cards](https://storage.googleapis.com/bigcommerce-production-dev-center/images/stored-credit-cards.png)
   
3. To verify that the stored credit card functionality is enabled, go to your BigCommerce store, put some merchandise in your card. Then sign in to the BigCommerce store as a shopper, or create a new account during checkout. During checkout, in the payments step, select **Save this card for later**. 

## Declare environment variables

<!-- theme: info -->
> #### Note on naming conventions
> In some places, this guide and app template code refer to a Stripe API account's public key as a *client ID*, and its secret key as a *client secret*.

1. Create a `.env` file in the root directory of your project.

2. Copy the content of `.env.sample` to `.env` by issuing the following command:

```shell title="Copy .env.sample contents"
cp .env.sample .env
```
Update the following environment variables:

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

1. If you're using SQLite, which is the default data store for Subscription Foundation, skip to the next step. Otherwise, follow the instructions in [Replacing SQLite](#replacing-sqlite)

2. Run the pre-configured Prisma migration script to create the database tables and initial client as defined in `/prisma/migrations/*` by issuing the following command:

```shell title="Run Prisma migration"
npx prisma migrate dev
```
The following screenshot shows a successful migration.
![npx_prisma_migrate](https://storage.googleapis.com/bigcommerce-production-dev-center/images/npx_prisma_migrate.png)

3. Start the app server by issuing the following command:

```shell title="Start the app server"
npm run dev
```

4. Start ngrok using the follow command. If your app does not run on port 3000, replace `3000` with your app server's port.

```shell title="Start ngrok"
ngrok http 3000
```

After the app server and ngrok are running, you can install the draft app on your sandbox store. For more information about installing and troubleshooting apps in development, read [Installing and launching an app](/api-docs/apps/tutorials/sample-app-nextjs/step-2-connect#install-and-launch-the-app).

## Replacing SQLite

To use an alternate SQL database, do the following:

1. Update the `/prisma/schema.prisma` file with a `provider` other than `SQLite`. For a list of options, read [Prisma's reference docs](https://prisma.io/docs/reference/tools-and-interfaces/prisma-schema/data-sources/).

2. In `/prisma/.env`, update the value of the `DATABASE_URL` variable to match your new database connection string.

3. Run the prisma migration script with the following command:

```shell title="Run Prisma migration"
`npx prisma migrate dev`
```
4. To generate a fresh app client that uses the new database provider issue the following following command:

```shell title="Run Prisma generate"
`npx prisma generate`
```
5. To access this database locally, and use a visual editor to verify that the tables have been created issue the following command:

```shell title="Run Prisma studio"
`npx prisma studio`
```

6. Start the app server by issuing the following command:

```shell title="Start the app server"
npm run dev
```
7. Start ngrok by issuing the following command:

```shell title="Start ngrok"
ngrok http 3000
```

## Managing subscription products

**To add new subscription rules and edit existing ones**

1. In the store control panel, navigate to the **Channel Manager** menu in the store control panel and click **Stripe Subscriptions**.

2. Click the product you want to modify. For more information, see [Foundations for Stripe Billing](https://support.bigcommerce.com/s/article/Connecting-Stripe-Payment-Gateway?language=en_US#billing).

<!-- theme: info -->
> #### Subscription sales channel
> The app will create its own dedicated sales channel upon installation.

If you plan to use the API to add products to the subscription sales channel, learn more about [product channel assignments](/api-docs/multi-storefront/api-guide#products).

## Troubleshooting

### Issue: Environment variable not found when running 

This error can occur when the `/prisma/schema.prisma` file contains the incorrect provider, or the `.env` file contains an incorrect `DATABASE_URL`. Verify that the information in both files is correct.

### Issue: A "Not found" error during app installation

If you don't enable the proper OAuth scopes, the `/api/auth` request might fail. Go to the [Dev Portal](https://devtools.bigcommerce.com) to check out the OAuth scopes that are enabled in the profile of your app. To learn more, read [Managing Apps in the Developer Portal](/api-docs/apps/guide/developer-portal#edit-technical-details). Make sure your scopes are equal to or exceed those listed in the [Creating an app profile](#create-an-app-profile) section.

## Resources
### Related articles
* [Subscription Foundation README](https://github.com/bigcommerce/subscription-foundation/blob/main/README.md)
* [Connecting with Stripe](https://support.bigcommerce.com/s/article/Connecting-Stripe-Payment-Gateway#foundations)
