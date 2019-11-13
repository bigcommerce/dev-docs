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
| Variable | Description |
|-||
| %%LNG_GiftCertificateEmailYouHaveReceived%% | "You have received a Gift Certificate for" |
| %%GLOBAL_StoreName%% | The name of the store. |
| %%LNG_Dear%% | "Dear" |
| %%GLOBAL_ToName%% | The name of the gift certificate recipient. |
| %%GLOBAL_Intro%% | "%s has sent you a %s gift certificate for %s." |
| %%GLOBAL_ExpiryInfo%% | "You have until %s to use this gift certificate before it expires." |
| %%LNG_GiftCertificateEmailInstructions%% | "For instructions on how to redeem your gift certificate please <a href='%s/giftcertificates.php?action=redeem'>click here</a>." |
| %%LNG_GiftCertificateEmailAttached%% | "Your gift certificate is attached to this email." |
| %%LNG_GiftCertificateEmailWarning%% | "Please download or print a copy of your gift certificate for safe keeping as gift certificates are non-transferable." |
| %%GLOBAL_EmailFooter%% | "<b>%s</b><br><a href="%s.mybigcommerce.com/">http://%s.mybigcommerce.com/</a><br>%s is powered by BigCommerce. <a href="bigcommerce.com">Launch your own store for free</a> with BigCommerce." |

## Abandoned Cart Email Template

Sent when a customer abandons a shopping cart.

### Available Variables
| Variable | Description |
|-|-|
| %%GLOBAL_AC_EmailBody%%| "Hi %s,<br>You recently visited our online store and we noticed that you didn't complete your order for the following items:" |
| %%GLOBAL_EmailFooter%%| "<b>%s</b><br><a href="%s.mybigcommerce.com/">http://%s.mybigcommerce.com/</a><br>%s is powered by BigCommerce. <a href="bigcommerce.com">Launch your own store for free</a> with BigCommerce." |
| %%GLOBAL_AC_UnsubscribeLink%%| Link to unsubscribe page associated with the store. |
| %%LNG_AC_EmailUnsubscribe%%| "Unsubscribe" |
| %%LNG_AC_EmailUnsubscribeSuffix%%| " from future emails like this" |

## Invoice Email Template

Sent when a customer places an order.

### Available Variables
| Variable | Description |
|-|-|
| %%GLOBAL_NoPaymentTaken%%| . |
| %%LNG_ThanksForYourOrder%%| "Thanks for Your Order" |
| %%GLOBAL_IMG_PATH%%| The URI of the directory in which the site’s image files reside. |
| %%LNG_YourOrderIDIs%%| "Your order ID is" |
| %%GLOBAL_OrderNumber%%| "Order Number" |
| %%GLOBAL_ViewOrderStatusMsg%%| "To view the status of your order <a href="%s.mybigcommerce.com/orderstatus.php">click here</a>." |
| %%GLOBAL_PendingPaymentNotice%%| . |
| %%LNG_ShippingAddress%%| "Shipping Address" |
| %%GLOBAL_ShippingAddress%%| The customer's shipping address. |
| %%GLOBAL_HideShippingEmail%%| . |
| %%LNG_Email%%| "Email" |
| %%GLOBAL_ShippingEmail%%| . |
| %%LNG_BillingAddress%%| "Billing Address" |
| %%GLOBAL_BillingAddress%%| The customer's billing address. |
| %%GLOBAL_HideBillingEmail%%| . |
| %%LNG_Email%%| "Email" |
| %%GLOBAL_BillingEmail%%| . |
| %%GLOBAL_PendingPaymentDetails%%| . |
| %%GLOBAL_OrderCommentBlock%%| The text a customer entered in the order comment box. |
| %%LNG_YourOrderContainsTheFollowingItems%%| "Your Order Contains..." |
| %%GLOBAL_CartItemColumns%%| Column for cart items. |
| %%SNIPPET_CartItems%%| Names of the items the customer ordered. |
| %%SNIPPET_TotalRows%%| Subtotal and grand total. |
| %%SNIPPET_PaymentMethod%%| The customer's method of payment. |
| %%GLOBAL_EmailFooter%%| "<b>%s</b><br><a href="%s.mybigcommerce.com/">http://%s.mybigcommerce.com/</a><br>%s is powered by BigCommerce. <a href="bigcommerce.com">Launch your own store for free</a> with BigCommerce." |
| %%GLOBAL_ProductThumbImageURL%%| Product image URL. |

