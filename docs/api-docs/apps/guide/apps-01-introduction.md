# Introduction to Building Apps

<div class="otp" id="no-index">

### On this page
- [About single-click apps](#about-single-click-apps)
- [Use cases](#use-cases)
- [Getting started](#getting-started)
- [Next step](#next-step)
- [Resources](#resources)

</div>

BigCommerce's powerful APIs, SDKs, and toolkits let developers build apps that BigCommerce merchants can install on their stores. If you'd like to sell your app or make it available free of charge, you can submit it to our Marketplace team for approval so that any BigCommerce merchant can find and install it on our [Apps Marketplace](https://www.bigcommerce.com/apps). This is the first in a series of articles intended to guide you through the process of building apps for BigCommerce stores, particularly _single-click apps_. 

If you already have experience developing for BigCommerce, feel free to [skip ahead](#next-step) or check out the [quick start tutorial](https://developer.bigcommerce.com/api-docs/apps/quick-start).

## About single-click apps

Merchants discover, manage, and interact with single-click apps from the convenience of their stores' control panels.

### Discovery
Our app [Marketplace](https://www.bigcommerce.com/apps/) lists public apps that have cleared our approval process. Starting from their store's control panel, a merchant can browse or search for the app that best meets their needs, purchase it if payment is required, and install or reinstall the app on demand.

![App Marketplace](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/apps-01-introduction-01.png "App Marketplace")

### Management
Merchants manage their installed apps in their store control panel's **Apps** menu view. Store owners and authorized users can launch the app, and store owners can also uninstall the app. Store owners can add and remove authorized users in the **Account Settings** **>** **Users** view, by clicking the three dots in the action column of the user's listing and enabling that app in the dialog that appears.

![App Management](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/apps-01-introduction-02.png  "App Management")

### Display
When a merchant clicks an installed app's listing or **Launch** button in the **Apps** sub-menu, BigCommerce makes a request to the app's `GET /load` endpoint and populates the **Apps** menu view with the markup it receives in response.

![App Display](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/apps-01-introduction-03.png  "App Display")

## Use cases
What can developers help merchants and technology partners do with BigCommerce apps?

### Integrate with business systems
Use [BigCommerce APIs](https://developer.bigcommerce.com/api-reference) to integrate merchant stores with core business systems, including but not limited to the following:
* [ERP systems](https://www.bigcommerce.com/apps/erp/)
* [Order management platforms](https://www.bigcommerce.com/apps/catalog-order-management/)
* [Accounting software](https://www.bigcommerce.com/apps/accounting-tax/)
* [Shipping and fulfillment services](https://www.bigcommerce.com/apps/shipping-fulfillment/)

[Learn more about BigCommerce's powerful APIs.](https://developer.bigcommerce.com/api-reference)

### Coordinate external sales and marketing channels
List and manage products on multiple [sales](https://www.bigcommerce.com/apps/sales-channels/), including marketplaces, point-of-sale systems, and both third-party and BigCommerce storefronts.  Manage channel-based pricing, external order fulfillment, and ads and social marketing placements using the [Channels Toolkit](https://developer.bigcommerce.com/api-docs/channels/guide/channels-toolkit-reference).

[Learn more about connecting apps to sales channels.](https://developer.bigcommerce.com/api-docs/channels/overview)

### Automate complex script management
Programmatically add scripts with merchant-customizable variables using our [Scripts API](https://developer.bigcommerce.com/api-reference/store-management/scripts) and [Script Manager](https://support.bigcommerce.com/s/article/Using-Script-Manager).

[Learn more about creating scripts](https://developer.bigcommerce.com/api-docs/store-management/scripts).

### Design dynamic widgets
Build [widgets](https://support.bigcommerce.com/s/article/Page-Builder#builder), or storefront content blocks, that merchants can install and configure to display store and third-party content to their customers.

[Learn more about creating widgets](https://developer.bigcommerce.com/api-docs/storefront/widgets/widgets-overview).

### Offer merchants innovative eCommerce solutions
Harness the power of BigCommerce Provider APIs to integrate your third-party tax or shipping service into merchants' stores.

Learn more about our [Tax Provider](https://developer.bigcommerce.com/api-reference/providers/tax-provider-api) and [Shipping Provider](https://developer.bigcommerce.com/api-reference/providers/shipping-provider-api) APIs.
## Getting started
Here's how to get started with BigCommerce development:
1. [Create a BigCommerce sandbox store](https://developer.bigcommerce.com/api-docs/partner/getting-started/create-a-sandbox-store).
2. [Create a Developer Portal account](https://devtools.bigcommerce.com/) to register draft apps and submit production apps for marketplace approval.
3. [Join the Developer Community](https://support.bigcommerce.com/s/group/0F913000000HLjECAW/bigcommerce-developers) to get help from other BigCommerce developers.
4. [Check out the Marketplace](https://www.bigcommerce.com/marketplace/) to get inspiration on what to build.
5. [Apply to be a Partner](https://www.bigcommerce.com/partners) to get paid for your apps.

## Next step
* [Learn more about different types of apps](https://developer.bigcommerce.com/api-docs/apps/guide/types)

## Resources

### Sample apps
* [Node / React / Next.js](https://github.com/bigcommerce/sample-app-nodejs) with [quick start tutorial](https://developer.bigcommerce.com/api-docs/apps/quick-start)
* [Python / Flask](https://github.com/bigcommerce/hello-world-app-python-flask)
* [PHP / Silex](https://github.com/bigcommerce/hello-world-app-php-silex)
* [Ruby / Sinatra](https://github.com/bigcommerce/hello-world-app-ruby-sinatra)
* [Laravel / React](https://github.com/bigcommerce/laravel-react-sample-app)
* [Node / FaunaDB / Netlify](https://github.com/bigcommerce/channels-app/)

### Tools
* [Node API Client](https://github.com/bigcommerce/node-bigcommerce/)
* [Python API Client](https://github.com/bigcommerce/bigcommerce-api-python)
* [PHP API Client](https://github.com/bigcommerce/bigcommerce-api-php)
* [Ruby API Client](https://github.com/bigcommerce/bigcommerce-api-ruby)
* [Ruby OmniAuth Gem](https://github.com/bigcommerce/omniauth-bigcommerce)
* [Big Design Developer Playground](https://developer.bigcommerce.com/big-design/)
* [Figma UI Kit](https://www.figma.com/file/jTVuUkiZ1j3rux8WHG4IKK/BigDesign-UI-Kit?node-id=0%3A1/duplicate)
* [Adobe Illustrator UI Kit](https://design.bigcommerce.com/bigdesign-ui-kit)

### Blog posts
* [How to Test App Authentication Locally with ngrok (BigCommerce Developer Blog)](https://medium.com/bigcommerce-developer-blog/how-to-test-app-authentication-locally-with-ngrok-149150bfe4cf) 
* [Building a BigCommerce App Using Laravel and React (BigCommerce Developer Blog)](https://medium.com/bigcommerce-developer-blog/building-a-bigcommerce-app-using-laravel-and-react-711ceceb5006) 
* [Big Design Tutorial (BigCommerce Developer Blog)](https://medium.com/bigcommerce-developer-blog/bigdesign-build-native-looking-uis-with-the-bigcommerce-design-system-fb06a01a24f2) 
