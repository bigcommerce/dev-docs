# BigCommerce Public Developer Documentation

This repo is the source of truth for the public, open source BigCommerce DevDocs and API reference at [developer.bigcommerce.com](https://developer.bigcommerce.com). It consists of **Markdown React (.mdx)**, **OpenAPI Specification (.yml)**, and **JSON Schema (.json and .yml)** files.

The BigCommerce DX team maintains these open source docs; we welcome your [issues](https://github.com/bigcommerce/docs/issues), [discussions](https://github.com/bigcommerce/docs/discussions), and [pull requests](https://github.com/bigcommerce/docs/pulls)!

## Contributing

If you're interested in contributing, see our [Contribution Guide](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md).

## History

On December 27, 2023, the following public documentation repositories were deprecated, and all documentation moved into this repository. We retained the `git` history of each document using the `--allow-unrelated-histories` flag. The following repositories are now read-only:

* `https://github.com/bigcommerce/api-specs`
* `https://github.com/bigcommerce/dev-docs`
* `https://github.com/bigcommerce/theme-context-object-schemas`

### API specifications

If you maintain API clients, this repository is your source for the most up-to-date public API specifications.

Please keep your fork up to date to ensure you're working with the newest source files.

Significant dates include the following:

* As of August 22, 2022, all API specification files are in OAS 3+ format.
* In March 2023, we made significant changes to support a new OAS parser at [developer.bigcommerce.com](https://developer.bigcommerce.com).
* In May 2023, we subdivided both the Catalog and Payments API specifications into multiple files.
* On December 27, 2023, all public docs moved into the [bigcommerce/docs](https://github.com/bigcommerce/docs) repo.

## Directory structure

```shell
.
├── .github/                           # github config
    └── workflows/                     # workflows to lint pull requests, etc.
    └── ...
├── .idea/                             # directory ignored by git - use for yourself
├── .style/                            # CSPELL data files
├── assets/ 
    ├── csv/                           # static files used in docs
    ├── images/                        # images and screenshots
    ├── json/                          # theme translation files
    └── PO/                            
├── docs                               # narrative documentation
    ├── api-docs/                      
    ├── bigcommerce-for-wordpress/     
    ├── legacy/                        # Blueprint and V2 API docs
    ├── msf/                           # MSF docs
    ├── partner-apps/                  # docs for some partner integrations
    └── stencil-docs/   
├── examples                           # example data for Stencil Handlebars context objects
├── models                             # JSON schemas in YAML
    ├── _root                          # YAML schemas for root Stencil Handlebars context objects
    ├── ...
├── reference/                         # OpenAPI specification files
    ├── catalog/                       # catalog OAS API reference
    ├── payments/                      # payments OAS API reference
    └── ...                            # other OAS API reference
├── theme-styles          
    ├── _root                          # MDX files for Stencil style configuration options
├── .cspell.json  
├── .eslintrc.json                     # config for MDX linter
├── .gitignore                         # gitignore
├── .nojekyll    
├── .nvmrc                             # config for NVM
├── .spectral.yaml                     # config for OAS linter
├── CODE_OF_CONDUCT.md                 # Code of Conduct for participants
├── CONTRIBUTING.md                    # guidelines for contribution
├── package-lock.json                  
├── package.json                       
├── pull_request_template.md           # template for most pull requests
└── README.md
```
