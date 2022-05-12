// ==UserScript==
// @name         DAZN media controls
// @description  allows forward/backwards with arrow keys and pause with space
// @version      1.0
// @author       Tobias
// @match        *.dazn.com/*
// @license      GNU
// @namespace    https://github.com/GreyGooseVX/Greasy-Fork-Scripts
// ==/UserScript==

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
