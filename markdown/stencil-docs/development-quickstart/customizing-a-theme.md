<h1>Customizing a Theme</h1>

<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#customizing_video">Customizing a Theme: Video Series</a></li>
		<li><a href="#customizing_config-json">Configuring config.json Keys</a></li>
    <li><a href="#customizing_basic-changes">Making Basic Design/Layout Changes</a></li>
	</ul>
</div>

<a href='#customizing_video' aria-hidden='true' class='block-anchor'  id='customizing_video'><i aria-hidden='true' class='linkify icon'></i></a>

## Customizing a Theme: Video Series

If you prefer to consume by watching video tutorials, this video series will quickly get you started in editing and customizing your Stencil theme.

1. [Customizing a Theme (Part 1) - Config.json and Templates Directory](https://www.youtube.com/watch?v=HORseXHq-nI&index=6&list=PLwTYtMwfzbe7EZiIWPAmPtuwRHkY7BG-0)
2. [Customizing a Theme (Part 2) - Lang and Assets Directories](https://www.youtube.com/watch?v=OUg8ksWQGA0&index=7&list=PLwTYtMwfzbe7EZiIWPAmPtuwRHkY7BG-0)
3. [Customizing a Theme (Part 3) - Custom Pages, Fonts, and Icons](https://www.youtube.com/watch?v=ZwrVN5QrEZY&index=8&list=PLwTYtMwfzbe7EZiIWPAmPtuwRHkY7BG-0)

Continue reading if you would like information to supplement the videos, or if you would get started customizing your theme by reading and following along.

<a href='#customizing_config-json' aria-hidden='true' class='block-anchor'  id='customizing_config-json'><i aria-hidden='true' class='linkify icon'></i></a>

## Configuring config.json Keys

**Note:** these instructions will refer to the top-level theme directory as _cornerstone_.

The first thing you must do when beginning theme developement is configure certain values in the [cornerstone/config.json file](https://github.com/bigcommerce/cornerstone/blob/master/config.json). For example, here are the first few key/value sets in Cornerstone's config.json:

```
{
"name": "Cornerstone",
"version": "1.0.0",
"meta": {
  "price": 0,
   "documentation_url": 		
   "https://support.bigcommerce.com/articles/Public/Cornerstone-
   	Theme-Manual",
  ...
  }
}
```

For further details about `config.json` settings and a breakdown of each key/value set, see the in-depth [config.json metadata article](/stencil-docs/stencil-theme-editor/config-json-metadata). 

The next code block shows how you might change these values to reflect your own theme’s name, version number, price on Theme Marketplace, and documentation URL:

```
{
"name": "MyTheme",
"version": "1.1.2",
"meta": {
  "price": 10000,
  "documentation_url": "https://www.mywebsite.com/theme-docs/my-theme.html",
  ...
  }
}
```

<a href='#customizing_basic-changes' aria-hidden='true' class='block-anchor'  id='customizing_basic-changes'><i aria-hidden='true' class='linkify icon'></i></a>

## Making Basic Design & Layout Changes

### Changing the Footer’s Background Color (config.json)

In a browser, [load the local version](/stencil-docs/getting-started/launching-stencil/running-stencil-locally) of your storefront (by default, [http://localhost:3000](http://localhost:3000). Note the page footer’s appearance.

Next, open your `<theme-name>/config.json` in a text editor. Change the page footer’s default background color to red, by changing the value `"585858"` to `"#a96e6e"` as indicated below:
```
{
 "settings": {
  "footer-backgroundColor": "#a96e6e",
  }
}
```

This new value will propagate through the theme’s CSS files and will globally change your footer. Refresh your store’s home page in your browser to verify the change.

### Changing the Product Image Size (config.json and Handlebars)

In the `<theme-name>/config.json` file’s `"settings"` section, you can define theme-wide image sizes for rendering dynamic content. The excerpt below shows this section’s predefined keys and values (dimensions in pixels) for product thumbnails, galleries, and other standard sizes.

```
{
  "settings": {
     //...
    "logo_size": "250x100",
    "brand_size": "190x250",
    "gallery_size": "300x300",
    "productgallery_size": "500x659",
    "product_size": "500x659",
    "productthumb_size": "100x100",
    "thumb_size": "100x100",
    "zoom_size": "1280x1280",
    "blog_size": "190x250",
    // ...
  },
}
```

For definitions of each key’s usage, please see the `config.json` reference. You can also create theme-wide custom sizes by defining new key/value pair properties in the `config.json` file.

Below is an example of code that calls one of the above variables, in Cornerstone's,`<theme-name>/templates/components/products/card.html` file. (This file defines the display of products’ panels or "cards" on multiple storefront pages.): 


```<img class="card-image" src="{{getImage image 'productgallery_size' (cdn theme_settings.default_image_product)}}" alt="{{image.alt}}">
```

Note the `{{getImage image 'productgallery_size'}}` statement, a Handlebars reference to the standard `productgallery_size` size defined in config.json.

Further examples will guide you in customizing your storefront using the Handlebars templating language. 
For now, open `config.json` and try redefining some of the default size values shown above. Then, refresh your storefront’s home page (or other pages or modals) in your browser, and note how the display of product images changes to match your new global size values.

### Redesigning Page Elements (config.json and Handlebars)

The following example demonstrates how to redesign a storefront page’s layout by editing Handlebars statements in the page’s HTML. The goal here is simply to move the Product landing page’s "Customers Also Viewed" panel above that page’s "Product Reviews" panel.

With your storefront’s local version loaded in a browser, click through to any product, and note the relative positions of the "Product Reviews" and "Customers Also Viewed" panels.

Next, open your working theme’s `<theme-name>/templates/components/products/tabs.html file`. As indicated below, delete or comment out the `similar_by_views` components that are shown below:

```
// delete the following component:
  {{#if product.similar_by_views}}
      <li class="tab" role="presentational">
          <a class="tab-title" href="#tab-similar" role="tab" tabindex="0" aria-selected="false" controls="tab-similar">{{lang 'products.similar_by_views'}}</a>
      </li>
  {{/if}}
</ul>


// delete the following component:

{{#if product.similar_by_views}}
  <div role="tabpanel" aria-hidden="true" class="tab-content has-jsContent" id="tab-similar">
      {{> components/products/carousel products=product.similar_by_views columns=6}}
  </div>
{{/if}}
</div>
```

Now open your `/templates/pages/product.html` file. As indicated below (in bold), add the `similar_by_views` component with a reusable carousel wrapper:

```
{{#if product.videos.list.length}}
  {{> components/products/videos product.videos}}
{{/if}}

{{#if product.similar_by_views}}
   {{> components/products/carousel products=product.similar_by_views columns=6}}
{{/if}}

{{#if settings.show_product_reviews}}
  {{> components/products/reviews reviews=product.reviews product=product urls=urls}}
{{/if}}
```

In your browser, refresh the product page, and check the new arrangement of these components.

