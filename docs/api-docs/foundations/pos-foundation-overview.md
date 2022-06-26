# POS Foundation
POS Foundation is an open-source solution that allows you to build a customized point-of-sale solution that uses secure, pre-certified EMV card readers. The integration into Stripe Terminal fast tracks builds of fully custom in-store POS applications that run on the BigCommerce platform, saving hundreds of hours. 

## Prerequisites
You will need the following:

* [BigCommerce sandbox store](https://developer.bigcommerce.com/docs/ZG9jOjM4MzMyNTE-create-a-sandbox-store?source=subscription-foundation) (required to develop and test apps)
* a database (BigCommerce recommends MongoDB) 
* a shipping zone with a [Pickup in Store](https://support.bigcommerce.com/s/article/Free-Shipping#in-store) shipping method 
* a [Stripe POS terminal and card reader](https://stripe.com/terminal)
* Experience using [npm](https://www.npmjs.com/)
* Node.js 14.x

## Requirements
Stripe comes pre-integrated within POS Foundation. Before enabling Stripe, the store must be using [Optimized One-Page Checkout](https://github.com/bigcommerce/cornerstone/blob/master/assets/scss/optimized-checkout.scss).

## Getting Started
1. Start by forking the point-of-sale-foundation repository.
2. Navigate to the root directory of your project and install npm packages.

```shell
npm install
```
## BigCommerce setup
1. [Create BigCommerce store](https://developer.bigcommerce.com/docs/ZG9jOjM4MzMyNTE-create-a-sandbox-store?source=subscription-foundation): go to [https://www.bigcommerce.com/essentials/](https://www.bigcommerce.com/essentials/?source=pos-foundation) and signup for a free trial if you don't have one.
2. The Bigcommerce store you are connected to must have "Pickup in Store" as a shipping option for orders to be created on the POS. Go to 'Settings -> Shipping' in your admin to turn it on.

3. Create BigCommerce v2/v3 API credentials. Go to 'Advanced Settings > API Accounts' and create and API Account with these scopes:

 **OAuth Scopes**
 
   |UI Name |Permission |Parameter |
   |--|--|--|
   |Customers |modify | `store_v2_customers`|
   |Information & settings |read-only|`store_v2_information_read_only`|
   |Orders |modify|`store_v2_orders`|
   |Create payments |create|`store_payments_access_token_create`|
   |Get payment methods |read-only|`store_payments_methods_read`|
   |Products |read only|`store_v2_products_read_only`|
   |Carts |modify|`store_cart`|
   |Checkouts |modify|`store_v2_checkouts`|
   |Channel Settings|modify|`store_channel_settings`|
   |Storefront API Tokens |manage|`store_storefront_api`|

4. Copy the `ACCESS_TOKEN`, `CLIENT ID`, and `CLIENT SECRET` credentials. In a later step, you will need these credentials to update `BC_APP_CLIENT_ID`, `BC_APP_SECRET`, and `BC_AUTH_TOKEN` environment variables in the .env file.

## Stripe setup

1. Go to your Stripe dashboard: https://dashboard.stripe.com/test/developers
2. Copy the Stripe secret key. In a later step, you will use the secret key to update the environment variable `STRIPE_SECRET_KEY` in the .env file.
3. Go to 'More > Terminal' in the dashboard. Press 'Get Started' when asked to activate the Terminal section.
4. Add a location, then click on the location row to manage details.
5. Add a new reader to the location.

## Database setup

This app works with MongoDB. The `provider` setting in the `/prisma/schema.prisma` should be set to `mongodb`. 

![POS-provider-mongodb](https://storage.googleapis.com/bigcommerce-production-dev-center/images/POS-provider-mongodb.png)

We highly recommend using MongoDB, but if you would like to use another type of database, you will need to update the configuration to work with the database of your choice. View the available database options here: https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-schema/data-sources/

Mongo Cloud (https://cloud.mongodb.com) generates the `DATABASE_URL` as shown in the setup instructions below. In a later step, you will need the `DATABASE_URL` to update the environment variable in .env file. 

### Mongo Cloud setup instructions

1. Click [here](https://account.mongodb.com/) and log in.  If you don't have an account, you can click [SignUp](https://account.mongodb.com/account/register).

2. On the left-hand sidebar, click 'Database Access' > 'ADD NEW DATABASE USER'.
  
    a. Fill in your username and password, and leave all remaining fields as is.
  
    b. Click 'Add User'.


3. On the left-hand sidebar, click 'Network Access' > 'ADD IP ADDRESS'.
  
    a. Enter an IP address in the 'Access List Entry' field. We recommend using 0.0.0.0/0 so you can connect from anywhere.

      ![pos-ip-address](https://storage.googleapis.com/bigcommerce-production-dev-center/images/POS-IP-address.png)
  
    b. Click 'Confirm'.

4. On the left-hand sidebar, click 'Database'.
  
    a. Click the 'Connect' button in your running cluster.
  
    b. Click 'Connect your application' in the popup modal.
  
    c. Copy the connection string and replace \<password> with the password and \<username> with the username created in step 2a. Also add 'myFirstDatabase' to the connection string as shown below.

    ```shell
    mongodb+srv://<username>:<password>@cluster0.jfohhb8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
    ```
<!-- theme: info -->
> #### Note 
> This MongoDB connection string is what you should use to update the `DATABASE_URL` variable in the .env file.

![pos-connection-string](https://storage.googleapis.com/bigcommerce-production-dev-center/images/POS-connection-string.png)

## Create local environment file

1. Create a `.env` file in the root directory of your project.
2. Copy the content of `.env-sample` to `.env`.
```bash
cp .env.sample .env
```
At a minimum, the following .env variables need to be updated for the app to sucessfully run.

- `DATABASE_URL`
  - Follow the [Database setup](#database-setup) instructions to get this.
- `BC_STORE_HASH`, `BC_AUTH_TOKEN`, `BC_CHANNEL_ID`, `BC_GQL_URL, `BC_APP_CLIENT_ID`, and `BC_APP_SECRET`
  - Follow the [BigCommerce setup](#bigcommerce-setup) instructions to get these.
- `STRIPE_SECRET_KEY`
  - Follow the [Stripe setup](#stripe-setup) instructions to get these.
  
## Create and seed database
  
 1. Once you set up your Mongo Cloud account, create the database and seed it with data by doing the following:

```
  $ npx prisma db push

  $ npm run seed
```

2. Generate a new prisma client using your database provider settings.

```
  $ npx prisma generate
```

<!-- theme: info -->
> #### Note 
> `npx prisma generate` is what creates the DB tables and initial client. If you miss this step, you'll see errors about prisma missing. 
 

3. Now you'll be able to access this database locally via a visual editor and verify you have created the table correctly.

```
  $ npx prisma studio
```

<!-- theme: info -->
> #### Note 
> You can also use Mongo Compass as your database GUI. Download and install to connect: [Mongo Compass](https://www.mongodb.com/products/compass)

4. Run app

```bash
npm run dev
```

Now, the app will be running locally!

Login as an admin role here: http://localhost:3000/signin (the default admin PIN in the seed data is: 1234)

Once logged in, navigate to the 'Settings' screen to save your store address. The app uses your store address for checkout tax calculations. You will receive the following error if you do not supply the store address.
  
![pos-missing-store-address](https://storage.googleapis.com/bigcommerce-production-dev-center/images/POS-missing-store-address.jpeg)


## Connecting to a reader in the POS

On the main register screen, press the 'wifi' icon, which will read all of your terminals from Stripe and check if they are active on your network.

Press 'Connect' for the active terminal you'd like to use to take payment at checkout.
 

## Troubleshooting
### Seeing {"Environment variable not found"} when creating the DB tables and initial client

If you do not enter the correct provider in the `/prisma/schema.prisma` file or the .env file contains an incorrect `DATABASE_URL`.

### Seeing {"Server selection timeout: No available servers"} when creating and seeding the database

Update your Mongo Cloud IP address to 0.0.0.0/0. This IP address 


## Resources
### Related articles
* [README.md]([https://github.com/bigcommerce/subscription-foundation/blob/main/README.md](https://github.com/bigcommerce/point-of-sale-foundation/blob/main/README.md))
* [Connecting with Stripe](https://support.bigcommerce.com/s/article/Connecting-Stripe-Payment-Gateway#foundations)
