# BigCommerce Developer Documentation

This repository contains the markdown files and static assets powering [developer.bigcommerce.com](https://developer.bigcommerce.com/), which includes [API Docs](https://developer.bigcommerce.com/docs), [Theme Docs](https://developer.bigcommerce.com/stencil-docs), and [BigCommerce for WordPress](https://developer.bigcommerce.com/bigcommerce-for-wordpress).

Other repositories that contain content that appears on [developer.bigcommerce.com](https://developer.bigcommerce.com/) include [theme-context-object-schemas](https://github.com/bigcommerce/theme-context-object-schemas/) for [Theme Objects](https://developer.bigcommerce.com/theme-objects) and [api-specs](https://github.com/bigcommerce/api-specs) for [API Reference](https://developer.bigcommerce.com/docs/api).

## Contributing

If you're interested in contributing to BigCommerce Developer Documentation, see [CONTRIBUTING.md](CONTRIBUTING.md).

## Directory Structure

```shell
.
├── .github/                           # github config
    └── workflows/                     # workflows to lint pull requests, etc.
├── .notes/                            # directory ignored by git - use for yourself
├── assets/ 
    ├── csv/                           # static files used in docs
  ├── images/                          # images and screenshots
    ├── json/                          # theme translation files
    └── PO/                            
├── docs                               # narrative documentation
    ├── api-docs/                      
    ├── bigcommerce-for-wordpress/     
    ├── legacy/                        # Blueprint and V2 API docs
    ├── msf/                           # MSF docs
    ├── partner-apps/                  # docs for some partner integrations
    └── stencil-docs/                  # theme docs
├── .eslintrc.json                     # config for MDX linter
├── .gitignore                         # gitignore
├── .nojekyll                          
├── .spelling                          # mdspell dictionary
├── .textlintrc                        # textlint configuration file
├── CONTRIBUTING                       # guidelines for contribution
├── Gruntfile.js                       # grunt configuration file
├── package-lock.json                  
├── package.json                       
├── pull_request_template.md           # template for most pull requests
└── README.
```
