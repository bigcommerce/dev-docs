# Localizing Variation Descriptions



Stencil themes support translations for variation descriptions enabling you to customize the display language of your theme.

## Adding translations

You can localize theme variations by adding a `translations` object for each variation in the theme's `config.json` file. 

The following example demonstrates how to localize each variation description by adding a `translations` object.

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

<!-- theme: info -->
> #### Note
> * Translations can only contain `i18n.description` at the moment.
> * You must include the original `description` value to render the theme on the BigCommerce theme marketplace.
> * Language code must contain a default value.


## Supported language code schemes

In addition to the `default` language code, themes support both [ISO 639‑1](https://en.wikipedia.org/wiki/ISO_639-1) and [IETF language tag](https://en.wikipedia.org/wiki/IETF_language_tag) code schemes.
The language code must follow a set format of two lowercase letters for a two-letter code system or two lowercase letters, a dash, and at least two alphanumeric characters for a multiple-character code system.

## Resources

* [Directory Structure](/stencil-docs/storefront-customization/directory-structure)
* [The BigCommerce Theme Marketplace](https://support.bigcommerce.com/s/article/The-Bigcommerce-Themes-Marketplace?language=en_US)
