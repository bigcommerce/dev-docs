<h1>Carousel</h1>

<b>Description:</b> A list of images, text, and style assets for a storefront’s image slide show

<b>Handlebars Expression: </b> `{{carousel}}`

<b>Object Properties:</b>

<table>  
  <tr>    
    <td>Property</td>    
    <td>Description</td>  
  </tr>    
  <tr>    
    <td>swap_frequency</td>    
    <td>Indicates how often (in seconds) the slides will change; the value must be between 1 and 90,000 seconds</td>  
  </tr>    
  <tr>    
    <td>slides</td>    
    <td>Object containing properties for each slide in the slideshow</td>  
  </tr>    
  <tr>    
    <td><span class="indent1">image</span></td>    
    <td>Path to the image file used on this slide</td>  
  </tr>  
  <tr>    
    <td><span class="indent1">alt_text</span></td>    
    <td>Alt text for the image</td>  
  </tr>  
  <tr>    
    <td><span class="indent1">url</span></td>    
    <td>URL to which the image will link</td>  
  </tr>  
  <tr>    
    <td><span class="indent1">heading</span></td>    
    <td>Heading message defined by the merchant</td>  
  </tr>  
  <tr>    
  <td><span class="indent1">heading_color</span></td>    
  <td>Color of the heading text</td>  
  </tr>  
  <tr>    
    <td><span class="indent1">text</span></td>    
    <td>Subheading defined by the merchant</td>  
  </tr>  
  <tr>    
    <td><span class="indent1">text_color</span></td>    
    <td>Color of the subheading text</td>  
  </tr>  
  <tr>    
    <td><span class="indent1">button_text</span></td>    
    <td>Text displayed on a call-to-action button defined by the merchant</td>  
</tr>  
  <tr>    
  <td><span class="indent1">button_text_color</span></td>    
  <td>Color of the button</td>  
</tr>
</table>

