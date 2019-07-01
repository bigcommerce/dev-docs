<h1>Layout Subdirectory</h1>
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
		<li><a href="#layout_layout-subdirectory">Layout Subdirectory</a></li>
	</ul>
</div>

<a href='#layout_layout-subdirectory' aria-hidden='true' class='block-anchor'  id='layout_layout-subdirectory'></a>

## Layout Subdirectory

The <span class="fn">/templates/layout/</span> subdirectory is where you assemble Handlebars resources to define your storefront site’s overall structure (header, footer, etc.). You can implement multiple layouts here for different use cases, making it easy to switch between different look-and-feel variations of the same theme.

As prototypes, we have provided a minimal <span class="fn"><a href="https://github.com/bigcommerce/cornerstone/blob/master/templates/layout/base.html">base.html</a></span> page in this subdirectory. To develop your theme, you can copy and/or modify this prototype.

Be sure to set permission `755 (drwxr-xr-x)` on any new **subdirectories** that you add. Also, be sure to set permission `644 (rw-r--r--)` on any new **files** that you add. Without these permissions, running your theme locally will fail with multiple error messages. Bundling your theme will also fail, blocking its upload to a store.

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">
    
<!-- theme: warning -->

### Front Matter Restrictions
> There is no way to re-display this pop-up after selecting Done, so be sure to securely store the credentials before leaving this screen.

</div>
</div>
</div>



## Resources

* [Cornerstone Layout Directory](https://github.com/bigcommerce/cornerstone/blob/master/templates/layout/base.html)

