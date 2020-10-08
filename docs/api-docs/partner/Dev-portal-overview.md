# Developer Portal Overview

<div class="otp" id="no-index">

### On this page
- [About BigCommerce apps](#about-bigcommerce-apps)
- [Use cases](#use-cases)
- [Developing your app](#develop-your-app)
- [Resources](#resources)
</div> 

Once your app is approved, you can either sell it to BigCommerce merchants or make it installable for free. 

To get started with developing BigCommerce apps, you will first need to create a [Developer Portal](https://devtools.bigcommerce.com/my/apps) account. You will use your Developer Portal account to register and submit your app for review. You will also need to start a [free store trial](https://www.bigcommerce.com/essentials/free-trial/) to test your app. 

## About BigCommerce apps
Let's first examine how you can discover, display, and manage apps on BigCommerce stores.

### Discovery
Approved apps are listed on the app Marketplace for merchants to browse, search, and install.
![App Marketplace](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/apps-01-introduction-01.png "App Marketplace")

### Management

You can manage apps installed on a store in the store's control panel under **Apps** > [**My Apps**](https://login.bigcommerce.com/deep-links/manage/marketplace/apps/my-apps/drafts). Here, store users can launch or uninstall the app.

![App Management](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/apps-01-introduction-02.png  "App Management")

### Display
When a merchant launches an app, BigCommerce makes a request to the app's `/load` callback and displays the app's UI in an iFrame.

![App Display](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/apps-01-introduction-03.png  "App Display")

## Use cases
What can developers do with BigCommerce apps?

### Integrate with Business Systems
Use [BigCommerce APIs](https://developer.bigcommerce.com/api-reference) to integrate stores with business systems such as the following:
* [ERP systems](https://www.bigcommerce.com/apps/erp/)
* [Order management platforms](https://www.bigcommerce.com/apps/catalog-order-management/)
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

## Developing your app

Here's how to develop your app with BigCommerce:

1. [Start a free trial](https://www.bigcommerce.com/essentials/free-trial/) to test your apps.

2. [Apply to be a Partner](https://www.bigcommerce.com/partners) to get paid for your apps.

3. [Create a DevTools account](https://devtools.bigcommerce.com/) to register and submit apps.

4. [Join the Developer Community](https://support.bigcommerce.com/s/group/0F913000000HLjECAW/bigcommerce-developers) to get help from other BigCommerce developers.
5. [Check out the Marketplace](https://www.bigcommerce.com/marketplace/) to get inspiration on what to build.

6. [Decide which type of app to build](https://developer.bigcommerce.com/api-docs/apps/guide/types).

7. [Start building apps with CodeSandbox, Node, and Express](https://developer.bigcommerce.com/api-docs/apps/quick-start).


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
