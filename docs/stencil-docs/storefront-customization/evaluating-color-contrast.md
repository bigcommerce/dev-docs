# Evaluating Color Contrast
<div class="otp" id="no-index">

### On this page
- [Performing a manual review](#performing-a-manual-review)
- [Using an automatic testing tool](#using-an-automatic-testing-tool)
- [Related resources](#related-resources)
</div>

Color contrast is the difference between background and foreground content. The colors need to provide maximum contrast so anyone with a vision deficiency can successfully view page information. Color contrast is important for accessibility because it helps people with color blindness, low vision, low contrast vision, and color vision deficiency.

This tutorial will walk you through the steps of evaluating color contrast for your site. Evaluating your site should include performing a manual review and using an automatic testing tool. 

### Prerequisites
You should be familiar with the [WCAG guidelines](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html) on contrast and color requirements.

## Performing a manual review
Perform a manual review to examine the use of color on your website visually. Ensure the following:

* Text and images are not difficult to read.
* You do not use color as the only visual means of conveying information.
* There is no color but black text on white background.

## Using an automatic testing tool

It is important to verify your findings with an automatic testing tool. There are different tools and techniques to evaluate contrast. This tutorial uses the [color contrast accessibility validator](https://color.a11y.com). A list of other color contrast checkers is in [Related resources](#related-resources). Instructions for using the color contrast accessibility validator are below.

1. Go to https://color.a11y.com.
2. Enter your webpage address and click **Check Contrast**. The tool automatically identifies the contrast ratio and compares it to the standard. 
3. Fix any color contrast issues to satisfy your desired compliance level.
    
    - Click **Test Colors** to change a color-pair contrast.
    - Enter a hex code or pick a color using the eyedropper tool for the background color. 
    - Enter a hex code or pick a color using the eyedropper for the foreground color.
    
4. Continue testing the color contrast until it passes your desired compliance level.

![color-pair](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/color-contrast-01.png "color-pair")

## Related resources

### Color Contrast Checkers
- [WebAIM Color Contrast Checker](https://webaim.org/articles/contrast/evaluating#contrastchecker)  
- [Colour contrast analyser (CCA)](https://www.tpgi.com/color-contrast-checker/)
- [Google Lighthouse](https://developers.google.com/web/tools/lighthouse/)

### Resources
- [The Basics and Importance of Color Contrast for Web Accessibility](https://www.boia.org/blog/the-basics-and-importance-of-color-contrast-for-web-accessibility)




