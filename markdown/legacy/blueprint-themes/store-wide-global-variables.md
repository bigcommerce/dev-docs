<h1>Store-Wide Global Variables</h1>


The following GLOBAL variables are available from any layout, panel, or snippet in the store, independent of session status.

| Variable | Description |
| --- | --- |
| `%%GLOBAL_AllPricesAreInCurrency%%` | This variable produces a text string that identifies the currency currently active on the store. For example: <NOBR>`All Prices are in USD`</nobr> |
| `%%GLOBAL_AlternateClass%%` | . |
| `%%GLOBAL_CdnAppPath%%` | The URI of the CDN application. |
| `%%GLOBAL_CdnStorePath%%` | The URI to the store's CDN directory. |
| `%%GLOBAL_CharacterSet%%` | The character set currently active on the store. For example, UTF-8. |
| `%%GLOBAL_CheckoutLink%%` | The URI that initiates a checkout sequence. |
| `%%GLOBAL_CurrentCustomerFirstName%%` | The first name of the customer who is currently logged in. If no customer is logged in, returns: `Guest` |
| `%%GLOBAL_CurrentCustomerLastName%%` | The last name of the customer who is currently logged in. If no customer is logged in, returns no content. |
| `%%GLOBAL_CustomerGroupId%%` | The ID of the customer group for the currently logged-in user or guest. Blank if none. |
| `%%GLOBAL_CustomerGroupName%%` | The name of the customer group for the currently logged-in user or guest. Blank if none. |
| `%%GLOBAL_Favicon%%` | The URI location of the favicon file. |
| `%%GLOBAL_HeaderLogo%%` | The store's logo. This can be either an image file or an HTML-formatted text string. |
| `%%GLOBAL_ImageDirectory%%` | The name of the images directory. |
| `%%GLOBAL_IMG_PATH%%` | The URI of the directory in which the site's image files reside. |
| `%%GLOBAL_jQueryPath%%` | The URI of the minified jQuery library in use. For example:<br>`https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js` |
| `%%GLOBAL_jQueryUIPath%%` | The path to the jQuery UI script. For example:<br> `https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui.js` |
| `%%GLOBAL_LiveChatCodeEnabled%%` | A value representing whether Live Chat is enabled or disabled. For example: `none` |
| `%%GLOBAL_LoginOrLogoutText%%` | The HTML code of the string (including links) providing the option to sign into the store or to log out. For example: <NOBR>`Sign in or Create an account`</nobr> |
| `%%GLOBAL_LogoText%%` | The text string used for the store logo. |
| `%%GLOBAL_MASTER_THEME_PATH%%` | The URI of the __master theme directory. |
| `%%GLOBAL_PageLink%%` | The URI of the page. |
| `%%GLOBAL_PageName%%` | The name of the page. For example: <NOBR>`RSS Syndication`</nobr> |
| `%%GLOBAL_PoweredBy%%` | The string identifying the software used by the store. For example: `Shopping Cart Software by BigCommerce` |
| `%%GLOBAL_SHARED_GIFT_THEME_PATH%%` | The CDN URI of the store's gift themes. |
| `%%GLOBAL_ShopPath%%` | The store's URI. If the page is protected with TLS/SSL, this will be an HTTPS path. |
| `%%GLOBAL_ShopPathNormal%%` | The unencrypted URI of the store, prefixed with HTTP. |
| `%%GLOBAL_ShopPathSSL%%` | The encrypted URI of the store, prefixed with HTTPS. |
| `%%GLOBAL_ShowCookieWarningMessage%%` | A boolean value that represents whether or not the display of a cookie warning message is enabled or disabled. |
| `%%GLOBAL_SiteColor%%` | The current template's active color scheme. |
| `%%GLOBAL_SitemapURL_HTML%%` | The URI to the store's site map directory. |
| `%%GLOBAL_SocialMedia_Service_Class%%` | The name of the social media class. For example: `#FFFFFF` |
| `%%GLOBAL_SocialMedia_Service_Url%%` | The URI to the social media service. |
| `%%GLOBAL_SocialMediaService_Name%%` | The name of the social media service. For example: `LinkedIn` |
| `%%GLOBAL_StoreLogo%%` | The file name of the store logo image. |
| `%%GLOBAL_StoreName%%` | The name of the store. |
| `%%GLOBAL_StorePhoneNumber%%` | The phone number of the store. |
| `%%GLOBAL_STYLE_PATH%%` | The CDN URI of the active theme's styles directory. |
| `%%GLOBAL_SwapFrequency%%` | . |
| `%%GLOBAL_TPL_PATH%%` | The CDN URI of the theme. |
| `%%GLOBAL_value%%` | The type of value. For example: `Array` |
| `%%GLOBAL_Year%%` | The current year. For example: `2015` |

