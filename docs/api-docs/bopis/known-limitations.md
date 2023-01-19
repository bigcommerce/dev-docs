# Known Limitations and Additional Details

### Table of contents

- [1.0 Known conditions](#10-known-conditions)
- [2.0 System limits](#20-system-limits)
- [3.0 Catalog and inventory updates](#30-catalog-and-inventory-updates)
- [4.0 Opting out of the BOPIS Open Beta](#40-opting-out-of-the-bopis-open-beta)
- [5.0 Out of scope](#50-out-of-scope)

As you participate in the Open Beta, we want to proactively let you know of some of the nuances of what has been built and supported to date.

## 1.0 Known conditions
There are certain conditions associated with the Open Beta of BOPIS:

### 1.1 Inventory management
- All the newly introduced Inventory APIs are asynchronous in nature. As such there may be a short delay between the time of calling an endpoint and the underlying data being updated. Endpoints that manage locations and inventory at those locations will return a `transaction_id` for any write requests.
- There is currently a known limitation with the Create Locations endpoint where the ID for the created location is not discoverable in the API response.

### 1.2 Location management
#### 1.2.1 Location states
- Currently, the `enabled` and `storefront_visibility` flags on the Location object do similar things.
- Both flags determine if a a location will return through any of the Storefront APIs, including getting available pickup methods.
- They also determine if any stock for products at a location contribute to the "available to sell" total returned via Storefront APIs.
- The intent is to have `storefront_visiblity` continue to control location visibility/readability, and by extension stock availability, through the Storefront APIs.
- However, the `enabled` flag will additionally also control whether a location is usable for the creation of orders and pickup methods and editing of stock levels using the management APIs.
- For example, a location can be "enabled", allowing it to be used for fulfillment purposes through the Order V2 or Checkout APIs, but have its `storefront_visibility` set to false, meaning that the details of that location are omitted from the Storefront APIs, and the quantities at that location are excluded from the "available to sell" calculations.


#### 1.2.2 Localized location time formats
- Currently, the opening hours and special operating hours for locations are formatted in 24-hour format, using a colon ( : ) as the the hour and minute separator.
- We are aware that time formatting is a piece of a localized experience. We, however, did not include it in scope in the Open Beta, as our hypothesis was that the current formatting is universally understood, and thus functionally enabling, not blocking. We will, however, prioritize localizing time formats in the future relative to all other enhancements we need to make.

### 1.3 Themes experience
BigCommerce’s Native Theme (Cornerstone) was not updated to support BOPIS as part of this Open Beta. We intend on updating it in the future.

### 1.4 Cart and checkout experience
- The **Legacy Checkout** will not support BOPIS concepts, as it is no longer supported or maintaned by BigCommerce.
- The **Native Checkout** (Optimized One Page Checkout) will not support BOPIS concepts out of the box during the Open Beta. We intend on supporting this natively in the future.
- The **Open Checkout** will not support BOPIS concepts out of the box during the Open Beta. We intend on supporting this natively in the future.

### 1.5 Control panel UI experience
- We are iteratively and incrementally adding Control Panel UI experience over 2022. 
- As part of this Open Beta, you will experience:
  - A new UI dedicated to location management
  - An updated Orders UI to expose pickup consignment information (e.g. pickup method, location) and location concepts

### 1.6 Payment providers
- We have tested and confirmed that BOPIS transactions are supported by Stripe V3 and PayPal powered by Braintree, through custom checkouts.
- Support for additional payment providers will be incrementally added over time.

## 2.0 System limits

### 2.1 Location management
There will be two levels of limits applied on locations.

- **System limits** - The maximum number of locations that the BigCommerce platform can support per store, without compromising the merchant and shopper experience. This system limit will be further refined once we complete performance testing, but we are will start with a hard limit of 1000 locations (retail, warehouse, etc) per store. Our belief is that only the most sophisticated retailers would have operations of this scale (e.g. Best Buy, JB Hi-Fi, The Good Guys, Bunnings, The Chemist Warehouse, PetCo). Whilst BigCommerce aspires to serve this segment of the Enterprise market, a maximum of 1000 locations per store will be an ample quantity with which to begin.
- **Pricing-plan limits** - The maximum number of locations that are made available to a merchant based on their pricing plan tier. This is currently being worked through.

### 2.2 Inventory management
* The maximum inventory quantity (per SKU/variant per location) will be 200K units. 
    - Using a shirt as an example, the merchant (via the CP UI) and a developer (via the API) will be able to enter a maximum of 200K units per variant of the shirt, e.g. 200K red small shirts and 200K blue large shirts at a single location.
* The maximum inventory quantity (summed across all SKUs/variants for a single product) stored in a single location will be 120M units. 
    - Continuing with the shirt example, the merchant (via the CP UI) and a developer (via the API) will be able to store a maximum of 120M units for this shirt (including all of its variants) at a single location.


## 3.0 Catalog and inventory updates
- To date, you have used the Catalog APIs to manage inventory. 
- As part of this Open Beta you will need to use the new Inventory APIs to manage inventory.

### 3.1 Writing inventory
- The new Inventory APIs should be used to manage inventory for a store's catalog. 
- Using the existing Catalog APIs to add or update inventory will not be supported.

### 3.2 Reading inventory
You will still be able to read an inventory value for products via the v2/v3 endpoints. However the behavior will change slightly. The inventory returned from the Catalog API will be the total inventory available to sell for the merchant. This provides limited backwards compatibility with any apps or integrations that facilitate selling a merchants products on external sales channels, such as Amazon.


## 4.0 Opting out of the BOPIS Open Beta
Opting out of the BOPIS Open Beta for new and existing stores may result in a loss of data (stock levels, warning levels, order information), because the underlying inventory system is completely independent and we make no attempt to duplicate data written under BOPIS, back to the older system.


## 5.0 Out of scope
- **Checkout routing logic API**
  - Such an API allows routing logic within an ERP/OMS to be exposed in the BigCommerce Checkout, to drive routing logic & thus shipping quote generation in the Checkout.
  - This is out of scope (for this release) because there is immaterial merchant demand for this capability for several reasons:
    - It adds further complex in the checkout which can negatively impact conversion.
    - Shipping costs can be a conversion killer. It's simpler to offer flat-rate shipping or free shipping to customers to keep the shopper experience clean and simple, and drive conversion.
    - The merchant already uses a shipping partner who handles this complexity.
- **Mixed consignment orders**
  - A mixed consignment order is one which is made up of different types of consignments. A subset of products in the order may be pickup, whilst another subset of products in the order may be delivered.
- **Multiple pickup consignment orders (i.e., Partial Pickups)**
  - A multiple pickup consignment order is one where a subset of products in the order is picked up from one location, and another subset of products in the order is picked up from an entirely different location.
  - In this release, we will only allow one consignment with a single pickup location.
  - Multiple destination shipping addresses will still be supported, as is today.
- **Multiple shipping origins**
  - This initial release primarily focuses on releasing BOPIS and pick up in store capability via the API. We will focus on being able to quote shipping rates from multiple shipping origins in future phases with our partners.
- **Multi-channel awareness**
  - This initial release primarily focuses on releasing BOPIS and pick up on a single storefront channel. We will then dove-tail this capability into a multi-channel context in a future phase, allowing different warehouse locations and inventory to service different storefront channels.
- **In-stock transfers**
  - BigCommerce will not support in-stock transfers. This is best handled within the partner system (e.g. OMS / ERP) which is the source of truth for inventory and order management.