---
stoplight-id: istsa565h1igd
---

# Code Samples

The following tabs contain code samples for each type of promotion.

<!--
type: tab
title: Brand
-->

### Spend $X in brand X, get free shipping to X shipping zones
```json title="Example request" lineNumbers
{
  "name": "Order $100 of this Common Good Brand, Get Free Shipping",
  "redemption_type": "AUTOMATIC",
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
              37
            ]
          },
          "minimum_quantity": 1,
          "minimum_spend": 100
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
  "status": "ENABLED"
}
```
<br>

### Apply a $ or % discount to each item in one or more brands AND, NOT operators
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
<br>

### Spend X amount in brand Y, get X% off in brand Y
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
<br>

### Buy two items in a brand and get the cheapest one free

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

<br>

### Buy two items in a brand and get the most expensive one at 50% off
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

<br>

### Buy two items in a brand and get the most expensive one at $50 off

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
<br>

### Spend $X on brand Y, get product Z for free

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

<!--
type: tab
title: Category 
-->

### Apply a $ or % discount to each item in one or more categories

```json title="Example request" lineNumbers
{
  "name": "20 dollar off all Garden material",
  "redemption_type": "AUTOMATIC",
  "rules": [
    {
      "action": {
        "cart_items": {
          "discount": {
            "fixed_amount": "20"
          },
          "strategy": "LEAST_EXPENSIVE",
          "as_total": false,
          "include_items_considered_by_condition": false,
          "items": {
            "categories": [
              19
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
  "start_date": "2019-01-29T00:00:00+00:00",
  "status": "ENABLED"
}
```

<br>

### Apply a $ or % discount to each item in one or more categories, exclude items on sale

```json title="Example request" lineNumbers
{
  "name": "20 dollar off all Garden material, exclude items on sale",
  "redemption_type": "AUTOMATIC",
  "rules": [
    {
      "action": {
        "cart_items": {
          "discount": {
            "fixed_amount": "20"
          },
          "strategy": "LEAST_EXPENSIVE",
          "as_total": false,
          "include_items_considered_by_condition": false,
          "exclude_items_on_sale": true,
          "items": {
            "categories": [
              19
            ]
          }
        }
      },
      "apply_once": true,
      "stop": false
    }
  ]
}
```

<br>

### Buy X units in (category A), get Y additional units in the same category free (must be of equal or lesser value)

```json title="Example request" lineNumbers
{
  "name": "Buy X units in (Category A), get Y additional units in the same category free (must be of equal or l",
  "redemption_type": "AUTOMATIC",
  "rules": [
    {
      "action": {
        "cart_items": {
          "discount": {
            "percentage_amount": "100"
          },
          "strategy": "LEAST_EXPENSIVE",
          "as_total": false,
          "include_items_considered_by_condition": false,
          "items": {
            "categories": [
              23
            ]
          },
          "quantity": 1
        }
      },
      "apply_once": true,
      "stop": false,
      "condition": {
        "cart": {
          "items": {
            "categories": [
              23
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
      "content": "<div>&nbsp;</div>\r\n<div>&nbsp;</div>",
      "locations": [
        "CART_PAGE"
      ]
    },
    {
      "type": "ELIGIBLE",
      "content": "<div>&nbsp;</div>\r\n<div>&nbsp;</div>",
      "locations": [
        "CART_PAGE"
      ]
    },
    {
      "type": "APPLIED",
      "content": "<div>&nbsp;</div>\r\n<div>&nbsp;</div>",
      "locations": [
        "CART_PAGE"
      ]
    }
  ],
  "stop": false,
  "start_date": "2019-02-01T05:00:00+00:00",
  "status": "ENABLED"
}
```
<br>

### Buy three items in a category for the price of 2 (lowest priced item discounted)


```json title="Example request" lineNumbers
{
  "name": "Buy three items in a category for the price of 2 (lowest priced item discounted)",
  "redemption_type": "AUTOMATIC",
  "rules": [
    {
      "apply_once": false,
      "condition": {
        "cart": {
          "items": {
            "categories": [
              21
            ]
          },
          "minimum_quantity": 2
        }
      },
      "action": {
        "cart_items": {
          "discount": {
            "percentage_amount": "100"
          },
          "strategy": "LEAST_EXPENSIVE",
          "items": {
            "categories": [
              21
            ]
          },
          "quantity": 1
        }
      }
    }
  ]
}
```

