# Components
*Below are the various components (and their markup) used in devdocs articles.*


<!-- TOC -->

- [Callouts](#callouts)
- [Code Blocks](#code-blocks)
- [Images](#images)
- [Menu & Page Anchors](#menu)
- [Postman Buttons](#postman)

<!-- /TOC -->

---

<a id="markdown-callouts" name="callouts"></a>

## Callouts

**Markup:**

```html
<div class="HubBlock--callout">
<div class="CalloutBlock--{{callout_type}}">
<div class="HubBlock-content">
    
<!-- theme: {{callout_type}} -->

### {{title}}
> {{body}}

</div>
</div>
</div>
```

**Example:**

```html
<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">
    
<!-- theme: {{callout_type}} -->

### Pro-Tip:
> Copy and paste the components into your favorite text expander (like PhraseExpress or PhraseExpander), or add to your favorite code editor's snippets.

</div>
</div>
</div>
```

**Result:**

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">
    
<!-- theme: {{callout_type}} -->

### Pro-Tip:
> Copy and paste the components into your favorite text expander (like PhraseExpress or PhraseExpander), or add to your favorite code editor's snippets.

</div>
</div>
</div>


---


<a id="markdown-code-blocks" name="code-blocks"></a>

## Code Blocks

**Markup:**

```markdown

<!--
title: "{{title}}"
subtitle: "{{subtitle}}"
lineNumbers: true
-->

```{{code_lang}}
{code}}{{new-line}}```
```

**Example**

```html
\```json
{
    "fruits": [
        "apples",
        "oranges",
        "bananas"
    ]
}
\```
```


**Result:**

<!--
title: "Some JSON"
subtitle: "An Example"
lineNumbers: true
-->

```json
{
    "fruits": [
        "apples",
        "oranges",
        "bananas"
    ]
}
```

---

<a id="images"></a>

## Images

**Markdown:**

```markdown
<!--
    title: {{title}}
    data: {{src}}
-->

#### {{title}}
![{{alt tag}}]({{src}} "{{title}}")
```

**Example:**

```html
<!--
    title: {{title}}
    data: {{src}}
-->

#### Dev Tools
![Dev Tools](/assets/img/devtools.png "Dev Tools")
```


**Result:**

<!--
    title: {{title}}
    data: {{src}}
-->

#### Dev Tools
![Dev Tools](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/img/devtools.png "Dev Tools")

---

<a id="menu"></a>

## Menu

**Markdown**

```html
# Webhooks
<div class="otp" id="no-index">

### On this Page
	
* [Webhook Endpoints](#webhook-events_endpoints)
* [Webhook Response Struture](#webhook-events_response-structure)

</div>

```

### Page Anchors

> There must a space between the a tag and the menu title otherwise it will not work.

```html
<a id="webhook-events_endpoints"></a>

<a id="markdown-webhook-endpoints" name="webhook-endpoints"></a>
## Webhook Endpoints
```

```html
<a id="webhook-events_response-structure"></a>

<a id="markdown-webhook-response-struture" name="webhook-response-struture"></a>
## Webhook Response Struture
```


---

<a id="postman"></a>

## Try in Postman Buttons

See [Creating a Run in Postman Button](https://learning.getpostman.com/docs/postman_for_publishers/run_button/creating_run_button/) for instructions on creating the button and generating the markdown.


**Example**

To follow along, we have created a Postman Collection.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/3f005ed74030e01bbf7a)

> Give the button a relavent title. You can also use the button above as an example of what to include in a Postman button,
