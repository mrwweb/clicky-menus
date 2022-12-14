# Clicky Menus!
A project by Mark Root-Wiley, [MRW Web Design](https://MRWweb.com)

Clicky Menus lets you create a progressively-enhanced, accessible one-level dropdown menu that opens when activated by click, touch, or `ENTER`/`SPACE`. The menu is progressively enhanced, supporting hover and keyboard navigation (in modern browsers) if JS is not enabled.

## Basic Features
- Supports mouse, touch, and keyboard interactions
- Turns parent items from links into buttons
- `aria-expanded`, `aria-controls` and `aria-hidden` support
- Close open submenu with `ESC` key
- Close open submenu with click outside of open menu
- Basic offscreen-menu prevention

## Browser Support

All Modern Browsers such as Firefox, Chrome, Edge, and Safari.

Internet Explorer 11 support is possible if you include polyfills for [`closest`](https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#polyfill) and [`NodeList.forEach`](https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach#Polyfill) and transpile your code with something like Babel.

## Expected Markup

```html
<nav id="primary-nav"> <!-- element must have an ID -->
	<ul class="clicky-menu no-js">
		<li>
			<a href="#">Menu Item 1</a>
			<ul>
				<li><a href="page-1a.html">Menu Item 1a</a></li>
				<li><a href="page-1b.html">Menu Item 1b</a></li>
				<li><a href="page-1c.html">Menu Item 1c</a></li>
			</ul>
		</li>
		<--! etc… -->
	</ul>
</nav>
```

## Setup
Include `clicky-menus.js` anywhere in the DOM and `clicky-menus.css` in the `<head>`.

## Changelog

### 1.0.0
- It's alive!