# Managing Apps in the Developer Portal

Create, edit, and submit apps for approval using the [Developer Portal](https://devtools.bigcommerce.com/). In [Beginning App Development](/api-docs/apps/guide/development) we briefly touched on how to create a draft app. In this article, we'll go over how to perform other common app management tasks. To get started, sign in or create an account in the [Developer Portal](https://devtools.bigcommerce.com/).  

<!-- theme: info -->
> #### Store email address constraint
> Apps that aren't approved for distribution through the [Apps Marketplace](https://bigcommerce.com/apps) can only be installed on stores owned by the same email address as the developer portal account's email address.

## Create an app

To create an app, sign in to or create an account with the [Developer Portal](https://devtools.bigcommerce.com). Creating an app also creates an app API account. To learn more about app API accounts, see the [Guide to API Accounts](/api-docs/getting-started/authentication/rest-api-authentication#app-api-accounts).

1. Click the **Create an app** button on the right side of the landing page.

![Create an App](https://storage.googleapis.com/bigcommerce-production-dev-center/images/apps-04-developer-portal-01.png "Create an App")

2. Give your app a name. This name is only visible to you.
3. Click **Create**.
4. At the top of the dialog that opens next, click the **Technical** tab. Scroll down to assign your app the desired OAuth scopes. 

![Technical](https://storage.googleapis.com/bigcommerce-production-dev-center/images/app-api-account/devtools-technical.png "Technical")

![Assign OAuth scopes](https://storage.googleapis.com/bigcommerce-production-dev-center/images/app-api-account/devtool-oauth-scopes.png "Assign OAuth scopes")

5. Click the **Update & Close** button on the dialog's lower right.

<!-- theme: info -->
> #### Information optional
> When you create or edit an app in the Dev Portal, no app information fields are mandatory unless you're preparing the app for BigCommerce [Apps Marketplace](https://bigcommerce.com/apps) approval. To learn more about completing an app profile for approval, see our [App Publishing Guide](/api-docs/apps/guide/publishing).

6. A new dialog box will open, asking if you want to add new OAuth scopes. Click **Confirm Update**.
7. You can view the client ID and client secret any time; see the following section on [viewing credentials](#view-credentials).
8. To learn about deleting an app and its API account, see the [Guide to API Accounts](/api-docs/getting-started/authentication/rest-api-authentication#delete-apps-carefully)

## View credentials

To view an app API account's credentials, navigate to the Dev Portal's [My Apps dashboard](https://devtools.bigcommerce.com/my/apps) and click the **View Client ID** padlock icon to the right of the relevant app's listing. The dialog box that opens will reveal your API account credentials. To learn more about using an app API account to generate store-specific access tokens, see [Implementing the OAuth Flow](/api-docs/apps/guide/auth).

![Developer Portal](https://storage.googleapis.com/bigcommerce-production-dev-center/images/apps-04-developer-portal-01.png "Developer Portal")

## Edit an app

To edit an app, navigate to the Dev Portal's [My Apps dashboard](https://devtools.bigcommerce.com/my/apps) and click the **Edit App** pencil icon to the right of the app you want to edit.

![Developer Portal](https://storage.googleapis.com/bigcommerce-production-dev-center/images/apps-04-developer-portal-01.png "Developer Portal")

<!-- theme: info -->
> #### Marketplace delay
> Edits can take up to 24 hours to appear in the [App Marketplace](https://www.bigcommerce.com/apps/), but changes are immediately effective and visible in your existing users' store control panels.

## Edit technical details

In the Dev Portal's [My Apps dashboard](https://devtools.bigcommerce.com/my/apps), click the **Edit App** pencil icon to the right of the app you want to edit. At the top of the dialog that opens, click the **Technical** tab to edit enabled features, callback URLs, and OAuth scopes. To save your change, click the **Update & Close** button on the dialog's lower right. After saving, edits are effective immediately for all app users.

![Technical Details](https://storage.googleapis.com/bigcommerce-production-dev-center/images/app-api-account/devtools-technical.png "Technical Details")

![OAuth Scopes](https://storage.googleapis.com/bigcommerce-production-dev-center/images/app-api-account/devtool-oauth-scopes.png "OAuth Scopes")

## Enable multi-storefront functionality

If your app supports stores that sell through multiple storefronts or sales channels, add that information to the app's profile.

In the Dev Portal's [My Apps dashboard](https://devtools.bigcommerce.com/my/apps), click the **Edit App** pencil icon to the right of the app you want to edit. At the top of the dialog that opens, click the **App Supported Features** tab. Select either **Single Storefront** or **Multi Storefront**, then save your change by clicking the **Update & Close** button on the dialog's lower right.

To learn more about modifying your app to support multi-storefront, see [Multi-Storefront App Compatibility and Optimization](/api-docs/apps/multi-storefront)

![MSF Toggle](https://storage.googleapis.com/bigcommerce-production-dev-center/images/app-api-account/devtools-msf.png "Toggle MSF on the App Supported Features tab")

## Submit an app for approval

Submit apps for [Apps Marketplace](https://www.bigcommerce.com/apps) approval by navigating to the Dev Portal's [My Apps dashboard](https://devtools.bigcommerce.com/my/apps), then finding the app you want approved and clicking the **Submit** checkmark icon to the right of its listing. If you've left any required fields incomplete, the Dev Portal will prompt you to complete the app's profile. [Learn more about completing app registration fields and submitting apps for approval](/api-docs/apps/guide/publishing).

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
