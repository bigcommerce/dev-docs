<h1>App Store Approval Requirements</h1>
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
		<li><a href="#app-store-approval-requirements_prerequisites">Prerequisites</a></li>
		<li><a href="#app-store-approval-requirements_general-requirements">General Requirements</a></li>
		<li><a href="#app-store-approval-requirements_functionality">Functionality</a></li>
        <li><a href="#app-store-approval-requirements_installation">Installation</a></li>
        <li><a href="#app-store-approval-requirements_recommendations">Recommendations</a></li>
        <li><a href="#app-store-approval-requirements_dev-tools-walkthrough">Dev Tools Walkthrough</a></li>
	</ul>
</div>

Dev Tools is the BigCommerce workspace for developing single-click apps. Within Dev Tools, you'll create the Client Id and Client Secret to authenticate your apps, submit new apps to the App Marketplace, and manage existing Marketplace listings.

Dev Tools can be found by clicking [My Apps](https://devtools.bigcommerce.com/) in the upper right corner of the page. 

The requirements to submit an app are listed below, as well as where the information needs to be updated.



<a href='#app-store-approval-requirements_prerequisites' aria-hidden='true' class='block-anchor'  id='app-store-approval-requirements_prerequisites'><i aria-hidden='true' class='linkify icon'></i></a>

## Prerequisites

Make sure you’ve applied and been approved for our [Technology Partner Program](https://partners.bigcommerce.com/English/register_email.aspx) before you’re ready to submit your app - you’ll need a valid Partner ID to do so. You’ll also need to accept the Terms & Conditions in the [Partner Portal](https://partners.bigcommerce.com/English/) before we can publish your app.



<a href='#app-store-approval-requirements_general-requirements' aria-hidden='true' class='block-anchor'  id='app-store-approval-requirements_general-requirements'><i aria-hidden='true' class='linkify icon'></i></a>

## General Requirements

-   Support resources should be available throughout the app experience, including in your onboarding flow and the app’s dashboard.
    
-   Make sure to reference BigCommerce using the proper formatting. You can visit our [Media Kit](https://www.bigcommerce.com/press/media-kit/) for any BigCommerce branding assets needed.
    
-   The app and app listing should make no references to competitor platforms.

-   Use the brand name you’ve given your app for your app title throughout your app content. This listing name should be a concise title for easy identification and should not include additional taglines or descriptors. The name will always appear alongside your summary, so there’s no need to muddy your app’s branding with duplicate content when that tagline is already displayed with it!  
      
    - If your solution is a connector to a specific third-party service, or you’re offering only a specific feature, make sure to include both the name of the third party service or feature and your company name (Ex: “Marketplace by BigCommerce”, “Search by BigCommerce”), with your company name following the feature.
    
-   Your app, including any storefront components, should be compatible with all [browsers](https://support.bigcommerce.com/s/article/Themes-Supported-Browsers) that the BigCommerce platform supports.




<a href='#app-store-approval-requirements_functionality' aria-hidden='true' class='block-anchor'  id='app-store-approval-requirements_functionality'><i aria-hidden='true' class='linkify icon'></i></a>

## Functionality

-   Your app must work as intended, be free of defects, and not conflict with or break any default BigCommerce functionality, including the BigCommerce storefront and checkout.
    
-   Utilize any V3 API resources that are currently available for the data you need from a BigCommerce store.
    
-   The dashboard and callback URLs for your app should operate strictly over HTTPS using a valid SSL certificate.
    
-   Apps should offer [multi-user support](https://developer.bigcommerce.com/api-docs/getting-started/building-apps-bigcommerce/building-apps#building-apps_multi-user-support) so that permissions for the app can be distributed by the store owner to additional users, from the BigCommerce control panel.
    
-   Any apps that process transactions or handle credit card data will need to pass a PCI Compliance review with our Security team, and also be compatible with our Optimized One-Page Checkout.
    
-   Avoid copy/paste for storefront code - use the [Scripts API](https://developer.bigcommerce.com/api-reference/storefront/content-scripts-api) to programmatically inject code snippets into a store’s Script Manager and storefront theme.
    
-   If your app requires payment, you’ll need to collect payment from the user within your app. See Pricing & Categorization under App Summary for more information.



<a href='#app-store-approval-requirements_installation' aria-hidden='true' class='block-anchor'  id='app-store-approval-requirements_installation'><i aria-hidden='true' class='linkify icon'></i></a>

## Installation

-   Apps should be Single-Click and use our OAuth token exchange flow to authenticate the user
    
-   Single-Click does not mean everything  completed in one click, but that authentication is handled in that click - other tasks can be handled post-auth with the user
    
-   When the app is installed, a styled HTML page must be returned in the iframe of the BigCommerce control panel - this content cannot be blank and must follow our [user-interface constraints](https://developer.bigcommerce.com/api-docs/getting-started/building-apps-bigcommerce/building-apps#building-apps_user-interface-constraints).
    
-   During the OAuth handshake, be sure to store the user’s token against their store hash - rather than their email address - to avoid any problems with ownership changes or multi-user support.

<div class="HubBlock--callout">
<div class="CalloutBlock--">
<div class="HubBlock-content">
    
<!-- theme:  -->

> There is no way to re-display this pop-up after selecting Done, so be sure to securely store the credentials before leaving this screen.

</div>
</div>
</div>



<a href='#app-store-approval-requirements_recommendations' aria-hidden='true' class='block-anchor'  id='app-store-approval-requirements_recommendations'><i aria-hidden='true' class='linkify icon'></i></a>

## Recommendations

-   Have a form to fill out for new users? We recommend auto-filling user input fields with data from the [Store Information API resource](https://developer.bigcommerce.com/api-reference/store-management/store-information-api), which already contains much of the info you might need from a new user.
    
-   No account approval process needed for your app? Consider automatically generating accounts for stores that install your app and don’t match an existing store in your database.
    
-   Require login on launch? Use the information in the BigCommerce payload to your callback URL to authenticate the user without asking for a username and password each time.
    
-   Want to share user testimonials? Add a link to your full case study in the Case Studies field, with a title and short description.



## Dev Tools Walkthrough

Below are the screens you will go through when submitting an app through DevTools. Each tab shows the page along with the fields and descriptions. Each field needs to have the correct information for the app to be approved.

<a href='#app-store-approval-requirements_dev-tools-walkthrough' aria-hidden='true' class='block-anchor'  id='app-store-approval-requirements_dev-tools-walkthrough'><i aria-hidden='true' class='linkify icon'></i></a>

<div class="tab-block">
    {'children': [{'title': 'App Summary', 'blocks': [{'type': 'image', 'data': '//s3.amazonaws.com/user-content.stoplight.io/6012/1536259683439', 'header': {'anchor': 'app-summary'}}, {'type': 'text', 'data': '### Contact Name\nUse the email address that was created when applying for your Partner Id. \n\n### Partner Name\nList the name of your company\u200b, as you want it to be attributed on the detail page.\n\n### Partner Website\nProvide the URL for your homepage so users can learn more about your company.\n\n### Support email\nEmail where users can get help with the app. This should be a formal group email at your company domain (Ex: support@app-partner.com) rather than a personal email. If not provided, this option will not be displayed.\n\n### Support website\nA Support email and website for users to reach out as needed.\nThese will be publicly visible on the Marketplace, so make sure to stay away from personal emails or non-support URLs. Your public detail page will include a button for users to “Get Support,” which will take them to this URL in a new tab. If not provided, the button will not be displayed on your detail page.\n\n### Partner ID\nWhen you’re ready to submit your listing for review, you will need to enter your [Partner ID](https://partners.bigcommerce.com/English/register_email.aspx) for your Technology Partner account. This field is not required to create, save, or edit a Draft prior to submission. '}, {'type': 'image', 'data': '//s3.amazonaws.com/user-content.stoplight.io/6012/1536259722234'}, {'type': 'text', 'data': '### App Name\nUse the brand name you’ve given your app for your app title throughout your app content. This listing name should be a concise title for easy identification and should not include additional taglines or descriptors. The name will always appear alongside your summary, so there’s no need to muddy your app’s branding with duplicate content when that tagline is already displayed with it.\n\n#### Pricing & Categorization\nSelect one of our pre-formatted pricing options to call out your app’s starting price. If you offer a forever-free plan, choose the “Free” option. If your app does not fit one of our formatted options, specify your details in a few words in the “Other” selection.\n- If you need to specify more detail on your pricing options, save it for your app description.  \nChoose the most appropriate category for your app.'}, {'type': 'callout', 'data': {'body': 'If your solution is a connector to a specific third-party service, or you’re offering only a particular feature, make sure to include both the name of the third party service or feature and your company name\u200b (Ex: “Marketplace by BigCommerce,” “Search by BigCommerce”). The company name needs to follow the feature.'}}, {'type': 'text', 'data': '### App Logo\nYour primary app logo should be 350 x 130px (or larger at this ratio) with a white background and dark branding in the foreground. The logo should only include branding, no taglines necessary.\n\n### App Icon\nThe app icon will be included on the main app detail page and the sidebar in the BigCommerce control panel once the app is installed. This should be a square 200x200px image.\n\n### Price\nSelect one of our pre-formatted pricing options to call out your app’s starting price. If you offer a forever-free plan, choose the “Free” option. If your app does not fit one of our options, specify your details in a few words in the “Other” selection.'}, {'type': 'callout', 'data': {'body': 'If you need to specify more detail on your pricing options, save it for your app description.'}}, {'type': 'text', 'data': '### App Summary\nA short tagline description of your app that will be used on your app card in category and search results within the Marketplace. 128 characters max.\n\n### App Icon\nYour app icon will be included on the main app detail page and the sidebar in the BigCommerce control panel once the app is installed. This should be a square 200 x 200px image.\n\n### Category\nChoose the most appropriate category for your app. Take a look at the live [Marketplace](https://www.bigcommerce.com/apps/) for an idea of where solutions are currently assigned to help decide the right category. The category selection will also be a search attribute for your listing. BigCommerce will review your category assignment and may re-categorize your listing prior to launch. One category maximum.'}]}, {'title': 'Details', 'blocks': [{'type': 'image', 'data': '//s3.amazonaws.com/user-content.stoplight.io/6012/1536260365610', 'header': {'anchor': 'app-details'}}, {'type': 'text', 'data': "### App Details\nA more in-depth value proposition for your listing, including how your solution works, why your solution stands out in its category, and why a merchant should choose you over other competitors. Avoid using fluff or buzzwords, as this field will not be indexed for search. 200 words max recommended.\n\n### Videos\nInclude videos that highlight the purpose and value of your solution. Select the video hosting platform (YouTube or Vimeo) and enter the video ID.\n\n#### Video Best Practices\n\n**YouTube**\n\nTurn off ads for any videos you've already uploaded. \n\n1. Sign in to YouTube.\n\n2. In the top right, click your account icon > Creator Studio.\n\n3. On the left, select Video Manager.\n\n4. Select the video(s) where you want to turn ads off.\n\n5. Click Actions > More actions > Monetization.\n\n6. Select Off.\n\n7. Click Submit.\n\n**Vimeo**\n\nPer Vimeo’s guidelines, businesses may not use Basic or Plus accounts to host videos. If you want to upload commercial videos, you must use Vimeo PRO or Business. Commercial content includes:\n\nVideos promoting or representing a for-profit business or brand \nVideos containing any form of advertising \nVideos hosted on behalf of a business (i.e., uploaded to Vimeo and embedded on your company’s website) \nProduct demos and tutorials\n\n*Note:* Ads appear to viewers based on their level of Vimeo membership - not yours. Basic and non-logged in viewers may see ad banners below the video player.\n\n### Case Studies\nThese can either be “Thought Leadership” case studies and/or traditional case studies that demonstrate how BigCommerce merchants have benefited from using your solution with their business. Use the + \u200bicon to add a case study, and the x \u200bicon to remove. Four case studies maximum."}, {'type': 'callout', 'data': {'type': 'warning', 'body': 'Case studies that include competitor platforms are not allowed and will be removed. Partners will be required to repurpose general case studies, remove competitor platform mentions, and republish the asset accordingly.'}}, {'type': 'text', 'data': '### Features\nUse these fields to enumerate the major features your platform or solution has to offer. Include a brief title for each feature, and a description of the feature to accompany it. The feature title will be search indexed in the Marketplace, so be specific with your feature names and include major functions potential users will search for. Use the + icon to add a feature, and the x icon to remove. Utilize the rich text editing of these fields to bold, underline, or italicize copy as needed. \n\nUp to five features can be added.'}, {'type': 'image', 'data': '//s3.amazonaws.com/user-content.stoplight.io/6012/1536260434551'}, {'type': 'text', 'data': '### Legal Terms & Privacy \nLinks to your privacy policy and terms of service. This requirement is in place due to legal liability and is non-optional. \n\n### International Optimization\nPlease add the countries for which your solution is optimized and those which your solution does not currently support. '}, {'type': 'callout', 'data': {'type': 'info', 'body': 'This feature will not currently be utilized in the Marketplace, but will be a part of planned internationalization updates.'}}, {'type': 'text', 'data': '### Help Guides\nLinks to your User and Installation Guides as a reference for existing users and prospects.\n\nWe now ask that you include links to your solution’s user installation guide (PDF, support articles, etc.) and standard user guide for prospective users to review before installation. If you do not submit links, this field will not be displayed on your listing detail page, however we highly recommend including these with your submission.'}, {'type': 'image', 'data': '//s3.amazonaws.com/user-content.stoplight.io/6012/1536260486010'}, {'type': 'text', 'data': '### App Screenshot\nAdd screenshots of your solution’s functionality or user interface as it appears when integrated with BigCommerce so users know what to expect.\n\n### Alternate Logo\nYour alternate logo will be used if your app is featured on the homepage carousel of the Marketplace. This image should be 259 x 158px (or larger at this ratio) with a dark background and white or light branding in the foreground. The logo should only include branding, no taglines necessary.'}]}, {'title': 'Technical', 'blocks': [{'type': 'image', 'data': '//s3.amazonaws.com/user-content.stoplight.io/6012/1536260547856', 'header': {'anchor': 'app-technical'}}, {'type': 'text', 'data': '### Multiple Users\n\nBy default, your app will only be accessible to the store owner (i.e., the user who created the store). Optionally, you can allow your app to be accessible to other store users. Consider the following before enabling [multi-user support](/api-docs/getting-started/building-apps-bigcommerce/building-apps#multi-user-support):\n\n-   Once you enable multi-user support, a store admin will still need to grant access to other users from within the store control panel. For each user account, there are settings that grant access to specific apps.\n    \n-   Your app should be aware that when it receives the [Load Callback](/api-docs/getting-started/building-apps-bigcommerce/building-apps#load-uninstall-removal-requests), the user information passed in might not be the store owner’s. You’ll need to determine how to respond if you see a different user. For example, you may want to provision a new user account in order to personalize the experience.\n    \n-   You can optionally specify a [Remove User Callback URI](/api-docs/getting-started/building-apps-bigcommerce/building-apps#load-uninstall-removal-requests) to receive a callback when a store admin revokes a user’s access.\n    \n### App Type\n\nSelect the type of app. We recommend [Single Click Apps](/api-docs/getting-started/building-apps-bigcommerce/types-of-apps#single-click-apps) although some qualify to [Connector Apps.](/api-docs/getting-started/building-apps-bigcommerce/types-of-apps#connector)\n\n### Callback URLS\n\nYou must have an [Auth Callback URI](/api-docs/getting-started/building-apps-bigcommerce/building-apps#installation-update-sequence) and a [Load Callback URI](/api-docs/getting-started/building-apps-bigcommerce/building-apps#installation-update-sequence) to register your app.\n\n#### Public URIs Required before Submission\n\nBecause the Auth Callback URI and Load Callback URI requests originate from the browser and not from BigCommerce, you can use non–publicly-available URIs and a self-signed certificate for a quick start. However, you must switch to – and test your app with – a publicly available Auth Callback URI and Load Callback URI before submitting your app for consideration in the App Marketplace.\n\nIf you want to receive a callback when the store owner uninstalls your app, you can provide an [Uninstall Callback URI](/api-docs/getting-started/building-apps-bigcommerce/building-apps#load-uninstall-removal-requests).'}, {'type': 'image', 'data': '//s3.amazonaws.com/user-content.stoplight.io/6012/1536260600336'}, {'type': 'text', 'data': '### OAuth Scopes\nIf you know the [OAuth scopes](/api-docs/getting-started/about-api/authentication#oauth-scopes) that your app requires, you should select these. If you do not yet know the scopes that you need, you can just request minimal permissions (such as Information: Read-Only) to get started. However, once you determine the scopes you need, you must:\n- Modify the scopes of your app in My Apps and save the changes.\n- Obtain the new OAuth token during the [App Installation or Update flow](https://developer.bigcommerce.com/api/#app-installation-and-update-sequence).\n- Retest your app to make sure it still functions properly with the new token.'}, {'type': 'image', 'data': '//s3.amazonaws.com/user-content.stoplight.io/6012/1536260650757'}, {'type': 'text', 'data': 'Add in any instructions needed to test the app thoroughly. '}]}, {'title': 'Review', 'blocks': [{'type': 'image', 'data': '//s3.amazonaws.com/user-content.stoplight.io/6012/1536260677950', 'header': {'anchor': 'app-review'}}, {'type': 'text', 'data': 'Review the information added before submitting the app. Look over this page carefully, once the app is submitted, if it is rejected there will be another fee for submission.'}]}, {'title': 'Preview', 'blocks': [{'type': 'image', 'data': '//s3.amazonaws.com/user-content.stoplight.io/6012/1536261272003', 'header': {'anchor': 'app-preview'}}, {'type': 'text', 'data': 'This is an approximation of what the app’s page will look like in the BigCommerce Marketplace.'}]}, {'title': 'Payment & Submission', 'blocks': [{'type': 'image', 'data': '//s3.amazonaws.com/user-content.stoplight.io/6012/1536261347648', 'header': {'anchor': 'app-payment'}}, {'type': 'text', 'data': 'At this point you make sure the information has been filled out completely and the app has been thoroughly tested before submitting for review. Updates to the App will not require the submission fee again. '}]}]}
</div>



## Resources
### Related Endpoints
* [Store Information API resource](https://developer.bigcommerce.com/api-reference/store-management/store-information-api)
* [Scripts API](https://developer.bigcommerce.com/api-reference/storefront/content-scripts-api)
### Related Articles
* [Building Apps](https://developer.bigcommerce.com/api-docs/getting-started/building-apps-bigcommerce/building-apps)
* [Support Browsers](https://support.bigcommerce.com/s/article/Themes-Supported-Browsers) (Knowledge Base)
* [Media Kit](https://www.bigcommerce.com/press/media-kit/) (BigCommerce)
* [Partner Portal](https://partners.bigcommerce.com/English/) (BigCommerce)
* [Technology Partner Program](https://partners.bigcommerce.com/English/register_email.aspx) (BigCommerce)
* [Dev Tools](https://devtools.bigcommerce.com/) (BigCommerce)
* [BigCommerce Marketplace](https://www.bigcommerce.com/apps/) (BigCommerce)

