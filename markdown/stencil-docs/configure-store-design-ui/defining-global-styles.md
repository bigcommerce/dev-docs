<h1>Defining Global Styles</h1>

<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#defining_keys-and-example">Keys and Example Values</a></li>
    <li><a href="#defining_requirements-and-restrictions">Requirements and Restrictions</a></li>
    <li><a href="#defining_new">New Products Example</a></li>
    <li><a href="#defining_changing">Changing Page Layout using Local Front Matter</a></li>
    <li><a href="#defining_retrieving">Retrieving Specific config.json Values through Sass</a></li>
    <li><a href="#defining_adding">Adding/Removing Components</a></li>
	</ul>
</div>

You can manage your custom theme's front-end components by configuring the <span class="fn">config.json</span> file. This file is made up of different keys and values that define the global styles shoppers will see on a theme. This <span class="fn">config.json</span> file’s functions are to:

* Provide global context for Stencil’s CSS and Handlebars resources.
* Provide values for the Store Design GUI to manage.
* Provide metadata for your theme’s listing in the Theme Marketplace.
* Define variations included in your custom theme

---

<a href='#defining_keys-and-example' aria-hidden='true' class='block-anchor'  id='defining_keys-and-example'><i aria-hidden='true' class='linkify icon'></i></a>

## Keys and Example Values

Below are the keys available in a theme's config.json files accompanied with example values.

