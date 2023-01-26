# StagingPro

StagingPro is a full-service sandbox, testing, staging, and CI/CD solution for **Enterprise-level** BigCommerce stores. 

It uses Git, BigCommerce's APIs, and StagingPro's public API to provide an auditable solution. It also solves access control problems; it is easier to develop features and work with store data without giving the development team access credentials to the production store.

To add StagingPro to a store or set of stores, connect with your BigCommerce representative.

Consult [the resources section](#resources) for links to more in-depth documentation.

## Selected use cases

StagingPro can help developers, designers, merchants, and other team members. Its applications are not limited to the following; consult [StagingPro's documentation](#resources) to learn how you can implement it to benefit your store or client.

### Development

StagingPro lets developers do the following:

* Test API-based applications in a store with an identical environment
* Show merchants and other non-technical stakeholders the effects of changes before deployment
* Straightforwardly debug errors that involve data properties using copies of the same objects


### UI/UX design

StagingPro has the following advantages for frontend design and development:

* Staging theme changes, then deploying them through the StagingPro UI or as part of a CI/CD pipeline
* Doing internal A/B testing and evaluation, then deploying the selected UI/UX changes

### Store management

With StagingPro, you can stage changes to a store's data. For example, you can add new products and run tests to verify their properties behave as expected. Once the data is ready, you can sync StagingPro with the production store.

You can use StagingPro to migrate a store from Catalog V2 to V3, test the store's functional logic against the changes, and sync the catalog changes at the same time you deploy related changes to store scripts and applications.

## Frequently Asked Questions

Users have asked the following questions:

### When you use StagingPro to create a staging environment, are the record IDs for customers and products exactly the same as the production site?

No. However, for different use cases, you can use the StagingPro UI to automatically update the business logic that associates SKUs with category names, hierarchies, brands, etc.

### If a StagingPro sandbox is provisioned in one geographical region, but should be in another, how do you fix that? 

Work with your sales rep to re-provision the sandbox and install the StagingPro app for the correct region.

### Can StagingPro support scheduled deployments to multiple storefronts using different time zones?

The StagingPro app displays the store's time zone in its scheduling view. To deploy to a storefront in a different time zone, determine what time it will be for the store at the time you want the changes to appear on the subject storefront, then schedule the deployment using the calculated time. If you use a third-party API to perform the calculations, you must account for daylight savings time. To learn more about store time, see our Help Center article on [Date and Timezone Settings](https://support.bigcommerce.com/s/article/Date-and-Timezone-Settings).

## Resources

* [StagingPro API Reference (StagingPro)](https://www.apimatic.io/apidocs/stagingpro/v/1_0#/rest/step-by-step-tutorial)
* [StagingPro API Documentation (StagingPro)](https://stagingpro.atlassian.net/wiki/spaces/STAGINGPRO/overview)
* [StagingPro Service Status (StagingPro)](https://monitor.stagingpro.com/)

