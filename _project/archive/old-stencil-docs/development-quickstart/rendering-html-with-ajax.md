<h1>Rendering HTML with Ajax</h1>

<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
		<li><a href="#rendering_rendering-html">Rendering HTML with Ajax</a></li>
	</ul>
</div>

<a href='#rendering_rendering-html' aria-hidden='true' class='block-anchor'  id='rendering_rendering-html'><i aria-hidden='true' class='linkify icon'></i></a>

## Rendering HTML with Ajax

Stencil allows you to render dynamic components on the fly. For example, note this default code in `<theme-name>/templates/components/products/quick-view.html` (note also this file name, which Handlebars will reference later in this example):



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
<div class="modal-body quickView">
  <a href="#" class="modal-close" aria-label="Close"></a>
  {{> components/products/product-view}}
</div>
```

To render a different template, you would instead reference that template’s file name. For example, assume that you want to substitute a custom template that you’ve named: <span class="fp"><theme-name>/templates/components/products/quicker-view.html`</span>.

This next code block is from the Stencil default theme’s <span class="fp">/assets/js/theme/global/quick-view.js</span> file. Note the <span class="fn">quicker-view.html</span> statements brought in to reference the new file name:

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

```js
let $modal = $('#modal'),
  $modalContent = $('.modal-content', $modal),
  $modalOverlay = $('.loadingOverlay', $modal),
  modalModifierClasses = 'modal--large';

$('body').on('click', '.quickview', (event) => {
  let productId = $(event.currentTarget).data('product-id');

  event.preventDefault();

  // clear the modal
  $modalContent.html('');
  $modalOverlay.show();

  // open modal
  $modal.foundation('reveal', 'open');

	//quicker-view.html statement, replacing the standard template's quick-view.html template
  utils.api.product.getById(productId, {template: 'products/quicker-view'}, function done(err, response) {
      $modalOverlay.hide();
      $modalContent.html(response);

      return new ProductDetails($modalContent, context);
  });
});
```

