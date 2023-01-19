# Frequently Asked Questions (FAQ)

**1. Will the native, out-of-the-box Cornerstone theme support BOPIS as part of this initial launch?**

The native Cornerstone theme will not support BOPIS natively, for the foreseeable future. This is an intentional decision which has been informed by our customer research. From our conversations with mid-market / enterprise merchants, agency partners, technology partners and our surveys of the top IR100 retailers across North America, Europe and APAC, we've learned that there is no one universal BOPIS storefront, cart, and checkout experience. Each merchant tailors/customizes the experience to meet the needs of their business and their customer. Therefore, from a SaaS perspective, BigCommerce is in a position in which it will inevitably capture a small market, but simultaneously not meet the needs of the broader market, if it does implement a natively BOPIS solution within the checkout.

Therefore, to address this, we are prioritizing the development of APIs. This way BigCommerce equips and empowers you (the agency partner or technology partner) to build custom BOPIS experiences on the storefront and within the checkout to meet the customized needs of your clients.

In the future, we may revise this decision, based on merchant and partner feedback. However, for transparency, it is not our intent in the short-term future to enable this natively.

**2. Will the native, out-of-the-box Optimized One Page Checkout support BOPIS as part of this initial launch?**

The native Optimized One Page Checkout will not support BOPIS natively, for the foreseeable future. This is an intentional decision which has been informed by our customer research. From our conversations with mid-market / enterprise merchants, agency partners, technology partners and surveying the top IR100 retailers across North America, Europe and APAC, we've learnt that there is no one universal BOPIS storefront, cart & checkout experience. Each merchant tailors/customizes the experience to meet the needs of their business, and their customer. Therefore, from a SaaS perspective, BigCommerce is in a position where if it does implement a natively BOPIS solution within the checkout, it will inevitably capture a small market, but simultaneously not meet the needs of the broader market.

Therefore, to address this, we are prioritising the development of APIs. This way BigCommerce equips and empowers you (the agency partner or technology partner) to build custom BOPIS experiences on the storefront and within the checkout to meet the customized needs of your clients.

In the future, we may revise this decision, based on merchant and partner feedback. However, for transparency, it is not our intent in the short-term future to enable this natively.

**3. Will the BigCommerce Control Panel be updated to support BOPIS, as part of this initial launch?**

The BigCommerce Control Panel will not be updated to support BOPIS in this initial launch. This is an intentional decision which has been informed by our customer research.

Given the segment we are targeting, i.e. Mid-Market / Enterprise, we have learned that the partner system (e.g. OMS / IMS / ERP / POS) serves as the source of truth for order management. The behavioral insight is that the partner system is where their Customer Service Representative (CSR) team lives daily to perform order lifecycle actions (e.g. capturing payment, voiding transactions, order routing for fulfillment, refunding, etc).

Given this logic, we want to preserve that the partner system is the source of truth and also support (not disrupt) behavioural patterns. For this reason, we have deprioritized updates to our Control Panel, in favour of enabling such behaviours to continue in the partner system.

In the future, we will add basic functionality within the Control Panel predominantly within the Orders section to help with end-to-end traceability, i.e. a CSR may want to double check an order within BC, to ensure consistency with the ERP/OMS. Having basic UI indicators within the BigCommerce Control Panel to let them know that the order is for pick-up will ease their experience.

**4. When is inventory deducted within the checkout? Does BigCommerce support the concept of inventory deductions for orders in-flight / in-progress within the checkout?**

Inventory is not adjusted until a shopper has successfully paid for their order. This means that BigCommerce does not support the concept of deducting inventory for orders that are in-flight / in-progress within the cart or checkout. This keeps the logic clean and simple.

Assuming there is one unit of stock left, if a shopper is at any stage of the storefront / cart / checkout before they attempt payment in the checkout, and if another customer beats them to payment for the same item, then the original customer will encounter an out-of-stock message when they finally get to the payment step within checkout.

**5. Will BigCommerce support in-stock transfers**

BigCommerce will not support in-stock transfers. This is best handled within the partner system (e.g. OMS / ERP) which is the source of truth for inventory and order management.

**6. How will performing an order refund affect order consignments?**

Order Refunds will not affect order consignments.

**7. How will editing an order affect order consignments?**

When an order is edited (e.g. line item quantities changed, line items removed/added, shipping address changes), the order consignment will be modified to reflect these changes.

Note: An order can be edited at any time of the fulfillment lifecycle, i.e. an order can be edited regardless of whether the order has been fulfilled or not.
