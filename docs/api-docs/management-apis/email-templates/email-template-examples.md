# Email Templates Code Examples

<div class="otp" id="no-index">

### On this page

- [Updating text](#updating-text)
- [Adding a button](#adding-a-button)
- [Changing logo size](#changing-logo-size)
- [Changing font size](#changing-font-size)

</div>

This article provides examples of how to customize email templates. The examples are for use in the recently updated templates. You can enable the new version of transactional emails by going to **Marketing > Transactional Emails** and clicking **Try New Experience**. When you are ready to use a template, make sure to **Enable** the template from the respective dropdown. 

The following code examples demonstrate how to update text, add a button, change logo size, and change the font size.

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">
  
  ### Note 
  It is important to write your emails for [accessibility](https://www.w3.org/WAI/tips/writing/) and preview changes.  
  
</div>
</div>
</div> 

## Updating text
To change existing text in an email template, update information in the **Phrases** and **Code** tabs. For detailed instructions, see [Editing Template Phrases](https://support.bigcommerce.com/s/article/Customizing-Emails?language=en_US#phrases). 


## Adding a button

You can create an email button using HTML. The following code example adds a blue button with white text to the account created template.

Go to **Transactional Emails> Email Templates**. Click **...** next to **Account Created** and select **Edit Template**. Copy and paste the contents below into the Content editor. Ensure you paste the text outside the open `<table>` and closed `</table>` tags. 
  
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

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">
  
  ### Note 
  You can select a different button background and text color. We suggest adhering to the [minimum color contrast standards](https://webaim.org/articles/contrast/) set by WCAG. 
</div>
</div>
</div> 

![Add button](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/email-templates-add-button.png "Button with white text on a blue background")

## Changing logo size

To change the size of your logo that appears in your email, specify width and height values in the Content editor. Go to **Transactional Emails > Email Templates**. Click **...** next to **Order Email** and select **Edit Template**. Go to the **Code** tab and replace: 

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
  
  ### Note  
  You can also add width and height values to images.
</div>
</div>
</div> 
  
![Change logo size](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/email-templates-change-logo-size.png "Change logo size")

## Changing font size
  
To change the email font size, use the style attribute. You can define attributes such as color and font size within the paragraph `<p>` tag. Go to **Transactional Emails > Email Templates**, click **...** next to **Guest Account**, and select **Edit Template**. Go to the **Code** tab and replace: 
  
```html
<p>{{lang 'help'}}</p>
  ```
 with 
  
  ```html
<p style="font-size:16px;">{{lang 'help'}}</p>
   ```
To make your text responsive so that it can viewed on a variety of devices and screen sizes, use the viewport width (`vw`) unit to set the `font-size`. `vw` style settings allow you to control the widths of elements no matter the viewport size. 
  
  ```html
  <p style="font-size:2.0vw">{{lang 'help'}}</p>
  ```

