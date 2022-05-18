# BigCommerce Developer Documentation

This repository contains the markdown files and static assets powering [developer.bigcommerce.com](https://developer.bigcommerce.com/), which includes [API Docs](https://developer.bigcommerce.com/docs), [Theme Docs](https://developer.bigcommerce.com/stencil-docs), [BigCommerce for WordPress](https://developer.bigcommerce.com/bigcommerce-for-wordpress), and [Legacy Docs](https://developer.bigcommerce.com/legacy).

Other repositories that contain markdown files and static assets that appear on [developer.bigcommerce.com](https://developer.bigcommerce.com/) include [theme-context-object-schemas](https://github.com/bigcommerce/theme-context-object-schemas/) for [Theme Objects](https://developer.bigcommerce.com/theme-objects) and [api-specs](https://github.com/bigcommerce/api-specs) for [API Reference](https://developer.bigcommerce.com/api-reference).

## Directory Structure

```shell
.
├── _project                           # Process stuff: templates, style guides, etc
│    ├── _components.md                # Not in use: example markup for common doc components
│    ├── _doc_style_guide.md           # Style guide for docs
│    ├── _page_template.md             # Stub markup to use when creating a new doc
│    └── _spec_style_guide.md          # Style Guide for API Spec files
├── assets                             # Static files used in docs
│   └── images                         # Images and screenshots used in docs
├── docs                               # Markdown powering API, Theme, and WordPress Docs
│    ├── api-docs                      # API docs
│    ├── bigcommerce-for-wordpress     # BigCommerce for WordPress docs
│    ├── legacy                        # Legacy Blueprint and V2 API docs
│    ├── msf                           # MSF docs
│    ├── partner-apps                  # Docs for some partner integrations
│    └── stencil-docs                  # Theme docs
├── .gitignore                         # gitignore
├── .nojekyll                          # 
├── .spelling                          # mdspell dictionary
├── .stoplight.json                    # Stoplight Platform edit view configuration file
├── .textlintrc                        # textlint configuration file
├── CONTRIBUTING.md                    # guidelines for contribution
├── Gruntfile.js                       # grunt configuration file
├── package-lock.json                  # packages for grunt, linting, and spell checking
├── package.json                       # packages for grunt, linting, and spell checking
├── pull_request_template_CODEOWNER.md # template for codeowner dev merges
├── pull_request_template.md           # template for most pull requests
└── toc.json                           # Stoplight Platform table of contents configuration file 
```

## Contributing
If you're interested in contributing to BigCommerce Developer Documentation, see [CONTRIBUTING.md](CONTRIBUTING.md) for instructions and guidelines.

## Recommending Changes
Feel free to recommend changes to BigCommerce Developer Documentation. To do see, [submit an issue on GitHub](https://github.com/bigcommerce/dev-docs/issues), or leave us feedback on [developer.bigcommerce.com](https://developer.bigcommerce.com/api-docs) using the **Docs Feedback** form (bottom right).
