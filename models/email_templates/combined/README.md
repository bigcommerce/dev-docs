# Email Template Objects

Object schemas for handlebars email templates.

## Directory structure

```shell
.
├── data                                   # json data for generating and updating yaml schema
├── _all.yml                               # Groups models together for docs
├── account_details_changed_email.yml      # Individual email template models
├── ...
```

## Updating models

To generate a new model from json data and overwrite the existing schema file:

1. Copy and paste template `data-*.json` from [localization-tools](https://github.com/bigcommerce/localization-tools/blob/master/email-check/modules/email-templates/types/abandoned_cart_email/data-0.json) to `models/_json/email_templates`.
2. Use `models/json2schema.py` to convert the json data to a yaml schema.

Example:

```bash
cat data.json | python json2schema.py > schema.yml
```

Bash for overwriting all email template models:

```bash
for f in models/email_templates/data/*.json; do cat $f | python models/json2schema.py > ${f%.*}.yml; mv ${f%.*}.yml models/email_templates/; done
```