# Introduction to Building Apps

Using BigCommerce's powerful APIs, SDKs, and toolkits, developers can build apps that are installable on BigCommerce stores. Once approved, apps can be sold (or made available free of charge) to all BigCommerce merchants on the [Apps Marketplace](https://www.bigcommerce.com/apps). This is the first article in a comprehensive developer's guide to building BigCommerce apps. It provides a brief, high-level introduction for developers new to the platform. If you already have experience developing for BigCommerce, feel free to [skip ahead](#next-steps) or check out the [quick start tutorial](/api-docs/apps/quick-start).


## About BigCommerce apps

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
Use [BigCommerce APIs](/api-reference) to integrate stores with business systems such as the following:
* [ERP systems](https://www.bigcommerce.com/apps/erp/)
* [Order management platforms](https://www.bigcommerce.com/apps/catalog-order-management/)
* [Accounting software](https://www.bigcommerce.com/apps/accounting-tax/)
* [Shipping and fulfillment services](https://www.bigcommerce.com/apps/shipping-fulfillment/)

[Learn more about BigCommerce's APIs](/api-reference).

### Coordinate external sales and marketing channels
List and manage products on multiple [sales](https://www.bigcommerce.com/apps/sales-channels/), including marketplaces, point-of-sale systems, and both third-party and BigCommerce storefronts.  Manage channel-based pricing, external order fulfillment, and ads and social marketing placements using the [Channels Toolkit](https://developer.bigcommerce.com/api-docs/channels/guide/channels-toolkit-reference).

### Connect to sales channels
List products on external [sales channels](https://www.bigcommerce.com/apps/sales-channels/) with [Channels Toolkit](/api-docs/channels/channels-toolkit-reference).

[Learn more about connecting apps to sales channels.](/api-docs/channels/overview).

### Add and manage scripts
Create and manage scripts with [Scripts API](/api-reference/store-management/scripts) and [Script Manager](https://support.bigcommerce.com/s/article/Using-Script-Manager).

[Learn more about creating scripts](/api-docs/storefront/scripts-overview).

### Create custom widgets
Create [widgets](https://support.bigcommerce.com/s/article/Page-Builder#builder) for merchants to install and configure.

[Learn more about creating widgets](/api-docs/storefront/widgets/widgets-overview).

### Offer merchants innovative eCommerce solutions
Harness the power of BigCommerce Provider APIs to integrate your third-party tax or shipping service into merchants' stores.

Learn more about our [Tax Provider](https://developer.bigcommerce.com/api-reference/providers/tax-provider-api) and [Shipping Provider](https://developer.bigcommerce.com/api-reference/providers/shipping-provider-api) APIs.
## Getting started
Here's how to get started with BigCommerce development:
1. [Create a BigCommerce sandbox store](/api-docs/partner/getting-started/create-a-sandbox-store).

## Next step
* [Learn more about different types of apps](https://developer.bigcommerce.com/api-docs/apps/guide/types)

3. [Create a Developer Portal account](https://devtools.bigcommerce.com/) to register and submit apps.

4. [Join the Developer Community](https://support.bigcommerce.com/s/group/0F913000000HLjECAW/bigcommerce-developers) to get help from other BigCommerce developers.
5. [Check out the Marketplace](https://www.bigcommerce.com/marketplace/) to get inspiration on what to build.


## Next steps
* [Decide which type of app to build](/api-docs/apps/guide/types)

* [Start building apps with Node, React, Next.js, and BigDesign](/api-docs/apps/quick-start)


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
* [Big Design Developer Playground](https://developer.bigcommerce.com/big-design)
* [Figma UI Kit](https://www.figma.com/file/jTVuUkiZ1j3rux8WHG4IKK/BigDesign-UI-Kit?node-id=0%3A1/duplicate)
* [Adobe Illustrator UI Kit](https://design.bigcommerce.com/bigdesign-ui-kit)

### Blog posts
* [How to Test App Authentication Locally with ngrok (BigCommerce Developer Blog)](https://medium.com/bigcommerce-developer-blog/how-to-test-app-authentication-locally-with-ngrok-149150bfe4cf) 
* [Building a BigCommerce App Using Laravel and React (BigCommerce Developer Blog)](https://medium.com/bigcommerce-developer-blog/building-a-bigcommerce-app-using-laravel-and-react-711ceceb5006) 
* [Big Design Tutorial (BigCommerce Developer Blog)](https://medium.com/bigcommerce-developer-blog/bigdesign-build-native-looking-uis-with-the-bigcommerce-design-system-fb06a01a24f2) 
