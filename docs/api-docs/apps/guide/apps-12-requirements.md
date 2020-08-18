# App Store Approval Requirements

<div class="otp" id="no-index">

### On this page

- [General requirements](#general-requirements)
- [Functionality](#functionality)
- [Installation](#installation)
- [Recommendations](#recommendations)
- [Resources](#resources)

</div>

Apps listed in BigCommerce's App Marketplace have been approved and are for any merchant to install. To be approved, apps must meet specific requirements. This article contains a list of criteria all published apps in the Marketplace have met.

## General Requirements
- Make Support resources available throughout the app experience (for example, onboarding flow and app dashboard).
- Follow BigCommerce branding guidelines when referencing BigCommerce (see our [Media Kit](https://www.bigcommerce.com/press/media-kit/) for more information).
- Apps and listing must not reference competitor platforms.
- The brand name used in App submission should match the app's title used in app content.
- Keep app titles concise -- refrain from using extra taglines or descriptors (include those in the app summary, if necessary).
- Apps that connect to third-party service should include the name of the service and the company in the title (Ex: "Marketplace by BigCommerce", "Search by BigCommerce").
- App client-side code (including any storefront components) should be compatible with all [BigCommerce supported browsers](https://support.bigcommerce.com/s/article/Themes-Supported-Browsers).

## Functionality
- Your app must work as intended, be free of defects, and not conflict with or break any default BigCommerce functionality, including the BigCommerce storefront and checkout.
- Utilize any V3 API resources that are currently available for the data you need from a BigCommerce store.
- The dashboard and callback URLs for your app should operate strictly over HTTPS using a valid SSL certificate.
- Apps should offer [multi-user support](https://developer.bigcommerce.com/api-docs/getting-started/building-apps-bigcommerce/building-apps#building-apps_multi-user-support) so that permissions for the app can be distributed by the store owner to additional users from the BigCommerce control panel.
- Any apps that process transactions or handle credit card data will need to pass a PCI Compliance review with our Security team; and be compatible with our Optimized One-Page Checkout.
- Avoid copy/paste for storefront code - use the [Scripts API](https://developer.bigcommerce.com/api-reference/storefront/content-scripts-api) to programmatically inject code snippets into a store's Script Manager and storefront theme.
- If your app requires payment, you'll need to collect payment from the user within your app. See Pricing & Categorization under App Summary for more information.

## Installation
- Apps should be Single-Click and use our OAuth token exchange flow to authenticate the user.
- Single-Click does not mean everything completed in one click, but that single-click handles authentication  - the user can handle other tasks post-auth.
- When installing the app, you must return a styled HTML page in the iframe of the BigCommerce control panel - this content cannot be blank and must follow our [user-interface constraints](https://developer.bigcommerce.com/api-docs/getting-started/building-apps-bigcommerce/building-apps#building-apps_user-interface-constraints).
- During the OAuth handshake, be sure to store the user's token against their store hash - rather than their email address - to avoid any problems with ownership changes or multi-user support.

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

<!-- theme:  -->
### Note
> * If your app cannot meet these requirements, please reach out to <a href="mailto:appstore@bigcommerce.com">appstore@bigcommerce.com</a> to discuss the potential for a Connector app listing. In the majority of cases, a Single-Click app will be the more appropriate solution and put your integration on par with other Marketplace partners; however, BigCommerce can make exceptions under certain circumstances.

</div>
</div>
</div>

## Recommendations
- Have a form to fill out for new users? We recommend auto-filling user input fields with data from the [Store Information API resource](https://developer.bigcommerce.com/api-reference/store-management/store-information-api), which already contains much of the info you might need from a new user.
- No account approval process needed for your app? Consider automatically generating accounts for stores that install your app and don’t match an existing store in your database.
- Require login on launch? Use the information in the BigCommerce payload to your callback URL to authenticate the user without asking for a username and password each time.
- Want to share user testimonials? Add a link to your full case study in the Case Studies field, with a title and short description.

## Resources

### Building Apps



