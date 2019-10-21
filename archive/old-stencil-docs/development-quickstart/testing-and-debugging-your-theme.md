<h1>Testing and Debugging Your Theme</h1>

<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
		<li><a href="#testing_testing-and-debugging">Testing and Debugging Your Theme</a></li>
	</ul>
</div>

<a href='#testing_testing-and-debugging' aria-hidden='true' class='block-anchor'  id='testing_testing-and-debugging'><i aria-hidden='true' class='linkify icon'></i></a>

## Testing and Debugging Your Theme

The Stencil framework provides built-in debugging tools to aid in your custom front-end development.
When you want to see what data is available on the page you are working on, you can simply add the `debug` query string to your store’s localhost URL. Here is an example:

`http://localhost:3000/product/this-is-a-sample-product?debug=context
`

This will return a list of all the objects available on the page, in JSON syntax.

If you want to view the available JSON objects and rendered page at the same time, simply change the `debug` value to `bar`. Here is an example:

`http://localhost:3000/product/this-is-a-sample-product?debug=bar`

### Using Browsersync to Render the Store on Desktop/Tablet/Mobile for Testing

The Stencil framework uses Browsersync to help you rapidly test your storefront themes across devices of different viewports. After you launch Stencil with stencil start, your console window will display several IP addresses below the BigCommerce "B".

```
                                     `+h
                                   `+ddd
                                 .oddddd
                               .oddddddd
                             -sddddddddd
                          `-sddddddddddd
                         -shdddddddddddd
                         ...-:+ydddddddd
                    `......`   `+ddddddd
                    -ddddddh-    ddddddd
                `   .yyyyyyo.  `+ddddddd
              .o/    `````    :ydddddddd
            -ohd+   `//////:` `.sddddddd
          -sdddd+   -ddddddds   `hdddddd
        :sdddddd+   .sssssso-   `ddddddd
      :ydddddddd+              -yddddddd
    /yddddddddddy+++++++++++oshddddddddd
 `/hdddddddddddddddddddddddddddddddddddd
/hdddddddddddddddddddddddddddddddddddddd
_________________________

BigCommerce Stencil
_________________________

[BS] Proxying: http://localhost:4001
[BS] Access URLs:

      Local: http://localhost:4000
   External: http://172.24.4.28:4000

         UI: http://localhost:3001
UI External: http://172.24.4.28:3001

[BS] Watching files...
```

Note the `External` IP address. You can copy/paste this URL to access the Browsersync server from multiple devices. Then, watch as scrolling and other actions sync up across devices. (Note: Firewalls and other security measures might interfere with this feature.)

To maximize the adoption of your themes, we recommend that you use such testing to design responsive themes that display and function well across multiple viewport sizes.




## Resources
* [Testing and Debugging Your Theme](https://developer.bigcommerce.com/stencil-docs/development-quickstart/testing-and-debugging-your-theme)
* [Common Stencil CLI Pitfalls and How to Avoid Them](https://medium.com/bigcommerce-developer-blog/common-stencil-cli-pitfalls-and-how-to-avoid-them-7562dbbab793) (BigCommerce Developer Blog)

