# Theme Updates and Version Control

<div class="otp>

- [Version Control](#version-themes)
- [Theme Updates](#updates)
- [Maintaining Customizations](#maintain-customizations)

</div>


When working with BigCommerce themes there a few steps you can take to make keeping different theme versions and updates in sync. 

<a id="markdown-version-themes" name="version-themes"></a>

## Version Control

A typical setup might include a base theme and from that several custom themes. The base theme and custom theme need to keep up with any major changes and have a way to maintain the customizations. Using a version control system such as Git can make sure themes are up to date. One example is placing the parent theme on the master branch. Then keeping each child theme on a different branch. This way the master branch is the parent theme and each child theme is kept on a separate branch. Changes to the master theme can then be pushed to each child if needed.


---

<a id="markdown-updates" name="updates"></a>

## Theme Updates

If you are using a Cornerstone theme as your base theme, update notifications are found in our [changelog](). If you are using another theme, please see the theme creator for updates.

Before updating your theme, always make a backup of the theme. When updating keep a backup of the `config.json`. Config contains all the configurations and customizations for that theme. Never merge an update directly into your theme. Test any new updates before pushing them to a production theme. A good way to do this is keep a separate test theme and compare file changes between them. Then apply the changes to the test theme and check for any problems. 

---

<a id="markdown-maintain-customizations" name="maintain-customizations"></a>

## Maintaining Customizations

A way to keep your customizations separate from the base theme is to rename the files. For example, `{{{stylesheet ‘/assets/css/theme.css’}}}`is the theme CSS that comes with the file. Instead of making edits to this file create a new one `{{{stylesheet ‘/assets/css/my_custom_theme.css’}}}` and reference this file in the layouts.

Make sure to discuss with the merchant not to make any changes to the files. This can cause issues later on with updates. 

---

## References
* [Version Control for Teams](https://medium.com/bigcommerce-developer-blog/version-control-for-teams-a186bd74ba7e?source=friends_link&sk=721c0fc073cbe5b729c1a2282377ca86) (BigCommerce Developer Blog)
* [Level Up Your Development Workflow with Continuous Delivery](https://medium.com/bigcommerce-developer-blog/how-to-level-up-your-development-workflow-with-continuous-delivery-3a6493cc1d13) (BigCommerce Developer Blog)