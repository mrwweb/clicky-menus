# Clicky Menus

Jump to: [About](#about), [Features](#features), [Setup](#setup), [Browser Support](#browser-support) [Changelog](#changelog)

## About

A project by Mark Root-Wiley, [MRW Web Design](https://MRWweb.com)

Clicky Menus lets you create a progressively-enhanced, accessible one-level dropdown menu that opens when activated by click, touch, or `ENTER`/`SPACE`. The menu is progressively enhanced, supporting hover and keyboard navigation (in modern browsers) if JS is not enabled.

Why should you want menus that work this way? Read the accompanying article on CSS Tricks, ["In Praise of the Unambiguous Click Menu"](https://css-tricks.com/in-praise-of-the-unambiguous-click-menu/).

## Features

- Supports interaction with mouse, touch, and keyboard
- Converts parent menu items from links into buttons
- Automatic `aria-expanded`, `aria-controls` and `aria-hidden` support
- Close open submenu with `ESC` key
- Close open submenu with click outside of open menu
- Basic offscreen-menu prevention
- [Configure custom submenu selector](#custom-submenu-selector)

### Why only one level of submenu?

This script only supports a single level of submenus, i.e., there are no "sub-sub-menus" or "tertiary menus". This is intentional because:

1. I personally don't like them. They give off a bit of a "navigation smell"—_a la_ "code smell"—and can often be avoided for better results.
2. This makes it very easy to make "mega menus" that can contain nested lists (basically permanently visible tertiary menus).

If you really want this feature, there's an [open issue for sharing use cases](https://github.com/mrwweb/clicky-menus/issues/8). If you want to submit a pull request, please coordinate on that issue before doing any work!

## Setup

1. Include `clicky-menus.js` anywhere in the DOM and `clicky-menus.css` in the `<head>`.
2. Put the `clicky-menu` class on the top-level `<ul>` element containing your menu

### Expected Markup and Markup Transformation

```html
<nav id="primary-nav"> <!-- element must have an ID -->
 <ul class="clicky-menu no-js">
  <li>
   <a href="#" class="a-custom-class">Parent Menu Item 1</a>
   <ul>
    <li><a href="page-1a.html">Submenu Item 1a</a></li>
    <li><a href="page-1b.html">Submenu Item 1b</a></li>
    <li><a href="page-1c.html">Submenu Item 1c</a></li>
   </ul>
  </li>
  <--! etc… -->
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
  <--! etc… -->
 </ul>
</nav>
```

#### Notes on Markup Transformation

- All attributes on links converted to buttons are retained except for `href`.
- All elements inside links converted to buttons, such as an SVG icon, are retained in the button.
- When a user clicks a submenu toggle button (i.e., parent menu item), `aria-expanded` and `aria-hidden` are appropriately toggled between `true` and `false`.

### Custom Submenu Selector

If you have unusual markup or design requirements, you can set a custom selector for the submenu element with a `data-clicky-submenu-selector` attribute on the top-level `<ul>` element (the same one with the `clicky-menu` class).

For example, if you only want to select the first level of nested `<ul>` elements while building a megamenu, you would do:

```html
<ul class="clicky-menu" data-clicky-submenu-selector=".clicky-menu > li > ul">
    <!-- menu items -->
</ul>
```

## Browser Support

All Modern Browsers such as Firefox, Chrome, Edge, and Safari.

Internet Explorer 11 support is possible if you include polyfills for [`closest`](https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#polyfill) and [`NodeList.forEach`](https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach#Polyfill) and transpile your code with something like Babel.

## Changelog

### 1.1.0 (October 19, 2023)

- Add support for [data attribute that sets custom submenu selector](#custom-submenu-selector)
- Fix mismatched variable name leading to broken submenu IDs
- Improve documentation in the readme

### 1.0.0 (March 15, 2021)

- It's alive!
