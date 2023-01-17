# Create a Sandbox Store

Sandbox stores are intended for developing and testing apps. They cannot process any live transactions.

This article walks you through the steps of creating a sandbox store and explains how to open a support case if you encounter any issues.

## Creating a sandbox store

To create a sandbox store, complete the following steps:

1. Navigate to the [BigCommerce Partner Portal](https://partners.bigcommerce.com/) and sign in using your credentials.
2. After signing in, hover over **Create New** in the top navigation, then select one of the following two options:
   * To register a new deal and create an associated sandbox, select **Deal Registration** and consult the following instructions to [create a Deal Registration sandbox](#deal-registration-sandbox).
   * To create a sandbox for your own general use, select **Partner Use Sandbox** and consult the following instructions to [create a Partner Sandbox](#partner-use-sandbox).
  
![Create New menu](https://storage.googleapis.com/bigcommerce-production-dev-center/images/partner-portal/partner-portal-menu-create-new.png)

<!-- theme: warning -->
> #### Store regions are immutable
> You cannot update the store region of a partner sandbox.

### Deal Registration sandbox

After you click **Create New > Deal Registration** in the top navigation, complete the following steps:

1. On the **Create a Store/Register a Deal** page, complete all the required fields.

2. To ensure that your Deal Registration also includes a sandbox store, locate the **Create a Store?** field, then select **Partner Sandbox**.

![Deal Registration partner sandbox option](https://storage.googleapis.com/bigcommerce-production-dev-center/images/partner-portal/partner-portal-deal-registration-create-sandbox.png)

3. In the **Store Region** field, select the global region of best fit for your use case.

![Deal Registration select global region](https://storage.googleapis.com/bigcommerce-production-dev-center/images/partner-portal/partner-portal-deal-registration-select-region.png)

4. Below the **Create a Store?** field, select the checkbox to acknowledge that the **Store Region** value cannot be changed.

![Deal Registration acknowledge immutable global region](https://storage.googleapis.com/bigcommerce-production-dev-center/images/partner-portal/partner-portal-deal-registration-acknowledge-immutable.png)

5. Click **Submit**.

After you click **Submit**, you will receive two emails: 
* a Deal Registration confirmation email, and 
* an email that contains sign in credentials for the new sandbox.

For more about viewing and working with partner sandboxes, consult the following section on [accessing and managing partner sandboxes](#accessing-and-managing-partner-sandboxes).
  
### Partner Use sandbox

After you click **Create New > Partner Use Sandbox** in the top navigation, complete the following steps: 

1. On the **Create a Partner Sandbox** page, give the sandbox a name.
   
2. In the **Store Region** field, select the global region of best fit for your use case.

![Partner Use sandbox select global region](https://storage.googleapis.com/bigcommerce-production-dev-center/images/partner-portal/partner-portal-partner-sandbox-select-region.png)

3. Below the **Store Region** field, select the checkbox to acknowledge that the store region cannot be changed. 

![Partner Use sandbox acknowledge immutable global region](https://storage.googleapis.com/bigcommerce-production-dev-center/images/partner-portal/partner-portal-partner-sandbox-acknowledge-immutable.png)

4. Click **Submit**.

After you click **Submit**, you will receive an email that contains sign in credentials for the new sandbox.

For more about viewing and working with partner sandboxes, consult the following section on [accessing and managing partner sandboxes](#accessing-and-managing-partner-sandboxes).

## Accessing and managing partner sandboxes

Allow up to 15 minutes for the new store to appear in any list of stores.

The email that contains the sandbox credentials is sent only once. However, you can access the sandbox by signing in to the [BigCommerce account](https://login.bigcommerce.com/accounts/list) that uses the same email address as your Partner Portal account.

To review and manage your sandbox and trial stores in the Partner Portal, hover over **Reporting** in the top navigation, then click **Review Sandboxes & Trials**.

![Reporting menu](https://storage.googleapis.com/bigcommerce-production-dev-center/images/partner-portal/partner-portal-menu-reporting-review-sandboxes.png)

## Creating a support case

If you encounter trouble creating or managing partner sandboxes, you can create a partner-specific support case.

To create a partner-specific support case, complete the following steps:

1. Sign in to the [Partner Portal](https://partners.bigcommerce.com). 
2. In the top navigation, hover over **Support**, then click **Contact Support**.

![Contact Support menu](https://storage.googleapis.com/bigcommerce-production-dev-center/images/partner-portal/partner-portal-menu-support-contact.png)

3. On the **Contact Support** page, click the **Create a Support Case** card.

![Create support case card](https://storage.googleapis.com/bigcommerce-production-dev-center/images/partner-portal/partner-portal-menu-contact-support-create-case-1.png)

4. Indicate whether you need **Product Support** or **Billing Support**.

![Select support type](https://storage.googleapis.com/bigcommerce-production-dev-center/images/partner-portal/partner-portal-menu-contact-support-case-type-2.png)

5. When asked **Is this related to a specific store?**; answer **Yes**.

![Specific store](https://storage.googleapis.com/bigcommerce-production-dev-center/images/partner-portal/partner-portal-menu-contact-support-specific-store-3.png)

6. Enter the canonical URL of your sandbox store. For example, `https://store-xxxxxxxxx.mybigcommerce.com`. 

![Canonical URL](https://storage.googleapis.com/bigcommerce-production-dev-center/images/partner-portal/partner-portal-menu-contact-support-canonical-url-4.png)

7. Sign in to the [BigCommerce account](https://login.bigcommerce.com/accounts/list) that uses the same email address as your Partner Portal account.

8. At the bottom of the Admin panel, click **Help**, then locate the **Services & Support** section to connect with our support team using your desired mode of communication. 

## Resources

* [App Store Approval Requirements](/api-docs/partner/app-store-approval-requirements)
* [Partner Portal (BigCommerce)](https://partners.bigcommerce.com/) 
* [Getting Started with the Control Panel (Support)](https://support.bigcommerce.com/s/article/Getting-Started-with-the-New-Control-Panel)
