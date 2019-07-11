<h1>Configuring Webpack or a Custom Build System</h1>

<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#configuring_webpack-jspm-other">Webpack, jspm, or Other JavaScript Managers</a></li>
    <li><a href="#configuring_webpack-specific">Webpack-Specific Configuration</a></li>
    <li><a href="#configuring_build-system">Build-System Configuration File</a></li>
    <li><a href="#configuring_watched-folders">Watched Folders: watchOptions Object</a></li>
    <li><a href="#configuring_javascript-rebundling">JavaScript Rebundling: development Function</a></li>
    <li><a href="#configuring_theme-packaging">Theme Packaging: production Function</a></li>
	</ul>
</div>






<a href='#configuring_webpack-jspm-other' aria-hidden='true' class='block-anchor'  id='configuring_webpack-jspm-other'><i aria-hidden='true' class='linkify icon'></i></a>

## Webpack, jspm, or Other JavaScript Managers

Stencil themes are Node.js applications, and therefore contain dependencies on other JavaScript libraries. For the default Cornerstone theme, we provide the [Webpack](https://webpack.js.org/) build manager to handle these dependencies. 

As you develop and customize a theme based on Cornerstone, you have option to reconfigure Webpack's watched folders, and to even substitute a different build system. These options are explained below.

All themes in the BigCommerce Theme Marketplace use Webpack. However, older versions of certain themes used the jspm JavaScript dependency manager instead of Webpack. Please see this page to determine (by version number) whether you are developing based on one of these earlier versions, and to find the required jspm setup procedures.

<div class="HubBlock--callout">
<div class="CalloutBlock--info">
<div class="HubBlock-content">
    
<!-- theme: info -->

### Optional Workflow
> The steps below are required only if you plan to modify or override the default Webpack-based workflow that installs with Stencil's default Cornerstone theme or and current theme in the BigCommerce Theme Marketplace. If you do not require these advanced configuration options, you can safely skip this page.

</div>
</div>
</div>

<a href='#configuring_webpack-specific' aria-hidden='true' class='block-anchor'  id='configuring_webpack-specific'><i aria-hidden='true' class='linkify icon'></i></a>

## Webpack-Specific Javascript Diagnostics

The following Webpack configuration options can aid in troubleshooting.

If JavaScript errors in your browser's developer tools are not reporting filenames and line numbers, try changing your `webpack.*.js` file(s)' [sourcemap](https://webpack.js.org/guides/build-performance/#devtool) entry from:

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name"></div>
    </div><div class="HubBlock-header-subtitle">webpack.common.js</div>
</div>

<!--
title: ""
subtitle: "webpack.common.js"
lineNumbers: true
-->

```js
devtool: 'source-map'
```

to

<div class="HubBlock-header">
    <div class="HubBlock-header-title flex items-center">
        <div class="HubBlock-header-name"></div>
    </div><div class="HubBlock-header-subtitle">webpack.common.js</div>
</div>

<!--
title: ""
subtitle: "webpack.common.js"
lineNumbers: true
-->

```js
devtool: 'eval-source-map'
```

The `eval-source-map` option is slower, but more verbose. This [Webpack Devtool Configuration](https://webpack.js.org/configuration/devtool/) article provides an overview of all devtool options and details regarding each.

---

<a href='#configuring_build-system' aria-hidden='true' class='block-anchor'  id='configuring_build-system'><i aria-hidden='true' class='linkify icon'></i></a>

## Build-System Configuration File

To take advantage of automatic JavaScript bundling and browser refresh, Stencil themes require the [`stencil.conf.js`](https://github.com/bigcommerce/cornerstone/blob/master/stencil.conf.js) file. If you would like to enable a custom build system, you will need to edit this file.

Within `stencil.conf.js`, Stencil CLI looks for the exported `watchOptions` object, and `development` and `production` callbacks, shown below. 

Continue reading to take a closer look at each of these three references.

<a href='#configuring_watched-folders' aria-hidden='true' class='block-anchor'  id='configuring_watched-folders'><i aria-hidden='true' class='linkify icon'></i></a>

## Watched Folders: watchOptions Object

The `watchOptions` object defines directories for the [Browsersync](https://browsersync.io/docs) preview engine to watch or ignore, in two respective lists. You are free to edit these lists:

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
var watchOptions = {
    // If files in these directories change, reload the page.
    files: [
        '/templates',
        '/lang'
    ],

    //Do not watch files in these directories
     ignored: [
        '/assets/scss',
        '/assets/less',
        '/assets/css',
        '/assets/dist',
    ]
};
```

<a href='#configuring_javascript-rebundling' aria-hidden='true' class='block-anchor'  id='configuring_javascript-rebundling'><i aria-hidden='true' class='linkify icon'></i></a>

### JavaScript Rebundling: `development` Function

Upon the command-line instruction `stencil start`, Stencil CLI will look for and call the `development` function. 

In the base Cornerstone theme, we have created a Webpack watcher to trigger a browser reload whenever theme edits cause JavaScript to be rebundled to the theme's `bundle.js` file. This watcher uses options configured in the `webpack.common.js` (`webpack.conf.js` in Cornerstone versions < 2.0) file passed by `webpackConfig`. So a JavaScript rebuild will refresh the browser:

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
function development() {
    webpack(webpackConfig).watch({}, err => {
        if (err) {
            console.error(err.message, err.details);
        }

        process.send('reload');
    });
}
```

<a href='#configuring_theme-packaging' aria-hidden='true' class='block-anchor'  id='configuring_theme-packaging'><i aria-hidden='true' class='linkify icon'></i></a>

## Theme Packaging: `production` Function 

When you issue the command-line instruction `stencil bundle`, to process and package a completed theme for upload to a store, Stencil CLI will look for and call the `production` function. This function passes a callback as its first argument to support asynchronous builds. 

The callback must be invoked somewhere inside the `production` function to notify Stencil CLI that the theme-specific build has completed and is ready to package:

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
function production() {
    webpackConfig.watch = false;
    webpackConfig.devtool = false;
    webpackConfig.plugins.push(new webpack.LoaderOptionsPlugin({
        minimize: true,
    }));
    webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
        comments: false,
        compress: {
            warnings: true,
        },
        sourceMap: false, // Toggle to turn on source maps.
    }));

    webpack(webpackConfig).run(err => {
        if (err) {
            console.error(err.message, err.details);
            throw err;
        }

        process.send('done');
    });
}

if (process.send) {
    // running as a forked worker
    process.on('message', message => {
        if (message === 'development') {
            development();
        }

        if (message === 'production') {
            production();
        }
    });

    process.send('ready');
}
```

