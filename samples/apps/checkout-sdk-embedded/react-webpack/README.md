# Checkout SDK Embedded Checkout - webpack

This README covers the steps to get the [embedded checkout](https://github.com/bigcommerce/checkout-sdk-js/blob/3a8220bdc3e81f9630954fd88420aded5b9daca3/docs/README.md#embedcheckout) running in an [React](https://reactjs.org/) app with [webpack](https://webpack.js.org/) locally. To read more about using Embedded Checkout see [Add article link here]

---
## Setup  

1. Download the app
2. `npm install` to install the `package.json`
3. Setup a Self Signed Certificate
To checkout using https://localhost a [Self Signed Certificate](https://en.wikipedia.org/wiki/Self-signed_certificate) is required.  Without one, the browser will return [CORs errors](https://medium.com/bigcommerce-developer-blog/lets-talk-about-cors-84800c726919?source=friends_link&sk=6268ac136f7e7d52af14d92c3af78413) and display a loading image. There are several options for installing a self signed certificate. We have chosen to use Open SSL to run the apps locally.

 - [How to get HTTPS working on your local development environment in 5 minutes](https://www.freecodecamp.org/news/how-to-get-https-working-on-your-local-development-environment-in-5-minutes-7af615770eec/) (freeCodeCamp) -- Uses Open SSL to create a certificate

*Your setup may vary and the instructions provided may not work for you. See our resources for more a starting point on setting up a certificate or a local server.*

3. Replace the `url` in `Checkout.js`[add link in repo to this] with the url to your embedded checkout
4.  Run `npm start` then visit `https://localhost/checkout`. You may have to use `sudo npm start`.  Anything lower than 1024 is usually a [privileged port](https://www.w3.org/Daemon/User/Installation/PrivilegedPorts.html). 

---
## CodeSandBox
[![Edit react-webpack-embedded-checkout](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-webpack-embedded-checkout-qucfg?fontsize=14)

*When running on CodeSandbox you may need to run the app in the browser directly. Copy the url provided into your browser instead of the one provided by CodeSandbox.* 

![CodeSandbox_url](https://raw.githubusercontent.com/bigcommerce/dev-docs/add-sample-apps/assets/img/readme_codesanbox_url.png)

---

 ## Resources
 
 - [mkcertt](https://github.com/FiloSottile/mkcert) (mkcert GitHub) -- Manually create certificates
 - [Getting Chrome to accept self-signed localhost certificate](https://stackoverflow.com/questions/7580508/getting-chrome-to-accept-self-signed-localhost-certificate) (Stack Overflow)
 - [Setting up a Node.js Express server for React](https://medium.com/@maison.moa/setting-up-an-express-backend-server-for-create-react-app-bc7620b20a61) (Medium)
 - [Set up a React app with a Node.js server proxy](https://www.twilio.com/blog/react-app-with-node-js-server-proxy) (Twilio)
 - [How to Set up Apache in macOS Sierra 10.12](https://medium.com/@JohnFoderaro/how-to-set-up-apache-in-macos-sierra-10-12-bca5a5dfffba) (Medium)
 - [How to Fix Your Connection is Not Private Error in Chrome (18 Tips)](https://kinsta.com/blog/your-connection-is-not-private/) (Kinsta)
 - [Is there a way for non-root processes to bind to “privileged” ports on Linux?](https://stackoverflow.com/questions/413807/is-there-a-way-for-non-root-processes-to-bind-to-privileged-ports-on-linux/414258#414258) (Stack Overflow)
 - [Allowing a user to let listen to a port below 1024](https://unix.stackexchange.com/questions/10735/allowing-a-user-to-let-listen-to-a-port-below-1024) (Unix Stack Exchange)
- [Privileged Ports](https://www.w3.org/Daemon/User/Installation/PrivilegedPorts.html) (W3.org)