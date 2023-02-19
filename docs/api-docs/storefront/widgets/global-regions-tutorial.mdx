# Global Regions



[Global regions](/api-docs/store-management/widgets/overview#global-regions) are special regions you can use to place and manage content sitewide. 
In this tutorial, we will explore the concept of global regions by creating a global region and placing a widget in it using Page Builder.

###  Prerequisites

* [A BigCommerce store](https://support.bigcommerce.com/s/article/Starting-a-Bigcommerce-Trial).
* Knowledge of the [Widgets API](/api-docs/storefront/widgets/widgets-overview).
* Knowledge of [Page Builder](https://support.bigcommerce.com/s/article/Page-Builder).

To edit theme files locally, we recommend using [Stencil CLI](/stencil-docs/installing-stencil-cli/installing-stencil), BigCommerce’s powerful theme development and deployment tool.

## Create a global region

As with non-global regions, you add global regions at the template file level. For a global region to appear on all of the targeted pages, you need to add that region to the templates of the pages you want to target.

Let's start by creating a global region called `below_content--global` and adding it to your store's home and category pages. In your theme's template files, add `{{{region name="below_content--global"}}}` to `templates/pages/home.html` and `templates/pages/category.html` as shown in the following examples.

**home.html**

```html
<div class="main full">
    {{#if products.featured}}
        {{> components/products/featured products=products.featured columns=theme_settings.homepage_featured_products_column_count}}
    {{/if}}
    {{{region name="home_below_featured_products"}}}

    {{#if products.top_sellers}}
        {{> components/products/top products=products.top_sellers columns=theme_settings.homepage_top_products_column_count}}
    {{/if}}
    {{{region name="home_below_top_products"}}}

    {{#if products.new}}
        {{> components/products/new products=products.new columns=theme_settings.homepage_new_products_column_count}}
    {{/if}}
    {{{region name="home_below_new_products"}}}
    {{{region name="below_content--global"}}} 
</div>
```

**category.html**
```html
<main class="page-content" id="product-listing-container">
    {{> components/category/product-listing}}
    {{{region name="category_below_content"}}}
    {{{region name="below_content--global"}}}
</main>
```

If you are using Stencil CLI and editing theme files locally, push and apply your changes before proceeding to the next step.

To preview the global region you just created, launch [Page Builder](https://support.bigcommerce.com/s/article/Page-Builder) by going to **Storefront** > **My Theme** in the control panel, then click **Customize**. 

Scroll to the bottom of your home page. You should see the `below_content--global` region under the non-global region below **New Products**.

![Global Region](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/global-regions-tutorial-01.png "Global Region")

## Place a widget in the global region

To test your global region's functionality, drag and drop one of the basic widgets from the left pane into the `below_content--global` region, then click **Preview**. You should see the widget you just placed displayed on the home page and the category pages of your store.

![Page Builder Design](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/global-regions-tutorial-02.png "Page Builder Design")

## Related resources

### Articles
* [Widgets Overview](/api-docs/store-management/widgets/overview)
* [Page Builder Overview](/stencil-docs/page-builder/page-builder-overview)

### Endpoints
* [Widgets API](/api-reference/store-management/widgets)
