# Localizing Variation Descriptions

<div class="otp" id="no-index">

### On this page
- [Adding translations](#adding-translations)
- [Language code formatting](#language-code-formatting)
- [Resources](#resources)

</div>

Stencil themes support translations for variation descriptions enabling you to customize the display language of your theme.

## Adding translations

You can localize theme variations by adding a `translations` object for each variation in the theme's `config.json` file. 

The following example demonstrates how to use the `translations` object in a theme's `variations` collection to localize the description for each variation.

```json
{
 "variations": [
   {
     "name": "Light",
     "id": "light",
     "meta": {
       "desktop_screenshot": "desktop_light.png",
       "mobile_screenshot": "mobile_light.png",
       "description": "This is the light variation for this theme!",
       "demo_url": "https://cornerstone-light-demo.mybigcommerce.com",
       "optimized_for": [
         "multi_purpose",
         "mobile_tablet_desktop",
         "sales_discounts",
         "large_catalog"
       ],
       "industries": [
         "home_garden"
       ],
       "translations": {
         "i18n.description": {
           "default": "This is the light variation for this theme!",
           "en": "This is the light variation for this theme!",
           "zh-CN": "这是这个主题的轻微变化！",
           "fr-FR": "C'est la variation de lumière pour ce thème!"
         }
       }
     },
     "images": {},
     "settings": {}
   },
   {
     "name": "Dark",
     "id": "dark",
     "meta": {
       "desktop_screenshot": "desktop_light.png",
       "mobile_screenshot": "mobile_light.png",
       "description": "This is the dark variation for this theme!",
       "demo_url": "https://cornerstone-light-demo.mybigcommerce.com",
       "optimized_for": [
         "multi_purpose",
         "mobile_tablet_desktop",
         "sales_discounts",
         "large_catalog"
       ],
       "industries": [
         "home_garden"
       ],
       "translations": {
         "i18n.description": {
           "default": "This is the dark variation for this theme!",
           "en": "This is the dark variation for this theme!",
           "zh-CN": "这是这个主题的黑暗变体！",
           "fr-FR": "C'est la variation sombre pour ce thème!"
         }
       }
     },
     "images": {},
     "settings": {}
   }
 ]
}
```

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> ### Note
> * Translations can only contain `i18n.description` at the moment.
> * You must include the original `description` value to render the theme on the BigCommerce theme marketplace.
> * Language code must contain a default value.
</div>
</div>
</div>

## Language code formatting

In addition to the `default` language code, themes support two-character and multiple-character language code values. The language code must follow a set format of two lowercase letters, a dash, and at least two alphanumeric characters. 

For example:

|Two-character language code|Multiple-character language code|
|-|-|
|en|en-US|
|fr|fr-FR|
|uk|uk-UA|
|zh|zh-CN|
|-|es-419|

## Resources

* [Directory Structure](https://developer.bigcommerce.com/stencil-docs/storefront-customization/directory-structure)
* [The BigCommerce Theme Marketplace](https://support.bigcommerce.com/s/article/The-Bigcommerce-Themes-Marketplace?language=en_US)
