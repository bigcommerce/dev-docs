# imageDimension

Used to set image ratio on theme setting.

```json
{
  "type": "imageDimension",
  "id": "blog_size",
  "force_reload": true,
  "label": "i18n.SizeOfImages",
  "options": [
    {
      "value": "190x250",
      "label": "i18n.OptimizedForTheme"
    },
    {
      "value": "custom",
      "label": "i18n.SpecifyDimensions"
    }
  ]
},
```

Required fields: `type`, `label`, `id`, and `options`.

Note: "custom" value option will allow users to specify the width/height. Else, use values set by the theme developer (example image below).

![https://storage.googleapis.com/bigcommerce-production-dev-center/images/theme_styles_imageDimension.png](https://storage.googleapis.com/bigcommerce-production-dev-center/images/theme_styles_imageDimension.png)
