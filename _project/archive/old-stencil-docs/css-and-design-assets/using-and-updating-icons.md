<h1>Using and Updating Icons</h1>

<div class="otp" id="no-index">
	<h3> On This Page </h3>
	<ul>
    <li><a href="#using-and-updating-icons_installing-grunt">Installing Grunt</a></li>
    <li><a href="#using-and-updating-icons_calling-theme-icons">Calling Theme Icons</a></li>
    <li><a href="#using-and-updating-icons_adding-new-icons">Adding New Icons</a></li>
    <li><a href="#using-and-updating-icons_video-demo">Video Demo</a></li>
	</ul>
</div>

<a href='#using-and-updating-icons_installing-grunt' aria-hidden='true' class='block-anchor'  id='using-and-updating-icons_installing-grunt'><i aria-hidden='true' class='linkify icon'></i></a>

## Installing Grunt

Some of a Stencil theme's static assets are handled with the Grunt JavaScript automator, where required. This means that you have some dependencies on both Grunt and npm. To get started:

First, make sure you have Grunt installed globally on your machine:

`npm install -g grunt-cli`

Then, from your theme's root directory, run:

`npm install`




<a href='#using-and-updating-icons_calling-theme-icons' aria-hidden='true' class='block-anchor'  id='using-and-updating-icons_calling-theme-icons'><i aria-hidden='true' class='linkify icon'></i></a>

## Calling Theme Icons 

A Stencil theme's icons are delivered via a single SVG sprite, which is embedded on the page in
`<theme-name>templates/layout/base.html`. This sprite is generated via the Grunt task `grunt svgstore`.

The task takes individual SVG files for each icon (in the theme's `assets/icons/` subdirectory) and bundles
them together, to be inlined on the top of the theme, inside a Handlebars partial.

You can then call each icon in a similar way to an inline image, via:

`<svg><use xlink:href="#icon-svgFileName" /></svg>`

The ID of each SVG icon you call is based on the filename of the icon you want, with `icon-` prepended.
For example:

`xlink:href="#icon-facebook"`



<a href='#using-and-updating-icons_adding-new-icons' aria-hidden='true' class='block-anchor'  id='using-and-updating-icons_adding-new-icons'><i aria-hidden='true' class='linkify icon'></i></a>

## Adding New Icons

Simply add your new icon SVG file to the `assets/icons/ `folder. Then, from your theme's root directory, run `grunt svgstore` or just `grunt`.



<a href='#using-and-updating-icons_video-demo' aria-hidden='true' class='block-anchor'  id='using-and-updating-icons_video-demo'><i aria-hidden='true' class='linkify icon'></i></a>

## Video Demo

Watch a video demonstration of installing Grunt and using it to update your theme's SVG sprite with custom icons: 

<iframe width="560" height="315" src="https://www.youtube.com/embed/-w7Hbn_p_pw" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>


