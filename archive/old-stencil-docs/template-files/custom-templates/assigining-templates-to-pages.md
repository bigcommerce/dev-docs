<h1>Assigning Templates to Pages</h1>

<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#assigning_merchant-performed">Merchant Performed Actions</a></li>
		<li><a href="#assigning_assigning-a-web-page">Assigning a Web Page Template</a></li>
    <li><a href="#assigning_assigning-a-product">Assigning a Product, Brand, or Category Template</a></li>
    <li><a href="#assigning_troubleshooting">Troubleshooting Template Assignments</a></li>
	</ul>
</div>

<a href='#assigning_merchant-performed' aria-hidden='true' class='block-anchor'  id='assigning_merchant-performed'><i aria-hidden='true' class='linkify icon'></i></a>

## Merchant Performed Actions

Once the developer has uploaded a theme to BigCommerce, the merchant (or other authorized store user) can assign custom templates to individual store pages in the BigCommerce Control Panel. The steps are similar whether assigning brands, categories, products, and static Web pages – with slight differences. Below, we show examples for assigning a Web Page and a Category. For further details, please see the [Stencil Custom Templates Knowledge Base article](https://forum.bigcommerce.com/s/article/Stencil-Themes#custom-template).

<a href='#assigning_assigning-a-web-page' aria-hidden='true' class='block-anchor'  id='assigning_assigning-a-web-page'><i aria-hidden='true' class='linkify icon'></i></a>

## Assigining a Web Page Template

Starting from the BigCommerce control panel's left navigation pane:

1. Select `Storefront` > `Web Pages`.
2. From the resulting `View Web Pages` display, select the existing Page 
3. Name to which you want to assign a custom template. (Or select `Create a Web Page` to define a new page.)
4. From the resulting `Edit a Web Page` display, scroll down to the `Template Layout File` drop-down list. Then select your desired custom template from that list, as shown below.

<!--
    title: 
    data: //s3.amazonaws.com/user-content.stoplight.io/6116/1539930165487
-->

![](//s3.amazonaws.com/user-content.stoplight.io/6116/1539930165487 "")

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">
    
<!-- theme: warning -->

### Static Pages You Can't Assign
> Some static page types do not allow you to assign custom templates. You can recognize these excluded pages because their `Edit a Web Page` display will not include a `Template Layout File` drop-down list.

</div>
</div>
</div>

<a href='#assigning_assigning-a-product' aria-hidden='true' class='block-anchor'  id='assigning_assigning-a-product'><i aria-hidden='true' class='linkify icon'></i></a>

## Assigning a Product, Brand, or Category Template

Starting from the BigCommerce control panel's left navigation pane:

1. Select `Products` > `View` (for a product page) `Products` > `Product Categories` (for a category page), or `Products` > `Brands` (for a brand page).
2. Select the Product Name, Category Name, or Brand Name to which you want to assign a custom template. (Or select the `Add` or `Create` button at the upper left to define a new product, category, or band.)
3. For a product page (only), you must select the `Other Details` tab to proceed to the next step.
4. Scroll to the `Template Layout File` drop-down list, and select your desired custom template from that list, as shown below for a Category assignment.
5. Click the Save & Exit or Save & Keep Editing button at the lower right.


<!--
    title: 
    data: //s3.amazonaws.com/user-content.stoplight.io/6116/1539930552310
-->

![](//s3.amazonaws.com/user-content.stoplight.io/6116/1539930552310 "")

<a href='#assigning_troubleshooting' aria-hidden='true' class='block-anchor'  id='assigning_troubleshooting'><i aria-hidden='true' class='linkify icon'></i></a>

## Troubleshooting Template Assignments

In case of problems a custom template in the control panel: Check whether your theme's root directory contains a file named `manifest.json`.
If you theme's root directory contains the file, perofrm the following:
* delete the `manifest.json` file
* bundle the theme again with the `stencil bundle` command
* upload the theme
* apply the theme

This should enable assigning the template in the control panel.

