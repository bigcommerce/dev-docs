# Designing the User Interface

<div class="otp" id="no-index">

### On This Page
- [User Interface Constraints](#user-interface-constraints)
- [About Mixed Content](#about-mixed-content)
- [About Same-Origin Policies](#about-same-origin-policies)
- [About P3P and Cookies](#about-p3p-and-cookies)
- [Microsoft No Longer Supports P3P](#microsoft-no-longer-supports-p3p)

</div>

BigDesign is a collection of reusable React components, design guidelines, and UI patterns that can be used to build interfaces matching the BigCommerce control panel. It is available as an [npm package](https://www.npmjs.com/package/@bigcommerce/big-design), which can be installed as a dependency in third-party apps, and as an [open source repository on GitHub.](https://github.com/bigcommerce) BigDesign includes all the essential elements you need to construct a UI: buttons, forms, headings, and more. To get started using the components see our [BigDesign Playground](https://developer.bigcommerce.com/big-design/).

## User Interface Constraints

Single-click apps benefit from a high level of integration with the BigCommerce platform. Users interacting with your app will enjoy a seamless experience. BigCommerce achieves this by rendering your app&#39;s user interface inside of an iframe within the control panel. To ensure acceptance into the App Marketplace, your app should be able to perform all of its functions inside of the iframe.

While very usable and friendly, the iframe approach does require special attention from app developers. The remainder of this page discusses several functional areas to consider when designing and developing your app.

## About Mixed Content

The BigCommerce control panel is served over TLS/SSL. Your app must be hosted on a web server that accepts and sends TLS/SSL requests. In addition, all of the resources referenced in the HTML that you present to the end users must be served over TLS/SSL. You may find protocol-agnostic addressing helpful.

If the user interface retrieves images, scripts, or other assets over a connection not encrypted with TLS/SSL, the user will experience errors and possibly an inability to interact with your app. Before submitting your app, use an <a href="https://www.jitbit.com/sslcheck/" target="_blank">online crawler</a> to check for insecure content.

## About Same-Origin Policies

<a href="http://en.wikipedia.org/wiki/Same-origin_policy" target="_blank">Same-origin policies</a> restrict apps running within iframes from performing certain activities, such as interacting with other services and making OAuth connections. While apps that operate within the BigCommerce iframe get strong preference during App Marketplace considerations, we sometimes make exceptions for apps that need to interact with, and authenticate to, other services. If your app requires this, we advise you to open a new tab for actions that cannot occur within the iframe.

## About P3P and Cookies

Internet Explorer is one of the browsers that BigCommerce [supports](https://support.bigcommerce.com/s/article/Themes-Supported-Browsers), and our merchants do use it to access the control panel. If your app needs to set a cookie, you will need to craft a <a href="http://en.wikipedia.org/wiki/P3P" target="_blank">P3P policy</a>. Otherwise, your app will experience issues on Internet Explorer. Please see the following pages for more information:

*   <a href="http://www.techrepublic.com/blog/software-engineer/craft-a-p3p-policy-to-make-ie-behave/" target="_blank">Craft a P3P policy to make IE behave</a>
*   <a href="http://blogs.msdn.com/b/ieinternals/archive/2013/09/17/simple-introduction-to-p3p-cookie-blocking-frame.aspx" target="_blank">MSDN Intro to P3P Cookie Blocking</a>

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">

<!-- theme:  -->

## Microsoft No Longer Supports P3P
> Support for P3P 1.0 has been removed in Windows 10 and will have minimal ongoing servicing for previous versions of Windows. [_Microsoft_](https://docs.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/mt146424(v=vs.85)?redirectedfrom=MSDN)

</div>
</div>
</div>
