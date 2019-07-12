<h1>Authorizing and Initializing Stencil</h1>

<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#authorizing_prerequisites">Prerequisites</a></li>
    <li><a href="#authorizing_authorizing-oauth">Authorizing with OAuth Tokens</a></li>
	</ul>
</div>

<a href='#authorizing_prerequisites' aria-hidden='true' class='block-anchor'  id='authorizing_prerequisites'><i aria-hidden='true' class='linkify icon'></i></a>

## Prerequisites

The following are required from performing previous steps prior to authorizing and Initializing your Stencil theme:

* An [API account](/stencil-docs/getting-started/authentication-and-tokens) with the Themes scope set to `read-only` or `modify`
* a `Client ID` and `Access Token`, which are both generated when an API account is created

**Note:** _`modify` access is required to run the `stencil push` command, which uploads and applies a theme to your store._

<div class="HubBlock--callout">
<div class="CalloutBlock--">
<div class="HubBlock-content">
    
<!-- theme:  -->

###  Best Practice: Isolate Stores by Subdirectory
> If you are sharing a theme across storefronts, we strongly recommend that you clone a separate subdirectory (each containing its own `.stencil` file) for each store. This helps isolate and secure each merchant's data.

You can clone your `/cornerstone/` subdirectory now to create your first isolated copy, and then switch to the resulting new subdirectory to continue. (Prior to March 2017, Stencil's default subdirectory name was `/stencil/`.)

</div>
</div>
</div>

<a href='#authorizing_authorizing-oauth' aria-hidden='true' class='block-anchor'  id='authorizing_authorizing-oauth'><i aria-hidden='true' class='linkify icon'></i></a>

## Authorizing with OAuth Tokens

Use these steps to authorize and initialize Stencil.

Use the following steps to authorize your theme using an OAuth API account:

1. Have your store API account's `Client ID` and `Access Token` hashes ready. 
(Refer back to [Authentication & Tokens](/stencil-docs/getting-started/authentication-and-tokens))

2. Starting from the subdirectory for the appropriate theme (and store), initialize Stencil CLI by running the following command (_Windows users need to run this in git bash_):

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name"></div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: ""
subtitle: ""
lineNumbers: true
-->

```shell
stencil init
```

3. You will be prompted to provide the homepage URL of the production store against which you want to develop (for example, `https://storename.com` or `https://storename.mybigcommerce.com`). This can be your own store, or a client store that you are customizing. 

4. Next, you will be prompted to enter the port where you would like to run your store on your local machine. This can be any port you like, but we recommend using port 3000.

5. Next, you will be prompted: `What is your Stencil OAuth Client ID?` Enter your store API account's Client ID.

(If you used this Client ID when you last ran `stencil init`, you'll see it hinted on the command line, and can just confirm it.)

6. Finally, you will be prompted: `What is your Stencil OAuth Access Token?` If you entered these credentials when you last ran stencil init, you'll see the token hinted in cleartext. If not, paste your `Access Token` hash onto the command line. Then press Enter.

Your terminal window should now confirm that you have successfully initialized Stencil CLI on your local machine. With Stencil CLI initialized, you are ready to start Stencil and begin development.

---

## Resources
### Related Articles
* [Common Stencil CLI Pitfalls and How to Avoid Them](https://medium.com/bigcommerce-developer-blog/common-stencil-cli-pitfalls-and-how-to-avoid-them-7562dbbab793) (Developer Blog)

