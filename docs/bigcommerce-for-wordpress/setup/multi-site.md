# Multi-site Setup

When connecting more than one WordPress site to your BigCommerce store, you need to use an API account to link them. If you try to connect using the 'connect your store' flow, which uses a BigCommerce app to streamline the connection, your first WordPress site will lose its connection to BigCommerce.

### Multi-site and subdirectories
Multiple sites can share the same API credentials, or you can choose to create a new set of credentials for each site.

| Configuration Method | Is Supported |
|:----------------------|:-----------:|
| Subdirectories           | No               |
| Subdomains               | Yes              |
| Separate Domains         | Yes*             |
  
Note that embedded checkout is only supported on a single domain at a time. See the [BigCommerce for WordPress](https://support.bigcommerce.com/s/article/BigCommerce-for-WordPress-Checkout?language=en_US#subdomain-setup) documentation.*

## Getting your API credentials

1. To get your store’s API credentials, sign in to your active MSF-enabled BigCommerce store and head to **Settings > API > API accounts**.

![Click 'Create API Account' to get credentials](//s3.amazonaws.com/user-content.stoplight.io/6116/1544044020003 "Click 'Create API Account' to get credentials")

2. Click the blue `Create API Account` button on the top left-hand side. This opens up a screen that will ask you to enter a name and select scopes for the API account.

![Fill in the Name and OAuth Scopes](//s3.amazonaws.com/user-content.stoplight.io/6116/1544044197137 "Fill in the Name and OAuth Scopes")

<!-- theme: info -->
> #### API account name field
> We suggest 'WordPress' for the name, although you can name it anything you'd like as long as it's unique within your API accounts and is more than three characters.

3. Depending on the product import options you select, the OAuth settings must match up accordingly to prevent importing errors. For more information on product import options, check out our [Product Import](/docs/bigcommerce-for-wordpress/setup/product-import.md) page.

    Set the OAuth scope settings to the following defaults according to your import options.

| OAuth Scope       | Full Import           | Fast Headless     |
|:------------------|:----------------------|:------------------|
| Content           | None                  | None              |
| Checkout content  | None                  | None              |
| Customers         | Modify                | Modify            |
| Customers login   | Login                 | Login             |
| Information & settings | Modify           | Modify            |
| Marketing         | Read-Only             | Read-Only         |
| Orders            | Read-Only             | Read-Only         |
| Order transactions| Read-Only             | Read-Only         |
| Create payments   | None                  | None              |
| Get payment methods | Read-Only           | Read-Only         |
| Stored payment instruments| None          | None              |
| Products          | Read-Only             | Read-Only         |
| Themes            | None                  | None              |
| Carts             | Modify                | Modify            |
| Checkouts         | Modify                | Modify            |
| Sites & routes    | Modify                | Modify            |
| Channel settings  | Modify                | Modify            |
| Channel listings  | Modify                | Modify            |
| Storefront API tokens | None              | Modify    |
| Storefront API customer impersonation tokens | None     | Modify  |
| Store logs        | None                  | None              |
| Store inventory   | None                  | None              |

4. After you have finished setting a name and selecting scopes, click `Save`. You will then see a modal that contains the `Client ID`, `Client Secret` and `Access Token` necessary for the remaining fields in the WordPress API Credentials settings.

![API credentials](//s3.amazonaws.com/user-content.stoplight.io/6116/1544044553372 "API Credentials")

<!-- theme: info -->
> #### .txt file download
> You'll also see a `.txt` file download in your browser that contains the same information in an easy-to-read format, once again including your API Path in case you didn't copy it before.

![.txt file download](//s3.amazonaws.com/user-content.stoplight.io/6116/1544044589538 ".txt file download")

## Setting up a WordPress site using API account credentials

1. To set up a WordPress site using this method, click `Enter your API credentials` on the welcome screen in the plugin.

![WordPress Plugin Welcome Screen](//s3.amazonaws.com/user-content.stoplight.io/6116/1544043727239 "WordPress Plugin Welcome Screen")

![Next](//s3.amazonaws.com/user-content.stoplight.io/6116/1544043952871)

2. Enter your API credentials on your WordPress site. Saving the API credentials on your WordPress site will direct you to name the channel that the plugin will create. This allows you to list product to the channel from within BigCommerce and link orders back to the channel that comes from the WordPress site. You can also link to an existing channel.

_Congratulations, you're done setting up your additional site!_

<!-- theme: info -->
> #### WordPress currency processing
> The WordPress sites you connect to your BigCommerce store will process in the same currency as the BigCommerce store.

## Additional resources

* [Multisite Ecommerce with WordPress and BigCommerce](https://medium.com/bigcommerce-developer-blog/multi-site-ecommerce-with-wordpress-and-bigcommerce-40dee194f8a) (Developer Blog)
