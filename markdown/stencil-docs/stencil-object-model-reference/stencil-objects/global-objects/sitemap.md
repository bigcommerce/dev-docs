<h1>Sitemap</h1>

<b>Description:</b>A list of all sitemap properties for this BigCommerce storefront: pages, categories, and brands.<br>

<b>Handlebars Expression:</b> `{{sitemap}}`

<b>Object Properties:</b>

<table>
  <tr>
    <td>Property</td>
    <td>Description</td>
  </tr>
  <tr>
    <td>subsection_url</td>
    <td>URL to subsection content (pages, categories, brands) of the sitemap</td>
  </tr>
  <tr>
    <td>label</td>
    <td>Subsection title (pages, categories, brands)</td>
  </tr>
  <tr>
    <td>body</td>
    <td>List of all sitemap subsections</td>
  </tr>
  <tr>
    <td><span class="indent1"> url</span></td><td>URL to the page, category, or brand</td>
  </tr>
  <tr>
      <td><span class="indent1"> label</span></td>
      <td>Label of the page, category, or brand</td>
    </tr>
    <tr>
      <td><span class="indent1"> children </span></td>
      <td>Nested list of children within pages or categories; will be null for brands</td>
    </tr>
    <tr>
      <td><span class="indent2">url</span></td>
      <td>URL to the child page or category</td>
    </tr>
    <tr>
      <td><span class="indent2">label</span></td>
      <td>Label for the child page or category</td>
    </tr>
  </table>

