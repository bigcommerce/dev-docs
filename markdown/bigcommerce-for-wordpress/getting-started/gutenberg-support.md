<div><h3 class="sub-docs-type" id="bigcommerce-for-wordpress">BigCommerce for Wordpress</h3>
<h1 class="sub-docs-title" id="introduction">Gutenberg Support</h1>
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
        <li><a href="#available-bigcommerce-blocks">Available BigCommerce Blocks</a></li>
        <li><a href="#creating-your-own-blocks">Creating Your Own Blocks</a></li>
	</ul>
</div>

The WordPress Gutenberg Visual Editor provides users the ability to easily compose a page by adding and arranging blocks of content. Some blocks come with WordPress by default -- paragraph, image, list, and audio blocks, for example. Additionally, WordPress plugins can extend Gutenberg by adding their own blocks to the Visual Editor's Add Block dropdown. The BigCommerce for Wordpress plugin is packed with custom blocks that put the power of BigCommerce in the hands of WordPress developers.

---

## Available BigCommerce Blocks

| Block Name                           | Description                                                                     | Settings                                            |
|--------------------------------------|---------------------------------------------------------------------------------|-----------------------------------------------------|
| BigCommerce Products                 | displays a list of products by brands, categories or individual products.       | Edit Products, Additional CSS Class                 |
| BigCommerce Cart                     | displays the items currently in the customer’s cart                             | Additional CSS Class                                |
| BigCommerce Checkout                 | displays an embedded checkout form                                              | Additional CSS Class                                |
| BigCommerce Account Profile          | displays a customer information update form                                     | Additional CSS Class                                |
| BigCommerce Address List             | displays a list of customer shipping addresses with edit UI                     | Additional CSS Class                                |
| BigCommerce Order History            | displays list of the customer’s past orders.                                    | Additional CSS Class                                |
| BigCommerce Login Form               | displays customer login form                                                    | Additional CSS Class                                |
| BigCommerce Gift Certificates        | displays gift certificate UI                                                    | Additional CSS Class                                |
| BigCommerce Gift Certificate Balance | displays gift certificate balance                                               | Additional CSS Class                                |
| BigCommerce Product Reviews          | displays product reviews for a product                                          | Product ID, Additional CSS Class                    |
| BigCommerce Product Components       | displays a product's component(s) (sku, image, title, description, add to cart) | Product ID, Product Component, Additional CSS Class |

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">
    
<!-- theme: {{callout_type}} -->

### Shortcodes:
> BigCommerce blocks can also be added to a wordpress page or post by using Short Codes in Gutenberg's Code Editor. For more information and a list of available shortcodes, see: [Shortcodes](https://developer.bigcommerce.com/bigcommerce-for-wordpress/setup/shortcodes)

</div>
</div>
</div>

---

## Creating Your Own Blocks

The source code behind the BigCommerce for WordPress Gutenberg blocks is available on [GitHub](https://github.com/bigcommerce/bigcommerce-for-wordpress/tree/master/src/BigCommerce/Editor/Gutenberg/Blocks). Developers can use these blocks as a starting point for creating their own, customized BigCommerce Gutenbenberg editor blocks.
