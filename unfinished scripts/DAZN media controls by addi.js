// ==UserScript==
// @name         DAZN media controls
// @description  allows forward/backwards with arrow keys and pause with space
// @version      1.0
// @author       Tobias L, Addi K
// @match        *.dazn.com/*
// @license      GPL-3.0-only
// @namespace    https://github.com/GreyGooseVX/User-Scripts
// ==/UserScript==
// goes well with this steam controller profile:
// steam://controllerconfig/413080/2807431315

let buttons = document.getElementsByClassName(
	"playbackButtons___playback-button___2bb6j svgIcon___svg-icon___CEWfF button___button___3pFHb"
)

function pressAll(attributeName) {
	buttons.forEach((button) => {
		if (button.getAttribute("data-test-id") === attributeName) 
			button.click()
	})
}

document.body.addEventListener("keydown", function (e) {
	if (buttons == null) {
		console.log("return")
		return
	}

	switch (e.key) {
		case "ArrowLeft":
			e.preventDefault()
			pressAll('PLAYER_BUTTON_REWIND')
			break
		case "ArrowRight":
			e.preventDefault()
			pressAll('PLAYER_BUTTON_FAST_FORWARD')
			break
		case " ":
			e.preventDefault()
			pressAll('PLAYER_BUTTON_PAUSE')
	}
})
