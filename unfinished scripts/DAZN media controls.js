// ==UserScript==
// @name         DAZN media controls
// @description  allows forward/backwards with arrow keys and pause with space
// @version      1.0
// @author       Tobias L
// @match        *.dazn.com/*
// @license      GPL-3.0-only
// @namespace    https://github.com/GreyGooseVX/User-Scripts
// ==/UserScript==
// goes well with this steam controller profile:
// steam://controllerconfig/413080/2807431315

function backward() {
	document
		.getElementsByClassName(
			"playbackButtons___playback-button___2bb6j svgIcon___svg-icon___CEWfF button___button___3pFHb"
		)[0]
		.click()
}
function forward() {
	document
		.getElementsByClassName(
			"playbackButtons___playback-button___2bb6j svgIcon___svg-icon___CEWfF button___button___3pFHb"
		)[2]
		.click()
}
function pause() {
	document
		.getElementsByClassName(
			"playbackButtons___playback-button___2bb6j svgIcon___svg-icon___CEWfF button___button___3pFHb"
		)[1]
		.click()
}

document.body.addEventListener("keydown", function (e) {
	if (e.key === "ArrowLeft") {
		e.preventDefault()
		backward()
	}
	if (e.key === "ArrowRight") {
		e.preventDefault()
		forward()
	}
	if (e.key === " ") {
		e.preventDefault()
		pause()
	}
})
