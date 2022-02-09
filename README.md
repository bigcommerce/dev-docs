# BigCommerce API Specifications

OpenAPI Specifications, Swagger, and JSON schema used to generate the human-readable [BigCommerce API Reference](https://developer.bigcommerce.com/api-reference).

## Directory structure

```shell
.
├── circleci             # config for circleci job that runs openapi linter
    └── config.yml       # - docs: https://meta.stoplight.io/docs/spectral
├── doc                  # markdown files
├── models               # yaml schema for various objects
    ├── ...
    └── json2schema.py   # script to easily convert json data to yaml schema
├── reference            # openapi specification files
├── .spectral.yaml       # config for stoplight spectral openapi linter
└── .stoplight.json      # stoplight platform configuration file
                         # - docs: https://meta.stoplight.io/docs/platform/
```

## Contributing

If you're interested in contributing, see [CONTRIBUTING.md](CONTRIBUTING.md).
