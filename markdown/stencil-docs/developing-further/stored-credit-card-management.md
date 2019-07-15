<h1>Stored Credit Card Management</h1>
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#stored-cc-mgmt_adding-stored-cc-mgmt">Adding Stored Credit Card Management</a></li>
    <li><a href="#stored-cc-mgmt_add-payment-methods">Step 1: Add Payment Methods Page</a></li>
    <li><a href="#stored-cc-mgmt_add-translations">Step 2: Add Translations</a></li>
    <li><a href="#stored-cc-mgmt_include-cc-listing">Step 3: Include Credit Card Listing</a></li>
    <li><a href="#stored-cc-mgmt_add-cc-actions">Step 4: Add Credit Card Actions</a></li>
    <li><a href="#stored-cc-mgmt_implement-delete">Step 5: Implement Delete Payment Method</a></li>
    <li><a href="#stored-cc-mgmt_implement-edit">Step 6: Implement Edit Payment Method</a></li>
    <li><a href="#stored-cc-mgmt_implement-add">Step 7: Implement Add Payment Method</a></li>
    <li><a href="#stored-cc-mgmt_add-default">Step 8: Add Default Instrument</a></li>
	</ul>
</div>

Stored Credit Card management<sup>1</sup> gives customer’s the ability to manage their stored credit cards from the My Account page of the storefront. In the Cornerstone theme, shoppers with store accounts will have the ability to add new cards2, delete cards<sup>2</sup>, select a default card, and edit the billing details<sup>3</sup> of existing cards from their customer account area of the storefront.



<!--
    title: #### Stored Credit Card Management 

    data: //s3.amazonaws.com/user-content.stoplight.io/6116/1541629003006
-->

