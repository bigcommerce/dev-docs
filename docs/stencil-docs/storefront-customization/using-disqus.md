# Using Disqus

<div class="otp" id="no-index">

### On this page
- [Integrating Disqus with your Stencil blog](#integrating-disqus-with-your-stencil-blog)
- [Integrating Disqus with your Stencil product pages](#integrating-disqus-with-your-stencil-product-pages)

</div>

Stencil themes have the ability to integrate with Disqus, a third-party commenting system that allows users to leave blog comments on blog posts made with Stencil’s built-in blog. Disqus can also be used on Stencil product pages to allow comment and review threads on individual products.

## Integrating Disqus with your Stencil blog

To use Disqus blog comments in Stencil, follow the steps below:

1. Log in to your BigCommerce control panel.
2. Navigate to **Storefront Design** > **My Themes**.
3. Open **Edit Theme Files** for your theme.
4. Navigate to **Templates** > **Pages** > **blog-post.html**.
5. Paste your Disqus Universal Code before the closing {{/partial}} tag.
6. Save your files.
7. Apply your theme.

## Integrating Disqus with your Stencil product pages

1. Log in to your BigCommerce control panel.
2. Navigate to **Storefront Design** > **My Themes**.
3. Open **Edit Theme Files** for your theme.
4. Navigate to **Templates** > **Pages** > **product.html**.
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

Change the value of `this.page.url` to be `product.url`, and the value of `this.page.identifier` to be `product.id`, so that the function now reads like below:

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

7. Save your files.
8. Apply your theme.