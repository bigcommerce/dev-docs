# Managing Apps in the Developer Portal

Create, edit, and submit apps for approval using the [Developer Portal](https://devtools.bigcommerce.com/). In [Beginning App Development](/api-docs/apps/guide/development) we briefly touched on how to create a draft app. In this article, we'll go over how to perform other common app management tasks. To get started, sign in or create an account in the [Developer Portal](https://devtools.bigcommerce.com/).  


<!-- theme: info -->
> #### Note
> `DRAFT` apps can only be installed on stores owned by the same email address as the developer portal account's email address.

## Create an app

To create an app, sign in to [Developer Portal](https://devtools.bigcommerce.com), then follow the instructions to [obtain app API credentials](/api-docs/getting-started/authentication/rest-api-authentication#obtaining-app-api-credentials).

To get app API credentials, you need a BigCommerce [Developer Portal](https://devtools.bigcommerce.com) account. Once you have an account, sign in and perform the following steps:

1. Click the **Create an app** button on the right side of the landing page.

![Create an App](https://s3.amazonaws.com/user-content.stoplight.io/6012/1537389767940 "Create an App")

2. Give your app a name. This name is only visible to you.
3. Click **Create**.
4. At the top of the modal that opens next, click **Step 2 - Technical**. Scroll down to assign your app the desired OAuth scopes. 

![Step 2 - Technical](https://storage.googleapis.com/bigcommerce-production-dev-center/images/app-api-account/devtools-technical.png "Step 2 - Technical")

![Assign OAuth scopes](https://storage.googleapis.com/bigcommerce-production-dev-center/images/app-api-account/devtool-oauth-scopes.png "Assign OAuth scopes")

5. Click **Update & Close** at the lower right-hand corner of the modal.

<!-- theme: info -->
> #### Information optional
> When you create or edit an app in the Dev Portal, no app information fields are mandatory unless you're preparing the app for BigCommerce [App Marketplace](https://bigcommerce.com/apps) approval.

6. A new modal will appear, asking if you want to add new OAuth scopes. Click **Confirm Update**.
7. Back on the Developer Portal landing page, find your app listed under the **Create an app** button. To view your client ID and client secret, click **View Client ID** next to the relevant app. You can access your API account credentials until you delete the app.

![View Client ID](https://s3.amazonaws.com/user-content.stoplight.io/6012/1537390078741 "View Client ID")

![Client ID and client secret](https://s3.amazonaws.com/user-content.stoplight.io/6012/1537390135692 "Client ID and client secret")

## View credentials

Click **View Client ID** to view an app's API credentials.

![Developer Portal](https://storage.googleapis.com/bigcommerce-production-dev-center/images/apps-04-developer-portal-01.png "Developer Portal")

[Learn how to use app credentials in the app OAuth flow](/api-docs/apps/guide/auth).

To edit an app, navigate to the Dev Portal's [My Apps dashboard](https://devtools.bigcommerce.com/my/apps) and click the **Edit App** pencil icon to the right of the app you want to edit.

## Edit the app

Edit an app by clicking the **Edit App** pencil icon to the right of the app you want to edit.

![Developer Portal](https://storage.googleapis.com/bigcommerce-production-dev-center/images/apps-04-developer-portal-01.png "Developer Portal")

<!-- theme: info -->
> #### Marketplace delay
> Edits can take up to 24 hours to appear in the [App Marketplace](https://www.bigcommerce.com/apps/), but changes are immediately effective and visible in your existing users' store control panels.

## Edit technical details

Click **Edit App**, then navigate to the **Technical** tab to edit enabled features, callback URLs, and OAuth scopes. After saving, edits to enabled features, callbacks URLs, and OAuth scopes are effective immediately for all app users.

![Technical Details](https://storage.googleapis.com/bigcommerce-production-dev-center/images/app-api-account/devtools-technical.png "Technical Details")

![OAuth Scopes](https://storage.googleapis.com/bigcommerce-production-dev-center/images/app-api-account/devtool-oauth-scopes.png "OAuth Scopes")

## Enable multi-storefront functionality

Click **Edit App**, then navigate to the **App Supported Features** tab to indicate whether your app supports stores that sell through multiple storefronts or sales channels. You can toggle multi-storefront on or off, then click the **Update & Close** button at the lower right of the dialog to save your change.

To learn more about modifying your app to support multi-storefront, see [Multi-Storefront App Compatibility and Optimization](/api-docs/apps/multi-storefront)

![MSF Toggle](https://storage.googleapis.com/bigcommerce-production-dev-center/images/app-api-account/devtools-msf.png "Toggle MSF on the App Supported Features tab")

## Submitting apps

Submit apps for [Apps Marketplace](https://www.bigcommerce.com/apps) approval by navigating to the [My Apps dashboard](https://devtools.bigcommerce.com/my/apps) in the Developer Portal, then finding the app you want approved and clicking the **Submit** checkmark icon to the right of its listing. [Learn more about completing app registration fields and submitting apps for approval](/api-docs/apps/guide/publishing).

![Developer Portal](https://storage.googleapis.com/bigcommerce-production-dev-center/images/apps-04-developer-portal-01.png "Developer Portal")


## Next steps
* [Implement the OAuth flow](/api-docs/apps/guide/auth).
* [Handle app callbacks](/api-docs/apps/guide/callbacks).

## Resources

### Related articles

* [Introduction to Building Apps](/api-docs/apps/guide/intro)
* [Beginning App Development](/api-docs/apps/guide/development)
* [Implementing App OAuth](/api-docs/apps/guide/auth)
* [App Approval Requirements](/api-docs/apps/guide/requirements)
* [Publishing an App](/api-docs/apps/guide/publishing)

### Other resources

* [Developer Portal](https://devtools.bigcommerce.com/) (devtools.bigcommerce.com)
* [Partner Portal](https://partners.bigcommerce.com/English/) (partners.bigcommerce.com)
* [Technology Partner Program](https://partners.bigcommerce.com/English/register_email.aspx) (partners.bigcommerce.com)
* [BigCommerce Apps Marketplace](https://www.bigcommerce.com/apps/) (bigcommerce.com)
* [Media Kit](https://www.bigcommerce.com/press/media-kit/) (bigcommerce.com)
