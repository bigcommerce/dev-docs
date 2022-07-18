# POS Foundation

POS Foundation is a proof-of-concept [open-source framework](https://github.com/bigcommerce/point-of-sale-foundation) that helps developers deliver custom point-of-sale checkout interfaces to BigCommerce merchants with brick-and-mortar locations. It provides a template to scaffold custom POS solutions that use secure, pre-certified EMV card readers. POS Foundation includes a default integration with Stripe Terminal, which can significantly accelerate development time. 


>>> general list of caveats that's too long to be a callout and should be a paragraph -- write them up with a collaborative tone that conveys this a cool proof-of-concept tutorial and starting place.
> * This is not a single-click installation app; it's a manual connector app and thus doesn't appear in the store control panel
>   * ^^ that's why it uses a store api account
>   * no app profile
>   * no multi-store install
>   * no ngrok tunnel
> * it doesn't use stripe platform
> * local network operations only
> * this app doesn't make its own channel -- we have a channels toolkit and subscriptionfound has some code that might be useful if you're developing it
> * this app isn't MSF or channel-aware
> * we love your pull requests. if you build this out into an app, please let us know

## Software requirements
* [Node.js](https://nodejs.org/en/) 14.0.0+
* The [npm](https://www.npmjs.com/) package manager
* A MongoDB database instance; this guide uses MongoDB Cloud

## Hardware requirements
* A [Stripe Terminal-enabled card reader](https://stripe.com/terminal)
* The card reader-compatible computer or other device on which you intend to run the POS system

## Configure accounts

<!-- theme: info -->
> #### Account configuration requirements
> We recommend that you use a sandbox store that has the same multi-storefront status as the production store. For example, if you're developing for a multi-storefront enabled merchant store, use a multi-storefront sandbox. For information on configuring multi-storefront, see [Multi-Storefront](https://support.bigcommerce.com/s/article/Multi-Storefront?language=en_US).

To configure your accounts, complete the following steps:

1. To develop and test apps, you need a BigCommerce sandbox store. If you don't have one, [Create a Sandbox Store](/api-docs/partner/getting-started/create-a-sandbox-store?source=subscription-foundation).

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
> #### Make note of the API account credentials
> * Make note of the `ACCESS_TOKEN`, `CLIENT ID`, and `CLIENT SECRET`. In a later step, you will use these credentials to update the `BC_AUTH_TOKEN`, `BC_APP_CLIENT_ID`, and `BC_APP_SECRET` environment variables in the `.env` file.
> * In addition, make note of your store's **store hash**. It is the path parameter that immediately precedes `v3` in the `API PATH` included with your store API account. In a later step, you will use the store hash to update the `BC_STORE_HASH` environment variable in the `.env` file.

## Fork and install the source repository 
To fork the repository, complete the following steps:

1. Fork the [point-of-sale-foundation repository (GitHub)](https://github.com/bigcommerce/point-of-sale-foundation) to your GitHub account.
2. Clone the fork to your local development environment.
3. Navigate to the root directory of your cloned repository and use npm to install the default packages for this framework.

```shell title="Install packages"
npm install
```

## Configure Stripe

* Store's single Stripe account only >>>
* this assumes the account is already created & configured for the store
* this assumes Stripe Terminal is already selected in some way?

To configure the Stripe account to connect to your implementation, complete the following steps:

1. Sign in to [Stripe Terminal](https://stripe.com/terminal).

2. In the >>> location, click **Dashboard** and make sure that you're interacting with Stripe in **Test mode**. Do not select the **Developers** dashboard. 
>>> is this right? there was a link to the developers dashboard -- see following comment

<!-- theme: info -->
> #### Test mode
> You can simulate transactions in test mode to confirm your integration works correctly.

<!-- You will should be in **Test mode** ([https://dashboard.stripe.com/test/developers](https://dashboard.stripe.com/test/developers)) -->
>>> add screenshot, preferably showing both test mode and the no-no developers section.


3. Locate the Stripe secret key. >>>
>>> can this instruction go at the end, UI-wise, to match how we've done "note the key" in subscriptionfound and in this draft?

<!-- theme: success -->
> #### Make note of the secret key
> Make note of the **secret key** and keep it in a safe location. In a later step, you will use the secret key to update the `STRIPE_SECRET_KEY` environment variable in the `.env` file.




(>>>is the next dashboard the general stripe one or a special terminal one?)
4. In the top menu (>>>??? location) of your Stripe Dashboard, click **More > Terminal**. When prompted to activate the Terminal section of the dashboard, click **Get Started**.
5. Add a location, then click on the location row to manage details. >>> context? UI page section, dialog box?
6. Add a new reader to the location. >>> is this the specific new reader? is there information that you're required to add?

## Configure the BigCommerce store

After you successfully configure test mode, configure your BigCommerce sandbox store in the store control panel.

To configure the store to make purchases through a POS, complete the following steps:

1. In the BigCommerce store control panel, configure a shipping zone with a [Pickup in Store](https://support.bigcommerce.com/s/article/Free-Shipping#in-store) shipping method.

2. To allow POS operations, enable [Optimized One-Page Checkout](https://support.bigcommerce.com/s/article/Optimized-Single-Page-Checkout?language=en_US#oopc-settings).

## Create and configure database

This app uses MongoDB. If you want to use a different database engine, update the configuration, migration, and seed files to use the data store of your choice. For a list of supported database options, see Prisma's [data source documentation](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-schema/data-sources/).

To configure your POS application to use MongoDB, complete the following steps: 

1. Open your fork of the project repository, then locate the `/prisma` directory. 

2. In the `/prisma/schema.prisma` settings file, set `provider` to `mongodb`. 


![POS-provider-mongodb](https://storage.googleapis.com/bigcommerce-production-dev-center/images/POS-provider-mongodb.png)

### Configure MongoDB Cloud

After you configure your application to use MongoDB, connect to a MongoDB instance. You can use MongoDB Cloud to get your implementation up and running quickly. In addition, MongoDB Cloud makes your data collections accessible from anywhere. 

To configure MongoDB Cloud and generate a connection URL, complete the following steps:

1. Visit [MongoDB Cloud](https://account.mongodb.com/) and [sign in](https://account.mongodb.com/account/login) or [sign up](https://account.mongodb.com/account/register) for an account.

2. On the left-hand sidebar, click **Database Access** > **ADD NEW DATABASE USER**.
  
   a. Create a username and password for the app to use, and leave all remaining fields as is. 

   b. Click **Add User**.

3. On the left-hand sidebar, click **Network Access** > **ADD IP ADDRESS**.
  
   a. Enter an IP address in the **Access List Entry** field. Using `0.0.0.0/0` will allow you to connect from anywhere, but is not secure in production.

    ![pos-ip-address](https://storage.googleapis.com/bigcommerce-production-dev-center/images/POS-IP-address.png)

   b. Click **Confirm**.

4. In the left sidebar, click **Database**.
  
   a. Click the **Connect** button in your running cluster.

   b. In the dialog that opens, click **Connect your application**.

   c. Copy the connection string and replace `<username>` and `<password>` with the values you specified in step 2a. Add **myFirstDatabase** to the connection string so that it resembles the following example:

```shell title="MongoDB Cloud connection string"
mongodb+srv://<username>:<password>@cluster0.sdfdfg65.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
```

![pos-connection-string](https://storage.googleapis.com/bigcommerce-production-dev-center/images/POS-connection-string.png)

<!-- theme: success -->
> #### Make note of the connection string
> Make note of the MongoDB Cloud connection string and keep it in a safe location. In a later step, you will use the connection string to update the `DATABASE_URL` environment variable in the `.env` file.

## Declare environment variables

After you create and configure the database, you have all the information you need to add environment variables to your project.

To declare environment variables, complete the following steps:

1. Create a `.env` file in the root directory of your project.
2. Copy the contents of `.env.sample` to `.env` with the following command:

```shell title="Copy .env.sample contents"
cp .env.sample .env
```
Open the `.env` file you just created and update the following environment variables:

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
>>> do we not need the Stripe public key?

## Run migration and start the server

After you add environment variables to your project, run the migration that creates the initial collections and documents your MongoDB instance needs to run the POS system.

To run the migration and seed the database, complete the following steps:
  
1. Run the pre-configured Prisma migration script that as defined in `/prisma/migrations/*` with the following command: 

```shell title="Create the database"
npx prisma db push
```

2. Seed your database with pre-configured collections and documents using the following command:
 
```shell title="Seed the database"
npm run seed
```

If you miss the preceding steps, you won't have data to work with. 

3. Next, generate a new Prisma client. This operation relies on the provider settings you configured in the preceding section on [creating and configuring the database](#create-and-configure-the-database). To create the initial client, use the following command:

```shell title="Generate the Prisma client"
npx prisma generate
```

4. Access the database to verify you have created the collections and documents correctly. You can use the following command, or connect with a GUI, such as [Compass](https://www.mongodb.com/products/compass).

```shell title="Verify migration and seed"
npx prisma studio
``` 

5. To start the server that runs the POS system, run the following command:

```shell title="Start the server"
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

Update your MongoDB Cloud IP address to 0.0.0.0/0.


## Resources
### Related articles
* [Point of Sale Foundation README](https://github.com/bigcommerce/point-of-sale-foundation/blob/main/README.md)
* [Connecting with Stripe](https://support.bigcommerce.com/s/article/Connecting-Stripe-Payment-Gateway#foundations)
