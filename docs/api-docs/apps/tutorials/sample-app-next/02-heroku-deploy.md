# Deploy to Heroku install flow

To get the sample app up and running quickly, you can use the deploy to [Heroku](https://www.heroku.com/home) install flow described below. You will need a [Heroku](https://www.heroku.com/home) account to use this flow. If you don’t have a Heroku account, you can sign up for free [here](https://signup.heroku.com/).

1. Fork the BigCommerce's [sample-app-nodejs](https://github.com/bigcommerce/sample-app-nodejs) repository.
2. In your fork, locate the `README.md` file. Click **Deploy to Heroku**. This will open Heroku's [Create New App](https://dashboard.heroku.com/) page in your browser.

![Deploy to Heroku](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Sample_app/nextjs-app-heroku-1.png "Deploy to Heroku")

3. You will be prompted to fill out app details. Give your app a name, then scroll down to Config Vars. Replace the `<APP NAME>` placeholder inside `AUTH_CALLBACK` with your app's name.
4. To obtain the Client ID and Client Secret, log into the [Developer Portal](https://devtools.bigcommerce.com/my/apps) and click **Create an app**. 

![Create an App](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Sample_app/nextjs-app-03.png "Create an App")

5. Name your app and click **Create**.
6. A new window will open prompting you to fill out the details. Feel free to skip this step and click **Close**.
7. On the My Apps page, locate your newly created app and click **View Client ID**. This will open a new window displaying your Client ID and Client Secret.
8. Copy and paste your app's Client ID and Client Secret into your Heroku app.
9. Click **Deploy app** at the bottom of Heroku's Create New App page. Wait for the deploy script to finish running. 

![Deploy app](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Sample_app/nextjs-app-heroku-2.png "Deploy app")

10. In the Developer Portal, click **Edit App**.
11. Open the **Technical** tab. In App Features, select STORE OWNER for **Multiple Users** and SINGLE-CLICK for **App Type**.
12. Scroll down to **Callback URLs** and update Auth, Load, and Uninstall URLs replacing placeholders with your heroku app url. For example, your Auth Callback should look similar to the following:  `https://heroku-sample-app.herokuapp.com/api/auth`.
13. Scroll down to OAuth scopes and set the **Products** access to MODIFY.
14. Click **Update & Close**.
15. In your sandbox store control panel, go to **Apps** > **My Apps** > **My Draft Apps**. Open your app and press **Install**. Click **Confirm**. This will install the app on your store. The installed app should look similar to the following:

**Home page**

![Home page](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Sample_app/nextjs-app-16.png "Home page")

**Products page**

![Products page](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Sample_app/nextjs-app-14.png "Products page")

**Product page**

![Product page](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Sample_app/nextjs-app-17.png "Product page")
