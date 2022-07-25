# Promotion Code Samples

## Brand

<details>
  <summary>Spend $X in brand X, get free shipping to X shipping zones</summary> 


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
  "name": "Order $100 of this common good brand, get free shipping",
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
}
```

<!--
type: tab
title: Request
-->

```json title="Example request" lineNumbers
{
  "name": "Order $100 of this common good brand, get free shipping",
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
<!--
type: tab
title: Response
-->

```json title="Example response" lineNumbers
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
                                37
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
        "start_date": "2022-07-15T19:59:00+00:00",
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


<details>
  <summary>Apply a $ or % discount to each item in one or more brands AND, NOT operators</summary> <br>

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
                  38,
                  37,
                  36,
                  35
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

<!--
type: tab
title: Request
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
                  38,
                  37,
                  36,
                  35
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
title: Response
-->

```json title="Example response" lineNumbers
{
    "data": {
        "id": 4,
        "name": "Apply a $ or % discount to each item in one or more brands",
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
                    "cart_items": {
                        "discount": {
                            "percentage_amount": "15"
                        },
                        "strategy": "LEAST_EXPENSIVE",
                        "add_free_item": true,
                        "as_total": false,
                        "include_items_considered_by_condition": false,
                        "exclude_items_on_sale": false,
                        "items": {
                            "and": [
                                {
                                    "brands": [
                                        38,
                                        37,
                                        36,
                                        35
                                    ]
                                },
                                {
                                    "not": {
                                        "categories": [
                                            36
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
        "currency_code": "USD",
        "redemption_type": "AUTOMATIC",
        "shipping_address": null,
        "current_uses": 0,
        "max_uses": null,
        "start_date": "2022-07-15T20:16:53+00:00",
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

<details>  
  <summary>Spend X amount in brand Y, get X% off in brand Y
  </summary>


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
  "name": "Spend X amount in brand Y, get X% off in brand Y",
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
}
```


<!--
type: tab
title: Request
-->

```json title="Example request" lineNumbers
{
  "name": "Spend X amount in brand Y, get X% off in brand Y",
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

<!--
type: tab
title: Response
-->

```json title="Example response" lineNumbers
{
    "data": {
        "id": 5,
        "name": "Spend X amount in brand Y, get X% off in brand Y",
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
                    "cart_items": {
                        "discount": {
                            "percentage_amount": "10"
                        },
                        "strategy": "LEAST_EXPENSIVE",
                        "add_free_item": true,
                        "as_total": true,
                        "include_items_considered_by_condition": true,
                        "exclude_items_on_sale": false,
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
        "currency_code": "USD",
        "redemption_type": "AUTOMATIC",
        "shipping_address": null,
        "current_uses": 0,
        "max_uses": null,
        "start_date": "2022-07-15T20:26:29+00:00",
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

<details>  
  <summary>Buy two items in a brand and get the cheapest one free</summary>

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
}
```

<!--
type: tab
title: Request
-->

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

<!--
type: tab
title: Response
-->

```json title="Example response" lineNumbers
{
    "data": {
        "id": 6,
        "name": "Buy two items in brand and get the cheapest one free",
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
                    "cart_items": {
                        "discount": {
                            "percentage_amount": "100"
                        },
                        "strategy": "LEAST_EXPENSIVE",
                        "add_free_item": true,
                        "as_total": false,
                        "include_items_considered_by_condition": true,
                        "exclude_items_on_sale": false,
                        "items": {
                            "brands": [
                                36
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
                            "brands": [
                                36
                            ]
                        },
                        "minimum_quantity": 2
                    }
                }
            }
        ],
        "notifications": [],
        "stop": false,
        "currency_code": "USD",
        "redemption_type": "AUTOMATIC",
        "shipping_address": null,
        "current_uses": 0,
        "max_uses": null,
        "start_date": "2022-07-15T20:37:29+00:00",
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

<details>  
  <summary>Buy two items in a brand and get the most expensive one at 50% off</summary>


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
}
```

<!--
type: tab
title: Request
-->

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

<!--
type: tab
title: Response
-->

```json title="Example response" lineNumbers
{
    "data": {
        "id": 7,
        "name": "Buy two items in brand and get the most expensive one at 50% off",
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
                    "cart_items": {
                        "discount": {
                            "percentage_amount": "50"
                        },
                        "strategy": "MOST_EXPENSIVE",
                        "add_free_item": true,
                        "as_total": false,
                        "include_items_considered_by_condition": true,
                        "exclude_items_on_sale": false,
                        "items": {
                            "brands": [
                                36
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
                            "brands": [
                                36
                            ]
                        },
                        "minimum_quantity": 2
                    }
                }
            }
        ],
        "notifications": [],
        "stop": false,
        "currency_code": "USD",
        "redemption_type": "AUTOMATIC",
        "shipping_address": null,
        "current_uses": 0,
        "max_uses": null,
        "start_date": "2022-07-15T20:43:34+00:00",
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

<details>  
  <summary>Buy two items in a brand and get the most expensive one at $50 off</summary>

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
}
```

<!--
type: tab
title: Request
-->

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

<!--
type: tab
title: Response
-->

```json title="Example response" lineNumbers
{
    "data": {
        "id": 8,
        "name": "Buy two items in brand and get the most expensive one at $50 off",
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
                    "cart_items": {
                        "discount": {
                            "fixed_amount": "50"
                        },
                        "strategy": "MOST_EXPENSIVE",
                        "add_free_item": true,
                        "as_total": false,
                        "include_items_considered_by_condition": true,
                        "exclude_items_on_sale": false,
                        "items": {
                            "brands": [
                                36
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
                            "brands": [
                                36
                            ]
                        },
                        "minimum_quantity": 2
                    }
                }
            }
        ],
        "notifications": [],
        "stop": false,
        "currency_code": "USD",
        "redemption_type": "AUTOMATIC",
        "shipping_address": null,
        "current_uses": 0,
        "max_uses": null,
        "start_date": "2022-07-15T21:01:36+00:00",
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


<details>  
  <summary>Spend $X on brand Y, get product Z for free</summary>

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
    "X-Auth-Token": ""},
  "body": {
  "name": "Spend $X on brand Y, get product Z for free",
  "redemption_type": "AUTOMATIC",
  "rules": [
    {
      "apply_once": false,
      "condition": {
        "cart": {
          "items": {
            "brands": [
              38
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
}
```
<!--
type: tab
title: Request
-->

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
              38
            ]
          },
          "minimum_spend": 200
        }
      },
      "action": {
        "gift_item": {
          "product_id": 130,
          "quantity": 1
        }
      }
    }
  ]
}
```

<!--
type: tab
title: Response
-->

```json title="Example response" lineNumbers
{
    "data": {
        "id": 9,
        "name": "Spend $X on brand Y, get product Z for free",
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
                    "gift_item": {
                        "quantity": 1,
                        "product_id": 130
                    }
                },
                "apply_once": false,
                "stop": false,
                "condition": {
                    "cart": {
                        "items": {
                            "brands": [
                                38
                            ]
                        },
                        "minimum_spend": "10"
                    }
                }
            }
        ],
        "notifications": [],
        "stop": false,
        "currency_code": "USD",
        "redemption_type": "AUTOMATIC",
        "shipping_address": null,
        "current_uses": 0,
        "max_uses": null,
        "start_date": "2022-07-15T21:15:28+00:00",
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

## Category

<details>
  <summary>Apply a $ or % discount to each item in one or more categories</summary>

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
    "X-Auth-Token": ""},
  "body": {
  "name": "20 dollars off all garden material",
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
              24
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
}
```

<!--
type: tab
title: Request
-->

```json title="Example request" lineNumbers
{
  "name": "20 dollars off all garden material",
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
              24
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
<!--
type: tab
title: Response
-->

```json title="Example response" lineNumbers
{
    "data": {
        "id": 10,
        "name": "20 dollar off all garden material",
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
                    "cart_items": {
                        "discount": {
                            "fixed_amount": "20"
                        },
                        "strategy": "LEAST_EXPENSIVE",
                        "add_free_item": true,
                        "as_total": false,
                        "include_items_considered_by_condition": false,
                        "exclude_items_on_sale": false,
                        "items": {
                            "categories": [
                                24
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
        "currency_code": "USD",
        "redemption_type": "AUTOMATIC",
        "shipping_address": null,
        "current_uses": 0,
        "max_uses": null,
        "start_date": "2019-01-29T00:00:00+00:00",
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



<details>
  <summary>Apply a $ or % discount to each item in one or more categories, exclude items on sale</summary>

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
  "name": "20 dollars off all garden material, exclude items on sale",
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
}
```

<!--
type: tab
title: Request
-->

```json title="Example request" lineNumbers
{
 "name": "20 dollars off all garden material, exclude items on sale",
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
<!--
type: tab
title: Response
-->

```json title="Example response" lineNumbers
{
    "data": {
        "id": 11,
        "name": "20 dollars off all garden material, exclude items on sale",
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
                    "cart_items": {
                        "discount": {
                            "fixed_amount": "5"
                        },
                        "strategy": "LEAST_EXPENSIVE",
                        "add_free_item": true,
                        "as_total": false,
                        "include_items_considered_by_condition": false,
                        "exclude_items_on_sale": true,
                        "items": {
                            "categories": [
                                36
                            ]
                        }
                    }
                },
                "apply_once": true,
                "stop": false
            }
        ],
        "notifications": [],
        "stop": false,
        "currency_code": "USD",
        "redemption_type": "AUTOMATIC",
        "shipping_address": null,
        "current_uses": 0,
        "max_uses": null,
        "start_date": "2022-07-18T18:43:58+00:00",
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

