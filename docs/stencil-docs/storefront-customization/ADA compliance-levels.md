# ADA Compliance Levels
<div class="otp" id="no-index">

### On this page
- [Accessibility principles](#accessibility-principles)
- [Accessibility guidelines](#accessibility-guidelines)
- [Related resources](#related-resources)
</div>

This article provides examples demonstrating how to implement several [Web Content Accessibility Guidelines (WCAG) 2.1](https://www.w3.org/TR/WCAG21/#guidelines) across compliance levels. You can apply these examples to your site regardless of your compliance level.

## Accessibility principles
Accessibility content must be POUR as stated by WCAG which organizes accessibility guidelines into four principles.

P = Perceivable

O = Operable

U = Understandable

R = Robust

**Perceivable** content means users can comprehend the information being presented. 

*The information cannot be invisible to all their senses.*

**Operable** content means users can perform actions using interface components and navigate the site.

*The interface cannot require interaction that a user cannot perform.*

**Understandable** content means the information and operation of a user interface is understandable.

*The operation of interface or information cannot cause confusion or discomfort for users.*

**Robust** content means the content can be used by a wide variety of technologies.

*The content cannot cause content inaccessibility.*

You are encouraged to create content that addresses all four principles. If any principle is missing, users with disabilities will not be able to successfully use and access web content. 

## Accessibility guidelines
Each principle contains guidelines. The guidelines are the goals you should work towards to acheive a certain conformance level. 
The guidelines featured below are not a complete list and were chosen to highlight possible solutions for how to meet requirements. Using Cornerstone as an example, this tutorial demonstrates how Cornerstone meets the success criteria for the following guidelines.
 

| Principle      | Level A              | Level AA              | Level AAA         |
| --             | --                   | --                    | --                |
| Perceivable    | Meaningful Sequence  | Orientation           | Identify Purpose  |
| Operable       | Bypass Blocks        | Multiple Ways         | Location          |
| Understandable | Language of Page     | Language of Parts     | Unusual Words     |
| Understandable | On Input             | Consistent Navigation | Change on Request |
| Understandable | Error Identification | Error Suggestion      | Help              | 

**Perceivable > Meaningful Sequence: Level A**

Guideline 1.3.2 Meaningful Sequence: When the sequence in which content is presented affects its meaning, a correct reading sequence can be programmatically determined.

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">
 
<!-- theme: info -->
**Cornerstone Technique:**
> The links in the navigation bar form a meaningful sequence. **Search**, **Sign In or  Register**, and **Cart** buttons appear above all other content because many visitors will want to perform these actions.
 
</div>
</div>
</div>

**Perceivable > Orientation: Level AA**

Guideline 1.3.4 Orientation: Content does not restrict its view and operation to a single display orientation, such as portrait or landscape, unless a specific display orientation is essential.

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">
 
<!-- theme: info -->
**Cornerstone Technique:**
> Cornerstone is fully responsive, meaning it automatically adapts to your device (desktop, tablet, and mobile).
 </div>
</div>
</div>

**Perceivable > Identify Purpose: Level AAA**


Guideline 1.3.5 Identify Purpose: In content implemented using markup languages, the purpose of user interface components, icons, and regions can be programmatically determined.

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">
 
<!-- theme: info -->
**Cornerstone Technique:**
> Cornerstone allows you to add your own icons in the navigation of a site to load symbols and vocabulary familiar to users.
</div>
</div>
</div>


**Operable > Bypass Blocks: Level A**

Guideline 2.4.1 Bypass Blocks: A mechanism is available to bypass blocks of content that are repeated on multiple web pages.

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">
 
<!-- theme: info -->
**Cornerstone Technique:**
> Cornerstone allows you to add a visible 'Skip to Main' link to all pages on your site that sends users to the start of the main content of each page.

Example: `/templates/components/common/header.html`

```html
{{lang 'header.skip_to_main'}} {{#if banners.top}}
{{#each (limit banners.top_metadata 1)}}
{{{this.content}}}
{{/each}}
{{/if}}
``` 
</div>
</div>
</div>


**Operable > Multiple Ways: Level AA**

Guideline 2.4.5 Multiple Ways: More than one way is available to locate a web page within a set of web pages except where the web page is the result of, or a step in, a process.

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">
 
<!-- theme: info -->
**Cornerstone Technique:**
> The search bar is in the top right by default; however, you can receive search results on both the quick-search bar and when you press Enter on the search results page.
</div>
</div>
</div>

**Operable > Location: Level AAA**

Guideline 2.4.8 Location: Information about the user's location within a set of web pages is available.

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">
 
<!-- theme: info -->
**Cornerstone Technique:**
> Cornerstone allows the display of breadcrumbs on a web page.

Example: `/templates/components/common/contact-us.html`

```html
{{#partial "page"}} {{> components/common/breadcrumbs breadcrumbs=breadcrumbs}}
{{#unless theme_settings.hide_contact_us_page_heading }}
```
</div>
</div>
</div>

**Understandable > Language of Page: Level A**

Guideline 3.1.1 Language of Page: The default human language of each Web page can be programmatically determined.

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">
 
<!-- theme: info -->
**Cornerstone Technique:**
> Cornerstone allows you to customize your display in any one language of your choice by using the `lang` attribute on the HTML element.
 
</div>
</div>
</div>

**Understandable > Language of Parts: Level AA**

Guideline 3.1.2 Language of Parts: The human language of each passage or phrase in the content can be programmatically determined except for proper names, technical terms, words of indeterminate language, and words or phrases that have become part of the vernacular of the immediately surrounding text.

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">
 
<!-- theme: info -->
**Cornerstone Technique:**
> Cornerstone allows you to translate your theme into multiple displayed languages. 
</div>
</div>
</div>

**Understandable > Unusual Words: Level AAA**

Guideline 3.1.3 Unusual Words: A mechanism is available for identifying specific definitions of words or phrases used in an unusual or restricted way, including idioms and jargon.

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">
 
<!-- theme: info -->

**Cornerstone Technique:**
> Cornerstone allows you to add information and links to your footer categories to provide additional details.
 
</div>
</div>
</div>

**Understandable > On Input: Level A**

Guideline 3.2.2 On Input: Changing the setting of any user interface component does not automatically cause a change of context unless the user has been advised of the behavior before using the component.

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">
 
<!-- theme: info -->
**Cornerstone Technique:**
> Cornerstone ensures that you must click a submit button to perform the action.
</div>
</div>
</div>

**Understandable > Consistent Navigation: Level AA**

Guideline 3.2.3 Consistent Navigation: Navigational mechanisms that are repeated on multiple web pages within a set of web pages occur in the same relative order each time they are repeated, unless a change is initiated by the user.

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">
 
<!-- theme: info -->
**Cornerstone Technique:**
> * Cornerstone uses a consistent presentation and layout for users who interact with repeated content.
> * Cornerstone navigation menus are always in the same place.
> * The Search box is in the same location on all pages.
 
</div>
</div>
</div>

**Understandable > Change on Request: Level AAA**

Guideline 3.2.5 Change on Request: Changes of context are initiated only by user request or a mechanism is available to turn off such changes.

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">
 
<!-- theme: info -->
**Cornerstone Technique:**
> Cornerstone automatically redirects users from an old page to a new page in such a way that they never realize the redirect has occurred.
</div>
</div>
</div>

**Understandable > Error Identification: Level A**

Guideline 3.3.1 Error Identification: If an input error is automatically detected, the item that is in error is identified and the error is described to the user in text.

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">
 
<!-- theme: info -->
**Cornerstone Technique:**
> Cornerstone indicates if the user fails to include an `@` in the email address.
</div> 
</div>
</div>


**Understandable > Error Prevention: Level AA**

Guideline 3.3.4 Error Identification: For web pages that cause legal commitments or financial transactions for the user to occur, that modify or delete user-controllable data in data storage systems, or that submit user test responses, at least one of the following is true: Reversible, Checked, and Confirmed.

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">
 
<!-- theme: info -->
**Cornerstone Technique:**
> Cornerstone provides a checkbox in addition to a submit button. 
</div>
</div>
</div>

**Understandable > Help: Level AAA**

Guideline 3.3.5 Help: Context-sensitive help is available.

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">
 
<!-- theme: info -->
**Cornerstone Technique:**
> * Cornerstone provides a help link on every web page.
> Cornerstone provides text instructions at the beginning of a form or set of fields that describes the necessary input.
 
</div>
</div>
</div>

## Related resources
* [WCAG (Quick Reference)](https://www.w3.org/WAI/WCAG21/quickref/) 
