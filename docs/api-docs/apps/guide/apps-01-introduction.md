# Introduction to Building Apps

<div class="otp" id="no-index">

### On This Page
- [About BigCommerce Apps](#about-bigcommerce-apps)
- [Use Cases](#use-cases)
- [Getting Started](#getting-started)
- [Next Steps](#next-steps)
- [Resources](#resources)

</div>

Using BigCommerce's powerful APIs, SDKs, and toolkits, developers can build apps that are installable on BigCommerce stores. Once approved, apps can be sold (or made available free of charge) to all BigCommerce merchants on the [Apps Marketplace](https://www.bigcommerce.com/apps). This is the first article in a comprehensive developer's guide to building BigCommerce apps. It provides a brief, high-level introduction for developers new to the platform. If you already have experience developing for BigCommerce, feel free to [skip ahead](#next-steps) or check out the [quick start tutorial](https://developer.bigcommerce.com/api-docs/apps/quick-start).


## About BigCommerce Apps

Let's first take a look how apps are discovered, displayed, and managed on BigCommerce stores.

### Discovery
Approved apps are listed on the app [Marketplace](https://www.bigcommerce.com/apps/) for merchants to browse, search, and install.

![App Marketplace](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/apps-01-introduction-01.png "App Marketplace")

### Management
Apps installed on a store are managed in the store's control panel under **Apps** > [**My Apps**](https://login.bigcommerce.com/deep-links/manage/marketplace/apps/my-apps/drafts). Here, store users can launch or uninstall the app.

![App Management](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/apps-01-introduction-02.png  "App Management")

### Display
When an launches an app, BigCommerce makes a request to the app's `/load` callback and displays the app's UI in an iFrame:
![App Display](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/apps-01-introduction-03.png  "App Display")

## Use Cases
What can developers do with BigCommerce apps?

### Integrate with Business Systems
Use [BigCommerce APIs](https://developer.bigcommerce.com/api-reference) to integrate stores with business systems such as:
* [ERP systems](https://www.bigcommerce.com/apps/erp/)
* [Oder management platforms](https://www.bigcommerce.com/apps/catalog-order-management/)
* [Accounting software](https://www.bigcommerce.com/apps/accounting-tax/)
* [Shipping and Fulfillment services](https://www.bigcommerce.com/apps/shipping-fulfillment/)

[Learn more about BigCommerce's APIs](https://developer.bigcommerce.com/api-reference).


### Connect to Sales Channels
List products on external [sales channels](https://www.bigcommerce.com/apps/sales-channels/) with [Channels Toolkit](https://developer.bigcommerce.com/api-docs/channels/channels-toolkit-reference).

[Learn more about connecting apps to sales channels.](https://developer.bigcommerce.com/api-docs/channels/overview).

### Add and Manage Scripts
Create and manage scripts with [Scripts API](https://developer.bigcommerce.com/api-reference/store-management/scripts) and [Script Manager](https://support.bigcommerce.com/s/article/Using-Script-Manager).

[Learn more about creating scripts](https://developer.bigcommerce.com/api-docs/storefront/scripts-overview).

### Create Custom Widgets
Create [widgets](https://support.bigcommerce.com/s/article/Page-Builder#builder) for merchants to install and configure.

[Learn more about creating widgets](https://developer.bigcommerce.com/api-docs/storefront/widgets/widgets-overview).

## Getting Started
Here's how to get started with BigCommerce development:
1. [Start a free trial](https://www.bigcommerce.com/essentials/free-trial/) to test apps against.

2. [Apply to be a Partner](https://www.bigcommerce.com/partners) to get paid for your apps.

3. [Create a DevTools Account](https://devtools.bigcommerce.com/) to register and submit apps.
4. [Join the Developer Community](https://support.bigcommerce.com/s/group/0F913000000HLjECAW/bigcommerce-developers) to get help from other BigCommerce developers.
5. [Checkout the Marketplace](https://www.bigcommerce.com/marketplace/) to get inspiration on what to build.

## Next Steps
* [Decide which type of app to build](https://developer.bigcommerce.com/api-docs/apps/guide/types-of-apps)

* [Start building apps with CodeSandbox, Node, and Express](https://developer.bigcommerce.com/api-docs/apps/quick-start)


## Resources

### Sample Apps
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

### Blog Posts
* [How to Test App Authentication Locally with ngrok](https://medium.com/bigcommerce-developer-blog/how-to-test-app-authentication-locally-with-ngrok-149150bfe4cf) (BigCommerce Developer Blog)
* [Building a BigCommerce App Using Laravel and React](https://medium.com/bigcommerce-developer-blog/building-a-bigcommerce-app-using-laravel-and-react-711ceceb5006) (BigCommerce Developer Blog)
* [Big Design Tutorial](https://medium.com/bigcommerce-developer-blog/bigdesign-build-native-looking-uis-with-the-bigcommerce-design-system-fb06a01a24f2) (BigCommerce Developer Blog)
