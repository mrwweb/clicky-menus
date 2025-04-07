# Clicky Menus

Version 1.2.0

Jump to: [About](#about), [Features](#features), [Setup & Configuration](#setup--configuration), [Browser Support](#browser-support) [Changelog](#changelog)

## About

A project by Mark Root-Wiley, [MRW Web Design](https://MRWweb.com)

Clicky Menus lets you create a progressively enhanced, accessible one-level dropdown menu that opens when activated by click, touch, or `ENTER`/`SPACE`. The menu supports hover and keyboard navigation when JS is not enabled.

[Demo on CodePen](https://codepen.io/mrwweb/pen/pXqKZO)

Why should you want menus that work this way? Read the accompanying article on CSS Tricks, ["In Praise of the Unambiguous Click Menu"](https://css-tricks.com/in-praise-of-the-unambiguous-click-menu/).

> Did this save you an hour? Did this save you four hours? Consider [sponsoring my work on the project](https://github.com/sponsors/mrwweb)!

## Features

- Supports interaction with mouse, touch, and keyboard
- Converts parent menu items from links into buttons
- Automatic `aria-expanded`, `aria-controls` and `aria-hidden` support
- Close open submenu with `ESC` key
- Close open submenu with click outside of open menu
- Basic offscreen-menu prevention
- [Configure custom submenu selector](#custom-submenu-selector)
- [Programmatically close open submenus](#closing-submenus-with-js)

### Why only one level of submenu?

This script only supports a single level of submenus, i.e., there are no "sub-sub-menus" or "tertiary menus". This is intentional because:

1. I don't like them. Nested dropdowns are a "navigation smell"—_a la_ "code smell"—and can often be avoided for better results.
2. This makes it very easy to [make "mega menus"](#custom-submenu-selector) that contain nested lists (basically permanently visible sub-submenus menus).

If you really want this feature, there's an [open issue for sharing use cases](https://github.com/mrwweb/clicky-menus/issues/8). If you want to submit a pull request, please coordinate on that issue before doing any work!

## Setup & Configuration

Clicky Menus requires one JS file, one CSS file, and a list with the class `clicky-menu`.

### Installation

You can install Clicky Menus by copying and pasting the files into your project. You can also use git or npm.

With git:

`$ git clone https://github.com/mrwweb/clicky-menus.git`

With npm:

`$ npm install clicky-menus`

### Building a Clicky Menu

Once you have the files:

1. Load `clicky-menus.js` anywhere in the DOM and `clicky-menus.css` in the `<head>`.
2. Put the `clicky-menu` and `no-js` classes on the top-level `<ul>` element containing your menu
3. Style your menus however you like. `clicky-menus.css` provides the most minimal styles for menu functionality so you can customize the design to your liking. [See the demo](https://codepen.io/mrwweb/pen/pXqKZO) for one example of how you could style this, including submenu animations!

Most of the time, Clicky Menus requires no configuration!

### Custom submenu selector

If you have unusual markup or design requirements, you can set a custom selector to target submenu elements. Do this by adding a `data-clicky-submenu-selector` attribute on the top-level `<ul>` element (the same one with the `clicky-menu` class) that contains a valid CSS selector.

For example, if you only want to only select the first level of nested `<ul>` elements while building a megamenu, you would do:

```html
<ul class="clicky-menu" data-clicky-submenu-selector=".clicky-menu > li > ul">
    <!-- menu items -->
</ul>
```

### Closing submenus with JS

There are a variety of situations where you might want to force submenus to close based on interactions elsewhere on the page. For example, maybe an adjacent search toggle overlaps with submenus when expanded.

To close all open submenus, dispatch the custom event `clickyMenusClose` to the `.clicky-menu` DOM node (usually the `<ul>` containing menu items).

Example:

```html
<button id="close-open-submenus">Close Open Submenus</button>
```

```js
// select the menu to manipulate
const myMenu = document.getElementById('my-menu');

// the element that triggers the close event
const closeButton = document.getElementById('close-open-submenus');

// dispatch the custom event when clicking the button
closeButton.addEventListener('click', () => {
    myMenu.dispatchEvent( new Event( 'clickyMenusClose' );
});
```

## Expected markup and markup transformation

```html
<nav id="primary-nav"><!-- menu parent element must have an ID -->
 <ul class="clicky-menu no-js">
  <li>
   <a href="#" class="a-custom-class">Parent Menu Item 1</a>
   <ul>
    <li><a href="page-1a.html">Submenu Item 1a</a></li>
    <li><a href="page-1b.html">Submenu Item 1b</a></li>
    <li><a href="page-1c.html">Submenu Item 1c</a></li>
   </ul>
  </li>
  <!-- etc… -->
 </ul>
</nav>
```

Once the script runs, the markup is changed to:

```html
<nav id="primary-nav"> <!-- element must have an ID -->
 <ul class="clicky-menu no-js">
  <li>
   <button aria-expanded="false" aria-controls="parent-menu-item-1-submenu" class="a-custom-class">Parent Menu Item 1</button>
   <ul id="parent-menu-item-1-submenu" aria-hidden="true">
    <li><a href="page-1a.html">Submenu Item 1a</a></li>
    <li><a href="page-1b.html">Submenu Item 1b</a></li>
    <li><a href="page-1c.html">Submenu Item 1c</a></li>
   </ul>
  </li>
  <!-- etc… -->
 </ul>
</nav>
```

### Notes on markup transformation

- All attributes on links converted to buttons are retained except for `href`.
- All elements inside links converted to buttons, such as an SVG icon, are retained in the button.
- When a user clicks a submenu toggle button (i.e., parent menu item), `aria-expanded` and `aria-hidden` are appropriately toggled between `true` and `false`.

## Browser Support

All Modern Browsers such as Firefox, Chrome, Edge, and Safari.

Internet Explorer 11 support is possible if you include polyfills for [`closest`](https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#polyfill) and [`NodeList.forEach`](https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach#Polyfill) and transpile your code with something like Babel.

## Changelog

### 1.2.0 (May 21, 2024)

- You can now close open submenus from 3rd-party JS with the `clickyMenusClose` event
- The default CSS will now correctly position submenus relative to the parent list item

### 1.1.0 (October 19, 2023)

- Add support for [data attribute that sets custom submenu selector](#custom-submenu-selector)
- Fix mismatched variable name leading to broken submenu IDs
- Improve documentation in the readme

### 1.0.0 (March 15, 2021)

- It's alive!
