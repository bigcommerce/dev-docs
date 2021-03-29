# Theme Context Object Schemas

JSON schema used to generate the human-readable BigCommerce [Theme Object Reference](https://developer.bigcommerce.com/stencil-docs/reference-docs/global-objects-and-properties).

## Directory structure

```shell
.
├── circleci             # config for circleci job that runs openapi linter
    └── config.yml       # - docs: https://meta.stoplight.io/docs/spectral
├── doc                  # markdown files
├── examples             # example json
├── models               # yaml schema for various objects
    ├── _root            # schemas for root context objects
├── .spectral.yaml       # config for stoplight spectral openapi linter
└── .stoplight.json      # stoplight platform configuration file
                         # - docs: https://meta.stoplight.io/docs/platform/
```