<h1>Data Tags/Event Hook Reference</h1>

<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#data_stencil-data-tags">Stencil Data Tags and Event Hooks</a></li>
	</ul>
</div>

<a href='#data_stencil-data-tags' aria-hidden='true' class='block-anchor'  id='data_stencil-data-tags'></a>

## Stencil Data Tags and Event Hooks
Stencil themes provide the following chains of data tags, delegated DOM (Document Object Model) events, emitted Stencil event hooks, and Stencil event parameter(s).

### Cart Item Added

Hook for items added to the customer’s shopping cart.

**Function Signature:**

```
itemAdd() {
    this.$body.on('submit', '[data-cart-item-add]', (event) => {
        this.emit('cart-item-add', event, event.target);
    });
}
```

<table>
	<tr>
		<th>Data Tag</th>
		<th>Delegated DOM Event</th>
		<th>Stencil Event/Hook</th>
		<th>Stencil Event Parameter(s)</th>
	</tr>
	<tr>
		<td>data-cart-item-add</td>
		<td>submit</td>
		<td>cart-item-add</td>
		<td>event, event.target</td>
	</tr>
</table>

### Faceted-Search Events

Hooks for faceted-search selections that the customer initiates or submits.

**Function Signature**

```
searchEvents() {
  this.$body.on('click', '[data-faceted-search-facet]', (event) => {
        this.emit('facetedSearch-facet-clicked', event);
  });
 
  this.$body.on('submit', '[data-faceted-search-range]', (event) => {
        this.emit('facetedSearch-range-submitted', event);
  });
}

```

<table>
	<tr>
		<th>Data Tag</th>
		<th>Delegated DOM Event</th>
		<th>Stencil Event/Hook</th>
		<th>Stencil Event Parameter(s)</th>
	</tr>
	<tr>
		<td>data-faceted-search-facet</td>
		<td>click</td>
		<td>facetedSearch-facet-clicked</td>
		<td>event</td>
	</tr>
	<tr>
		<td>data-faceted-search-range</td>
		<td>submit</td>
		<td>facetedSearch-range-submitted</td>
		<td>event</td>
	</tr>
</table>

