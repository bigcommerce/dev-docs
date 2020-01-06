# Modifying Login Form
<div class="otp" id="no-index">

### On This Page
- [Modifying The Template](#modifying-the-template)
</div>

## Modifying The Template
You can customize the login experience by modifying the theme's `templates/pages/auth/login.html` file.

### Changing Default Text
Here is an example of some of the default text you can change in the Login page template:

![#### New Customer Facts](/../../../assets/images/new_customer.png "### New Customer Facts")

```html
<li class="new-customer-fact">{{lang 'login.new_customer.fact1' }}</li>
<li class="new-customer-fact">{{lang 'login.new_customer.fact2' }}</li>
```
You will find key value pairs for default form text in `/assets/lang/en.json`, and can modify them with your own custom values. For example:

```json
"new_customer": {
        "heading": "New Customer?",
        "intro": "Create an account with us and you'll be able to:",
        "fact1": "Get customer perks",
        "fact2": "Place a recurring order"
        }
```

### Login Form Redirect
By default, customers are redirected to `/account.php` upon login, but you have the option to redirect customers to another relative URL. You can do this by passing the parameter `id="redirect_to"` with a `value={path}` on a hidden form field within the `<form>` element in the template. For example:

```html
<input type="hidden" id="redirect_to" name="redirect_to" value="/shop-all">
```
When the form is submitted a POST request is sent to BigCommerce to validate the login information. At this point, the customer will be redirected to the page you defined.

Only relative URLs are supported for security reasons.