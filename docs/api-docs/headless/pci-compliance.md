# PCI Compliance

This section covers the Payment Card Industry Data Security Standard compliance and your responsibilities as a third-party developer.

## What is PCI DSS

The Payment Card Industry Data Security Standard (**PCI DSS**) is a set of requirements designed to ensure that all companies that process, store, or transmit credit card information maintain a secure environment. For an in-depth guide to what PCI DSS is, how to achieve it for your business, and a compliance checklist, see [Everything You Need to Know About Achieving PCI Compliance](https://www.bigcommerce.com/articles/ecommerce/pci-compliance/).

## Who is responsible

BigCommerce is a PCI DSS compliant service provider and certifies annually [all requirements (1-12)](https://www.pcisecuritystandards.org/pci_security/standards_overview) including as a shared hosting provider. BigCommerce's [PCI DSS Attestation of Compliance (AOC)](https://support.mybigcommerce.com/content/dojo/BigCommerce_PCI_DSS_v3.2.1_AOC_2019_Service_Provider.pdf) describes the technology stack certified annually. 

Merchants can use BigCommerce's PCI DSS AOC to satisfy the compliance requirements for the part that outlines its responsibilities. To learn more about showing proof of compliance, see [Showing Compliance](https://support.bigcommerce.com/s/article/PCI-Compliance#how).

<!-- theme: info -->
> #### Note
> If your application handles credit card data, you will need to be PCI compliant. Submit self-assessment questionnaires (**SAQs**) to [compliance@bigcommerce.com](mailto:compliance@bigcommerce.com).


BigCommerce is responsible for maintaining secure handling of credit cards while the payment is en route from payment request to payment processors. Merchants, service providers, and other entities involved with payment card processing must never store sensitive authentication data after authorization. This includes the 3- or 4- digit security code printed on the front or back of a card, the data stored on a card's magnetic stripe or chip (also called “Full Track Data”) – and personal identification numbers (**PIN**) entered by the cardholder. As a third-party developer, it is your responsibility to program the storefronts and recurring billing apps in a PCI-compliant manner. If development affects the flow of sensitive credit card data, you will need to maintain a PCI compliance certification for third-party service providers certified by an external Qualified Security Assessor (**QSA**). For information on processing payments and PCI compliance, see [PCI compliance (Payments API)](/api-docs/store-management/payment-processing#pci-compliance).

The following table outlines PCI compliance responsibilities based on the type of integration.

**Responsibility matrix**

| |BigCommerce Responsibility |Merchant Responsibility |
|--|--|--|
| BigCommerce as a storefront and backend | Responsible for all [PCI DSS requirements (1-12)](https://www.pcisecuritystandards.org/pci_security/maintaining_payment_security) of the product to the point that it has control of merchants' stores. | Responsible for ensuring that all modifications that result in external calls to or integrations with outside parties are done in a PCI DSS compliant manner. |
||| Responsible for ensuring all design modifications are done in a PCI DSS compliant manner.|
||| Responsible for ensuring that all service providers it uses are compliant with PCI DSS.|
| BigCommerce as a backend (headless integrations or the [BigCommerce WordPress Plugin](https://wordpress.org/plugins/bigcommerce/)) | Responsible for all PCI DSS requirements from the point at which cardholder data is handed to a BigCommerce controlled interface. (see [BigCommerce Attestation of PCI DSS 2021-2022](https://support.mybigcommerce.com/content/dojo/BigCommerce_2021_PCI_DSS_v3_2_1_Service_Provider_AOC-1.pdf)) | Responsible for the PCI DSS compliance of its storefront plus all of the above. |
| Checkout and Payments SDK | Not responsible. </br> The way your business consumes the SDKs (either BigCommerce as a storefront and backend, or BigCommerce as a backend) would determine BigCommerce's responsibilities. | Responsible for the PCI DSS compliance requirements applicable, as stated in BigCommerce as a storefront or BigCommerce as a backend.|
| Checkout and Payments API | Not responsible. </br> The way your business consumes the SDKs (either BigCommerce as a storefront and backend, or BigCommerce as a backend) would determine BigCommerce's responsibilities. |  Responsible for the PCI DSS compliance requirements applicable, as stated in BigCommerce as a storefront or BigCommerce as a backend. |

<!-- theme: info -->
> #### Note
> The way your business consumes the SDKs (either BigCommerce as a storefront and backend or BigCommerce as a backend ) determines BigCommerce's  responsibilities; It is possible to use one more of BigCommerce's technology stack at the same time. Your PCI DSS compliance responsibilities will be a combination of each stack consumed.



## Resources

- [Maintaining Payment Security](https://www.pcisecuritystandards.org/pci_security/maintaining_payment_security)
- [Merchants Classification Levels Visa](https://usa.visa.com/support/small-business/security-compliance.html#3)
- [Merchants Classification Levels Mastercard](https://www.mastercard.us/en-us/merchants/safety-security/security-recommendations/merchants-need-to-know.html)
- [Payments API](/api-docs/store-management/payment-processing)
- [Self Assessment Questionnaire (SAQ) Types and Identifying which SAQ is for you](https://www.pcisecuritystandards.org/documents/SAQ-InstrGuidelines-v3_2_1.pdf?agreement=true&time=1562173376464)
