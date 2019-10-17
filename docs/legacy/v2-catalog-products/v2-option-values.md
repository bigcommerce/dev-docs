# Option Values

<div class="otp" id="no-index">

### On This Page
- [Option Values](#option-values)
- [List Option Values](#list-option-values)
- [Get an Option Value](#get-an-option-value)
- [Create an Option Value](#create-an-option-value)
- [Update an Option Value](#update-an-option-value)
- [Delete an Option Value](#delete-an-option-value)
- [Delete Multiple Option Values](#delete-multiple-option-values)

</div> 

## Option Values 

Values that can be selected for an option.

### Option Value Object – Properties 

| Name | Type | Description |
|  |  |  |
| id | int | A unique, read-only value that identifies this option value. |
| option_id | int | A read-only value identifying the option to which this option value is assigned. |
| label | string | The name of the label. Cannot be the same as the label of another value already assigned to the option. |
| sort_order | int |
| value | text | Acceptable values generally depend on the option type, as defined in the option:<br><br> `RB`: string to be displayed to the customer.<br> `RT`: string to be displayed to the customer.<br> `S`: string to be displayed to the customer.<br> `P`: product ID;<br> `PI`: product ID.<br> `CS`: one of the following color values – a hexadecimal color code to create a color option (e.g., `#0f0000`);<br> a CSS 2.1 color name (e.g., `blue`);<br> up to three hexadecimal color codes and/or color names, separated by pipe symbols (e.g., <code>#FF0000&#124;lime&#124;#0000FF</code>);<br>  a URI to an image to create a texture (e.g., `http://store.com/images/myimg.png`);<br> or the name of an image file in the store's WebDAV `import` folder  (e.g., `myimg.png`). |
| is_default | boolean | Whether or not this value is selected by default. For each option, only one option value can be selected by default. |

## List Option Values 

Gets the values belonging to an option. (Default sorting is by option-value id, from lowest to highest.)

>`GET /stores/{store_hash}/v2/options/{option_id}/values`

### Pagination 

Parameters can be added to the URL query string to paginate the collection. The maximum limit is 250. If a limit isn’t provided, up to 50 option_values are returned by default.

| Parameter | Type | Example |
|  |  |  |
| Page | int | /api/v2/options/{option_id}/values?page={number} |
| Limit | int | /api/v2/options/{option_id}/values?limit={count} |

### Response 

Example JSON returned in the response:

```
[
  {
    "id": 1,
    "option_id": 3,
    "label": "Silver",
    "sort_order": 2,
    "value": "#cccccc",
    "is_default": true
  },
  {
    "id": 2,
    "option_id": 3,
    "label": "Black",
    "sort_order": 1,
    "value": "#000000",
    "is_default": false
  }
]
```

## Get an Option Value 

Gets an option value.

>`GET /stores/{store_hash}/v2/options/{option_id}/values/{id}`

### Response 

Example JSON returned in the response:

```json
{
  "id": 9,
  "option_id": 3,
  "label": "Purple",
  "sort_order": 3,
  "value": "#700170",
  "is_default": false
}
```

## Create an Option Value 

Creates a new option value.

>`POST /stores/{store_hash}/v2/options/{option_id}/values`

### Read-only Properties 

The following properties of the option value are read-only. If one or more of these properties are included in the request, it will be rejected.

*   id
*   option_id

### Requirements 

The following properties of the option value are required. The request won’t be fulfilled unless these properties are valid.

*   label
*   value

### Notes 

To maximize system performance, BigCommerce caps the total number of values per option at 250. IF the option has 250 values and you try to create another one, BigCommerce will return a 403 error.

When you POST an `is_default`property of `true`, all other option values on the parent option will have their `is_default` property set to `false`.

### Request 

Example request object:

```json
{
  "label": "white",
  "sort_order": 0,
  "value": "#FFFFFF",
  "is_default": true
}
```

### Response 

Example JSON returned in the response:

```json
{
  "id": 68,
  "option_id": 3,
  "label": "white",
  "sort_order": 0,
  "value": "#FFFFFF",
  "is_default": true
}
```

## Update an Option Value 

Updates an existing option value.

>`PUT /stores/{store_hash}/v2/options/{option_id}/values/{id}`

###  Read-only Properties

The following properties of the option value are read-only. If one or more of these properties are included in the request, it will be rejected.

*   id
*   option_id

### Requirements 

The following properties of the option value are required. The request won’t be fulfilled unless these properties are valid.

###  Notes

When you PUT an `is_default` property of `true`, all other option values on the parent option will have their `is_default` property set to `false`.

### Request 

Example request object:

```json
{
  "label": "whitish",
  "sort_order": 1,
  "value": "#FFFFEF",
  "is_default": true
}
```

### Response 

Example JSON returned in the response:

```json
{
  "id": 68,
  "option_id": 3,
  "label": "whitish",
  "sort_order": 1,
  "value": "#FFFFEF",
  "is_default": true
}
```

## Delete an Option Value 

Deletes an option value.

>`DELETE /stores/{store_hash}/v2/options/{option_id}/values/{id}`

## Delete Multiple Option Values 

Deletes multiple values belonging to an option.

>`DELETE /stores/{store_hash}/v2/options/{option_id}/values`

### Pagination 

Parameters can be added to the URL query string to paginate the collection. The maximum limit is 250. If a limit isn’t provided, up to 50 option_values are returned by default.

| Parameter | Type | Example |
|  |  |  |
| Page | int | /api/v2/options/{option_id}/values?page={number} |
| Limit | int | /api/v2/options/{option_id}/values?limit={count} |
