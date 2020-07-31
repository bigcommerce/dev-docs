# Managing Apps in DevTools

<div class="otp" id="no-index">

### On This Page
- [Login to DevTools](#login-to-devtools)
- [Create an App](#create-an-app)
- [Provide an App Summary](#provide-an-app-summary)
- [Fill in App Details](#fill-in-app-details)
- [Add Technical Information](#add-technical-information)
- [Review Submission](#review-submission)
- [Submit App](#submit-app)
- [Best Practices](#best-practices)
- [Resources](#resources)

</div>

## Login to DevTools
Login to (or create) your BigCommerce [Developer Portal](https://devtools.bigcommerce.com) account at [devtools.bigcommerce.com](https://devtools.bigcommerce.com).

## Create an App
To create a new app, navigate to **My Apps** (top-right corner), then:
1. Click **Create an app**
2. Give your app a name (only be visible to you)
3. Click **Create** (a pop up box will display showing Your Profile, App Summary and Category)

![DevTools 00](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/devtools-tutorial-00.png "DevTools 00")

## Provide an App Summary

![DevTools 01](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/devtools-tutorial-01.png  "DevTools 01")

| Field                      | Description                                                                                                                                                 |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Contact Name               | Email address that was created when applying for your Partner ID                                                                                            |
| Partner Name               | Name of your company​; attributed on the detail page                                                                                                         |
| Partner Website            | URL to your homepage                                                                                                                                        |
| Support Email              | Email where users can get help with the app. This should be a business address rather than personal email.                                                  |
| Support Website            | Use by "Get Support” button in Marketplace.                                                                                                                 |
| Partner ID                 | Required for app submission                                                                                                                                 |
| App Name                   | Brand name you’ve given app for title throughout your app content;  should be a concise; should not include taglines or descriptors.                        |
| App Logo                   | Primary app logo; should be `350x130px` with a white background and dark branding with no taglines.                                                         |
| App Icon                   | Included on the main app detail page and sidebar in BigCommerce control panel once installed. Should be `200x200px`.                                        |
| Price                      | Select app’s starting price. If offering forever-free plan, choose “Free” option. If app does not fit options, specify details in “Other” selection.        |
| App Summary                | Short tagline of your app use on ard in category and search results in the Marketplace. `128` char max.                                                     |
| Category                   | Choose most appropriate category for app; used as search attribut; BigCommerce may re-categorize listing prior to launch.                                   |

## Fill in App Details

![DevTools 02](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/devtools-tutorial-02.png  "DevTools 02")

| Field                      | Description                                                                                                                                                 |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Multiple Users             | By default, your app will only be accessible to the store owner; optionally, you can allow your app to be accessible to other store users                   |
| App Type                   | Select the type of app. Single-Click recommended.                                                                                                           |
| Auth Callback URL          | Requested by BigCommerce OAuth Flow                                                                                                                         |
| Load Callback URL          | Requested by BigCommerce after user clicks install                                                                                                          |
| Uninstall Callback URL     | Requested by BigCommerce after user clicks uninstall                                                                                                        |
| OAuth Scopes               | OAuth scopes the app requires; if unsure, request minimal permissions to get started.                                                                       |
| Test Instructions          | Add in any instructions needed to test the app thoroughly.                                                                                                  |

## Add Technical Information

![DevTools 03](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/devtools-tutorial-03.png  "DevTools 03")

| Field                      | Description                                                                                                                                                 |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| App Details                | In-depth value proposition; avoid using fluff or buzzwords; field will not be indexed for search; `200` words max.                                          |
| Videos                     | Videos that highlight the purpose and value of the app. Select the video hosting platform (YouTube or Vimeo) and enter the video ID.                        |
| Case Studies               | “Thought Leadership” case studies or traditional case studies that demonstrate how BigCommerce merchants have benefited from using the app. `4` max.        |
| Features                   | Major features app offers. Include a brief title and description for each; feature title is search indexed in the Marketplace; rich text accepted. `5` max. |
| Legal Termals & Privacy    | Links to app privacy policy and terms of service; required due to legal liability.                                                                          |
| International Optimization | Countries app optimized for and countries app does not support.                                                                                             |
| Help Guides                | Links to your User and Installation Guides for existing users and prospects; highly recommended.                                                            |
| App Screenshot             | Add screenshots of your solution’s functionality or user interface as it appears when integrated with BigCommerce so users know what to expect.             |
| Alternate Logo             | Used if app featured on homepage carousel in Marketplace. Should be `259x158px` (or larger at ratio); dark background and light branding; no taglines.      |

## Review Submission
![DevTools 04](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/devtools-tutorial-04.png  "DevTools 04")

## Submit App

![DevTools 05](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/devtools-tutorial-05.png  "DevTools 05")

At this point you make sure the information has been filled out completely and the app has been thoroughly tested before submitting for review. Updates to the App will not require the submission fee again.

## Best Practices

### Videos

**YouTube**
* Turn off ads for any videos you've already uploaded.
  1. Sign in to YouTube.
  2. In the top right, click your account icon > Creator Studio.
  3. On the left, select Video Manager.
  4. Select the video(s) where you want to turn ads off.
  5. Click Actions > More actions > Monetization.
  6. Select Off.
  7. Click Submit.

**Vimeo**
* Per Vimeo’s guidelines, businesses may not use Basic or Plus accounts to host videos. If you want to upload commercial videos, you must use Vimeo PRO or Business. Commercial content includes:
  * Videos promoting or representing a for-profit business or brand
  * Videos containing any form of advertising
  * Videos hosted on behalf of a business (i.e., uploaded to Vimeo and embedded on your company’s website)
  * Product demos and tutorials

**Note:** Ads appear to viewers based on their level of Vimeo membership - not yours. Basic and non-logged in viewers may see ad banners below the video player.

## Resources

* [Media Kit](https://www.bigcommerce.com/press/media-kit/) (BigCommerce)
* [Partner Portal](https://partners.bigcommerce.com/English/) (BigCommerce)
* [Technology Partner Program](https://partners.bigcommerce.com/English/register_email.aspx) (BigCommerce)
* [Dev Tools](https://devtools.bigcommerce.com/) (BigCommerce)
* [BigCommerce Marketplace](https://www.bigcommerce.com/apps/) (BigCommerce)

### Related Articles
* [Building Apps](https://developer.bigcommerce.com/api-docs/getting-started/building-apps-bigcommerce/building-apps)
* [Supported Browsers](https://support.bigcommerce.com/s/article/Themes-Supported-Browsers) (Knowledge Base)

