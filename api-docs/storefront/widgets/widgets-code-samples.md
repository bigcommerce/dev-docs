<h1>Widgets Code Samples</h1>
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
        <li><a href="#widget-code-sample_simple-list">Simple List</a></li>
        <li><a href="#widget-code-sample_simple-html">Simple HTML</a></li>
        <li><a href="#widget-code-sample_simple-text-styling">Simple Text with Styling</a></li>
        <li><a href="#widget-code-sample_you-tube-embed">Youtube Embed with Layout</a></li>
        <li><a href="#widget-code-sample_image-slider">Image Slider</a></li>
	</ul>
</div>

Below are widgets that can be used as building blocks to expand on. Widgets are flexible and re-useable making them ideal for creating custom storefront. 

<a href='#widget-code-sample_simple-list' aria-hidden='true' class='block-anchor'  id='widget-code-sample_simple-list'></a>

## Simple List

<!--
title: "Widget Template"
subtitle: "Simple List"
lineNumbers: true
-->

```html

<ul>
{{#each list_items}}
 <li style="color:{{color}};">{{text}}</li>
{{/each}}
</ul>

```

<!--
title: "Sample Widget Configuration"
subtitle: "Simple List"
lineNumbers: true
-->

```
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

<!--
    title: #### Storefront View

    data: //s3.amazonaws.com/user-content.stoplight.io/6012/1551901776600
-->

#### Storefront View
![#### Storefront View
](//s3.amazonaws.com/user-content.stoplight.io/6012/1551901776600 "#### Storefront View
")



<a href='#widget-code-sample_simple-html' aria-hidden='true' class='block-anchor'  id='widget-code-sample_simple-html'></a>

## Simple HTML

<!--
title: "Widget Template"
subtitle: "Simple HTML"
lineNumbers: true
-->

```html
{{{html}}}
```

<!--
title: "Sample Widget Configuration"
subtitle: "Simple HTML"
lineNumbers: true
-->

```
{
	"name": "Simple List Test",
	"widget_configuration":{
		"html":"<h1> This widget will accept any HTML </h1>"
	},
	"widget_template_uuid":"your-template-uuid"
}
```

<!--
    title: #### Storefront

    data: //s3.amazonaws.com/user-content.stoplight.io/6012/1551901919454
-->

#### Storefront
![#### Storefront
](//s3.amazonaws.com/user-content.stoplight.io/6012/1551901919454 "#### Storefront
")



<a href='#widget-code-sample_simple-text-styling' aria-hidden='true' class='block-anchor'  id='widget-code-sample_simple-text-styling'></a>

## Simple Text with Styling

<!--
title: "Widget Template"
subtitle: "Simple Text with Styling"
lineNumbers: true
-->

```html
"<style>#bc-simple-text-{{_.id}} {color: {{color}};background: {{background_color}};font-size: {{font_size}};font-style: {{font_style}};font-weight: {{font_weight}};font-family: {{font_family}};text-align: {{text_align}};margin-top: {{margin_top}};margin-bottom: {{margin_bottom}};margin-left: {{margin_left}};margin-right: {{margin_right}};padding-top: {{padding_top}};padding-bottom: {{padding_bottom}};padding-left: {{padding_left}};padding-right: {{padding_right}};}</style><p id='bc-simple-text-{{_.id}}'>{{text}}</p>"
```

<!--
title: "Sample Widget Configuration"
subtitle: "Simple Text with Styling"
lineNumbers: true
-->

```
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

<!--
    title: #### Storefront

    data: //s3.amazonaws.com/user-content.stoplight.io/6012/1551902366345
-->

#### Storefront
![#### Storefront
](//s3.amazonaws.com/user-content.stoplight.io/6012/1551902366345 "#### Storefront
")



<a href='#widget-code-sample_you-tube-embed' aria-hidden='true' class='block-anchor'  id='widget-code-sample_you-tube-embed'></a>

## Youtube Embed with Layout

<!--
title: "Widget Template"
subtitle: "Youtube Embed with Layout"
lineNumbers: true
-->

```html
"<iframe    id='ytplayer-{{_.id}}'    type='text/html'    width='{{width}}'    height='{{height}}'    src='https://www.youtube.com/embed/{{video_id}}?autoplay={{autoplay}}&color={{color}}&controls={{controls}}&disablekb={{disablekb}}&fs={{fs}}&rel={{rel}}&showinfo={{showinfo}}'    frameborder='{{frameborder}}'>  </iframe>"
```

<!--
title: "Sample Widget Configuration"
subtitle: "Youtube Embed with Layout"
lineNumbers: true
-->

```
{
	"name": "Website YouTube Embed",
	"widget_configuration":{
        "width": "100%",
        "height": "500px",
        "video_id": "EhYBjzqd-nI"

	},
	"widget_template_uuid":"your-template-uuid"
}
```

<!--
title: "Sample Layout"
subtitle: "Youtube Embed with Layout"
lineNumbers: true
-->

```
{
    "region": "widget_page",
    "template_file": "pages/page",
    "markup": "<div style='text-align:center'; height:500px;><bc-placement id='c3c12f8b-d198-41b1-b2cc-f0801f6ad2e5'></bc-placement></div>"
}
```

<!--
    title: #### Storefront

    data: //s3.amazonaws.com/user-content.stoplight.io/6012/1551902559005
-->

#### Storefront
![#### Storefront
](//s3.amazonaws.com/user-content.stoplight.io/6012/1551902559005 "#### Storefront
")



<a href='#widget-code-sample_image-slider' aria-hidden='true' class='block-anchor'  id='widget-code-sample_image-slider'></a>

## Image Slider

<!--
title: "Widget Template"
subtitle: "Image Slider"
lineNumbers: true
-->

```
"<ul class=\"slider\">\n{{#each slides}}\n<ul class=\"slide\"><img class=\"mySlides\" src=\"{{image}}\"/></ul>\n{{/each}}\n</ul>\n<script>\nvar slideIndex = 0;\ncarousel();\nfunction carousel() {\nvar i;\nvar x = document.getElementsByClassName(\"mySlides\");\nfor (i = 0; i < x.length; i++) {\nx[i].style.display = \"none\"; \n}\nslideIndex++;\nif (slideIndex > x.length) {slideIndex = 1} \nx[slideIndex-1].style.display = \"block\"; \nsetTimeout(carousel, 4000); // Change image every 4 seconds\n}\n</script>"
```

<!--
title: "Widget Configuration"
subtitle: "Image Slider"
lineNumbers: true
-->

```
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

<!--
    title: #### Storefront

    data: //s3.amazonaws.com/user-content.stoplight.io/6012/1551906683783
-->

#### Storefront
![#### Storefront
](//s3.amazonaws.com/user-content.stoplight.io/6012/1551906683783 "#### Storefront
")



## Resources

### Related Endpoints
* [Widgets API](/api-reference/storefront/widgets-api)

### Related Articles
* [Widgets Overview](/api-docs/storefront/widgets/widgets-overview)
* [Widgets Tutorial](/api-docs/storefront/widgets/widgets-tutorial)

