# Using Disqus

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


```js title="Disqus universal code" lineNumbers
var disqus_config = function () {
    this.page.url = PAGE_URL;  // Replace PAGE_URL with your page's canonical URL variable
    this.page.identifier = PAGE_IDENTIFIER; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
};
```

Change the value of `this.page.url` to be `product.url`, and the value of `this.page.identifier` to be `product.id`, so that the function now reads like below:


```js title="Disqus universal code final function" lineNumbers
var disqus_config = function () {
    this.page.url = product.url;
    this.page.identifier = product.id;
};
```

1. Save your files.
2. Apply your theme.
