# BigCommerce Developer Documentation

- [Directory Structure](#directory-structure)
- [Contributing](#contributing)
- [Recommending Changes](#recommending-changes)

This repo contains the markdown files and static assets powering [developer.bigcommerce.com](https://developer.bigcommerce.com/stencil-docs), which includes: [API Docs](https://developer.bigcommerce.com/api-docs), [Theme Docs](https://developer.bigcommerce.com/stencil-docs), [BigCommerce for WordPress](https://developer.bigcommerce.com/bigcommerce-for-wordpress), and [Legacy Docs](https://developer.bigcommerce.com/legacy).

## Directory Structure

**`./`**
```shell
.
├── _project                           # Process stuff: templates, style guides, etc
|    ├── archive                       # Deprecated content
│    ├── _components.md                # Example markup for common doc components
│    ├── _doc_style_guide.md           # Style guide for docs
│    ├── _page_template.md             # Stub markup to use when creating a new doc
│    └── _spec_style_guide.md          # Style Guide for API Spec files
├── assets                             # Static files used in docs
│   └── images                         # Images and screenshots used in docs
├── docs                               # Markdown powering API, Theme, and WordPress Docs
│    ├── api-docs                      # API docs
│    ├── bigcommerce-for-wordpress     # BigCommerce for WordPress docs
│    ├── legacy                        # Legacy Blueprint and V2 API docs
│    └── stencil-docs                  # Theme docs
├── reference                          # OAS (AKA Swagger) files powering the API Reference
│    └── json                          # JSON Specification files
├── .spelling                          # mdspell dictionary
├── .textlintrc                        # textlint configuration file
├── Gruntfile.js                       # grunt configuration file
├── package-lock.json                  # packages for grunt, linting, and spell checking
├── package.json                       # packages for grunt, linting, and spell checking
```

## Contributing
If you're interested in contributing to BigCommerce Developer Documentation, see [CONTRIBUTIONS.md](CONTRIBUTING.md) for instructions and guidelines.

## Recommending Changes
Feel free to recommend changes to BigCommerce Developer Documentation. To do see, [submit an issue on GitHub](https://github.com/bigcommerce/dev-docs/issues), or leave us feedback on [developer.bigcommerce.com](https://developer.bigcommerce.com/api-docs) using the **Docs Feedback** form (bottom right).