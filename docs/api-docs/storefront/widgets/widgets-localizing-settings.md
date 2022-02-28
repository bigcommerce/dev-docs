# Localizing Widget Template Settings



You can localize widget template settings to the provided language translations using the internationalization (**i18n**) system.

This article explains how to localize your widget template settings and provides a practical example of how to map settings to translations. 

## Mapping settings to translations

The [widget template](/api-reference/store-management/widgets/widget-template/getwidgettemplates) schema uses the `i18n.{SettingName}` internationalization format within labels to map settings to translation files. i18n's interpolation functionality makes it possible to integrate dynamic values into translations.

You can localize your widget template settings by defining translations in the `schema_translations` property of the widget template schema. 

### Localization example

The following example demonstrates how to add translations for the widget template settings using the `schema_translations` property. 

1. Identify all of the settings that need a translation. Each `label` value must start with the `i18n.` prefix. For example, `"label": "i18n.LineColor"`.
2. Prepare your schema translations JSON object. It must contain a default language code along with the other languages you want to support formatted by two lowercase letters, a dash, and at least two alphanumeric characters. For more information, see the [Supported language code schemes](#supported-language-code-schemes) section below.

**Schema translations example**

```json
{
 "i18n.LineColor": {
   "default": "Line color",
   "fr-FR": "Couleur de la ligne",
   "en": "Line color",
   "zh-CN": "线条颜色"
 },
 "i18n.LineStyle": {
   "default": "Line style",
   "fr-FR": "Style de ligne",
   "en": "Line style",
   "zh-CN": "线型"
 },
 "i18n.LineWidth": {
   "default": "Line width",
   "fr-FR": "Largeur de ligne",
   "en": "Line width",
   "zh-CN": "行宽"
 },
 "i18n.LineThickness": {
   "default": "Line Thickness",
   "fr-FR": "Épaisseur de ligne",
   "en": "Line Thickness",
   "zh-CN": "线的粗细"
 },
 "i18n.Alignment": {
   "default": "Alignment",
   "fr-FR": "Alignement",
   "en": "Alignment",
   "zh-CN": "结盟"
 }
}
```

3. Stringify your data structure. You will pass it as a value to `schema_translations` in the next step.

**Stringified schema translations**

```json
"{\n \"i18n.LineColor\": {\n   \"default\": \"Line color\",\n   \"fr-FR\": \"Couleur de la ligne\",\n   \"en\": \"Line color\",\n   \"zh-CN\": \"线条颜色\"\n },\n \"i18n.LineStyle\": {\n   \"default\": \"Line style\",\n   \"fr-FR\": \"Style de ligne\",\n   \"en\": \"Line style\",\n   \"zh-CN\": \"线型\"\n },\n \"i18n.LineWidth\": {\n   \"default\": \"Line width\",\n   \"fr-FR\": \"Largeur de ligne\",\n   \"en\": \"Line width\",\n   \"zh-CN\": \"行宽\"\n },\n \"i18n.LineThickness\": {\n   \"default\": \"Line Thickness\",\n   \"fr-FR\": \"Épaisseur de ligne\",\n   \"en\": \"Line Thickness\",\n   \"zh-CN\": \"线的粗细\"\n },\n \"i18n.Alignment\": {\n   \"default\": \"Alignment\",\n   \"fr-FR\": \"Alignement\",\n   \"en\": \"Alignment\",\n   \"zh-CN\": \"结盟\"\n }\n}"
```

4. Create a widget template by sending a `POST` request to the [Create a Widget Template](/api-reference/store-management/widgets/widget-template/createwidgettemplate) endpoint. The following example creates a simple text widget:

```http
POST /stores/{{store_hash}}/v3/content/widget-templates
Host: api.bigcommerce.com
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

{
  "name": "Translated Text Widget",
  "schema": [
 {
   "type": "tab",
   "label": "Design",
   "sections": [
     {
       "settings": [
         {
           "type": "color",
           "label": "i18n.LineColor",
           "id": "color",
           "default": "rgba(180, 186, 209, 1)"
         },
         {
           "type": "select",
           "label": "i18n.LineStyle",
           "id": "style",
           "default": "solid",
           "typeMeta": {
             "selectOptions" : [
               {
                 "label": "Solid",
                 "value": "solid"
               },
               {
                 "label": "Dashed",
                 "value": "dashed"
               },
               {
                 "label": "Dotted",
                 "value": "dotted"
               }
             ]
           }
         },
         {
          "type": "range",
           "label": "i18n.LineWidth",
           "id": "width",
           "default": 100,
           "typeMeta": {
             "rangeValues": {
               "min": 1,
               "max": 100,
               "step": 1,
               "unit": "%"
             }
           }
         },
         {
          "type": "range",
           "label": "i18n.LineThickness",
           "id": "thickness",
           "default": 1,
           "typeMeta": {
             "rangeValues": {
               "min": 1,
               "max": 10,
               "step": 1,
               "unit": "px"
             }
           }
         },
         {
           "type": "alignment",
           "label": "i18n.Alignment",
           "id": "alignment",
           "default": {
             "horizontal": "center",
             "vertical": "middle"
           },
           "typeMeta": {
             "display": "both"
           }
         }
       ]
     }
   ]
 }
],
  "schema_translations": "{\n \"i18n.LineColor\": {\n   \"default\": \"Line color\",\n   \"fr-FR\": \"Couleur de la ligne\",\n   \"en\": \"Line color\",\n   \"zh-CN\": \"线条颜色\"\n },\n \"i18n.LineStyle\": {\n   \"default\": \"Line style\",\n   \"fr-FR\": \"Style de ligne\",\n   \"en\": \"Line style\",\n   \"zh-CN\": \"线型\"\n },\n \"i18n.LineWidth\": {\n   \"default\": \"Line width\",\n   \"fr-FR\": \"Largeur de ligne\",\n   \"en\": \"Line width\",\n   \"zh-CN\": \"行宽\"\n },\n \"i18n.LineThickness\": {\n   \"default\": \"Line Thickness\",\n   \"fr-FR\": \"Épaisseur de ligne\",\n   \"en\": \"Line Thickness\",\n   \"zh-CN\": \"线的粗细\"\n },\n \"i18n.Alignment\": {\n   \"default\": \"Alignment\",\n   \"fr-FR\": \"Alignement\",\n   \"en\": \"Alignment\",\n   \"zh-CN\": \"结盟\"\n }\n}",
  "template": "<h1>{{textContent}}</h1>"
}
```

5. From the control panel, open [Page Builder](/stencil-docs/page-builder/page-builder-overview) and locate your newly created widget template.
6. Drag and drop the widget in a [region](/api-docs/store-management/widgets/overview#regions) on a page to test it out.

![Default language code](https://storage.googleapis.com/bigcommerce-production-dev-center/images/01-Localizing%20Widget%20Template%20Settings.png "Default language code")

7. Change your store's language settings. You can do so in the control panel by going to [**My Profile** > **Edit Profile**](http://login.bigcommerce.com/deep-links/user-settings/profile). For this example, we are going to set the language to French.

8. Return to Page Builder and test the widget again. The display language should now be French.

![FR language code](https://storage.googleapis.com/bigcommerce-production-dev-center/images/03-Localizing%20Widget%20Template%20Settings.png "FR language code")

## Supported language code schemes 

Widget templates support both [ISO 639‑1](https://en.wikipedia.org/wiki/ISO_639-1) and [IETF language tag](https://en.wikipedia.org/wiki/IETF_language_tag) code schemes. The language code must follow a set format of two lowercase letters for a two-letter code system or two lowercase letters, a dash, and at least two alphanumeric characters for a multiple-character code system.

<!-- theme: info -->
> #### Note
> * Translations must start with the `i18n.` prefix.
> * Language code must contain a default value.
> * You can reuse translations within the widget template schema, but translations within the `schema_translations.json` file must be unique.



## Resources

- [Internationalization](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Internationalization)
- [Page Builder](https://support.bigcommerce.com/s/article/Page-Builder?language=en_US)
- [User Profile](https://support.bigcommerce.com/s/article/User-Profile?language=en_US)
- [Widgets API Overview](/api-docs/store-management/widgets/overview)
