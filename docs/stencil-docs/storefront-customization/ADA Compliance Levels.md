# ADA Compliance Levels
<div class="otp" id="no-index">

### On this page
- [Accessibility Principles](#accessibility-principles)
- [Accessibility Guidelines](#accessibility-guidelines)
- [Related resources](#related-resources)
</div>

This article provides examples demonstrating how to implement several [WCAG 2.1 Guidelines](https://www.w3.org/TR/WCAG21/#guidelines) across compliance levels. You can apply any of the examples to your site regardless of your conformance level.

## Accessibility Principles
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

You are encouraged to create content that addresses all four principles. If any principle is missing, users with disabilities will not be able successfully use and access web content. 

## Accessibility guidelines
Each principle contains guidelines. The guidelines are the goals you should work towards to acheive a certain conformance level. 
The guidelines featured below are not a complete list and were chosen to highlight possible solutions for how to meet requirements. Using Cornerstone as an example, this tutorial demonstrates how Cornerstone meets the success criteria for the following guidelines.
 

| Principle      | Level A              | Level AA              | Level AAA         |
| --             | --                   | --                    | --                |
| Perceivable    | Meaningful Sequence  | Orientation           | Identify Purpose  |
| Operable       | Language of Page     | Language of Parts     | Unusual Words     |
| Operable       | Bypass Blocks        | Multiple Ways         | Location          |
| Understandable | On Input             | Consistent Navigation | Change on Request |
| Understandable | Error Identification | Error Suggestion      |  Help             | 

Perceivable > Meaningful Sequence: Level A

Guideline 1.3.2 Meaningful Sequence: When the sequence in which content is presented affects its meaning, a correct reading sequence can be programmatically determined. (Level A)

Cornerstone Technique:
<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

 The links in the navigation bar form a meaningful sequence. **Search**, **Sign In or  Register**, and **Cart** buttons appear above all other content because many visitors will want to perform these actions.
 
</div>
</div>
</div>

Perceivable > Orientation: Level AA
