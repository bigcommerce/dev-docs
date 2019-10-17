# Option Set Options

<div class="otp" id="no-index">

### On This Page
- [Option Set Options](#option-set-options)
- [List Option Set Options](#list-option-set-options)
- [Get an Option Set Option](#get-an-option-set-option)
- [Create an Option Set Option](#create-an-option-set-option)
- [Update an Option Set Option](#update-an-option-set-option)
- [Delete an Option Set Option](#delete-an-option-set-option)
- [Delete Multiple Option Set Options](#delete-multiple-option-set-options)

</div> 

##  Option Set Options 

Options belonging to an option set.

### Option Set Option: Object – Properties 

| Name | Type | Description |
|  |  |  |
| id | int | The ID of this option. |
| option_id | int | The ID of the option to which this option set connects. |
| option_set_id | int | The ID of this option set. |
| display_name | string | The friendly name used for this option set. |
| sort_order | int | The order in which the option is displayed on the product page. |
| is_required | boolean | Specifies whether customer is required to enter a value for this option before they can add the product to their cart. |
| option | resource | The connected option. |
| values | object_array | Array of values for the connected option. |




<a href='#v2-option-set-options_list-option-set-option' aria-hidden='true' class='block-anchor'  id='v2-option-set-options_list-option-set-option'><i aria-hidden='true' class='linkify icon'></i></a>

## List Option Set Options 

Gets the options associated with an option set. (Default sorting is by option id, from lowest to highest.)

>`GET /stores/{store_hash}/v2/option_sets/{option_set_id}/options`

### Pagination 

Parameters can be added to the URL query string to paginate the collection. The maximum limit is 250. If a limit isn’t provided, up to 50 option_set_options are returned by default.

| Parameter | Type | Example |
|  |  |  |
| Page | int | /api/v2/option_sets/{option_set_id}/options?page={number} |
| Limit | int | /api/v2/option_sets/{option_set_id}/options?limit={count} |

### Response 

Example JSON returned in the response:

```
[
  {
    "id": 43,
    "option_id": 18,
    "option_set_id": 14,
    "display_name": "Size",
    "sort_order": 0,
    "is_required": true,
    "option": {
      "url": "https://example.com/api/v2/options/18.json",
      "resource": "/options/18"
    },
    "values": [
      {
        "label": "XS",
        "sort_order": 0,
        "value": "XS",
        "option_value_id": 68
      },
      {
        "label": "S",
        "sort_order": 1,
        "value": "S",
        "option_value_id": 69
      },
      {
        "label": "M",
        "sort_order": 2,
        "value": "M",
        "option_value_id": 70
      },
      {
        "label": "L",
        "sort_order": 3,
        "value": "L",
        "option_value_id": 71
      },
      {
        "label": "XL",
        "sort_order": 4,
        "value": "XL",
        "option_value_id": 72
      }
    ]
  },
  {
    "id": 44,
    "option_id": 3,
    "option_set_id": 14,
    "display_name": "Color",
    "sort_order": 1,
    "is_required": true,
    "option": {
      "url": "https://example.com/api/v2/options/3.json",
      "resource": "/options/3"
    },
    "values": [
      {
        "label": "Silver",
        "sort_order": 1,
        "value": "#cccccc",
        "option_value_id": 7
      },
      {
        "label": "Black",
        "sort_order": 2,
        "value": "#000000",
        "option_value_id": 8
      },
      {
        "label": "Purple",
        "sort_order": 3,
        "value": "#700170",
        "option_value_id": 9
      }
    ]
  }
]
```



<a href='#v2-option-set-options_get-option-set-option' aria-hidden='true' class='block-anchor'  id='v2-option-set-options_get-option-set-option'><i aria-hidden='true' class='linkify icon'></i></a>

## Get an Option Set Option 

Gets an option set option.

>`GET /stores/{store_hash}/v2/option_sets/{option_set_id}/options/{id}`

### Response 

Example JSON returned in the response:

```json
{
  "id": 4,
  "option_id": 5,
  "option_set_id": 2,
  "display_name": "Clock Speeds (CPU)",
  "sort_order": 0,
  "is_required": true,
  "option": {
    "url": "https://example.com/api/v2/options/5.json",
    "resource": "/options/5"
  }
}
```



<a href='#v2-option-set-options_create-option-set-option' aria-hidden='true' class='block-anchor'  id='v2-option-set-options_create-option-set-option'><i aria-hidden='true' class='linkify icon'></i></a>

## Create an Option Set Option 

Creates a new option associated with an option set.


>`POST /stores/{store_hash}/v2/option_sets/{option_set_id}/options`


### Read-only Properties 

The following properties of the option set option are read-only. If one or more of these properties are included in the request, it will be rejected.

*   id
*   option_set_id
*   values
*   option

### Requirements 

The following properties of the option set option are required. The request won’t be fulfilled unless these properties are valid.

*   option_id

### Request 

Example request object:

```json
{
  "option_id": 10,
  "display_name": "Choose a color",
  "sort_order": 1,
  "is_required": true
}
```

### Response 

Example JSON returned in the response:

```json
{
  "id": 2,
  "option_id": 10,
  "option_set_id": 1,
  "display_name": "Choose a color",
  "sort_order": 1,
  "is_required": true,
  "option": {
    "url": "https://example.com/api/v2/options/10.json",
    "resource": "/options/10"
  }
}
```

<a href='#v2-option-set-options_update-option-set-option' aria-hidden='true' class='block-anchor'  id='v2-option-set-options_update-option-set-option'><i aria-hidden='true' class='linkify icon'></i></a>

## Update an Option Set Option 

Updates an existing option set option.

>`PUT /stores/{store_hash}/v2/option_sets/{option_set_id}/options/{id}`

### Read-only Properties 

The following properties of the option set option are read-only. If one or more of these properties are included in the request, it will be rejected.

*   id
*   option_id
*   option_set_id
*   values
*   option

### Requirements 

The following properties of the option set option are required. The request won’t be fulfilled unless these properties are valid.

### Request 

Example request object:

```json
{
  "display_name": "Pick a color...",
  "sort_order": 2,
  "is_required": false
}
```

### Response 

Example JSON returned in the response:

```json
{
  "id": 2,
  "option_id": 10,
  "option_set_id": 2,
  "display_name": "Pick a color...",
  "sort_order": 2,
  "is_required": false,
  "option": {
    "url": "https://example.com/api/v2/options/10.json",
    "resource": "/options/10"
  }
}
```



<a href='#v2-option-set-options_delete-option-set-option' aria-hidden='true' class='block-anchor'  id='v2-option-set-options_delete-option-set-option'><i aria-hidden='true' class='linkify icon'></i></a>

## Delete an Option Set Option 

Deletes an option belonging to an option set.

>`DELETE /stores/{store_hash}/v2/option_sets/{option_set_id}/options/{id}`



<a href='#v2-option-set-options_delete-multiple-option-set-option' aria-hidden='true' class='block-anchor'  id='v2-option-set-options_delete-multiple-option-set-option'><i aria-hidden='true' class='linkify icon'></i></a>

## Delete Multiple Option Set Options 

Deletes multiple options associated with an option set.

>`DELETE /stores/{store_hash}/v2/option_sets/{option_set_id}/options`

### Pagination 

Parameters can be added to the URL query string to paginate the collection. The maximum limit is 250. If a limit isn’t provided, up to 50 option_set_options are returned by default.

| Parameter | Type | Example |
|  |  |  |
| Page | int | /api/v2/option_sets/{option_set_id}/options?page={number} |
| Limit | int | /api/v2/option_sets/{option_set_id}/options?limit={count} |