## Order Status Email Template

Sent when an order's status is changed.

### Available Variables
| Variable | Description |
|-|-|
| %%LNG_OrderStatusChanged%%| "Order Status Changed" |
| %%GLOBAL_OrderStatusChangedHi%%| "Hi %s" |
| %%LNG_OrderStatusChangedIntro%%| "An order you recently placed on our website has had its status changed." |
| %%GLOBAL_OrderNumberStatusChangedTo%%| "The status of order #%s is now <strong>%s</strong>" |
| %%LNG_OrderDetails%%| "Order Details" |
| %%LNG_OrderStatusChangedOrderTotal%%| "Order Total" |
| %%GLOBAL_OrderTotal%%| The customer's order total. |
| %%LNG_OrderStatusChangedDatePlaced%%| "Date Placed" |
| %%GLOBAL_DatePlaced%%| The date the order was placed. |
| %%LNG_OrderStatusChangedPaymentMethod%%| "Payment Method" |
| %%GLOBAL_PaymentMethod%%| The customer's payment method. |
| %%LNG_ShipmentTrackingNumbersLinks%%| "Shipment Tracking Numbers / Links" |
| %%GLOBAL_TrackingLinkList%%| Order tracking link. |
| %%GLOBAL_ViewOrderStatusLink%%| . |
| %%GLOBAL_EmailFooter%%| "<b>%s</b><br><a href="%s.mybigcommerce.com/">http://%s.mybigcommerce.com/</a><br>%s is powered by BigCommerce. <a href="bigcommerce.com">Launch your own store for free</a> with BigCommerce." |

## Return Confirmation Email Template

Sent when a customer submits a return request.

### Available Variables
| Variable | Description |
|-|-|
| %%LNG_NotificationConfirmationForReturn%%| "Confirmation for Return Request for Order ID" |
| %%GLOBAL_OrderId%%| Order ID number |
| %%GLOBAL_IMG_PATH%%| The URI of the directory in which the site’s image files reside. |
| %%LNG_NotificationAReturnSummaryIsShownBelow%%| "A summary of your return is shown below. To view the status of this return" |
| %%GLOBAL_ShopPath%%| The full URL to the store without a trailing slash. If on an SSL based page, this will be the HTTPS version of the store path. |
| %%LNG_ClickHere%%| "click here" |
| %%LNG_ReturnReason%%| "Return Reason" |
| %%GLOBAL_ReturnReason%%| The customer's selected return reason. |
| %%GLOBAL_HideReturnAction%%| . |
| %%LNG_ReturnAction%%| "Return Action" |
| %%GLOBAL_ReturnAction%%| The customer's selected return action. |
| %%LNG_YourComments%%| "Your Comments" |
| %%GLOBAL_ReturnComments%%| The customer's return comments. |
| %%LNG_NotificationYourReturnContainsTheFollowingItems%%| "Your Return Request Contains the Following Items..." |
| %%LNG_ReturnItems%%| "Return Items" |
| %%LNG_Qty%%| "Qty" |
| %%SNIPPET_ReturnItems%%| . |
| %%GLOBAL_EmailFooter%%| "<b>%s</b><br><a href="%s.mybigcommerce.com/">http://%s.mybigcommerce.com/</a><br>%s is powered by BigCommerce. <a href="bigcommerce.com">Launch your own store for free</a> with BigCommerce." |
