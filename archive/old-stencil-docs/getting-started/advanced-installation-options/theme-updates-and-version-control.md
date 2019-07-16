<h1>Theme Updates and Version Control</h1>

<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#theme-updates_customizing">Customizing Strategically for Easier Updates</a></li>
    <li><a href="#theme-updates_goruck-best-pracs">GoRuck's Best Practices for Handling Theme Updates</a></li>
    <li><a href="#theme-updates_synchronizing-cornerstone">Synchronizing Your Theme With Cornerstone's Updates</a></li>
    <li><a href="#theme-updates_synchronizing-multiple">Synchronizing Updates for Multiple Themes</a></li>
    <li><a href="#theme-updates_preserving_client_changes">Preserving a Client's Theme Setting Changes</a></li>
	</ul>
</div>

<div class="HubBlock--callout">
<div class="CalloutBlock--">
<div class="HubBlock-content">
    
<!-- theme:  -->

### Distributed Version Control via Git
> Many techniques discussed below rely on GitHub's _distributed version control_ model and features. For the underlying principles, please see [Git's own documentation](https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control).

</div>
</div>
</div>

<a href='#theme-updates_customizing' aria-hidden='true' class='block-anchor'  id='theme-updates_customizing'><i aria-hidden='true' class='linkify icon'></i></a>

## Customizing Strategically for Easier Updates

In order to keep your store and Stencil theme performant, it's crucial to know the best way to set up your customized Stencil theme in order to smoothly incorporate future bug fixes, enhancements, and updates that are applied to the base theme. 

---

<a href='#theme-updates_goruck-best-pracs' aria-hidden='true' class='block-anchor'  id='theme-updates_goruck-best-pracs'><i aria-hidden='true' class='linkify icon'></i></a>

## GoRuck's Best Practices for Handling Theme Updates

The guidelines provided are from Web Developement team from the BigCommerce client, [GoRuck](https://www.goruck.com/). 

GoRuck's scenario addresses maintaining a single custom theme that is based on a third-party Marketplace theme (a theme other than Cornerstone). These guidelines can also apply to maintaining a custom theme based on Stencil's default Cornerstone theme.

### Handling and Managing Theme Updates

_We've made significant changes to our theme, and one principle that I've found successful is isolating my changes as much as possible. I try to put my changes into their own files, whether they're changes to templates, JavaScript, or SCSS._

_I also name all my files, CSS classes and identifiers, and JavaScript methods and classes with a `gr-` prefix (as an abbreviation for our company, GORUCK LLC). Also, any changes I make to standard theme files are identified with a comment, such as:_

`//Go Ruck Customization`
		
_For example, I have a file in `assets/scss/` named `gr-theme.scss`. All of the styles I've added to the theme are either in this file, or imported by this file. So for styling, my only changes to the theme itself are in a handful of places where I had to change an existing theme style (identified with a comment), plus this one line in `templates/layout/base.html`:_

`{{{stylesheet '/assets/css/gr-theme.css'}}}`

_I've found that this approach provides several advantages:_

* It makes it easier to distinguish my custom code from code supplied by the default theme.
* It makes it less likely that my code will get intermingled with the standard theme code. This, in turn, prevents my code from unexpectedly being affected by theme updates.
* It makes it easier to merge base-theme updates into my theme code.

### Comparing and Merging Theme Updates

_Having isolated my changes as much as I can, I identify theme changes and updates by comparing base themes, rather than by comparing base themes to my customized theme. When a new version of the theme is released, I download the `.zip` file from the BigCommerce Control Panel._

_I then use a desktop diff tool (Beyond Compare) to 
compare the new version to the .zip file of the theme's previous release. I ignore changes in the .zip file's
 `meta/` and `parsed/` folders, and to its `manifest.json`, and do a `Compare Contents` on the rest of the files._

Ultimately, I need to examine the changes carefully, to identify any changes that might affect, or be affected by, my customizations. And I need to test thoroughly. But comparing the stock themes to each other reduces the number of changes I have to examine. 

Also, because I isolate my changes, most of the theme changes can be copied directly into the corresponding file in my customized theme. In practice, this means that I can limit my testing to the areas affected by changes in the standard theme, rather than having to re-test all my own changes.

I personally find that it is also helpful to migrate *every* theme update into my customized version, as the update is released. If I were to wait, and to allow changes to accumulate and become more substantial, I think it would be more difficult to adequately test – and correctly integrate – the changes. Similarly, I'm grateful to the developer of our base theme (Pixel Union) for updates that have always made small, incremental changes.

### Dynamic Content Injection

_We've also come up with a variety of techniques for dynamically placing content on a page. For example, we can dynamically add tabs to a product page, using content stored on our WebDAV. Similarly, we can inject content from an external file into the body of a page. This allows us to put something that appears in many places, like a sizing chart, in a single place where it can be easily updated._

_Or, we can use the BigCommerce control panel's various HTML editors – for Products, Categories, and Content > Web Pages – to inject content into predefined "dropzones" (custom div's). This allows us to generate a wide variety of content pages using a single custom template._

