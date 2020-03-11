# Webhooks Overview

<div class="otp" id="no-index">

### On this Page

- [Creating a Webhook](#creating-a-webhook)
- [Callback Payload](#callback-payload)
- [Handling Callbacks](#handling-callbacks)
- [Callback Retry Mechanism](#callback-retry-mechanism)
- [Security](#security)
- [Troubleshooting](#troubleshooting)
- [Tools](#tools)
- [Resources](#resources)

</div>

Webhooks allow applications to be notified when specific events occur on a BigCommerce store. For example when:
* an order is created, 
* a product's inventory changes, or 
* an item is added to a shopper's cart.

This article is a general overview of webhooks and their behaviour on BigCommerce. For a complete webhook API reference, see: [API Reference > Webhooks](https://developer.bigcommerce.com/api-reference/webhooks/webhooks/createwebhooks). For step-by-step webhooks tutorial, see: [Webhooks Tutorial](https://developer.bigcommerce.com/api-docs/getting-started/webhooks/setting-up-webhooks).

## Creating a Webhook

To create a webhook, send a `POST` request to [/stores/{{STORE_HASH}}/v2/hooks](https://developer.bigcommerce.com/api-reference/webhooks/webhooks/createwebhooks):

```http
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v2/hooks
X-Auth-Token: {{ACCESS_TOKEN}}
X-Auth-Client: {{CLIENT_ID}}
Content-Type: application/json
Accept: application/json

{
  "scope": "store/order/updated",
  "destination": "https://665b65a6.ngrok.io/webhooks",
  "is_active": true
}
```

[![Open in Request Runner](https://storage.googleapis.com/bigcommerce-production-dev-center/images/Open-Request-Runner.svg)](https://developer.bigcommerce.com/api-reference/webhooks/webhooks/createwebhooks#requestrunner)

**Response:**  

```json
{
  "client_id": "{{CLIENT_ID}}",
  "created_at": 1580329317,
  "destination": "https://665b65a6.ngrok.io/webhooks",
  "headers": null,
  "id": 20172984,
  "is_active": true,
  "scope": "store/order/*",
  "store_hash": "{{STORE_HASH}}",
  "updated_at": 1580329317
}
```

For a complete webhook API reference (including request schemas and property descriptions), see: [API Reference > Webhooks](https://developer.bigcommerce.com/api-reference/webhooks/webhooks/createwebhooks).

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">
    
<!-- theme: warning -->

### Note
> * Following the creation of a webhook, it can take up to one minute for BigCommerce to start making `POST` requests to the destination server.

</div>
</div>
</div>

## Callback Payload

When a webhook is triggered, BigCommerce will `POST` a light payload containing minimum event details to the destination server. For instance, the `data` object for `store/order/statusUpdated` contains only the order `id`:

```json
{
 "store_id":11111,
 "producer":"stores/abcde",
 "scope":"store/order/statusUpdated",
 "data":{
         "type":"order",
         "id":173331
        },
 "hash":"3f9ea420af83450d7ef9f78b08c8af25b2213637"
 }
```

A subsequent request can be made to [/orders/{id}](https://developer.bigcommerce.com/api-reference/store-management/orders/orders/getanorder) to obtain full order details. 

For more information on specific webhook events and their payloads, see [Webhook Events](https://developer.bigcommerce.com/api-docs/getting-started/webhooks/webhook-events).

## Handling Callbacks

To acknowledge the callback has been received without issue, the destination server must return an `HTTP 200` response -- any response outside the `200` range indicates the callback was not received. If this happens, the webhook service will use the [retry mechanism](#callback-retry-mechanism) described below.

Need to set up a quick webhook destination URL for testing? See [Tools for Debugging and Testing Webhooks](#tools-for-debugging-and-testing-webhooks).

## Callback Retry Mechanism

The webhooks service will do its best to deliver events to the destination callback URI. It is best practice for the application to respond to the callback before taking any other action that would slow its response. If an app server responds to a webhook payload with anything other than a `2xx` response, or times out and indicates the payload has not been received, the following process will determine whether the destination URI gets blacklisted.

The webhook service may send many payloads to a single URI in quick succession. Because of this, we use a sliding scale across a **two minute window** to calculate a callback response success rate for each remote destination. When the webhook service receives a `2xx` response, the destination's success count is increased. If there's no response or the remote server times out, the destination's failure count is increased. Based on these two numbers, the success ratio is calculated. 

The webhook service flow is as follows:

1. Once a webhook is triggered, the service checks if your callback URI is on the blacklist
2. If it's not, we calculate a success ratio for the remote server based on its success/failure count in a **two minute window**
3. If at any point in the two minute window the success/failure ratio dips below **90%**, the destination URI's domain will be blacklisted for **three minutes**
4. Webhook events triggered during this time are sent to our retry queues to be executed later when the domain is no longer blacklisted and once the retry queue time has elapsed.

Once a domain is no longer blacklisted, all new webhook requests will be sent as they occur. Event requests sent to the retry queue during a blacklisting period will be delivered according to the retry queue schedule.

The webhook dispatcher will then attempt several retries (at increasing intervals) until the maximum retry limit is reached.

**Retry Internavals**:
* `60` seconds after the most recent failure  
* `180` seconds after the most recent failure  
* `180` seconds after the most recent failure  
* `300` seconds after the most recent failure  
* `600` seconds after the most recent failure  
* `900` seconds after the most recent failure  
* `1800` seconds after the most recent failure  
* `3600` seconds after the most recent failure  
* `7200` seconds after the most recent failure  
* `21600` seconds after the most recent failure  
* `50400` seconds after the most recent failure  
* `86400` seconds (24 hours) after the most recent failure

After the final retry attempt (cumulatively **48 hours** after the first delivery attempt), the webhook will be deactivated, and an email will be sent to the email address registered on the subscribing app. To reactivate the webhook, set `is_active`  back to `true` by making a `PUT` request to `/hooks/{id}`.

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">
    
### Note
> * A domain's success rate for a given sliding window is not calculated until `100` webhook requests are sent -- this means the domain will not be blacklisted for the first `100` webhooks sent within the time window (regardless of response) as all webhooks are sent until the minimum threshold has been reached for the current time window.
> * The webhook dispatcher determines whether retries are needed based on responses from the subscribed domain as a whole, not by specific hooks. For example, `domain.com/webhook-1` and `domain.com/webhook-2` will affect each other for failures and retries, as both URLs belong to the same domain.

</div>
</div>
</div>

## Security

To ensure webhook callback requests are secure:
1. Webhook payloads contain minimal information about the store and event
2. Webhook payloads are sent over **TLS-encrypted** connection
3. Create Webhook requests accept an optional headers objects which can be used to authenticate callbacks requests:

```json
{
"scope": "store/cart/lineItem/*",
  "destination": "{{DESTINATION_URL}}",
  "is_active": true,
  "headers": {
    "Username": "Hello",
    "Password": "Goodbye"
  }
}
```

BigCommerce will send the specified headers when making callback requests to the destination server -- this allows webhook destination URIs to be secured via basic authentication.

## Troubleshooting

**Not receiving Webhook Event Callbacks**

If your app does not return an `HTTP 200` to BigCommerce after receiving the webhook event payload, BigCommerce considers it a failure. BigCommerce will keep trying for a little over 48 hours. At the end of that time, BigCommerce sends an email to the email address set during app registration and disables the webhook by setting the is_active flag to false.

To see if a webhook is still active, make a `GET` request to `/hooks/{id}` and check the value of the `is_active` property in the response.

If you receive an email, or discover `is_active` is `false`, try the following:
* Verify the app is responding to the callback with a `200` response.
* Verify the destination server has a valid TLS/SSL setup by visiting https://sslcheck.globalsign.com. Any of the following will cause the TLS/SSL handshake to fail:
  * Self-signed certificates
  * Hostname on certificate doesn't match the hostname in DNS settings
  * Key and trust stores are not configured with the required intermediate certificates.

Once the issue is resolved, set `is_active` to `true` by making a `PUT` request to `/hooks/{id}` -- BigCommerce start sending event Callback requests again.

**No 200 response when making `POST` to `/hooks`**
* Check TLS/SSL configuration on machine making `POST` request.
* Verify `POST` request contains the required `HTTP` headers:

```http
POST https://api.bigcommerce.com/stores/{{STORE_HASH}}/v2/hooks
Accept: application/json
Content-Type: application/json
X-Auth-Token: {{ACCESS_TOKEN}}
X-Auth-Client: {{CLIENT_ID}}
```

## Tools

Below is a collection of third-party tools that can be used to aid in the development, testing, and debugging of webhooks:

|Tool|Description|
|----------------------------------------------|---------------------------------------------------------------------------------------------------------------|
|**[ngrok](https://ngrok.com/)**               | Easily set up tunnels between `localhost` and an `ngrok` public URL to test callback requests on your machine |
|**[Webhook Tester](https://webhook.site/#/)** | Test webhooks and other types of `HTTP` requests in your browser                                              |

## Resources
* [Webhook Tutorial](https://developer.bigcommerce.com/api-docs/getting-started/webhooks/setting-up-webhooks)
* [Webhook Events](https://developer.bigcommerce.com/api-docs/getting-started/webhooks/webhook-events)
* [Webhooks Reference](https://developer.bigcommerce.com/api-reference/webhooks)
