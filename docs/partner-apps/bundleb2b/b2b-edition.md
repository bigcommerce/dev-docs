# The B2B Edition of BigCommerce
### On this page
- [B3 integration with BigCommerce](#b3-integration-with-bigcommerce)
- [Customizing B3](#customizing-b3)
- [Overwriting and injecting JavaScript](#overwriting-and-injecting-javascript)
- [B3 REST API](#b3-rest-api)
- [Resources](#resources)

BundleB2B (B3) adds business-to-business (B2B) functionality to the BigCommerce platform, allowing businesses to easily facilitate B2B operations online. B3 provides a comprehensive suite of key B2B features to improve the B2B self-service experience for BigCommerce store owners and their customers.

The B2B Edition of BigCommerce is a bundled offering of the BigCommerce Enterprise solution, B3, and six BigCommerce themes with B3 preinstalled.

B3 offers multiple enhancements to your BigCommerce store, including:

- Corporate account management
- Sales representative masquerade
- Shared shopping lists
- Payment method visibility control
- Company address book management
- Sales representative quoting
- Buy again
- Trade professional application

## B3 integration with BigCommerce

B3 comes pre-installed with your theme if you purchase the B2B Edition of BigCommerce. If B3 is purchased as a separate product for an existing BigCommerce plan, the B3 app is installed from the BigCommerce App Marketplace and must be manually integrated with your BigCommerce theme.

The B3 admin panel is seamlessly loaded as an iFrame accessible from the My Apps section of your store's dashboard. The client-facing portions of the app are loaded dynamically with JavaScript.

## Customizing B3

With B3, you can customize the placement of B3 app elements, display text, styling, and checkout configurations. You also have access to the lifecycle methods for many B3 modules to inject your own JavaScript functions.

Additionally, you can use the B3 REST API to create, read, update, and delete items such as orders, companies, addresses, payments, sales reps, and users. This API allows you to build your own services or integrate B3 with third-party business tools such as Salesforce.

### Prerequisites for customizing B3

- [Stencil CLI](https://developer.bigcommerce.com/stencil-docs/installing-stencil-cli/installing-stencil)
- [Node.js 12 and npm](https://nodejs.org/en/download/releases/)
- [Stencil API token](https://support.bigcommerce.com/s/article/Store-API-Accounts#creating) to push BigCommerce theme using Stencil CLI
- A code editor
- Access to your BigCommerce store dashboard with Store Owner permissions

### Customize page containers

B3 renders client-facing pages and elements by mounting fixed containers to BigCommerce themes using JavaScript. You can change the placement of select B3 elements by using `window.b3themeConfig.useContainers = {}` to specify which DOM node B3 mounts the container on.

To specify which DOM node a B3 container mounts on, insert `window.b3themeConfig.useContainers = {}` into your theme's `assets/js/global.js` file. Within `window.b3themeConfig.useContainers = {}`, create a property that uses the name of the B3 container as the key and the selector for the theme element it will mount on as the value. When done, the object will resemble the following:

```jsx
window.b3themeConfig.useContainers = {
 /* B3 will append the dashboard container to the first returned DOM node with a class of "page" that is a descendant of an element with the class of "container" */
	'dashboard.container': '.container .page',
}
```

For a list of B3 container names and their default placements, see the [BundleB2B Developer Guide](https://developer.bundleb2b.net/storefront/containers.html).

### Customize styles

You can customize the styling of many B3 elements using CSS.

To modify the styling of a B3 module, first, insert `window.b3themeConfig.useStyles = {}` into your theme's `assets/js/global.js` file. Within `window.b3themeConfig.useStyles = {}`, create a property that uses the B3 element name as the key and one or more comma-separated CSS declarations as the value.

Since the CSS is written in a JavaScript object, properties with two names, like `background-color`, must be written with camel case syntax: `backgroundColor: "lightblue"`

When done, the object will resemble the following:

```jsx
window.b3themeConfig.useStyles = {
/* B3 will use the specified styles for the "Trade Partner Application" button that is appended to the secondary navigation menu */
      'tpa.entryButton': {
        fontFamily: 'Karla,Arial,Helvetica,sans-serif',
        fontSize: '1rem',
        listStyle: 'none',
        boxSizing: 'border-box',
        lineHeight: 'inherit',
        transition: 'color .15s ease',
        display: 'block',
        color: '#333',
        fontWeight: 700,
        padding: '1rem .78571rem',
        textDecoration: 'none',
        textTransform: 'uppercase',
      },
    };
```

For diagrams of B3 element names and their placements, see the [BundleB2B Developer Guide](https://developer.bundleb2b.net/storefront/containers.html).

### Customize display text

B3 allows you to customize display text for many of the application's elements, such as buttons, headers, and labels.

To overwrite the default text that B3 renders, insert `window.b3themeConfig.useText = {}` into your theme's `assets/js/global.js` file. Within `window.b3themeConfig.useText = {}`, create a property for each element you would like to overwrite using B3 element names as keys and strings containing the new display text as values.

When done, the object will resemble the following:

```jsx
window.b3themeConfig.useText = {
/* B3 will now use the call to action "Place Quick Order" instead of the default "Quick Order Pad" for the button that is appended to the secondary navigation menu */
 'nav.button.quickOrderPad': 'Place Quick Order',
}
```

For B3 element names and default text values, see the [BundleB2B Developer Guide](https://developer.bundleb2b.net/storefront/text.html).

## Overwriting and injecting JavaScript

B3 has lifecycle methods for many modules that allow you to inject custom JavaScript functions at different times during page render. Each supported module has the following four global keys:

```jsx
overwrite: false,
callback() {},
beforeMount() {},
mounted() {},
```

- `overwrite` is a `boolean` that specifies whether to overwrite B3 functions for that module. Default is `false`.
- `callback()` is a `function` that will call all enclosed functions regardless of the value of `overwrite` after all other B3 code has run. Default is `noop`.
- `beforeMount()` is a `function` that calls all enclosed functions before the module renders. Default is `noop`.
- `mounted()` is a `function` that calls all enclosed functions after the module has rendered. Default is `noop`.

To overwrite and/or inject custom functions for a supported B3 module, insert `window.b3themeConfig.useJavaScript = {}` into your theme's `assets/js/global.js` file. Within `window.b3themeConfig.useJavaScript = {}`, create a property for each of the modules you'd like to customize that uses the module name as the key and the aforementioned global keys as the value.

When done, your object will resemble the following example that demonstrates the call stack of each function:

```jsx
window.b3themeConfig.useJavaScript = {
 quickorderpad: {
        overwrite: false,
        callback() {
          console.trace("quickorderpad.callback() runs after all other quickorderpad functions")
        },
        beforeMount() {
     console.trace("quickorderpad.beforeMount() runs before quickorderpad mounts")        
},
        mounted() {
          console.trace("quickorderpad.mounted() runs after quickorderpad mounts");
}
```

The output to the browser console of the above example is the following:

![B3 console log output](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/B3-console.png)

For a full list of available modules, see the [BundleB2B Developer Guide](https://developer.bundleb2b.net/storefront/js.html).

## B3 REST API

You can find instructions on how to get your B3 authentication token on the [BundleB2B Developer Guide](https://developer.bundleb2b.net/storefront/api-call.html) page.

For the complete list of API endpoints, see [B3 Open API (v2) specifications](https://developer.bundleb2b.net/openapi/).

## Resources

- [Quick start - BundleB2B Developer Guide](https://developer.bundleb2b.net/storefront/quick-start.html)
- [BundleB2B Open API (v2)](https://developer.bundleb2b.net/openapi/)
- [RESTful APIs call - BundleB2B Developer Guide](https://developer.bundleb2b.net/storefront/api-call.html)
- [Customize display text - BundleB2B Developer Guide](https://developer.bundleb2b.net/storefront/text.html)
- [Customize page containers - BundleB2B Developer Guide](https://developer.bundleb2b.net/storefront/containers.html)
- [Javascript overwrite or injection - BundleB2B Developer Guide](https://developer.bundleb2b.net/storefront/js.html)
