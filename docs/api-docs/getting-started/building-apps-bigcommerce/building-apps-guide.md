# Building an App

<div class="otp" id="no-index">

### On This Page
- [Getting Started](#getting-started)
- [Creating App in DevTools](#creating-app-in-devtools)
- [Implementing OAuth Flow](#implementing-oauth-flow)
- [Required Callback URLs](#required-callback-urls)
- [Handling Uninstall Callback](#handling-uninstall-callback)
- [Handling Remove User Callback](#handling-remove-user-callback)
- [Processing Callback Payload](#processing-callback-payload)
- [Supporting Multiple Users](#supporting-multiple-users)
- [Creating Install Buttons](#creating-install-buttons)
- [Designing the UI](#designing-the-ui)
- [Hosting the App](#hosting-the-app)
- [FAQ](#faq)
- [Resources](#resources)

</div>

This article is an in-depth guide to building bigcommerce apps...

### Prerequisites

## Getting Started

1. Create a [Free Trial](https://www.bigcommerce.com/essentials/free-trial)
2. Apply to be a [Technology Partner](https://developer.bigcommerce.com/api-docs/partner/becoming-a-partner)
3. Create a [developer account](https://devtools.bigcommerce.com/)

## Creating App in DevTools

Minimum steps. Links out to article.

## Implementing OAuth Flow

Go here for oauth flow...

## Required Callback URLs
In addition to the Auth Callback URI, the following URI's are required for BigCommerce Apps:

| Name | Required? | Event Discussion |
|-|-|-|
| Load Callback URI | Yes | Called when the store owner or user clicks to load your app. |
| Uninstall Callback URI | No | Called when the store owner clicks to uninstall your app. |
| Remove User Callback URI | No | Called when the store admin revokes a user's access to your app. |

Each event listed here triggers a GET request from BigCommerce containing a signed payload that allows your app to:
- Verify that the request came from BigCommerce.
- Identify the store.
- Identify the store owner or user.

### Handling Load Callback
Once your app has been installed, the store owner or user can click its icon in the control panel to launch it. This causes BigCommerce to send a GET request to the Load Callback URI that you provided during app registration. In a production environment, the Load Callback URI must be publicly available, fully qualified, and served over TLS/SSL.

```http
# The GET request contains a signed payload, as shown below.
GET /load?signed_payload=hw9fhkx2ureq.t73sk8y80jx9 HTTP/1.1
Host: app.example.com
```

Upon receiving a GET request to the Load Callback URI, your app needs to [process the signed payload](#processing-the-signed-payload). After processing the payload, your app returns its user interface as HTML. BigCommerce renders this inside of an iframe. Please see [User Interface Constraints](#designing-the-user-interface) for important information about your app’s user interface.

## Handling Uninstall Callback

Optional

Store owners have the option to uninstall any app at any time. When a store owner uninstalls an app, the app’s OAuth token is revoked and the app cannot make requests to the Stores API on the store’s behalf anymore.

You do not need to provide an Uninstall Callback URI. The lack of an Uninstall Callback URI does not prevent uninstallation. Instead, the Uninstall Callback URI allows you to track store owners who uninstall your app and to run cleanup operations, such as removing the store’s user accounts from your system.

Should you choose to provide an Uninstall Callback URI, please note that it must be publicly available, fully qualified, and served over TLS/SSL. If provided, BigCommerce will send a GET request to your Uninstall Callback URI when a store owner clicks to uninstall your app.

Example of a GET Request sent to the Uninstall Callback URI:

```http
GET /uninstall?signed_payload=hw9fhkx2ureq.t73sk8y80jx9 HTTP/1.1
	Host: app.example.com
```

Upon receiving the GET request, your app will need to process the signed payload.

## Handling Remove User Callback
Optional
If you have not enabled [multi-user support](#multi-user-support), you will not provide a Remove User Callback URI and can ignore this section. If you enable multi-user support, you can optionally specify a Remove User Callback URI. It must be fully qualified, publicly available, and served over TLS/SSL. BigCommerce will send a GET request to your Remove User Callback URI when a store admin revokes a user’s access to your app.

**Request:**

```http
GET /remove-user?signed_payload=hw9fhkx2ureq.t73sk8y80jx9 HTTP/1.1
Host: app.example.com
```

Upon receiving the GET request, your app will need to process the signed payload.

## Processing Callback Payload

Processing the signed payload involves splitting and decoding it, verifying the HMAC signature, and processing the JSON object.

### Splitting and Decoding the Signed Payload

The signed payload is a string containing a base64 url-encoded JSON string and a base64 url-encoded HMAC signature. The parts are delimited by the `.` character:

```javascript
encoded_json_string.encoded_hmac_signature
```

To decode the signed payload, complete the following steps:
1. Split signed_payload into its two parts at the `.` delimiter.
2. Decode encoded_json_string using base64url.
3. Convert the decoded JSON string into an object. See Processing the JSON object for more about this object.
4. Decode encoded_hmac_signature using base64url.
5. Use your client secret to verify the signature. See the next section for more details.

### Verifying the HMAC Signature

To verify the payload, you need to sign the payload using your client secret, and confirm that it matches the signature that was sent in the request.

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">

<!-- theme:  -->

### Timing Attacks
> To limit the vulnerability of your app to timing attacks, we recommend using a constant time-string comparison function, rather than the equality operator, to check that the signatures match.

</div>
</div>
</div>

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">verifySignedRequest</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "verifySignedRequest"
subtitle: ""
lineNumbers: true
-->

```php
function verifySignedRequest($signedRequest)
{
    list($encodedData, $encodedSignature) = explode('.', $signedRequest, 2);

    // decode the data
    $signature = base64_decode($encodedSignature);
        $jsonStr = base64_decode($encodedData);
    $data = json_decode($jsonStr, true);

    // confirm the signature
    $expectedSignature = hash_hmac('sha256', $jsonStr, $clientSecret(), $raw = false);
    if (!hash_equals($expectedSignature, $signature)) {
        error_log('Bad signed request from BigCommerce!');
        return null;
    }
    return $data;
}
```

<div class="HubBlock--callout">
<div class="CalloutBlock--">
<div class="HubBlock-content">

<!-- theme:  -->

### !hash_equals
> !hash_equals is available in PHP 5.6 and later. If you are running an older version of PHP, pull in a compatibility library such as the following: https://packagist.org/packages/realityking/hash_equals. BigCommerce’s sample app hello-world-app-php-silex app does this automatically.

</div>
</div>
</div>

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">verify()</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "verify()"
subtitle: ""
lineNumbers: true
-->

```ruby
require "base64"
require "openssl"

def verify(signed_payload, client_secret)
  message_parts = signed_payload.split(".")

  encoded_json_payload = message_parts[0]
  encoded_hmac_signature = message_parts[1]

  payload_object = Base64.strict_decode(encoded_json_payload)
  provided_signature = Base64.strict_decode(encoded_hmac_signature)

  expected_signature = OpenSSL::HMAC::hexdigest("sha256", client_secret, payload_object)

  return false unless secure_compare(expected_signature, provided_signature)

  JSON.parse(payload_object)
end

def secure_compare(a, b)
  return false if a.blank? || b.blank? || a.bytesize != b.bytesize
  l = a.unpack "C#{a.bytesize}"

  res = 0
  b.each_byte { |byte| res |= byte ^ l.shift }
  res == 0
end

```

### Processing the JSON Object

The JSON object embedded in the signed_payload contains information about the BigCommerce store and the store owner or user.

### Identifying the Store
Use the store information endpoint to identify the store to which the request pertains.

### Interpreting the User Information

| Request type | Multiple users enabled | Multiple users not enabled |
|-|-|-|
| Load | Compare the user information to see if it matches that of the store owner (received at the time of [app installation](#installation-and-update-sequence)) or that of an existing user. If the user information does not match either of these, then it represents a new user that you should add to your database or other storage. | The information should match that of the store owner, received at the time of [app installation](#installation-and-update-sequence). |
| Uninstall | The user information should match that of the store owner. Only the store owner can uninstall your app. | Should match the store owner. |
| Remove user | The user information should match one of the users that you have stored. After locating the stored user, delete it from your database or other storage. | N/A |

### JSON Values

| Name | Data Type | Value Description |
|-|-|-|
| user.id | integer | Unique identifier for the user who initiated the callback. |
| user.email | string | Email address of the user who initiated the callback. |
| owner.id | integer | Unique identifier for the user listed as the store owner. |
| owner.email | string | Email address of the user listed as the store owner. |
| context | string | The context value is part of the API path for this store and includes the store_hash. |
| store_hash | string |Unique identifier for the store. |
| timestamp | float | The time (in Unix time) when the callback was generated.|

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">User Information</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "User Information"
subtitle: ""
lineNumbers: true
-->

```json
{
    "user":
         {
        "id":9128,
        "email":"user@mybigcommerce.com"
     },
     "owner":
          {
         "id":9128,
         "email":"user@mybigcommerce.com"
     },
     "context":"stores/z4zn3wo",
     "store_hash":"z4zn3wo",
     "timestamp":1469823892.9123988
}
```

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
