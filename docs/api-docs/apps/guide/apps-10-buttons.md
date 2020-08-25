# Creating a Single-Click App Install Button


<div class="otp" id="no-index">

### On This Page
- [Creating an install button](#creating-an-install-button)
- [Configuring the button](#configuring-the-button)
- [Rendering success and failure pages](#rendering-success-and-failure-pages)
- [Handling errors](#handling-errors)
- [Code samples](#code-samples)

- [Next steps](#next-steps)
- [Resources](#resources)

</div>

Single-click apps can be installed from outside the BigCommerce control panel. For example, an install button on your company's site that directs the merchant to download your app. This tutorial provides step-by-step instructions for creating an external install button for BigCommerce single-click apps.


## Creating an install button

First, embed an install button like the one below, at any web location from which you’d like to enable app installation.

![Install Button](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/apps-10-buttons-01.png "Install Button")

Redirect anyone who presses your button to: `https://login.bigcommerce.com/app/{{CLIENT_ID}}/install`.

## Configuring the button

When clicked, your button should open a modal similar to the image below. We recommend a modal sized `900px` wide by `450px` high.

![Install Button](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/apps-10-buttons-02.png "Install Button")

Your button will link merchants to BigCommerce's install endpoint for your application. Once the merchant clicks the link, they will be prompted to log in and authorize your application.

## Rendering success and failure pages

Modify your web site's server-side code to serve either a success or failure page, depending on whether the external installation was successful or unsuccessful.

If you skip this step, your application will load in the iFrame created by your button. To ensure a good experience for your users, we strongly recommend that you return a confirmation page, instead of allowing your application to be loaded in that modal.

## Handling errors

If your application's installation was initiated and completed through an external link, BigCommerce will send your `auth` callback endpoint an extra parameter called `external_install`.

If you receive this parameter and there are no errors, make a `GET` request to the install succeeded endpoint.


```http
GET /app/{{CLIENT_ID}}/install/succeeded  HTTP/1.1
Host: login.bigcommerce.com
```

If there were errors, make a `GET` request to the install failed endpoint:

```http
GET /app/{{CLIENT_ID}}/install/failed  HTTP/1.1
Host: login.bigcommerce.com
```

Depending on which endpoint you call, BigCommerce will render a success or failure page to the modal.

## Code samples


Handling errors in Lua:

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

## Next steps
* [Follow best practices](https://developer.bigcommerce.com/api-docs/apps/guid/best-practices).
* [Check requirements](https://developer.bigcommerce.com/api-docs/apps/guide/requirements).
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
