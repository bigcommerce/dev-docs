<h1>Dynamic Content Rendering on Stencil Storefronts</h1>

<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#dynamic-content_why-dynamic-content">Why Dynamic Content?: Dropzones, Dynamic Tabs, and Snippets</a></li>
    <li><a href="#dynamic-content_dropzones">Dropzones</a></li>
    <li><a href="#dynamic-content_dynamic-tabs">Dynamic Tabs</a></li>
    <li><a href="#dynamic-content_snippets">Snippets</a></li>
    <li><a href="#dynamic-content_recap">Recap</a></li>
  </ul>
</div>

<a href='#dynamic-content_why-dynamic-content' aria-hidden='true' class='block-anchor'  id='dynamic-content_why-dynamic-content'><i aria-hidden='true' class='linkify icon'></i></a>

_We're gratefully sharing techniques devised by Ken Utting, Web Developer for BigCommerce client goruck.com_.

## Why Dynamic Content?: Dropzones, Dynamic Tabs, and Snippets

At GORUCK, we've customized our Stencil theme (currently using the [Merchant](https://www.bigcommerce.com/theme/merchant-light/?_ga=2.52710120.1984523106.1539568940-967431010.1523308107) theme) to provide several ways to update our site content without requiring changes to the theme itself. This allows our content folks to make changes to our theme without having to wait on our software developers.

Also, by pushing content out of the theme, these techniques reduce the differences between our customized theme and the out-of-the-box (base) theme – which makes it easier to integrate ongoing updates into our theme. Finally, these techniques allow us share identical content across pages without copying and pasting.

Three techniques in particular have proven useful to us. We call them Dropzones, Dynamic Tabs, and Snippets. There is nothing particularly special to GORUCK about these techniques, so there is no reason you can't adopt them for your own store/theme.

### Building on the Control Panel

The BigCommerce control panel provides an HTML editor where you can enter custom content for Products, Categories, and custom static pages (Storefront > Web Pages). However, we encountered the following limitations:

The HTML editor will remove a number of tags, particularly style and script tags.

Without changes like the ones we made at GORUCK (described below), all the content will be placed in a single location on the page.

At GORUCK, we needed the ability to inject arbitrary HTML into our page, and to place that content at various specific page locations. To achieve this, we developed the three techniques described below.

<a href='#dynamic-content_dropzones' aria-hidden='true' class='block-anchor'  id='dynamic-content_dropzones'><i aria-hidden='true' class='linkify icon'></i></a>

## Dropzones

Let's say that at the top of your category pages, you want to display a full-width, category-specific, image. And at the bottom of these pages, you want to display a category-specific message or image gallery.

One possibility is to define a custom page for every category. But aside from the work involved to set this up, every time you added or removed a category, you would need to add or remove a custom page from your theme. And of course, it's possible that you would also want control like this on product pages, and on other pages on your storefront.

A more general solution we implemented was to create a small set of custom pages: one for categories, one for products, and so on. Each of the custom pages contains a few `div` elements that define dropzones for that page.

With these dropzones defined, we can then populate them with dynamic content specific to any instance of the page. Here is an example of a dropzone that places an image gallery at the bottom of a category page:

<!--
    title: #### Dropzone that places an image gallery at the bottom of a category page

    data: //s3.amazonaws.com/user-content.stoplight.io/6116/1539874696853
-->

