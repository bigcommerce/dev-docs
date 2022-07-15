# POS Foundation

POS Foundation is an open-source BigCommerce point-of-sale application framework. It provides a template to scaffold custom POS solutions that use secure, pre-certified EMV card readers. Default integration with Stripe Terminal fast-tracks development of brick-and-mortar POS implementations for BigCommerce stores, saving hundreds of hours.


## Software and hardware requirements
* [Node.js](https://nodejs.org/en/) 14.x
* The [npm](https://www.npmjs.com/) package manager
* A data store; for this app, we recommend MongoDB
* A [Stripe POS terminal and card reader](https://stripe.com/terminal)

## Configure accounts

<!-- theme: info
> #### Store configuration
> * Because we have a [store email address constraint](/api-docs/apps/guide/developer-portal#store-email-address-constraint?source=subscription-foundation) on draft and private apps, make sure that both your sandbox store and your Dev Portal account use the same email address. 
> * The sandbox store must support multi-storefront sales. -->

1. To develop and test apps, you need a BigCommerce sandbox store. If you don't have one, [Create a Sandbox Store](/api-docs/partner/getting-started/create-a-sandbox-store?source=subscription-foundation).

2. In your sandbox store, configure a shipping zone with a [Pickup in Store](https://support.bigcommerce.com/s/article/Free-Shipping#in-store) shipping method.

<!-- 3. To register apps and create app API accounts, you need a BigCommerce Developer Portal account. If you don't have one, create a [Dev Portal account](https://devtools.bigcommerce.com/?source=subscription-foundation).  -->

## Enabling Stripe
POS Foundation is pre-integrated with Stripe out of the box. Before enabling Stripe, the store must be using [Optimized One-Page Checkout](https://support.bigcommerce.com/s/article/Optimized-Single-Page-Checkout?language=en_US#oopc-settings).

## Fork and install the source repository 

1. Fork the [point-of-sale-foundation repository (GitHub)](https://github.com/bigcommerce/point-of-sale-foundation) to your GitHub account.
2. Clone the fork to your local development environment.
3. Navigate to your clone's root directory and install the application's default packages with npm.

```shell title="Install packages"
npm install
```

## BigCommerce setup
1. [Create BigCommerce store](/api-docs/partner/getting-started/create-a-sandbox-store?source=subscription-foundation): go to [https://www.bigcommerce.com/essentials/](https://www.bigcommerce.com/essentials/?source=pos-foundation) and sign up for a free trial if you don't have one.


2. The BigCommerce store you are connected to must have "Pickup in Store" as a shipping option for orders to be created on the POS. Go to **Settings -> Shipping** in your admin to turn it on.

3. Create BigCommerce v2/v3 API credentials. Go to **Advanced Settings > API Accounts** and create and API Account with these scopes:

 **OAuth Scopes**
 
| UI Name | Permission | Parameter |
|:--------|:-----------|:----------|
| Customers | modify | `store_v2_customers` |
| Information & settings | read-only | `store_v2_information_read_only` |
| Orders | modify| `store_v2_orders` |
| Create payments | create | `store_payments_access_token_create` |
| Get payment methods | read-only | `store_payments_methods_read` |
| Products | read-only | `store_v2_products_read_only` |
| Carts | modify| `store_cart` |
| Checkouts | modify| `store_v2_checkouts` |
| Channel Settings| modify| `store_channel_settings` |
| Storefront API Tokens | manage| `store_storefront_api` |

4. Copy the `ACCESS_TOKEN`, `CLIENT ID`, and `CLIENT SECRET` credentials. In a later step, you will need these credentials to update `BC_AUTH_TOKEN`, `BC_APP_CLIENT_ID`, and `BC_APP_SECRET` environment variables in the `.env` file.

## Stripe setup

1. [Sign in](https://stripe.com/terminal) and click **Dashboard**. You will should be in **Test mode** ([https://dashboard.stripe.com/test/developers](https://dashboard.stripe.com/test/developers)). Do not select the dashboard for **Developers**.
2. Copy the Stripe secret key. In a later step, you will use the secret key to update the environment variable `STRIPE_SECRET_KEY` in the `.env` file.
3. Go to **More > Terminal** in the dashboard. Press **Get Started** when asked to activate the Terminal section.
4. Add a location, then click on the location row to manage details.
5. Add a new reader to the location.

## Database setup

This app works with MongoDB. The `provider` setting in the `/prisma/schema.prisma` should be set to `mongodb`. 

![POS-provider-mongodb](https://storage.googleapis.com/bigcommerce-production-dev-center/images/POS-provider-mongodb.png)

We highly recommend using MongoDB, but if you would like to use another type of database, you will need to update the configuration to work with the database of your choice. View the available database options here: https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-schema/data-sources/

[Mongo Cloud](https://cloud.mongodb.com) generates the `DATABASE_URL` as shown in the setup instructions below. In a later step, you will need the `DATABASE_URL` to update the environment variable in `.env` file. 

### Configure Mongo Cloud

1. Click [here](https://account.mongodb.com/) and sign in.  If you don't have an account, you can click [SignUp](https://account.mongodb.com/account/register).

2. On the left-hand sidebar, click **Database Access** > **ADD NEW DATABASE USER**.
  
   a. Fill in your username and password, and leave all remaining fields as is.

   b. Click **Add User**.

3. On the left-hand sidebar, click **Network Access** > **ADD IP ADDRESS**.
  
   a. Enter an IP address in the **Access List Entry** field. We recommend using 0.0.0.0/0 so you can connect from anywhere.

    ![pos-ip-address](https://storage.googleapis.com/bigcommerce-production-dev-center/images/POS-IP-address.png)

   b. Click **Confirm**.

4. In the left sidebar, click **Database**.
  
   a. Click the **Connect** button in your running cluster.

   b. Click **Connect your application** in the dialog that opens.

   c. Copy the connection string and replace `<password>` with the password and `<username>` with the username created in step 2a. Add **myFirstDatabase** to the connection string as shown below.

```shell title="Mongo Cloud connection string"
mongodb+srv://<username>:<password>@cluster0.jfohhb8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
```

<!-- theme: info -->
> #### Note 
> Update the `DATABASE_URL` variable in the `.env` file with this MongoDB connection string.

![pos-connection-string](https://storage.googleapis.com/bigcommerce-production-dev-center/images/POS-connection-string.png)

## Create local environment file

1. Create a `.env` file in the root directory of your project.
2. Copy the content of `.env-sample` to `.env`.

```bash
cp .env-sample .env
```
At a minimum, the following `.env` variables need to be updated for the app to sucessfully run.

| Environment variable | Description | Reference location |
|:---------------------|:------------|:-------------------|
| `DATABASE_URL` | The URL of the database | [Database setup](#database-setup) |
| `BC_STORE_HASH` | A unique string or series of numbers used to identify your store | [BigCommerce setup](#bigcommerce-setup) |
| `BC_AUTH_TOKEN` | A header value used to authenticate to BigCommerce servers | [BigCommerce setup](#bigcommerce-setup) |
| `BC_CHANNEL_ID` |  The channel for the storefront | [BigCommerce setup](#bigcommerce-setup) |
| `BC_GQL_URL`    |  The URL of the GraphQL endpoint | See notes in `.env` file          |
| `BC_APP_CLIENT_ID` |  The app API account's client ID | [BigCommerce setup](#bigcommerce-setup) |
| `BC_APP_SECRET` | The app API account's client secret | [BigCommerce setup](#bigcommerce-setup) |
| `STRIPE_SECRET_KEY` | The app-specific Stripe Connect API account client secret | [Stripe setup](#stripe-setup) |
<!-- >>> do we not need the Stripe public key? no -->
## Create and seed database
  
 1. After you set up your Mongo Cloud account, create the database and seed it with data by doing the following:

```shell title="Create and seed the database"
  $ npx prisma db push

  $ npm run seed
```

The preceding commands create the database collections and seed it with initial documents. If you miss this step, you won't have data to work with. 

2. Generate a new Prisma client using the database provider settings you configured in the preceding section on [Configuring Mongo Cloud](#configure-mongo-cloud). The following command creates the initial client. If you miss this step, you'll see errors about Prisma missing. 

```shell title="Generate the Prisma client"
  $ npx prisma generate
```

3. Access this database using a visual editor to verify you have created the collections and documents correctly using the command below or you can use [Mongo Compass](https://www.mongodb.com/products/compass) as your database GUI.

```shell title="Verify migration and seed"
  $ npx prisma studio
``` 

4. Run the Stripe POS terminal. <!-- (>>> this isn't an app in the BigCommerce sense, so it needs a different API account setup or we need to call it something else)-->

```bash title="Start the server"
npm run dev
```

Now, the app will be running locally! 

Sign in as an admin at `http://localhost:3000/signin`. The default admin PIN in the seed data is `1234`.

After you access Prisma Studio, navigate to the **Settings** screen to save your store address, which the app uses for checkout tax calculations. You will receive the following error if you do not supply the store address.
  
![pos-missing-store-address](https://storage.googleapis.com/bigcommerce-production-dev-center/images/POS-missing-store-address.jpeg)


## Connecting to a reader in the POS

On the main register screen, press the **Wifi** icon, which will read all of your terminals from Stripe and check if they are active on your network.

Press **Connect** for the active terminal you'd like to use to take payment at checkout.
 

## Troubleshooting

### Issue: Environment variable not found when running the database migration

This error can occur when the `/prisma/schema.prisma` file contains the incorrect provider, or the `.env` file contains an incorrect `DATABASE_URL`. Verify that the information in both files is correct.

### Issue: A "no available servers" server selection timeout when running the database migration

Update your Mongo Cloud IP address to 0.0.0.0/0.


## Resources
### Related articles
* [Point of Sale Foundation README](https://github.com/bigcommerce/point-of-sale-foundation/blob/main/README.md)
* [Connecting with Stripe](https://support.bigcommerce.com/s/article/Connecting-Stripe-Payment-Gateway#foundations)
