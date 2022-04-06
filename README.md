# BigCommerce API Specifications

OpenAPI Specifications, Swagger, and JSON schema used to generate the human-readable [BigCommerce API Reference](https://developer.bigcommerce.com/api-reference).

## Directory structure

```shell
.
├── .circleci                          # config for circleci job that runs openapi linter
    └── config.yml                     # - docs: https://meta.stoplight.io/docs/spectral
├── docs                               # markdown files
├── models                             # yaml schema for various objects
    ├── ...
    └── json2schema.py                 # script to easily convert json data to yaml schema
├── reference                          # openapi specification files
├── .gitignore                         # gitignore
├── .spectral.yaml                     # config for stoplight spectral openapi linter
├── .stoplight.json                    # Stoplight Platform edit view configuration file
├── CONTRIBUTING.md                    # guidelines for contribution
├── pull_request_template.md           # template for most pull requests
├── staging_master_pr_checklist.md     # template for codeowner dev merges
└── toc.json                           # Stoplight Platform table of contents configuration file 
```

## Contributing

If you're interested in contributing, see [CONTRIBUTING.md](CONTRIBUTING.md).
