---
stoplight-id: 99f73cbf2d625
---

# Promotion Code Samples

## Brand



<details>  
    <summary>Spend $X in brand X, get free shipping to X shipping zones</summary>

<br>

 <!--
type: tab
title: Try It
-->


```json http
{
  "method": "POST",
  "url": "https://api.bigcommerce.com/stores/{store_hash}/v3/promotions",
  "headers": {
    "Content-Type": "application/json",
    "X-Auth-Token": ""
  },
  "body": {
  "name": "Apply a $ or % discount to each item in one or more brands",
  "redemption_type": "AUTOMATIC",
  "rules": [
    {
      "action": {
        "cart_items": {
          "discount": {
            "percentage_amount": "15"
          },
          "strategy": "LEAST_EXPENSIVE",
          "as_total": false,
          "include_items_considered_by_condition": false,
          "items": {
            "and": [
              {
                "brands": [
                  41,
                  44,
                  37,
                  45
                ]
              },
              {
                "not": {
                  "categories": [
                    19
                  ]
                }
              }
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
      "content": "Get 15% off in Common Good, Chemex, Barr-Co and Kinfolk.\r\n<div>&nbsp;</div>",
      "locations": [
        "HOME_PAGE",
        "PRODUCT_PAGE",
        "CART_PAGE"
      ]
    },
    {
      "type": "ELIGIBLE",
      "content": "You are eligible for 15% off!\r\n<div>&nbsp;</div>",
      "locations": [
        "CART_PAGE"
      ]
    },
    {
      "type": "APPLIED",
      "content": "Congratulations you have earned 15% off.",
      "locations": [
        "CART_PAGE"
      ]
    }
  ],
  "stop": false,
  "status": "ENABLED"
}
}
```

<br>

 <!--
type: tab
title: Req
-->

```json title="Example request" lineNumbers
{
  "name": "Apply a $ or % discount to each item in one or more brands",
  "redemption_type": "AUTOMATIC",
  "rules": [
    {
      "action": {
        "cart_items": {
          "discount": {
            "percentage_amount": "15"
          },
          "strategy": "LEAST_EXPENSIVE",
          "as_total": false,
          "include_items_considered_by_condition": false,
          "items": {
            "and": [
              {
                "brands": [
                  41,
                  44,
                  37,
                  45
                ]
              },
              {
                "not": {
                  "categories": [
                    19
                  ]
                }
              }
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
      "content": "Get 15% off in Common Good, Chemex, Barr-Co and Kinfolk.\r\n<div>&nbsp;</div>",
      "locations": [
        "HOME_PAGE",
        "PRODUCT_PAGE",
        "CART_PAGE"
      ]
    },
    {
      "type": "ELIGIBLE",
      "content": "You are eligible for 15% off!\r\n<div>&nbsp;</div>",
      "locations": [
        "CART_PAGE"
      ]
    },
    {
      "type": "APPLIED",
      "content": "Congratulations you have earned 15% off.",
      "locations": [
        "CART_PAGE"
      ]
    }
  ],
  "stop": false,
  "status": "ENABLED"
}
```
 <!--
type: tab
title: Res
-->

```json title="Example res" lineNumbers
{
    "data": {
        "id": 3,
        "name": "Order $100 of this common good brand, get free shipping",
        "created_from": "api",
        "customer": {
            "group_ids": [],
            "minimum_order_count": 0,
            "excluded_group_ids": [],
            "segments": null
        },
        "rules": [
            {
                "action": {
                    "shipping": {
                        "free_shipping": true,
                        "zone_ids": [
                            1,
                            3
                        ]
                    }
                },
                "apply_once": true,
                "stop": false,
                "condition": {
                    "cart": {
                        "items": {
                            "brands": [
                                38
                            ]
                        },
                        "minimum_spend": "100",
                        "minimum_quantity": 1
                    }
                }
            }
        ],
        "notifications": [
            {
                "type": "UPSELL",
                "content": "Get Free Shipping for Common Good Upsell",
                "locations": [
                    "CART_PAGE"
                ]
            },
            {
                "type": "ELIGIBLE",
                "content": "On the Cart Page, Eligible",
                "locations": [
                    "CART_PAGE"
                ]
            },
            {
                "type": "APPLIED",
                "content": "Applied Cart Page",
                "locations": [
                    "CART_PAGE"
                ]
            }
        ],
        "stop": false,
        "currency_code": "USD",
        "redemption_type": "AUTOMATIC",
        "shipping_address": null,
        "current_uses": 0,
        "max_uses": null,
        "start_date": "2022-07-15T16:21:23+00:00",
        "end_date": null,
        "status": "ENABLED",
        "schedule": null,
        "can_be_used_with_other_promotions": true
    },
    "meta": {}
}
```

<!-- 
type: tab-end
-->

</details>



### Apply a $ or % discount to each item in one or more brands AND, NOT operators

<details>  
  <summary>Expand code sample</summary>

<br>

