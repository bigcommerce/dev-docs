
# Implementing WCAG Guidelines - Examples

<div class="otp" id="no-index">

### On this page
- [Bypass blocks](#bypass-blocks)
- [Location](#location)
- [Unusual words](#unusual-words)
</div>

This article provides Cornerstone code snippets which satisfy current WCAG guidelines or code you can add to meet a WCAG requirement.

## Bypass blocks
To satisfy the [bypass blocks](https://www.w3.org/TR/WCAG21/#bypass-blocks) WCAG guideline, Cornerstone has a 'Skip to Main' link on each page. You can find this code in `/templates/components/common/header.html`.

```html
{{lang 'header.skip_to_main'}} {{#if banners.top}}
{{#each (limit banners.top_metadata 1)}}
{{{this.content}}}
{{/each}}
{{/if}}
```
View the HTML output below.

![Skip to Main](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/WCAG-guidelines-01.png "Skip to Main")

## Location
To satisfy the [Location](https://www.w3.org/TR/WCAG21/#location) WCAG guideline, Cornerstone provides breadcrumbs on each page. See an example of breadcrumbs in `/templates/components/common/contact-us.html`.

```html
{{#partial "page"}} {{> components/common/breadcrumbs breadcrumbs=breadcrumbs}}
{{#unless theme_settings.hide_contact_us_page_heading }}
```
View the HTML output below.

![Breadcrumbs](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/WCAG-guidelines-02.png "Breadcrumbs")

## Unusual Words
To satisfy the [unusual words](https://www.w3.org/TR/WCAG21/#unusual-words) WCAG guideline, add links to your footer categories section in the your theme. We recommend adding links using your store's BigCommerce control panel. Insert a script in the  Storefront > Script Manager field. Example code is provided below.  Replace each `/page-link/` and `Add Link Name` with the actual links and names.

```html
<script type="application/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<script>
    $(document).ready(function(){
        $("footer article[data-section-type='footer-webPages'] ul").append("<li><a href='/page-link1/'>Add Link Name1</a></li><li><a href='/page-link2/'>Add Link Name2</a></li><li><a href='/page-link3/'>Add Link Name3</a></li>")
    });
</script>
```
View the HTML output below.

![footer categories](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/WCAG-guidelines-03.png "Footer_categories")
