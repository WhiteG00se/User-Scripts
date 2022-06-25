// ==UserScript==
// @name         steam, navigate inventory pages
// @description  adds event listeners to the arrows keys to navigate inventory pages
// @version      1.0
// @author       Tobias L
// @include     https://steamcommunity.com/id/*/inventory*
// @license      GPL-3.0-only
// @namespace    https://github.com/GreyGooseVX/User-Scripts
// ==/UserScript==

setTimeout(function () {
	const nextPageButton = document.querySelector(".sih_button.next_page")
	const previousPageButton = document.querySelector(".sih_button.prev_page")
	document.addEventListener("keydown", function (e) {
		if (e.key === "ArrowRight") nextPageButton.click()
		if (e.key === "ArrowLeft") previousPageButton.click()
	})
}, 1000)
