<h1>Customizing Printable Packing Slips</h1>

<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#customizing_packing">Customizing Printable Packing Slips</a></li>
    <li><a href="#customizing_packing_resources">Resources</a></li>
	</ul>
</div>

Merchants commonly request developers modify the default content of packing slips in order to satisfy specific business requirements and industry demands. In order to assist developers in making these changes, this articles contains instructions on how to edit the printable packing slip's HTML.

<a href='#customizing_packing' aria-hidden='true' class='block-anchor'  id='customizing_packing'></a>

## Customizing Printable Packing Slips

Customizing your Stencil theme's printable packing slips currently relies on a template and variables from BigCommerce's legacy Blueprint themes framework. Here are the steps:

1. Download [this printable packing slip .zip file](https://storage.googleapis.com/bigcommerce-production-dev-center/template-files/packing_slip_printable.zip), which contains the skeleton of a printable packing slip.

2. Make your customizations to the HTML file.

3. Set your theme's checkout type to Custom one-page checkout (for developers).

4. [Use WebDAV](https://support.bigcommerce.com/articles/Public/File-Access-WebDAV/) to upload your customized HTML file to WebDAV's `/template/` folder<sup>1</sup>.

5. Once you have completed the above steps, you are free to switch your theme's checkout type to
`One-page checkout` or `Optimized one-page checkout`.

<div class="HubBlock--callout">
<div class="CalloutBlock--">
<div class="HubBlock-content">
    
<!-- theme:  -->

> There is no way to re-display this pop-up after selecting Done, so be sure to securely store the credentials before leaving this screen.

</div>
</div>
</div>

<a href='#customizing_packing_resources' aria-hidden='true' class='block-anchor'  id='customizing_packing_resources'></a>

## Resources
* For more information on accessing theme files via WebDAV, see [File Access (WebDAV)](https://support.bigcommerce.com/articles/Public/File-Access-WebDAV/).
* To learn more about using WebDAV with Stencil themes, see [Shrinking Your Theme by Excluding Static Assets](https://developer.bigcommerce.com/stencil-docs/prepare-and-upload-a-theme/shrinking-your-theme).
* Our recommended WebDAV client is [CyberDuck](https://cyberduck.io/) (Windows and Mac OS), for which your store's control panel offers a downloadable [connection file](https://forum.bigcommerce.com/s/article/File-Access-WebDAV#login-info) prefilled with most store credentials.

