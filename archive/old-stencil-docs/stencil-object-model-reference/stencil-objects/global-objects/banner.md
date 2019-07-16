<h1>Banners</h1>

<b>Description:</b> Elements of marketing banners at page’s top and/or bottom

<b>Handlebars Expressions:</b> `{{banner}}`, `{{{banner}}}`

<b>Object Properties:</b>

<table>
  <tr>
    <th>Property</th>
    <th>Description</th>
  </tr>
  <tr>
		<td>banners</td>
    <td>Blocks of static HTML content to define banners</td>
  </tr>
  <tr>
		<td><span class="indent1">top</span></td>
    <td>Array of HTML content/strings, for custom top-banner content; banners are populated from the BigCommerce control panel</td>
  </tr>
  <tr>
		<td><span class="indent1">bottom</span></td>
    <td>Array of HTML content/strings, for custom bottom-banner content; banners are populated from the BigCommerce control panel</td>
  </tr>
</table>

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">
    
<!-- theme: warning -->

###  Handlebars Formatting Exception
> Where a banner contains HTML, the banner helper must be placed in triple braces, as in this
example: `{{{banner}}}`. (Double braces would escape the HTML.)



</div>
</div>
</div>

