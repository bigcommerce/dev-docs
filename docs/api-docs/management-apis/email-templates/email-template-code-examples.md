# Email Templates Code Examples

<div class="otp" id="no-index">

### On this page

- [Password reset](#password-reset)
- [Account created](#account-created)
- [Return approved](#return-approved)
- [Abandoned cart](#abandoned-cart)
- [Resources](#resources)

</div>

This article contains code examples that you can use in your store's control panel.

## Password reset
Here is an example of how you can change the text in the Password reset template.

To change the default message in the password reset template go to the **Phrases** tab, and update the phrases and phrase values. 
|Phrase name | Phrase value|
|-|-|
|message| We are sending you this email because you requested a password reset. Click on this link to create a new password:|


Then you can add the following text. You will need to create a new phrase. Click the **Add new** button and enter the phrase name and phrase value.

|Phrase name | Phrase value|
|-|-|
|security| If you didn't request a password reset, you can ignore this email. Your password will not be changed.|

Click the code tab and enter the new phrase below 

[Code example]()

[Image]()

## Account created

Here is an example of html code that will add a blue button with white text to the account created template.

Copy and paste the contents below into the Content Code editor. Ensure you paste the text outside the <table> and </table> tags. 
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

[Image]()

## Abandoned cart

| Phrase name | Phrase value|
|-|-|
| unsubscribe | If you prefer not to receive emails, you may <a href="{link}">Unsubscribe</a> .|
| title | Forget Something? |
| message | We noticed you left something behind. No need to worry - we saved the items in your cart so you can easily complete your purchase.|

[Code example]()

[Image]()

