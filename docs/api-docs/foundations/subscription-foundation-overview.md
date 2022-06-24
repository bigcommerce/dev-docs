# Subscription Foundation

Subscription Foundation is an open-source "subscribe and save" solution that makes it easy to create custom subscription billing and invoices for your business.

## Prerequisites
To set up subscription billing, you will need the following:
* [BigCommerce sandbox store](https://developer.bigcommerce.com/docs/ZG9jOjM4MzMyNTE-create-a-sandbox-store?source=subscription-foundation) (required to develop and test apps)
* [Developer Portal Account](https://devtools.bigcommerce.com/?source=subscription-foundation) (required to register apps)
* Experience using [npm](https://www.npmjs.com/)
* Node.js 14.x

## Requirements
Stripe comes pre-integrated within Subscription Foundation. Before enabling Stripe, the store must be using [Optimized One-Page Checkout](https://github.com/bigcommerce/cornerstone/blob/master/assets/scss/optimized-checkout.scss).

## Set up
The set up consists of exposing the app to the internet, registering the app, setting up Stripe, creating and updating the environment file, and installing app dependencies before running the app.

See the [README.md](https://github.com/bigcommerce/subscription-foundation/blob/main/README.md) file for detailed steps for installing Subscription Foundation. 

## Troubleshooting
### Seeing {"Environment variable not found} when creating the DB tables and initial client

If you do not enter the correct provider in the `/prisma/schema.prisma` file or the .env file contains an incorrect `DATABASE_URL`.

### Seeing {"error": "Not found"} when installing the app

If you don't request the proper scopes, the /api/auth request might fail. Check your scopes in the BigCommerce Dev Tools area. Look at the scopes listed above in the [BigCommerce setup](#bigcommerce-setup) section.


## Resources
### Related articles
* [README.md](https://github.com/bigcommerce/subscription-foundation/blob/main/README.md)
* [Connecting with Stripe](https://support.bigcommerce.com/s/article/Connecting-Stripe-Payment-Gateway#foundations)
