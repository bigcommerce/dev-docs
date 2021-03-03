# Email Templates Overview

<div class="otp" id="no-index">

### On This Page

- [Editing](#editing)
- [API](#api)
- [Overrides](#overrides)
- [Resources](#resources)

</div>

This article provides an overview of BigCommerce's transactional email templates and API.


## Editing

To edit transactional email templates in a store's control panel, [log in](https://support.bigcommerce.com/s/article/Logging-Into-Your-Store) and navigate to **Marketing** › [**Transactional Emails**](http://login.bigcommerce.com/deep-links/manage/transactional-emails).

Use [Handlebars expressions](https://developer.bigcommerce.com/api-docs/store-management/email-templates/handlebars) to localize email templates and access dynamic data (like a customer's first name in an order email).


```html
<!-- Combined Order Status Email Template -->

 <p>{{ lang 'hello' name=order.customer_name }}. Below are the products you ordered.</p>

{{#each order.products}}
<tr>
    <td style="padding:5px; font-size:12px; border-bottom:solid 1px #CACACA"><strong>{{ name }}</strong></td>
    <td style="padding:5px; font-size:12px; border-bottom:solid 1px #CACACA" width="100" align="center">{{#if sku }}{{ sku }}{{else}}&nbsp;{{/if}}</td>
    <td style="padding:5px; font-size:12px; border-bottom:solid 1px #CACACA" width="100" align="center">{{ quantity }}</td>
</tr>
{{/each}}
```

[Learn how to edit, test, and preview transactional email templates in the control panel](https://support.bigcommerce.com/s/article/Customizing-Emails).

## API

To manage transactional email templates programmatically, use the [Email Templates API](https://developer.bigcommerce.com/api-reference/store-management/email-templates). For example, to [get a list of email templates](https://developer.bigcommerce.com/api-reference/store-management/email-templates/email-templates/getemailtemplates), send a `GET` request to `/v3/marketing/email-templates`.

```http
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/marketing/email-templates
X-Auth-Token: {{ACCESS_TOKEN}}
Accept: application/json
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/email-templates/email-templates/getemailtemplates#requestrunner)


**Response:**

```json
{
  "data": [
    {
      "type_id": "account_reset_password_email",
      "body": "<!DOCTYPE html> <html lang=\"en\"> <head>     <meta charset=\"UTF-8\">     <title>Title</title> </head> <body> <p>     {{lang \"reset_password\" name=store.name}} </p> <br/> <br/> <a href='{{account.reset_password_link}}'>     {{account.reset_password_link}} </a>  </body> </html>",
      "translations": [...],
      "subject": "Reset your password at {{store.name}}"
    }
  ],
  "meta": {...}
}
```

To [update an email template](https://developer.bigcommerce.com/api-reference/store-management/email-templates/email-templates/updateemailtemplate), send a `PUT` request to `/v3/marketing/email-templates/{template-name}`.

```http
PUT /stores/{{STORE_HASH}}/v3/marketing/email-templates/account_reset_password_email
Host: api.bigcommerce.com
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

{
  "type_id": "account_reset_password_email",
  "body": "<!DOCTYPE html> <html lang=\"en\"> <head>     <meta charset=\"UTF-8\">     <title>Title</title> </head> <body> <p>     {{lang \"reset_password\" name=store.name}} </p> <br/> <br/> <a href='{{account.reset_password_link}}'>     {{account.reset_password_link}} </a>  </body> </html>",
  "translations": [
    {
      "locale": "en",
      "keys": {
        "reset_password": "To change your customer account password at {name} please click this link or copy and paste it into your browser:"
      }
    }
  ],
  "subject": "Reset your password at {{store.name}}"
}
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/store-management/email-templates/email-templates/updateemailtemplate#requestrunner)

## Overrides

Pass in a [channel's](https://developer.bigcommerce.com/api-reference/store-management/channels) ID using the `?channel_id=` query parameter to create a channel-specific override for a transactional email template.

```http
PUT https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/marketing/email-templates/account_reset_password_email?channel_id=123
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

{
  "type_id": "account_reset_password_email",
  "body": "<!DOCTYPE html> <html lang=\"fr\"> <head>     <meta charset=\"UTF-8\">     <title>Title</title> </head> <body> <p>     {{lang \"reset_password\" name=store.name}} </p> <br/> <br/> <a href='{{account.reset_password_link}}'>     {{account.reset_password_link}} </a>  </body> </html>",
  "translations": [
    {
      "locale": "fr",
      "keys": {
        "reset_password": "Pour modifier le mot de passe de votre compte client à {name}, veuillez cliquer sur ce lien ou le copier et le coller dans votre navigateur:"
      }
    }
  ],
  "subject": "Réinitialisez votre mot de passe sur {{store.name}}"
}
```

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> ### Note
> * Omit `?channel_id` to interact with global email templates.

</div>
</div>
</div>

## Resources

* [Email Template API Reference](https://developer.bigcommerce.com/api-reference/store-management/email-templates)
* [Email Template Handlebars Reference](https://developer.bigcommerce.com/api-docs/store-management/email-templates/handlebars)
* [Customizing Email Templates](https://support.bigcommerce.com/s/article/Customizing-Emails)
