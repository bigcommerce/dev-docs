# Front Matter Reference

<div class="otp" id="no-index">

### On This Page
- [Supported Templates](#supported-templates)
- [Global Attributes](#global-attributes)
- [Category Attributes](#category-attributes)
- [Blog Attributes](#blog-attributes)
- [Product Attributes](#product-attributes)
- [Brand Attributes](#brand-attributes)
- [Brand List Attributes](#brand-list-attributes)
- [Cart Attributes](#cart-attributes)
- [Search Attributes](#search-attributes)
  
</div>

Front matter defines which store resources are available to be rendered within a Stencil template. Front matter is declared at the top of each template and uses [YAML](https://yaml.org/) syntax. For more information, see [Declaring Front Matter Objects](https://developer.bigcommerce.com/stencil-docs/storefront-customization/using-front-matter#declaring-front-matter-objects).

## Supported Templates
YAML Front Matter is supported for templates in the `templates/pages/` directory.

Front Matter is not supported for templates in the following directories:
* `templates/components/`
* `templates/layout/`

## Global Attributes
​Global attributes are available on all pages.
​
```yaml
customer:                         
  returns: true                     # show product return requests for this customer
  wishlists:     
    limit: 10                       # limit the number of wishlists to 10
  orders:
    limit: 10                       # limit the number of orders displayed to 10
  recently_viewed_products: true    # display recently viewed products
```
​
|  Property | Description |
| --- | --- |
|  `customer` | Customer attributes are always included, and are available if the active shopper is logged in. |
|  `returns` | Boolean indicating whether to retrieve product return requests for this customer. No filtering available.true: Retrieve requests. null or false: Do not retrieve requests. |
|  `wishlists` | If `null`, wishlists displayed. If `limit` not specified, retrieves unlimited number of wishlists. |
|  `orders` | If `null`, no orders displayed. Displays complete and incomplete orders. If `limit` not specified, displays 20 orders. |
|  `recently_viewed_products` | Boolean indicating whether to display recently viewed products. No filtering available. |
|  `limit` | The maximum number of the entity to display. |

```yaml
products:
  featured:
    limit: 10   #limits the number of featured products to 5
  new:
    limit: 10   #limits the number of new products to 5
  top_sellers: 
    limit: 10   # limits the number of top sellers to 5
```    

|  Property | Description |
| --- | --- |
| `products` | When filtering/limiting, products' default sorting is by order id, from lowest to highest.|
| `featured` | null: No featured products displayed. If not set, defaults to 4 products.|
|`new`| null: No new products displayed. Maximum allowable value is 25. If not defined, defaults to 8 products.|
|`top_sellers`| null: No top-selling products displayed. If not defined, defaults to all top sellers.|

```yaml 
carousel: true    # displays carousel on the storefront unless set to null
```
|  Property | Description |
| --- | --- |
|`carousel`|Boolean indicating whether to display a carousel on storefront. No filtering available.|

```yaml
blog:	
  recent_posts:
    limit: 5    # limits recent blog posts to 5
  summary: 100  # displays 100 character summary of blog post
```

|  Property | Description |
| --- | --- |
|`blog`| Default sorting is by published_date, from most-recent to earliest. This does not work on the blog page. See [Blog Attributes](https://developer.bigcommerce.com/stencil-docs/reference-docs/front-matter-reference#front-matter-attributes-reference_blog).|
|`recent_posts`| null: No recent blog posts displayed. If not defined, defaults to the maximum of 20 blog posts.|
|`summary`|Sets the number of characters to display in each blog post summary. If not defined, displays 100 characters.|

```yaml 
cart: true    # show cart data
```
|  Property | Description |
| --- | --- |
|`cart`|Boolean indicating whether to retrieve cart data. false: Do not return cart data.|

```yaml
categories: true      # displays category tree
  description: true   # displays category description
```

|  Property | Description |
| --- | --- |
|`categories`|Boolean indicating whether to retrieve the category tree during an AJAX request. false: Do not retrieve the category tree.|
|`description`|Boolean indicating whether to retrieve category descriptions dynamically from the database. Set to true for themes that must display category descriptions when pages render.|

```yaml
shop_by_brand: true   # displays brand list
  limit: 10           # limits brands to 10 
```

|Property|Description|
|---|---|
|`shop_by_brand`|Typically used in a footer or sidebar. null: Do not display this brand list. If not defined, returns 10 brands, ordered by the number of products per brand.|

## Category Attributes
Category attributes are available in the context of a category.

```yaml
category:	
  shop_by_price: true   # displays shop by price controls
  products: 10          # displays 10 products per page for this category 
    limit:  10          # limits products per page for this category to 10
```

|Property|Description|
|---|---|
|`shop_by_price`|Boolean indicating whether to display Shop-by-Price controls.|
|`products`|Defines the number of products displayed per page for this category. Range of possible values is 1–100 products.|

## Blog Attributes
Blog attributes are available in the context of a blog.

```yaml
blog: 
  posts:
    limit: 5        # limits number of blog posts to 10
    pages: 5        # displays 5 pages in pagination links
    summary: 250    # displays 250 character summary of blog post
```

|Property|Description|
|---|---|
|`posts`|Default sorting is by `published_date`, from most-recent to earliest.|
|`limit`|null: No blog posts displayed. Maximum is 20 blog posts per page.|
|`pages`|null: No pagination. If not defined, defaults to 5 pages.|
|`summary`|<number> sets the number of characters to display in each blog-post summary. If not defined, displays 250 characters.|

## Product Attributes
Product attributes are available in the context of a product.

```yaml
product:
  videos:
    limit: 5           # limits videos to 5
  images:
    limit: 5           # limits images to 5
  reviews: true
    limit: 5           # limits reviews to 5
  related_products:
    limit: 10          # limits related products by name to 10
  similar_by_views:
      limit:           # limits similar products by views to 10
```

|Property|Description|
|---|---|
|`product`|When filtering/limiting, products' default sorting is by order id, from lowest to highest.|
|`videos`|If `product.videos` is not defined, no videos are returned. If `product.videos` is defined, the default behavior is to return all videos. If `product.videos.limit` is defined, this sets the maximum number of videos returned.|
|`images`|If `product.images` is not defined, no images are returned. If `product.images` is defined, you must also define `product.images.limit`, which throttles the number of images returned. The maximum allowable value for this parameter is 5 images.|
|`reviews`|Boolean indicating whether to display product reviews. If `product.reviews` is present, and is not explicitly set to `false`, reviews will appear. If not defined, defaults to 10 reviews. When filtering/limiting reviews, default sorting is by review id, from lowest to highest.|
|`related_products`|Displays products that are related by name. If `limit` absent or undefined, the default behavior is to display all related products. Inserting `limit` with no integer will display 0 products.|
|`similar_by_views`|Displays products similar to those displayed in the current page context. If `limit` absent or undefined, default is to display 4 products.|

## Brand Attributes

```yaml
brand:
  products:
    limit: 50   # limits products displayed for this brand to 50
```

|Property|Description|
|---|---|
|`products`|`limit` defines the number of products displayed per page for this brand. Range of possible values is 1–50 products.|

## Brand List Attributes

```yaml
brands:
  limit: 50   # limits number of brands displayed in the list to 50
```

|Property|Description|
|---|---|
|`brands`|When retrieving a collection of brands, default sorting is by brand id, from lowest to highest. `limit` sets the number of brands displayed in the list. If `limit` is not defined, returns all brands, up to a maximum of 50.|

## Cart Attributes 

```yaml
cart:
  suggestions:
    limit: 4    # limits number of suggested products to 4
```

|Property|Description|
|---|---|
|`suggestions`|`limit` defines suggested products to display to shopper, based on cart contents. If enabled, these suggestions appear only immediately after the shopper adds an item to the cart. If `limit` is null, does not display suggested products. If not defined, returns 4 suggested products.|

## Search Attributes

```yaml
search: 
  product_results:
    limit: 16   # limits product results to 16
```

|Property|Description|
|---|---|
|`product_results`|`limit` defines the number of product search results displayed per page. Range of possible values is 1–100 products.|