<details>  
  <summary>Buy X units in (category A), get Y additional units in the same category free (must be of equal or lesser value)</summary>


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
  "name": "Buy X units in (Category A), get Y additional units in the same category free (must be of equal or lesser value)",
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
}
```

<!--
type: tab
title: Request
-->

```json title="Example request" lineNumbers
{
  "name": "Buy X units in (Category A), get Y additional units in the same category free (must be of equal or lesser value)",
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

<!--
type: tab
title: Response
-->

```json title="Example response" lineNumbers
{
    "data": {
        "id": 12,
        "name": "Buy X units in (Category A), get Y additional units in the same category free (must be of equal or l",
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
                    "cart_items": {
                        "discount": {
                            "percentage_amount": "100"
                        },
                        "strategy": "LEAST_EXPENSIVE",
                        "add_free_item": true,
                        "as_total": false,
                        "include_items_considered_by_condition": false,
                        "exclude_items_on_sale": false,
                        "items": {
                            "categories": [
                                36
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
                                36
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
        "currency_code": "USD",
        "redemption_type": "AUTOMATIC",
        "shipping_address": null,
        "current_uses": 0,
        "max_uses": null,
        "start_date": "2019-02-01T05:00:00+00:00",
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

<details>  
  <summary>Buy three items in a category for the price of two (lowest priced item discounted)</summary>


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
  "name": "Buy three items in a category for the price of two (lowest priced item discounted)",
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
}
```


<!--
type: tab
title: Request
-->

```json title="Example request" lineNumbers
{
  "name": "Buy three items in a category for the price of two (lowest priced item discounted)",
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

<!--
type: tab
title: Response
-->

```json title="Example response" lineNumbers
{
    "data": {
        "id": 13,
        "name": "Buy three items in a category for the price of 2 (lowest priced item discounted)",
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
                    "cart_items": {
                        "discount": {
                            "percentage_amount": "100"
                        },
                        "strategy": "LEAST_EXPENSIVE",
                        "add_free_item": true,
                        "as_total": false,
                        "include_items_considered_by_condition": false,
                        "exclude_items_on_sale": false,
                        "items": {
                            "categories": [
                                36
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
                            "categories": [
                                36
                            ]
                        },
                        "minimum_quantity": 2
                    }
                }
            }
        ],
        "notifications": [],
        "stop": false,
        "currency_code": "USD",
        "redemption_type": "AUTOMATIC",
        "shipping_address": null,
        "current_uses": 0,
        "max_uses": null,
        "start_date": "2022-07-18T19:02:16+00:00",
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


<details>  
  <summary>Buy product X or items from category Y, get $10 off items from category Z</summary>

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
  "name": "Buy product X or items from category Y get $10 off items from category Z",
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
}
```

<!--
type: tab
title: Request
-->

```json title="Example request" lineNumbers
 "name": "Buy product X or items from category Y get $10 off items from category Z",
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
```

<!--
type: tab
title: Response
-->

```json title="Example response" lineNumbers
{
    "data": {
        "id": 14,
        "name": "Buy product X or items from category Y get $10 off items from category Z",
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
                    "cart_items": {
                        "discount": {
                            "fixed_amount": "10"
                        },
                        "strategy": "LEAST_EXPENSIVE",
                        "add_free_item": true,
                        "as_total": false,
                        "include_items_considered_by_condition": false,
                        "exclude_items_on_sale": false,
                        "items": {
                            "categories": [
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
                            "or": [
                                {
                                    "categories": [
                                        36
                                    ]
                                },
                                {
                                    "products": [
                                        123
                                    ]
                                }
                            ]
                        },
                        "minimum_quantity": 1
                    }
                }
            }
        ],
        "notifications": [],
        "stop": false,
        "currency_code": "USD",
        "redemption_type": "AUTOMATIC",
        "shipping_address": null,
        "current_uses": 0,
        "max_uses": null,
        "start_date": "2022-07-18T19:16:26+00:00",
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

