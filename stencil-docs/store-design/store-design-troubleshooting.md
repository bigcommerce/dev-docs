<h1>Store Design Troubleshooting</h1>
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#theme-editor_empty">Empty Drop-Down List in Store Design Panel</a></li>
    <li><a href="#theme-editor_configured">Configured Control Missing from Store Design Panel</a></li>
    <li><a href="#theme-editor_theme-changes">Theme Changes Not Saved from Store Design UI</a></li>
	</ul>
</div>

<a href='#theme-editor_empty' aria-hidden='true' class='block-anchor'  id='theme-editor_empty'></a>

## Empty Drop-Down List in Store Design Panel

* **Symptom:** A drop-down list's outline appears below its configured label. However, the list appears to be empty.
* **Likely Cause:** A default value specified in the theme's <span class="fn">config.json</span> file is not enumerated in the <span class="fn">schema.json</span> file.
* **Resolution:** Update <span class="fn">schema.json</span> to include the <span class="fn">config.json<span> value.



<a href='#theme-editor_configured' aria-hidden='true' class='block-anchor'  id='theme-editor_configured'></a>

## Configured Control Missing from Store Design Panel

* **Symptom:** A control that you have configured within <span class="fn">schema.json</span> is completely absent from the Store Design UI.
* **Likely Cause:** The specified "type" is one of: text, text area, radio [button], or image.
(Store Design does not currently support these data types.)
* **Resolution:** Display the user option via one of the supported data types: color, font, select [drop-down list], or checkbox.



<a href='#theme-editor_theme-changes' aria-hidden='true' class='block-anchor'  id='theme-editor_theme-changes'></a>

## Theme Changes Not Saved from Store Design UI

* **Symptom:** Changes saved in a browser's Store Design panel are not reflected in the storefront.
* **Likely Cause:** Check whether Store Design to customize the same storefront.
* **Resolution:** We strongly recommend opening only one instance of Store Design, at a time, per storefront. BigCommerce currently provides no synchronization mechanism for configuration changes from multiple Store Design instances. So the storefront's <span class="fn">schema.json</span> will record the last changes made by any instance – but changes saved earlier by other instances might be lost.

<div class="HubBlock--callout">
<div class="CalloutBlock--">
<div class="HubBlock-content">
    
<!-- theme:  -->

### Check the Terminal Window
> There is no way to re-display this pop-up after selecting Done, so be sure to securely store the credentials before leaving this screen.

</div>
</div>
</div>



## Resources
### Related Articles
* [Testing and Debugging Your Theme](https://developer.bigcommerce.com/stencil-docs/development-quickstart/testing-and-debugging-your-theme)
* [Common Stencil CLI Pitfalls and How to Avoid Them](https://medium.com/bigcommerce-developer-blog/common-stencil-cli-pitfalls-and-how-to-avoid-them-7562dbbab793) (BigCommerce Developer Blog)

