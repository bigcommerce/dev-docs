# Email Templates Code Examples

<div class="otp" id="no-index">

### On this page

- [Updating text](#updating-text)
- [Adding a button](#adding-a-button)
- [Changing logo size](#changing-logo-size)
- [Changing font size](#changing-font-size)
- [Resources](#resources)

</div>

This article provides examples of how to customize email templates if you are using the latest version. You can enable the new version of transactional emails by going to **Marketing> Transactional Emails** and clicking **Try New Experience**. When you are ready to use a template, make sure you **Enable** the template from the respective dropdown. 

Code examples below will demonstrate how to update text, add a button, change logo size, and change the font size.

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

NOTE: It is important to preview all changes and style your emails to be accessible for everyone.  
</div>
</div>
</div> 

## Updating text
To change existing text in an email template, you will need to update information in the **Phrases** and **Code** tabs. Here is an example of how you can update text using the **Password reset** default template.

Go to **Transactional Emails> Email Templates**. Click **...** next to **Password Reset** and select **Edit Template**. Change the default message in the password reset template by updating the **Phrase value**. To add new text, click the **Add new** button. Enter the phrase name and phrase value. See the **Password reset** example phrases and values below.

|Phrase name | Phrase value|
|-|-|
|message| We are sending you this email because you requested a password reset. Click on this link to create a new password.|
|security| If you didn't request a password reset, you can ignore this email. Your password has not changed.|

Next, click the **Code** tab and paste in the new {security} phrase after the shop image. For this example, you can paste 

` <p>{{lang 'security'}}</p>` 

into the password reset Content editor as shown below.

```html
<table class="container">
  <tr>
    <td>
      <table class="row">
        <tr>
          <th class="column">
            <table>
              <tr>
                <th>
                  <table class="delimiter">
                    <tr>
                     <th>
                       <hr>
                </th>
                     <th class="delimiter__image-block">
                        <img src="{{store.cdn_path}}/img/emails/shop.png" alt="Shop image" class="delimiter__image">
                     </th>
                     <p>{{lang 'security'}}</p>
                     <th>
                      <hr>
                     </th>
                   </tr>
                 </table>
                </th>
              </tr>
              <th class="expander"></th>
          </tr>
         </table>
        </td>
   </tr>
 </table>
```
Click on the **Preview** tab to view your changes.
[Image]()

## Adding a button

To add a button to an email, you will need to add additional code to your template. Here is an example of HTML code that will add a blue button with white text to the account created template.

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">
NOTE: You can select a different button background and text color. We suggest adhering to the minimum color contrast standards set by [WCAG](https://webaim.org/articles/contrast/). 
</div>
</div>
</div> 


Go to **Transactional Emails> Email Templates**. Click **...** next to **Account Created** and select **Edit Template**. Copy and paste the contents below into the Content editor. Ensure you paste the text outside the `<table>` tags. 
  
```html
<table class="row">
  <tr>
    <th class="column">
       <table>
          <tr>
             <th>
                <a href="{{store.path}}" style = "background-color:blue; color:white" class="sigh-in">{{lang 'sign_in'}}</a>
             </th>
             <th class="expander"></th>
          </tr>
      </table>
  </th>
 </tr>
</table>
```
[image]()

## Changing logo size

To change the size of your logo that appears in your email, specify width and height values in the Content editor. Go to **Transactional Emails> Email Templates**. Click **...** next to **Order Email** and select **Edit Template**. Go to the **Code** tab and replace: 

```html
<img src="{{store.logo.url}}" alt="{{store.logo.title}}">
```
with
```html
<img src="{{store.logo.url}}" alt="{{store.logo.title}}" width="200" height="200">
```
<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">
NOTE:  You can also add width and height values to images.
</div>
</div>
</div> 
  
[Image]

## Changing font size
  
To change the your email font size, you will need to use the style attribute. You can define attributes such as color and font size within the paragraph `<p>` tag. Go to **Transactional Emails> Email Templates**, click **...** next to **Guest Account**, and select **Edit Template**. Go to the **Code** tab and replace: 
  
```html
<p>{{lang 'help'}}</p>
  ```
 with 
  
  ```html
<p style="font-size:16px;">{{lang 'help'}}</p>
   ```
To make your text responsive so that it can viewed on a variety of devices and screen sizes, you can change the text to the following:
  
  ```html
  <p style="font-size:2.0vw">{{lang 'help'}}</p>
  ```
<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">
NOTE: vw style settings allow you to control the widths of elements no matter the viewport size.  
</div>
</div>
</div> 
