# Webhooks

Object schemas for Webhook events.

## Directory structure

```shell
.
├── data                      # json data for generating and updating yaml schema
├── _all.yml                  # Groups models together for docs
├── store_app_uninstalled.yml # Individual email template models
├── ...
```

## Updating models

To generate a new model from json data and overwrite the existing schema file:

1. Copy and paste webhook event `json` into corresponding file in `data/`.
2. Use `models/json2schema.py` to convert the json data to a yaml schema.

Example:

```bash
cat data.json | python json2schema.py > schema.yml
```

Bash for overwriting all webhook event models:

```bash
for f in models/webhooks/data/*.json; do cat $f | python models/json2schema.py > ${f%.*}.yml; mv ${f%.*}.yml models/webhooks/; done
```