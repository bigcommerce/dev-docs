# Open Checkout Quick Start

In this quick start tutorial, we'll configure our development environment and make a code change to a fork of BigCommerce's [Open Checkout](https://github.com/bigcommerce/checkout-js) (also known as [Optimized One-Page Checkout](https://support.bigcommerce.com/s/article/Optimized-Single-Page-Checkout)).

### Prerequisites

- [Developer sandbox](https://www.bigcommerce.com/essentials/free-trial/)
- Node v10 and later
- NPM v3 and later
- [Unix-based OS](https://github.com/bigcommerce/checkout-js#requirements) (Linux or Mac OS X)

<!-- theme: info -->
> #### Note
> We recommend that Windows 10 users use [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/).



## Fork and install checkout-js

Fork and clone [checkout-js](https://github.com/bigcommerce/checkout-js); then, install dependencies.

```bash
# Clone the repo
git clone https://github.com/bigcommerce/checkout-js

# Install dependencies
cd checkout-js
npm ci
```

## Start development server

Start webpack in watch mode and launch dev server.

```bash
npm run dev & npm run dev:server
```

<!-- theme: info -->
> #### Note
> - Open your browser and navigate to `http://127.0.0.1:8080/` to confirm the dev server is running (you should see content from `build/`).
> - To serve files over HTTPS, install an SSL on your development machine, or use [ngrok](https://ngrok.com/).



## Configure your sandbox

Next, configure your sandbox to use the files served up by your dev server.

1. Login to your BigCommerce developer sandbox, and navigate to **Advanced Settings** > [**Checkout**](https://login.bigcommerce.com/deep-links/manage/settings/checkout).
2. Change **Checkout Type** to **Custom Checkout**.
3. Under **Custom Checkout Settings**, copy and paste `http://127.0.0.1:8080/auto-loader-dev.js` into **Script URL**.
4. Save.

[Learn more about installing custom checkouts](/stencil-docs/customizing-checkout/installing-custom-checkouts).

## Make a code change

Make a code change and wait a few seconds for webpack to reload the dev server. For example, the code below adds a `<div>` to the Checkout component defined in `src/app/checkout/Checkout.tsx`.

```javascript
class Checkout extends Component<CheckoutProps & WithCheckoutProps & WithLanguageProps, CheckoutState> {
    // ...
    render(): ReactNode {
        // ...
        return <>
            <div className={ classNames({ 'is-embedded': isEmbedded() }) }>
                <div className="layout optimizedCheckout-contentPrimary">
                    <div>Open Checkout Quick Start Example</div>
                    { this.renderContent() }
                </div>
                { errorModal }
            </div>

        </>;
    }
}
```

## Resources

- [Open Checkout GitHub Repo](https://github.com/bigcommerce/checkout-js)
- [Installing Custom Checkouts](/stencil-docs/customizing-checkout/installing-custom-checkouts)
- [File Access (WebDav)](https://support.bigcommerce.com/s/article/File-Access-WebDAV)

### Additional resources

- [Fork a repo](https://docs.github.com/en/free-pro-team@latest/github/getting-started-with-github/fork-a-repo) (docs.github.com)
