# Email Templates

<div class="otp" id="no-index">

### On This Page
- [Gift Certificate Email Template](#gift-certificate-email-template)
- [Abandoned Cart Email Template](#abandoned-cart-email-template)
- [Invoice Email Template](#invoice-email-template)
- [Order Status Email Template](#order-status-email-template)
- [Return Confirmation Email Template](#return-confirmation-email-template)

</div> 

The following variables are available within individual BigCommerce email template:

## Gift Certificate Email Template 

Sent to the recipient of a gift certificate.

### Available Variables 
||
|-|
| %%LNG_GiftCertificateEmailYouHaveReceived%% |
| %%GLOBAL_StoreName%% |
| %%LNG_Dear%% |
| %%GLOBAL_ToName%% |
| %%GLOBAL_Intro%% |
| %%GLOBAL_ExpiryInfo%% |
| %%LNG_GiftCertificateEmailInstructions%% |
| %%LNG_GiftCertificateEmailAttached%% |
| %%LNG_GiftCertificateEmailWarning%% |
| %%GLOBAL_EmailFooter%% |

## Abandoned Cart Email Template 

Sent when a customer abandons a shopping cart.

### Available Variables 
||
|-|
| %%GLOBAL_AC_EmailBody%%|
| %%GLOBAL_EmailFooter%%|
| %%GLOBAL_AC_UnsubscribeLink%%|
| %%LNG_AC_EmailUnsubscribe%%|
| %%LNG_AC_EmailUnsubscribeSuffix%%|

## Invoice Email Template 

Sent when a customer places an order.

### Available Variables 
||
|-|
| %%GLOBAL_NoPaymentTaken%%|
| %%LNG_ThanksForYourOrder%%|
| %%GLOBAL_IMG_PATH%%|
| %%LNG_YourOrderIDIs%%|
| %%GLOBAL_OrderNumber%%
| %%GLOBAL_ViewOrderStatusMsg%%|
| %%GLOBAL_PendingPaymentNotice%%|
| %%LNG_ShippingAddress%%|
| %%GLOBAL_ShippingAddress%%|
| %%GLOBAL_HideShippingEmail%%|
| %%LNG_Email%%|
| %%GLOBAL_ShippingEmail%%|
| %%LNG_BillingAddress%%|
| %%GLOBAL_BillingAddress%%|
| %%GLOBAL_HideBillingEmail%%|
| %%LNG_Email%%|
| %%GLOBAL_BillingEmail%%|
| %%GLOBAL_PendingPaymentDetails%%|
| %%GLOBAL_OrderCommentBlock%%|
| %%LNG_YourOrderContainsTheFollowingItems%%|
| %%GLOBAL_CartItemColumns%%|
| %%SNIPPET_CartItems%%|
| %%SNIPPET_TotalRows%%|
| %%SNIPPET_PaymentMethod%%|
| %%GLOBAL_EmailFooter%%|
| %%GLOBAL_ProductThumbImageURL%%|

## Order Status Email Template 

Sent when an order's status is changed.

### Available Variables 
||
|-|
| %%LNG_OrderStatusChanged%% |
| %%GLOBAL_OrderStatusChangedHi%% |
| %%LNG_OrderStatusChangedIntro%% |
| %%GLOBAL_OrderNumberStatusChangedTo%% |
| %%LNG_OrderDetails%% |
| %%LNG_OrderStatusChangedOrderTotal%% |
| %%GLOBAL_OrderTotal%% |
| %%LNG_OrderStatusChangedDatePlaced%% |
| %%GLOBAL_DatePlaced%% |
| %%LNG_OrderStatusChangedPaymentMethod%% |
| %%GLOBAL_PaymentMethod%% |
| %%LNG_ShipmentTrackingNumbersLinks%% |
| %%GLOBAL_TrackingLinkList%% |
| %%GLOBAL_ViewOrderStatusLink%% |
| %%GLOBAL_EmailFooter%% |

## Return Confirmation Email Template 

Sent when a customer submits a return request.

### Available Variables 
||
|-|
| %%LNG_NotificationConfirmationForReturn%% |
| %%GLOBAL_OrderId%% |
| %%GLOBAL_IMG_PATH%% |
| %%LNG_NotificationAReturnSummaryIsShownBelow%% |
| %%GLOBAL_ShopPath%% |
| %%LNG_ClickHere%% |
| %%LNG_ReturnReason%% |
| %%GLOBAL_ReturnReason%% |
| %%GLOBAL_HideReturnAction%% |
| %%LNG_ReturnAction%% |
| %%GLOBAL_ReturnAction%% |
| %%LNG_YourComments%% |
| %%GLOBAL_ReturnComments%% |
| %%LNG_NotificationYourReturnContainsTheFollowingItems%% |
| %%LNG_ReturnItems%% |
| %%LNG_Qty%% |
| %%SNIPPET_ReturnItems%% |
| %%GLOBAL_EmailFooter%% |
