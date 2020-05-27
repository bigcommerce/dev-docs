# Customizing Printable Packing Slips

<div class="otp" id="no-index">

### On This Page
- [Customizing Printable Packing Slips](#customizing-printable-packing-slips)
- [Resources](#resources)

</div> 

Merchants commonly request developers modify the default content of packing slips in order to satisfy specific business requirements and industry demands. In order to assist developers in making these changes, this articles contains instructions on how to edit the printable packing slip’s HTML.

## Customizing Printable Packing Slips

Customizing your Stencil theme’s printable packing slip currently relies on a template and variables from BigCommerce’s legacy Blueprint themes framework. To make changes to the packing slip file, do the following:

1. Download [printable packing slip .zip](https://storage.googleapis.com/bigcommerce-production-dev-center/template-files/packing_slip_printable.zip), which contains the HTML skeleton of a printable packing slip.

2. Make your customizations to the HTML file.

3. [Use WebDAV](https://support.bigcommerce.com/s/article/File-Access-WebDAV) to upload your customized HTML file to WebDAV’s `/template/` folder. Ensure that it is named `packing_slip_print.html` and replaces the default file, or your changes will not be applied.

## Resources

### Related Articles

* [Checking a Theme's Size](https://developer.bigcommerce.com/stencil-docs/deploying-a-theme/checking-a-themes-size)
* [Blueprint Theme Email Templates](https://developer.bigcommerce.com/legacy/blueprint-themes/blueprint-email-templates)
* [File Access (WebDAV)](https://support.bigcommerce.com/articles/Public/File-Access-WebDAV/) (Knowledge Base)
* [Uploading and Linking to a File in Your Store](https://support.bigcommerce.com/s/article/How-do-I-add-and-link-to-a-file-in-my-store#upload-a-file) (Knowledge Base)
