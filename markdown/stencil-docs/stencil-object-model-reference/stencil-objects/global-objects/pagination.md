<h1>Pagination</h1>

<b>Description:</b> Defines pagination of storefront pages

<b>Handlebars Expression:</b> `{{pagination}}`

<b>Object Properties:</b>

<table>
    <tr>   
      <th>Property</th>   
      <th>Description</th> 
    </tr> 
    <tr>   
      <td>next</td>   
      <td>Link to next page, if any</td> 
    </tr> 
    <tr>   
      <td>previous</td>   
      <td>Link to previous page, if any</td> 
    </tr> 
    <tr>   
      <td>sort</td>   
      <td>Field to sort by</td> 
    </tr> 
    <tr>   
      <td>current</td>   
      <td>Number representing which page (in the current collection) the customer is viewing</td> 
    </tr> 
      <tr>   
        <td>total</td>   
        <td>Total number of results, across all pages</td> 
      </tr> 
        <tr>   
          <td>links</td>   
          <td>Array of pages that surround the current page; displayed as a set of links, dynamically sized based on the current page number</td> 
        </tr> 
        <tr>   
          <td><span class="indent1">url</span></td>   
          <td>URL to this page of results</td> 
        </tr> 
        <tr>   
          <td><span class="indent1">number</span></td>   
          <td>The page number of this link, based on an index starting at 1</td> 
      </tr>
    </table>

