# Theme Updates and Version Control

<div class="otp">

- [Version Control](#version-themes)
- [Theme Updates](#updates)
- [Maintaining Customizations](#maintain-customizations)

</div>


When developing BigCommerce themes, there are a few steps you can take to ensure your custom theme stays up to date with BigCommerce theme updates and version releases.

<a id="version-themes"></a>

## Version Control

A typical setup might include a base theme, with several custom themes branching from the base theme. The custom theme(s) will need to be kept up to date with any major changes while maintaining its own customizations. Version control systems such as Git can help ensure themes stay up to date. For example, you can place the parent theme on the master branch and keep each child theme on its own separate branch. Changes to the master theme can then be pushed to each child if needed.


---

<a id="updates"></a>

## Theme Updates

If you are using a Cornerstone theme as your base theme, update notifications are found in our [changelog](https://developer.bigcommerce.com/changelog). If you are using another theme, please see the theme creator for updates.

Before updating your theme, review the following list items to ensure a successful update:

* Create a backup of the custom theme.
* Keep a backup of `config.json`. This file contains all the configurations and many of the customizations for a theme.
* Never merge an update directly into your custom theme.
* Test any new updates before pushing the updates to production. A good way to do this is to keep a test theme that mirrors your theme in production and apply any new changes to the test theme. If there are no issues, apply your updates to production.
---

<a id="maintain-customizations"></a>

## Maintaining Customizations

When creating customizations, it's important to create a new file to overwrite the original styles, as opposed to modifying the original existing file. For example, `{{{stylesheet ‘/assets/css/theme.css’}}}` is the file that has the CSS that already exists in the theme. Instead of making edits to this file, create a new .css file, such as `{{{stylesheet ‘/assets/css/my_custom_theme.css’}}}`. Place your new styles in this file, and reference this file in the layouts.

Make sure to discuss with the merchant not to make any changes to the files. This can cause issues later on with updates. Having multiple editors to files could potentially cause issues later on with updates if a proper workflow is not established.


---

## References
* [Version Control for Teams](https://medium.com/bigcommerce-developer-blog/version-control-for-teams-a186bd74ba7e?source=friends_link&sk=721c0fc073cbe5b729c1a2282377ca86) (BigCommerce Developer Blog)
* [Level Up Your Development Workflow with Continuous Delivery](https://medium.com/bigcommerce-developer-blog/how-to-level-up-your-development-workflow-with-continuous-delivery-3a6493cc1d13) (BigCommerce Developer Blog)
* [What is Version Control?](https://www.atlassian.com/git/tutorials/what-is-version-control) (Atlassian Blog)