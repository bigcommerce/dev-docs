# Beginning App Development

<div class="otp" id="no-index">

### On This Page
- [Getting Started](#getting-started)
- [Beginning with Hello World](#beginning-with-hello-world)
- [Testing Locally with Ngrok](#testing-locally-with-ngrok)
- [Registering a Draft App](#registering-a-draft-app)
- [Installing a Draft App](#installing-a-draft-app)
- [Next Steps](#next-steps)
- [Resources](#resources)

</div>

The BigCommerce team has developed an array of sample apps and tools to assist developers in the initial phase of app development. In this article, we'll introduce those tools and go over how to begin app development by installing and registering a draft app.

## Getting Started
Here's a few things you'll need before beginning app development:
1. [Store / Dev Sandbox](https://www.bigcommerce.com/essentials/free-trial/) (required to test app installation)
2. [DevTools Account](https://devtools.bigcommerce.com/) (required to register apps)
3. [BigCommerce partnership](https://www.bigcommerce.com/partners/) (required to publish apps to marketplace)

## Beginning with Hello World
The fastest way to begin app development is by starting with one of our Hello World apps. Create and install an app in minutes with our [Hello World Express example on CodeSandbox](https://developer.bigcommerce.com/api-docs/apps/quick-start), or clone the starter for your preferred stack:

* [Python / Flask](https://github.com/bigcommerce/hello-world-app-python-flask) (github)
* [PHP / Silex](https://github.com/bigcommerce/hello-world-app-php-silex) (github)
* [Ruby / Sinatra](https://github.com/bigcommerce/hello-world-app-ruby-sinatra) (github)
* [Laravel / React](https://github.com/bigcommerce/laravel-react-sample-app) (github)
* [Node / FaunaDB / Nelify](https://github.com/bigcommerce/channels-app/) (github)

## Testing Locally with Ngrok
You can use [Ngrok](https://ngrok.com/) to test apps locally. Its easy to install and works well with [Express](https://expressjs.com/) (expressjs.com):

```shell
npm install express-generator -g # install express generate

express myapp                    # generate new express app

cd myapp                         # move into app dir

npm install ngrok                # install ngrok

npm install                      # install dependencies

npm start                        # start app

ngrok http 3000                  # start ngrok
```

For step-by-step instructions, see [How to Test App Authentication Locally with ngrok](https://medium.com/bigcommerce-developer-blog/how-to-test-app-authentication-locally-with-ngrok-149150bfe4cf) on our [developer blog](https://medium.com/bigcommerce-developer-blog).

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

<!-- theme: info -->

### Note
> * If you'd rather skip setting up a development environment for now, and experiment with app development in the browser, fork our [Express Hello World App in CodeSandbox](https://codesandbox.io/s/express-hello-world-app-fq5t1?file=/app.js). For step-by-step instructions, see Building Apps [Quick Start](https://developer.bigcommerce.com/api-docs/apps/quick-start)

</div>
</div>
</div>

## Registering a Draft App
Once you've exposed an app to the internet, you can register a draft app in [DevTools](https://devtools.bigcommerce.com/) using the app's callback URLs. To do so:
1. [Login to DevTools](https://devtools.bigcommerce.com/)
2. Click **Create an App**
3. Give the app a name
4. Click **Technical**.

5. Enter your app's callback URLs. If you're using ngrok, they'll look like this:

   * **Auth**: `https://4022ffe4.ngrok.io/auth`
   * **Load**: `https://4022ffe4.ngrok.io/load`
   * **Uninstall**: `https://4022ffe4.ngrok.io/uninstall`
6.  Click **Update & Close**.

7.  Click **View Client ID** to view the app's `client_id` and `client_secret`.


## Installing a Draft App
Draft apps are installable on stores owned by the same email as the [DevTools](https://devtools.bigcommerce.com/my/apps) account. Log into the store and navigate to **Apps** > **My Apps** > [**My Draft Apps**](https://login.bigcommerce.com/deep-links/manage/marketplace/apps/my-apps/drafts) and click the app to install the draft. Once you click **Install**, BigCommerce will begin the OAauth flow by making a `GET` request to the app's `/auth` callback URL. If the app handles all the requests successfully, the app will be installed and you can begin feature development.


## Next Steps
* [Learn How Test App Authentication Locally with ngrok](https://medium.com/bigcommerce-developer-blog/how-to-test-app-authentication-locally-with-ngrok-149150bfe4cf)

## Resources

### Related Articles
* [Building Apps Quick Start](https://developer.bigcommerce.com/api-docs/apps/quick-start)

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
* [How to Test App Authentication Locally with ngrok](https://medium.com/bigcommerce-developer-blog/how-to-test-app-authentication-locally-with-ngrok-149150bfe4cf)
* [Building a BigCommerce App Using Laravel and React](https://medium.com/bigcommerce-developer-blog/building-a-bigcommerce-app-using-laravel-and-react-711ceceb5006)
* [Big Design Tutorial](https://medium.com/bigcommerce-developer-blog/bigdesign-build-native-looking-uis-with-the-bigcommerce-design-system-fb06a01a24f2)
