<h1>Add reCAPTCHA V2</h1>
<div class="otp">
  <ul>
    <li><a href="#catalog-price_excluding-tax">How to Upgrade</a></li>
	</ul>
</div>

reCAPTCHA v1 was deprecated as of March 31, 2018. To deter spam submission through storefront forms, BigCommerce now supports Google reCAPTCHA v2 challenges, to distinguish human customers/visitors from automated bots. We recommend that all storefront themes take advantage of this upgraded bot detection.

If you have based your theme on a theme/version that already incorporates reCAPTCHA v2, you do not need to take any further action. Compliant themes/versions currently are listed in [Updating Themes with reCAPTCHA V2](https://support.bigcommerce.com/s/article/Updating-Themes-with-reCAPTCHA-v2#updatingthemes) (Knowledge Base).

---

## How to Upgrade

To add reCAPTCHA v2 support to a theme, you will need to update script references in three template files:

* [{theme-name}/templates/pages/auth/create-account.html](https://github.com/bigcommerce/cornerstone/pull/951/files#diff-ecbae6e2b7d5bbf5c950d68878e79d99)
* [{theme-name}templates/components/products/modals/writeReview.html](https://github.com/bigcommerce/cornerstone/pull/951/files#diff-945a5d7f1563068188ae39df568cfd43)
* [{theme-name}/templates/components/pages/contact-us-form.html](https://github.com/bigcommerce/cornerstone/pull/951/files#diff-5351402159301e1c225752f03d9f1f8e)

See [PR #951](https://github.com/bigcommerce/cornerstone/pull/951) in the Cornerstone Github Repository to see differentials for each file that needs to be modified.

It is possible to add reCaptcha to the Login template. See the [Forms object](/stencil-docs/references/) for details.

---

## Resources

### Related Articles

* [Enabling ReCAPTCHA](https://support.bigcommerce.com/s/article/Updating-Themes-with-reCAPTCHA-v2)