<br>

### Buy product X or items from category Y, get $10 off items from category Z

```json title="Example request" lineNumbers
{
  "name": "Buy Product X or items from Category Y Get $10 off items from Category Z",
  "redemption_type": "AUTOMATIC",
  "rules": [
    {
      "apply_once": true,
      "condition": {
        "cart": {
          "items": {
            "or": [
              {
                "categories": [
                  1
                ]
              },
              {
                "products": [
                  1
                ]
              }
            ]
          },
          "minimum_quantity": 1
        }
      },
      "action": {
        "cart_items": {
          "discount": {
            "fixed_amount": 10
          },
          "items": {
            "categories": [
              31
            ]
          }
        }
      }
    }
  ]
}
```
<br>

### Buy 3 from category X, get 1 from category Y for free

```json title="Example request" lineNumbers
{
  "name": "Buy 3 from Category X Get 1 from Category Y for free",
  "redemption_type": "AUTOMATIC",
  "rules": [
    {
      "apply_once": false,
      "condition": {
        "cart": {
          "items": {
            "categories": [
              18
            ]
          },
          "minimum_quantity": 3
        }
      },
      "action": {
        "cart_items": {
          "discount": {
            "percentage_amount": 100
          },
          "items": {
            "categories": [
              19
            ]
          },
          "quantity": 1
        }
      }
    }
  ]
}
```
<br>

### Spend $X from category X, get product Y for free

```json title="Example request" lineNumbers
{
  "name": "Buy $X from Category X Get Product Y for free",
  "redemption_type": "AUTOMATIC",
  "rules": [
    {
      "apply_once": false,
      "condition": {
        "cart": {
          "items": {
            "categories": [
              19
            ]
          },
          "minimum_spend": 300
        }
      },
      "action": {
        "cart_items": {
          "discount": {
            "percentage_amount": 100
          },
          "items": {
            "products": [
              81
            ]
          },
          "quantity": 1
        }
      }
    }
  ]
}
```


<!--
type: tab
title: Customer 
-->

### 10% off for VIP customers