<div class="jsonSchema">
    {'type': 'object', 'minProperties': 0, 'properties': {'name': {'type': 'string', 'example': 'Starlight', 'description': 'The theme name'}, 'version': {'type': 'string', 'example': '"2.6.0"', 'description': "The theme's version number"}, 'meta': {'type': 'object', 'description': 'BigCommerce will use this metadata to list themes in Theme Marketplace', 'properties': {'price': {'type': 'integer', 'example': 15000, 'description': 'Price, in cents, to purchase this theme in Theme Marketplace.'}, 'documentation_url': {'type': 'string', 'example': '"https://support.bigcommerce.com/articles/Public/Cornerstone-Theme-Manual"', 'description': "URL of the theme's developer documentation."}, 'author_name': {'type': 'string', 'example': 'eCommerce Themes, Inc.', 'description': 'Name of the developer or partner creating the theme.'}, 'author_email': {'type': 'string', 'description': 'Contact email address for the developer or partner creating the theme.', 'example': '"contact@thethemecollective.com"'}, 'author_support_url': {'type': 'string', 'example': '"support@thethemecollective.com"', 'description': 'Support URL for the developer or partner creating the theme.'}, 'composed_image': {'type': 'string', 'example': '"starlight_mosaic.png"', 'description': 'File name for a composed/mosaic screenshot of all variations of the theme, to appear on the "My Themes" page of purchased themes. The file-name value is arbitrary, but it must match the name of a file located in the `theme‑name/meta/` subdirectory.\n\nThe actual file’s resolution must be 600 x 760 pixels (horizontal x vertical).'}, 'features': {'type': 'array', 'example': ['fully_responsive', 'mega_navigation', 'multi_tiered_sidebar_menu', 'masonry_design', 'frontpage_slideshow', 'quick_add_to_cart', 'switchable_product_view', 'product_comparison_table', 'complex_search_filtering', 'customizable_product_selector', 'cart_suggested_products', 'free_customer_support', 'free_theme_upgrades', 'high_res_product_images', 'product_filtering', 'advanced_quick_view', 'product_showcase', 'persistent_cart', 'one_page_check_out', 'customized_check_out', 'product_videos'], 'description': 'This should be an array of exact feature names supported in the theme. The "Default/Examples"column lists the complete namespace. At least one of the values listed there must be present.\nThese values are used as metadata for Theme Marketplace searches. \nThe `"customized_check_out"` value has a second function: It must be present if you want to enable [Optimized One-Page Checkout](https://support.bigcommerce.com/articles/Public/Optimized-Single-Page-Checkout) for your theme.</td>', 'items': {'type': 'string'}}}, 'required': ['documentation_url', 'author_name', 'author_email', 'author_support_url']}, 'css_compiler': {'type': 'string', 'example': '"scss"', 'default': 'SCSS', 'description': "Name of the theme's CSS preprocessor."}, 'autoprefixer_cascade': {'type': 'boolean', 'description': 'Denotes whether to enable the Autoprefixer CSS postprocessor in order to add vendor prefixes to CSS rules.', 'example': True}, 'autoprefixer_browsers': {'type': 'array', 'example': ['> 1%', 'last 2 versions', 'Firefox ESR'], 'description': 'Which legacy browsers [Autoprefixer](https://github.com/postcss/autoprefixer) should support, specified in [Browserslist](https://github.com/ai/browserslist) query format.', 'items': {'type': 'string'}}, 'settings': {'type': 'object', 'description': 'Display-oriented key names and values that you can arbitrarily set for your theme. Handlebars accesses the combined settings as the context variable `{{theme_settings}}`.\n      \nTheme variations also have their own `settings` sections. Values that you set at the variation level will override global values that you set here (for corresponding key names and within the scope of that variation).\n\nIf you want to create a custom variable to use in Handlebars, either add it within this theme-level `settings` section, or add it down in a variation-level `settings` section.\n\nYou would access your arbitrarily named custom variable in Handlebars as `{{theme_settings.<variablename>}}`.\n\nHere is an example of a custom variable in the default theme’s `config.json`:\n\n`"settings": { "homepage_featured_products_count": 6,\n}`\n\nHere is the corresponding front matter in `home.html` that calls this variable. (Note that this is pure YAML – the `{{...}}` used to reference `config.json` variables within pages’ front matter **do not** constitute a Handlebars statement)\n\n```\n---\nproducts:\n  featured:\n      limit: {{theme_settings.homepage_featured_products_count}}\n---\n```', 'properties': {'homepage_new_products_count': {'type': 'integer', 'example': 12, 'description': 'Number of products to include in home page’s New Products section.'}, 'homepage_featured_products_count': {'type': 'integer', 'description': 'Number of products to include in home page’s Featured Products section.', 'example': 4}, 'homepage_top_products_count': {'type': 'integer', 'description': 'Number of products to include in home page’s Top Products section.', 'example': 4}, 'homepage_show_carousel': {'type': 'boolean', 'example': True, 'description': 'Defines whether to display an image carousel on the home page.'}, 'homepage_stretch_carousel_images': {'type': 'boolean', 'example': False}, 'homepage_new_products_column_count': {'type': 'integer', 'example': 4, 'description': 'Number of New Products columns to include on the home-page.'}, 'homepage_featured_products_column_count': {'type': 'integer', 'description': 'Number of Featured Products columns to include on the home-page.', 'example': 3}, 'homepage_top_products_column_count': {'type': 'integer', 'description': 'Number of Top Products columns to include on the home-page.', 'example': 3}, 'homepage_blog_posts_count': {'type': 'integer', 'example': 3}, 'productpage_videos_count': {'type': 'integer', 'example': 8}, 'productpage_reviews_count': {'type': 'integer', 'example': 9}, 'productpage_related_products_count': {'type': 'integer', 'example': 10}, 'productpage_similar_by_views_count': {'type': 'integer', 'example': 10}, 'categorypage_products_per_page': {'type': 'integer', 'example': 12}, 'shop_by_price_visibility': {'type': 'boolean', 'example': True}, 'brandpage_products_per_page': {'type': 'integer', 'example': 12}, 'searchpage_products_per_page': {'type': 'integer', 'example': 12}, 'show_product_quick_view': {'type': 'boolean', 'example': True}, 'show_powered_by': {'type': 'boolean', 'example': True}, 'shop_by_brand_show_footer': {'type': 'boolean', 'example': True}, 'show_copyright_footer': {'type': 'boolean', 'example': True}, 'show_accept_amex': {'type': 'boolean', 'example': True}, 'show_accept_discover': {'type': 'boolean', 'example': True}, 'show_accept_mastercard': {'type': 'boolean', 'example': True}, 'show_accept_paypal': {'type': 'boolean', 'example': True}, 'show_accept_visa': {'type': 'boolean', 'example': True}, 'show_product_details_tabs': {'type': 'boolean'}, 'show_product_reviews_tabs': {'type': 'boolean'}, 'show_product_weight': {'type': 'boolean'}, 'show_product_dimensions': {'type': 'boolean'}, 'product_list_display_mode': {'type': 'string'}, 'logo-position': {'type': 'string'}, 'logo_size': {'type': 'string'}, 'logo_fontSize': {'type': 'integer'}, 'logo-font': {'type': 'string'}, 'brand_size': {'type': 'string'}, 'gallery_size': {'type': 'string'}, 'productgallery_size': {'type': 'string'}, 'product_size': {'type': 'string'}, 'productview_thumb_size': {'type': 'string'}, 'productthumb_size': {'type': 'string'}, 'thumb_size': {'type': 'string'}, 'zoom_size': {'type': 'string'}, 'blog_size': {'type': 'string'}, 'default_image_brand': {'type': 'string'}, 'default_image_product': {'type': 'string'}, 'default_image_gift_certificate': {'type': 'string'}, 'body-font': {'type': 'string'}, 'headings-font': {'type': 'string'}, 'fontSize-root': {'type': 'integer'}, 'fontSize-h1': {'type': 'integer'}, 'fontSize-h2': {'type': 'integer'}, 'fontSize-h3': {'type': 'integer'}, 'fontSize-h4': {'type': 'integer'}, 'fontSize-h5': {'type': 'integer'}, 'fontSize-h6': {'type': 'integer'}, 'applePay-button': {'type': 'string'}, 'color-textBase': {'type': 'string'}, 'color-textBase--hover': {'type': 'string'}, 'color-textBase--active': {'type': 'string'}, 'color-textSecondary': {'type': 'string'}, 'color-textSecondary--hover': {'type': 'string'}, 'color-textSecondary--active': {'type': 'string'}, 'color-textLink': {'type': 'string'}, 'color-textLink--hover': {'type': 'string'}, 'color-textLink--active': {'type': 'string'}, 'color-textHeading': {'type': 'string'}, 'color-primary': {'type': 'string'}, 'color-primaryDark': {'type': 'string'}, 'color-primaryDarker': {'type': 'string'}, 'color-primaryLight': {'type': 'string'}, 'color-secondary': {'type': 'string'}, 'color-secondaryDark': {'type': 'string'}, 'color-secondaryDarker': {'type': 'string'}, 'color-error': {'type': 'string'}, 'color-errorLight': {'type': 'string'}, 'color-info': {'type': 'string'}, 'color-infoLight': {'type': 'string'}, 'color-success': {'type': 'string'}, 'color-successLight': {'type': 'string'}, 'color-warning': {'type': 'string'}, 'color-warningLight': {'type': 'string'}, 'color-black': {'type': 'string'}, 'color-white': {'type': 'string'}, 'color-whitesBase': {'type': 'string'}, 'color-grey': {'type': 'string'}, 'color-greyDarkest': {'type': 'string'}, 'color-greyDarker': {'type': 'string'}, 'color-greyDark': {'type': 'string'}, 'color-greyMedium': {'type': 'string'}, 'color-greyLight': {'type': 'string'}, 'color-greyLighter': {'type': 'string'}, 'color-greyLightest': {'type': 'string'}, 'button--default-color': {'type': 'string'}, 'button--default-colorHover': {'type': 'string'}, 'button--default-colorActive': {'type': 'string'}, 'button--default-borderColor': {'type': 'string'}, 'button--default-borderColorHover': {'type': 'string'}, 'button--default-borderColorActive': {'type': 'string'}, 'button--primary-color': {'type': 'string'}, 'button--primary-colorHover': {'type': 'string'}, 'button--primary-colorActive': {'type': 'string'}, 'button--primary-backgroundColor': {'type': 'string'}, 'button--primary-backgroundColorHover': {'type': 'string'}, 'button--primary-backgroundColorActive': {'type': 'string'}, 'button--disabled-color': {'type': 'string'}, 'button--disabled-backgroundColor': {'type': 'string'}, 'button--disabled-borderColor': {'type': 'string'}, 'icon-color': {'type': 'string'}, 'icon-color-hover': {'type': 'string'}, 'button--icon-svg-color': {'type': 'string'}, 'icon-ratingEmpty': {'type': 'string'}, 'icon-ratingFull': {'type': 'string'}, 'carousel-bgColor': {'type': 'string'}, 'carousel-title-color': {'type': 'string'}, 'carousel-description-color': {'type': 'string'}, 'carousel-dot-color': {'type': 'string'}, 'carousel-dot-color-active': {'type': 'string'}, 'carousel-dot-bgColor': {'type': 'string'}, 'carousel-arrow-color': {'type': 'string'}, 'carousel-arrow-bgColor': {'type': 'string'}, 'carousel-arrow-borderColor': {'type': 'string'}, 'card-title-color': {'type': 'string'}, 'card-title-color-hover': {'type': 'string'}, 'card-figcaption-button-background': {'type': 'string'}, 'card-figcaption-button-color': {'type': 'string'}, 'card--alternate-backgroundColor': {'type': 'string'}, 'card--alternate-borderColor': {'type': 'string'}, 'card--alternate-color--hover': {'type': 'string'}, 'form-label-font-color': {'type': 'string'}, 'input-font-color': {'type': 'string'}, 'input-border-color': {'type': 'string'}, 'input-border-color-active': {'type': 'string'}, 'input-bg-color': {'type': 'string'}, 'input-disabled-bg': {'type': 'string'}, 'select-bg-color': {'type': 'string'}, 'select-arrow-color': {'type': 'string'}, 'checkRadio-color': {'type': 'string'}, 'checkRadio-backgroundColor': {'type': 'string'}, 'checkRadio-borderColor': {'type': 'string'}, 'alert-backgroundColor': {'type': 'string'}, 'alert-color': {'type': 'string'}, 'alert-color-alt': {'type': 'string'}, 'storeName-color': {'type': 'string'}, 'body-bg': {'type': 'string'}, 'header-backgroundColor': {'type': 'string'}, 'footer-backgroundColor': {'type': 'string'}, 'navUser-color': {'type': 'string'}, 'navUser-color-hover': {'type': 'string'}, 'navUser-dropdown-backgroundColor': {'type': 'string'}, 'navUser-dropdown-borderColor': {'type': 'string'}, 'navUser-indicator-backgroundColor': {'type': 'string'}, 'navPages-color': {'type': 'string'}, 'navPages-color-hover': {'type': 'string'}, 'navPages-subMenu-backgroundColor': {'type': 'string'}, 'navPages-subMenu-separatorColor': {'type': 'string'}, 'dropdown--quickSearch-backgroundColor': {'type': 'string'}, 'dropdown--wishList-backgroundColor': {'type': 'string'}, 'blockquote-cite-font-color': {'type': 'string'}, 'container-border-global-color-base': {'type': 'string'}, 'container-fill-base': {'type': 'string'}, 'container-fill-dark': {'type': 'string'}, 'label-backgroundColor': {'type': 'string'}, 'label-color': {'type': 'string'}, 'overlay-backgroundColor': {'type': 'string'}, 'loadingOverlay-backgroundColor': {'type': 'string'}, 'pace-progress-backgroundColor': {'type': 'string'}, 'spinner-borderColor-dark': {'type': 'string'}, 'spinner-borderColor-light': {'type': 'string'}, 'hide_content_navigation': {'type': 'boolean'}, 'optimizedCheckout-header-backgroundColor': {'type': 'string'}, 'optimizedCheckout-show-backgroundImage': {'type': 'boolean'}, 'optimizedCheckout-backgroundImage': {'type': 'string'}, 'optimizedCheckout-backgroundImage-size': {'type': 'string'}, 'optimizedCheckout-show-logo': {'type': 'string'}, 'optimizedCheckout-logo': {'type': 'string'}, 'optimizedCheckout-logo-size': {'type': 'string'}, 'optimizedCheckout-logo-position': {'type': 'string'}, 'optimizedCheckout-headingPrimary-color': {'type': 'string'}, 'optimizedCheckout-headingPrimary-font': {'type': 'string'}, 'optimizedCheckout-headingSecondary-color': {'type': 'string'}, 'optimizedCheckout-headingSecondary-font': {'type': 'string'}, 'optimizedCheckout-body-backgroundColor': {'type': 'string'}, 'optimizedCheckout-colorFocus': {'type': 'string'}, 'optimizedCheckout-contentPrimary-color': {'type': 'string'}, 'optimizedCheckout-contentPrimary-font': {'type': 'string'}, 'optimizedCheckout-contentSecondary-color': {'type': 'string'}, 'optimizedCheckout-contentSecondary-font': {'type': 'string'}, 'optimizedCheckout-buttonPrimary-font': {'type': 'string'}, 'optimizedCheckout-buttonPrimary-color': {'type': 'string'}, 'optimizedCheckout-buttonPrimary-colorHover': {'type': 'string'}, 'optimizedCheckout-buttonPrimary-colorActive': {'type': 'string'}, 'optimizedCheckout-buttonPrimary-backgroundColor': {'type': 'string'}, 'optimizedCheckout-buttonPrimary-backgroundColorHover': {'type': 'string'}, 'optimizedCheckout-buttonPrimary-backgroundColorActive': {'type': 'string'}, 'optimizedCheckout-buttonPrimary-borderColor': {'type': 'string'}, 'optimizedCheckout-buttonPrimary-borderColorHover': {'type': 'string'}, 'optimizedCheckout-buttonPrimary-borderColorActive': {'type': 'string'}, 'optimizedCheckout-buttonPrimary-borderColorDisabled': {'type': 'string'}, 'optimizedCheckout-buttonPrimary-backgroundColorDisabled': {'type': 'string'}, 'optimizedCheckout-buttonPrimary-colorDisabled': {'type': 'string'}, 'optimizedCheckout-formChecklist-backgroundColor': {'type': 'string'}, 'optimizedCheckout-formChecklist-color': {'type': 'string'}, 'optimizedCheckout-formChecklist-borderColor': {'type': 'string'}, 'optimizedCheckout-formChecklist-backgroundColorSelected': {'type': 'string'}, 'optimizedCheckout-buttonSecondary-font': {'type': 'string'}, 'optimizedCheckout-buttonSecondary-color': {'type': 'string'}, 'optimizedCheckout-buttonSecondary-colorHover': {'type': 'string'}, 'optimizedCheckout-buttonSecondary-colorActive': {'type': 'string'}, 'optimizedCheckout-buttonSecondary-backgroundColor': {'type': 'string'}, 'optimizedCheckout-buttonSecondary-borderColor': {'type': 'string'}, 'optimizedCheckout-buttonSecondary-backgroundColorHover': {'type': 'string'}, 'optimizedCheckout-buttonSecondary-backgroundColorActive': {'type': 'string'}, 'optimizedCheckout-buttonSecondary-borderColorHover': {'type': 'string'}, 'optimizedCheckout-buttonSecondary-borderColorActive': {'type': 'string'}, 'optimizedCheckout-link-color': {'type': 'string'}, 'optimizedCheckout-link-font': {'type': 'string'}, 'optimizedCheckout-discountBanner-backgroundColor': {'type': 'string'}, 'optimizedCheckout-discountBanner-textColor': {'type': 'string'}, 'optimizedCheckout-discountBanner-iconColor': {'type': 'string'}, 'optimizedCheckout-orderSummary-backgroundColor': {'type': 'string'}, 'optimizedCheckout-orderSummary-borderColor': {'type': 'string'}, 'optimizedCheckout-step-backgroundColor': {'type': 'string'}, 'optimizedCheckout-step-textColor': {'type': 'string'}, 'optimizedCheckout-form-textColor': {'type': 'string'}, 'optimizedCheckout-formField-borderColor': {'type': 'string'}, 'optimizedCheckout-formField-textColor': {'type': 'string'}, 'optimizedCheckout-formField-shadowColor': {'type': 'string'}, 'optimizedCheckout-formField-placeholderColor': {'type': 'string'}, 'optimizedCheckout-formField-backgroundColor': {'type': 'string'}, 'optimizedCheckout-formField-errorColor': {'type': 'string'}, 'optimizedCheckout-formField-inputControlColor': {'type': 'string'}, 'optimizedCheckout-step-borderColor': {'type': 'string'}, 'optimizedCheckout-header-borderColor': {'type': 'string'}, 'optimizedCheckout-header-textColor': {'type': 'string'}, 'optimizedCheckout-loadingToaster-backgroundColor': {'type': 'string'}, 'optimizedCheckout-loadingToaster-textColor': {'type': 'string'}, 'optimizedCheckout-link-hoverColor': {'type': 'string'}, 'product_sale_badges': {'type': 'string'}, 'color_badge_product_sale_badges': {'type': 'string'}, 'color_text_product_sale_badges': {'type': 'string'}, 'color_hover_product_sale_badges': {'type': 'string'}, 'restrict_to_login': {'type': 'boolean'}, 'swatch_option_size': {'type': 'string'}, 'social_icon_placement_top': {'type': 'boolean'}, 'social_icon_placement_bottom': {'type': 'string'}, 'geotrust_ssl_common_name': {'type': 'string'}, 'geotrust_ssl_seal_size': {'type': 'string'}, 'navigation_design': {'type': 'string'}, 'price_ranges': {'type': 'boolean'}, 'pdp-price-label': {'type': 'string'}, 'pdp-sale-price-label': {'type': 'string'}, 'pdp-non-sale-price-label': {'type': 'string'}, 'pdp-retail-price-label': {'type': 'string'}}}, 'read_only_files': {'type': 'array', 'items': {'type': 'string'}}, 'resources': {'type': 'object', 'properties': {'cart': {'type': 'boolean'}, 'bulk_discount_rates': {'type': 'boolean'}, 'shop_by_brand': {'type': 'object', 'properties': {'limit': {'type': 'integer'}}}}}, 'variations': {'type': 'array', 'items': {'type': 'object', 'properties': {'name': {'type': 'string'}, 'id': {'type': 'string'}, 'meta': {'type': 'object', 'properties': {'desktop_screenshot': {'type': 'string'}, 'mobile_screenshot': {'type': 'string'}, 'description': {'type': 'string'}, 'demo_url': {'type': 'string'}, 'optimized_for': {'type': 'array', 'items': {'type': 'string'}}, 'industries': {'type': 'array', 'items': {'type': 'string'}}}}, 'images': {'type': 'object'}, 'settings': {'type': 'object', 'properties': {'homepage_featured_products_count': {'type': 'integer'}, 'homepage_featured_products_column_count': {'type': 'integer'}, 'body-font': {'type': 'string'}, 'headings-font': {'type': 'string'}, 'color-textBase': {'type': 'string'}, 'color-textBase--hover': {'type': 'string'}, 'color-textBase--active': {'type': 'string'}, 'color-textSecondary': {'type': 'string'}, 'color-textSecondary--hover': {'type': 'string'}, 'color-textSecondary--active': {'type': 'string'}, 'color-textLink': {'type': 'string'}, 'color-textLink--hover': {'type': 'string'}, 'color-textLink--active': {'type': 'string'}, 'color-textHeading': {'type': 'string'}, 'color-primary': {'type': 'string'}, 'color-primaryDark': {'type': 'string'}, 'color-primaryDarker': {'type': 'string'}, 'color-primaryLight': {'type': 'string'}, 'color-secondary': {'type': 'string'}, 'color-secondaryDark': {'type': 'string'}, 'color-secondaryDarker': {'type': 'string'}, 'color-error': {'type': 'string'}, 'color-errorLight': {'type': 'string'}, 'color-info': {'type': 'string'}, 'color-infoLight': {'type': 'string'}, 'color-success': {'type': 'string'}, 'color-successLight': {'type': 'string'}, 'color-warning': {'type': 'string'}, 'color-warningLight': {'type': 'string'}, 'color-black': {'type': 'string'}, 'color-white': {'type': 'string'}, 'color-whitesBase': {'type': 'string'}, 'color-grey': {'type': 'string'}, 'color-greyDarkest': {'type': 'string'}, 'color-greyDarker': {'type': 'string'}, 'color-greyDark': {'type': 'string'}, 'color-greyMedium': {'type': 'string'}, 'color-greyLight': {'type': 'string'}, 'color-greyLighter': {'type': 'string'}, 'color-greyLightest': {'type': 'string'}, 'button--default-color': {'type': 'string'}, 'button--default-colorHover': {'type': 'string'}, 'button--default-colorActive': {'type': 'string'}, 'button--default-borderColor': {'type': 'string'}, 'button--default-borderColorHover': {'type': 'string'}, 'button--default-borderColorActive': {'type': 'string'}, 'button--primary-color': {'type': 'string'}, 'button--primary-colorHover': {'type': 'string'}, 'button--primary-colorActive': {'type': 'string'}, 'button--primary-backgroundColor': {'type': 'string'}, 'button--primary-backgroundColorHover': {'type': 'string'}, 'button--primary-backgroundColorActive': {'type': 'string'}, 'button--disabled-color': {'type': 'string'}, 'button--disabled-backgroundColor': {'type': 'string'}, 'button--disabled-borderColor': {'type': 'string'}, 'icon-color': {'type': 'string'}, 'icon-color-hover': {'type': 'string'}, 'button--icon-svg-color': {'type': 'string'}, 'icon-ratingEmpty': {'type': 'string'}, 'icon-ratingFull': {'type': 'string'}, 'carousel-bgColor': {'type': 'string'}, 'carousel-title-color': {'type': 'string'}, 'carousel-description-color': {'type': 'string'}, 'carousel-dot-color': {'type': 'string'}, 'carousel-dot-color-active': {'type': 'string'}, 'carousel-dot-bgColor': {'type': 'string'}, 'carousel-arrow-color': {'type': 'string'}, 'carousel-arrow-bgColor': {'type': 'string'}, 'carousel-arrow-borderColor': {'type': 'string'}, 'card-title-color': {'type': 'string'}, 'card-title-color-hover': {'type': 'string'}, 'card-figcaption-button-background': {'type': 'string'}, 'card-figcaption-button-color': {'type': 'string'}, 'card--alternate-backgroundColor': {'type': 'string'}, 'card--alternate-borderColor': {'type': 'string'}, 'card--alternate-color--hover': {'type': 'string'}, 'form-label-font-color': {'type': 'string'}, 'input-font-color': {'type': 'string'}, 'input-border-color': {'type': 'string'}, 'input-border-color-active': {'type': 'string'}, 'input-bg-color': {'type': 'string'}, 'input-disabled-bg': {'type': 'string'}, 'select-bg-color': {'type': 'string'}, 'select-arrow-color': {'type': 'string'}, 'checkRadio-color': {'type': 'string'}, 'checkRadio-backgroundColor': {'type': 'string'}, 'checkRadio-borderColor': {'type': 'string'}, 'alert-backgroundColor': {'type': 'string'}, 'alert-color': {'type': 'string'}, 'alert-color-alt': {'type': 'string'}, 'storeName-color': {'type': 'string'}, 'body-bg': {'type': 'string'}, 'header-backgroundColor': {'type': 'string'}, 'footer-backgroundColor': {'type': 'string'}, 'navUser-color': {'type': 'string'}, 'navUser-color-hover': {'type': 'string'}, 'navUser-dropdown-backgroundColor': {'type': 'string'}, 'navUser-dropdown-borderColor': {'type': 'string'}, 'navUser-indicator-backgroundColor': {'type': 'string'}, 'navPages-color': {'type': 'string'}, 'navPages-color-hover': {'type': 'string'}, 'navPages-subMenu-backgroundColor': {'type': 'string'}, 'navPages-subMenu-separatorColor': {'type': 'string'}, 'dropdown--quickSearch-backgroundColor': {'type': 'string'}, 'dropdown--wishList-backgroundColor': {'type': 'string'}, 'blockquote-cite-font-color': {'type': 'string'}, 'container-border-global-color-base': {'type': 'string'}, 'container-fill-base': {'type': 'string'}, 'container-fill-dark': {'type': 'string'}, 'label-backgroundColor': {'type': 'string'}, 'label-color': {'type': 'string'}, 'overlay-backgroundColor': {'type': 'string'}, 'loadingOverlay-backgroundColor': {'type': 'string'}, 'pace-progress-backgroundColor': {'type': 'string'}, 'spinner-borderColor-dark': {'type': 'string'}, 'spinner-borderColor-light': {'type': 'string'}, 'optimizedCheckout-header-backgroundColor': {'type': 'string'}, 'optimizedCheckout-headingPrimary-color': {'type': 'string'}, 'optimizedCheckout-headingPrimary-font': {'type': 'string'}, 'optimizedCheckout-headingSecondary-color': {'type': 'string'}, 'optimizedCheckout-headingSecondary-font': {'type': 'string'}, 'optimizedCheckout-body-backgroundColor': {'type': 'string'}, 'optimizedCheckout-colorFocus': {'type': 'string'}, 'optimizedCheckout-contentPrimary-color': {'type': 'string'}, 'optimizedCheckout-contentPrimary-font': {'type': 'string'}, 'optimizedCheckout-contentSecondary-color': {'type': 'string'}, 'optimizedCheckout-contentSecondary-font': {'type': 'string'}, 'optimizedCheckout-buttonPrimary-font': {'type': 'string'}, 'optimizedCheckout-buttonPrimary-color': {'type': 'string'}, 'optimizedCheckout-buttonPrimary-colorHover': {'type': 'string'}, 'optimizedCheckout-buttonPrimary-colorActive': {'type': 'string'}, 'optimizedCheckout-buttonPrimary-backgroundColor': {'type': 'string'}, 'optimizedCheckout-buttonPrimary-backgroundColorHover': {'type': 'string'}, 'optimizedCheckout-buttonPrimary-backgroundColorActive': {'type': 'string'}, 'optimizedCheckout-buttonPrimary-borderColor': {'type': 'string'}, 'optimizedCheckout-buttonPrimary-borderColorHover': {'type': 'string'}, 'optimizedCheckout-buttonPrimary-borderColorActive': {'type': 'string'}, 'optimizedCheckout-buttonPrimary-borderColorDisabled': {'type': 'string'}, 'optimizedCheckout-buttonPrimary-backgroundColorDisabled': {'type': 'string'}, 'optimizedCheckout-buttonPrimary-colorDisabled': {'type': 'string'}, 'optimizedCheckout-formChecklist-backgroundColor': {'type': 'string'}, 'optimizedCheckout-formChecklist-color': {'type': 'string'}, 'optimizedCheckout-formChecklist-borderColor': {'type': 'string'}, 'optimizedCheckout-formChecklist-backgroundColorSelected': {'type': 'string'}, 'optimizedCheckout-buttonSecondary-font': {'type': 'string'}, 'optimizedCheckout-buttonSecondary-color': {'type': 'string'}, 'optimizedCheckout-buttonSecondary-colorHover': {'type': 'string'}, 'optimizedCheckout-buttonSecondary-colorActive': {'type': 'string'}, 'optimizedCheckout-buttonSecondary-backgroundColor': {'type': 'string'}, 'optimizedCheckout-buttonSecondary-borderColor': {'type': 'string'}, 'optimizedCheckout-buttonSecondary-backgroundColorHover': {'type': 'string'}, 'optimizedCheckout-buttonSecondary-backgroundColorActive': {'type': 'string'}, 'optimizedCheckout-buttonSecondary-borderColorHover': {'type': 'string'}, 'optimizedCheckout-buttonSecondary-borderColorActive': {'type': 'string'}, 'optimizedCheckout-link-color': {'type': 'string'}, 'optimizedCheckout-link-font': {'type': 'string'}, 'optimizedCheckout-discountBanner-backgroundColor': {'type': 'string'}, 'optimizedCheckout-discountBanner-textColor': {'type': 'string'}, 'optimizedCheckout-discountBanner-iconColor': {'type': 'string'}, 'optimizedCheckout-orderSummary-backgroundColor': {'type': 'string'}, 'optimizedCheckout-orderSummary-borderColor': {'type': 'string'}, 'optimizedCheckout-step-backgroundColor': {'type': 'string'}, 'optimizedCheckout-step-textColor': {'type': 'string'}, 'optimizedCheckout-form-textColor': {'type': 'string'}, 'optimizedCheckout-formField-borderColor': {'type': 'string'}, 'optimizedCheckout-formField-textColor': {'type': 'string'}, 'optimizedCheckout-formField-shadowColor': {'type': 'string'}, 'optimizedCheckout-formField-placeholderColor': {'type': 'string'}, 'optimizedCheckout-formField-backgroundColor': {'type': 'string'}, 'optimizedCheckout-formField-errorColor': {'type': 'string'}, 'optimizedCheckout-formField-inputControlColor': {'type': 'string'}, 'optimizedCheckout-step-borderColor': {'type': 'string'}, 'optimizedCheckout-header-borderColor': {'type': 'string'}, 'optimizedCheckout-header-textColor': {'type': 'string'}, 'optimizedCheckout-loadingToaster-backgroundColor': {'type': 'string'}, 'optimizedCheckout-loadingToaster-textColor': {'type': 'string'}, 'optimizedCheckout-link-hoverColor': {'type': 'string'}, 'color_badge_product_sale_badges': {'type': 'string'}, 'color_text_product_sale_badges': {'type': 'string'}, 'color_hover_product_sale_badges': {'type': 'string'}}}}}}}}
