# Widgets Code Samples

<div class="otp" id="no-index">

### On this page
- [List](#list)
- [HTML](#html)
- [Text with styling](#text-with-styling)
- [Image slider](#image-slider)
- [Resources](#resources)

</div>

Below are widget code samples for developers to use as a starting point.

## List

### Template

```html
<ul>
    {{#each list_items}}
    <li style="color:{{color}};">{{text}}</li>
    {{/each}}
</ul>
```

### JSON encoded template

```
<ul>\r\n{{#each list_items}}\r\n <li style=\"color:{{color}};\">{{text}}<\/li>\r\n{{\/each}}\r\n<\/ul>
```

### Configuration

```json
{
	"name": "Simple List Test",
	"widget_configuration":{
		"list_items":[
				{
					"color": "blue",
					"text": "The color is blue"
				},
				{
					"color": "green",
					"text": "The color is green"
				},

				{
					"color": "red",
					"text": "The color is red"
				}
			]
	},
	"widget_template_uuid":"your-template-uuid"
}
```

![List](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/widgets-code-samples-01.png "List")

## HTML

### Template

```html
{{{html}}}
```

### Configuration

```json
{
	"name": "Simple List Test",
	"widget_configuration":{
		"html":"#  This widget will accept any HTML "
	},
	"widget_template_uuid":"your-template-uuid"
}
```

![HTML](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/widgets-code-samples-01.png "HTML")

## Text with styling

### Template

```html
<style>#bc-simple-text-{{_.id}} {color: {{color}};background: {{background_color}};font-size: {{font_size}};font-style: {{font_style}};font-weight: {{font_weight}};font-family: {{font_family}};text-align: {{text_align}};margin-top: {{margin_top}};margin-bottom: {{margin_bottom}};margin-left: {{margin_left}};margin-right: {{margin_right}};padding-top: {{padding_top}};padding-bottom: {{padding_bottom}};padding-left: {{padding_left}};padding-right: {{padding_right}};}</style><p id='bc-simple-text-{{_.id}}'>{{text}}</p>
```

### JSON encoded template

```
<style>#bc-simple-text-{{_.id}} {color: {{color}};background: {{background_color}};font-size: {{font_size}};font-style: {{font_style}};font-weight: {{font_weight}};font-family: {{font_family}};text-align: {{text_align}};margin-top: {{margin_top}};margin-bottom: {{margin_bottom}};margin-left: {{margin_left}};margin-right: {{margin_right}};padding-top: {{padding_top}};padding-bottom: {{padding_bottom}};padding-left: {{padding_left}};padding-right: {{padding_right}};}<\/style><p id='bc-simple-text-{{_.id}}'>{{text}}<\/p>
```

### Configuration

```json
{
	"name": "Simple Text with Styling",
	"widget_configuration":{
		"text": "Simple Text with Styling",
		"_.id": "1",
		"color": "white",
		"background_color": "#3C1F8C",
		"font_size": "45px",
		"font_weight": "bold",
		"font_family": "'Palatino Linotype', 'Book Antiqua', Palatino, serif",
		"text_align": "center",
		"margin_right": "50px",
		"margin_left": "50px",
		"padding_top": "25px",
		"padding_bottom": "25px"
	},
	"widget_template_uuid":"your-template-uuid"
}
```


![Text With Styling](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/widgets-code-samples-01.png "Text With Styling")

## Image slider

### Template

```html
<ul class="slider">{{#each slides}}<ul class="slide"><img class="mySlides" src="{{image}}"/></ul>{{/each}}</ul><script>var slideIndex=0;carousel();function carousel(){var i;var x=document.getElementsByClassName("mySlides");for (i=0; i < x.length; i++){x[i].style.display="none";}slideIndex++;if (slideIndex > x.length){slideIndex=1}x[slideIndex-1].style.display="block"; setTimeout(carousel, 4000); // Change image every 4 seconds}</script>
```

### JSON encoded template

```
<ul class=\\\"slider\\\">\\n{{#each slides}}\\n<ul class=\\\"slide\\\"><img class=\\\"mySlides\\\" src=\\\"{{image}}\\\"\/><\/ul>\\n{{\/each}}\\n<\/ul>\\n<script>\\nvar slideIndex = 0;\\ncarousel();\\nfunction carousel() {\\nvar i;\\nvar x = document.getElementsByClassName(\\\"mySlides\\\");\\nfor (i = 0; i < x.length; i++) {\\nx[i].style.display = \\\"none\\\"; \\n}\\nslideIndex++;\\nif (slideIndex > x.length) {slideIndex = 1} \\nx[slideIndex-1].style.display = \\\"block\\\"; \\nsetTimeout(carousel, 4000); \/\/ Change image every 4 seconds\\n}\\n<\/script>
```

### Configuration

```json
{
  "name": "Home Page Slider",
  "widget_configuration": {
      "slides": [
          {
              "image": "https://upload.wikimedia.org/wikipedia/commons/3/3f/Puppy_French_Bulldog.jpg"
          },
          {
              "image": "https://upload.wikimedia.org/wikipedia/commons/c/c1/2009-04-21_APBT_pup_on_deck.jpg"
          },
          {
              "image": "https://upload.wikimedia.org/wikipedia/commons/e/e7/Beagle_puppy_Cadet.jpg"
          }
      ]
  },
  "widget_template_uuid":"your-widget-id"
}
```

![Image Slider](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/widgets-code-samples-04.png "Image Slider")

## Resources

### Related endpoints
* [Widgets API](/api-reference/storefront/widgets-api)

### Related articles
* [Widgets Overview](/api-docs/storefront/widgets/widgets-overview)
* [Widgets Tutorial](/api-docs/storefront/widgets/widgets-tutorial)