```json title="Example request" lineNumbers
{
  "name": "10% Off for VIP Customers",
  "redemption_type": "AUTOMATIC",
  "customer": {
    "group_ids": [
      1
    ]
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
<br>

### 5% off for non-VIP customers 
(including guest customers, and registered customers who not assigned to any groups, and registered customers who are assigned to a non-VIP group)

```json title="Example request" lineNumbers
{
  "name": "5% off for non-VIP customers",
  "redemption_type": "AUTOMATIC",
  "customer": {
    "excluded_group_ids": [
      1
    ]
  },
  "rules": [
    {
      "action": {
        "cart_value": {
          "discount": {
            "percentage_amount": "5"
          }
        }
      }
    }
  ]
}
```
<br>

### 3% off for guest customers or customers not assigned to any group
```json title="Example request" lineNumbers
{
  "name": "3% off for guest customers or customers not assigned to any group",
  "redemption_type": "AUTOMATIC",
  "customer": {
    "group_ids": [
      0
    ]
  },
  "rules": [
    {
      "action": {
        "cart_value": {
          "discount": {
            "percentage_amount": "3"
          }
        }
      }
    }
  ]
}
```
<br>

### 10% off for customers with total order count of 10 or more

```json title="Example request" lineNumbers
{
  "name": "10% off for customers with total order count of 10 or more",
  "redemption_type": "AUTOMATIC",
  "customer": {
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

<br>

### 10% off for customers who belong to segment 1 or segment 2

```json title="Example request" lineNumbers
{
  "name": "10% off for customers who belong to segment 1 or segment 2",
  "redemption_type": "AUTOMATIC",
  "customer": {
    "segments": {
      "id": [
        "1",
        "2"
      ]
    }
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
<br>

### 10% off for customers who do NOT belong to segment 1, including those who do not belong to any segments

```json title="Example request" lineNumbers
{
  "name": "10% off for customers who do not belong to segment 1",
  "redemption_type": "AUTOMATIC",
  "customer": {
    "segments": {
      "not": {
        "id": [
          "1"
        ]
      }
    }
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
<br>

### 10% off for customers who belong to segment 1 and also belong to segment 2
```json title="Example request" lineNumbers
{
  "name": "10% off for customers who belong to segment 1 and also belong to segment 2",
  "redemption_type": "AUTOMATIC",
  "customer": {
    "segments": {
      "and": [
        {
          "id": ["1"]
        },
        {
          "id": ["2"]
        }
      ]
    }
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

<br>

### 10% off for customers who belong to segment 3 or customers who belong to segment 1 and also belong to segment 2

```json title="Example request" lineNumbers
{
  "name": "10% off for customers who belong to segment 3 or customers who belong to segment 1 and also belong to segment 2",
  "redemption_type": "AUTOMATIC",
  "customer": {
    "segments": {
      "or": [
        {
          "id": ["3"]
        },
        {
          "and": [
            {
              "id": ["1"]
            },
            {
              "id": ["2"]
            }
          ]
        }
      ]
    }
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

<!--
type: tab
title: Logical Operator
-->

### Buy 2 of product X or buy 2 of product Y (OR operator)
The following promotion uses logical “OR” at the conditional level and it requires the shopper to have either 2 of product X or 2 of product Y in the cart to satisfy this condition.

```json title="Example request" lineNumbers
{
  "name": "Buy 2 product X OR Buy 2 product Y",
  "redemption_type": "AUTOMATIC",
  "rules": [
    {
      "condition": {
        "or": [
          {
            "cart": {
              "items": {
                "products": [
                  97
                ]
              },
              "minimum_quantity": 2
            }
          },
          {
            "cart": {
              "items": {
                "variants": [
                  12
                ]
              },
              "minimum_quantity": 2
            }
          }
        ]
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
  "start_date": "2019-02-01T05:00:00+00:00",
  "status": "ENABLED"
}
```

<br>

### Buy 2 (product X or product Y) (OR operator)

The following promotion uses logical “OR” at item matcher level, and the any of these combinations satisfy the condition:
* 1 product X + 1 product Y
* 2 product X
* 2 product Y

```json title="Example request" lineNumbers
{
  "name": "Buy 2 (product X or product Y)",
  "redemption_type": "AUTOMATIC",
  "rules": [
    {
      "condition": {
        "or": [
          {
            "products": [
              97
            ]
          },
          {
            "variants": [
              12
            ]
          }
        ],
        "minimum_quantity": 2
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
  "start_date": "2019-02-01T05:00:00+00:00",
  "status": "ENABLED"
}
```

<br>

### Get percentage off X category, excluding an item (AND, NOT operators)
```json title="Example request" lineNumbers
{
  "name": "Get 20% off all kitchen items, excluding Able Brewing System",
  "redemption_type": "AUTOMATIC",
  "rules": [
    {
      "action": {
        "cart_items": {
          "items": {
            "and": [
              {
                "categories": [
                  21
                ]
              },
              {
                "not": {
                  "products": [
                    86
                  ]
                }
              }
            ]
          },
          "discount": {
            "percentage_amount": "20"
          }
        }
      },
      "apply_once": false
    }
  ]
}
```
<br>

### Get X% off all brand X and all except X products in brand Y (OR, AND, NOT operators) 

```json title="Example request" lineNumbers
{
  "name": "Get 20% off all Coffee Makers and all but new arrivals Coffee Filters",
  "redemption_type": "AUTOMATIC",
  "rules": [
    {
      "action": {
        "cart_items": {
          "items": {
            "or": [
              {
                "and": [
                  {
                    "brands": [
                      1
                    ]
                  },
                  {
                    "categories": [
                      1
                    ]
                  }
                ]
              },
              {
                "and": [
                  {
                    "brands": [
                      2
                    ]
                  },
                  {
                    "categories": [
                      2
                    ]
                  },
                  {
                    "not": {
                      "categories": [
                        3
                      ]
                    }
                  }
                ]
              }
            ]
          },
          "discount": {
            "percentage_amount": "20"
          }
        }
      },
      "apply_once": false,
      "currency_code": "AUD",
    }
  ]
}
```

<br>

### X% off storewide except product Y or product Z or any items in category C 

```json title="Example request" lineNumbers
{
  "name": "10% off storewide except 'Able Brewing System' or 'Chemex Coffeemaker' or any garden products",
  "redemption_type": "AUTOMATIC",
  "rules": [
    {
      "action": {
        "cart_items": {
          "discount": {
            "percentage_amount": 10
          },
          "items": {
            "and": [
              {
                "not": {
                  "products": [
                    86,
                    88
                  ]
                }
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
      "apply_once": true
    }
  ]
}
```
<!--
type: tab
title: Multiple Rules
-->

### Tiered $ off order based on order value

```json title="Example request" lineNumbers
{
  "name": "Tiered $ off Order Based on Order Value",
  "redemption_type": "AUTOMATIC",
  "rules": [
    {
      "action": {
        "cart_value": {
          "discount": {
            "fixed_amount": "45"
          }
        }
      },
      "apply_once": true,
      "stop": true,
      "currency_code": "AUD",
      "condition": {
        "cart": {
          "minimum_spend": "175"
        }
      }
    },
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
          "minimum_spend": "150"
        }
      }
    },
    {
      "action": {
        "cart_value": {
          "discount": {
            "fixed_amount": "15"
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
  "start_date": "2019-02-01T05:00:00+00:00",
  "status": "ENABLED"
}
```

<br>

### Apply a tiered discount to X products based on the quantity of items ordered within X

```json title="Example request" lineNumbers
{
  "name": "Apply a tiered discount to applicable products based on the quantity of items ordered within one or ",
  "redemption_type": "AUTOMATIC",
  "rules": [
    {
      "action": {
        "cart_items": {
          "discount": {
            "fixed_amount": "20"
          },
          "strategy": "LEAST_EXPENSIVE",
          "as_total": true,
          "include_items_considered_by_condition": true,
          "items": {
            "categories": [
              23
            ]
          }
        }
      },
      "apply_once": true,
      "stop": true,
      "condition": {
        "cart": {
          "items": {
            "categories": [
              23
            ]
          },
          "minimum_quantity": 4
        }
      }
    },
    {
      "action": {
        "cart_items": {
          "discount": {
            "fixed_amount": "15"
          },
          "strategy": "LEAST_EXPENSIVE",
          "as_total": true,
          "include_items_considered_by_condition": true,
          "items": {
            "categories": [
              23
            ]
          }
        }
      },
      "apply_once": true,
      "stop": true,
      "condition": {
        "cart": {
          "items": {
            "categories": [
              23
            ]
          },
          "minimum_quantity": 3
        }
      }
    },
    {
      "action": {
        "cart_items": {
          "discount": {
            "fixed_amount": "10"
          },
          "strategy": "LEAST_EXPENSIVE",
          "as_total": true,
          "include_items_considered_by_condition": true,
          "items": {
            "categories": [
              23
            ]
          }
        }
      },
      "apply_once": true,
      "stop": true,
      "condition": {
        "cart": {
          "items": {
            "categories": [
              23
            ]
          },
          "minimum_quantity": 2
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
  "stop": true,
  "start_date": "2019-02-01T05:00:00+00:00",
  "status": "ENABLED"
}
```
<br>

### Up to 50% off store-wide (50% off category X items and 40% off everything else)

```json title="Example request" lineNumbers
{
  "name": "Up to 50% off store-wide (50% off category X items and 40% off everything else)",
  "redemption_type": "AUTOMATIC",
  "rules": [
    {
      "action": {
        "cart_items": {
          "discount": {
            "percentage_amount": 50
          },
          "items": {
            "categories": [
              19
            ]
          }
        }
      },
      "apply_once": true
    },
    {
      "action": {
        "cart_items": {
          "discount": {
            "percentage_amount": 40
          },
          "items": {
            "not": {
              "categories": [
                19
              ]
            }
          }
        }
      },
      "apply_once": true
    }
  ]
}
```
<br>

## Buy X products get free shipping and 10% off order

```json title="Example request" lineNumbers
{
  "name": "Buy two of Product X get free shipping to all zones and 10% off order",
  "redemption_type": "AUTOMATIC",
  "rules": [
    {
      "condition": {
        "cart": {
          "items": {
            "products": [
              100
            ]
          },
          "minimum_quantity": 2
        }
      },
      "action": {
        "shipping": {
          "free_shipping": true,
          "zone_ids": "*"
        }
      }
    },
    {
      "condition": {
        "cart": {
          "items": {
            "products": [
              100
            ]
          },
          "minimum_quantity": 2
        }
      },
      "action": {
        "cart_value": {
          "discount": {
            "percentage_amount": 10
          }
        }
      }
    }
  ]
}
```

<!--
type: tab
title: Order
-->

### X$ off when you purchase 2 of X product or 1 of X product OR operator

```json title="Example request" lineNumbers
{
  "name": "50$ Off when you buy 2 Tiered Wire Baskets or a Small Purple Towel",
  "redemption_type": "AUTOMATIC",
  "rules": [
    {
      "condition": {
        "or": [
          {
            "cart": {
              "items": {
                "products": [
                  97
                ]
              },
              "minimum_quantity": 2
            }
          },
          {
            "cart": {
              "items": {
                "variants": [
                  12
                ]
              },
              "minimum_quantity": 1
            }
          }
        ]
      },
      "action": {
        "cart_value": {
          "discount": {
            "fixed_amount": "50"
          }
        }
      },
      "apply_once": true
    }
  ]
}
```
<br>

### Spend X$ get X$ off order

```json title="Example request" lineNumbers
{
  "name": "Spend X$ Get X$ Off Order",
  "redemption_type": "AUTOMATIC",
  "rules": [
    {
      "action": {
        "cart_value": {
          "discount": {
            "fixed_amount": "20"
          }
        }
      },
      "apply_once": true,
      "stop": true,
      "condition": {
        "cart": {
          "minimum_spend": "200"
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
  "currency_code": "USD",
  "status": "ENABLED"
}
```
<br>

### Order at least $X get X item free


```json title="Example request" lineNumbers
{
  "name": "Order at Least $X Get X Item Free",
  "redemption_type": "AUTOMATIC",
  "rules": [
    {
      "action": {
        "gift_item": {
          "product_id": 175,
          "quantity": 1
        }
      },
      "apply_once": true,
      "stop": false,
      "currency_code": "AUD",
      "condition": {
        "cart": {
          "minimum_spend": "200"
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

<br>

###  Take X% off items storewide except for X category NOT operator

```json title="Example request" lineNumbers
{
  "name": "15% off store except sale",
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
                40
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

<!--
type: tab
title: Product 
-->

### Buy one get one free

```json title="Example request" lineNumbers
{
  "name": "Buy One Get One Free",
  "redemption_type": "AUTOMATIC",
  "rules": [
    {
      "action": {
        "gift_item": {
          "product_id": 81,
          "quantity": 1
        }
      },
      "apply_once": false,
      "stop": false,
      "currency_code": "AUD",
      "condition": {
        "cart": {
          "items": {
            "products": [
              81
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
  "status": "ENABLED",
  "start_date": "2019-02-06T05:00:00+00:00",
  "end_date": "2019-02-09T04:59:59+00:00"
}
```

<br>


### Buy (X units) of product A, get (Y units) of product B for $ or % off per unit

```json title="Example request" lineNumbers
{
  "name": "Buy 2 X get 10% off Y",
  "redemption_type": "AUTOMATIC",
  "rules": [
    {
      "action": {
        "cart_items": {
          "discount": {
            "percentage_amount": "10"
          },
          "strategy": "LEAST_EXPENSIVE",
          "as_total": false,
          "include_items_considered_by_condition": false,
          "items": {
            "products": [
              81
            ]
          },
          "quantity": 1
        }
      },
      "apply_once": false,
      "stop": false,
      "condition": {
        "cart": {
          "items": {
            "products": [
              80
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
  "status": "ENABLED"
}
```

<br>

### Get $ or % off product X

```json title="Example request" lineNumbers
{
  "name": "Spend 100 dollar and get 10% off small orbit",
  "redemption_type": "AUTOMATIC",
  "rules": [
    {
      "action": {
        "cart_items": {
          "discount": {
            "percentage_amount": "10"
          },
          "strategy": "LEAST_EXPENSIVE",
          "as_total": false,
          "include_items_considered_by_condition": false,
          "items": {
            "products": [
              81
            ]
          },
          "quantity": 1
        }
      },
      "apply_once": true,
      "stop": false,
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
  "status": "ENABLED"
}
```
<br>

### Take X% off the most expensive item in the cart


```json title="Example request" lineNumbers
{
  "name": "Apply 20% off Most Expensive Cart Item",
  "redemption_type": "AUTOMATIC",
  "rules": [
    {
      "action": {
        "cart_items": {
          "discount": {
            "percentage_amount": "20"
          },
          "quantity": 1,
          "strategy": "MOST_EXPENSIVE",
          "as_total": false
        }
      },
      "apply_once": true,
      "stop": false
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
  "current_uses": 0,
  "max_uses": null,
  "start_date": "2019-01-31T05:00:00+00:00",
  "end_date": null,
  "status": "ENABLED"
}
```
<br>

### Buy X product variant and get X product variant free

```json title="Example request" lineNumbers
{
  "name": "Buy X Product Variant and Get X Product Variant Free",
  "redemption_type": "AUTOMATIC",
  "rules": [
    {
      "action": {
        "gift_item": {
          "variant_id": 471,
          "quantity": 1
        }
      },
      "apply_once": false,
      "stop": false,
      "currency_code": "GBP",
      "condition": {
        "cart": {
          "items": {
            "variants": [
              421
            ]
          },
          "minimum_quantity": 2
        }
      }
    }
  ],
  "notifications": [
    {
      "type": "UPSELL",
      "content": "<div>&nbsp;</div>\r\n<div>&nbsp;</div>",
      "locations": [
        "CART_PAGE"
      ]
    },
    {
      "type": "ELIGIBLE",
      "content": "<div>&nbsp;</div>\r\n<div>&nbsp;</div>",
      "locations": [
        "CART_PAGE"
      ]
    },
    {
      "type": "APPLIED",
      "content": "<div>&nbsp;</div>\r\n<div>&nbsp;</div>",
      "locations": [
        "CART_PAGE"
      ]
    }
  ],
  "stop": false,
  "status": "ENABLED"
}
```
<br>

### Amount off

```json title="Example request" lineNumbers
{
  "name": "US $50 off a specific product",
  "redemption_type": "AUTOMATIC",
  "currency_code": "USD",
  "rules": [
    {
      "apply_once": false,
      "condition": {
        "cart": {
          "items": {
            "products": [
              111
            ]
          },
          "minimum_quantity": 1
        }
      },
      "action": {
        "cart_items": {
          "discount": {
            "fixed_amount": "50"
          },
          "items": {
            "products": [
              111
            ]
          },
          "quantity": 1,
          "include_items_considered_by_condition": true
        }
      }
    }
  ]
}
```

<br>

### Percentage off

```json title="Example request" lineNumbers
{
  "name": "US 15% off a specific product",
  "redemption_type": "AUTOMATIC",
  "rules": [
    {
      "apply_once": false,
      "condition": {
        "cart": {
          "items": {
            "products": [
              111
            ]
          },
          "minimum_quantity": 1
        }
      },
      "action": {
        "cart_items": {
          "discount": {
            "percentage_amount": "75"
          },
          "items": {
            "products": [
              111
            ]
          },
          "quantity": 1,
          "include_items_considered_by_condition": true
        }
      }
    }
  ]
}
```

<br>

### Buy three for the price of two

```json title="Example request" lineNumbers
{
  "name": "Buy 3 for the price of 2",
  "redemption_type": "AUTOMATIC",
  "rules": [
    {
      "apply_once": false,
      "condition": {
        "cart": {
          "items": {
            "products": [
              111
            ]
          },
          "minimum_quantity": 2
        }
      },
      "action": {
        "cart_items": {
          "discount": {
            "percentage_amount": "100"
          },
          "items": {
            "products": [
              111
            ]
          },
          "quantity": 1
        }
      }
    }
  ]
}
```

<br>

### Buy extra-small or medium item and get free shipping to zone id 1 (Product Options Item Matcher)

```json title="Example request" lineNumbers
{
  "name": "Buy extra-small or medium item and get free shipping to zone id 1",
  "redemption_type": "AUTOMATIC",
  "rules": [
    {
      "condition":{
        "cart":{
          "items": {
            "product_option": {
              "type": "string_match",
              "name": "Size",
              "values": [
                "XS",
                "M"
              ]
            }
          },
          "minimum_quantity": 1
        }
      },
      "action":{
        "shipping":{
          "free_shipping":true,
          "zone_ids":[
            1
          ]
        }
      }
    }
  ]
}
```

<br>

### Buy extra-small blue or medium blue item and receive free shipping (Product Options Item Matcher)

```json title="Example request" lineNumbers
{
  "name": "Buy extra-small blue or medium blue item and receive free shipping",
  "redemption_type": "AUTOMATIC",
  "rules": [
    {
      "condition": {
        "cart": {
          "items": {
            "and": [
              {
                "product_option": {
                  "type": "string_match",
                  "name": "Size",
                  "values": [
                    "XS",
                    "M"
                  ]
                }
              },
              {
                "product_option": {
                  "type": "string_match",
                  "name": "Color",
                  "values": [
                    "Blue"
                  ]
                }
              }
            ]
          },
          "minimum_quantity": 1
        }
      },
      "action": {
        "shipping": {
          "free_shipping": true,
          "zone_ids": [
            1
          ]
        }
      }
    }
  ]
}
```

<!--
type: tab
title: Shipping
-->

### Buy two of X and buy two of Y get free shipping to all zones start/end times AND operator 

```json title="Example request" lineNumbers
{
  "name": "Buy two of X and Buy two of Y get free shipping to all zones",
  "redemption_type": "AUTOMATIC",
  "rules": [
    {
      "action": {
        "shipping": {
          "free_shipping": true,
          "zone_ids": "*"
        }
      },
      "apply_once": true,
      "stop": false,
      "currency_code": "AUD",
      "condition": {
        "and": [
          {
            "cart": {
              "items": {
                "products": [
                  97
                ]
              },
              "minimum_quantity": 2
            }
          },
          {
            "cart": {
              "items": {
                "variants": [
                  12
                ]
              },
              "minimum_quantity": 2
            }
          }
        ]
      }
    }
  ],
  "notifications": [],
  "stop": false,
  "status": "ENABLED",
  "start_date": "2019-02-06T05:00:00+00:00",
  "end_date": "2019-02-09T04:59:59+00:00"
}
```

<br>

### Order at least $X, get free shipping to specific shipping zones

```json title="Example request" lineNumbers
{
  "name": "Order at least X units of product Y, get free shipping to specific shipping zones",
  "redemption_type": "AUTOMATIC",
  "rules": [
    {
      "action": {
        "shipping": {
          "free_shipping": true,
          "zone_ids": [
            2,
            3
          ]
        }
      },
      "apply_once": true,
      "stop": false,
      "condition": {
        "cart": {
          "items": {
            "products": [
              163
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
      "content": "Get free shipping for purchasing Twine Stand with Cutter. Limited to first 50 customers!\r\n<div>&nbsp;</div>",
      "locations": [
        "HOME_PAGE",
        "PRODUCT_PAGE",
        "CART_PAGE",
        "CHECKOUT_PAGE"
      ]
    },
    {
      "type": "ELIGIBLE",
      "content": "You are eligible for free shipping.\r\n<div>&nbsp;</div>",
      "locations": [
        "CART_PAGE"
      ]
    },
    {
      "type": "APPLIED",
      "content": "Congratulations you get free shipping!\r\n<div>&nbsp;</div>",
      "locations": [
        "CART_PAGE"
      ]
    }
  ],
  "stop": false,
  "max_uses": 50,
  "start_date": "2019-02-01T05:00:00+00:00",
  "end_date": "2019-02-05T04:59:59+00:00",
  "status": "ENABLED"
}
```
<br>

### Order at least 2X of product get free shipping

```json title="Example request" lineNumbers
{
  "name": "Order At Least 2X of Product Get Free Shipping",
  "redemption_type": "AUTOMATIC",
  "rules": [
    {
      "action": {
        "shipping": {
          "free_shipping": true,
          "zone_ids": "*"
        }
      },
      "apply_once": true,
      "stop": false,
      "condition": {
        "cart": {
          "items": {
            "products": [
              175
            ]
          },
          "minimum_quantity": 2
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
  "status": "ENABLED",
  "start_date": "2019-02-06T05:00:00+00:00",
  "end_date": "2019-02-09T04:59:59+00:00"
}
```

<!--
type: tab
title: Storewide
-->

### 10% off storewide excluding three brands

```json title="Example request" lineNumbers
{
  "name": "10% off storewide except (NOT) 'Huggies', 'Munchkin' and 'Pampers' brand products",
  "redemption_type": "AUTOMATIC",
  "rules": [
    {
      "action": {
        "cart_items": {
          "discount": {
            "percentage_amount": "10"
          },
          "items": {
            "not": {
              "brands": [
                35,
                36,
                37
              ]
            }
          }
        }
      },
      "apply_once": true
    }
  ]
}
```
<!-- type: tab-end -->