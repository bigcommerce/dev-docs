# Publishing an App

<div class="otp" id="no-index">

### On this page

- [Before you begin](#before-you-begin)
- [Provide a summary](#provide-a-summary)
- [Fill in details](#fill-in-details)
- [Add technical information](#add-technical-information)
- [Review submission](#review-submission)
- [Preview the listing](#preview-the-listing)
- [Submit your app for approval](#submit-your-app-for-approval)
- [FAQ](#faq)
- [Next steps](#next-steps)
- [Resources](#resources)

</div>

After completing development, verifying best practices, and checking approval requirements, you may submit your app for Marketplace approval in [DevTools](https://devtools.bigcommerce.com/). This article takes you step-by-step through the submission form and provides descriptions for each field.


## Before you begin

Your listing on the [Apps Marketplace](https://www.bigcommerce.com/apps/) plays a major role in your app's success. A good listing accomplishes three goals:
*  Shows users how your platform or solution differs from competitive offerings
* Includes keywords so prospective users can find your listing in searches
* Sets up clear and accurate user expectations as to your solution's features and functionality


Before you begin completing the app registration, we recommend prepping the following assets:
* Company logos
* Screenshots and video content
* Case studies

We also recommend giving special attention to the following search indexed fields:
* App name
* App summary
* App category

## Provide a summary

To begin the app certification process, we'll need some basic information about you.

![DevTools 01](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/devtools-tutorial-01.png  "DevTools 01")

| Field           | Description                                                                                            |
| --------------- | ------------------------------------------------------------------------------------------------------ |
| Contact Name    | email address created when applying for your Partner ID                                                |
| Partner Name    | name of your company​; attributed on the detail page                                                    |
| Partner Website | URL to your homepage                                                                                   |
| Support Email   | business mail where users can get help with the app                                                    |
| Support Website | used for ** Get Support** button in Marketplace                                                        |
| Partner ID      | required for submission                                                                                |
| App Name        | brand name given to app for titles and app content; should not include taglines or descriptors         |
| App Logo        | Primary app logo; should be 350 x 130px with a white background and dark branding with no taglines     |

| App Icon        | shown on main app detail page and left nav in control panel once installed; should be 200 x 200px      |

| Price           | app's starting price; if offering free plan, choose **Free**; specify details in **Other** selection   |
| App Summary     | app tagline used in the marketplace category and search results; 128 character max                            |

| Category        | marketplace category for app; used as search attribute; BigCommerce may re-categorize prior to launch  |

## Fill in details

Provide a helpful description with screenshots and a video to promote your app. We recommend bullet points followed by short paragraphs with headers. Aim for 200 words in total.


![DevTools 02](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/devtools-tutorial-02.png  "DevTools 02")

| Field                  | Description                                                                |
| ---------------------- | -------------------------------------------------------------------------- |
| Multiple Users         | optionally allow your app to be accessible to store users other than owner |
| App Type               | type of app; single-Click recommended                                      |
| Auth Callback URL      | requested when `install` clicked                                           |
| Load Callback URL      | requested when user launches app                                           |
| Uninstall Callback URL | requested when store owner clicks uninstall                                |
| OAuth Scopes           | OAuth scopes the app requires                                              |
| Test Instructions      | instructions needed to test the app thoroughly                             |

## Add technical information

Specify app type, multiple users support, callback URLs, and OAuth scopes; and, provide detailed testing instructions.

![DevTools 03](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/devtools-tutorial-03.png  "DevTools 03")

| Field                      | Description                                                                                                                        |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| App Details                | value proposition; avoid fluff or buzzwords; not be indexed for search; `200` words max                                            |
| Videos                     | videos highlighting purpose and value of your app                                                                                  |
| Case Studies               | case studies demonstrating how merchants have benefited from using your app. 4 max                                               |

| Features                   | app's major features; include title and description for each; title is search indexed; rich text accepted; 5 max                 |

| Legal Termals & Privacy    | app privacy policy and ToS links; legally required                                                                                 |
| International Optimization | Countries app optimized for and countries app does not support                                                                     |
| Help Guides                | Links to app's user and installation guides; highly recommended                                                                    |
| App Screenshot             | screenshots of app UI inside BigCommerce                                                                                           |
| Alternate Logo             | used if app featured in Marketplace carousel; should be 259 x 158px (or larger at ratio); dark background and light branding; no taglines  |


## Review submission

Review the information added before submitting the app.

![DevTools 04](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/devtools-tutorial-04.png  "DevTools 04")

## Preview the listing

This is an approximation of what the app's page will look like in the Apps Marketplace.

![DevTools 05](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/devtools-tutorial-05.png  "DevTools 05")

## Submit your app for approval

Ensure all information is complete; test the app before submitting for review.

![DevTools 06](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/devtools-tutorial-06.png "DevTools 06")

If you have any questions about your submission, email `appstore@bigcommerce.com`.

## FAQ

**Are all fields required?**

While not all fields are required to publish edits for your listing, they are all highly recommended. Without filling in all fields, your listing will be missing information that merchants have seen on other listings and expect to see throughout the Marketplace.

**Am I able to preview the changes to my listing before publishing them?**

Yes! With the updated fields in the Developer Portal, we're also adding the ability to
preview how these changes will appear on the BigCommerce Marketplace. You will see the option to preview on a new step after Review when editing your listing.

**Is there a draft status for these changes, or will saving make them live?**

Any changes you save will take effect immediately, so make sure you're ready to push them out to the Marketplace before saving.

**I've logged in to the DevTools, but I don't see my published listing. Where is it?**

You may have logged in with the wrong account. Each listing can only be owned by one user, so it is likely assigned to another email address. If you're unable to track down the correct owner account for your solution, please reach out to appstore@bigcommerce.com.

**I saved my changes, but my listing has not updated yet. What's the problem?**

The changes will be effective immediately in your control panel app card, but the updates
can take up to 24 hours to appear on the Apps Marketplace. Feel free to use this as a grace period to make edits as needed.

## Next steps
[Review the Apps Marketplace listing guide](https://grow.bigcommerce.com/rs/695-JJT-333/images/Updated_List_of_App_Fields_for_Tech_Partners.pdf) (PDF).

## Resources

### Sample apps
* [Python / Flask](https://github.com/bigcommerce/hello-world-app-python-flask)
* [PHP / Silex](https://github.com/bigcommerce/hello-world-app-php-silex)
* [Ruby / Sinatra](https://github.com/bigcommerce/hello-world-app-ruby-sinatra)
* [Laravel / React](https://github.com/bigcommerce/laravel-react-sample-app)
* [Node / FaunaDB / Nelify](https://github.com/bigcommerce/channels-app/)

### Tools
* [Node API Client](https://github.com/getconversio/node-bigcommerce)
* [Python API Client](https://github.com/bigcommerce/bigcommerce-api-python)
* [PHP API Client](https://github.com/bigcommerce/bigcommerce-api-php)
* [Ruby API Client](https://github.com/bigcommerce/bigcommerce-api-ruby)
* [Ruby OmniAuth Gem](https://github.com/bigcommerce/omniauth-bigcommerce)
* [Big Design Developer Playground](https://developer.bigcommerce.com/big-design/)
* [Figma UI Kit](https://www.figma.com/file/jTVuUkiZ1j3rux8WHG4IKK/BigDesign-UI-Kit?node-id=0%3A1/duplicate)
* [Adobe Illustrator UI Kit](https://design.bigcommerce.com/bigdesign-ui-kit)

### Blog posts
* [How to Test App Authentication Locally with ngrok](https://medium.com/bigcommerce-developer-blog/how-to-test-app-authentication-locally-with-ngrok-149150bfe4cf)
* [Building a BigCommerce App Using Laravel and React](https://medium.com/bigcommerce-developer-blog/building-a-bigcommerce-app-using-laravel-and-react-711ceceb5006)
* [Big Design Tutorial](https://medium.com/bigcommerce-developer-blog/bigdesign-build-native-looking-uis-with-the-bigcommerce-design-system-fb06a01a24f2)