All of these techniques minimize the complexity of merging base-theme updates into our customized theme. For further details and examples on how we implement these techniques, see [Dynamic Content Rendering on Stencil Storefronts](/stencil-docs/conditional-logic-examples/dynamic-content-rendering).

---

<a href='#theme-updates_synchronizing-cornerstone' aria-hidden='true' class='block-anchor'  id='theme-updates_synchronizing-cornerstone'><i aria-hidden='true' class='linkify icon'></i></a>

## Synchronizing Your Theme With Cornerstone's Updates

This section addresses two methods that will allow you to keep your customized Stencil theme up to date with Cornerstone's updates, enhancements, and bug fixes:

* Updating Lightly Customized Themes
* Updating Heavily Customized Themes

We've adapted these tips from one a Stencil theme developer who is an active member of the BigCommerce Community.

### Updating Lightly Customized Themes

In this scenario, you can use Git's cherry-pick option to merge in specific Cornerstone commits.

Use the Stencil Framework Release Notes to look up specific updates' commit hashes on the Cornerstone repository.

See [this explanation of how to use the cherry-pick option](https://stackoverflow.com/questions/9339429/what-does-cherry-picking-a-commit-with-git-mean) (Stack Overflow).

### Updating Highly Customized Themes

Here, unexpected errors from automatic merges can be time-consuming to undo. So, consider this handtooled approach:

Use GitHub's Web interface to inspect each Cornerstone commit (change) of interest. Each commit will show you – for all changed files – a diff view highlighting any deletions (left/red) and any insertions (right/green).

For changes that you want to incorporate into your theme, access the source code.

As illustrated below, you can either access individual files via Github's Raw view, or you can download a .zip of the whole Cornerstone repo in order to access all files locally.

Manually edit the changes into your theme's affected files.

### Accessing Individual Files

In the file-by-file approach: For each commit that you would like to incorporate into your custom theme, do the following for each of the commit's changed files.

In GitHub's diff view, click the View button at the upper right. (We show it highlighted with a red border and a tooltip.) You will see the file's full contents, as shown below.

Click the Raw button at the upper right (which we show highlighted in red). This will reveal the file's full contents as plaintext – allowing you to copy and paste without picking up the table metadata used to display line numbering.

### Downloading the Cornerstone Repository

This approach downloads all theme files at once, allowing you to copy/paste their relevant contents locally.

1. Navigate to the [Cornerstone Github Repository](https://github.com/bigcommerce/cornerstone).
2. On the right hand side of the page, click the green `Clone or download` button, and select Download ZIP.

---

<a href='#theme-updates_synchronizing-multiple' aria-hidden='true' class='block-anchor'  id='theme-updates_synchronizing-multiple'><i aria-hidden='true' class='linkify icon'></i></a>

## Synchronizing Updates for Multiple Themes

These tips run from simpler to more-complex scenarios, with a similar progression from simpler to more-complex tools.

### Enlist Your Clients in Future-Proofing
Warn your clients that editing their themes' .html files (via Edit Theme Files) will complicate future theme upgrades. Ask clients to keep a record of such changes, so that when you release a theme update, they can reapply their changes themselves.

### Max Out Variations
For very simple theme differences (like changing color values), you can maintain a different theme variation per storefront or use case. Given Stencil's limit of four variations per theme, this approach obviously has limited scalability.

### Customize Outside the Theme
Rely as much as possible on dynamic aspects of the BigCommerce control panel, like the Footer Scripts editor. (Control‑panel customizations are saved per store, without complicating your theme's codebase.) For other examples of control-panel options, please see Dynamic Content Injection above.

### Use Conditional Logic within Master Templates
For subtle changes to a portion of a template file, use Handlebars helpers and conditionals to render different HTML for each client's flavor of the theme.

### Parallel GitHub Repo's
Where different clients' theme flavors diverge into completely custom pages – for example, each client has a wildly different homepage layout – Git's systematic version control helps. You will probably want to fork or branch separate repo's, one per client, and maintain/update them in parallel.

As with relying on theme variations, this approach has limited scalability. Beyond a certain number of clients/themes (certainly by 10), it becomes cumbersome.

### Buffered Updates to Multiple Themes
For greater scalability, you might choose to create your own master fork/branch of Cornerstone for your group of themes. Keep that fork/branch in sync with Cornerstone updates, then cascade the updates to theme-specific repo's that you fork/branch from this master. (This extends the approach of isolating customizations, outlined above.)

---

<a href='#theme-updates_preserving_client_changes' aria-hidden='true' class='block-anchor'  id='theme-updates_preserving_client_changes'><i aria-hidden='true' class='linkify icon'></i></a>

## Preserving a Client's Theme Setting Changes

Once a client installs a theme, they are able to configure the theme's settings in **My Themes** > **Customize** within their BigCommerce control panel. These settings are stored in the theme's `config.json`. A client's changes to these settings will be inadvertently reverted if a developer pushes an update to the theme without first merging the changes into their local development copy of the theme. As such, we recommend developers download a fresh copy of the client's theme and merge in any changes made to `config.json` before pushing theme updates to the client's site.

