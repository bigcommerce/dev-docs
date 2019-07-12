<h1>Advanced <code>NPM</code> Tutorial</h1>

<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#advanced_video-of-what">Video of What We're Building</a></li>
    <li><a href="#advanced_install-dependencies">Install Dependencies</a></li>
    <li><a href="#advanced_import-dependencies">Import Dependencies</a></li>
    <li><a href="#advanced_update-webpackconfjs">Update webpack.conf.js</a></li>
    <li><a href="#advanced_update-appjs">Update app.js</a></li>
    <li><a href="#advanced_add-the-xcoupondrawer">Add the <<code>x-coupon-drawer</code>> Element to the Page</a></li>
    <li><a href="#advanced_call-initreact">Call initReact from base.html</a></li>
    <li><a href="#advanced_create-an-assetsjscomp">Create an assets/js/components Folder</a></li>
    <li><a href="#advanced_create-a-coupondrawerjs-file">Create a CouponDrawer.js File</a></li>
    <li><a href="#advanced_create-a-verticallinear">Create a VerticalLinearStepper.js File</a></li>
	</ul>
</div>

<a href='#advanced_video-of-what' aria-hidden='true' class='block-anchor'  id='advanced_video-of-what'><i aria-hidden='true' class='linkify icon'></i></a>

## Video of What We're Building

<iframe width="560" height="315" src="https://www.youtube.com/embed/sudvuxJFxKc" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

<a href='#advanced_install-dependencies' aria-hidden='true' class='block-anchor'  id='advanced_install-dependencies'><i aria-hidden='true' class='linkify icon'></i></a>

## Install Dependencies

Material-UI requires the `react-tap-event-plugin` module. Also, `document-register-element` is needed to polyfill `document.registerElement`. The babel presets and plugins are needed to support `Object.assign`, `react`, and `Material-UI`, respectively:

```
npm install -save-dev document-register-element material-ui react react-dom react-tap-event-plugin  
npm install -save-dev babel-plugin-transform-object-assign babel-preset-react babel-preset-stage-1
```

<a href='#advanced_import-dependencies' aria-hidden='true' class='block-anchor'  id='advanced_import-dependencies'><i aria-hidden='true' class='linkify icon'></i></a>

## Import Dependencies

Next, import the new dependencies into `<theme-name>/assets/js/app.js`

Note the `CouponDrawer` import at the bottom. This file doesn't yet exist, but we'll shortly create a React component with this name:

<!--
    title: #### app.js imports

    data: //s3.amazonaws.com/user-content.stoplight.io/6116/1540279579178
-->

#### app.js imports
![#### app.js imports
](//s3.amazonaws.com/user-content.stoplight.io/6116/1540279579178 "#### app.js imports
")

<a href='#advanced_update-webpackconfjs' aria-hidden='true' class='block-anchor'  id='advanced_update-webpackconfjs'><i aria-hidden='true' class='linkify icon'></i></a>

## Update webpack.conf.js

Update webpack.conf.js with the new presets and plug-ins, as shown here:

<!--
    title: #### webpack.config.js: presets and plugins

    data: //s3.amazonaws.com/user-content.stoplight.io/6116/1540279603654
-->

#### webpack.config.js: presets and plugins
![#### webpack.config.js: presets and plugins
](//s3.amazonaws.com/user-content.stoplight.io/6116/1540279603654 "#### webpack.config.js: presets and plugins
")

<a href='#advanced_update-appjs' aria-hidden='true' class='block-anchor'  id='advanced_update-appjs'><i aria-hidden='true' class='linkify icon'></i></a>

## Update app.js

Add the following code to the bottom of `<theme-name>/assets/js/app.js`:

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

This sets up a handler for attaching an `<x-coupon-drawer>` element to the page. We're using React here to render the `CouponDrawer` component. This block of code was taken and modified from https://facebook.github.io/react/docs/web-components.html#using-react-in-your-web-components.

<a href='#advanced_add-the-xcoupondrawer' aria-hidden='true' class='block-anchor'  id='advanced_add-the-xcoupondrawer'><i aria-hidden='true' class='linkify icon'></i></a>

## Add the `<x-coupon-drawer>` Element to the Page 

Add this in `<theme-name>/templates/layout/base.html`. (See the image below.) We're using this layout template for this example, although you would follow the same steps in any other template.

<a href='#advanced_call-initreact' aria-hidden='true' class='block-anchor'  id='advanced_call-initreact'><i aria-hidden='true' class='linkify icon'></i></a>

## Call initReact from base.html 

Add a call to `window.initReact`. We're continuing to work with the `base.html` page for this example. Notice that we're also passing in the jsContext here. The `initReact` method will merge this context with an object created from the attributes placed upon the `<x-coupon-drawer>`, and will pass the combined data along to the React component.

<!--
    title: #### base.html setup

    data: //s3.amazonaws.com/user-content.stoplight.io/6116/1540279254389
-->

#### base.html setup
![#### base.html setup
](//s3.amazonaws.com/user-content.stoplight.io/6116/1540279254389 "#### base.html setup
")

<a href='#advanced_create-an-assetsjscomp' aria-hidden='true' class='block-anchor'  id='advanced_create-an-assetsjscomp'><i aria-hidden='true' class='linkify icon'></i></a>

## Create an assets/js/components Folder 

We'll store our React components here.

<a href='#advanced_create-a-coupondrawerjs-file' aria-hidden='true' class='block-anchor'  id='advanced_create-a-coupondrawerjs-file'><i aria-hidden='true' class='linkify icon'></i></a>

## Create a CouponDrawer.js File

Create a `<theme-name>/assets/js/components/CouponDrawer.js` file. Populate this file with the following code block (which is adapted from http://www.material-ui.com/#/components/drawer):

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

<a href='#advanced_create-a-verticallinear' aria-hidden='true' class='block-anchor'  id='advanced_create-a-verticallinear'><i aria-hidden='true' class='linkify icon'></i></a>

## Create a VerticalLinearStepper.js File

Create a `<theme-name>/assets/js/components/VerticalLinearStepper.js` file. Populate this file with the following code block:

```
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

The above code block was adapted from http://www.material-ui.com/#/components/stepper.

<div class="HubBlock--callout">
<div class="CalloutBlock--">
<div class="HubBlock-content">
    
<!-- theme:  -->

###  Note on the VerticalLinearStepper.js Example
> We must register a custom element to set up the "root" of every React component we create. However, within a React component, we can import other React components without having to register them. For example, here we register x-coupon-drawer as a custom element that renders the React CouponDrawer component. However, within CouponDrawer, we can simply import the VerticalLinearStepper component needing to set it up in the same way.

</div>
</div>
</div>

