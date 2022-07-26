# Promotions API - Beta


<!-- theme: warning -->
> #### Beta supported features
> This API is in beta. We may introduce breaking changes without notice. We recommend implementing robust error handling if you choose to use this API in production.
> During this API's beta phase, we support the following condition and actions:
> * Cart **condition** evaluates against what’s in the shopping cart.
> * Free shipping **action** gives free shipping.
> * Cart item **action** applies discounts on each eligible line item in the cart.
> * Cart value **action** applies to the promotion value of the entire cart.


## Introduction
Promotions are a way to give discounts based on whether the shopper has met specific criteria such as ordering a certain amount, purchasing certain brands, or being a repeat customer.

There are two ways to make a promotion.

1. Create a [Rule](/docs/api-beta-promotions/c2NoOjIxNTcxMDA5-rule) that includes a [Condition](/docs/api-beta-promotions/c2NoOjIxNTcxMDEw-condition) on which to take an action. For example, buy one (condition) get one free (action). The shopper must meet the condition of having a certain item in the cart before getting another item free.

2. Create a promotion with just an action. For example, take 20% off the most expensive item in the cart. The shopper does not need to satisfy any special conditions, and the promotion will apply automatically.

You can set the priority or the order in which the promotions apply, their start and end times, and the banners that appear to alert the shopper to the promotion.

## How to create a promotion

In this section, we will walk you through creating a buy one get one free promotion. While creating the promotion, we will review basic information about the Promotions API. The following is an example of the final request. We will step through the promotion line by line and explain the details.

