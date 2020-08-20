# App Store Approval Requirements

<div class="otp" id="no-index">

### On this page

- [General requirements](#general-requirements)
- [Functionality](#functionality)
- [Installation](#installation)
- [Next steps](#next-steps)
- [Resources](#resources)

</div>

The Apps Marketplace team reviews all app submissions and tests apps to verify they meet [Marketplace](https://www.bigcommerce.com/apps/) listing standards. Verify your app meets the requirements below before submitting it for approval.

## General requirements
- Make support resources available throughout the app (for example, during onboarding and on the app's dashboard).
- Follow branding guidelines when referencing BigCommerce (see our [Media Kit](https://www.bigcommerce.com/press/media-kit/) for more information).
- Don't reference competitor platforms in the app's listing information.
- Use the same app name in app submission and in app content.
- Keep app titles concise. Avoid using extra taglines or descriptors; include those in the app summary, if necessary.
- Include the name of connected third-party platforms in the title (ex: "Marketplace by BigCommerce" or "Search by BigCommerce").
- Develop app client-side code to be compatible with all BigCommerce [supported browsers](https://support.bigcommerce.com/s/article/Themes-Supported-Browsers).

## Functionality
- Apps must work as intended and can not conflict with BigCommerce functionality.

- Apps must use V3 endpoints in favor of V2 endpoints when feature parity exists.
- Apps must serve all callback URLs over HTTPS.
- Apps that process transactions or handle credit card data must pass a PCI Compliance review by BigCommerce's security team.

## Installation
- Apps should be [single-click](https://developer.bigcommerce.com/api-docs/apps/guide/types-of-apps#single-click-apps) and use OAuth flow to authenticate<sup>1</sup>.
- Apps must respond to `install` callback with styled HTML for the control panel iFrame; this content cannot be blank and must follow our [user-interface constraints](https://developer.bigcommerce.com/api-docs/getting-started/building-apps-bigcommerce/building-apps#building-apps_user-interface-constraints).
- Apps must store user tokens against the store hash, not the user's email address, to avoid problems with ownership changes and multiple user support.

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

<!-- theme:  -->
### Note
> 1. If your app cannot meet this requirement, email <a href="mailto:appstore@bigcommerce.com">appstore@bigcommerce.com</a> to discuss the potential for a connector app listing.

</div>
</div>
</div>

## Next steps
* [Publish your app](https://developer.bigcommerce.com/api-docs/apps/guide/publish).


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
* [Big Design Developer Playground](https://developer.bigcommerce.com/big-design/)
* [Figma UI Kit](https://www.figma.com/file/jTVuUkiZ1j3rux8WHG4IKK/BigDesign-UI-Kit?node-id=0%3A1/duplicate)
* [Adobe Illustrator UI Kit](https://design.bigcommerce.com/bigdesign-ui-kit)

### Blog posts
* [How to Test App Authentication Locally with ngrok](https://medium.com/bigcommerce-developer-blog/how-to-test-app-authentication-locally-with-ngrok-149150bfe4cf)
* [Building a BigCommerce App Using Laravel and React](https://medium.com/bigcommerce-developer-blog/building-a-bigcommerce-app-using-laravel-and-react-711ceceb5006)
* [Big Design Tutorial](https://medium.com/bigcommerce-developer-blog/bigdesign-build-native-looking-uis-with-the-bigcommerce-design-system-fb06a01a24f2)
