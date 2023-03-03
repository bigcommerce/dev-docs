# Managing Apps in the Developer Portal

Create, edit, and submit apps for approval using the [Developer Portal](https://devtools.bigcommerce.com/). In [Beginning App Development](/api-docs/apps/guide/development), we briefly touched on how to create a draft app. In this article, we'll go over how to perform other common app management tasks. To get started, sign in or create an account in the [Developer Portal](https://devtools.bigcommerce.com/).

<!-- theme: info -->
> #### Store email address constraint
> Apps that aren't approved for distribution through the [App Marketplace](https://bigcommerce.com/apps) can only be installed on stores owned by the same email address as the developer portal account's email address.

## Create an app profile

Creating an app also creates an app API account. To learn more about app API accounts, see the [Guide to API Accounts](/api-docs/getting-started/authentication/rest-api-authentication#app-api-accounts). To create an app, do the following:

<!-- theme: info -->
> #### Information optional
> No app profile fields are mandatory unless you're preparing the app for BigCommerce [App Marketplace](https://bigcommerce.com/apps) approval. To learn more about preparing an app for approval, see our [App Publishing Guide](/api-docs/apps/guide/publishing).

1. Sign in or create an account with the [Developer Portal](https://devtools.bigcommerce.com).

2. Click the **Create an app** button on the right side of the landing page.

![Create an App](https://storage.googleapis.com/bigcommerce-production-dev-center/images/app-api-account/devtool-create-app.png "Create an App")

3. Give your app a name in the **What would you like to call your app?** dialog. This name is only visible to you. Once complete, click the **Create** button.

![Name the app](https://storage.googleapis.com/bigcommerce-production-dev-center/images/app-api-account/devtool-name-app-dialog.png "Name the App")

4. The **app registration dialog** appears; click the **Technical** tab at the top.

![Technical](https://storage.googleapis.com/bigcommerce-production-dev-center/images/app-api-account/devtools-technical.png "Technical")

5. Scroll down to the **OAuth scopes** section and toggle the necessary OAuth scopes for your app.

![Assign OAuth scopes](https://storage.googleapis.com/bigcommerce-production-dev-center/images/app-api-account/devtool-oauth-scopes-tight.png "Assign OAuth scopes")

6. Click the **Update & Close** button on the registration dialog's lower right corner.

7. A new dialog opens, asking if you want to add new OAuth scopes. Click **Confirm Update**.

![Confirm OAuth changes](https://storage.googleapis.com/bigcommerce-production-dev-center/images/app-api-account/devtool-oauth-scopes-confirm.png "Confirm OAuth changes")

You can view the client ID and client secret any time; see the following section on [viewing credentials](#view-credentials).

## View credentials

1. To view an app API account's credentials, navigate to the Dev Portal's [My Apps dashboard](https://devtools.bigcommerce.com/my/apps) and click the **View Client ID** padlock icon to the right of the relevant app's listing. 

![Menu - view client ID](https://storage.googleapis.com/bigcommerce-production-dev-center/images/app-api-account/devtool-app-menu-client-id.png "View Client ID")

2. A dialog box opens to reveal your API account credentials.

To learn more about using an app API account to generate store-specific access tokens, see [Implementing the OAuth Flow](/api-docs/apps/guide/auth).

## Edit an app profile

1. To edit an app, navigate to the Dev Portal's [My Apps dashboard](https://devtools.bigcommerce.com/my/apps) and click the **Edit App** pencil icon to the right of the app you want to edit.

![Menu - edit app](https://storage.googleapis.com/bigcommerce-production-dev-center/images/app-api-account/devtool-app-menu-edit-app.png "Edit an App")

2. The **edit app dialog** opens. It is identical to the app registration dialog.

![Edit app dialog](https://storage.googleapis.com/bigcommerce-production-dev-center/images/app-api-account/devtool-edit-dialog-landing.png "Edit App / App Registration Dialog Landing View")


<!-- theme: info -->
> #### Marketplace delay
> Edits can take up to 24 hours to appear in the [App Marketplace](https://www.bigcommerce.com/apps/), but changes are immediately effective and visible in your existing users' store control panels.

### Edit technical details

1. Once you [enter the app dialog](#edit-an-app), click the **Technical** tab at the top to edit enabled features, callback URLs, and OAuth scopes. 

![Technical Details](https://storage.googleapis.com/bigcommerce-production-dev-center/images/app-api-account/devtools-technical.png "Technical Details")

![Assign OAuth scopes](https://storage.googleapis.com/bigcommerce-production-dev-center/images/app-api-account/devtool-oauth-scopes-tight.png "Assign OAuth scopes")
   
2. To save your change, click the **Update & Close** button on the edit dialog's lower right corner. 

3. A new dialog opens, asking if you want to add new OAuth scopes. Click **Confirm Update**.

![Confirm OAuth changes](https://storage.googleapis.com/bigcommerce-production-dev-center/images/app-api-account/devtool-oauth-scopes-confirm.png "Confirm OAuth changes")

4. After saving, edits are effective immediately for all app users.

### Indicate multi-storefront support

If your app supports stores that sell through multiple storefronts or sales channels, add that information to the app's profile.

1. Once you [enter the edit app dialog](#edit-an-app), click the **App Supported Features** tab at the top. 

![MSF Toggle](https://storage.googleapis.com/bigcommerce-production-dev-center/images/app-api-account/devtools-msf.png "Toggle MSF on the App Supported Features tab")

2. Select either **Single Storefront** or **Multi Storefront**. This doesn't grant or deny your app access to any APIs; it helps us test and label your app appropriately. 

3. To save your change, click the **Update & Close** button on the edit dialog's lower right corner. 

To read about designing or modifying your app to support multi-storefront, see [Multi-Storefront App Compatibility and Optimization](/api-docs/apps/multi-storefront)

## Submit an app for approval

1. Submit apps for [App Marketplace](https://www.bigcommerce.com/apps) approval by navigating to the Dev Portal's [My Apps dashboard](https://devtools.bigcommerce.com/my/apps), then finding the app you want approved and clicking the **Submit** checkmark icon to the right of its listing. 

![Menu - submit](https://storage.googleapis.com/bigcommerce-production-dev-center/images/app-api-account/devtool-app-menu-submit.png "Submit an App")

2. The registration dialog opens; complete the app's profile. 
 
To learn more about completing app registration fields and submitting apps for approval, consult our [App Publishing Guide](/api-docs/apps/guide/publishing).

## Deleting apps

Deleting an app also deletes its API account. This is a destructive action; you can't recover the app or its API account. Do not delete an app without serious consideration, particularly if it is in production. It is likely to have far-reaching negative impacts on your users' stores.

To learn about mitigating the risks of deleting an app and its API account, see the [Guide to API Accounts](/api-docs/getting-started/authentication/rest-api-authentication#delete-apps-carefully).

1. To delete an app, navigate to the Dev Portal's [My Apps dashboard](https://devtools.bigcommerce.com/my/apps) and click the **Delete App** trash can icon to the right of the app you want to edit. 

![Menu - delete app](https://storage.googleapis.com/bigcommerce-production-dev-center/images/app-api-account/devtool-app-menu-delete.png "Delete an App")

2. The **delete app dialog** opens to verify whether you truly want to delete the app. Click **Delete**.

![Delete App Dialog](https://storage.googleapis.com/bigcommerce-production-dev-center/images/app-api-account/devtool-delete-app-confirm.png "Delete App Dialog")

## Next steps
* [Implement the OAuth flow](/api-docs/apps/guide/auth)
* [Handle app callbacks](/api-docs/apps/guide/callbacks)

## Resources

### Related articles

* [Introduction to Building Apps](/api-docs/apps/guide/intro)
* [Beginning App Development](/api-docs/apps/guide/development)
* [Implementing App OAuth](/api-docs/apps/guide/auth)
* [App Approval Requirements](/api-docs/apps/guide/requirements)
* [Publishing an App](/api-docs/apps/guide/publishing)
* [Guide to API Accounts](/api-docs/getting-started/authentication/rest-api-authentication)

### Other resources

* [Developer Portal](https://devtools.bigcommerce.com/) (devtools.bigcommerce.com)
* [Partner Portal](https://partners.bigcommerce.com/English/) (partners.bigcommerce.com)
* [Technology Partner Program](https://partners.bigcommerce.com/English/register_email.aspx) (partners.bigcommerce.com)
* [BigCommerce App Marketplace](https://www.bigcommerce.com/apps/) (bigcommerce.com)
