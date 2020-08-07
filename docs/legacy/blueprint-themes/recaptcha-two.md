# ReCaptcha 2

<div class="otp" id="no-index">

### On This Page
- [Better Spam Deterrence](#better-spam-deterrence)
- [How to Upgrade](#how-to-upgrade)
- [Supported Browsers](#supported-browsers)

</div> 

To deter spam submission through storefront forms, BigCommerce now supports Google [reCAPTCHA v2](https://support.google.com/recaptcha/?hl=en#6080933) challenges, to distinguish human customers/visitors from automated bots.

## Better Spam Deterrence

We recommend that all storefront themes take advantage of this upgraded bot detection. However, BigCommerce's legacy Blueprint themes were last published in our Theme Marketplace before we implemented reCAPTCHA v2. Therefore, please use the following instructions to update your Blueprint-based theme with the best-available deterrent against automated spam.

## How to Upgrade

To incorporate reCAPTCHA v2, you will need to update script references in these three template files: 

* `Panels/CreateAccountForm.html`
* `page_contact_form.html`
* `product_comments.html`

<div class="HubBlock--callout">
<div class="CalloutBlock--error">
<div class="HubBlock-content">
    
<!-- theme: error -->

###  Updating Safely 

> Please back up each file before making any changes. 

The instructions below are based on the default Blueprint theme (Classic Next), as it was last published in BigCommerce’s Theme Marketplace. Therefore, the HTML markup will vary, based on customizations you have already made to this theme, or to other Marketplace themes.

</div>
</div>
</div>

### Script Tag to Remove
Search each of the three template files for a ``<script>`` tag like the following. If you find it, delete the whole tag. (This script invokes a legacy reCAPTCHA v1 challenge:)

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">Script Tag to Remove</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "Script Tag to Remove"
subtitle: ""
lineNumbers: true
-->

```html
<script type="text/javascript"> 
 var RecaptchaOptions = { 
 theme : 'clean' or 'white' 
 }; 
 </script>
```

### Variable to Remove

Alternately, you might see the same `RecaptchaOptions` variable inside a different `<script>` tag at the top of the same three templates. If so, delete the lines shown here:

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

```js
var RecaptchaOptions = { 
 theme : 'clean' or 'white'
 };

```

### reCAPTCHA Script to Update

In each of the three template files, add the following script tag to the top of the page.


<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">Script Tag to Remove</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "Script Tag to Update"
subtitle: ""
lineNumbers: true
-->

```html
<script src="https://www.google.com/recaptcha/api.js" async defer></script>
```

Then replace the "before" code block just below with the simplified "after" code that follows.

#### Replace this (before):

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

```html
<script type="text/javascript"
src="https://www.google.com/recaptcha/api/challenge?k=%%GLOBAL_ReCaptchaAPIKeyPublic%%">
</script>

<noscript>
<iframe src="https://www.google.com/recaptcha/api/noscript?k=%%GLOBAL_ReCaptchaAPIKeyPublic%%"
height="300" width="500" frameborder="0"></iframe>
<br>
<textarea name="recaptcha_challenge_field" rows="3" cols="40">
</textarea>
<input type="hidden" name="recaptcha_response_field"
value="manual_challenge">
</noscript>
```

#### ...with this (after):

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

```java
%%GLOBAL_ReCaptchaMarkup%%

```

## Supported Browsers 

Below are the browsers supported for the BigCommerce control panel. We drop support when a version falls below 2% of usage. The browsers are sorted by popularity, with the most popular browsers at the top.

| Desktop |
|-|
| Chrome latest |
| Firefox latest |
| Internet Explorer 11 or later |
| Safari latest |

For a current list of target browsers (desktop and mobile) that BigCommerce supports for _storefronts_ using our themes, please see <NOBR><a href="https://forum.bigcommerce.com/s/article/Themes-Supported-Browsers" target="_blank">this support page</a>.</nobr>