</div>
---

<a href='#defining_requirements-and-restrictions' aria-hidden='true' class='block-anchor'  id='defining_requirements-and-restrictions'><i aria-hidden='true' class='linkify icon'></i></a>

## Requirements and Restrictions

The <span class="fn">config.json</span> file must meet the following requirements:

* It must be named <span class="fn">config.json</span>, must reside in the root of your `<theme-name>` top level subdirectory (e.g.: <span class="fp">/cornerstone/config.json</span>), and must contain valid JSON.
* The maximum allowable size for a theme's <span class="fn">config.json</span> file is 64 KB. Exceeding this limit will trigger an error upon uploading the theme to BigCommerce.
* Each key's value is restricted to 64 characters. Exceeding this limit will similarly trigger an upload error.
* Other than these size constraints, there is no limit on the number of keys and values that you can place in a theme's <span class="fn">config.json</span>.

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">
    
<!-- theme: warning -->

> Carefully check your theme against all the listed requirements  – including the required keys within the `meta` object and `variations` array. While some requirements are not enforced in local development, they will be validated when you later upload your theme to BigCommerce.

</div>
</div>
</div>

### Required Themewide Keys
The <span class="fn">config.json</span> file must contain at least the following keys, with appropriate values (as outlined above):

* `name`
* `version`
* `settings` (must be a valid JSON object)
* `variations` (an array of at least one, and at most four, variation objects)
* `meta` (an object; see specific requirements below)

