# B2B Edition 

BigCommerce offers optional business-to-business (B2B) functionality with BundleB2B (B3), allowing businesses to streamline online operations and improve the experience for BigCommerce store owners and their B2B customers.

The B2B Edition is a packaged offering of the BigCommerce Enterprise plan, B3, and [six BigCommerce themes optimized for B3](https://support.bigcommerce.com/s/article/B2B-Edition?language=en_US#themes).

B3 offers multiple B2B feature enhancements to your BigCommerce store, including the following:

- Customer account hierarchy with user roles and permissions
- Shared shopping lists and buy again functionality
- Sales representative enablement tools
- Quote management
- Invoice & payment management

## Installing B3 

The B3 admin panel is accessible from the My Apps section of your store's dashboard. The client-facing portions of the app are loaded dynamically with JavaScript.

## Customizing B3

With B3, you can customize the placement of B3 app elements, display text, styling, and checkout configurations. You also have access to the lifecycle methods for many B3 modules to inject your own JavaScript functions.

Additionally, you can use the B3 REST API to create, read, update, and delete items such as orders, companies, addresses, payments, sales reps, and users. This API allows you to build your own services or integrate B3 with third-party business tools, such as Salesforce.

This section gives details on how to edit the DOM, CSS, and display text, and how to define JavaScript lifecycle methods. It assumes you are familiar with editing Stencil themes locally and pushing them to a sandbox or production store using the Stencil CLI.

### Prerequisites for customizing B3

- [Node.js 14+ and npm](https://nodejs.org/en/download/releases/)
- The [Stencil CLI](/stencil-docs/installing-stencil-cli/installing-stencil)
- A [Stencil API token](https://support.bigcommerce.com/s/article/Store-API-Accounts#creating), to push your customized B3-optimized theme to a store 
- A text editor
- Access to your BigCommerce store control panel with store owner permissions

### Customizing page containers

B3 renders client-facing pages and elements by mounting fixed containers to BigCommerce themes using JavaScript. You can change the placement of select B3 elements by specifying the DOM node on which you want B3 to mount the container using the following steps:

1. Insert `window.b3themeConfig.useContainers = {}` into your theme's `assets/js/global.js` file. 
2. Within `window.b3themeConfig.useContainers = {}`, create a property with the name of the B3 container as its key and the selector for the theme element on which it will mount as its value. 

When done, the object will resemble the following:

```jsx title="Example: Specify a custom mount node for the dashboard container"
window.b3themeConfig.useContainers = {
 /* B3 will append the dashboard container to the first returned DOM node with a class of "page" that is a descendant of an element with the class of "container" */
	'dashboard.container': '.container .page',
}
```

For a list of B3 container names and their default placements, see the [BundleB2B Developer Guide](https://developer.bundleb2b.net/storefront/containers.html).

### Customizing styles

You can customize the styling of many B3 elements using CSS.

To modify the styling of a B3 module, follow these steps:
1. Insert `window.b3themeConfig.useStyles = {}` into your theme's `assets/js/global.js` file. 
2. Within `window.b3themeConfig.useStyles = {}`, create a property with the name of the B3 element as its key and an object that defines the desired CSS styles as its value.

<!-- theme: info -->
> #### Note
> Because the CSS is written in a JavaScript object, two-word properties, like `background-color`, must be written with camel case syntax. For example, `backgroundColor: "red"`.


When done, the object will resemble the following:

```jsx title="Example: Specify custom styles for the TPA button" lineNumbers
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

For more on B3 element names and their styles, see the [BundleB2B Developer Guide](https://developer.bundleb2b.net/storefront/styles.html).

### Customizing display text

B3 allows you to customize display text for many of the application's elements, such as buttons, headers, and labels.

To overwrite the default text that B3 renders, follow these steps:

1. Insert `window.b3themeConfig.useText = {}` into your theme's `assets/js/global.js` file. 
2. Within `window.b3themeConfig.useText = {}`, create a property for each element you would like to overwrite, using B3 element names as keys and strings containing the new display text as values.

When done, the object will resemble the following:

```jsx title="Example: Specify custom display text for the quick order button" lineNumbers
window.b3themeConfig.useText = {
/* B3 will now use the call to action "Place Quick Order" instead of the default "Quick Order Pad" for the button that is appended to the secondary navigation menu */
 'nav.button.quickOrderPad': 'Place Quick Order',
}
```

For B3 element names and their default text values, see the [BundleB2B Developer Guide](https://developer.bundleb2b.net/storefront/text.html).

### Overwriting and injecting JavaScript

B3 has lifecycle methods for many modules that allow you to inject custom JavaScript functions at different times during page render. Each supported module has the following four global keys:

| Key | Type | Default | Definition |
|:----|:-----|:--------|:-----------|
| overwrite | boolean | false | Specifies whether to overwrite B3 functions for the module. |
| callback() | function | {} (no-op) | Calls all enclosed functions after all other B3 code has run, regardless of the value of `overwrite`. |
| beforeMount() | function | {} (no-op) | Calls all enclosed functions before the module renders. |
| mounted() | function | {} (no-op) | Calls all enclosed functions after the module has rendered. |

To overwrite and/or inject custom functions for a supported B3 module, follow these steps:

1. Insert `window.b3themeConfig.useJavaScript = {}` into your theme's `assets/js/global.js` file. 
2. Within `window.b3themeConfig.useJavaScript = {}`, create a property for each of the modules you'd like to customize. Uses the module name as the key and an object that defines values for the global keys as its value.

When done, your object will resemble the following example that demonstrates the call stack of each function:

```jsx title="Example: Specify lifecycle method values for the quick order pad module" lineNumbers
window.b3themeConfig.useJavaScript = {
  quickorderpad: {
    overwrite: false,
    callback() {
      console.trace(`quickorderpad.callback() runs after all other quickorderpad functions`);
    },
    beforeMount() {
      console.trace(`quickorderpad.beforeMount() runs before quickorderpad mounts`);
    },
    mounted() {
      console.trace(`quickorderpad.mounted() runs after quickorderpad mounts`);
    }
  }
}
```

The following displays the example's browser console output:

![B3 console log output](https://github.com/bigcommerce/dev-docs/blob/fc576cd09ee4f346d2668d97082a75aeff7ff468/assets/images/B3-console.png?raw=true)

For a full list of available modules, see the [BundleB2B Developer Guide](https://developer.bundleb2b.net/storefront/js.html).

## B3 REST API

You can find instructions on how to get a B3 authentication token on the [BundleB2B Developer Guide](https://developer.bundleb2b.net/storefront/api-call.html) page.

For the complete list of B3 API endpoints, see the [BundleB2B OpenAPI Documentation](https://bundleb2b.stoplight.io/).

## Additional BundleB2B resources

- [Quick Start](https://developer.bundleb2b.net/storefront/quick-start.html)
- [BundleB2B API Reference](https://bundleb2b.stoplight.io/)
- [RESTful APIs call](https://developer.bundleb2b.net/storefront/api-call.html)
- [Customize display text](https://developer.bundleb2b.net/storefront/text.html)
- [Customize page containers](https://developer.bundleb2b.net/storefront/containers.html)
- [JavaScript overwrite and injection](https://developer.bundleb2b.net/storefront/js.html)
