# POS Foundation

POS Foundation provides a proof-of-concept [open-source framework](https://github.com/bigcommerce/point-of-sale-foundation) that helps developers deliver custom point-of-sale (POS) checkout interfaces to BigCommerce merchants with brick-and-mortar locations. It provides a template to scaffold custom POS solutions that use secure, pre-certified EMV card readers. POS Foundation's default integration with Stripe Terminal helps significantly accelerate development time. 

POS Foundation consists of a manual connector app that uses a store API account. The app is not displayed in the store control panel. To configure POS Foundation, you need to create an app profile or use ngrok. This proof-of-concept tutorial only applies to local network operations and does not create its own channel. 


## Software requirements
* [Node.js](https://nodejs.org/en/) 14.0.0+
* The [npm](https://www.npmjs.com/) package manager
* A MongoDB database instance; this guide uses MongoDB Cloud

## Hardware requirements
* A [Stripe Terminal-enabled card reader](https://stripe.com/terminal)
* A card reader-compatible device to run the POS system

## Configure accounts

<!-- theme: info -->
> #### Account configuration requirements
> We recommend that you use a sandbox store that has the same multi-storefront status as the production store. For example, if you're developing for a multi-storefront-enabled merchant store, use a multi-storefront sandbox. For information on configuring multi-storefront, see [Multi-Storefront](https://support.bigcommerce.com/s/article/Multi-Storefront?language=en_US).

To configure your accounts, complete the following steps:

1. [Create a BigCommerce Sandbox Store](/api-docs/partner/getting-started/create-a-sandbox-store?source=subscription-foundation) to develop and test your apps.

2. In the control panel of your sandbox store, [create a store API account](/api-docs/getting-started/authentication/rest-api-authentication#obtaining-store-api-credentials) with the following scopes:
 
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

<!-- theme: success -->
#### Record the API account credentials
* Record the `ACCESS_TOKEN`, `CLIENT ID`, and `CLIENT SECRET`at a safe place. In a later step, you will use these credentials to update the `BC_AUTH_TOKEN`, `BC_APP_CLIENT_ID`, and `BC_APP_SECRET` environment variables in the `.env` file.
* In addition, make note of your store's **store hash**. It is the path parameter that immediately precedes `v3` in the `API PATH` included with your store API account. In a later step, you will use the store hash to update the `BC_STORE_HASH` environment variable in the `.env` file.

## Fork and install the source repository 
To fork the repository, complete the following steps:

1. Fork the [point-of-sale-foundation repository (GitHub)](https://github.com/bigcommerce/point-of-sale-foundation) to your GitHub account.
2. Clone the fork to your local development environment.
3. Navigate to the root directory of your cloned repository and issue the following command to install the default packages for this framework.

```shell title="Install packages"
npm install
```

## Configure Stripe

To run the POS framework, you need to create and configure a Stripe account.

To configure the Stripe account to connect to your implementation, complete the following steps:

1. Create a Stripe account and sign in to the [Stripe Terminal](https://stripe.com/terminal).

2. In the top right corner of your Stripe dashboard click **Test Mode** and verify that [**Test mode**](https://dashboard.stripe.com/test/developers) is selected. Do not select the **Developers** dashboard. 
![pos-stripe-test-mode](https://storage.googleapis.com/bigcommerce-production-dev-center/images/pos-stripe-test-mode.png)

<!-- theme: info -->
> #### Test mode
> You can simulate transactions in test mode to confirm your integration works correctly.


3. Scroll down the page to the **Get Started with Stripe** section and click the icon to the right of **Secret key** and then click to copy the secret key. 

<!-- theme: success -->
Record the **secret key** and keep it in a safe location. In a later step, you will use the secret key to update the `STRIPE_SECRET_KEY` environment variable in the `.env` file.

4. Navigate to the top menu bar on your Stripe Terminal Dashboard and click **More > Terminal**. 

5. When prompted to activate the Terminal section of the dashboard, click **Get Started**.

6. Click **Locations** on the left nav bar, and then click **New** on the **Locatons** page.

7. In the **Create location** dialog box, enter a **Name** and **Address**, and click **Save**.

8. Add a new reader to the newly created location by clicking on the row that lists your location. In the **Register reader** dialog box, enter the **Registration code** and optionally enter the **Reader label**. Click **Save**.

## Configure the BigCommerce store

After you successfully configure test mode, configure your BigCommerce sandbox store in the store control panel.

To configure the store to make purchases through a POS, complete the following steps:

1. Sign into your BigCommerce store control panel and configure a shipping zone with a [Pickup in Store](https://support.bigcommerce.com/s/article/Free-Shipping#in-store) shipping method.

2. To allow POS operations, in your BigCommerce store control panel, go to the **Settings** page, scroll down to **Advanced**, and click the **Checkout** row.

3. Under **Checkout Type** select the **Optimized One-Page Checkout** radio button, and then click **Save** For more information, see [Optimized One-Page Checkout](https://support.bigcommerce.com/s/article/Optimized-Single-Page-Checkout?language=en_US#oopc-settings).

## Create and configure the database

This app uses MongoDB as a database engine. If you want to use a different database engine, update the configuration, migration, and seed files to use the data store of your choice. For a list of supported database options, see Prisma's [data source documentation](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-schema/data-sources/).

To configure your POS application to use MongoDB, complete the following steps: 

1. On your computer, navigate to the fork of the project repository, and locate the `/prisma` directory. 

2. In the `/prisma/schema.prisma` settings file, set `provider` to `mongodb`. 


![POS-provider-mongodb](https://storage.googleapis.com/bigcommerce-production-dev-center/images/POS-provider-mongodb.png)

### Configure MongoDB Cloud

After you configure your application to use MongoDB, connect to a MongoDB instance. You can use MongoDB Cloud to get your implementation up and running quickly. As an added benefit, MongoDB Cloud makes your data collections accessible from anywhere. 

To configure MongoDB Cloud and generate a connection URL, complete the following steps:

1. Navigate to [MongoDB Cloud](https://account.mongodb.com/) and [sign in](https://account.mongodb.com/account/login) or [sign up](https://account.mongodb.com/account/register) for an account.

2. From the left nav column, select **Database Access**, and then click **Add New Database User**.
  
   a. Under **Authentication Method** select **Password**.
   
   b. Enter a username and password and leave all other information unchanged.
   
   c. Click **Add User**.

3. From the left nav column, select **Network Access**, and then click  **Add IP Address**.
  
   a. In the **Access List Entry** field enter an IP address. Using `0.0.0.0/0` allows you to connect from anywhere, but is not secure in production.

    ![pos-ip-address](https://storage.googleapis.com/bigcommerce-production-dev-center/images/POS-IP-address.png)

   b. Click **Confirm**.

4. From the left nav column, select **Database**.
  
   a. Click **Connect** in your running cluster.

   b. In the dialog that opens, click **Connect your application**.

   c. Copy the connection string and replace `<username>` and `<password>` with the values you specified in step 2b. Add **myFirstDatabase** to the connection string so that it resembles the following example:

```shell title="MongoDB Cloud connection string"
mongodb+srv://<username>:<password>@cluster0.sdfdfg65.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
```

![pos-connection-string](https://storage.googleapis.com/bigcommerce-production-dev-center/images/POS-connection-string.png)

<!-- theme: success -->
#### Record the connection string
Record the MongoDB Cloud connection string and keep it in a safe location. In a later step, you will use the connection string to update the `DATABASE_URL` environment variable in the `.env` file.

## Declare environment variables

After you create and configure the database, you have all the information you need to add environment variables to your project.

To declare environment variables, complete the following steps:

1. Create a `.env` file in the root directory of your project.
2. Copy the contents of `.env.sample` to `.env` with the following command:

```shell title="Copy .env.sample contents"
cp .env.sample .env
```
3. Open the `.env` file you just created and update the following environment variables:

| Environment variable | Description | Reference location |
|:---------------------|:------------|:-------------------|
| `DATABASE_URL` | The database connection string | [Create and configure database](#create-and-configure-database) |
| `BC_STORE_HASH` | The unique string that identifies your store | [Configure accounts](#configure-accounts) |
| `BC_AUTH_TOKEN` | The store API account's access token | [Configure accounts](#configure-accounts) |
| `BC_CHANNEL_ID` |  Modify this value if you create a dedicated channel for the POS system | [Create a channel (API Reference)](/api-reference/store-management/channels/channels/createchannel) |
| `BC_GQL_URL`    |  The URL of the store's GraphQL Storefront API endpoint | See notes in the [.env.sample file (GitHub)](https://github.com/bigcommerce/point-of-sale-foundation/blob/main/.env.sample) |
| `BC_APP_CLIENT_ID` |  The store API account's client ID | [Configure accounts](#configure-accounts) |
| `BC_APP_SECRET` | The store API account's client secret | [Configure accounts](#configure-accounts) |
| `STRIPE_SECRET_KEY` | The Stripe account's client secret | [Configure Stripe](#configure-stripe) |

## Run migration and start the server

After you add environment variables to your project, run the migration script that creates the initial collections and documents your MongoDB instance needs to run the POS system.

To run the migration script and seed the database, complete the following steps:
  
1. Run the pre-configured Prisma migration script that is defined in `/prisma/migrations/*` by issuing the following command: 

```shell title="Create the database"
npx prisma db push
```

2. Seed your database with pre-configured collections and documents using the following command:
 
```shell title="Seed the database"
npm run seed
```

**Important** If you miss the preceding steps, you will not have any data to work with. 

3. Generate a new Prisma client by issuing the following command:

```shell title="Generate the Prisma client"
npx prisma generate
```
**Note** This step relies on the provider settings you configured in the preceding section on [creating and configuring the database](#create-and-configure-the-database).

4. Access the database to verify you have created the collections and documents correctly. You can use the following command, or connect with a GUI, such as [Compass](https://www.mongodb.com/products/compass).

```shell title="Verify migration and seed"
npx prisma studio
``` 

5. To start the server that runs the POS system, run the following command:

```shell title="Start the server"
npm run dev
```
Upon successfull execution of this command, the app is running locally.

6. Sign in to the app as an admin at `http://localhost:3000/signin`. The default admin PIN in the seed data is `1234`.

![pos-sign-in](https://storage.googleapis.com/bigcommerce-production-dev-center/images/pos-sign-in.png)

7. After you access Prisma Studio, navigate to the **Settings** screen to save your store address, which the app uses for checkout tax calculations. If you fail to supply the store address, you will receive the following error:
  
![pos-missing-store-address](https://storage.googleapis.com/bigcommerce-production-dev-center/images/POS-missing-store-address.jpeg)


## Connecting to a reader in the POS

On the main register screen, press the **Wifi** icon, which will read all of your terminals from Stripe and check if they are active on your network.

Press **Connect** for the active terminal you'd like to use to take payment at checkout.
 

## Troubleshooting

### Issue: Environment variable not found when running the database migration

This error can occur when the `/prisma/schema.prisma` file contains the incorrect provider, or the `.env` file contains an incorrect `DATABASE_URL`. Verify that the information in both files is correct.

### Issue: A "no available servers" server selection timeout occurs when running the database migration

Update your MongoDB Cloud IP address to 0.0.0.0/0.

## Contributing
Want to help expand this foundation? We'd love to hear from you.

## Resources
### Related articles
* [Point of Sale Foundation README](https://github.com/bigcommerce/point-of-sale-foundation/blob/main/README.md)
* [Connecting with Stripe](https://support.bigcommerce.com/s/article/Connecting-Stripe-Payment-Gateway#foundations)
