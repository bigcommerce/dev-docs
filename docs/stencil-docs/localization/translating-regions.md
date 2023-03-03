# Translating Regions



Themes now support translations for a specific region, which localizes the region name within Page Builder. Within the region HTML, we can now add a translation field to point to the correct localization from `schema_translations.json`. 

## Translating regions example

In this example, we will translate several regions on the home page. The following code sample contains translated fields that localize the `layers` pane within PageBuilder.


1. Add `translation` fields to the home page (/templates/pages/home.html).

<!-- theme: info -->
> #### Notes 
> * Translation must follow prefix “i18n.RegionName.” 
> * You can only add a translation field to a `{{{ region }}}` field.

home.html
```html
<div class="main full">
    {{#if products.featured}}
        {{> components/products/featured products=products.featured 
columns=theme_settings.homepage_featured_products_column_count}}
    {{/if}}
    {{{region name="home_below_featured_products" 
translation="i18n.RegionName.HomeBelowFeaturedProducts"}}}

    {{#if products.top_sellers}}
        {{> components/products/top products=products.top_sellers 
columns=theme_settings.homepage_top_products_column_count}}
    {{/if}}
    {{{region name="home_below_top_products" 
translation="i18n.RegionName.HomeBelowTopProducts"}}}

    {{#if products.new}}
        {{> components/products/new products=products.new 
columns=theme_settings.homepage_new_products_column_count}}
    {{/if}}
    {{{region name="home_below_new_products" 
translation="i18n.RegionName.HomeBelowNewProducts"}}}
    {{{region name="below_content--global" 
translation="i18n.RegionName.HomeBelowContentGlobal"}}} 
</div>
```

2. Add region translations to the `schema_translations.json` file. 

<!-- theme: info -->
> #### Notes 
> * Region translations must live within the `schema_translations.json` file.
> * Language code must contain a default value.
> * Language code outside of default will support two character language code as well as multiple character language code (which is formatted by two lowercase letters, a dash, and at least two alphanumeric characters after). Example provided below:
>   - Example of two character language code “en”, “fr”, “uk”, “zh”.
>   - Example of multiple character language code “fr-FR”, “zh-CN”, “en-US”, “uk-UA”, “es-419”.


schemaTranslations.json

```json
{
 "i18n.RegionName.HomeBelowMenu": {
   "default": "Home Below Menu",
   "en": "Home Below Menu",
   "fr-FR": "Accueil Ci-dessous Menu",
   "zh": "主页下方菜单",
   "zh-CN": "主页下方菜单"
 },
 "i18n.RegionName.HomeBelowCarousel": {
   "default": "Home Below Carousel",
   "en": "Home Below Carousel",
   "fr-FR": "Accueil Ci-dessous Carrousel",
   "zh": "旋转木马下方的主页",
   "zh-CN": "旋转木马下方的主页"
 },
 "i18n.RegionName.HomeBelowFeaturedProducts": {
   "default": "Home Below Featured Products",
   "en": "Home Below Featured Products",
   "fr-FR": "Accueil Ci-dessous Produits en vedette",
   "zh": "主页 特色产品",
   "zh-CN": "主页 特色产品"
 },
 "i18n.RegionName.HomeBelowTopProducts": {
   "default": "Home Below Top Products",
   "en": "Home Below Top Products",
   "fr-FR": "Accueil Ci-dessous Top Produits",
   "zh": "主页 热门产品下方",
   "zh-CN": "主页 热门产品下方"
 },
 "i18n.RegionName.HomeBelowNewProducts": {
   "default": "Home Below New Products",
   "en": "Home Below New Products",
   "fr-FR": "Accueil Ci-dessous Nouveaux produits",
   "zh": "新产品首页",
   "zh-CN": "新产品首页"
 },
 "i18n.RegionName.HeaderBottomGlobal": {
   "default": "Header Bottom (Global)",
   "en": "Header Bottom (Global)",
   "fr-FR": "Bas de l'en-tête (global)",
   "zh": "标题底部（全局）",
   "zh-CN": "标题底部（全局）"
 },
 "i18n.RegionName.HeaderBottom": {
   "default": "Header Bottom",
   "en": "Header Bottom",
   "fr-FR": "Bas de l'en-tête",
   "zh": "标题底部",
   "zh-CN": "标题底部"
 }
}
```

3. Change the language in the control panel settings to view the translated regions. Go to `My Profile > Edit Profile > Preferred language`.


![https://storage.googleapis.com/bigcommerce-production-dev-center/images/translating_regions_layers.png](https://storage.googleapis.com/bigcommerce-production-dev-center/images/translating_regions_layers.png)



## Resources

### Related articles

* [Translation Keys](/stencil-docs/localization/translation-keys)
* [Page Builder Overview](/stencil-docs/page-builder/page-builder-overview)
* [Translation Keys](/stencil-docs/localization/translation-keys)
* [schemaTranslations.json](/stencil-docs/storefront-customization/directory-structure#schematranslationsjson)
 
