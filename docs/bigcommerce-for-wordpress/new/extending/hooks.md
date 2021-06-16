## Hooks

Hooks are access points during the WordPress execution process where a developer can insert custom code. Hooks consist of two types: actions and filters. Both allow developers to execute custom code during the WordPress lifecycle. The difference lies in whether the function returns a value:

- **Actions** execute a function with no output. Even if a value was returned it would be ignored.
- **Filters** modify a variable and return a value, which is the modified version of the original variable.

BigCommerce for WordPress provides over 100 hooks that you can use to extend and customize the plugin. For a comprehensive, searchable list of all available hooks, visit our [Code Reference](https://bigcommerce.moderntribe.qa/reference/hooks/).

### Architectural guidelines

All actions and filters called by the plugin begin with the `bigcommerce/` prefix (e.g., `bigcommerce/init`). If there is a dynamic component to the hook, precede it with an equal sign (e.g., `bigcommerce/template=' . $template . '/path`).

The entire plugin operates through closures wrapped around calls to classes instantiated via a dependency injection container. In the event that you need to modify the core behavior of the plugin, there are several methods to get access to these closures.

<div class="HubBlock--callout">
<div class="CalloutBlock--error">
<div class="HubBlock-content">