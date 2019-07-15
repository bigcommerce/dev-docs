<h1><code>npm</code> Tutorials</h1>

<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#npm-tutorials_basic">Basic npm tutorial</a></li>
        <li><a href="#npm-tutorials_advanced">Advanced npm tutorial</a></li>
	</ul>
</div>









## Basic `npm` tutorial

<div class="HubBlock--callout">
<div class="CalloutBlock--warning">
<div class="HubBlock-content">
    
<!-- theme: warning -->

### Compatible with Cornerstone versions earlier than 2.x.x
> Because this example involves editing the `webpack.conf.js` file, the way this example is outlined will align with only with Cornerstone versions earlier than 2.x.x. This is due to the transition to Webpack 4 in Cornerstone 2.0.0, which deprecated the `webpack.conf.js` file.

</div>
</div>
</div>

This example will use the [Foundation-datepicker.js](http://foundation-datepicker.peterbeno.com/#basic-example) plugin to implement a datepicker for product pages' Delivery/Event Date fields.

<!--
    title: #### Screenshot of final product

    data: //s3.amazonaws.com/user-content.stoplight.io/6116/1539276603841
-->

#### Screenshot of final product
![#### Screenshot of final product
](//s3.amazonaws.com/user-content.stoplight.io/6116/1539276603841 "#### Screenshot of final product
")

To build this, you will need to complete the following steps:

* Set Up Your Store
* Install Dependencies
* Configure Webpack Loaders
* Import Dependencies
* Configure the loaded() Method

### Set Up Your Store

To test this example, you'll want your (sandbox or production) store to include at least a couple of products that have a `Delivery/Event Date` configured. (In production, you'd typically use this feature for things like seasonally themed products, temporary promotions, or event tickets.)

For product configuration steps in the BigCommerce control panel, please see this support article.

### Install Dependencies

Use the following command to install this example's required dependencies:

`npm install --save-dev css-loader moment foundation-datepicker style-loader`

The above command's options are:

* `--save-dev` saves the dependencies as `DevDependencies`; this flags them as required for development, but not at runtime. [This stack overflow thread](https://stackoverflow.com/questions/18875674/whats-the-difference-between-dependencies-devdependencies-and-peerdependencies) provides further context to this concept.

* `css-loader` and `style-loader` are webpack loaders, used together:
	* [`css-loader`](https://github.com/webpack-contrib/css-loader) resolves `@import` and `url()` expressions in CSS files.
	* [`style-loader`](https://github.com/webpack-contrib/style-loader) generically loads stylesheets by injecting a `<style>` tag.

* [`moment`](https://momentjs.com/) is a JavaScript component parses, validates, and displays dates and times.

* `foundation-datepicker` specifies the datepicker package to install.

### Configure Webpack loaders in webpack.conf.js

The [css]() and [style]() loaders are used to import CSS and to inject it into the DOM, respectively:

```
{
    test: /\.css$/,
    loader: 'style-loader!css-loader',
}
```

<!--
    title: #### CSS and style loaders in context

    data: //s3.amazonaws.com/user-content.stoplight.io/6116/1539280227448
-->

#### CSS and style loaders in context
![#### CSS and style loaders in context
](//s3.amazonaws.com/user-content.stoplight.io/6116/1539280227448 "#### CSS and style loaders in context
")

### Import the Dependencies

Import these new dependencies into `<theme-name>/assets/js/theme/product.js`.

In `<theme-name>/assets/js/app.js`, notice that there is a mapping between the product page and the `product.js` script:

```
const PageClasses = {
    mapping: {
        ...
        'pages/product': product,
```

That is, when a user navigates to the product page, the `product.js` script is run. First its constructor will be run, followed by the methods `before`, `loaded`, and `after` – in that order.

### Configure the loaded() Method

We'll use the `loaded` method to initialize our datepicker widget:

```
import $ from 'jquery';
import PageManager from '../page-manager';
import Review from './product/reviews';
import collapsibleFactory from './common/collapsible';
import ProductDetails from './common/product-details';
import videoGallery from './product/video-gallery';
import { classifyForm } from './common/form-utils';
import 'foundation-datepicker/js/foundation-datepicker.min.js';
import 'foundation-datepicker/css/foundation-datepicker.min.css';
import moment from 'moment';

...

loaded(next) {
    let validator;

    // Init collapsible
    collapsibleFactory();

    this.productDetails = new ProductDetails($('.productView'), this.context);

    videoGallery();

    const $reviewForm = classifyForm('.writeReview-form');
    const review = new Review($reviewForm);

    $('body').on('click', '[data-reveal-id="modal-review-form"]', () => {
        validator = review.registerValidation();
    });

    $reviewForm.on('submit', () => {
        if (validator) {
            validator.performCheck();
            return validator.areAll('valid');
        }

        return false;
    });

    let $deliveryDateMth = $('#deliveryDateMth');
    let $deliveryDateDay = $('#deliveryDateDay');
    let $deliveryDateYr = $('#deliveryDateYr');
    let earliestDate = moment(this.context.product.event_date.date_start, "MMM Do YYYY");
    let latestDate = moment(this.context.product.event_date.date_end, "MMM Do YYYY");

    $('#deliveryDate').fdatepicker({
        leftArrow:'<<',
        rightArrow:'>>',
        onRender: function (date) {
            return moment(date).isBetween(earliestDate, latestDate, null, '[]') ? '' : 'disabled';
        }
    })
    .on('changeDate', function(event) {
        let date = event.date;
        $deliveryDateMth.val(date.getMonth() + 1);
        $deliveryDateDay.val(date.getDate());
        $deliveryDateYr.val(date.getFullYear());
    })
    .data('datepicker');

    next();
}
```

Highlighted below is the new code added to the `loaded` method:

<!--
    title: #### Code addition to loaded method in product.js

    data: //s3.amazonaws.com/user-content.stoplight.io/6116/1539275148248
-->

#### Code addition to loaded method in product.js
![#### Code addition to loaded method in product.js
](//s3.amazonaws.com/user-content.stoplight.io/6116/1539275148248 "#### Code addition to loaded method in product.js
")

Update the `<theme-name>/templates/components/products/product-view.html` template, replacing the existing `{{#if product.event_date}}` block with the following:

```
{{#if product.event_date}}
    {{inject 'product' product}}
    <div class="form-field">
        <label class="form-label form-label--alternate form-label--inlineSmall">
        {{product.event_date.name}}:
        <small>{{lang 'common.required'}}</small>
        </label>
        <input type="text" class="form-input" id="deliveryDate" name="EventDate[Date]" required>
        <input type="hidden" id="deliveryDateMth" name="EventDate[Mth]">
        <input type="hidden" id="deliveryDateDay" name="EventDate[Day]">
        <input type="hidden" id="deliveryDateYr" name="EventDate[Yr]">
    </div>
{{/if}}
```

Note that we're "injecting" the product here, so we have access to its properties. This could be done closer to the root of the tree, but it's been placed here for proximity to the code that requires it.

We also needed to add form fields for the `EventDate[Mth]`, `EventDate[Day]`, and `EventDate[Yr]` data, which we update whenever the `changeDate` event occurs. This conforms to the data format that the server expects. These fields are hidden from the user.


---

## Advanced npm Tutorial

<iframe width="560" height="315" src="https://www.youtube.com/embed/sudvuxJFxKc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

To build this, you will need to complete the following steps:

* Install Dependencies
* Import Dependencies
* Update webpack.conf.js
* Update app.js
* Add the `<x-coupon-drawer>` Element to the Page
* Call initReact from base.html
* Create an assets/js/components Folder
* Create a CouponDrawer.js File
* Create a VerticalLinearStepper.js File


### Install Dependencies

Material-UI requires the `react-tap-event-plugin` module. Also, `document-register-element` is needed to polyfill `document.registerElement`. The babel presets and plugins are needed to support `Object.assign`, `react`, and `Material-UI`, respectively:

```
npm install -save-dev document-register-element material-ui react react-dom react-tap-event-plugin  
npm install -save-dev babel-plugin-transform-object-assign babel-preset-react babel-preset-stage-1
```

### Import Dependencies

Next, import the new dependencies into `<theme-name>/assets/js/app.js`

Note the CouponDrawer import at the bottom in the photo below. This file doesn’t yet exist, but we’ll shortly create a React component with this name.




<!--
    title: #### app.js imports

    data: //s3.amazonaws.com/user-content.stoplight.io/6116/1561419156404
-->

#### app.js imports
![#### app.js imports
](//s3.amazonaws.com/user-content.stoplight.io/6116/1561419156404 "#### app.js imports
")

### Update webpack.conf.js

Update webpack.conf.js with the new presets and plug-ins, as shown here:

<!--
    title: #### webpack.config.js: presets and plugins

    data: //s3.amazonaws.com/user-content.stoplight.io/6116/1561419204148
-->

#### webpack.config.js: presets and plugins
![#### webpack.config.js: presets and plugins
](//s3.amazonaws.com/user-content.stoplight.io/6116/1561419204148 "#### webpack.config.js: presets and plugins
")

### Update app.js

Add the following code to the bottom of `<theme-name>/assets/js/app.js:`

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name"></div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: ""
subtitle: ""
lineNumbers: true
-->

```
window.initReact = function(contextJSON = '{}') {
    injectTapEventPlugin();
    const context = JSON.parse(contextJSON);
    const proto = Object.create(HTMLElement.prototype, {
        attachedCallback: {
            value: function() {
                const mountPoint = document.createElement('span');
                const attrs = [].reduce.call(this.attributes, (memo, attr) => {
                    memo[attr.name] = attr.value;
                    return memo;
                }, {});
                const data = Object.assign({}, context, attrs);

                this.appendChild(mountPoint);
                ReactDOM.render(
                    <MuiThemeProvider>
                        <CouponDrawer data={data} />
                    </MuiThemeProvider>,
                    mountPoint
                );
            }
        }
    });
    document.registerElement('x-coupon-drawer', {prototype: proto});
}
```

This sets up a handler for attaching an `<x-coupon-drawer>` element to the page. We’re using React here to render the CouponDrawer component. This block of code was taken and modified from https://facebook.github.io/react/docs/web-components.html#using-react-in-your-web-components.
	
### Add the `<x-coupon-drawer>` Element to the Page

Add this in `<theme-name>/templates/layout/base.html.` (See the image below.) We’re using this layout template for this example, although you would follow the same steps in any other template.
	
### Call initReact from base.html

Add a call to `window.initReact`. We’re continuing to work with the `base.html` page for this example. Notice that we’re also passing in the jsContext here. The `initReact` method will merge this context with an object created from the attributes placed upon the `<x-coupon-drawer>`, and will pass the combined data along to the React component.

### Create an assets/js/components Folder

We’ll store our React components here.

### Create a CouponDrawer.js File

Create a `<theme-name>/assets/js/components/CouponDrawer.js` file. Populate this file with the following code block (which is adapted from http://www.material-ui.com/#/components/drawer):



<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name"></div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: ""
subtitle: ""
lineNumbers: true
-->

```
import React from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import VerticalLinearStepper from './VerticalLinearStepper';

export default class CouponDrawer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  render() {
    return (
      <div>
        <RaisedButton
          label="Click here to get a coupon!"
          onTouchTap={this.handleToggle}
        />
        <Drawer width={200} openSecondary={true} open={this.state.open} >
          <AppBar title="Coupon magic" titleStyle={{fontSize: 14}} />
          <VerticalLinearStepper />
        </Drawer>
      </div>
    );
  }
}
```

### Create a VerticalLinearStepper.js File

Create a `<theme-name>/assets/js/components/VerticalLinearStepper.js` file. Populate this file with the following code block:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name"></div>
    </div><div class="HubBlock-header-subtitle"></div>
</div>

<!--
title: ""
subtitle: ""
lineNumbers: true
-->

```js
import React from 'react';
import {
  Step,
  Stepper,
  StepButton,
  StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

/**
 * A basic vertical non-linear implementation
 */
class VerticalLinearStepper extends React.Component {

  constructor(props) {
      super(props);
  }

  state = {
    stepIndex: 0,
  };

  handleNext = () => {
    const {stepIndex} = this.state;
    if (stepIndex < 2) {
      this.setState({stepIndex: stepIndex + 1});
    }
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  renderStepActions(step) {
    return (
      <div style={{margin: '12px 0'}}>
        <RaisedButton
          label="Next"
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          onTouchTap={this.handleNext}
          style={{marginRight: 12}}
        />
        {step > 0 && (
          <FlatButton
            label="Back"
            disableTouchRipple={true}
            disableFocusRipple={true}
            onTouchTap={this.handlePrev}
          />
        )}
      </div>
    );
  }

  render() {
    const {stepIndex} = this.state;

    return (
      <div style={{maxWidth: 380, maxHeight: 400, margin: 'auto'}}>
        <Stepper
          activeStep={stepIndex}
          linear={false}
          orientation="vertical"
        >
          <Step>
            <StepButton onTouchTap={() => this.setState({stepIndex: 0})}>
              Do this
            </StepButton>
            <StepContent>
              <p>
                Navigate to <a href="http://example.com">here</a> and get your code.
              </p>
              {this.renderStepActions(0)}
            </StepContent>
          </Step>
          <Step>
            <StepButton onTouchTap={() => this.setState({stepIndex: 1})}>
              Then this
            </StepButton>
            <StepContent>
              <TextField hintText="Enter your code here" style={{height: 100, width: 100}}/>
              {this.renderStepActions(1)}
            </StepContent>
          </Step>
          <Step>
            <StepButton onTouchTap={() => this.setState({stepIndex: 2})}>
              Collect your coupon!
            </StepButton>
            <StepContent>
              <p>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Wikipedia_mobile_en.svg/296px-Wikipedia_mobile_en.svg.png"/>
              </p>
              {this.renderStepActions(2)}
            </StepContent>
          </Step>
        </Stepper>
      </div>
    );
  }
}

export default VerticalLinearStepper;
```

<div class="HubBlock--callout">
<div class="CalloutBlock--">
<div class="HubBlock-content">
    
<!-- theme:  -->

### Note on the VerticalLinearStepper.js Example
> We must register a custom element to set up the “root” of every React component we create. However, within a React component, we can import other React components without having to register them. For example, here we register x-coupon-drawer as a custom element that renders the React CouponDrawer component. However, within CouponDrawer, we can simply import the VerticalLinearStepper component needing to set it up in the same way.

</div>
</div>
</div>

