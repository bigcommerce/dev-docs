# Creating an App Install Button

<div class="otp" id="no-index">

### On This Page
- [Create an install button](#create-an-install-button)
- [Configure your button](#configure-your-button)
- [Render success/failure pages](#render-successfailure-pages)
- [Handling errors](#handling-errors)
- [Next steps](#next-steps)
- [Resources](#resources)

</div>

Apps can be installed from outside the BigCommerce control panel. For example, you could create an install link on your company's site that directs the merchant to download your app. This tutorial provides step-by-step instructions for creating an external instal button for BigCommerce Apps.

## Create an install button
First, embed an install button like the one below, at any web location from which you’d like to enable app installation:

![Install Button](//s3.amazonaws.com/user-content.stoplight.io/6490/1539297285625 "Install Button")

Redirect anyone who presses your button to: `https://login.bigcommerce.com/app/{{CLIENT_ID}}/install`

## Configure your button
Upon clicking, your button should open a modal similar to the image below. We recommend a modal sized 900px wide by 450px high.

![Install Button](//s3.amazonaws.com/user-content.stoplight.io/6490/1539297431440 "Install Button")

Your button will link merchants to BigCommerce’s install endpoint for your application. Once the merchant clicks the link, they will be prompted to log in, then authorize your application, just like in the [normal installation flow](#installation-and-update-sequence).

## Render success/failure pages
Modify your application code to serve either a success or failure page, depending on whether the external installation was successful or unsuccessful.

If you skip this step, your application will load in the iframe created by your button. To ensure a good experience for your merchants, we strongly recommend that you return a confirmation page, instead of allowing your application to be loaded in that modal.

## Handling errors
If your application's installation was initiated and completed through an external link, BigCommerce will send your auth callback endpoint an extra parameter called `external_install`.

If you receive this parameter and there are no errors, call:

```
https://login.bigcommerce.com/app/{{CLIENT_ID}}/install/succeeded
```

If there were errors, call:

```
https://login.bigcommerce.com/app/{{CLIENT_ID}}/install/failed
```

Below is a sample code snippet of an auth callback that does this:

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

Depending on which endpoint you call, we will render one of the following success/failed pages to the modal.

## Next steps

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