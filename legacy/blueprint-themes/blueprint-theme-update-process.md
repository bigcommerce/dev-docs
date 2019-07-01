<h1>Theme Update Process</h1>
<div class="otp" id="no-index">
	<h3>On This Page</h3>
	<ul>
		<li><a href="#theme-update-prerequisites">Prerequisites</a></li>
		<li><a href="#blueprint-theme-update-process">Update Process</a></li>
    <li><a href="#theme-update-other-requirements">Requirements</a></li>
  
		</ul>
</div>

Here is how BigCommerce and our partners collaborate to integrate a partner's theme changes/updates into the BigCommerce Theme Marketplace (which merchants also know as our "theme store"):

<a href='#theme-update-prerequisites' aria-hidden='true' class='block-anchor'  id='theme-update-prerequisites'></a>

## Prerequisites 

Integrating a partner's theme changes requires these preconditions:

*   Partner has an existing theme in the BigCommerce Theme Marketplace.

*   BigCommerce sets up a Theme Development store (or converts an existing regular store) and applies the theme. All theme files will automatically be copied into the WebDAV `/template/` directory.

<div class="HubBlock--callout">
<div class="CalloutBlock--">
<div class="HubBlock-content">
    
<!-- theme:  -->

### Template Path Abstracted
> There is no way to re-display this pop-up after selecting Done, so be sure to securely store the credentials before leaving this screen.

</div>
</div>
</div>



<a href='#blueprint-theme-update-process' aria-hidden='true' class='block-anchor'  id='blueprint-theme-update-process'></a>

## Update Process 

1.  The partner switches on Theme Development mode, by using:  
`http://<STORE>/admin/index.php?ToDo=viewTemplates&dev=enable`.
2.  The partner asks BigCommerce to switch a theme. (Partners currently cannot switch it directly, because it’s a paid theme.)

<div class="HubBlock--callout">
<div class="CalloutBlock--error">
<div class="HubBlock-content">
    
<!-- theme: error -->

> There is no way to re-display this pop-up after selecting Done, so be sure to securely store the credentials before leaving this screen.

</div>
</div>
</div>

3.  The partner pulls changes from BigCommerce's GitHub fork, to get the most recent version onto their local machine as well.
4.  The partner makes appropriate changes to CSS/HTML files.
5.  The partner commits their changes into the feature branch, and opens a pull request against the BigCommerce fork.

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">
    
<!-- theme: warning -->

> There is no way to re-display this pop-up after selecting Done, so be sure to securely store the credentials before leaving this screen.

</div>
</div>
</div>

6.  Partner [emails](mailto:themestore@bigcommerce.com) their Git URL to the BigCommerce Theme Marketplace.
7.  BigCommerce integrates changes into BigCommerce Themes.



<a href='#theme-update-other-requirements' aria-hidden='true' class='block-anchor'  id='theme-update-other-requirements'></a>

## Other Requirements 

*   Partners must not change the repository's directory structure or directory names.
*   Files should have permission 644 (`rw-r–r–`).
*   Directories should have permission 755 (`drwxr-x-r-x`).

