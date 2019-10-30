# Components

*Below are various components (and their markup) used in BigCommerce developer documentation  `.md` files*

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
    
<!-- theme: info -->

### Pro-Tip:
> Copy and paste the components into your favorite text expander (like PhraseExpress or PhraseExpander), or add to your favorite code editor's snippets.

</div>
</div>
</div>

## Code Blocks

**Markup:**

```markdown
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

```json
{
    "fruits": [
        "apples",
        "oranges",
        "bananas"
    ]
}
```

## Images

**Markdown:**

```markdown
![{{alt tag}}]({{src}} "{{title}}")
```

**Example:**

```html
![Dev Tools](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/devtools.png "Dev Tools")
```

**Result:**

![Dev Tools](https://raw.githubusercontent.com/bigcommerce/dev-docs/master/assets/images/devtools.png "Dev Tools")
