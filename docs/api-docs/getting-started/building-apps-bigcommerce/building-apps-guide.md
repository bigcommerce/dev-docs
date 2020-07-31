# Building an App

<div class="otp" id="no-index">

### On This Page
- [Getting Started](#getting-started)
- [Creating App in DevTools](#creating-app-in-devtools)
- [Implementing OAuth Flow](#implementing-oauth-flow)
- [Handling App Callbacks](#handling-app-callbacks)
- [Listening for Events with Webhooks](#listening-for-events-with-webhooks)
- [Testing Apps Locally](#testing-apps-locally)
- [Supporting Multiple Users](#supporting-multiple-users)
- [Creating Install Buttons](#creating-install-buttons)
- [Designing the UI](#designing-the-ui)
- [Hosting the App](#hosting-the-app)
- [FAQ](#faq)
- [Resources](#resources)

</div>

This article is an high-level guide to building apps on BigCommerce. For a step-by-step tutorial, see []().

### Prerequisites

## Getting Started

1. Create a [Free Trial](https://www.bigcommerce.com/essentials/free-trial)
2. Apply to be a [Technology Partner](https://developer.bigcommerce.com/api-docs/partner/becoming-a-partner)
3. Create a [developer account](https://devtools.bigcommerce.com/)

## Creating App in DevTools

Minimum steps. Links out to article.

## Implementing OAuth Flow

Go here for oauth flow...

## Handling App Callbacks

## Listening for Events with Webhooks
## Testing Apps Locally
## Supporting Multiple Users

When you register your app with BigCommerce, enabling multi-user support will allow store admins to manually authorize users – other than the store owner – to load the app.

As soon as you enable multi-user support, the control panel of any store that has your app installed will be affected. If you already have an app published in the App Marketplace, be aware that this setting takes effect immediately. Therefore, we recommend testing your multi-user support using a separate app that is in draft status.

Let your customers know that you’ve enabled this feature. Otherwise, they won’t know that they can start granting access to users.

If multi-user support is added after your app has launched, the update will cause the app scopes to change and users will be alerted of the new permission request.

### The Control Panel Experience
Store admins will be able to adjust user permissions to grant/deny other store users’ access to your app. The next time the user logs in, they will see any apps for which they have been granted access. The user can then click on the app icon in the left navigation to load it.
Use your draft app and your sandbox store to review this behavior.

### The Load Request
Apps that support multiple users can expect the email and ID of the user that initiated the callback in addition to the owner’s email and ID in the JSON object sent in the load request. If a load request is sent with information for a user you haven’t seen yet, you should provision the user account and associate it with the store in your database.

Because you know the store owner’s email and ID from the App Installation sequence, your app can distinguish store owners from other users. This allows you to provide different user experiences based on the information in the load request. Here is a summary of the two types of users:

- Store owner: Can install, uninstall, and load apps.
- Users: Cannot install or uninstall apps. Permitted only to load the apps that a store admin has authorized.

For further details, please see [Load Request and Response](#load-request-and-response).

### The Remove User Request
In addition to their ability to add users, store admins can also remove users. This action generates a GET request to the Remove User Callback URI that you provided in My Apps. Your app the user identified in the request from its records.

For further information, please see [Remove User Request](#remove-user-request-optional).

## Creating Install Buttons

Apps can be installed from outside the BigCommerce control panel. For example, you could create an install link on your company’s site that directs the merchant to download your app. This section provides a step-by-step guide.

### Create an Install Button

First, embed an install button like the one below, at any web location from which you’d like to enable app installation:

<!--
    title:
    data: //s3.amazonaws.com/user-content.stoplight.io/6490/1539297285625
-->

![](//s3.amazonaws.com/user-content.stoplight.io/6490/1539297285625 "")

Redirect anyone who presses your button to: `https://login.bigcommerce.com/app/<your-app's-client-id>/install`

### Configure Your Button
Upon clicking, your button should open a modal similar to the image below. We recommend a modal sized 900px wide by 450px high.

<!--
    title:
    data: //s3.amazonaws.com/user-content.stoplight.io/6490/1539297431440
-->

![](//s3.amazonaws.com/user-content.stoplight.io/6490/1539297431440 "")

Your button will link merchants to BigCommerce’s install endpoint for your application. Once the merchant clicks the link, they will be prompted to log in, then authorize your application, just like in the [normal installation flow](#installation-and-update-sequence).

### Render Success/Failure Pages

Modify your application code to serve either a success or failure page, depending on whether the external installation was successful or unsuccessful.

If you skip this step, your application will load in the iframe created by your button. To ensure a good experience for your merchants, we strongly recommend that you return a confirmation page, instead of allowing your application to be loaded in that modal.

### Handling Errors

If your application’s installation was initiated and completed through an external link, BigCommerce will send your auth callback endpoint an extra parameter called external_install.
If you receive this parameter and there are no errors, call:

`https://login.bigcommerce.com/app/<your_app_client_id>/install/succeeded`

If there were errors, call:
`https://login.bigcommerce.com/app/<your_app_client_id>/install/failed`

Below is a sample code snippet of an auth callback that does this:

<!--
title: "Auth Callback"
subtitle: ""
lineNumbers: true
-->

```lua
   if params['external_install']
        return get 'https://login.bigcommerce.com/app/m8e1mkkmjw2xjinydqz7ie05to1y2nk/install/succeeded'
    end

    redirect '/'

rescue => e
    if params['external_install']
        return get 'https://login.bigcommerce.com/app/m8e1mkkmjw2xjinydqz7ie05to1y2nk/install/failed'
    end
```

Depending on which endpoint you call, we will render one of the following success/failed pages to the modal.

## Designing the UI

Brief description, then point to UI doc...

## Hosting the App
BigCommerce stores are hosted on [Google Cloud Platform](https://cloud.google.com/) in the [us-central1](https://cloud.google.com/compute/docs/regions-zones/) region.

Therefore, you can maximize performance of your app (in terms of latency to the public API) by hosting in the same region. There is no requirement to do so, and you may host wherever you like.

## FAQ

### How can I make API calls?
We have built several [Hello World](https://developer.bigcommerce.com/tools-resources) apps to get you started quickly. You can use these apps as a starting point or an example for building a Single-click app.

If you'd like to make test API requests without the overhead of installing a draft app, you can generate [API Credentials](https://developer.bigcommerce.com/api-docs/getting-started/authentication#authentication_getting-api-credentials) by creating an API Account in your store's control panel.

### How can I sell my app?
The first step to listing an app in the BigCommerce App Marketplace is to apply to the BigCommerce [partner program](https://www.bigcommerce.com/partners/).

For more details on including your app in the Marketplace, see [App Store Approval Requirements](https://developer.bigcommerce.com/api-docs/partner/app-store-approval-requirements).

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">

<!-- theme: warning -->

> Any HTML that you return in your response for uninstalling an app or removing a user will not render in the response.

</div>
</div>
</div>

## Resources

### Tools
* [Online Crawler](https://www.jitbit.com/sslcheck/) (JitBit)
### Sample Apps
* [Ruby Hello World](https://github.com/bigcommerce/omniauth-bigcommerce) (BigCommerce GitHub)
* [Python Hello World](https://github.com/bigcommerce/hello-world-app-python-flask) (BigCommerce GitHub)
### Related Articles
* [Big Design Developer Playground](https://developer.bigcommerce.com/big-design/)
* [Authentication](https://developer.bigcommerce.com/api-docs/getting-started/authentication)
* [Customer Login API](https://developer.bigcommerce.com/api-docs/customers/customer-login-api)
* [App Store Approval Requirements](https://developer.bigcommerce.com/api-docs/partner/app-store-approval-requirements)
* [Store Accounts](https://support.bigcommerce.com/s/article/Store-API-Accounts#creating) (Knowledge Base)
* [Supported Browsers](https://support.bigcommerce.com/s/article/Themes-Supported-Browsers) (Knowledge Base)
* [BigCommerce Partners](https://www.bigcommerce.com/partners/) (BigCommerce)
* [How to Test App Authentication Locally with ngrok](https://medium.com/bigcommerce-developer-blog/how-to-test-app-authentication-locally-with-ngrok-149150bfe4cf) (BigCommerce Developer Blog)
* [Building a BigCommerce App Using Laravel and React](https://medium.com/bigcommerce-developer-blog/building-a-bigcommerce-app-using-laravel-and-react-711ceceb5006) (BigCommerce Developer Blog)
* [Big Design Tutorial](https://medium.com/bigcommerce-developer-blog/bigdesign-build-native-looking-uis-with-the-bigcommerce-design-system-fb06a01a24f2) (BigCommerce Developer Blog)
### Additonal Resources
* [Same Origin Policy](https://en.wikipedia.org/wiki/Same-origin_policy) (Wikipedia)
* [Craft a P3P Policy to Make IE Behave](https://www.techrepublic.com/blog/software-engineer/craft-a-p3p-policy-to-make-ie-behave/) (Tech Republic)
* [Quick Look at P3P](https://blogs.msdn.microsoft.com/ieinternals/2013/09/17/a-quick-look-at-p3p/) (Microsoft Blogs)
* [Google Cloud](https://cloud.google.com/) (Google)
