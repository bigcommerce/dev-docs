<h1>Restyling the Apple Pay Button</h1>
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
		<li><a href="#restyling_using">Using Apple Pay</a></li>
    <li><a href="#restyling_apple">Apple Pay and Stencil Themes</a></li>
    <li><a href="#restyling_implementing">Implementing the Apple Pay Button</a></li>
    <li><a href="#restyling_apple-pay-identity">Apple Pay Identity Guidelines</a></li>
    <li><a href="#restyling_styling">Styling the Apple Pay Button</a></li>
    <li><a href="#restyling_troubleshooting">Troubleshooting</a></li>
	</ul>
</div>

<a href='#restyling_using' aria-hidden='true' class='block-anchor'  id='restyling_using'></a>

## Using Apple Pay

Apple Pay is a digital wallet that links to a shopper's chosen credit or debit cards. It reduces checkout friction in the same way other digital wallets like PayPal do: Once a shopper has set up Apple Pay, they don't need to enter or transfer their actual credit or debit-card number, nor do they need to re-enter their billing, shipping or contact details.

Displaying the Apple Pay button to shoppers on your storefront is subject to Apple's [geographic constraints](https://support.apple.com/en-us/HT204916), [supported devices and software](https://support.apple.com/en-us/KM207105), [industry and conduct restrictions](https://developer.apple.com/apple-pay/acceptable-use-guidelines-for-websites/), and policies regarding store checkout flow. 



<a href='#restyling_apple' aria-hidden='true' class='block-anchor'  id='restyling_apple'></a>

## Apple Pay and Stencil Themes

The Apple Pay button is included in most Stencil themes, but its default appearance might not match your store's theme. This article explains how to do the following:
* Script the button in themes that don't already include it
* Restyle the button within Apple's guidelines

### Themes Incorporating Apple Pay 

Most current Stencil themes incorporate Apple Pay by default. These include Cornerstone 1.4.0 (or later) and most Theme Marketplace themes. 

### Themes Omitting Apple Pay 

The following Stencil themes do **not** include Apple Pay:

* Cornerstone 1.3.4 or earlier
* Fortune
* Geneva
* Prosper
* Solo
* Earlier versions of Marketplace themes that have since added Apple Pay
* Custom themes derived from any of the above

### Apple Pay Button's Location 

By default, the Apple Pay button will appear on a theme's Cart page. If the store has [enabled site-wide HTTPS](https://support.bigcommerce.com/s/article/Site-Wide-HTTPS), the Apple Pay button will also appear in the Quick Cart modal. The Apple Pay button does _not_ appear on the checkout page, because Apple Pay is designed as a low-friction alternative that bypasses the store's native checkout.



<a href='#restyling_implementing' aria-hidden='true' class='block-anchor'  id='restyling_implementing'></a>

## Implementing the Apple Pay Button

### Themes Incorporating Apple Pay

