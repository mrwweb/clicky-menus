/**
 * Clicky Menus v1.5.0
 */

( function() {
	'use strict';

	const ClickyMenus = function( menu, menuIndex ) {
		// DOM element(s)
		const container = menu.parentElement;
		let currentMenuItem,
			i,
			len;

		this.init = function() {
			menuSetup();
			document.addEventListener( 'click', closeIfClickOutsideMenu );
			// custom event to allow outside scripts to close submenus
			menu.addEventListener( 'clickyMenusClose', closeOpenSubmenu );
		};

		/*===================================================
		=            Menu Open / Close Functions            =
		===================================================*/
		function toggleOnMenuClick( e ) {
			const button = e.currentTarget;

			// close open menu if there is one
			if ( currentMenuItem && button !== currentMenuItem ) {
				toggleSubmenu( currentMenuItem );
			}

			toggleSubmenu( button );
		}

		function toggleSubmenu( button ) {
			const submenu = document.getElementById( button.getAttribute( 'aria-controls' ) );

			if ( 'true' === button.getAttribute( 'aria-expanded' ) ) {
				button.setAttribute( 'aria-expanded', false );
				submenu.setAttribute( 'aria-hidden', true );
				currentMenuItem = false;
			} else {
				button.setAttribute( 'aria-expanded', true );
				submenu.setAttribute( 'aria-hidden', false );
				preventOffScreenSubmenu( submenu );
				currentMenuItem = button;
			}
		}

		function preventOffScreenSubmenu( submenu ) {
			const 	screenWidth =	window.innerWidth ||
									document.documentElement.clientWidth ||
									document.body.clientWidth,
				parent = submenu.offsetParent,
				menuLeftEdge = parent.getBoundingClientRect().left,
				menuRightEdge = menuLeftEdge + submenu.offsetWidth;

			if ( menuRightEdge + 32 > screenWidth ) { // adding 32 so it's not too close
				submenu.classList.add( 'sub-menu--right' );
			}
		}

		function closeOnEscKey( e ) {
			if ( 27 === e.keyCode ) {
				// we're in a submenu item
				if ( null !== e.target.closest( 'ul[aria-hidden="false"]' ) ) {
					currentMenuItem.focus();
					toggleSubmenu( currentMenuItem );
					e.preventDefault();
				// we're on a parent item
				} else if ( 'true' === e.target.getAttribute( 'aria-expanded' ) ) {
					toggleSubmenu( currentMenuItem );
					e.preventDefault();
				}
			}
		}

		function closeIfClickOutsideMenu( e ) {
			if ( currentMenuItem && ! e.target.closest( '#' + container.id ) ) {
				toggleSubmenu( currentMenuItem );
			}
		}

		function closeOpenSubmenu() {
			if( currentMenuItem ) {
				toggleSubmenu( currentMenuItem );
			}
		}

		/*===========================================================
		=            Modify Menu Markup & Bind Listeners            =
		=============================================================*/
		function menuSetup() {
			menu.classList.remove( 'no-js' );
			const submenuSelector = 'clickySubmenuSelector' in menu.dataset ? menu.dataset.clickySubmenuSelector : 'ul';

			menu.querySelectorAll( submenuSelector ).forEach( ( submenu ) => {
				const menuItem = submenu.parentElement;

				if ( 'undefined' !== typeof submenu ) {
					const button = convertLinkToButton( menuItem );

					setUpAria( submenu, button );

					// bind event listener to button
					button.addEventListener( 'click', toggleOnMenuClick );
					menu.addEventListener( 'keydown', closeOnEscKey );
				}
			} );
		}

		/**
		 * Why do this? See https://justmarkup.com/articles/2019-01-21-the-link-to-button-enhancement/
		 *
		 * @param {HTMLElement} menuItem An element representing a link to be converted to a button
		 */
		function convertLinkToButton( menuItem ) {
			const 	link = menuItem.getElementsByTagName( 'a' )[ 0 ],
					linkHTML = link.innerHTML,
					linkAtts = link.attributes,
					button = document.createElement( 'button' );

			if ( null !== link ) {
				// copy button attributes and content from link
				button.innerHTML = linkHTML.trim();
				for ( i = 0, len = linkAtts.length; i < len; i++ ) {
					const attr = linkAtts[ i ];
					if ( 'href' !== attr.name ) {
						button.setAttribute( attr.name, attr.value );
					}
				}

				menuItem.replaceChild( button, link );
			}

			return button;
		}

		function setUpAria( submenu, button ) {
			const submenuId = submenu.getAttribute( 'id' );

			let id;
			const idSuffix =  `-submenu-${menuIndex}-${i}`;
			if ( null === submenuId ) {
				id = button.textContent.trim().replace( /\s+/g, '-' ).replace(/^[^a-zA-Z]+|[^\w:.-]+/g, "").toLowerCase() + idSuffix;
				i++;
			} else {
				id = submenuId + idSuffix;
				i++;
			}

			// set button ARIA
			button.setAttribute( 'aria-controls', id );
			button.setAttribute( 'aria-expanded', false );

			// set submenu ARIA
			submenu.setAttribute( 'id', id );
			submenu.setAttribute( 'aria-hidden', true );
		}
	};

	function dispatchMenuClose(e) {
		const menuId = e.currentTarget.getAttribute('data-clicky-menus-close');
		const menu = document.getElementById( menuId );
		if( menu ) {
			menu.dispatchEvent( new Event( 'clickyMenusClose' ) );
		}
	}

	/* Create a ClickMenus object and initiate menu for any menu with .clicky-menu class */
	document.addEventListener( 'DOMContentLoaded', function() {
		const menus = document.querySelectorAll( '.clicky-menu' );
		let i = 1;
		menus.forEach( ( menu ) => {
			const clickyMenu = new ClickyMenus( menu, i );
			clickyMenu.init();
			i++;
		} );

		const menuClosers = document.querySelectorAll( '[data-clicky-menus-close]' );
		if( menuClosers ) {
			menuClosers.forEach( ( menuCloser ) => {
				menuCloser.addEventListener( 'click', dispatchMenuClose );
			} );
		}
	} );
}() );
