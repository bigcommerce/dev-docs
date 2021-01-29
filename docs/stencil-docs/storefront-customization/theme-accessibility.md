# Developing Themes for Accessibility

<div class="otp" id="no-index">

### On this page
- [Image alt text](#image-alt-text)
- [Text accessibility](#text-accessibility)
- [Keyboard accessibility](#keyboard-accessibility)
- [Customization](#customization)
- [Related resources](#related-resources)
</div>

Designing for accessibility means being inclusive to the needs of all users. This article outlines the basic accessibility requirements BigCommerce would recommend for all themes.

We have included four accessibility best practices and examples that will help you develop a theme that meets the needs of the broadest range of abilities.

### Prerequisites
* [A BigCommerce store](https://support.bigcommerce.com/s/article/Starting-a-Bigcommerce-Trial).
* A store theme. (The following examples use the Cornerstone theme.)

## Image alt text
Alternative (alt) text is an image description read aloud by a screen reader, making the content accessible to visually impaired users. All HTML `<img>` elements should have an `alt` attribute to provide a text description of the image.

```html
<img alt =" ".../>
```
You can add the alt text to the `<img>` element in the image widget of Page Builder or in the `cornerstone/assets/img/` directory.

Follow the steps below to add alt text to an image using the control panel:
1. Go to **Storefront** > **My theme** in the control panel, then click **Customize**.
2. Launch Page Builder and select the image widget.
3. Enter the alt text.
4. Click **Save**.

![Image Widget](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/accessibility_image_widget.png "Image Widget")

### Aria-label attribute
There are other options for providing text for images. Developers can use the aria-label attribute, a [WCAG (Web Content Accessibility Guidelines)](https://www.w3.org/WAI/standards-guidelines/wcag/) technique which provides assistive technology with the aria label text instead of the image alt text. 

The aria-label attribute uses an ID reference value that matches the ID element attribute to associate an element with text. Screen readers use the text of one or more identified elements, which can be seen elsewhere on the page.

**Example**

The example below displays how to use an aria-label for two elements considered to be one image.

```html
<div role="img" aria-label="Cart images">

<img src = "giftCard.png" alt=""/>
<img src = "Checkout.png" alt=""/>
</div>
```

## Text accessibility
Text accessibility involves making content readable and understandable. You can achieve text accessibility by using the following:
* Color contrast
* Text headings
* Text size and alignment
* Text links

### Color contrast
Color contrast is an essential factor in visual accessibility. Use contrasting colors for better readability, along with keeping headings clear and concise.

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

> ### Note
> According to [WCAG 2.1 (Web Content Accessibility Guidelines)](https://www.w3.org/TR/WCAG21/), your eCommerce website must have a minimum color contrast ratio of at least 4.5.1 for standard text and 3:1 for large text. We recommend presetting these guidelines, using [Lighthouse](https://developers.google.com/web/tools/lighthouse) or Chrome's [Accessibility Developer Tools](https://chrome.google.com/webstore/detail/accessibility-developer-t/fpkknkljclfencbdbgkenhalefipecmb/reviews?hl=en) to ensure you meet WCAG 2.1 guidelines. 

</div>
</div>
</div>

Pure black text on a white background can cause eye strain. Instead, try black text on light blue, pale green, or gray background. The following example demonstrates good color contrasting and has a 14.9.1 contrast ratio.

**Good contrast ratio**
![Good contrast](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/accessibility_good_color_contrast.png "Good contrast")

It is essential to avoid colors that are too close together. For example, avoid green and black, green and gray, and green and red. Alternatively, it is good practice to use light text on dark backgrounds or dark text on light backgrounds. The example below shows poor color contrasting because the black text is on a green background. The color constrast ratio is 3.8.1. It would have been better to use white text on a dark green background.

**Poor contrast ratio**
![Poor contrast](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/accessibility_poor_color_contrast.png "Poor contrast")

### Text headings
Text headings organize and provide structure for a page, helping users to understand its contents. Headings should be logical, clear, and concise. The following example demonstrates the incorrect and correct structure of text headings.

![Text headings](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/accessibility_text_headings.png "Text headings")

Your main heading should be H1 and indicate the main content. The incorrect example displays the main heading as H2, which you should only use for subtopics. In addition, don't skip or alter headings as it could cause a fragmented experience, as shown above. H3 is out of order and should follow H2. The correct structure displayed above on the right shows heading levels from h1 to h3 communicating more specific information about the previous section.

For an example video on how to create text headings, see [How Headings Help Screen Reader Users](https://www.youtube.com/watch?v=zRTqCGJ_HwQ).

### Text size and alignment
The use of white space around blocks of text makes it easier to read. We recommend the following text formatting:
* left-aligned text
* font size of 14px
* 55-65 characters per line
* sans serif fonts

The following examples demonstrate the incorrect and correct usage of text size and alignment. The incorrect example shows 25-40 characters per line, uses Comic Sans MS, and the font is 11px. The correct example uses the recommended font size of 14 px, has 55-65 characters per line, and uses Arial font.

The correct example demonstrates how to make text readable. To learn more about text size and alignment needed for accessibility, see the [WebAIM article on Typefaces and Fonts](https://webaim.org/techniques/textlayout/).

![Incorrect text](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/accessibility_incorrect_type_size.png "Incorrect text")

![Correct text](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/accessibility_correct_text_size.png "Correct type")

### Text links
Text links should be unique within a page and meaningful when read out of context.

The following example demonstrates how you can make link text meaningful.

| No information | Meaningful information |
| -- | --|
| For more information on how to modify the login form, <ins>click here</ins>. | Read more about <ins>modifying the login form</ins>.|

Don't use "click here" for the linked text, instead use the exact title of a linked page or use a description of the linked page. You may need to rework a sentence to make the text meaningful.

Additional linked text recommendations:
* Use unique link text where possible.
* Avoid using a URL as the link text, consider using the page title or description of the page.
* Don't use the word "link" in your link text.
* Don't capitalize links.
* Keep link text concise.
* Don't link directly to downloads.
* Provide a warning when link text opens a new window.
* Remove broken or empty links.

## Keyboard accessibility
Keyboard accessibility involves making a theme accessible without the use of a mouse. Ensure you can navigate to all links, menus, buttons, and form fields using the keyboard. Press the Tab key and navigate from the top of the page to the bottom. The navigation order must be logical and intuitive.

To enable an element to participate in keyboard navigation, use the `tabindex` global attribute.

```js
a.setAttribute("tabindex","0")
```

Open the following example in a new tab and try it out, [native-keyboard-accessibility.html](https://mdn.github.io/learning-area/tools-testing/cross-browser-testing/accessibility/native-keyboard-accessibility.html). Press the Tab key and navigate from the top of the page to the bottom, highlighting active elements. You can also use the arrow keys to scroll through the dropdown menu.

For an example video on keyboard accessibility, see [Accessible Components: Keyboard access -- Polycasts#49](https://www.youtube.com/watch?v=REVxMvdBYMw).

## Customizations
You can add scripts or code to improve the accessibility of your theme. As stated above, you can use the `tabindex` global attribute to add an element for keyboard navigation. Also, we suggest doing the following:

* Add a script or plugin to allow mobile, tablet, or desktop viewing. Use responsive design to match user technology to accommodate different zoom states and viewport sizes.
* Add multi-factor authentication or alternative methods besides CAPTCHA to verify identity. Visual CAPTCHA does not allow alt text, preventing visually impaired people from using it.
* Add hidden titles that can be accessed by a screen reader.

**Example**

To update a menu button to add more color contrast, add the following text to the `footer.html` file for your mobile and regular templates.

```html
<style>
.mobileMenu-toggle .mobileMenu-toggleIcon, .mobileMenu-toggle .mobileMenu-toggleIcon:after, .mobileMenu-toggle .mobileMenu-toggleIcon:before {
background: #fff;
}
</style>
```
There are many more customizations and changes you can make to increase your store's accessibility. This article lists just a few. To learn more about accessibility, see the list of related resources below. 

## Related resources

### Articles
- [WCAG (Web Content Accessibility Guidelines)](https://www.w3.org/WAI/standards-guidelines/wcag/)
- [Essential Accessibility](https://wwww.essentialaccessibility.com/)
- [Audio Eye](https://www.audioeye.com)
- [AccessiBe](https://accessibe.com/)

### Videos
- [How Headings Help Screen Reader Users](https://www.youtube.com/watch?v=zRTqCGJ_HwQ)
- [WebAIM article on Typefaces and Fonts](https://webaim.org/techniques/textlayout/)
- [Accessible Components: Keyboard access -- Polycasts#49](https://www.youtube.com/watch?v=REVxMvdBYMwaccessioa)
