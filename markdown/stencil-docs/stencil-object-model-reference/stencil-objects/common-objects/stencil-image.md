<h1>Stencil Image</h1>

<b>Description:</b> Exposes a URL and an "alt" string for images used in the Stencil framework

<b>Object Properties:</b>

<table>
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>data</td>
    <td>Internal URL to product or category image</td>
  </tr>
  <tr>
    <td>alt</td>
    <td>Corresponding text to display for missing images, accessible screen readers, etc.</td>
  </tr>
</table>

<b>Available through:</b> 

<b>Stencil Handlebars Helper:</b> `{{getImage}}`

<b>Common Object:</b> <a href="/stencil-docs/stencil-object-model-reference/stencil-objects/common-objects/common-product-card-model">Common Product Card Model</a> 

<b>Object/Property:</b> `{{category.image}}`

<b>Arrays/Elements:</b> `{{product.options.image}}`, `{{product.images}}`, `{{downloads.items.images}}`, `{{downloads.items.thumbnail}}`, `{{category.subcategories.image}}`, `{{order.items.image}}`, `{{customer.orders.image}}`, `{{brands.image}}`, `{{order.items.shipping_rows.image}}` 

<b> Usage Example: </b> 

`{{getImage image "thumbnail"}}`

