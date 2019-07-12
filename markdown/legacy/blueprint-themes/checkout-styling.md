<h1>Checkout Styling</h1>
<div class="otp" id="no-index">
	<h3>On This Page</h3>
	<ul>
		<li><a href="#customization-options-restrictions">Customization Options/Restrictions</a></li>
		<li><a href="#configuring-desktop-viewport">Configuring the Desktop Viewport</a></li>
    <li><a href="#deploying-custom-css">Deploying Custom CSS</a></li>
    <li><a href="#classes-provided">Classes Provided</a></li>
    <li><a href="#css-skeleton">CSS Skeleton</a></li>
		</ul>
</div>

To support stores that enable BigCommerce's Optimized One-Page Checkout feature, you can customize the Optimized Checkout page's styling within your theme. You do this by adding custom CSS to the `optimized-checkout-webdav.css` template file that we provide. You can copy the CSS [below](#css-skeleton).

<div class="HubBlock--callout">
<div class="CalloutBlock--success">
<div class="HubBlock-content">
    
<!-- theme: success -->

### Function Names
> Although you will see references to "Stencil" functions throughout this template file's CSS, this version of the CSS is designed to be fully compatible with Blueprint themes.

</div>
</div>
</div>

---

<a href='#customization-options-restrictions' aria-hidden='true' class='block-anchor'  id='customization-options-restrictions'><i aria-hidden='true' class='linkify icon'></i></a>

## Customization Options/Restrictions 

As a theme developer, you are free to change classes' contents – but do not nest elements, nor change any class names. 

The structure and class naming are reserved because each class here maps to multiple Optimized Checkout elements. So renaming would break updates available in future Optimized Checkout enhancements.


---

<a href='#configuring-desktop-viewport' aria-hidden='true' class='block-anchor'  id='configuring-desktop-viewport'><i aria-hidden='true' class='linkify icon'></i></a>

## Configuring the Desktop Viewport 

Within the CSS file, to set up Optimized Checkout's responsive features, you should configure the following breakpoint to define your preferred desktop viewport size:


<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name"></div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: ""
subtitle: ""
lineNumbers: true
-->

```css

// TODO:
// Configure media query to be 'desktop' breakpoint size
// -----------------------------------------------------------------------------
@media (min-width: 801px) {
    text-align: stencilString("optimizedCheckout-logo-position");
}
```

For other customization options, please see the class descriptions [below](#classes-provided).


---

<a href='#deploying-custom-css' aria-hidden='true' class='block-anchor'  id='deploying-custom-css'><i aria-hidden='true' class='linkify icon'></i></a>

## Deploying Custom CSS 

To deploy your custom CSS to a BigCommerce store, you will need to upload your `optimized-checkout-webdav.css` file (once customized) via WebDAV. 

For a general overview of the process, please see [this support article](https://support.bigcommerce.com/articles/Public/Accessing-and-Customizing-Template-Files/). Place your customized `optimized-checkout-webdav.css` file directly within WebDAV's `/content/` folder.

For details on interacting with WebDAV, please see [this article](https://support.bigcommerce.com/articles/Public/Connecting-to-WebDav).

---

<a href='#classes-provided' aria-hidden='true' class='block-anchor'  id='classes-provided'><i aria-hidden='true' class='linkify icon'></i></a>

## Classes Provided 

Below is a summary of the classes provided in the template CSS, with corresponding page elements that they style. (These class names and mappings are subject to change, so please see the inline comments embedded in the file itself.)

| Class | Styles This Optimized One-Page Checkout Element: |
|---|---|
| .optimizedCheckout-header | Page header. |
| .optimizedCheckout-headingPrimary | Top-level headings. |
| .optimizedCheckout-headingSecondary | Certain lower-level elements, such as descriptions of cart items. |
| .optimizedCheckout-overlay | Shipping Method box. |
| .optimizedCheckout-contentPrimary | Body text in the desktop `Order Summary`/`Order Confirmation` (cart contents); drop-down-list items; and text that summarizes completed steps. |
| .optimizedCheckout-contentSecondary | Text labels on check boxes, and lower-level text in the desktop Order Summary. |
| .optimizedCheckout-button--primary | `CONTINUE` button and final `PAY` button. |
| .optimizedCheckout-button--secondary | `Edit` buttons.
| .optimizedCheckout-orderSummary | Colors in the `Order Summary` mobile drawer/modal.
| .optimizedCheckout-step | Large step-number indicators on the page's left side. |
| .optimizedCheckout-form-label | Styles form fields like `Email Address` – the field's text-label color. | 
| .optimizedCheckout-form-input | Styles form fields like `Email Address` – the entry box's background and border colors. |

---

<a href='#css-skeleton' aria-hidden='true' class='block-anchor'  id='css-skeleton'><i aria-hidden='true' class='linkify icon'></i></a>

## CSS Skeleton 

You can copy and modify the template `optimized-checkout-webdav.css` file's current contents directly from this documentation, below: 

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name"></div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: ""
subtitle: ""
lineNumbers: true
-->

```css
/* 
// =============================================================================
// Stencil Checkout - Customize the Optimized Single-Page Checkout experience
// =============================================================================
*/

/*
// =============================================================================
//
// IMPORTANT DISCLAIMER
// Please do not nest elements within class selectors, and do not use class selectors other than those given below.
// Future support is guaranteed only if class selectors' structure and naming are left unchanged.
//
// =============================================================================
*/


/*
// Header Section
// Background, Logo Position
// -----------------------------------------------------------------------------
*/

.optimizedCheckout-header {
    background-color: stencilColor("optimizedCheckout-header-backgroundColor");
    background-image: url(stencilImage('optimizedCheckout-backgroundImage', 'optimizedCheckout-backgroundImage-size'));
    background-size: cover;
}

/*
// TODO:
// Configure media query to be 'desktop' breakpoint size
// -----------------------------------------------------------------------------
*/

@media (min-width: 801px) {
    .optimizedCheckout-header {
        text-align: stencilString("optimizedCheckout-logo-position");
    }
}

/*
// Primary and Secondary Headings
// Text Color & Typography
//
// .optimizedCheckout-headingPrimary styles top-level headings.
//
// .optimizedCheckout-headingSecondary styles certain lower-level elements, such as descriptions of cart items.
// -----------------------------------------------------------------------------
*/

.optimizedCheckout-headingPrimary {
    color: stencilColor("optimizedCheckout-headingPrimary-color");
    font-family: stencilFontFamily("optimizedCheckout-headingPrimary-font"), Arial, Helvetica, sans-serif;
    font-weight: stencilFontWeight("optimizedCheckout-headingPrimary-font");
}

.optimizedCheckout-headingSecondary {
    color: stencilColor("optimizedCheckout-headingSecondary-color");
    font-family: stencilFontFamily("optimizedCheckout-headingSecondary-font"), Arial, Helvetica, sans-serif;
    font-weight: stencilFontWeight("optimizedCheckout-headingSecondary-font");
}

/*
// Body
// Background & Shipping Method Overlay
// -----------------------------------------------------------------------------
*/

body {
    background-color: stencilColor("optimizedCheckout-body-backgroundColor");
}

.optimizedCheckout-overlay {
    background-color: stencilColor("optimizedCheckout-body-backgroundColor");
}

/*
// Primary & Secondary Content
// Text Color & Typography
//
// .optimizedCheckout-contentPrimary styles body text in the Order Summary/Order Confirmation; 
// drop-down-list items; and text summarizing completed steps.
//
// .optimizedCheckout-contentSecondary styles check boxes' text labels, 
// and lower-level text in the Order Summary.
// -----------------------------------------------------------------------------
*/

.optimizedCheckout-contentPrimary {
    color: stencilColor("optimizedCheckout-contentPrimary-color");
    font-family: stencilFontFamily("optimizedCheckout-contentPrimary-font"), Arial, Helvetica, sans-serif;
    font-weight: stencilFontWeight("optimizedCheckout-contentPrimary-font");
}

.optimizedCheckout-contentSecondary {
    color: stencilColor("optimizedCheckout-contentSecondary-color");
    font-family: stencilFontFamily("optimizedCheckout-contentSecondary-font"), Arial, Helvetica, sans-serif;
    font-weight: stencilFontWeight("optimizedCheckout-contentSecondary-font");
}

/*
// Primary Button
// Background & Border & Text Color & Typography
//
// Styles the CONTINUE button for each step, & the final confirmation button.
// -----------------------------------------------------------------------------
*/

.optimizedCheckout-buttonPrimary {
    background-color: stencilColor("optimizedCheckout-buttonPrimary-backgroundColor");
    border-color: stencilColor("optimizedCheckout-buttonPrimary-borderColor");
    color: stencilColor("optimizedCheckout-buttonPrimary-color");
    font-family: stencilFontFamily("optimizedCheckout-buttonPrimary-font"), Arial, Helvetica, sans-serif;
    font-weight: stencilFontWeight("optimizedCheckout-buttonPrimary-font");
}

.optimizedCheckout-buttonPrimary:focus,
.optimizedCheckout-buttonPrimary:hover {
    background-color: stencilColor("optimizedCheckout-buttonPrimary-backgroundColorHover");
    border-color: stencilColor("optimizedCheckout-buttonPrimary-borderColorHover");
    color: stencilColor("optimizedCheckout-buttonPrimary-colorHover");
}

.optimizedCheckout-buttonPrimary:active {
    background-color: stencilColor("optimizedCheckout-buttonPrimary-backgroundColorActive");
    border-color: stencilColor("optimizedCheckout-buttonPrimary-borderColorActive");
    color: stencilColor("optimizedCheckout-buttonPrimary-colorActive");
}

/*
// Secondary Button
// Background & Border & Text Color & Typography
//
// Styles the EDIT button for each step.
// -----------------------------------------------------------------------------
*/

.optimizedCheckout-buttonSecondary {
    background-color: stencilColor("optimizedCheckout-buttonSecondary-backgroundColor");
    border-color: stencilColor("optimizedCheckout-buttonSecondary-borderColor");
    color: stencilColor("optimizedCheckout-buttonSecondary-color");
    font-family: stencilFontFamily("optimizedCheckout-buttonSecondary-font"), Arial, Helvetica, sans-serif;
    font-weight: stencilFontWeight("optimizedCheckout-buttonSecondary-font");
}

/*
// Links
// Text Color & Typography
// -----------------------------------------------------------------------------
*/

a {
    color: stencilColor("optimizedCheckout-link-color");
    font-family: stencilFontFamily("optimizedCheckout-link-font"), Arial, Helvetica, sans-serif;
    font-weight: stencilFontWeight("optimizedCheckout-link-font");
}

/*
// Order Summary (Mobile Drawer & Modal)
// Background
// -----------------------------------------------------------------------------
*/

.optimizedCheckout-orderSummary {
    background-color: stencilColor("optimizedCheckout-orderSummary-backgroundColor");
}

/*
// Checkout Steps
// Background & Text Color
//
// Styles the large step-number indicators on the page's left side.
// -----------------------------------------------------------------------------
*/

.optimizedCheckout-step {
    background-color: stencilColor("optimizedCheckout-step-backgroundColor");
}

.optimizedCheckout-step::before {
    color: stencilColor("optimizedCheckout-step-text");
}

.optimizedCheckout-step svg {
    fill: stencilColor("optimizedCheckout-step-text");
}

/*
// Form Labels
// Text Color
//
// Styles text labels on form fields.
// -----------------------------------------------------------------------------
*/

.optimizedCheckout-form-label {
    color: stencilColor("optimizedCheckout-form-text");
}

/*
// Form Input
// Background & Border Color
//
// Styles form fields.
// -----------------------------------------------------------------------------
*/

.optimizedCheckout-form-input {
    background-color: stencilString("optimizedCheckout-formField-backgroundColor");
    border-color: stencilColor("optimizedCheckout-formField-borderColor");
}
```

