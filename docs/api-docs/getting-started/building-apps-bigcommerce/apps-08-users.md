# Supporting Multiple Users

<div class="otp" id="no-index">

### On This Page
- [The Control Panel Experience](#the-control-panel-experience)
- [The Load Request](#the-load-request)
- [The Remove User Request](#the-remove-user-request)

</div>

When you register your app with BigCommerce, enabling multi-user support will allow store admins to manually authorize users – other than the store owner – to load the app.

As soon as you enable multi-user support, the control panel of any store that has your app installed will be affected. If you already have an app published in the App Marketplace, be aware that this setting takes effect immediately. Therefore, we recommend testing your multi-user support using a separate app that is in draft status.

Let your customers know that you’ve enabled this feature. Otherwise, they won’t know that they can start granting access to users.

If multi-user support is added after your app has launched, the update will cause the app scopes to change and users will be alerted of the new permission request.

## The Control Panel Experience
Store admins will be able to adjust user permissions to grant/deny other store users’ access to your app. The next time the user logs in, they will see any apps for which they have been granted access. The user can then click on the app icon in the left navigation to load it.
Use your draft app and your sandbox store to review this behavior.

## The Load Request
Apps that support multiple users can expect the email and ID of the user that initiated the callback in addition to the owner’s email and ID in the JSON object sent in the load request. If a load request is sent with information for a user you haven’t seen yet, you should provision the user account and associate it with the store in your database.

Because you know the store owner’s email and ID from the App Installation sequence, your app can distinguish store owners from other users. This allows you to provide different user experiences based on the information in the load request. Here is a summary of the two types of users:

- Store owner: Can install, uninstall, and load apps.
- Users: Cannot install or uninstall apps. Permitted only to load the apps that a store admin has authorized.

For further details, please see [Load Request and Response](#load-request-and-response).

## The Remove User Request
In addition to their ability to add users, store admins can also remove users. This action generates a GET request to the Remove User Callback URI that you provided in My Apps. Your app the user identified in the request from its records.

For further information, please see [Remove User Request](#remove-user-request-optional).