<h1>Using Disqus</h1>
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#using-disqus_blog">Integrating Disqus with your Stencil blog</a></li>
    <li><a href="#using-disqus_product">Integrating Disqus with your Stencil Product Pages</a></li>
	</ul>
</div>

Stencil themes have the ability to integrate with Disqus, a third-party commenting system that allows users to leave blog comments on blog posts made with Stencil’s built-in blog. Disqus can also be used with on Stencil product pages to allow comment and review threads on individual products.

---

<a href='#using-disqus_blog' aria-hidden='true' class='block-anchor'  id='using-disqus_blog'><i aria-hidden='true' class='linkify icon'></i></a>

## Integrating Disqus with your Stencil blog

To use Disqus blog comments in Stencil, follow the steps below:

1. Log in to your BigCommerce Control Panel.
2. Navigate to Storefront Design > My Themes.
3. Open Edit Theme Files for your theme.
4. Navigate to Templates > Pages > blog-post.html.
5. Paste your Disqus Universal Code before the closing {{/partial}} tag.
6. Save your files.
7. Apply your theme.

---

<a href='#using-disqus_product' aria-hidden='true' class='block-anchor'  id='using-disqus_product'><i aria-hidden='true' class='linkify icon'></i></a>

## Integrating Disqus with your Stencil Product Pages

1. Log in to your BigCommerce Control Panel.
2. Navigate to Storefront Design > My Themes.
3. Open Edit Theme Files for your theme.
4. Navigate to Templates > Pages > product.html.
5. Paste your Disqus Universal Code before the closing {{/partial}} tag.
6. In the Disqus Universal Code that you have posted, there is a function that reads like below:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">Disqus Universal Code</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "Disqus Universal Code"
subtitle: ""
lineNumbers: true
-->

```js
 var disqus_config = function () {
        this.page.url = PAGE_URL;  // Replace PAGE_URL with your page's canonical URL variable
        this.page.identifier = PAGE_IDENTIFIER; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
    };
```

Change the value of `this.page.url` to be `product.url`;, and the value of this.page.identifier to be product.id; so that the function now reads like below:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">Disqus Universal Code</div>
    </div><div class="HubBlock-header-subtitle">Final Function</div>
</div>

<!--
title: "Disqus Universal Code"
subtitle: "Final Function"
lineNumbers: true
-->

```js
var disqus_config = function () {
        this.page.url = product.url;
        this.page.identifier = product.id;
    };
```

7. Save your files
8. Apply your theme

---

## Resources

### Related Articles

* [Enabling Disqus for Product Reviews](https://forum.bigcommerce.com/s/article/How-do-I-enable-Disqus-as-my-Comment-Service?_ga=2.224340315.1984523106.1539568940-967431010.1523308107#get-code) (Blueprint)
* [Using Disqus for Blog Comments](https://forum.bigcommerce.com/s/article/Using-Disqus-Comments?_ga=2.224340315.1984523106.1539568940-967431010.1523308107) (BigCommerce Community)

