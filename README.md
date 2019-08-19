Testing GH

# BigCommerce Developer Documentation

- [Directory Structure](#structure)
- [Contributing](#contributing)
- [Page Template](/markdown/_page_template.md)
- [Components](/markdown/_components.md)
- [Style Guide](https://intranet.bigcommerce.com/display/clientsuccess/Developer+Documentation+Style+Guide) (Intranet)


This repo contains the markdown files and static assets powering [developer.bigcommerce.com](https://developer.bigcommerce.com/stencil-docs), which includes: 
* [API Docs](https://developer.bigcommerce.com/api-docs)
* [Theme Docs](https://developer.bigcommerce.com/stencil-docs)
* [BigCommerce for Wordpress](https://developer.bigcommerce.com/bigcommerce-for-wordpress)
* [Legacy](https://developer.bigcommerce.com/legacy)

---

## Directory Structure

<a id="structure"></a>

**`./`**
```shell
.
├── archive                            # Deprecated content
├── assets                             # Static files
├── docs                               # Repo documentation
├── markdown                           # Markdown source code for articles
├── samples                            # sample app code
└── spec                               # API spec files
```

**`./markdown/`**

```shell
.
├── ...
├── markdown                           
│    ├── api-docs                      # Server-to-Server and Storefront API docs
│    ├── bigcommerce-for-wordpress     # BigCommerce for Wordpress docs
│    ├── legacy                        # Legacy Blueprint and V2 API docs
│    ├── stencil-docs                  # Theme docs
├── ...
```

**`./assets/`**
```shell
.
├── ...
├── assets                             
│    ├── css                           # devcenter css
│    ├── fonts                         # devcenter fonts
│    ├── icons                         # devcenter icons
│    ├── img                           # screenshots, etc
│    ├── js                            # devcenter js 
├── ...
```

---

## Contributing to BigCommerce Developer Documentation

<a id="contributing"></a>

This document contains guidelines for contributing to BigCommerce Developer Documentation. These are guidelines, not rules; as such, use your best judgment, and feel free to propose changes to this document with a pull request.

Thanks for showing interest in contributing!

### Common Issues 

1. mending spelling and grammar mistakes
2. fixing broken links
3. clarifying confusing passages
4. simplifying complex instructions

###  Git Commit Messages
* Always include subject; include body when necessary
* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Fix broken link..." not "Fixes broken link...")
* Separate subject from body with a blank line
* Limit the subject line to 50 characters
* Capitalize the subject line
* Do not end the subject line with a period
* Use the body to explain what and why vs. how

### Making Pull Requests
* It must include a JIRA ticket number
* Include screenshots and animated GIFs in your pull request whenever possible.
* PLEASE DO NOT MERGE PULL REQUESTS. You are able to approve them, let a member of the dev docs term merge the request. 

### Contributing to other BigCommerce Projects

If you would like to open an issue for anything besides the API or the documentation, here are our other public repositories. 
You an also join our [BigCommerce Developers](https://support.bigcommerce.com/s/group/0F913000000HLjECAW/bigcommerce-developers) group for specific questions on working with the API and platform questions. 

- [BigCommerce Python API](https://github.com/bigcommerce/bigcommerce-api-python)
- [BigCommerce PHP API](https://github.com/bigcommerce/bigcommerce-api-php)
- [BigCommerce Ruby API](https://github.com/bigcommerce/bigcommerce-api-ruby)
- [BigCommerce Node API - Community Supported](https://github.com/getconversio/node-bigcommerce)


- [BigCommerce Checkout SDK](https://github.com/bigcommerce/checkout-sdk-js)
- [BigCommerce Checkout SDK Example](https://github.com/bigcommerce/checkout-sdk-js-example)


- [PHP Hello World App](https://github.com/bigcommerce/hello-world-app-php-silex)
- [Python Hello World App](https://github.com/bigcommerce/hello-world-app-python-flask)
- [Ruby Hello World App - OmniAuth](https://github.com/bigcommerce/omniauth-bigcommerce)


- [Cornerstone Issues](https://github.com/bigcommerce/cornerstone)
- [Stencil CLI](https://github.com/bigcommerce/stencil-cli)
