# WCAG Compliance Levels


This article demonstrates how Cornerstone satisfies [Web Content Accessibility Guidelines (WCAG) 2.1](https://www.w3.org/TR/WCAG21/#guidelines) across compliance levels. You can perform similar techniques to your site regardless of your compliance level. For detailed implementation information, see [Implementing WCAG Guidelines](/stencil-docs/accessibility/implementing-WCAG-guidelines).

## Accessibility principles
WCAG organizes accessibility guidelines into four principles.

**Perceivable.** Users can comprehend the information being presented. 
The information cannot be invisible to all their senses.

**Operable.** Users can perform actions using interface components and navigate the site.
The interface cannot require interaction that a user cannot perform.

**Understandable.** The information and operation of a user interface are understandable.
The operation of interface or information cannot cause confusion or discomfort for users.

**Robust.** Users can perform a wide variety of technologies.
The content cannot cause content inaccessibility.

We encourage you to create content that addresses all four principles. If any principle is missing, users with disabilities will not be able to successfully use and access web content. 

## Accessibility guidelines
Each principle contains guidelines, the goals you should work towards to acheive a certain conformance level. 
The guidelines featured below are not a complete list and were chosen to highlight possible solutions for how to meet requirements. This article demonstrates how Cornerstone meets the success criteria for the following guidelines.
 
Perceivable

| Level    | Guideline 1.1: Text Alternatives                                           | Cornerstone technique |
| --       | --                                                                         | --                    | 
| Level A  | [Non-text Content](https://www.w3.org/TR/WCAG21/#non-text-content)         | Alt text is available in all areas of the theme (blogs, white pages, banners, product editor, category pages, page builder, etc.).     |

| Level    | Guideline 1.3: Adaptable                                                   | Cornerstone technique |
| --       | --                                                                         | --                    | 
| Level A  | [Meaningful Sequence](https://www.w3.org/TR/WCAG21/#meaningful-sequence)   | The links in the navigation bar form a meaningful sequence. Search, Sign In or Register, and Cart buttons appear above all other content because many visitors will want to perform these actions.|
| Level AA | [Orientation](https://www.w3.org/TR/WCAG21/#orientation)                   |The theme is fully responsive, meaning it automatically adapts to your device (desktop, tablet, and mobile).                                              |
| Level AAA| [Identify Purpose](https://www.w3.org/TR/WCAG21/#identify-purpose)         | The option to add your own [fonts and icons](/stencil-docs/storefront-customization/using-custom-fonts-and-icons) in the navigation of a site to load symbols and vocabulary familiar to users.                                                          |

| Level    | Guideline 1.4: Distinguishable                                              | Cornerstone technique |
| --       | --                                                                          | --                    | 
| Level A  | [Use of Color](https://www.w3.org/TR/WCAG21/#use-of-color)                  | Multiple carousel images are indicated by dots below the carousel and next and previous arrows appear on carousel images.                               |
| Level AA | [Contrast (Minimum)](https://www.w3.org/TR/WCAG21/#contrast-minimum)        |All text and images have a contrast ratio of at least 4:5:1 except for the exempted items stated in WCAG.                                                  |
| Level AAA| [Contrast (Enhanced)](https://www.w3.org/TR/WCAG21/#contrast-enhanced)      | All text and images have a contrast ratio of at least 7:1 except for the exempted items stated in WCAG.|

Operable
| Level    | Guideline 2.4: Navigable                                                    | Cornerstone technique |
| --       | --                                                                          | --                    | 
| Level A  | [Bypass Blocks](https://www.w3.org/TR/WCAG21/#bypass-blocks)                | The option to add a visible 'Skip to Main' link to all pages on your site that sends users to the start of the main content of each page. [Bypass Blocks](/stencil-docs/accessibility/implementing-WCAG-guidelines#bypass-blocks) example    |
| Level AA | [Multiple Ways](https://www.w3.org/TR/WCAG21/#multiple-ways)                | The search bar is in the top right by default; however, you can receive search results on both the quick-search bar and when you press Enter on the search results page.                                                                                                                  |
| Level AAA| [Location](https://www.w3.org/TR/WCAG21/#location)                          | Breadcrumbs are allowed on a web page. [Location](/stencil-docs/accessibility/implementing-WCAG-guidelines#location) example                                                                                                                    |

Understandable
| Level    | Guideline 3.1: Readable                                                     | Cornerstone technique |
| --       | --                                                                          | --                    | 
| Level A  | [Language of Page](https://www.w3.org/TR/WCAG21/#language-of-page)          | The ability to customize your display in any one [language](/stencil-docs/localization/localization-tutorial) of your choice by using the lang attribute on the HTML element.                                                                              |                                                 
| Level AA | [Language of Parts](https://www.w3.org/TR/WCAG21/#language-of-parts)        | The option to translate your theme into [multiple displayed languages](/stencil-docs/localization/multi-language-checkout).                |
| Level AAA| [Unusual Words](https://www.w3.org/TR/WCAG21/#unusual-words)                | A mechanism is available for users to perceive content as a single control for a distinct function. [Unusual words](/stencil-docs/accessibility/implementing-WCAG-guidelines#unusual-words) example.                               |


| Level    | Guideline 3.2: Predictable                                                  | Cornerstone technique |
| --       | --                                                                          | --                    | 
| Level A  | [On Input](https://www.w3.org/TR/WCAG21/#on-input)                          | You are required to click a submit button to perform an action.                                                                                     |
| Level AA | [Consistent Navigation](https://www.w3.org/TR/WCAG21/#consistent-navigation)| * There is a consistent presentation and layout for users who interact with repeated content. <br>* Navigation menus are always in the same place.</br> * The Search box is in the same location on all pages.                                                                               |         
| Level AAA| [Change on Request](https://www.w3.org/TR/WCAG21/#change-on-request)        | Users are automatically redirected from an old page to a new page in such a way that they never realize the redirect has occurred.                       |


| Level    | Guideline 3.3: Input Assistance                                             | Cornerstone technique |
| --       | --                                                                          | --                    | 
| Level A  | [Error Identification](https://www.w3.org/TR/WCAG21/#error-identification)  | Users receive an error message when they fail to include an @ in the email address.                                                                       |
| Level AA | [Error Suggestion](https://www.w3.org/TR/WCAG21/#error-suggestion)          | Prevent errors with the use of a checkbox and a submit button.                                                                                    |     
| Level AAA| [Help](https://www.w3.org/TR/WCAG21/#help)                                  | * A help link is on every web page. <br>* Text instructions are at the beginning of a form or set of fields that describes the necessary input.</br> |


## Related resources
* [WCAG (Quick Reference)](https://www.w3.org/WAI/WCAG21/quickref/) 
