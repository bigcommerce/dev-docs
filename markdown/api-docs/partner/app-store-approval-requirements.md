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
        <li><a href="#app-store-approval-requirements_app_summary">Dev Tools  - App Summary</a></li>
         <li><a href="#app-store-approval-requirements_details">Dev Tool - Details</a></li>
          <li><a href="#app-store-approval-requirements_technical">Dev Tool - Technical</a></li>
            <li><a href="#app-store-approval-requirements_review">Dev Tool - Review</a></li>
              <li><a href="#app-store-approval-requirements_preview">Dev Tool - Preview</a></li>
               <li><a href="#app-store-approval-requirements_payment-submission">Dev Tool - Payment & Submission</a></li>
	</ul>
</div>

---

Dev Tools is the BigCommerce workspace for developing single-click apps. Within Dev Tools, you'll create the Client Id and Client Secret to authenticate your apps, submit new apps to the App Marketplace, and manage existing Marketplace listings.

Dev Tools can be found by clicking [My Apps](https://devtools.bigcommerce.com/) in the upper right corner of the page. 

The requirements to submit an app are listed below, as well as where the information needs to be updated.

---

<a href='#app-store-approval-requirements_prerequisites' aria-hidden='true' class='block-anchor'  id='app-store-approval-requirements_prerequisites'><i aria-hidden='true' class='linkify icon'></i></a>

## Prerequisites

Make sure you’ve applied and been approved for our [Technology Partner Program](https://partners.bigcommerce.com/English/register_email.aspx) before you’re ready to submit your app - you’ll need a valid Partner ID to do so. You’ll also need to accept the Terms & Conditions in the [Partner Portal](https://partners.bigcommerce.com/English/) before we can publish your app.

---

<a href='#app-store-approval-requirements_general-requirements' aria-hidden='true' class='block-anchor'  id='app-store-approval-requirements_general-requirements'><i aria-hidden='true' class='linkify icon'></i></a>

## General Requirements

-   Support resources should be available throughout the app experience, including in your onboarding flow and the app’s dashboard.
    
-   Make sure to reference BigCommerce using the proper formatting. You can visit our [Media Kit](https://www.bigcommerce.com/press/media-kit/) for any BigCommerce branding assets needed.
    
-   The app and app listing should make no references to competitor platforms.

-   Use the brand name you’ve given your app for your app title throughout your app content. This listing name should be a concise title for easy identification and should not include additional taglines or descriptors. The name will always appear alongside your summary, so there’s no need to muddy your app’s branding with duplicate content when that tagline is already displayed with it!  
      
    - If your solution is a connector to a specific third-party service, or you’re offering only a specific feature, make sure to include both the name of the third party service or feature and your company name (Ex: “Marketplace by BigCommerce”, “Search by BigCommerce”), with your company name following the feature.
    
-   Your app, including any storefront components, should be compatible with all [browsers](https://support.bigcommerce.com/s/article/Themes-Supported-Browsers) that the BigCommerce platform supports.


---

<a href='#app-store-approval-requirements_functionality' aria-hidden='true' class='block-anchor'  id='app-store-approval-requirements_functionality'><i aria-hidden='true' class='linkify icon'></i></a>

## Functionality

-   Your app must work as intended, be free of defects, and not conflict with or break any default BigCommerce functionality, including the BigCommerce storefront and checkout.
    
-   Utilize any V3 API resources that are currently available for the data you need from a BigCommerce store.
    
-   The dashboard and callback URLs for your app should operate strictly over HTTPS using a valid SSL certificate.
    
-   Apps should offer [multi-user support](https://developer.bigcommerce.com/api-docs/getting-started/building-apps-bigcommerce/building-apps#building-apps_multi-user-support) so that permissions for the app can be distributed by the store owner to additional users, from the BigCommerce control panel.
    
-   Any apps that process transactions or handle credit card data will need to pass a PCI Compliance review with our Security team, and also be compatible with our Optimized One-Page Checkout.
    
-   Avoid copy/paste for storefront code - use the [Scripts API](https://developer.bigcommerce.com/api-reference/storefront/content-scripts-api) to programmatically inject code snippets into a store’s Script Manager and storefront theme.
    
-   If your app requires payment, you’ll need to collect payment from the user within your app. See Pricing & Categorization under App Summary for more information.

---

<a href='#app-store-approval-requirements_installation' aria-hidden='true' class='block-anchor'  id='app-store-approval-requirements_installation'><i aria-hidden='true' class='linkify icon'></i></a>

## Installation

-   Apps should be Single-Click and use our OAuth token exchange flow to authenticate the user
    
-   Single-Click does not mean everything  completed in one click, but that authentication is handled in that click - other tasks can be handled post-auth with the user
    
-   When the app is installed, a styled HTML page must be returned in the iframe of the BigCommerce control panel - this content cannot be blank and must follow our [user-interface constraints](https://developer.bigcommerce.com/api-docs/getting-started/building-apps-bigcommerce/building-apps#building-apps_user-interface-constraints).
    
-   During the OAuth handshake, be sure to store the user’s token against their store hash - rather than their email address - to avoid any problems with ownership changes or multi-user support.

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">
    
<!-- theme:  -->
### Meeting the requirements
> If your app cannot meet these requirements, please reach out to <a href="mailto:appstore@bigcommerce.com">appstore@bigcommerce.com</a> in order to discuss the potential for a Connector app listing. In the majority of cases, a Single-Click app will be the more appropriate solution and put your integration on par with other Marketplace partners, but exceptions may be made under certain circumstances

</div>
</div>
</div>

---

<a href='#app-store-approval-requirements_recommendations' aria-hidden='true' class='block-anchor'  id='app-store-approval-requirements_recommendations'><i aria-hidden='true' class='linkify icon'></i></a>

## Recommendations

-   Have a form to fill out for new users? We recommend auto-filling user input fields with data from the [Store Information API resource](https://developer.bigcommerce.com/api-reference/store-management/store-information-api), which already contains much of the info you might need from a new user.
    
-   No account approval process needed for your app? Consider automatically generating accounts for stores that install your app and don’t match an existing store in your database.
    
-   Require login on launch? Use the information in the BigCommerce payload to your callback URL to authenticate the user without asking for a username and password each time.
    
-   Want to share user testimonials? Add a link to your full case study in the Case Studies field, with a title and short description.

---

## Dev Tools Walkthrough

Below are the screens you will go through when submitting an app through DevTools. Each tab shows the page along with the fields and descriptions. Each field needs to have the correct information for the app to be approved.

<a href='#app-store-approval-requirements_dev-tools-walkthrough' aria-hidden='true' class='block-anchor'  id='app-store-approval-requirements_dev-tools-walkthrough'><i aria-hidden='true' class='linkify icon'></i></a>

 ---
<a id="app-store-approval-requirements_app_summary"></a>

## App Summary

![App Summary](https://s3.amazonaws.com/user-content.stoplight.io/6012/1536259683439)

### Contact Name
Use the email address that was created when applying for your Partner Id. 

### Partner Name
List the name of your company​, as you want it to be attributed on the detail page.

### Partner Website
Provide the URL for your homepage so users can learn more about your company.

### Support email
Email where users can get help with the app. This should be a formal group email at your company domain (Ex: support@app-partner.com) rather than a personal email. If not provided, this option will not be displayed.

### Support website
A Support email and website for users to reach out as needed.
These will be publicly visible on the Marketplace, so make sure to stay away from personal emails or non-support URLs. Your public detail page will include a button for users to “Get Support,” which will take them to this URL in a new tab. If not provided, the button will not be displayed on your detail page.

###  Partner ID
When you’re ready to submit your listing for review, you will need to enter your [Partner ID](https://partners.bigcommerce.com/English/register_email.aspx) for your Technology Partner account. This field is not required to create, save, or edit a Draft prior to submission. 


![App Summary Part Two](https://s3.amazonaws.com/user-content.stoplight.io/6012/1536259722234)

### App Name
Use the brand name you’ve given your app for your app title throughout your app content. This listing name should be a concise title for easy identification and should not include additional taglines or descriptors. The name will always appear alongside your summary, so there’s no need to muddy your app’s branding with duplicate content when that tagline is already displayed with it.

#### Pricing & Categorization
Select one of our pre-formatted pricing options to call out your app’s starting price. If you offer a forever-free plan, choose the “Free” option. If your app does not fit one of our formatted options, specify your details in a few words in the “Other” selection.
- If you need to specify more detail on your pricing options, save it for your app description.  
Choose the most appropriate category for your app.

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">
    
<!-- theme: info -->

### Connector Apps
> If your solution is a connector to a specific third-party service, or you’re offering only a particular feature, make sure to include both the name of the third party service or feature and your company name​ (Ex: “Marketplace by BigCommerce,” “Search by BigCommerce”). The company name needs to follow the feature.

</div>
</div>
</div>


### App Logo
Your primary app logo should be 350 x 130px (or larger at this ratio) with a white background and dark branding in the foreground. The logo should only include branding, no taglines necessary.

### App Icon
The app icon will be included on the main app detail page and the sidebar in the BigCommerce control panel once the app is installed. This should be a square 200x200px image.

### Price
Select one of our pre-formatted pricing options to call out your app’s starting price. If you offer a forever-free plan, choose the “Free” option. If your app does not fit one of our options, specify your details in a few words in the “Other” selection.

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">
    
<!-- theme: info -->

### Pricing Details
> If you need to specify more detail on your pricing options, save it for your app description.

</div>
</div>
</div>

### App Summary
A short tagline description of your app that will be used on your app card in category and search results within the Marketplace. 128 characters max.

### App Icon
Your app icon will be included on the main app detail page and the sidebar in the BigCommerce control panel once the app is installed. This should be a square 200 x 200px image.

### Category
Choose the most appropriate category for your app. Take a look at the live [Marketplace](https://www.bigcommerce.com/apps/) for an idea of where solutions are currently assigned to help decide the right category. The category selection will also be a search attribute for your listing. BigCommerce will review your category assignment and may re-categorize your listing prior to launch. One category maximum.

---
<a id="app-store-approval-requirements_details"></a>

## Details

![Details](https://s3.amazonaws.com/user-content.stoplight.io/6012/1536260365610)


### App Details
A more in-depth value proposition for your listing, including how your solution works, why your solution stands out in its category, and why a merchant should choose you over other competitors. Avoid using fluff or buzzwords, as this field will not be indexed for search. 200 words max recommended.

### Videos
Include videos that highlight the purpose and value of your solution. Select the video hosting platform (YouTube or Vimeo) and enter the video ID.

#### Video Best Practices

**YouTube**

Turn off ads for any videos you've already uploaded. 

1. Sign in to YouTube.

2. In the top right, click your account icon > Creator Studio.

3. On the left, select Video Manager.

4. Select the video(s) where you want to turn ads off.

5. Click Actions > More actions > Monetization.

6. Select Off.

7. Click Submit.

**Vimeo**

Per Vimeo’s guidelines, businesses may not use Basic or Plus accounts to host videos. If you want to upload commercial videos, you must use Vimeo PRO or Business. Commercial content includes:

Videos promoting or representing a for-profit business or brand 
Videos containing any form of advertising 
Videos hosted on behalf of a business (i.e., uploaded to Vimeo and embedded on your company’s website) 
Product demos and tutorials

*Note:* Ads appear to viewers based on their level of Vimeo membership - not yours. Basic and non-logged in viewers may see ad banners below the video player.

### Case Studies
These can either be “Thought Leadership” case studies and/or traditional case studies that demonstrate how BigCommerce merchants have benefited from using your solution with their business. Use the + ​icon to add a case study, and the x ​icon to remove. Four case studies maximum.

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">
    
<!-- theme: warning -->

### Case Studies
> Case studies that include competitor platforms are not allowed and will be removed. Partners will be required to repurpose general case studies, remove competitor platform mentions, and republish the asset accordingly.

</div>
</div>
</div>

### Features
Use these fields to enumerate the major features your platform or solution has to offer. Include a brief title for each feature, and a description of the feature to accompany it. The feature title will be search indexed in the Marketplace, so be specific with your feature names and include major functions potential users will search for. Use the + icon to add a feature, and the x icon to remove. Utilize the rich text editing of these fields to bold, underline, or italicize copy as needed. 

Up to five features can be added.


![Legal Terms and Privacy Dev Tools](https://s3.amazonaws.com/user-content.stoplight.io/6012/1536260434551)

### Legal Terms & Privacy 
Links to your privacy policy and terms of service. This requirement is in place due to legal liability and is non-optional. 

### International Optimization
Please add the countries for which your solution is optimized and those which your solution does not currently support. 

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">
    
<!-- theme: warning -->

### International Optimization
>This feature will not currently be utilized in the Marketplace, but will be a part of planned internationalization updates.

</div>
</div>
</div>

### Help Guides
Links to your User and Installation Guides as a reference for existing users and prospects.

We now ask that you include links to your solution’s user installation guide (PDF, support articles, etc.) and standard user guide for prospective users to review before installation. If you do not submit links, this field will not be displayed on your listing detail page, however we highly recommend including these with your submission.

![Dev Tools App Screenshots](https://s3.amazonaws.com/user-content.stoplight.io/6012/1536260486010)

### App Screenshot
Add screenshots of your solution’s functionality or user interface as it appears when integrated with BigCommerce so users know what to expect.

### Alternate Logo
Your alternate logo will be used if your app is featured on the homepage carousel of the Marketplace. This image should be 259 x 158px (or larger at this ratio) with a dark background and white or light branding in the foreground. The logo should only include branding, no taglines necessary.

----

<a id="app-store-approval-requirements_technical"></a>

## Technical

![Dev Tools Technical](https://s3.amazonaws.com/user-content.stoplight.io/6012/1536260547856)

### Multiple Users

By default, your app will only be accessible to the store owner (i.e., the user who created the store). Optionally, you can allow your app to be accessible to other store users. Consider the following before enabling [multi-user support](/api-docs/getting-started/building-apps-bigcommerce/building-apps#multi-user-support):

-   Once you enable multi-user support, a store admin will still need to grant access to other users from within the store control panel. For each user account, there are settings that grant access to specific apps.
    
-   Your app should be aware that when it receives the [Load Callback](/api-docs/getting-started/building-apps-bigcommerce/building-apps#load-uninstall-removal-requests), the user information passed in might not be the store owner’s. You’ll need to determine how to respond if you see a different user. For example, you may want to provision a new user account in order to personalize the experience.
    
-   You can optionally specify a [Remove User Callback URI](/api-docs/getting-started/building-apps-bigcommerce/building-apps#load-uninstall-removal-requests) to receive a callback when a store admin revokes a user’s access.
    
### App Type

Select the type of app. We recommend [Single Click Apps](/api-docs/getting-started/building-apps-bigcommerce/types-of-apps#single-click-apps) although some qualify to [Connector Apps.](/api-docs/getting-started/building-apps-bigcommerce/types-of-apps#connector)

### Callback URLS

You must have an [Auth Callback URI](/api-docs/getting-started/building-apps-bigcommerce/building-apps#installation-update-sequence) and a [Load Callback URI](/api-docs/getting-started/building-apps-bigcommerce/building-apps#installation-update-sequence) to register your app.

#### Public URIs Required before Submission

Because the Auth Callback URI and Load Callback URI requests originate from the browser and not from BigCommerce, you can use non–publicly-available URIs and a self-signed certificate for a quick start. However, you must switch to – and test your app with – a publicly available Auth Callback URI and Load Callback URI before submitting your app for consideration in the App Marketplace.

If you want to receive a callback when the store owner uninstalls your app, you can provide an [Uninstall Callback URI](/api-docs/getting-started/building-apps-bigcommerce/building-apps#load-uninstall-removal-requests).

![Dev Tool OAuth Scopes](https://s3.amazonaws.com/user-content.stoplight.io/6012/1536260600336)


### OAuth Scopes
If you know the [OAuth scopes](/api-docs/getting-started/about-api/authentication#oauth-scopes) that your app requires, you should select these. If you do not yet know the scopes that you need, you can just request minimal permissions (such as Information: Read-Only) to get started. However, once you determine the scopes you need, you must:
- Modify the scopes of your app in My Apps and save the changes.
- Obtain the new OAuth token during the [App Installation or Update flow](https://developer.bigcommerce.com/api/#app-installation-and-update-sequence).
- Retest your app to make sure it still functions properly with the new token.

![Dev Tools App Testing](https://s3.amazonaws.com/user-content.stoplight.io/6012/1536260650757)
Add in any instructions needed to test the app thoroughly.


---
<a id="app-store-approval-requirements_review"></a>

## Review

![Dev Tools Review](https://s3.amazonaws.com/user-content.stoplight.io/6012/1536260677950)

Review the information added before submitting the app. Look over this page carefully, once the app is submitted, if it is rejected there will be another fee for submission.

---
<a id="app-store-approval-requirements_preview"></a>

## Preview

![Dev Tools Preview](https://s3.amazonaws.com/user-content.stoplight.io/6012/1536261272003)

This is an approximation of what the app’s page will look like in the BigCommerce Marketplace.

---

<a id="app-store-approval-requirements_payment-submission"></a>

## Payment and Submission

![Dev Tools Payment](https://s3.amazonaws.com/user-content.stoplight.io/6012/1536261347648)

At this point you make sure the information has been filled out completely and the app has been thoroughly tested before submitting for review. Updates to the App will not require the submission fee again.

---

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