#### Stored Credit Card Management 
![#### Stored Credit Card Management 
](//s3.amazonaws.com/user-content.stoplight.io/6116/1541629003006 "#### Stored Credit Card Management 
")

<div class="HubBlock--callout">
<div class="CalloutBlock--">
<div class="HubBlock-content">
    
<!-- theme:  -->

> 1. Cornerstone versions 2.6.0+ include the ability to manage [Stored Credit Cards](https://support.bigcommerce.com/s/article/Enabling-Stored-Credit-Cards) (BigCommerce Support).
2. Card data is stored securely with the payment gateway.
3. After adding a card, shoppers will only be able to modify the billing address. If other credit card details need to be modified (such as expiration date), the shopper must delete and re-add the card.

</div>
</div>
</div>

---

<a href='#stored-cc-mgmt_adding-stored-cc-mgmt' aria-hidden='true' class='block-anchor'  id='stored-cc-mgmt_adding-stored-cc-mgmt'><i aria-hidden='true' class='linkify icon'></i></a>

## Adding Stored Credit Card Management 

Stored Credit Card Management was added to Cornerstone in [pull request #1376](https://github.com/bigcommerce/cornerstone/pull/1376). To add Stored Credit Cards to pre-2.6.0 Cornerstone or Marketplace themes, copy the changes from [PR #1376](https://github.com/bigcommerce/cornerstone/pull/1376) to your theme. This section will walk through [each individual commit](https://github.com/bigcommerce/cornerstone/pull/1376/commits), highlighting the changes that you will need to make to your template files.

---

<a href='#stored-cc-mgmt_add-payment-methods' aria-hidden='true' class='block-anchor'  id='stored-cc-mgmt_add-payment-methods'><i aria-hidden='true' class='linkify icon'></i></a>

## Step 1: [Add the Payment Methods page to the shopper's Account](https://github.com/bigcommerce/cornerstone/pull/1376/commits/24abc038fe346a8572b40da40c98a9465788957a)

* Create the new Payment Methods page on a shopper’s account by editing the following files:
	* <span class="fp">lang/en.json</span>
	* <span class="fp">templates/components/account/navigation.html</span>
	* <span class="fp">templates/pages/account/payment-methods.html</span>

<!--
    title: #### Payment Methods Page Addition Example

    data: //s3.amazonaws.com/user-content.stoplight.io/6116/1541629154209
-->

#### Payment Methods Page Addition Example
![#### Payment Methods Page Addition Example
](//s3.amazonaws.com/user-content.stoplight.io/6116/1541629154209 "#### Payment Methods Page Addition Example
")

---

<a href='#stored-cc-mgmt_add-translations' aria-hidden='true' class='block-anchor'  id='stored-cc-mgmt_add-translations'><i aria-hidden='true' class='linkify icon'></i></a>

## Step 2: [Add Translations for Payment Methods Titles](https://github.com/bigcommerce/cornerstone/pull/1376/commits/9edf1a0f6907811abf470db1486b4fdb199b27ae)

* Makes the Payments Method page translatable by modifying the following:
	* <span class="fp">lang/en.json</span>
	* <span class="fp">templates/components/account/navigation.html</span> files

---

<a href='#stored-cc-mgmt_include-cc-listing' aria-hidden='true' class='block-anchor'  id='stored-cc-mgmt_include-cc-listing'><i aria-hidden='true' class='linkify icon'></i></a>

## Step 3: [Include the Credit Card listing, initially without the add, edit, and delete actions](https://github.com/bigcommerce/cornerstone/pull/1376/commits/5574eb98c710f4540e8390420563099b6f5710bf)

* Group the credit cards by payment providers
* Include the payment method icons
* Account for mobile and desktop layouts
* Account for translations

*Icons have been used to identify the credit card **type**. The data only provides the card brand in the credit card details.*

<!--
    title: 
    data: //s3.amazonaws.com/user-content.stoplight.io/6116/1541630407609
-->

![](//s3.amazonaws.com/user-content.stoplight.io/6116/1541630407609 "")

---

<a href='#stored-cc-mgmt_add-cc-actions' aria-hidden='true' class='block-anchor'  id='stored-cc-mgmt_add-cc-actions'><i aria-hidden='true' class='linkify icon'></i></a>

## Step 4: [Add the Credit Card Actions (Add, Edit, and Delete)](https://github.com/bigcommerce/cornerstone/pull/1376/commits/499016d320995852fe4ef621724e08556896b70d)

*  add `Edit`, `Delete`, and `Add` buttons


<!--
    title: #### Implementation of Add, Edit, and Delete Methods

    data: //s3.amazonaws.com/user-content.stoplight.io/6116/1541655663898
-->

#### Implementation of Add, Edit, and Delete Methods
![#### Implementation of Add, Edit, and Delete Methods
](//s3.amazonaws.com/user-content.stoplight.io/6116/1541655663898 "#### Implementation of Add, Edit, and Delete Methods
")

---

<a href='#stored-cc-mgmt_implement-delete' aria-hidden='true' class='block-anchor'  id='stored-cc-mgmt_implement-delete'><i aria-hidden='true' class='linkify icon'></i></a>

## Step 5: [Implement the `Delete Payment` Method](https://github.com/bigcommerce/cornerstone/pull/1376/commits/cf102901d9061b7334e8c39f15a8904c37cf0652)

* Bind the delete button's front end and back end

First, the click will trigger window confirm. The confirmation modal has been added to prevent unintended action. Then, on confirming, a post request will be sent. The action is initiated through a localized form post request in the template which uses a [`delete_url`](https://github.com/bigcommerce/cornerstone/blob/master/templates/components/account/payment-methods-list.html#L34) key provided in the credit card details data. Finally, there will be a redirect to the credit card listing.

---

<a href='#stored-cc-mgmt_implement-edit' aria-hidden='true' class='block-anchor'  id='stored-cc-mgmt_implement-edit'><i aria-hidden='true' class='linkify icon'></i></a>

## Step 6: [Implement the `Edit Payment` Method](https://github.com/bigcommerce/cornerstone/pull/1376/commits/ab2fe1df455fa8ac93760904b718fbce7ce361ed)

* Add the design for credit card details and the edit billing address form, synced with existing address fields validation

*The action is initiated via a [redirect](https://github.com/bigcommerce/cornerstone/blob/master/templates/components/account/payment-methods-list.html#L36) to the edit page. The page uses HTML, CSS, and JavaScript for the billing address validation. The "name on card" label and values are also removed, as we do not store name along with the vaulted credit card. The full [edit-payment-method.html](https://github.com/bigcommerce/cornerstone/blob/master/templates/pages/account/edit-payment-method.html) can be viewed in the Cornerstone Github Repo.*

<!--
    title: #### Edit Payment Method Form

    data: //s3.amazonaws.com/user-content.stoplight.io/6116/1541654303488
-->

#### Edit Payment Method Form
![#### Edit Payment Method Form
](//s3.amazonaws.com/user-content.stoplight.io/6116/1541654303488 "#### Edit Payment Method Form
")

---

<a href='#stored-cc-mgmt_implement-add' aria-hidden='true' class='block-anchor'  id='stored-cc-mgmt_implement-add'><i aria-hidden='true' class='linkify icon'></i></a>

## Step 7: [Implement the `Add Payment` Method](https://github.com/bigcommerce/cornerstone/pull/1376/commits/c960338c32faa8fb798b2826c72dfe9d74bf9751)


*  Adding new icon `lock.svg`
*  Unify the CSS classes for the add and edit form.
*  Add a new template for edit form with an injection of global variables into context.
*  Extend the `account.js` file with a new method to initiate credit card and billing address fields validations, mapping form fields name and value to body request.
*  Add a `payment-method.js` file for credit card validations and helpers with unit test.

*The add form will use ajax to validate and submit the credit card details (this differs from the way the edit form validates and submits). The [payment-method.js file](https://github.com/bigcommerce/cornerstone/blob/master/assets/js/theme/common/payment-method.js) has been designed to be dragged and used in themes to simplify its implementation.*

*The [add-payment-method.html template](https://github.com/bigcommerce/cornerstone/blob/master/templates/pages/account/add-payment-method.html) also requires some customization because variables need to pass through handlebars in order to be used by JavaScript. From [line 20 to 25 of the template](https://github.com/bigcommerce/cornerstone/blob/master/templates/pages/account/add-payment-method.html#L20-L25), we store variables, mostly for building the request url and header. The request body will directly use the form data. [More validations and extra mapping](https://github.com/bigcommerce/cornerstone/blob/24686de577c6ad5409ec8b82f5839c3d083cb760/assets/js/theme/account.js#L211) are added to the `add-payment-method.html` template as well.*

<!--
    title: #### Example of the addition of the Add Payment Method

    data: //s3.amazonaws.com/user-content.stoplight.io/6116/1541629295212
-->

#### Example of the addition of the Add Payment Method
![#### Example of the addition of the Add Payment Method
](//s3.amazonaws.com/user-content.stoplight.io/6116/1541629295212 "#### Example of the addition of the Add Payment Method
")

---

<a href='#stored-cc-mgmt_add-default' aria-hidden='true' class='block-anchor'  id='stored-cc-mgmt_add-default'><i aria-hidden='true' class='linkify icon'></i></a>

## Step 8: [Add the default Instrument for the add/edit Payment Method](https://github.com/bigcommerce/cornerstone/pull/1376/commits/5576aee5af0194e85cb11dbf44563f89b2687f40)

* Add HTML and CSS for a single checkbox, default instrument
* Capture form data on ADD and transform to boolean
* Fix HTML credit card for tabulation navigation
* Fix for states reload list via AJAX

<!--
    title: #### Add default instrument checkbox to edit and add form

    data: //s3.amazonaws.com/user-content.stoplight.io/6116/1541655424566
-->

#### Add default instrument checkbox to edit and add form
![#### Add default instrument checkbox to edit and add form
](//s3.amazonaws.com/user-content.stoplight.io/6116/1541655424566 "#### Add default instrument checkbox to edit and add form
")

<div class="HubBlock--callout">
<div class="CalloutBlock--">
<div class="HubBlock-content">
    
<!-- theme:  -->

### Utilizing Github Automation to Merge the Changes

> Since this feature involves heavy code changes, it may be easier to merge the necessary code into your theme by utilizing Github's automated process for syncing a fork. See Github's documentation on [Syncing a Fork](https://help.github.com/articles/syncing-a-fork/) for more details on this method.

</div>
</div>
</div>

---

## Resources

### Related Articles

* [The Complete Guide to Checkout Customization on BigCommerce](https://medium.com/bigcommerce-developer-blog/the-complete-guide-to-checkout-customization-on-bigcommerce-6b566bc36fa9) (Developer Blog)

