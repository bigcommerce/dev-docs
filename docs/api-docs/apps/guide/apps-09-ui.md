# Designing a Single-Click App's UI

<div class="otp" id="no-index">

### On this page
- [Installing BigDesign React components](#installing-bigdesign-react-components)
- [Using BigDesign tools](#using-bigdesign-tools)
- [Developing for the iFrame](#developing-for-the-iframe)
- [Next steps](#next-steps)
- [Resources](#resources)

</div>

Your app's user interface is loaded inside an iFrame in a store's control panel after a user clicks the app's icon in the left nav and tirggers the [`load` callback](https://developer.bigcommerce.com/api-docs/apps/guide/callbacks). To ensure a seamless user experience, you should design your app's UI to match the design of BigCommerce's control panel. We've built a collection of reusable React components, design guidelines, and UI patterns (known collectively as *BigDesign*) that you can use to rapidly develop an app front-end that's consistent with BigCommerce's UI.

## Installing BigDesign React components

Add BigDesign and styled-components to your project using `npm`:

```shell
npm install @bigcommerce/big-design styled-components
```

or with `yarn`:

```shell
yarn add @bigcommerce/big-design styled-components
```

Import the `GlobalStyles` component and use it once in your app. This will set a few styles globally, including a base font family, [Source Sans Pro](https://fonts.google.com/specimen/Source+Sans+Pro) and [normalize.css](https://github.com/necolas/normalize.css/). We recommend placing it close to your root component. Then import any component, such as `Button`, to use it anywhere in your app.

```jsx
import { Button, GlobalStyles } from '@bigcommerce/big-design';

// ...

<App>
  <GlobalStyles />
  <Button>Click me</Button>
</App>
```

For additional installation and usage instructions, see the [bigcommerce/big-design](https://github.com/bigcommerce/big-design) repo on GitHub.

## Using BigDesign tools

The BigCommerce team has developed a collection of tools to help you design your app's UI.

### Developer playground
The BigDesign Playground demonstrates the visual style and behavior of each BigDesign component. Each component has props that you can pass to the components for further configuration.

[Go to the BigDesign Developer Playground](https://developer.bigcommerce.com/big-design/).

### Example app
We've built a channels app that serves as a reference implementation for BigDesign React Components. You can install it on your store [here](https://apps.bigcommerce.com/details/18212) (apps.bigcommerce.com) to view the components.

[Learn more about the channels app](https://github.com/bigcommerce/channels-app).

### Design kits

Do you design with Figma or Adobe Illustrator? If so, check out our design kits:
* [BigDesign Figma UI Kit](https://www.figma.com/file/jTVuUkiZ1j3rux8WHG4IKK/BigDesign-UI-Kit?node-id=0%3A1/duplicate)
* [BigDesign Adobe Illustrator UI Kit](https://design.bigcommerce.com/bigdesign-ui-kit)

## Developing for the iFrame

Single-click apps benefit from a high level of integration with the BigCommerce control panel. BigCommerce achieves this by rendering your app's UI in an iFrame. To meet [Apps Marketplace](https://www.bigcommerce.com/apps/) requirements, your app should perform all functions inside the iFrame. The iFrame approach requires special attention from app developers.

To load inside the control panel iFrame, your app must do the following:
1. **Serve app resources over HTTPS:** BigCommerce's control panel is served over HTTPS. Your app must also be served over HTTPS, including any remote resources referenced (such as CSS, JS, and image files). If any resources are served over HTTP, the user's browser will display a mixed content error and refuse to render your app's UI in the control panel iFrame.
2. **Support browser same-origin policies:** Same-origin policities restrict apps running within iFrames from performing certain activities, such as interacting with other services. If your app requires this, open a new tab for actions that cannot occur in an iFrame<sup>1</sup>. [Learn more about same-origin policies](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy) (developer.mozilla.org).

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

<!-- theme: info -->

> ### Note
> 1. Apps that operate in the iFrame get strong preference during [Apps Marketplace](https://www.bigcommerce.com/apps/) consideration; however, we sometimes make exceptions for apps that need to interact with other services.

</div>
</div>
</div>

## Next steps
* [Create install buttons](https://developer.bigcommerce.com/api-docs/apps/guide/buttons).
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