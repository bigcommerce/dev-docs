# Types of Apps

<div class="otp" id="no-index">

### On This Page
- [Single Click Apps](#single-click-apps)
- [Connector Apps](#connector-apps)
- [Unlisted Marketplace Apps](#unlisted-marketplace-apps)
- [Personal Apps](#personal-apps)
- [Scripts](#scripts)
- [Resources](#resources)

</div>

The first step to developing a BigCommerce app is deciding which type of app to develop.

The BigCommerce ecosystem facilitates the creation of multiple types of apps. Determining which type of app to create largely depends on the nature and size of the intended user-base. For example, Single Click Apps are listed on the BigCommerce marketplace and can be installed on any BigCommerce store; Personal Apps, on the other hand, are intended for a specific merchant and are not listed on the marketplace. For more information, see the detailed descriptions of each app type below.

## Single Click Apps

Single-click apps are listed in our App Marketplace, making them available for installation on all BigCommerce stores. The “single-click” app flow does not mean users install the app in a single click, but rather, the app does not require the customer to install OAuth credentials themselves or configure any settings for a third party service.

To put an app on the Marketplace, you must first be a BigCommerce partner and have your app approved through the App Submission Process. After becoming a partner and having the app approved you have the option of charging merchants to use the app.
Single-click apps use the Client ID and Client Secret obtained from the Dev Tools workspace to request an OAuth token during the [single-click app authentication flow.](/api-docs/getting-started/building-apps-bigcommerce/building-apps#building-apps_oauth-summary)

## Connector Apps

Some apps qualify to be listed in the BigCommerce App Marketplace as “Connector” apps. These apps use manual OAuth token creation instead of the single-click app flow.
While we always recommend and prefer the single-click app flow’s programmatic OAuth exchange, certain use cases might not be compatible.

Use Cases:
- Customized integrations that vary per store.
- Integrations that do not provide any content for an iframe.
- Apps that do not provide Web services for OAuth exchange. (For example: offline sync apps.)
- Apps that do not provide Web or cloud-hosted components for a dashboard.

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

<!-- theme:  -->

### Connector apps
> Connector apps require the store owner to create API Credentials in the Control Panel and then pass those values into the app manually. The single-click installation process is preferred since it does not require this step.

</div>
</div>
</div>

<br>

To create a connector app that uses manual OAuth token creation, make the following selections on the Technical tab when registering your app in Dev Tools:

1. Set the App Type option to Connector.
2. Enter your app’s Signup URL. This is the URL where a user would begin to configure the connection between your service and the BigCommerce store.
3. Under OAuth scopes, select the scopes that your app requires for BigCommerce review only. Later, you will need to instruct store users to create a token with the production scopes your app needs.

BigCommerce must review and approve your connector app proposal before we will accept the app’s submission to the Marketplace.

If you’re interested in submitting your integration as a connector app, please contact out to <a href="mailto:appstore@bigcommerce.com">appstore@bigcommerce.com</a>. to discuss your plan.

## Unlisted Marketplace Apps

Approved partners have the option of uploading “unlisted” apps to the App Marketplace. An unlisted app is a published app that does not show up in the public BigCommerce marketplace. To create an unlisted app, you need to be a BigCommerce Partner.

Use Cases:
- A partner is beta-testing an integration before a full Marketplace launch.
- A BigCommerce user with several stores wants to install a custom app on all of them. Submitting an unlisted app offers a streamlined alternative to creating separate draft or test apps for each store. To have an app unlisted, please contact
 <a href="mailto:appstore@bigcommerce.com">appstore@bigcommerce.com</a>.

## Personal Apps

In some cases, you might want to create an app that uses the Single-click Oauth flow to install in a merchant’s control panel, but you do not want to list the app for sale in the App Marketplace. Personal Apps are draft apps, created from the [Dev Tools](https://devtools.bigcommerce.com/) workspace, that are never published to the App Marketplace and remain in draft status permanently.

Use Cases:
- You are creating a custom application for a single merchant’s store.
- You are testing your app before submission, and it doesn’t need to be distributed to other stores.

To install a Personal app on a store, your Dev Tools login credentials must be the same as the store owner login credentials for the store where you intend to install the app.

## Scripts

You may wish to write a small program that can make requests against a store’s API that does not install in the store’s control panel. Scripts connect to a store solely through API credentials: they don’t install in the control panel or present a UI to the user.

To get started with writing scripts, all you need are API Credentials from the store’s Control Panel.  Learn more about [making your first request](/api-docs/getting-started/basics/making-requests) with the BigCommerce API.

## Resources

### Related Articles
* [Building a BigCommerce App Using Laravel and React](https://medium.com/bigcommerce-developer-blog/building-a-bigcommerce-app-using-laravel-and-react-711ceceb5006) (BigCommerce Developer Blog)
