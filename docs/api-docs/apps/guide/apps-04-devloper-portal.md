# Managing Apps in the Developer Portal

Create, edit, and submit apps for approval using the [Developer Portal](https://devtools.bigcommerce.com/). In [Beginning App Development](/api-docs/apps/guide/development) we briefly touched on how to create a draft app. In this article, we'll go over how to perform other common app management tasks. To get started, sign in or create an account in the [Developer Portal](https://devtools.bigcommerce.com/).  


<!-- theme: info -->
> #### Note
> `DRAFT` apps can only be installed on stores owned by the same email address as the developer portal account's email address.

## Create an app

To create an app, sign in to [Developer Portal](https://devtools.bigcommerce.com), then follow the instructions to [obtain app API credentials](/api-docs/getting-started/authentication/rest-api-authentication#obtaining-app-api-credentials).

## Edit the app

Edit an app by clicking the **Edit App** pencil icon to the right of the app you want to edit.

![Developer Portal](https://storage.googleapis.com/bigcommerce-production-dev-center/images/apps-04-developer-portal-01.png "Developer Portal")

<!-- theme: info -->
> #### Marketplace delay
> Edits can take up to 24 hours to appear in the [App Marketplace](https://www.bigcommerce.com/apps/), but changes are immediately effective and visible in your existing users' store control panels.

## Edit technical details

Click **Edit App**, then navigate to the technical tab to edit enabled features, callback URLs, and OAuth scopes. After saving, edits to enabled features, callbacks URLs, and OAuth scopes are effective immediately for all app users.

![Technical Details](https://storage.googleapis.com/bigcommerce-production-dev-center/images/app-api-account/devtools-technical.png "Technical Details")

![OAuth Scopes](https://storage.googleapis.com/bigcommerce-production-dev-center/images/app-api-account/devtool-oauth-scopes.png "OAuth Scopes")





## Viewing credentials

Click **View Client ID** to view an app's API credentials.

![Developer Portal](https://storage.googleapis.com/bigcommerce-production-dev-center/images/apps-04-developer-portal-01.png "Developer Portal")

[Learn how to use app credentials in the app OAuth flow](/api-docs/apps/guide/auth).

<!-- theme: info -->
> #### The X-Auth-Client header is deprecated
> Your API account's client ID is [no longer a required header value](https://developer.bigcommerce.com/changelog#posts/o-auth-client-id-is-no-longer-required-for-requests-to-api-bigcommerce-com).



## Submitting apps

Submit apps for [Apps Marketplace](https://www.bigcommerce.com/apps) approval by clicking **Submit**.

![Developer Portal](https://storage.googleapis.com/bigcommerce-production-dev-center/images/apps-04-developer-portal-01.png "Developer Portal")

[Learn more about completing app registration fields and submitting apps for approval](/api-docs/apps/guide/publishing).

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