#### Dropzone that places an image gallery at the bottom of a category page
![#### Dropzone that places an image gallery at the bottom of a category page
](//s3.amazonaws.com/user-content.stoplight.io/6116/1539874696853 "#### Dropzone that places an image gallery at the bottom of a category page
")

<a href='#dynamic-content_dropzones' aria-hidden='true' class='block-anchor'  id='dynamic-content_dropzones'><i aria-hidden='true' class='linkify icon'></i></a>

### Dropzones HTML

The HTML for a dropzone is simply something like:

`<div id="gr-dropzone-top"></div>`

where the div's `id` defines the dropzone's name.

Then, using the BigCommerce **control panel's custom HTML editor** (in this example, the Categories editor), we place our content inside div tags that specify the dropzone where the content should be inserted. Here is a simple example:

```
<div class="gr-dropzone" data-gr-zone="gr-dropzone-top">
    <p>This content will be placed in a dropzone at the top of the page, because that dropzone has the id matching our data-gr-zone attribute.</p>
</div>
```

### Dropzones HTML Example

Here is an example of some HTML that we actually use:

```
<div class="gr-dropzone" data-gr-zone="gr-dropzone-bottom">
    <h3>GORUCK GEAR IN THE FIELD</h3>
    <div id="bv-grid-gallery" data-gr-groups="goruck-rm-group" data-gr-tags="gear"></div>
</div>
```

### Dropzones JavaScript

The content is moved from the default location to the dropzone by JavaScript we added to the PageManager class. In BigCommerce's Cornerstone base theme, Pixel Union's Merchant theme, and other Stencil themes, PageManager is the parent class of all page classes. So, its methods get invoked on every page. This makes it a great place to put code like this, which needs to run every time a page is loaded.

We modified our theme's PageManager.before method to invoke a new method named `gr_moveHtmlToDropzones`:

```
 gr_moveHtmlToDropzones () {
        $(".gr-dropzone").each(function () {
            const $this = $(this);
            const zoneId = $this.data("gr-zone");
            if (zoneId) {
                $("#" + zoneId).html($this.html());   // copy the html to where it should be
                $this.remove();             // remove the html from its temporary location
            } else {
                console.warn("PageManager.gr_moveHtmlToDropzones: dropzone has no target.");
            }
        });
    }
```

Finally, in our .scss file, we set the `.gr-dropzone` class to display: none. This prevents the content from appearing on the page in the wrong location before PageManager has a chance to move it into the dropzone.

<a href='#dynamic-content_dynamic-tabs' aria-hidden='true' class='block-anchor'  id='dynamic-content_dynamic-tabs'><i aria-hidden='true' class='linkify icon'></i></a>

## Dynamic Tabs

Our Stencil base theme presents information on our product pages in several tabs. We wanted to introduce several new tabs, and to vary the tabs by product category and brand. Additionally, we wanted the ability to store a tab's content in an external file, on our WebDAV or CDN (content delivery network).

By storing content in an external file, we can share identical content across pages, without copying and pasting. Also, changes to the content can be made just once, and be reflected on all our pages.

So we implemented a feature we call Dynamic Tabs. Dynamic Tabs are similar to dropzones, in that they allow you to use the control panel's HTML editor to provide content, while moving it to a specific location on the page. In this case, our content will appear in a tab.

In the example below, we use this technique to place the `RIGHT BY YOU` tab in the fourth position:

<!--
    title: 
    data: //s3.amazonaws.com/user-content.stoplight.io/6116/1539874970240
-->

![](//s3.amazonaws.com/user-content.stoplight.io/6116/1539874970240 "")

### Dynamic Tabs HTML

There are two versions of the HTML. The first is designed for a tab you want to drop in using a page's own HTML:

```
<div class="gr-tab" data-gr-position="POSITION" data-gr-title="TITLE"> 
     CONTENT 
</div>
```

The second version is designed for a tab that gets its content from an external file:

```
<div class="gr-tab" data-gr-content="CONTENT URL">
</div>
```

In this second case, the HTML in that external file must start with the POSITION and TITLE information:

```
<input id="gr-tab-data" type="hidden" data-gr-position="POSITION" data-gr-title="TITLE" /> 
 CONTENT
```

### Dynamic Tabs Parameters

POSITION is a number, which determines where the dynamic tab will be put. For example, a POSITION of 3 means that the tab will be placed after the third tab.

We use a POSITION of 0 to place a tab ahead of the first tab. If the POSITION attribute is omitted, the tab will be placed after all the other tabs. (Note that if you add multiple dynamic tabs, any POSITION that you specify must account for the previously inserted dynamic tabs.)

TITLE is the text you want to display as the tab's title. For example: Our Guarantee.

CONTENT is any arbitrary HTML, and is displayed when the user clicks on the tab's title.

### Dynamic Tabs HTML Example

To create the RIGHT BY YOU tab in the screenshot above, we added this code to our base theme's templates/pages/product.html template:

```
<!-- GORUCK Customization: pull in a dynamic tab -->
  <div class="gr-tab" data-gr-content="/content/tabs/dynamicTab1.html?v=14">
  </div>
```

This tells our code to pull in a file named `dynamicTab1.html`, located in our WebDAV's `/content/tabs/` folder. The querystring is used just to defeat caching.

Here are the contents of our `dynamicTab1.html` file:

```
<input id="gr-tab-data" type="hidden" data-gr-position="3" data-gr-title="Right By You"/>
<div class="container container-small gr-rightbyyou">
  <div style="display: flex; flex-direction: column">
    <div style="display: flex">
      <div>
        <img style="display: block; width: 100px; max-width: 100px; margin-right: 24px" 
        src="https://content.goruck.com/2017site/products/free-returns-icon.png" height="auto"/>
      </div>
    <div>
      <h3 style="margin-top: 0">Free &amp; Easy Returns</h3>
      <p>Don't like it? Send it back for free. Returnable in like-new condition within 30 days and 
      every order comes with a free return shipping label. Too easy.</p>
    </div>
  </div>

  <div style="display: flex; margin-top: 12px">
    <div>
      <img style="display: block; width: 100px; max-width: 100px; margin-right: 24px" 
      src="https://content.goruck.com/2017site/products/challenge-excellence.png" height="auto"/>
    </div>

    <div>
      <h3 style="margin-top: 0">Challenge Excellence</h3>
      <p>We have two grades, A and F and A- rounds down. Excellence is the standard and please hold us to it, 
      we want you to love your gear as much as we do.</p>
    </div>
  </div>

  <div style="display: flex; margin-top: 12px">
    <div>
      <img style="display: block; width: 100px; max-width: 100px; margin-right: 24px" 
      src="https://content.goruck.com/2017site/products/customer-service-icon.png" height="auto"/>
    </div>
      <div>
        <h3 style="margin-top: 0">Do Right By People</h3>
        <p>Our goal is to run a company our grandfathers would be proud of. And the central tenet 
        &mdash; an oldie but a goodie &mdash; is that we do whatever it takes to do right by people.
        Contact us at <a href="https://goruck.zendesk.com/hc/en-us/requests/new" target="_blank">
        team@goruck.com</a> with any questions and we'll get back to you ASAP.</p>
      </div>
    </div>
  </div>
</div>
```

### Dynamic Tabs Javascript 

Again, the JavaScript code to implement Dynamic Tabs is invoked in the PageManager class' before method. The Dynamic Tabs code is more complex, and it relies on other classes we wrote to get content from the external server and cache it in the browser.

Nevertheless, none of it is rocket science. The three classes involved are 250 lines of code. Interested readers are invited to contact me via the BigCommerce Developers forum for more information about the implementation.



## Snippets

Snippets are similar to Dynamic Tabs, in that they allow you to use the BigCommerce control panel's HTML editor to provide content, but pull it from a separate file. This allows you to share common content across multiple pages.

Also, because the control panel's HTML editor strips out stylesheets, this is a good way to provide page-specific styles for a page.

We use snippets at GORUCK to display our sizing charts, as shown below. This makes sense since because we have a handful of charts that need to be shared across many products, so we don't want to copy and paste each chart for every product that needs it.

<!--
    title: 
    data: //s3.amazonaws.com/user-content.stoplight.io/6116/1539878331668
-->

![](//s3.amazonaws.com/user-content.stoplight.io/6116/1539878331668 "")

<a href='#dynamic-content_snippets' aria-hidden='true' class='block-anchor'  id='dynamic-content_snippets'><i aria-hidden='true' class='linkify icon'></i></a>

## Snippets HTML

Here is the format of the HTML that needs to placed on each page that uses the snippet:

```
<div class="gr-snippet" data-gr-content="CONTENT URL">
     <em>Loading...</em>
</div>
```

The external file can contain any arbitrary HTML and CSS, and the styled HTML is displayed in the page location where the `gr-snippet` div is located.

### Snippets JavaScript

Like Dropzones and Dynamic Tabs, the Snippets code is invoked in `PageManager`'s `before` method. Snippets adds just another 50 lines of JavaScript code to the theme, also relying on the same code that Dynamic Tabs uses to get the external file and cache it in the browser.



<a href='#dynamic-content_recap' aria-hidden='true' class='block-anchor'  id='dynamic-content_recap'><i aria-hidden='true' class='linkify icon'></i></a>

## Recap 

At GORUCK, we've developed a number of techniques that allow us to separate our content from our theme. These techniques have proved valuable to us, because they allow us to:

* Keep our content development and software development workflows separate.
* Reduce modifications to our theme, which simplifies merging updates from our theme provider.
* Share content across multiple pages.
* Tailor our content based on product category and brand.

