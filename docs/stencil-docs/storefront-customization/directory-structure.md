# Directory Structure

 
The default directory structure for [Cornerstone](https://github.com/bigcommerce/cornerstone)-based themes is as follows:
  

```shell
.
├── assets/
├── lang/
├── meta/
├── templates/
├── config.json
├── schema.json
└── schemaTranslations.json
```

## assets/

  
  
The `/fonts/` subdirectory contains local versions of theme-specific fonts.

  
```shell
├── assets
│   ├── fonts               # theme fonts
│   ├── icons               # logos and ui icons
│   ├── img                 # theme images
│   │   ├── payment-methods # payment method icons
│   │   ├── vendor          # third-party lib icons
│   ├── js                  # javascript
│   │   ├── test-unit       # tests
│   │   ├── theme           # global and page level js
│   │   └── app.js          # main js file; page js mapped here
│   └── scss                # Sassy CSS files
│       ├── components      # scss for ui components
│       ├── fonts           # scss for fonts
│       ├── layouts         # scss for layouts
│       ├── settings        # scss variable definitions
│       ├── tools           # scss functions
│       ├── utilities       # scss utilities
│       ├── vendor          # third-party lib scss
```

  ## assets/js/

  
Theme JavaScript.

```shell
├── assets
│   ├── js                  # javascript
│   │   ├── test-unit       # tests
│   │   ├── theme           # global and page level js
│   │   └── app.js          # main js file; page js mapped here
```

  ## lang/

  
Language translation `.json` files.

```shell
├── lang
│   ├── en-CA.json  # English, Canada
│   ├── en.json     # English
│   ├── fr-CA.json  # French, Canada
│   └── fr.json     # French
```

  
**Example**:

```json
// fr.json

{
    "header": {
        "welcome_back": "Bienvenue, {name}"
    }
}
```

  ## meta/

  
Marketplace screenshots.

```shell
├── meta
│   ├── composed.png
│   ├── desktop_bold.png
│   ├── desktop_light.png
│   ├── desktop_warm.png
│   ├── mobile_bold.png
│   ├── mobile_light.png
│   └── mobile_warm.png
```

  ## templates/


  
Theme template HTML files.

```shell
├── templates
│   ├── components
│   │   ├── common
│   │   |   ├── header.html
│   │   |   ├── footer.html
│   │   |   ├── body.html
│   │   ...
│   ├── layout
│   │   ├── base.html
│   │   ...
│   └── pages
```

  ## config.json

  
Main configuration file.

```json

{
  "name": "Cornerstone",
  "version": "4.9.0-rc.1",
  "meta": {...
  },
  "css_compiler": "scss",
  "autoprefixer_cascade": true,
  "autoprefixer_browsers": [...
  ],
  "settings": {...
  },
  "read_only_files": [...
  ],
  "resources": {...
  },
  "variations": [...
  ]
}
```

  ## schema.json
  
  
Page Builder settings schema.

```json

[
  {
    "name": "i18n.Global",
    "settings": [
      {
        "type": "heading",
        "content": "i18n.BackgroundAndLines"
      },
      {
        "type": "color",
        "label": "i18n.BannerBackground",
        "id": "color-primary"
      },
      ...
    ]
  },
  {
    "name": "i18n.HeaderAndFooter",
    "settings": [...
    ],
  },
  ...
```

  ## schemaTranslations.json

  
Translations for Page Builder settings.

```json
{
  "i18n.Global": {
    "default": "Global",
    "fr": "Global",
    "it": "Globale",
    "uk": "Глобально",
    "zh": "全局"
  },
  "i18n.BackgroundAndLines": {
    "default": "Background and lines",
    "fr": "Arrière-plan et lignes",
    "it": "Sfondo e linee",
    "uk": "Фон та лінії",
    "zh": "背景和线条"
  },
  "i18n.BannerBackground": {
    "default": "Banner background",
    "fr": "Bannière de l’arrière-plan",
    "it": "Sfondo del banner",
    "uk": "Фон банеру",
    "zh": "横幅背景"
    ...
  }
```
