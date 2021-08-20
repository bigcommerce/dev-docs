<html>
<body style="font-family:Helvetica; font-size:12px">
<div style="padding:0px 20px 20px 20px">
 <p><strong>FORGOT SOMETHING?</strong></p>
 <p>We noticed you left something behind. No need to worry - we saved the items in your cart so you can easily complete your purchase.</p>
  
<a href="{{abandoned_cart.link}}" target="_blank">
  <button>Complete your order</button></a>
  <p style="margin-top: 12px">
    <strong>{{ store.name }} </strong>
    <br/>
    <a href="{{ store.path_normal }}">{{ store.path_normal }}</a>
  </p>
  <hr size="1" style="height: 1px; border-style: none; color: #444; background: #000; margin-top: 8px"/>
  <div style="font-size: 11px; color: #444">
    {{{lang 'powered_by' store=store.name}}}
    <a href="https://www.bigcommerce.com" target="_blank">
      {{lang 'launch_intro'}}
    </a>
  </div>
  <br/>
  <p>{{{lang 'unsubscribe' link=abandoned_cart.unsubscribe_link }}}</p>
  </div>
  </body>
  </html>
