---
stoplight-id: 99f73cbf2d625
---

# Promotion Code Samples

## Brand

<details>  
    <summary>Spend $X in brand X, get free shipping to X shipping zones</summary>

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
