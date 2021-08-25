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

| Phrase name | Phrase value|
|-|-|
| subject | Password change request for {store}|
| title | Hello {name}, |
| message | You recently requested to reset your password. Just click the button to set a new password.|
| password | Set a new password|

[Code example]()

[Image]()

## Account created

Using the account created template, here is an example of how you can add a button to your email.

Copy and paste the contents below into the Content Code editor. A blue button with white text 

```html
<table class="row">
  <tr>
     <th class="column">
          <table>
             <tr>
                <th>
                   <a href="{{store.path}}" style = "background-color:blue; color:white" class="sigh-in">Sign-in</a>
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

