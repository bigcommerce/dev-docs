# Subscription Foundation

Subscription Foundation is an open-source BigCommerce "subscribe and save" application framework. It provides a template to scaffold custom subscription billing and invoicing solutions for your business or client. Default integration with Stripe Billing fast-tracks development, saving hundreds of hours. Additionally, it utilizes the [Channels toolkit](/api-docs/channels/guide/overview#channels-toolkit) so that the custom subscription channel appears in a store control panel's **Channel Manager** view, alongside other sales channels. 

## Prerequisites
You will need the following:

* A [BigCommerce sandbox store](/api-docs/partner/getting-started/create-a-sandbox-store?source=subscription-foundation), to develop and test apps
* A [Developer Portal account](https://devtools.bigcommerce.com/?source=subscription-foundation), to register apps and create app API accounts
* Experience using [npm](https://www.npmjs.com/)
* Node.js 14.x

## Getting started
1. Fork the [subscription-foundation repository (GitHub)](https://github.com/bigcommerce/subscription-foundation) to your GitHub account.
2. Clone your fork to your local development environment.
3. Navigate to your clone's root directory and install the application's default packages with npm.

```shell title="Install packages"
npm install
```
## Create an HTTPS tunnel

You need a publicly accessible URL to connect a draft app to your sandbox store. We recommend using [ngrok](https://ngrok.com/docs), a free tool that uses HTTP tunneling to securely expose `localhost` ports to the public internet. For BigCommerce-specific directions, consult [Create an HTTPS Tunnel](/api-docs/apps/tutorials/sample-app-nextjs/step-2-connect#create-an-https-tunnel).

Once you start ngrok, note your ngrok ID. You'll use it later on in this tutorial.

## BigCommerce setup
Create a draft app to get app API account credentials. 

To develop and test the app, you'll install it on your [sandbox store](/api-docs/partner/getting-started/create-a-sandbox-store?source=subscription-foundation). Because we have a [store email address constraint](/api-docs/apps/guide/developer-portal#store-email-address-constraint?source=subscription-foundation) on draft and private apps, make sure that both your sandbox store and your Dev Portal account use the same email address. 

1. Sign in to the Dev Portal. Then follow our directions to [create an app](/api-docs/apps/guide/developer-portal#create-an-app?source=subscription-foundation), entering the following values on the **Technical** tab:
* In the **Callback URLs** section, supply the following URLs, replacing `{ngrok_id}` with your ngrok ID from the preceding section.
  - Auth Callback URL: https://{ngrok_id}.ngrok.io/api/auth
  - Load Callback URL: https://{ngrok_id}.ngrok.io/api/load
  - Uninstall Callback URL: https://{ngrok_id}.ngrok.io/api/uninstall
* In the **OAuth scopes** section, add the following scopes:

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

* Complete the [create an app](/api-docs/apps/guide/developer-portal#create-an-app?source=subscription-foundation) directions.

Following steps in this guide require access to the Dev Portal, so keep it handy.

## Stripe setup

BigCommerce has configured the app to connect multiple BC Stores into one instance. Because of this, you’ll need two Stripe accounts. One for the Connect account which the app will use, and another, which is what the merchant connects to the app and BC store (in the payments area) themselves.

To accomplish this:

1. Create a Stripe account you’ll use to accept payments and manage subscriptions on BigCommerce: https://stripe.com/
2. After you have created that account, log into the Stripe Dashboard: https://dashboard.stripe.com/
3. Create a separate Stripe account that the application uses to authenticate the merchant.

   a. This can be done by selecting ‘+ New Account’ after clicking the name of the current account on the top left of your Stripe Dashboard.
   
   b. Pick a name for this account, like ‘BigCommerce App’ that helps you differentiate it from the Stripe payment account.
   
   ![BigCommerce App](https://storage.googleapis.com/bigcommerce-production-dev-center/images/BigCommerce-app-image.png)
   
4. Get your Stripe secret key here: https://dashboard.stripe.com/test/apikeys

   a. Reveal the secret key under ’Standard Keys’.
   
   b. In a later step, you will use the secret key to update the environment variable `STRIPE_SECRET_KEY` in the .env file.
   
5. Enable Stripe Connect for Platforms here: https://dashboard.stripe.com/test/connect/accounts/overview
   
   a. Select ‘Platform or Marketplace’ and continue.
   
   b. While not required for testing, as part of going live later, you’ll need to fill out the platform profile. We suggest using these answers at that point:
      - Select ‘Other’ for industry.
      - Select ‘From your seller/service provider’s website or app’ for where customers purchase products or services.
      - Select ‘The name of the seller/service provider using your platform’ for whose name is on the customer’s credit card statement.
      - Select ‘The seller/service provider using your platform’ for who should be contacted if customers have a dispute or complaint.
6. Configure your Connect settings here: https://dashboard.stripe.com/test/settings/connect
   
   a. Copy 'Test mode client ID'. In a later step, you will use the client ID to update the environment variable `NEXT_PUBLIC_STRIPE_CLIENT_ID` in the .env file.
   
   b. Under ‘OAuth settings’ enable ‘OAuth for Standard accounts’.
   
   c. Under ‘Redirects’ add the following URI: https://{xxxx-xxx-xxx-xx-x.ngrok.io}/stripe/callback
      
7. Your app should now be set up to handle Stripe OAuth, API requests, and webhooks.
   
   a. Remember the merchant must OAuth the same Stripe payments account (what you created first) to this app that their BigCommerce store uses. Otherwise, the initial payment created when the shopper pays for the original order won’t be readable when creating subscriptions.
   
   b. When testing:
      - Make sure 'Test Mode' is set to ‘Yes’ in the merchant’s Stripe settings within BigCommerce: https://login.bigcommerce.com/deep-links/settings/payment/stripev3
      
      
      ![stripe-settings](https://storage.googleapis.com/bigcommerce-production-dev-center/images/stripe-settings.png)
      
      - A vaulted card must be used when checking out. Turn on that functionality by going to ‘Stored Credit Cards’ in the Stripe payments section in BigCommerce and toggling on ‘Enable stored credit cards with Stripe’. 
      
      ![stored-credit-cards](https://storage.googleapis.com/bigcommerce-production-dev-center/images/stored-credit-cards.png)
      
      - When checking out on the BigCommerce store, you can save the card by logging in as a customer (or creating a new account during checkout) and selecting ‘save this card for later’ in the payments step.

## Create environment file

1. Create a `.env` file in the root directory of your project.

2. Copy the content of `.env-sample` to `.env`.

```shell title="Copy sample .env contents"
cp .env-sample .env
```
Update the following environment variables for the app to run successfully.

| Environment variable | Description | Reference location |
|:---------------------|:------------|:-------------------|
| `NEXT_PUBLIC_APP_URL` | A public-facing URL that can receive webhooks. | On this page, see [Create an HTTPS tunnel](#create-an-https-tunnel); see also [the HTTPS tunnel section of the Sample App Tutorial](/api-docs/apps/tutorials/sample-app-nextjs/step-2-connect#create-an-https-tunnel?source=subscription-foundation)  |
| `NEXT_PUBLIC_APP_ID` | The app's ID | [Find an App's ID](/api-docs/apps/tutorials/id#find-in-developer-portal?source=subscription-foundation) |
| `BC_APP_CLIENT_ID` | The app API account's client ID | [View App Credentials](/api-docs/apps/guide/developer-portal#view-credentials?source=subscription-foundation) |
| `BC_APP_SECRET` | The app API account's client secret | [View App Credentials](/api-docs/apps/guide/developer-portal#view-credentials?source=subscription-foundation) |
| `NEXT_PUBLIC_STRIPE_CLIENT_ID` | The Stripe API account's client ID | see [Stripe setup](#stripe-setup) |
| `STRIPE_SECRET_KEY` | The Stripe API account's client secret | see [Stripe setup](#stripe-setup) |


## Install app dependencies

1. Run the Prisma migration to create the DB tables and initial client. If you miss this step, you’ll see errors about Prisma missing.

```shell
npx prisma migrate dev
```
![npx_prisma_migrate](https://storage.googleapis.com/bigcommerce-production-dev-center/images/npx_prisma_migrate.png)

<!-- theme: info -->
> #### Database note
> This example uses SQLite as a data store. In production, we recommend using a database that has more robust concurrency support, such as PostgresSQL. For information on switching databases, see the [Replacing SQLite](#replacing-sqlite) section.

2. Start the app server, then start ngrok.

```shell
npm run dev
```
<!-- NGROK PIECE -->

While the app server is running, you can install the draft app on your BigCommerce store. For more about installing and troubleshooting apps in development, see [](). <!-- apps guide link -->

## Replacing SQLite
To replace the SQLite database, do the following:

1. Update the `/prisma/schema.prisma` file with a `provider` other than `SQLite` (i.e. `PostgreSQL`. info on options are here: https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-schema/data-sources/)
2. Update the `DATABASE_URL` var in `/prisma/.env` to match your new DB connection string.
3. Run `npx prisma migrate dev` (this creates tables and inserts related data as defined in `/prisma/migrations/*` into the DB).
4. Run `npx prisma generate` (this generates a new client for the app using the new DB provider setting).

After all this, if you run `npx prisma studio` you'll be able to access this database locally via a visual editor and verify the table has been created.


## Managing subscription products

Subscription-specific product configuration, like available intervals and the discount associated with them, is done within the app, inside Channel Manager. Only products that are listed on the subscription channel show up here. You can list products to the channel from within the Products section of the BigCommerce control panel.

## Troubleshooting

### Seeing {"Environment variable not found} when creating the DB tables and initial client

If you do not enter the correct provider in the `/prisma/schema.prisma` file or the .env file contains an incorrect `DATABASE_URL`.

### Seeing {"error": "Not found"} when installing the app

If you don't request the proper scopes, the /api/auth request might fail. Check your scopes in the BigCommerce Dev Tools area. Look at the scopes listed above in the [BigCommerce setup](#bigcommerce-setup) section.

## Resources
### Related articles
* [README.md](https://github.com/bigcommerce/subscription-foundation/blob/main/README.md)
* [Connecting with Stripe](https://support.bigcommerce.com/s/article/Connecting-Stripe-Payment-Gateway#foundations)
