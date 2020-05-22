# Channel App Best Practices

<div class="otp" id="no-index">

### On this Page

- [Modular Features](#modular-features)
- [Syncing](#syncing)
- [Performance](#performance)
- [Logging](#logging)
- [Resources](#resources)

</div>

To enable the best user experience, below are a few items to keep in mind when developing a BigCommerce Channel App.

## Modular Features

As the specific needs of every merchant is different, the features of your app should be as ‘modular’ as possible.

### For Merchants
Consider the audience and various use cases for your application:
* **Merchant A**: only interested in importing products and inventory.
* **Merchant B**: interested in a bi-directional integration of products and sales that keeps data between the channel and BigCommerce in sync.

Merchants should have the option to opt-in or out of the various features of your application.

### For Support
If an issue occurs, a merchant should have the option to disable a specific feature that may not be behaving as expected.  The idea here is to allow the merchant to continue using the features that are functional while temporarily resolving an issue - instead of having to disable the application completely.

## Syncing
For the various features of your application, it is typically a best practice to offer both a manual 'one time sync' option and automated sync options (based on various sync intervals).

This will provide the merchant with more control over what is synced and when.

**Example Automated Sync Intervals:**
* **Do not update automatically**:  The merchant should have an option to opt-out of automatic syncs.
* **Every X Minutes**:  This would trigger the associated event every x minutes.
* **Real Time**:  This would utilize webhooks to provide ‘real time’ updates.

## Performance
To provide merchants with a positive integration experience, we expect point of sale applications to meet or exceed the following benchmark:

* **Catalog Import / Export: ** 100 Complex Products per Second.

**Note**:  this volume of requests per second may hit the rate limits of lower tier BigCommerce plans - logic should be implemented around the response headers to ensure your application does not exceed the allowable number of requests for a given storefront.

For increased performance, consider using batch operations and parallel requests when possible.

## Logging
A log of all events should be kept and made accessible to the merchant utilizing the application.
Logs should be broken out per service.  For example:  On the app page where a user would go to interact with product import functionality - they would expect to find all logs relating to that specific feature.

Logs should be provided in a light, human-readable format and appended to the running feed of logs:

```
20 Products Identified - 5 Products Created - 15 Products Updated - 0 Errors   |   12/10/19 @ 3:45PM CST
```

The merchant should also have the option to download verbose logs in CSV format:

```
POS ID, BC ID, EVENT
34, 103, Product Created
35, --, Error: Product Creation Skipped [Invalid product name]
```

These logs would provide more granular details on the event that took place and all affected products.

## Resources
* [Channels Overview]()
* [Channels Toolkit Reference]()
* [Channels App Requirements]()