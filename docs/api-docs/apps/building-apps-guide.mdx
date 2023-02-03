# Building Apps

This article is an in-depth, comprehensive guide to building apps on BigCommerce. For a step-by-step tutorial, see []().

## Get Started
1. Create a [Free Trial](https://www.bigcommerce.com/essentials/free-trial)
2. Apply to be a [Technology Partner](/api-docs/partner/becoming-a-partner)
3. Create a [developer account](https://devtools.bigcommerce.com/)

## Decide App Type
Decide...

## Start with Hello World
Use a starter or follow express app tutorial

## Test Locally
Use ngrok to create tunnel...make n

Developing locally makes it fast and easy to test changes as you work, but no network access has its disadvantages. You might run into situations where you need a publicly accessible URL while you’re still in the development phase. Maybe you want to show your work to a colleague or client, or you need a secure, publicly available callback URL to interact with a web service. You could go ahead and upload your app to a hosting platform like Heroku, but then every time you make an update, you’d have to push those changes to your host server…not great.

Open a terminal window and navigate to your myapp directory. Run npm start to start the app. By default, Express generator apps start the server on localhost:3000. If you want to change the port, it’s defined in the app’s bin/www file on line 15, but we’ll leave it on port 3000 for now.
Open a browser window and navigate to http://localhost:3000. You should see the Express app home page:
Image for post
Express app running on localhost
3. Open a new terminal window (leave the first terminal window running) and start ngrok on port 3000:
ngrok http 3000
4. Copy the https forwarding URL from the terminal and paste it into a new browser tab. You should see the same Express app homepage that you saw on your localhost URL:
Image for post
Express app tunneling to ngrok
Hooray! This may not look like much yet, but we’ve already demonstrated a powerful feature of ngrok. You could email your ngrok forwarding URL to a friend, and they’d see the same Express app homepage (as long as you’ve got ngrok running in your terminal). That’s pretty cool, but next we’ll show how you can use ngrok to do even more. We’ll create a forwarding URL that will allow us to create publicly accessible routes within the app so we can complete the Oauth flow necessary to install the app in a BigCommerce store.

## Register the App
Dev Tools is the workspace for creating BigCommerce apps. It’s where you go to register a new app and manage app listing details if you’re a vendor in the App Marketplace. For now, we’ll just do the minimum steps to register a new app and get a Client Id and Client Secret.
1. Log in to Dev Tools and click the orange Create an app button.
1. Enter a name for your app. This could be anything — My Test App, Node App, whatever you’d like.
1. Click Create App.
1. Click the Edit App icon on the app you created.
1. On Step 1, you can skip filling out the profile form. This just collects information that BigCommerce needs for developers who want to submit their app to the App Marketplace. It’s not required, but I do like to go ahead and upload an image to the App summary area at the bottom. The image will show on the card for your draft app in the control panel. Again, not required, but it does look nicer.
1. Skip Step 2: App Details and proceed to Step 3. App details are required only for developers who want to submit an app to the Marketplace.
1. On Step 3, fill in the Callback URL fields, replacing example.com with your https forwarding URL from ngrok. For example:
   * **Auth**: https://4022ffe4.ngrok.io/auth
   * **Load**: https://4022ffe4.ngrok.io/load
   * **Uninstall**: https://4022ffe4.ngrok.io/uninstall
1. Click Next until you reach Step 6, then click Update and Close.

## Install Draft App
Now that we have the app wired up to the appropriate route paths, it’s time to install the app in your store.
1. Start the Express app by running the npm start command in your myapp directory.
1. Open a second terminal window and start ngrok on port 3000: ngrok http 3000. Be sure to update the ngrok URL in Dev Tools to match the ngrok URL in your current session.
1. Log in to your BigCommerce store and navigate to Apps>My Apps>My Draft Apps tab.
1. Click Learn More on your app card and then click Install. You should see your app’s Authorized! Message. The Authorized! view indicates that we’ve successfully received an Oauth token from BigCommerce.
1. Test the Load route by returning to the My Apps section in the control panel. Now that the app is installed, you’ll see two new buttons: Load and Uninstall. Click the Load button to render the Welcome view.
1. Now, click the Uninstall button. The app will be removed from the My Apps section. Check your terminal for the auth, load, and uninstall data objects that were logged to the console.

## Implement OAuth Flow
BigCommerce apps use Oauth to programmatically generate an API token against a store during installation. Once an app has received an API token for a store, the app can save the token in a database for reuse when calling the API.

The process to receive an OAuth token requires a little back and forth between BigCommerce and the app host. First, the app needs to request a temporary auth code from BigCommerce. When BigCommerce sends the temporary token, it sends along a couple of other pieces of information as well: the scopes that have been authorized for the API token and the hash, or identifier, for the store that's installing the app.

Next, the app posts back a response containing a series of claims that let the BigCommerce auth service know it’s okay to return a real Oauth token. Those claims include the temporary auth token received previously from BigCommerce, the store hash, the scopes, and a Client Id and Client Secret that were provided during app registration. If everything checks out, the BigCommerce auth service sends back a permanent Oauth token and the app shows ;"Installed" in the store control panel.

All of these network requests need to happen over publicly accessible URLs. When testing app installation and authentication, we either need to host the app on a server, or a platform like Heroku, or use a tool like ngrok to create tunnel URLs from localhost.

## Test OAuth Locally
content

## Handle Callbacks
content

## Support Multiple Users
content

## Listen for Events
Webhooks...

## Design the UI
Brief description, then point to UI doc...

## Create Install Buttons
Content....

## Follow Best Practices

## Check Requirements

## Deploy the App
BigCommerce stores are hosted on [Google Cloud Platform](https://cloud.google.com/) in the [us-central1](https://cloud.google.com/compute/docs/regions-zones/) region.

Therefore, you can maximize performance of your app (in terms of latency to the public API) by hosting in the same region. There is no requirement to do so, and you may host wherever you like.

## Publish to Marketplace
content

## Resources

### Tools
* [Online Crawler](https://www.jitbit.com/sslcheck/) (JitBit)
### Sample Apps
* [Ruby Hello World](https://github.com/bigcommerce/omniauth-bigcommerce) (BigCommerce GitHub)
* [Python Hello World](https://github.com/bigcommerce/hello-world-app-python-flask) (BigCommerce GitHub)
### Related Articles
* [Big Design Developer Playground](https://developer.bigcommerce.com/big-design)
* [Authentication](/api-docs/getting-started/authentication)
* [Customer Login API](/api-docs/storefront/customer-login-api)
* [App Store Approval Requirements](/api-docs/partner/app-store-approval-requirements)
* [Store Accounts](https://support.bigcommerce.com/s/article/Store-API-Accounts#creating) (Knowledge Base)
* [Supported Browsers](https://support.bigcommerce.com/s/article/Themes-Supported-Browsers) (Knowledge Base)
* [BigCommerce Partners](https://www.bigcommerce.com/partners/) (BigCommerce)
* [How to Test App Authentication Locally with ngrok](https://medium.com/bigcommerce-developer-blog/how-to-test-app-authentication-locally-with-ngrok-149150bfe4cf) (BigCommerce Developer Blog)
* [Building a BigCommerce App Using Laravel and React](https://medium.com/bigcommerce-developer-blog/building-a-bigcommerce-app-using-laravel-and-react-711ceceb5006) (BigCommerce Developer Blog)
* [Big Design Tutorial](https://medium.com/bigcommerce-developer-blog/bigdesign-build-native-looking-uis-with-the-bigcommerce-design-system-fb06a01a24f2) (BigCommerce Developer Blog)
### Additonal Resources
* [Same Origin Policy](https://en.wikipedia.org/wiki/Same-origin_policy) (Wikipedia)
* [Quick Look at P3P](https://blogs.msdn.microsoft.com/ieinternals/2013/09/17/a-quick-look-at-p3p/) (Microsoft Blogs)
* [Google Cloud](https://cloud.google.com/) (Google)
