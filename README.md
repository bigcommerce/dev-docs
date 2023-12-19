**Coming Soon**
# BigCommerce Public Developer Documentation

On December 27th, 2023, the following public documentation repositories will be deprecated, and all documentation will move into this repository. These repositories will then become read-only:

* `https://github.com/bigcommerce/api-specs`
* `https://github.com/bigcommerce/dev-docs`
* `https://github.com/bigcommerce/theme-context-object-schemas`

If you maintain API clients, this repository will be your source for the most up-to-date API specifications.

The BigCommerce DX team is excited to create a new consolidated GitHub home for our documentation. We look forward to offering a more streamlined developer experience, starting December 27th!

# BigCommerce API Specifications

This repo contains the OpenAPI Specifications (OAS) and JSON schema that form the human-readable [BigCommerce REST API Reference](https://developer.bigcommerce.com/docs/api).

As of August 22, 2022, all API specification files are in OAS 3+ format. We also made significant changes to this repo in March 2023. Please update your fork to ensure you're working with the newest source files.

## Contributing

If you're interested in contributing, see [CONTRIBUTING.md](CONTRIBUTING.md).

## Directory structure

```shell
.
├── .github/                           # github config
    └── workflows/                     # workflows to lint pull requests, etc.
├── .idea/                             # directory ignored by git - use for yourself
├── models/                            # yml schema for various objects
    ├── email_templates/               # email template schemas
    ├── webhooks/                      # webhooks schemas
    └── json2schema.py                 # script to convert json to yml
├── reference/                         # openapi specification files
    ├── catalog/                       # catalog OAS API reference
    ├── payments/                      # payments OAS API reference
    └── ...                            # other OAS API reference
├── .eslintrc.json                     # config for MDX linter
├── .gitignore                         # gitignore
├── .spectral.yaml                     # config for OAS linter
├── CONTRIBUTING                       # guidelines for contribution
├── package-lock.json
├── package.json
├── pull_request_template.md           # template for most pull requests         
└── README
```

# BigCommerce Developer Documentation

This repository contains the markdown files and static assets powering [developer.bigcommerce.com](https://developer.bigcommerce.com/), which includes [API Docs](https://developer.bigcommerce.com/docs), [Theme Docs](https://developer.bigcommerce.com/stencil-docs), and [BigCommerce for WordPress](https://developer.bigcommerce.com/bigcommerce-for-wordpress/overview).


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
├── .spelling   
├── CONTRIBUTING                       # guidelines for contribution
├── package-lock.json                  
├── package.json                       
├── pull_request_template.md           # template for most pull requests
└── README.
```
