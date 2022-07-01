# Subscription Foundation

Subscription Foundation is an open-source BigCommerce "subscribe and save" application framework. It provides a template to scaffold custom subscription billing and invoicing solutions for your business or client. Default integration with Stripe Billing fast-tracks development, saving hundreds of hours. 

Additionally, it utilizes the [Channels toolkit](/api-docs/channels/guide/overview#channels-toolkit) so that the custom subscription channel appears in a store control panel's **Channel Manager** view, alongside other sales channels. 

## Software requirements 
* [Node.js](https://nodejs.org/en/) 14.x
* The [npm](https://www.npmjs.com/) package manager
* A [supported SQL database engine](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-schema/data-sources/), either SQLite or another of your choice

## Configure accounts

<!-- theme: info -->
> #### Store configuration
> * Because we have a [store email address constraint](/api-docs/apps/guide/developer-portal#store-email-address-constraint?source=subscription-foundation) on draft and private apps, make sure that both your sandbox store and your Dev Portal account use the same email address. 
> * The sandbox store must support multi-storefront sales.

1. To develop and test apps, you need a BigCommerce sandbox store. If you don't have one, [Create a Sandbox Store](/api-docs/partner/getting-started/create-a-sandbox-store?source=subscription-foundation).
2. To register apps and create app API accounts, you need a BigCommerce Developer Portal account. If you don't have one, create a [Dev Portal account](https://devtools.bigcommerce.com/?source=subscription-foundation).

## Fork and install the source repository 

1. Fork the [subscription-foundation repository (GitHub)](https://github.com/bigcommerce/subscription-foundation) to your GitHub account.
2. Clone your fork to your local development environment.
3. Navigate to your clone's root directory and install the application's default packages with npm.

```shell title="Install packages"
npm install
```
## Create an HTTPS tunnel

You need to serve your app over fully-qualified publicly accessible URL to connect the app to your sandbox store. We recommend using [ngrok](https://ngrok.com/docs), a free tool that uses HTTP tunneling to securely expose `localhost` ports to the public internet. 

Consult [our App Tutorial](/api-docs/apps/tutorials/sample-app-nextjs/step-2-connect#create-an-https-tunnel) to get started.

Once you start ngrok, note your ngrok ID. You'll use it later on in this guide.

## Create an app profile

Create a draft app to generate app API account credentials. 

To develop and test the app, you'll install it on your [sandbox store](#configure-accounts). 

1. Sign in to the Dev Portal. Then follow our directions to [create an app](/api-docs/apps/guide/developer-portal#create-an-app?source=subscription-foundation). Enter the following values on the **Technical** tab.

2. In the **Callback URLs** section, supply the following URLs, replacing `{ngrok_id}` with your ngrok ID from the preceding section.

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

4. On the **App Supported Features** tab, indicate that this is a multi-storefront enabled app.

5. Click **Update & Close**, then click **Confirm Update** to acknowledge the OAuth scopes you configured.

Further steps in this guide require access to the Dev Portal, so keep it handy.

## Configure Stripe

We've designed this integration to use Stripe Connect so that your app can use one connection to submit payments to multiple merchants' previously configured Stripe accounts. 

In fact, this is an obligate multi-tenant app, even if you build it for a single merchant's use. The respective architectures of the Stripe and BigCommerce APIs on which this app relies require the app to make charges using the **merchant-specific Stripe account's public key** and the **app-specific Stripe account's secret key**. 

This arrangement provides the following benefits:
* The merchant can change the Stripe account they use without breaking the integration.
* The merchant's own Stripe account stores all shopper payment history, subscription and one-time purchase alike. 
* It limits the app's PCI compliance burden. 

In development, you'll work with two Stripe accounts; one that simulates a merchant's pre-existing account, and another that you configure as the app's dedicated Stripe Connect-enabled account.

<!-- theme: info -->
> #### Multi-tenant mechanics
> During installation, the app UI prompts the merchant to enter their Stripe account's keys so that the app can initiate an OAuth grant code authorization flow that links the merchant's Stripe account to the app's Stripe Connect-enabled account. 

### Create Stripe accounts

To get started, do the following steps:

1. To create the Stripe account that simulates your merchant's pre-existing Stripe account, [sign up with Stripe](https://dashboard.stripe.com/register). Your app uses this account's client ID to process subscriber payments and manage subscriptions; give it a merchant-specific name.

2. Sign in to the [Stripe Dashboard](https://dashboard.stripe.com/).

3. From inside the [Stripe Dashboard](https://dashboard.stripe.com/), create and configure a second app-specific Stripe account. The app uses this account's client secret to process subscription payments.

   a. On the left side of your Stripe Dashboard's top menu bar, click the name of your merchant-specific account. In the dropdown menu that appears, select **+ New Account**.

   b. Give the new account a name that clearly marks it as app-specific; the idea is to differentiate it from the merchant-specific payment and subscription management account. This guide uses **BigCommerce App**.
   
   ![BigCommerce App](https://storage.googleapis.com/bigcommerce-production-dev-center/images/BigCommerce-app-image.png "The Stripe dashboard's new account dropdown menu")

### Enable Stripe Connect for Platforms

**During this instruction sequence, make sure that the left side of your Stripe Dashboard's top menu bar indicates that you're in the app-specific account.**

<!-- theme: info -->
> #### Test mode
> You can simulate transactions in test mode to confirm your integration works correctly; the following steps are configured for test mode.

1. Click the **Connect** button to enable [Stripe Connect for Platforms](https://dashboard.stripe.com/test/connect/accounts/overview). 

2. Click **Get started**.

3. Select **Platform or Marketplace**, then click the **Continue** button at the lower right.

4. To configure the app-specific account's Stripe Connect settings, go to [**Settings > Connect settings**](https://dashboard.stripe.com/test/settings/connect).
   
   a. Under **Test mode client ID**, copy the Test mode client ID. In a later step, you will use the client ID to update `NEXT_PUBLIC_STRIPE_CLIENT_ID` in the .env file.

   b. Under **OAuth settings**, enable **OAuth for Standard accounts**. 

   c. Under **Redirects**, add your app's callback URL.
   
   ```http title="Your app's Stripe callback URL"
   https://{ngrok_id}.ngrok.io/stripe/callback
   ```

## Configure the BigCommerce store

To configure the store to make subscription charges, take the following steps:

   - In the [Stripe settings section](https://login.bigcommerce.com/deep-links/settings/payment/stripev3) of the BigCommerce store control panel, make sure **Test Mode** is set to **Yes**.
   
   ![stripe-settings](https://storage.googleapis.com/bigcommerce-production-dev-center/images/stripe-settings.png)
   
   - To start a subscription, shoppers must check out using a stored card. To turn on that functionality, go to [Stripe settings](https://login.bigcommerce.com/deep-links/settings/payment/stripev3) in the BigCommerce store control panel, find the **Stored Credit Cards** section, and toggle on **Enable stored credit cards with Stripe**. 
   
   ![stored-credit-cards](https://storage.googleapis.com/bigcommerce-production-dev-center/images/stored-credit-cards.png)
   
   - To save a card during the transaction, sign in to the BigCommerce store as a shopper, or create a new account during checkout. In the payments step, select **Save this card for later**. 

## Declare environment variables

<!-- theme: info -->
> #### Note on naming convention
> In some places, this guide and app template code refer to a Stripe API account's public key as a client ID, and its secret key as a client secret.

1. Create a `.env` file in the root directory of your project.

2. Copy the content of `.env-sample` to `.env`.

```shell title="Copy .env-sample contents"
cp .env-sample .env
```
Update the following environment variables:

| Environment variable | Description | Reference location |
|:---------------------|:------------|:-------------------|
| `NEXT_PUBLIC_APP_URL` | A public-facing URL that can receive webhooks. | On this page, see [Create an HTTPS tunnel](#create-an-https-tunnel); see also [the HTTPS tunnel section of the Sample App Tutorial](/api-docs/apps/tutorials/sample-app-nextjs/step-2-connect#create-an-https-tunnel?source=subscription-foundation)  |
| `NEXT_PUBLIC_APP_ID` | The app's ID | [Find an App's ID](/api-docs/apps/tutorials/id#find-in-developer-portal?source=subscription-foundation) |
| `BC_APP_CLIENT_ID` | The app API account's client ID | [View App Credentials](/api-docs/apps/guide/developer-portal#view-credentials?source=subscription-foundation) |
| `BC_APP_SECRET` | The app API account's client secret | [View App Credentials](/api-docs/apps/guide/developer-portal#view-credentials?source=subscription-foundation) |
| `NEXT_PUBLIC_STRIPE_CLIENT_ID` | The app-specific Stripe Connect API account client ID | see [Enable Stripe Connect for Platforms](#enable-stripe-connect-for-platforms) |
| `STRIPE_SECRET_KEY` | The app-specific Stripe Connect API account client secret | see [Enable Stripe Connect for Platforms](#enable-stripe-connect-for-platforms) |


## Run migration and start the server

<!-- theme: info -->
> #### Database note
> This example uses SQLite as a data store. In production, we recommend using a database that has more robust concurrency support, such as PostgreSQL. For information on switching databases, see the [Replacing SQLite](#replacing-sqlite) section.

1. If you're using SQLite, which is Subscription Foundation's default data store, skip to the next step. Otherwise, see [Replacing SQLite](#replacing-sqlite)

2. Run the pre-configured Prisma migration to create the database tables and initial client as defined in `/prisma/migrations/*`. Troubleshoot as needed.

```shell title="Run Prisma migration"
npx prisma migrate dev
```

![npx_prisma_migrate](https://storage.googleapis.com/bigcommerce-production-dev-center/images/npx_prisma_migrate.png)

3. Start the app server.

```shell title="Start the app server"
npm run dev
```

4. Start ngrok using the follow command. If your app does not run on port 3000, replace `3000` with your app server's port.

```shell title="Start ngrok"
ngrok http 3000
```

Once the app server and ngrok are running, you can install the draft app on your sandbox store. For more about installing and troubleshooting apps in development, see our App Tutorial section on [Installing and launching an app](/api-docs/apps/tutorials/sample-app-nextjs/step-2-connect#install-and-launch-the-app).

## Replacing SQLite

To use an alternate SQL database, do the following:

1. Update the `/prisma/schema.prisma` file with a `provider` other than `SQLite`. Consult [Prisma's reference docs](https://prisma.io/docs/reference/tools-and-interfaces/prisma-schema/data-sources/) for a list of options.

2. In `/prisma/.env`, update the value of the `DATABASE_URL` variable to match your new database connection string.

3. Run `npx prisma migrate dev` per the preceding section.

4. Run `npx prisma generate` to generate a fresh app client that uses the new database provider.

5. To access this database locally, run `npx prisma studio` and use a visual editor to verify that the tables have been created.

6. Start the app server and then ngrok, per the preceding section.


## Managing subscription products

To add new subscription rules and edit existing ones, go to the **Channel Manager** menu in the store control panel and click the **Stripe Subscriptions** channel. Click on the product you want to modify. For more information, see our support article on [Foundations for Stripe Billing](https://support.bigcommerce.com/s/article/Connecting-Stripe-Payment-Gateway?language=en_US#billing).

<!-- theme: info -->
> #### Subscription sales channel
> The app will create a dedicated sales channel for itself upon installation.

If you plan to use the API to add products to the subscription sales channel, learn more about [product channel assignments](/api-docs/multi-storefront/api-guide#products).

## Troubleshooting

### Environment variable not found when running 

This error can occur when the `/prisma/schema.prisma` file contains the incorrect provider, or the `.env` file contains an incorrect `DATABASE_URL`.

### A Not found error during app installation

If you don't enable the proper OAuth scopes, the `/api/auth` request might fail. Go to the [Dev Portal](https://devtools.bigcommerce.com) to check out the OAuth scopes enabled in the app's profile; consult our article on [Managing Apps in the Developer Portal](/api-docs/apps/guide/developer-portal#edit-technical-details) to learn more. Make sure your scopes equal to or exceed those listed in the preceding section on [Creating an app profile](#create-an-app-profile).

## Resources
### Related articles
* [Subscription Foundation README](https://github.com/bigcommerce/subscription-foundation/blob/main/README.md)
* [Connecting with Stripe](https://support.bigcommerce.com/s/article/Connecting-Stripe-Payment-Gateway#foundations)
