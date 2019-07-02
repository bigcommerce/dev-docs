<h1>Custom Array Helpers</h1>

<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#handlebars_itemat">{{itemAt}}</a></li>
    <li><a href="#handlebars_join">{{join}}</a></li>
    <li><a href="#handlebars_limit">{{limit}}</a></li>
    <li><a href="#handlebars_pluck">{{pluck}}</a></li>
	</ul>
</div>

<a href='#handlebars_itemat' aria-hidden='true' class='block-anchor'  id='handlebars_itemat'><i aria-hidden='true' class='linkify icon'></i></a>

## {{itemAt}}

_Block helper that returns the item at the specified index._

#### Parameters

* `array` {Array}
* `idx` {Number}
* `returns` {any} `value`

#### Example

Given the array `['a', 'b', 'c']`:

```handlebars
{{itemAt array 1}}
//=> 'b'
```



<a href='#handlebars_join' aria-hidden='true' class='block-anchor'  id='handlebars_join'><i aria-hidden='true' class='linkify icon'></i></a>

## {{join}}

The `join` helper is custom to Stencil. It joins an array of string items, with separators. It returns a string. 

#### Parameters

- `values`: {Array}
- `separator`: {String}
- `limit=<number>`: An optional limit.



<a href='#handlebars_limit' aria-hidden='true' class='block-anchor'  id='handlebars_limit'><i aria-hidden='true' class='linkify icon'></i></a>

## {{limit}}

The `limit` helper is custom to Stencil. It limits the number of items returned from an array variable, and returns a new array.

#### Parameters

- `data`: {Array}
- `limit`: {Number}

#### {{limit}} Example 

Assume that `{{cart.items}}` would return 10 items. You could use this helper to limit that behavior to only the first four items, by specifying: 

```
{{limit cart.items 4}}
```



<a href='#handlebars_pluck' aria-hidden='true' class='block-anchor'  id='handlebars_pluck'><i aria-hidden='true' class='linkify icon'></i></a>

## {{pluck}}

The `pluck` helper is custom to Stencil. For one specified search key(s), it retrieves corresponding values from some or all elements in a specified collection. 

The `pluck` helper returns the retrieved values in a comma-separated string. This helper's general form is:

```
{{pluck ([limit] <collection> [<limit-value>]) '<search-key>'}}
```

#### Parameters

- `limit`, `limit-value`: Optional parameters to limit the number of results returned.
- `collection`: The collection to search.
- `search-key`: The string to search for.


#### {{pluck}} Example 1

Assume that the `categories` collection contains:

```
categories: [
  { "id": 1, "name": "Bakeware" },
  { "id": 2, "name": "Cookware" },
  { "id": 3, "name": "Cutlery" }
]
```

In this case, this Handlebars statement:

```
{{pluck (limit categories 2) 'name'}}
```

...would return:

```
"Bakeware,Cookware"
```

#### {{pluck}} Example 2

If the `categories` themselves each contained an image object, then you could use dot notation to access that image object's children:

```
categories: [
  { "id": 1, "name": "Bakeware", "image": { "data": "http://...", "alt": "Bakeware image"} },
  { "id": 2, "name": "Cookware" "image": { "data": "http://...", "alt": "Cookware image"} },
  { "id": 3, "name": "Cutlery" "image": { "data": "http://...", "alt": "Cutlery image"} }
]
```

In this case, this Handlebars statement:

```
{{pluck (limit categories 2) 'image.data'}}
```

...would return a comma-separated list of image URLs.


