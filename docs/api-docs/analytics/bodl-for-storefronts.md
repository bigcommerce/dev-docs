# Big Open Data Layer for Storefront Analytics

The Big Open Data Layer (shortened as BODL, pronounced 'Bottle') is a JavaScript object that allows you to transport data from a Bigcommerce-hosted storefront to third-party analytic providers. This data layer exposes storefront data points to BigCommerce and third-party analytics integrations. Using BODL on a BigCommerce-hosted storefront ensures that analytics providers have access to consistent, clean page data and makes a site more efficient. Because BODL consolidates data of interest and presents it as a package, each analytics script does not need to independently fetch the same data.

BODL currently transports data for storefront events that are triggered by a shopper. BigCommerce checks your storefront for a BODL instance once per page render. To ensure that the analytics providers you've chosen have the complete and correct set of data points they require, a merchant must enable BODL through the store control panel so that each storefront page window subscribes to BODL events. As a developer, you can then access storefront data after a shopper triggers a BODL event. 

This guide shows you how to get started using BODL data in your integration. The first section describes the standard BODL schema after shopper triggers a specified event, so that you can see how BODL organizes information for your integration to capture. The remainder provides example scripts for using the standard BODL object, displaying BODL parameters into the browser console or supplying data to third-party analytics engines. You can inject JavaScript snippets into a BigCommerce-hosted storefront using the Script Manager or the Scripts API.

## Standard BODL schema

### BODL schema after start checkout event

### BODL schema after purchase order event

## Using BODL 

### Display BODL parameters in the browser console 

### Transport data to a third-party analytic provier 

The following is an example of how to supply data from BODL to a third-party analytic provider (GA4). This script is an example usage of BODL, as methods and syntax vary between analytics engine providers. 

## Resources