<details>  
  <summary>Buy three from category X, get one from category Y for free</summary>

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
  "name": "Buy three from category X get one from category Y for free",
  "redemption_type": "AUTOMATIC",
  "rules": [
    {
      "apply_once": false,
      "condition": {
        "cart": {
          "items": {
            "categories": [
              24
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
              24
            ]
          },
          "quantity": 1
        }
      }
    }
  ]
}
}
```
<!--
type: tab
title: Request
-->

```json title="Example request" lineNumbers
{
  "name": "Buy three from category X get one from category Y for free",
  "redemption_type": "AUTOMATIC",
  "rules": [
    {
      "apply_once": false,
      "condition": {
        "cart": {
          "items": {
            "categories": [
              24
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
              24
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
title: Response
-->

```json title="Example response" lineNumbers
{
    "data": {
        "id": 15,
        "name": "Buy three from category X get one from category Y for free",
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
                    "cart_items": {
                        "discount": {
                            "percentage_amount": "100"
                        },
                        "strategy": "LEAST_EXPENSIVE",
                        "add_free_item": true,
                        "as_total": false,
                        "include_items_considered_by_condition": false,
                        "exclude_items_on_sale": false,
                        "items": {
                            "categories": [
                                24
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
                            "categories": [
                                24
                            ]
                        },
                        "minimum_quantity": 3
                    }
                }
            }
        ],
        "notifications": [],
        "stop": false,
        "currency_code": "USD",
        "redemption_type": "AUTOMATIC",
        "shipping_address": null,
        "current_uses": 0,
        "max_uses": null,
        "start_date": "2022-07-18T19:57:54+00:00",
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

<details>  
  <summary>Spend $X from category X, get product Y for free</summary>

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
  "name": "Buy $X from category X get product Y for free",
  "redemption_type": "AUTOMATIC",
  "rules": [
    {
      "apply_once": false,
      "condition": {
        "cart": {
          "items": {
            "categories": [
              24
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
              123
            ]
          },
          "quantity": 1
        }
      }
    }
  ]
}
}
```

<!--
type: tab
title: Request
-->

```json title="Example request" lineNumbers
{
  "name": "Buy $X from category X get product Y for free",
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
title: Response
-->

```json title="Example response" lineNumbers
{
    "data": {
        "id": 16,
        "name": "Buy $X from category X get product Y for free",
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
                    "cart_items": {
                        "discount": {
                            "percentage_amount": "100"
                        },
                        "strategy": "LEAST_EXPENSIVE",
                        "add_free_item": true,
                        "as_total": false,
                        "include_items_considered_by_condition": false,
                        "exclude_items_on_sale": false,
                        "items": {
                            "products": [
                                123
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
                            "categories": [
                                24
                            ]
                        },
                        "minimum_spend": "300"
                    }
                }
            }
        ],
        "notifications": [],
        "stop": false,
        "currency_code": "USD",
        "redemption_type": "AUTOMATIC",
        "shipping_address": null,
        "current_uses": 0,
        "max_uses": null,
        "start_date": "2022-07-18T20:07:24+00:00",
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

## Customer

<details>
<summary>10% off for VIP customers</summary>

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
  "name": "10% off for VIP customers",
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
}
```

<!--
type: tab
title: Request
-->

```json title="Example request" lineNumbers
{
  "name": "10% off for VIP customers",
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

<!--
type: tab
title: Response
-->

```json title="Example response" lineNumbers
{
    "data": {
        "id": 17,
        "name": "10% off for VIP customers",
        "created_from": "api",
        "customer": {
            "group_ids": [
                1
            ],
            "minimum_order_count": 0,
            "excluded_group_ids": [],
            "segments": null
        },
        "rules": [
            {
                "action": {
                    "cart_value": {
                        "discount": {
                            "percentage_amount": "10"
                        }
                    }
                },
                "apply_once": true,
                "stop": false
            }
        ],
        "notifications": [],
        "stop": false,
        "currency_code": "USD",
        "redemption_type": "AUTOMATIC",
        "shipping_address": null,
        "current_uses": 0,
        "max_uses": null,
        "start_date": "2022-07-19T13:46:55+00:00",
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

<details>  
  <summary>5% off for non-VIP customers (including guest customers, and registered customers who are not assigned to any groups, and registered customers who are assigned to a non-VIP group)</summary>

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
}
```


<!--
type: tab
title: Request
-->

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

<!--
type: tab
title: Response
-->

```json title="Example response" lineNumbers
{
    "data": {
        "id": 18,
        "name": "5% off for non-VIP customers",
        "created_from": "api",
        "customer": {
            "group_ids": [],
            "minimum_order_count": 0,
            "excluded_group_ids": [
                1
            ],
            "segments": null
        },
        "rules": [
            {
                "action": {
                    "cart_value": {
                        "discount": {
                            "percentage_amount": "5"
                        }
                    }
                },
                "apply_once": true,
                "stop": false
            }
        ],
        "notifications": [],
        "stop": false,
        "currency_code": "USD",
        "redemption_type": "AUTOMATIC",
        "shipping_address": null,
        "current_uses": 0,
        "max_uses": null,
        "start_date": "2022-07-19T13:55:11+00:00",
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

<details>  
  <summary>3% off for guest customers or customers not assigned to any group</summary>

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
}
```

<!--
type: tab
title: Request
-->

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

<!--
type: tab
title: Response
-->

```json title="Example response" lineNumbers
{
    "data": {
        "id": 19,
        "name": "3% off for guest customers or customers not assigned to any group",
        "created_from": "api",
        "customer": {
            "group_ids": [
                0
            ],
            "minimum_order_count": 0,
            "excluded_group_ids": [],
            "segments": null
        },
        "rules": [
            {
                "action": {
                    "cart_value": {
                        "discount": {
                            "percentage_amount": "3"
                        }
                    }
                },
                "apply_once": true,
                "stop": false
            }
        ],
        "notifications": [],
        "stop": false,
        "currency_code": "USD",
        "redemption_type": "AUTOMATIC",
        "shipping_address": null,
        "current_uses": 0,
        "max_uses": null,
        "start_date": "2022-07-19T14:02:33+00:00",
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

<details>  
  <summary>10% off for customers with total order count of 10 or more</summary>

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
}
```


 <!--
type: tab
title: Request
-->

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

<!--
type: tab
title: Response
-->

```json title="Example response" lineNumbers
{
    "data": {
        "id": 20,
        "name": "10% off for customers with total order count of 10 or more",
        "created_from": "api",
        "customer": {
            "group_ids": [],
            "minimum_order_count": 10,
            "excluded_group_ids": [],
            "segments": null
        },
        "rules": [
            {
                "action": {
                    "cart_value": {
                        "discount": {
                            "percentage_amount": "10"
                        }
                    }
                },
                "apply_once": true,
                "stop": false
            }
        ],
        "notifications": [],
        "stop": false,
        "currency_code": "USD",
        "redemption_type": "AUTOMATIC",
        "shipping_address": null,
        "current_uses": 0,
        "max_uses": null,
        "start_date": "2022-07-19T14:14:12+00:00",
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

<details>  
  <summary>10% off for customers who belong to segment 1 or segment 2 (Closed Beta)</summary>

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
  "name": "10% off for customers who belong to segment 1 or segment 2",
  "redemption_type": "AUTOMATIC",
  "customer": {
    "segments": {
      "id": [
        "61fd72bc-7400-4a7b-ac64-96c0d315c464",
        "d52fb39d-6715-430e-a0bf-21a192d790f0"
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
}
```

 <!--
type: tab
title: Request
-->

```json title="Example request" lineNumbers
{
  "name": "10% off for customers who belong to segment 1 or segment 2",
  "redemption_type": "AUTOMATIC",
  "customer": {
    "segments": {
      "id": [
        "61fd72bc-7400-4a7b-ac64-96c0d315c464",
        "d52fb39d-6715-430e-a0bf-21a192d790f0"
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
title: Response
-->

```json title="Example responses" lineNumbers
<!-- closed Beta -->
{
    "data": {
        "id": 48,
        "name": "10% off for customers who belong to segment 1 or segment 2",
        "created_from": "api",
        "customer": {
            "group_ids": [],
            "minimum_order_count": 0,
            "excluded_group_ids": [],
            "segments": {
                "id": [
                    "61fd72bc-7400-4a7b-ac64-96c0d315c464",
                    "d52fb39d-6715-430e-a0bf-21a192d790f0"
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
                },
                "apply_once": true,
                "stop": false
            }
        ],
        "notifications": [],
        "stop": false,
        "currency_code": "USD",
        "redemption_type": "AUTOMATIC",
        "shipping_address": null,
        "current_uses": 0,
        "max_uses": null,
        "start_date": "2022-07-22T17:33:02+00:00",
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


<details>  
  <summary>10% off for customers who do NOT belong to segment 1, including those who do not belong to any segments(Closed Beta)</summary>

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
  "name": "10% off for customers who do not belong to segment 1",
  "redemption_type": "AUTOMATIC",
  "customer": {
    "segments": {
      "not": {
        "id": [
          "61fd72bc-7400-4a7b-ac64-96c0d315c464"
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
}
```

<!--
type: tab
title: Request
-->

```json title="Example request" lineNumbers
{
"name": "10% off for customers who do not belong to segment 1",
  "redemption_type": "AUTOMATIC",
  "customer": {
    "segments": {
      "not": {
        "id": [
          "61fd72bc-7400-4a7b-ac64-96c0d315c464"
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

<!--
type: tab
title: Response
-->

```json title="Example response" lineNumbers
<!-- closed Beta -->
{
    "data": {
        "id": 49,
        "name": "10% off for customers who do not belong to segment 1",
        "created_from": "api",
        "customer": {
            "group_ids": [],
            "minimum_order_count": 0,
            "excluded_group_ids": [],
            "segments": {
                "not": {
                    "id": [
                        "61fd72bc-7400-4a7b-ac64-96c0d315c464"
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
                },
                "apply_once": true,
                "stop": false
            }
        ],
        "notifications": [],
        "stop": false,
        "currency_code": "USD",
        "redemption_type": "AUTOMATIC",
        "shipping_address": null,
        "current_uses": 0,
        "max_uses": null,
        "start_date": "2022-07-22T17:41:30+00:00",
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

<details>
  <summary>10% off for customers who belong to segment 1 and also belong to segment 2 (Closed Beta)</summary>

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
  "name": "10% off for customers who belong to segment 1 and also belong to segment 2",
  "redemption_type": "AUTOMATIC",
  "customer": {
    "segments": {
      "and": [
        {
          "id": ["61fd72bc-7400-4a7b-ac64-96c0d315c464"]
        },
        {
          "id": ["d52fb39d-6715-430e-a0bf-21a192d790f0"]
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
}
```

 <!--
type: tab
title: Request
-->

```json title="Example request" lineNumbers
{
  "name": "10% off for customers who belong to segment 1 and also belong to segment 2",
  "redemption_type": "AUTOMATIC",
  "customer": {
    "segments": {
      "and": [
        {
          "id": ["61fd72bc-7400-4a7b-ac64-96c0d315c464"]
        },
        {
          "id": ["d52fb39d-6715-430e-a0bf-21a192d790f0"]
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
title: Response
-->

```json title="Example response" lineNumbers
<!-- closed Beta -->
{
    "data": {
        "id": 50,
        "name": "10% off for customers who belong to segment 1 and also belong to segment 2",
        "created_from": "api",
        "customer": {
            "group_ids": [],
            "minimum_order_count": 0,
            "excluded_group_ids": [],
            "segments": {
                "and": [
                    {
                        "id": [
                            "61fd72bc-7400-4a7b-ac64-96c0d315c464"
                        ]
                    },
                    {
                        "id": [
                            "d52fb39d-6715-430e-a0bf-21a192d790f0"
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
                },
                "apply_once": true,
                "stop": false
            }
        ],
        "notifications": [],
        "stop": false,
        "currency_code": "USD",
        "redemption_type": "AUTOMATIC",
        "shipping_address": null,
        "current_uses": 0,
        "max_uses": null,
        "start_date": "2022-07-22T17:44:16+00:00",
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



<details>  
  <summary>10% off for customers who belong to segment 3 or customers who belong to segment 1 and also belong to segment 2 (Closed Beta)</summary>


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
  "name": "10% off for customers who belong to segment 3 or customers who belong to segment 1 and segment 2",
  "redemption_type": "AUTOMATIC",
  "customer": {
    "segments": {
      "or": [
        {
          "id": ["4d843892-d90c-4f01-a36e-ce810172c094"]
        },
        {
          "and": [
            {
              "id": ["61fd72bc-7400-4a7b-ac64-96c0d315c464"]
            },
            {
              "id": ["d52fb39d-6715-430e-a0bf-21a192d790f0"]
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
}
```

<!--
type: tab
title: Request
-->

```json title="Example request" lineNumbers
{
  "name": "10% off for customers who belong to segment 3 or customers who belong to segment 1 and segment 2",
  "redemption_type": "AUTOMATIC",
  "customer": {
    "segments": {
      "or": [
        {
          "id": ["4d843892-d90c-4f01-a36e-ce810172c094"]
        },
        {
          "and": [
            {
              "id": ["61fd72bc-7400-4a7b-ac64-96c0d315c464"]
            },
            {
              "id": ["d52fb39d-6715-430e-a0bf-21a192d790f0"]
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
title: Response
-->

```json title="Example response" lineNumbers
<!-- closed Beta -->
{
    "data": {
        "id": 51,
        "name": "10% off for customers who belong to segment 3 or customers who belong to segment 1 and segment 2",
        "created_from": "api",
        "customer": {
            "group_ids": [],
            "minimum_order_count": 0,
            "excluded_group_ids": [],
            "segments": {
                "or": [
                    {
                        "id": [
                            "4d843892-d90c-4f01-a36e-ce810172c094"
                        ]
                    },
                    {
                        "and": [
                            {
                                "id": [
                                    "61fd72bc-7400-4a7b-ac64-96c0d315c464"
                                ]
                            },
                            {
                                "id": [
                                    "d52fb39d-6715-430e-a0bf-21a192d790f0"
                                ]
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
                },
                "apply_once": true,
                "stop": false
            }
        ],
        "notifications": [],
        "stop": false,
        "currency_code": "USD",
        "redemption_type": "AUTOMATIC",
        "shipping_address": null,
        "current_uses": 0,
        "max_uses": null,
        "start_date": "2022-07-22T17:48:59+00:00",
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

## Logical operators

<details>  
  <summary>Buy two of product X or buy two of product Y (OR operator)
The following promotion uses logical “OR” at the conditional level and it requires the shopper to have either two of product X or two of product Y in the cart to satisfy this condition.</summary>

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
  "name": "Buy two product X or buy two product Y",
  "redemption_type": "AUTOMATIC",
  "rules": [
    {
      "condition": {
        "or": [
          {
            "cart": {
              "items": {
                "products": [
                  118
                ]
              },
              "minimum_quantity": 2
            }
          },
          {
            "cart": {
              "items": {
                "variants": [
                  134
                ]
              },
              "minimum_quantity": 2
            }
          }
        ]
      },
      "action": {
        "gift_item": {
          "product_id": 130,
          "quantity": 1
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
}
```

<!--
type: tab
title: Request
-->

```json title="Example request" lineNumbers
{
  "name": "Buy two product X or buy two product Y",
  "redemption_type": "AUTOMATIC",
  "rules": [
    {
      "condition": {
        "or": [
          {
            "cart": {
              "items": {
                "products": [
                  118
                ]
              },
              "minimum_quantity": 2
            }
          },
          {
            "cart": {
              "items": {
                "variants": [
                  134
                ]
              },
              "minimum_quantity": 2
            }
          }
        ]
      },
      "action": {
        "gift_item": {
          "product_id": 130,
          "quantity": 1
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

<!--
type: tab
title: Response
-->

```json title="Example response" lineNumbers
{
    "data": {
        "id": 47,
        "name": "Buy two product X OR Buy two product Y",
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
                    "gift_item": {
                        "quantity": 1,
                        "product_id": 130
                    }
                },
                "apply_once": true,
                "stop": false,
                "condition": {
                    "or": [
                        {
                            "cart": {
                                "items": {
                                    "products": [
                                        118
                                    ]
                                },
                                "minimum_quantity": 2
                            }
                        },
                        {
                            "cart": {
                                "items": {
                                    "variants": [
                                        134
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
        "currency_code": "USD",
        "redemption_type": "AUTOMATIC",
        "shipping_address": null,
        "current_uses": 0,
        "max_uses": null,
        "start_date": "2019-02-01T05:00:00+00:00",
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

<details>  
  <summary>Buy two of product X or buy two of product Y (OR operator) The following promotion uses logical “OR” at item matcher level, and any of these combinations satisfies the condition:<br>
* 1 product X + 1 product Y <br>
* 2 product X <br>
* 2 product Y <br>
</summary>

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
  "name": "Buy two (product X or product Y)",
  "redemption_type": "AUTOMATIC",
  "rules": [
    {
      "condition": {
        "or": [
          {
            "products": [
              129
            ]
          },
          {
            "variants": [
              1
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
}
```

<!--
type: tab
title: Request
-->


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
              118
            ]
          },
          {
            "variants": [
              134
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
<!--
type: tab
title: Response
-->

```json title="Example response" lineNumbers
{
    "data": {
        "id": 52,
        "name": "Buy 2 product X OR Buy 2 product Y",
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
                    "gift_item": {
                        "quantity": 1,
                        "product_id": 130
                    }
                },
                "apply_once": true,
                "stop": false,
                "condition": {
                    "or": [
                        {
                            "cart": {
                                "items": {
                                    "products": [
                                        118
                                    ]
                                },
                                "minimum_quantity": 2
                            }
                        },
                        {
                            "cart": {
                                "items": {
                                    "variants": [
                                        134
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
        "currency_code": "USD",
        "redemption_type": "AUTOMATIC",
        "shipping_address": null,
        "current_uses": 0,
        "max_uses": null,
        "start_date": "2019-02-01T05:00:00+00:00",
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

<details>  
  <summary>Get percentage off X category, excluding an item (AND, NOT operators)</summary>

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
                  25
                ]
              },
              {
                "not": {
                  "products": [
                    129
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
      "apply_once": true
    }
  ]
}
}
```

<!--
type: tab
title: Request
-->

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
                  25
                ]
              },
              {
                "not": {
                  "products": [
                    129
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
      "apply_once": true
    }
  ]
}
```
<!--
type: tab
title: Response
-->

```json title="Example response" lineNumbers
{
    "data": {
        "id": 23,
        "name": "Get 20% off all kitchen items, excluding Able Brewing System",
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
                    "cart_items": {
                        "discount": {
                            "percentage_amount": "20"
                        },
                        "strategy": "LEAST_EXPENSIVE",
                        "add_free_item": true,
                        "as_total": false,
                        "include_items_considered_by_condition": false,
                        "exclude_items_on_sale": false,
                        "items": {
                            "and": [
                                {
                                    "categories": [
                                        25
                                    ]
                                },
                                {
                                    "not": {
                                        "products": [
                                            129
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
        "notifications": [],
        "stop": false,
        "currency_code": "USD",
        "redemption_type": "AUTOMATIC",
        "shipping_address": null,
        "current_uses": 0,
        "max_uses": null,
        "start_date": "2022-07-21T14:00:11+00:00",
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


<details>  
  <summary>Get X% off all brand X and all except X products in brand Y (OR, AND, NOT operators)</summary>

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
  "name": "Get 20% off all coffee makers and all but new arrivals coffee filters",
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
                      37
                    ]
                  },
                  {
                    "categories": [
                      25
                    ]
                  }
                ]
              },
              {
                "and": [
                  {
                    "brands": [
                      38
                    ]
                  },
                  {
                    "categories": [
                      35
                    ]
                  },
                  {
                    "not": {
                      "categories": [
                        24
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
      "apply_once": true,
      "currency_code": "AUD"
    }
  ]
}
}
```

<!--
type: tab
title: Request
-->

```json title="Example request" lineNumbers
{
  "name": "Get 20% off all coffee makers and all but new arrivals coffee filters",
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
                      37
                    ]
                  },
                  {
                    "categories": [
                      25
                    ]
                  }
                ]
              },
              {
                "and": [
                  {
                    "brands": [
                      38
                    ]
                  },
                  {
                    "categories": [
                      35
                    ]
                  },
                  {
                    "not": {
                      "categories": [
                        24
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
      "apply_once": true,
      "currency_code": "AUD"
    }
  ]
}
```

<!--
type: tab
title: Response
-->

```json title="Example response" lineNumbers
{
    "data": {
        "id": 22,
        "name": "Get 20% off all Coffee Makers and all but new arrivals Coffee Filters",
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
                    "cart_items": {
                        "discount": {
                            "percentage_amount": "20"
                        },
                        "strategy": "LEAST_EXPENSIVE",
                        "add_free_item": true,
                        "as_total": false,
                        "include_items_considered_by_condition": false,
                        "exclude_items_on_sale": false,
                        "items": {
                            "or": [
                                {
                                    "and": [
                                        {
                                            "brands": [
                                                37
                                            ]
                                        },
                                        {
                                            "categories": [
                                                25
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "and": [
                                        {
                                            "brands": [
                                                38
                                            ]
                                        },
                                        {
                                            "categories": [
                                                35
                                            ]
                                        },
                                        {
                                            "not": {
                                                "categories": [
                                                    24
                                                ]
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                },
                "apply_once": true,
                "stop": false
            }
        ],
        "notifications": [],
        "stop": false,
        "currency_code": "USD",
        "redemption_type": "AUTOMATIC",
        "shipping_address": null,
        "current_uses": 0,
        "max_uses": null,
        "start_date": "2022-07-21T13:55:35+00:00",
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

<details>  
  <summary>X% off storewide except product Y or product Z or any items in category C</summary>

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
                    129,
                    130
                  ]
                }
              },
              {
                "not": {
                  "categories": [
                    24
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
}
```
<!--
type: tab
title: Request
-->

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
                    129,
                    130                 ]
                }
              },
              {
                "not": {
                  "categories": [
                    24
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
title: Response
-->

```json title="Example response" lineNumbers
{
    "data": {
        "id": 21,
        "name": "10% off storewide except 'Able Brewing System' or 'Chemex Coffeemaker' or any garden products",
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
                    "cart_items": {
                        "discount": {
                            "percentage_amount": "10"
                        },
                        "strategy": "LEAST_EXPENSIVE",
                        "add_free_item": true,
                        "as_total": false,
                        "include_items_considered_by_condition": false,
                        "exclude_items_on_sale": false,
                        "items": {
                            "and": [
                                {
                                    "not": {
                                        "products": [
                                            129,
                                            130
                                        ]
                                    }
                                },
                                {
                                    "not": {
                                        "categories": [
                                            24
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
        "notifications": [],
        "stop": false,
        "currency_code": "USD",
        "redemption_type": "AUTOMATIC",
        "shipping_address": null,
        "current_uses": 0,
        "max_uses": null,
        "start_date": "2022-07-21T13:49:42+00:00",
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

## Multiple rules

<details>  
  <summary>Tiered $ off order based on order value</summary>

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
  "name": "Tiered $ off order based on order value",
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
}
```

<!--
type: tab
title: Request
-->

```json title="Example request" lineNumbers
{
  "name": "Tiered $ off order based on order value",
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

<!--
type: tab
title: Response
-->

```json title="Example response" lineNumbers
{
    "data": {
        "id": 24,
        "name": "Tiered $ off order based on order value",
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
                    "cart_value": {
                        "discount": {
                            "fixed_amount": "45"
                        }
                    }
                },
                "apply_once": true,
                "stop": true,
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
        "currency_code": "USD",
        "redemption_type": "AUTOMATIC",
        "shipping_address": null,
        "current_uses": 0,
        "max_uses": null,
        "start_date": "2019-02-01T05:00:00+00:00",
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

<details>
  <summary>Apply a tiered discount to X products based on the quantity of items ordered within X</summary>

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
  "name": "Apply a tiered discount to applicable products based on the quantity of items ordered within X ",
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
              24
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
              35
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
              25
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
              25
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
              30
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
              36
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
}
```
<!--
type: tab
title: Request
-->

```json title="Example request" lineNumbers
{
 "name": "Apply a tiered discount to applicable products based on the quantity of items ordered within X ",
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
              24
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
              35
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
              25
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
              25
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
              30
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
              36
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
<!--
type: tab
title: Response
-->

```json title="Example response" lineNumbers
{
    "data": {
        "id": 25,
        "name": "Apply a tiered discount to applicable products based on the quantity of items ordered within X ",
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
                    "cart_items": {
                        "discount": {
                            "fixed_amount": "20"
                        },
                        "strategy": "LEAST_EXPENSIVE",
                        "add_free_item": true,
                        "as_total": true,
                        "include_items_considered_by_condition": true,
                        "exclude_items_on_sale": false,
                        "items": {
                            "categories": [
                                24
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
                                35
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
                        "add_free_item": true,
                        "as_total": true,
                        "include_items_considered_by_condition": true,
                        "exclude_items_on_sale": false,
                        "items": {
                            "categories": [
                                25
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
                                25
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
                        "add_free_item": true,
                        "as_total": true,
                        "include_items_considered_by_condition": true,
                        "exclude_items_on_sale": false,
                        "items": {
                            "categories": [
                                30
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
                                36
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
        "currency_code": "USD",
        "redemption_type": "AUTOMATIC",
        "shipping_address": null,
        "current_uses": 0,
        "max_uses": null,
        "start_date": "2019-02-01T05:00:00+00:00",
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

<details>
  <summary>Up to 50% off storewide (50% off category X items and 40% off everything else)</summary>

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
  "name": "Up to 50% off storewide (50% off category X items and 40% off everything else)",
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
              36
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
                24
              ]
            }
          }
        }
      },
      "apply_once": true
    }
  ]
}
}
```

<!--
type: tab
title: Request
-->

```json title="Example request" lineNumbers
{
"name": "Up to 50% off storewide (50% off category X items and 40% off everything else)",
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
              36
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
                24
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

<!--
type: tab
title: Response
-->

```json title="Example response" lineNumbers
{
  {
    "data": {
        "id": 26,
        "name": "Up to 50% off storewide (50% off category X items and 40% off everything else)",
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
                    "cart_items": {
                        "discount": {
                            "percentage_amount": "50"
                        },
                        "strategy": "LEAST_EXPENSIVE",
                        "add_free_item": true,
                        "as_total": false,
                        "include_items_considered_by_condition": false,
                        "exclude_items_on_sale": false,
                        "items": {
                            "categories": [
                                36
                            ]
                        }
                    }
                },
                "apply_once": true,
                "stop": false
            },
            {
                "action": {
                    "cart_items": {
                        "discount": {
                            "percentage_amount": "40"
                        },
                        "strategy": "LEAST_EXPENSIVE",
                        "add_free_item": true,
                        "as_total": false,
                        "include_items_considered_by_condition": false,
                        "exclude_items_on_sale": false,
                        "items": {
                            "not": {
                                "categories": [
                                    24
                                ]
                            }
                        }
                    }
                },
                "apply_once": true,
                "stop": false
            }
        ],
        "notifications": [],
        "stop": false,
        "currency_code": "USD",
        "redemption_type": "AUTOMATIC",
        "shipping_address": null,
        "current_uses": 0,
        "max_uses": null,
        "start_date": "2022-07-21T14:54:01+00:00",
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


<details>  
  <summary>Buy X products get free shipping and 10% off order</summary>

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
  "name": "Buy two of product X get free shipping to all zones and 10% off order",
  "redemption_type": "AUTOMATIC",
  "rules": [
    {
      "condition": {
        "cart": {
          "items": {
            "products": [
              118
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
              130
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
}
```
<!--
type: tab
title: Request
-->

```json title="Example request" lineNumbers
{
  "name": "Buy two of product X get free shipping to all zones and 10% off order",
  "redemption_type": "AUTOMATIC",
  "rules": [
    {
      "condition": {
        "cart": {
          "items": {
            "products": [
              118
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
              130
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
title: Response
-->

```json title="Example response" lineNumbers
{
    "data": {
        "id": 27,
        "name": "Buy two of product X get free shipping to all zones and 10% off order",
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
                        "zone_ids": "*"
                    }
                },
                "apply_once": true,
                "stop": false,
                "condition": {
                    "cart": {
                        "items": {
                            "products": [
                                118
                            ]
                        },
                        "minimum_quantity": 2
                    }
                }
            },
            {
                "action": {
                    "cart_value": {
                        "discount": {
                            "percentage_amount": "10"
                        }
                    }
                },
                "apply_once": true,
                "stop": false,
                "condition": {
                    "cart": {
                        "items": {
                            "products": [
                                130
                            ]
                        },
                        "minimum_quantity": 2
                    }
                }
            }
        ],
        "notifications": [],
        "stop": false,
        "currency_code": "USD",
        "redemption_type": "AUTOMATIC",
        "shipping_address": null,
        "current_uses": 0,
        "max_uses": null,
        "start_date": "2022-07-21T16:17:01+00:00",
        "end_date": null,
        "status": "ENABLED",
        "schedule": null,
        "can_be_used_with_other_promotions": true
    },
    "meta": {}
}
```

```json title="Example request" lineNumbers
{
  "name": "Buy two of product X get free shipping to all zones and 10% off order",
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
type: tab-end
-->

</details>

## Order

<details>  
  <summary>X$ off when you purchase two of X product or one of X product OR operator</summary>

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
  "name": "50$ off when you buy two tiered wire baskets or a small purple towel",
  "redemption_type": "AUTOMATIC",
  "rules": [
    {
      "condition": {
        "or": [
          {
            "cart": {
              "items": {
                "products": [
                  118
                ]
              },
              "minimum_quantity": 2
            }
          },
          {
            "cart": {
              "items": {
                "variants": [
                  134
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
}
```
<!--
type: tab
title: Request
-->

```json title="Example request" lineNumbers
{
"name": "50$ off when you buy two tiered wire baskets or a small purple towel",
  "redemption_type": "AUTOMATIC",
  "rules": [
    {
      "condition": {
        "or": [
          {
            "cart": {
              "items": {
                "products": [
                  118
                ]
              },
              "minimum_quantity": 2
            }
          },
          {
            "cart": {
              "items": {
                "variants": [
                  134
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

<!--
type: tab
title: Response
-->

```json title="Example response" lineNumbers
{
    "data": {
        "id": 53,
        "name": "50$ off when you buy two tiered wire baskets or a small purple towel",
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
                    "cart_value": {
                        "discount": {
                            "fixed_amount": "50"
                        }
                    }
                },
                "apply_once": true,
                "stop": false,
                "condition": {
                    "or": [
                        {
                            "cart": {
                                "items": {
                                    "products": [
                                        118
                                    ]
                                },
                                "minimum_quantity": 2
                            }
                        },
                        {
                            "cart": {
                                "items": {
                                    "variants": [
                                        134
                                    ]
                                },
                                "minimum_quantity": 1
                            }
                        }
                    ]
                }
            }
        ],
        "notifications": [],
        "stop": false,
        "currency_code": "USD",
        "redemption_type": "AUTOMATIC",
        "shipping_address": null,
        "current_uses": 0,
        "max_uses": null,
        "start_date": "2022-07-22T18:12:50+00:00",
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

<details>  
  <summary>Spend X$ get X$ off order</summary>

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
  "name": "Spend X$ get X$ off order",
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
}
```

<!--
type: tab
title: Request
-->

```json title="Example request" lineNumbers
{
  "name": "Spend X$ get X$ off order",
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
<!--
type: tab
title: Response
-->

```json title="Example response" lineNumbers
{
    "data": {
        "id": 28,
        "name": "Spend X$ get X$ off order",
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
                    "cart_value": {
                        "discount": {
                            "fixed_amount": "20"
                        }
                    }
                },
                "apply_once": true,
                "stop": false,
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
        "redemption_type": "AUTOMATIC",
        "shipping_address": null,
        "current_uses": 0,
        "max_uses": null,
        "start_date": "2022-07-21T16:39:16+00:00",
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

<details>  
  <summary>Order at least $X get X item free</summary>

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
  "name": "Order at least $X get X item free",
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
}
```
<!--
type: tab
title: Request
-->


```json title="Example request" lineNumbers
{
  "name": "Order at least $X get X item free",
  "redemption_type": "AUTOMATIC",
  "rules": [
    {
      "action": {
        "gift_item": {
          "product_id": 130,
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

<!--
type: tab
title: Response
-->

```json title="Example response" lineNumbers
{
    "data": {
        "id": 29,
        "name": "Order at least $X get X item free",
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
                    "gift_item": {
                        "quantity": 1,
                        "product_id": 130
                    }
                },
                "apply_once": true,
                "stop": false,
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
        "redemption_type": "AUTOMATIC",
        "shipping_address": null,
        "current_uses": 0,
        "max_uses": null,
        "start_date": "2022-07-21T16:49:32+00:00",
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

 

<details>  
  <summary>Take X% off items storewide except for X category NOT operator</summary>

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
                24
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
}
```

<!--
type: tab
title: Request
-->

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
                24
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
title: Response
-->

```json title="Example response" lineNumbers
{
    "data": {
        "id": 30,
        "name": "15% off store except sale",
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
                    "cart_items": {
                        "discount": {
                            "percentage_amount": "15"
                        },
                        "strategy": "LEAST_EXPENSIVE",
                        "add_free_item": true,
                        "as_total": false,
                        "include_items_considered_by_condition": false,
                        "exclude_items_on_sale": false,
                        "items": {
                            "not": {
                                "categories": [
                                    24
                                ]
                            }
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
        ],
        "stop": false,
        "currency_code": "USD",
        "redemption_type": "AUTOMATIC",
        "shipping_address": null,
        "current_uses": 0,
        "max_uses": null,
        "start_date": "2022-07-21T16:54:22+00:00",
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


## Product

<details>  
  <summary>Buy one get one free</summary>


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
  "name": "Buy one get one free",
  "redemption_type": "AUTOMATIC",
  "rules": [
    {
      "action": {
        "gift_item": {
          "product_id": 130,
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
              130
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
}
```

<!--
type: tab
title: Request
-->

```json title="Example request" lineNumbers
{
  "name": "Buy one get one free",
  "redemption_type": "AUTOMATIC",
  "rules": [
    {
      "action": {
        "gift_item": {
          "product_id": 130,
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
              130
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
<!--
type: tab
title: Response
-->

```json title="Example response" lineNumbers
{
    "data": {
        "id": 31,
        "name": "Buy one get one free",
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
                    "gift_item": {
                        "quantity": 1,
                        "product_id": 130
                    }
                },
                "apply_once": false,
                "stop": false,
                "condition": {
                    "cart": {
                        "items": {
                            "products": [
                                130
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
        "currency_code": "USD",
        "redemption_type": "AUTOMATIC",
        "shipping_address": null,
        "current_uses": 0,
        "max_uses": null,
        "start_date": "2019-02-06T05:00:00+00:00",
        "end_date": "2019-02-09T04:59:59+00:00",
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

<details>  
  <summary>Buy (X units) of product A, get (Y units) of product B for $ or % off per unit</summary>

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
  "name": "Buy two X get 10% off Y",
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
              130
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
              129
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
}
```

<!--
type: tab
title: Request
-->

```json title="Example request" lineNumbers
{
  {
  "name": "Buy two X get 10% off Y",
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
              130
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
              129
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

<!--
type: tab
title: Response
-->

```json title="Example response" lineNumbers
{
    "data": {
        "id": 32,
        "name": "Buy two X get 10% off Y",
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
                    "cart_items": {
                        "discount": {
                            "percentage_amount": "10"
                        },
                        "strategy": "LEAST_EXPENSIVE",
                        "add_free_item": true,
                        "as_total": false,
                        "include_items_considered_by_condition": false,
                        "exclude_items_on_sale": false,
                        "items": {
                            "products": [
                                130
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
                                129
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
        "currency_code": "USD",
        "redemption_type": "AUTOMATIC",
        "shipping_address": null,
        "current_uses": 0,
        "max_uses": null,
        "start_date": "2022-07-21T17:15:06+00:00",
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

<details>  
  <summary> Get $ or % off product X</summary>



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
              130
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
}
```
<!--
type: tab
title: Request
-->

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
              130
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
<!--
type: tab
title: Response
-->

```json title="Example response" lineNumbers
{
    "data": {
        "id": 33,
        "name": "Spend 100 dollar and get 10% off small orbit",
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
                    "cart_items": {
                        "discount": {
                            "percentage_amount": "10"
                        },
                        "strategy": "LEAST_EXPENSIVE",
                        "add_free_item": true,
                        "as_total": false,
                        "include_items_considered_by_condition": false,
                        "exclude_items_on_sale": false,
                        "items": {
                            "products": [
                                130
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
        "currency_code": "USD",
        "redemption_type": "AUTOMATIC",
        "shipping_address": null,
        "current_uses": 0,
        "max_uses": null,
        "start_date": "2022-07-21T17:50:53+00:00",
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


<details>  
  <summary>Take X% off the most expensive item in the cart</summary>

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
  "name": "Apply 20% off most expensive cart item",
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
}
```

<!--
type: tab
title: Request
-->

```json title="Example request" lineNumbers
{
"name": "Apply 20% off most expensive cart item",
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
 <!--
type: tab
title: Response
-->

```json title="Example response" lineNumber
{
    "data": {
        "id": 34,
        "name": "Apply 20% off most expensive cart item",
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
                    "cart_items": {
                        "discount": {
                            "percentage_amount": "20"
                        },
                        "strategy": "MOST_EXPENSIVE",
                        "add_free_item": true,
                        "as_total": false,
                        "include_items_considered_by_condition": false,
                        "exclude_items_on_sale": false,
                        "quantity": 1
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
        "currency_code": "USD",
        "redemption_type": "AUTOMATIC",
        "shipping_address": null,
        "current_uses": 0,
        "max_uses": null,
        "start_date": "2019-01-31T05:00:00+00:00",
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

<details>  
  <summary>Buy X product variant and get X product variant free</summary>

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
  "name": "Buy X product variant and get X product variant free",
  "redemption_type": "AUTOMATIC",
  "rules": [
    {
      "action": {
        "gift_item": {
          "variant_id": 151,
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
              139
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
}
```
 <!--
type: tab
title: Request
-->

```json title="Example request" lineNumbers
{
  "name": "Buy X product variant and get X product variant free",
  "redemption_type": "AUTOMATIC",
  "rules": [
    {
      "action": {
        "gift_item": {
          "variant_id": 151,
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
              139
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
<!--
type: tab
title: Response
-->

```json title="Example response" lineNumbers
{
    "data": {
        "id": 56,
        "name": "Buy X product variant and get X product variant free",
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
                    "gift_item": {
                        "quantity": 1,
                        "variant_id": 151
                    }
                },
                "apply_once": false,
                "stop": false,
                "condition": {
                    "cart": {
                        "items": {
                            "variants": [
                                139
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
        "currency_code": "USD",
        "redemption_type": "AUTOMATIC",
        "shipping_address": null,
        "current_uses": 0,
        "max_uses": null,
        "start_date": "2022-07-25T19:11:27+00:00",
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

<details>  
  <summary>Amount off</summary>

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
              129
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
              130
            ]
          },
          "quantity": 1,
          "include_items_considered_by_condition": true
        }
      }
    }
  ]
}
}
```
<!--
type: tab
title: Request
-->

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
              129
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
              130
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

<!--
type: tab
title: Response
-->

```json title="Example response" lineNumbers
{
    "data": {
        "id": 35,
        "name": "US $50 off a specific product",
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
                    "cart_items": {
                        "discount": {
                            "fixed_amount": "50"
                        },
                        "strategy": "LEAST_EXPENSIVE",
                        "add_free_item": true,
                        "as_total": false,
                        "include_items_considered_by_condition": true,
                        "exclude_items_on_sale": false,
                        "items": {
                            "products": [
                                130
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
                                129
                            ]
                        },
                        "minimum_quantity": 1
                    }
                }
            }
        ],
        "notifications": [],
        "stop": false,
        "currency_code": "USD",
        "redemption_type": "AUTOMATIC",
        "shipping_address": null,
        "current_uses": 0,
        "max_uses": null,
        "start_date": "2022-07-21T18:21:18+00:00",
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

<details>  
  <summary>Percentage off</summary>

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
  "name": "US 15% off a specific product",
  "redemption_type": "AUTOMATIC",
  "rules": [
    {
      "apply_once": false,
      "condition": {
        "cart": {
          "items": {
            "products": [
              129
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
              130
            ]
          },
          "quantity": 1,
          "include_items_considered_by_condition": true
        }
      }
    }
  ]
}
}
```
<!--
type: tab
title: Request
-->

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
              129
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
              130
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

<!--
type: tab
title: Response
-->

```json title="Example response" lineNumbers
{
    "data": {
        "id": 37,
        "name": "US 15% off a specific product",
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
                    "cart_items": {
                        "discount": {
                            "percentage_amount": "75"
                        },
                        "strategy": "LEAST_EXPENSIVE",
                        "add_free_item": true,
                        "as_total": false,
                        "include_items_considered_by_condition": true,
                        "exclude_items_on_sale": false,
                        "items": {
                            "products": [
                                130
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
                                129
                            ]
                        },
                        "minimum_quantity": 1
                    }
                }
            }
        ],
        "notifications": [],
        "stop": false,
        "currency_code": "USD",
        "redemption_type": "AUTOMATIC",
        "shipping_address": null,
        "current_uses": 0,
        "max_uses": null,
        "start_date": "2022-07-21T19:05:02+00:00",
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


<details>  
  <summary>Buy three for the price of two</summary>

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
  "name": "Buy three for the price of two",
  "redemption_type": "AUTOMATIC",
  "rules": [
    {
      "apply_once": false,
      "condition": {
        "cart": {
          "items": {
            "products": [
              129
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
              130
            ]
          },
          "quantity": 1
        }
      }
    }
  ]
}
}
```

<!--
type: tab
title: Request
-->

```json title="Example request" lineNumbers
{
  "name": "Buy three for the price of two",
  "redemption_type": "AUTOMATIC",
  "rules": [
    {
      "apply_once": false,
      "condition": {
        "cart": {
          "items": {
            "products": [
              129
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
              130
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
title: Response
-->

```json title="Example response" lineNumbers
{
    "data": {
        "id": 36,
        "name": "Buy three for the price of two",
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
                    "cart_items": {
                        "discount": {
                            "percentage_amount": "100"
                        },
                        "strategy": "LEAST_EXPENSIVE",
                        "add_free_item": true,
                        "as_total": false,
                        "include_items_considered_by_condition": false,
                        "exclude_items_on_sale": false,
                        "items": {
                            "products": [
                                130
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
                                129
                            ]
                        },
                        "minimum_quantity": 2
                    }
                }
            }
        ],
        "notifications": [],
        "stop": false,
        "currency_code": "USD",
        "redemption_type": "AUTOMATIC",
        "shipping_address": null,
        "current_uses": 0,
        "max_uses": null,
        "start_date": "2022-07-21T19:03:50+00:00",
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

<details>
  <summary>Buy extra-small or medium item and get free shipping to zone id 1 (Product Options Item Matcher)</summary>

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
}
```

<!--
type: tab
title: Request
-->

```json title="Example request" lineNumbers
{
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
<!--
type: tab
title: Response
-->

```json title="Example response" lineNumbers
{
    "data": {
        "id": 38,
        "name": "Buy extra-small or medium item and get free shipping to zone id 1",
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
                            1
                        ]
                    }
                },
                "apply_once": true,
                "stop": false,
                "condition": {
                    "cart": {
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
                }
            }
        ],
        "notifications": [],
        "stop": false,
        "currency_code": "USD",
        "redemption_type": "AUTOMATIC",
        "shipping_address": null,
        "current_uses": 0,
        "max_uses": null,
        "start_date": "2022-07-21T19:11:08+00:00",
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

<details>  
<summary>Buy extra-small blue or medium blue item and receive free shipping (Product Options Item Matcher)</summary>

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
}
```

<!--
type: tab
title: Request
-->

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
title: Response
-->

```json title="Example response" lineNumbers
{
    "data": {
        "id": 43,
        "name": "Buy extra-small blue or medium blue item and receive free shipping",
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
                            1
                        ]
                    }
                },
                "apply_once": true,
                "stop": false,
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
                }
            }
        ],
        "notifications": [],
        "stop": false,
        "currency_code": "USD",
        "redemption_type": "AUTOMATIC",
        "shipping_address": null,
        "current_uses": 0,
        "max_uses": null,
        "start_date": "2022-07-21T20:03:22+00:00",
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

## Shipping

<details>  
  <summary>Buy two of X and buy two of Y get free shipping to all zones start/end times AND operator</summary>

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
  "name": "Buy two of X and buy two of Y get free shipping to all zones",
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
                  118
                ]
              },
              "minimum_quantity": 2
            }
          },
          {
            "cart": {
              "items": {
                "variants": [
                  134
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
}
```

<!--
type: tab
title: Request
-->

```json title="Example request" lineNumbers
{
   "name": "Buy two of X and buy two of Y get free shipping to all zones",
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
                  118
                ]
              },
              "minimum_quantity": 2
            }
          },
          {
            "cart": {
              "items": {
                "variants": [
                  134
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

<!--
type: tab
title: Response
-->

```json title="Example response" lineNumbers
{
    "data": {
        "id": 54,
        "name": "Buy two of X and buy two of Y get free shipping to all zones",
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
                        "zone_ids": "*"
                    }
                },
                "apply_once": true,
                "stop": false,
                "condition": {
                    "and": [
                        {
                            "cart": {
                                "items": {
                                    "products": [
                                        118
                                    ]
                                },
                                "minimum_quantity": 2
                            }
                        },
                        {
                            "cart": {
                                "items": {
                                    "variants": [
                                        134
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
        "currency_code": "USD",
        "redemption_type": "AUTOMATIC",
        "shipping_address": null,
        "current_uses": 0,
        "max_uses": null,
        "start_date": "2019-02-06T05:00:00+00:00",
        "end_date": "2019-02-09T04:59:59+00:00",
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

<details>  
  <summary>Order at least X units of product Y, get free shipping to specific shipping zones</summary>

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
              129
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
}
```
<!--
type: tab
title: Request
-->

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
              129
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
<!--
type: tab
title: Response
-->

```json title="Example response" lineNumbers
{
    "data": {
        "id": 44,
        "name": "Order at least X units of product Y, get free shipping to specific shipping zones",
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
                                129
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
        "currency_code": "USD",
        "redemption_type": "AUTOMATIC",
        "shipping_address": null,
        "current_uses": 0,
        "max_uses": 50,
        "start_date": "2019-02-01T05:00:00+00:00",
        "end_date": "2019-02-05T04:59:59+00:00",
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

<details>  
  <summary>Order at least 2X of product get free shipping</summary>

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
  "name": "Order at least 2X of product get free shipping",
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
              129
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
}
```

<!--
type: tab
title: Request
-->

```json title="Example request" lineNumbers
{
  "name": "Order at least 2X of product get free shipping",
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
              129
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
title: Response
-->

```json title="Example response" lineNumbers
{
    "data": {
        "id": 45,
        "name": "Order at least 2X of product get free shipping",
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
                        "zone_ids": "*"
                    }
                },
                "apply_once": true,
                "stop": false,
                "condition": {
                    "cart": {
                        "items": {
                            "products": [
                                129
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
        "currency_code": "USD",
        "redemption_type": "AUTOMATIC",
        "shipping_address": null,
        "current_uses": 0,
        "max_uses": null,
        "start_date": "2019-02-06T05:00:00+00:00",
        "end_date": "2019-02-09T04:59:59+00:00",
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



## Storewide


<details>  
  <summary>10% off storewide except (NOT) 'Huggies', 'Munchkin' and 'Pampers' brand products</summary>

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
}
```

<!--
type: tab
title: Request
-->

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

<!--
type: tab
title: Response
-->

```json title="Example response" lineNumbers
{
    "data": {
        "id": 46,
        "name": "10% off storewide except (NOT) 'Huggies', 'Munchkin' and 'Pampers' brand products",
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
                    "cart_items": {
                        "discount": {
                            "percentage_amount": "10"
                        },
                        "strategy": "LEAST_EXPENSIVE",
                        "add_free_item": true,
                        "as_total": false,
                        "include_items_considered_by_condition": false,
                        "exclude_items_on_sale": false,
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
                "apply_once": true,
                "stop": false
            }
        ],
        "notifications": [],
        "stop": false,
        "currency_code": "USD",
        "redemption_type": "AUTOMATIC",
        "shipping_address": null,
        "current_uses": 0,
        "max_uses": null,
        "start_date": "2022-07-21T20:21:08+00:00",
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