### Required `meta` Keys

The meta object must contain at least the following keys, with appropriate values:

* `price`
* `author_name`
* `author_email`
* `author_support_url`
* `documentation_url`

For illustration, below is a commented excerpt:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">Required Meta Keys and Values</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "Required Meta Keys and Values"
subtitle: ""
lineNumbers: true
-->

```json
{
  ...
  "meta": {
    "price": 15000, // in cents; non-negative integer, minimum 0
    "author_name": "eCommerce Themes, Inc.", // Must be a string, not null
    "author_email": "support@example.com", // Must be a string, should be a valid email address, not null
    "author_support_url": "http://example.com/contactus", //  Must be a string, should be a valid URL, not null
    "documentation_url": "http://example.com/guide", // Must be a string, limit of 255 characters, not null
    "composed_image": "path/to/composed.png", // Must be a string path to the composed-image file
    "features": [ // Array of feature strings, all of which must be in the list enumerated here: 
          https://github.com/bigcommerce/theme-registry/blob/master/app/schemas/theme_config.json#L33
      "fully_responsive" // Must include at least one feature, and no duplicate entries
    ]
  },
  ...
}
```

### Required `variation` Keys

At least one variation is required in a theme. For each variation that you choose to include in your theme, you must provide at least the following keys and sub-element, with appropriate values:

