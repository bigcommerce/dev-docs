# Blueprint and Developer Mode

<div class="otp" id="no-index">

### On This Page
- [A Foundation for Creating Themes](#a-foundation-for-creating-themes)
- [Setting Up Your Environment](#setting-up-your-environment)

</div> 

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">
    
<!-- theme: warning -->

### Restricted/Grandfathered Access
> As of November 2016, new BigCommerce stores are being offered themes exclusively from BigCommerce's new <a href="https://support.bigcommerce.com/articles/Public/The-Stencil-Theme-Platform" target="_blank">Stencil</a> theme platform. For existing stores, the control panel's <NOBR><b>Themes Marketplace</b></nobr> and <NOBR><b>My Themes</b></nobr> pages will show only those Blueprint themes that have been applied to the store and/or purchased before November 2016. <br><br> 

This means that the workflow below will work only for stores that have applied or purchased at least one Blueprint theme before November 2016. For information about developing on the current Stencil platform, please see <a href="https://stencil.bigcommerce.com/docs/" target="_blank">this developer documentation</a>.

</div>
</div>
</div>

## A Foundation for Creating Themes 

Our (legacy) Blueprint "Classic Next" base theme provides a starting point for creating a new theme. This theme includes responsive support out-of-the-box, so it works with lower resolutions like those on mobile devices. The visual design has been stripped back, so you can create from a clean canvas.

<a href="https://blueprint-demo.mybigcommerce.com" target="_blank">View the demo</a>.

## Setting Up Your Environment 

Follow these steps to start developing using the Blueprint theme:

1.  To enable the Blueprint theme on your store, simply log in to the control panel, and place <NOBR>`/index.php?ToDo=viewTemplates&dev=enable` </nobr>after `/admin`.<br>
    (For example: <NOBR>`https://store-123abmy.mybigcommerce.com/admin/index.php?ToDo=viewTemplates&dev=enable`.</nobr>)
2.  Apply the Blueprint theme.
3.  Connect to the site via <a href="https://forum.bigcommerce.com/s/article/File-Access-WebDAV" target="_blank">WebDAV</a>.
4.  Once connected via WebDav, navigate to the `/template/` folder, where you will have access to all the files that make up a theme.
5.  To make a change to a file, just download the file, edit it, and then upload your altered version.
6.  Every time you make changes to any files, you will need to upload them through WebDAV for the changes to be reflected on your site.
