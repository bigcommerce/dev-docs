<h1>Checkout/Confirmation Injection Options</h1>

<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
		<li><a href="#checkout_adding">Adding Storewide Styles</a></li>
    <li><a href="#checkout_applying-storewide-header">Applying Storewide Header</a></li>
    <li><a href="#checkout_applying-storewide-scripts">Applying Storewide Scripts</a></li>
    <li><a href="#checkout_adding-trust-seals">Adding Trust Seals</a></li>
    <li><a href="#checkout_app-injection">Checkout App Injection</a></li>
	</ul>
</div>
  


<a href='#checkout_adding' aria-hidden='true' class='block-anchor'  id='checkout_adding'><i aria-hidden='true' class='linkify icon'></i></a>

## Adding Storewide Styles 

A prerequisite for the next two options is to add themewide styles to your Checkout or Order Confirmation page. To do so, add this statement:

`{{{stylesheet '/assets/css/theme.css'}}}`

...before this statement, which is already present at the head of each template:

`{{{ checkout.checkout_head }}}`

<a href='#checkout_applying-storewide-header' aria-hidden='true' class='block-anchor'  id='checkout_applying-storewide-header'><i aria-hidden='true' class='linkify icon'></i></a>

## Applying Storewide Header 

You can replace each page's predefined header with your storewide header. To do so, first add themewide styles as described above. Next, replace the following code block (if present):

```
<header class="checkoutHeader optimizedCheckout-header">
    <div class="checkoutHeader-content">
        <h1 class="is-srOnly">{{lang 'checkout.title'}}</h1>
        <h2 class="checkoutHeader-heading">
            <a class="checkoutHeader-link" href="{{urls.home}}">
                {{#if checkout.header_image}}
                    <img alt="{{settings.store_logo.title}}" class="checkoutHeader-logo" id="logoImage" src="{{ checkout.header_image }}"/>
                {{ else }}
                    <span class="header-logo-text">{{settings.store_logo.title}}</span>
                {{/if}}
            </a>
        </h2>
    </div>
</header>
```

with this simple Handlebars statement:

`{{> components/common/header }}`

Ensure that you paste it before this **existing** statement:

`{{{ checkout.checkout_head }}}`



---

<a href='#checkout_applying-storewide-scripts' aria-hidden='true' class='block-anchor'  id='checkout_applying-storewide-scripts'><i aria-hidden='true' class='linkify icon'></i></a>

## Applying Storewide Scripts 

You have the following options to add and customize headers and footers, on either or both templates:

* Adding your themewide header/footer.
* Adding themewide scripts (for analytics, etc.).
* Adding both.

If you are working on a theme that does not have the scripts already enabled, here are the steps to enable these options:

1. Add themewide styles, as described above.

2. Towards the top of the checkout template (`checkout.html`), add this Handlebars statement to enable header scripts:

`{{{ head.scripts }}}`

Add it between these existing statements, so it will ultimately read as shown below.

```
<script type="text/javascript">
    window.language = {{{langJson 'optimized_checkout'}}};
</script>

{{{head.scripts}}}

{{/partial}}

{{#partial "page"}}
```

Additionally, at the bottom of the checkout template (`checkout.html`), add this Handlebars statement to enable footer scripts:

`{{{ footer.scripts }}}`

Add it between these existing statements, so it will ultimately read as shown below.

```
    {{{ checkout.checkout_content }}}

    {{{ footer.scripts }}}

    {{/partial}}
```

3. Towards the top of the order confirmation template (`order-confirmation.html`), add this Handlebars statement to enable header scripts:

`{{{ head.scripts }}}`

Add it between these existing statements, so it will ultimately read as shown below.

```
<script type="text/javascript">
    window.language = {{{langJson 'optimized_checkout'}}};
</script>

{{{head.scripts}}}

{{/partial}}

{{#partial "page"}}
```

Additionally, at the bottom of the order confirmation template (`order-confirmation.html`), insert this Handlebars statement:

