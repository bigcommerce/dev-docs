<h1>Categories</h1>

<b>Description:</b> A list of all product categories shown in the current page context; default sorting is by category id, from lowest to highest

<b>Handlebars Expression:</b> `{{categories}}`

<b>Object Properties:</b>

<b>Object Properties:</b>
<table>  
  <tr>   
    <td>Property</td>    
    <td>Description</td>  
  </tr>  
  <tr>    
    <td>id</td>    
    <td>ID of the top-level category listed</td>  
  </tr>  
  <tr>    
    <td>name</td>    
    <td>Name of the top-level category</td>  
  </tr>  
  <tr>    
    <td>description</td>    
    <td>Description of the top-level category (optional &ndash; when requested in front matter)</td>  
  </tr>  
  <tr>    
    <td>url</td>    
    <td>URL to the category page</td>  
  </tr>  
  <tr>    
    <td>count</td>    
    <td>Number of products in this category</td>  
  </tr>  
  <tr>    
    <td>children</td>    
    <td>List of child categories for this top-level category</td>  
  </tr>  
  <tr>    
    <td><span class="indent1"> id</span></td>    
    <td>ID of the child category</td>  
  </tr>  
  <tr>    
    <td><span class="indent1"> name</span></td>    
    <td>Name of the child category</td>  
  </tr>    
  <tr>    
    <td><span class="indent1"> description</span></td>    
    <td>Description of the child category (optional &ndash; when requested in front matter)</td>  
  </tr>  
  <tr>    
    <td><span class="indent1"> url</span></td>    
    <td>URL of the child category</td>  
  </tr>  
  <tr>    
    <td><span class="indent1"> count</span></td>    
    <td>Number of products in this child category</td> 
  </tr>
</table>

