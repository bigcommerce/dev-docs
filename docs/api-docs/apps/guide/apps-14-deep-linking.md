# Introduction to Deep Linking

<div class="otp" id="no-index">

### On this page

- [Overview](#overview)
- [Implementation](#implementation)
- [URL decoding code samples](#URL-decoding-code-samples)

</div>

## Overview

Deep links make it possible to create URLs that send users to a particular page within an app. By sending users directly to the desired location or content, you can create a more personalized experience and improve the way users interact with your app. When navigating within the app, the browser URL is updated based on the page being viewed, making it possible to discover, bookmark, and share particular pages of the app. 

Deep linking enables developers to effectively communicate with the app users when the app is not open. For example, you can include a deep link in your emails, dashboard, or mobile app notifications to direct viewers to a specific location within the app.

Users who do not have the app installed on their devices will be redirected to the [App Marketplace](https://www.bigcommerce.com/apps/) to download the app before navigating to a particular location within the app.

## Implementation

Deep linking can be implemented by using the `deep_link` query parameter which is passed to the load endpoint whenever the app is loaded. 

The `deep_link` query parameter is appended to the app's load callback indicating that a user is trying to access a particular page (other than the index page) within the app.

For example, let's say you have an app with an index page of `/manage/app/123` and a load callback URL of https://app-123.myapp.com/load.

When you navigate to a page within the app, like `/manage/app/123/some/page`, everything after the app's index page URL is passed into the load endpoint in the form of a `deep_link` query string. In this case, `/some/page` is transformed into `deep_link=%some%page`.

https://app-123.myapp.com/load?deep_link=%2Fsome%2Fpage

Developers can then retrieve the query string value by checking for the `deep_link` key on the server side, decoding it, and directing the user to the appropriate location within the app.

Because this feature is optional, if an app does not explicitly support deep links, users are routed to the app's index page.

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> ### Note
> * The URL query string may include a relative URL. 
> * The values will always be URL-encoded. You will need to decode the values to take advantage of this feature.

</div>
</div>
</div>

## URL decoding code samples

The `deep_link` query parameter is automatically appended to your app's load endpoint. Because its value is URL-encoded, you need to decode it to read the value server-side. 

The following code samples illustrate how to correctly decode a URL using different programming languages.

**JavaScript example**

**PHP example**

**Python example**
