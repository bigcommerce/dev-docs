<h1>Creating an API Account to Obtain OAuth Tokens</h1>

<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#authentication_creating-an-api-account">Creating an API Account</a></li>
    <li><a href="#authentication_issuing-additional">Issuing Additional Tokens</a></li>
    <li><a href="#authentication_revoking-tokens">Revoking Tokens</a></li>
    <li><a href="#authentication_copying-oauth-tokens">Copying OAuth Tokens</a></li>
	</ul>
</div>

<div class="HubBlock--callout">
<div class="CalloutBlock--error">
<div class="HubBlock-content">
    
<!-- theme: error -->

### Status Check
> If you've successfully installed Stencil you're ready to create a BigCommerce API Account. 
_If you have not yet installed Stencil, see [Installing Stencil](/stencil-docs/getting-started/installing-stencil)._

</div>
</div>
</div>

<a href='#authentication_creating-an-api-account' aria-hidden='true' class='block-anchor'  id='authentication_creating-an-api-account'><i aria-hidden='true' class='linkify icon'></i></a>

## Creating an API Account 

Follow the steps below to create an API Account and obtain your OAuth Tokens.

1. Using the store owner's credentials, log into the control panel of the store for which you are developing. 

2. From the left nav, select `Advanced Settings` > `API Accounts`.

3. From the resulting Store API Accounts page, select the `Create API Account` button.

4. Give your account a name that reflects its purpose.

_The BigCommerce platform does not validate this name, however, we recommend naming accounts by purpose to help you keep track of which accounts you need to keep active. You should assign a name that will make the account's purpose clear to you and other store administrators._

5. Under OAuth Scopes, set the Themes selector to either `modify` or `read-only`.

_The read-only scope is sufficient to authorize/initialize a Stencil theme. However, the modify scope will achieve the same goal, while also authorizing this account to upload themes to the store from the command line._

6. Click `Save`. 

_Doing so will display a modal, from which you can copy your `Client ID` and `Access Token` values. The modal will also prompt your browser to download a .txt file that contains your credentials. You will need these values to authorize and initialize your Stencil theme. If you're ready to do so now, move ahead to [Authorizing and Initializing Stencil](/stencil-docs/getting-started/launching-stencil/authorizing-and-initializing)._

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">
    
<!-- theme: warning -->

### Reserved Role
> Currently, only the store owner can create an OAuth API account according to the instructions below. Also, note that each store is limited to 50 accounts at a time.

</div>
</div>
</div>

---

<a href='#authentication_issuing-additional' aria-hidden='true' class='block-anchor'  id='authentication_issuing-additional'><i aria-hidden='true' class='linkify icon'></i></a>

## Issuing Additional Tokens

To issue store tokens for additional themes or developers, repeat the process outlined in Creating an API Account.

(Even if you originally initialized your theme using a legacy API [Basic-Auth] token, you will need to generate any new tokens using the new OAuth flow.)

You can create up to 50 API accounts/tokens per store. If you hit this limit and still need to create new tokens, you will need to delete existing accounts. Deleting an account will invalidate the corresponding token, which will affect any developer using that token.


---

<a href='#authentication_revoking-tokens' aria-hidden='true' class='block-anchor'  id='authentication_revoking-tokens'><i aria-hidden='true' class='linkify icon'></i></a>

## Revoking OAuth Tokens

<div class="HubBlock--callout">
<div class="CalloutBlock--error">
<div class="HubBlock-content">
    
<!-- theme: error -->

> Note: After completing the below process, there is no undo. The following process completely deletes the selected account(s), revoking the corresponding token(s).

</div>
</div>
</div>

If you are completely sure you would like to revoke an existing OAuth store token, delete the corresponding Store API account with the following steps:

1. Navigate to the Control Panel’s API Accounts page.
2. Select the trash-can button to the right of the account that you want to delete<sup>1</sup>.

<!--
    title: 
    data: //s3.amazonaws.com/user-content.stoplight.io/6116/1537421464104
-->

![](//s3.amazonaws.com/user-content.stoplight.io/6116/1537421464104 "")

<div class="HubBlock--callout">
<div class="CalloutBlock--">
<div class="HubBlock-content">
    
<!-- theme:  -->

> 1. You can also use the check boxes at left to select multiple accounts to delete them all at once.

</div>
</div>
</div>

---

<a href='#authentication_copying-oauth-tokens ' aria-hidden='true' class='block-anchor'  id='authentication_copying-oauth-tokens '><i aria-hidden='true' class='linkify icon'></i></a>

## Copying OAuth Tokens 

To access an existing OAuth token to authorize your theme:

1. Open the `.txt` file<sup>2</sup> that the BigCommerce control panel generated when you created the API account.

2. Note the Client ID and Access Token hashes in the file (or in the control-panel modal for your newly created token).

3. If you are a merchant granting an outside theme developer access to your store, provide the Client ID and Access Token values to the developer. The developer will need these when [Authorizing and Initializing Stencil](/stencil-docs/getting-started/launching-stencil/authorizing-and-initializing). If you are a merchant developing a theme against your own store, you will use the same two values in the same [Authorizing and Initializing Stencil](/stencil-docs/getting-started/launching-stencil/authorizing-and-initializing) step.

<div class="HubBlock--callout">
<div class="CalloutBlock--">
<div class="HubBlock-content">
    
<!-- theme:  -->

> 2. If you did not retain this file, you will need to generate a new token by repeating the Creating an API Account procedure

</div>
</div>
</div>

