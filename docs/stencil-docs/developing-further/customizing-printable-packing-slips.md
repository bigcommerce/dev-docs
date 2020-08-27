# Customizing Printable Packing Slips

<div class="otp" id="no-index">

### On this page
- [Customizing printable packing slips](#customizing-printable-packing-slips)
- [Resources](#resources)

</div> 

Developers are commonly asked to modify the default content of packing slips in order to satisfy specific business requirements and industry demands. This article contains instructions on how to edit the HTML file of a printable packing slip.

## Customizing printable packing slips

Customizing your Stencil theme’s printable packing slip currently relies on a template and variables from BigCommerce’s legacy Blueprint themes framework. To make changes to the packing slip file, follow these steps:


1. Download [printable packing slip .zip](https://storage.googleapis.com/bigcommerce-production-dev-center/template-files/packing_slip_printable.zip), which contains the HTML skeleton of a printable packing slip.

2. Make your customizations to the HTML file.

3. Upload your customized HTML file to the WebDAV’s `/template/` folder [using WebDAV](https://support.bigcommerce.com/s/article/File-Access-WebDAV). Ensure that it is named `packing_slip_print.html` and replaces the default file, or your changes will not be applied.

## Resources

### Related Articles

* [Checking a Theme's Size](https://developer.bigcommerce.com/stencil-docs/deploying-a-theme/checking-a-themes-size)
* [Blueprint Theme Email Templates](https://developer.bigcommerce.com/legacy/blueprint-themes/blueprint-email-templates)
* [File Access (WebDAV)](https://support.bigcommerce.com/articles/Public/File-Access-WebDAV/) (Knowledge Base)
* [Uploading and Linking to a File in Your Store](https://support.bigcommerce.com/s/article/How-do-I-add-and-link-to-a-file-in-my-store#upload-a-file) (Knowledge Base)
