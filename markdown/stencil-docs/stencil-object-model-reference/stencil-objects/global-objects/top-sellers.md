<h1>Top Sellers</h1>

<b>Description:</b> Object to display a sidebar of top-selling products<br>

<b>Handlebars Expression:</b> `{{products.top_sellers}}`

<b>Object Properties:</b> References the <a href="/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/common-product-card-model"> product card model </a>

<b>Usage Example:</b>

To access the global`{{products.top_sellers}}` object on your page, you must first use [front matter](/stencil-docs/front-matter/front-matter-attributes-reference) to declare the object at the top of your page template. For example, you would place this front-matter declaration at the top of your template file:

```
---
products:
    top_sellers:
---
```

