# App Store Approval Requirements

<div class="otp" id="no-index">

### On this page

- [General requirements](#general-requirements)
- [Listing](#listing)
- [Functionality](#functionality)
- [Installation](#installation)
- [FAQ](#faq)
- [Next steps](#next-steps)
- [Resources](#resources)

</div>

The Apps Marketplace team reviews all app submissions and tests apps to verify they meet [Marketplace](https://www.bigcommerce.com/apps/) listing standards. Verify your app meets the requirements below before submitting it for approval.

## General requirements

- Make support resources available throughout the app, like during onboarding and on the app’s dashboard within the BigCommerce iframe.
- Follow branding guidelines when referencing BigCommerce (see our [Media Kit](https://www.bigcommerce.com/press/media-kit/) for more information).
Don’t reference competitor platforms in the app's listing information or dashboard.
* Use the same app name in app submission and in app content such as logos and descriptions.
* Keep app titles concise. Avoid using extra taglines or descriptors; include those in the app summary, if necessary.
* Include the name of both your brand and any connected third-party platforms in the title (ex:
"Marketplace by BigCommerce" or "Search by BigCommerce").
- Develop app client-side code to be compatible with all BigCommerce [supported browsers](https://support.bigcommerce.com/s/article/Themes-Supported-Browsers) and default features.
- Include applicable test account details in your test instructions with the submission for any third-party services required in the app.

## Listing

* Approval for the [Marketplace](https://www.bigcommerce.com/apps/) requires all fields listed in the "Publishing Apps" section (**Case Studies** and **Videos** are optional).
* Listings should be well worded, cleanly formatted, and follow wording and image specifications.
* App listing name should be restricted to only branding and not include taglines.

## Functionality

* Apps must work as intended and can not conflict with BigCommerce functionality.
* Apps must use V3 endpoints in favor of V2 endpoints when feature parity exists.
* Apps must serve all callback URLs over HTTPS.
* Apps in the Marketplace must be[ multi-user enabled](https://developer.bigcommerce.com/api-docs/apps/guide/users).
* Apps that process transactions or handle credit card data must pass a PCI Compliance review by BigCommerce’s security team.
* Apps that access the Checkout Content scope will also be subject to a security assessment by BigCommerce’s security team.
* Apps that add another marketplace or sales channel to a store should make use of the [Channels Toolkit](https://developer.bigcommerce.com/api-docs/channels/guide/building-channel-apps) and follow [Channel App Requirements](https://developer.bigcommerce.com/api-docs/channels/guide/channel-app-requirements).
* Apps that create orders in the BigCommerce store need to properly mark accurate order source, payment method, and other order details.

## Installation

* Apps should be [single-click](https://developer.bigcommerce.com/api-docs/apps/guide/types#single-click) and use [OAuth flow](https://developer.bigcommerce.com/api-docs/apps/guide/auth) to authenticate.
* Apps must respond to install [callback](https://developer.bigcommerce.com/api-docs/apps/guide/callbacks) with styled and branded HTML for the control panel iFrame; this content cannot be blank and must follow our user-interface constraints. Apps using [BigDesign](https://design.bigcommerce.com/components) are preferred.
* Apps must store user tokens against the store hash, not the user's email address, to avoid problems with ownership changes and multiple user support.
* Apps need to include options for new user registration as well as existing users.
* Apps should autofill registration fields such as email address and store URL based on the store's information.
* Apps should include onboarding instructions and any setup requirements after installing.
* Apps that install scripts must use the [Scripts API](https://developer.bigcommerce.com/api-reference/store-management/scripts) to insert into Script Manager using proper `consent_category`.

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

### Note
> 1. If your app cannot meet this requirement, email <a href="mailto:appstore@bigcommerce.com">appstore@bigcommerce.com</a> to discuss your options for approval.

</div>
</div>
</div>

## FAQ

**Are all fields required?**
For Marketplace approval, you'll need to fill out all fields on your listing with applicable content and links. These will be reviewed as part of the Marketplace approval process. Case Studies and Videos are optional.

## Next steps
* [Publish your app](https://developer.bigcommerce.com/api-docs/apps/guide/publishing).

## Resources

### Sample apps

* [Python / Flask](https://github.com/bigcommerce/hello-world-app-python-flask)
* [PHP / Silex](https://github.com/bigcommerce/hello-world-app-php-silex)
* [Ruby / Sinatra](https://github.com/bigcommerce/hello-world-app-ruby-sinatra)
* [Laravel / React](https://github.com/bigcommerce/laravel-react-sample-app)
* [Node / FaunaDB / Nelify](https://github.com/bigcommerce/channels-app/)

### Tools

* [Node API Client](https://github.com/getconversio/node-bigcommerce)
* [Python API Client](https://github.com/bigcommerce/bigcommerce-api-python)
* [PHP API Client](https://github.com/bigcommerce/bigcommerce-api-php)
* [Ruby API Client](https://github.com/bigcommerce/bigcommerce-api-ruby)
* [Ruby OmniAuth Gem](https://github.com/bigcommerce/omniauth-bigcommerce)
* [BigDesign Developer Playground](https://developer.bigcommerce.com/big-design/)
* [Figma UI Kit](https://www.figma.com/file/jTVuUkiZ1j3rux8WHG4IKK/BigDesign-UI-Kit?node-id=0%3A1/duplicate)
* [Adobe Illustrator UI Kit](https://design.bigcommerce.com/bigdesign-ui-kit)

### Blog posts

* [How to Test App Authentication Locally with ngrok](https://medium.com/bigcommerce-developer-blog/how-to-test-app-authentication-locally-with-ngrok-149150bfe4cf)
* [Building a BigCommerce App Using Laravel and React](https://medium.com/bigcommerce-developer-blog/building-a-bigcommerce-app-using-laravel-and-react-711ceceb5006)
* [BigDesign Tutorial](https://medium.com/bigcommerce-developer-blog/bigdesign-build-native-looking-uis-with-the-bigcommerce-design-system-fb06a01a24f2)
