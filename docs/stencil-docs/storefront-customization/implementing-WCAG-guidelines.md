
# Implementing WCAG Guidelines

<div class="otp" id="no-index">

### On this page
- [Bypass blocks example](#bypass-blocks-example)
- [Location example](#location-example)
- [Unusual words example](#unusual-words-example)
</div>

This article provides Cornerstone code snippets which satisfy current WCAG guidelines or code you can add to meet a WCAG requirement.

## Bypass blocks example
To satisfy the [bypass blocks](https://www.w3.org/TR/WCAG21/#bypass-blocks) WCAG guideline, Cornerstone has a 'Skip to Main' link on each page. You can view this code in `/templates/components/common/header.html`.

```html
{{lang 'header.skip_to_main'}} {{#if banners.top}}
{{#each (limit banners.top_metadata 1)}}
{{{this.content}}}
{{/each}}
{{/if}}
```

## Location example
To satisfy the [Location](https://www.w3.org/TR/WCAG21/#location) WCAG guideline, Cornerstone provides breadcrumbs on each page. See an example of breadcrumbs in `/templates/components/common/contact-us.html`.

```html
{{#partial "page"}} {{> components/common/breadcrumbs breadcrumbs=breadcrumbs}}
{{#unless theme_settings.hide_contact_us_page_heading }}
```

## Unusual Words example
To satisfy the [unusual words](https://www.w3.org/TR/WCAG21/#unusual-words) WCAG guideline, you can add links to your footer categories section in the Cornerstone theme. In `/templates/components/common/footer.html`, include the new links after the {{/each}} line.

```html
<article class="footer-info-col footer-info-col--small" data-section-type="footer-categories">
    <h5 class="footer-info-heading">{{lang 'footer.categories'}}</h5>
    <ul class="footer-info-list">
        {{#each categories}}
          <li><a href="{{url}}">{{name}}</a></li>         
        {{/each}}
          <li><a href="/new-link-here/">Link Title Here</a></li>
          <li><a href="/another-new-link-here/">Another Link Title Here</a></li>
    </ul>
</article>