To display the Apple Pay button in themes incorporating Apple Pay, a store administrator only needs to enable Apple Pay in the BigCommerce [control panel](https://support.bigcommerce.com/articles/Public/Connecting-with-Apple-Pay#setup) by selecting **Store Setup** > **Payments** > **Digital Wallets** > **Apple Pay** > **Set up**.

### Themes Omitting Apple Pay

To display the Apple Pay button on the Cart page of themes omitting Apple Pay, you or a store administrator must paste enabling CSS into the footer script, as follows: 

1. Copy the CSS below.
2. In the BigCommerce control panel, select **Storefront Design** > **Design Options** > **Scripts tab**.
3. Paste the copied code into the Footer script box and select **Save**.

<!--
title: "Themes Omitting Apple Pay CSS"
subtitle: ""
lineNumbers: true
-->

```css
<style>
/* don’t display the button by default */
.apple-pay-checkout-button {
  display: none;
}

/* display the button if apple pay is supported */
.apple-pay-supported .apple-pay-checkout-button {
  display: inline-block;
}

/* renders a black background with white logo */
.apple-pay-checkout-button {
  background-size: 100% 60%;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  border-radius: 5px;
  padding: 0px;
  box-sizing: border-box;
  min-width: 175px;
  min-height: 32px;
  max-height: 64px;
  background-image: -webkit-named-image(apple-pay-logo-white);
  background-color: black;
  text-indent: -9000em;
  cursor: pointer;
}

/* for small screens, you should adjust the width of the button to
   span the width of the containing block */
@media screen and (max-width: 480px) {
  .apple-pay-checkout-button {
    width: 100%;
    height: 60px;
  }
}
</style>
```



<a href='#restyling_apple-pay-identity' aria-hidden='true' class='block-anchor'  id='restyling_apple-pay-identity'></a>

## Apple Pay Identity Guidelines

As a condition for enabling Apple Pay, Apple requires merchants to style and display the button according to [Apple Pay Identity Guidelines](https://developer.apple.com/apple-pay/Apple-Pay-Identity-Guidelines.pdf). For BigCommerce's summary of the relevant guidelines, see the [Integrating the Apple Pay Button](https://support.bigcommerce.com/articles/Public/Integrating-the-Apple-Pay-button/#guidelines) support article.



<a href='#restyling_styling' aria-hidden='true' class='block-anchor'  id='restyling_styling'></a>

## Styling the Apple Pay Button

By default, a black version of the Apple Pay button will display in the storefront. However, Apple permits you to change the following three styling elements of the button, to match the style of your storefront:

* Button background color, which must only be either white or black. A white button can have a black border.
* Button height
* Button width

### Button Color – No Custom CSS Required

In themes incorporating Apple Pay, you or a store administrator can change the Apple Pay button's color in Theme Editor. Select **Buttons** > **Apple Pay** > **Button Color**. 

The drop-down list offers you the three options shown below: 

* Black (white text) – the default
* White (black text)
* White (black text with border)

### Button Color – Custom CSS Required

In themes omitting Apple Pay, you must use custom CSS to change the Apple Pay button's color. Here are CSS snippets to recolor the default black button.

To render the button with a white background and black text, use this CSS:

<!--
title: "White background and black text"
subtitle: "Apple Pay button"
lineNumbers: true
-->

```css
.apple-pay-checkout-button {
  background-image: -webkit-named-image(apple-pay-logo-black);
  background-color: white;
}
```

To render the white Apple Pay button with black text and a black border, use this CSS:

<!--
title: "Black text and a black border"
subtitle: "Apple Pay button"
lineNumbers: true
-->

```
.apple-pay-checkout-button {
  background-image: -webkit-named-image(apple-pay-logo-black);
  background-color: white;
  border: .5px solid black
}
```


### Button Size – Custom CSS Required 

Resizing the button normally requires custom CSS. The following example shows how, by targeting the 
`.apple-pay-checkout-button` CSS selector, you can also manipulate the Apple Pay button's width and height. (This is subject to certain constraints imposed by Apple and BigCommerce, which are listed in the example's comments.)

<!--
title: "Button Size"
subtitle: "Apple Pay button"
lineNumbers: true
-->

```css
.apple-pay-checkout-button {
  width: 200px; /* apple specified minimum is 175px, there is no maximum */
  height: 60px; /* apple specified minimum is 32px, maximum is 64px */
}	
```



<a href='#restyling_troubleshooting' aria-hidden='true' class='block-anchor'  id='restyling_troubleshooting'></a>

## Troubleshooting

**Is your Apple Pay button configured but not appearing on the storefront?**

To troubleshoot issues like this, see the [Integrating the Apple Pay Button](https://support.bigcommerce.com/articles/Public/Integrating-the-Apple-Pay-button/#troubleshoot) support article.




## Resources

### Related Articles
* [Connection with Apple Pay](https://support.bigcommerce.com/s/article/Connecting-with-Apple-Pay) (Knowledge Base)
* [Apple Pay Identity Guidelines](https://support.bigcommerce.com/articles/Public/Integrating-the-Apple-Pay-button/#guidelines) (Knowledge Base)
* [Sitewide HTTPS](https://support.bigcommerce.com/s/article/Site-Wide-HTTPS) (Knowledge Base)

### Addtional Resources
* [Apple Pay on the Web Acceptable Use Guidelines](https://developer.apple.com/apple-pay/acceptable-use-guidelines-for-websites/) (Apple Developer)
* [Apple Pay is compatible with these devices](https://support.apple.com/en-us/HT208531) (Apple Developer)
* [Apple Pay participating banks in Canada, Latin America, and the United States](https://support.apple.com/en-us/HT204916) (Apple Developer)
* [Using Apple Pay in Your Marketing](https://developer.apple.com/apple-pay/marketing/) (Apple Developer)

