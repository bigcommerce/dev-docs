# Components

*Below are the various components (and their markup) used in devdocs articles.*


<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">
    
<!-- theme: {{callout_type}} -->

### Pro-Tip:
> Copy and paste the components into your favorite text expander (like PhraseExpress or PhraseExpander), or add to your favorite code editor's snippets.

</div>
</div>
</div>

## Callout Blocks

**Markup:**

```html
<div class="HubBlock--callout">
<div class="CalloutBlock--{{callout_type}}">
<div class="HubBlock-content">
    
<!-- theme: {{callout_type}} -->

### {{title}}
> There is no way to re-display this pop-up after selecting Done, so be sure to securely store the credentials before leaving this screen.

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

## Code Blocks

**Markup:**

```markdown
<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">{{title}}</div>
    </div><div class="HubBlock-header-subtitle">{{subtitle}}</div>
</div>

<!--
title: "{{title}}"
subtitle: "{{subtitle}}"
lineNumbers: true
-->

```{{code_lang}}
{code}}{{new-line}}```
```

**Example:**

```html
```

**Result:**

---

## Images

**Markdown:**

```markdown
<!--
    title: {{title}}
    data: {{src}}
-->

#### {{title}}
![{{title}}]({{src}} "{{title}}")
```

**Example:**

```html
```

**Result:**

---

## Schema Blocks

**Markup:**
```html
<a href="{{path}}" class="devdocs-schema-box">Name of Reference</a>
```

**Example:**
```html
<a href="/stencil-docs/object-references/models/configjson" class="devdocs-schema-box">Config.json Object Reference</a>
```

> `{{path}}` - the relative path to the Dev Center page that contains the reference HTML.  

---

## Try in Postman Buttons

* See [Creating a Run in Postman Button](https://learning.getpostman.com/docs/postman_for_publishers/run_button/creating_run_button/) for instructions on creating the button and generating the markdown.