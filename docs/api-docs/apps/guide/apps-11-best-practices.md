# App Development Best Practices

<div class="otp" id="no-index">

### On This Page
- [Multi-User Support](#multi-user-support)
- [Hosting](#hosting)

</div>

This page contains best practices...

## Multi-User Support
Merchants often have more than one person working on their store. BigCommerce allows additional users to access your app when the store owner has granted them appropriate permissions. The requirements for supporting multi-user access are:
* Tokens must be stored against the `store_hash` and not against user info.
* Within the Dev Tools workspace, you must enable your app’s **Technical** > **Multiple Users** option.

In the payload returned when a user launches an app, users are distinguished by `owner_email` versus `user_email`. If these two emails match, the user is the store owner.

If you wish to enable user removal, you can do by filling in your app’s **Technical** > **Remove User Callback URL** field in Dev Tools. (Enabling user removal is optional).
For more advanced implementations, you can enable the store owner to grant specific permissions to different non-admin users. For example, person1@email.com could be restricted to editing product inventory but not seeing orders. If you decide to include this feature in your app, it’s a great feature to advertise.

## Hosting
BigCommerce stores are hosted on [Google Cloud Platform](https://cloud.google.com/) in the [us-central1](https://cloud.google.com/compute/docs/regions-zones/) region.

Therefore, you can maximize performance of your app (in terms of latency to the public API) by hosting in the same region. There is no requirement to do so, and you may host wherever you like.