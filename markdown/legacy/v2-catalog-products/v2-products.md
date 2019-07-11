<h1>Products</h1>
<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
		<li><a href="#v2-products_object-properties">Object Properties</a></li>
		<li><a href="#v2-products_list-products">List Products</a></li>
		<li><a href="#v2-products_get-products">Get a Product</a></li>
    <li><a href="#v2-products_get-count-products">Get a Count of Products</a></li>
    <li><a href="#v2-products_create-products">Create a Product</a></li>
    <li><a href="#v2-products_update-products">Update A Product</a></li>
    <li><a href="#v2-products_delete-products">Delete a Product</a></li>
    <li><a href="#v2-products_delete-all-products">Delete All Products</a></li>
		</ul>
</div>


<div class="HubBlock--callout">
<div class="CalloutBlock--error">
<div class="HubBlock-content">
    
<!-- theme: error -->

> It is recommended to use the new [Catalog Products](/api-reference/catalog/catalog-api)

</div>
</div>
</div>

<a href='#v2-products_object-properties' aria-hidden='true' class='block-anchor'  id='v2-products_object-properties'><i aria-hidden='true' class='linkify icon'></i></a>

## Products 
A product object represents a saleable item in the catalog.

### Product Object – Properties 

| Name | Type | Description |
| --- | --- | --- | --- |
| id | int | The unique numerical ID of the product. Increments sequentially. |
| keyword_filter | string | (This property is deprecated.) |
| name | string | The product name. |
| type | enum | The product type. One of:<br> `physical` – a physical stock unit.<br> `digital` – a digital download. |
| sku | string | User-defined product code/stock keeping unit (SKU). |
| description | text | Product description, which can include HTML formatting. |
| search_keywords | text | A comma-separated list of keywords that can be used to locate the product when searching the store. |
| availability_description | string | Availability text, displayed on the checkout page under the product title, telling the customer how long it will normally take to ship this product. E.g.: "Usually ships in 24 hours". |
| price | decimal | The product's price. Should include, or exclude, tax based on the store settings. |
| cost_price | decimal | The product's cost price. Stored for reference only; not used or displayed anywhere on the store. |
| retail_price | decimal | The product's retail cost. If entered, this retail price will be shown on the product page. |
| sale_price | decimal | Sale price. If entered, this will be used instead of value in the price field when calculating the product's cost. |
| calculated_price | decimal | Price as displayed to guests, adjusted for applicable sales and rules. (Cart price might incorporate further discounts for logged-in customers or customer groups.) Read-only. |
| sort_order | int | Priority to give this product when included in product lists on category pages and in search results. Lower integers will place the product closer to the top of the results. |
| is_visible | boolean | Flag to determine whether or not the product should be displayed to customers browsing. If `true`, the product will be displayed. If `false`, the product will be hidden from view. |
| is_featured | boolean | Flag to determine whether the product should be included in the "featured products" panel for shoppers viewing the store. |
| related_products | string | Defaults to `-1`, which causes the store to automatically generate a list of related products. To manually specify the list of related products, include their IDs, separated by commas. For example: `3, 6, 7, 21`. |
| inventory_level | int | Current inventory level of the product. Simple inventory tracking must be enabled (see the `inventory_tracking` field) for this to take effect. |
| inventory_warning_level | int | Inventory Warning level for the product. When the product's inventory level drops below this warning level, the store owner will be sent a notification. Simple inventory tracking must be enabled (see the `inventory_tracking` field) for this to take effect. |
| warranty | text | Warranty information displayed on the product page. Can include HTML formatting. |
| weight | decimal | Weight of the product, which can be used when calculating shipping costs. |
| width | decimal | Width of the product, which can be used when calculating shipping costs. |
| height | decimal | Height of the product, which can be used when calculating shipping costs. |
| depth | decimal | Depth of the product, which can be used when calculating shipping costs. |
| fixed_cost_shipping_price | decimal | A fixed shipping cost for the product. If defined, this value will be used instead of normal shipping-cost calculation during checkout. |
| is_free_shipping | boolean | Flag used to indicate whether or not the product has free shipping. If `true`, the shipping cost for the product will be zero. |
| inventory_tracking | enum | The type of inventory tracking for the product. One of:<br> `none` – inventory levels will not be tracked.<br> `simple` – inventory levels will be tracked using the `inventory_level` and `inventory_warning_level` fields.<br> `sku` – inventory levels will be tracked based on individual product options, which maintain their own warning levels and inventory levels. |
| rating_total | int | The total rating for the product. |
| rating_count | int | The total number of ratings the product has had. |
| total_sold | int | Total quantity of this product sold through transactions. |
| date_created | date | The date of which the product was created. |
| brand_id | int | The product's brand |
| view_count | int | The number of times the product has been viewed. |
| page_title | string | Custom title for the product's page. If not defined, the product name will be used as the page title. |
| meta_keywords | text | Custom meta keywords for the product page. If not defined, the store's default keywords will be used. |
| meta_description | text | Custom meta description for the product page. If not defined, the store's default meta description will be used. |
| layout_file | string | The layout template file used to render this product category. This field is writable only for stores with a Blueprint theme applied |
| is_price_hidden | boolean | The default `false` value indicates that this product's price should be shown on the product page. If set to `true`, the price will be hidden hidden. (NOTE: To successfully set `is_price_hidden` to `true`, the `availability` value must be `disabled`.) |
| price_hidden_label | string | By default, an empty string. If `is_price_hidden` is `true`, the value of `price_hidden_label` will be displayed instead of the price. (NOTE:&#160;To successfully set a non-empty string value for `price_hidden_label`, the `availability` value must be `disabled`.) |
| categories | array | An array of IDs for the categories this product belongs to. When updating a product, if an array of categories is supplied, then all product categories will be overwritten. Does not accept more than 1,000 ID values. |
| date_modified | date | The date that the product was last modified. |
| event_date_field_name | string | Name of the field to be displayed on the product page when selecting the event/delivery date. |
| event_date_type | enum | One of the following values:<br> `none` – Disables the event/delivery date requirement and field.<br> `after` – The selected date must fall either on, or after, the date specified in the `event_date_start` field.<br> `before` – The selected date must fall either before, or on, the date specified in the `event_date_end` field.<br> `range` – The selected date must fall between the `event_date_start` and `event_date_end` dates. |
| event_date_start | date | When the product requires the customer to select an event/delivery date, this date is used as the "after" date. |
| event_date_end | date | When the product requires the customer to select an event/delivery date, this date is used as the "before" date. |
| myob_asset_account | string | MYOB Asset Account. |
| myob_income_account | string | MYOB Income Account. |
| myob_expense_account | string | MYOB Expense/COS Account. |
| peachtree_gl_account | string | Peachtree General Ledger Account. |
| condition | enum | The product's condition. Will be shown on the product page if the value of the `is_condition_shown` field is true. Possible values: `New`, `Used`, `Refurbished`. |
| is_condition_shown | boolean | Flag used to determine whether the product's condition will be shown to the customer on the product page. |
| preorder_release_date | date | Pre-order release date. See `availability` field for details on setting a product's availability to accept pre-orders. |
| is_preorder_only | boolean | If set to `false`, the product will not change its `availability` from `preorder` to `available` on the release date. Otherwise, on the release date the product's availability/status will change to `available`. |
| preorder_message | string | Custom expected-date message to display on the product page. If undefined, the message defaults to the storewide setting. Can contain the `%%DATE%%` placeholder, which will be replaced with the release date. |
| order_quantity_minimum | int | The minimum quantity an order must contain in order to purchase this product. |
| order_quantity_maximum | int | The maximum quantity an order can contain when purchasing the product. |
| open_graph_type | enum | Type of product. Acceptable values are: `product`, `album`, `book`, `drink`, `food`, `game`, `movie`, `song`, `tv_show` |
| open_graph_title | string | Title of the product. If not specified, the product's name will be used instead. |
| open_graph_description | text | Description to use for the product. If not specified, the `meta_description` will be used instead. |
| is_open_graph_thumbnail | boolean | If set to `true`, the product thumbnail image will be used as the open graph image. |
| upc | string | The product UPC code, which is used in feeds for shopping comparison sites. |
| date_last_imported | date | The date on which the product was last imported using the bulk importer. |
| option_set_id | int | The ID of the [option set](/api/v2/#option-sets) applied to the product. (NOTE: To remove the option set from the product, set the value to `null` on update.) |
| tax_class_id | int | The ID of the tax class applied to the product. (NOTE: Value ignored if automatic tax is enabled.) |
| option_set_display | enum | The position on the product page where options from the option set will be displayed. |
| bin_picking_number | string | The BIN picking number for the product. |
| custom_url | string | Custom URL (if set) overriding the structure dictated in the store's settings. If no custom URL is set, this will contain the default URL. |
| primary_image | object | An image object, corresponding to the image that is set as the product's thumbnail. This object includes that image's `id`, plus four URL values identifying where to pull the image at different sizes:<br>`standard_url` is the image used in the product page's image box.<br> `tiny_url` is the thumbnail image displayed below the product page's image box.<br> `thumbnail_url` is used for product list-box images on category pages and in side panels.<br> `zoom_url` is either the original image size provided to BigCommerce, or the merchant-selected `Product Zoom Image`/`Zoomed image` size – whichever is smaller. (You can always access the product's original image via the [Product Images resource](/api/v2/#product-images).) |
| availability | enum | Availability of the product. Possible values:<br> `available` – the product can be purchased on the storefront.<br> `disabled` - the product is listed on the storefront, but cannot be purchased.<br> `preorder` – the product is listed for pre-orders. |
| brand | resource | The product's brand |
| downloads | resource | Total number of downloads for a downloadable product. |
| images | resource | See the [Product Images resource](/api/v2/#product-images) for information. |
| discount_rules | resource | See the [Bulk Pricing/Discount](/api/v2/#bulk-pricing) resource for information. |
| configurable_fields | resource | See the [Configurable Fields](/api/v2/#configurable-fields) resource for information. |
| custom_fields | resource | See the [Custom Fields](/api/v2/#custom-fields) resource for information. |
| videos | resource | See the [Videos resource](/api/v2/#videos) for information. |
| skus | resource | Stock Keeping Units for the product. See the [Product SKUs](/api/v2/#skus) resource for the definition of a sku object. |
| rules | resource | Rules that apply only to this product, based on the product's [option set](/v2#product-option-sets). See [Product Rules](/api/v2/#product-rules) resource for information. |
| option_set | resource | See the [Product Option Sets](/v2/#product-option-sets) resource for information. |
| options | resource | Options from the [option set](/api/v2/#option-sets) applied to the product. See the [Product Options](/api/v2/#product-options) resource for information. |
| tax_class | resource | Assigned tax class, when using a manual tax setup. This can be a number matching one of the tax classes set up in your store. |
| avalara_product_tax_code | resource | Accepts AvaTax System Tax Codes, which identify products and services that fall into special sales-tax categories. By using these codes, merchants who subscribe to Avalara Premium can calculate sales taxes more accurately.<br><br> Stores without Avalara Premium will ignore the code when calculating sales tax. Do not pass more than one code. The codes are case-sensitive.<br><br> For details, please see Avalara's <a href="https://help.avalara.com/000_Avalara_AvaTax/Manage_Product_Taxability/010_Select_AvaTax_System_Tax_Codes" target="_blank">overview</a> and <a href="https://help.avalara.com/000_Avalara_AvaTax/Manage_Product_Taxability/Tax_Codes_-_Frequently_Asked_Questions" target="_blank">FAQ</a> on AvaTax System Tax Codes. You can also <a href="https://help.avalara.com/@api/deki/files/1675/AvaTax_System_Tax_Codes_Toolkit.zip?revision=37" target="_blank">download codes</a> as a zipfile of spreadsheets, or <a href="https://taxcode.avatax.avalara.com/" target="_blank">search or browse codes</a> in Avalara's Tax Code Search Tool. (These external links are subject to change.) |


---

<a href='#v2-products_list-products' aria-hidden='true' class='block-anchor'  id='v2-products_list-products'><i aria-hidden='true' class='linkify icon'></i></a>

## List Products 

Gets the collection of products. (Default sorting is by product id, from lowest to highest.)
> `GET /stores/{store_hash}/v2/products`

### Filters 

Filter parameters can be added to the URL query string to select specific products in the collection.

| Parameter | Type | Example |
| --- | --- | --- |
| min_id | int | /api/v2/products?min_id={value} |
| max_id | int | /api/v2/products?max_id={value} |
| name | string | /api/v2/products?name={value} |
| keyword_filter | string | /api/v2/products?keyword_filter={value} |
| description | string | /api/v2/products?description={value} |
| sku | string | /api/v2/products?sku={value} |
| condition | string | /api/v2/products?condition={value} |
| availability | string | /api/v2/products?availability={value} |
| brand_id | string | /api/v2/products?brand_id={value} |
| min_date_created | dateTime or date | /api/v2/products?min_date_created={value} |
| max_date_created | dateTime or date | /api/v2/products?max_date_created={value} |
| min_date_modified | dateTime or date | /api/v2/products?min_date_modified={value} |
| max_date_modified | dateTime or date | /api/v2/products?max_date_modified={value} |
| min_date_last_imported | date | /api/v2/products?min_date_last_imported={value} |
| max_date_last_imported | date | /api/v2/products?max_date_last_imported={value} |
| min_price | decimal | /api/v2/products?min_price={value} |
| max_price | decimal | /api/v2/products?max_price={value} |
| min_number_sold | int | /api/v2/products?min_number_sold={value} |
| max_number_sold | int | /api/v2/products?max_number_sold={value} |
| is_visible | string | /api/v2/products?is_visible={value} |
| is_featured | string | /api/v2/products?is_featured={value} |
| min_inventory_level | int | /api/v2/products?min_inventory_level={value} |
| max_inventory_level | int | /api/v2/products?max_inventory_level={value} |
| include_sku | boolean | /api/v2/products?include_sku={value} |
| category | string | /api/v2/products?category={value} |
| product_tax_code | string | /api/v2/products?product_tax_code={value} |

### Pagination 

Parameters can be added to the URL query string to paginate the collection. The maximum limit is 250. If a limit isn’t provided, up to 50 products are returned by default.

| Parameter | Type | Example |
| --- | --- | --- |
| Page | int | /api/v2/products?page={number} |
| Limit | int | /api/v2/products?limit={count} |

### Notes 

You can filter the retrieved fields by appending one of the following options to your request:

* ?include=
* ?include=@summary
* ?exclude=

For details, syntax, and examples, please see the [Get a Product](#get-a-product) operation.

### Response 

Example JSON returned in the response:

```
[
  {
    "id": 32,
    "keyword_filter": null,
    "name": "[Sample] Tomorrow is today, Red printed scarf",
    "type": "physical",
    "sku": "",
    "description": "Densely pack your descriptions with useful information and watch products fly off the shelf.",
    "search_keywords": null,
    "availability_description": "",
    "price": "89.0000",
    "cost_price": "0.0000",
    "retail_price": "0.0000",
    "sale_price": "0.0000",
    "calculated_price": "89.0000",
    "sort_order": 0,
    "is_visible": true,
    "is_featured": true,
    "related_products": "-1",
    "inventory_level": 0,
    "inventory_warning_level": 0,
    "warranty": null,
    "weight": "0.3000",
    "width": "0.0000",
    "height": "0.0000",
    "depth": "0.0000",
    "fixed_cost_shipping_price": "10.0000",
    "is_free_shipping": false,
    "inventory_tracking": "none",
    "rating_total": 0,
    "rating_count": 0,
    "total_sold": 0,
    "date_created": "Fri, 21 Sep 2012 02:31:01 +0000",
    "brand_id": 17,
    "view_count": 4,
    "page_title": "",
    "meta_keywords": null,
    "meta_description": null,
    "layout_file": "product.html",
    "is_price_hidden": false,
    "price_hidden_label": "",
    "categories": [
      14
    ],
    "date_modified": "Mon, 24 Sep 2012 01:34:57 +0000",
    "event_date_field_name": "Delivery Date",
    "event_date_type": "none",
    "event_date_start": "",
    "event_date_end": "",
    "myob_asset_account": "",
    "myob_income_account": "",
    "myob_expense_account": "",
    "peachtree_gl_account": "",
    "condition": "New",
    "is_condition_shown": false,
    "preorder_release_date": "",
    "is_preorder_only": false,
    "preorder_message": "",
    "order_quantity_minimum": 0,
    "order_quantity_maximum": 0,
    "open_graph_type": "product",
    "open_graph_title": "",
    "open_graph_description": null,
    "is_open_graph_thumbnail": true,
    "upc": null,
    "avalara_product_tax_code": "",
    "date_last_imported": "",
    "option_set_id": null,
    "tax_class_id": 0,
    "option_set_display": "right",
    "bin_picking_number": "",
    "custom_url": "/tomorrow-is-today-red-printed-scarf/",
    "primary_image": {
      "id": 247,
      "zoom_url": "https://cdn.url.path/bcapp/et7xe3pz/products/32/images/247/in_123__14581.1393831046.1280.1280.jpg?c=1",
      "thumbnail_url": "https://cdn.url.path/bcapp/et7xe3pz/products/32/images/247/in_123__14581.1393831046.220.290.jpg?c=1",
      "standard_url": "https://cdn.url.path/bcapp/et7xe3pz/products/32/images/247/in_123__14581.1393831046.386.513.jpg?c=1",
      "tiny_url": "https://cdn.url.path/bcapp/et7xe3pz/products/32/images/247/in_123__14581.1393831046.44.58.jpg?c=1"
    },
    "availability": "available",
    "brand": {
      "url": "https://store-et7xe3pz.mybigcommerce.com/api/v2/brands/17.json",
      "resource": "/brands/17"
    },
    "images": {
      "url": "https://store-et7xe3pz.mybigcommerce.com/api/v2/products/32/images.json",
      "resource": "/products/32/images"
    },
    "discount_rules": {
      "url": "https://store-et7xe3pz.mybigcommerce.com/api/v2/products/32/discountrules.json",
      "resource": "/products/32/discountrules"
    },
    "configurable_fields": {
      "url": "https://store-et7xe3pz.mybigcommerce.com/api/v2/products/32/configurablefields.json",
      "resource": "/products/32/configurablefields"
    },
    "custom_fields": {
      "url": "https://store-et7xe3pz.mybigcommerce.com/api/v2/products/32/customfields.json",
      "resource": "/products/32/customfields"
    },
    "videos": {
      "url": "https://store-et7xe3pz.mybigcommerce.com/api/v2/products/32/videos.json",
      "resource": "/products/32/videos"
    },
    "skus": {
      "url": "https://store-et7xe3pz.mybigcommerce.com/api/v2/products/32/skus.json",
      "resource": "/products/32/skus"
    },
    "rules": {
      "url": "https://store-et7xe3pz.mybigcommerce.com/api/v2/products/32/rules.json",
      "resource": "/products/32/rules"
    },
    "option_set": null,
    "options": {
      "url": "https://store-et7xe3pz.mybigcommerce.com/api/v2/products/32/options.json",
      "resource": "/products/32/options"
    },
    "tax_class": {
      "url": "https://store-et7xe3pz.mybigcommerce.com/api/v2/taxclasses/0.json",
      "resource": "/taxclasses/0"
    }
  },
  {
    "id": 33,
    "keyword_filter": null,
    "name": "[Sample] Anna, multi-colored bangles",
    "type": "physical",
    "sku": "",
    "description": "One of the best things you can do to make your store successful is invest some time in writing great product descriptions.</p>",
    "search_keywords": null,
    "availability_description": "",
    "price": "59.0000",
    "cost_price": "0.0000",
    "retail_price": "0.0000",
    "sale_price": "0.0000",
    "calculated_price": "59.0000",
    "sort_order": 0,
    "is_visible": true,
    "is_featured": true,
    "related_products": "-1",
    "inventory_level": 0,
    "inventory_warning_level": 0,
    "warranty": null,
    "weight": "0.5000",
    "width": "0.0000",
    "height": "0.0000",
    "depth": "0.0000",
    "fixed_cost_shipping_price": "0.0000",
    "is_free_shipping": false,
    "inventory_tracking": "none",
    "rating_total": 0,
    "rating_count": 0,
    "total_sold": 0,
    "date_created": "Fri, 21 Sep 2012 02:46:41 +0000",
    "brand_id": 18,
    "view_count": 12,
    "page_title": "",
    "meta_keywords": null,
    "meta_description": null,
    "layout_file": "product.html",
    "is_price_hidden": false,
    "price_hidden_label": "",
    "categories": [
      14
    ],
    "date_modified": "Mon, 24 Sep 2012 05:28:02 +0000",
    "event_date_field_name": "Delivery Date",
    "event_date_type": "none",
    "event_date_start": "",
    "event_date_end": "",
    "myob_asset_account": "",
    "myob_income_account": "",
    "myob_expense_account": "",
    "peachtree_gl_account": "",
    "condition": "New",
    "is_condition_shown": false,
    "preorder_release_date": "",
    "is_preorder_only": false,
    "preorder_message": "",
    "order_quantity_minimum": 0,
    "order_quantity_maximum": 0,
    "open_graph_type": "product",
    "open_graph_title": "",
    "open_graph_description": null,
    "is_open_graph_thumbnail": true,
    "upc": null,
    "avalara_product_tax_code": "",
    "date_last_imported": "",
    "option_set_id": 13,
    "tax_class_id": 0,
    "option_set_display": "right",
    "bin_picking_number": "",
    "custom_url": "/anna-multi-colored-bangles/",
    "primary_image": {
      "id": 245,
      "zoom_url": "https://cdn.url.path/bcapp/et7xe3pz/products/33/images/245/HERO_cocolee_anna_92865__20303.1393831046.1280.1280.jpg?c=1",
      "thumbnail_url": "https://cdn.url.path/bcapp/et7xe3pz/products/33/images/245/HERO_cocolee_anna_92865__20303.1393831046.220.290.jpg?c=1",
      "standard_url": "https://cdn.url.path/bcapp/et7xe3pz/products/33/images/245/HERO_cocolee_anna_92865__20303.1393831046.386.513.jpg?c=1",
      "tiny_url": "https://cdn.url.path/bcapp/et7xe3pz/products/33/images/245/HERO_cocolee_anna_92865__20303.1393831046.44.58.jpg?c=1"
    },
    "availability": "available",
    "brand": {
      "url": "https://store-et7xe3pz.mybigcommerce.com/api/v2/brands/18.json",
      "resource": "/brands/18"
    },
    "images": {
      "url": "https://store-et7xe3pz.mybigcommerce.com/api/v2/products/33/images.json",
      "resource": "/products/33/images"
    },
    "discount_rules": {
      "url": "https://store-et7xe3pz.mybigcommerce.com/api/v2/products/33/discountrules.json",
      "resource": "/products/33/discountrules"
    },
    "configurable_fields": {
      "url": "https://store-et7xe3pz.mybigcommerce.com/api/v2/products/33/configurablefields.json",
      "resource": "/products/33/configurablefields"
    },
    "custom_fields": {
      "url": "https://store-et7xe3pz.mybigcommerce.com/api/v2/products/33/customfields.json",
      "resource": "/products/33/customfields"
    },
    "videos": {
      "url": "https://store-et7xe3pz.mybigcommerce.com/api/v2/products/33/videos.json",
      "resource": "/products/33/videos"
    },
    "skus": {
      "url": "https://store-et7xe3pz.mybigcommerce.com/api/v2/products/33/skus.json",
      "resource": "/products/33/skus"
    },
    "rules": {
      "url": "https://store-et7xe3pz.mybigcommerce.com/api/v2/products/33/rules.json",
      "resource": "/products/33/rules"
    },
    "option_set": {
      "url": "https://store-et7xe3pz.mybigcommerce.com/api/v2/optionsets/13.json",
      "resource": "/optionsets/13"
    },
    "options": {
      "url": "https://store-et7xe3pz.mybigcommerce.com/api/v2/products/33/options.json",
      "resource": "/products/33/options"
    },
    "tax_class": {
      "url": "https://store-et7xe3pz.mybigcommerce.com/api/v2/taxclasses/0.json",
      "resource": "/taxclasses/0"
    }
  }
]
```

---

<a href='#v2-products_get-products' aria-hidden='true' class='block-anchor'  id='v2-products_get-products'><i aria-hidden='true' class='linkify icon'></i></a>

## Get a Product 

Gets a product.
 
> `GET /stores/{store_hash}/v2/products/{id}`

### Notes 

You can filter the retrieved fields by appending one of the following options to your request: 

- `?include=`
- `?include=@summary` 
- `?exclude=`

In particular, you can reduce payload size, and improve performance, by excluding the `description` field.

### Mandatory Fields 

However, the following fields are always present on product API requests, and cannot be excluded:

- `id`
- `name`
- `date_modified`
- `primary_image`

### include 

The following sample request will retrieve *only* the specified `date_created`, `price`, and `cost_price` fields, plus the mandatory fields listed just above:

```
https://store-et7xe3pz.mybigcommerce.com/api/v2/products/32?include=date_created,price,cost_price
```

Here is a corresponding sample response:

```
{
    "id": 32,
    "name": "[Sample] Tomorrow is today, Red printed scarf",
    "price": "89.0000",
    "cost_price": "0.0000",
    "date_created": "Fri, 21 Sep 2012 02:31:01 +0000",
    "date_modified": "Thu, 10 Dec 2015 21:10:17 +0000",
    "primary_image": {
        "id": 247,
        "tiny_url": "https://cdn.url.path/bcapp/k84uuwpy/products/32/images/247/in_123__14581.1348449270.60.90.jpg?c=1",
        "standard_url": "https://cdn.url.path/bcapp/k84uuwpy/products/32/images/247/in_123__14581.1348449270.500.750.jpg?c=1",
        "thumbnail_url": "https://cdn.url.path/bcapp/k84uuwpy/products/32/images/247/in_123__14581.1348449270.190.285.jpg?c=1",
        "zoom_url": "https://cdn.url.path/bcapp/k84uuwpy/products/32/images/247/in_123__14581.1348449270.1280.1280.jpg?c=1"
    },
    "metadata": []
}
```

### include=@summary 

The `?include=@summary` option retrieves the following predefined subset of fields, in addition to the [mandatory fields](#get-a-product-mandatory) listed above: 

- `availability`
- `calculated_price`
- `inventory_tracking`
- `sku`
- `inventory_level`
- `inventory_warning_level`
- `is_visible`
- `is_featured` 

Here is a sample request with the `?include=@summary` option appended:

```
https://store-et7xe3pz.mybigcommerce.com/api/v2/products/32?include=@summary
```

Here is a corresponding sample response:

```
{
    "id": 32,
    "name": "[Sample] Tomorrow is today, Red printed scarf",
    "sku": "TTRPS",
    "calculated_price": "89.0000",
    "is_visible": true,
    "is_featured": true,
    "inventory_level": 0,
    "inventory_warning_level": 0,
    "inventory_tracking": "none",
    "date_modified": "Thu, 10 Dec 2015 21:10:17 +0000",
    "availability": "available",
    "primary_image": {
        "id": 247,
        "tiny_url": "https://cdn.url.path/bcapp/k84uuwpy/products/32/images/247/in_123__14581.1348449270.60.90.jpg?c=1",
        "standard_url": "https://cdn.url.path/bcapp/k84uuwpy/products/32/images/247/in_123__14581.1348449270.500.750.jpg?c=1",
        "thumbnail_url": "https://cdn.url.path/bcapp/k84uuwpy/products/32/images/247/in_123__14581.1348449270.190.285.jpg?c=1",
        "zoom_url": "https://cdn.url.path/bcapp/k84uuwpy/products/32/images/247/in_123__14581.1348449270.1280.1280.jpg?c=1"
    },
    "metadata": []
}
```

### exclude 

The `?exclude=` option excludes one or more specified fields. However, you cannot exclude the mandatory `id`, `name`, `date_modified`, or `primary_image` fields.

Here is a sample request with the `?exclude=` option appended:

```
https://store-et7xe3pz.mybigcommerce.com/api/v2/products/32?exclude=description
```

We have omitted the corresponding sample response. However, the following section shows a complete sample response for a request submitted with no `?include` or `?exclude` option. (The effect of the `?exclude=description` option shown above would be to omit the `"description": ` field shown as the sixth field below.)


### Response 

Example JSON returned in the response:

```
{
  "id": 32,
  "keyword_filter": null,
  "name": "[Sample] Tomorrow is today, Red printed scarf",
  "type": "physical",
  "sku": "",
  "description": "Densely pack your descriptions with useful information and watch products fly off the shelf.",
  "search_keywords": null,
  "availability_description": "",
  "price": "89.0000",
  "cost_price": "0.0000",
  "retail_price": "0.0000",
  "sale_price": "0.0000",
  "calculated_price": "89.0000",
  "sort_order": 0,
  "is_visible": true,
  "is_featured": true,
  "related_products": "-1",
  "inventory_level": 0,
  "inventory_warning_level": 0,
  "warranty": null,
  "weight": "0.3000",
  "width": "0.0000",
  "height": "0.0000",
  "depth": "0.0000",
  "fixed_cost_shipping_price": "10.0000",
  "is_free_shipping": false,
  "inventory_tracking": "none",
  "rating_total": 0,
  "rating_count": 0,
  "total_sold": 0,
  "date_created": "Fri, 21 Sep 2012 02:31:01 +0000",
  "brand_id": 17,
  "view_count": 4,
  "page_title": "",
  "meta_keywords": null,
  "meta_description": null,
  "layout_file": "product.html",
  "is_price_hidden": false,
  "price_hidden_label": "",
  "categories": [
    14
  ],
  "date_modified": "Mon, 24 Sep 2012 01:34:57 +0000",
  "event_date_field_name": "Delivery Date",
  "event_date_type": "none",
  "event_date_start": "",
  "event_date_end": "",
  "myob_asset_account": "",
  "myob_income_account": "",
  "myob_expense_account": "",
  "peachtree_gl_account": "",
  "condition": "New",
  "is_condition_shown": false,
  "preorder_release_date": "",
  "is_preorder_only": false,
  "preorder_message": "",
  "order_quantity_minimum": 0,
  "order_quantity_maximum": 0,
  "open_graph_type": "product",
  "open_graph_title": "",
  "open_graph_description": null,
  "is_open_graph_thumbnail": true,
  "upc": null,
  "avalara_product_tax_code": "",
  "date_last_imported": "",
  "option_set_id": null,
  "tax_class_id": 0,
  "option_set_display": "right",
  "bin_picking_number": "",
  "custom_url": "/tomorrow-is-today-red-printed-scarf/",
  "primary_image": {
    "id": 247,
    "zoom_url": "https://cdn.url.path/bcapp/et7xe3pz/products/32/images/247/in_123__14581.1393831046.1280.1280.jpg?c=1",
    "thumbnail_url": "https://cdn.url.path/bcapp/et7xe3pz/products/32/images/247/in_123__14581.1393831046.220.290.jpg?c=1",
    "standard_url": "https://cdn.url.path/bcapp/et7xe3pz/products/32/images/247/in_123__14581.1393831046.386.513.jpg?c=1",
    "tiny_url": "https://cdn.url.path/bcapp/et7xe3pz/products/32/images/247/in_123__14581.1393831046.44.58.jpg?c=1"
  },
  "availability": "available",
  "brand": {
    "url": "https://store-et7xe3pz.mybigcommerce.com/api/v2/brands/17.json",
    "resource": "/brands/17"
  },
  "images": {
    "url": "https://store-et7xe3pz.mybigcommerce.com/api/v2/products/32/images.json",
    "resource": "/products/32/images"
  },
  "discount_rules": {
    "url": "https://store-et7xe3pz.mybigcommerce.com/api/v2/products/32/discountrules.json",
    "resource": "/products/32/discountrules"
  },
  "configurable_fields": {
    "url": "https://store-et7xe3pz.mybigcommerce.com/api/v2/products/32/configurablefields.json",
    "resource": "/products/32/configurablefields"
  },
  "custom_fields": {
    "url": "https://store-et7xe3pz.mybigcommerce.com/api/v2/products/32/customfields.json",
    "resource": "/products/32/customfields"
  },
  "videos": {
    "url": "https://store-et7xe3pz.mybigcommerce.com/api/v2/products/32/videos.json",
    "resource": "/products/32/videos"
  },
  "skus": {
    "url": "https://store-et7xe3pz.mybigcommerce.com/api/v2/products/32/skus.json",
    "resource": "/products/32/skus"
  },
  "rules": {
    "url": "https://store-et7xe3pz.mybigcommerce.com/api/v2/products/32/rules.json",
    "resource": "/products/32/rules"
  },
  "option_set": null,
  "options": {
    "url": "https://store-et7xe3pz.mybigcommerce.com/api/v2/products/32/options.json",
    "resource": "/products/32/options"
  },
  "tax_class": {
    "url": "https://store-et7xe3pz.mybigcommerce.com/api/v2/taxclasses/0.json",
    "resource": "/taxclasses/0"
  }
}
```

---

<a href='#v2-products_get-count-products' aria-hidden='true' class='block-anchor'  id='v2-products_get-count-products'><i aria-hidden='true' class='linkify icon'></i></a>

## Get a Product Count 

Gets a count of products.

> `GET /stores/{store_hash}/v2/products/count`

### Filters 

Filter parameters can be added to the URL query string to select specific products in the collection.

| Parameter | Type | Example |
| --- | --- | --- |
| min_id | int | /api/v2/products?min_id={value} |
| max_id | int | /api/v2/products?max_id={value} |
| name | string | /api/v2/products?name={value} |
| keyword_filter | string | /api/v2/products?keyword_filter={value} |
| description | string | /api/v2/products?description={value} |
| sku | string | /api/v2/products?sku={value} |
| condition | string | /api/v2/products?condition={value} |
| availability | string | /api/v2/products?availability={value} |
| brand_id | string | /api/v2/products?brand_id={value} |
| min_date_created | date | /api/v2/products?min_date_created={value} |
| max_date_created | date | /api/v2/products?max_date_created={value} |
| min_date_modified | date | /api/v2/products?min_date_modified={value} |
| max_date_modified | date | /api/v2/products?max_date_modified={value} |
| min_date_last_imported | date | /api/v2/products?min_date_last_imported={value} |
| max_date_last_imported | date | /api/v2/products?max_date_last_imported={value} |
| min_price | decimal | /api/v2/products?min_price={value} |
| max_price | decimal | /api/v2/products?max_price={value} |
| min_number_sold | int | /api/v2/products?min_number_sold={value} |
| max_number_sold | int | /api/v2/products?max_number_sold={value} |
| is_visible | string | /api/v2/products?is_visible={value} |
| is_featured | string | /api/v2/products?is_featured={value} |
| min_inventory_level | int | /api/v2/products?min_inventory_level={value} |
| max_inventory_level | int | /api/v2/products?max_inventory_level={value} |
| include_sku | boolean | /api/v2/products?include_sku={value} |
| category | string | /api/v2/products?category={value} |
| product_tax_code | string | /api/v2/products?product_tax_code={value} |

### Notes 

If no filters are applied, the total number of products is returned.

### Response 

Example JSON returned in the response:

```
{
  "count": 44
}
```

---

<a href='#v2-products_create-products' aria-hidden='true' class='block-anchor'  id='v2-products_create-products'><i aria-hidden='true' class='linkify icon'></i></a>

## Create a Product 

Creates a new product. The example request shows how to create a basic product by sending a product object with the minimum required properties.

> `POST /stores/{store_hash}/v2/products`

### Read-only Properties 

The following properties of the product are read-only. If one or more of these properties are included in the request, it will be rejected.

*   id
*   calculated_price
*   brand
*   images
*   discount_rules
*   configurable_fields
*   custom_fields
*   primary_image
*   videos
*   skus
*   rules
*   option_set
*   options
*   tax_class

### Requirements 

The following properties of the product are required. The request won’t be fulfilled unless these properties are valid.

*   name
*   price
*   categories
*   type
*   availability
*   weight

### Notes 

Create a request by sending a [product object](#product-object-properties) with the minimum required properties:

```
{
    "name": "Plain T-Shirt",
    "type": "physical",
    "description": "This timeless fashion staple will never go out of style!",
    "price": "29.99",
    "categories": [18],
    "availability": "available",
    "weight": "0.5"
}
```

When the `is_visible` property is not provided, the product's visibility is `false` by default.

To make newly created products immediately visible on the storefront, you must set `is_visible` to `true` when you create each product.

To maximize system performance, BigCommerce caps the number of categories to which a product can belong. The maximum is 1,000. If your `POST` includes an array of more than 1,000 `categories` ID values, BigCommerce will return a 403 error:

```
403 Access Denied/Forbidden
```

If automatic tax is enabled on the store, the value of `tax_class_id` will have no effect on the calculation of taxes.

---

<a href='#v2-products_update-products' aria-hidden='true' class='block-anchor'  id='v2-products_update-products'><i aria-hidden='true' class='linkify icon'></i></a>

## Update a Product 

Updates an existing product.

> `PUT /stores/{store_hash}/v2/products/{id}`

### Read-only Properties 

The following properties of the product are read-only. If one or more of these properties are included in the request, it will be rejected.

*   id
*   rating_total
*   rating_count
*   number_sold
*   date_created
*   date_modified
*   date_last_imported
*   calculated_price
*   brand
*   images
*   discount_rules
*   configurable_fields
*   custom_fields
*   primary_image
*   videos
*   skus
*   rules
*   option_set
*   options
*   tax_class

### Requirements 

There are no required properties when updating a product.

### Notes 

To update a product, set one or more product properties in the `PUT` request:

```
{
    "custom_url": "/plain-tshirt/",
    "is_visible": true
}
```

For example, you can use a `PUT` to link a product to an option set:

```
{
    "option_set_id": 14
}
```

Invalid property values will produce a `400 Bad Request` error response:

### Request 

``` 
{
    "condition": "Worn"
}
```

### Response 

```
400 Bad Request
```

Trying to set read-only properties will also produce a `400 Bad Request` error response:

### Request 

```
{
    "number_sold": 99
}
```

### Response 

```
400 Bad Request
```

To maximize system performance, BigCommerce caps the maximum number of categories to which a product can belong, at 1,000. If your `PUT` includes an array of more than 1,000 `categories` ID values, BigCommerce will return a `403` error:

```
403 Access Denied/Forbidden
```

If automatic tax is enabled on the store, the value of `tax_class_id` will have no effect on the calculation of taxes.


---

<a href='#v2-products_delete-products' aria-hidden='true' class='block-anchor'  id='v2-products_delete-products'><i aria-hidden='true' class='linkify icon'></i></a>

## Delete a Product 

Deletes a product.

> `DELETE /stores/{store_hash}/v2/products/{id}`

### Notes 

Successful deletion of a product returns a `204 No Content` response:

```
204 No Content
```

---

<a href='#v2-products_delete-all-products' aria-hidden='true' class='block-anchor'  id='v2-products_delete-all-products'><i aria-hidden='true' class='linkify icon'></i></a>

## Delete All Products 

Deletes all products from the store.

> `DELETE /stores/{store_hash}/v2/products`

### Notes 

Successful deletion of all products returns a `204 No Content` response:

```
204 No Content
```