Before starting, make sure you have:
* The [Promotions API Reference](/docs/api-beta-promotions/YXBpOjE5Nzk3Mjg2-promotions-api-beta)
* A `product_id`
* An API Account with an [OAuth scope](https://developer.bigcommerce.com/api-docs/getting-started/authentication/rest-api-authentication#oauth-scopes) that includes `modify store_v2_marketing`

```json title="Buy one get one: Example promotion" lineNumbers
{
  "name": "Buy One Get One Free",
  "redemption_type": "AUTOMATIC",
  "rules": [
    {
      "action": {
        "gift_item": {
          "product_id": 174,
          "quantity": 1
        }
      },
      "apply_once": false,
      "stop": false,
      "condition": {
        "cart": {
          "items": {
            "products": [
              174
            ]
          },
          "minimum_quantity": 1
        }
      }
    }
  ],
  "notifications": [
    {
      "type": "UPSELL",
      "content": "Buy one Le Parfait Jar, Get One Free!",
      "locations": [
        "CART_PAGE"
      ]
    },
    {
      "type": "ELIGIBLE",
      "content": "You are eligible for a free Le Parfait Jar.",
      "locations": [
        "CART_PAGE"
      ]
    },
    {
      "type": "APPLIED",
      "content": "Congratulations, you have received a free Le Parfait Jar.",
      "locations": [
        "CART_PAGE"
      ]
    }
  ],
  "stop": false,
  "start_date": "2019-01-28T00:00:00+00:00",
  "status": "ENABLED"
}
```

First, give the promotion a name. This name will appear in the control panel for the merchant and as part of the response. Then we need to build the rule. Remember, a rule consists of a [Condition](/docs/api-beta-promotions/c2NoOjIxNTcxMDEw-condition) and an [Action](/docs/api-beta-promotions/c2NoOjIxNTcxMDM4-action). To create the rule, you need the action, condition, and the remaining configuration fields.

### Creating the action

There are three possible actions for promotions:
* [Cart Items Action](/docs/api-beta-promotions/c2NoOjIxNTcxMDI3-cart-items-action) will apply to the individual items in the cart.
* [Cart Value Action](/docs/api-beta-promotions/c2NoOjIxNTcxMDI0-cart-value-action) will apply to the promotion value of the entire cart.
* [Shipping Action](/docs/api-beta-promotions/c2NoOjIxNTcxMDI4-shipping-action) will give a discount on shipping, which can be limited to specific zones.

In this example, we will create a buy one, get one discount. We’ll use Cart Items Action, or `cart_items`, since the shopper will purchase an item, and the discount applies after the item is in the cart.

#### Discount

[Discount](/docs/api-beta-promotions/c2NoOjIxNTcxMDI5-discount) type can be a percentage amount or a fixed amount. You will use a fixed amount when the promotion offers X dollars off an item or items. Percentage discounts offer a percentage off an item or items. When the promotion is to buy one get one free, you will use the percentage discount because one item will be free or 100% off. Using the percent discount avoids having to calculate the item price every time.

In this example, we will use the `percentage_amount` set to 100.

#### Strategy

[Strategy](/docs/api-beta-promotions/c2NoOjIxNTcxMDI3-cart-items-action) decides how the discount applies when multiple items are in the cart. `LEAST_EXPENSIVE` sorts the items in ascending order by price, and the discount applies to the cheapest item. You can also change the Strategy to apply to the `MOST_EXPENSIVE` item in the cart.

In this example, we will use the `LEAST_EXPENSIVE` [Strategy](/docs/api-beta-promotions/c2NoOjIxNTcxMDI3-cart-items-action).

#### As total

`as_total` will distribute the discount across the items. For example, if the total discount is $10 on two items, setting `as_total` to `true` will apply a total of $5 to each item. If set to `false`, $10 will apply per item for a total discount of $20.

In this example, we set `as_total` to false.

#### Items object

The items object includes a product array. You should apply action against this list of products. Quantity is the number of products that can use the discount. The shopper will continue to get the discount as long as the condition is satisfied.

In this example, the product array only has one item available for a discount. Quantity is set to one since the promotion is to buy one get one.

So far, the promotion should look like the following:

```json title="Buy one get one: Example promotion with action" lineNumbers
// **This is an abbreviated code sample.**
{
  "name": "Buy One Get One Free",
  "redemption_type": "AUTOMATIC",
  "rules": [
    {
      "action": {
        "gift_item": {
          "product_id": 174,
          "quantity": 1
        }
      },
      "apply_once": false,
      "stop": false,
      "currency_code": "USD",
      "condition": {
        "cart": {
          "items": {
            "products": [
              174
            ]
          },
          "minimum_quantity": 1
        }
      }
    }
  ],
  "notifications": [
    {
      "type": "UPSELL",
      "content": "Buy one Le Parfait Jar, Get One Free!",
      "locations": [
        "HOME_PAGE",
        "PRODUCT_PAGE",
        "CART_PAGE"
      ]
    },
    {
      "type": "ELIGIBLE",
      "content": "You are eligible for a free Le Parfait Jar.",
      "locations": [
        "CART_PAGE"
      ]
    },
    {
      "type": "APPLIED",
      "content": "Congratulations, you have received a free Le Parfait Jar.",
      "locations": [
        "CART_PAGE"
      ]
    }
  ],
  "stop": false,
  "start_date": "2019-01-28T00:00:00+00:00",
  "status": "ENABLED"
}
```

### Setting the rule configuration

After the Action object, you will need to set two configurations within the rule.

**Apply once**

You can set `apply_once` to `true` or `false`. If set to `true`, the action will only happen once. If set to `false`, it will happen more than once. Set this carefully. In the promotion we are building, setting it to `false` means the shopper can add two products to the cart and get two of the same items for free.

<!-- theme: warning -->
> #### Use care with `apply_once`
> Set `apply_once` carefully to avoid giving a more generous discount than intended.

**Stop**

Stop determines whether the remaining rules apply. Promotions can have more than one rule. If you set stop to `true` on a rule and it is applied successfully, you will end the evaluation. If you set stop to `false` the following rule will be evaluated regardless of the outcome.

If there is only one rule, you can set stop to either `true` or `false` without affecting the results.

**Currency code**

Promotions only apply to orders in the specified transactional currency. `currency_code` is optional and defaults to the store default currency if not supplied.

The `currency_code` must be an uppercase three-letter string that corresponds with an [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code. For example:
* USD
* GBP
* AUD

BigCommerce supports both display and transactional currencies. Transactional currencies are the actual currency customers use to perform the transaction. Display currencies allow shoppers to see prices in a chosen currency; however, BigCommerce will convert to the default transactional currency for payment.

Thus, promotions in the default currency will apply to all display currencies in addition to the default currency.

Promotions that have a non-default transactional currency will only apply to that currency. For example:

You have configured five currencies in your store.
1. USD - default transactional
2. AUD - transactional
3. GBP - transactional
4. NZD - display
5. CAD - display

Promotions created in
1. USD will apply to orders in USD, NZD, CAD
2. AUD will only apply to orders in AUD
3. GBP will only apply to orders in GBP
4. NZD & CAD are not valid `currency_code` values as they are display only

So far, the promotion should look like the following:

```json title="Buy one get one: Stop, apply_once" lineNumbers
// **This is an abbreviated code sample.**
{
  "name": "Buy One Get One Free",
  "redemption_type": "AUTOMATIC",
  "rules": [
    {
      "action": {
        "gift_item": {
          "product_id": 174,
          "quantity": 1
        }
      },
      "apply_once": false,
      "stop": false,
      "currency_code": "USD"
    }
  ]
}
```

### Creating the condition

We can base the condition on one of the following condition types:
* [Cart Condition](/docs/api-beta-promotions/c2NoOjIxNTcxMDE0-cart-condition) Uses the cart contents
* [And Condition](/docs/api-beta-promotions/c2NoOjIxNTcxMDEx-and-condition) Logical and operator
* [Or Condition](/docs/api-beta-promotions/c2NoOjIxNTcxMDEy-or-condition) Logical or operator
* [Not Condition](/docs/api-beta-promotions/c2NoOjIxNTcxMDEz-not-condition) Logical not operator

Cart condition allows you to set the items (products), `minimum_quantity` and, `minimum_spend`. Setting the `minimum_quantity` determines how many items the shopper needs in the cart for the promotion to trigger. The promotion can buy one, buy two, etc. The `minimum_spend` is how much the shopper needs to spend for the discount to trigger. If left blank or not included, it assumes the shopper does not have a `minimum_spend`. In our buy one get one example, the number of products, not the amount purchased, triggers the discount, so you do not need to include it.


In this example, we will use cart condition. Then apply a discount against items added to our product array. The product should match the one set in the preceding action product array. If they do not match, the discount will be buy X product get Y product free. Set the `minimum_quantity` to one.

So far, the promotion should look like the following:

```json title="Buy one get one: Example with condition" lineNumbers
// **This is an abbreviated code sample.**
{
  "name": "Buy One Get One Free",
  "redemption_type": "AUTOMATIC",
  "rules": [
    {
      "action": {
        "gift_item": {
          "product_id": 174,
          "quantity": 1
        }
      },
      "apply_once": false,
      "stop": false,
      "condition": {
        "cart": {
          "items": {
            "products": [
              174
            ]
          },
          "minimum_quantity": 1
        }
      }
    }
  ]
}
```

### Create the notifications

A notification represents a message you can display to a shopper depending on the state of an evaluated rule (for example, a “Congratulations! You’ve received free shipping!” message when the shopper receives free shipping). Due to the nature of cart-level discounts, they will not be apparent to the customer until they have added products to their cart. For this reason, we recommend advertising your discounts with a notification.

There are four types of notifications:

* **Promotion**: `PROMOTION` notifications are visible the entire time a promotion is active. (i.e., “Spend $50 and get free shipping!”).

* **Upsell:** `UPSELL` notifications show when the user has made partial progress towards unlocking a discount. You can use this type of notification to increase the Average Order Value (AOV) or increase the quantity of items in the average order (example: “You’ve spent $40, add another $10 to your cart to receive free shipping!”, “You have 1 of Rebel Shoes, buy one more get 20% off your order total”).


* **Eligible:** `ELIGIBLE` notifications show when the user has met the conditions for a rule but hasn’t yet taken advantage of the discount it provides (i.e., “You’ve spent over $60 on bathroom accessories and are eligible to choose a free item from the ‘Towels’ category!”).

<!-- theme: info -->
> #### Banners
> Eligible banners display if the actions attached to the rule can’t be automatically applied, such as the shopper selecting a free product from a category.

* **Applied:** `APPLIED` notifications show once the shopper has received the discount in their cart (i.e., “Congratulations! You’ve received a free bath towel!”).

Each of these notifications can be attached to one or multiple locations. A location defines the context when these notifications are displayed.

There are four locations:

* **Home Page:** `HOME_PAGE` is the store's homepage. A good example of notification on this location could be an upsell or a promotional banner.

* **Product Page:** `PRODUCT_PAGE` is a Product Detail Page(PDP) for a specific product. When you meet condition and notification criteria, a notification will appear on a PDP. Example: “Buy 2 of Rebel Shoes, get 10% off your order total” will appear on Rebel Shoes PDP only.

* **Cart Page:** `CART_PAGE` is the cart page.

* **Checkout Page:** `CHECKOUT_PAGE` is the checkout page.

Notifications accept HTML as part of the formatting. In this example, we have set content for each type. The location array can have the content message appear in more than one location.

So far, the promotion should look like the following:

```json title="Buy one get one: Example with notifications" lineNumbers
// **This is an abbreviated code sample.**
{
  "name": "Buy One Get One Free",
  "redemption_type": "AUTOMATIC",
  "rules": [
    {
      "action": {
        "gift_item": {
          "product_id": 174,
          "quantity": 1
        }
      },
      "apply_once": false,
      "stop": false,
      "condition": {
        "cart": {
          "items": {
            "products": [
              174
            ]
          },
          "minimum_quantity": 1
        }
      }
    }
  ],
  "notifications": [
    {
      "type": "UPSELL",
      "content": "Buy one Le Parfait Jar, Get One Free!",
      "locations": [
        "HOME_PAGE",
        "PRODUCT_PAGE",
        "CART_PAGE"
      ]
    },
    {
      "type": "ELIGIBLE",
      "content": "You are eligible for a free Le Parfait Jar.",
      "locations": [
        "CART_PAGE"
      ]
    },
    {
      "type": "APPLIED",
      "content": "Congratulations, you have received a free Le Parfait Jar.",
      "locations": [
        "CART_PAGE"
      ]
    }
  ]
}
```

### Finishing the promotion

**Priority**

Priority determines the order in which promotions are applied in your cart. A lower number means higher priority.

**Stop**

Stop determines if you want to calculate any other promotions after this one. Setting it to `true` means no other promotions are taken into consideration after this one is applied.

<!-- theme: warning -->
> #### Consider a stop
> Considered setting the stop if there is more than one promotion active at a time.

<!-- theme: info -->
> #### Two stops
> There are two stops. One stop in the promotion to decide if the other promotions will execute. One stop in the rule determines if different rules in the same promotion will execute.


**Max Uses**

The number of times you can use a promotion before the status changes to **DISABLED**. `max_uses` is optional; if not set, the promotion will be active until manually disabled.

**Start Date**

Time and date to start the promotion. If left blank, it will default to the current time.

**End Date**

Time and date to end the promotion.

**Status**
Status is a way to enable and disable the promotion. You can set Status by start dates, end dates, and max uses.

The following is the completed promotion for buy one, get one free.

```json title="Buy one get one: Example complete" lineNumbers
// **Completed code sample.**
{
  "name": "Buy One Get One Free",
  "redemption_type": "AUTOMATIC",
  "rules": [
    {
      "action": {
        "gift_item": {
          "product_id": 174,
          "quantity": 1
        }
      },
      "apply_once": false,
      "stop": false,
      "condition": {
        "cart": {
          "items": {
            "products": [
              174
            ]
          },
          "minimum_quantity": 1
        }
      }
    }
  ],
  "notifications": [
    {
      "type": "UPSELL",
      "content": "Buy one Le Parfait Jar, Get One Free!",
      "locations": [
        "HOME_PAGE",
        "PRODUCT_PAGE",
        "CART_PAGE"
      ]
    },
    {
      "type": "ELIGIBLE",
      "content": "You are eligible for a free Le Parfait Jar.",
      "locations": [
        "CART_PAGE"
      ]
    },
    {
      "type": "APPLIED",
      "content": "Congratulations, you have received a free Le Parfait Jar.",
      "locations": [
        "CART_PAGE"
      ]
    }
  ],
  "stop": false,
  "start_date": "2019-01-28T00:00:00+00:00",
  "status": "ENABLED"
}
```



## How to create a coupon promotion

1. To create a coupon promotion, create a promotion with the `redemption_type` as `COUPON`.
2. Send a request to the [Create a coupon code](/docs/api-beta-promotions/b3A6NDQzMTY0MDM-create-a-coupon-code) endpoint. Include `code` and `max_uses` in the request body.

```http title="Example request: Create coupon promotion"
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/promotions/{{promotion_id}}/codes
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json

{
	"code": "30off100",
	"max_uses": 100
}
```

<!-- theme: warning -->
> #### Redemption type
> Once you set the redemption_type, you can not change it through a `PUT`.

```json title="Example response: Spend $100, get $30 off" lineNumbers
{
  "name": "Get $30 off $100",
  "customer": {
    "group_ids": [],
    "minimum_order_count": 0
  },
  "rules": [
    {
      "action": {
        "cart_value": {
          "discount": {
            "fixed_amount": "30"
          }
        }
      },
      "apply_once": true,
      "stop": true,
      "condition": {
        "cart": {
          "minimum_spend": "100"
        }
      }
    }
  ],
  "notifications": [
    {
      "type": "UPSELL",
      "content": "",
      "locations": [
        "CART_PAGE"
      ]
    },
    {
      "type": "ELIGIBLE",
      "content": "",
      "locations": [
        "CART_PAGE"
      ]
    },
    {
      "type": "APPLIED",
      "content": "",
      "locations": [
        "CART_PAGE"
      ]
    }
  ],
  "stop": false,
  "currency_code": "USD",
  "current_uses": 0,
  "max_uses": 100,
  "start_date": "2019-07-26T05:00:00+00:00",
  "end_date": null,
  "status": "ENABLED",
  "redemption_type": "COUPON"
}
```


To see the list of codes attached to a promotion, send a request to the [Get coupon codes](/docs/api-beta-promotions/b3A6NDQzMTY0MDI-get-coupon-codes) endpoint. The promotion code is not available using the [Get a promotion](/docs/api-beta-promotions/b3A6NDQzMTYzOTk-get-promotion) endpoint.

```http title="Example request: Get promotion codes"
GET https://api.bigcommerce.com/stores/{{STORE_HASH}}/v3/promotions/{{promotion_id}}/codes
X-Auth-Token: {{ACCESS_TOKEN}}
Content-Type: application/json
Accept: application/json
```
&nbsp;
```json title="Example response: Get promotion codes" lineNumbers
{
  "data": [
    {
      "id": 1,
      "code": "30off100",
      "current_uses": 0,
      "max_uses": 100,
      "created": "2019-07-26T16:44:32+00:00"
    }
  ],
  "meta": {
    "pagination": {
      "total": 1,
      "count": 1,
      "per_page": 50,
      "current_page": 1,
      "total_pages": 1,
      "links": {
        "current": "?page=1&limit=50"
      }
    }
  }
}
```


## Merchant view
After you create the promotion, it will appear under **Marketing > Cart Level Discounts**. You cannot use the control panel to edit a promotion created by API. The merchant can disable, change the priority, set the stop, and delete the promotion.

![Control Panel](https://s3.amazonaws.com/user-content.stoplight.io/6012/1549390235183 "Control Panel")



## Action-only promotions

Rules do not need conditions (e.g., 10% off All Common Good Brand). Here, omit the rule and add the action part of the promotion. Condition is not necessary since the shopper does not need to take any additional actions to apply the discount.

```json title="Example request: Action-only promotion" lineNumbers
{
  "name": "10% off Fog Linen Work",
  "redemption_type": "AUTOMATIC",
  "rules": [
    {
      "action": {
        "cart_items": {
          "discount": {
             "percentage_amount": "10"
          },
          "items": {
            "brands": [
              40
            ]
          }
        }
      },
      "apply_once": true,
      "stop": false
    }
  ],
  "notifications": [
    {
      "type": "UPSELL",
      "content": "<div>&nbsp;Get 10% off All Linen Fog Work.</div>\r\n<div>&nbsp;</div>",
      "locations": [
        "HOME_PAGE",
        "PRODUCT_PAGE",
        "CART_PAGE",
        "CHECKOUT_PAGE"
      ]
    },
    {
      "type": "ELIGIBLE",
      "content": "<div>You are eligible for 10% off Linen Fog Work.</div>\r\n<div>&nbsp;</div>",
      "locations": [
        "CART_PAGE"
      ]
    },
    {
      "type": "APPLIED",
      "content": "<div>&nbsp;Congratulations! You saved 10% on Linen Fog Work.&nbsp; %</div>\r\n<div>&nbsp;</div>",
      "locations": [
        "CART_PAGE"
      ]
    }
  ],
  "stop": false,
  "max_uses": 200,
  "start_date": "2019-02-07T05:00:00+00:00",
  "end_date": "2019-02-14T04:59:59+00:00",
  "status": "ENABLED"
}
```



## Product level discount and order level discount

Order level discount only comes from [Cart Value Action](/docs/api-beta-promotions/c2NoOjIxNTcxMDI0-cart-value-action); it does not allow for you to exclude line items. Product level discounts only come from [Cart Items Action](/docs/api-beta-promotions/c2NoOjIxNTcxMDI3-cart-items-action) which excludes line items while the discounts display on individual eligible items.

### Actual discounting behavior

[Cart Value Action](/docs/api-beta-promotions/c2NoOjIxNTcxMDI0-cart-value-action) only applies to order subtotal, that is, line items in the cart, but not shipping or handling fees. When applying order level discounts, all line items in the cart receive equal amounts -- this design allows you to attribute discounts to individual line items for correct tax calculation.

Product level discounts display as discounts on each line item with a strikethrough.

![Product Level Discount Display](https://s3.amazonaws.com/user-content.stoplight.io/6012/1549392385533 "Product Level Discount Display")

Order level discounts display as a separate line item on the order.

![Order Level Discount Display](https://s3.amazonaws.com/user-content.stoplight.io/6012/1549392416779 "Order Level Discount Display")

### Weighting
Product level discounts always apply before order level discounts regardless of the execution sequence of the promotions.



## Customer-specific promotions
Use the [Customer](/docs/api-beta-promotions/c2NoOjIxNTcxMDA4-customer) property to limit the number of customers eligible for a specific promotion.

The following promotion will only apply to the customers in the VIP group (group ID 1) with a minimum total order count of 10.

```json title="Example request: 10% off with minimum order of 10 count" lineNumbers
{
  "name": "10 % Off for VIP Customers With Minimum Total Order Count of 10",
  "redemption_type": "AUTOMATIC",
  "customer": {
    "group_ids": [
      1
    ],
    "minimum_order_count": 10
  },
  "rules": [
    {
      "action": {
        "cart_value": {
          "discount": {
            "percentage_amount": "10"
          }
        }
      }
    }
  ]
}
```


## Free shipping

At the moment, we offer a free shipping action that provides an additional shipping method called “free shipping” on the storefront checkout flow. This shipping method is not the same as 100% off shipping since the shopper has a choice of shipping options, including free shipping.


## Using logical operators

Using logical operators allows you to create promotions that require a shopper to meet more than one condition before the discount applies. Customers can use logical operators to exclude brands, products, and categories from discounts.

The following two examples demonstrate the flexibility of using logical operators in promotions. Each example shows two similar cart conditions and how to fulfill each condition.

* Two items from brand X and two items from category Y
* Two items from either brand X and category Y

```javascript title="Example request: And operator" lineNumbers
{
  ...
  and: [
    {
			cart: {
				minimum_quantity: 2
				items: {
					brands: [x]
				}
			}
		},
		{
			cart: {
				minimum_quantity: 2
				items: {
					categories: [y]
				}
			}
		}
	]
}
```
&nbsp;
```json json_schema title="JSON Schema: And condition" lineNumbers
{
	Rule: {
		Condition: {
			AndCondition: [{
				CartCondition: {
					ItemMatcher: {},
					minimum_quantity
				},
				CartCondition: {
					ItemMatcher: {},
					minimum_quantity
				}
			}]
		}
	}
}
```



Two items that belong to both brand X and category Y:

```javascript title="Example request: Cart condition" lineNumbers
{
  ...
	cart: {
		minimum_quantity: 2
		items: {
			and: [
        {
					brands: [x]
				},
				{
					categories: [y]
				}
			]
		}
	}
}
```
&nbsp;
```json json_schema title="JSON Schema: And Item Matcher" lineNumbers
{
	Rule: {
		Condition: {
			CartCondition: {
			  minimum_quantity: 2,
			  ItemMatcher: {
			  	AndItemMatcher: [{
            BrandItemMatcher(SimpleItemMatcher): [],
            CategoriesItemMatcher(SimpleItemMatcher): []
          }]
			  }
			}
		}
	}
}
```

The following promotion uses [Cart Items Action > Item Matcher > Not Item Matcher > Categories Item Matcher](/docs/api-beta-promotions/c2NoOjIxNTcxMDIx-categories-item-matcher). This promotion gives all items in the cart 15% off except for items in the sale category. This promotion also does not have a condition. There is nothing the shopper needs to do to apply the discount.

```json title="Example request: 15% off except sale" lineNumbers
{
  "name": "15% off store except sale items",
  "redemption_type": "AUTOMATIC",
  "rules": [
    {
      "action": {
        "cart_items": {
          "discount": {
            "percentage_amount": "15"
          },
          "items": {
            "not": {
              "categories": [
                18
              ]
            }
          }
        }
      },
      "apply_once": true,
      "stop": true
    }
  ],
  "notifications": [
    {
      "type": "UPSELL",
      "content": "15% off store except sale",
      "locations": [
        "HOME_PAGE",
        "PRODUCT_PAGE",
        "CART_PAGE"
      ]
    },
    {
      "type": "ELIGIBLE",
      "content": "15% off store except sale",
      "locations": [
        "CART_PAGE"
      ]
    },
    {
      "type": "APPLIED",
      "content": "15% off store except sale",
      "locations": [
        "CART_PAGE"
      ]
    }
  ]
}
```


## Definitions

### Active and Inactive Promotions
If a promotion has reached its `max_uses`, the status will change to inactive, and the promotion will no longer be available to shoppers. The start and end date can also change the status of the promotion.

### Multiple Promotions
If there are multiple promotions active on a store, set the priority attribute to control the order in which the promotions apply. A higher priority means the promotion will apply first. (e.g., priority 1 promotion runs before priority 2)

### Promotion Stop
The stop attribute controls whether to skip all the promotions with lower priority than the current when the current promotion is applied successfully.

<!-- theme: warning -->
> #### Consider a stop
> If there is more than one promotion active at a time, consider setting the stop.


### Apply once
Apply once controls whether a promotion can run multiple times or just once. If you configure the promotion to repeat, we run a loop to check if a condition is satisfied, then apply action until a condition is no longer satisfied. Notice that under certain conditions/action combinations, this may result in an infinite loop that moves the promotion into “INVALID” status. This is part of the [Rule object](/docs/api-beta-promotions/c2NoOjIxNTcxMDA5-rule).


### As total
If set to `true`, the promotion is distributed among the items in the cart. For example, if the discount is $10 and two eligible items are in the cart, the discount is spread among the items. In this case, each item will get a $5 discount.

If set to `false`, then the promotion will apply to each item. For example, if the discount is $10, each item will be discounted by $10, making the total discount $20. This is part of the [Cart Items Action](/docs/api-beta-promotions/c2NoOjIxNTcxMDI3-cart-items-action).

### Include items considered by condition

If set to `false`, items that used to satisfy the condition will no longer include the discount. For example, buy one get one 20% off. If the cart only contains one item, you can not use it for the discount.

If set to `true`, the item used to satisfy the condition are included in the discount. For example, buy X get a discount. If there is only one item in the cart, you can use it to satisfy the discount.

*Buy one from category X, get one free product from the same category*:

When the cart only has one item, it will not discount the item in the cart. When the second item from the same category is added, the second item will be free. It is using the original item in the cart to satisfy the condition.

*Buy two from category X, receive $10, buy three from category X, receive $15*:

When the cart contains two items from category X, both items will get the $10 discount. This is part of the [Cart Items Action](/docs/api-beta-promotions/c2NoOjIxNTcxMDI3-cart-items-action).