* `name`
* `id`
* `meta`
* `description`

For illustration, below is a code sample from Cornerstone:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">Required Variation Object with Key/Value pairs</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "Required Variation Object with Key/Value pairs"
subtitle: ""
lineNumbers: true
-->

```json
"variations": [
    {
      "name": "Light",
      "id": "light",
      "meta": {
        "desktop_screenshot": "desktop_light.png",
        "mobile_screenshot": "mobile_light.png",
        "description": "Ideal for a wide range of businesses and brands, this design is fully responsive, simple, and ready for you to add your branding, logo, and products. ...",
    ...
    }
  ]
```

---

<a href='#defining_new' aria-hidden='true' class='block-anchor'  id='defining_new'><i aria-hidden='true' class='linkify icon'></i></a>

## New Products Example

To customize your theme’s appearance at a global level, the values that you define in the 
<span class="fp">{theme-name}/config.json</span> file interact with local resources. Your <span class="fp">config.json</span> definitions set global defaults for templates, front-matter attributes, and Handlebars resources throughout your theme. You can also define custom variables in <span class="fp">config.json</span>, named according to your needs.

To see how interactions with <span class="fp">config.json</span> values work, first note the default values in <span class="fp">config.json</span> for the `homepage_new_products_count` and `product_list_display_mode` keys:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name"></div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: ""
subtitle: ""
lineNumbers: true
-->