`{{{ footer.scripts }}}`

Insert it between these existing statements, so it will ultimately read as shown below.

```
{{{ checkout.order_confirmation_content }}}

{{{ footer.scripts }}}

{{/partial}}
```

4. In your store's BigCommerce control panel, ensure that you have inserted any desired script text in the `Storefront` > `Script Manager` field.

---

<a href='#checkout_adding-trust-seals' aria-hidden='true' class='block-anchor'  id='checkout_adding-trust-seals'><i aria-hidden='true' class='linkify icon'></i></a>

## Adding Trust Seals 

To add a trust seal to either template:

1. Generate a code snippet (seal script) from your trust-seal provider. You can find instructions for GeoTrust seals in [this BigCommerce KB article](https://support.bigcommerce.com/articles/Public/Adding-a-GeoTrust-SSL-seal-to-your--footer?_ga=2.254356814.718421096.1540222570-967431010.1523308107). (Instructions for other providers will vary.)

2. Copy and paste the seal script into your checkout or order confirmation template, before or after the `{{{ checkout.checkout_content }}}` Handlebars statement.

<a href='#checkout_app-injection' aria-hidden='true' class='block-anchor'  id='checkout_app-injection'><i aria-hidden='true' class='linkify icon'></i></a>

## App Injection: Script Examples 

With BigCommerce's extensible software, there are a variety of ways to add scripts to your store. The steps above outline only one method of adding header and footer scripts to your store, which is by directly editing the theme files.

As mentioned in the App Injection Script Examples, you can use BigCommerce's Script Manager and Script API to inject scripts to your store. The Script Manager user interface is available to store owners and other users via granted permission directly in the Control Panel, or scripts can be programmatically injected into the store by developers using the Scripts API. These are the recommended methods as they allow seamless and intuitive injection of scripts.

The following sections present examples of scripts that inject popular apps into the checkout/order confirmation sequence.

### Olark Live Chat 

As an example of injecting an app from the BigCommerce Apps Marketplace, you could enable the Olark Live Chat app on either page by by using the script manager or our new Scripts API:

```
<!-- begin olark code -->
<script type="text/javascript" async>
;(function(o,l,a,r,k,y){if(o.olark)return;
r="script";y=l.createElement(r);r=l.getElementsByTagName(r)[0];
y.async=1;y.src="//"+a;r.parentNode.insertBefore(y,r);
y=o.olark=function(){k.s.push(arguments);k.t.push(+new Date)};
y.extend=function(i,j){y("extend",i,j)};
y.identify=function(i){y("identifyv",k.i=i)};
y.configure=function(i,j){y("configure",i,j);k.c[i]=j};
k=y._={s:[],t:[+new Date],c:{},l:a};
})(window,document,"static.olark.com/jsclient/loader.js");
/* Add configuration calls bellow this comment */
olark.identify('4080-493-10-1035');</script>
<!-- end olark code -->
```

### Bluecheck Age Verification

Similarly, you could enable the Bluecheck age-verification app by using the script manager or our new Scripts API:

```
<!-- Bluecheck AV Start Here -->
   <script src="https://api.bluecheck.me/modal/latest/custom/bigcommerce.js"></script>
   <script src='//api.bluecheck.me/age-gate/v2/loader.js.php?domain_token=[user-token-value]'></script>
   <span style='display:none' id='bc_selected_shipping_info'>%%GLOBAL_ShippingAddress%%</span>
   <span style='display:none' id='bc_selected_billing_info'>%%GLOBAL_BillingAddress%%</span>
   <span style='display:none' id='bc_customer_acct_email'>%%GLOBAL_CurrentCustomerEmail%%</span>
   <span style='display:none' id='bc_customer_acct_id'>%%GLOBAL_CurrentCustomerID%%</span>
   <span style='display:none' id='bc_customer_acct_fname'>%%GLOBAL_CurrentCustomerFirstName%%</span>
   <span style='display:none' id='bc_customer_acct_lname'>%%GLOBAL_CurrentCustomerLastName%%</span>
   <!-- Bluecheck AV End Here -->
```

### Rebillia Recurring Billing

To add the Rebillia app, you could add the following tags by using the script manager or our new Scripts API:

```
<div id='rebillia_overlay'></div>

<script src="https://js.braintreegateway.com/v2/braintree.js"></script>

<script type="text/javascript" src="https://js.stripe.com/v2/"></script>

<script type="text/javascript">
function customerJWT(a){var b="r1sc6nvnnhed377cozp2bfwfa69cfz5",c=new XMLHttpRequest;c.onreadystatechange=function(){if(4==c.readyState)if(200==c.status){var b=new XMLHttpRequest;b.open("GET","https://demo.rebillia.com/storefront/login/"+c.responseText,!0),b.withCredentials=!0,b.send()}else if(404==c.status){var d=new XMLHttpRequest;params="bc_email="+a,d.open("POST","https://demo.rebillia.com/storefront/login/guest",!0),d.setRequestHeader("Content-type","application/x-www-form-urlencoded"),d.withCredentials=!0,d.send(params)}else console.log("Something went wrong")},c.open("GET","/customer/current.jwt?app_client_id="+b,!0),c.send()}var currentcustomeremail="%%GLOBAL_CurrentCustomerEmail%%",shopPath="%%GLOBAL_ShopPathSSL%%",domainName="https://demo.rebillia.com",domainURL="https://demo.rebillia.com/";$(document).ready(function(){$.getScript(domainName+"/js/embed-common.js");var a=window.location.href.match(/[^\/]+$/);if(a&&a.length){var b=a[0].split(".");"account"!=b[0]&&"checkout"!=b[0]&&"finishorder"!=b[0]||$.getScript(domainName+"/js/embed-"+b[0]+".js"),"account"==b[0]&&customerJWT()}});
</script>
```

### Conversion Tracking: Conversions on Demand 

Here is one final example of an app that you could enable by using the script manager or our new Scripts API. This example enables Conversions on Demand:

```
<script type='text/javascript'>// <![CDATA[
    var cod_page_guid = 'CHECKOUT';
    var COD_CONFIG = {'platform':'bigcommerce', 'stoken':'as2_bcmarket_org'};
        (function(){
            var divCOD = document.createElement('div');
            divCOD.id = 'codScripts';
            var bodytag = document.getElementsByTagName('body')[0];
            bodytag.appendChild(divCOD);
            var cod = document.createElement('script');
            cod.type = 'text/javascript';
            cod.src = 'https://www.conversionsondemand.com/codadmin2/framework/cod-scripts-loader.js';
            var s = document.getElementById('codScripts');
            s.parentNode.insertBefore(cod, s);
        })(COD_CONFIG);
// ]]></script>
```

### Google Analytics: Addrexx Address Verification 

The Addrexx app is integrated to the Checkout or Order Confirmation page via the BigCommerce control panel's Google Analytics box, rather than through injection directly into either Stencil template file. Here is the corresponding script to enter into the control panel:

```
<!-- START  Addrexx -->
<script type="text/javascript">
wwPage = window.location.href;
if (wwPage.indexOf("billing_address") >= 0 || wwPage.indexOf("create_account") >= 0 || wwPage.indexOf("shipping_address") >= 0 || wwPage.indexOf("checkout") >= 0) {
function loadaddrexx() {
    var _cc_url = "xxredda.s3.amazonaws.com/bcmarket/loader.js";
    var _cc_s = document.createElement('script');
    _cc_s.type = 'text/javascript';
    _cc_s.src = (("http:" === document.location.protocol) ? "http:" : "https:") + "//" + _cc_url;
    document.getElementsByTagName("head")[0].appendChild(_cc_s);
};
loadaddrexx();
}
</script>
<!-- END  Addrexx -->
```


