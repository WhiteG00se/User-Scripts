// ==UserScript==
// @name         chess.com, wasd controls
// @description  allows user to go back and forth using the keys a and d, w and s are commented out
// @version      1.0
// @author       Tobias L
// @include      *.chess.com/*
// @license      GPL-3.0-only
// @namespace    https://github.com/GreyGooseVX/User-Scripts
// ==/UserScript==

function simulateKeyPress(event, key) {
	event.preventDefault()
	let keyPress = new KeyboardEvent('keydown', {
		key: key,
		code: key,
		bubbles: true,
		cancelable: true,
		view: window,
	})
	document.dispatchEvent(keyPress)
}

document.body.addEventListener('keydown', function (event) {
	switch (event.key) {
		// case 'w':
		// 	simulateKeyPress(event, 'ArrowUp')
		// 	break
		case 'a':
			simulateKeyPress(event, 'ArrowLeft')
			break
		// case 's':
		// 	simulateKeyPress(event, 'ArrowDown')
		// 	break
		case 'd':
			simulateKeyPress(event, 'ArrowRight')
			break
	}
})
