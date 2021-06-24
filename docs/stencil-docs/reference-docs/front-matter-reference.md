# Front Matter Reference

<div class="otp" id="no-index">

### On this page
- [Supported templates](#supported-templates)
- [Global attributes](#global-attributes)
- [Category attributes](#category-attributes)
- [Blog attributes](#blog-attributes)
- [Product attributes](#product-attributes)
- [Brand attributes](#brand-attributes)
- [Brand list attributes](#brand-list-attributes)
- [Search attributes](#search-attributes)
- [GraphQL attributes](#graphql-attributes)
  
</div>

Front matter defines which store resources are available to be rendered within a Stencil template. Front matter is declared at the top of each template and uses [YAML](https://yaml.org/) syntax. For more information, see [Declaring Front Matter Objects](https://developer.bigcommerce.com/stencil-docs/storefront-customization/using-front-matter#declaring-front-matter-objects).

## Supported templates
You can use YAML Front Matter for templates in the `templates/pages/` directory. Injecting objects in the front matter of `templates/pages/page.html` will make the objects available to custom templates.


You cannot use Front matter for templates in the following directories:
* `templates/components/`
* `templates/layout/`
* `templates/pages/custom/`


## Global attributes
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
|  `customer` | Customer attributes are always included and are available when an active shopper logs in. |
|  `returns` | Boolean indicating whether to retrieve product return requests for this customer. No filtering available.true: Retrieve requests. null or false: Do not retrieve requests. |
|  `wishlists` | If `null`, wishlists are displayed. If `limit` is not specified, it retrieves an unlimited number of wishlists. |
|  `orders` | If `null`, no orders are displayed. Displays complete and incomplete orders. If `limit` is not specified, it displays 20 orders. |
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
|`new`| null: No new products displayed. The maximum allowable value is 25. If not defined, defaults to 8 products.|
|`top_sellers`| null: No top-selling products displayed. If not defined, defaults to all top sellers.|

```yaml 
carousel: true    # displays carousel on the storefront unless set to null
```
|  Property | Description |
| --- | --- |
|`carousel`|Boolean indicating whether to display a carousel on a storefront. No filtering available.|

```yaml
blog:	
  recent_posts:
    limit: 5    # limits recent blog posts to 5
  summary: 100  # displays 100 character summary of blog post
```

|  Property | Description |
| --- | --- |
|`blog`| Default sorting is by published_date, from most recent to earliest. This sorting does not work on the blog page. See [Blog Attributes](https://developer.bigcommerce.com/stencil-docs/reference-docs/front-matter-reference#blog-attributes).|
|`recent_posts`| null: No recent blog posts displayed. If not defined, defaults to the maximum of 20 blog posts.|
|`summary`|Sets the number of characters to display in each blog post summary. If not defined, it displays 100 characters.|

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
|`shop_by_brand`|Typically used in a footer or sidebar. null: Do not display this brand list. If not defined, it returns 10 brands, ordered by the number of products per brand.|

## Category attributes
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
|`products`|Defines the number of products displayed per page for this category. The range of possible values is 1–100 products.|

## Blog attributes
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
|`posts`|Default sorting is by `published_date`, from most recent to earliest.|
|`limit`|null: No blog posts displayed. The maximum is 20 blog posts per page.|
|`pages`|null: No pagination. If not defined, defaults to five pages.|
|`summary`|<number> sets the number of characters to display in each blog-post summary. If not defined, it displays 250 characters.|

## Product attributes
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
|`videos`|If `product.videos` is not defined, you will not return videos. If you define `product.videos`, the default behavior is to return all videos. If you define `product.videos.limit`, this sets the maximum number of videos returned.|
|`images`|If `product.images` is not defined, you will not return images. If `product.images` is defined, you must also define `product.images.limit`, which throttles the number of images returned. The maximum allowable value for this parameter is five images.|
|`reviews`|Boolean indicating whether to display product reviews. If `product.reviews` is present and is not explicitly set to `false`, reviews will appear. If not defined, defaults to 10 reviews. When filtering/limiting reviews, the default sorting is by review id, from lowest to highest.|
|`related_products`|Displays products that are related by name. If `limit` absent or undefined, the default behavior is to display all related products. Inserting `limit` with no integer will display 0 products.|
|`similar_by_views`|Displays products similar to those displayed in the current page context. If `limit` absent or undefined, the default is to display four products.|

## Brand attributes

```yaml
brand:
  products:
    limit: 50   # limits products displayed for this brand to 50
```

|Property|Description|
|---|---|
|`products`|`limit` defines the number of products displayed per page for this brand. The range of possible values is 1–50 products.|

## Brand list attributes

```yaml
brands:
  limit: 50   # limits number of brands displayed in the list to 50
```

|Property|Description|
|---|---|
|`brands`|When retrieving a collection of brands, the default sorting is by brand id, from lowest to highest. `limit` sets the number of brands displayed in the list. If `limit` is not defined, returns all brands, up to a maximum of 50.|


## Search attributes

```yaml
search: 
  product_results:
    limit: 16   # limits product results to 16
```

|Property|Description|
|---|---|
|`product_results`|`limit` defines the number of product search results displayed per page. The range of possible values is 1–100 products.|
  
## GraphQL attributes
You can add [GraphQL storefront API](https://developer.bigcommerce.com/api-docs/storefront/graphql/graphql-storefront-api-overview) queries to your theme via the Front matter block in a template file. For example, you can request a product's variants by augmenting the existing [product.html template](https://github.com/bigcommerce/cornerstone/blob/master/templates/pages/product.html):
  
 ```html
 ---
product:
    videos:
        limit: {{theme_settings.productpage_videos_count}}
    reviews:
        limit: {{theme_settings.productpage_reviews_count}}
    related_products:
        limit: {{theme_settings.productpage_related_products_count}}
    similar_by_views:
        limit: {{theme_settings.productpage_similar_by_views_count}}
 gql: "query productById($productId: Int!) {
  site {
    product(entityId: $productId) {
      variants(first: 25) {
        edges {
          node {
            sku
            defaultImage {
              url(width: 1000)
        }
       }
      }
     }
    }
   }
  }
  "
  ```
We suggest testing queries using the [storefront API playground](https://github.com/bigcommerce/cornerstone/blob/master/templates/pages/product.html) to refine them before adding them to your template. You can launch the playground in the context of your store by clicking the link under the Advanced Settings menu in your control panel.
  
Once you have added a query to your template's Front matter block, execution happens automatically when the page loads. The data returned by the query will be returned in the page's context and made available to the handlebars under the gql key. For example, you can retrieve the variant data from the above query in product.html like this:
```html
 {{#each gql.data.site.product.variants.edges}}
    {{#with node}}
      {{sku}} {{! - - sku code from each variant from GQL response}}
    {{/with}}
  {{/each}}
  ```
  
On some pages, you may take advantage of special variables that you can inject into your query to help fetch data relevant to that page. For example, in the case where you wish to fetch information about a product with a GraphQL query, you can use the `$productId` variable on product pages to inject the product ID of the current page.

The complete list of available variables is:
* category.html: $categoryId
* product.html: $productId
* brand.html: $brandId
* page.html: $pageId
* contact-us.html: $pageId
* blog-post.html: $blogPostId
  
You are also free to use any queries which do not require dynamic variables to return the data you need for your template. Here is an example:
  
Query example
 ```yaml
gql: “guery CategoryTree4LevelsDeep {
	site {
		categoryTree {
			...CategoryFields
			children {
			...CategoryFields
			children {
 		...CategoryFields
					}
				}	
			}
		}
	}
```
  
Query response example

```json
 "gql": {
    data: {
        site {
            categoryTree [
            {
                "children": [],
                "categoryId": 23,
                "name": "Shop All",
                "path": "/shop-all/"
            },
            {
                "children": [],
                "categoryId": 18,
                "name": "Shirts",
                "path": "/shirts/"
            }
        ]
        }
    }
}
``` 