```
{
"settings": {
  "homepage_new_products_count": 12,
  "product_list_display_mode": "grid",
  }
}
```

Next, open your <span class="fp">{theme-name}templates/pages/home.html</span> file. Highlighted in bold below is a statement that uses the theme-wide settings above to customize an API request to the server.

(Note the reference to the `homepage_new_products_count` key in the file’s front matter, between the two "---" delimiters. If your current theme’s <span class="fp">home.html</span> front matter omits this `products:new:limit` definition, paste it in for this demonstration.)

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name"></div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: ""
subtitle: ""
lineNumbers: true
-->

```
products:
  new:
    limit: {{theme_settings.homepage_new_products_count}}
  featured:
    limit: {{theme_settings.homepage_featured_products_count}}
  top_sellers:
    limit: {{theme_settings.homepage_top_products_count}}
carousel: {{theme_settings.homepage_show_carousel}}
blog:
    recent_posts:
        limit: {{theme_settings.homepage_blog_posts_count}}
---
{{#partial "hero"}}

<!-- [...] -->

{{/partial}}
{{> layout/base}}
```

If you load your storefront’s home page (by default, [http://localhost:3000](http://localhost:3000), you should see a "New Products" section that displays 12 products in a grid.

---

<a href='#defining_changing' aria-hidden='true' class='block-anchor'  id='defining_changing'><i aria-hidden='true' class='linkify icon'></i></a>

## Changing Page Layout Using Local Front Matter

In the <span class="fp">{theme-name}templates/pages/home.html</span> front matter, products > featured is listed. This controls
how many products appear on the home page. This is set by the <span class="fp">config.json</span> `theme_settings.homepage_featured_products_count}`. This example shows how you can set theme wide configurations in the front matter using the <span class="fn">config.json</span>.

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name"></div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: ""
subtitle: ""
lineNumbers: true
-->

```
---
[...]
products:
  featured:
      limit: {{theme_settings.homepage_featured_products_count}}
[...]
---
```

Next, try changing the `limit: {{theme_settings.homepage_featured_products_count}}` statement in the `home.html` file to a hard-coded limit: 2, as indicated below in bold:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name"></div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: ""
subtitle: ""
lineNumbers: true
-->

```
---
products:
  // [...]
  featured:
      limit: 2
  // [...]  
---

<!-- [...] -->

{{#partial "page"}}

<!-- [...] -->

<div class="main full">
  {{#if products.featured}}
      {{> components/products/featured products=products.featured columns=2}}
  {{/if}}
</div>
{{/partial}}
{{> layout/base}}
```

If you now reload your storefront’s home page in your browser, you should see the number of displayed "Featured Products" change from its default number (as specified in <span class="fp">config.json</span>) to two.

---

<a href='#defining_retrieving' aria-hidden='true' class='block-anchor'  id='defining_retrieving'><i aria-hidden='true' class='linkify icon'></i></a>

## Retrieving Specific config.json Values through Sass

In <span class="fn">config.json</span>, global variables bring dynamic values into the framework. Sass imports these global variables’ values to gracefully handle data like theme-wide colors’ hexadecimal values, and to make the data available to Store Design. Here is one short snippet from <span class="fn">config.json</span>:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name"></div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: ""
subtitle: ""
lineNumbers: true
-->

```
{
// [...]
"color-highlight": "#00abc9",
"color-highlightDark": "#f2f2f2",
"color-highlightDarker": "#dfdfdf",
// [...]
}
```

Here are the corresponding references in the default Stencil theme’s <span class="fn">{theme-name}/assets/scss/settings/global/color/_color.scss</span> file:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name"></div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: ""
subtitle: ""
lineNumbers: true
-->

```
// [...]
$color-highlight:       stencilColor("color-highlight");
$color-highlightDarker: stencilColor("color-highlightDarker");
$color-highlightDark:   stencilColor("color-highlightDark");
// [...]
```

In <span class="fn">config.json</span>, try redefining one or more color variables to hex values of your choice. Then re-render your theme’s home page to see the effects.

---

<a href='#defining_adding' aria-hidden='true' class='block-anchor'  id='defining_adding'><i aria-hidden='true' class='linkify icon'></i></a>

## Adding/Removing Components

The storefront properties that Stencil abstracts as Handlebars resources are completely portable between HTML files. For an example of how this works, first open any storefront page in a browser. In the page’s footer, note the appearance of Categories.

Next, open your <span class="fn">{theme-name}/templates/components/common/footer.html</span> file in a text editor. As indicated below, cut (or copy and comment out) the code section shown below. 

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">footer.html</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "footer.html"
subtitle: ""
lineNumbers: true
-->

```html
<footer class="footer" role="contentinfo">
  <div class="container">
      <section class="footer-info">
          <!-- [...] -->
<article class="footer-info-col footer-info-col--small">
  <h5 class="footer-info-heading">{{lang 'footer.categories'}}</h5>
  <ul class="footer-info-list">
      {{#each categories}}
      <li>
          <a href="{{url}}">{{name}}</a>
      </li>
      {{/each}}
  </ul>
</article>
```

If you now refresh the storefront page in your browser, the Categories list should disappear from the footer.

Next, create a new <span class="fn">{theme-name}/templates/components/footer/ subdirectory</span>. Paste the code block from the previous cut/copy into a new file named <span class="fn">{theme-name}/templates/components/footer/categories.html</span>, and save it:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">categories.html</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "categories.html"
subtitle: ""
lineNumbers: true
-->

```
<article class="footer-info-col footer-info-col--small">
  <h5 class="footer-info-heading">{{lang 'footer.categories'}}</h5>
  <ul class="footer-info-list">
      {{#each categories}}
      <li>
          <a href="{{url}}">{{name}}</a>
      </li>
      {{/each}}
  </ul>
</article>
```

Next, back in <span class="fp">/templates/components/common/footer.html</span>, add a reference to your new path/file, as indicated below in comments:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name">footer.html</div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: "footer.html"
subtitle: ""
lineNumbers: true
-->

```
<footer class="footer" role="contentinfo">
  <div class="container">
      <section class="footer-info">
          <!-- [...] -->
          {{> components/footer/categories}}
          <!-- [...] -->
      </section>
  </div>
</footer>
```

If you now refresh storefront pages in your browser, the Categories list should reappear in the footer. The component returns even though you have moved its data resources to an arbitrary new location, and referenced them indirectly.

---

## Resources 

### Additional Resources 

* [Customizing a Theme Video](https://www.youtube.com/watch?v=VZYZsDoEOpQ) (Youtube)

