# Channel App Requirements

<div class="otp" id="no-in">

### On this Page
- [General Requirements](#general-requirements)
- [Storefronts](#storefronts)
- [Marketplace](#marketplace)
- [Marketing](#marketing)
- [Resources](#resources)

</div>

Once approved, channel apps are discoverable on BigCommerce's App Marketplace. Additionally, apps developed by [select partners](https://www.bigcommerce.com/partners/) are marketed in the Channel Manager within the Control Panel of every store. To be approved, channel apps must meet certain requirements. This article lists the requirements for publishing channel apps to both locations.

## General Requirements

**All Partners**:
* Uses Channels API endpoints
* Creates channel upon app installation - With `app_id`
* Reads and Updates status via Channels endpoints
* Follows requirements for specific channel type (listed below)
* Onboarding user flow

**Select Partners**:
* Uses Big Design
* Follows requirements for their type of channel (below) for all and select partners

## Storefronts

**All Partners**
* Uses Orders API and uses `channel_id`
* Manages channel life-cycle changes appropriately
* When channel is created, sets status to either: `active` or `inactive`
* When app is uninstalled, sets status to `disconnected`
* When status is set to `archived` in Channel Manager
* Never sets status to `connected` (and maybe `archived`?)

**Select Partners**
* Supports channel to product assignment (via Listings and/or Catalog API endpoints)
* Uses Sites and Routes API endpoints


**All Partners**
* Uses Orders API and uses `channel_id`
* Uses Catalog endpoints to syncing catalog data with BigCommerce
* Manages channel life-cycle changes appropriately
* When channel is created, sets status to: `connected`
* When app is uninstalled, sets status to `disconnected`
* Never sets status to `active`, `inactive`, or `archived`

**Select Partners**
* Follows import pattern for POS (Square as reference example) and uses Catalog API accordingly
* Provides programmatic authentication between BC and POS platform (NTH?)
* Follows settings page pattern and provides following settings:
* Sync
* Revoke access / disable integration
* When access is revoked or integration is disabled, `status` should be updated to `disconnected` and vice versa

## Marketplace

**All Partners**
* Uses Orders API and uses channel_id
* Manages channel lifecycle changes appropriately
* When channel is created, sets status to: `connected`
* When app is uninstalled, sets status to `disconnected`
* Never sets status to `active`, `inactive`, or `archived`

**Select Partners**
* Supports channel to product assignment (via Listings and/or catalog API)

## Marketing

**All Partners**
* Uses Orders API and uses `marketing_channel_id` [Note: not done yet … this is ideation)
* Manages channel lifecycle changes appropriately
* When channel is created, sets status to: `connected`
* When app is uninstalled, sets status to `disconnected`
* Never sets status to `active`, `inactive`, or `archived`

**Select Partners**
* Supports channel to product assignment (via Listings and/or catalog API)

## Resources
* [Become a Partner](https://www.bigcommerce.com/partners/)
