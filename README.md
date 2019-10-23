# BigCommerce Developer Documentation

- [Overview](#overview)
- [Directory Structure](#directory-structure)
- [Contributing](#contributing)

## Overview
This repo contains the markdown files and static assets powering [developer.bigcommerce.com](https://developer.bigcommerce.com/stencil-docs), which includes: 
* [API Docs](https://developer.bigcommerce.com/api-docs)
* [Theme Docs](https://developer.bigcommerce.com/stencil-docs)
* [BigCommerce for WordPress](https://developer.bigcommerce.com/bigcommerce-for-wordpress)
* [Legacy](https://developer.bigcommerce.com/legacy)

## Directory Structure

**`./`**
```shell
.
├── archive                            # Deprecated content
├── assets                             # Static files used in docs
│   └── images                         # Images and screenshots used in docs
├── docs                               # Markdown powering API, Theme, and WordPress Docs
│    ├── api-docs                      # API docs
│    ├── bigcommerce-for-wordpress     # BigCommerce for WordPress docs
│    ├── legacy                        # Legacy Blueprint and V2 API docs
│    ├── stencil-docs                  # Theme docs
├── tools                              # Templates and other tools to make editing easier
│    ├── _components.md                # Example markup for common doc components
│    ├── _page_template.md             # Stub markup to use when creating a new doc
└── reference                          # OAS (AKA Swagger) files powering the API Reference
    └── json                           # JSON Specification files
```

## Contributing