```json title="Example request" lineNumbers
{
  "name": "Apply a $ or % discount to each item in one or more brands",
  "redemption_type": "AUTOMATIC",
  "rules": [
    {
      "action": {
        "cart_items": {
          "discount": {
            "percentage_amount": "15"
          },
          "strategy": "LEAST_EXPENSIVE",
          "as_total": false,
          "include_items_considered_by_condition": false,
          "items": {
            "and": [
              {
                "brands": [
                  41,
                  44,
                  37,
                  45
                ]
              },
              {
                "not": {
                  "categories": [
                    19
                  ]
                }
              }
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
      "content": "Get 15% off in Common Good, Chemex, Barr-Co and Kinfolk.\r\n<div>&nbsp;</div>",
      "locations": [
        "HOME_PAGE",
        "PRODUCT_PAGE",
        "CART_PAGE"
      ]
    },
    {
      "type": "ELIGIBLE",
      "content": "You are eligible for 15% off!\r\n<div>&nbsp;</div>",
      "locations": [
        "CART_PAGE"
      ]
    },
    {
      "type": "APPLIED",
      "content": "Congratulations you have earned 15% off.",
      "locations": [
        "CART_PAGE"
      ]
    }
  ],
  "stop": false,
  "status": "ENABLED"
}
```

</details>



### Spend X amount in brand Y, get X% off in brand Y

<details>  
  <summary>Expand code sample</summary>
<br>

```json title="Example request" lineNumbers
{
  "name": "Spend X Amount in Brand Y, Get X% Off in Brand Y",
  "redemption_type": "AUTOMATIC",
  "rules": [
    {
      "action": {
        "cart_items": {
          "discount": {
            "percentage_amount": "10"
          },
          "strategy": "LEAST_EXPENSIVE",
          "as_total": true,
          "include_items_considered_by_condition": true,
          "items": {
            "brands": [
              36
            ]
          }
        }
      },
      "apply_once": true,
      "stop": false,
      "condition": {
        "cart": {
          "items": {
            "brands": [
              36
            ]
          },
          "minimum_spend": "200",
          "minimum_quantity": 1
        }
      }
    }
  ],
  "notifications": [
    {
      "type": "UPSELL",
      "content": "<div>&nbsp;</div>",
      "locations": [
        "CART_PAGE"
      ]
    },
    {
      "type": "ELIGIBLE",
      "content": "<div>&nbsp;</div>",
      "locations": [
        "CART_PAGE"
      ]
    },
    {
      "type": "APPLIED",
      "content": "<div>&nbsp;</div>",
      "locations": [
        "CART_PAGE"
      ]
    }
  ],
  "stop": false,
  "status": "ENABLED"
}
```

</details>

### Buy two items in a brand and get the cheapest one free


<details>  
  <summary>Expand code sample</summary>

<br>

```json title="Example request" lineNumbers
{
  "name": "Buy two items in brand and get the cheapest one free",
  "redemption_type": "AUTOMATIC",
  "rules": [
    {
      "apply_once": false,
      "condition": {
        "cart": {
          "items": {
            "brands": [
              36
            ]
          },
          "minimum_quantity": 2
        }
      },
      "action": {
        "cart_items": {
          "strategy": "LEAST_EXPENSIVE",
          "include_items_considered_by_condition": true,
          "discount": {
            "percentage_amount": "100"
          },
          "items": {
            "brands": [
              36
            ]
          },
          "quantity": 1
        }
      }
    }
  ]
}
```

</details>

### Buy two items in a brand and get the most expensive one at 50% off

<details>  
  <summary>Expand code sample</summary>

<br>

```json title="Example request" lineNumbers
{
  "name": "Buy two items in brand and get the most expensive one at 50% off",
  "redemption_type": "AUTOMATIC",
  "rules": [
    {
      "apply_once": false,
      "condition": {
        "cart": {
          "items": {
            "brands": [
              36
            ]
          },
          "minimum_quantity": 2
        }
      },
      "action": {
        "cart_items": {
          "strategy": "MOST_EXPENSIVE",
          "include_items_considered_by_condition": true,
          "discount": {
            "percentage_amount": "50"
          },
          "items": {
            "brands": [
              36
            ]
          },
          "quantity": 1
        }
      }
    }
  ]
}
```

</details>

### Buy two items in a brand and get the most expensive one at $50 off

<details>  
  <summary>Expand code sample</summary>

<br>

```json title="Example request" lineNumbers
{
  "name": "Buy two items in brand and get the most expensive one at $50 off",
  "redemption_type": "AUTOMATIC",
  "rules": [
    {
      "apply_once": false,
      "condition": {
        "cart": {
          "items": {
            "brands": [
              36
            ]
          },
          "minimum_quantity": 2
        }
      },
      "action": {
        "cart_items": {
          "strategy": "MOST_EXPENSIVE",
          "include_items_considered_by_condition": true,
          "discount": {
            "fixed_amount": "50"
          },
          "items": {
            "brands": [
              36
            ]
          },
          "quantity": 1
        }
      }
    }
  ]
}
```

</details>

### Spend $X on brand Y, get product Z for free

<details>  
  <summary>Expand code sample</summary>

<br>

```json title="Example request" lineNumbers
{
  "name": "Spend $X on brand Y, get product Z for free",
  "redemption_type": "AUTOMATIC",
  "rules": [
    {
      "apply_once": false,
      "condition": {
        "cart": {
          "items": {
            "brands": [
              36
            ]
          },
          "minimum_spend": 200
        }
      },
      "action": {
        "gift_item": {
          "product_id": 107,
          "quantity": 1
        }
      }
    }
  ]
}
```

</details>

## Category
