# BigCommerce API Specifications

OpenAPI Specifications, Swagger, and JSON schema used to generate the human-readable [BigCommerce API Reference](https://developer.bigcommerce.com/api-reference).

## Directory structure

```shell
.
├── doc                  # markdown files
├── models               # yaml schema for various objects
    ├── ...
    └── json2schema.py   # script to easily convert json data to yaml schema
├── reference            # openapi specification files
└── .stoplight.json      # stoplight platform configuration file
                         # https://meta.stoplight.io/docs/platform/
```

## Contributing

If you're interested in contributing, see [CONTRIBUTING.md](CONTRIBUTING.md).